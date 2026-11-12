import { useCallback, useEffect, useState } from "react";

import MainLayout from "../components/MainLayout";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../lib/supabase";
import { toggleBookmark } from "../utils/bookmarks";

type Bookmark = {
  id: string;
  question: {
    id: string;
    subject: string;
    question: string;
  };
};

export default function Bookmarks() {
  const { user, profileLoading } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

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
    red: "#EF4444",
    redSoft: isDark ? "rgba(239,68,68,.14)" : "#FEF0F0",
  };


  const bookmarkCount = bookmarks.length;

  const loadBookmarks = useCallback(async () => {
    setLoading(true);
    setLoadError(false);

    try {
      if (!user) {
        setBookmarks([]);
        return;
      }

      const { data, error } = await supabase
        .from("bookmarked_questions")
        .select(`
          id,
          question:questions!bookmarked_questions_question_id_fkey (
            id,
            subject,
            question
          )
        `)
        .eq("user_id", user.id);

      if (error) {
        console.error(
          "Bookmarks load error:",
          error
        );

        setLoadError(true);
        setBookmarks([]);
        return;
      }

      setBookmarks(
        (data ?? []) as unknown as Bookmark[]
      );
    } catch (error) {
      console.error(
        "Unexpected bookmarks error:",
        error
      );

      setLoadError(true);
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!profileLoading) {
      void loadBookmarks();
    }
  }, [loadBookmarks, profileLoading]);

  async function removeBookmark(bookmark: Bookmark) {
    setRemovingId(bookmark.id);

    try {
      const result = await toggleBookmark(
        bookmark.question.id
      );

      if (result.bookmarked) {
        console.error(
          "Bookmark removal failed: bookmark is still saved."
        );
        return;
      }

      setBookmarks((current) =>
        current.filter(
          (item) => item.id !== bookmark.id
        )
      );
    } catch (error) {
      console.error(
        "Bookmark removal error:",
        error
      );
    } finally {
      setRemovingId(null);
    }
  }

  if (loading || profileLoading) {
    return (
      <MainLayout>
        <div
          className="bookmarks-page"
          style={{
            background: colors.page,
            color: colors.text,
          }}
        >
          <div
            className="bookmarks-loading-card"
            style={{
              background: colors.card,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div
              className="bookmarks-loader"
              style={{
                borderColor: colors.purpleSoft,
                borderTopColor: colors.purple,
              }}
            />

            <h2>Loading bookmarks...</h2>

            <p style={{ color: colors.muted }}>
              Pulling together your saved questions.
            </p>
          </div>

          <style>{styles}</style>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div
        className="bookmarks-page"
        style={{
          background: colors.page,
          color: colors.text,
        }}
      >
        <div className="bookmarks-top-row">
          <div>
            <p
              className="bookmarks-eyebrow"
              style={{ color: colors.purple }}
            >
              Saved practice
            </p>

            <h1>Bookmarks</h1>

            <p
              className="bookmarks-subtitle"
              style={{ color: colors.muted }}
            >
              Review the questions you saved and revisit anything that needs
              another look.
            </p>
          </div>

          <div
            className="bookmarks-count-pill"
            style={{
              background: colors.purpleSoft,
              color: colors.purple,
            }}
          >
            {bookmarkCount} saved
          </div>
        </div>

        <section className="bookmarks-hero">
          <div className="bookmarks-hero-glow-one" />
          <div className="bookmarks-hero-glow-two" />

          <div className="bookmarks-hero-content">
            <div className="bookmarks-hero-badge">
              ☆ Personal revision library
            </div>

            <h2>Keep your tricky questions in one place.</h2>

            <p>
              Save questions during practice, come back later, and build a
              focused revision list instead of hunting through old tests.
            </p>
          </div>

          <div className="bookmarks-hero-stat">
            <strong>{bookmarks.length}</strong>
            <span>bookmarked questions</span>
          </div>
        </section>

        <section
          className="bookmarks-usage-card"
          style={{
            background: colors.card,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div className="bookmarks-usage-top">
            <div>
              <p className="bookmarks-eyebrow" style={{ color: colors.purple }}>
                Bookmark access
              </p>
              <h2>Unlimited bookmarks</h2>
              <p style={{ color: colors.muted }}>
                Save as many questions as you need for revision.
              </p>
            </div>
          </div>
        </section>

        {bookmarks.length === 0 ? (
          <section
            className="bookmarks-empty"
            style={{
              background: colors.card,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div
              className="bookmarks-empty-icon"
              style={{
                background: colors.purpleSoft,
                color: colors.purple,
              }}
            >
              ☆
            </div>

            <h2>{loadError ? "Could not load bookmarks" : "No bookmarks yet"}</h2>

            <p style={{ color: colors.muted }}>
              {loadError
                ? "Your saved questions could not be loaded. Please refresh the page and try again."
                : "Save a question during a mock test and it’ll appear here for revision."}
            </p>
          </section>
        ) : (
          <section className="bookmarks-grid">
            {bookmarks.map((bookmark, index) => (
              <article
                key={bookmark.id}
                className="bookmark-card"
                style={{
                  background: colors.card,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div className="bookmark-card-top">
                  <div className="bookmark-subject-wrap">
                    <div
                      className="bookmark-number"
                      style={{
                        background: colors.purpleSoft,
                        color: colors.purple,
                      }}
                    >
                      {index + 1}
                    </div>

                    <div>
                      <span
                        className="bookmark-label"
                        style={{ color: colors.muted }}
                      >
                        Subject
                      </span>

                      <h3>{bookmark.question.subject}</h3>
                    </div>
                  </div>

                  <div
                    className="bookmark-saved-badge"
                    style={{
                      background: colors.purpleSoft,
                      color: colors.purple,
                    }}
                  >
                    ★ Saved
                  </div>
                </div>

                <div
                  className="bookmark-question-box"
                  style={{
                    background: colors.cardSoft,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <span
                    className="bookmark-question-label"
                    style={{ color: colors.muted }}
                  >
                    Question
                  </span>

                  <p>{bookmark.question.question}</p>
                </div>

                <div className="bookmark-card-bottom">
                  <span style={{ color: colors.muted }}>
                    Keep this one in your revision queue.
                  </span>

                  <button
                    onClick={() => removeBookmark(bookmark)}
                    disabled={removingId === bookmark.id}
                    className="bookmark-remove-button"
                    style={{
                      background: colors.redSoft,
                      color: colors.red,
                      border: `1px solid ${colors.red}2E`,
                      opacity: removingId === bookmark.id ? 0.65 : 1,
                    }}
                  >
                    {removingId === bookmark.id
                      ? "Removing..."
                      : "Remove Bookmark"}
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}

        <style>{styles}</style>
      </div>
    </MainLayout>
  );
}

const styles = `
  .bookmarks-page {
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    padding: 40px;
    transition: background .25s ease, color .25s ease;
  }

  .bookmarks-top-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 22px;
  }

  .bookmarks-eyebrow {
    margin: 0;
    font-size: 13px;
    font-weight: 900;
    letter-spacing: .85px;
    text-transform: uppercase;
  }

  .bookmarks-top-row h1 {
    margin: 6px 0 0;
    font-size: 38px;
    line-height: 1.08;
    font-weight: 950;
    letter-spacing: -.8px;
  }

  .bookmarks-subtitle {
    max-width: 700px;
    margin: 10px 0 0;
    font-size: 15px;
    line-height: 1.65;
  }

  .bookmarks-count-pill {
    margin-top: 12px;
    padding: 10px 14px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 900;
    white-space: nowrap;
  }

  .bookmarks-hero {
    position: relative;
    overflow: hidden;
    min-height: 220px;
    padding: 34px;
    border-radius: 28px;
    margin-bottom: 22px;
    color: #FFFFFF;
    background:
      linear-gradient(
        135deg,
        #2A0F50 0%,
        #4C1D95 44%,
        #6D28D9 72%,
        #3B82F6 120%
      );
    box-shadow: 0 26px 60px rgba(76,29,149,.32);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
  }

  .bookmarks-hero-glow-one,
  .bookmarks-hero-glow-two {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,.14);
    pointer-events: none;
  }

  .bookmarks-hero-glow-one {
    width: 230px;
    height: 230px;
    right: -70px;
    top: -85px;
  }

  .bookmarks-hero-glow-two {
    width: 150px;
    height: 150px;
    left: 48%;
    bottom: -70px;
  }

  .bookmarks-hero-content,
  .bookmarks-hero-stat {
    position: relative;
    z-index: 1;
  }

  .bookmarks-hero-content {
    max-width: 760px;
  }

  .bookmarks-hero-badge {
    width: fit-content;
    padding: 8px 12px;
    margin-bottom: 15px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,.26);
    background: rgba(255,255,255,.14);
    font-size: 13px;
    font-weight: 850;
  }

  .bookmarks-hero h2 {
    margin: 0;
    font-size: 37px;
    line-height: 1.15;
    font-weight: 950;
    letter-spacing: -.7px;
  }

  .bookmarks-hero p {
    margin: 13px 0 0;
    max-width: 700px;
    color: rgba(255,255,255,.92);
    font-size: 15px;
    line-height: 1.7;
  }

  .bookmarks-hero-stat {
    min-width: 185px;
    padding: 24px 20px;
    border-radius: 24px;
    border: 1px solid rgba(255,255,255,.24);
    background: rgba(255,255,255,.14);
    backdrop-filter: blur(12px);
    text-align: center;
    display: grid;
    gap: 5px;
  }

  .bookmarks-hero-stat strong {
    font-size: 42px;
    line-height: 1;
    font-weight: 950;
  }

  .bookmarks-hero-stat span {
    font-size: 12px;
    font-weight: 750;
  }

  .bookmarks-usage-card {
    margin-bottom: 22px;
    padding: 24px;
    border-radius: 22px;
    box-sizing: border-box;
    box-shadow: 0 18px 38px rgba(0,0,0,.08);
  }

  .bookmarks-usage-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .bookmarks-usage-top h2 {
    margin: 6px 0 0;
    font-size: 24px;
    font-weight: 950;
  }

  .bookmarks-usage-top p:last-child {
    margin: 8px 0 0;
    line-height: 1.6;
  }

  .bookmarks-upgrade-button {
    border: none;
    border-radius: 13px;
    padding: 12px 16px;
    background:
      linear-gradient(135deg,#7C3AED,#4C1D95);
    color: #FFFFFF;
    font: inherit;
    font-size: 13px;
    font-weight: 900;
    cursor: pointer;
    white-space: nowrap;
    box-shadow: 0 12px 26px rgba(124,58,237,.24);
  }

  .bookmarks-usage-track {
    width: 100%;
    height: 10px;
    margin-top: 20px;
    overflow: hidden;
    border-radius: 999px;
  }

  .bookmarks-usage-fill {
    height: 100%;
    border-radius: 999px;
    background:
      linear-gradient(90deg,#4C1D95,#7C3AED);
    transition: width .25s ease;
  }

  .bookmarks-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .bookmark-card {
    min-width: 0;
    padding: 24px;
    border-radius: 24px;
    box-sizing: border-box;
    box-shadow: 0 18px 38px rgba(0,0,0,.08);
    transition:
      transform .2s ease,
      box-shadow .2s ease,
      border-color .2s ease;
  }

  .bookmark-card:hover {
    transform: translateY(-3px);
    border-color: rgba(124,58,237,.34) !important;
    box-shadow: 0 22px 44px rgba(76,29,149,.13);
  }

  .bookmark-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 18px;
  }

  .bookmark-subject-wrap {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 13px;
  }

  .bookmark-number {
    width: 46px;
    height: 46px;
    flex: 0 0 46px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 950;
  }

  .bookmark-label,
  .bookmark-question-label {
    display: block;
    font-size: 10px;
    font-weight: 850;
    letter-spacing: .6px;
    text-transform: uppercase;
  }

  .bookmark-subject-wrap h3 {
    margin: 4px 0 0;
    font-size: 18px;
    line-height: 1.2;
    font-weight: 900;
  }

  .bookmark-saved-badge {
    padding: 7px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 850;
    white-space: nowrap;
  }

  .bookmark-question-box {
    min-height: 132px;
    padding: 18px;
    border-radius: 18px;
    box-sizing: border-box;
  }

  .bookmark-question-box p {
    margin: 8px 0 0;
    font-size: 15px;
    line-height: 1.65;
    font-weight: 700;
  }

  .bookmark-card-bottom {
    margin-top: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
  }

  .bookmark-card-bottom > span {
    font-size: 12px;
    line-height: 1.45;
  }

  .bookmark-remove-button {
    padding: 10px 13px;
    border-radius: 12px;
    cursor: pointer;
    font: inherit;
    font-size: 12px;
    font-weight: 900;
    white-space: nowrap;
    transition:
      transform .18s ease,
      opacity .18s ease;
  }

  .bookmark-remove-button:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  .bookmark-remove-button:disabled {
    cursor: not-allowed;
  }

  .bookmarks-empty,
  .bookmarks-loading-card {
    min-height: 310px;
    padding: 30px;
    border-radius: 24px;
    box-sizing: border-box;
    box-shadow: 0 18px 38px rgba(0,0,0,.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .bookmarks-empty-icon {
    width: 58px;
    height: 58px;
    margin-bottom: 13px;
    border-radius: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 27px;
  }

  .bookmarks-empty h2,
  .bookmarks-loading-card h2 {
    margin: 0;
    font-size: 22px;
    font-weight: 950;
  }

  .bookmarks-empty p,
  .bookmarks-loading-card p {
    max-width: 430px;
    margin: 8px 0 0;
    font-size: 14px;
    line-height: 1.6;
  }

  .bookmarks-loader {
    width: 42px;
    height: 42px;
    margin-bottom: 16px;
    border: 4px solid;
    border-radius: 50%;
    animation: bookmarksSpin .8s linear infinite;
  }

  @keyframes bookmarksSpin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 980px) {
    .bookmarks-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 820px) {
    .bookmarks-page {
      padding: 28px 22px;
    }

    .bookmarks-top-row,
    .bookmarks-hero {
      flex-direction: column;
      align-items: stretch;
    }

    .bookmarks-hero-stat {
      min-width: 0;
      width: 100%;
      box-sizing: border-box;
    }
  }

  @media (max-width: 560px) {
    .bookmarks-page {
      padding: 22px 14px;
    }

    .bookmarks-top-row h1 {
      font-size: 33px;
    }

    .bookmarks-hero {
      padding: 26px;
      border-radius: 22px;
    }

    .bookmarks-hero h2 {
      font-size: 30px;
    }

    .bookmark-card {
      padding: 20px;
      border-radius: 20px;
    }

    .bookmark-card-top,
    .bookmark-card-bottom {
      flex-direction: column;
      align-items: stretch;
    }

    .bookmark-saved-badge {
      width: fit-content;
    }

    .bookmark-remove-button {
      width: 100%;
    }

    .bookmarks-usage-top {
      flex-direction: column;
      align-items: stretch;
    }

    .bookmarks-upgrade-button {
      width: 100%;
    }
  }
`;