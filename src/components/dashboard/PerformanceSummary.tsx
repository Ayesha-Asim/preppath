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

export default function PerformanceSummary({ tests }: Props) {
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
    greenSoft: isDark ? "rgba(34,197,94,.14)" : "#ECFDF3",
    orange: "#F97316",
    orangeSoft: isDark ? "rgba(249,115,22,.14)" : "#FFF3E8",
  };

  const totalScore = tests.reduce(
    (sum, test) => sum + test.score,
    0
  );

  const totalQuestions = tests.reduce(
    (sum, test) => sum + test.total_questions,
    0
  );

  const averageAccuracy =
    totalQuestions > 0
      ? Math.round((totalScore / totalQuestions) * 100)
      : 0;

  const personalBest =
    tests.length > 0
      ? Math.max(
          ...tests.map((test) =>
            test.total_questions > 0
              ? (test.score / test.total_questions) * 100
              : 0
          )
        )
      : 0;

  const subjectData: Record<
    string,
    {
      score: number;
      questions: number;
    }
  > = {};

  tests.forEach((test) => {
    if (!subjectData[test.subject]) {
      subjectData[test.subject] = {
        score: 0,
        questions: 0,
      };
    }

    subjectData[test.subject].score += test.score;
    subjectData[test.subject].questions +=
      test.total_questions;
  });

  const subjects = Object.entries(subjectData)
    .map(([subject, data]) => ({
      subject,
      percentage:
        data.questions > 0
          ? (data.score / data.questions) * 100
          : 0,
    }))
    .sort((a, b) => b.percentage - a.percentage);

  const bestSubject = subjects[0];
  const weakestSubject = subjects[subjects.length - 1];

  const cards = [
    {
      label: "Average Accuracy",
      value: `${averageAccuracy}%`,
      helper: "Across all tests",
      icon: "◎",
      accent: colors.purple,
      soft: colors.purpleSoft,
    },
    {
      label: "Best Subject",
      value: bestSubject?.subject ?? "—",
      helper:
        tests.length > 0
          ? `${Math.round(bestSubject?.percentage ?? 0)}% average`
          : "No subject data yet",
      icon: "♕",
      accent: colors.green,
      soft: colors.greenSoft,
    },
    {
      label: "Weakest Subject",
      value: weakestSubject?.subject ?? "—",
      helper:
        tests.length > 0
          ? `${Math.round(weakestSubject?.percentage ?? 0)}% average`
          : "No subject data yet",
      icon: "!",
      accent: colors.orange,
      soft: colors.orangeSoft,
    },
    {
      label: "Personal Best",
      value: `${Math.round(personalBest)}%`,
      helper: "Highest test score",
      icon: "✦",
      accent: colors.purple,
      soft: colors.purpleSoft,
    },
  ];

  return (
    <>
      <div className="performance-summary-grid">
        {cards.map((card) => (
          <article
            key={card.label}
            className="performance-summary-card"
            style={{
              background: colors.card,
              color: colors.text,
              border: `1px solid ${colors.border}`,
            }}
          >
            <div className="performance-summary-top">
              <div>
                <span
                  className="performance-summary-label"
                  style={{ color: colors.muted }}
                >
                  {card.label}
                </span>

                <strong
                  className="performance-summary-value"
                  style={{
                    color:
                      card.label === "Personal Best"
                        ? colors.purple
                        : colors.text,
                  }}
                >
                  {card.value}
                </strong>

                <span
                  className="performance-summary-helper"
                  style={{
                    color:
                      card.label === "Best Subject"
                        ? colors.green
                        : card.label === "Weakest Subject"
                        ? colors.orange
                        : colors.muted,
                  }}
                >
                  {card.helper}
                </span>
              </div>

              <div
                className="performance-summary-icon"
                style={{
                  background: card.soft,
                  color: card.accent,
                }}
              >
                {card.icon}
              </div>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .performance-summary-grid {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .performance-summary-card {
          min-height: 160px;
          padding: 22px;
          border-radius: 20px;
          box-sizing: border-box;
          box-shadow: 0 14px 30px rgba(0,0,0,.07);
          transition:
            transform .18s ease,
            border-color .18s ease,
            box-shadow .18s ease;
        }

        .performance-summary-card:hover {
          transform: translateY(-2px);
          border-color: rgba(124,58,237,.34) !important;
          box-shadow: 0 18px 34px rgba(76,29,149,.10);
        }

        .performance-summary-top {
          height: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }

        .performance-summary-top > div:first-child {
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .performance-summary-label {
          font-size: 13px;
          font-weight: 750;
        }

        .performance-summary-value {
          margin-top: 10px;
          font-size: 28px;
          line-height: 1.08;
          font-weight: 950;
          letter-spacing: -.5px;
          overflow-wrap: anywhere;
        }

        .performance-summary-helper {
          margin-top: 8px;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.4;
        }

        .performance-summary-icon {
          width: 48px;
          height: 48px;
          flex: 0 0 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
          font-weight: 950;
        }

        @media (max-width: 1100px) {
          .performance-summary-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 620px) {
          .performance-summary-grid {
            grid-template-columns: 1fr;
          }

          .performance-summary-card {
            min-height: 145px;
          }
        }
      `}</style>
    </>
  );
}
