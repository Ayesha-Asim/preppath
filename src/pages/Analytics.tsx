import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { supabase } from "../lib/supabase";
import { buildAchievements } from "../lib/achievements";
import MainLayout from "../components/MainLayout";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

type Filter =
  | "7 Days"
  | "30 Days"
  | "This Month"
  | "All Time";

type TestResult = {
  id?: string;
  test_name?: string | null;
  subject?: string | null;
  score?: number | string | null;
  total_questions?: number | string | null;
  total?: number | string | null;
  created_at?: string | null;
};

type SubjectSummary = {
  subject: string;
  tests: number;
  questions: number;
  correct: number;
  accuracy: number;
};


// Shared monochrome outline iconography for Analytics.
type AnalyticsIconName = "target" | "clipboard" | "flame" | "help" | "calendar" | "award" | "book" | "alert" | "chart" | "spark" | "rocket" | "arrow" | "crown";
const AnalyticsIcon = ({ name, size = 19 }: { name: AnalyticsIconName; size?: number }) => {
  const paths: Record<AnalyticsIconName, React.ReactNode> = {
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
    clipboard: <><rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4.5h6M9 10h6M9 14h6M9 18h4"/></>,
    flame: <path d="M12 22c4.4 0 7-3 7-7 0-3-2-5-3-6 0 3-2 4-2 4 0-4-2-7-5-10 0 4-4 7-4 12 0 4 2.6 7 7 7Z"/>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4M12 17h.01"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/></>,
    award: <><circle cx="12" cy="8" r="5"/><path d="m8 12-2 9 6-3 6 3-2-9"/></>,
    book: <><path d="M12 6c-3-2-6-2-9-1v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-3-1-6-1-9 1ZM12 6v14"/></>,
    alert: <><path d="M12 3 2 21h20L12 3Z"/><path d="M12 9v5M12 18h.01"/></>,
    chart: <><path d="M4 20V4M4 20h16M7 15l4-4 3 2 5-7"/></>,
    spark: <><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/></>,
    rocket: <><path d="M5 15c1-6 5-10 13-12 1 8-3 12-9 13l-4-1ZM9 16l-1 4-4 1 1-4M14 8h.01"/></>,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6"/>,
    crown: <><path d="m2 7 5 4 5-7 5 7 5-4-2 12H4L2 7Z"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

/* =========================================================
   Helpers
========================================================= */

const safeDate = (value?: string | null) => {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? null
    : date;
};

const startOfDay = (date: Date) => {
  const copy = new Date(date);

  copy.setHours(0, 0, 0, 0);

  return copy;
};

const testAccuracy = (result: TestResult) => {
  const score = Number(result.score || 0);

  const total = Number(
    result.total_questions ??
      result.total ??
      0
  );

  return total > 0
    ? Math.round((score / total) * 100)
    : 0;
};

const average = (values: number[]) => {
  if (!values.length) {
    return 0;
  }

  return Math.round(
    values.reduce(
      (sum, value) => sum + value,
      0
    ) / values.length
  );
};

const shortDate = (
  value?: string | null
) => {
  const date = safeDate(value);

  return date
    ? date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "Unknown";
};

/* =========================================================
   Component
========================================================= */

export default function Analytics() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const colors = {
    page: isDark
      ? "#100D16"
      : "#F4F4FA",

    card: isDark
      ? "#1C1625"
      : "#FFFFFF",

    soft: isDark
      ? "#261D32"
      : "#FAF8FE",

    text: isDark
      ? "#FFFFFF"
      : "#15111C",

    muted: isDark
      ? "#C8BCD3"
      : "#6E6476",

    border: isDark
      ? "rgba(180,150,230,.17)"
      : "#E4DDED",

    grid: isDark
      ? "rgba(200,188,211,.12)"
      : "#E8E0EE",

    purple: "#9561F5",
    purpleSoft: isDark
      ? "rgba(124,58,237,.16)"
      : "#F0E9FF",

    green: "#9561F5",
    orange: "#9561F5",
    red: "#9561F5",
    blue: "#9561F5",
  };

  /* =======================================================
     State
  ======================================================= */

  const [stats, setStats] =
    useState<any>(null);

  const [results, setResults] =
    useState<TestResult[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [filter, setFilter] =
    useState<Filter>("All Time");

  /* =======================================================
     Load analytics
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function fetchAnalytics() {

      setLoading(true);

      try {
        if (!user) {
          if (!cancelled) {
            setStats(null);
            setResults([]);
            setLoading(false);
          }

          return;
        }

        const [
          statsResponse,
          resultsResponse,
        ] = await Promise.all([
          supabase
            .from("user_stats")
            .select("*")
            .eq("user_id", user.id)
            .maybeSingle(),

          supabase
            .from("test_results")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", {
              ascending: true,
            }),
        ]);

        if (statsResponse.error) {
          console.error(
            "Analytics stats error:",
            statsResponse.error.message
          );
        }

        if (resultsResponse.error) {
          console.error(
            "Analytics results error:",
            resultsResponse.error.message
          );
        }

        if (cancelled) {
          return;
        }

        setStats(
          statsResponse.data || null
        );

        setResults(
          (resultsResponse.data ||
            []) as TestResult[]
        );
      } catch (error) {
        console.error(
          "Unexpected analytics error:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchAnalytics();

    return () => {
      cancelled = true;
    };
  }, [user]);

  /* =======================================================
     Date filtering
  ======================================================= */

  const dateRange = useMemo(() => {
    const now = new Date();

    let start: Date | null = null;

    if (filter === "7 Days") {
      start = startOfDay(new Date());
      start.setDate(start.getDate() - 6);
    } else if (filter === "30 Days") {
      start = startOfDay(new Date());
      start.setDate(start.getDate() - 29);
    } else if (
      filter === "This Month"
    ) {
      start = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );
    }

    return {
      start,
      end: now,
    };
  }, [filter]);

  const filteredResults =
    useMemo(() => {
      if (!dateRange.start) {
        return results;
      }

      return results.filter(
        (result) => {
          const date = safeDate(
            result.created_at
          );

          return date
            ? date >=
                dateRange.start! &&
                date <= dateRange.end
            : false;
        }
      );
    }, [results, dateRange]);

  const previousResults =
    useMemo(() => {
      if (
        !dateRange.start ||
        filter === "All Time"
      ) {
        return [];
      }

      const duration =
        dateRange.end.getTime() -
        dateRange.start.getTime();

      const previousEnd =
        new Date(
          dateRange.start.getTime() - 1
        );

      const previousStart =
        new Date(
          previousEnd.getTime() -
            duration
        );

      return results.filter(
        (result) => {
          const date = safeDate(
            result.created_at
          );

          return date
            ? date >= previousStart &&
                date <= previousEnd
            : false;
        }
      );
    }, [results, dateRange, filter]);

  /* =======================================================
     Basic calculations
  ======================================================= */

  const filteredAccuracy =
    average(
      filteredResults.map(
        testAccuracy
      )
    );

  const previousAccuracy =
    average(
      previousResults.map(
        testAccuracy
      )
    );

  const accuracy =
    filter === "All Time"
      ? Number(
          stats?.accuracy ||
            average(
              results.map(
                testAccuracy
              )
            )
        )
      : filteredAccuracy;

  const totalTests =
    filter === "All Time"
      ? Number(
          stats?.total_tests ||
            results.length
        )
      : filteredResults.length;

  const streak =
    Number(stats?.streak || 0);

  const questionsSolved =
    filteredResults.reduce(
      (sum, result) =>
        sum +
        Number(
          result.total_questions ??
            result.total ??
            0
        ),
      0
    );

  const accuracyChange =
    filter !== "All Time" &&
    previousResults.length
      ? accuracy - previousAccuracy
      : null;

  const testChange =
    filter !== "All Time"
      ? filteredResults.length -
        previousResults.length
      : null;

  const previousQuestions =
    previousResults.reduce(
      (sum, result) =>
        sum +
        Number(
          result.total_questions ??
            result.total ??
            0
        ),
      0
    );

  const questionChange =
    filter !== "All Time"
      ? questionsSolved -
        previousQuestions
      : null;

  /* =======================================================
     Subject analytics
  ======================================================= */

  const subjectData =
    useMemo<SubjectSummary[]>(() => {
      const map = new Map<
        string,
        {
          tests: number;
          questions: number;
          correct: number;
        }
      >();

      filteredResults.forEach(
        (result) => {
          const subject =
            result.subject?.trim() ||
            "Unknown";

          const current =
            map.get(subject) || {
              tests: 0,
              questions: 0,
              correct: 0,
            };

          current.tests += 1;

          current.questions +=
            Number(
              result.total_questions ??
                result.total ??
                0
            );

          current.correct +=
            Number(
              result.score || 0
            );

          map.set(
            subject,
            current
          );
        }
      );

      return Array.from(
        map.entries()
      )
        .map(
          ([
            subject,
            values,
          ]) => ({
            subject,
            ...values,

            accuracy:
              values.questions > 0
                ? Math.round(
                    (values.correct /
                      values.questions) *
                      100
                  )
                : 0,
          })
        )
        .sort(
          (a, b) =>
            b.accuracy -
            a.accuracy
        );
    }, [filteredResults]);

  const strongestSubject =
    subjectData[0] || null;

  const weakestSubject =
    subjectData.length > 1
      ? subjectData[
          subjectData.length - 1
        ]
      : null;

  /* =======================================================
     Charts
  ======================================================= */

  const performanceData =
    filteredResults.map(
      (result, index) => ({
        label: shortDate(
          result.created_at
        ),

        accuracy:
          testAccuracy(result),

        name:
          result.test_name ||
          `Test ${index + 1}`,

        subject:
          result.subject ||
          "Unknown",
      })
    );

  /* =======================================================
     Recent tests
  ======================================================= */

  const recentTests = [
    ...filteredResults,
  ]
    .slice(-6)
    .reverse()
    .map(
      (result, index) => ({
        name:
          result.test_name ||
          `Mock Test ${
            filteredResults.length -
            index
          }`,

        subject:
          result.subject ||
          "Unknown",

        score:
          Number(
            result.score || 0
          ),

        total:
          Number(
            result.total_questions ??
              result.total ??
              0
          ),

        accuracy:
          testAccuracy(result),

        date:
          safeDate(
            result.created_at
          )?.toLocaleDateString() ||
          "-",
      })
    );

  /* =======================================================
     Weekly goal 
  ======================================================= */

  const weeklyGoal = 10;

  const weekStart =
    startOfDay(new Date());

  weekStart.setDate(
    weekStart.getDate() - 6
  );

  const weeklyCompleted =
    results.filter((result) => {
      const date = safeDate(
        result.created_at
      );

      return date
        ? date >= weekStart
        : false;
    }).length;

  const weeklyPercent =
    Math.min(
      100,
      Math.round(
        (weeklyCompleted /
          weeklyGoal) *
          100
      )
    );

  /* =======================================================
     Activity heatmap 
  ======================================================= */

  const activityDays =
    useMemo(() => {
      const counts =
        new Map<string, number>();

      results.forEach(
        (result) => {
          const date = safeDate(
            result.created_at
          );

          if (!date) {
            return;
          }

          const key =
            startOfDay(date)
              .toISOString()
              .slice(0, 10);

          counts.set(
            key,
            (counts.get(key) || 0) +
              1
          );
        }
      );

      return Array.from(
        { length: 28 },
        (_, index) => {
          const date =
            startOfDay(
              new Date()
            );

          date.setDate(
            date.getDate() -
              (27 - index)
          );

          const key =
            date
              .toISOString()
              .slice(0, 10);

          return {
            key,
            date,
            count:
              counts.get(key) || 0,
          };
        }
      );
    }, [results]);

  /* =======================================================
     Achievements 
  ======================================================= */

  // Daily badges use the student's local calendar day; permanent badges use all-time results.
  const [badgeDay, setBadgeDay] = useState(() => new Date().toDateString());

  useEffect(() => {
    const refreshDay = () => setBadgeDay(new Date().toDateString());
    const timer = window.setInterval(refreshDay, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const achievements = useMemo(
    () => buildAchievements(results, streak, new Date(badgeDay)),
    [results, streak, badgeDay]
  );

  /* =======================================================
     Smart recommendation 
  ======================================================= */

  const recommendation =
    useMemo(() => {
      if (
        !filteredResults.length
      ) {
        return {
          icon: "rocket",
          title:
            "Complete your first test",
          text:
            "Take a mock test to unlock personalised recommendations.",
        };
      }

      if (
        weakestSubject &&
        weakestSubject.accuracy <
          60
      ) {
        return {
          icon: "target",

          title:
            `Focus on ${weakestSubject.subject}`,

          text:
            `Your current accuracy is ${weakestSubject.accuracy}%. Review incorrect answers before your next attempt.`,
        };
      }

      if (
        accuracyChange !==
          null &&
        accuracyChange > 0
      ) {
        return {
          icon: "chart",

          title:
            "Your performance is improving",

          text:
            `Accuracy increased by ${accuracyChange} percentage point${
              accuracyChange ===
              1
                ? ""
                : "s"
            } compared with the previous period.`,
        };
      }

      if (streak < 3) {
        return {
          icon: "flame",

          title:
            "Build a consistent routine",

          text:
            "Complete one short practice session each day to build your streak.",
        };
      }

      return {
        icon: "spark",

        title:
          "Keep your momentum",

        text:
          "Your performance is steady. Continue practising and reviewing mistakes.",
      };
    }, [
      filteredResults,
      weakestSubject,
      accuracyChange,
      streak,
    ]);

  /* =======================================================
     Shared styles
  ======================================================= */

  const pageStyle: CSSProperties =
    {
      ...styles.page,
      background:
        colors.page,
      color:
        colors.text,
    };

  const cardStyle: CSSProperties =
    {
      ...styles.card,
      background:
        colors.card,
      color:
        colors.text,
      border:
        `1px solid ${colors.border}`,
    };

  const trendText = (
    change: number | null,
    suffix = ""
  ) => {
    if (change === null) {
      return "All-time result";
    }

    if (change === 0) {
      return "No change";
    }

    return `${
      change > 0
        ? "↑"
        : "↓"
    } ${Math.abs(
      change
    )}${suffix} vs previous`;
  };

  /* =======================================================
     Loading
  ======================================================= */

  if (loading) {
    return (
      <MainLayout>
        <div
          style={
            pageStyle
          }
          className="analytics-page"
        >
          <div
            style={{
              minHeight:
                "60vh",

              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              textAlign:
                "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 38,
                  marginBottom: 12,
                }}
              >
                <AnalyticsIcon name="chart" />
              </div>

              <strong
                style={{
                  fontSize: 22,
                }}
              >
                Loading analytics...
              </strong>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  /* =======================================================
     Page
  ======================================================= */

  return (
    <MainLayout>
      <div
        style={pageStyle}
        className="analytics-page"
      >
        {/* Header */}

        <div
          style={styles.topRow}
          className="analytics-top-row"
        >
          <div>
            <p
              style={{
                ...styles.eyebrow,
                color:
                  colors.purple,
              }}
            >
              Performance Center
            </p>

            <h1
              style={
                styles.title
              }
            >
              Analytics
            </h1>
          </div>

          <button
            style={
              styles.topButton
            }
            onClick={() =>
              navigate(
                "/mock-test"
              )
            }
          >
            Start New Test
          </button>
        </div>

        {/* Hero */}

        <div
          style={styles.hero}
          className="analytics-hero"
        >
          <div
            style={
              styles.heroGlow
            }
          />

          <div
            style={
              styles.heroContent
            }
          >
            <span
              style={
                styles.heroBadge
              }
            >
              <AnalyticsIcon name="chart" /> Live performance
              insights
            </span>

            <h2
              style={
                styles.heroTitle
              }
            >
              Turn every mock test
              into a smarter next
              step.
            </h2>

            <p
              style={
                styles.heroText
              }
            >
              "Compare periods, find weak subjects, track consistency, and improve with deeper performance analytics."
            </p>
          </div>

          <div
            style={
              styles.heroScore
            }
          >
            <span>
              Current accuracy
            </span>

            <strong>
              {accuracy}%
            </strong>

            <small>
              {accuracyChange ===
              null
                ? `${results.length} all-time tests`
                : accuracyChange ===
                  0
                ? "No change"
                : `${
                    accuracyChange >
                    0
                      ? "+"
                      : ""
                  }${accuracyChange} points`}
            </small>
          </div>
        </div>

        {/* Filters */}

        <div
          style={
            styles.filterRow
          }
        >
          {(
            [
              "7 Days",
              "30 Days",
              "This Month",
              "All Time",
            ] as Filter[]
          ).map((item) => {

            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                style={{
                  ...styles.filterBtn,

                  background:
                    filter ===
                    item
                      ? colors.purple
                      : colors.soft,

                  color:
                    filter ===
                    item
                      ? "#FFFFFF"
                      : colors.text,

                  border:
                    `1px solid ${
                      filter ===
                      item
                        ? colors.purple
                        : colors.border
                    }`,
                }}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* ================================================
            Overview
        ================================================= */}

        <div
          style={
            styles.overviewGrid
          }
          className="analytics-overview-grid"
        >
          {[
            {
              icon: "target",
              label:
                "Accuracy",
              value:
                `${accuracy}%`,
              helper:
                trendText(
                  accuracyChange,
                  " pts"
                ),
              color:
                colors.purple,
            },

            {
              icon: "clipboard",
              label:
                "Tests",
              value:
                totalTests,
              helper:
                trendText(
                  testChange
                ),
              color:
                colors.blue,
            },

            {
              icon: "flame",
              label:
                "Current Streak",
              value:
                `${streak} day${
                  streak === 1
                    ? ""
                    : "s"
                }`,
              helper:
                streak >= 7
                  ? "Excellent consistency"
                  : "Practice daily",
              color:
                colors.orange,
            },

            {
              icon: "help",
              label:
                "Questions Solved",
              value:
                questionsSolved,
              helper:
                trendText(
                  questionChange
                ),
              color:
                colors.green,
            },
          ].map(
            (metric) => (
              <div
                key={
                  metric.label
                }
                style={
                  cardStyle
                }
              >
                <div
                  style={
                    styles.metricTop
                  }
                >
                  <span
                    style={{
                      ...styles.metricIcon,

                      background:
                        `${metric.color}20`,
                    }}
                  >
                    <AnalyticsIcon name={metric.icon as AnalyticsIconName} size={20} />
                  </span>

                  <small
                    style={{
                      color:
                        colors.muted,
                    }}
                  >
                    {
                      metric.helper
                    }
                  </small>
                </div>

                <p
                  style={{
                    ...styles.metricLabel,

                    color:
                      colors.muted,
                  }}
                >
                  {
                    metric.label
                  }
                </p>

                <strong
                  style={{
                    ...styles.metricValue,

                    color: colors.purple,
                  }}
                >
                  {
                    metric.value
                  }
                </strong>
              </div>
            )
          )}
        </div>

        {/* ================================================
            Weekly Goal
        ================================================= */}

        <div
          style={cardStyle}
        >
          <div
            style={
              styles.inlineRow
            }
          >
            <h2
              style={
                styles.sectionTitle
              }
            >
              <AnalyticsIcon name="target" /> Weekly Goal
            </h2>

            <strong
              style={{
                color:
                  colors.purple,
              }}
            >
              {weeklyPercent}%
            </strong>
          </div>

          <p
            style={{
              color:
                colors.muted,
            }}
          >
            {weeklyCompleted} of{" "}
            {weeklyGoal} tests
            completed
          </p>

          <div
            style={{
              ...styles.progressTrack,

              background: isDark
                ? "rgba(255,255,255,.07)"
                : "#EEE8F2",
            }}
          >
            <div
              style={{
                ...styles.progressFill,

                width:
                  `${weeklyPercent}%`,
              }}
            />
          </div>

          <small
            style={{
              color:
                colors.muted,
            }}
          >
            {Math.max(
              0,
              weeklyGoal -
                weeklyCompleted
            )}{" "}
            remaining
          </small>
        </div>

        {/* ================================================
            ANALYTICS
        ================================================= */}

        <>
            {/* Strongest / Weakest */}

            <div
              style={
                styles.smallGrid
              }
              className="analytics-small-grid"
            >
              <div
                style={
                  cardStyle
                }
              >
                <h2
                  style={
                    styles.sectionTitle
                  }
                >
                  <AnalyticsIcon name="award" /> Strongest
                  Subject
                </h2>

                {strongestSubject ? (
                  <>
                    <strong
                      style={
                        styles.bigSubject
                      }
                    >
                      {
                        strongestSubject.subject
                      }
                    </strong>

                    <p
                      style={{
                        color:
                          colors.green,
                      }}
                    >
                      {
                        strongestSubject.accuracy
                      }
                      % accuracy ·{" "}
                      {
                        strongestSubject.tests
                      }{" "}
                      test
                      {strongestSubject.tests ===
                      1
                        ? ""
                        : "s"}
                    </p>
                  </>
                ) : (
                  <p
                    style={{
                      color:
                        colors.muted,
                    }}
                  >
                    Take a test to
                    unlock this.
                  </p>
                )}
              </div>

              <div
                style={
                  cardStyle
                }
              >
                <h2
                  style={
                    styles.sectionTitle
                  }
                >
                  <AnalyticsIcon name="alert" /> Weakest Subject
                </h2>

                {weakestSubject ? (
                  <>
                    <strong
                      style={
                        styles.bigSubject
                      }
                    >
                      {
                        weakestSubject.subject
                      }
                    </strong>

                    <div
                      style={
                        styles.inlineRow
                      }
                    >
                      <span
                        style={{
                          color:
                            colors.orange,
                        }}
                      >
                        {
                          weakestSubject.accuracy
                        }
                        % accuracy
                      </span>

                      <button
                        type="button"
                        style={
                          styles.smallButton
                        }
                        onClick={() =>
                          navigate(
                            "/mock-test"
                          )
                        }
                      >
                        Practice
                      </button>
                    </div>
                  </>
                ) : (
                  <p
                    style={{
                      color:
                        colors.muted,
                    }}
                  >
                    Complete tests
                    in at least two
                    subjects.
                  </p>
                )}
              </div>
            </div>

            {/* Trend + Gauge */}

            <div
              style={
                styles.chartGrid
              }
              className="analytics-chart-grid"
            >
              <div
                style={
                  cardStyle
                }
              >
                <h2
                  style={
                    styles.sectionTitle
                  }
                >
                  Performance Trend
                </h2>

                <p
                  style={{
                    color:
                      colors.muted,
                  }}
                >
                  Accuracy by
                  completed test
                  date
                </p>

                {performanceData.length ? (
                  <div
                    style={{
                      height: 290,
                    }}
                  >
                    <ResponsiveContainer>
                      <LineChart
                        data={
                          performanceData
                        }
                      >
                        <CartesianGrid
                          stroke={
                            colors.grid
                          }
                          vertical={
                            false
                          }
                        />

                        <XAxis
                          dataKey="label"
                          tick={{
                            fill:
                              colors.muted,
                          }}
                        />

                        <YAxis
                          domain={[
                            0,
                            100,
                          ]}
                          tick={{
                            fill:
                              colors.muted,
                          }}
                          tickFormatter={(
                            value
                          ) =>
                            `${value}%`
                          }
                        />

                        <Tooltip
                          contentStyle={{
                            background:
                              colors.card,

                            border:
                              `1px solid ${colors.border}`,

                            borderRadius:
                              12,

                            color:
                              colors.text,
                          }}
                          formatter={(
                            value
                          ) => [
                            `${value}%`,
                            "Accuracy",
                          ]}
                        />

                        <Line
                          type="monotone"
                          dataKey="accuracy"
                          stroke={
                            colors.purple
                          }
                          strokeWidth={
                            4
                          }
                          dot={{
                            fill:
                              colors.purple,

                            r: 5,
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div
                    style={
                      styles.emptyState
                    }
                  >
                    <AnalyticsIcon name="chart" /> No tests in
                    this period.
                  </div>
                )}
              </div>

              <div
                style={
                  cardStyle
                }
              >
                <h2
                  style={
                    styles.sectionTitle
                  }
                >
                  Accuracy Gauge
                </h2>

                <p
                  style={{
                    color:
                      colors.muted,
                  }}
                >
                  Performance for
                  the selected
                  period
                </p>

                <div
                  style={
                    styles.donutWrap
                  }
                >
                  <div
                    style={{
                      ...styles.donut,

                      background:
                        `conic-gradient(${colors.purple} 0% ${accuracy}%, ${
                          isDark
                            ? "rgba(255,255,255,.07)"
                            : "#EEE8F2"
                        } ${accuracy}% 100%)`,
                    }}
                  >
                    <div
                      style={{
                        ...styles.donutInner,

                        background:
                          colors.card,
                      }}
                    >
                      <strong>
                        {accuracy}%
                      </strong>

                      <span>
                        {accuracy >=
                        80
                          ? "Excellent"
                          : accuracy >=
                            60
                          ? "Good"
                          : accuracy >=
                            40
                          ? "Developing"
                          : "Needs practice"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Performance */}

            <div
              style={cardStyle}
              className="analytics-subject-performance"
            >
              <h2 style={styles.sectionTitle}>
                <AnalyticsIcon name="book" /> Subject Performance
              </h2>

              <p
                style={{
                  color: colors.muted,
                  marginBottom: 22,
                }}
              >
                Accuracy weighted by the number of questions answered
              </p>

              {subjectData.length ? (
                <div className="analytics-subject-list">
                  {subjectData.map((item) => {
                    const barColor = colors.purple;

                    return (
                      <div
                        key={item.subject}
                        className="analytics-subject-item"
                      >
                        <div className="analytics-subject-row">
                          <div className="analytics-subject-copy">
                            <strong
                              className="analytics-subject-name"
                              title={item.subject}
                            >
                              {item.subject}
                            </strong>

                            <small style={{ color: colors.muted }}>
                              {item.tests}{" "}
                              {item.tests === 1 ? "test" : "tests"} ·{" "}
                              {item.questions}{" "}
                              {item.questions === 1
                                ? "question"
                                : "questions"}
                            </small>
                          </div>

                          <strong
                            className="analytics-subject-percent"
                            style={{ color: barColor }}
                          >
                            {item.accuracy}%
                          </strong>
                        </div>

                        <div
                          className="analytics-subject-track"
                          style={{
                            background: isDark
                              ? "rgba(255,255,255,.08)"
                              : "#EEE8F2",
                          }}
                          role="progressbar"
                          aria-label={`${item.subject} accuracy`}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={item.accuracy}
                        >
                          <div
                            className="analytics-subject-fill"
                            style={{
                              width: `${Math.max(
                                0,
                                Math.min(100, item.accuracy)
                              )}%`,
                              background: barColor,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={styles.emptyState}>
                  <AnalyticsIcon name="book" /> No subject data available.
                </div>
              )}
            </div>

            {/* Activity + Achievements */}

            <div
              style={
                styles.chartGrid
              }
              className="analytics-chart-grid"
            >
              <div
                style={
                  cardStyle
                }
              >
                <h2
                  style={
                    styles.sectionTitle
                  }
                >
                  <AnalyticsIcon name="calendar" /> Study Activity
                </h2>

                <p
                  style={{
                    color:
                      colors.muted,
                  }}
                >
                  Tests completed
                  during the last
                  28 days
                </p>

                <div
                  style={
                    styles.heatmap
                  }
                >
                  {activityDays.map(
                    (day) => {
                      const opacity =
                        day.count ===
                        0
                          ? 0
                          : Math.min(
                              0.28 +
                                day.count *
                                  0.22,
                              1
                            );

                      return (
                        <div
                          key={
                            day.key
                          }
                          title={`${day.date.toLocaleDateString()}: ${day.count} test${
                            day.count ===
                            1
                              ? ""
                              : "s"
                          }`}
                          style={{
                            ...styles.heatCell,

                            background:
                              day.count ===
                              0
                                ? colors.soft
                                : `rgba(124,58,237,${opacity})`,

                            border:
                              `1px solid ${colors.border}`,
                          }}
                        />
                      );
                    }
                  )}
                </div>
              </div>

              <div
                style={{ ...cardStyle, minHeight: 0, display: "flex", flexDirection: "column" }}
              >
                <h2
                  style={
                    styles.sectionTitle
                  }
                >
                  <AnalyticsIcon name="award" /> Badge Collection
                </h2>

                <div
                  style={{
                    ...styles.achievementGrid,
                    maxHeight: 290,
                    overflowY: "auto",
                    overscrollBehavior: "contain",
                    paddingRight: 6,
                    scrollbarWidth: "thin",
                    scrollbarColor: `${colors.purple} transparent`,
                  }}
                >
                  {achievements.map(
                    (
                      achievement
                    ) => {
                      const percent =
                        Math.min(
                          100,
                          Math.round(
                            (achievement.current /
                              achievement.target) *
                              100
                          )
                        );

                      return (
                        <div
                          key={
                            achievement.key
                          }
                          style={{
                            ...styles.achievement,

                            background:
                              colors.soft,

                            border:
                              `1px solid ${colors.border}`,

                            opacity:
                              achievement.unlocked
                                ? 1
                                : 0.72,
                          }}
                        >
                          <div
                            style={
                              styles.inlineRow
                            }
                          >
                            <span
                              style={{
                                fontSize:
                                  24,
                              }}
                            >
                              <AnalyticsIcon name={achievement.icon} size={23} />
                            </span>

                            <small
                              style={{
                                color:
                                  achievement.unlocked
                                    ? colors.green
                                    : colors.muted,
                              }}
                            >
                              {achievement.daily ? "Daily · " : ""}{achievement.unlocked ? "Earned" : "In progress"}
                            </small>
                          </div>

                          <strong>{achievement.title}</strong>
                          <small style={{ color: colors.muted }}>{achievement.daily ? "Resets each day" : "Lifetime badge"}</small>

                          <small
                            style={{
                              color:
                                colors.muted,
                            }}
                          >
                            {
                              achievement.current
                            }
                            {achievement.suffix ||
                              ""}{" "}
                            /{" "}
                            {
                              achievement.target
                            }
                            {achievement.suffix ||
                              ""}
                          </small>

                          <div
                            style={{
                              ...styles.miniTrack,

                              background:
                                isDark
                                  ? "rgba(255,255,255,.09)"
                                  : "#EEE8F2",
                            }}
                          >
                            <div
                              style={{
                                ...styles.miniFill,

                                width:
                                  `${percent}%`,

                                background:
                                  achievement.unlocked
                                    ? colors.green
                                    : colors.purple,
                              }}
                            />
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>

            {/* Recommendations */}

            <div
              style={
                styles.chartGrid
              }
              className="analytics-chart-grid"
            >
              <div
                style={
                  cardStyle
                }
              >
                <h2
                  style={
                    styles.sectionTitle
                  }
                >
                  <AnalyticsIcon name="target" /> Recommended
                  Next Steps
                </h2>

                <div
                  style={
                    styles.nextSteps
                  }
                >
                  {weakestSubject && (
                    <button
                      type="button"
                      style={{
                        ...styles.stepCard,

                        background:
                          colors.soft,

                        color:
                          colors.text,

                        border:
                          `1px solid ${colors.border}`,
                      }}
                      onClick={() =>
                        navigate(
                          "/mock-test"
                        )
                      }
                    >
                      <span>
                        <AnalyticsIcon name="book" />
                      </span>

                      <div>
                        <strong>
                          Practice{" "}
                          {
                            weakestSubject.subject
                          }
                        </strong>

                        <p
                          style={{
                            color:
                              colors.muted,
                          }}
                        >
                          Current
                          accuracy:{" "}
                          {
                            weakestSubject.accuracy
                          }
                          %
                        </p>
                      </div>

                      <span
                        style={{
                          color:
                            colors.purple,
                        }}
                      >
                        →
                      </span>
                    </button>
                  )}

                  {streak < 3 && (
                    <button
                      type="button"
                      style={{
                        ...styles.stepCard,

                        background:
                          colors.soft,

                        color:
                          colors.text,

                        border:
                          `1px solid ${colors.border}`,
                      }}
                      onClick={() =>
                        navigate(
                          "/mock-test"
                        )
                      }
                    >
                      <span>
                        <AnalyticsIcon name="flame" />
                      </span>

                      <div>
                        <strong>
                          Build your
                          streak
                        </strong>

                        <p
                          style={{
                            color:
                              colors.muted,
                          }}
                        >
                          Practice daily
                          to reach 3
                          days.
                        </p>
                      </div>

                      <span
                        style={{
                          color:
                            colors.orange,
                        }}
                      >
                        →
                      </span>
                    </button>
                  )}

                  {weeklyCompleted <
                    weeklyGoal && (
                    <button
                      type="button"
                      style={{
                        ...styles.stepCard,

                        background:
                          colors.soft,

                        color:
                          colors.text,

                        border:
                          `1px solid ${colors.border}`,
                      }}
                      onClick={() =>
                        navigate(
                          "/mock-test"
                        )
                      }
                    >
                      <span>
                        <AnalyticsIcon name="clipboard" />
                      </span>

                      <div>
                        <strong>
                          Complete your
                          weekly goal
                        </strong>

                        <p
                          style={{
                            color:
                              colors.muted,
                          }}
                        >
                          {weeklyGoal -
                            weeklyCompleted}{" "}
                          tests
                          remaining.
                        </p>
                      </div>

                      <span
                        style={{
                          color:
                            colors.green,
                        }}
                      >
                        →
                      </span>
                    </button>
                  )}
                </div>
              </div>

              <div
                style={{
                  ...cardStyle,

                  background: isDark
                    ? "linear-gradient(125deg,#281B3D,#1C1625)"
                    : "linear-gradient(135deg,#F0E9FF,#FFFFFF)",
                }}
              >
                <div
                  style={{
                    fontSize: 42,
                  }}
                >
                  <AnalyticsIcon name={recommendation.icon as AnalyticsIconName} size={34} />
                </div>

                <p
                  style={{
                    ...styles.eyebrow,

                    color:
                      colors.purple,
                  }}
                >
                  Smart Recommendation
                </p>

                <h2
                  style={
                    styles.recommendationTitle
                  }
                >
                  {
                    recommendation.title
                  }
                </h2>

                <p
                  style={{
                    color:
                      colors.muted,

                    lineHeight: 1.7,
                  }}
                >
                  {
                    recommendation.text
                  }
                </p>

                <button
                  type="button"
                  style={
                    styles.topButton
                  }
                  onClick={() =>
                    navigate(
                      "/mock-test"
                    )
                  }
                >
                  Start Practising →
                </button>
              </div>
            </div>
          </>

        {/* ================================================
            Recent Tests
        ================================================= */}

        <div
          style={cardStyle}
        >
          <h2
            style={
              styles.sectionTitle
            }
          >
            Recent Tests
          </h2>

          {recentTests.length ? (
            <div
              style={
                styles.tableWrap
              }
            >
              <div
                className="analytics-table-header"
                style={{
                  ...styles.tableHeader,

                  color:
                    colors.muted,

                  borderBottom:
                    `1px solid ${colors.border}`,
                }}
              >
                <span>
                  Test
                </span>

                <span>
                  Subject
                </span>

                <span>
                  Score
                </span>

                <span>
                  Accuracy
                </span>

                <span>
                  Date
                </span>
              </div>

              {recentTests.map(
                (
                  test,
                  index
                ) => (
                 <div
                    key={`${test.name}-${index}`}
                    className="analytics-table-row"
                    style={{
                      ...styles.tableRow,

                      borderBottom:
                        index ===
                        recentTests.length -
                          1
                          ? "none"
                          : `1px solid ${colors.border}`,
                    }}
                  >
                    <strong>
                      {
                        test.name
                      }
                    </strong>

                    <span>
                      {
                        test.subject
                      }
                    </span>

                    <span>
                      {
                        test.score
                      }
                      /
                      {
                        test.total
                      }
                    </span>

                    <strong
                      style={{
                        color:
                          test.accuracy >=
                          75
                            ? colors.green
                            : test.accuracy >=
                              50
                            ? colors.orange
                            : colors.red,
                      }}
                    >
                      {
                        test.accuracy
                      }
                      %
                    </strong>

                    <span
                      style={{
                        color:
                          colors.muted,
                      }}
                    >
                      {
                        test.date
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          ) : (
            <div
              style={
                styles.emptyState
              }
            >
              <AnalyticsIcon name="clipboard" /> No recent tests.
            </div>
          )}
        </div>

        {/* Responsive CSS */}

        <style>{`
          .analytics-page h2 svg, .analytics-page .analytics-hero svg { vertical-align: -3px; margin-right: 5px; color: #B79AFF; }
          .analytics-page {
            width: 100%;
            box-sizing: border-box;
          }

          @media (max-width: 1150px) { .analytics-overview-grid { grid-template-columns: repeat(2,minmax(0,1fr)) !important; } }
          @media (max-width: 580px) { .analytics-overview-grid { grid-template-columns: 1fr !important; } }
          .analytics-overview-grid > div,
          .analytics-small-grid > div,
          .analytics-chart-grid > div {
            transition:
              transform .2s ease,
              box-shadow .2s ease,
              border-color .2s ease;
          }

          .analytics-overview-grid > div:hover,
          .analytics-small-grid > div:hover,
          .analytics-chart-grid > div:hover {
            transform: translateY(-3px);
            border-color: rgba(124,58,237,.34) !important;
            box-shadow: 0 22px 44px rgba(76,29,149,.13) !important;
          }

          .analytics-hero strong {
            font-size: 42px;
            font-weight: 950;
            line-height: 1;
          }

          /* Subject Performance */
          .analytics-subject-performance {
            min-width: 0;
            overflow: hidden;
          }

          .analytics-subject-list {
            display: grid;
            gap: 22px;
            width: 100%;
            min-width: 0;
          }

          .analytics-subject-item {
            width: 100%;
            min-width: 0;
          }

          .analytics-subject-row {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 16px;
            width: 100%;
            min-width: 0;
            margin-bottom: 10px;
          }

          .analytics-subject-copy {
            display: grid;
            gap: 4px;
            min-width: 0;
            flex: 1 1 auto;
          }

          .analytics-subject-name {
            display: block;
            min-width: 0;
            font-size: 14px;
            line-height: 1.4;
            overflow-wrap: anywhere;
          }

          .analytics-subject-copy small {
            font-size: 11px;
            line-height: 1.4;
          }

          .analytics-subject-percent {
            flex: 0 0 auto;
            font-size: 16px;
            line-height: 1.3;
            white-space: nowrap;
          }

          .analytics-subject-track {
            width: 100%;
            height: 12px;
            border-radius: 999px;
            overflow: hidden;
          }

          .analytics-subject-fill {
            height: 100%;
            min-width: 2px;
            border-radius: inherit;
            transition: width .35s ease;
          }

          @media (max-width: 1050px) {
            .analytics-chart-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 820px) {
            .analytics-page {
              padding: 28px 22px !important;
            }

            .analytics-top-row,
            .analytics-hero {
              flex-direction: column;
              align-items: stretch !important;
            }

            .analytics-hero > div:last-child {
              min-width: 0 !important;
              width: 100%;
              box-sizing: border-box;
            }
          }

          @media (max-width: 560px) {
            .analytics-page {
              padding: 22px 14px !important;
            }

            .analytics-hero {
              width: 100% !important;
              max-width: 100% !important;
              min-width: 0 !important;
              box-sizing: border-box !important;

              padding: 22px 18px !important;
              border-radius: 22px !important;

              display: flex !important;
              flex-direction: column !important;
              align-items: stretch !important;

              overflow: hidden !important;
            }

            .analytics-hero > * {
              min-width: 0 !important;
              max-width: 100% !important;
              box-sizing: border-box !important;
            }

            .analytics-hero > div:last-child {
              width: 100% !important;
              min-width: 0 !important;
              max-width: 100% !important;
            }

            .analytics-hero h2,
            .analytics-hero p,
            .analytics-hero span,
            .analytics-hero small {
              max-width: 100% !important;
              overflow-wrap: anywhere;
              word-break: normal;
            }

            .analytics-overview-grid,
            .analytics-small-grid,
            .analytics-chart-grid {
              grid-template-columns: 1fr !important;
            }

            .analytics-subject-performance {
              padding: 18px 16px !important;
            }

            .analytics-subject-list {
              gap: 20px;
            }

            .analytics-subject-row {
              gap: 10px;
            }

            .analytics-subject-name {
              font-size: 13px;
            }

            .analytics-subject-percent {
              font-size: 14px;
            }

            .analytics-subject-track {
              height: 10px;
            }

            /* Mobile Recent Tests */
            .analytics-page .analytics-table-header {
              display: none !important;
            }

            .analytics-page .analytics-table-row {
              grid-template-columns: minmax(0, 1fr) auto !important;
              gap: 6px 12px !important;
              align-items: center !important;
              padding: 14px 0 !important;

              width: 100% !important;
              min-width: 0 !important;
              max-width: 100% !important;
              box-sizing: border-box !important;
            }

            .analytics-page .analytics-table-row > :nth-child(1) {
              grid-column: 1;
              grid-row: 1;
              min-width: 0;
              font-size: 13px;
            }

            .analytics-page .analytics-table-row > :nth-child(2) {
              grid-column: 1;
              grid-row: 2;
              min-width: 0;
              font-size: 11px;
              white-space: normal;
              overflow-wrap: anywhere;
            }

            .analytics-page .analytics-table-row > :nth-child(3) {
              grid-column: 1;
              grid-row: 3;
              font-size: 11px;
            }

            .analytics-page .analytics-table-row > :nth-child(4) {
              grid-column: 2;
              grid-row: 1;
              text-align: right;
              font-size: 16px;
            }

            .analytics-page .analytics-table-row > :nth-child(5) {
              grid-column: 2;
              grid-row: 2 / span 2;
              align-self: center;
              text-align: right;
              white-space: nowrap;
              font-size: 10px;
            }

            .analytics-hero > div:first-child {
              display: none !important;
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
  page: {
    padding: "28px 32px",
    minHeight: "100vh",

    transition:
      "background 0.25s ease, color 0.25s ease",
  },

  topRow: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems:
      "center",

    gap: 18,
    marginBottom: "16px",
  },

  eyebrow: {
    margin: 0,

    fontSize: 12,

    fontWeight: 900,

    letterSpacing:
      0.8,

    textTransform:
      "uppercase",
  },

  title: {
    margin:
      "6px 0 0",
    fontSize: 32,
    fontWeight: 800,
  },

  topButton: {
    background:
      "linear-gradient(135deg,#7D3FE4,#6130B6)",

    color:
      "#FFFFFF",

    border:
      "none",

    borderRadius: 14,

    padding:
      "12px 18px",

    cursor:
      "pointer",

    fontWeight: 900,
  },

  hero: {
    position:
      "relative",

    overflow:
      "hidden",

    background:
      "linear-gradient(112deg,#2A1942 0%,#3A2064 60%,#54319B 100%)",

    color:
      "#FFFFFF",
    padding: "22px 26px",
    borderRadius: 20,
    marginBottom: "18px",
    boxShadow: "none",

    display: "flex",

    justifyContent:
      "space-between",

    alignItems:
      "center",
    gap: "16px",
  },

  heroGlow: {
    position:
      "absolute",

    width: 240,

    height: 240,

    borderRadius:
      "50%",
    background: "rgba(167,126,255,.09)",

    right: -80,

    top: -100,
  },

  heroContent: {
    position:
      "relative",

    zIndex: 1,

    maxWidth: 780,
  },

  heroBadge: {
    display:
      "inline-flex",
    padding: "6px 10px",

    borderRadius: 999,

    background:
      "rgba(255,255,255,0.14)",

    border:
      "1px solid rgba(255,255,255,0.28)",
    fontSize: 11,

    fontWeight: 800,
    marginBottom: "10px",
  },

  heroTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 800,

    lineHeight: 1.2,
  },

  heroText: {
    margin: "8px 0 0",

    opacity: 0.92,

    lineHeight: 1.5,
    fontSize: 13,
  },

  heroScore: {
    position:
      "relative",

    zIndex: 1,
    minWidth: 150,
    padding: 16,
    borderRadius: 14,
    background: "rgba(255,255,255,.08)",

    border:
      "1px solid rgba(255,255,255,0.26)",

    display: "flex",

    flexDirection:
      "column",

    textAlign:
      "center",

    gap: 5,
  },

  filterRow: {
    display: "flex",

    gap: 10,

    flexWrap:
      "wrap",
    marginBottom: "16px",
  },

  filterBtn: {
    padding: "8px 12px",

    borderRadius: 999,

    cursor:
      "pointer",
    fontWeight: 700,
  },

  overviewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,minmax(0,1fr))",
    gap: 12,
    marginBottom: "16px",
  },

  smallGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",
    gap: 12,
    marginBottom: "16px",
  },

  card: {
    padding: 18,
    borderRadius: 18,
    boxShadow: "none",
    marginBottom: 16,
  },

  metricTop: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems:
      "center",

    gap: 12,
    marginBottom: 10,
  },

  metricIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,

    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",
    fontSize: 19,
  },

  metricLabel: {
    margin: 0,

    fontSize: 14,

    fontWeight: 800,
  },

  metricValue: {
    display: "block",

    marginTop: 9,
    fontSize: 27,
    fontWeight: 800,
  },

  sectionTitle: {
    margin:
      "0 0 12px",
    fontSize: 19,
    fontWeight: 800,
  },

  bigSubject: {
    display: "block",
    fontSize: 20,

    marginBottom: 10,
  },

  inlineRow: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems:
      "center",

    gap: 12,
  },

  smallButton: {
    background:
      "rgba(124,58,237,0.14)",

    color:
      "#9561F5",

    border:
      "1px solid rgba(124,58,237,0.25)",

    borderRadius: 10,

    padding:
      "8px 12px",

    cursor:
      "pointer",

    fontWeight: 800,
  },

  progressTrack: {
    width: "100%",

    height: 11,

    borderRadius: 999,

    overflow:
      "hidden",

    marginBottom: 10,
  },

  progressFill: {
    height: "100%",

    borderRadius: 999,

    background:
      "linear-gradient(90deg,#7541D8,#A477FF)",
  },

  chartGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(390px,1fr))",
    gap: 12,
    marginBottom: "16px",
  },

  donutWrap: {
    minHeight: 220,

    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",
  },

  donut: {
    width: 190,

    height: 190,

    borderRadius:
      "50%",

    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",
  },

  donutInner: {
    width: 126,

    height: 126,

    borderRadius:
      "50%",

    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

    flexDirection:
      "column",

    gap: 5,
  },

  emptyState: {
    minHeight: 160,

    display: "flex",

    justifyContent:
      "center",

    alignItems:
      "center",

    fontSize: 18,
  },

  heatmap: {
    display: "grid",

    gridTemplateColumns:
      "repeat(7,1fr)",

    gap: 8,
  },

  heatCell: {
    width: "100%",

    aspectRatio: "1",

    borderRadius: 7,
  },

  achievementGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(2,minmax(0,1fr))",

    gap: 12,
  },

  achievement: {
    padding: 14,

    borderRadius: 16,

    display: "flex",

    flexDirection:
      "column",

    gap: 7,
  },

  miniTrack: {
    height: 7,

    borderRadius: 999,

    overflow:
      "hidden",
  },

  miniFill: {
    height: "100%",

    borderRadius: 999,
  },

  nextSteps: {
    display: "flex",

    flexDirection:
      "column",

    gap: 12,
  },

  stepCard: {
    display: "grid",

    gridTemplateColumns:
      "42px 1fr auto",

    alignItems:
      "center",

    gap: 12,

    padding: 14,

    borderRadius: 16,

    cursor:
      "pointer",

    textAlign:
      "left",

    width: "100%",
  },

  recommendationTitle: {
    margin:
      "8px 0",

    fontSize: 25,

    fontWeight: 900,
  },

  tableWrap: {
    overflowX:
      "auto",
  },

  tableHeader: {
    display: "grid",

    gridTemplateColumns:
      "1.5fr 1fr 0.8fr 0.8fr 1fr",

    gap: 12,

    minWidth: 680,

    padding:
      "10px 0",

    fontSize: 12,

    fontWeight: 900,

    textTransform:
      "uppercase",
  },

  tableRow: {
    display: "grid",

    gridTemplateColumns:
      "1.5fr 1fr 0.8fr 0.8fr 1fr",

    gap: 12,

    minWidth: 680,

    padding:
      "14px 0",

    alignItems:
      "center",

    fontSize: 14,
  },
};