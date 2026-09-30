import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { CSSProperties } from "react";

import MainLayout from "./MainLayout";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../lib/supabase";
import { getQuestions } from "../lib/questions";

import {
  isBookmarked,
  toggleBookmark,
} from "../utils/bookmarks";

export type Question = {
  id?: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

type TestRunnerProps = {
  subject: string;
};

/* =========================================================
   Helpers
========================================================= */

function shuffleQuestions(
  questions: Question[],
  count: number
): Question[] {
  return [...questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, questions.length));
}

/*
 * Converts different possible Supabase answer formats
 * into a number from 0-3.
 *
 * Supports:
 * 0, 1, 2, 3
 * "0", "1", "2", "3"
 * "A", "B", "C", "D"
 */
function normalizeCorrectAnswer(
  answer: unknown
): number {
  if (typeof answer === "number") {
    return answer;
  }

  if (typeof answer === "string") {
    const value = answer.trim().toUpperCase();

    if (value === "A") return 0;
    if (value === "B") return 1;
    if (value === "C") return 2;
    if (value === "D") return 3;

    const numeric = Number(value);

    if (
      Number.isInteger(numeric) &&
      numeric >= 0 &&
      numeric <= 3
    ) {
      return numeric;
    }
  }

  return 0;
}

/*
 * Renders AI explanations with real LaTeX support via MathJax.
 * This keeps the fix inside TestRunner.tsx and avoids adding a package.
 */
declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
      typesetClear?: (elements?: HTMLElement[]) => void;
      startup?: {
        promise?: Promise<void>;
      };
    };
  }
}

let mathJaxLoadingPromise: Promise<void> | null = null;

function loadMathJax(): Promise<void> {
  if (window.MathJax?.typesetPromise) {
    return Promise.resolve();
  }

  if (mathJaxLoadingPromise) {
    return mathJaxLoadingPromise;
  }

  mathJaxLoadingPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById("preppath-mathjax");

    if (existing) {
      const waitForMathJax = () => {
        if (window.MathJax?.typesetPromise) {
          resolve();
        } else {
          window.setTimeout(waitForMathJax, 50);
        }
      };

      waitForMathJax();
      return;
    }

    // Configure MathJax before loading the library.
    window.MathJax = {
      tex: {
        inlineMath: [
          ["\\(", "\\)"],
          ["$", "$"],
        ],
        displayMath: [
          ["\\[", "\\]"],
          ["$$", "$$"],
        ],
        processEscapes: true,
      },
      svg: {
        fontCache: "global",
      },
    } as any;

    const script = document.createElement("script");
    script.id = "preppath-mathjax";
    script.src =
      "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
    script.async = true;

    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("MathJax failed to load"));

    document.head.appendChild(script);
  });

  return mathJaxLoadingPromise;
}

