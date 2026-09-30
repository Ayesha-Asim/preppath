import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");
  const [completed, setCompleted] = useState<number[]>([]);
  const [recentTests, setRecentTests] = useState<any[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!user) return;

    const fetchAll = async () => {
      /* USER STATS */
      const { data: statsData } = await supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setStats(statsData);

      setTasks(statsData?.tasks || []);
      setCompleted(statsData?.completed_tasks || []);

      /* PROFILE */
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(profileData);

      /* RECENT TESTS */
      const { data: testsData } = await supabase
        .from("test_results")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5);

      setRecentTests(testsData || []);

      /* TOTAL QUESTIONS SOLVED */
      const { data: allTests } = await supabase
        .from("test_results")
        .select("total_questions")
        .eq("user_id", user.id);

      const totalQ = (allTests || []).reduce(
        (sum, t) => sum + (t.total_questions || 0),
        0
      );

      setTotalQuestions(totalQ);
    };

    fetchAll();
  }, [user]);

  /* ================= TASK LOGIC ================= */
  const addTask = async () => {
    if (!newTask.trim() || !user) return;

    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    setNewTask("");

    await supabase
      .from("user_stats")
      .update({ tasks: updatedTasks })
      .eq("user_id", user.id);
  };

  const toggleTask = async (index: number) => {
    if (!user) return;

    const updated =
      completed.includes(index)
        ? completed.filter((i) => i !== index)
        : [...completed, index];

    setCompleted(updated);

    await supabase
      .from("user_stats")
      .update({ completed_tasks: updated })
      .eq("user_id", user.id);
  };

  const removeTask = async (index: number) => {
    if (!user) return;

    const updatedTasks = tasks.filter((_, i) => i !== index);
    const updatedCompleted = completed
      .filter((i) => i !== index)
      .map((i) => (i > index ? i - 1 : i));

    setTasks(updatedTasks);
    setCompleted(updatedCompleted);

    await supabase
      .from("user_stats")
      .update({
        tasks: updatedTasks,
        completed_tasks: updatedCompleted,
      })
      .eq("user_id", user.id);
  };

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completed.length / tasks.length) * 100);

  const fullName = profile?.name || user?.email || "Student";

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={styles.page}>
        {/* HERO */}
        <div style={styles.heroCard}>  
          <h2>Welcome back, {fullName} 👋</h2>
          <p>Ready to prepare today? Let’s get started.</p>

          <button
            style={styles.heroBtn}
            onClick={() => (window.location.href = "/mock-test")}
          >
            Start Preparing
          </button>
        </div>

        {/* STATS */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            📝 Mock Tests
            <p>{stats?.total_tests || 0}</p>
          </div>

          <div style={styles.statCard}>
            🎯 Accuracy
            <p>{stats?.accuracy || 0}%</p>
          </div>

          <div style={styles.statCard}>
            🔥 Streak
            <p>{stats?.streak || 0} days</p>
          </div>

          <div style={styles.statCard}>
            📈 Questions Solved
            <p>{totalQuestions}</p>
          </div>
        </div>

        {/* TASKS */}
        <div style={{ ...styles.bigCard, color: "var(--text)" }}>
          <h2 style={styles.cardTitle}>Today's Study Progress</h2>

          <p>
            {completed.length} of {tasks.length} tasks completed
          </p>

          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progress}%`,
              }}
            />
          </div>

          <div style={styles.taskInputRow}>
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a task..."
              style={styles.input}
            />
            <button onClick={addTask} style={styles.addBtn}>
              Add
            </button>
          </div>

          {tasks.map((t, i) => (
            <div key={i} style={styles.taskRow}>
              <label>
                <input
                  type="checkbox"
                  checked={completed.includes(i)}
                  onChange={() => toggleTask(i)}
                />
                {t}
              </label>

              <button
                onClick={() => removeTask(i)}
                style={styles.deleteBtn}
              >
                ❌
              </button>
            </div>
          ))}
        </div>

        {/* RECENT TESTS */}
        <div style={{ ...styles.bigCard, color: "var(--text)" }}>
          <h2 style={styles.cardTitle}>Recent Tests</h2>

          {recentTests.map((t, i) => (
            <div key={i} style={styles.testRow}>
              <span>{t.subject}</span>
              <span>
                {(t.score ?? 0)}/{(t.total ?? t.total_questions ?? 0)}
              </span>
            </div>
          ))}
        </div>

        {/* MOTIVATION */}
        <div style={styles.motivationRow}>
          <div style={styles.quoteCard}>Consistency wins 🔥</div>
          <div style={styles.quoteCard}>You got this 🚀</div>
          <div style={styles.quoteCard}>Keep going 💜</div>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  page: { flex: 1, padding: 30, background: "#f3f5f7c7" },

  heroCard: {
    background: "rgb(76, 29, 149)",
    color: "white",
    padding: 25,
    borderRadius: 16,
    marginBottom: 20,
  },

  heroBtn: {
    marginTop: 10,
    background: "var(--card)",
    color: "rgb(76, 29, 149)",
    border: "none",
    padding: "10px 15px",
    borderRadius: 8,
    cursor: "pointer",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 15,
  },

  statCard: {
    background: "var(--card)",
    padding: 15,
    borderRadius: 12,
    color: "var(--text)",
  },

  bigCard: {
    background: "var(--card)",
    marginTop: 20,
    padding: 20,
    borderRadius: 14,
    color: "var(--text)",
  },

  taskInputRow: { display: "flex", gap: 10 },

  input: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  addBtn: {
    background: "rgb(76, 29, 149)",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: 8,
  },

  taskRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 10,
  },

  deleteBtn: {
    background: "var(--card)",
    border: "1px solid #ddd",
    borderRadius: 6,
  },

  progressBar: {
    height: 8,
    background: "#eee",
    borderRadius: 10,
    margin: "10px 0",
  },

  progressFill: {
    height: "100%",
    background: "rgb(76, 29, 149)",
  },

  motivationRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
    marginTop: 20,
  },

  quoteCard: {
    background: "rgb(76, 29, 149)",
    color: "white",
    padding: 15,
    borderRadius: 12,
    textAlign: "center",
  },

  testRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: 10,
    borderBottom: "1px solid #eee",
  },

  cardTitle: {
  color: "var(--text)",
  fontWeight: 600,
},

cardValue: {
  color: "var(--text-h)",
  fontSize: 18,
  fontWeight: 700,
},

cardSubtext: {
  color: "#64748B",
  fontSize: 13,
},
};