import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import type { CSSProperties } from "react";
import { useTheme } from "../context/ThemeContext";

type University = {
  name: string;
  tag: string;
  desc: string;
  color: string;
  logo: string;
  campuses: string[];
  csSubjects: string[];
  type: "Public" | "Private";
  focus: "CS" | "Engineering" | "Technology" | "Research";
  fee: "$" | "$$" | "$$$";
};

type Filter = "All" | "Public" | "Private" | "Lahore" | "CS" | "Engineering" | "Affordable";

export default function Universities() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [openName, setOpenName] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [compareList, setCompareList] = useState<University[]>([]);

  const toggleCompare = (u: University) => {
    const exists = compareList.some((item) => item.name === u.name);

    if (exists) {
      setCompareList(compareList.filter((item) => item.name !== u.name));
      return;
    }

    if (compareList.length >= 3) {
      alert("You can compare up to 3 universities only.");
      return;
    }

    setCompareList([...compareList, u]);
  };

  const colors = {
    page: isDark ? "#09070F" : "#F4F4FA",
    card: isDark ? "#1C1426" : "#FFFFFF", 
    cardSoft: isDark ? "#241B30" : "#FAF8FE",
    text: isDark ? "#FFFFFF" : "#15111C",
    muted: isDark ? "#C8BCD3" : "#6E6476",
    border: isDark ? "rgba(171,132,255,.12)" : "#E4DDED",
    input: isDark ? "#21152D" : "#FFFFFF",
    purple: "#7C3AED",
    purpleDark: "#4C1D95",
    purpleDeep: "#2D125B",
    purpleSoft: isDark ? "rgba(124,58,237,.16)" : "#F0E9FF",
    green: "#22C55E",
    blue: "#38BDF8",
    orange: "#F97316",
    pink: "#EC4899",
    red: "#EF4444",
    cyan: "#06B6D4",
  };

  const universities: University[] = [
    {
      name: "FAST NUCES",
      logo: "/logos/fast.png",
      tag: "Pakistan's Top CS University",
      desc: "FAST National University is widely regarded as Pakistan's leading university for Computer Science, Software Engineering, Artificial Intelligence, Data Science, and Cyber Security.",
      color: "#EF4444",
      type: "Private",
      focus: "CS",
      fee: "$$$",
      campuses: [
        "Islamabad",
        "Lahore",
        "Karachi",
        "Peshawar",
        "Chiniot-Faisalabad",
        "Multan",
      ],
      csSubjects: [
        "Advanced Mathematics",
        "Basic Mathematics",
        "IQ / Analytical Reasoning",
        "English",
      ],
    },
    {
      name: "COMSATS",
      logo: "/logos/comsats.png",
      tag: "Leading Public University",
      desc: "COMSATS University Islamabad is one of Pakistan's leading public universities for Computer Science, Software Engineering, Artificial Intelligence, Data Science, and Cyber Security.",
      color: "#10B981",
      type: "Public",
      focus: "CS",
      fee: "$$",
      campuses: [
        "Islamabad",
        "Lahore",
        "Abbottabad",
        "Wah",
        "Attock",
        "Sahiwal",
        "Vehari",
      ],
      csSubjects: [
        "English",
        "Analytical Reasoning",
        "Quantitative Reasoning",
        "Physics",
        "Computer Science",
        "Mathematics",
      ],
    },
    {
      name: "NUST",
      logo: "/logos/nust.png",
      tag: "Pakistan's #1 Engineering University",
      desc: "The National University of Sciences and Technology (NUST) is internationally recognized for engineering, Computer Science, Artificial Intelligence, and research excellence.",
      color: "#3B82F6",
      type: "Public",
      focus: "Engineering",
      fee: "$$",
      campuses: ["Islamabad", "Rawalpindi", "Karachi", "Quetta", "Risalpur"],
      csSubjects: ["Mathematics", "Physics", "English"],
    },
    {
      name: "UET",
      logo: "/logos/uet.png",
      tag: "Top Engineering University",
      desc: "UET Lahore is one of Pakistan's oldest and most prestigious public engineering universities, offering excellent Computer Science and engineering programs.",
      color: "#F59E0B",
      type: "Public",
      focus: "Engineering",
      fee: "$",
      campuses: ["Lahore", "Kala Shah Kaku", "Faisalabad", "Narowal", "RCET Gujranwala"],
      csSubjects: ["Mathematics", "Physics", "Computer Science", "English"],
    },
    {
      name: "GIKI",
      logo: "/logos/giki.png",
      tag: "Elite Engineering University",
      desc: "Located in Topi, Swabi, GIKI is among Pakistan's most prestigious universities for engineering, Computer Science, Artificial Intelligence, and research.",
      color: "#A855F7",
      type: "Private",
      focus: "Engineering",
      fee: "$$$",
      campuses: ["Topi, Swabi"],
      csSubjects: ["Mathematics", "Physics", "English"],
    },
    {
      name: "ITU",
      logo: "/logos/itu.png",
      tag: "Technology University",
      desc: "Information Technology University (ITU) Lahore specializes in Computer Science, Artificial Intelligence, Data Science, Software Engineering, and emerging technologies.",
      color: "#06B6D4",
      type: "Public",
      focus: "Technology",
      fee: "$$",
      campuses: ["Lahore"],
      csSubjects: ["Basic Mathematics", "Analytical Reasoning"],
    },
    {
      name: "FCCU",
      logo: "/logos/fccu.png",
      tag: "Top Private University",
      desc: "Forman Christian College (A Chartered University) is one of Pakistan's oldest and most respected universities with excellent computing programs.",
      color: "#2563EB",
      type: "Private",
      focus: "CS",
      fee: "$$$",
      campuses: ["Lahore"],
      csSubjects: ["Mathematics", "English", "Computer Science"],
    },
    {
      name: "Government College University",
      logo: "/logos/gcu.png",
      tag: "Historic Public University",
      desc: "Government College University Lahore is one of Pakistan's most prestigious public universities with strong Computer Science and research programs.",
      color: "#F59E0B",
      type: "Public",
      focus: "CS",
      fee: "$",
      campuses: ["Lahore"],
      csSubjects: ["Mathematics", "Analytical Reasoning", "English"],
    },
    {
      name: "LUMS",
      logo: "/logos/lums.png",
      tag: "Pakistan's Leading Private University",
      desc: "LUMS is internationally recognized for Computer Science, Artificial Intelligence, Mathematics, business, and interdisciplinary research.",
      color: "#8B5CF6",
      type: "Private",
      focus: "Research",
      fee: "$$$",
      campuses: ["Lahore"],
      csSubjects: ["General Knowledge", "Mathematics", "English"],
    },
    {
      name: "PIEAS",
      logo: "/logos/pieas.png",
      tag: "Research University",
      desc: "Pakistan Institute of Engineering and Applied Sciences (PIEAS) is renowned for engineering, Computer Science, and advanced scientific research.",
      color: "#0EA5E9",
      type: "Public",
      focus: "Research",
      fee: "$$",
      campuses: ["Islamabad"],
      csSubjects: ["Mathematics", "Physics", "Computer Science", "English"],
    },
    {
      name: "PUCIT",
      logo: "/logos/pucit.png",
      tag: "Top Public CS Institute",
      desc: "Punjab University College of Information Technology (PUCIT) is one of Pakistan's best public institutes for Computer Science, Software Engineering, Artificial Intelligence, and Information Technology.",
      color: "#16A34A",
      type: "Public",
      focus: "CS",
      fee: "$",
      campuses: ["Old Campus", "Allama Iqbal Campus"],
      csSubjects: [
        "Mathematics",
        "English",
        "Quantitative Reasoning",
        "Physics",
        "Computer Science",
      ],
    },
    {
      name: "University of Central Punjab",
      logo: "/logos/ucp.png",
      tag: "Modern Private University",
      desc: "UCP offers quality programs in Computer Science, Artificial Intelligence, Software Engineering, Data Science, and Cyber Security.",
      color: "#DC2626",
      type: "Private",
      focus: "CS",
      fee: "$$",
      campuses: ["Lahore"],
      csSubjects: ["Mathematics", "English", "Analytical Reasoning", "Computer Science"],
    },
    {
      name: "University of Management and Technology",
      logo: "/logos/umt.png",
      tag: "Technology-Focused University",
      desc: "UMT provides modern computing programs including Computer Science, Artificial Intelligence, Data Science, Cyber Security, and Software Engineering.",
      color: "#14B8A6",
      type: "Private",
      focus: "Technology",
      fee: "$$",
      campuses: ["Lahore"],
      csSubjects: ["Mathematics", "English"],
    },
    {
      name: "University of Lahore",
      logo: "/logos/uol.png",
      tag: "Large Private University",
      desc: "The University of Lahore is one of Pakistan's largest private universities, offering a wide range of computing and engineering programs.",
      color: "#EC4899",
      type: "Private",
      focus: "CS",
      fee: "$$",
      campuses: ["Lahore", "Islamabad", "Sargodha", "Gujrat", "Pakpattan"],
      csSubjects: ["Mathematics", "English", "Analytical Reasoning", "Computer Science", "Physics"],
    },
    {
      name: "Air University",
      logo: "/logos/air.png",
      tag: "Top Computing University",
      desc: "Air University is one of Pakistan's leading universities for Computer Science, Artificial Intelligence, Cyber Security, Software Engineering, and Data Science.",
      color: "#2563EB",
      type: "Public",
      focus: "CS",
      fee: "$$",
      campuses: ["Islamabad", "Multan", "Kamra"],
      csSubjects: ["Mathematics", "English", "Physics"],
    },
    {
      name: "Bahria University",
      logo: "/logos/bahria.png",
      tag: "Leading Private University",
      desc: "Bahria University offers highly respected programs in Computer Science, Artificial Intelligence, Software Engineering, Cyber Security, and Information Technology.",
      color: "#0F766E",
      type: "Private",
      focus: "CS",
      fee: "$$",
      campuses: ["Islamabad", "Karachi", "Lahore"],
      csSubjects: [
        "Mathematics",
        "English",
        "Physics",
        "Analytical Reasoning",
        "Quantitative Reasoning",
      ],
    },
    {
      name: "NED University",
      logo: "/logos/ned.png",
      tag: "Top Public Engineering University",
      desc: "NED University of Engineering and Technology is one of Pakistan's leading public engineering universities with excellent Computer Science and Software Engineering programs.",
      color: "#EA580C",
      type: "Public",
      focus: "Engineering",
      fee: "$",
      campuses: ["Karachi"],
      csSubjects: ["Mathematics", "Physics", "English", "Computer Science"],
    },
    {
      name: "SZABIST",
      logo: "/logos/szabist.png",
      tag: "Technology & Business University",
      desc: "SZABIST is a well-known private university offering Computer Science, Artificial Intelligence, Data Science, Software Engineering, and Information Technology.",
      color: "#7C3AED",
      type: "Private",
      focus: "Technology",
      fee: "$$",
      campuses: ["Karachi", "Islamabad", "Hyderabad", "Larkana", "Dubai"],
      csSubjects: ["Mathematics", "English", "Computer Science"],
    },
  ];

  const filteredUniversities = useMemo(() => {
    const q = search.trim().toLowerCase();

    return universities.filter((u) => {
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.tag.toLowerCase().includes(q) ||
        u.desc.toLowerCase().includes(q) ||
        u.campuses.some((campus) => campus.toLowerCase().includes(q)) ||
        u.csSubjects.some((subject) => subject.toLowerCase().includes(q));

      const matchesFilter = (() => {
        switch (activeFilter) {
          case "Public":
            return u.type === "Public";

          case "Private":
            return u.type === "Private";

          case "Lahore":
            return u.campuses.some(
              (campus) => campus.toLowerCase() === "lahore"
            );

          case "CS":
            return (
              u.focus === "CS" ||
              u.focus === "Technology" ||
              u.desc.toLowerCase().includes("computer science")
            );

          case "Engineering":
            return (
              u.focus === "Engineering" ||
              u.desc.toLowerCase().includes("engineering")
            );

          case "Affordable":
            return u.fee === "$";

          case "All":
          default:
            return true;
        }
      })();

      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const getCategoryColor = (_u: University) => {
    return colors.purple;
  };

  const pageStyle = {
    ...styles.page,
    background: colors.page,
    color: colors.text,
  };

  const filters: Filter[] = ["All", "Public", "Private", "Lahore", "CS", "Engineering", "Affordable"];

  return (
    <MainLayout>
      <div style={pageStyle} className="universities-page">
        <div style={styles.topRow} className="universities-top-row">
          <div>
            <p style={{ ...styles.eyebrow, color: colors.purple }}>University Explorer</p>
            <h1 style={{ ...styles.title, color: colors.text }}>Universities</h1>
          </div>
        </div>

        <div style={styles.hero} className="universities-hero">
          <div style={styles.heroGlowOne} />
          <div style={styles.heroGlowTwo} />

          <div style={styles.heroContent}>
            <div style={styles.heroBadge}>🎓 CS & Engineering admissions</div>
            <h2 style={styles.heroTitle}>Choose your target university with confidence.</h2>
            <p style={styles.heroText}>
              Search by university, city, subject, or type. Open any card to view the exact entry test
              subjects and campuses.
            </p>
          </div>

          <div style={styles.heroStats}>
            <strong>{universities.length}</strong>
            <span>universities listed</span>
          </div>
        </div>

        <div style={styles.shortcut} className="universities-shortcut">
          <div>
            <h3 style={styles.shortcutTitle}>Not sure which university is right for you?</h3>
            <p style={styles.shortcutText}>
              Match yourself by city, budget, merit, and degree preference.
            </p>
          </div>

          <button style={styles.matchBtn} onClick={() => navigate("/university-match")}>
            Find My University →
          </button>
        </div>

        <div
          style={{
            ...styles.searchPanel,
            background: colors.card,
            border: `1px solid ${colors.border}`,
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search universities, cities, or subjects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              ...styles.searchInput,
              background: colors.input,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          />

          <div style={styles.filters}>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  ...styles.filterBtn,
                  background: activeFilter === filter ? colors.purple : colors.cardSoft,
                  color: activeFilter === filter ? "#FFFFFF" : colors.text,
                  border: `1px solid ${
                    activeFilter === filter ? colors.purple : colors.border
                  }`,
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {compareList.length > 0 && (
          <div
            style={{
              ...styles.compareBar,
              background: colors.card,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div>
              <strong>Compare list:</strong>{" "}
              <span style={{ color: colors.muted }}>
                {compareList.map((u) => u.name).join(" vs ")}
              </span>
            </div>

            <button style={styles.clearBtn} onClick={() => setCompareList([])}>
              Clear
            </button>
          </div>
        )}

        {compareList.length >= 2 && (
          <div
            className="university-comparison"
            style={{
              marginBottom: 25,
              padding: 25,
              borderRadius: 20,
              overflowX: "auto",
              background: colors.card,
              border: `1px solid ${colors.border}`,
            }}
          >
            <h2 style={{ margin: "0 0 20px", color: colors.text }}>
              University Comparison
            </h2>

            <table
              className="university-comparison-desktop"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <tbody>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: 18,
                      fontWeight: 900,
                      minWidth: 180,
                      color: colors.text,
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    University
                  </th>
                  {compareList.map((u) => (
                    <td
                      key={u.name}
                      style={{
                        padding: 18,
                        lineHeight: 1.6,
                        color: colors.text,
                        borderBottom: `1px solid ${colors.border}`,
                      }}
                    >
                      <strong>{u.name}</strong>
                    </td>
                  ))}
                </tr>

                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: 18,
                      fontWeight: 900,
                      minWidth: 180,
                      color: colors.text,
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    Type
                  </th>
                  {compareList.map((u) => (
                    <td
                      key={u.name}
                      style={{
                        padding: 18,
                        lineHeight: 1.6,
                        color: colors.muted,
                        borderBottom: `1px solid ${colors.border}`,
                      }}
                    >
                      {u.type}
                    </td>
                  ))}
                </tr>

                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: 18,
                      fontWeight: 900,
                      minWidth: 180,
                      color: colors.text,
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    Focus
                  </th>
                  {compareList.map((u) => (
                    <td
                      key={u.name}
                      style={{
                        padding: 18,
                        lineHeight: 1.6,
                        color: colors.muted,
                        borderBottom: `1px solid ${colors.border}`,
                      }}
                    >
                      {u.focus}
                    </td>
                  ))}
                </tr>

                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: 18,
                      fontWeight: 900,
                      minWidth: 180,
                      color: colors.text,
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    Fee Level
                  </th>
                  {compareList.map((u) => (
                    <td
                      key={u.name}
                      style={{
                        padding: 18,
                        lineHeight: 1.6,
                        color: colors.muted,
                        borderBottom: `1px solid ${colors.border}`,
                      }}
                    >
                      {u.fee}
                    </td>
                  ))}
                </tr>

                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: 18,
                      fontWeight: 900,
                      minWidth: 180,
                      color: colors.text,
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    Campuses
                  </th>
                  {compareList.map((u) => (
                    <td
                      key={u.name}
                      style={{
                        padding: 18,
                        lineHeight: 1.6,
                        color: colors.muted,
                        borderBottom: `1px solid ${colors.border}`,
                      }}
                    >
                      {u.campuses.length}
                    </td>
                  ))}
                </tr>

                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: 18,
                      fontWeight: 900,
                      minWidth: 180,
                      color: colors.text,
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    Campus Names
                  </th>
                  {compareList.map((u) => (
                    <td
                      key={u.name}
                      style={{
                        padding: 18,
                        lineHeight: 1.6,
                        color: colors.muted,
                        borderBottom: `1px solid ${colors.border}`,
                      }}
                    >
                      {u.campuses.join(", ")}
                    </td>
                  ))}
                </tr>

                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: 18,
                      fontWeight: 900,
                      minWidth: 180,
                      color: colors.text,
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    Entry Test Subjects
                  </th>
                  {compareList.map((u) => (
                    <td
                      key={u.name}
                      style={{
                        padding: 18,
                        lineHeight: 1.6,
                        color: colors.muted,
                        borderBottom: `1px solid ${colors.border}`,
                      }}
                    >
                      {u.csSubjects.join(", ")}
                    </td>
                  ))}
                </tr>

                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: 18,
                      fontWeight: 900,
                      minWidth: 180,
                      color: colors.text,
                    }}
                  >
                    Category
                  </th>
                  {compareList.map((u) => (
                    <td
                      key={u.name}
                      style={{
                        padding: 18,
                        lineHeight: 1.6,
                        color: colors.muted,
                      }}
                    >
                      {u.tag}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>

            <div className="university-comparison-mobile">
              {compareList.map((u) => (
                <div
                  key={u.name}
                  className="university-comparison-mobile-card"
                  style={{
                    background: colors.cardSoft,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <h3 style={{ color: colors.text }}>{u.name}</h3>

                  {[
                    ["Type", u.type],
                    ["Focus", u.focus],
                    ["Fee Level", u.fee],
                    ["Campuses", String(u.campuses.length)],
                    ["Campus Names", u.campuses.join(", ")],
                    ["Entry Test Subjects", u.csSubjects.join(", ")],
                    ["Category", u.tag],
                  ].map(([label, value]) => (
                <div
                  key={label}
                  className="university-comparison-mobile-row"
                  style={{ borderTop: `1px solid ${colors.border}` }}
                >
                  <strong style={{ color: colors.text }}>{label}</strong>
                  <span style={{ color: colors.muted }}>{value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
          </div>
        )}

        <div style={styles.resultMeta}>
          <span style={{ color: colors.muted }}>
            Showing <strong style={{ color: colors.text }}>{filteredUniversities.length}</strong> universities
          </span>
        </div>

<div style={styles.grid} className="universities-grid">
  {filteredUniversities.map((u) => {
    const isOpen = openName === u.name;
    const accent = getCategoryColor(u);
    const isCompared = compareList.some((item) => item.name === u.name);

            return (
              <div
                key={u.name}
                style={{
                  ...styles.card,
                  background: colors.card,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  borderLeft: `3px solid ${accent}`,
                }}
              >
                <div style={styles.cardTop} className="universities-card-top">
                  <div style={styles.header}>
                    <img src={u.logo} alt={u.name} style={styles.logo} />

                    <div>
                      <h2 style={{ ...styles.cardTitle, color: colors.text }}>
                        {u.name}
                      </h2>
                      <p style={{ ...styles.cardMini, color: colors.muted }}>
                        {u.type} • {u.focus} •{" "}
                        <span style={{ whiteSpace: "nowrap" }}>Fee {u.fee}</span>
                      </p>
                    </div>
                  </div>

                  <span
                    style={{
                      ...styles.tag,
                      border: `1px solid ${accent}`,
                      color: accent,
                      background: `${accent}18`,
                    }}
                  >
                    {u.tag}
                  </span>
                </div>

                <p style={{ ...styles.desc, color: colors.muted }}>{u.desc}</p>

                <div style={styles.infoGrid} className="universities-info-grid">
                  <div
                    style={{
                      ...styles.infoBox,
                      background: colors.cardSoft,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <span style={{ color: colors.muted }}>University Focus</span>
                    <strong style={{ color: accent }}>{u.focus}</strong>
                  </div>

                  <div
                    style={{
                      ...styles.infoBox,
                      background: colors.cardSoft,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <span style={{ color: colors.muted }}>Campuses</span>
                    <strong>{u.campuses.length}</strong>
                  </div>

                  <div
                    style={{
                      ...styles.infoBox,
                      background: colors.cardSoft,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <span style={{ color: colors.muted }}>Subjects</span>
                    <strong>{u.csSubjects.length}</strong>
                  </div>
                </div>

                <div style={styles.actions}>
                  <button
                    onClick={() => setOpenName(isOpen ? null : u.name)}
                    style={{
                      ...styles.button,
                      background: accent,
                    }}
                  >
                    {isOpen ? "Hide Details ↑" : "View Details ↓"}
                  </button>

                  <button
                    onClick={() => navigate("/mock-test")}
                    style={{
                      ...styles.outlineBtn,
                      color: accent,
                      border: `1px solid ${accent}`,
                      background: "transparent",
                    }}
                  >
                    Start Test →
                  </button>

                  <button
                    onClick={() => toggleCompare(u)}
                    style={{
                      ...styles.compareBtn,
                      color: isCompared ? "#FFFFFF" : accent,
                      border: `1px solid ${accent}`,
                      background: isCompared ? accent : "transparent",
                    }}
                  >
                    {isCompared ? "Added" : "Compare"}
                  </button>
                </div>

                {isOpen && (
                  <div
                    style={{
                      ...styles.dropdown,
                      background: colors.cardSoft,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <div style={styles.dropdownGrid} className="universities-dropdown-grid">
                      <div>
                        <h3 style={{ ...styles.dropdownTitle, color: colors.text }}>
                          Entry Test Subjects
                        </h3>

                        <div style={styles.subjectList}>
                          {u.csSubjects.map((subject) => (
                            <span
                              key={subject}
                              style={{
                                ...styles.subjectPill,
                                background: `${accent}18`,
                                color: colors.text,
                                border: `1px solid ${colors.border}`,
                              }}
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 style={{ ...styles.dropdownTitle, color: colors.text }}>
                          Campuses
                        </h3>

                        <div style={styles.subjectList}>
                          {u.campuses.map((campus) => (
                            <span
                              key={campus}
                              style={{
                                ...styles.subjectPill,
                                background: colors.card,
                                color: colors.text,
                                border: `1px solid ${colors.border}`,
                              }}
                            >
                              📍 {campus}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* University suggestion callout */}
        <div
          style={{
            marginTop: 26,
            padding: "24px",
            borderRadius: 22,
            background: colors.card,
            border: `1px solid ${colors.border}`,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 18,
          }}
        >
          <div style={{ flex: "1 1 260px" }}>
            <h2 style={{ margin: "0 0 8px", fontSize: 21, color: colors.text }}>
              Can’t find your university?
            </h2>
            <p style={{ margin: 0, color: colors.muted, lineHeight: 1.65 }}>
              Help us expand PrepPath! Send us the university’s name, city, and
              official website, and we’ll review it for inclusion.
            </p>
          </div>
          <a
            href="mailto:preppath.support@gmail.com?subject=Suggest%20a%20University"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "13px 18px",
              borderRadius: 13,
              background: "linear-gradient(135deg,#7C3AED,#4C1D95)",
              color: "#FFFFFF",
              fontWeight: 850,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Suggest a University →
          </a>
        </div>

        {filteredUniversities.length === 0 && (
          <div
            style={{
              ...styles.emptyState,
              background: colors.card,
              border: `1px dashed ${colors.border}`,
            }}
          >
            <h3>No universities found</h3>
            <p style={{ color: colors.muted }}>
              Try searching another city, subject, or university name.
            </p>
          </div>
        )}

        <style>{`
          .universities-page {
            width: 100%;
            box-sizing: border-box;
          }

          .universities-grid > div {
            transition:
              transform .2s ease,
              box-shadow .2s ease,
              border-color .2s ease;
          }

          .universities-grid > div:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 28px rgba(76,29,149,.10) !important;
          }

          .universities-hero strong {
            font-size: 42px;
            font-weight: 950;
            line-height: 1;
          }

          .universities-hero span {
            font-size: 13px;
            font-weight: 750;
          }

          .university-comparison-mobile {
           display: none;
          }

          @media (max-width: 1050px) {
            .universities-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 820px) {
            .universities-page {
              padding: 28px 22px !important;
            }

            .universities-top-row,
            .universities-hero,
            .universities-shortcut {
              flex-direction: column;
              align-items: stretch !important;
            }

            .universities-hero > div:last-child {
              min-width: 0 !important;
              width: 100%;
              box-sizing: border-box;
            }

            .universities-card-top {
              flex-direction: column;
            }

            .universities-info-grid,
            .universities-dropdown-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 520px) {
            .universities-page {
              padding: 22px 14px !important;
            }

            .universities-grid {
              gap: 14px !important;
            }

            .universities-hero {
              padding: 26px !important;
              border-radius: 22px !important;
            }

            .university-comparison {
              padding: 16px !important;
              overflow-x: visible !important;
            }

            .university-comparison-desktop {
              display: none !important;
            }

            .university-comparison-mobile {
              display: grid;
              gap: 14px;
            }

            .university-comparison-mobile-card {
              min-width: 0;
              padding: 16px;
              border-radius: 16px;
            }

            .university-comparison-mobile-card h3 {
              margin: 0 0 12px;
              font-size: 17px;
              line-height: 1.3;
            }

            .university-comparison-mobile-row {
              display: grid;
              grid-template-columns: 92px minmax(0, 1fr);
              gap: 12px;
              padding: 10px 0;
              font-size: 12px;
              line-height: 1.5;
            }

            .university-comparison-mobile-row strong,
            .university-comparison-mobile-row span {
              min-width: 0;
              overflow-wrap: anywhere;
            }
          }
        `}</style>
      </div>
    </MainLayout>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    flex: 1,
    padding: 40,
    minHeight: "100vh",
    transition: "background 0.25s ease, color 0.25s ease",
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    marginBottom: 22,
  },

  eyebrow: {
    margin: 0,
    fontSize: 13,
    fontWeight: 900,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  title: {
    fontSize: 38,
    fontWeight: 900,
    margin: "6px 0 0",
  },

  hero: {
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
    overflow: "hidden",
    background:
      "linear-gradient(135deg,#2A0F50 0%,#4C1D95 44%,#6D28D9 72%,#3B82F6 120%)",
    color: "#FFFFFF",
    padding: 34,
    borderRadius: 28,
    marginBottom: 18,
    boxShadow: "0 26px 60px rgba(76,29,149,0.34)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
  },

  heroGlowOne: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.18)",
    top: -80,
    right: -60,
  },

  heroGlowTwo: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.14)",
    bottom: -60,
    left: "42%",
  },

  heroContent: {
    position: "relative",
    zIndex: 1,
    maxWidth: 780,
  },

  heroBadge: {
    display: "inline-flex",
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.17)",
    border: "1px solid rgba(255,255,255,0.28)",
    fontSize: 13,
    fontWeight: 800,
    marginBottom: 14,
  },

  heroTitle: {
    margin: 0,
    fontSize: 38,
    fontWeight: 950,
    lineHeight: 1.15,
    color: "#FFFFFF",
  },

  heroText: {
    marginTop: 12,
    marginBottom: 0,
    color: "#FFFFFF",
    opacity: 0.92,
    lineHeight: 1.7,
  },

  heroStats: {
    position: "relative",
    zIndex: 1,
    minWidth: 190,
    padding: 24,
    borderRadius: 24,
    background: "rgba(255,255,255,0.16)",
    border: "1px solid rgba(255,255,255,0.26)",
    textAlign: "center",
    backdropFilter: "blur(12px)",
    display: "grid",
    gap: 5,
  },

  shortcut: {
    marginBottom: 18,
    background: "linear-gradient(135deg,#2D125B 0%,#4C1D95 48%,#7C3AED 100%)",
    borderRadius: 22,
    padding: 24,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    boxShadow: "0 18px 38px rgba(76,29,149,0.24)",
  },

  shortcutTitle: {
    margin: 0,
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: 900,
  },

  shortcutText: {
    margin: "8px 0 0",
    color: "#FFFFFF",
    opacity: 0.9,
  },

  matchBtn: {
    background: "#FFFFFF",
    color: "#4C1D95",
    border: "none",
    padding: "13px 18px",
    borderRadius: 14,
    fontWeight: 900,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  searchPanel: {
    padding: 18,
    borderRadius: 22,
    marginBottom: 16,
    boxShadow: "0 16px 34px rgba(0,0,0,0.08)",
  },

  searchInput: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 14,
    fontSize: 16,
    outline: "none",
    boxSizing: "border-box",
    marginBottom: 13,
  },

  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },

  filterBtn: {
    padding: "9px 13px",
    borderRadius: 999,
    cursor: "pointer",
    fontWeight: 850,
  },

  compareBar: {
    padding: "13px 16px",
    borderRadius: 18,
    marginBottom: 14,
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "center",
  },

  clearBtn: {
    background: "rgba(239,68,68,0.14)",
    color: "#EF4444",
    border: "1px solid rgba(239,68,68,0.28)",
    padding: "8px 12px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 900,
  },

  resultMeta: {
    margin: "8px 0 16px",
    fontSize: 14,
    fontWeight: 700,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))",
    gap: 20,
  },

  card: {
    padding: 24,
    borderRadius: 24,
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 14,
    alignItems: "flex-start",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    minWidth: 0,
  },

  logo: {
    width: 58,
    height: 58,
    objectFit: "contain",
    borderRadius: 14,
    background: "#FFFFFF",
    padding: 7,
    flexShrink: 0,
  },

  cardTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 950,
    lineHeight: 1.15,
  },

  cardMini: {
    margin: "6px 0 0",
    fontSize: 13,
    fontWeight: 800,
  },

  tag: {
    display: "inline-block",
    padding: "7px 10px",
    fontSize: 12,
    borderRadius: 999,
    fontWeight: 900,
    whiteSpace: "normal",
    maxWidth: 220,
    overflowWrap: "break-word",
     textAlign: "center",
  },

  desc: {
    marginTop: 14,
    lineHeight: 1.62,
    minHeight: 82,
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
    marginTop: 16,
  },

  infoBox: {
    padding: "12px 13px",
    borderRadius: 15,
    display: "grid",
    gap: 4,
    fontSize: 13,
  },

  actions: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 16,
  },

  button: {
    padding: "11px 15px",
    border: "none",
    borderRadius: 13,
    color: "#FFFFFF",
    cursor: "pointer",
    fontWeight: 900,
  },

  outlineBtn: {
    padding: "11px 15px",
    borderRadius: 13,
    cursor: "pointer",
    fontWeight: 900,
  },

  compareBtn: {
    padding: "11px 15px",
    borderRadius: 13,
    cursor: "pointer",
    fontWeight: 900,
  },

  dropdown: {
    marginTop: 16,
    padding: 18,
    borderRadius: 18,
  },

  dropdownGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 18,
  },

  dropdownTitle: {
    margin: 0,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 950,
  },

  subjectList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },

  subjectPill: {
    padding: "8px 10px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 850,
  },

  emptyState: {
    padding: 26,
    borderRadius: 22,
    textAlign: "center",
    marginTop: 18,
  },

};