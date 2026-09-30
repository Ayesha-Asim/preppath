import {
  useEffect,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo.png";

type PageState = "loading" | "ready" | "invalid" | "success";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    page: isDark ? "#09070F" : "#F4F4FA",
    card: isDark ? "#17101F" : "#FFFFFF",
    cardSoft: isDark ? "#21152D" : "#FAF8FE",
    text: isDark ? "#FFFFFF" : "#15111C",
    muted: isDark ? "#C8BCD3" : "#6E6476",
    border: isDark ? "rgba(171,132,255,.17)" : "#E4DDED",
    input: isDark ? "#21152D" : "#FFFFFF",
    purple: "#7C3AED",
    purpleDark: "#4C1D95",
    purpleSoft: isDark ? "rgba(124,58,237,.16)" : "#F0E9FF",
    green: "#22C55E",
    greenSoft: isDark ? "rgba(34,197,94,.12)" : "#DCFCE7",
    red: "#EF4444",
    redSoft: isDark ? "rgba(239,68,68,.12)" : "#FEE2E2",
  };

  const themedPageStyle = {
    ...styles.page,
    background: colors.page,
    color: colors.text,
  } as CSSProperties;

  const [pageState, setPageState] =
    useState<PageState>("loading");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] =
    useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordsMatch =
    confirmNewPassword.length > 0 &&
    newPassword === confirmNewPassword;

useEffect(() => {
  let mounted = true;
  let recoveryDetected = false;

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    console.log("Reset auth event:", event);

    if (!mounted) return;

    if (event === "PASSWORD_RECOVERY" && session) {
      recoveryDetected = true;

      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );

      setMessage("");
      setPageState("ready");
    }
  });

  const checkRecovery = async () => {
    const params = new URLSearchParams(window.location.search);

    const authError =
      params.get("error_description") ||
      params.get("error");

    if (authError) {
      if (!mounted) return;

      setMessage(
        "This password-reset link is invalid or expired. Please request a new one."
      );
      setPageState("invalid");
      return;
    }

    await new Promise((resolve) =>
      window.setTimeout(resolve, 2500)
    );

    if (!mounted || recoveryDetected) return;

    setMessage(
      "This page was not opened from a valid password-recovery link. Please request a new reset email."
    );
    setPageState("invalid");
  };

  void checkRecovery();

  return () => {
    mounted = false;
    subscription.unsubscribe();
  };
}, []);

