import { useTheme } from "../../context/ThemeContext";

type Test = {
  id: string;
  subject: string;
  score: number;
  total_questions: number;
};

type Props = {
  tests: Test[];
};

export default function SubjectPerformance({
  tests,
}: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    card: isDark ? "#17101F" : "#FFFFFF",
    cardSoft: isDark ? "#21152D" : "#FAF8FE",
    text: isDark ? "#FFFFFF" : "#15111C",
    muted: isDark ? "#C8BCD3" : "#6E6476",
    border: isDark ? "rgba(171,132,255,.17)" : "#E4DDED",
    track: isDark ? "rgba(255,255,255,.07)" : "#EEE8F2",
    purple: "#7C3AED",
    purpleDark: "#4C1D95",
    purpleSoft: isDark ? "rgba(124,58,237,.16)" : "#F0E9FF",
  };

  const subjectData: Record<
    string,
    {
      totalScore: number;
      totalQuestions: number;
    }
  > = {};

  tests.forEach((test) => {
    if (!subjectData[test.subject]) {
      subjectData[test.subject] = {
        totalScore: 0,
        totalQuestions: 0,
      };
    }

    subjectData[test.subject].totalScore +=
      test.score;

    subjectData[test.subject].totalQuestions +=
      test.total_questions;
  });

  const subjects = Object.entries(subjectData)
    .map(([subject, data]) => ({
      subject,
      percentage:
        data.totalQuestions > 0
          ? Math.round(
              (data.totalScore /
                data.totalQuestions) *
                100
            )
          : 0,
    }))
    .sort(
      (a, b) => b.percentage - a.percentage
    );

  return (
    <>
      <section
        className="subject-performance-card"
        style={{
          background: colors.card,
          color: colors.text,
          border: `1px solid ${colors.border}`,
        }}
      >
        <div className="subject-performance-header">
          <div>
            <span
              className="subject-performance-eyebrow"
              style={{ color: colors.purple }}
            >
              Subject breakdown
            </span>

            <h2>Subject Performance</h2>

            <p style={{ color: colors.muted }}>
              Your average accuracy across each subject.
            </p>
          </div>

          {subjects.length > 0 && (
            <div
              className="subject-performance-count"
              style={{
                background: colors.purpleSoft,
                color: colors.purple,
              }}
            >
              {subjects.length} subject
              {subjects.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        {subjects.length === 0 ? (
          <div
            className="subject-performance-empty"
            style={{
              background: colors.cardSoft,
              border: `1px dashed ${colors.border}`,
            }}
          >
            <div
              className="subject-performance-empty-icon"
              style={{
                background: colors.purpleSoft,
                color: colors.purple,
              }}
            >
              ∑
            </div>

            <h3>No subject data yet</h3>

            <p style={{ color: colors.muted }}>
              Take a test to see your subject-by-subject performance.
            </p>
          </div>
        ) : (
          <div className="subject-performance-list">
            {subjects.map((subject, index) => (
              <div
                key={subject.subject}
                className="subject-performance-row"
                style={{
                  borderTop:
                    index === 0
                      ? "none"
                      : `1px solid ${colors.border}`,
                }}
              >
                <div className="subject-performance-info">
                  <div>
                    <span className="subject-performance-name">
                      {subject.subject}
                    </span>

                    <span
                      className="subject-performance-rank"
                      style={{ color: colors.muted }}
                    >
                      #{index + 1}
                    </span>
                  </div>

                  <strong
                    style={{
                      color:
                        subject.percentage >= 70
                          ? "#22C55E"
                          : subject.percentage >= 40
                          ? "#F97316"
                          : "#EF4444",
                    }}
                  >
                    {subject.percentage}%
                  </strong>
                </div>

                <div
                  className="subject-performance-track"
                  style={{ background: colors.track }}
                >
                  <div
                    className="subject-performance-fill"
                    style={{
                      width: `${subject.percentage}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        .subject-performance-card {
          width: 100%;
          border-radius: 24px;
          padding: 26px;
          box-sizing: border-box;
          box-shadow: 0 16px 35px rgba(0,0,0,.08);
        }

        .subject-performance-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 22px;
        }

        .subject-performance-eyebrow {
          display: block;
          margin-bottom: 6px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .8px;
          text-transform: uppercase;
        }

        .subject-performance-header h2 {
          margin: 0;
          font-size: 26px;
          font-weight: 950;
          letter-spacing: -.4px;
        }

        .subject-performance-header p {
          margin: 6px 0 0;
          font-size: 15px;
          line-height: 1.5;
        }

        .subject-performance-count {
          padding: 8px 11px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 850;
          white-space: nowrap;
        }

        .subject-performance-list {
          display: grid;
        }

        .subject-performance-row {
          padding: 17px 0;
        }

        .subject-performance-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 10px;
        }

        .subject-performance-info > div {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }

        .subject-performance-name {
          font-size: 15px;
          font-weight: 850;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .subject-performance-rank {
          font-size: 10px;
          font-weight: 750;
        }

        .subject-performance-info strong {
          font-size: 16px;
          font-weight: 950;
        }

        .subject-performance-track {
          width: 100%;
          height: 11px;
          overflow: hidden;
          border-radius: 999px;
        }

        .subject-performance-fill {
          height: 100%;
          border-radius: inherit;
          background:
            linear-gradient(
              90deg,
              #4C1D95 0%,
              #6D28D9 48%,
              #7C3AED 72%,
              #A78BFA 100%
            );
          transition: width .7s ease;
        }

        .subject-performance-empty {
          min-height: 230px;
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 26px;
          box-sizing: border-box;
        }

        .subject-performance-empty-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 10px;
        }

        .subject-performance-empty h3 {
          margin: 0;
          font-size: 17px;
          font-weight: 900;
        }

        .subject-performance-empty p {
          max-width: 420px;
          margin: 7px 0 0;
          font-size: 13px;
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .subject-performance-card {
            padding: 20px;
            border-radius: 20px;
          }

          .subject-performance-header {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
