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
import { CalendarDays, ChartNoAxesCombined, Eye, EyeOff, GraduationCap, LockKeyhole, Mail, MapPin, NotebookPen, Target, Trophy, UserRound } from "lucide-react";

type EmailStatus =
  | "idle"
  | "checking"
  | "available"
  | "unconfirmed"
  | "confirmed"
  | "error";

type SignupForm = {
  fullName: string;
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  city: string;
  dob: string;
  university: string;
};

const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Sargodha",
  "Bahawalpur",
  "Sukkur",
  "Abbottabad",
];

const universities = [
  "FAST NUCES",
  "NUST",
  "COMSATS",
  "UET",
  "GIKI",
  "ITU",
  "FCCU",
  "GCU",
  "PIEAS",
  "NED",
  "Air University",
  "LUMS",
  "UCP",
  "SZABIST",
  "Bahria University",
  "PUCIT",
  "UMT",
  "UOL",
];

const initialForm: SignupForm = {
  fullName: "",
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  city: "",
  dob: "",
  university: "",
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const getPasswordStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (!password) {
    return { score: 0, label: "Enter a password", color: "#CBD5E1" };
  }

  if (score <= 2) {
    return { score: 1, label: "Weak", color: "#EF4444" };
  }

  if (score === 3) {
    return { score: 2, label: "Fair", color: "#F59E0B" };
  }

  if (score === 4) {
    return { score: 3, label: "Strong", color: "#22C55E" };
  }

  return { score: 4, label: "Very strong", color: "#16A34A" };
};

const maskEmail = (email: string) => {
  const [localPart, domain] = email.split("@");

  if (!localPart || !domain) return email;

  const visible = localPart.slice(0, Math.min(2, localPart.length));
  const hidden = "*".repeat(Math.max(2, localPart.length - visible.length));

  return `${visible}${hidden}@${domain}`;
};