const handleUpdatePassword = async (event: FormEvent) => {
  event.preventDefault();
  setMessage("");

  if (!newPassword || !confirmNewPassword) {
    setMessage("Please complete both password fields.");
    return;
  }

  if (newPassword.length < 8) {
    setMessage("Password must be at least 8 characters long.");
    return;
  }

  if (newPassword !== confirmNewPassword) {
    setMessage("Passwords do not match.");
    return;
  }

  setLoading(true);

  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error("Password update error:", error);

      const lowerMessage = error.message.toLowerCase();

      if (
        lowerMessage.includes("same password") ||
        lowerMessage.includes("different from")
      ) {
        setMessage(
          "Your new password must be different from your previous password."
        );
        return;
      }

      if (
        lowerMessage.includes("expired") ||
        lowerMessage.includes("session") ||
        lowerMessage.includes("jwt")
      ) {
        setMessage(
          "The recovery session was not available. Please open the newest reset email in the same browser where you requested it."
        );
        setPageState("invalid");
        return;
      }

      setMessage(error.message);
      return;
    }

    setMessage("");
    setPageState("success");
  } catch (error) {
    console.error("Unexpected password update error:", error);

    setMessage(
      error instanceof Error
        ? error.message
        : "Unable to update your password."
    );
  } finally {
    setLoading(false);
  }
};

  if (pageState === "loading") {
    return (
      <div className="reset-page" style={themedPageStyle}>
        <div
          style={{
            ...styles.loadingCard,
            background: colors.card,
            color: colors.purple,
            border: `1px solid ${colors.border}`,
          }}
        >
          Securing your password-reset session...
        </div>
      </div>
    );
  }

  if (pageState === "invalid") {
  return (
    <div className="reset-page" style={themedPageStyle}>
      <div style={styles.backgroundGrid} />
      <div style={styles.glowOne} />
      <div style={styles.glowTwo} />

      <section
        className="reset-status-card"
        style={{
          ...styles.statusCard,
          background: colors.card,
          border: `1px solid ${colors.border}`,
        }}
      >
<div style={styles.statusLogoWrap}>
  <div style={styles.logoShine} />

  <img
    src={logo}
    alt="PrepPath"
    style={styles.statusLogo}
  />
</div>

        <div
          style={{
            ...styles.statusIcon,
            background: colors.redSoft,
            color: colors.red,
          }}
        >
          ⚠
        </div>

        <span style={{ ...styles.eyebrow, color: colors.purple }}>
          Reset link required
        </span>

        <h1 style={{ ...styles.statusTitle, color: colors.text }}>
          Request a new reset email
        </h1>

        <p style={{ ...styles.statusText, color: colors.muted }}>
          {message}
        </p>

        <button
          type="button"
          onClick={() =>
            navigate("/forgot-password", { replace: true })
          }
          style={{
            ...styles.primaryButton,
            background: "linear-gradient(135deg,#7C3AED,#4C1D95)",
          }}
        >
          Request New Reset Email
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/login", { replace: true })
          }
          style={{
            ...styles.secondaryButton,
            background: colors.cardSoft,
            color: colors.text,
            border: `1px solid ${colors.border}`,
          }}
        >
          Back to Login
        </button>
      </section>
    </div>
  );
}

  if (pageState === "success") {
    return (
      <div className="reset-page" style={themedPageStyle}>
        <section
          className="reset-status-card"
          style={{
            ...styles.statusCard,
            background: colors.card,
            border: `1px solid ${colors.border}`,
          }}
        >
<div style={styles.statusLogoWrap}>
  <div style={styles.logoShine} />

  <img
    src={logo}
    alt="PrepPath"
    style={styles.statusLogo}
  />
</div>
          <div
            style={{
              ...styles.statusIcon,
              background: colors.greenSoft,
              color: colors.green,
            }}
          >
            ✓
          </div>
          <span style={{ ...styles.eyebrow, color: colors.purple }}>Password updated</span>
          <h1 style={{ ...styles.statusTitle, color: colors.text }}>
            Your password has been changed
          </h1>
          <p style={{ ...styles.statusText, color: colors.muted }}>
            You can now sign in to PrepPath using your new password.
          </p>
          <button
            type="button"
            onClick={() => navigate("/login", { replace: true })}
            style={{
              ...styles.primaryButton,
              background: "linear-gradient(135deg,#7C3AED,#4C1D95)",
            }}
          >
            Go to Login
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="reset-page" style={themedPageStyle}>
      <div style={styles.backgroundGrid} />
      <div style={styles.glowOne} />
      <div style={styles.glowTwo} />

      <main
        className="reset-shell"
        style={{
          ...styles.shell,
          background: colors.card,
          border: `1px solid ${colors.border}`,
        }}
      >
        <section style={styles.brandPanel}>
          <div style={styles.panelCircleOne} />
          <div style={styles.panelCircleTwo} />
          <div style={styles.panelCircleThree} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={styles.logoforreset}>
    <img
        src={logo}
        alt="PrepPath"
        style={styles.logo}
    />
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <span style={styles.brandBadge}>Secure password reset</span>
            <h1 style={styles.brandTitle}>
              Create your new PrepPath password.
            </h1>
            <p style={styles.brandText}>
              Enter your new password, confirm it, and your account will be ready again.
            </p>
          </div>
        </section>

        <form
          className="reset-card"
          onSubmit={handleUpdatePassword}
          style={{ ...styles.card, background: colors.card }}
        >
          <div style={{ ...styles.formIcon, background: colors.purpleSoft }}>🔒</div>
          <div>
            <span style={{ ...styles.eyebrow, color: colors.purple }}>New password</span>
            <h2 style={{ ...styles.title, color: colors.text }}>Reset your password</h2>
            <p style={{ ...styles.subtitle, color: colors.muted }}>
              Enter the new password twice to confirm it.
            </p>
          </div>

          {message && (
            <div
              style={{
                ...styles.errorBox,
                background: colors.redSoft,
                color: colors.red,
                border: `1px solid ${colors.red}44`,
              }}
            >
              ⚠ {message}
            </div>
          )}

          <label style={styles.field}>
            <span style={{ ...styles.label, color: colors.text }}>New Password</span>
            <span style={styles.inputWrap}>
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                  setMessage("");
                }}
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                autoFocus
                style={{
                  ...styles.input,
                  paddingRight: 50,
                  background: colors.input,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              />
              <button
                type="button"
                onClick={() =>
                  setShowNewPassword((current) => !current)
                }
                style={{ ...styles.eyeButton, color: colors.muted }}
              >
                {showNewPassword ? "🙈" : "👁"}
              </button>
            </span>
          </label>

          <label style={styles.field}>
            <span style={{ ...styles.label, color: colors.text }}>Confirm New Password</span>
            <span style={styles.inputWrap}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(event) => {
                  setConfirmNewPassword(event.target.value);
                  setMessage("");
                }}
                placeholder="Repeat your new password"
                autoComplete="new-password"
                style={{
                  ...styles.input,
                  paddingRight: 50,
                  background: colors.input,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((current) => !current)
                }
                style={{ ...styles.eyeButton, color: colors.muted }}
              >
                {showConfirmPassword ? "🙈" : "👁"}
              </button>
            </span>
          </label>

          {confirmNewPassword && (
            <small
              style={{
                ...styles.matchText,
                color: passwordsMatch ? colors.green : colors.red,
              }}
            >
              {passwordsMatch
                ? "✓ Passwords match"
                : "Passwords do not match"}
            </small>
          )}

          <button
            type="submit"
            disabled={
              loading ||
              newPassword.length < 8 ||
              !passwordsMatch
            }
            style={{
              ...styles.primaryButton,
              background: "linear-gradient(135deg,#7C3AED,#4C1D95)",
              opacity:
                loading ||
                newPassword.length < 8 ||
                !passwordsMatch
                  ? 0.6
                  : 1,
            }}
          >
            {loading ? "Updating Password..." : "Update Password"}
          </button>
        </form>
      </main>

      <style>{`
        .reset-page input::placeholder {
          color: #9F91AA;
        }

        .reset-page button {
          transition:
            transform .2s ease,
            box-shadow .2s ease,
            border-color .2s ease,
            opacity .2s ease;
        }

        .reset-page button:not(:disabled):hover {
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .reset-page {
            align-items: flex-start !important;
            overflow-y: auto !important;
            padding: 24px !important;
          }

          .reset-shell {
            grid-template-columns: 1fr !important;
            width: min(680px,100%) !important;
            margin: auto !important;
          }

          .reset-shell > section:first-child {
            min-height: 410px !important;
            padding: 36px !important;
          }

          .reset-card {
            padding: 40px !important;
          }
        }

        @media (max-width: 560px) {
          .reset-page {
            padding: 14px !important;
          }

          .reset-shell {
            border-radius: 22px !important;
          }

          .reset-shell > section:first-child {
            min-height: 360px !important;
            padding: 28px 24px !important;
          }

          .reset-card {
            padding: 30px 22px !important;
          }

          .reset-status-card {
            padding: 30px 22px !important;
            border-radius: 22px !important;
          }
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
page: {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 28,
  boxSizing: "border-box",
  overflow: "hidden",
  position: "relative",

  background:
    "radial-gradient(circle at top left,#EDE9FE 0%,#F8FAFC 45%,#FFFFFF 100%)",
},


  shell: {
    width: "min(1120px,100%)",
    display: "grid",
    gridTemplateColumns:
      "minmax(340px,0.95fr) minmax(420px,1.05fr)",
    overflow: "hidden",
    borderRadius: 30,
    background: "#FFFFFF",
    border: "1px solid #E2E8F0",
    boxShadow: "0 30px 80px rgba(15,23,42,0.14)",
  },
brandPanel: {
  minHeight: 680,
  padding: 48,
  position: "relative",
  overflow: "hidden",

  background:
    "linear-gradient(135deg,#2A0F50 0%,#4C1D95 44%,#6D28D9 72%,#3B82F6 120%)",

  color: "#FFFFFF",
},
  brandBadge: {
    display: "inline-flex",
    padding: "7px 11px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.22)",
    fontSize: 12,
    fontWeight: 800,
    margin: "36px 0 16px",
  },
brandTitle: {
  margin: "28px 0 20px",
  fontSize: 54,
  lineHeight: 1.1,
  fontWeight: 900,

  color: "#FFFFFF",

  textShadow:
    "0 4px 18px rgba(0,0,0,.18)",
},
brandText: {
  color: "rgba(255,255,255,.92)",
  lineHeight: 1.8,
  fontSize: 20,
  maxWidth: 420,
},
  card: {
    padding: 50,
    background: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 16,
  },
  formIcon: {
    width: 64,
    height: 64,
    margin: "0 auto",
    borderRadius: 20,
    background: "#EDE9FE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
  },
  eyebrow: {
    display: "block",
    color: "#7C3AED",
    fontSize: 12,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    textAlign: "center",
  },
  title: {
    margin: "7px 0 8px",
    color: "#312E81",
    fontSize: 34,
    fontWeight: 950,
    textAlign: "center",
  },
  subtitle: {
    margin: 0,
    color: "#64748B",
    lineHeight: 1.7,
    textAlign: "center",
  },
  field: {
    display: "grid",
    gap: 7,
  },
  label: {
    color: "#334155",
    fontSize: 12,
    fontWeight: 800,
  },
  inputWrap: {
    position: "relative",
  },
  input: {
    width: "100%",
    minHeight: 54,
    padding: "11px 13px",
    boxSizing: "border-box",
    border: "1px solid #DCE3ED",
    borderRadius: 14,
    outline: "none",
    fontSize: 14,
    color: "#111827",
    background: "#FFFFFF",
  },
  eyeButton: {
    position: "absolute",
    right: 9,
    top: "50%",
    transform: "translateY(-50%)",
    width: 35,
    height: 35,
    border: "none",
    background: "transparent",
    cursor: "pointer",
  },
  matchText: {
    fontSize: 11,
    fontWeight: 750,
  },
  errorBox: {
    padding: "11px 13px",
    borderRadius: 14,
    background: "#FEE2E2",
    color: "#991B1B",
    border: "1px solid #FCA5A5",
    fontSize: 13,
    fontWeight: 750,
  },
  primaryButton: {
    minHeight: 54,
    padding: 12,
    border: "none",
    borderRadius: 14,
    background:
      "linear-gradient(135deg,#7C3AED,#4C1D95)",
    color: "#FFFFFF",
    fontWeight: 900,
    cursor: "pointer",
  },
  secondaryButton: {
    minHeight: 44,
    padding: 11,
    borderRadius: 14,
    border: "1px solid #DDD6FE",
    background: "#F5F3FF",
    color: "#5B21B6",
    fontWeight: 850,
    cursor: "pointer",
  },
  loadingCard: {
    padding: "16px 20px",
    borderRadius: 16,
    background: "#FFFFFF",
    color: "#4C1D95",
    fontWeight: 850,
    boxShadow: "0 18px 45px rgba(15,23,42,0.10)",
  },
statusCard: {
  position: "relative",
  zIndex: 10,

  width: "min(480px,100%)",
  padding: 42,
  borderRadius: 28,

  background: "#FFFFFF",

  border: "1px solid rgba(124,58,237,0.12)",

  boxShadow:
    "0 35px 90px rgba(76,29,149,.14), 0 10px 35px rgba(15,23,42,.08)",

  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: 16,
},
  statusIcon: {
    width: 72,
    height: 72,
    margin: "0 auto",
    borderRadius: 22,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 34,
    fontWeight: 900,
  },
statusTitle: {
  margin: "4px 0",

  color: "#2E1065",

  fontSize: 38,

  lineHeight: 1.12,

  fontWeight: 900,

  letterSpacing: "-0.03em",
},

  statusText: {
    margin: 0,
    color: "#64748B",
    lineHeight: 1.7,
  },


backgroundGrid: {
  position: "absolute",
  inset: 0,
  zIndex: 0,
  pointerEvents: "none",

  opacity: .28,
  backgroundImage:
    "linear-gradient(rgba(124,58,237,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,.05) 1px,transparent 1px)",
  backgroundSize: "34px 34px",
},

glowOne: {
  position: "absolute",
  zIndex: 0,
  pointerEvents: "none",

  top: -170,
  right: -120,
  width: 420,
  height: 420,
  borderRadius: "50%",
  background:
    "radial-gradient(circle,rgba(124,58,237,.16),transparent)",
  filter: "blur(10px)",
},

glowTwo: {
  position: "absolute",
  zIndex: 0,
  pointerEvents: "none",

  bottom: -170,
  left: -130,
  width: 420,
  height: 420,
  borderRadius: "50%",
  background:
    "radial-gradient(circle,rgba(91,33,182,.12),transparent)",
  filter: "blur(10px)",
},

panelCircleOne: {
  position: "absolute",
  width: 250,
  height: 250,
  borderRadius: "50%",
  background: "rgba(255,255,255,.06)",
  right: -70,
  top: 80,
},

panelCircleTwo: {
  position: "absolute",
  width: 180,
  height: 180,
  borderRadius: "50%",
  background: "rgba(255,255,255,.08)",
  left: -70,
  bottom: -40,
},

panelCircleThree: {
  position: "absolute",
  width: 70,
  height: 70,
  borderRadius: "50%",
  background: "rgba(255,255,255,.08)",
  left: 20,
  bottom: 90,
},

logoWrap: {
  width: 190,
  height: 60,
  borderRadius: 16,
  background: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 28,
},

  logo: {
  width: 300,
  maxWidth: "100%",
  height: "auto",
  objectFit: "contain",
  display: "block",
  marginBottom: 24,
},
statusLogoWrap: {
  width: 210,
  height: 70,
  margin: "0 auto 14px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  borderRadius: 18,

  background: "#4c1d95",

  border: "1px solid #E2E8F0",

  boxShadow:
    "0 10px 30px rgba(0,0,0,.08)",
},

statusLogo: {
  width: "170px",
  height: "auto",
  objectFit: "contain",
  display: "block",

  filter:
    "contrast(1.35) saturate(1.35) brightness(0.95)",

  imageRendering: "auto",
  background: "transparent",
},

logoShine: {
  position: "absolute",

  top: -40,
  left: -30,

  width: 90,
  height: 130,

  background:
    "linear-gradient(110deg, rgba(255,255,255,.45), rgba(255,255,255,0))",

  transform: "rotate(-25deg)",

  pointerEvents: "none",
},
logoforreset: {
  width: 190,
  height: 60,
  borderRadius: 16,
}
};