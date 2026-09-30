import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  BarChart3,
  Bookmark,
  BrainCircuit,
  Building2,
  Gauge,
  GraduationCap,
  House,
  Mail,
  NotebookPen,
  BookOpen,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Crown,
} from "lucide-react";

import fullLightLogo from "../assets/preppath-full-light-logo.png";
import smallLightLogo from "../assets/preppath-small-light-logo.png";
import fullDarkLogo from "../assets/preppath-full-dark-logo.png";
import smallDarkLogo from "../assets/preppath-small-dark-logo.png";

export default function Sidebar() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isDark = theme === "dark";
  const logo = isDark ? fullDarkLogo : fullLightLogo;
  const logoCompressed = isDark ? smallDarkLogo : smallLightLogo;

  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  // Desktop collapse state
  const [collapsed, setCollapsed] = useState(false);

  // Mobile drawer state
  const [mobileOpen, setMobileOpen] = useState(false);

  const [hovered, setHovered] = useState<string | null>(null);

  const colors = {
    sidebar: isDark
      ? "linear-gradient(180deg,#1C0D2A 0%,#140A20 48%,#0D0814 100%)"
      : "linear-gradient(180deg,#EDE4FF 0%,#E7DAFB 52%,#DFD0F4 100%)",

    border: isDark ? "rgba(171,132,255,.16)" : "#D1BFE8",
    text: isDark ? "#FFFFFF" : "#241534",
    muted: isDark ? "#B9AFC3" : "#71617F",
    mutedStrong: isDark ? "#D0C6D9" : "#5C486C",

    navHover: isDark
      ? "rgba(124,58,237,.16)"
      : "rgba(124,58,237,.10)",

    navActive: isDark
      ? "linear-gradient(135deg,rgba(124,58,237,.34),rgba(76,29,149,.34))"
      : "linear-gradient(135deg,#D9C8FF,#CFB8F6)",

    activeText: isDark ? "#FFFFFF" : "#4C1D95",

    icon: isDark ? "#C7B8D2" : "#6C587B",

    iconBackground: isDark
      ? "rgba(255,255,255,.055)"
      : "rgba(255,255,255,.46)",

    activeIcon: isDark ? "#FFFFFF" : "#5B21B6",

    activeIconBackground: isDark
      ? "rgba(124,58,237,.35)"
      : "#EEE6FF",

    profileHover: isDark
      ? "rgba(124,58,237,.14)"
      : "rgba(255,255,255,.38)",

    divider: isDark
      ? "rgba(255,255,255,.07)"
      : "rgba(76,29,149,.12)",

  };

  const initials =
    (name || user?.email || "PP")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part.charAt(0).toUpperCase())
      .join("") || "PP";

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url, name")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Profile error:", error);
        return;
      }

      if (data) {
        setAvatar(data.avatar_url || "");
        setName(data.name || "");
      }
    };

    fetchProfile();
  }, [user]);

  /*
   * Close the mobile drawer whenever the route changes.
   * This means tapping a navigation link automatically
   * closes the drawer.
   */
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /*
   * Allow Escape to close the mobile drawer.
   */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /*
   * Prevent the page behind the drawer from scrolling
   * while the mobile drawer is open.
   */
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const navItems = [
    ["/dashboard", House, "Dashboard"],
    ["/bookmarks", Bookmark, "Bookmarks"],
    ["/universities", Building2, "Universities"],
    ["/university-match", GraduationCap, "University Match"],
    ["/mock-test", NotebookPen, "Mock Tests"],
    ["/study-resources", BookOpen, "Study Resources"],
    ["/ai-study-coach", BrainCircuit, "AI Study Coach"],
    ["/exam-tracker", Gauge, "Exam Tracker"],
    ["/analytics", BarChart3, "Analytics"],
    ["/leaderboard", Crown, "Leaderboard"],
    ["/settings", Settings, "Settings"],
    ["/contact", Mail, "Contact"],
  ] as const;

  const isActiveRoute = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const goToSettings = () => {
    setMobileOpen(false);
    navigate("/settings");
  };


  return (
    <>
      {/* =========================================================
          MOBILE HAMBURGER RAIL
          Visible only at 640px and below.
      ========================================================== */}
      <aside
        className="preppath-mobile-rail"
        style={{
          background: colors.sidebar,
          borderRight: `1px solid ${colors.border}`,
          color: colors.text,
        }}
      >
        <button
          type="button"
          className="preppath-mobile-menu-button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          style={{
            color: colors.text,
            background: isDark
              ? "rgba(255,255,255,.055)"
              : "rgba(255,255,255,.48)",
            border: `1px solid ${colors.border}`,
          }}
        >
          <span className="preppath-hamburger-line" />
          <span className="preppath-hamburger-line" />
          <span className="preppath-hamburger-line" />
        </button>

        <button
          type="button"
          className="preppath-mobile-logo-button"
          onClick={() => navigate("/dashboard")}
          aria-label="Go to dashboard"
        >
          <img src={logoCompressed} alt="" />
        </button>
      </aside>

      {/* =========================================================
          MOBILE BACKDROP
      ========================================================== */}
      <button
        type="button"
        className={`preppath-mobile-backdrop ${
          mobileOpen ? "preppath-mobile-backdrop-open" : ""
        }`}
        onClick={() => setMobileOpen(false)}
        aria-label="Close navigation menu"
        tabIndex={mobileOpen ? 0 : -1}
      />

      {/* =========================================================
          MAIN SIDEBAR / MOBILE DRAWER
      ========================================================== */}
      <aside
        className={[
          "preppath-sidebar",
          collapsed ? "preppath-sidebar-collapsed" : "",
          mobileOpen ? "preppath-mobile-drawer-open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          background: colors.sidebar,
          borderRight: `1px solid ${colors.border}`,
          color: colors.text,
        }}
      >
        {/* =======================================================
            LOGO
        ======================================================== */}
        <div className="preppath-sidebar-logo-wrap">
          <img
            src={collapsed ? logoCompressed : logo}
            alt="PrepPath"
            className={
              collapsed
                ? "preppath-sidebar-logo-small"
                : "preppath-sidebar-logo"
            }
          />

          <button
            type="button"
            className="preppath-mobile-close-button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
            style={{
              color: colors.text,
              background: isDark
                ? "rgba(255,255,255,.06)"
                : "rgba(255,255,255,.55)",
              border: `1px solid ${colors.border}`,
            }}
          >
            <X size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>

        {/* =======================================================
            DESKTOP COLLAPSE BUTTON
        ======================================================== */}
        <button
          type="button"
          className="preppath-collapse-button"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
            background: isDark
              ? "rgba(255,255,255,.045)"
              : "rgba(255,255,255,.42)",
            border: `1px solid ${colors.border}`,
            color: colors.mutedStrong,
          }}
        >
          <span>
            {collapsed ? (
              <ChevronRight size={19} strokeWidth={2.2} aria-hidden="true" />
            ) : (
              <ChevronLeft size={19} strokeWidth={2.2} aria-hidden="true" />
            )}
          </span>

          {!collapsed && <small>Collapse</small>}
        </button>

        {/* =======================================================
            PROFILE
        ======================================================== */}
        <button
          type="button"
          className="preppath-profile-card"
          onClick={goToSettings}
          onMouseEnter={() => setHovered("profile")}
          onMouseLeave={() => setHovered(null)}
          style={{
            background:
              hovered === "profile"
                ? colors.profileHover
                : "transparent",
            color: colors.text,
          }}
        >
          {avatar ? (
            <img
              src={avatar}
              alt="Profile"
              className="preppath-profile-avatar"
              style={{
                border: `2px solid ${
                  isDark ? "#7C3AED" : "#6D28D9"
                }`,
              }}
            />
          ) : (
            <div className="preppath-profile-fallback">
              {initials}
            </div>
          )}

          {!collapsed && (
            <div className="preppath-profile-info">
              <div
                className="preppath-profile-topline"
                style={{ color: colors.muted }}
              >
                <span className="preppath-online-dot" />
                <span>Online</span>
              </div>

              <strong
                style={{ color: colors.text }}
                title={name || user?.email || ""}
              >
                {name || user?.email || "PrepPath User"}
              </strong>

            </div>
          )}
        </button>

        <div
          className="preppath-sidebar-divider"
          style={{ background: colors.divider }}
        />

        {/* =======================================================
            NAVIGATION
        ======================================================== */}
        <nav className="preppath-nav" aria-label="Main navigation">
          {!collapsed && (
            <div
              className="preppath-nav-label"
              style={{ color: colors.muted }}
            >
              Navigation
            </div>
          )}

          <div className="preppath-nav-list">
            {navItems.map(([path, icon, label]) => {
              const active = isActiveRoute(path);
              const itemHovered = hovered === path;

              return (
                <Link
                  key={path}
                  to={path}
                  title={collapsed ? label : undefined}
                  onClick={() => setMobileOpen(false)}
                  onMouseEnter={() => setHovered(path)}
                  onMouseLeave={() => setHovered(null)}
                  className="preppath-nav-link"
                  style={{
                    background: active
                      ? colors.navActive
                      : itemHovered
                      ? colors.navHover
                      : "transparent",

                    color: active
                      ? colors.activeText
                      : colors.mutedStrong,
                  }}
                >
                  <span
                    className="preppath-nav-icon"
                  style={{
                    background: active
                      ? colors.activeIconBackground
                      : colors.iconBackground,

                    color: active
                      ? colors.activeIcon
                      : colors.icon,
                  }}
                >
                  {(() => {
                    const Icon = icon;
                    return <Icon size={17} strokeWidth={2} aria-hidden="true" />;
                  })()}
                </span>

                  {!collapsed && (
                    <>
                      <span className="preppath-nav-text">
                        {label}
                      </span>

                      {active && (
                        <span className="preppath-active-dot" />
                      )}
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="preppath-sidebar-spacer" />

        {/* =======================================================
            FOOTER
        ======================================================== */}
        {!collapsed && (
          <div
            className="preppath-sidebar-footer"
            style={{ color: colors.muted }}
          >
            PrepPath v1.0
            <span>Built for focused preparation.</span>
          </div>
        )}
      </aside>

      <style>{`
        /* =====================================================
           MAIN DESKTOP SIDEBAR
        ====================================================== */

        .preppath-sidebar {
          width: 270px;
          height: 100vh;
          min-height: 100vh;
          flex: 0 0 270px;

          position: sticky;
          top: 0;

          display: flex;
          flex-direction: column;

          padding: 18px 14px 16px;

          box-sizing: border-box;

          overflow-x: hidden;
          overflow-y: auto;

          transition:
            width .25s ease,
            flex-basis .25s ease,
            transform .28s ease,
            background .25s ease;

          scrollbar-width: none;

          z-index: 70;
        }

        .preppath-sidebar::-webkit-scrollbar {
          display: none;
        }

        .preppath-sidebar-collapsed {
          width: 82px;
          flex-basis: 82px;

          padding-left: 11px;
          padding-right: 11px;
        }

        /* =====================================================
           LOGO
        ====================================================== */

        .preppath-sidebar-logo-wrap {
          position: relative;

          height: 52px;

          display: flex;
          align-items: center;

          margin-bottom: 10px;

          overflow: visible;
        }

        .preppath-sidebar-logo {
          width: 154px;
          height: 42px;

          object-fit: contain;
          object-position: left center;
        }

        .preppath-sidebar-logo-small {
          width: 44px;
          height: 44px;

          object-fit: contain;

          margin: 0 auto;
        }

        /* =====================================================
           DESKTOP COLLAPSE BUTTON
        ====================================================== */

        .preppath-collapse-button {
          width: 100%;
          min-height: 38px;

          border-radius: 11px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          margin-bottom: 14px;

          cursor: pointer;

          font: inherit;
        }

        .preppath-collapse-button span {
          font-size: 23px;
          line-height: 1;
        }

        .preppath-collapse-button small {
          font-size: 11px;
          font-weight: 800;
        }

        /* =====================================================
           PROFILE
        ====================================================== */

        .preppath-profile-card {
          width: 100%;

          padding: 10px;

          border: none;
          border-radius: 14px;

          display: flex;
          align-items: center;

          gap: 11px;

          text-align: left;

          cursor: pointer;

          font: inherit;
        }

        .preppath-sidebar-collapsed .preppath-profile-card {
          justify-content: center;
          padding: 8px 0;
        }

        .preppath-profile-avatar,
        .preppath-profile-fallback {
          width: 44px;
          height: 44px;

          flex: 0 0 44px;

          border-radius: 13px;

          box-sizing: border-box;
        }

        .preppath-profile-avatar {
          object-fit: cover;
        }

        .preppath-profile-fallback {
          display: flex;
          align-items: center;
          justify-content: center;

          background:
            linear-gradient(135deg,#7C3AED,#4C1D95);

          color: #FFFFFF;

          font-size: 14px;
          font-weight: 900;
        }

        .preppath-profile-info {
          min-width: 0;

          display: flex;
          flex-direction: column;

          flex: 1;
        }

        .preppath-profile-topline {
          display: flex;
          align-items: center;

          gap: 5px;

          font-size: 10px;
          font-weight: 700;
        }

        .preppath-online-dot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background: #22C55E;
        }

        .preppath-profile-info strong {
          margin-top: 4px;

          font-size: 13px;
          font-weight: 800;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* =====================================================
           DIVIDER
        ====================================================== */

        .preppath-sidebar-divider {
          width: calc(100% - 8px);
          height: 1px;

          margin: 15px auto;
        }

        /* =====================================================
           NAVIGATION
        ====================================================== */

        .preppath-nav-label {
          padding: 0 10px;

          margin-bottom: 8px;

          font-size: 10px;
          font-weight: 900;

          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .preppath-nav-list {
          display: grid;
          gap: 4px;
        }

        .preppath-nav-link {
          min-height: 46px;

          padding: 7px 9px;

          border-radius: 12px;

          display: flex;
          align-items: center;

          gap: 11px;

          text-decoration: none;

          box-sizing: border-box;

          transition:
            background .18s ease,
            transform .18s ease;

          font-weight: 700;
        }

        .preppath-nav-link:hover {
          transform: translateX(2px);
        }

        .preppath-sidebar-collapsed .preppath-nav-link {
          justify-content: center;
          padding: 7px 0;
        }

        .preppath-nav-icon {
          width: 32px;
          height: 32px;

          flex: 0 0 32px;

          border-radius: 9px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          font-size: 16px;
        }

        .preppath-nav-text {
          min-width: 0;

          flex: 1;

          font-size: 13px;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .preppath-active-dot {
          width: 6px;
          height: 6px;

          flex: 0 0 6px;

          border-radius: 50%;

          background: #FFFFFF;
        }

        .preppath-sidebar-spacer {
          flex: 1;
          min-height: 20px;
        }

        /* =====================================================
           FOOTER
        ====================================================== */

        .preppath-sidebar-footer {
          margin-top: 13px;

          text-align: center;

          font-size: 9px;
          font-weight: 650;

          line-height: 1.5;
        }

        .preppath-sidebar-footer span {
          display: block;
        }

        /* =====================================================
           MOBILE-ONLY ELEMENTS
           Hidden by default.
        ====================================================== */

        .preppath-mobile-rail,
        .preppath-mobile-backdrop,
        .preppath-mobile-close-button {
          display: none;
        }

        /* =====================================================
           TABLET
           Keep compact icon sidebar.
        ====================================================== */

        @media (max-width: 900px) and (min-width: 641px) {
          .preppath-sidebar,
          .preppath-sidebar-collapsed {
            width: 82px;
            flex-basis: 82px;

            padding-left: 11px;
            padding-right: 11px;
          }

          .preppath-sidebar-logo {
            display: none;
          }

          .preppath-sidebar-logo-wrap {
            justify-content: center;
          }

          .preppath-sidebar-logo-wrap::after {
            content: "";

            width: 44px;
            height: 44px;

            background-image:
              url(${logoCompressed});

            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
          }

          .preppath-collapse-button small,
          .preppath-profile-info,
          .preppath-nav-label,
          .preppath-nav-text,
          .preppath-active-dot,
          .preppath-sidebar-footer {
            display: none;
          }

          .preppath-profile-card,
          .preppath-nav-link {
            justify-content: center;
          }
        }

        /* =====================================================
           MOBILE DRAWER
        ====================================================== */

        @media (max-width: 640px) {
          /*
           * The small rail remains in the normal flex layout.
           * This preserves the 56px space expected by MainLayout.
           */
          .preppath-mobile-rail {
            width: 56px;
            min-width: 56px;
            flex: 0 0 56px;

            height: 100vh;
            min-height: 100vh;

            position: sticky;
            top: 0;

            display: flex;
            flex-direction: column;
            align-items: center;

            gap: 12px;

            padding: 10px 6px;

            box-sizing: border-box;

            z-index: 55;
          }

          .preppath-mobile-menu-button {
            width: 42px;
            height: 42px;

            flex: 0 0 42px;

            padding: 0;

            border-radius: 11px;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            gap: 4px;

            cursor: pointer;
          }

          .preppath-hamburger-line {
            width: 18px;
            height: 2px;

            border-radius: 999px;

            background: currentColor;

            display: block;
          }

          .preppath-mobile-logo-button {
            width: 42px;
            height: 42px;

            padding: 3px;

            border: none;
            background: transparent;

            display: flex;
            align-items: center;
            justify-content: center;

            cursor: pointer;
          }

          .preppath-mobile-logo-button img {
            width: 36px;
            height: 36px;

            object-fit: contain;
          }

          /*
           * Convert the actual sidebar into an off-canvas drawer.
           */
          .preppath-sidebar,
          .preppath-sidebar-collapsed {
            position: fixed;

            top: 0;
            left: 0;

            width: min(280px, 86vw) !important;
            max-width: 280px !important;

            height: 100dvh;
            min-height: 100dvh;

            flex-basis: auto !important;

            padding: 18px 14px 16px !important;

            /*
            * Keep the closed drawer at the viewport edge rather than
            * translating the full sidebar and all of its children
            * outside the document bounds.
           */
            transform: translateX(0);

            box-shadow:
              22px 0 60px rgba(0,0,0,.34);

            z-index: 100;

            opacity: 0;
            visibility: hidden;
            pointer-events: none;

            transition:
            opacity .22s ease,
            visibility .22s ease,
            background .25s ease;
          }

            .preppath-sidebar.preppath-mobile-drawer-open {
              transform: translateX(0);

            opacity: 1;
            visibility: visible;
            pointer-events: auto;
          } 

          /*
           * On mobile the drawer must always behave like
           * the expanded desktop sidebar, even if the user
           * previously collapsed the desktop version.
           */
          .preppath-sidebar.preppath-mobile-drawer-open
          .preppath-sidebar-logo {
            display: block;
          }

          .preppath-sidebar.preppath-mobile-drawer-open
          .preppath-sidebar-logo-small {
            display: none;
          }

          .preppath-sidebar.preppath-mobile-drawer-open
          .preppath-profile-info,
          .preppath-sidebar.preppath-mobile-drawer-open
          .preppath-nav-label,
          .preppath-sidebar.preppath-mobile-drawer-open
          .preppath-nav-text,
          .preppath-sidebar.preppath-mobile-drawer-open
          .preppath-active-dot,
          .preppath-sidebar.preppath-mobile-drawer-open
          .preppath-sidebar-footer {
            display: flex;
          }

          .preppath-sidebar.preppath-mobile-drawer-open
          .preppath-nav-label {
            display: block;
          }

          .preppath-sidebar.preppath-mobile-drawer-open
          .preppath-active-dot {
            display: block;
          }

          .preppath-sidebar.preppath-mobile-drawer-open
          .preppath-sidebar-footer {
            display: block;
          }

          .preppath-sidebar.preppath-mobile-drawer-open
          .preppath-profile-card,
          .preppath-sidebar.preppath-mobile-drawer-open
          .preppath-nav-link {
            justify-content: flex-start;
          }

          .preppath-sidebar.preppath-mobile-drawer-open
          .preppath-profile-card {
            padding: 10px;
          }

          .preppath-sidebar.preppath-mobile-drawer-open
          .preppath-nav-link {
            padding: 7px 9px;
          }

          /*
           * The desktop collapse control is unnecessary
           * inside a mobile drawer.
           */
          .preppath-collapse-button {
            display: none;
          }

          /*
           * Logo row + mobile close button.
           */
          .preppath-sidebar-logo-wrap {
            height: 52px;

            justify-content: space-between;

            padding-right: 2px;

            overflow: visible;
          }

          .preppath-sidebar-logo-wrap::after {
            display: none !important;
            content: none !important;
          }

          .preppath-sidebar-logo {
            display: block;

            width: 154px;
            height: 42px;
          }

          .preppath-mobile-close-button {
            width: 38px;
            height: 38px;

            flex: 0 0 38px;

            border-radius: 11px;

            display: flex;
            align-items: center;
            justify-content: center;

            cursor: pointer;

            font-size: 25px;
            line-height: 1;
          }

          /*
           * Restore full profile layout.
           */
          .preppath-profile-avatar,
          .preppath-profile-fallback {
            width: 44px;
            height: 44px;

            flex-basis: 44px;

            border-radius: 13px;
          }

          .preppath-profile-info {
            display: flex;
          }

          /*
           * Restore full navigation layout.
           */
          .preppath-nav-list {
            gap: 4px;
          }

          .preppath-nav-link {
            min-height: 46px;
          }

          .preppath-nav-icon {
            width: 32px;
            height: 32px;

            flex-basis: 32px;

            font-size: 16px;
          }

          .preppath-nav-text {
            font-size: 13px;
          }

          /*
           * Backdrop.
           */
          .preppath-mobile-backdrop {
            position: fixed;

            inset: 0;

            width: 100vw;
            height: 100dvh;

            padding: 0;
            margin: 0;

            border: none;

            background: rgba(4,2,8,.64);

            backdrop-filter: blur(3px);

            opacity: 0;

            visibility: hidden;

            pointer-events: none;

            display: block;

            z-index: 90;

            transition:
              opacity .25s ease,
              visibility .25s ease;
          }

          .preppath-mobile-backdrop-open {
            opacity: 1;

            visibility: visible;

            pointer-events: auto;
          }
        }

        /* =====================================================
        KEYBOARD ACCESSIBILITY
        ===================================================== */

        .preppath-nav-link:focus-visible,
        .preppath-profile-card:focus-visible,
        .preppath-collapse-button:focus-visible,
        .preppath-mobile-menu-button:focus-visible,
        .preppath-mobile-close-button:focus-visible,
        .preppath-mobile-logo-button:focus-visible {
          outline: 3px solid #A78BFA;
          outline-offset: 3px;
        }

        .preppath-nav-link:focus:not(:focus-visible),
        .preppath-profile-card:focus:not(:focus-visible),
        .preppath-collapse-button:focus:not(:focus-visible),
        .preppath-mobile-menu-button:focus:not(:focus-visible),
        .preppath-mobile-close-button:focus:not(:focus-visible),
        .preppath-mobile-logo-button:focus:not(:focus-visible) {
          outline: none;
        }

        /* =====================================================
           REDUCED MOTION
        ====================================================== */

        @media (prefers-reduced-motion: reduce) {
          .preppath-sidebar,
          .preppath-mobile-backdrop,
          .preppath-nav-link,
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}