export default function Signup() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    page: isDark ? "#09070F" : "#F4F4FA",
    card: isDark ? "#17101F" : "#FFFFFF",
    cardSoft: isDark ? "#21152D" : "#FAF8FE",
    text: isDark ? "#FFFFFF" : "#15111C",
    muted: isDark ? "#C8BCD3" : "#6E6476",
    faint: isDark ? "#9F91AA" : "#9A8CA5",
    border: isDark ? "rgba(171,132,255,.17)" : "#E4DDED",
    input: isDark ? "#21152D" : "#FFFFFF",
    purple: "#7C3AED",
    purpleDark: "#4C1D95",
    purpleSoft: isDark ? "rgba(124,58,237,.16)" : "#F0E9FF",
    green: "#22C55E",
    greenSoft: isDark ? "rgba(34,197,94,.12)" : "#F0FDF4",
    orange: "#F97316",
    orangeSoft: isDark ? "rgba(249,115,22,.12)" : "#FFF7ED",
    red: "#EF4444",
    redSoft: isDark ? "rgba(239,68,68,.12)" : "#FEF2F2",
  };

  const pageStyle: CSSProperties = {
    ...styles.page,
    background: colors.page,
    color: colors.text,
  };

  const [form, setForm] = useState<SignupForm>(initialForm);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false);
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const [emailStatusMessage, setEmailStatusMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const passwordStrength = useMemo(
    () => getPasswordStrength(form.password),
    [form.password]
  );

  const passwordsMatch =
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword;

  const emailIsValid = form.email.length > 0 && isValidEmail(form.email);
  const maxDob = new Date().toISOString().slice(0, 10);

  const normalizedEmail = form.email.trim().toLowerCase();

  useEffect(() => {
    if (!normalizedEmail) {
      setEmailStatus("idle");
      setEmailStatusMessage("");
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      setEmailStatus("idle");
      setEmailStatusMessage("");
      return;
    }

    setEmailStatus("checking");
    setEmailStatusMessage("Checking whether this email is available...");

    const timer = window.setTimeout(async () => {
      const { data, error } = await supabase.rpc(
        "check_signup_email_status",
        { p_email: normalizedEmail }
      );

      if (error) {
        console.error("Email availability check error:", error.message);
        setEmailStatus("error");
        setEmailStatusMessage(
          "We could not check this email right now. Please try again."
        );
        return;
      }

      if (data === "confirmed") {
        setEmailStatus("confirmed");
        setEmailStatusMessage(
          "An account already uses this email. Please sign in instead."
        );
        return;
      }

      if (data === "unconfirmed") {
        setEmailStatus("unconfirmed");
        setEmailStatusMessage(
          "This account already exists but its email is not verified."
        );
        return;
      }

      setEmailStatus("available");
      setEmailStatusMessage("This email is available.");
    }, 650);

    return () => window.clearTimeout(timer);
  }, [normalizedEmail]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (message) {
      setMessage("");
    }
  };

  const showError = (text: string) => {
    setIsError(true);
    setMessage(text);
  };

  const handleSignup = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");

    const normalized = {
      ...form,
      fullName: form.fullName.trim(),
      displayName: form.displayName.trim(),
      email: normalizedEmail,
      city: form.city.trim(),
      university: form.university.trim(),
    };

    if (
      !normalized.fullName ||
      !normalized.displayName ||
      !normalized.email ||
      !normalized.password ||
      !normalized.confirmPassword ||
      !normalized.city ||
      !normalized.dob ||
      !normalized.university
    ) {
      showError("Please complete every field.");
      return;
    }

    if (!/^[\p{L}\p{N}_ .-]{3,24}$/u.test(normalized.displayName)) {
      showError("Display name must be 3–24 characters and use letters, numbers, spaces, underscores, periods, or hyphens.");
      return;
    }

    if (!isValidEmail(normalized.email)) {
      showError("Please enter a valid email address.");
      return;
    }

    if (emailStatus === "checking") {
      showError("Please wait while we check your email address.");
      return;
    }

    if (emailStatus === "confirmed") {
      showError("An account already uses this email. Please sign in instead.");
      return;
    }

    if (emailStatus === "unconfirmed") {
      showError(
        "This account already exists but is not verified. Resend the verification email instead."
      );
      return;
    }

    if (emailStatus === "error") {
      showError("We could not verify whether this email is available.");
      return;
    }

    if (normalized.password.length < 8) {
      showError("Password must be at least 8 characters long.");
      return;
    }

    if (passwordStrength.score < 2) {
      showError(
        "Use a stronger password with uppercase, lowercase, numbers, or symbols."
      );
      return;
    }

    if (normalized.password !== normalized.confirmPassword) {
      showError("Passwords do not match.");
      return;
    }

    const selectedDob = new Date(normalized.dob);

    if (Number.isNaN(selectedDob.getTime()) || normalized.dob > maxDob) {
      showError("Please enter a valid date of birth.");
      return;
    }

    if (!acceptedTerms) {
      showError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: normalized.email,
      password: normalized.password,
      options: {
        data: {
          name: normalized.fullName,
          display_name: normalized.displayName,
          city: normalized.city,
          dob: normalized.dob,
          target_university: normalized.university,
        },
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    setLoading(false);

    if (error) {
      setIsError(true);

      const lowerMessage = error.message.toLowerCase();

      if (
        lowerMessage.includes("already") ||
        lowerMessage.includes("registered")
      ) {
        setMessage("An account with this email already exists. Please log in.");
        return;
      }

      setMessage(error.message);
      return;
    }

    if (data.session) {
      await supabase.auth.signOut();
    }

    setIsError(false);
    setSignupComplete(true);
    setMessage(
      "We sent a verification link to your email. Verify your account before signing in."
    );
  };

  const resendExistingVerificationEmail = async () => {
    if (
      !normalizedEmail ||
      emailStatus !== "unconfirmed" ||
      resending
    ) {
      return;
    }

    setResending(true);
    setMessage("");

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: normalizedEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    setResending(false);

    if (error) {
      setIsError(true);
      setMessage(error.message);
      return;
    }

    setIsError(false);
    setSignupComplete(true);
    setMessage(
      "A new verification email has been sent. Open it before signing in."
    );
  };

  const resendVerificationEmail = async () => {
    if (!normalizedEmail || resending) return;

    setResending(true);
    setMessage("");

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: normalizedEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });

    setResending(false);

    if (error) {
      setIsError(true);
      setMessage(error.message);
      return;
    }

    setIsError(false);
    setMessage("A new verification email has been sent.");
  };

  const returnToSignup = () => {
    setSignupComplete(false);
    setMessage("");
    setIsError(false);
  };

  if (signupComplete) {
    return (
      <div className="signup-page" style={pageStyle}>
        <div style={styles.backgroundGlowOne} />
        <div style={styles.backgroundGlowTwo} />

        <div
          className="signup-verification-card"
          style={{
            ...styles.verificationCard,
            background: colors.card,
            border: `1px solid ${colors.border}`,
            boxShadow: isDark
              ? "0 30px 80px rgba(0,0,0,.38)"
              : "0 30px 80px rgba(76,29,149,.14)",
          }}
        >
          <img src={logo} alt="PrepPath" style={styles.verificationLogo} />

          <div style={{ ...styles.verificationIcon, background: colors.purpleSoft }}><Mail size={32} strokeWidth={1.8} color={colors.purple} /></div>

          <span style={{ ...styles.formEyebrow, color: colors.purple }}>Verify your email</span>

          <h1 style={{ ...styles.verificationTitle, color: colors.text }}>Check your inbox</h1>

          <p style={{ ...styles.verificationText, color: colors.muted }}>
            We sent a confirmation link to
          </p>

          <strong style={{ ...styles.verificationEmail, color: colors.purple }}>
            {maskEmail(normalizedEmail)}
          </strong>

          <p style={{ ...styles.verificationText, color: colors.muted }}>
            Open the email and click the verification link before signing in.
            Check your spam or junk folder if you cannot see it.
          </p>

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

          <div style={{ ...styles.verificationSteps, color: colors.muted }}>
            <div style={styles.verificationStep}>
              <span style={styles.stepCircleComplete}>✓</span>
              <span>Account created</span>
            </div>

            <div style={{ ...styles.verificationLine, background: colors.border }} />

            <div style={styles.verificationStep}>
              <span style={styles.stepCircleActive}>2</span>
              <span>Verify email</span>
            </div>

            <div style={{ ...styles.verificationLine, background: colors.border }} />

            <div style={styles.verificationStep}>
              <span
                style={{
                  ...styles.stepCircle,
                  background: colors.cardSoft,
                  color: colors.muted,
                }}
              >
                3
              </span>
              <span>Sign in</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{
              ...styles.button,
              background: "linear-gradient(135deg,#7C3AED,#4C1D95)",
            }}
          >
            Continue to Login
          </button>

          <button
            type="button"
            onClick={resendVerificationEmail}
            disabled={resending}
            style={{
              ...styles.secondaryButton,
              background: colors.cardSoft,
              color: colors.text,
              border: `1px solid ${colors.border}`,
              opacity: resending ? 0.65 : 1,
              cursor: resending ? "not-allowed" : "pointer",
            }}
          >
            {resending ? "Sending verification email..." : "Resend Email"}
          </button>

          <button
            type="button"
            onClick={returnToSignup}
            style={{ ...styles.textButton, color: colors.muted }}
          >
            ← Use a different email
          </button>

          <p style={{ ...styles.verificationFooter, color: colors.faint }}>© 2026 PrepPath</p>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-page" style={pageStyle}>
      <div style={styles.backgroundGlowOne} />
      <div style={styles.backgroundGlowTwo} />

      <div
        className="signup-shell"
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
            <span style={styles.brandBadge}>Smarter admission preparation</span>

            <h1 style={styles.benefitTitle}>
              Your complete university-entry preparation platform.
            </h1>

            <p style={styles.benefitText}>
              Build a personalized study path, practise with mock tests, and
              track your progress from one dashboard.
            </p>
          </div>

          <div style={styles.benefitList}>
            {[
              { icon: <Target size={20} />, title: "University Match", description: "Find universities suited to your goals." },
              { icon: <NotebookPen size={20} />, title: "Mock Tests", description: "Practise with focused entry-test questions." },
              { icon: <ChartNoAxesCombined size={20} />, title: "Analytics", description: "See your strongest and weakest subjects." },
              { icon: <CalendarDays size={20} />, title: "Exam Tracker", description: "Keep every admission deadline organized." },
              { icon: <Trophy size={20} />, title: "Leaderboard", description: "Stay motivated with community rankings." },
            ].map(({ icon, title, description }) => (
              <div key={title} style={styles.benefitItem}>
                <span style={styles.benefitIcon}>{icon}</span>

                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>

          <p style={styles.benefitFooter}>© 2026 PrepPath</p>
        </section>

        <form
          className="signup-card"
          onSubmit={handleSignup}
          style={{ ...styles.card, background: colors.card }}
        >
          <div style={styles.formHeader}>
            <span style={{ ...styles.formEyebrow, color: colors.purple }}>Create your account</span>

            <h2 style={{ ...styles.title, color: colors.text }}>Start preparing smarter</h2>

            <p style={{ ...styles.subtitle, color: colors.muted }}>
              Set up your profile to personalize your PrepPath experience.
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
            <label style={{ ...styles.label, color: colors.text }}>Full name</label>

            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}><UserRound size={18} /></span>

              <input
                name="fullName"
                placeholder="Enter your full name"
                autoComplete="name"
                value={form.fullName}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  background: colors.input,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              />
            </div>
          </div>

          <div style={styles.field}>
            <label htmlFor="signup-display-name" style={{ ...styles.label, color: colors.text }}>
              Display name
            </label>
            <div style={styles.inputWrap}>
              <span style={{ ...styles.inputIcon, color: colors.purple }} aria-hidden="true">@</span>
              <input
                id="signup-display-name"
                name="displayName"
                placeholder="Choose a public nickname"
                autoComplete="nickname"
                minLength={3}
                maxLength={24}
                required
                value={form.displayName}
                onChange={handleChange}
                aria-describedby="signup-display-name-help"
                style={{
                  ...styles.input,
                  background: colors.input,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              />
            </div>
            <small id="signup-display-name-help" style={{ ...styles.validationText, color: colors.muted, fontWeight: 500 }}>
              This nickname will be visible to other students on the leaderboard. Your full name and email will not be shown there.
            </small>
          </div>

          <div style={styles.field}>
            <label style={{ ...styles.label, color: colors.text }}>Email address</label>

            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}><Mail size={18} /></span>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  background: colors.input,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              />
            </div>

            {form.email && !emailIsValid && (
              <small
                style={{
                  ...styles.validationText,
                  color: colors.red,
                }}
              >
                Enter a valid email address
              </small>
            )}

            {emailIsValid && emailStatusMessage && (
              <div
                style={{
                  ...styles.emailStatusBox,
                  background:
                    emailStatus === "available"
                      ? "#F0FDF4"
                      : emailStatus === "confirmed"
                      ? "#FEF2F2"
                      : emailStatus === "unconfirmed"
                      ? "#FFF7ED"
                      : "#F8FAFC",
                  color:
                    emailStatus === "available"
                      ? "#166534"
                      : emailStatus === "confirmed"
                      ? "#991B1B"
                      : emailStatus === "unconfirmed"
                      ? "#9A3412"
                      : "#64748B",
                  border: `1px solid ${
                    emailStatus === "available"
                      ? "#86EFAC"
                      : emailStatus === "confirmed"
                      ? "#FCA5A5"
                      : emailStatus === "unconfirmed"
                      ? "#FDBA74"
                      : "#E2E8F0"
                  }`,
                }}
              >
                <span>
                  {emailStatus === "checking"
                    ? "◌"
                    : emailStatus === "available"
                    ? "✓"
                    : emailStatus === "unconfirmed"
                    ? "✉"
                    : "⚠"}
                </span>

                <span style={{ flex: 1 }}>{emailStatusMessage}</span>

                {emailStatus === "confirmed" && (
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    style={{
                      ...styles.emailActionButton,
                      background: colors.card,
                      color: colors.purple,
                    }}
                  >
                    Sign in
                  </button>
                )}

                {emailStatus === "unconfirmed" && (
                  <button
                    type="button"
                    onClick={resendExistingVerificationEmail}
                    disabled={resending}
                    style={{
                      ...styles.emailActionButton,
                      background: colors.card,
                      color: colors.purple,
                      opacity: resending ? 0.65 : 1,
                    }}
                  >
                    {resending ? "Sending..." : "Send email again"}
                  </button>
                )}
              </div>
            )}
          </div>

          <div style={styles.twoColumnFields}>
            <div style={styles.field}>
              <label style={{ ...styles.label, color: colors.text }}>Password</label>

              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}><LockKeyhole size={18} /></span>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
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

            <div style={styles.field}>
              <label style={{ ...styles.label, color: colors.text }}>Confirm password</label>

              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}><LockKeyhole size={18} /></span>

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
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
                  onClick={() =>
                    setShowConfirmPassword((current) => !current)
                  }
                  style={{ ...styles.eyeButton, color: colors.muted }}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirmation password"
                      : "Show confirmation password"
                  }
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {form.password && (
            <div style={styles.strengthWrap}>
              <div style={{ ...styles.strengthHeader, color: colors.muted }}>
                <span>Password strength</span>

                <strong style={{ color: passwordStrength.color }}>
                  {passwordStrength.label}
                </strong>
              </div>

              <div style={styles.strengthBars}>
                {[1, 2, 3, 4].map((bar) => (
                  <span
                    key={bar}
                    style={{
                      ...styles.strengthBar,
                      background:
                        bar <= passwordStrength.score
                          ? passwordStrength.color
                          : colors.border,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {form.confirmPassword && (
            <small
              style={{
                ...styles.validationText,
                color: passwordsMatch ? colors.green : colors.red,
              }}
            >
              {passwordsMatch
                ? "✓ Passwords match"
                : "Passwords do not match"}
            </small>
          )}

          <div style={styles.twoColumnFields}>
            <div style={styles.field}>
              <label style={{ ...styles.label, color: colors.text }}>City</label>

              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}><MapPin size={18} /></span>

                <input
                  name="city"
                  list="city-options"
                  placeholder="Search or select city"
                  value={form.city}
                  onChange={handleChange}
                  style={{
                  ...styles.input,
                  background: colors.input,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
                />

                <datalist id="city-options">
                  {cities.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>
            </div>

            <div style={styles.field}>
              <label style={{ ...styles.label, color: colors.text }}>Date of birth</label>

              <div style={styles.inputWrap}>
                <span style={styles.inputIcon}><CalendarDays size={18} /></span>

                <input
                  type="date"
                  name="dob"
                  max={maxDob}
                  value={form.dob}
                  onChange={handleChange}
                  style={{
                  ...styles.input,
                  background: colors.input,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
                />
              </div>
            </div>
          </div>

          <div style={styles.field}>
            <label style={{ ...styles.label, color: colors.text }}>Target university</label>

            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}><GraduationCap size={18} /></span>

              <input
                name="university"
                list="university-options"
                placeholder="Search or select university"
                value={form.university}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  background: colors.input,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              />

              <datalist id="university-options">
                {universities.map((university) => (
                  <option key={university} value={university} />
                ))}
              </datalist>
            </div>
          </div>

          <label style={{ ...styles.termsRow, color: colors.muted }}>
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              style={styles.checkbox}
            />

            <span>
              I agree to the{" "}
              <button
                type="button"
                style={{ ...styles.inlineLink, color: colors.purple }}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  navigate("/terms");
                }}
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                style={{ ...styles.inlineLink, color: colors.purple }}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  navigate("/privacy");
                }}
              >
                Privacy Policy
              </button>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={
              loading ||
              emailStatus === "checking" ||
              emailStatus === "confirmed" ||
              emailStatus === "unconfirmed" ||
              emailStatus === "error"
            }
            style={{
              ...styles.button,
              background: "linear-gradient(135deg,#7C3AED,#4C1D95)",
              opacity:
                loading ||
                emailStatus === "checking" ||
                emailStatus === "confirmed" ||
                emailStatus === "unconfirmed" ||
                emailStatus === "error"
                  ? 0.58
                  : 1,
              cursor:
                loading ||
                emailStatus === "checking" ||
                emailStatus === "confirmed" ||
                emailStatus === "unconfirmed" ||
                emailStatus === "error"
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {loading
              ? "Creating account..."
              : emailStatus === "checking"
              ? "Checking email..."
              : emailStatus === "confirmed"
              ? "Account already exists"
              : emailStatus === "unconfirmed"
              ? "Verify existing account"
              : "Create Account"}
          </button>

          <div style={{ ...styles.dividerRow, color: colors.faint }}>
            <span style={{ ...styles.dividerLine, background: colors.border }} />
            <span>Already registered?</span>
            <span style={{ ...styles.dividerLine, background: colors.border }} />
          </div>

          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{
              ...styles.loginButton,
              background: colors.cardSoft,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          >
            Sign in instead →
          </button>
        </form>
      </div>

      <style>{`
        .signup-page input::placeholder {
          color: #9F91AA;
        }

        .signup-page button {
          transition:
            transform .2s ease,
            box-shadow .2s ease,
            border-color .2s ease,
            opacity .2s ease;
        }

        .signup-page button:not(:disabled):hover {
          transform: translateY(-2px);
        }

        @media (max-width: 980px) {
          .signup-page {
            align-items: flex-start !important;
            overflow-y: auto !important;
            padding: 24px !important;
          }

          .signup-shell {
            grid-template-columns: 1fr !important;
            width: min(760px,100%) !important;
            margin: auto !important;
          }

          .signup-shell > section:first-child {
            min-height: 560px !important;
            padding: 38px !important;
          }

          .signup-card {
            padding: 40px !important;
          }
        }

        @media (max-width: 680px) {
          .signup-card > div[style*="grid-template-columns: repeat(2"] {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 560px) {
          .signup-page {
            padding: 14px !important;
          }

          .signup-shell {
            border-radius: 22px !important;
          }

          .signup-shell > section:first-child {
            min-height: auto !important;
            padding: 28px 24px !important;
          }

          .signup-card {
            padding: 30px 22px !important;
          }

          .signup-verification-card {
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
    background: "rgba(56,189,248,0.08)",
    bottom: -170,
    left: -100,
  },

  shell: {
    position: "relative",
    zIndex: 1,
    width: "min(1220px,100%)",
    display: "grid",
    gridTemplateColumns: "minmax(360px,0.9fr) minmax(480px,1.1fr)",
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
      "linear-gradient(135deg,#2A0F50 0%,#4C1D95 44%,#6D28D9 72%,#3B82F6 120%)",
    color: "#FFFFFF",
    padding: 44,
    display: "flex",
    flexDirection: "column",
    gap: 34,
    minHeight: 760,
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
    fontSize: 39,
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
    gap: 14,
  },

  benefitItem: {
    display: "grid",
    gridTemplateColumns: "44px 1fr",
    gap: 12,
    alignItems: "center",
    padding: 13,
    borderRadius: 16,
    background: "rgba(255,255,255,0.055)",
    border: "1px solid rgba(255,255,255,0.13)",
  },

  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    background: "rgba(255,255,255,0.10)",
    color: "#DDD6FE",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
  },

  panelCircleOne: {
    position: "absolute",
    width: 290,
    height: 290,
    borderRadius: "50%",
    background: "rgba(255,255,255,.06)",
    right: -90,
    top: 80,
    pointerEvents: "none",
  },

  panelCircleTwo: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: "50%",
    background: "rgba(255,255,255,.07)",
    left: -80,
    bottom: -45,
    pointerEvents: "none",
  },

  panelCircleThree: {
    position: "absolute",
    width: 82,
    height: 82,
    borderRadius: "50%",
    background: "rgba(255,255,255,.08)",
    left: 26,
    bottom: 110,
    pointerEvents: "none",
  },

  benefitFooter: {
    marginTop: "auto",
    marginBottom: 0,
    color: "rgba(255,255,255,0.68)",
    fontSize: 12,
  },

  card: {
    background: "#FFFFFF",
    padding: 42,
    display: "flex",
    flexDirection: "column",
    gap: 13,
    boxSizing: "border-box",
  },

  formHeader: {
    marginBottom: 5,
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

  inputWrap: {
    position: "relative",
  },

  inputIcon: {
    position: "absolute",
    left: 13,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 15,
    color: "#A78BFA",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
    zIndex: 1,
  },

  input: {
    width: "100%",
    minHeight: 52,
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  twoColumnFields: {
    display: "grid",
    gridTemplateColumns: "repeat(2,minmax(0,1fr))",
    gap: 12,
  },

  validationText: {
    fontSize: 11,
    fontWeight: 750,
  },

  emailStatusBox: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "10px 11px",
    borderRadius: 11,
    fontSize: 12,
    fontWeight: 700,
  },

  emailActionButton: {
    flexShrink: 0,
    border: "none",
    background: "#FFFFFF",
    color: "#5B21B6",
    borderRadius: 8,
    padding: "7px 9px",
    cursor: "pointer",
    fontWeight: 850,
    boxShadow: "0 4px 12px rgba(15,23,42,0.08)",
  },

  strengthWrap: {
    display: "grid",
    gap: 7,
  },

  strengthHeader: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 11,
    color: "#64748B",
  },

  strengthBars: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 5,
  },

  strengthBar: {
    height: 6,
    borderRadius: 999,
  },

  termsRow: {
    display: "flex",
    gap: 9,
    alignItems: "flex-start",
    color: "#64748B",
    fontSize: 12,
    lineHeight: 1.5,
    cursor: "pointer",
  },

  checkbox: {
    width: 17,
    height: 17,
    accentColor: "#7C3AED",
    marginTop: 1,
    flexShrink: 0,
  },

  inlineLink: {
    border: "none",
    background: "transparent",
    color: "#6D28D9",
    padding: 0,
    cursor: "pointer",
    fontWeight: 750,
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
    cursor: "pointer",
  },

  secondaryButton: {
    minHeight: 46,
    padding: 11,
    borderRadius: 14,
    border: "1px solid #DDD6FE",
    background: "#F5F3FF",
    color: "#5B21B6",
    fontWeight: 850,
  },

  textButton: {
    border: "none",
    background: "transparent",
    color: "#64748B",
    fontWeight: 800,
    cursor: "pointer",
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

  loginButton: {
    minHeight: 43,
    padding: 10,
    borderRadius: 14,
    border: "1px solid #DDD6FE",
    background: "#F5F3FF",
    color: "#5B21B6",
    fontWeight: 850,
    cursor: "pointer",
  },

  verificationCard: {
    position: "relative",
    zIndex: 1,
    width: "min(470px,100%)",
    background: "#dbcbf0",
    padding: 42,
    borderRadius: 28,
    boxShadow: "0 30px 80px rgba(15,23,42,0.14)",
    border: "1px solid #E2E8F0",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    boxSizing: "border-box",
  },

  verificationLogo: {
    width: 155,
    height: 42,
    objectFit: "contain",
    margin: "0 auto 4px",
  },

  verificationIcon: {
    width: 72,
    height: 72,
    margin: "0 auto",
    borderRadius: 22,
    background: "#EDE9FE",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 34,
    boxShadow: "0 14px 30px rgba(124,58,237,0.14)",
  },

  verificationTitle: {
    margin: 0,
    color: "#312E81",
    fontSize: 30,
    fontWeight: 950,
  },

  verificationText: {
    margin: 0,
    color: "#64748B",
    lineHeight: 1.7,
  },

  verificationEmail: {
    color: "#6D28D9",
    fontSize: 16,
    wordBreak: "break-word",
  },

  verificationSteps: {
    display: "grid",
    gridTemplateColumns: "auto 1fr auto 1fr auto",
    alignItems: "center",
    gap: 8,
    margin: "4px 0",
    fontSize: 11,
    color: "#64748B",
  },

  verificationStep: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },

  verificationLine: {
    height: 2,
    background: "#DDD6FE",
  },

  stepCircleComplete: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "#22C55E",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },

  stepCircleActive: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "#7C3AED",
    color: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },

  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    background: "#F1F5F9",
    color: "#64748B",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },

  verificationFooter: {
    margin: "3px 0 0",
    color: "#94A3B8",
    fontSize: 11,
  },
};