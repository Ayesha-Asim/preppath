import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import AddQuestion from "../components/AddQuestion";
import Loading from "../components/common/Loading";
import { supabase } from "../lib/supabase";
import ManageQuestions from "../components/ManageQuestions";

type AdminStats = {
  users: number;
  tests: number;
  questions: number;
};

const statCards = [
  {
    key: "users" as const,
    title: "Total Users",
    icon: "👥",
    description: "Registered PrepPath users",
  },
  {
    key: "tests" as const,
    title: "Tests Completed",
    icon: "📝",
    description: "Recorded test attempts",
  },
  {
    key: "questions" as const,
    title: "Question Bank",
    icon: "📚",
    description: "Questions available for tests",
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    users: 0,
    tests: 0,
    questions: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    setLoading(true);

    const [
      usersResult,
      testsResult,
      questionsResult,
    ] = await Promise.all([
      supabase
        .from("profiles")
        .select("*", {
          count: "exact",
          head: true,
        }),

      supabase
        .from("test_results")
        .select("*", {
          count: "exact",
          head: true,
        }),

      supabase
        .from("questions")
        .select("*", {
          count: "exact",
          head: true,
        }),
    ]);

    if (usersResult.error) {
      console.error(
        "Failed to load user count:",
        usersResult.error
      );
    }

    if (testsResult.error) {
      console.error(
        "Failed to load test count:",
        testsResult.error
      );
    }

    if (questionsResult.error) {
      console.error(
        "Failed to load question count:",
        questionsResult.error
      );
    }

    setStats({
      users: usersResult.count ?? 0,
      tests: testsResult.count ?? 0,
      questions: questionsResult.count ?? 0,
    });

    setLoading(false);
  }

  return (
    <MainLayout>
      <div
        className="
          min-h-screen
          w-full
          bg-[#F4F4FA]
          px-5
          py-8
          text-[#15111C]

          dark:bg-[#09070F]
          dark:text-white

          md:px-8
          lg:px-10
        "
      >
        {/* Page heading */}

        <div className="mb-7">
          <p
            className="
              mb-2
              text-xs
              font-extrabold
              uppercase
              tracking-[0.18em]
              text-[#7C3AED]
              dark:text-[#A78BFA]
            "
          >
            Administration
          </p>

          <h1
            className="
              m-0
              text-3xl
              font-extrabold
              tracking-[-0.03em]
              md:text-[38px]
            "
          >
            Admin Dashboard
          </h1>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-[#6E6476]
              dark:text-[#C8BCD3]
            "
          >
            Manage PrepPath content and keep an eye on
            platform activity.
          </p>
        </div>

        {/* Hero */}

        <section
          className="
            relative
            mb-7
            overflow-hidden
            rounded-[28px]
            bg-gradient-to-br
            from-[#2A0F50]
            via-[#4C1D95]
            to-[#6D28D9]
            px-6
            py-8
            text-white
            shadow-[0_18px_45px_rgba(76,29,149,0.20)]

            md:px-8
            md:py-9
          "
        >
          <div
            className="
              absolute
              -right-20
              -top-24
              h-64
              w-64
              rounded-full
              bg-white/5
            "
          />

          <div
            className="
              absolute
              -bottom-24
              right-36
              h-56
              w-56
              rounded-full
              bg-violet-300/10
              blur-xl
            "
          />

          <div className="relative max-w-2xl">
            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/15
                bg-white/10
                px-3.5
                py-2
                text-xs
                font-bold
                backdrop-blur
              "
            >
              🛠️ PREPPATH ADMIN
            </div>

            <h2
              className="
                m-0
                text-3xl
                font-extrabold
                tracking-[-0.03em]
                md:text-[38px]
                md:leading-[1.1]
              "
            >
              Keep PrepPath running smoothly.
            </h2>

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-6
                text-white/75
                md:text-[15px]
              "
            >
              Review platform activity, monitor usage, and
              expand the question bank from one place.
            </p>
          </div>
        </section>

        {/* Statistics */}

        <section className="mb-8">
          <div
            className="
              mb-4
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <h2
                className="
                  m-0
                  text-2xl
                  font-extrabold
                  tracking-[-0.02em]
                "
              >
                Platform Overview
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#6E6476]
                  dark:text-[#C8BCD3]
                "
              >
                Live totals from your PrepPath database.
              </p>
            </div>

            <button
              type="button"
              onClick={loadStats}
              disabled={loading}
              className="
                inline-flex
                min-h-[42px]
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#E4DDED]
                bg-white
                px-4
                py-2
                text-sm
                font-bold
                text-[#4C1D95]
                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:border-violet-400/50
                hover:bg-[#F0E9FF]

                disabled:cursor-not-allowed
                disabled:opacity-50

                dark:border-[rgba(171,132,255,0.17)]
                dark:bg-[#17101F]
                dark:text-[#C4B5FD]
                dark:hover:bg-[rgba(124,58,237,0.16)]
              "
            >
              <span
                className={
                  loading ? "animate-spin" : ""
                }
              >
                ↻
              </span>

              Refresh
            </button>
          </div>

          {loading ? (
            <div
              className="
                rounded-[24px]
                border
                border-[#E4DDED]
                bg-white

                dark:border-[rgba(171,132,255,0.17)]
                dark:bg-[#17101F]
              "
            >
              <Loading />
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >
              {statCards.map((card) => (
                <div
                  key={card.key}
                  className="
                    group
                    rounded-[22px]
                    border
                    border-[#E4DDED]
                    bg-white
                    p-5
                    shadow-[0_8px_28px_rgba(76,29,149,0.05)]
                    transition-all
                    duration-200

                    hover:-translate-y-1
                    hover:border-violet-400/40
                    hover:shadow-[0_16px_34px_rgba(76,29,149,0.10)]

                    dark:border-[rgba(171,132,255,0.17)]
                    dark:bg-[#17101F]
                    dark:shadow-[0_12px_30px_rgba(0,0,0,0.16)]
                    dark:hover:border-violet-500/30
                  "
                >
                  <div
                    className="
                      mb-5
                      flex
                      items-start
                      justify-between
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#F0E9FF]
                        text-2xl

                        dark:bg-[rgba(124,58,237,0.16)]
                      "
                    >
                      {card.icon}
                    </div>

                    <div
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-[#22C55E]
                        shadow-[0_0_10px_rgba(34,197,94,0.45)]
                      "
                      title="Live database statistic"
                    />
                  </div>

                  <div
                    className="
                      text-[34px]
                      font-extrabold
                      leading-none
                      tracking-[-0.04em]
                      text-[#15111C]
                      dark:text-white
                    "
                  >
                    {stats[card.key].toLocaleString()}
                  </div>

                  <h3
                    className="
                      mb-0
                      mt-3
                      text-base
                      font-bold
                      text-[#15111C]
                      dark:text-white
                    "
                  >
                    {card.title}
                  </h3>

                  <p
                    className="
                      mb-0
                      mt-1
                      text-xs
                      leading-5
                      text-[#6E6476]
                      dark:text-[#C8BCD3]
                    "
                  >
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Question management */}

        <section>
          <div className="mb-4">
            <h2
              className="
                m-0
                text-2xl
                font-extrabold
                tracking-[-0.02em]
              "
            >
              Question Management
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-[#6E6476]
                dark:text-[#C8BCD3]
              "
            >
              Add new questions directly to the PrepPath
              question bank.
            </p>
          </div>

          <AddQuestion />
        <ManageQuestions />
        </section>
      </div>
    </MainLayout>
  );
}