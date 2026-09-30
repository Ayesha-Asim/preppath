import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo.png";
import { Target, ClipboardList, ChartNoAxesCombined, CalendarDays, LockKeyhole, Mail, Lock, Eye, EyeOff, Lightbulb } from "lucide-react";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export default function Login() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    page: isDark ? "#0C0718" : "#F7F5FC",
    card: isDark ? "#18102B" : "#FFFFFF",
    cardSoft: isDark ? "#241737" : "#FAF8FE",
    text: isDark ? "#FFFFFF" : "#15111C",
    muted: isDark ? "#C8BCD3" : "#6E6476",
    faint: isDark ? "#9F91AA" : "#9A8CA5",
    border: isDark ? "rgba(184,151,255,.24)" : "#E4DDED",
    input: isDark ? "#241737" : "#FFFFFF",
    purple: "#7C3AED",
    purpleDark: "#4C1D95",
    purpleSoft: isDark ? "rgba(124,58,237,.16)" : "#F0E9FF",
    green: "#22C55E",
    greenSoft: isDark ? "rgba(34,197,94,.12)" : "#DCFCE7",
    red: "#EF4444",
    redSoft: isDark ? "rgba(239,68,68,.12)" : "#FEE2E2",
  };

  const pageStyle: CSSProperties = {
    ...styles.page,
    background: isDark ? "radial-gradient(circle at 12% 0%,#24133F 0%,#0C0718 48%,#0C0718 100%)" : colors.page,
    color: colors.text,
  };

  const [email, setEmail] = useState(
    () => localStorage.getItem("preppath-remembered-email") || ""
  );
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(
    () => Boolean(localStorage.getItem("preppath-remembered-email"))
  );
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const emailIsValid = useMemo(
    () => email.length > 0 && isValidEmail(email),
    [email]
  );

  useEffect(() => {
    const redirectAuthenticatedUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        navigate("/dashboard", { replace: true });
        return;
      }

      setCheckingSession(false);
    };

    redirectAuthenticatedUser();
  }, [navigate]);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    if (message) {
      setMessage("");
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (message) {
      setMessage("");
    }
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setIsError(true);
      setMessage("Please enter your email and password.");
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setIsError(true);
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (error) {
      setLoading(false);
      setIsError(true);

      const lowerMessage = error.message.toLowerCase();

      if (
        lowerMessage.includes("invalid login credentials") ||
        lowerMessage.includes("invalid credentials")
      ) {
        setMessage("Incorrect email or password.");
        return;
      }

      if (lowerMessage.includes("email not confirmed")) {
        setMessage("Please confirm your email before signing in.");
        return;
      }

      setMessage(error.message);
      return;
    }

    const user = data.user;

    if (!user?.email_confirmed_at) {
      await supabase.auth.signOut();

      setLoading(false);
      setIsError(true);
      setMessage("Please confirm your email before signing in.");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("preppath-remembered-email", normalizedEmail);
    } else {
      localStorage.removeItem("preppath-remembered-email");
    }

    setIsError(false);
    setMessage("Welcome back! Redirecting to your dashboard...");

    window.setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 650);
  };

  if (checkingSession) {
    return (
      <div
        className="login-page"
        style={{ ...styles.loadingPage, background: colors.page }}
      >
        <div
          style={{
            ...styles.loadingCard,
            background: colors.card,
            color: isDark ? "#C4B5FD" : colors.purple,
            border: `1px solid ${colors.border}`,
          }}
        >
          <span style={styles.loadingSpinner} />
          Checking your session...
        </div>
      </div>
    );
  }

  return (
    <div className="login-page" style={pageStyle}>
      <div style={styles.backgroundGlowOne} />
      <div style={styles.backgroundGlowTwo} />

      <div
        className="login-shell"
        style={{
          ...styles.shell,
          background: colors.card,
          border: `1px solid ${colors.border}`,
          boxShadow: isDark
            ? "0 35px 90px rgba(0,0,0,.34)"
            : "0 35px 90px rgba(76,29,149,.14)",
        }}
      >
        <section style={styles.benefitsPanel}>
          <div style={styles.panelCircleOne} />
          <div style={styles.panelCircleTwo} />
          <div style={styles.panelCircleThree} />
          <img src={logo} alt="PrepPath" style={{ ...styles.logo, position: "relative", zIndex: 1 }} />

          <div>
            <span style={styles.brandBadge}>Welcome back</span>

            <h1 style={styles.benefitTitle}>
              Continue your journey toward your target university.
            </h1>

            <p style={styles.benefitText}>
              Return to your mock tests, analytics, university matches, and exam
              tracker from one focused dashboard.
            </p>
          </div>

          <div style={styles.benefitList}>
            {[
              { icon: Target, title: "Personalized Match", description: "Keep exploring the universities that suit you." },
              { icon: ClipboardList, title: "Mock Tests", description: "Continue practising with focused entry-test questions." },
              { icon: ChartNoAxesCombined, title: "Progress Analytics", description: "Track your accuracy, streak, and weak subjects." },
              { icon: CalendarDays, title: "Exam Tracker", description: "Stay prepared for every upcoming admission test." },
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} style={styles.benefitItem}>
                <span style={styles.benefitIcon}><Icon size={19} strokeWidth={1.8} /></span>

                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.securityNote}>
            <span style={styles.securityIcon}><LockKeyhole size={22} strokeWidth={1.8} /></span>

            <div>
              <strong>Secure sign-in</strong>
              <p>
                Your account is protected with secure authentication.
              </p>
            </div>
          </div>

          <p style={styles.benefitFooter}>© 2026 PrepPath</p>
        </section>

        <form
          className="login-card"
          onSubmit={handleLogin}
          style={{ ...styles.card, background: colors.card }}
        >
          <div style={styles.formHeader}>
            <span style={{ ...styles.formEyebrow, color: colors.purple }}>Student portal</span>

            <h2 style={{ ...styles.title, color: colors.text }}>Welcome back</h2>

            <p style={{ ...styles.subtitle, color: colors.muted }}>
              Sign in to continue your PrepPath preparation.
            </p>
          </div>

          {message && (
            <div
              style={{
                ...styles.messageBox,
                background: isError ? colors.redSoft : colors.greenSoft,
                color: isError ? colors.red : colors.green,
                border: `1px solid ${
                  isError ? `${colors.red}44` : `${colors.green}44`
                }`,
              }}
            >
              {isError ? "⚠" : "✓"} {message}
            </div>
          )}

          <div style={styles.field}>
            <label style={{ ...styles.label, color: colors.text }}>Email address</label>

            <div style={styles.inputWrap}>
              <span style={{ ...styles.inputIcon, color: colors.muted }}><Mail size={17} strokeWidth={1.8} /></span>

              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                style={{
                  ...styles.input,
                  background: colors.input,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              />
            </div>

            {email && (
              <small
                style={{
                  ...styles.validationText,
                  color: emailIsValid ? colors.green : colors.red,
                }}
              >
                {emailIsValid
                  ? "✓ Valid email address"
                  : "Enter a valid email address"}
              </small>
            )}
          </div>

          <div style={styles.field}>
            <div style={styles.passwordLabelRow}>
              <label style={{ ...styles.label, color: colors.text }}>Password</label>

              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                style={{ ...styles.forgotButton, color: colors.purple }}
              >
                Forgot password?
              </button>
            </div>

            <div style={styles.inputWrap}>
              <span style={{ ...styles.inputIcon, color: colors.muted }}><Lock size={17} strokeWidth={1.8} /></span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
                style={{
                  ...styles.input,
                  paddingRight: 48,
                  background: colors.input,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                style={{ ...styles.eyeButton, color: colors.muted }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <label style={{ ...styles.rememberRow, color: colors.muted }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              style={styles.checkbox}
            />

            <span>Remember my email on this device</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.75 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <span style={styles.loadingContent}>
                <span style={styles.buttonSpinner} />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>

          <div style={{ ...styles.dividerRow, color: colors.faint }}>
            <span style={{ ...styles.dividerLine, background: colors.border }} />
            <span>New to PrepPath?</span>
            <span style={{ ...styles.dividerLine, background: colors.border }} />
          </div>

          <button
            type="button"
            onClick={() => navigate("/signup")}
            style={{
              ...styles.signupButton,
              background: colors.cardSoft,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          >
            Create an account →
          </button>

          <div
            style={{
              ...styles.helpBox,
              background: colors.cardSoft,
              border: `1px solid ${colors.border}`,
              color: colors.text,
            }}
          >
            <span
              style={{
                ...styles.helpIcon,
                background: colors.purpleSoft,
              }}
            >
              <Lightbulb size={19} strokeWidth={1.8} />
            </span>

            <p>
              Having trouble signing in? Reset your password or verify that your
              email confirmation link was completed.
            </p>
          </div>
        </form>
      </div>

      <style>{`
        .login-page input:focus { border-color: #8B5CF6 !important; box-shadow: 0 0 0 3px rgba(139,92,246,.16); }
        .login-page input::placeholder {
          color: #9F91AA;
        }

        .login-page button {
          transition:
            transform .2s ease,
            box-shadow .2s ease,
            border-color .2s ease,
            opacity .2s ease;
        }

        .login-page button:not(:disabled):hover {
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .login-page {
            align-items: flex-start !important;
            overflow-y: auto !important;
            padding: 24px !important;
          }

          .login-shell {
            grid-template-columns: 1fr !important;
            width: min(680px,100%) !important;
            margin: auto !important;
          }

          .login-shell > section:first-child {
            min-height: 520px !important;
            padding: 36px !important;
          }

          .login-card {
            padding: 40px !important;
          }
        }

        @media (max-width: 560px) {
          .login-page {
            padding: 14px !important;
          }

          .login-shell {
            border-radius: 22px !important;
          }

          .login-shell > section:first-child {
            min-height: auto !important;
            padding: 28px 24px !important;
          }

          .login-card {
            padding: 30px 22px !important;
          }
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 28,
    boxSizing: "border-box",
    background:
      "radial-gradient(circle at top left,#EDE9FE 0%,#F8FAFC 36%,#FFFFFF 100%)",
  },

  loadingPage: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at top left,#EDE9FE 0%,#F8FAFC 36%,#FFFFFF 100%)",
  },

  loadingCard: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "16px 20px",
    borderRadius: 16,
    background: "#FFFFFF",
    color: "#4C1D95",
    fontWeight: 850,
    boxShadow: "0 18px 45px rgba(15,23,42,0.10)",
  },

  loadingSpinner: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    border: "2px solid #DDD6FE",
    borderTopColor: "#7C3AED",
  },

  backgroundGlowOne: {
    position: "absolute",
    width: 430,
    height: 430,
    borderRadius: "50%",
    background: "rgba(124,58,237,0.10)",
    top: -180,
    right: -120,
  },

  backgroundGlowTwo: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: "50%",
    background: "rgba(139,92,246,0.09)",
    bottom: -170,
    left: -100,
  },

  shell: {
    position: "relative",
    zIndex: 1,
    width: "min(1120px,100%)",
    display: "grid",
    gridTemplateColumns: "minmax(360px,0.95fr) minmax(420px,1.05fr)",
    background: "#FFFFFF",
    borderRadius: 30,
    overflow: "hidden",
    boxShadow: "0 30px 80px rgba(15,23,42,0.14)",
    border: "1px solid rgba(226,232,240,0.9)",
  },

  benefitsPanel: {
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(145deg,#160D2B 0%,#291447 52%,#4C1D95 100%)",
    color: "#FFFFFF",
    padding: 50,
    display: "flex",
    flexDirection: "column",
    gap: 30,
    minHeight: 680,
    boxSizing: "border-box",
  },

  logo: {
    width: 170,
    height: 44,
    objectFit: "contain",
    objectPosition: "left center",
  },

  brandBadge: {
    display: "inline-flex",
    padding: "7px 11px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.22)",
    fontSize: 12,
    fontWeight: 800,
    marginBottom: 16,
  },

  benefitTitle: {
    margin: 0,
    fontSize: 38,
    lineHeight: 1.15,
    fontWeight: 950,
    letterSpacing: -0.8,
  },

  benefitText: {
    margin: "16px 0 0",
    color: "rgba(255,255,255,0.84)",
    lineHeight: 1.7,
    fontSize: 15,
  },

  benefitList: {
    display: "grid",
    gap: 13,
  },

  benefitItem: {
    display: "grid",
    gridTemplateColumns: "44px 1fr",
    gap: 12,
    alignItems: "center",
    padding: 13,
    borderRadius: 16,
    background: "rgba(139,92,246,0.11)",
    border: "1px solid rgba(255,255,255,0.13)",
  },

  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    background: "rgba(167,139,250,0.15)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  },

  securityNote: {
    display: "grid",
    gridTemplateColumns: "42px 1fr",
    gap: 12,
    padding: 14,
    borderRadius: 16,
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.14)",
  },

  securityIcon: {
    fontSize: 25,
  },

  benefitFooter: {
    marginTop: "auto",
    marginBottom: 0,
    color: "rgba(255,255,255,0.68)",
    fontSize: 12,
  },

  panelCircleOne: {
    position: "absolute",
    width: 270,
    height: 270,
    borderRadius: "50%",
    background: "rgba(255,255,255,.06)",
    right: -80,
    top: 70,
    pointerEvents: "none",
  },

  panelCircleTwo: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: "50%",
    background: "rgba(255,255,255,.07)",
    left: -70,
    bottom: -40,
    pointerEvents: "none",
  },

  panelCircleThree: {
    position: "absolute",
    width: 78,
    height: 78,
    borderRadius: "50%",
    background: "rgba(255,255,255,.08)",
    left: 28,
    bottom: 105,
    pointerEvents: "none",
  },

  card: {
    background: "#FFFFFF",
    padding: 46,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 16,
    boxSizing: "border-box",
  },

  formHeader: {
    marginBottom: 4,
  },

  formEyebrow: {
    color: "#7C3AED",
    fontSize: 12,
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  title: {
    color: "#312E81",
    fontSize: 34,
    fontWeight: 950,
    margin: "7px 0 6px",
    letterSpacing: -0.5,
  },

  subtitle: {
    color: "#64748B",
    margin: 0,
    fontSize: 14,
    lineHeight: 1.6,
  },

  messageBox: {
    padding: "11px 13px",
    borderRadius: 14,
    fontSize: 13,
    fontWeight: 750,
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },

  label: {
    color: "#334155",
    fontSize: 12,
    fontWeight: 800,
  },

  passwordLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },

  forgotButton: {
    border: "none",
    background: "transparent",
    color: "#6D28D9",
    cursor: "pointer",
    padding: 0,
    fontSize: 12,
    fontWeight: 800,
  },

  inputWrap: {
    position: "relative",
  },

  inputIcon: {
    position: "absolute",
    left: 13,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 15,
    pointerEvents: "none",
    zIndex: 1,
  },

  input: {
    width: "100%",
    minHeight: 54,
    padding: "11px 13px 11px 40px",
    borderRadius: 14,
    border: "1px solid #DCE3ED",
    background: "#FFFFFF",
    color: "#111827",
    outline: "none",
    fontSize: 14,
    boxSizing: "border-box",
  },

  eyeButton: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    width: 34,
    height: 34,
    border: "none",
    borderRadius: 9,
    background: "transparent",
    cursor: "pointer",
  },

  validationText: {
    fontSize: 11,
    fontWeight: 750,
  },

  rememberRow: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    color: "#64748B",
    fontSize: 12,
    cursor: "pointer",
  },

  checkbox: {
    width: 17,
    height: 17,
    accentColor: "#7C3AED",
  },

  button: {
    minHeight: 52,
    padding: 12,
    background: "linear-gradient(135deg,#7C3AED,#4C1D95)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: 14,
    fontWeight: 900,
    boxShadow: "0 13px 28px rgba(124,58,237,0.24)",
  },

  loadingContent: {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
  },

  buttonSpinner: {
    width: 15,
    height: 15,
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.45)",
    borderTopColor: "#FFFFFF",
  },

  dividerRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    gap: 10,
    color: "#94A3B8",
    fontSize: 11,
  },

  dividerLine: {
    height: 1,
    background: "#E2E8F0",
  },

  signupButton: {
    minHeight: 44,
    padding: 10,
    borderRadius: 14,
    border: "1px solid #DDD6FE",
    background: "#F5F3FF",
    color: "#5B21B6",
    fontWeight: 850,
    cursor: "pointer",
  },

  helpBox: {
    display: "grid",
    gridTemplateColumns: "38px 1fr",
    gap: 10,
    padding: 12,
    borderRadius: 13,
    background: "#F8FAFC",
    border: "1px solid #E2E8F0",
    color: "#64748B",
    fontSize: 12,
    lineHeight: 1.5,
  },

  helpIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    background: "#EDE9FE",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};