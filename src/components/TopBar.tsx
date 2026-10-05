import {

  useEffect,

  useMemo,

  useRef,

  useState,

  type FormEvent,

} from "react";

import { useNavigate } from "react-router-dom";

import { supabase } from "../lib/supabase";

import { useAuth } from "../context/AuthContext";

import { useTheme } from "../context/ThemeContext";

import {

  BarChart3,

  Bell,

  Bookmark,

  BrainCircuit,

  Building2,

  CalendarDays,

  ChevronDown,

  ChevronRight,

  ChevronUp,

  Crown,

  Gauge,

  GraduationCap,

  House,

  LogOut,

  NotebookPen,

  Search,

  Settings,

  Sparkles,

  Trophy,

} from "lucide-react";

const searchItems = [

  { label: "Dashboard", path: "/dashboard", icon: House, group: "Pages" },

  { label: "Bookmarks", path: "/bookmarks", icon: Bookmark, group: "Pages" },

  { label: "Study Resources", path: "/study-resources", icon: NotebookPen, group: "Pages" },

  { label: "Universities", path: "/universities", icon: Building2, group: "Pages" },

  {

    label: "University Match",

    path: "/university-match",

    icon: GraduationCap,

    group: "Pages",

  },

  { label: "Mock Tests", path: "/mock-test", icon: NotebookPen, group: "Pages" },

  {

    label: "AI Study Coach",

    path: "/ai-study-coach",

    icon: BrainCircuit,

    group: "Pages",

  },

  { label: "Exam Tracker", path: "/exam-tracker", icon: Gauge, group: "Pages" },

  { label: "Analytics", path: "/analytics", icon: BarChart3, group: "Pages" },

  { label: "Leaderboard", path: "/leaderboard", icon: Crown, group: "Pages" },

  { label: "Settings", path: "/settings", icon: Settings, group: "Pages" },

  { label: "English Test", path: "/test/english", icon: NotebookPen, group: "Tests" },

  {

    label: "Advanced Mathematics Test",

    path: "/test/advanced-mathematics",

    icon: Gauge,

    group: "Tests",

  },

  {

    label: "Analytical Reasoning Test",

    path: "/test/analytical-reasoning",

    icon: BrainCircuit,

    group: "Tests",

  },

] as const;

type Notification = {

  id: string;

  title: string | null;

  message: string;

  type: string | null;

  is_read: boolean;

  created_at: string;

  source_key?: string | null;

  path?: string;

};

const getInitials = (name: string) =>

  name

    .split(" ")

    .filter(Boolean)

    .slice(0, 2)

    .map((part) => part.charAt(0).toUpperCase())

    .join("") || "PP";

// Badge identifiers are internal metadata, not user-facing notification text.

const formatNotificationMessage = (message: string) =>

  message

    .replace(/\s*\[badge:[^\]\r\n]*\]/gi, "")

    .replace(/\s*\[badge:[^\]\r\n]*$/gi, "")

    .trim();

const formatRelativeTime = (value: string) => {

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const diffMs = Date.now() - date.getTime();

  const diffMinutes = Math.floor(diffMs / 60000);

  const diffHours = Math.floor(diffMinutes / 60);

  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Just now";

  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  if (diffHours < 24) return `${diffHours}h ago`;

  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {

    month: "short",

    day: "numeric",

  });

};

