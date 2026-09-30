import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { ArrowLeft, ShieldCheck, LockKeyhole, CalendarDays } from "lucide-react";

const sections = [
  {
    number: "01",
    title: "Information We Collect",
    content:
      "PrepPath may collect your name, email address, city, date of birth, target university, profile photo, mock-test results, and exam tracker information.",
  },
  {
    number: "02",
    title: "How Information Is Used",
    content:
      "Your information is used to create your account, personalize study recommendations, calculate analytics, display leaderboard results, and improve the platform.",
  },
  {
    number: "03",
    title: "Authentication and Storage",
    content:
      "PrepPath uses Supabase for authentication, database storage, and related platform services.",
  },
  {
    number: "04",
    title: "Leaderboard Information",
    content:
      "The leaderboard may display your profile name, accuracy, completed tests, streak, and ranking. Private information such as your email address should not be displayed publicly.",
  },
  {
    number: "05",
    title: "Data Sharing",
    content:
      "PrepPath does not sell personal information. Information may be processed by service providers required to operate the platform.",
  },
  {
    number: "06",
    title: "Data Security",
    content:
      "Reasonable technical measures are used to protect account data. However, no online system can guarantee complete security.",
  },
  {
    number: "07",
    title: "Your Choices",
    content:
      "You may update your profile, reset your password, export available account data, or contact support regarding account deletion.",
  },
  {
    number: "08",
    title: "Changes to This Policy",
    content:
      "This Privacy Policy may be updated as PrepPath develops. Updated versions will be published on this page.",
  },
  {
    number: "09",
    title: "Contact",
    content:
      "Privacy-related questions may be submitted through the PrepPath support contact provided on the website.",
  },
];

