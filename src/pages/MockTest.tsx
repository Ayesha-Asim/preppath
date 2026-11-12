import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../components/MainLayout";

import { supabase } from "../lib/supabase";

import { useTheme } from "../context/ThemeContext";



import { canStartQuiz } from "../utils/quizLimit";

import { BookOpen, BrainCircuit, Calculator, ChartNoAxesCombined, Laptop, Search, Sigma, Atom, FileText, Timer, GraduationCap, ChevronRight, CalendarDays, Trophy, Zap, BarChart3 } from "lucide-react";



type SubjectCard = {

  title: string;

  icon: typeof BookOpen;

  desc: string;

  questions: number;

  difficulty: "Easy" | "Medium" | "Hard";

  path: string;

};



type TestMode = "20 Questions" | "50 Questions" | "Timed Mode";


type SavedTestAttempt = {
  subject: string;
  mode: string;
  questionIds: string[];
  index: number;
  selected: number | null;
  score: number;
  userAnswers: (number | null)[];
  timeLeft: number;
  savedAt: string;
};

function getModeSlug(mode: TestMode) {
  return mode.toLowerCase().replace(/\s+/g, "-");
}

function getSavedAttempt(subject: string, mode: TestMode): SavedTestAttempt | null {
  try {
    const modeSlug = getModeSlug(mode);
    const raw = localStorage.getItem(
      `preppath-test-draft:${subject}:${modeSlug}`
    );

    if (!raw) return null;

    const attempt = JSON.parse(raw) as SavedTestAttempt;

    if (
      attempt.subject !== subject ||
      attempt.mode !== modeSlug ||
      !Array.isArray(attempt.questionIds) ||
      !Array.isArray(attempt.userAnswers)
    ) {
      return null;
    }

    return attempt;
  } catch {
    return null;
  }
}




const subjects: SubjectCard[] = [

  {

    title: "Advanced Mathematics",

    icon: Sigma,

    desc: "Higher difficulty math questions",

    questions: 0,

    difficulty: "Hard",

    path: "/test/advanced-mathematics",

  },

  {

    title: "Basic Mathematics",

    icon: Calculator,

    desc: "Basic calculations and formulas",

    questions: 0,

    difficulty: "Medium",

    path: "/test/basic-mathematics",

  },

  {

    title: "IQ",

    icon: BrainCircuit,

    desc: "Patterns, series, and logic",

    questions: 0,

    difficulty: "Medium",

    path: "/test/iq",

  },

  {

    title: "Analytical Reasoning",

    icon: Search,

    desc: "Logic and reasoning practice",

    questions: 0,

    difficulty: "Medium",

    path: "/test/analytical-reasoning",

  },

  {

    title: "Quantitative Reasoning",

    icon: ChartNoAxesCombined,

    desc: "Numbers, ratios, and data questions",

    questions: 0,

    difficulty: "Medium",

    path: "/test/quantitative-reasoning",

  },

  {

    title: "Computer Science",

    icon: Laptop,

    desc: "Computer basics and CS concepts",

    questions: 0,

    difficulty: "Easy",

    path: "/test/computer-science",

  },

  {

    title: "Physics",

    icon: Atom,

    desc: "Conceptual and numerical physics",

    questions: 0,

    difficulty: "Hard",

    path: "/test/physics",

  },

  {

    title: "English",

    icon: BookOpen,

    desc: "Vocabulary, grammar, and comprehension",

    questions: 0,

    difficulty: "Easy",

    path: "/test/english",

  },

];



const universitySubjects: Record<string, string[]> = {

  All: [],

  FAST: ["Advanced Mathematics", "Basic Mathematics", "IQ", "English"],

  COMSATS: [

    "English",

    "Analytical Reasoning",

    "Quantitative Reasoning",

    "Computer Science",

    "Physics",

    "Basic Mathematics",

  ],

  NUST: ["Basic Mathematics", "Advanced Mathematics", "Physics", "English"],

  UET: [

    "Basic Mathematics",

    "Advanced Mathematics",

    "Physics",

    "Computer Science",

    "English",

  ],

  GIKI: ["Basic Mathematics", "Advanced Mathematics", "Physics", "English"],

  ITU: ["Analytical Reasoning", "Basic Mathematics"],

  FCCU: [

    "Basic Mathematics",

    "Advanced Mathematics",

    "English",

    "Computer Science",

  ],

  LUMS: ["Basic Mathematics", "English", "Advanced Mathematics"],

  GCU: [

    "Basic Mathematics",

    "Advanced Mathematics",

    "Analytical Reasoning",

    "English",

  ],

  PIEAS: [

    "Basic Mathematics",

    "Advanced Mathematics",

    "Physics",

    "English",

    "Computer Science",

  ],

  PUCIT: [

    "Basic Mathematics",

    "English",

    "Computer Science",

    "Physics",

    "Quantitative Reasoning",

  ],

  UCP: [

    "Basic Mathematics",

    "English",

    "Computer Science",

    "Analytical Reasoning",

  ],

  UMT: ["Basic Mathematics", "English"],

  UOL: [

    "Basic Mathematics",

    "English",

    "Analytical Reasoning",

    "Computer Science",

    "Physics",

  ],

};