export default function TopBar() {

  const { user } = useAuth();

  const { theme } = useTheme();

  const navigate = useNavigate();

  const isDark = theme === "dark";

  const colors = {

    bar: isDark

      ? "rgba(20,10,32,.96)"

      : "rgba(239,231,251,.96)",

    card: isDark ? "#1A1023" : "#FFFFFF",

    cardSoft: isDark ? "#24152F" : "#F7F1FF",

    input: isDark ? "#21142B" : "#FFFFFF",

    text: isDark ? "#FFFFFF" : "#241534",

    muted: isDark ? "#BFB2CA" : "#70617C",

    mutedSoft: isDark ? "#8C7E98" : "#A28EAF",

    border: isDark ? "rgba(171,132,255,.17)" : "#D9C8EA",

    purple: "#7C3AED",

    purpleDark: "#4C1D95",

    purpleSoft: isDark ? "rgba(124,58,237,.18)" : "#E6D8FF",

    red: "#EF4444",

    hover: isDark ? "rgba(124,58,237,.13)" : "#F2E9FF",

  };

  const rootRef = useRef<HTMLDivElement | null>(null);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [notificationOpen, setNotificationOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const [searchFocused, setSearchFocused] = useState(false);

  const [search, setSearch] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");

  const [profileName, setProfileName] = useState("");

  const [markingRead, setMarkingRead] = useState(false);

  const [hovered, setHovered] = useState<string | null>(null);
  const [achievementToast, setAchievementToast] =
    useState<Notification | null>(null);

  const fetchNotifications = async () => {

    if (!user) return;

    const { data, error } = await supabase

      .from("notifications")

      .select("id, title, message, type, is_read, created_at, source_key")

      .eq("user_id", user.id)

      .eq("is_read", false)

      .order("created_at", { ascending: false })

      .limit(50);

    if (error) {

      console.error("Notification error:", error.message);

      return;

    }

    // Hide historical subscription/payment notifications without deleting user data.

    const visible = ((data || []) as Notification[]).filter((notification) => {

      const type = (notification.type || "").toLowerCase();

      const source = (notification.source_key || "").toLowerCase();

      return !type.startsWith("premium") &&

        !type.startsWith("payment-") &&

        !source.startsWith("premium-");

    });

    setNotifications(visible.slice(0, 20));

  };

  useEffect(() => {

    if (!user) return;

    const fetchProfile = async () => {

      const { data, error } = await supabase

        .from("profiles")

        .select("name, avatar_url")

        .eq("id", user.id)

        .maybeSingle();

      if (error) {

        console.error("TopBar profile error:", error.message);

        return;

      }

      setAvatarUrl(data?.avatar_url || "");

      setProfileName(data?.name || "");

    };

    fetchProfile();

    fetchNotifications();

    const channel = supabase

      .channel(`topbar-notifications-${user.id}`)

      .on(

        "postgres_changes",

        {

          event: "*",

          schema: "public",

          table: "notifications",

          filter: `user_id=eq.${user.id}`,

        },

        (payload) => {
          void fetchNotifications();

          if (payload.eventType !== "INSERT") return;

          const notification = payload.new as Notification;

          if (notification.type === "achievement") {
            setAchievementToast(notification);
          }
        }

      )

      .subscribe();

    return () => {

      supabase.removeChannel(channel);

    };

  }, [user]);

  useEffect(() => {
    if (!achievementToast) return;

    const timer = window.setTimeout(() => {
      setAchievementToast(null);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [achievementToast]);

  useEffect(() => {

    const handleOutsideClick = (event: MouseEvent) => {

      if (

        rootRef.current &&

        !rootRef.current.contains(event.target as Node)

      ) {

        setNotificationOpen(false);

        setProfileOpen(false);

        setSearchFocused(false);

      }

    };

    const handleKeyDown = (event: KeyboardEvent) => {

      const isShortcut =

        (event.ctrlKey || event.metaKey) &&

        event.key.toLowerCase() === "k";

      if (isShortcut) {

        event.preventDefault();

        searchInputRef.current?.focus();

        setSearchFocused(true);

      }

      if (event.key === "Escape") {

        setNotificationOpen(false);

        setProfileOpen(false);

        setSearchFocused(false);

        setSearch("");

        searchInputRef.current?.blur();

      }

    };

    document.addEventListener("mousedown", handleOutsideClick);

    window.addEventListener("keydown", handleKeyDown);

    return () => {

      document.removeEventListener("mousedown", handleOutsideClick);

      window.removeEventListener("keydown", handleKeyDown);

    };

  }, []);

  const filteredItems = useMemo(() => {

    const query = search.trim().toLowerCase();

    if (!query) return searchItems.slice(0, 7);

    return searchItems.filter((item) =>

      `${item.label} ${item.group}`.toLowerCase().includes(query)

    );

  }, [search]);

  const handleSearchSubmit = (event: FormEvent) => {

    event.preventDefault();

    if (filteredItems.length === 0) return;

    navigate(filteredItems[0].path);

    setSearch("");

    setSearchFocused(false);

    searchInputRef.current?.blur();

  };

  const goToSearchItem = (path: string) => {

    navigate(path);

    setSearch("");

    setSearchFocused(false);

    searchInputRef.current?.blur();

  };

  const markAllAsRead = async () => {

    if (!user || notifications.length === 0 || markingRead) return;

    setMarkingRead(true);

    const ids = notifications.map(

      (notification) => notification.id

    );

    const { error } = await supabase

      .from("notifications")

      .update({ is_read: true })

      .in("id", ids)

      .eq("user_id", user.id);

    setMarkingRead(false);

    if (error) {

      console.error("Mark notifications error:", error.message);

      return;

    }

    setNotifications([]);

  };

  const markOneAsRead = async (notification: Notification) => {

    if (!user) return;

    const { error } = await supabase

      .from("notifications")

      .update({ is_read: true })

      .eq("id", notification.id)

      .eq("user_id", user.id);

    if (error) {

      console.error(

        "Notification update error:",

        error.message

      );

      return;

    }

    setNotifications((current) =>

      current.filter(

        (item) => item.id !== notification.id

      )

    );

    setNotificationOpen(false);

    if (notification.path) {

      navigate(notification.path);

    }

  };

  const logout = async () => {

    const { error } = await supabase.auth.signOut();

    if (error) {

      console.error("Logout error:", error.message);

      return;

    }

    window.location.href = "/";

  };

  const getNotificationIcon = (type: string | null) => {

    if (type === "achievement") return Trophy;

    if (type === "exam") return CalendarDays;

    if (type === "study") return Sparkles;

    return Bell;

  };

  const displayName =

    profileName ||

    user?.email?.split("@")[0] ||

    "PrepPath Student";

  const initials = getInitials(displayName);

  return (

    <>
      {achievementToast && (
        <div
          className="preppath-achievement-toast"
          role="status"
          aria-live="polite"
          style={{
            background: colors.card,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            boxShadow: isDark
              ? "0 22px 60px rgba(0,0,0,.45)"
              : "0 22px 60px rgba(76,29,149,.16)",
          }}
        >
          <span
            className="preppath-achievement-toast-icon"
            style={{ background: colors.purpleSoft, color: colors.purple }}
          >
            <Trophy size={20} strokeWidth={2} aria-hidden="true" />
          </span>

          <span className="preppath-achievement-toast-copy">
            <small style={{ color: colors.purple }}>ACHIEVEMENT UNLOCKED</small>
            <strong>
              {(achievementToast.title || "Achievement").replace(/^Badge earned:\s*/i, "")}
            </strong>
            <span style={{ color: colors.muted }}>
              {formatNotificationMessage(achievementToast.message)}
            </span>
          </span>

          <button
            type="button"
            className="preppath-achievement-toast-close"
            aria-label="Dismiss achievement notification"
            onClick={() => setAchievementToast(null)}
            style={{ color: colors.muted }}
          >
            ×
          </button>
        </div>
      )}

      <header

        ref={rootRef}

        className="preppath-topbar"

        style={{

          background: colors.bar,

          color: colors.text,

          borderBottom: `1px solid ${colors.border}`,

          boxShadow: isDark

            ? "0 8px 28px rgba(0,0,0,.25)"

            : "0 8px 28px rgba(76,29,149,.08)",

        }}

      >

        <form onSubmit={handleSearchSubmit} className="preppath-search-wrap">

          <span className="preppath-search-icon" style={{ color: colors.muted }}>

            <Search size={17} strokeWidth={2} aria-hidden="true" />

          </span>

          <input

            ref={searchInputRef}

            value={search}

            onFocus={() => setSearchFocused(true)}

            onChange={(event) => setSearch(event.target.value)}

            placeholder="Search pages, tests, universities..."

            aria-label="Search PrepPath"

            className="preppath-search-input"

            style={{

              background: colors.input,

              color: colors.text,

              border: `1px solid ${

                searchFocused ? colors.purple : colors.border

              }`,

              boxShadow: searchFocused

                ? "0 0 0 4px rgba(124,58,237,.12)"

                : "none",

            }}

          />

          <span

            className="preppath-shortcut"

            style={{

              color: colors.muted,

              border: `1px solid ${colors.border}`,

              background: colors.cardSoft,

            }}

          >

            Ctrl K

          </span>

          {searchFocused && (

            <div

              className="preppath-search-dropdown"

              style={{

                background: colors.card,

                border: `1px solid ${colors.border}`,

                boxShadow: isDark

                  ? "0 22px 60px rgba(0,0,0,.42)"

                  : "0 22px 60px rgba(76,29,149,.15)",

              }}

            >

              <div className="preppath-dropdown-heading">

                <span style={{ color: colors.muted }}>

                  {search.trim() ? "Search results" : "Quick navigation"}

                </span>

                <span style={{ color: colors.mutedSoft }}>

                  {filteredItems.length}

                </span>

              </div>

              {filteredItems.length === 0 ? (

                <div className="preppath-empty-search">

                  <Search size={22} strokeWidth={2} aria-hidden="true" />

                  <strong>No results found</strong>

                  <p style={{ color: colors.muted }}>

                    Try another page or test.

                  </p>

                </div>

              ) : (

                filteredItems.map((item) => (

                  <button

                    key={item.path}

                    type="button"

                    className="preppath-search-item"

                    onMouseEnter={() => setHovered(`search-${item.path}`)}

                    onMouseLeave={() => setHovered(null)}

                    style={{

                      color: colors.text,

                      background:

                        hovered === `search-${item.path}`

                          ? colors.hover

                          : "transparent",

                    }}

                    onClick={() => goToSearchItem(item.path)}

                  >

                    <span

                      className="preppath-result-icon"

                      style={{

                        background: colors.purpleSoft,

                        color: colors.purple,

                      }}

                    >

                      {(() => {

                        const Icon = item.icon;

                        return <Icon size={17} strokeWidth={2} aria-hidden="true" />;

                      })()}

                    </span>

                    <span className="preppath-result-text">

                      <strong>{item.label}</strong>

                      <small style={{ color: colors.muted }}>{item.group}</small>

                    </span>

                    <ChevronRight

                      size={16}

                      strokeWidth={2.2}

                      aria-hidden="true"

                      style={{ color: colors.purple }}

                    />

                  </button>

                ))

              )}

            </div>

          )}

        </form>

        <div className="preppath-topbar-right">

          <div className="preppath-dropdown-anchor">

            <button

              type="button"

              aria-label="Open notifications"

              className="preppath-icon-button"

              style={{

                background: notificationOpen

                  ? colors.purpleSoft

                  : colors.cardSoft,

                color: colors.text,

                border: `1px solid ${

                  notificationOpen ? colors.purple : colors.border

                }`,

              }}

              onClick={() => {

                setNotificationOpen((current) => !current);

                setProfileOpen(false);

              }}

            >

              <Bell size={19} strokeWidth={2} aria-hidden="true" />

            </button>

            {notifications.length > 0 && (

              <span className="preppath-unread-badge">

                {notifications.length > 9 ? "9+" : notifications.length}

              </span>

            )}

            {notificationOpen && (

              <div

                className="preppath-notification-dropdown"

                style={{

                  background: colors.card,

                  color: colors.text,

                  border: `1px solid ${colors.border}`,

                  boxShadow: isDark

                    ? "0 22px 60px rgba(0,0,0,.45)"

                    : "0 22px 60px rgba(76,29,149,.16)",

                }}

              >

                <div

                  className="preppath-notification-header"

                  style={{ borderBottom: `1px solid ${colors.border}` }}

                >

                  <div>

                    <strong>Notifications</strong>

                    <p style={{ color: colors.muted }}>

                      {notifications.length} unread

                    </p>

                  </div>

                  {notifications.length > 0 && (

                    <button

                      type="button"

                      onClick={markAllAsRead}

                      disabled={markingRead}

                      className="preppath-mark-read"

                      style={{ color: colors.purple }}

                    >

                      {markingRead ? "Marking..." : "Mark all read"}

                    </button>

                  )}

                </div>

                <div className="preppath-notification-list">

                  {notifications.length === 0 ? (

                    <div className="preppath-empty-notifications">

                      <Bell size={22} strokeWidth={2} aria-hidden="true" />

                      <strong>You're all caught up</strong>

                      <p style={{ color: colors.muted }}>

                        New updates will appear here.

                      </p>

                    </div>

                  ) : (

                    notifications.map((notification) => (

                      <button

                        key={notification.id}

                        type="button"

                        onClick={() => markOneAsRead(notification)}

                        className="preppath-notification-item"

                        style={{ color: colors.text }}

                      >

                        <span

                          className="preppath-notification-icon"

                          style={{

                            background: colors.purpleSoft,

                            color: colors.purple,

                          }}

                        >

                          {(() => {

                            const NotificationIcon = getNotificationIcon(notification.type);

                            return (

                            <NotificationIcon

                              size={17}

                              strokeWidth={2}

                              aria-hidden="true"

                            />

                          );

                        })()}

                        </span>

                        <span className="preppath-notification-body">

                          <span className="preppath-notification-title-row">

                            <strong>

                              {notification.title || "Notification"}

                            </strong>

                            <small style={{ color: colors.muted }}>

                              {formatRelativeTime(notification.created_at)}

                            </small>

                          </span>

                          <span style={{ color: colors.muted }}>

                            {formatNotificationMessage(notification.message)}

                          </span>

                        </span>

                      </button>

                    ))

                  )}

                </div>

              </div>

            )}

          </div>

          <div className="preppath-dropdown-anchor">

            <button

              type="button"

              aria-label="Open profile menu"

              className="preppath-profile-button"

              style={{

                background: profileOpen ? colors.purpleSoft : "transparent",

                color: colors.text,

              }}

              onClick={() => {

                setProfileOpen((current) => !current);

                setNotificationOpen(false);

              }}

            >

              {avatarUrl ? (

                <img

                  src={avatarUrl}

                  alt={`${displayName} profile`}

                  className="preppath-profile-pic"

                />

              ) : (

                <span className="preppath-profile-fallback">

                  {initials}

                </span>

              )}

              <span className="preppath-profile-text">

                <strong>{displayName}</strong>

                <small style={{ color: colors.muted }}>Student</small>

              </span>

              <span

                style={{

                  color: colors.muted,

                  display: "inline-flex",

                  alignItems: "center",

                }}

              >

                {profileOpen ? (

                  <ChevronUp size={16} strokeWidth={2.2} aria-hidden="true" />

                ) : (

                  <ChevronDown size={16} strokeWidth={2.2} aria-hidden="true" />

                )}

              </span>

            </button>

            {profileOpen && (

              <div

                className="preppath-profile-dropdown"

                style={{

                  background: colors.card,

                  color: colors.text,

                  border: `1px solid ${colors.border}`,

                  boxShadow: isDark

                    ? "0 22px 60px rgba(0,0,0,.45)"

                    : "0 22px 60px rgba(76,29,149,.16)",

                }}

              >

                <div

                  className="preppath-profile-dropdown-header"

                  style={{ borderBottom: `1px solid ${colors.border}` }}

                >

                  <strong>{displayName}</strong>

                  <span style={{ color: colors.muted }}>{user?.email}</span>

                </div>

                <button

                  type="button"

                  className="preppath-profile-menu-item"

                  style={{ color: colors.text }}

                  onClick={() => {

                    navigate("/settings");

                    setProfileOpen(false);

                  }}

                >

                  <Settings size={17} strokeWidth={2} aria-hidden="true" />

                  Profile & Settings

                </button>

                <button

                  type="button"

                  className="preppath-profile-menu-item"

                  style={{ color: colors.text }}

                  onClick={() => {

                    navigate("/dashboard");

                    setProfileOpen(false);

                  }}

                >

                  <House size={17} strokeWidth={2} aria-hidden="true" />

                  Dashboard

                </button>

                <button

                  type="button"

                  className="preppath-profile-menu-item"

                  style={{

                    color: colors.red,

                    borderTop: `1px solid ${colors.border}`,

                  }}

                  onClick={logout}

                >

                  <LogOut size={17} strokeWidth={2} aria-hidden="true" />&#x20;

                  Log out

                </button>

              </div>

            )}

          </div>

        </div>

      </header>

      <style>{`

        .preppath-achievement-toast {
          position: fixed;
          top: 88px;
          right: 24px;
          z-index: 120;
          width: min(390px, calc(100vw - 32px));
          box-sizing: border-box;
          border-radius: 16px;
          padding: 14px;
          display: grid;
          grid-template-columns: 42px 1fr 24px;
          align-items: start;
          gap: 11px;
          animation: preppath-toast-in .22s ease-out;
        }

        .preppath-achievement-toast-icon {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preppath-achievement-toast-copy {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
          line-height: 1.4;
          font-size: 12px;
        }

        .preppath-achievement-toast-copy small {
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .75px;
        }

        .preppath-achievement-toast-copy strong { font-size: 14px; }

        .preppath-achievement-toast-close {
          border: none;
          background: transparent;
          cursor: pointer;
          font: inherit;
          font-size: 20px;
          line-height: 1;
          padding: 0;
        }

        @keyframes preppath-toast-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .preppath-topbar {

          width: 100%;

          min-height: 74px;

          padding: 12px 30px;

          display: flex;

          justify-content: space-between;

          align-items: center;

          position: sticky;

          top: 0;

          z-index: 50;

          gap: 24px;

          box-sizing: border-box;

          backdrop-filter: blur(18px);

          transition: background .25s ease, border-color .25s ease;

        }

        .preppath-search-wrap {

          position: relative;

          flex: 1;

          max-width: 680px;

          min-width: 240px;

        }

        .preppath-search-icon {

          position: absolute;

          left: 15px;

          top: 50%;

          transform: translateY(-50%);

          z-index: 2;

          font-size: 16px;

          pointer-events: none;

        }

        .preppath-search-input {

          width: 100%;

          min-height: 48px;

          padding: 12px 86px 12px 45px;

          border-radius: 14px;

          outline: none;

          font: inherit;

          font-size: 14px;

          box-sizing: border-box;

        }

        .preppath-shortcut {

          position: absolute;

          right: 10px;

          top: 50%;

          transform: translateY(-50%);

          padding: 5px 8px;

          border-radius: 8px;

          font-size: 10px;

          font-weight: 800;

          pointer-events: none;

        }

        .preppath-search-dropdown {

          position: absolute;

          top: calc(100% + 10px);

          left: 0;

          right: 0;

          border-radius: 18px;

          padding: 10px;

          z-index: 80;

          max-height: 430px;

          overflow-y: auto;

        }

        .preppath-dropdown-heading {

          display: flex;

          justify-content: space-between;

          padding: 6px 6px 11px;

          font-size: 11px;

          font-weight: 900;

          text-transform: uppercase;

          letter-spacing: .8px;

        }

        .preppath-search-item {

          width: 100%;

          display: grid;

          grid-template-columns: 40px 1fr auto;

          align-items: center;

          gap: 11px;

          padding: 10px 11px;

          border: none;

          border-radius: 13px;

          cursor: pointer;

          text-align: left;

          font: inherit;

        }

        .preppath-result-icon {

          width: 36px;

          height: 36px;

          border-radius: 10px;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 16px;

          font-weight: 800;

        }

        .preppath-result-text {

          display: flex;

          flex-direction: column;

          gap: 3px;

        }

        .preppath-result-text strong { font-size: 13px; }

        .preppath-result-text small { font-size: 10px; }

        .preppath-empty-search,

        .preppath-empty-notifications {

          min-height: 160px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 7px;

          text-align: center;

        }

        .preppath-topbar-right {

          display: flex;

          align-items: center;

          gap: 11px;

          flex-shrink: 0;

        }

        .preppath-dropdown-anchor { position: relative; }

        .preppath-icon-button {

          width: 46px;

          height: 46px;

          border-radius: 13px;

          display: flex;

          align-items: center;

          justify-content: center;

          cursor: pointer;

          font-size: 20px;

        }

        .preppath-unread-badge {

          position: absolute;

          right: -5px;

          top: -5px;

          min-width: 19px;

          height: 19px;

          padding: 0 4px;

          border-radius: 999px;

          background: #EF4444;

          color: #FFFFFF;

          border: 2px solid #FFFFFF;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 9px;

          font-weight: 900;

        }

        .preppath-notification-dropdown {

          position: absolute;

          right: 0;

          top: calc(100% + 10px);

          width: 370px;

          border-radius: 18px;

          z-index: 90;

          overflow: hidden;

        }

        .preppath-notification-header {

          display: flex;

          justify-content: space-between;

          align-items: center;

          gap: 12px;

          padding: 16px;

        }

        .preppath-notification-header strong { font-size: 15px; }

        .preppath-notification-header p { margin: 4px 0 0; font-size: 11px; }

        .preppath-mark-read {

          border: none;

          background: transparent;

          cursor: pointer;

          font: inherit;

          font-weight: 850;

          font-size: 11px;

        }

        .preppath-notification-list {

          padding: 10px;

          max-height: 350px;

          overflow-y: auto;

        }

        .preppath-notification-item {

          width: 100%;

          display: grid;

          grid-template-columns: 40px 1fr;

          gap: 11px;

          padding: 11px;

          border: none;

          border-radius: 13px;

          text-align: left;

          cursor: pointer;

          background: transparent;

          font: inherit;

        }

        .preppath-notification-item:hover {

          background: rgba(124,58,237,.10);

        }

        .preppath-notification-icon {

          width: 36px;

          height: 36px;

          border-radius: 10px;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 16px;

        }

        .preppath-notification-body {

          display: flex;

          flex-direction: column;

          gap: 4px;

          line-height: 1.4;

          font-size: 12px;

        }

        .preppath-notification-title-row {

          display: flex;

          justify-content: space-between;

          gap: 8px;

        }

        .preppath-profile-button {

          border: none;

          border-radius: 13px;

          padding: 5px 9px 5px 5px;

          display: flex;

          align-items: center;

          gap: 9px;

          cursor: pointer;

          font: inherit;

        }

        .preppath-profile-pic,

        .preppath-profile-fallback {

          width: 42px;

          height: 42px;

          border-radius: 12px;

          box-sizing: border-box;

        }

        .preppath-profile-pic {

          object-fit: cover;

          border: 2px solid #7C3AED;

        }

        .preppath-profile-fallback {

          display: flex;

          align-items: center;

          justify-content: center;

          background: linear-gradient(135deg,#7C3AED,#4C1D95);

          color: #FFFFFF;

          font-weight: 900;

          border: 2px solid rgba(124,58,237,.25);

        }

        .preppath-profile-text {

          display: flex;

          flex-direction: column;

          align-items: flex-start;

          gap: 2px;

          max-width: 150px;

        }

        .preppath-profile-text strong {

          font-size: 12px;

          max-width: 100%;

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;

        }

        .preppath-profile-text small { font-size: 9px; }

        .preppath-profile-dropdown {

          position: absolute;

          right: 0;

          top: calc(100% + 10px);

          width: 255px;

          border-radius: 17px;

          overflow: hidden;

          z-index: 90;

        }

        .preppath-profile-dropdown-header {

          display: flex;

          flex-direction: column;

          gap: 4px;

          padding: 16px;

          font-size: 13px;

        }

        .preppath-profile-menu-item {

          width: 100%;

          border: none;

          background: transparent;

          display: flex;

          align-items: center;

          gap: 10px;

          padding: 13px 16px;

          cursor: pointer;

          text-align: left;

          font: inherit;

          font-weight: 750;

          font-size: 12px;

        }

        .preppath-profile-menu-item:hover {

          background: rgba(124,58,237,.10);

        }

        @media (max-width: 900px) {

          .preppath-topbar { padding: 10px 16px; }

          .preppath-profile-text { display: none; }

        }

        @media (max-width: 650px) {
          .preppath-achievement-toast {
            top: 76px;
            left: 12px;
            right: 12px;
            width: auto;
          }


          .preppath-topbar {

            min-height: 64px;

            padding: 8px 12px;

            gap: 8px;

          }

          .preppath-search-wrap {

            min-width: 0;

            max-width: none;

            flex: 1 1 auto;

          }

          .preppath-search-input {

            min-height: 42px;

            padding-right: 12px;

          }

          .preppath-shortcut { display: none; }

          .preppath-notification-dropdown,

          .preppath-search-dropdown {

            position: fixed;

            top: 70px;

            left: 10px;

            right: 10px;

            width: auto;

          }

          .preppath-profile-dropdown {

            position: fixed;

            top: 70px;

            right: 10px;

            width: 245px;

          }

          .preppath-topbar-right {

            gap: 0;

          }

          .preppath-topbar-right > .preppath-dropdown-anchor:last-child {

            display: none;

          }

          .preppath-icon-button {

            width: 42px;

            height: 42px;

            flex-shrink: 0;

          }

        }

      `}</style>

    </>

  );

}
