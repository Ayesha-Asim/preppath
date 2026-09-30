import { useTheme } from "../../context/ThemeContext";

type Test = {
  id: string;
  created_at: string;
};

type Props = {
  tests: Test[];
};

function getDateKey(date: Date) {
  return date.toISOString().split("T")[0];
}

export default function StudyActivity({ tests }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    card: isDark ? "#17101F" : "#FFFFFF",
    cardSoft: isDark ? "#21152D" : "#FAF8FE",
    text: isDark ? "#FFFFFF" : "#15111C",
    muted: isDark ? "#C8BCD3" : "#6E6476",
    border: isDark ? "rgba(171,132,255,.17)" : "#E4DDED",
    purple: "#7C3AED",
    purpleDark: "#4C1D95",
    purpleSoft: isDark ? "rgba(124,58,237,.16)" : "#F0E9FF",
    orange: "#F97316",
    green: "#22C55E",
  };

  const activityDates = new Set(
    tests.map((test) =>
      getDateKey(new Date(test.created_at))
    )
  );

  const today = new Date();

  let currentStreak = 0;
  let checkDate = new Date(today);

  while (activityDates.has(getDateKey(checkDate))) {
    currentStreak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  let longestStreak = 0;
  let runningStreak = 0;

  const sortedDates = Array.from(activityDates).sort();

  for (let i = 0; i < sortedDates.length; i++) {
    if (i === 0) {
      runningStreak = 1;
    } else {
      const previous = new Date(sortedDates[i - 1]);
      const current = new Date(sortedDates[i]);

      const difference =
        (current.getTime() - previous.getTime()) /
        (1000 * 60 * 60 * 24);

      if (difference === 1) {
        runningStreak++;
      } else {
        runningStreak = 1;
      }
    }

    longestStreak = Math.max(
      longestStreak,
      runningStreak
    );
  }

  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - 6);

  const weekTests = tests.filter(
    (test) => new Date(test.created_at) >= weekStart
  ).length;

  const days = Array.from(
    { length: 7 },
    (_, index) => {
      const date = new Date(weekStart);

      date.setDate(
        weekStart.getDate() + index
      );

      return {
        date,
        active: activityDates.has(
          getDateKey(date)
        ),
      };
    }
  );

  return (
    <>
      <section
        className="study-activity-card"
        style={{
          background: colors.card,
          color: colors.text,
          border: `1px solid ${colors.border}`,
        }}
      >
        <div className="study-activity-header">
          <div>
            <span
              className="study-activity-eyebrow"
              style={{ color: colors.purple }}
            >
              Consistency
            </span>

            <h2>Study Activity</h2>

            <p style={{ color: colors.muted }}>
              Your practice consistency over the last 7 days.
            </p>
          </div>

          <div
            className="study-activity-week-pill"
            style={{
              background: colors.purpleSoft,
              color: colors.purple,
            }}
          >
            {weekTests} test{weekTests !== 1 ? "s" : ""} this week
          </div>
        </div>

        <div className="study-activity-days">
          {days.map((day) => (
            <div
              key={day.date.toISOString()}
              className="study-activity-day"
            >
              <span
                className="study-activity-day-name"
                style={{ color: colors.muted }}
              >
                {day.date.toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </span>

              <div
                className="study-activity-day-box"
                style={
                  day.active
                    ? {
                        background:
                          "linear-gradient(135deg,#7C3AED,#4C1D95)",
                        color: "#FFFFFF",
                        border: "1px solid rgba(124,58,237,.8)",
                        boxShadow:
                          "0 10px 22px rgba(124,58,237,.20)",
                      }
                    : {
                        background: colors.cardSoft,
                        color: colors.muted,
                        border: `1px solid ${colors.border}`,
                      }
                }
              >
                {day.active ? "✓" : "—"}
              </div>
            </div>
          ))}
        </div>

        <div
          className="study-activity-stats"
          style={{ borderTop: `1px solid ${colors.border}` }}
        >
          <div>
            <span style={{ color: colors.muted }}>
              Current Streak
            </span>

            <strong>
              <b style={{ color: colors.orange }}>🔥</b>{" "}
              {currentStreak} day
              {currentStreak !== 1 ? "s" : ""}
            </strong>
          </div>

          <div>
            <span style={{ color: colors.muted }}>
              Longest Streak
            </span>

            <strong>
              <b style={{ color: colors.green }}>♕</b>{" "}
              {longestStreak} day
              {longestStreak !== 1 ? "s" : ""}
            </strong>
          </div>

          <div>
            <span style={{ color: colors.muted }}>
              Tests This Week
            </span>

            <strong style={{ color: colors.purple }}>
              {weekTests}
            </strong>
          </div>
        </div>
      </section>

      <style>{`
        .study-activity-card {
          width: 100%;
          border-radius: 24px;
          padding: 26px;
          box-sizing: border-box;
          box-shadow: 0 16px 35px rgba(0,0,0,.08);
        }

        .study-activity-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 24px;
        }

        .study-activity-eyebrow {
          display: block;
          margin-bottom: 6px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .8px;
          text-transform: uppercase;
        }

        .study-activity-header h2 {
          margin: 0;
          font-size: 26px;
          font-weight: 950;
          letter-spacing: -.4px;
        }

        .study-activity-header p {
          margin: 6px 0 0;
          font-size: 15px;
          line-height: 1.5;
        }

        .study-activity-week-pill {
          padding: 8px 11px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 850;
          white-space: nowrap;
        }

        .study-activity-days {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          gap: 10px;
        }

        .study-activity-day {
          min-width: 0;
          text-align: center;
        }

        .study-activity-day-name {
          display: block;
          margin-bottom: 8px;
          font-size: 11px;
          font-weight: 750;
        }

        .study-activity-day-box {
          min-height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 900;
          transition:
            transform .18s ease,
            box-shadow .18s ease;
        }

        .study-activity-day-box:hover {
          transform: translateY(-2px);
        }

        .study-activity-stats {
          margin-top: 24px;
          padding-top: 22px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .study-activity-stats > div {
          min-width: 0;
        }

        .study-activity-stats span {
          display: block;
          font-size: 12px;
          font-weight: 700;
        }

        .study-activity-stats strong {
          display: block;
          margin-top: 6px;
          font-size: 20px;
          font-weight: 950;
          line-height: 1.2;
        }

        .study-activity-stats b {
          font-size: 18px;
        }

        @media (max-width: 720px) {
          .study-activity-header {
            flex-direction: column;
          }

          .study-activity-days {
            gap: 7px;
          }

          .study-activity-day-box {
            min-height: 46px;
            border-radius: 12px;
          }

          .study-activity-stats {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .study-activity-card {
            padding: 20px;
            border-radius: 20px;
          }

          .study-activity-day-name {
            font-size: 9px;
          }

          .study-activity-day-box {
            min-height: 40px;
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}
