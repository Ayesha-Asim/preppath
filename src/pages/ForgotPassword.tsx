import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo.png";
import { ArrowLeft, ArrowRight, ExternalLink, Mail, ShieldCheck, Info, CheckCircle2, AlertCircle, KeyRound } from "lucide-react";

const RESEND_DELAY_SECONDS = 60;

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const getMailboxUrl = (email: string) => {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";

  if (domain.includes("gmail") || domain.includes("googlemail")) {
    return "https://mail.google.com/";
  }

  if (
    domain.includes("outlook") ||
    domain.includes("hotmail") ||
    domain.includes("live")
  ) {
    return "https://outlook.live.com/mail/";
  }

  if (domain.includes("yahoo")) {
    return "https://mail.yahoo.com/";
  }

  return "https://mail.google.com/";
};

const maskEmail = (email: string) => {
  const [username, domain] = email.split("@");

  if (!username || !domain) {
    return email;
  }

  const visibleCharacters = username.slice(0, Math.min(2, username.length));
  const hiddenCharacters = "*".repeat(
    Math.max(3, username.length - visibleCharacters.length)
  );

  return `${visibleCharacters}${hiddenCharacters}@${domain}`;
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    page: isDark ? "#0D0916" : "#F4F4FA",
    card: isDark ? "#191126" : "#FFFFFF",
    cardSoft: isDark ? "#251934" : "#FAF8FE",
    text: isDark ? "#FFFFFF" : "#15111C",
    muted: isDark ? "#C8BCD3" : "#6E6476",
    faint: isDark ? "#9F91AA" : "#9A8CA5",
    border: isDark ? "rgba(171,132,255,.17)" : "#E4DDED",
    input: isDark ? "#251934" : "#FFFFFF",
    purple: "#7C3AED",
    purpleDark: "#4C1D95",
    purpleSoft: isDark ? "rgba(124,58,237,.16)" : "#F0E9FF",
    green: "#22C55E",
    greenSoft: isDark ? "rgba(34,197,94,.12)" : "#F0FDF4",
    red: "#EF4444",
    redSoft: isDark ? "rgba(239,68,68,.12)" : "#FEF2F2",
  };

  const [email, setEmail] = useState("");
  const [sentEmail, setSentEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const normalizedEmail = email.trim().toLowerCase();

  const validEmail = useMemo(
    () => isValidEmail(normalizedEmail),
    [normalizedEmail]
  );

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setSecondsLeft((currentValue) => Math.max(0, currentValue - 1));
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [secondsLeft]);

  const sendResetEmail = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (loading || secondsLeft > 0) {
      return;
    }

    setMessage("");
    setIsError(false);

    const targetEmail = emailSent ? sentEmail : normalizedEmail;

    if (!targetEmail || !isValidEmail(targetEmail)) {
      setIsError(true);
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/reset-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(
        targetEmail,
        {
          redirectTo: redirectUrl,
        }
      );

      if (error) {
        throw error;
      }

      setSentEmail(targetEmail);
      setEmailSent(true);
      setSecondsLeft(RESEND_DELAY_SECONDS);
      setIsError(false);
      setMessage(
        "A new password-reset email has been sent successfully."
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to send the password-reset email.";

      const normalizedErrorMessage = errorMessage.toLowerCase();
      setIsError(true);

      if (
        normalizedErrorMessage.includes("rate") ||
        normalizedErrorMessage.includes("too many")
      ) {
        setMessage(
          "Too many reset requests were made. Please wait before trying again."
        );
      } else {
        setMessage(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const openMailbox = () => {
    const mailboxUrl = getMailboxUrl(sentEmail);
    window.open(mailboxUrl, "_blank", "noopener,noreferrer");
  };

  const pageStyle: CSSProperties = {
    ...styles.page,
    background: colors.page,
    color: colors.text,
  };

  const cardStyle: CSSProperties = {
    ...styles.card,
    background: colors.card,
    border: `1px solid ${colors.border}`,
    boxShadow: isDark
      ? "0 30px 80px rgba(0,0,0,.35)"
      : "0 30px 80px rgba(76,29,149,.12)",
  };

  const primaryButtonStyle: CSSProperties = {
    ...styles.primaryButton,
    background: "linear-gradient(135deg,#8B5CF6,#6D28D9)",
  };

  const secondaryButtonStyle: CSSProperties = {
    ...styles.secondaryButton,
    background: colors.cardSoft,
    color: colors.text,
    border: `1px solid ${colors.border}`,
  };

  const messageStyle: CSSProperties = {
    ...styles.messageBox,
    background: isError ? colors.redSoft : colors.greenSoft,
    color: isError ? colors.red : colors.green,
    border: `1px solid ${isError ? colors.red : colors.green}33`,
  };

  if (emailSent) {
    return (
      <div className="forgot-page" style={pageStyle}>
        <div style={styles.backgroundGrid} />
        <div style={styles.glowOne} />
        <div style={styles.glowTwo} />

        <main
          className="forgot-success-card"
          style={{
            ...styles.successCard,
            background: colors.card,
            border: `1px solid ${colors.border}`,
            boxShadow: isDark
              ? "0 30px 80px rgba(0,0,0,.38)"
              : "0 30px 80px rgba(76,29,149,.14)",
          }}
        >
          <div style={styles.successLogoWrap}>
            <img src={logo} alt="PrepPath" style={styles.successLogo} />
          </div>

          <div
            style={{
              ...styles.successIconWrap,
              background: colors.purpleSoft,
            }}
          >
            <Mail size={32} color={colors.purple} strokeWidth={1.8} />
          </div>

          <span style={{ ...styles.eyebrow, color: colors.purple }}>
            Reset email sent
          </span>

          <h1 style={{ ...styles.successTitle, color: colors.text }}>
            Check your inbox
          </h1>

          <p style={{ ...styles.successText, color: colors.muted }}>
            We sent a secure password-reset link to:
          </p>

          <div
            style={{
              ...styles.emailDisplay,
              background: colors.cardSoft,
              border: `1px solid ${colors.border}`,
              color: colors.text,
            }}
          >
            <Mail size={17} color={colors.purple} strokeWidth={1.8} />
            <strong>{maskEmail(sentEmail)}</strong>
          </div>

          <p style={{ ...styles.successText, color: colors.muted }}>
            Open the newest email from PrepPath and select the password reset
            link. You will be redirected to the page where you can create your
            new password.
          </p>

          {message && (
            <div role={isError ? "alert" : "status"} style={messageStyle}>
              {isError ? <AlertCircle size={17} /> : <CheckCircle2 size={17} />}
              <span>{message}</span>
            </div>
          )}

          <button type="button" onClick={openMailbox} style={primaryButtonStyle}>
            <span>Open Email</span>
            <ExternalLink size={17} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => {
              void sendResetEmail();
            }}
            disabled={loading || secondsLeft > 0}
            style={{
              ...secondaryButtonStyle,
              ...(loading || secondsLeft > 0 ? styles.disabledButton : {}),
            }}
          >
            {loading
              ? "Sending Email..."
              : secondsLeft > 0
                ? `Resend Email in ${secondsLeft}s`
                : "Resend Email"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{ ...styles.textButton, color: colors.muted }}
          >
            <ArrowLeft size={17} aria-hidden="true" />
            <span>Back to Login</span>
          </button>

          <p style={{ ...styles.footerText, color: colors.faint }}>
            © 2026 PrepPath
          </p>
        </main>

        <ResponsiveStyles />
      </div>
    );
  }

  return (
    <div className="forgot-page" style={pageStyle}>
      <div style={styles.backgroundGrid} />
      <div style={styles.glowOne} />
      <div style={styles.glowTwo} />

      <main
        className="forgot-shell"
        style={{
          ...styles.shell,
          background: colors.card,
          border: `1px solid ${colors.border}`,
          boxShadow: isDark
            ? "0 35px 90px rgba(0,0,0,.34)"
            : "0 35px 90px rgba(76,29,149,.14)",
        }}
      >
        <section style={styles.brandPanel}>
          <div>
            <img src={logo} alt="PrepPath" style={styles.logo} />

            <span style={styles.brandBadge}>
              Secure account recovery
            </span>

            <h1 style={styles.brandTitle}>
              Recover access to your learning journey.
            </h1>

            <p style={styles.brandText}>
              Enter the email connected to your PrepPath account. We will send
              you a secure link for creating a new password.
            </p>
          </div>

          <div style={styles.steps}>
            {[
              ["1", "Enter your email", "Use the email linked to your PrepPath account."],
              ["2", "Open the reset link", "Select the newest recovery email in your inbox."],
              ["3", "Create a new password", "Choose a secure password and return to login."],
            ].map(([number, title, text], index) => (
              <div key={number} style={styles.step}>
                <span
                  style={
                    index === 0 ? styles.activeStepCircle : styles.stepCircle
                  }
                >
                  {number}
                </span>

                <div>
                  <strong style={styles.stepTitle}>{title}</strong>
                  <p style={styles.stepText}>{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.securityBox}>
            <ShieldCheck size={27} strokeWidth={1.8} aria-hidden="true" />

            <div>
              <strong style={styles.securityTitle}>
                Protected by Supabase Auth
              </strong>

              <p style={styles.securityText}>
                Recovery links are temporary and should never be shared with
                anyone.
              </p>
            </div>
          </div>

          <small style={styles.copyright}>© 2026 PrepPath</small>
        </section>

        <form
          className="forgot-card"
          onSubmit={sendResetEmail}
          style={cardStyle}
        >
          <div style={styles.formHeading}>
            <div
              style={{
                ...styles.formIcon,
                background: colors.purpleSoft,
              }}
            >
              <KeyRound size={30} color={colors.purple} strokeWidth={1.8} />
            </div>

            <span style={{ ...styles.eyebrow, color: colors.purple }}>
              Forgot password
            </span>

            <h2 style={{ ...styles.title, color: colors.text }}>
              Reset your password
            </h2>

            <p style={{ ...styles.subtitle, color: colors.muted }}>
              Enter your email and we will send you a secure password-reset
              link.
            </p>
          </div>

          {message && (
            <div role="alert" style={messageStyle}>
              {isError ? <AlertCircle size={17} /> : <CheckCircle2 size={17} />}
              <span>{message}</span>
            </div>
          )}

          <label style={styles.field}>
            <span style={{ ...styles.label, color: colors.text }}>
              Email address
            </span>

            <span style={styles.inputWrap}>
              <span style={{ ...styles.inputIcon, color: colors.muted }}><Mail size={17} strokeWidth={1.8} /></span>

              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setMessage("");
                  setIsError(false);
                }}
                placeholder="you@example.com"
                autoComplete="email"
                autoFocus
                required
                aria-invalid={
                  Boolean(email) && !validEmail ? true : undefined
                }
                style={{
                  ...styles.input,
                  background: colors.input,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              />
            </span>
          </label>

          {email && !validEmail && (
            <small style={{ ...styles.validationError, color: colors.red }}>
              Enter a valid email address.
            </small>
          )}

          <button
            type="submit"
            disabled={loading || !validEmail}
            style={{
              ...primaryButtonStyle,
              ...(loading || !validEmail ? styles.disabledButton : {}),
            }}
          >
            {loading ? (
              <span style={styles.buttonContent}>
                <span style={styles.buttonSpinner} />
                Sending Reset Email...
              </span>
            ) : (
              <span style={styles.buttonContent}>
                Send Reset Email
                <ArrowRight size={17} aria-hidden="true" />
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            style={secondaryButtonStyle}
          >
            <ArrowLeft size={17} aria-hidden="true" />
            <span>Back to Login</span>
          </button>

          <div
            style={{
              ...styles.helpBox,
              background: colors.cardSoft,
              border: `1px solid ${colors.border}`,
            }}
          >
            <span
              style={{
                ...styles.helpIcon,
                background: colors.purpleSoft,
                color: colors.purple,
              }}
            >
              <Info size={16} strokeWidth={1.8} />
            </span>

            <p style={{ ...styles.helpText, color: colors.muted }}>
              For your security, PrepPath will not reveal whether an email is
              registered. Check your inbox and spam folder after submitting.
            </p>
          </div>
        </form>
      </main>

      <ResponsiveStyles />
    </div>
  );
}

function ResponsiveStyles() {
  return (
    <style>{`
      .forgot-page input::placeholder {
        color: #9F91AA;
      }

      .forgot-page button {
        transition:
          transform .2s ease,
          box-shadow .2s ease,
          border-color .2s ease,
          opacity .2s ease;
      }

      .forgot-page button:not(:disabled):hover {
        transform: translateY(-2px);
      }

      @media (max-width: 900px) {
        .forgot-page {
          align-items: flex-start !important;
          overflow-y: auto !important;
          padding: 24px !important;
        }

        .forgot-shell {
          grid-template-columns: 1fr !important;
          width: min(680px, 100%) !important;
          margin: auto !important;
        }

        .forgot-shell > section:first-child {
          padding: 34px !important;
        }

        .forgot-card {
          padding: 38px !important;
        }
      }

      @media (max-width: 560px) {
        .forgot-page {
          padding: 14px !important;
        }

        .forgot-shell {
          border-radius: 22px !important;
        }

        .forgot-shell > section:first-child {
          padding: 28px 24px !important;
        }

        .forgot-card {
          padding: 30px 22px !important;
        }

        .forgot-success-card {
          padding: 30px 22px !important;
          border-radius: 22px !important;
        }
      }
    `}</style>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
    boxSizing: "border-box",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    transition: "background .25s ease, color .25s ease",
  },

  backgroundGrid: {
    position: "absolute",
    inset: 0,
    opacity: 0.35,
    backgroundImage:
      "linear-gradient(rgba(124,58,237,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,.055) 1px, transparent 1px)",
    backgroundSize: "34px 34px",
    pointerEvents: "none",
  },

  glowOne: {
    position: "absolute",
    top: -180,
    right: -120,
    width: 470,
    height: 470,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(124,58,237,.22), rgba(124,58,237,0))",
    filter: "blur(10px)",
    pointerEvents: "none",
  },

  glowTwo: {
    position: "absolute",
    bottom: -190,
    left: -130,
    width: 430,
    height: 430,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(76,29,149,.18), rgba(76,29,149,0))",
    filter: "blur(10px)",
    pointerEvents: "none",
  },

  shell: {
    position: "relative",
    zIndex: 1,
    width: "min(1120px, 100%)",
    minHeight: 680,
    display: "grid",
    gridTemplateColumns: "minmax(360px,.95fr) minmax(430px,1.05fr)",
    overflow: "hidden",
    borderRadius: 32,
  },

  brandPanel: {
    padding: 46,
    boxSizing: "border-box",
    color: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 34,
    background:
      "linear-gradient(145deg,#1B1030 0%,#35165B 48%,#51218B 100%)",
  },

  logo: {
    width: 265,
    maxWidth: "100%",
    height: "auto",
    objectFit: "contain",
    display: "block",
    marginBottom: 26,
  },

  brandBadge: {
    display: "inline-flex",
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,.12)",
    border: "1px solid rgba(255,255,255,.22)",
    fontSize: 12,
    fontWeight: 850,
    marginBottom: 17,
  },

  brandTitle: {
    margin: 0,
    fontSize: 38,
    lineHeight: 1.14,
    fontWeight: 950,
    letterSpacing: -0.8,
  },

  brandText: {
    margin: "18px 0 0",
    color: "rgba(255,255,255,.84)",
    lineHeight: 1.75,
    fontSize: 15,
  },

  steps: {
    display: "grid",
    gap: 17,
  },

  step: {
    display: "grid",
    gridTemplateColumns: "44px 1fr",
    gap: 13,
    alignItems: "center",
  },

  activeStepCircle: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#FFFFFF",
    color: "#4C1D95",
    fontWeight: 900,
  },

  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,.12)",
    border: "1px solid rgba(255,255,255,.24)",
    fontWeight: 900,
  },

  stepTitle: {
    display: "block",
    color: "#FFFFFF",
    fontSize: 14,
  },

  stepText: {
    margin: "4px 0 0",
    color: "rgba(255,255,255,.7)",
    lineHeight: 1.5,
    fontSize: 12,
  },

  securityBox: {
    display: "grid",
    gridTemplateColumns: "40px 1fr",
    gap: 12,
    padding: 15,
    borderRadius: 17,
    background: "rgba(255,255,255,.10)",
    border: "1px solid rgba(255,255,255,.14)",
  },

  securityIcon: {
    fontSize: 25,
  },

  securityTitle: {
    color: "#FFFFFF",
    fontSize: 13,
  },

  securityText: {
    margin: "4px 0 0",
    color: "rgba(255,255,255,.7)",
    lineHeight: 1.5,
    fontSize: 12,
  },

  copyright: {
    marginTop: "auto",
    color: "rgba(255,255,255,.65)",
  },

  card: {
    padding: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 17,
    boxSizing: "border-box",
  },

  formHeading: {
    textAlign: "center",
    marginBottom: 4,
  },

  formIcon: {
    width: 68,
    height: 68,
    margin: "0 auto 16px",
    borderRadius: 21,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 31,
  },

  eyebrow: {
    display: "block",
    fontSize: 12,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
  },

  title: {
    margin: "8px 0 9px",
    fontSize: 34,
    fontWeight: 950,
    letterSpacing: -0.6,
    textAlign: "center",
  },

  subtitle: {
    margin: 0,
    lineHeight: 1.7,
    textAlign: "center",
    fontSize: 14,
  },

  field: {
    display: "grid",
    gap: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: 850,
  },

  inputWrap: {
    position: "relative",
  },

  inputIcon: {
    position: "absolute",
    left: 15,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
  },

  input: {
    width: "100%",
    minHeight: 54,
    padding: "12px 15px 12px 44px",
    boxSizing: "border-box",
    borderRadius: 14,
    outline: "none",
    fontSize: 15,
  },

  validationError: {
    marginTop: -8,
    fontSize: 12,
    fontWeight: 750,
  },

  messageBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: 9,
    padding: "12px 14px",
    borderRadius: 13,
    fontSize: 13,
    fontWeight: 750,
    lineHeight: 1.5,
  },

  primaryButton: {
    minHeight: 52,
    padding: "13px 16px",
    border: "none",
    borderRadius: 14,
    color: "#FFFFFF",
    fontWeight: 900,
    fontSize: 14,
    boxShadow: "0 13px 28px rgba(124,58,237,.24)",
    cursor: "pointer",
  },

  secondaryButton: {
    minHeight: 48,
    padding: "12px 15px",
    borderRadius: 14,
    fontWeight: 850,
    cursor: "pointer",
  },

  textButton: {
    border: "none",
    background: "transparent",
    fontWeight: 800,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  disabledButton: {
    opacity: 0.5,
    cursor: "not-allowed",
    transform: "none",
  },

  buttonContent: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  buttonSpinner: {
    width: 15,
    height: 15,
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,.35)",
    borderTopColor: "#FFFFFF",
  },

  helpBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    padding: 13,
    borderRadius: 14,
  },

  helpIcon: {
    width: 24,
    height: 24,
    minWidth: 24,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
  },

  helpText: {
    margin: 0,
    lineHeight: 1.55,
    fontSize: 12,
  },

  successCard: {
    position: "relative",
    zIndex: 1,
    width: "min(500px,100%)",
    padding: 46,
    boxSizing: "border-box",
    borderRadius: 30,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: 17,
  },

  successLogoWrap: {
    width: 190,
    height: 60,
    margin: "0 auto 4px",
    padding: "8px 14px",
    boxSizing: "border-box",
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg,#25133E,#51218B)",
  },

  successLogo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },

  successIconWrap: {
    width: 76,
    height: 76,
    margin: "0 auto",
    borderRadius: 23,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  successIcon: {
    fontSize: 34,
  },

  successTitle: {
    margin: 0,
    fontSize: 34,
    fontWeight: 950,
    letterSpacing: -0.5,
  },

  successText: {
    margin: 0,
    lineHeight: 1.7,
    fontSize: 14,
  },

  emailDisplay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    padding: "12px 14px",
    borderRadius: 14,
    wordBreak: "break-word",
  },

  footerText: {
    margin: 0,
    fontSize: 11,
  },
};
