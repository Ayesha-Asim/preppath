import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../components/MainLayout";
import type { CSSProperties, ReactNode } from "react";
import { useTheme } from "../context/ThemeContext";

type Filter = "All" | "Upcoming" | "Completed";
type ExamRecord = {
  id: string;
  user_id: string;
  exam_name: string;
  exam_date: string;
  exam_type?: string | null;
  created_at?: string;
};

const REMINDER_DAYS = 10;
const MIN_YEAR = 2025;
const MAX_YEAR = 2035;

export default function UpcomingExams() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [exams, setExams] = useState<ExamRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [examType, setExamType] = useState("Admission Test");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("All");
  const [search, setSearch] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const isValidDateString = (dateString: string) => {
    if (!dateString) return false;
    const selected = new Date(`${dateString}T00:00:00`);
    return (
      !Number.isNaN(selected.getTime()) &&
      selected.getFullYear() >= MIN_YEAR &&
      selected.getFullYear() <= MAX_YEAR
    );
  };

  const getDiffDays = (dateString: string) => {
    if (!isValidDateString(dateString)) return null;

    const today = new Date();
    const examDateObj = new Date(`${dateString}T00:00:00`);

    today.setHours(0, 0, 0, 0);
    examDateObj.setHours(0, 0, 0, 0);

    return Math.ceil(
      (examDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const getCountdown = (dateString: string) => {
    const diffDays = getDiffDays(dateString);

    if (diffDays === null) return "Invalid date";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays > 1) return `${diffDays} days left`;
    return "Completed";
  };

  const getNotificationText = (dateString: string) => {
    const diff = getDiffDays(dateString);

    if (diff === null) return "⚠️ No reminder because this date is invalid.";
    if (diff < 0) return "✅ Exam completed. No future reminder.";
    if (diff === 0) return "🔔 Your exam is today.";
    if (diff === 1) return "🔔 Reminder will be sent tomorrow.";
    if (diff <= REMINDER_DAYS) return `🔔 Reminder in ${diff} days.`;
    return `🔔 Reminder will be sent ${REMINDER_DAYS} days before the exam.`;
  };

  const getPriorityLabel = (dateString: string) => {
    const diffDays = getDiffDays(dateString);

    if (diffDays === null) return "Invalid";
    if (diffDays < 0) return "Done";
    if (diffDays === 0) return "Urgent";
    if (diffDays <= 7) return "High priority";
    if (diffDays <= 30) return "Prepare soon";
    return "Planned";
  };

  const formatDate = (dateString: string) => {
    if (!isValidDateString(dateString)) return "Invalid date";

    return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const createExamNotifications = async (examList: ExamRecord[]) => {
    if (!user) return;

    for (const exam of examList) {
      const diffDays = getDiffDays(exam.exam_date);

      if (diffDays === null || diffDays < 0 || diffDays > REMINDER_DAYS) continue;

      const title = diffDays === 0 ? "Exam Today" : "Upcoming Exam Reminder";
      const message =
        diffDays === 0
          ? `Today is your ${exam.exam_name} exam. Good luck!`
          : `${exam.exam_name} is in ${diffDays} ${diffDays === 1 ? "day" : "days"}. Keep preparing!`;
      const uniqueTitle = `${title}: ${exam.exam_name} (${diffDays})`;

      const { data: existing } = await supabase
        .from("notifications")
        .select("id")
        .eq("user_id", user.id)
        .eq("exam_id", exam.id)
        .eq("type", "exam")
        .eq("days_before", diffDays)
        .maybeSingle();

      if (existing) continue;

      await supabase.from("notifications").insert({
        user_id: user.id,
        exam_id: exam.id,
        title: uniqueTitle,
        message,
        days_before: diffDays,
        type: "exam",
        is_read: false,
      });
    }
  };

  const fetchExams = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("upcoming_exams")
      .select("*")
      .eq("user_id", user.id)
      .order("exam_date", { ascending: true });

    if (error) {
      console.error("Fetch exams error:", error.message);
      return;
    }

    const examData = (data || []) as ExamRecord[];
    setExams(examData);
    await createExamNotifications(examData);
  };

  useEffect(() => {
    fetchExams();
  }, [user]);

  const resetForm = () => {
    setExamName("");
    setExamDate("");
    setExamType("Admission Test");
    setEditingId(null);
    setShowForm(false);
  };

  const saveExam = async () => {
    if (!user) return;

    if (!examName.trim()) {
      alert("Please enter the exam name.");
      return;
    }

    if (!isValidDateString(examDate)) {
      alert(`Please select a valid exam date between ${MIN_YEAR} and ${MAX_YEAR}.`);
      return;
    }

    setIsSaving(true);

    if (editingId) {
      await supabase
        .from("upcoming_exams")
        .update({
          exam_name: examName.trim(),
          exam_date: examDate,
          exam_type: examType,
        })
        .eq("id", editingId)
        .eq("user_id", user.id);
    } else {
      await supabase.from("upcoming_exams").insert({
        user_id: user.id,
        exam_name: examName.trim(),
        exam_date: examDate,
        exam_type: examType,
      });
    }

    setIsSaving(false);
    resetForm();
    fetchExams();
  };

  const startEdit = (exam: ExamRecord) => {
    setEditingId(exam.id);
    setExamName(exam.exam_name || "");
    setExamDate(exam.exam_date || "");
    setExamType(exam.exam_type || "Admission Test");
    setShowForm(true);
  };

  const deleteExam = async (id: string) => {
    if (!user) return;

    const confirmDelete = window.confirm("Delete this exam?");
    if (!confirmDelete) return;

    await supabase.from("upcoming_exams").delete().eq("id", id).eq("user_id", user.id);
    await supabase.from("notifications").delete().eq("exam_id", id).eq("user_id", user.id);
    fetchExams();
  };

  const sortedExams = useMemo(() => {
    return [...exams].sort((a, b) => {
      const aDiff = getDiffDays(a.exam_date);
      const bDiff = getDiffDays(b.exam_date);

      if (aDiff === null && bDiff === null) return 0;
      if (aDiff === null) return 1;
      if (bDiff === null) return -1;

      if (aDiff >= 0 && bDiff < 0) return -1;
      if (aDiff < 0 && bDiff >= 0) return 1;

      return aDiff - bDiff;
    });
  }, [exams]);

  const upcomingCount = exams.filter((exam) => {
    const diff = getDiffDays(exam.exam_date);
    return diff !== null && diff >= 0;
  }).length;

  const completedCount = exams.filter((exam) => {
    const diff = getDiffDays(exam.exam_date);
    return diff !== null && diff < 0;
  }).length;

  const nextExam = sortedExams.find((exam) => {
    const diff = getDiffDays(exam.exam_date);
    return diff !== null && diff >= 0;
  });

  const nextDays = nextExam ? getDiffDays(nextExam.exam_date) : null;

  const filteredExams = useMemo(() => {
    const q = search.trim().toLowerCase();

    return sortedExams.filter((exam) => {
      const diffDays = getDiffDays(exam.exam_date);

      const matchesFilter =
        filter === "All" ||
        (filter === "Upcoming" && diffDays !== null && diffDays >= 0) ||
        (filter === "Completed" && diffDays !== null && diffDays < 0);

      const matchesSearch =
        !q ||
        exam.exam_name?.toLowerCase().includes(q) ||
        exam.exam_type?.toLowerCase().includes(q) ||
        exam.exam_date?.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [sortedExams, filter, search]);

  const openAdd = () => {
    setEditingId(null);
    setExamName("");
    setExamDate("");
    setExamType("Admission Test");
    setShowForm(true);
  };

  const palette = {
    page: isDark ? "#100D16" : "#F8F6FC",
    surface: isDark ? "#1C1426" : "#FFFFFF",
    soft: isDark ? "#241B30" : "#F5F0FC",
    border: isDark ? "rgba(171,132,255,.16)" : "#E7DDF3",
    text: isDark ? "#F8F5FF" : "#20162B",
    muted: isDark ? "#B9AEC7" : "#71667F",
    purple: "#9564F5",
  };

  return (
    <MainLayout>
      <div className="exam-page" style={{
        background: palette.page, color: palette.text,
        ["--exam-surface" as string]: palette.surface,
        ["--exam-soft" as string]: palette.soft,
        ["--exam-border" as string]: palette.border,
        ["--exam-muted" as string]: palette.muted,
        ["--exam-text" as string]: palette.text,
        ["--exam-purple" as string]: palette.purple,
      } as CSSProperties}>
        <header className="exam-heading">
          <div>
            <div className="exam-eyebrow">EXAM PLANNER</div>
            <h1><OutlineIcon name="calendar" size={27} /> Exam Tracker</h1>
            <p>Track admission tests, important dates, and upcoming reminders.</p>
          </div>
          <button type="button" className="exam-primary exam-add" onClick={openAdd}>
            <OutlineIcon name="plus" size={17} /> Add Exam
          </button>
        </header>

        <section className="exam-summary" aria-label="Exam overview">
          <div className="exam-summary-intro">
            <span className="exam-eyebrow">YOUR EXAM OVERVIEW</span>
            <strong>Stay on top of every test.</strong>
            <span>Plan ahead with dates and reminders in one place.</span>
          </div>
          <div className="exam-stats">
            <div className="exam-stat"><span className="exam-stat-icon"><OutlineIcon name="calendar" /></span><span className="exam-stat-value">{upcomingCount}</span><span className="exam-stat-label">Upcoming exams</span></div>
            <div className="exam-stat"><span className="exam-stat-icon"><OutlineIcon name="check" /></span><span className="exam-stat-value">{completedCount}</span><span className="exam-stat-label">Completed</span></div>
            <div className="exam-stat"><span className="exam-stat-icon"><OutlineIcon name="clock" /></span><span className="exam-stat-value">{nextDays === null ? "—" : nextDays}</span><span className="exam-stat-label">Days until next exam</span></div>
          </div>
        </section>

        <section className="exam-toolbar" aria-label="Find exams">
          <label className="exam-search"><OutlineIcon name="search" size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search exams, types, or dates..." aria-label="Search exams" /></label>
          <div className="exam-filters" aria-label="Filter exams">
            {(["All", "Upcoming", "Completed"] as Filter[]).map((item) => <button key={item} type="button" className={filter === item ? "exam-filter active" : "exam-filter"} onClick={() => setFilter(item)}>{item}</button>)}
          </div>
        </section>

        {showForm && <section className="exam-form-panel" aria-label={editingId ? "Edit exam" : "Add exam"}>
          <div className="exam-form-head"><div><h2>{editingId ? "Edit exam" : "Add an exam"}</h2><p>Reminders are created when an exam is within {REMINDER_DAYS} days.</p></div><button type="button" className="exam-icon-button" onClick={resetForm} aria-label="Close exam form"><OutlineIcon name="close" /></button></div>
          <div className="exam-form-fields"><label>Exam name<input value={examName} maxLength={150} onChange={(event) => setExamName(event.target.value)} placeholder="e.g. FAST Entry Test" /></label><label>Exam type<select value={examType} onChange={(event) => setExamType(event.target.value)}><option>Admission Test</option><option>FAST Entry Test</option><option>NUST NET</option><option>COMSATS NAT</option><option>UET ECAT</option><option>SAT</option><option>Other</option></select></label><label>Exam date<input type="date" value={examDate} min={`${MIN_YEAR}-01-01`} max={`${MAX_YEAR}-12-31`} onChange={(event) => setExamDate(event.target.value)} /></label></div>
          {examDate && <p className="exam-form-note"><OutlineIcon name="bell" size={16} /> {getNotificationText(examDate).replace(/^[^\p{L}\p{N}]+/u, "")}</p>}
          <div className="exam-form-actions"><button type="button" className="exam-primary" disabled={isSaving} onClick={saveExam}>{isSaving ? "Saving..." : editingId ? "Update exam" : "Save exam"}</button><button type="button" className="exam-secondary" onClick={resetForm}>Cancel</button></div>
        </section>}

        <div className="exam-list-heading"><div><h2>{filter === "All" ? "Your exams" : `${filter} exams`}</h2><p>{filteredExams.length} {filteredExams.length === 1 ? "exam" : "exams"} found</p></div></div>
        {filteredExams.length === 0 ? <section className="exam-empty"><span className="exam-empty-icon"><OutlineIcon name="calendar" size={26} /></span><h3>No exams found</h3><p>{search || filter !== "All" ? "Try a different search or filter." : "Add your first exam to start tracking important dates."}</p>{!search && filter === "All" && <button type="button" className="exam-primary" onClick={openAdd}><OutlineIcon name="plus" size={16} /> Add your first exam</button>}</section> :
          <div className="exam-list">{filteredExams.map((exam) => {
            const diff = getDiffDays(exam.exam_date);
            const completed = diff !== null && diff < 0;
            return <article className="exam-entry" key={exam.id}>
              <div className="exam-entry-icon"><OutlineIcon name="calendar" size={21} /></div>
              <div className="exam-entry-main"><div className="exam-entry-top"><h3>{exam.exam_name}</h3><span className="exam-priority">{getPriorityLabel(exam.exam_date)}</span></div><p>{exam.exam_type || "Admission Test"}</p><div className="exam-entry-meta"><span><OutlineIcon name="calendar" size={15} /> {formatDate(exam.exam_date)}</span><span><OutlineIcon name="bell" size={15} /> {getNotificationText(exam.exam_date).replace(/^[^\p{L}\p{N}]+/u, "")}</span></div></div>
              <div className="exam-entry-right"><span className={completed ? "exam-countdown completed" : "exam-countdown"}>{getCountdown(exam.exam_date)}</span><div className="exam-entry-actions"><button type="button" className="exam-action" onClick={() => startEdit(exam)} aria-label={`Edit ${exam.exam_name}`}><OutlineIcon name="edit" size={16} /> Edit</button><button type="button" className="exam-action" onClick={() => deleteExam(exam.id)} aria-label={`Delete ${exam.exam_name}`}><OutlineIcon name="trash" size={16} /> Delete</button></div></div>
            </article>;
          })}</div>}
        <style>{examStyles}</style>
      </div>
    </MainLayout>
  );
}

type IconName = "calendar" | "check" | "clock" | "plus" | "search" | "close" | "bell" | "edit" | "trash";
function OutlineIcon({ name, size = 20 }: { name: IconName; size?: number }) {
  const shared = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };
  const shapes: Record<IconName, ReactNode> = {
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18" /></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
    close: <path d="M5 5 19 19M19 5 5 19" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    edit: <><path d="M12 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" /><path d="m10 14 9-9 2 2-9 9-3 1z" /></>,
    trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6" /></>,
  };
  return <svg {...shared}>{shapes[name]}</svg>;
}

const examStyles = `
.exam-page{min-height:100vh;padding:32px 36px 60px;box-sizing:border-box;font-family:inherit}
.exam-page *{box-sizing:border-box}
.exam-page button,.exam-page input,.exam-page select{font:inherit}
.exam-heading{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:24px}
.exam-eyebrow{font-size:11px;font-weight:800;letter-spacing:1.4px;color:#AB83FF}
.exam-heading h1{display:flex;align-items:center;gap:12px;font-size:29px;letter-spacing:-.6px;margin:7px 0 6px;font-weight:800}
.exam-heading h1 svg{color:#AB83FF}
.exam-heading p,.exam-list-heading p{color:var(--exam-muted);font-size:13px;margin:0}
.exam-primary{display:inline-flex;align-items:center;justify-content:center;gap:7px;border:0;border-radius:11px;background:#7434D7;color:white;font-weight:700!important;padding:11px 17px;cursor:pointer;white-space:nowrap}
.exam-primary:hover{background:#8346E5}.exam-primary:disabled{opacity:.6;cursor:wait}
.exam-summary{border:1px solid var(--exam-border);background:linear-gradient(105deg,#301950 0%,#48227B 55%,#5B30A0 100%);border-radius:17px;padding:20px 22px;display:flex;align-items:center;gap:24px;margin-bottom:20px;color:#fff}
.exam-summary-intro{flex:1;min-width:180px;display:flex;flex-direction:column;gap:7px}.exam-summary-intro .exam-eyebrow{color:#D6C4FF}.exam-summary-intro strong{font-size:17px;line-height:1.35}.exam-summary-intro>span:last-child{font-size:12px;color:#E0D4EF}
.exam-stats{flex:2;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.exam-stat{background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.18);border-radius:12px;padding:13px 15px;display:grid;grid-template-columns:30px 1fr;column-gap:10px;align-items:center}
.exam-stat-icon{grid-row:span 2;display:flex;align-items:center;justify-content:center;width:30px;height:30px;background:rgba(255,255,255,.12);border-radius:9px;color:#E5D5FF}.exam-stat-value{font-size:21px;font-weight:800;line-height:1.2}.exam-stat-label{font-size:11px;color:#E4D7F5;line-height:1.4}
.exam-toolbar{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:22px}.exam-search{display:flex;align-items:center;gap:10px;flex:1;min-width:150px;padding:0 13px;height:43px;border:1px solid var(--exam-border);background:var(--exam-surface);border-radius:11px;color:var(--exam-muted)}.exam-search input{width:100%;min-width:0;background:transparent;border:0;outline:0;color:var(--exam-text);font-size:13px}.exam-search input::placeholder{color:var(--exam-muted)}
.exam-filters{display:flex;gap:6px;flex-wrap:wrap}.exam-filter{background:var(--exam-surface);border:1px solid var(--exam-border);color:var(--exam-muted);border-radius:9px;padding:10px 14px;font-size:12px!important;font-weight:650!important;cursor:pointer}.exam-filter.active{background:rgba(124,58,237,.19);border-color:#8052D1;color:var(--exam-text)}
.exam-list-heading{margin:0 0 13px}.exam-list-heading h2{font-size:16px;margin:0 0 4px;font-weight:750}
.exam-list{display:flex;flex-direction:column;gap:10px}.exam-entry{display:flex;gap:14px;padding:17px 18px;background:var(--exam-surface);border:1px solid var(--exam-border);border-radius:13px;align-items:flex-start}.exam-entry-icon{width:38px;height:38px;flex:0 0 38px;display:grid;place-items:center;border-radius:11px;background:var(--exam-soft);color:#AB83FF}.exam-entry-main{flex:1;min-width:0}.exam-entry-top{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.exam-entry h3{font-size:15px;font-weight:750;margin:1px 0 4px;overflow-wrap:anywhere}.exam-entry-main>p{color:var(--exam-muted);font-size:12px;margin:0 0 11px}.exam-priority{font-size:10px;color:#C9A9FF;background:rgba(124,58,237,.15);border:1px solid var(--exam-border);border-radius:20px;padding:4px 8px;white-space:nowrap}.exam-entry-meta{display:flex;gap:10px 20px;flex-wrap:wrap;color:var(--exam-muted);font-size:11px;line-height:1.5}.exam-entry-meta span{display:inline-flex;align-items:center;gap:6px}.exam-entry-meta svg{color:#AB83FF;flex-shrink:0}
.exam-entry-right{display:flex;flex-direction:column;align-items:flex-end;gap:12px;min-width:132px}.exam-countdown{font-size:11px;font-weight:750;color:#D7BFFF;background:rgba(124,58,237,.17);border:1px solid var(--exam-border);border-radius:8px;padding:6px 9px;white-space:nowrap}.exam-countdown.completed{color:var(--exam-muted);background:var(--exam-soft)}.exam-entry-actions{display:flex;gap:6px}.exam-action,.exam-icon-button{display:inline-flex;align-items:center;justify-content:center;gap:5px;background:var(--exam-soft);border:1px solid var(--exam-border);border-radius:8px;padding:7px 9px;color:var(--exam-muted);font-size:11px!important;cursor:pointer}.exam-action:hover,.exam-icon-button:hover{color:var(--exam-text);border-color:#9564F5}
.exam-form-panel,.exam-empty{background:var(--exam-surface);border:1px solid var(--exam-border);border-radius:14px;padding:21px;margin-bottom:22px}.exam-form-head{display:flex;align-items:flex-start;justify-content:space-between;gap:15px;margin-bottom:17px}.exam-form-head h2{font-size:17px;margin:0 0 5px}.exam-form-head p,.exam-form-note{font-size:12px;color:var(--exam-muted);margin:0}.exam-form-fields{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}.exam-form-fields label{display:flex;flex-direction:column;gap:7px;color:var(--exam-muted);font-size:12px}.exam-form-fields input,.exam-form-fields select{width:100%;min-width:0;height:42px;padding:0 11px;border:1px solid var(--exam-border);border-radius:9px;background:var(--exam-soft);color:var(--exam-text);color-scheme:dark}.exam-form-fields select option{background:#241B30;color:white}.exam-form-note{display:flex;align-items:center;gap:8px;margin-top:13px}.exam-form-note svg{color:#AB83FF}.exam-form-actions{display:flex;gap:9px;margin-top:17px}.exam-secondary{background:var(--exam-soft);border:1px solid var(--exam-border);color:var(--exam-text);border-radius:10px;padding:10px 15px;cursor:pointer}.exam-empty{text-align:center;padding:38px 20px}.exam-empty-icon{display:inline-flex;align-items:center;justify-content:center;background:var(--exam-soft);color:#AB83FF;width:50px;height:50px;border-radius:14px}.exam-empty h3{font-size:17px;margin:13px 0 6px}.exam-empty p{font-size:13px;color:var(--exam-muted);margin:0 0 16px}
@media(max-width:1050px){.exam-summary{flex-direction:column;align-items:stretch}.exam-toolbar{flex-direction:column;align-items:stretch}}
@media(max-width:650px){.exam-page{padding:22px 15px 45px}.exam-heading{align-items:flex-start}.exam-heading h1{font-size:24px}.exam-add{padding:10px;font-size:12px!important}.exam-stats{grid-template-columns:1fr}.exam-stat{grid-template-columns:32px 1fr}.exam-form-fields{grid-template-columns:1fr}.exam-entry{flex-wrap:wrap}.exam-entry-right{width:100%;flex-direction:row;align-items:center;justify-content:space-between}.exam-toolbar{gap:10px}.exam-filters{width:100%}.exam-filter{flex:1}}
`;
