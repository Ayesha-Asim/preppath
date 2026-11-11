import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { CSSProperties } from "react";

import MainLayout from "./MainLayout";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../lib/supabase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";  

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

// Answer keys are supplied only by the server after an attempt is finalized.

/*
 * Renders AI explanations with real LaTeX support via MathJax.
 * This keeps the fix inside TestRunner.tsx and avoids adding a package.
 */
function normalizeMathMarkdown(content: string) {
  return content
    .replace(/\r\n/g, "\n")
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => {
      return `\n\n$$\n${String(math).trim()}\n$$\n\n`;
    })
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => {
      return `$${String(math).trim()}$`;
    })
    .trim();
}

function MathExplanation({
  text,
  color,
}: {
  text: string;
  color: string;
}) {
  const normalizedContent =
    normalizeMathMarkdown(text);

  return (
    <div
      style={{
        color,
        lineHeight: 1.8,
        fontSize: 15,
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          table: ({ children }) => (
            <div
              style={{
                overflowX: "auto",
                margin: "12px 0",
              }}
            >
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {normalizedContent}
      </ReactMarkdown>
    </div>
  );
}

type SecureQuestion = {
  id: string; question: string; option_a: string; option_b: string;
  option_c: string; option_d: string; position: number;
  selected: number | null; correct_answer: number | null; explanation: string | null;
};
type SecureState = {
  attempt_id: string; subject: string; mode: string; expires_at: string | null;
  finished: boolean; questions: SecureQuestion[]; score: number | null;
};
async function secureRpc<T>(name: string, params: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.rpc(name, params);
  if (error) throw error;
  return data as T;
}
function convertSecureQuestions(items: SecureQuestion[]): Question[] {
  return items.map(q => ({id:q.id, question:q.question,
    options:[q.option_a,q.option_b,q.option_c,q.option_d],
    answer:q.correct_answer ?? -1, explanation:q.explanation ?? ""}));
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

  // Attempt state is restored from the server, not browser-controlled score data.

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

  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

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

  const [timeLeft, setTimeLeft] = useState(initialTime);

  const [resultSaveError, setResultSaveError] =
    useState("");

  const [restoredNotice, setRestoredNotice] =
    useState(false);

  /* =======================================================
     Load or resume a server-owned test
  ======================================================= */
  useEffect(() => {
    let cancelled = false;
    async function loadQuestions() {
      setLoadingQuestions(true);
      try {
        const state = await secureRpc<SecureState>("start_secure_test",
          {p_subject:subject,p_mode:isTimedMode?"timed-mode":is50Questions?"50-questions":"20-questions"});
        if (cancelled) return;
        setAttemptId(state.attempt_id);
        setExpiresAt(state.expires_at);
        setDbQuestions(convertSecureQuestions(state.questions));
        const answers=state.questions.map(q=>q.selected);
        setUserAnswers(answers);
        const next=answers.findIndex(answer=>answer===null);
        setIndex(next===-1?Math.max(0,answers.length-1):next);
        setSelected(next===-1?null:answers[next]);
        setRestoredNotice(answers.some(answer=>answer!==null));
        setFinished(state.finished);
        setScore(state.score??0);
      } catch(error) {
        console.error("Secure test loading failed:",error);
        if (!cancelled) setResultSaveError("Unable to load a secure test. Please retry later.");
      } finally { if(!cancelled) setLoadingQuestions(false); }
    }
    if(user) void loadQuestions(); else setLoadingQuestions(false);
    return ()=>{cancelled=true};
  },[subject,isTimedMode,is50Questions,user?.id]);

  const testQuestions = dbQuestions;

  const current = testQuestions[index];

  // Answers and question order are stored by the server.
  // Browser storage is not trusted for scoring or recovery.

  const committedAnswers = userAnswers.filter(
    (answer) => answer !== null && answer !== undefined
  ).length;

  const answeredCount =
    selected !== null &&
    (userAnswers[index] === null ||
      userAnswers[index] === undefined)
      ? committedAnswers + 1
      : committedAnswers;

  const remainingCount = Math.max(
    testQuestions.length - answeredCount,
    0
  );

  /* =======================================================
     Timed mode uses the server-issued absolute expiry.
  ======================================================= */
  useEffect(() => {
    if (!isTimedMode || !expiresAt || finished || loadingQuestions) return;
    const tick=()=>setTimeLeft(Math.max(0,Math.ceil((Date.parse(expiresAt)-Date.now())/1000)));
    tick(); const timer=window.setInterval(tick,1000);
    return ()=>window.clearInterval(timer);
  },[isTimedMode,expiresAt,finished,loadingQuestions]);
  useEffect(()=>{
    if(isTimedMode && timeLeft===0 && !finished && !saving && attemptId && !resultSaveError)
      void retrySavingResult();
  },[isTimedMode,timeLeft,finished,saving,attemptId,resultSaveError]);

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

  async function saveResult(_finalScore: number): Promise<boolean> {
    if(!attemptId) return false;
    try {
      const state=await secureRpc<SecureState>("finalize_secure_test",{p_attempt_id:attemptId});
      setScore(state.score??0);
      setDbQuestions(convertSecureQuestions(state.questions));
      setFinished(state.finished);
      return state.finished;
    } catch(error){console.error("Secure finalize failed:",error);return false;}
  }

  /* =======================================================
     AI explanation
  ======================================================= */

  async function getAIExplanation() {
  if (!current || selected === null) {
    return;
  }

  setLoadingAIExplanation(true);
  setAiExplanation("");

  try {
    const selectedAnswer =
      current.options[selected];

    const correctAnswer =
      current.answer >= 0 ? current.options[current.answer] : "Not available before finishing";

    // Get the current authenticated session.
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      setAiExplanation(
        "Please sign in again to use AI explanations."
      );
      return;
    }

    const supabaseUrl =
      import.meta.env.VITE_SUPABASE_URL;

    const supabaseAnonKey =
      import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error(
        "Missing Supabase environment variables."
      );

      setAiExplanation(
        "AI explanations are temporarily unavailable."
      );
      return;
    }

    const response = await fetch(
      `${supabaseUrl}/functions/v1/ai-answer-explanation`,
      {
        method: "POST",

        headers: {
          Authorization:
            `Bearer ${session.access_token}`,

          apikey: supabaseAnonKey,

          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          subject,
          question: current.question,
          options: current.options,
          selectedAnswer,
          correctAnswer,
          existingExplanation:
            current.explanation,
        }),
      }
    );

    if (!response.ok) {
      let message =
        "Something went wrong while generating the AI explanation.";

      try {
        const errorData =
          await response.json();

        if (
          typeof errorData?.error === "string"
        ) {
          message = errorData.error;
        }
      } catch {
        // Keep the fallback message.
      }

      throw new Error(message);
    }

    if (!response.body) {
      throw new Error(
        "The AI explanation stream was unavailable."
      );
    }

    const reader =
      response.body.getReader();

    const decoder =
      new TextDecoder();

    let buffer = "";
    let fullExplanation = "";

    while (true) {
      const {
        value,
        done,
      } = await reader.read();

      if (done) {
        break;
      }

      buffer += decoder.decode(value, {
        stream: true,
      });

      /*
       * OpenRouter sends Server-Sent Events.
       * Each event normally looks like:
       *
       * data: {"choices":[{"delta":{"content":"text"}}]}
       */
      const lines = buffer.split("\n");

      // Keep the last potentially incomplete line
      // for the next network chunk.
      buffer = lines.pop() || "";

      for (const line of lines) {
        const trimmed = line.trim();

        if (
          !trimmed ||
          !trimmed.startsWith("data:")
        ) {
          continue;
        }

        const payload =
          trimmed.slice(5).trim();

        if (payload === "[DONE]") {
          continue;
        }

        try {
          const data = JSON.parse(payload);

          const content =
            data?.choices?.[0]?.delta?.content;

          if (
            typeof content === "string" &&
            content
          ) {
            fullExplanation += content;

            // Update React immediately as
            // each piece of text arrives.
            setAiExplanation(
              fullExplanation
            );
          }
        } catch {
          /*
           * Ignore malformed/non-content SSE
           * events rather than breaking the stream.
           */
        }
      }
    }

    // Process a final buffered SSE line,
    // if the stream ended without a newline.
    const finalLine = buffer.trim();

    if (
      finalLine.startsWith("data:")
    ) {
      const payload =
        finalLine.slice(5).trim();

      if (
        payload &&
        payload !== "[DONE]"
      ) {
        try {
          const data = JSON.parse(payload);

          const content =
            data?.choices?.[0]?.delta?.content;

          if (
            typeof content === "string" &&
            content
          ) {
            fullExplanation += content;

            setAiExplanation(
              fullExplanation
            );
          }
        } catch {
          // Ignore an incomplete final event.
        }
      }
    }

    if (!fullExplanation.trim()) {
      setAiExplanation(
        "No explanation was generated."
      );
    }
  } catch (error) {
    console.error(
      "AI explanation error:",
      error
    );

    setAiExplanation(
      error instanceof Error
        ? error.message
        : "Something went wrong while generating the AI explanation."
    );
  } finally {
    setLoadingAIExplanation(false);
  }
}

  /* =======================================================
     Submit answer
  ======================================================= */

  async function submitAnswer() {
    if(selected===null || saving || !current || !attemptId) return;
    setSaving(true);
    try {
      await secureRpc("submit_secure_test_answer",
        {p_attempt_id:attemptId,p_position:index,p_answer:selected});
      const answers=[...userAnswers]; answers[index]=selected;
      setUserAnswers(answers);
      setResultSaveError("");
      if(index<testQuestions.length-1){
        setIndex(index+1);setSelected(answers[index+1]??null);setAiExplanation("");
      }else{
        const saved=await saveResult(0);
        if(!saved) setResultSaveError("Your answer is saved on the server. Retry finishing the test.");
      }
    }catch(error){console.error("Secure answer failed:",error);
      setResultSaveError("Answer could not be saved. Check your connection and retry.");
    }finally{setSaving(false);}
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
    // A retake requires a new server attempt; finalized attempts cannot be modified.
    window.location.reload();
  }

  async function retrySavingResult() {
    if (saving) {
      return;
    }

    setSaving(true);

    try {
      const saved = await saveResult(score);

      if (saved) {
        setResultSaveError("");
        setFinished(true);
      } else {
        setResultSaveError(
          "Still unable to save the result. Your progress remains safe on this device."
        );
      }
    } finally {
      setSaving(false);
    }
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 14,
              flexWrap: "wrap",
              marginBottom: 18,
              padding: "11px 14px",
              borderRadius: 12,
              background: colors.card,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
                fontSize: 12,
              }}
            >
              <strong
                style={{
                  color: colors.text,
                  fontWeight: 800,
                }}
              >
                {answeredCount} of {testQuestions.length} answered
              </strong>

              <span style={{ color: colors.muted }}>•</span>

              <span
                style={{
                  color: colors.muted,
                  fontWeight: 600,
                }}
              >
                {remainingCount} remaining
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: colors.muted,
                fontSize: 11,
                fontWeight: 700,
              }}
              title="Your unfinished test is saved in this browser"
            >
              <span
                aria-hidden="true"
                style={{
                  color: colors.green,
                  fontSize: 12,
                }}
              >
                ✓
              </span>
              Saved
            </div>
          </div>

          {restoredNotice && (
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
              ↻ Your unfinished test was restored. You can continue where you left off.
              <button
                type="button"
                onClick={() => setRestoredNotice(false)}
                style={{
                  marginLeft: 10,
                  border: 0,
                  background: "transparent",
                  color: colors.purple,
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Dismiss
              </button>
            </div>
          )}

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

              {resultSaveError && (
                <div
                  role="alert"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: 14,
                    background: colors.redSoft,
                    border: `1px solid ${colors.red}55`,
                    color: colors.text,
                    fontSize: 13,
                    lineHeight: 1.55,
                    fontWeight: 700,
                  }}
                >
                  {resultSaveError}

                  {isTimedMode && timeLeft === 0 && (
                    <button
                      type="button"
                      onClick={retrySavingResult}
                      disabled={saving}
                      style={{
                        marginLeft: 10,
                        padding: "7px 10px",
                        borderRadius: 10,
                        border: 0,
                        background: colors.purple,
                        color: "#FFFFFF",
                        fontWeight: 900,
                        cursor: saving
                          ? "not-allowed"
                          : "pointer",
                      }}
                    >
                      {saving ? "Retrying..." : "Retry Save"}
                    </button>
                  )}
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
                    selected === null || current.answer < 0 ||
                    loadingAIExplanation ||
                    saving
                  }
                    style={{
                      ...styles.aiExplainBtn,

                      opacity:
                        selected === null || current.answer < 0 ||
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