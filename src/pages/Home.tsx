import { useNavigate } from "react-router-dom";
import { ClipboardList, Target, ChartNoAxesCombined, BrainCircuit, Bookmark, Trophy, Check, ArrowRight, Sparkles, BookOpen, FileText, Image as ImageIcon, MessageCircle, Heart, ShieldCheck, PlayCircle } from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import fullLightLogo from "../assets/preppath-full-light-logo.png";
import fullDarkLogo from "../assets/preppath-full-dark-logo.png";
import smallLightLogo from "../assets/preppath-small-light-logo.png";
import smallDarkLogo from "../assets/preppath-small-dark-logo.png";

export default function Home() {
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
    purple: "#7C3AED",
    purpleDark: "#4C1D95",
    purpleSoft: isDark ? "rgba(124,58,237,.16)" : "#F0E9FF",
  };

  const universities = ["FAST", "NUST", "COMSATS", "UET", "GIKI", "ITU"];

  const features = [
    {
      icon: BookOpen,
      title: "Community Study Resources",
      text: "Explore admin-reviewed student submissions, preview PDFs and images, watch YouTube lessons, and discuss resources through likes and threaded comments.",
    },
    {
      icon: ClipboardList,
      title: "Mock Tests",
      text: "Practice entry-test style questions in focused subject tests with instant progress tracking.",
    },
    {
      icon: Target,
      title: "University Match",
      text: "Compare your academic profile with your target universities and keep your options organized.",
    },
    {
      icon: ChartNoAxesCombined,
      title: "Performance Analytics",
      text: "Track accuracy, completed tests, streaks, and the subjects that need more attention.",
    },
    {
      icon: BrainCircuit,
      title: "AI Study Coach",
      text: "Get AI-powered explanations and study support inside PrepPath.",
    },
    {
      icon: Bookmark,
      title: "Smart Bookmarks",
      text: "Save difficult questions during practice and build a personal revision queue.",
    },
    {
      icon: Trophy,
      title: "Leaderboard",
      text: "Stay motivated by seeing how your practice progress compares across the PrepPath community.",
    },
  ];

  return (
    <div
      className="home-page"
      style={{
        background: colors.page,
        color: colors.text,
      }}
    >
      <header
        className="home-nav"
        style={{
          background: isDark
            ? "rgba(9,7,15,.82)"
            : "rgba(247,245,252,.86)",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <button
          type="button"
          className="home-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="PrepPath — back to top"
        >
          <img
            src={isDark ? fullDarkLogo : fullLightLogo}
            alt="PrepPath"
            style={{ width: 154, height: 42, objectFit: "contain" }}
            />
        </button>

        <nav className="home-nav-links" aria-label="Main navigation">
          <a href="#features" style={{ color: colors.muted }}>
            Features
          </a>
          <a href="#universities" style={{ color: colors.muted }}>
            Universities
          </a>
          <a href="#resources" style={{ color: colors.muted }}>Resources</a>
        </nav>

        <div className="home-nav-actions">
          <button
            type="button"
            className="home-login-btn"
            style={{
              color: colors.text,
              border: `1px solid ${colors.border}`,
              background: colors.card,
            }}
            onClick={() => navigate("/login")}
          >
            Log in
          </button>

          <button
            type="button"
            className="home-primary-btn"
            onClick={() => navigate("/signup")}
          >
            Get started
          </button>
        </div>
      </header>

      <main>
        <section className="home-hero">
          <div className="home-hero-glow home-hero-glow-one" />
          <div className="home-hero-glow home-hero-glow-two" />

          <div className="home-hero-copy">
            <div
              className="home-kicker"
              style={{
                color: colors.purple,
                background: colors.purpleSoft,
                border: `1px solid ${colors.purple}30`,
              }}
            >
              <Sparkles size={14} strokeWidth={1.8} aria-hidden="true" /> Built for Pakistani university entry-test prep
            </div>

            <h1>
              Your path to Pakistan&apos;s top universities
              <span> starts here.</span>
            </h1>

            <p style={{ color: colors.muted }}>
              Practice smarter with focused mock tests, university planning,
              performance analytics, bookmarks, and a community study-resource library —
              all in one place.
            </p>

            <div className="home-hero-actions">
              <button
                type="button"
                className="home-primary-btn home-primary-large"
                onClick={() => navigate("/signup")}
              >
                Start practicing free <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
              </button>

              <button
                type="button"
                className="home-secondary-btn"
                style={{
                  color: colors.text,
                  background: colors.card,
                  border: `1px solid ${colors.border}`,
                }}
                onClick={() => navigate("/login")}
              >
                I already have an account
              </button>
            </div>

            <div className="home-proof" style={{ color: colors.muted }}>
              <span><Check size={14} aria-hidden="true" /> All study features free</span>
              <span><Check size={14} aria-hidden="true" /> No card required</span>
              <span><Check size={14} aria-hidden="true" /> Admin-reviewed community resources</span>
            </div>
          </div>

          <div className="home-hero-visual">
            <div className="home-dashboard-preview">
              <div className="home-preview-top">
                <div>
                  <span className="home-preview-eyebrow">PREPPATH</span>
                  <h3>Today&apos;s study plan</h3>
                </div>

                <div className="home-preview-avatar">A</div>
              </div>

              <div className="home-preview-stats">
                <div>
                  <span>Accuracy</span>
                  <strong>78%</strong>
                </div>
                <div>
                  <span>Tests</span>
                  <strong>12</strong>
                </div>
                <div>
                  <span>Streak</span>
                  <strong>6 days</strong>
                </div>
              </div>

              <div className="home-preview-progress-card">
                <div className="home-preview-progress-top">
                  <span>Advanced Mathematics</span>
                  <strong>72%</strong>
                </div>
                <div className="home-preview-track">
                  <div className="home-preview-fill" style={{ width: "72%" }} />
                </div>
              </div>

              <div className="home-preview-question">
                <div className="home-preview-question-top">
                  <span>Quick practice</span>
                  <span>Question 7 / 20</span>
                </div>
                <p>If f(x) = 2x² − 3x + 1, what is f(2)?</p>
                <div className="home-preview-options">
                  <span>A. 1</span>
                  <span className="active">B. 3</span>
                  <span>C. 5</span>
                  <span>D. 7</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="universities"
          className="home-universities"
          style={{
            borderTop: `1px solid ${colors.border}`,
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <p style={{ color: colors.muted }}>
            Built around preparation for leading Pakistani universities
          </p>

          <div className="home-university-row">
            {universities.map((university) => (
              <div
                key={university}
                className="home-university-pill"
                style={{
                  background: colors.card,
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                }}
              >
                {university}
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="home-section">
          <div className="home-section-heading">
            <span style={{ color: colors.purple }}>EVERYTHING IN ONE PLACE</span>
            <h2>PrepPath is more than a question bank.</h2>
            <p style={{ color: colors.muted }}>
              Practice, organize, measure, and improve without turning your
              study routine into chaos.
            </p>
          </div>

          <div className="home-feature-grid">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="home-feature-card"
                style={{
                  background: colors.card,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div
                  className="home-feature-icon"
                  style={{ background: colors.purpleSoft }}
                >
                  <feature.icon size={23} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h3>{feature.title}</h3>
                <p style={{ color: colors.muted }}>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="resources" className="home-section home-resources-section">
          <div className="home-section-heading">
            <span style={{ color: colors.purple }}>NEW · COMMUNITY STUDY RESOURCES</span>
            <h2>See what you are studying before you open it.</h2>
            <p style={{ color: colors.muted }}>
              Browse approved student-shared notes and lessons, preview supported files right in a post,
              and learn together through likes, comments, and replies.
            </p>
          </div>
          <div className="home-resource-layout">
            <div className="home-resource-demo" style={{ background: colors.card, borderColor: colors.border }}>
              <div className="home-resource-author">
                <div className="home-resource-avatar">S</div>
                <div><strong>Community resource</strong><span style={{ color: colors.muted }}>Physics · PDF · Example preview</span></div>
                <span className="home-resource-approved"><ShieldCheck size={14} /> Reviewed</span>
              </div>
              <h3>Physics revision notes</h3>
              <p style={{ color: colors.muted }}>Preview study material in the post before choosing to download it.</p>
              <div className="home-resource-document" style={{ background: colors.cardSoft, borderColor: colors.border }}>
                <div className="home-resource-document-top"><FileText size={18} /> PDF preview <span>Sample layout</span></div>
                <div className="home-resource-document-page" style={{ background: colors.card, borderColor: colors.border }}>
                  <div className="home-resource-document-line wide" /><div className="home-resource-document-line" />
                  <div className="home-resource-document-line short" /><div className="home-resource-document-block" />
                  <div className="home-resource-document-line" /><div className="home-resource-document-line short" />
                </div>
              </div>
              <div className="home-resource-social" style={{ borderColor: colors.border }}>
                <span><Heart size={17} /> Like</span><span><MessageCircle size={17} /> Comments & replies</span>
              </div>
            </div>
            <div className="home-resource-benefits">
              <div style={{ background: colors.card, borderColor: colors.border }}><FileText size={23} /><h3>Preview PDFs</h3><p style={{ color: colors.muted }}>Read supported PDF documents inside expanded posts.</p></div>
              <div style={{ background: colors.card, borderColor: colors.border }}><ImageIcon size={23} /><h3>View images</h3><p style={{ color: colors.muted }}>See shared diagrams and notes without downloading first.</p></div>
              <div style={{ background: colors.card, borderColor: colors.border }}><PlayCircle size={23} /><h3>Watch lessons</h3><p style={{ color: colors.muted }}>Play supported video lessons directly in posts.</p></div>
              <div style={{ background: colors.card, borderColor: colors.border }}><MessageCircle size={23} /><h3>Discuss together</h3><p style={{ color: colors.muted }}>Like resources, ask questions, and reply to other students.</p></div>
              <p className="home-resource-note" style={{ color: colors.muted }}>Student submissions require admin approval before appearing in the community. Review and previews do not guarantee that external links or files are risk-free.</p>
              <button type="button" className="home-primary-btn home-resource-cta" onClick={() => navigate("/signup")}>Join the study community <ArrowRight size={17} aria-hidden="true" /></button>
            </div>
          </div>
        </section>

        <section className="home-final-cta">
          <div className="home-final-cta-inner">
            <span className="home-final-cta-kicker">READY WHEN YOU ARE</span>
            <h2>Make your next study session count.</h2>
            <p>
              Build a focused PrepPath routine around the universities you
              actually want to get into.
            </p>

            <button
              type="button"
              className="home-final-button"
              onClick={() => navigate("/signup")}
            >
              Start with PrepPath <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </section>
      </main>

      <footer
        className="home-footer"
        style={{
          borderTop: `1px solid ${colors.border}`,
          color: colors.muted,
        }}
      >
        <div className="home-footer-brand">
          <img
            src={isDark ? smallDarkLogo : smallLightLogo}
            alt="PrepPath"
            aria-hidden="true"
            style={{ width: 38, height: 38, objectFit: "contain", flexShrink: 0 }}
          />
          <div>
            <strong style={{ color: colors.text }}>PrepPath</strong>
            <span>Entry-test preparation, simplified.</span>
          </div>
        </div>

        <div className="home-footer-links">
          <button type="button" onClick={() => navigate("/terms")}>
            Terms
          </button>
          <button type="button" onClick={() => navigate("/privacy")}>
            Privacy
          </button>
          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button type="button" onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </div>

        <span>© {new Date().getFullYear()} PrepPath</span>
      </footer>

      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        .home-page {
          width: 100%;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .home-nav {
          position: sticky;
          top: 0;
          z-index: 100;
          min-height: 76px;
          padding: 0 6vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          backdrop-filter: blur(18px);
        }

        .home-brand {
          border: 0;
          padding: 0;
          background: transparent;
          display: flex;
          align-items: center;
          gap: 11px;
          font: inherit;
          font-size: 19px;
          font-weight: 950;
          cursor: pointer;
        }

        .home-brand-mark {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 12px;
          font-weight: 950;
          background: linear-gradient(135deg,#4C1D95,#7C3AED);
          box-shadow: 0 8px 20px rgba(124,58,237,.28);
        }

        .home-nav-links {
          display: flex;
          gap: 30px;
        }

        .home-nav-links a {
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
        }

        .home-nav-links a:hover { color: #7C3AED !important; }

        .home-nav-actions {
          display: flex;
          gap: 10px;
        }

        .home-login-btn,
        .home-primary-btn,
        .home-secondary-btn,
        .home-final-button {
          font: inherit;
          cursor: pointer;
        }

        .home-login-btn {
          border-radius: 12px;
          padding: 10px 15px;
          font-size: 13px;
          font-weight: 900;
        }

        .home-primary-btn {
          border: 0;
          border-radius: 12px;
          padding: 11px 17px;
          color: #fff;
          background: linear-gradient(135deg,#7C3AED,#4C1D95);
          box-shadow: 0 10px 24px rgba(124,58,237,.25);
          font-size: 13px;
          font-weight: 900;
        }

        .home-hero {
          position: relative;
          width: min(1440px, 100%);
          min-height: 720px;
          margin: 0 auto;
          padding: 92px 6vw 98px;
          display: grid;
          grid-template-columns: minmax(0,.95fr) minmax(440px,1.05fr);
          align-items: center;
          gap: 80px;
        }

        .home-hero-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        .home-hero-glow-one {
          width: 480px;
          height: 480px;
          top: 18px;
          right: -160px;
          background: rgba(124,58,237,.10);
        }

        .home-hero-glow-two {
          width: 300px;
          height: 300px;
          left: -120px;
          bottom: 10px;
          background: rgba(124,58,237,.06);
        }

        .home-hero-copy,
        .home-hero-visual {
          position: relative;
          z-index: 1;
        }

        .home-kicker {
          width: fit-content;
          padding: 9px 13px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
        }

        .home-hero h1 {
          margin: 22px 0 0;
          font-size: clamp(47px,5.3vw,78px);
          line-height: .99;
          letter-spacing: -3.4px;
          font-weight: 950;
        }

        .home-hero h1 span {
          background: linear-gradient(90deg,#7C3AED,#A78BFA);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .home-hero-copy > p {
          margin: 24px 0 0;
          font-size: 18px;
          line-height: 1.75;
        }

        .home-hero-actions {
          margin-top: 31px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .home-primary-large,
        .home-secondary-btn {
          min-height: 52px;
          border-radius: 15px;
          padding: 0 20px;
          font-size: 14px;
          font-weight: 900;
        }

        .home-secondary-btn { border-width: 1px; border-style: solid; }

        .home-proof {
          margin-top: 21px;
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          font-size: 12px;
          font-weight: 750;
        }

        .home-dashboard-preview {
          min-height: 530px;
          padding: 28px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.16);
          border-radius: 30px;
          color: #fff;
          background:
            radial-gradient(circle at 95% 5%, rgba(59,130,246,.28), transparent 33%),
            linear-gradient(145deg,#130A21 0%,#241037 48%,#34105B 100%);
          box-shadow: 0 36px 90px rgba(45,18,91,.34);
        }

        .home-preview-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .home-preview-eyebrow {
          color: #BFA5FF;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: 1.5px;
        }

        .home-preview-top h3 {
          margin: 5px 0 0;
          font-size: 24px;
          font-weight: 950;
        }

        .home-preview-avatar {
          width: 43px;
          height: 43px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 950;
          background: linear-gradient(135deg,#7C3AED,#4C1D95);
        }

        .home-preview-stats {
          margin-top: 27px;
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 11px;
        }

        .home-preview-stats > div,
        .home-preview-progress-card,
        .home-preview-question {
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.06);
        }

        .home-preview-stats > div {
          padding: 17px;
          border-radius: 17px;
        }

        .home-preview-stats span,
        .home-preview-progress-top span {
          display: block;
          color: rgba(255,255,255,.62);
          font-size: 10px;
          font-weight: 800;
        }

        .home-preview-stats strong {
          display: block;
          margin-top: 7px;
          font-size: 20px;
          font-weight: 950;
        }

        .home-preview-progress-card {
          margin-top: 14px;
          padding: 17px;
          border-radius: 17px;
        }

        .home-preview-progress-top {
          display: flex;
          justify-content: space-between;
        }

        .home-preview-track {
          height: 8px;
          margin-top: 12px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255,255,255,.09);
        }

        .home-preview-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg,#8B5CF6,#A78BFA);
        }

        .home-preview-question {
          margin-top: 14px;
          padding: 20px;
          border-radius: 20px;
          background: rgba(11,7,18,.58);
        }

        .home-preview-question-top {
          display: flex;
          justify-content: space-between;
          color: rgba(255,255,255,.56);
          font-size: 10px;
          font-weight: 800;
        }

        .home-preview-question p {
          margin: 15px 0;
          font-size: 14px;
          line-height: 1.55;
          font-weight: 800;
        }

        .home-preview-options {
          display: grid;
          grid-template-columns: repeat(2,1fr);
          gap: 8px;
        }

        .home-preview-options span {
          padding: 10px 11px;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 11px;
          background: rgba(255,255,255,.05);
          font-size: 11px;
        }

        .home-preview-options span.active {
          border-color: #8B5CF6;
          background: rgba(124,58,237,.24);
        }

        .home-universities {
          padding: 30px 6vw 34px;
        }

        .home-universities > p {
          text-align: center;
          font-size: 12px;
          font-weight: 850;
        }

        .home-university-row {
          max-width: 1120px;
          margin: 19px auto 0;
          display: grid;
          grid-template-columns: repeat(6,1fr);
          gap: 11px;
        }

        .home-university-pill {
          min-height: 68px;
          padding: 14px;
          border-radius: 17px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 950;
        }

        .home-section {
          width: min(1240px,100%);
          margin: 0 auto;
          padding: 110px 6vw;
        }

        .home-section-heading {
          max-width: 780px;
          margin: 0 auto 46px;
          text-align: center;
        }

        .home-section-heading > span,
        .home-final-cta-kicker {
          font-size: 11px;
          font-weight: 950;
          letter-spacing: 1.6px;
        }

        .home-section-heading h2,
        .home-final-cta h2 {
          margin: 10px 0 0;
          font-size: clamp(34px,4vw,54px);
          line-height: 1.08;
          letter-spacing: -1.8px;
          font-weight: 950;
        }

        .home-section-heading p {
          margin: 16px auto 0;
          font-size: 16px;
          line-height: 1.75;
        }

        .home-feature-grid {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 16px;
        }

        .home-feature-card {
          min-height: 245px;
          padding: 28px;
          border-radius: 23px;
          box-shadow: 0 18px 44px rgba(25,10,45,.06);
        }

        .home-feature-icon {
          width: 49px;
          height: 49px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }

        .home-feature-card h3 {
          margin: 20px 0 0;
          font-size: 20px;
          font-weight: 950;
        }

        .home-feature-card p {
          margin: 10px 0 0;
          font-size: 14px;
          line-height: 1.7;
        }

          .home-resources-section { padding-top: 55px; }
         .home-resource-layout { display:grid; grid-template-columns: minmax(0,1.05fr) minmax(0,.95fr); gap:28px; align-items:center; }
         .home-resource-demo { border:1px solid; border-radius:26px; padding:24px; box-shadow:0 18px 44px rgba(25,10,45,.07); min-width:0; }
         .home-resource-author { display:flex; align-items:center; gap:11px; flex-wrap:wrap; }
         .home-resource-avatar { width:42px; height:42px; border-radius:50%; display:grid; place-items:center; background:#7C3AED; color:white; font-weight:900; }
         .home-resource-author strong,.home-resource-author span { display:block; font-size:12px; }
         .home-resource-approved { margin-left:auto; display:flex !important; align-items:center; gap:4px; padding:6px 9px; border-radius:99px; background:rgba(124,58,237,.13); color:#A78BFA; font-weight:800; }
         .home-resource-demo h3 { margin:21px 0 6px; font-size:23px; font-weight:900; }
         .home-resource-demo > p { margin:0 0 16px; font-size:13px; line-height:1.6; }
         .home-resource-document { border:1px solid; border-radius:16px; padding:14px; }
         .home-resource-document-top { display:flex; align-items:center; gap:7px; font-size:12px; font-weight:850; color:#8B5CF6; }
         .home-resource-document-top span { margin-left:auto; font-size:10px; opacity:.7; }
         .home-resource-document-page { margin:13px auto 0; max-width:350px; min-height:235px; border:1px solid; border-radius:6px; padding:24px; }
         .home-resource-document-line { height:8px; width:80%; margin-bottom:12px; border-radius:5px; background:rgba(139,92,246,.17); }
         .home-resource-document-line.wide { height:13px; width:65%; background:rgba(139,92,246,.4); }
         .home-resource-document-line.short { width:48%; }
         .home-resource-document-block { height:48px; width:100%; margin:14px 0; border-radius:8px; background:rgba(139,92,246,.1); }
         .home-resource-social { display:flex; gap:20px; flex-wrap:wrap; border-top:1px solid; margin-top:16px; padding-top:15px; }
         .home-resource-social span { display:flex; align-items:center; gap:7px; font-size:12px; font-weight:800; color:#8B5CF6; }
         .home-resource-benefits { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
         .home-resource-benefits > div { border:1px solid; border-radius:18px; padding:18px; min-width:0; }
         .home-resource-benefits > div > svg { color:#8B5CF6; }
         .home-resource-benefits h3 { margin:11px 0 5px; font-size:15px; font-weight:900; }
         .home-resource-benefits p { font-size:12px; line-height:1.65; margin:0; }
         .home-resource-note { grid-column:1/-1; font-size:11px !important; line-height:1.6; margin:0; }
         .home-resource-cta { grid-column:1/-1; display:flex; align-items:center; justify-content:center; gap:8px; width:fit-content; }
        .home-final-cta {
          padding: 18px 6vw 110px;
        }

        .home-final-cta-inner {
          max-width: 940px;
          margin: 0 auto;
          text-align: center;
        }

        .home-final-cta p {
          max-width: 660px;
          margin: 17px auto 0;
          color: ${colors.muted};
          line-height: 1.7;
        }

        .home-final-button {
          margin-top: 27px;
          border: 0;
          border-radius: 15px;
          padding: 14px 21px;
          color: #fff;
          background: linear-gradient(135deg,#7C3AED,#4C1D95);
          font-size: 14px;
          font-weight: 950;
        }

        .home-footer {
          min-height: 125px;
          padding: 28px 6vw;
          display: grid;
          grid-template-columns: 1fr auto auto;
          align-items: center;
          gap: 35px;
        }

        .home-footer-brand {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .home-footer-brand strong,
        .home-footer-brand span {
          display: block;
        }

        .home-footer-links {
          display: flex;
          gap: 18px;
        }

        .home-footer-links button {
          border: 0;
          padding: 0;
          background: transparent;
          color: inherit;
          font: inherit;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
        }

        @media (max-width: 1100px) {
          .home-nav-links { display: none; }
          .home-hero { grid-template-columns: 1fr; }
          .home-feature-grid { grid-template-columns: repeat(2,1fr); }
          .home-university-row { grid-template-columns: repeat(3,1fr); }
        }

        @media (max-width: 860px) {
          .home-footer { grid-template-columns: 1fr; }
        }

        @media (max-width: 680px) {
          .home-nav { padding: 0 18px; }
          .home-login-btn { display: none; }

          .home-hero {
            min-height: auto;
            padding: 56px 18px 76px;
          }

          .home-hero h1 {
            font-size: 48px;
            letter-spacing: -2.5px;
          }

          .home-hero-actions {
            flex-direction: column;
          }

          .home-primary-large,
          .home-secondary-btn { width: 100%; }

          .home-preview-stats { grid-template-columns: 1fr; }
          .home-preview-stats > div:nth-child(3) { display: none; }

          .home-universities {
            padding-left: 18px;
            padding-right: 18px;
          }

          .home-university-row { grid-template-columns: repeat(2,1fr); }
          .home-section { padding: 78px 18px; }
          .home-feature-grid { grid-template-columns: 1fr; }

          .home-resource-layout { grid-template-columns: 1fr; gap: 22px; }
          .home-resource-demo { padding: 18px; }
          .home-resource-approved { margin-left: 0; }
          .home-resource-cta { width: 100%; }
          .home-final-cta {
            padding: 0 18px 80px;
          }

          .home-footer {
            padding: 27px 18px;
          }
        }
      `}</style>
    </div>
  );
}
