import { useTheme } from "../../context/ThemeContext";

type Test = {
  id: string;
  subject: string;
  score: number;
  total_questions: number;
  created_at: string;
};

type Props = {
  tests: Test[];
};

export default function RecentTests({ tests }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    card: isDark ? "#17101F" : "#FFFFFF",
    cardSoft: isDark ? "#21152D" : "#FAF8FE",
    text: isDark ? "#FFFFFF" : "#15111C",
    muted: isDark ? "#C8BCD3" : "#6E6476",
    border: isDark ? "rgba(171,132,255,.17)" : "#E4DDED",
    purple: "#7C3AED",
    purpleSoft: isDark ? "rgba(124,58,237,.16)" : "#F0E9FF",
    green: "#22C55E",
    orange: "#F97316",
    red: "#EF4444",
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 70) return colors.green;
    if (percentage >= 40) return colors.orange;
    return colors.red;
  };

  return (
    <>
      <section
        className="recent-tests-card"
        style={{
          background: colors.card,
          color: colors.text,
          border: `1px solid ${colors.border}`,
        }}
      >
        <div className="recent-tests-header">
          <div>
            <span
              className="recent-tests-eyebrow"
              style={{ color: colors.purple }}
            >
              Recent activity
            </span>

            <h2>Recent Tests</h2>

            <p style={{ color: colors.muted }}>
              Your latest practice sessions and scores.
            </p>
          </div>

          {tests.length > 0 && (
            <div
              className="recent-tests-count"
              style={{
                background: colors.purpleSoft,
                color: colors.purple,
              }}
            >
              {tests.length} recent
            </div>
          )}
        </div>

        {tests.length === 0 ? (
          <div
            className="recent-tests-empty"
            style={{
              background: colors.cardSoft,
              border: `1px dashed ${colors.border}`,
            }}
          >
            <div
              className="recent-tests-empty-icon"
              style={{
                background: colors.purpleSoft,
                color: colors.purple,
              }}
            >
              ✎
            </div>

            <h3>No tests taken yet</h3>

            <p style={{ color: colors.muted }}>
              Complete a practice test and your latest results will appear here.
            </p>
          </div>
        ) : (
          <div className="recent-tests-list">
            {tests.map((test, index) => {
              const percentage =
                test.total_questions > 0
                  ? Math.round((test.score / test.total_questions) * 100)
                  : 0;

              const scoreColor = getScoreColor(percentage);

              return (
                <div
                  key={test.id}
                  className="recent-test-row"
                  style={{
                    borderTop:
                      index === 0
                        ? "none"
                        : `1px solid ${colors.border}`,
                  }}
                >
                  <div className="recent-test-main">
                    <div
                      className="recent-test-icon"
                      style={{
                        background: colors.purpleSoft,
                        color: colors.purple,
                      }}
                    >
                      {test.subject.charAt(0).toUpperCase()}
                    </div>

                    <div className="recent-test-copy">
                      <h3>{test.subject}</h3>

                      <p style={{ color: colors.muted }}>
                        {test.score}/{test.total_questions} questions correct
                      </p>
                    </div>
                  </div>

                  <div className="recent-test-score">
                    <strong style={{ color: scoreColor }}>
                      {percentage}%
                    </strong>

                    <span style={{ color: colors.muted }}>
                      {new Date(test.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <style>{`
        .recent-tests-card {
          width: 100%;
          border-radius: 24px;
          padding: 26px;
          box-sizing: border-box;
          box-shadow: 0 16px 35px rgba(0,0,0,.08);
        }

        .recent-tests-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 20px;
        }

        .recent-tests-eyebrow {
          display: block;
          margin-bottom: 6px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .8px;
          text-transform: uppercase;
        }

        .recent-tests-header h2 {
          margin: 0;
          font-size: 26px;
          font-weight: 950;
          letter-spacing: -.4px;
        }

        .recent-tests-header p {
          margin: 6px 0 0;
          font-size: 15px;
          line-height: 1.5;
        }

        .recent-tests-count {
          padding: 8px 11px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 850;
          white-space: nowrap;
        }

        .recent-tests-list {
          display: grid;
        }

        .recent-test-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 17px 0;
        }

        .recent-test-main {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .recent-test-icon {
          width: 48px;
          height: 48px;
          flex: 0 0 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 950;
        }

        .recent-test-copy {
          min-width: 0;
        }

        .recent-test-copy h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 850;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .recent-test-copy p {
          margin: 5px 0 0;
          font-size: 13px;
        }

        .recent-test-score {
          flex: 0 0 auto;
          text-align: right;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .recent-test-score strong {
          font-size: 20px;
          font-weight: 950;
        }

        .recent-test-score span {
          font-size: 11px;
          font-weight: 650;
        }

        .recent-tests-empty {
          min-height: 230px;
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 26px;
          text-align: center;
          box-sizing: border-box;
        }

        .recent-tests-empty-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
          margin-bottom: 10px;
        }

        .recent-tests-empty h3 {
          margin: 0;
          font-size: 17px;
          font-weight: 900;
        }

        .recent-tests-empty p {
          max-width: 420px;
          margin: 7px 0 0;
          font-size: 13px;
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .recent-tests-card {
            padding: 18px 16px;
            border-radius: 20px;
            }

            .recent-tests-header {
              flex-direction: column;
              gap: 12px;
            }

            .recent-test-row {
              display: grid;
              grid-template-columns: minmax(0, 1fr) auto;
              align-items: start;
              gap: 10px;
              padding: 16px 0;
            }

            .recent-test-main {
              min-width: 0;
              align-items: flex-start;
              gap: 10px;
            }

            .recent-test-icon {
              width: 40px;
              height: 40px;
              flex-basis: 40px;
              border-radius: 11px;
            }

            .recent-test-copy {
              min-width: 0;
              padding-top: 1px;
            }

            .recent-test-copy h3 {
              white-space: normal;
              overflow: visible;
              text-overflow: clip;
              font-size: 14px;
              line-height: 1.3;
              overflow-wrap: anywhere;
            }

            .recent-test-copy p {
              margin-top: 4px;
              font-size: 11px;
              line-height: 1.4;
            }

            .recent-test-score {
              min-width: 66px;
              text-align: right;
              gap: 3px;
            }

            .recent-test-score strong {
              font-size: 17px;
              line-height: 1.2;
            } 

            .recent-test-score span {
              font-size: 9px;
              line-height: 1.3;
              white-space: nowrap;
            }
          }
      `}</style>
    </>
  );
}
