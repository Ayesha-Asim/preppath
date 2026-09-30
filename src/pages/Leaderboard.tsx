import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import MainLayout from "../components/MainLayout";
import type { CSSProperties } from "react";
import { useTheme } from "../context/ThemeContext";
import { Award, BarChart3, Flame, Search, Trophy, Users, FileText } from "lucide-react";

type LeaderboardUser = {
  user_id: string;
  display_name: string;
  accuracy: number;
  total_tests: number;
  streak: number;
  ranking_score: number;
};

type SortMode = "Overall" | "Accuracy" | "Tests" | "Streak";

const calculateRankingScore = (
  accuracy: number,
  totalTests: number,
  streak: number
) => {
  const accuracyScore = Math.max(0, Math.min(100, accuracy)) * 0.7;
  const testScore = Math.min(totalTests, 25) * 1;
  const streakScore = Math.min(streak, 10) * 0.5;

  return Number((accuracyScore + testScore + streakScore).toFixed(1));
};

const getLevel = (user: LeaderboardUser) => {
  if (user.total_tests >= 20 && user.accuracy >= 80) return "Elite";
  if (user.total_tests >= 10 && user.accuracy >= 70) return "Top Performer";
  if (user.total_tests >= 5) return "Rising Star";
  return "Beginner";
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "PS";

export default function Leaderboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    page: isDark ? "#100D16" : "#F8F6FC",
    card: isDark ? "#1C1625" : "#FFFFFF",
    cardSoft: isDark ? "#261D31" : "#F6F1FC",
    text: isDark ? "#FFFFFF" : "#15111C",
    muted: isDark ? "#C8BCD3" : "#6E6476",
    faint: isDark ? "#9F91AA" : "#9A8CA5",
    border: isDark ? "rgba(171,132,255,.22)" : "#E4DDED",
    purple: "#7C3AED",
    purpleDark: "#4C1D95",
    purpleSoft: isDark ? "rgba(124,58,237,.16)" : "#F0E9FF",
    green: "#22C55E",
    orange: "#F97316",
    yellow: "#F59E0B",
    blue: "#38BDF8",
    red: "#EF4444",
  };

  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState<LeaderboardUser[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("Overall");
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id || null;
      setCurrentUserId(userId);

      // Fetch only the fields explicitly exposed by the leaderboard RPC.
      // Do not query public.profiles or public.user_stats directly here.
      const { data: leaderboardRows, error: leaderboardError } =
        await supabase.rpc("get_leaderboard");

      if (leaderboardError) {
        console.error("Leaderboard error:", leaderboardError.message);
        setBoard([]);
        setLoading(false);
        return;
      }

      const merged: LeaderboardUser[] = (leaderboardRows || [])
        .filter((row: any) =>
          typeof row.display_name === "string" && row.display_name.trim().length > 0
        )
        .map((row: any) => {
          const accuracy = Number(row.accuracy || 0);
          const totalTests = Number(row.total_tests || 0);
          const streak = Number(row.streak || 0);

          return {
            user_id: row.user_id,
            display_name: row.display_name.trim(),
            accuracy,
            total_tests: totalTests,
            streak,
            ranking_score: calculateRankingScore(accuracy, totalTests, streak),
          };
        });

      setBoard(merged);
      setLoading(false);
    };

    fetchData();
  }, []);

  const sortedBoard = useMemo(() => {
    const copy = [...board];

    copy.sort((a, b) => {
      if (sortMode === "Accuracy") {
        if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
        return b.total_tests - a.total_tests;
      }

      if (sortMode === "Tests") {
        if (b.total_tests !== a.total_tests) {
          return b.total_tests - a.total_tests;
        }
        return b.accuracy - a.accuracy;
      }

      if (sortMode === "Streak") {
        if (b.streak !== a.streak) return b.streak - a.streak;
        return b.accuracy - a.accuracy;
      }

      if (b.ranking_score !== a.ranking_score) {
        return b.ranking_score - a.ranking_score;
      }

      if (b.accuracy !== a.accuracy) {
        return b.accuracy - a.accuracy;
      }

      return b.total_tests - a.total_tests;
    });

    return copy;
  }, [board, sortMode]);

  const filteredBoard = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return sortedBoard;

    return sortedBoard.filter((user) =>
      user.display_name.toLowerCase().includes(query)
    );
  }, [sortedBoard, search]);

  const visibleUsers = filteredBoard.slice(0, visibleCount);
  const topThree = sortedBoard.slice(0, 3);

  const currentUserIndex = sortedBoard.findIndex(
    (user) => user.user_id === currentUserId
  );

  const currentUser =
    currentUserIndex >= 0 ? sortedBoard[currentUserIndex] : null;

  const nextUser =
    currentUserIndex > 0 ? sortedBoard[currentUserIndex - 1] : null;

  const pointsToNext =
    currentUser && nextUser
      ? Math.max(
          0,
          Number(
            (nextUser.ranking_score - currentUser.ranking_score).toFixed(1)
          )
        )
      : 0;

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy size={20} strokeWidth={1.8} />;
    if (index === 1) return <Award size={20} strokeWidth={1.8} />;
    if (index === 2) return <Award size={20} strokeWidth={1.8} />;
    return `#${index + 1}`;
  };

  const getPodiumAccent = (index: number) => {
    if (index === 0) return colors.purple;
    if (index === 1) return isDark ? "#C4B5FD" : "#7C3AED";
    return isDark ? "#A78BFA" : "#6D28D9";
  };

  const pageStyle = {
    ...styles.page,
    background: colors.page,
    color: colors.text,
  };

  const cardStyle = {
    ...styles.card,
    background: colors.card,
    color: colors.text,
    border: `1px solid ${colors.border}`,
  };

  if (loading) {
    return (
      <MainLayout>
        <div style={pageStyle} className="leaderboard-page">
          <div
            style={{
              ...styles.loadingCard,
              background: colors.card,
              border: `1px solid ${colors.border}`,
              color: colors.text,
              minHeight: 220,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 18px 38px rgba(0,0,0,.08)",
            }}
          >
            Loading leaderboard…
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={pageStyle}>
        <div style={styles.topRow} className="leaderboard-top-row">
          <div>
            <p style={{ ...styles.eyebrow, color: colors.purple }}>
              Community Rankings
            </p>
            <h1 style={{ ...styles.title, color: colors.text }}>
              Leaderboard
            </h1>
          </div>

          <div
            style={{
              ...styles.memberCount,
              background: colors.card,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          >
            <Users size={16} /> {board.length} student{board.length === 1 ? "" : "s"}
          </div>
        </div>

        <div style={styles.hero} className="leaderboard-hero">
          <div style={styles.heroGlowOne} />
          <div style={styles.heroGlowTwo} />

          <div style={styles.heroContent}>
            <div style={{ ...styles.heroBadge, display: "inline-flex", alignItems: "center", gap: 7 }}><Trophy size={15} /> PrepPath rankings</div>

            <h2 style={styles.heroTitle}>
              Compete, improve, and climb the leaderboard.
            </h2>

            <p style={styles.heroText}>
              Overall rank rewards accuracy most, while also recognizing mock
              test activity and study streaks.
            </p>
          </div>

          <div style={styles.heroScore}>
            <span>Your current rank</span>
            <strong>
              {currentUserIndex >= 0 ? `#${currentUserIndex + 1}` : "—"}
            </strong>
            <small>
              {currentUser
                ? `${currentUser.ranking_score} ranking points`
                : "Choose a display name in Settings and complete a test to join"}
            </small>
          </div>
        </div>

        {board.length === 0 ? (
          <div
            style={{
              ...styles.emptyCard,
              background: colors.card,
              color: colors.muted,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div style={styles.emptyIcon}><Trophy size={32} /></div>
            <h2 style={{ color: colors.text }}>No leaderboard data yet</h2>
            <p>
              Choose a display name in Settings and complete a mock test to join the board.
            </p>
          </div>
        ) : (
          <>
            <div style={styles.summaryGrid} className="leaderboard-summary-grid">
              <div style={cardStyle}>
                <p style={{ ...styles.summaryLabel, color: colors.muted }}>
                  Your Rank
                </p>
                <strong style={{ ...styles.summaryValue, color: colors.purple }}>
                  {currentUserIndex >= 0 ? `#${currentUserIndex + 1}` : "—"}
                </strong>
                <span style={{ color: colors.muted }}>
                  out of {board.length} student{board.length === 1 ? "" : "s"}
                </span>
              </div>

              <div style={cardStyle}>
                <p style={{ ...styles.summaryLabel, color: colors.muted }}>
                  Your Score
                </p>
                <strong style={{ ...styles.summaryValue, color: colors.purple }}>
                  {currentUser?.ranking_score ?? 0}
                </strong>
                <span style={{ color: colors.muted }}>ranking points</span>
              </div>

              <div style={cardStyle}>
                <p style={{ ...styles.summaryLabel, color: colors.muted }}>
                  Next Target
                </p>
                <strong style={{ ...styles.summaryValue, color: colors.purple }}>
                  {currentUserIndex === 0
                    ? "Leader"
                    : `${pointsToNext} pts`}
                </strong>
                <span style={{ color: colors.muted }}>
                  {currentUserIndex === 0
                    ? "You currently hold first place"
                    : `to reach rank #${currentUserIndex}`}
                </span>
              </div>
            </div>

            <div style={styles.podiumGrid} className="leaderboard-podium-grid">
              {topThree.map((user, index) => {
                const isCurrentUser = user.user_id === currentUserId;
                const accent = getPodiumAccent(index);

                return (
                  <div
                    key={user.user_id}
                    style={{
                      ...styles.podiumCard,
                      background: colors.card,
                      color: colors.text,
                      border: isCurrentUser
                        ? `2px solid ${colors.purple}`
                        : `1px solid ${colors.border}`,
                      boxShadow:
                        index === 0
                          ? `0 20px 45px ${accent}20`
                          : "0 12px 30px rgba(0,0,0,0.08)",
                    }}
                  >
                    <div
                      style={{
                        ...styles.podiumAvatar,
                        background: `${accent}20`,
                        border: `2px solid ${accent}`,
                      }}
                    >
                      {getInitials(user.display_name)}
                    </div>

                    <div style={styles.podiumIcon}>{getRankIcon(index)}</div>

                    <h3 style={styles.podiumName}>{user.display_name}</h3>

                    <div style={styles.badgeRow}>
                      <span
                        style={{
                          ...styles.levelBadge,
                          background: `${accent}18`,
                          color: accent,
                        }}
                      >
                        {getLevel(user)}
                      </span>

                      {isCurrentUser && (
                        <span style={styles.youBadge}>You</span>
                      )}
                    </div>

                    <strong
                      style={{
                        ...styles.podiumScore,
                        color: accent,
                      }}
                    >
                      {user.ranking_score} pts
                    </strong>

                    <div style={{ ...styles.podiumStats, alignItems: "center" }}>
                      <span style={{display:"inline-flex",alignItems:"center",gap:5}}><BarChart3 size={15} /> {Math.round(user.accuracy)}%</span>
                      <span style={{display:"inline-flex",alignItems:"center",gap:5}}><FileText size={15} /> {user.total_tests}</span>
                      <span style={{display:"inline-flex",alignItems:"center",gap:5}}><Flame size={15} /> {user.streak}</span>
                    </div>
                  </div>
                );
              })}

              {Array.from({ length: Math.max(0, 3 - topThree.length) }).map(
                (_, index) => {
                  const rank = topThree.length + index;
                  return (
                    <div
                      key={`empty-${rank}`}
                      style={{
                        ...styles.podiumCard,
                        background: colors.cardSoft,
                        color: colors.muted,
                        border: `1px dashed ${colors.border}`,
                      }}
                    >
                      <div style={styles.emptyPodiumIcon}>
                        {getRankIcon(rank)}
                      </div>
                      <h3 style={{ color: colors.text }}>
                        Spot #{rank + 1} is open
                      </h3>
                      <p>Another student will appear here after joining.</p>
                    </div>
                  );
                }
              )}
            </div>

            <div
              style={{
                ...styles.toolbar,
                background: colors.card,
                border: `1px solid ${colors.border}`,
              }}
            >
              <input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setVisibleCount(20);
                }}
                placeholder="Search students..."
                style={{
                  ...styles.searchInput,
                  background: colors.cardSoft,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              />

              <div style={styles.sortButtons}>
                {(
                  ["Overall", "Accuracy", "Tests", "Streak"] as SortMode[]
                ).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setSortMode(mode);
                      setVisibleCount(20);
                    }}
                    style={{
                      ...styles.sortButton,
                      background:
                        sortMode === mode ? colors.purple : colors.cardSoft,
                      color: sortMode === mode ? "#FFFFFF" : colors.text,
                      border: `1px solid ${
                        sortMode === mode ? colors.purple : colors.border
                      }`,
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                ...styles.tableCard,
                background: colors.card,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                className="leaderboard-table-header"
                style={{
                  ...styles.tableHeader,
                  color: colors.muted,
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                <span>Rank</span>
                <span>Student</span>
                <span>Accuracy</span>
                <span>Tests</span>
                <span>Streak</span>
                <span>Score</span>
              </div>

              {visibleUsers.map((user) => {
                const actualIndex = sortedBoard.findIndex(
                  (item) => item.user_id === user.user_id
                );
                const isCurrentUser = user.user_id === currentUserId;

                return (
                  <div
                    key={user.user_id}
                    className="leaderboard-table-row"
                    style={{
                      ...styles.tableRow,
                      background: isCurrentUser
                        ? `${colors.purple}14`
                        : "transparent",
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    <div style={styles.rankCell}>
                      <span
                        style={{
                          ...styles.rankBadge,
                          background:
                            actualIndex < 3
                              ? `${getPodiumAccent(actualIndex)}20`
                              : colors.cardSoft,
                          color:
                            actualIndex < 3
                              ? getPodiumAccent(actualIndex)
                              : colors.text,
                        }}
                      >
                        {getRankIcon(actualIndex)}
                      </span>
                    </div>

                    <div style={styles.studentCell}>
                      <div
                        style={{
                          ...styles.avatar,
                          background: `${colors.purple}20`,
                          color: colors.purple,
                        }}
                      >
                        {getInitials(user.display_name)}
                      </div>

                      <div>
                        <div style={styles.studentNameRow}>
                          <strong>{user.display_name}</strong>

                          {isCurrentUser && (
                            <span style={styles.youBadgeSmall}>You</span>
                          )}
                        </div>
                        <small style={{ color: colors.muted }}>
                          {getLevel(user)}
                        </small>
                      </div>
                    </div>

                    <strong>{Math.round(user.accuracy)}%</strong>
                    <span>{user.total_tests}</span>
                    <span>{user.streak} days</span>
                    <strong style={{ color: colors.purple }}>
                      {user.ranking_score}
                    </strong>
                  </div>
                );
              })}

              {visibleUsers.length === 0 && (
                <div style={styles.noResults}>
                  <span style={styles.emptyIcon}><Search size={28} /></span>
                  <h3>No students found</h3>
                  <p style={{ color: colors.muted }}>
                    Try searching with another display name.
                  </p>
                </div>
              )}
            </div>

            {visibleCount < filteredBoard.length && (
              <div style={styles.loadMoreWrap}>
                <button
                  style={styles.loadMoreButton}
                  onClick={() => setVisibleCount((count) => count + 20)}
                >
                  Load More
                </button>
              </div>
            )}

            {board.length === 1 && (
              <div
                style={{
                  ...styles.communityCard,
                  background: isDark
                    ? "linear-gradient(135deg,#2B1942,#1C1625)"
                    : "linear-gradient(135deg,#F0E9FF,#FFFFFF)",
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div style={styles.communityIcon}><Users size={30} /></div>
                <div>
                  <h2 style={{ margin: 0 }}>The competition starts here</h2>
                  <p style={{ color: colors.muted, marginBottom: 0 }}>
                    More students will automatically appear when they create
                    accounts and complete mock tests.
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        <style>{`
          .leaderboard-page {
            width: 100%;
            box-sizing: border-box;
          }

          .leaderboard-hero-badge { display: inline-flex; align-items: center; gap: 7px; }
          .leaderboard-summary-grid > div,
          .leaderboard-podium-grid > div {
            transition:
              transform .2s ease,
              box-shadow .2s ease,
              border-color .2s ease;
          }

          .leaderboard-summary-grid > div:hover,
          .leaderboard-podium-grid > div:hover {
            transform: translateY(-3px);
            border-color: rgba(124,58,237,.34) !important;
            box-shadow: 0 22px 44px rgba(76,29,149,.13) !important;
          }

          .leaderboard-hero strong {
            font-size: 42px;
            font-weight: 950;
            line-height: 1;
          }

          @media (max-width: 920px) {
            .leaderboard-page {
              padding: 28px 22px !important;
            }

            .leaderboard-top-row,
            .leaderboard-hero {
              flex-direction: column;
              align-items: stretch !important;
            }

            .leaderboard-hero > div:last-child {
              min-width: 0 !important;
              width: 100%;
              box-sizing: border-box;
            }

            .leaderboard-podium-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 620px) {
            .leaderboard-page {
              padding: 22px 14px !important;
            }

            .leaderboard-hero {
              padding: 26px !important;
              border-radius: 22px !important;
            }

            .leaderboard-summary-grid {
              grid-template-columns: 1fr !important;
            }

            .leaderboard-table-header {
              display: none !important;
            }

            .leaderboard-table-row {
              min-width: 0 !important;
              width: 100% !important;
              box-sizing: border-box !important;
              grid-template-columns: 48px minmax(0, 1fr) !important;
              gap: 10px 12px !important;
              padding: 14px !important;
              align-items: center !important;
            }

            .leaderboard-table-row > :nth-child(1) {
              grid-column: 1;
              grid-row: 1 / span 3;
            }

            .leaderboard-table-row > :nth-child(2) {
              grid-column: 2;
              grid-row: 1;
              min-width: 0;
            }

            .leaderboard-table-row > :nth-child(3) {
              grid-column: 2;
              grid-row: 2;

              display: flex;
              align-items: center;
              justify-content: space-between;

              gap: 12px;
            }

            .leaderboard-table-row > :nth-child(3)::before {
              content: "Accuracy";

              font-size: 10px;
              font-weight: 700;

              opacity: 0.7;
            }

            .leaderboard-table-row > :nth-child(4) {
              grid-column: 2;
              grid-row: 3;

              display: flex;
              align-items: center;
              justify-content: space-between;

              gap: 12px;
            }

            .leaderboard-table-row > :nth-child(4)::before {
              content: "Tests";

              font-size: 10px;
              font-weight: 700;

              opacity: 0.7;
            }

            .leaderboard-table-row > :nth-child(5),
            .leaderboard-table-row > :nth-child(6) {
              display: none;
            }
          }
        `}</style>
      </div>
    </MainLayout>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    padding: "32px 40px",
    minHeight: "100vh",
    transition: "background 0.25s ease, color 0.25s ease",
  },

  loadingCard: {
    padding: 28,
    borderRadius: 18,
    fontWeight: 800,
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 18,
    marginBottom: 22,
  },

  eyebrow: {
    margin: 0,
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 0.9,
    textTransform: "uppercase",
  },

  title: {
    fontSize: 34,
    fontWeight: 850,
    margin: "6px 0 0",
  },

  memberCount: {
    padding: "11px 15px",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: 14,
    fontWeight: 850,
  },

  hero: {
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(115deg,#321752 0%,#5423A2 54%,#7C3AED 100%)",
    color: "#FFFFFF",
    padding: "26px 30px",
    borderRadius: 22,
    marginBottom: 22,
    boxShadow: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
  },

  heroGlowOne: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.13)",
    right: -80,
    top: -90,
  },

  heroGlowTwo: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.10)",
    left: "42%",
    bottom: -80,
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
    border: "1px solid rgba(255,255,255,0.28)",
    background: "rgba(255,255,255,0.14)",
    fontSize: 13,
    fontWeight: 800,
    marginBottom: 14,
  },

  heroTitle: {
    margin: 0,
    fontSize: 27,
    fontWeight: 850,
    lineHeight: 1.2,
    color: "#FFFFFF",
  },

  heroText: {
    margin: "12px 0 0",
    color: "#FFFFFF",
    opacity: 0.92,
    lineHeight: 1.7,
  },

  heroScore: {
    position: "relative",
    zIndex: 1,
    minWidth: 155,
    padding: 18,
    borderRadius: 16,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.26)",
    backdropFilter: "blur(12px)",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 5,
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: 18,
    marginBottom: 22,
  },

  summaryLabel: {
    margin: 0,
    fontSize: 15,
    fontWeight: 800,
  },

  summaryValue: {
    display: "block",
    margin: "8px 0",
    fontSize: 30,
    fontWeight: 850,
  },

  podiumGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
    gap: 18,
    marginBottom: 22,
  },

  podiumCard: {
    padding: 20,
    borderRadius: 18,
    textAlign: "center",
    minHeight: 215,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  podiumAvatar: {
    width: 52,
    height: 52,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    fontWeight: 950,
    marginBottom: 10,
  },

  podiumIcon: {
    fontSize: 24,
    marginBottom: 8,
  },

  podiumName: {
    margin: 0,
    fontSize: 20,
    fontWeight: 800,
  },

  badgeRow: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 9,
  },

  levelBadge: {
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 900,
  },

  youBadge: {
    display: "inline-block",
    background: "#7C3AED",
    color: "#FFFFFF",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 900,
  },

  podiumScore: {
    marginTop: 15,
    fontSize: 25,
  },

  podiumStats: {
    marginTop: 14,
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
    fontWeight: 750,
  },

  emptyPodiumIcon: {
    fontSize: 42,
    marginBottom: 10,
    opacity: 0.6,
  },

  toolbar: {
    padding: 18,
    borderRadius: 20,
    display: "flex",
    justifyContent: "space-between",
    gap: 14,
    flexWrap: "wrap",
    marginBottom: 16,
  },

  searchInput: {
    flex: "1 1 280px",
    padding: "12px 14px",
    borderRadius: 13,
    outline: "none",
    fontSize: 15,
  },

  sortButtons: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },

  sortButton: {
    padding: "10px 13px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 850,
  },

  tableCard: {
    borderRadius: 22,
    overflowX: "auto",
  },

  tableHeader: {
    display: "grid",
    gridTemplateColumns: "80px 1.7fr 1fr 0.8fr 0.8fr 0.8fr",
    gap: 14,
    padding: "14px 18px",
    minWidth: 760,
    fontSize: 12,
    fontWeight: 900,
    textTransform: "uppercase",
  },

  tableRow: {
    display: "grid",
    gridTemplateColumns: "80px 1.7fr 1fr 0.8fr 0.8fr 0.8fr",
    gap: 14,
    padding: "15px 18px",
    minWidth: 760,
    alignItems: "center",
  },

  rankCell: {
    display: "flex",
    alignItems: "center",
  },

  rankBadge: {
    minWidth: 44,
    height: 44,
    padding: "0 8px",
    borderRadius: 14,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 950,
  },

  studentCell: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 13,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 950,
  },

  studentNameRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },

  youBadgeSmall: {
    background: "#7C3AED",
    color: "#FFFFFF",
    padding: "3px 7px",
    borderRadius: 999,
    fontSize: 9,
    fontWeight: 900,
  },

  noResults: {
    textAlign: "center",
    padding: 35,
  },

  loadMoreWrap: {
    display: "flex",
    justifyContent: "center",
    marginTop: 18,
  },

  loadMoreButton: {
    background: "linear-gradient(135deg,#7C3AED,#4C1D95)",
    color: "#FFFFFF",
    border: "none",
    padding: "12px 18px",
    borderRadius: 13,
    cursor: "pointer",
    fontWeight: 900,
  },

  card: {
    padding: 20,
    borderRadius: 18,
    boxShadow: "none",
  },

  emptyCard: {
    borderRadius: 22,
    padding: 38,
    boxShadow: "none",
    textAlign: "center",
  },

  emptyIcon: {
    fontSize: 44,
  },

  communityCard: {
    display: "flex",
    alignItems: "center",
    gap: 18,
    padding: 24,
    borderRadius: 22,
    marginTop: 22,
  },

  communityIcon: {
    fontSize: 42,
  },
};