export default function Privacy() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const colors = {
    page: isDark ? "#09070F" : "#F4F4FA",
    card: isDark ? "#17101F" : "#FFFFFF",
    cardSoft: isDark ? "#21152D" : "#FAF8FE",
    text: isDark ? "#FFFFFF" : "#15111C",
    muted: isDark ? "#C8BCD3" : "#6E6476",
    border: isDark
      ? "rgba(171,132,255,0.17)"
      : "#E4DDED",
    purple: "#7C3AED",
    purpleDark: "#4C1D95",
    purpleSoft: isDark
      ? "rgba(124,58,237,0.16)"
      : "#F0E9FF",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
        background: colors.page,
        color: colors.text,
        padding: "32px 24px 64px",
      }}
    >
      <div
        className="privacy-shell"
        style={{
          width: "100%",
          maxWidth: 960,
          margin: "0 auto",
        }}
      >
        {/* Back button */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            border: `1px solid ${colors.border}`,
            background: colors.card,
            color: colors.text,
            padding: "11px 16px",
            borderRadius: 12,
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 14,
            marginBottom: 20,
            transition: "all 0.2s ease",
          }}
          className="privacy-back"
        >
          <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
          Back
        </button>

        {/* Main card */}

        <main
          style={{
            overflow: "hidden",
            borderRadius: 28,
            background: colors.card,
            border: `1px solid ${colors.border}`,
            boxShadow: isDark
              ? "0 16px 44px rgba(0,0,0,0.20)"
              : "0 12px 35px rgba(76,29,149,0.07)",
          }}
        >
          {/* Hero */}

          <header
            className="privacy-hero"
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "44px 42px",
              color: "#FFFFFF",
              background:
                "linear-gradient(135deg,#170E26 0%,#29163E 55%,#42216B 100%)",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 260,
                height: 260,
                borderRadius: "50%",
                right: -90,
                top: -130,
                background: "rgba(255,255,255,0.06)",
              }}
            />

            <div
              style={{
                position: "absolute",
                width: 190,
                height: 190,
                borderRadius: "50%",
                right: 160,
                bottom: -130,
                background: "rgba(167,139,250,0.12)",
                filter: "blur(8px)",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 1,
                maxWidth: 650,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 12px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.16)",
                  background: "rgba(255,255,255,0.10)",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  marginBottom: 18,
                }}
              >
                <LockKeyhole size={14} strokeWidth={1.8} /> PRIVACY & DATA
              </div>

              <h1
                className="privacy-title"
                style={{
                  margin: 0,
                  fontSize: 42,
                  lineHeight: 1.08,
                  letterSpacing: "-0.035em",
                  fontWeight: 850,
                }}
              >
                Privacy Policy
              </h1>

              <p
                style={{
                  margin: "14px 0 0",
                  maxWidth: 590,
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: 1.7,
                  fontSize: 15,
                }}
              >
                This policy explains what information PrepPath
                may collect and how that information is used
                while you use the platform.
              </p>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  marginTop: 20,
                  padding: "8px 12px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.10)",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                <CalendarDays size={14} strokeWidth={1.8} /> Last updated: September 2026
              </div>
            </div>
          </header>

          {/* Policy content */}

          <div
            className="privacy-content"
            style={{
              padding: "38px 42px 44px",
            }}
          >
            {/* Intro */}

            <div
              style={{
                padding: "18px 20px",
                borderRadius: 16,
                background: colors.purpleSoft,
                border: `1px solid ${colors.border}`,
                marginBottom: 32,
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: colors.muted,
                  fontSize: 14,
                  lineHeight: 1.75,
                }}
              >
                Your privacy matters when using PrepPath.
                Below you can see what information may be
                collected, why it is used, and the choices
                available to you.
              </p>
            </div>

            {/* Sections */}

            <div>
              {sections.map((section, index) => (
                <section
                  key={section.number}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr",
                    gap: 16,
                    padding:
                      index === 0
                        ? "0 0 27px"
                        : "27px 0",
                    borderBottom:
                      index === sections.length - 1
                        ? "none"
                        : `1px solid ${colors.border}`,
                  }}
                  className="privacy-section"
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 12,
                      background: colors.purpleSoft,
                      color: isDark ? "#C4B5FD" : colors.purpleDark,
                      fontSize: 12,
                      fontWeight: 850,
                    }}
                  >
                    {section.number}
                  </div>

                  <div>
                    <h2
                      style={{
                        margin: "2px 0 8px",
                        color: colors.text,
                        fontSize: 19,
                        lineHeight: 1.3,
                        letterSpacing: "-0.015em",
                        fontWeight: 800,
                      }}
                    >
                      {section.title}
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        color: colors.muted,
                        fontSize: 14,
                        lineHeight: 1.8,
                      }}
                    >
                      {section.content}
                    </p>
                  </div>
                </section>
              ))}
            </div>

            {/* Footer note */}

            <div
              style={{
                marginTop: 30,
                padding: "18px 20px",
                borderRadius: 16,
                background: colors.cardSoft,
                border: `1px solid ${colors.border}`,
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  background: colors.purpleSoft,
                }}
              >
                <ShieldCheck size={19} strokeWidth={1.8} color={isDark ? "#C4B5FD" : colors.purple} />
              </div>

              <p
                style={{
                  margin: 0,
                  color: colors.muted,
                  fontSize: 13,
                  lineHeight: 1.7,
                }}
              >
                PrepPath may revise this policy as the
                platform and its features change. The latest
                version will remain available on this page.
              </p>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .privacy-back:hover {
          transform: translateY(-1px);
          border-color: rgba(124, 58, 237, 0.45) !important;
        }

        @media (max-width: 700px) {
          .privacy-hero {
            padding: 34px 24px !important;
          }

          .privacy-content {
            padding: 28px 24px 34px !important;
          }

          .privacy-title {
            font-size: 34px !important;
          }
        }

        @media (max-width: 480px) {
          .privacy-shell {
            max-width: 100% !important;
          }

          .privacy-section {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }

          .privacy-title {
            font-size: 30px !important;
          }
        }
      `}</style>
    </div>
  );
}