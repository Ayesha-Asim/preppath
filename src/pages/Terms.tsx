import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { ArrowLeft, BookOpen, CalendarDays, GraduationCap } from "lucide-react";

const sections = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content:
      "By creating a PrepPath account or using the platform, you agree to follow these Terms of Service.",
  },
  {
    number: "02",
    title: "Purpose of PrepPath",
    content:
      "PrepPath provides university information, mock tests, analytics, exam tracking, and study-planning tools for educational purposes.",
  },
  {
    number: "03",
    title: "Account Responsibilities",
    content:
      "You are responsible for providing accurate information, protecting your password, and keeping your account secure.",
  },
  {
    number: "04",
    title: "Educational Information",
    content:
      "University rankings, admission estimates, merit calculations, and recommendations are informational only. Users should verify final admission requirements directly with the relevant university.",
  },
  {
    number: "05",
    title: "Acceptable Use",
    content:
      "You may not misuse the platform, attempt unauthorized access, interfere with other users, or copy and redistribute protected content without permission.",
  },
  {
    number: "06",
    title: "Changes to the Service",
    content:
      "PrepPath may add, update, or remove features as the platform develops.",
  },
  {
    number: "07",
    title: "Account Suspension",
    content:
      "Accounts may be suspended or removed if they are used fraudulently, abusively, or in violation of these terms.",
  },
  {
    number: "08",
    title: "Contact",
    content:
      "Questions about these terms may be submitted through the PrepPath support contact provided on the website.",
  },
];

export default function Terms() {
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
        className="terms-shell"
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
          className="terms-back"
        >
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          Back
        </button>

        {/* Main document */}

        <main
          style={{
            overflow: "hidden",
            borderRadius: 28,
            background: colors.card,
            border: `1px solid ${colors.border}`,
            boxShadow: isDark
              ? "0 24px 60px rgba(0,0,0,0.24)"
              : "0 20px 55px rgba(76,29,149,0.08)",
          }}
        >
          {/* Hero */}

          <header
            className="terms-hero"
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "44px 42px",
              color: "#FFFFFF",
              background:
                "linear-gradient(135deg,#190D2D 0%,#35145D 45%,#5523A0 100%)",
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
                background: "rgba(167,139,250,0.10)",
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
                  border:
                    "1px solid rgba(255,255,255,0.16)",
                  background:
                    "rgba(255,255,255,0.10)",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  marginBottom: 18,
                }}
              >
                <BookOpen size={15} strokeWidth={2} aria-hidden="true" /> TERMS & CONDITIONS
              </div>

              <h1
                className="terms-title"
                style={{
                  margin: 0,
                  fontSize: 42,
                  lineHeight: 1.08,
                  letterSpacing: "-0.035em",
                  fontWeight: 850,
                }}
              >
                Terms of Service
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
                These terms explain the rules and
                responsibilities that apply when using
                PrepPath and its study tools.
              </p>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  marginTop: 20,
                  padding: "8px 12px",
                  borderRadius: 10,
                  background:
                    "rgba(255,255,255,0.10)",
                  color:
                    "rgba(255,255,255,0.85)",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                <CalendarDays size={15} strokeWidth={2} aria-hidden="true" /> Last updated: September 2026
              </div>
            </div>
          </header>

          {/* Terms content */}

          <div
            className="terms-content"
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
                Please read these terms before using
                PrepPath. By creating an account or
                continuing to use the platform, you agree to
                follow the rules described below.
              </p>
            </div>

            {/* Sections */}

            <div>
              {sections.map((section, index) => (
                <section
                  key={section.number}
                  className="terms-section"
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
                      color: isDark
                        ? "#C4B5FD"
                        : colors.purpleDark,
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

            {/* Educational disclaimer */}

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
                <GraduationCap size={19} color={colors.purple} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <p
                style={{
                  margin: 0,
                  color: colors.muted,
                  fontSize: 13,
                  lineHeight: 1.7,
                }}
              >
                PrepPath is an educational preparation tool.
                Admission information and estimates should
                always be verified with the relevant
                university before making an application or
                admission decision.
              </p>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .terms-back:hover {
          transform: translateY(-1px);
          border-color: rgba(124, 58, 237, 0.45) !important;
        }

        @media (max-width: 700px) {
          .terms-hero {
            padding: 34px 24px !important;
          }

          .terms-content {
            padding: 28px 24px 34px !important;
          }

          .terms-title {
            font-size: 34px !important;
          }
        }

        @media (max-width: 480px) {
          .terms-shell {
            max-width: 100% !important;
          }

          .terms-section {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }

          .terms-title {
            font-size: 30px !important;
          }
        }
      `}</style>
    </div>
  );
}