const testModes: TestMode[] = [

  "20 Questions",

  "50 Questions",

  "Timed Mode",

];



export default function MockTest() {

  const navigate = useNavigate();

  const { theme } = useTheme();

  const isDark = theme === "dark";



  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>({});



 useEffect(() => {

  let cancelled = false;



  async function loadQuestionCounts() {

    try {

      const counts: Record<string, number> = {};



      for (const subject of subjects) {

        const { count, error } = await supabase

          .from("questions")

          .select("id", {
            count: "exact",
            head: true,
          })

          .eq("subject", subject.title);



        if (error) {

          throw error;

        }



        counts[subject.title] = count ?? 0;

      }



      if (!cancelled) {

        setQuestionCounts(counts);

      }

    } catch (error) {

      console.error("Error loading question counts:", error);

    }

  }



  loadQuestionCounts();



  return () => {

    cancelled = true;

  };

}, []);



  const [search, setSearch] = useState("");

  const [selectedUniversity, setSelectedUniversity] = useState("All");

  const [selectedMode, setSelectedMode] =

    useState<TestMode>("20 Questions");

  const [draftRefresh, setDraftRefresh] = useState(0);

  useEffect(() => {
    const refreshDrafts = () => {
      setDraftRefresh((value) => value + 1);
    };

    window.addEventListener("focus", refreshDrafts);
    window.addEventListener("storage", refreshDrafts);

    return () => {
      window.removeEventListener("focus", refreshDrafts);
      window.removeEventListener("storage", refreshDrafts);
    };
  }, []);




  const filteredSubjects = useMemo(() => {

    const q = search.trim().toLowerCase();

    const allowedSubjects = universitySubjects[selectedUniversity];



    return subjects.filter((subject) => {

      const matchesSearch =

        !q ||

        subject.title.toLowerCase().includes(q) ||

        subject.desc.toLowerCase().includes(q) ||

        subject.difficulty.toLowerCase().includes(q);



      const matchesUniversity =

        selectedUniversity === "All" ||

        allowedSubjects.includes(subject.title);



      return matchesSearch && matchesUniversity;

    });

  }, [search, selectedUniversity]);



  const difficultyCounts = useMemo(() => {

    return filteredSubjects.reduce(

      (acc, subject) => {

        acc[subject.difficulty] += 1;

        return acc;

      },

      {

        Easy: 0,

        Medium: 0,

        Hard: 0,

      }

    );

  }, [filteredSubjects]);







  const startSubject = async (
    subject: SubjectCard
  ) => {
    const savedAttempt = getSavedAttempt(subject.title, selectedMode);

    if (!savedAttempt) {
      const result = await canStartQuiz();

      if (!result.allowed) {
        alert(result.message);
        return;
      }
    }

    const modeSlug = getModeSlug(selectedMode);

    navigate(`${subject.path}?mode=${modeSlug}`);
  };

  const [category, setCategory] = useState("All Subjects");

  const categories = ["All Subjects", "Math", "English", "Reasoning", "Science", "Computer"];

  const categorySubjects: Record<string, string[]> = {

    "All Subjects": [], Math: ["Advanced Mathematics", "Basic Mathematics"],

    English: ["English"], Reasoning: ["IQ", "Analytical Reasoning", "Quantitative Reasoning"],

    Science: ["Physics"], Computer: ["Computer Science"]

  };

  const visibleSubjects = filteredSubjects.filter(subject => category === "All Subjects" || categorySubjects[category].includes(subject.title));

  const IconForMode = (mode: TestMode) => mode === "20 Questions" ? FileText : mode === "50 Questions" ? FileText : Timer;

  return (

    <MainLayout>

      <div className="mt-page" style={{

        "--mt-bg": isDark ? "#100D17" : "#F4F4FA",

        "--mt-card": isDark ? "#1C1426" : "#FFFFFF",

        "--mt-soft": isDark ? "#241B30" : "#FAF8FE",

        "--mt-border": isDark ? "rgba(171,132,255,.12)" : "#E4DDED",

        "--mt-text": isDark ? "#FFFFFF" : "#15111C",

        "--mt-muted": isDark ? "#C8BCD3" : "#6E6476"

      } as React.CSSProperties}>

        <div className="mt-shell">

          <header className="mt-banner">

            <div><span className="mt-eyebrow">PRACTICE CENTER</span><h1>Mock Tests</h1>

              <p>Take subject-wise tests, track your progress, and get closer to your dream university.</p></div>

            <div className="mt-banner-stat"><BarChart3 size={34} strokeWidth={1.8}/><div><strong>{subjects.length}</strong><span>Subjects Available</span></div></div>

          </header>

          <section className="mt-intro">

            <div><span className="mt-intro-tag"><Zap size={16} fill="currentColor"/> Start Practicing</span>

              <h2>Build your confidence with realistic practice tests.</h2>

              <p>Choose a subject, select a test mode, and start practicing. Track your progress and improve with every attempt.</p></div>

            <button className="mt-track" onClick={() => navigate("/analytics")}><Trophy size={31}/><span><strong>Track Progress</strong><small>See your improvement</small></span><ChevronRight size={21}/></button>

          </section>

          <section className="mt-main">

            <div className="mt-controls">

              <label className="mt-search"><Search size={20}/><input aria-label="Search subjects or topics" placeholder="Search subjects or topics..." value={search} onChange={e => setSearch(e.target.value)}/></label>

              <label className="mt-select"><GraduationCap size={22}/><select aria-label="Select university" value={selectedUniversity} onChange={e => setSelectedUniversity(e.target.value)}>{Object.keys(universitySubjects).map(uni => <option key={uni} value={uni}>{uni === "All" ? "All Universities" : `${uni} Recommended Subjects`}</option>)}</select></label>

              <div className="mt-modes">{testModes.map(mode => {const ModeIcon=IconForMode(mode);return <button key={mode} className={`mt-mode ${selectedMode===mode?'mt-active':''}`} onClick={() => setSelectedMode(mode)}><ModeIcon size={19}/>{mode}</button>})}</div>

            </div>

            <div className="mt-subrow"><div className="mt-categories">{categories.map(cat => <button key={cat} className={category===cat?'mt-active':''} onClick={() => setCategory(cat)}>{cat}</button>)}</div><div className="mt-difficulties"><span className="mt-easy">Easy: {difficultyCounts.Easy}</span><span className="mt-medium">Medium: {difficultyCounts.Medium}</span><span className="mt-hard">Hard: {difficultyCounts.Hard}</span></div></div>

            {visibleSubjects.length===0 ? <div className="mt-empty"><Search size={27}/><h3>No subjects found</h3><p>Try another search or change your filters.</p><button onClick={() => {setSearch('');setSelectedUniversity('All');setCategory('All Subjects');}}>Reset Filters</button></div> :

              <div className="mt-grid">
                {visibleSubjects.map((subject) => {
                  const SubjectIcon = subject.icon;

                  // Re-evaluate saved attempts after returning to this page.
                  void draftRefresh;

                  const savedAttempt = getSavedAttempt(
                    subject.title,
                    selectedMode
                  );

                  const answeredCount = savedAttempt
                    ? savedAttempt.userAnswers.filter(
                        (answer) => answer !== null && answer !== undefined
                      ).length
                    : 0;

                  const totalQuestions =
                    savedAttempt?.questionIds.length ?? 0;

                  return (
                    <button
                      className={`mt-subject ${
                        savedAttempt ? "mt-in-progress" : ""
                      }`}
                      key={subject.path}
                      onClick={() => startSubject(subject)}
                    >
                      <span className="mt-subject-icon">
                        <SubjectIcon size={31} strokeWidth={1.8} />
                      </span>

                      <span className="mt-subject-body">
                        <strong>{subject.title}</strong>

                        <span className="mt-subject-meta">
                          <span
                            className={`mt-difficulty mt-${subject.difficulty.toLowerCase()}`}
                          >
                            {subject.difficulty}
                          </span>

                          <span className="mt-question">
                            <FileText size={15} />
                            {questionCounts[subject.title] ?? 0} Questions
                          </span>
                        </span>

                        <small>{subject.desc}</small>

                        {savedAttempt && (
                          <span className="mt-continue-status">
                            ● In Progress — {answeredCount}/{totalQuestions} answered
                          </span>
                        )}
                      </span>

                      <span className="mt-chevron">
                        {savedAttempt ? (
                          <span className="mt-continue-text">Continue</span>
                        ) : (
                          <ChevronRight size={19} />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>}

            <div className="mt-daily"><div className="mt-daily-left"><span className="mt-calendar"><CalendarDays size={24}/></span><div><strong>Unlimited Practice</strong><p>All test modes are available to every student.</p></div></div></div>

          </section>

        </div>

      </div>

      <style>{` 

      .mt-page{min-height:100vh;padding:14px 26px 32px;background:var(--mt-bg);color:var(--mt-text);font-family:inherit;box-sizing:border-box}.mt-page *{box-sizing:border-box}.mt-shell{max-width:1600px;margin:auto}.mt-banner,.mt-intro{position:relative;overflow:hidden;background:linear-gradient(112deg,#291444 0%,#40178A 45%,#6927E6 78%,#2858E8 100%);color:white;border-radius:21px;display:flex;justify-content:space-between;align-items:center;gap:24px}.mt-banner:after,.mt-intro:after{content:"";position:absolute;width:145px;height:145px;background:rgba(255,255,255,.12);border-radius:50%;right:-52px;top:-72px;pointer-events:none}.mt-banner{min-height:145px;padding:24px 28px;margin-bottom:14px}.mt-eyebrow{font-size:12px;letter-spacing:1.1px;color:#C4A1FF;font-weight:800}.mt-banner h1{font-size:36px;line-height:1.1;letter-spacing:-.7px;margin:10px 0 6px;font-weight:800}.mt-banner p,.mt-intro p{font-size:16px;color:#E8E0F6;margin:0;line-height:1.5}.mt-banner-stat{z-index:1;display:flex;align-items:center;gap:20px;padding:19px 24px;border-radius:16px;border:1px solid rgba(255,255,255,.24);background:rgba(255,255,255,.12);min-width:230px}.mt-banner-stat div{display:flex;flex-direction:column;gap:2px}.mt-banner-stat strong{font-size:24px}.mt-banner-stat span{font-size:13px}.mt-intro{padding:16px 26px;min-height:136px;margin-bottom:14px}.mt-intro>div,.mt-track{z-index:1}.mt-intro-tag{display:inline-flex;align-items:center;gap:8px;padding:7px 12px;background:rgba(255,255,255,.13);border-radius:20px;font-size:12px;font-weight:650}.mt-intro h2{font-size:23px;line-height:1.3;margin:10px 0 6px;font-weight:800}.mt-intro p{font-size:14px}.mt-track{display:flex;align-items:center;gap:16px;padding:17px 20px;min-width:250px;border:1px solid rgba(255,255,255,.28);border-radius:15px;background:rgba(255,255,255,.14);color:white;text-align:left;cursor:pointer}.mt-track span{display:flex;flex:1;flex-direction:column;gap:4px}.mt-track strong{font-size:14px}.mt-track small{font-size:12px;color:#EEE7FF}.mt-main{padding:14px 16px 12px;background:var(--mt-card);border:1px solid var(--mt-border);border-radius:20px}.mt-controls{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,.9fr) auto;gap:12px;align-items:center}.mt-search,.mt-select{display:flex;align-items:center;gap:12px;border:1px solid #4B365D;border-radius:13px;background:var(--mt-soft);color:#C8A7F9;padding:0 15px;height:49px;min-width:0}.mt-search input,.mt-select select{width:100%;min-width:0;border:0;outline:0;background:transparent;color:var(--mt-text);font:inherit;font-size:13px}.mt-search input::placeholder{color:var(--mt-muted)}.mt-select select option{background:var(--mt-card);color:var(--mt-text)}.mt-modes{display:flex;gap:9px;flex-wrap:wrap}.mt-mode,.mt-categories button{border:1px solid var(--mt-border);border-radius:13px;background:var(--mt-soft);color:var(--mt-text);cursor:pointer;white-space:nowrap}.mt-mode{height:49px;display:flex;align-items:center;justify-content:center;gap:9px;padding:0 16px;font-size:13px}.mt-mode.mt-active,.mt-categories button.mt-active{background:linear-gradient(115deg,#7740E7,#6427E8);border-color:transparent;color:white}.mt-mode:disabled{opacity:.55;cursor:wait}.mt-subrow{display:flex;justify-content:space-between;align-items:center;gap:14px;margin:9px 0 14px}.mt-categories{display:flex;gap:9px;flex-wrap:wrap}.mt-categories button{border-radius:25px;padding:8px 15px;font-size:12px}.mt-difficulties{display:flex;gap:16px;white-space:nowrap;font-size:12px}.mt-easy{color:#4ADE80}.mt-medium{color:#FBBF24}.mt-hard{color:#FB7185}.mt-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px}.mt-subject{display:flex;align-items:center;gap:13px;text-align:left;min-width:0;min-height:113px;padding:12px;background:var(--mt-soft);color:var(--mt-text);border:1px solid var(--mt-border);border-radius:15px;cursor:pointer;transition:transform .15s,border-color .15s}.mt-subject:hover{transform:translateY(-2px);border-color:#8052D4}.mt-subject-icon{display:flex;align-items:center;justify-content:center;flex:0 0 63px;height:68px;border:1px solid rgba(171,132,255,.22);border-radius:14px;background:rgba(124,58,237,.12);color:#C69CFF}.mt-subject-body{display:flex;flex:1;flex-direction:column;gap:7px;min-width:0}.mt-subject-body>strong{font-size:13px;line-height:1.25;font-weight:750}.mt-subject-meta{display:flex;gap:12px;align-items:center;flex-wrap:wrap}.mt-difficulty{padding:4px 8px;border-radius:25px;font-size:11px;border:1px solid var(--mt-border)}.mt-difficulty.mt-easy{color:#4ADE80;background:rgba(34,197,94,.10);border-color:rgba(34,197,94,.2)}.mt-difficulty.mt-medium{color:#FBBF24;background:rgba(245,158,11,.10);border-color:rgba(245,158,11,.2)}.mt-difficulty.mt-hard{color:#FB7185;background:rgba(244,63,94,.10);border-color:rgba(244,63,94,.2)}.mt-question{display:inline-flex;align-items:center;gap:5px;font-size:11px;white-space:nowrap;color:var(--mt-muted)}.mt-question svg{color:#C69CFF}.mt-subject-body small{color:var(--mt-muted);font-size:11px;line-height:1.35}.mt-chevron{display:flex;align-items:center;justify-content:center;flex:0 0 30px;height:30px;border-radius:50%;background:rgba(171,132,255,.14);color:var(--mt-text);align-self:flex-start}.mt-subject.mt-in-progress{border-color:rgba(34,197,94,.42);background:linear-gradient(135deg,var(--mt-soft),rgba(34,197,94,.06))}.mt-continue-status{display:flex;align-items:center;margin-top:2px;font-size:11px;font-weight:700;color:#22C55E}.mt-continue-text{font-size:10px;font-weight:800;color:#22C55E;white-space:nowrap}.mt-in-progress .mt-chevron{width:auto;flex-basis:auto;padding:0 9px;border-radius:10px;background:rgba(34,197,94,.12)}.mt-daily{display:flex;align-items:center;justify-content:space-between;gap:20px;background:linear-gradient(110deg,#30184D,#4B218A);border:1px solid rgba(171,132,255,.15);border-radius:14px;margin-top:13px;padding:11px 14px;color:white}.mt-daily-left{display:flex;align-items:center;gap:13px}.mt-calendar{display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:12px;background:rgba(124,58,237,.28);color:#D2B5FF}.mt-daily-left strong{font-size:13px}.mt-daily-left p{margin:4px 0 0;font-size:12px;color:#DCD0ED}.mt-daily-right{width:260px;max-width:100%;font-size:12px;color:#E5D7F9}.mt-progress{height:9px;background:rgba(255,255,255,.18);border-radius:20px;overflow:hidden;margin-top:8px}.mt-progress div{height:100%;background:#22C55E;border-radius:20px}.mt-empty{text-align:center;padding:35px;color:var(--mt-muted)}.mt-empty button{border:0;border-radius:10px;padding:10px 16px;background:#7C3AED;color:white;cursor:pointer}@media(max-width:1450px){.mt-controls{grid-template-columns:1fr 1fr}.mt-modes{grid-column:1/-1}.mt-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:760px){.mt-page{padding:14px}.mt-banner,.mt-intro{flex-direction:column;align-items:stretch}.mt-banner-stat,.mt-track{min-width:0}.mt-controls{grid-template-columns:1fr}.mt-modes{grid-column:auto}.mt-subrow{align-items:flex-start;flex-direction:column}.mt-grid{grid-template-columns:1fr}.mt-daily{flex-direction:column;align-items:stretch}.mt-daily-right{width:100%}}@media(max-width:400px){.mt-mode{padding:0 10px;font-size:11px}.mt-subject-icon{flex-basis:52px;height:56px}.mt-banner h1{font-size:30px}}

      `}</style>

    </MainLayout>

  );

}
