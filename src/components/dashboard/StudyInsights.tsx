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

export default function StudyInsights({
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
    purple: "#7C3AED",
    purpleSoft: isDark ? "rgba(124,58,237,.16)" : "#F0E9FF",
    green: "#22C55E",
    greenSoft: isDark ? "rgba(34,197,94,.14)" : "#ECFDF3",
    orange: "#F97316",
    orangeSoft: isDark ? "rgba(249,115,22,.14)" : "#FFF3E8",
    red: "#EF4444",
    redSoft: isDark ? "rgba(239,68,68,.14)" : "#FEF0F0",
  };

  if (tests.length === 0) {
    return (
      <>
        <section
          className="study-insights-card"
          style={{
            background: colors.card,
            color: colors.text,
            border: `1px solid ${colors.border}`,
          }}
        >
          <div className="study-insights-header">
            <div>
              <span
                className="study-insights-eyebrow"
                style={{ color: colors.purple }}
              >
                Personalized feedback
              </span>

              <h2>Study Insights</h2>

              <p style={{ color: colors.muted }}>
                Smart feedback based on your test performance.
              </p>
            </div>
          </div>

          <div
            className="study-insights-empty"
            style={{
              background: colors.cardSoft,
              border: `1px dashed ${colors.border}`,
            }}
          >
            <div
              className="study-insights-empty-icon"
              style={{
                background: colors.purpleSoft,
                color: colors.purple,
              }}
            >
              ✦
            </div>

            <h3>Take your first test</h3>

            <p style={{ color: colors.muted }}>
              Your personalized insights will appear here once you have test data.
            </p>
          </div>
        </section>

        <style>{`
          .study-insights-card {
            width: 100%;
            border-radius: 24px;
            padding: 26px;
            box-sizing: border-box;
            box-shadow: 0 16px 35px rgba(0,0,0,.08);
          }

          .study-insights-header {
            margin-bottom: 20px;
          }

          .study-insights-eyebrow {
            display: block;
            margin-bottom: 6px;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: .8px;
            text-transform: uppercase;
          }

          .study-insights-header h2 {
            margin: 0;
            font-size: 26px;
            font-weight: 950;
            letter-spacing: -.4px;
          }

          .study-insights-header p {
            margin: 6px 0 0;
            font-size: 15px;
            line-height: 1.5;
          }

          .study-insights-empty {
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

          .study-insights-empty-icon {
            width: 48px;
            height: 48px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 21px;
            margin-bottom: 10px;
          }

          .study-insights-empty h3 {
            margin: 0;
            font-size: 17px;
            font-weight: 900;
          }

          .study-insights-empty p {
            max-width: 420px;
            margin: 7px 0 0;
            font-size: 13px;
            line-height: 1.5;
          }

          @media (max-width: 640px) {
            .study-insights-card {
              padding: 20px;
              border-radius: 20px;
            }
          }
        `}</style>
      </>
    );
  }

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
  const weakestSubject =
    subjects[subjects.length - 1];

  const totalScore = tests.reduce(
    (sum, test) => sum + test.score,
    0
  );

  const totalQuestions = tests.reduce(
    (sum, test) => sum + test.total_questions,
    0
  );

  const overallAccuracy =
    totalQuestions > 0
      ? Math.round(
          (totalScore / totalQuestions) * 100
        )
      : 0;

  const sortedTests = [...tests].sort(
    (a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
  );

  const recentTests = sortedTests.slice(0, 3);
  const olderTests = sortedTests.slice(3);

  const getAccuracy = (testList: Test[]) => {
    const score = testList.reduce(
      (sum, test) => sum + test.score,
      0
    );

    const questions = testList.reduce(
      (sum, test) => sum + test.total_questions,
      0
    );

    return questions > 0
      ? (score / questions) * 100
      : 0;
  };

  const recentAccuracy =
    getAccuracy(recentTests);

  const olderAccuracy =
    getAccuracy(olderTests);

  const improvement =
    olderTests.length > 0
      ? recentAccuracy - olderAccuracy
      : 0;

  const insightCards = [
    {
      title: "Overall Performance",
      text: (
        <>
          Your overall accuracy is{" "}
          <strong>{overallAccuracy}%</strong> across{" "}
          {tests.length} test
          {tests.length !== 1 ? "s" : ""}.
        </>
      ),
      icon: "◎",
      accent: colors.purple,
      soft: colors.purpleSoft,
    },
    bestSubject
      ? {
          title: "Strongest Subject",
          text: (
            <>
              You're performing best in{" "}
              <strong>{bestSubject.subject}</strong> with an
              average of{" "}
              <strong>
                {Math.round(bestSubject.percentage)}%
              </strong>
              .
            </>
          ),
          icon: "♕",
          accent: colors.green,
          soft: colors.greenSoft,
        }
      : null,
    weakestSubject &&
    weakestSubject.subject !== bestSubject?.subject
      ? {
          title: "Focus Area",
          text: (
            <>
              Spend more time practicing{" "}
              <strong>{weakestSubject.subject}</strong>.
              Your current average is{" "}
              <strong>
                {Math.round(weakestSubject.percentage)}%
              </strong>
              .
            </>
          ),
          icon: "!",
          accent: colors.orange,
          soft: colors.orangeSoft,
        }
      : null,
    olderTests.length > 0
      ? {
          title:
            improvement > 0
              ? "Performance Improving"
              : improvement < 0
              ? "Performance Dropping"
              : "Performance Stable",
          text: (
            <>
              Your latest 3 tests are{" "}
              <strong>
                {Math.abs(Math.round(improvement))} percentage points
              </strong>{" "}
              {improvement > 0
                ? "higher"
                : improvement < 0
                ? "lower"
                : "similar"}{" "}
              than your earlier tests.
            </>
          ),
          icon:
            improvement > 0
              ? "↗"
              : improvement < 0
              ? "↘"
              : "→",
          accent:
            improvement > 0
              ? colors.green
              : improvement < 0
              ? colors.red
              : colors.purple,
          soft:
            improvement > 0
              ? colors.greenSoft
              : improvement < 0
              ? colors.redSoft
              : colors.purpleSoft,
        }
      : null,
  ].filter(Boolean);

  return (
    <>
      <section
        className="study-insights-card"
        style={{
          background: colors.card,
          color: colors.text,
          border: `1px solid ${colors.border}`,
        }}
      >
        <div className="study-insights-header">
          <div>
            <span
              className="study-insights-eyebrow"
              style={{ color: colors.purple }}
            >
              Personalized feedback
            </span>

            <h2>Study Insights</h2>

            <p style={{ color: colors.muted }}>
              Smart feedback based on your test performance.
            </p>
          </div>
        </div>

        <div className="study-insights-grid">
          {insightCards.map((insight: any) => (
            <article
              key={insight.title}
              className="study-insight-item"
              style={{
                background: insight.soft,
                border: `1px solid ${insight.accent}28`,
              }}
            >
              <div
                className="study-insight-icon"
                style={{
                  color: insight.accent,
                  background: `${insight.accent}12`,
                }}
              >
                {insight.icon}
              </div>

              <div>
                <h3>{insight.title}</h3>

                <p style={{ color: colors.muted }}>
                  {insight.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <style>{`
        .study-insights-card {
          width: 100%;
          border-radius: 24px;
          padding: 26px;
          box-sizing: border-box;
          box-shadow: 0 16px 35px rgba(0,0,0,.08);
        }

        .study-insights-header {
          margin-bottom: 20px;
        }

        .study-insights-eyebrow {
          display: block;
          margin-bottom: 6px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .8px;
          text-transform: uppercase;
        }

        .study-insights-header h2 {
          margin: 0;
          font-size: 26px;
          font-weight: 950;
          letter-spacing: -.4px;
        }

        .study-insights-header p {
          margin: 6px 0 0;
          font-size: 15px;
          line-height: 1.5;
        }

        .study-insights-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .study-insight-item {
          min-height: 142px;
          padding: 18px;
          border-radius: 18px;
          box-sizing: border-box;
          display: flex;
          align-items: flex-start;
          gap: 13px;
        }

        .study-insight-icon {
          width: 42px;
          height: 42px;
          flex: 0 0 42px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 950;
        }

        .study-insight-item h3 {
          margin: 1px 0 0;
          font-size: 16px;
          font-weight: 900;
        }

        .study-insight-item p {
          margin: 7px 0 0;
          font-size: 13px;
          line-height: 1.55;
        }

        .study-insights-empty {
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

        .study-insights-empty-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
          margin-bottom: 10px;
        }

        .study-insights-empty h3 {
          margin: 0;
          font-size: 17px;
          font-weight: 900;
        }

        .study-insights-empty p {
          max-width: 420px;
          margin: 7px 0 0;
          font-size: 13px;
          line-height: 1.5;
        }

        @media (max-width: 760px) {
          .study-insights-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .study-insights-card {
            padding: 20px;
            border-radius: 20px;
          }
        }
      `}</style>
    </>
  );
}