function MathExplanation({
  text,
  color,
}: {
  text: string;
  color: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function renderMath() {
      try {
        await loadMathJax();

        if (cancelled || !containerRef.current) {
          return;
        }

        window.MathJax?.typesetClear?.([containerRef.current]);
        await window.MathJax?.typesetPromise?.([
          containerRef.current,
        ]);
      } catch (error) {
        console.error("Math rendering failed:", error);
      }
    }

    renderMath();

    return () => {
      cancelled = true;
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      style={{
        color,
        lineHeight: 1.8,
        whiteSpace: "pre-wrap",
        fontSize: 15,
      }}
    >
      {text}
    </div>
  );
}

/* =========================================================
   Component
========================================================= */

export default function TestRunner({
  subject,
}: TestRunnerProps) {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();

  /* =======================================================
     Test mode
  ======================================================= */

  const mode = searchParams.get("mode") || "20-questions";
  const normalizedMode = mode.toLowerCase().trim();

  const isTimedMode =
    normalizedMode === "timed-mode" ||
    normalizedMode === "timed" ||
    normalizedMode === "time";

  const is50Questions =
    normalizedMode === "50-questions" ||
    normalizedMode === "50" ||
    normalizedMode === "50-question";

  /*
   * Normal test = 20 questions
   * 50-question mode = 50 questions
   */
  const questionLimit = is50Questions ? 50 : 20;

  /*
   * Timed mode gives 1 minute per question.
   */
  const initialTime = isTimedMode
    ? questionLimit * 60
    : 0;

  /* =======================================================
     Theme colors
  ======================================================= */

  const isDark = theme === "dark";

  const colors = {
    page: isDark ? "#09070F" : "#F4F4FA",
    card: isDark ? "#17101F" : "#FFFFFF",
    cardSecondary: isDark ? "#21152D" : "#FAF8FE",

    text: isDark ? "#FFFFFF" : "#15111C",
    muted: isDark ? "#C8BCD3" : "#6E6476",

    border: isDark ? "rgba(171,132,255,.17)" : "#E4DDED",

    option: isDark ? "#20152B" : "#FFFFFF",

    purple: "#7C3AED",
    purpleDark: "#4C1D95",
    purpleSoft: isDark ? "rgba(124,58,237,.16)" : "#F0E9FF",

    green: "#22C55E",
    greenSoft: isDark ? "rgba(34,197,94,.12)" : "#F0FDF4",

    red: "#EF4444",
    redSoft: isDark ? "rgba(239,68,68,.12)" : "#FEF2F2",

    yellow: "#F59E0B",
  };

  /* =======================================================
     State
  ======================================================= */

  const [loadingQuestions, setLoadingQuestions] =
    useState(true);

  const [saving, setSaving] = useState(false);

  const [dbQuestions, setDbQuestions] =
    useState<Question[]>([]);

  const [index, setIndex] = useState(0);

  const [selected, setSelected] =
    useState<number | null>(null);

  const [score, setScore] = useState(0);

  const [finished, setFinished] = useState(false);

  const [userAnswers, setUserAnswers] = useState<
    (number | null)[]
  >([]);

  const [bookmarked, setBookmarked] =
    useState(false);

  const [
    bookmarkMessage,
    setBookmarkMessage,
  ] = useState("");

  const [aiExplanation, setAiExplanation] =
    useState("");

  const [
    loadingAIExplanation,
    setLoadingAIExplanation,
  ] = useState(false);

  const [timeLeft, setTimeLeft] =
    useState(initialTime);

  /* =======================================================
     Load questions
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadQuestions() {
      setLoadingQuestions(true);

      try {
        const data = await getQuestions(subject);

        console.log("Subject received:", subject);
        console.log(
          "Questions from Supabase:",
          data
        );

        if (cancelled) {
          return;
        }

        if (!data || data.length === 0) {
          setDbQuestions([]);
          return;
        }

        const converted: Question[] = data
          .map((q: any) => ({
            id: q.id,
            question: q.question,
            options: [
              q.option_a,
              q.option_b,
              q.option_c,
              q.option_d,
            ].filter(
              (option): option is string =>
                typeof option === "string"
            ),
            answer: normalizeCorrectAnswer(
              q.correct_answer
            ),
            explanation: q.explanation || "",
          }))
          .filter(
            (q: Question) =>
              q.question &&
              q.options.length >= 2
          );

        setDbQuestions(converted);
      } catch (error) {
        console.error(
          "Error loading questions:",
          error
        );

        if (!cancelled) {
          setDbQuestions([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingQuestions(false);
        }
      }
    }

    loadQuestions();

    return () => {
      cancelled = true;
    };
  }, [subject]);

  /* =======================================================
     Select questions for this test
  ======================================================= */

  const testQuestions = useMemo(() => {
    /*
     * For now weak-topics uses the same question pool.
     *
     * Later you can replace this with your weak-topic
     * filtering logic.
     */
    return shuffleQuestions(
      dbQuestions,
      questionLimit
    );
  }, [dbQuestions, questionLimit]);

  const current = testQuestions[index];

  /* =======================================================
     Timed mode countdown
  ======================================================= */

  useEffect(() => {
    if (
      !isTimedMode ||
      finished ||
      loadingQuestions ||
      testQuestions.length === 0
    ) {
      return;
    }

    if (timeLeft <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          window.clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    isTimedMode,
    finished,
    loadingQuestions,
    testQuestions.length,
    timeLeft,
  ]);

  /* =======================================================
     Finish test automatically when timer reaches zero
  ======================================================= */

  useEffect(() => {
    if (
      !isTimedMode ||
      loadingQuestions ||
      finished ||
      saving ||
      testQuestions.length === 0 ||
      timeLeft !== 0
    ) {
      return;
    }

    async function finishTimedTest() {
      setSaving(true);

      try {
        await saveResult(score);
      } finally {
        setFinished(true);
        setSaving(false);
      }
    }

    finishTimedTest();
  }, [
    timeLeft,
    isTimedMode,
    loadingQuestions,
    finished,
    saving,
    testQuestions.length,
    score,
  ]);

  /* =======================================================
     Check bookmark for current question
  ======================================================= */

  useEffect(() => {
    setBookmarkMessage("");

    async function checkBookmark() {
      if (!current?.id) {
        setBookmarked(false);
        return;
      }

      try {
        const result = await isBookmarked(
          current.id
        );

        setBookmarked(result);
      } catch (error) {
        console.error(
          "Bookmark check failed:",
          error
        );

        setBookmarked(false);
      }
    }

    checkBookmark();
  }, [current]);

  /* =======================================================
     Progress
  ======================================================= */

  const progress =
    testQuestions.length === 0
      ? 0
      : Math.round(
          ((index + 1) /
            testQuestions.length) *
            100
        );

  /* =======================================================
     Save result
  ======================================================= */

  async function saveResult(
    finalScore: number
  ) {
    if (
      !user ||
      testQuestions.length === 0
    ) {
      return;
    }

    try {

      /* ---------------------------------------------------
         Save test result
      --------------------------------------------------- */

      const {
        error: resultError,
      } = await supabase
        .from("test_results")
        .insert({
          user_id: user.id,
          subject,
          score: finalScore,
          total_questions:
            testQuestions.length,
          correct_answers: finalScore,
          created_at:
            new Date().toISOString(),
        });

      if (resultError) {
        console.error(
          "Error saving test result:",
          resultError
        );

        return;
      }

      /* ---------------------------------------------------
         Get existing user stats
      --------------------------------------------------- */

      const {
        data: stats,
        error: statsError,
      } = await supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (statsError || !stats) {
        console.error(
          "Could not load user stats:",
          statsError
        );

        return;
      }

      /* ---------------------------------------------------
         Calculate streak
      --------------------------------------------------- */

      const now = new Date();
      const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
      ].join("-");

      let streak = 1;

      if (stats.last_active_date) {
        const previousDate =
          new Date(
            `${stats.last_active_date}T00:00:00`
          );

        const currentDate =
          new Date(
            `${today}T00:00:00`
          );

        const difference =
          Math.round(
            (currentDate.getTime() -
              previousDate.getTime()) /
              (1000 * 60 * 60 * 24)
          );

        if (difference === 0) {
          /*
           * Already active today.
           */
          streak = stats.streak || 1;
        } else if (difference === 1) {
          /*
           * Active yesterday, so increase streak.
           */
          streak =
            (stats.streak || 0) + 1;
        } else {
          /*
           * Streak broken.
           */
          streak = 1;
        }
      }

      /* ---------------------------------------------------
      Calculate stats from actual test results
      --------------------------------------------------- */

      const {
        data: allResults,
        error: resultsError,
      } = await supabase
        .from("test_results")
        .select("score, total_questions")
        .eq("user_id", user.id);

      if (resultsError) {
        console.error(
          "Could not calculate test statistics:",
          resultsError
        );

        return;
      }

      const totalTests = allResults?.length ?? 0;

      const totalCorrect =
        allResults?.reduce(
          (sum, result) =>
            sum + (result.score || 0),
          0
        ) ?? 0;

      const totalQuestions =
        allResults?.reduce(
          (sum, result) =>
            sum + (result.total_questions || 0),
          0
        ) ?? 0;

      const newAccuracy =
        totalQuestions > 0
          ? Math.round(
              (totalCorrect / totalQuestions) * 100
            )
          : 0;

      /* ---------------------------------------------------
         Update stats
      --------------------------------------------------- */

      const {
        error: updateError,
      } = await supabase
        .from("user_stats")
        .update({
          total_tests: totalTests,
          accuracy: newAccuracy,
          streak,
          last_active_date: today,
        })
        .eq("user_id", user.id);

      if (updateError) {
        console.error(
          "Error updating user stats:",
          updateError
        );
      }
    } catch (error) {
      console.error(
        "Unexpected error saving result:",
        error
      );
    }
  }

  /* =======================================================
     AI explanation
  ======================================================= */

  async function getAIExplanation() {
  if (
    !current ||
    selected === null
  ) {
    return;
  }

  setLoadingAIExplanation(true);
  setAiExplanation("");

    try {
      const selectedAnswer =
        current.options[selected];

      const correctAnswer =
        current.options[current.answer];

      const {
        data,
        error,
      } = await supabase.functions.invoke(
        "ai-answer-explanation",
        {
          body: {
            subject,
            question:
              current.question,
            options:
              current.options,
            selectedAnswer,
            correctAnswer,
            existingExplanation:
              current.explanation,
          },
        }
      );

      if (error) {
        console.error(
          "AI explanation error:",
          error
        );

        setAiExplanation(
          "Something went wrong while generating the AI explanation."
        );

        return;
      }

      setAiExplanation(
        data?.explanation ||
          "No explanation was generated."
      );
    } catch (error) {
      console.error(
        "AI explanation error:",
        error
      );

      setAiExplanation(
        "Something went wrong while generating the AI explanation."
      );
    } finally {
      setLoadingAIExplanation(false);
    }
  }

  /* =======================================================
     Submit answer
  ======================================================= */

  async function submitAnswer() {
    if (
      selected === null ||
      saving ||
      !current
    ) {
      return;
    }

    const updatedAnswers = [
      ...userAnswers,
    ];

    updatedAnswers[index] = selected;

    setUserAnswers(updatedAnswers);

    const isCorrect =
      selected === current.answer;

    const updatedScore = isCorrect
      ? score + 1
      : score;

    /* ---------------------------------------------------
       More questions remaining
    --------------------------------------------------- */

    if (
      index <
      testQuestions.length - 1
    ) {
      setScore(updatedScore);
      setIndex(index + 1);
      setSelected(null);
      setAiExplanation("");

      return;
    }

    /* ---------------------------------------------------
       Last question
    --------------------------------------------------- */

    setSaving(true);

    try {
      await saveResult(updatedScore);

      setScore(updatedScore);
      setFinished(true);
    } finally {
      setSaving(false);
    }
  }

  /* =======================================================
     Bookmark
  ======================================================= */

  async function handleBookmark() {
    if (!current?.id) {
      return;
    }

    try {
      const result =
        await toggleBookmark(
          current.id
        );

      if (result.message) {
        setBookmarkMessage(result.message);
        return;
      }

      setBookmarked(result.bookmarked);
      setBookmarkMessage("");
    } catch (error) {
      console.error(
        "Bookmark error:",
        error
      );
    }
  }

  /* =======================================================
     Restart
  ======================================================= */

  function restartTest() {
    window.location.reload();
  }

  /* =======================================================
     Format timer
  ======================================================= */

  function formatTime(
    seconds: number
  ) {
    const minutes =
      Math.floor(seconds / 60);

    const remainingSeconds =
      seconds % 60;

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  /* =======================================================
     Loading screen
  ======================================================= */

  if (loadingQuestions) {
    return (
      <MainLayout>
        <div
          className="testrunner-page"
          style={{
            ...styles.page,
            background: colors.page,
            color: colors.text,
          }}
        >
          <div
            style={
              styles.loadingContainer
            }
          >
            <div
              style={{
                ...styles.loadingIcon,
                background:
                  colors.purpleSoft,
              }}
            >
              🧠
            </div>

            <h2
              style={{
                ...styles.loadingTitle,
                color: colors.text,
              }}
            >
              Preparing your test
            </h2>

            <p
              style={{
                ...styles.loadingText,
                color: colors.muted,
              }}
            >
              Loading {subject}{" "}
              questions...
            </p>

            <div
              style={{
                ...styles.loadingBar,
                background: isDark
                  ? "rgba(255,255,255,.07)"
                  : "#EEE8F2",
              }}
            >
              <div
                style={
                  styles.loadingBarFill
                }
              />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  /* =======================================================
     No questions
  ======================================================= */

  if (testQuestions.length === 0) {
    return (
      <MainLayout>
        <div
          className="testrunner-page"
          style={{
            ...styles.page,
            background: colors.page,
            color: colors.text,
          }}
        >
          <div
            style={{
              ...styles.emptyCard,
              background: colors.card,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div
              style={{
                ...styles.emptyIcon,
                background:
                  colors.purpleSoft,
              }}
            >
              📚
            </div>

            <h2
              style={{
                color: colors.text,
                margin: 0,
              }}
            >
              No questions found
            </h2>

            <p
              style={{
                color: colors.muted,
                marginTop: 8,
              }}
            >
              We couldn't find any
              questions for {subject}.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  /* =======================================================
     Finished screen
  ======================================================= */

  if (finished) {
    const percentage =
      testQuestions.length === 0
        ? 0
        : Math.round(
            (score /
              testQuestions.length) *
              100
          );

    let resultMessage =
      "Keep practicing — you're getting there!";

    if (percentage >= 90) {
      resultMessage =
        "Outstanding performance! 🔥";
    } else if (percentage >= 75) {
      resultMessage =
        "Excellent work! Keep it up! 🎉";
    } else if (percentage >= 60) {
      resultMessage =
        "Good job! A little more practice will help.";
    }

    return (
      <MainLayout>
        <div
          className="testrunner-page"
          style={{
            ...styles.page,
            background: colors.page,
            color: colors.text,
          }}
        >
          <div
            className="testrunner-results-wrap"
            style={styles.resultsWrap}
          >
            {/* Results Hero */}

            <div
              style={{
                ...styles.resultsHero,
                background:
                  "linear-gradient(135deg,#2A0F50 0%,#4C1D95 44%,#6D28D9 72%,#3B82F6 120%)",
              }}
            >
              <div
                style={
                  styles.resultsEmoji
                }
              >
                {percentage >= 80
                  ? "🏆"
                  : percentage >= 60
                  ? "🎉"
                  : "💪"}
              </div>

              <p
                style={
                  styles.resultsEyebrow
                }
              >
                TEST COMPLETED
              </p>

              <h1
                style={
                  styles.resultsTitle
                }
              >
                {resultMessage}
              </h1>

              <p
                style={
                  styles.resultsSubject
                }
              >
                {subject}
              </p>
            </div>

            {/* Score Card */}

            <div
              className="testrunner-score-card"
              style={{
                ...styles.scoreCard,
                background:
                  colors.card,
                border:
                  `1px solid ${colors.border}`,
              }}
            >
              <div
                style={
                  styles.scoreCircle
                }
              >
                <div
                  style={{
                    ...styles.scoreCircleInner,
                    background: colors.card,
                  }}
                >
                  <strong
                    style={{
                      color:
                        colors.purple,
                      fontSize: 34,
                    }}
                  >
                    {percentage}%
                  </strong>

                  <span
                    style={{
                      color:
                        colors.muted,
                      fontSize: 12,
                      marginTop: 2,
                    }}
                  >
                    Accuracy
                  </span>
                </div>
              </div>

              <div
                style={
                  styles.scoreDetails
                }
              >
                <div
                  style={
                    styles.scoreDetail
                  }
                >
                  <span
                    style={{
                      color:
                        colors.muted,
                      fontSize: 13,
                    }}
                  >
                    Score
                  </span>

                  <strong
                    style={{
                      color:
                        colors.text,
                      fontSize: 22,
                    }}
                  >
                    {score}/
                    {
                      testQuestions.length
                    }
                  </strong>
                </div>

                <div
                  style={
                    styles.scoreDetail
                  }
                >
                  <span
                    style={{
                      color:
                        colors.muted,
                      fontSize: 13,
                    }}
                  >
                    Correct
                  </span>

                  <strong
                    style={{
                      color:
                        colors.green,
                      fontSize: 22,
                    }}
                  >
                    {score}
                  </strong>
                </div>

                <div
                  style={
                    styles.scoreDetail
                  }
                >
                  <span
                    style={{
                      color:
                        colors.muted,
                      fontSize: 13,
                    }}
                  >
                    Incorrect
                  </span>

                  <strong
                    style={{
                      color:
                        colors.red,
                      fontSize: 22,
                    }}
                  >
                    {testQuestions.length -
                      score}
                  </strong>
                </div>
              </div>
            </div>

            {/* Retake */}

            <button
              type="button"
              style={
                styles.primaryBtn
              }
              onClick={restartTest}
            >
              🔄 Retake Test
            </button>

            {/* Review */}

            <div
              className="testrunner-review-container"
              style={{
                ...styles.reviewContainer,
                background:
                  colors.card,
                border:
                  `1px solid ${colors.border}`,
              }}
            >
              <div
                style={
                  styles.reviewHeader
                }
              >
                <h2
                  style={{
                    color:
                      colors.text,
                    margin: 0,
                  }}
                >
                  Answer Review
                </h2>

                <p
                  style={{
                    color:
                      colors.muted,
                    margin:
                      "6px 0 0",
                  }}
                >
                  Review your answers
                  and explanations.
                </p>
              </div>

              <div>
                {testQuestions.map(
                  (q, i) => {
                    const userAnswer =
                      userAnswers[i];

                    const correct =
                      userAnswer ===
                      q.answer;

                    return (
                      <div
                        key={
                          q.id || i
                        }
                        style={{
                          ...styles.reviewCard,
                          background:
                            correct
                              ? colors.greenSoft
                              : colors.redSoft,
                          border:
                            `1px solid ${
                              correct
                                ? colors.green
                                : colors.red
                            }33`,
                        }}
                      >
                        <div
                          style={
                            styles.reviewTop
                          }
                        >
                          <span
                            style={{
                              ...styles.questionNumber,
                              background:
                                correct
                                  ? colors.green
                                  : colors.red,
                            }}
                          >
                            {i + 1}
                          </span>

                          <span
                            style={{
                              fontWeight:
                                800,
                              color:
                                correct
                                  ? colors.green
                                  : colors.red,
                            }}
                          >
                            {correct
                              ? "✓ Correct"
                              : "✕ Incorrect"}
                          </span>
                        </div>

                        <h3
                          style={{
                            color:
                              colors.text,
                            lineHeight:
                              1.5,
                            margin:
                              "14px 0",
                            fontSize: 16,
                          }}
                        >
                          {q.question}
                        </h3>

                        <div
                          style={
                            styles.answerReview
                          }
                        >
                          <div>
                            <span
                              style={{
                                color:
                                  colors.muted,
                                fontSize:
                                  12,
                                fontWeight:
                                  700,
                              }}
                            >
                              YOUR ANSWER
                            </span>

                            <p
                              style={{
                                color:
                                  correct
                                    ? colors.green
                                    : colors.red,
                                margin:
                                  "4px 0 0",
                                fontWeight:
                                  700,
                              }}
                            >
                              {userAnswer !==
                              null &&
                              userAnswer !==
                                undefined
                                ? q
                                    .options[
                                    userAnswer
                                  ]
                                : "Not Answered"}
                            </p>
                          </div>

                          {!correct && (
                            <div>
                              <span
                                style={{
                                  color:
                                    colors.muted,
                                  fontSize:
                                    12,
                                  fontWeight:
                                    700,
                                }}
                              >
                                CORRECT ANSWER
                              </span>

                              <p
                                style={{
                                  color:
                                    colors.green,
                                  margin:
                                    "4px 0 0",
                                  fontWeight:
                                    700,
                                }}
                              >
                                {
                                  q
                                    .options[
                                    q.answer
                                  ]
                                }
                              </p>
                            </div>
                          )}
                        </div>

                        {q.explanation && (
                          <div
                            style={{
                              ...styles.explanation,
                              background:
                                colors.card,
                              border:
                                `1px solid ${colors.border}`,
                            }}
                          >
                            <strong
                              style={{
                                color:
                                  colors.purple,
                              }}
                            >
                              💡 Explanation
                            </strong>

                            <p
                              style={{
                                color:
                                  colors.muted,
                                margin:
                                  "6px 0 0",
                                lineHeight:
                                  1.6,
                              }}
                            >
                              {
                                q.explanation
                              }
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  /* =======================================================
     Main test screen
  ======================================================= */

  return (
    <MainLayout>
      <div
        style={{
          ...styles.page,
          background: colors.page,
          color: colors.text,
        }}
      >
        <div
          className="testrunner-wrap"
          style={styles.testWrap}
        >
          {/* Header */}

          <div
            className="testrunner-header"
            style={styles.testHeader}
          >
            <div>
              <p
                style={{
                  ...styles.eyebrow,
                  color:
                    colors.purple,
                }}
              >
                PREPPATH TEST
              </p>

              <h1
                style={{
                  ...styles.testTitle,
                  color:
                    colors.text,
                }}
              >
                {subject}
              </h1>

              <p
                style={{
                  ...styles.modeLabel,
                  color:
                    colors.purple,
                }}
              >
                {is50Questions
                  ? "50 QUESTION MOCK TEST"
                  : isTimedMode
                  ? "TIMED MOCK TEST"
                  : "20 QUESTION MOCK TEST"}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: 10,
                flexWrap:
                  "wrap",
                justifyContent:
                  "flex-end",
              }}
            >
              <div
                style={{
                  ...styles.progressBadge,
                  background:
                    colors.purpleSoft,
                  color:
                    colors.purple,
                }}
              >
                {index + 1} /{" "}
                {
                  testQuestions.length
                }
              </div>

              {isTimedMode && (
                <div
                  style={{
                    ...styles.progressBadge,
                    background:
                      timeLeft <= 60
                        ? colors.redSoft
                        : colors.cardSecondary,
                    color:
                      timeLeft <= 60
                        ? colors.red
                        : colors.text,
                    border:
                      `1px solid ${
                        timeLeft <= 60
                          ? colors.red
                          : colors.border
                      }`,
                  }}
                >
                  ⏱{" "}
                  {formatTime(
                    timeLeft
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Progress */}

          <div
            style={
              styles.progressContainer
            }
          >
            <div
              style={{
                ...styles.progressTrack,
                background:
                  isDark
                    ? "rgba(255,255,255,.07)"
                    : "#EEE8F2",
              }}
            >
              <div
                style={{
                  ...styles.progressFill,
                  width:
                    `${progress}%`,
                }}
              />
            </div>

            <div
              style={
                styles.progressLabels
              }
            >
              <span
                style={{
                  color:
                    colors.muted,
                }}
              >
                Question{" "}
                {index + 1} of{" "}
                {
                  testQuestions.length
                }
              </span>

              <strong
                style={{
                  color:
                    colors.purple,
                }}
              >
                {progress}%
                complete
              </strong>
            </div>
          </div>

          {/* Question Card */}

          <div
            className="testrunner-question-card"
            style={{
              ...styles.questionCard,
              background:
                colors.card,
              border:
                `1px solid ${colors.border}`,
            }}
          >
            {/* Question Header */}

            <div
              style={
                styles.questionHeader
              }
            >
              <div
                style={
                  styles.questionLabel
                }
              >
                <span
                  style={{
                    ...styles.questionDot,
                    background:
                      colors.purple,
                  }}
                />

                Question{" "}
                {index + 1}
              </div>

              <button
                type="button"
                onClick={
                  handleBookmark
                }
                style={{
                  ...styles.bookmarkBtn,
                  color:
                    bookmarked
                      ? colors.yellow
                      : colors.muted,
                  background:
                    bookmarked
                      ? colors.purpleSoft
                      : colors.cardSecondary,
                  border:
                    `1px solid ${colors.border}`,
                }}
                title={
                  bookmarked
                    ? "Remove bookmark"
                    : "Bookmark question"
                }
              >
                {bookmarked
                  ? "★"
                  : "☆"}

                <span>
                  {bookmarked
                    ? "Saved"
                    : "Save"}
                </span>
              </button>
            </div>

            {bookmarkMessage && (
              <div
                role="status"
                style={{
                  marginBottom: 18,
                  padding: "12px 14px",
                  borderRadius: 14,
                  background: colors.purpleSoft,
                  border: `1px solid ${colors.purple}55`,
                  color: colors.text,
                  fontSize: 13,
                  lineHeight: 1.55,
                  fontWeight: 700,
                }}
              >
                ⭐ {bookmarkMessage}
              </div>
            )}

            {/* Question */}

            <h2
              style={{
                ...styles.questionText,
                color:
                  colors.text,
              }}
            >
              {current.question}
            </h2>

            {/* Options */}

            <div
              style={
                styles.options
              }
            >
              {current.options.map(
                (option, i) => {
                  const isSelected =
                    selected === i;

                  const letter =
                    String.fromCharCode(
                      65 + i
                    );

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setSelected(
                          i
                        )
                      }
                      className="testrunner-option"
                      style={{
                        ...styles.option,
                        background:
                          isSelected
                            ? colors.purpleSoft
                            : colors.option,
                        border:
                          `2px solid ${
                            isSelected
                              ? colors.purple
                              : colors.border
                          }`,
                        color:
                          colors.text,
                        boxShadow:
                          isSelected
                            ? `0 8px 25px ${colors.purple}18`
                            : "none",
                      }}
                    >
                      <span
                        style={{
                          ...styles.optionLetter,
                          background:
                            isSelected
                              ? colors.purple
                              : colors.cardSecondary,
                          color:
                            isSelected
                              ? "#FFFFFF"
                              : colors.muted,
                          border:
                            `1px solid ${
                              isSelected
                                ? colors.purple
                                : colors.border
                            }`,
                        }}
                      >
                        {letter}
                      </span>

                      <span
                        style={
                          styles.optionText
                        }
                      >
                        {option}
                      </span>

                      <span
                        style={{
                          ...styles.radio,
                          border:
                            `2px solid ${
                              isSelected
                                ? colors.purple
                                : colors.border
                            }`,
                          background:
                            isSelected
                              ? colors.purple
                              : "transparent",
                        }}
                      >
                        {isSelected && (
                          <span
                            style={
                              styles.radioDot
                            }
                          />
                        )}
                      </span>
                    </button>
                  );
                }
              )}
            </div>

            {/* Bottom */}

            <div
              style={
                styles.questionFooter
              }
            >
              {/* AI Explanation */}

              {aiExplanation && (
                <div
                  style={{
                    ...styles.aiExplanation,
                    background:
                      colors.purpleSoft,
                    border:
                      `1px solid ${colors.purple}55`,
                  }}
                >
                  <div
                    style={{
                      display:
                        "flex",
                      alignItems:
                        "center",
                      gap: 8,
                      marginBottom:
                        8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 20,
                      }}
                    >
                      🤖
                    </span>

                    <strong
                      style={{
                        color:
                          colors.purple,
                      }}
                    >
                      AI Explanation
                    </strong>
                  </div>

                  <div
                    style={styles.aiExplanationBody}
                  >
                    <MathExplanation
                      text={aiExplanation}
                      color={colors.text}
                    />
                  </div>
                </div>
              )}

              <p
                style={{
                  color:
                    colors.muted,
                  margin: 0,
                  fontSize: 13,
                }}
              >
                Select an answer
                to continue
              </p>

              <div
                style={
                  styles.footerButtons
                }
              >
                {/* AI Button */}

                <button
                  type="button"
                  onClick={getAIExplanation}
                  disabled={
                    selected === null ||
                    loadingAIExplanation ||
                    saving
                  }
                    style={{
                      ...styles.aiExplainBtn,

                      opacity:
                        selected === null ||
                        loadingAIExplanation ||
                        saving
                        ? 0.5
                        : 1,

                      cursor:
                        selected === null ||
                        loadingAIExplanation ||
                        saving
                        ? "not-allowed"
                        : "pointer",

                      border: "1px solid #7C3AED",
                      color: "#7C3AED",
                    }}
                >
                    {loadingAIExplanation
                      ? "✨ Generating..."
                      : "✨ Explain with AI"}
                </button>

                {/* Next */}

                <button
                  type="button"
                  style={{
                    ...styles.nextBtn,
                    opacity:
                      selected ===
                        null ||
                      saving
                        ? 0.5
                        : 1,
                    cursor:
                      selected ===
                        null ||
                      saving
                        ? "not-allowed"
                        : "pointer",
                  }}
                  disabled={
                    selected ===
                      null ||
                    saving
                  }
                  onClick={
                    submitAnswer
                  }
                >
                  {saving
                    ? "Saving..."
                    : index ===
                      testQuestions.length -
                        1
                    ? "Finish Test ✓"
                    : "Next Question →"}
                </button>
              </div>
            </div>
          </div>

          {/* Footer Tip */}

          <div
            style={{
              ...styles.tip,
              color:
                colors.muted,
            }}
          >
            💡 Take your time and
            read each question
            carefully.
          </div>
        </div>

        <style>{`
          .testrunner-page {
            width: 100%;
            box-sizing: border-box;
          }

          .testrunner-option:hover {
            transform: translateY(-2px);
            border-color: rgba(124,58,237,.38) !important;
            box-shadow: 0 12px 26px rgba(76,29,149,.10) !important;
          }

          .testrunner-question-card,
          .testrunner-score-card,
          .testrunner-review-container {
            transition:
              transform .2s ease,
              box-shadow .2s ease,
              border-color .2s ease;
          }

          @media (max-width: 900px) {
            .testrunner-page {
              padding: 30px 22px 54px !important;
            }

            .testrunner-header {
              flex-direction: column;
              align-items: stretch !important;
            }

            .testrunner-header > div:last-child {
              justify-content: flex-start !important;
            }
          }

          @media (max-width: 620px) {
            .testrunner-page {
              padding: 22px 14px 46px !important;
            }

            .testrunner-question-card {
              padding: 24px !important;
              border-radius: 22px !important;
            }

            .testrunner-question-card h2 {
              font-size: 23px !important;
            }

            .testrunner-option {
              padding: 14px !important;
            }

            .testrunner-score-card {
              gap: 24px !important;
            }
          }

          @media (max-width: 520px) {
            .testrunner-question-card > div:last-child {
              flex-direction: column;
              align-items: stretch !important;
            }
          }
        `}</style>
      </div>
    </MainLayout>
  );
}

/* =========================================================
   Styles
========================================================= */

const styles: Record<
  string,
  CSSProperties
> = {
  /* -------------------------------------------------------
     General
  ------------------------------------------------------- */

  page: {
    minHeight: "100vh",
    padding:
      "40px 34px 64px",
    boxSizing:
      "border-box",
    transition:
      "background .25s ease, color .25s ease",
  },

  testWrap: {
    width: "100%",
    maxWidth: 1040,
    margin: "0 auto",
  },

  /* -------------------------------------------------------
     Header
  ------------------------------------------------------- */

  testHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    gap: 20,
    marginBottom: 24,
  },

  eyebrow: {
    margin: 0,
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: 1.4,
  },

  testTitle: {
    margin:
      "5px 0 0",
    fontSize: 36,
    fontWeight: 900,
    letterSpacing: -0.5,
  },

  modeLabel: {
    margin:
      "6px 0 0",
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: 1.2,
  },

  progressBadge: {
    padding:
      "10px 15px",
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 900,
    whiteSpace:
      "nowrap",
  },

  /* -------------------------------------------------------
     Progress
  ------------------------------------------------------- */

  progressContainer: {
    marginBottom: 20,
  },

  progressTrack: {
    width: "100%",
    height: 9,
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
    background:
      "linear-gradient(90deg,#4C1D95,#7C3AED)",
    transition:
      "width .35s ease",
  },

  progressLabels: {
    display: "flex",
    justifyContent:
      "space-between",
    gap: 14,
    marginTop: 8,
    fontSize: 12,
  },

  /* -------------------------------------------------------
     Question
  ------------------------------------------------------- */

  questionCard: {
    borderRadius: 28,
    padding: 34,
    boxShadow:
      "0 20px 50px rgba(15,23,42,.08)",
  },

  questionHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    gap: 15,
    marginBottom: 24,
  },

  questionLabel: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    fontSize: 13,
    fontWeight: 900,
  },

  questionDot: {
    width: 9,
    height: 9,
    borderRadius:
      "50%",
  },

  bookmarkBtn: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding:
      "8px 12px",
    borderRadius: 12,
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 800,
  },

  questionText: {
    fontSize: 28,
    lineHeight: 1.5,
    margin: 0,
    fontWeight: 800,
    letterSpacing: -0.2,
  },

  /* -------------------------------------------------------
     Options
  ------------------------------------------------------- */

  options: {
    display: "flex",
    flexDirection:
      "column",
    gap: 14,
    marginTop: 30,
  },

  option: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding:
      "17px 18px",
    borderRadius: 16,
    textAlign:
      "left",
    cursor: "pointer",
    transition:
      "all .18s ease",
  },

  optionLetter: {
    width: 38,
    height: 38,
    minWidth: 38,
    borderRadius: 11,
    display: "flex",
    alignItems: "center",
    justifyContent:
      "center",
    fontWeight: 900,
    fontSize: 14,
  },

  optionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 1.5,
  },

  radio: {
    width: 20,
    height: 20,
    minWidth: 20,
    borderRadius:
      "50%",
    display: "flex",
    alignItems: "center",
    justifyContent:
      "center",
  },

  radioDot: {
    width: 7,
    height: 7,
    background:
      "#FFFFFF",
    borderRadius:
      "50%",
  },

  /* -------------------------------------------------------
     Footer
  ------------------------------------------------------- */

  questionFooter: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems:
      "center",
    gap: 14,
    marginTop: 28,
    paddingTop: 22,
    borderTop:
      "1px solid rgba(148,163,184,.18)",
    flexWrap:
      "wrap",
  },

  footerButtons: {
    display: "flex",
    alignItems:
      "center",
    gap: 10,
    flexWrap:
      "wrap",
  },

  nextBtn: {
    border: "none",
    background:
      "linear-gradient(135deg,#7C3AED,#4C1D95)",
    color: "#FFFFFF",
    padding:
      "13px 21px",
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 900,
    boxShadow:
      "0 10px 25px rgba(124,58,237,.25)",
    cursor: "pointer",
  },

  aiExplainBtn: {
    border:
      "1px solid #7C3AED",
    background:
      "transparent",
    color:
      "#7C3AED",
    padding:
      "13px 18px",
    borderRadius: 14,
    fontSize: 14,
    fontWeight: 900,
    cursor:
      "pointer",
  },

  aiExplanation: {
    width: "100%",
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    lineHeight: 1.6,
    boxSizing:
      "border-box",
  },

  aiExplanationBody: {
    fontSize: 15,
    lineHeight: 1.75,
  },

  aiExplanationParagraph: {
    margin: "0 0 14px",
    whiteSpace: "pre-wrap",
    fontFamily: "inherit",
  },

  aiExplanationList: {
    margin: "0 0 14px",
    paddingLeft: 22,
    display: "grid",
    gap: 8,
  },

  tip: {
    textAlign:
      "center",
    fontSize: 12,
    marginTop: 18,
  },

  /* -------------------------------------------------------
     Loading
  ------------------------------------------------------- */

  loadingContainer: {
    width: "100%",
    maxWidth: 450,
    margin:
      "20vh auto 0",
    textAlign:
      "center",
  },

  loadingIcon: {
    width: 70,
    height: 70,
    borderRadius: 22,
    display: "flex",
    alignItems:
      "center",
    justifyContent:
      "center",
    fontSize: 34,
    margin:
      "0 auto 18px",
  },

  loadingTitle: {
    margin: 0,
    fontSize: 23,
    fontWeight: 900,
  },

  loadingText: {
    marginTop: 7,
  },

  loadingBar: {
    width: "100%",
    height: 7,
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 22,
  },

  loadingBarFill: {
    width: "55%",
    height: "100%",
    borderRadius: 999,
    background:
      "linear-gradient(90deg,#4C1D95,#7C3AED)",
    animation:
      "prepPathLoading 1.2s ease-in-out infinite",
  },

  /* -------------------------------------------------------
     Empty
  ------------------------------------------------------- */

  emptyCard: {
    width: "100%",
    maxWidth: 500,
    margin:
      "15vh auto 0",
    padding: 40,
    borderRadius: 24,
    textAlign:
      "center",
    boxShadow:
      "0 20px 50px rgba(15,23,42,.08)",
  },

  emptyIcon: {
    width: 70,
    height: 70,
    margin:
      "0 auto 18px",
    borderRadius: 22,
    display: "flex",
    alignItems:
      "center",
    justifyContent:
      "center",
    fontSize: 32,
  },

  /* -------------------------------------------------------
     Results
  ------------------------------------------------------- */

  resultsWrap: {
    width: "100%",
    maxWidth: 1040,
    margin: "0 auto",
  },

  resultsHero: {
    position:
      "relative",
    overflow:
      "hidden",
    borderRadius: 28,
    padding:
      "38px 30px",
    textAlign:
      "center",
    color:
      "#FFFFFF",
    boxShadow:
      "0 25px 55px rgba(76,29,149,.25)",
  },

  resultsEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },

  resultsEyebrow: {
    margin: 0,
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: 1.5,
    opacity: 0.8,
  },

  resultsTitle: {
    margin:
      "8px 0",
    fontSize: 36,
    fontWeight: 900,
    color:
      "#FFFFFF",
  },

  resultsSubject: {
    margin: 0,
    fontSize: 14,
    opacity: 0.85,
  },

  scoreCard: {
    marginTop: 18,
    padding: 28,
    borderRadius: 24,
    display: "flex",
    alignItems:
      "center",
    justifyContent:
      "center",
    gap: 45,
    boxShadow:
      "0 15px 40px rgba(15,23,42,.06)",
    flexWrap:
      "wrap",
  },

  scoreCircle: {
    width: 145,
    height: 145,
    borderRadius:
      "50%",
    display: "flex",
    alignItems:
      "center",
    justifyContent:
      "center",
    background:
      "conic-gradient(#7C3AED 0deg,#A855F7 180deg,#E9D5FF 300deg,#7C3AED 360deg)",
    padding: 7,
    boxSizing:
      "border-box",
  },

  scoreCircleInner: {
    width: "100%",
    height: "100%",
    borderRadius:
      "50%",
    display: "flex",
    flexDirection:
      "column",
    alignItems:
      "center",
    justifyContent:
      "center",
  },

  scoreDetails: {
    display: "flex",
    gap: 40,
    alignItems:
      "center",
    flexWrap:
      "wrap",
    justifyContent:
      "center",
  },

  scoreDetail: {
    display: "flex",
    flexDirection:
      "column",
    gap: 4,
  },

  primaryBtn: {
    width: "100%",
    marginTop: 18,
    padding:
      "15px 20px",
    border: "none",
    borderRadius: 15,
    background:
      "linear-gradient(135deg,#7C3AED,#4C1D95)",
    color:
      "#FFFFFF",
    fontWeight: 900,
    fontSize: 16,
    cursor:
      "pointer",
    boxShadow:
      "0 12px 28px rgba(124,58,237,.24)",
  },

  reviewContainer: {
    marginTop: 18,
    borderRadius: 24,
    padding: 26,
    boxShadow:
      "0 15px 40px rgba(15,23,42,.05)",
  },

  reviewHeader: {
    paddingBottom: 20,
    marginBottom: 4,
    borderBottom:
      "1px solid rgba(148,163,184,.18)",
  },

  reviewCard: {
    marginTop: 14,
    padding: 20,
    borderRadius: 18,
  },

  reviewTop: {
    display: "flex",
    alignItems:
      "center",
    gap: 10,
  },

  questionNumber: {
    width: 30,
    height: 30,
    borderRadius: 10,
    color:
      "#FFFFFF",
    display: "flex",
    alignItems:
      "center",
    justifyContent:
      "center",
    fontSize: 12,
    fontWeight: 900,
  },

  answerReview: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: 20,
    marginTop: 14,
  },

  explanation: {
    marginTop: 16,
    padding: 15,
    borderRadius: 14,
  },
};