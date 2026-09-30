import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

export default function PerformanceChart({ tests }: Props) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    card: isDark ? "#17101F" : "#FFFFFF",
    cardSoft: isDark ? "#21152D" : "#FAF8FE",
    text: isDark ? "#FFFFFF" : "#15111C",
    muted: isDark ? "#C8BCD3" : "#6E6476",
    border: isDark ? "rgba(171,132,255,.17)" : "#E4DDED",
    grid: isDark ? "rgba(200,188,211,.12)" : "#E8E0EE",
    purple: "#7C3AED",
    purpleDark: "#4C1D95",
    purpleSoft: isDark ? "rgba(124,58,237,.16)" : "#F0E9FF",
  };

  const chartData = [...tests]
    .reverse()
    .map((test) => ({
      date: new Date(test.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      subject: test.subject,
      percentage:
        test.total_questions > 0
          ? Math.round((test.score / test.total_questions) * 100)
          : 0,
    }));

  const average =
    chartData.length > 0
      ? Math.round(
          chartData.reduce((sum, item) => sum + item.percentage, 0) /
            chartData.length
        )
      : 0;

  return (
    <>
      <section
        className="performance-chart-card"
        style={{
          background: colors.card,
          color: colors.text,
          border: `1px solid ${colors.border}`,
        }}
      >
        <div className="performance-chart-header">
          <div>
            <span
              className="performance-chart-eyebrow"
              style={{ color: colors.purple }}
            >
              Progress trend
            </span>

            <h2>Performance Over Time</h2>

            <p style={{ color: colors.muted }}>
              Track how your scores are changing across recent tests.
            </p>
          </div>

          {chartData.length > 0 && (
            <div
              className="performance-chart-average"
              style={{
                background: colors.purpleSoft,
                color: colors.purple,
              }}
            >
              <span>Average</span>
              <strong>{average}%</strong>
            </div>
          )}
        </div>

        {chartData.length === 0 ? (
          <div
            className="performance-chart-empty"
            style={{
              background: colors.cardSoft,
              border: `1px dashed ${colors.border}`,
            }}
          >
            <div
              className="performance-chart-empty-icon"
              style={{
                background: colors.purpleSoft,
                color: colors.purple,
              }}
            >
              ↗
            </div>

            <h3>No performance data yet</h3>

            <p style={{ color: colors.muted }}>
              Take a test and your score trend will appear here.
            </p>
          </div>
        ) : (
          <div className="performance-chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 16,
                  right: 18,
                  left: 0,
                  bottom: 4,
                }}
              >
                <CartesianGrid
                  strokeDasharray="4 6"
                  stroke={colors.grid}
                  vertical={false}
                />

                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: colors.muted,
                    fontSize: 12,
                    fontWeight: 650,
                  }}
                  dy={8}
                />

                <YAxis
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}%`}
                  tick={{
                    fill: colors.muted,
                    fontSize: 12,
                    fontWeight: 650,
                  }}
                  width={42}
                />

                <Tooltip
                  cursor={{
                    stroke: colors.purple,
                    strokeOpacity: 0.2,
                    strokeWidth: 2,
                  }}
                  contentStyle={{
                    backgroundColor: colors.cardSoft,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "14px",
                    color: colors.text,
                    boxShadow: isDark
                      ? "0 18px 35px rgba(0,0,0,.28)"
                      : "0 18px 35px rgba(76,29,149,.12)",
                    padding: "10px 12px",
                  }}
                  labelStyle={{
                    color: colors.text,
                    fontWeight: 800,
                    marginBottom: 4,
                  }}
                  itemStyle={{
                    color: colors.purple,
                    fontWeight: 800,
                  }}
                  formatter={(value, _name, props) => [
                    `${value}%`,
                    props?.payload?.subject || "Score",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke={colors.purple}
                  strokeWidth={4}
                  dot={{
                    r: 5,
                    fill: colors.purple,
                    stroke: colors.card,
                    strokeWidth: 3,
                  }}
                  activeDot={{
                    r: 7,
                    fill: colors.purpleDark,
                    stroke: colors.card,
                    strokeWidth: 3,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      <style>{`
        .performance-chart-card {
          width: 100%;
          border-radius: 24px;
          padding: 26px;
          box-sizing: border-box;
          box-shadow: 0 16px 35px rgba(0,0,0,.08);
        }

        .performance-chart-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 18px;
        }

        .performance-chart-eyebrow {
          display: block;
          margin-bottom: 6px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .8px;
          text-transform: uppercase;
        }

        .performance-chart-header h2 {
          margin: 0;
          font-size: 26px;
          font-weight: 950;
          letter-spacing: -.4px;
        }

        .performance-chart-header p {
          margin: 6px 0 0;
          font-size: 15px;
          line-height: 1.5;
        }

        .performance-chart-average {
          min-width: 92px;
          padding: 9px 12px;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: right;
        }

        .performance-chart-average span {
          font-size: 10px;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: .5px;
        }

        .performance-chart-average strong {
          font-size: 20px;
          font-weight: 950;
        }

        .performance-chart-wrap {
          width: 100%;
          height: 330px;
        }

        .performance-chart-empty {
          height: 300px;
          border-radius: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-sizing: border-box;
          padding: 26px;
        }

        .performance-chart-empty-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
          margin-bottom: 10px;
        }

        .performance-chart-empty h3 {
          margin: 0;
          font-size: 17px;
          font-weight: 900;
        }

        .performance-chart-empty p {
          margin: 7px 0 0;
          font-size: 13px;
        }

        @media (max-width: 640px) {
          .performance-chart-card {
            padding: 20px;
            border-radius: 20px;
          }

          .performance-chart-header {
            flex-direction: column;
          }

          .performance-chart-wrap {
            height: 290px;
          }

          .performance-chart-average {
            text-align: left;
          }
        }
      `}</style>
    </>
  );
}
