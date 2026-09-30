import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../components/MainLayout";
import type { CSSProperties } from "react";
import { useTheme } from "../context/ThemeContext";

const universities = [
  "FAST NUCES",
  "COMSATS",
  "NUST",
  "UET Lahore",
  "GIKI",
  "LUMS",
  "FCCU",
  "ITU",
  "PUCIT",
  "UCP",
  "UMT",
  "UOL",
];


type ProfileStats = {
  total_questions: number;
  total_tests: number;
  accuracy: number;
  streak: number;
};

type ActivityItem = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  createdAt: string;
};


const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

const safeDateLabel = (value?: string | null) => {
  if (!value) return "Unknown date";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Unknown date";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "PP";

export default function Settings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const isDark = theme === "dark";

  const colors = {
    page: isDark ? "#100D15" : "#F4F4FA",
    card: isDark ? "#1D1724" : "#FFFFFF",
    cardSoft: isDark ? "#271E31" : "#FAF8FE",
    text: isDark ? "#FFFFFF" : "#15111C",
    muted: isDark ? "#C8BCD3" : "#6E6476",
    faint: isDark ? "#9F91AA" : "#9A8CA5",
    input: isDark ? "#271E31" : "#FFFFFF",
    border: isDark ? "rgba(171,132,255,.20)" : "#E4DDED",
    purple: "#7C3AED",
    purpleDark: "#4C1D95",
    purpleSoft: isDark ? "rgba(124,58,237,.16)" : "#F0E9FF",
    green: "#22C55E",
    orange: "#F97316",
    red: "#EF4444",
    blue: "#38BDF8",
  };

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [exporting, setExporting] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [fullName, setFullName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [dob, setDob] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [targetUniversity, setTargetUniversity] = useState("");
  const [memberSince, setMemberSince] = useState("");

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [stats, setStats] = useState<ProfileStats>({
    total_questions: 0,
    total_tests: 0,
    accuracy: 0,
    streak: 0,
  });


  const [activities, setActivities] = useState<ActivityItem[]>([]);

  const showSuccess = (message: string) => {
    setErrorMsg("");
    setSuccessMsg(message);
    window.setTimeout(() => setSuccessMsg(""), 3000);
  };

  const showError = (message: string) => {
    setSuccessMsg("");
    setErrorMsg(message);
    window.setTimeout(() => setErrorMsg(""), 4000);
  };

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      setLoading(true);

      setEmail(user.email || "");
      setMemberSince(safeDateLabel(user.created_at));

      const [
        profileResponse,
        statsResponse,
        questionsResponse,
        testsResponse,
        examsResponse,
      ] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
        supabase
          .from("user_stats")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("test_results")
          .select("score, total_questions")
          .eq("user_id", user.id),
        supabase
          .from("test_results")
          .select("id, subject, score, total_questions, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(4),
        supabase
          .from("upcoming_exams")
          .select("id, exam_name, exam_date, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(3),
      ]);

      if (profileResponse.error) {
        console.error("Profile load error:", profileResponse.error.message);
      }

      if (statsResponse.error) {
        console.error("Stats load error:", statsResponse.error.message);
      }

      const profile = profileResponse.data;

      if (profile) {
        setFullName(profile.name || "");
        setDisplayName(profile.display_name || user.user_metadata?.display_name || "");
        setCity(profile.city || "");
        setDob(profile.dob || "");
        setAvatarUrl(profile.avatar_url || "");
        setTargetUniversity(profile.target_university || "");
      } else {
        setFullName(user.user_metadata?.name || "");
        setDisplayName(user.user_metadata?.display_name || "");
      }

      const userStats = statsResponse.data;
      const testResults = questionsResponse.data || [];

      const totalQuestions = testResults.reduce(
        (sum, result) => sum + Number(result.total_questions || 0),
        0
      );

      const totalCorrect = testResults.reduce(
        (sum, result) => sum + Number(result.score || 0),
        0
      );

      const totalTests = testResults.length;

      const overallAccuracy =
        totalQuestions > 0
          ? Math.round((totalCorrect / totalQuestions) * 100)
          : 0;

      setStats({
        total_questions: totalQuestions,
        total_tests: totalTests,
        accuracy: overallAccuracy,
        streak: Number(userStats?.streak || 0),
      });

      const testActivities: ActivityItem[] = (testsResponse.data || []).map(
        (test: any) => {
          const score = Number(test.score || 0);
          const total = Number(test.total_questions || 0);
          const accuracy =
            total > 0 ? Math.round((score / total) * 100) : 0;

          return {
            id: `test-${test.id}`,
            icon: "▤",
            title: `Completed ${test.subject || "a mock test"}`,
            subtitle: `${score}/${total} • ${accuracy}% accuracy`,
            createdAt: test.created_at || "",
          };
        }
      );

      const examActivities: ActivityItem[] = (examsResponse.data || []).map(
        (exam: any) => ({
          id: `exam-${exam.id}`,
          icon: "📅",
          title: `Added ${exam.exam_name || "an exam"}`,
          subtitle: `Exam date: ${safeDateLabel(exam.exam_date)}`,
          createdAt: exam.created_at || exam.exam_date || "",
        })
      );

      setActivities(
        [...testActivities, ...examActivities]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          )
          .slice(0, 6)
      );



      setLoading(false);
    };

    loadData();
  }, [user]);

  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const profileCompletion = useMemo(() => {
    const checks = [
      Boolean(fullName.trim()),
      Boolean(displayName.trim()),
      Boolean(email.trim()),
      Boolean(city.trim()),
      Boolean(dob),
      Boolean(targetUniversity),
      Boolean(avatarUrl || avatarPreview),
    ];

    const completed = checks.filter(Boolean).length;

    return {
      completed,
      total: checks.length,
      percentage: Math.round((completed / checks.length) * 100),
    };
  }, [
    fullName,
    displayName,
    email,
    city,
    dob,
    targetUniversity,
    avatarUrl,
    avatarPreview,
  ]);

  const profileChecklist = useMemo(
    () => [
      { label: "Full name", complete: Boolean(fullName.trim()) },
      { label: "Display name", complete: Boolean(displayName.trim()) },
      { label: "Email", complete: Boolean(email.trim()) },
      { label: "City", complete: Boolean(city.trim()) },
      { label: "Date of birth", complete: Boolean(dob) },
      {
        label: "Target university",
        complete: Boolean(targetUniversity),
      },
      {
        label: "Profile photo",
        complete: Boolean(avatarUrl || avatarPreview),
      },
    ],
    [fullName, displayName, email, city, dob, targetUniversity, avatarUrl, avatarPreview]
  );

  const saveProfile = async () => {
    if (!user) return;

    if (!fullName.trim()) {
      showError("Please enter your full name.");
      return;
    }

    if (!/^[\p{L}\p{N}_ .-]{3,24}$/u.test(displayName.trim())) {
      showError("Display name must be 3–24 characters and contain only letters, numbers, spaces, underscores, dots, or hyphens.");
      return;
    }

    if (dob) {
      const dobDate = new Date(dob);
      const today = new Date();

      if (Number.isNaN(dobDate.getTime()) || dobDate > today) {
        showError("Please enter a valid date of birth.");
        return;
      }
    }

    setSavingProfile(true);

    const { error } = await supabase
    .from("profiles")
    .update({
        name: fullName.trim(),
        display_name: displayName.trim(),
        city: city.trim(),
        dob: dob || null,
        target_university: targetUniversity || null,
      })
  .eq("id", user.id);

    setSavingProfile(false);

    if (error) {
      showError(error.message);
      return;
    }

    showSuccess("Profile saved successfully.");
  };

  const handleAvatarSelection = (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showError("Please choose a valid image file.");
      return;
    }

    if (file.size > MAX_AVATAR_SIZE) {
      showError("Profile photos must be 2 MB or smaller.");
      return;
    }

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const uploadAvatar = async () => {
    if (!avatarFile || !user) return;

    setUploadingAvatar(true);

    const extension = avatarFile.name.split(".").pop() || "jpg";
    const filePath = `${user.id}/avatar-${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, {
        upsert: true,
        contentType: avatarFile.type,
      });

    if (uploadError) {
      setUploadingAvatar(false);
      showError(uploadError.message);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ avatar_url: data.publicUrl })
      .eq("id", user.id);

    setUploadingAvatar(false);

    if (profileError) {
      showError(profileError.message);
      return;
    }

    setAvatarUrl(data.publicUrl);
    setAvatarFile(null);

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    showSuccess("Profile photo updated.");
  };

  const removeAvatar = async () => {
    if (!user) return;

    const confirmed = window.confirm("Remove your profile photo?");

    if (!confirmed) return;

    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: null })
      .eq("id", user.id);

    if (error) {
      showError(error.message);
      return;
    }

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarUrl("");
    setAvatarPreview("");
    setAvatarFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    showSuccess("Profile photo removed.");
  };



  const exportMyData = async () => {
    if (!user) return;

    setExporting(true);

    const [profile, userStats, tests, exams] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
      supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase.from("test_results").select("*").eq("user_id", user.id),
      supabase.from("upcoming_exams").select("*").eq("user_id", user.id),
    ]);

    const exportPayload = {
      exported_at: new Date().toISOString(),
      account: {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
      },
      profile: profile.data || null,
      stats: userStats.data || null,
      test_results: tests.data || [],
      upcoming_exams: exams.data || [],
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = `preppath-data-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(url);

    setExporting(false);
    showSuccess("Your PrepPath data has been exported.");
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      showError(error.message);
      return;
    }

    window.location.href = "/";
  };

  const cardStyle = {
    ...styles.card,
    background: colors.card,
    color: colors.text,
    border: `1px solid ${colors.border}`,
  };

  const inputStyle = {
    ...styles.input,
    background: colors.input,
    color: colors.text,
    border: `1px solid ${colors.border}`,
  };

  if (loading) {
    return (
      <MainLayout>
        <div
          style={{
            ...styles.page,
            background: colors.page,
            color: colors.text,
          }}
        >
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
            Loading account settings…
          </div>
        </div>
      </MainLayout>
    );
  }

  const visibleAvatar = avatarPreview || avatarUrl;

  return (
    <MainLayout>
      <div
        className="settings-page"
        style={{
          ...styles.page,
          background: colors.page,
          color: colors.text,
        }}
      >
        <div style={styles.topRow} className="settings-top-row">
          <div>
            <p style={{ ...styles.eyebrow, color: colors.purple }}>
              Account Center
            </p>

            <h1 style={{ ...styles.title, color: colors.text }}>Settings</h1>
          </div>

          <div
            style={{
              ...styles.completionPill,
              background: colors.card,
              border: `1px solid ${colors.border}`,
            }}
          >
            Profile {profileCompletion.percentage}% complete
          </div>
        </div>

        {successMsg && <div style={styles.successBox}>✓ {successMsg}</div>}
        {errorMsg && <div style={styles.errorBox}>⚠ {errorMsg}</div>}

        <div style={styles.profileHeader} className="settings-profile-header">
          <div style={styles.heroGlowOne} />
          <div style={styles.heroGlowTwo} />

          <div style={styles.profileLeft}>
            {visibleAvatar ? (
              <img
                src={visibleAvatar}
                alt={`${displayName || "Student"} profile`}
                style={styles.avatar}
              />
            ) : (
              <div style={styles.avatarFallback}>
                {getInitials(displayName || fullName || "PrepPath Student")}
              </div>
            )}

            <div>
              <div style={styles.profileBadge}>👤 Student profile</div>

              <h2 style={styles.profileName}>{displayName || "Student"}</h2>
              <p style={{ ...styles.profileEmail, marginTop: 3, opacity: .82 }}>Your public display name</p>

              <p
                className="settings-profile-email"
                style={styles.profileEmail}
              >
                {email}
              </p>

              <div style={styles.profileMeta}>
                <span>🎓 {targetUniversity || "No university selected"}</span>
                <span>📍 {city || "City not set"}</span>
                <span>🗓️ Member since {memberSince}</span>
              </div>
            </div>
          </div>

          <div style={styles.profileRight}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(event) =>
                handleAvatarSelection(event.target.files?.[0] || null)
              }
              style={{ display: "none" }}
            />

            <button
              type="button"
              style={styles.choosePhotoBtn}
              onClick={() => fileInputRef.current?.click()}
            >
              Choose Image
            </button>

            <span style={styles.fileName}>
              {avatarFile
                ? `${avatarFile.name} • ${(avatarFile.size / 1024).toFixed(
                    0
                  )} KB`
                : "PNG, JPG or WEBP • Max 2 MB"}
            </span>

            <div style={styles.photoActions}>
              <button
                onClick={uploadAvatar}
                disabled={uploadingAvatar || !avatarFile}
                style={{
                  ...styles.uploadBtn,
                  opacity: !avatarFile ? 0.55 : 1,
                  cursor: !avatarFile ? "not-allowed" : "pointer",
                }}
              >
                {uploadingAvatar ? "Uploading…" : "Upload Photo"}
              </button>

              {(avatarUrl || avatarPreview) && (
                <button onClick={removeAvatar} style={styles.removePhotoBtn}>
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>

        <div style={styles.twoColumnGrid} className="settings-two-column-grid">
          <div style={cardStyle}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.cardTitle}>Personal Information</h2>

                <p style={{ ...styles.sectionSubtitle, color: colors.muted }}>
                  Keep your account details accurate and up to date.
                </p>
              </div>
            </div>

            <label style={styles.label}>Full name</label>

            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Full name"
              style={inputStyle}
            />

            <label style={styles.label} htmlFor="settings-display-name">Display name</label>
            <input
              id="settings-display-name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Choose a public nickname"
              autoComplete="nickname"
              maxLength={24}
              style={inputStyle}
            />
            <small style={{ color: colors.muted, lineHeight: 1.5 }}>
              This nickname will appear on the leaderboard instead of your real name. Use 3–24 characters: letters, numbers, spaces, underscores, dots, or hyphens. Avoid using your real name or other personal information.
            </small>

            <label style={styles.label}>Email</label>

            <input
              value={email}
              readOnly
              style={{ ...inputStyle, opacity: 0.75 }}
            />

            <label style={styles.label}>City</label>

            <input
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="City"
              style={inputStyle}
            />

            <label style={styles.label}>Date of birth</label>

            <input
              type="date"
              value={dob}
              max={new Date().toISOString().slice(0, 10)}
              onChange={(event) => setDob(event.target.value)}
              style={inputStyle}
            />

            <button
              onClick={saveProfile}
              disabled={savingProfile}
              style={styles.primaryBtn}
            >
              {savingProfile ? "Saving…" : "Save Personal Information"}
            </button>
          </div>

          <div style={cardStyle}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.cardTitle}>Profile Completion</h2>

                <p style={{ ...styles.sectionSubtitle, color: colors.muted }}>
                  Complete your profile for more personalized recommendations.
                </p>
              </div>

              <strong style={{ color: colors.purple }}>
                {profileCompletion.percentage}%
              </strong>
            </div>

            <div
              style={{
                ...styles.progressTrack,
                background: isDark ? "rgba(255,255,255,.07)" : "#EEE8F2",
              }}
            >
              <div
                style={{
                  ...styles.progressFill,
                  width: `${profileCompletion.percentage}%`,
                }}
              />
            </div>

            <div style={styles.checklist}>
              {profileChecklist.map((item) => (
                <div
                  key={item.label}
                  style={{
                    ...styles.checklistItem,
                    background: colors.cardSoft,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <span>{item.complete ? "✅" : "○"}</span>

                  <span
                    style={{
                      color: item.complete ? colors.text : colors.muted,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.cardTitle}>Academic Profile</h2>

              <p style={{ ...styles.sectionSubtitle, color: colors.muted }}>
                Used to personalize university and mock-test recommendations.
              </p>
            </div>
          </div>

          <label style={styles.label}>Target university</label>

          <select
            value={targetUniversity}
            onChange={(event) => setTargetUniversity(event.target.value)}
            style={inputStyle}
          >
            <option value="">Select your dream university</option>

            {universities.map((university) => (
              <option key={university}>{university}</option>
            ))}
          </select>

          <button
            onClick={saveProfile}
            disabled={savingProfile}
            style={styles.primaryBtn}
          >
            {savingProfile ? "Saving…" : "Save Academic Profile"}
          </button>
        </div>

        <div style={styles.statsGrid} className="settings-stats-grid">
          {[
            {
              icon: "◇",
              number: stats.total_questions,
              label: "Questions Solved",
              route: "/analytics",
              color: colors.purple,
            },
            {
              icon: "▤",
              number: stats.total_tests,
              label: "Mock Tests",
              route: "/mock-test",
              color: colors.purple,
            },
            {
              icon: "◎",
              number: `${stats.accuracy}%`,
              label: "Accuracy",
              route: "/analytics",
              color: colors.purple,
            },
            {
              icon: "◷",
              number: stats.streak,
              label: "Current Streak",
              route: "/dashboard",
              color: colors.purple,
            },
          ].map((item) => (
            <button
              key={item.label}
              style={{
                ...styles.statCard,
                background: colors.card,
                color: colors.text,
                border: `1px solid ${colors.border}`,
              }}
              onClick={() => navigate(item.route)}
            >
              <span style={styles.statIcon}>{item.icon}</span>

              <strong style={{ ...styles.statNumber, color: item.color }}>
                {item.number}
              </strong>

              <span style={{ ...styles.statLabel, color: colors.muted }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>


          <div style={cardStyle}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.cardTitle}>Recent Activity</h2>

                <p style={{ ...styles.sectionSubtitle, color: colors.muted }}>
                  Your latest tests and exam-tracker updates.
                </p>
              </div>
            </div>

            {activities.length === 0 ? (
              <div
                style={{
                  ...styles.emptyState,
                  background: colors.cardSoft,
                  border: `1px dashed ${colors.border}`,
                }}
              >
                <span>🕘</span>

                <p style={{ color: colors.muted }}>No recent activity yet.</p>
              </div>
            ) : (
              <div style={styles.activityList}>
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    style={{
                      ...styles.activityItem,
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    <span style={styles.activityIcon}>{activity.icon}</span>

                    <div>
                      <strong>{activity.title}</strong>

                      <p style={{ color: colors.muted }}>
                        {activity.subtitle}
                      </p>

                      <small style={{ color: colors.faint }}>
                        {safeDateLabel(activity.createdAt)}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        <div style={styles.twoColumnGrid} className="settings-two-column-grid">
          <div style={cardStyle}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.cardTitle}>Appearance</h2>

                <p style={{ ...styles.sectionSubtitle, color: colors.muted }}>
                  Choose the theme that is most comfortable for you.
                </p>
              </div>
            </div>

            <div
              style={styles.themeGrid}
              className="settings-theme-grid"
            >
              <button
                onClick={() => setTheme("light")}
                style={{
                  ...styles.themeOption,
                  background:
                    theme === "light" ? `${colors.purple}18` : colors.cardSoft,
                  color: colors.text,
                  border: `2px solid ${
                    theme === "light" ? colors.purple : colors.border
                  }`,
                }}
              >
                <span style={styles.themeIcon}>☀️</span>
                <strong>Light</strong>
                <small style={{ color: colors.muted }}>Bright and clean</small>
              </button>

              <button
                onClick={() => setTheme("dark")}
                style={{
                  ...styles.themeOption,
                  background:
                    theme === "dark" ? `${colors.purple}18` : colors.cardSoft,
                  color: colors.text,
                  border: `2px solid ${
                    theme === "dark" ? colors.purple : colors.border
                  }`,
                }}
              >
                <span style={styles.themeIcon}>🌙</span>
                <strong>Dark</strong>
                <small style={{ color: colors.muted }}>
                  Easy on the eyes
                </small>
              </button>
            </div>
          </div>

          <div style={cardStyle}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.cardTitle}>Security</h2>

                <p style={{ ...styles.sectionSubtitle, color: colors.muted }}>
                  Protect access to your PrepPath account.
                </p>
               
              </div>
            </div>

            <div
              className="settings-security-info"
              style={{
                ...styles.securityInfo,
                background: colors.cardSoft,
                border: `1px solid ${colors.border}`,
              }}
            >
              <span style={styles.securityIcon}>🔐</span>

              <div>
                <strong>Password reset</strong>

                <p style={{ color: colors.muted }}>
                  We will email a secure reset link to {email}.
                </p>
              </div>
            </div>

             <button onClick={() => navigate("/forgot-password")} style={styles.primaryBtn}>
              Reset Password
            </button>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.cardTitle}>Your Data</h2>

              <p style={{ ...styles.sectionSubtitle, color: colors.muted }}>
                Download a JSON copy of your profile, tests, statistics, exams,
                and preferences.
              </p>
            </div>
          </div>

          <button
            onClick={exportMyData}
            disabled={exporting}
            style={styles.exportBtn}
          >
            {exporting ? "Preparing Export…" : "Download My Data"}
          </button>
        </div>

        <div
          style={{
            ...cardStyle,
            border: `1px solid ${colors.red}35`,
          }}
        >
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.cardTitle}>Account</h2>

              <p style={{ ...styles.sectionSubtitle, color: colors.muted }}>
                Sign out safely from this device.
              </p>
            </div>
          </div>

          <button onClick={logout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>

        <style>{`
          .settings-page {
            width: 100%;
            box-sizing: border-box;
          }

          /* Keyboard focus accessibility */
          .settings-page input:focus-visible,
          .settings-page select:focus-visible,
          .settings-page button:focus-visible {
            outline: 3px solid #A78BFA !important;
            outline-offset: 3px !important;
          }

          .settings-page input:focus:not(:focus-visible),
          .settings-page select:focus:not(:focus-visible),
          .settings-page button:focus:not(:focus-visible) {
            outline: none;
          }

          .settings-stats-grid > button,
          .settings-two-column-grid > div {
            transition:
              transform .2s ease,
              box-shadow .2s ease,
              border-color .2s ease;
          }

          .settings-stats-grid > button:hover,
          .settings-two-column-grid > div:hover {
            transform: translateY(-3px);
            border-color: rgba(124,58,237,.34) !important;
            box-shadow: 0 22px 44px rgba(76,29,149,.13) !important;
          }

          @media (max-width: 920px) {
            .settings-page {
              padding: 28px 22px !important;
            }

            .settings-top-row,
            .settings-profile-header {
              flex-direction: column;
              align-items: stretch !important;
            }

            .settings-profile-header > div:last-child {
              min-width: 0 !important;
              width: 100%;
            }

            .settings-two-column-grid {
              grid-template-columns: 1fr !important;
            }
          }

          @media (max-width: 620px) {
            .settings-page {
              padding: 22px 14px !important;
            }

            .settings-profile-header {
              padding: 26px 20px !important;
              border-radius: 22px !important;

              width: calc(100% + 16px) !important;
              margin-left: -8px !important;
              box-sizing: border-box !important;
            }

            .settings-profile-header > div:first-child {
              flex-direction: column;
              align-items: flex-start !important;
            }

            .settings-stats-grid {
              grid-template-columns: 1fr !important;
            }

            .settings-profile-header > div:first-child > div:last-child {
              width: 100%;
              min-width: 0;
            }

            .settings-profile-header > div:first-child > div:last-child p {
              max-width: 100%;
              overflow-wrap: anywhere;
              word-break: break-word;
            }

            .settings-page .settings-theme-grid {
              grid-template-columns: 1fr !important;
            }

            .settings-security-info {
              grid-template-columns: 36px minmax(0, 1fr) !important;
              gap: 10px !important;
            }

            .settings-security-info > div {
              min-width: 0;
            }

            .settings-security-info p {
              overflow-wrap: anywhere;
              word-break: break-word;
            }

            .settings-profile-header > div:first-child > div:last-child {
              width: 100%;
              min-width: 0;
            }

            .settings-profile-header > div:first-child > div:last-child .settings-profile-email {
              white-space: normal !important;
              overflow-wrap: anywhere !important;
              word-break: break-word !important;
            }

            .settings-profile-email {
              width: 100% !important;
              max-width: 100% !important;
              white-space: normal !important;
              overflow-wrap: anywhere !important;
              word-break: break-all !important;
            }
          }
        `}</style>
      </div>
    </MainLayout>

  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    padding: 40,
    width: "100%",
    boxSizing: "border-box",
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
    fontSize: 38,
    fontWeight: 950,
    margin: "6px 0 0",
  },

  completionPill: {
    padding: "11px 15px",
    borderRadius: 14,
    fontWeight: 850,
  },

  successBox: {
    background: "#DCFCE7",
    color: "#166534",
    border: "1px solid #86EFAC",
    padding: "12px 14px",
    borderRadius: 13,
    marginBottom: 18,
    fontWeight: 800,
  },

  errorBox: {
    background: "#FEE2E2",
    color: "#991B1B",
    border: "1px solid #FCA5A5",
    padding: "12px 14px",
    borderRadius: 13,
    marginBottom: 18,
    fontWeight: 800,
  },

  profileHeader: {
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(110deg,#321756 0%,#5925AF 54%,#7545F2 100%)",
    color: "#FFFFFF",
    padding: 34,
    borderRadius: 28,
    marginBottom: 22,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
    boxShadow: "0 26px 60px rgba(76,29,149,0.34)",
  },

  heroGlowOne: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.12)",
    right: -80,
    top: -85,
  },

  heroGlowTwo: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.10)",
    left: "42%",
    bottom: -75,
  },

  profileLeft: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    gap: 20,
    alignItems: "center",
  },

  profileRight: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minWidth: 250,
  },

  avatar: {
    width: 104,
    height: 104,
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid rgba(255,255,255,0.42)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
  },

  avatarFallback: {
    width: 104,
    height: 104,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255,255,255,0.18)",
    border: "4px solid rgba(255,255,255,0.42)",
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: 950,
  },

  profileBadge: {
    display: "inline-flex",
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.28)",
    background: "rgba(255,255,255,0.14)",
    fontSize: 12,
    fontWeight: 800,
    marginBottom: 9,
  },

  profileName: {
    fontSize: 30,
    margin: 0,
    color: "#FFFFFF",
    fontWeight: 950,
  },

  profileEmail: {
    margin: "5px 0 10px",
    opacity: 0.9,
    maxWidth: "100%",
    whiteSpace: "normal",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
    lineHeight: 1.4,
  },

  profileMeta: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    fontSize: 13,
    opacity: 0.92,
  },

  choosePhotoBtn: {
    background: "#FFFFFF",
    color: "#4C1D95",
    padding: "11px 15px",
    borderRadius: 12,
    border: "none",
    textAlign: "center",
    cursor: "pointer",
    fontWeight: 900,
  },

  fileName: {
    fontSize: 12,
    opacity: 0.9,
    textAlign: "center",
  },

  photoActions: {
    display: "flex",
    gap: 9,
  },

  uploadBtn: {
    flex: 1,
    background: "#111827",
    color: "#FFFFFF",
    padding: "10px 14px",
    borderRadius: 11,
    border: "none",
    fontWeight: 850,
  },

  removePhotoBtn: {
    background: "rgba(255,255,255,0.12)",
    color: "#FFFFFF",
    border: "1px solid rgba(255,255,255,0.35)",
    padding: "10px 13px",
    borderRadius: 11,
    cursor: "pointer",
    fontWeight: 850,
  },

  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(390px,1fr))",
    gap: 18,
    marginBottom: 22,
  },

  card: {
    padding: 24,
    borderRadius: 24,
    boxShadow: "0 18px 38px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: 11,
    marginBottom: 22,
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 14,
    marginBottom: 4,
  },

  cardTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 900,
  },

  sectionSubtitle: {
    margin: "5px 0 0",
    fontSize: 13,
    lineHeight: 1.5,
  },

  label: {
    fontSize: 13,
    fontWeight: 850,
    marginTop: 3,
  },

  input: {
    padding: "14px 15px",
    borderRadius: 12,
    fontSize: 16,
    outline: "none",
    boxSizing: "border-box",
    width: "100%",
  },

  primaryBtn: {
    background: "linear-gradient(135deg,#7C3AED,#4C1D95)",
    color: "#FFFFFF",
    padding: "11px 16px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: 900,
    marginTop: 5,
  },

  progressTrack: {
    width: "100%",
    height: 11,
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 7,
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
    background: "linear-gradient(90deg,#4C1D95,#7C3AED)",
  },

  checklist: {
    display: "grid",
    gap: 9,
    marginTop: 8,
  },

  checklistItem: {
    display: "flex",
    alignItems: "center",
    gap: 9,
    padding: "10px 12px",
    borderRadius: 12,
    fontSize: 13,
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
    gap: 15,
    marginBottom: 22,
  },

  statCard: {
    padding: 20,
    borderRadius: 18,
    textAlign: "center",
    boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    alignItems: "center",
  },

  statIcon: {
    fontSize: 24,
  },

  statNumber: {
    fontSize: 30,
    fontWeight: 950,
  },

  statLabel: {
    fontSize: 13,
  },

  preferenceOptions: {
    display: "flex",
    gap: 9,
    flexWrap: "wrap",
    marginBottom: 8,
  },

  optionButton: {
    padding: "10px 13px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 850,
  },


  activityList: {
    display: "grid",
  },

  activityItem: {
    display: "grid",
    gridTemplateColumns: "42px 1fr",
    gap: 12,
    padding: "12px 0",
  },

  activityIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    background: "rgba(124,58,237,0.16)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 19,
  },

  emptyState: {
    textAlign: "center",
    padding: 28,
    borderRadius: 16,
    fontSize: 30,
  },

  themeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,minmax(0,1fr))",
    gap: 12,
  },

  themeOption: {
    minHeight: 130,
    borderRadius: 17,
    padding: 16,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 7,
    textAlign: "left",
  },

  themeIcon: {
    fontSize: 30,
  },

  securityInfo: {
    display: "grid",
    gridTemplateColumns: "44px 1fr",
    gap: 12,
    padding: 14,
    borderRadius: 15,
  },

  securityIcon: {
    fontSize: 26,
  },

  exportBtn: {
    background: "rgba(124,58,237,0.14)",
    color: "#A78BFA",
    border: "1px solid rgba(124,58,237,0.32)",
    padding: "11px 16px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 900,
    width: "fit-content",
  },

  logoutBtn: {
    background: "#EF4444",
    color: "#FFFFFF",
    padding: "11px 16px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontWeight: 900,
    width: "fit-content",
  },
};