import { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import AddQuestion from "../components/AddQuestion";
import Loading from "../components/common/Loading";
import { supabase } from "../lib/supabase";
import ManageQuestions from "../components/ManageQuestions";
import AdminChatInbox from "../components/AdminChatInbox";

type AdminStats = {
  users: number;
  tests: number;
  questions: number;
};

type StudyResourceStatus = "pending" | "approved" | "rejected";

type StudyResource = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  subject: string;
  resource_url: string;
  resource_type: "pdf" | "image" | "drive" | "youtube";
  status: StudyResourceStatus;
  created_at: string;
  reviewed_at: string | null;
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

  const [resources, setResources] = useState<StudyResource[]>([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);
  const [resourcesError, setResourcesError] = useState("");
  const [openingResourceId, setOpeningResourceId] = useState<string | null>(null);
  const [reviewingResourceId, setReviewingResourceId] = useState<string | null>(null);
  const [resourceFilter, setResourceFilter] =
  useState<"all" | StudyResourceStatus>("pending");
  const [stats, setStats] = useState<AdminStats>({
    users: 0,
    tests: 0,
    questions: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    loadResources();
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

  async function loadResources() {
    setResourcesLoading(true);
    setResourcesError("");

    const { data, error } = await supabase
      .from("study_resources")
      .select(
        "id,user_id,title,description,subject,resource_type,resource_url,status,created_at,reviewed_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load study resources:", error);
      setResourcesError(
        "Could not load study resources. Check your admin access and try again."
      );
    } else {
      setResources((data ?? []) as StudyResource[]);
    }

    setResourcesLoading(false);
  }

  async function openSubmittedResource(resource: StudyResource) {
    if (openingResourceId !== null) return;

    setResourcesError("");
    setOpeningResourceId(resource.id);

    try {
      if (
        resource.resource_type === "drive" ||
        resource.resource_type === "youtube"
      ) {
        const url = new URL(resource.resource_url);
        const host = url.hostname.toLowerCase();

        const allowed =
          resource.resource_type === "drive"
            ? ["drive.google.com", "docs.google.com"].includes(host)
            : [
                "youtube.com",
                "www.youtube.com",
                "m.youtube.com",
                "youtu.be",
              ].includes(host);

        if (url.protocol !== "https:" || !allowed) {
          throw new Error("Invalid resource link.");
        }

        window.open(url.href, "_blank", "noopener,noreferrer");
        return;
      }

      if (
        resource.resource_type !== "pdf" &&
        resource.resource_type !== "image"
      ) {
        throw new Error("Unsupported resource type.");
      }

      const { data, error } = await supabase.storage
        .from("study-resources")
        .download(resource.resource_url);

      if (error || !data) {
        throw error ?? new Error("File not found.");
      }

      const blob = new Blob([data], {
        type:
          resource.resource_type === "pdf"
            ? "application/pdf"
            : data.type === "image/png"
              ? "image/png"
              : "image/jpeg",
      });

      const objectUrl = URL.createObjectURL(blob);
      const preview = window.open(objectUrl, "_blank");

      if (!preview) {
        const anchor = document.createElement("a");
        anchor.href = objectUrl;
        anchor.download = `${
          resource.title
            .replace(/[^a-z0-9 _-]/gi, "")
            .slice(0, 80) || "resource"
        }.${
          resource.resource_type === "pdf"
            ? "pdf"
            : blob.type === "image/png"
              ? "png"
              : "jpg"
        }`;

        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
      }

      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
    } catch (caught) {
      setResourcesError(
        caught instanceof Error
          ? caught.message
          : "Unable to open submitted resource."
      );
    } finally {
      setOpeningResourceId(null);
    }
  }

async function reviewResource(
  resource: StudyResource,
  decision: "approved" | "rejected"
) {
  const confirmed = window.confirm(
    `Are you sure you want to ${
      decision === "approved" ? "approve" : "reject"
    } “${resource.title}”?`
  );

  if (!confirmed) return;

  setReviewingResourceId(resource.id);
  setResourcesError("");

  const { error } = await supabase.rpc("review_study_resource", {
    resource_id: resource.id,
    decision,
  });

  if (error) {
    console.error("Failed to review study resource:", error);
    setResourcesError(
      error.message || "Could not review this resource."
    );
  } else {
    await loadResources();
  }

  setReviewingResourceId(null);
}

function formatDate(value: string | null) {
  if (!value) return "—";

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
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

        {/* Student messages */}

          <AdminChatInbox />

        {/* Study resource moderation */}

<section className="mb-9">
  <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
    <div>
      <h2 className="text-2xl font-extrabold">Study Resource Review</h2>

      <p className="mt-1 text-sm text-[#6E6476] dark:text-[#C8BCD3]">
        Review student-submitted resources before they appear in the shared
        library.
      </p>
    </div>

    <button
      type="button"
      onClick={loadResources}
      disabled={resourcesLoading || reviewingResourceId !== null}
      className="rounded-xl border border-[#E4DDED] bg-white px-4 py-2 text-sm font-bold text-[#4C1D95] disabled:opacity-50 dark:border-violet-500/20 dark:bg-[#17101F] dark:text-[#C4B5FD]"
    >
      Refresh Resources
    </button>
  </div>

  <div className="overflow-hidden rounded-[26px] border border-[#E4DDED] bg-white dark:border-violet-500/20 dark:bg-[#17101F]">

    {/* Filters */}
    <div className="flex flex-wrap gap-2 border-b border-[#E4DDED] bg-[#FAF8FE] p-4 dark:border-violet-500/20 dark:bg-[#21152D]">
      {(["pending", "approved", "rejected", "all"] as const).map(
        (filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setResourceFilter(filter)}
            className={`rounded-xl px-3 py-2 text-xs font-extrabold capitalize ${
              resourceFilter === filter
                ? "bg-[#7C3AED] text-white"
                : "border border-[#E4DDED] bg-white text-[#6E6476] dark:border-violet-500/20 dark:bg-[#17101F] dark:text-[#C8BCD3]"
            }`}
          >
            {filter}
            {filter === "pending"
              ? ` (${
                  resources.filter(
                    (resource) => resource.status === "pending"
                  ).length
                })`
              : ""}
          </button>
        )
      )}
    </div>

    {/* Error */}
    {resourcesError && (
      <p
        role="alert"
        className="p-4 text-sm text-red-600 dark:text-red-300"
      >
        {resourcesError}
      </p>
    )}

    {/* Resources */}
    {resourcesLoading ? (
      <Loading />
    ) : (
      <div className="divide-y divide-[#E4DDED] dark:divide-violet-500/20">
        {resources.filter(
          (resource) =>
            resourceFilter === "all" ||
            resource.status === resourceFilter
        ).length === 0 ? (
          <p className="p-8 text-center text-sm text-[#6E6476] dark:text-[#C8BCD3]">
            No resources in this category.
          </p>
        ) : (
          resources
            .filter(
              (resource) =>
                resourceFilter === "all" ||
                resource.status === resourceFilter
            )
            .map((resource) => (
              <article
                key={resource.id}
                className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="break-words text-base font-extrabold">
                      {resource.title}
                    </h3>

                    <span className="rounded-full bg-[#F0E9FF] px-2 py-1 text-xs font-bold capitalize text-[#6D28D9] dark:bg-violet-500/20 dark:text-[#C4B5FD]">
                      {resource.status}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-[#6D28D9] dark:text-[#C4B5FD]">
                    {resource.subject}
                  </p>

                  {resource.description && (
                    <p className="mt-2 whitespace-pre-wrap break-words text-sm text-[#6E6476] dark:text-[#C8BCD3]">
                      {resource.description}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => void openSubmittedResource(resource)}
                    disabled={openingResourceId !== null}
                    className="mt-2 inline-block break-all text-left text-sm font-semibold text-[#6D28D9] underline disabled:opacity-50 dark:text-[#C4B5FD]"
                  >
                    {openingResourceId === resource.id
                      ? "Opening resource..."
                      : "Open submitted resource ↗"}
                  </button>

                  <p className="mt-2 text-xs text-[#6E6476] dark:text-[#C8BCD3]">
                    Submitted {formatDate(resource.created_at)}
                    {resource.reviewed_at
                      ? ` • Reviewed ${formatDate(resource.reviewed_at)}`
                      : ""}
                  </p>
                </div>

                {/* Only pending resources can be reviewed */}
                {resource.status === "pending" && (
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      disabled={reviewingResourceId !== null}
                      onClick={() =>
                        void reviewResource(resource, "rejected")
                      }
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-extrabold text-red-700 disabled:opacity-50 dark:border-red-500/25 dark:bg-red-500/10 dark:text-red-300"
                    >
                      Reject
                    </button>

                    <button
                      type="button"
                      disabled={reviewingResourceId !== null}
                      onClick={() =>
                        void reviewResource(resource, "approved")
                      }
                      className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#4C1D95] px-4 py-2 text-sm font-extrabold text-white disabled:opacity-50"
                    >
                      {reviewingResourceId === resource.id
                        ? "Working..."
                        : "Approve"}
                    </button>
                  </div>
                )}
              </article>
            ))
        )}
      </div>
    )}
  </div>
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