
import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import MainLayout from "../components/MainLayout";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    page: isDark ? "#100D16" : "#F4F1FA",
    card: isDark ? "#1C1625" : "#FFFFFF",
    border: isDark
      ? "rgba(171,132,255,.22)"
      : "rgba(91,33,182,.15)",
    text: isDark ? "#F8F5FF" : "#241534",
    muted: isDark ? "#B9AFC3" : "#71617F",
    accent: isDark ? "#C4A7FF" : "#6D28D9",
  };

  return (
    <MainLayout>
      <div
        style={{
          minHeight: "100%",
          padding: "clamp(24px, 5vw, 56px)",
          background: colors.page,
          color: colors.text,
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 13px",
              borderRadius: 999,
              background: isDark
                ? "rgba(124,58,237,.18)"
                : "#EDE4FF",
              color: colors.accent,
              fontSize: 13,
              fontWeight: 800,
            }}
          >
            <MessageCircle size={16} />
            Contact PrepPath
          </div>

          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              margin: "22px 0 12px",
              letterSpacing: "-1.5px",
            }}
          >
            How can we help?
          </h1>

          <p
            style={{
              color: colors.muted,
              fontSize: 16,
              lineHeight: 1.8,
              maxWidth: 650,
              marginBottom: 32,
            }}
          >
            Have a question about PrepPath, need help with your
            account, or want to share feedback? Contact our
            support team by email.
          </p>

          <div
            style={{
              background: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: 24,
              padding: "clamp(22px, 4vw, 36px)",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 15,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isDark
                  ? "rgba(124,58,237,.20)"
                  : "#EDE4FF",
                color: colors.accent,
                marginBottom: 20,
              }}
            >
              <Mail size={25} />
            </div>

            <h2 style={{ margin: "0 0 10px", fontSize: 23 }}>
              Email support
            </h2>

            <p
              style={{
                color: colors.muted,
                lineHeight: 1.7,
                margin: "0 0 22px",
              }}
            >
              Send us your questions, suggestions, or feedback.
              We’ll get back to you as soon as we can.
            </p>

            <a
              href="mailto:preppath.support@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 9,
                maxWidth: "100%",
                overflowWrap: "anywhere",
                color: colors.accent,
                fontWeight: 800,
                fontSize: 16,
                textDecoration: "none",
              }}
            >
              preppath.support@gmail.com
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}