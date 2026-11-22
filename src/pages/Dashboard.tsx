import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";

import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import MainLayout from "../components/MainLayout";

import RecentTests from "../components/dashboard/RecentTests";
import PerformanceChart from "../components/dashboard/PerformanceChart";
import SubjectPerformance from "../components/dashboard/SubjectPerformance";
import PerformanceSummary from "../components/dashboard/PerformanceSummary";
import StudyActivity from "../components/dashboard/StudyActivity";
import StudyInsights from "../components/dashboard/StudyInsights";

type Stats = {
  accuracy: number;
  streak: number;
  total_tests: number;
  tasks?: string[];
  completed_tasks?: number[];
};

type TestResult = {
  id: string;
  user_id: string;
  subject: string;
  score: number;
  total_questions: number;
  correct_answers?: number;
  created_at: string;
};

type UpcomingExam = {
  id?: string;
  exam_name: string;
  exam_date: string;
};

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const palette = {
    page: isDark ? "#09070F" : "#F4F4FA",
    card: isDark ? "#17101F" : "#FFFFFF",
    cardAlt: isDark ? "#21152D" : "#FAF8FE",
    text: isDark ? "#FFFFFF" : "#15111C",
    muted: isDark ? "#C8BCD3" : "#6E6476",
    border: isDark ? "rgba(171,132,255,.17)" : "#E4DDED",
    purple: "#7C3AED",
    purpleText: isDark ? "#A78BFA" : "#6D28D9",
    purpleStrong: "#4C1D95",
    purpleSoft: isDark ? "rgba(124,58,237,.16)" : "#F0E9FF",
    green: "#22C55E",
    orange: "#F97316",
    blue: "#38BDF8",
    red: "#EF4444",
  };

  const [stats, setStats] = useState<Stats>({
    accuracy: 0,
    streak: 0,
    total_tests: 0,
    tasks: [],
    completed_tasks: [],
  });

  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");
  const [completed, setCompleted] = useState<number[]>([]);
  const [recentTests, setRecentTests] = useState<TestResult[]>([]);
  const [allTests, setAllTests] = useState<TestResult[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [nextExam, setNextExam] = useState<UpcomingExam | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchAll = async () => {
      const { error: ensureStatsError } = await supabase.rpc(
        "ensure_my_user_stats"
      );

      if (ensureStatsError) {
        console.error("Could not initialize study stats:", ensureStatsError);
      }

      const { data: statsData, error: statsError } = await supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (statsError) {
        console.error("Could not load study stats:", statsError);
      }

      if (statsData) {
        setStats({
          accuracy: Number(statsData.accuracy) || 0,
          streak: Number(statsData.streak) || 0,
          total_tests: Number(statsData.total_tests) || 0,
          tasks: statsData.tasks || [],
          completed_tasks: statsData.completed_tasks || [],
        });

        setTasks(statsData.tasks || []);
        setCompleted(statsData.completed_tasks || []);
      }

      const { data: testsData, error: testsError } = await supabase
        .from("test_results")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (testsError) {
        console.error("Test results error:", testsError);
      }

      const tests = (testsData || []) as TestResult[];

      setAllTests(tests);
      setRecentTests(tests.slice(0, 5));

      const totalQ = tests.reduce(
        (sum, test) => sum + (Number(test.total_questions) || 0),
        0
      );

      setTotalQuestions(totalQ);

      const now = new Date();
      const today = [
        now.getFullYear(),
        String(now.getMonth() + 1).padStart(2, "0"),
        String(now.getDate()).padStart(2, "0"),
      ].join("-");

      const { data: examData, error: examError } = await supabase
        .from("upcoming_exams")
        .select("*")
        .eq("user_id", user.id)
        .gte("exam_date", today)
        .order("exam_date", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (examError) {
        console.error("Upcoming exam error:", examError);
      }

      setNextExam(examData || null);
    };

    fetchAll();
  }, [user]);

  const addTask = async () => {
    if (!newTask.trim() || !user) return;

    const updatedTasks = [...tasks, newTask.trim()];

    const { error } = await supabase.rpc("update_my_study_tasks", {
      p_tasks: updatedTasks,
      p_completed_tasks: completed,
    });

    if (error) {
      console.error("Error saving study task:", error);
      alert("Could not save your task. Please try again.");
      return;
    }

    setTasks(updatedTasks);
    setNewTask("");
  };

  const toggleTask = async (index: number) => {
    if (!user) return;

    const updatedCompleted = completed.includes(index)
      ? completed.filter((i) => i !== index)
      : [...completed, index];

    const { error } = await supabase.rpc("update_my_study_tasks", {
      p_tasks: tasks,
      p_completed_tasks: updatedCompleted,
    });

    if (error) {
      console.error("Error updating study task:", error);
      alert("Could not update your task. Please try again.");
      return;
    }

    setCompleted(updatedCompleted);
  };

  const removeTask = async (index: number) => {
    if (!user) return;

    const updatedTasks = tasks.filter((_, i) => i !== index);
    const updatedCompleted = completed
      .filter((i) => i !== index)
      .map((i) => (i > index ? i - 1 : i));

    const { error } = await supabase.rpc("update_my_study_tasks", {
      p_tasks: updatedTasks,
      p_completed_tasks: updatedCompleted,
    });

    if (error) {
      console.error("Error deleting study task:", error);
      alert("Could not delete your task. Please try again.");
      return;
    }

    setTasks(updatedTasks);
    setCompleted(updatedCompleted);
  };

  const getDaysLeft = (dateString: string) => {
    const today = new Date();
    const examDate = new Date(`${dateString}T00:00:00`);

    today.setHours(0, 0, 0, 0);
    examDate.setHours(0, 0, 0, 0);

    return Math.ceil(
      (examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";

    return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completed.length / tasks.length) * 100);

  const averageRecent = useMemo(() => {
    if (recentTests.length === 0) return 0;

    const total = recentTests.reduce((sum, test) => {
      const questions = Number(test.total_questions) || 0;
      const score = Number(test.score) || 0;

      return sum + (questions > 0 ? Math.round((score / questions) * 100) : 0);
    }, 0);

    return Math.round(total / recentTests.length);
  }, [recentTests]);

  const greeting =
    stats.streak >= 7
      ? "Your consistency is paying off."
      : stats.total_tests > 0
      ? "Ready for another focused session?"
      : "Your prep journey starts here.";

  const daysLeft = nextExam ? getDaysLeft(nextExam.exam_date) : null;

  const quickActions = [
    {
      label: "University match",
      description: "See where your score fits",
      icon: "◎",
      route: "/university-match",
    },
    {
      label: "Exam tracker",
      description: "Keep deadlines in sight",
      icon: "◫",
      route: "/exam-tracker",
    },
  ];

  const metricCards = [
    {
      label: "Mock tests",
      value: stats.total_tests,
      helper: "Total attempts",
      icon: "01",
      accent: palette.purple,
    },
    {
      label: "Accuracy",
      value: `${Math.round(stats.accuracy)}%`,
      helper: "Overall accuracy",
      icon: "0f2",
      accent: palette.blue,
    },
    {
      label: "Study streak",
      value: `${stats.streak} ${stats.streak === 1 ? "day" : "days"}`,
      helper: stats.streak > 0 ? "Keep it going" : "Start your streak",
      icon: "03",
      accent: palette.orange,
    },
    {
      label: "Questions",
      value: totalQuestions.toLocaleString(),
      helper: "Across all test attempts",
      icon: "04",
      accent: palette.green,
    },
  ];

  const cardStyle: CSSProperties = {
    background: palette.card,
    border: `1px solid ${palette.border}`,
    borderRadius: 22,
    boxShadow: isDark
      ? "0 12px 36px rgba(0,0,0,.14)"
      : "0 12px 36px rgba(20,20,35,.045)",
  };

  return (
    <MainLayout>
      <div
        className="preppath-dashboard-page"
        style={{
          minHeight: "100vh",
          background: palette.page,
          color: palette.text,
        }}
      >
        <div className="preppath-dashboard-container">
          {/* Header */}
          <header className="preppath-dashboard-header">
            <div>
              <div
                style={{
                  color: palette.purpleText,
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 1.3,
                  textTransform: "uppercase",
                }}
              >
                Dashboard
              </div>

              <h1
                className="preppath-dashboard-title"
                style={{
                  margin: "7px 0 0",
                  fontSize: 34,
                  letterSpacing: -1.1,
                  lineHeight: 1.08,
                  fontWeight: 850,
                }}
              >
                Welcome back 👋
              </h1>

              <p
                style={{
                  margin: "9px 0 0",
                  color: palette.muted,
                  fontSize: 14,
                }}
              >
                A clean view of your preparation, progress, and next target.
              </p>
            </div>

          </header>

          {/* Hero */}
          <section
            className="preppath-dashboard-hero"
            style={{
              background: isDark
                ? "linear-gradient(135deg,#171126 0%,#241647 58%,#182138 100%)"
                : "linear-gradient(135deg,#F3EEFF 0%,#ECE5FF 56%,#EBF4FF 100%)",
              border: `1px solid ${
                isDark ? "rgba(139,109,246,.23)" : "#E4DBFF"
              }`,
            }}
          >
            <div className="preppath-hero-copy">
              <div
                className="preppath-hero-pill"
                style={{
                  color: isDark ? "#D7CAFF" : "#6746D8",
                  background: isDark
                    ? "rgba(139,109,246,.12)"
                    : "rgba(117,87,232,.09)",
                  border: `1px solid ${
                    isDark ? "rgba(139,109,246,.2)" : "rgba(117,87,232,.12)"
                  }`,
                }}
              >
                <span>●</span>
                Study mode
              </div>

              <h2
                className="preppath-hero-title"
                style={{ color: palette.text }}
              >
                {greeting}
              </h2>

              <p
                className="preppath-hero-text"
                style={{ color: palette.muted }}
              >
                You’ve solved <strong style={{ color: palette.text }}>{totalQuestions}</strong>{" "}
                questions with{" "}
                <strong style={{ color: palette.text }}>
                  {Math.round(stats.accuracy)}%
                </strong>{" "}
                overall accuracy.
              </p>

              <div className="preppath-hero-actions">
                <button
                  onClick={() => navigate("/mock-test")}
                  style={{
                    border: "none",
                    background: palette.purple,
                    color: "#fff",
                  }}
                >
                  Start practice
                  <span>→</span>
                </button>
              </div>
            </div>

            <div
              className="preppath-hero-score"
              style={{
                background: isDark
                  ? "rgba(13,15,23,.55)"
                  : "rgba(255,255,255,.72)",
                border: `1px solid ${
                  isDark ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.9)"
                }`,
              }}
            >
              <span style={{ color: palette.muted }}>Recent average</span>
              <strong>{averageRecent}%</strong>

              <div
                className="preppath-score-track"
                style={{
                  background: isDark ? "#352044" : "#E4D8FA",
                }}
              >
                <div
                  style={{
                    width: `${Math.max(0, Math.min(100, averageRecent))}%`,
                    background: palette.purple,
                  }}
                />
              </div>

              <small style={{ color: palette.muted }}>
                {recentTests.length > 0
                  ? `Across your last ${recentTests.length} tests`
                  : "Complete a test to see your average"}
              </small>
            </div>
          </section>

          {/* Metrics */}
          <section className="preppath-metrics-grid">
            {metricCards.map((card) => (
              <div
                key={card.label}
                className="preppath-metric-card"
                style={{
                  ...cardStyle,
                  color: palette.text,
                  cursor: "default",
                }}
              >
                <div className="preppath-metric-top">
                  <span
                    className="preppath-metric-index"
                    style={{
                      color: card.accent,
                      background: `${card.accent}16`,
                    }}
                  >
                    {card.icon}
                  </span>
                  <span style={{ color: palette.muted }}>{card.helper}</span>
                </div>

                <div
                  className="preppath-metric-label"
                  style={{ color: palette.muted }}
                >
                  {card.label}
                </div>

                <div className="preppath-metric-value">{card.value}</div>
              </div>
            ))}
          </section>

          {/* Quick Actions */}
          <section className="preppath-section">
            <div className="preppath-section-heading">
              <div>
                <h2>Quick actions</h2>
                <p style={{ color: palette.muted }}>
                  Jump back into the things you use most.
                </p>
              </div>
            </div>

            <div className="preppath-actions-grid">
              {quickActions.map((item) => (
                <button
                  key={item.label}
                  className="preppath-action-card"
                  onClick={() => navigate(item.route)}
                  style={{
                    ...cardStyle,
                    color: palette.text,
                  }}
                >
                  <span
                    className="preppath-action-icon"
                    style={{
                      background: palette.purpleSoft,
                      color: palette.purple,
                    }}
                  >
                    {item.icon}
                  </span>

                  <span className="preppath-action-copy">
                    <strong>{item.label}</strong>
                    <small style={{ color: palette.muted }}>
                      {item.description}
                    </small>
                  </span>

                  <span
                    className="preppath-action-arrow"
                    style={{ color: palette.muted }}
                  >
                    →
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Main Grid */}
          <section className="preppath-dashboard-main-grid">
            {/* Today's plan */}
            <div
              className="preppath-panel"
              style={{
                ...cardStyle,
                color: palette.text,
              }}
            >
              <div className="preppath-panel-header">
                <div>
                  <h2>Study plan</h2>
                  <p style={{ color: palette.muted }}>
                    Set focused study goals and track your progress.
                  </p>
                </div>

                <span
                  className="preppath-progress-badge"
                  style={{
                    background:
                      progress === 100
                        ? `${palette.green}16`
                        : palette.purpleSoft,
                    color:
                      progress === 100
                        ? (isDark ? "#86EFAC" : "#15803D")
                        : palette.purple,
                  }}
                >
                  {completed.length}/{tasks.length} complete
                </span>
              </div>

              <div className="preppath-progress-row">
                <div
                  className="preppath-progress-ring"
                  style={{
                    background: `conic-gradient(
                      ${progress === 100 ? palette.green : palette.purple}
                      0% ${progress}%,
                      ${isDark ? "#282B38" : "#ECECF2"} ${progress}% 100%
                    )`,
                  }}
                >
                  <div
                    style={{
                      background: palette.card,
                      color: palette.text,
                    }}
                  >
                    <strong>{progress}%</strong>
                    <span style={{ color: palette.muted }}>done</span>
                  </div>
                </div>

                <div className="preppath-task-entry">
                  <label style={{ color: palette.muted }}>
                    Add a study task
                  </label>

                  <div className="preppath-task-input-row">
                    <input
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addTask();
                      }}
                      placeholder="e.g. Revise logarithms"
                      style={{
                        background: palette.cardAlt,
                        border: `1px solid ${palette.border}`,
                        color: palette.text,
                      }}
                    />

                    <button
                      onClick={addTask}
                      style={{
                        border: "none",
                        background: palette.purple,
                        color: "#fff",
                      }}
                    >
                      Add
                    </button>
                  </div>

                  <small style={{ color: palette.muted }}>
                    Tip: make each task specific enough to finish in one sitting.
                  </small>
                </div>
              </div>

              <div className="preppath-task-list">
                {tasks.length === 0 ? (
                  <div
                    className="preppath-empty-state"
                    style={{
                      background: palette.cardAlt,
                      border: `1px dashed ${palette.border}`,
                    }}
                  >
                    <div>✦</div>
                    <strong>Your study list is empty</strong>
                    <p style={{ color: palette.muted }}>
                      Add a few study goals to get started.
                    </p>
                  </div>
                ) : (
                  tasks.map((task, index) => {
                    const isDone = completed.includes(index);

                    return (
                      <div
                        key={`${task}-${index}`}
                        className="preppath-task-row"
                        style={{
                          background: isDone
                            ? `${palette.green}0B`
                            : palette.cardAlt,
                          border: `1px solid ${
                            isDone ? `${palette.green}2A` : palette.border
                          }`,
                        }}
                      >
                        <label>
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => toggleTask(index)}
                          />

                          <span
                            style={{
                              color: isDone ? palette.muted : palette.text,
                              textDecoration: isDone ? "line-through" : "none",
                            }}
                          >
                            {task}
                          </span>
                        </label>

                        <button
                          className="preppath-task-delete"
                          onClick={() => removeTask(index)}
                          aria-label={`Delete ${task}`}
                          style={{
                            color: palette.red,
                            background: `${palette.red}0D`,
                            border: `1px solid ${palette.red}20`,
                          }}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Exam */}
            <div
              className="preppath-panel preppath-exam-panel"
              style={{
                ...cardStyle,
                color: palette.text,
              }}
            >
              <div className="preppath-panel-header">
                <div>
                  <h2>Next exam</h2>
                  <p style={{ color: palette.muted }}>
                    Your nearest deadline.
                  </p>
                </div>

                <span
                  className="preppath-calendar-icon"
                  style={{
                    color: palette.purple,
                    background: palette.purpleSoft,
                  }}
                >
                  ◫
                </span>
              </div>

              {nextExam ? (
                <div className="preppath-exam-content">
                  <span style={{ color: palette.muted }}>UPCOMING</span>

                  <h3>{nextExam.exam_name}</h3>

                  <p style={{ color: palette.muted }}>
                    {formatDate(nextExam.exam_date)}
                  </p>

                  <div
                    className="preppath-days-left"
                    style={{
                      background:
                        daysLeft === 0
                          ? `${palette.red}13`
                          : palette.purpleSoft,
                      color:
                        daysLeft === 0 ? palette.red : palette.purple,
                    }}
                  >
                    {daysLeft === 0
                      ? "Exam day"
                      : `${daysLeft} ${daysLeft === 1 ? "day" : "days"} left`}
                  </div>

                  <button
                    onClick={() => navigate("/exam-tracker")}
                    style={{
                      background: palette.cardAlt,
                      color: palette.text,
                      border: `1px solid ${palette.border}`,
                    }}
                  >
                    Open exam tracker
                    <span>→</span>
                  </button>
                </div>
              ) : (
                <div
                  className="preppath-empty-state preppath-exam-empty"
                  style={{
                    background: palette.cardAlt,
                    border: `1px dashed ${palette.border}`,
                  }}
                >
                  <div>◫</div>
                  <strong>No exam added yet</strong>
                  <p style={{ color: palette.muted }}>
                    Add your next exam and PrepPath will keep it in view.
                  </p>

                  <button
                    onClick={() => navigate("/exam-tracker")}
                    style={{
                      border: "none",
                      background: palette.purple,
                      color: "#fff",
                    }}
                  >
                    Add exam
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Analytics */}
          <section className="preppath-section preppath-analytics-section">
            <div className="preppath-section-heading">
              <div>
                <h2>Your performance</h2>
                <p style={{ color: palette.muted }}>
                  Trends, strengths, and recent test activity.
                </p>
              </div>

              <button
                className="preppath-text-button"
                onClick={() => navigate("/analytics")}
                style={{ color: palette.purpleText }}
              >
                Full analytics →
              </button>
            </div>

            <div className="preppath-component-wrap">
              <PerformanceSummary tests={allTests} />
            </div>

            <div className="preppath-dashboard-analytics">
              <div className="preppath-component-wrap">
                <StudyActivity tests={allTests} />
              </div>
              <div className="preppath-component-wrap">
                <StudyInsights tests={allTests} />
              </div>
            </div>

            <div className="preppath-component-wrap">
              <PerformanceChart tests={allTests} />
            </div>

            <div className="preppath-component-wrap">
              <SubjectPerformance tests={allTests} />
            </div>

            <div className="preppath-component-wrap">
              <RecentTests tests={recentTests} />
            </div>
          </section>
        </div>

        <style>{`
          .preppath-dashboard-page {
            padding: 36px 40px 64px;
            box-sizing: border-box;
          }

          .preppath-dashboard-container {
            width: 100%;
            max-width: 1220px;
            margin: 0 auto;
          }

          .preppath-dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            gap: 24px;
            margin-bottom: 26px;
          }

          .preppath-primary-button,
          .preppath-hero-actions button,
          .preppath-task-input-row button,
          .preppath-exam-content button,
          .preppath-exam-empty button {
            font: inherit;
            font-weight: 750;
            cursor: pointer;
            transition: transform .18s ease, box-shadow .18s ease, opacity .18s ease;
          }

          .preppath-primary-button {
            min-height: 44px;
            padding: 0 16px;
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            box-shadow: 0 8px 20px rgba(117,87,232,.20);
          }

          .preppath-primary-button:hover,
          .preppath-task-input-row button:hover,
          .preppath-exam-empty button:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 24px rgba(117,87,232,.24);
          }

          .preppath-dashboard-hero {
            min-height: 240px;
            border-radius: 26px;
            padding: 32px;
            display: grid;
            grid-template-columns: minmax(0,1fr) 245px;
            align-items: center;
            gap: 34px;
            overflow: hidden;
            position: relative;
            margin-bottom: 18px;
          }

          .preppath-dashboard-hero::after {
            content: "";
            position: absolute;
            width: 260px;
            height: 260px;
            border-radius: 50%;
            right: -110px;
            top: -120px;
            background: rgba(117,87,232,.08);
            pointer-events: none;
          }

          .preppath-hero-copy,
          .preppath-hero-score {
            position: relative;
            z-index: 1;
          }

          .preppath-hero-pill {
            width: fit-content;
            padding: 7px 10px;
            border-radius: 999px;
            display: inline-flex;
            align-items: center;
            gap: 7px;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: .3px;
          }

          .preppath-hero-pill span {
            font-size: 8px;
          }

          .preppath-hero-title {
            max-width: 680px;
            margin: 17px 0 0;
            font-size: 38px;
            line-height: 1.15;
            letter-spacing: -.9px;
            font-weight: 850;
          }

          .preppath-hero-text {
            max-width: 620px;
            margin: 12px 0 0;
            font-size: 16px;
            line-height: 1.7;
          }

          .preppath-hero-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 22px;
          }

          .preppath-hero-actions button {
            min-height: 42px;
            padding: 0 15px;
            border-radius: 11px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 9px;
          }

          .preppath-hero-actions button:hover {
            transform: translateY(-1px);
          }

          .preppath-hero-score {
            border-radius: 20px;
            padding: 22px;
            backdrop-filter: blur(10px);
          }

          .preppath-hero-score > span {
            display: block;
            font-size: 12px;
            font-weight: 700;
          }

          .preppath-hero-score > strong {
            display: block;
            margin-top: 8px;
            font-size: 46px;
            line-height: 1;
            letter-spacing: -1px;
          }

          .preppath-score-track {
            width: 100%;
            height: 7px;
            overflow: hidden;
            border-radius: 999px;
            margin: 18px 0 10px;
          }

          .preppath-score-track > div {
            height: 100%;
            border-radius: inherit;
            transition: width .35s ease;
          }

          .preppath-hero-score small {
            font-size: 11px;
            line-height: 1.5;
          }

          .preppath-metrics-grid {
            display: grid;
            grid-template-columns: repeat(4,minmax(0,1fr));
            gap: 12px;
            margin-bottom: 30px;
          }

          .preppath-metric-card {
            appearance: none;
            text-align: left;
            padding: 18px;
            font: inherit;
            transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
          }

          .preppath-metric-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 14px 32px rgba(20,20,35,.08) !important;
          }

          .preppath-metric-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            margin-bottom: 17px;
          }

          .preppath-metric-top > span:last-child {
            font-size: 11px;
            font-weight: 650;
          }

          .preppath-metric-index {
            width: 33px;
            height: 33px;
            border-radius: 10px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 850;
          }

          .preppath-metric-label {
            font-size: 12px;
            font-weight: 700;
          }

          .preppath-metric-value {
            margin-top: 5px;
            font-size: 28px;
            line-height: 1.05;
            font-weight: 850;
            letter-spacing: -.7px;
            overflow-wrap: anywhere;
          }

          .preppath-section {
            margin-top: 30px;
          }

          .preppath-section-heading {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 14px;
          }

          .preppath-section-heading h2,
          .preppath-panel-header h2 {
            margin: 0;
            font-size: 20px;
            letter-spacing: -.35px;
            font-weight: 820;
          }

          .preppath-section-heading p,
          .preppath-panel-header p {
            margin: 5px 0 0;
            font-size: 12px;
            line-height: 1.5;
          }

          .preppath-actions-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }

          .preppath-action-card {
            min-height: 84px;
            appearance: none;
            padding: 14px;
            text-align: left;
            font: inherit;
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            transition: transform .18s ease, box-shadow .18s ease;
          }

          .preppath-action-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 14px 30px rgba(20,20,35,.08) !important;
          }

          .preppath-action-icon {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            flex: 0 0 auto;
          }

          .preppath-action-copy {
            min-width: 0;
            display: flex;
            flex-direction: column;
            gap: 4px;
            flex: 1;
          }

          .preppath-action-copy strong {
            font-size: 14px;
            font-weight: 780;
            overflow-wrap: anywhere;
          }

          .preppath-action-copy small {
            font-size: 11px;
            line-height: 1.45;
          }

          .preppath-action-arrow {
            font-size: 19px;
            flex: 0 0 auto;
          }

          .preppath-dashboard-main-grid {
            display: grid;
            grid-template-columns: minmax(0,1.45fr) minmax(285px,.72fr);
            gap: 16px;
            margin-top: 30px;
          }

          .preppath-panel {
            padding: 22px;
            min-width: 0;
          }

          .preppath-panel-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 14px;
          }

          .preppath-progress-badge {
            padding: 7px 10px;
            border-radius: 999px;
            font-size: 10px;
            font-weight: 800;
            white-space: nowrap;
          }

          .preppath-progress-row {
            display: flex;
            align-items: center;
            gap: 24px;
            margin-top: 24px;
          }

          .preppath-progress-ring {
            width: 112px;
            height: 112px;
            border-radius: 50%;
            padding: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 auto;
          }

          .preppath-progress-ring > div {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .preppath-progress-ring strong {
            font-size: 25px;
            line-height: 1;
            font-weight: 850;
          }

          .preppath-progress-ring span {
            margin-top: 4px;
            font-size: 10px;
            font-weight: 650;
          }

          .preppath-task-entry {
            flex: 1;
            min-width: 0;
          }

          .preppath-task-entry > label {
            display: block;
            margin-bottom: 8px;
            font-size: 11px;
            font-weight: 700;
          }

          .preppath-task-input-row {
            display: flex;
            gap: 8px;
          }

          .preppath-task-input-row input {
            min-width: 0;
            flex: 1;
            height: 42px;
            border-radius: 11px;
            padding: 0 12px;
            outline: none;
            font: inherit;
            font-size: 14px;
          }

          .preppath-task-input-row input:focus {
            border-color: rgba(117,87,232,.55) !important;
            box-shadow: 0 0 0 3px rgba(117,87,232,.09);
          }

          .preppath-task-input-row button {
            height: 42px;
            padding: 0 15px;
            border-radius: 11px;
          }

          .preppath-task-entry > small {
            display: block;
            margin-top: 8px;
            font-size: 10px;
            line-height: 1.45;
          }

          .preppath-task-list {
            display: grid;
            gap: 8px;
            margin-top: 20px;
          }

          .preppath-task-row {
            min-height: 47px;
            padding: 9px 11px 9px 13px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          }

          .preppath-task-row label {
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 0;
            flex: 1;
            font-size: 12px;
            font-weight: 700;
          }

          .preppath-task-row input[type="checkbox"] {
            width: 16px;
            height: 16px;
            accent-color: #7557E8;
            flex: 0 0 auto;
          }

          .preppath-task-row label span {
            min-width: 0;
            overflow-wrap: anywhere;
          }

          .preppath-task-delete {
            width: 28px;
            height: 28px;
            padding: 0;
            border-radius: 9px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font: inherit;
            font-size: 19px;
            line-height: 1;
          }

          .preppath-empty-state {
            padding: 25px 18px;
            border-radius: 14px;
            text-align: center;
          }

          .preppath-empty-state > div:first-child {
            font-size: 24px;
            margin-bottom: 8px;
          }

          .preppath-empty-state strong {
            display: block;
            font-size: 14px;
          }

          .preppath-empty-state p {
            max-width: 340px;
            margin: 6px auto 0;
            font-size: 11px;
            line-height: 1.55;
          }

          .preppath-calendar-icon {
            width: 36px;
            height: 36px;
            border-radius: 11px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 auto;
            font-size: 19px;
          }

          .preppath-exam-content {
            padding-top: 28px;
          }

          .preppath-exam-content > span:first-child {
            display: block;
            font-size: 9px;
            font-weight: 850;
            letter-spacing: 1.2px;
          }

          .preppath-exam-content h3 {
            margin: 8px 0 0;
            font-size: 26px;
            line-height: 1.2;
            letter-spacing: -.55px;
            font-weight: 850;
            overflow-wrap: anywhere;
          }

          .preppath-exam-content p {
            margin: 8px 0 0;
            font-size: 12px;
          }

          .preppath-days-left {
            width: fit-content;
            margin-top: 21px;
            padding: 8px 11px;
            border-radius: 10px;
            font-size: 11px;
            font-weight: 800;
          }

          .preppath-exam-content button {
            width: 100%;
            min-height: 42px;
            margin-top: 25px;
            padding: 0 13px;
            border-radius: 11px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          }

          .preppath-exam-empty {
            margin-top: 23px;
          }

          .preppath-exam-empty button {
            margin-top: 14px;
            min-height: 38px;
            padding: 0 13px;
            border-radius: 10px;
          }

          .preppath-analytics-section {
            margin-top: 34px;
          }

          .preppath-text-button {
            border: none;
            background: transparent;
            padding: 0;
            font: inherit;
            font-size: 12px;
            font-weight: 750;
            cursor: pointer;
          }

          .preppath-dashboard-analytics {
            display: grid;
            grid-template-columns: repeat(2,minmax(0,1fr));
            gap: 16px;
            margin-top: 16px;
          }

          .preppath-component-wrap {
            min-width: 0;
            margin-top: 16px;
          }

          .preppath-analytics-section > .preppath-component-wrap:first-of-type {
            margin-top: 0;
          }

          @media (max-width: 1050px) {
            .preppath-metrics-grid,
            .preppath-actions-grid {
              grid-template-columns: repeat(2,minmax(0,1fr));
            }

            .preppath-dashboard-main-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 820px) {
            .preppath-dashboard-page {
              padding: 28px 24px 52px;
            }

            .preppath-dashboard-hero {
              grid-template-columns: 1fr;
            }

            .preppath-hero-score {
              max-width: none;
            }

            .preppath-dashboard-analytics {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 640px) {
            .preppath-dashboard-page {
              padding: 21px 14px 40px;
            }

            .preppath-dashboard-header {
              align-items: stretch;
              flex-direction: column;
              margin-bottom: 20px;
            }

            .preppath-primary-button {
              width: 100%;
            }

            .preppath-dashboard-title {
              font-size: 29px !important;
            }

            .preppath-dashboard-hero {
              padding: 23px 19px;
              border-radius: 21px;
              gap: 22px;
            }

            .preppath-hero-title {
              font-size: 25px;
            }

            .preppath-hero-actions {
              flex-direction: column;
            }

            .preppath-hero-actions button {
              width: 100%;
            }

            .preppath-metrics-grid,
            .preppath-actions-grid {
              grid-template-columns: 1fr;
            }

            .preppath-progress-row {
              flex-direction: column;
              align-items: stretch;
            }

            .preppath-progress-ring {
              margin: 0 auto;
            }

            .preppath-task-input-row {
              flex-direction: column;
            }

            .preppath-task-input-row button {
              width: 100%;
            }

            .preppath-panel-header {
              flex-direction: column;
            }

            .preppath-progress-badge {
              width: fit-content;
            }

            .preppath-section-heading {
              align-items: flex-start;
            }
          }
        `}</style>
      </div>
    </MainLayout>
  );
}
