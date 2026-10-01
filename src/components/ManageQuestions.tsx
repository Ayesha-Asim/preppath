import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type QuestionRow = {
  id: string;
  subject: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: number;
  explanation: string | null;
};

const subjects = [
  "English",
  "Basic Mathematics",
  "Advanced Mathematics",
  "Physics",
  "Computer Science",
  "IQ",
  "Analytical Reasoning",
  "Quantitative Reasoning",
];

const PAGE_SIZE = 20;

const fieldClass = `
  w-full rounded-xl border border-[#E4DDED] bg-white
  px-4 py-3 text-sm text-[#15111C] outline-none
  transition
  focus:border-[#7C3AED] focus:ring-4 focus:ring-violet-500/10
  dark:border-[rgba(171,132,255,0.17)]
  dark:bg-[#17101F] dark:text-white
`;

export default function ManageQuestions() {
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");
  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] =
    useState<QuestionRow | null>(null);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadQuestions();
    }, 300);

    return () => window.clearTimeout(timer);
  }, [search, subject, page]);

  async function loadQuestions() {
    setLoading(true);

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from("questions")
      .select(
        `
          id,
          subject,
          question,
          option_a,
          option_b,
          option_c,
          option_d,
          correct_answer,
          explanation
        `,
        { count: "exact" }
      )
      .order("created_at", { ascending: false })
      .range(from, to);

    if (subject !== "All") {
      query = query.eq("subject", subject);
    }

    if (search.trim()) {
      query = query.ilike(
        "question",
        `%${search.trim()}%`
      );
    }

    const { data, count, error } = await query;

    if (error) {
      console.error("Failed to load questions:", error);
      setQuestions([]);
      setTotal(0);
      setLoading(false);
      return;
    }

    setQuestions((data ?? []) as QuestionRow[]);
    setTotal(count ?? 0);
    setLoading(false);
  }

  async function saveEdit() {
    if (!editing) return;

    if (
      !editing.subject ||
      !editing.question.trim() ||
      !editing.option_a.trim() ||
      !editing.option_b.trim() ||
      !editing.option_c.trim() ||
      !editing.option_d.trim()
    ) {
      alert("Please fill every required field.");
      return;
    }

    setSaving(true);

    const { data, error } = await supabase
      .from("questions")
      .update({
        subject: editing.subject,
        question: editing.question.trim(),
        option_a: editing.option_a.trim(),
        option_b: editing.option_b.trim(),
        option_c: editing.option_c.trim(),
        option_d: editing.option_d.trim(),
        correct_answer: editing.correct_answer,
        explanation:
          editing.explanation?.trim() || null,
      })
      .eq("id", editing.id)
      .select("id");

    setSaving(false);

    if (error) {
      console.error("Failed to update question:", error);
      alert(`Could not update question: ${error.message}`);
      return;
    }

    if (!data || data.length !== 1) {
      alert(
        "The question was not updated. Please check your permissions."
      );
      return;
    }

    setEditing(null);
    await loadQuestions();

    alert("Question updated successfully.");
  }

  async function deleteQuestion(item: QuestionRow) {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete this question?\n\n${item.question}\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    setDeletingId(item.id);

    const { data, error } = await supabase
      .from("questions")
      .delete()
      .eq("id", item.id)
      .select("id");

    setDeletingId(null);

    if (error) {
      console.error("Failed to delete question:", error);
      alert(`Could not delete question: ${error.message}`);
      return;
    }

    if (!data || data.length !== 1) {
      alert(
        "The question was not deleted. Please check your permissions."
      );
      return;
    }

    if (editing?.id === item.id) {
      setEditing(null);
    }

    /*
      If this was the last question on the current page,
      move back one page. Otherwise reload the current page.
    */
    if (questions.length === 1 && page > 1) {
      setPage((current) => current - 1);
    } else {
      await loadQuestions();
    }

    alert("Question deleted successfully.");
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
    setEditing(null);
  }

  function handleSubject(value: string) {
    setSubject(value);
    setPage(1);
    setEditing(null);
  }

  function changePage(newPage: number) {
    setEditing(null);
    setPage(newPage);
  }

  const totalPages = Math.max(
    1,
    Math.ceil(total / PAGE_SIZE)
  );

  return (
    <div className="mt-8">
      <div
        className="
          overflow-hidden rounded-[24px] border
          border-[#E4DDED] bg-white
          shadow-[0_8px_28px_rgba(76,29,149,0.05)]
          dark:border-[rgba(171,132,255,0.17)]
          dark:bg-[#17101F]
        "
      >
        {/* HEADER */}

        <div
          className="
            border-b border-[#E4DDED] p-6
            dark:border-[rgba(171,132,255,0.17)]
            md:p-7
          "
        >
          <h2 className="m-0 text-xl font-extrabold text-[#15111C] dark:text-white">
            Manage Questions
          </h2>

          <p className="mb-0 mt-1 text-sm text-[#6E6476] dark:text-[#C8BCD3]">
            Search, edit, and delete questions from the PrepPath
            question bank.
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_260px]">
            <input
              type="search"
              placeholder="Search questions..."
              value={search}
              onChange={(e) =>
                handleSearch(e.target.value)
              }
              className={fieldClass}
            />

            <select
              value={subject}
              onChange={(e) =>
                handleSubject(e.target.value)
              }
              className={fieldClass}
            >
              <option value="All">All Subjects</option>

              {subjects.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* QUESTION LIST */}

        <div className="p-6 md:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="m-0 text-sm font-bold text-[#15111C] dark:text-white">
              {total.toLocaleString()} questions
            </p>

            <p className="m-0 text-xs text-[#6E6476] dark:text-[#C8BCD3]">
              Page {page} of {totalPages}
            </p>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-[#6E6476] dark:text-[#C8BCD3]">
              Loading questions...
            </div>
          ) : questions.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#6E6476] dark:text-[#C8BCD3]">
              No questions found.
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((item) => {
                const isEditing =
                  editing?.id === item.id;

                const isDeleting =
                  deletingId === item.id;

                return (
                  <div
                    key={item.id}
                    className="
                      overflow-hidden rounded-2xl border
                      border-[#E4DDED] bg-[#FAF8FE]
                      dark:border-[rgba(171,132,255,0.17)]
                      dark:bg-[#21152D]
                    "
                  >
                    {/* QUESTION SUMMARY */}

                    <div className="p-4">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <span
                            className="
                              inline-block rounded-full
                              bg-[#F0E9FF] px-2.5 py-1
                              text-[11px] font-bold text-[#6D28D9]
                              dark:bg-[rgba(124,58,237,0.16)]
                              dark:text-[#C4B5FD]
                            "
                          >
                            {item.subject}
                          </span>

                          <p
                            className="
                              mb-0 mt-3 text-sm font-semibold
                              leading-6 text-[#15111C]
                              dark:text-white
                            "
                          >
                            {item.question}
                          </p>
                        </div>

                        {/* EDIT / DELETE */}

                        <div className="flex shrink-0 items-center gap-2">
                          <button
                            type="button"
                            disabled={
                              saving || isDeleting
                            }
                            onClick={() => {
                              if (isEditing) {
                                setEditing(null);
                              } else {
                                setEditing({
                                  ...item,
                                });
                              }
                            }}
                            className="
                              cursor-pointer rounded-xl border
                              border-[#7C3AED] bg-white
                              px-3.5 py-2 text-xs font-bold
                              text-[#7C3AED] transition
                              hover:bg-[#F0E9FF]
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                              dark:bg-[#17101F]
                              dark:text-[#C4B5FD]
                              dark:hover:bg-[rgba(124,58,237,0.16)]
                            "
                          >
                            {isEditing
                              ? "✕ Close"
                              : "✏️ Edit"}
                          </button>

                          <button
                            type="button"
                            disabled={
                              saving || isDeleting
                            }
                            onClick={() =>
                              void deleteQuestion(item)
                            }
                            className="
                              cursor-pointer rounded-xl border
                              border-red-300 bg-white
                              px-3.5 py-2 text-xs font-bold
                              text-red-600 transition
                              hover:bg-red-50
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                              dark:border-red-500/40
                              dark:bg-[#17101F]
                              dark:text-red-400
                              dark:hover:bg-red-500/10
                            "
                          >
                            {isDeleting
                              ? "Deleting..."
                              : "🗑️ Delete"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* EDIT FORM */}

                    {isEditing && editing && (
                      <div
                        className="
                          border-t border-[#D8CCEA]
                          bg-white p-5
                          dark:border-[rgba(171,132,255,0.17)]
                          dark:bg-[#17101F]
                          md:p-6
                        "
                      >
                        <div className="mb-5">
                          <h3 className="m-0 text-lg font-extrabold text-[#15111C] dark:text-white">
                            Edit Question
                          </h3>

                          <p className="mb-0 mt-1 text-xs text-[#6E6476] dark:text-[#C8BCD3]">
                            Update the question, answers, correct
                            option, or explanation.
                          </p>
                        </div>

                        <div className="space-y-5">
                          {/* SUBJECT */}

                          <div>
                            <label className="mb-2 block text-sm font-bold text-[#15111C] dark:text-white">
                              Subject
                            </label>

                            <select
                              value={editing.subject}
                              onChange={(e) =>
                                setEditing({
                                  ...editing,
                                  subject:
                                    e.target.value,
                                })
                              }
                              className={fieldClass}
                            >
                              {subjects.map(
                                (subjectName) => (
                                  <option
                                    key={subjectName}
                                    value={subjectName}
                                  >
                                    {subjectName}
                                  </option>
                                )
                              )}
                            </select>
                          </div>

                          {/* QUESTION */}

                          <div>
                            <label className="mb-2 block text-sm font-bold text-[#15111C] dark:text-white">
                              Question
                            </label>

                            <textarea
                              rows={4}
                              value={editing.question}
                              onChange={(e) =>
                                setEditing({
                                  ...editing,
                                  question:
                                    e.target.value,
                                })
                              }
                              className={`${fieldClass} resize-y`}
                            />
                          </div>

                          {/* OPTIONS */}

                          <div>
                            <div className="mb-3">
                              <h4 className="m-0 text-sm font-bold text-[#15111C] dark:text-white">
                                Answer Options
                              </h4>

                              <p className="mb-0 mt-1 text-xs text-[#6E6476] dark:text-[#C8BCD3]">
                                Edit the options and select the
                                correct answer.
                              </p>
                            </div>

                            <div className="grid gap-3 md:grid-cols-2">
                              {(
                                [
                                  [
                                    "option_a",
                                    "A",
                                  ],
                                  [
                                    "option_b",
                                    "B",
                                  ],
                                  [
                                    "option_c",
                                    "C",
                                  ],
                                  [
                                    "option_d",
                                    "D",
                                  ],
                                ] as const
                              ).map(
                                (
                                  [field, letter],
                                  index
                                ) => {
                                  const isCorrect =
                                    editing.correct_answer ===
                                    index;

                                  return (
                                    <div
                                      key={field}
                                      className={`
                                        rounded-2xl border p-3
                                        ${
                                          isCorrect
                                            ? `
                                              border-[#7C3AED]
                                              bg-[#F0E9FF]
                                              dark:bg-[rgba(124,58,237,0.16)]
                                            `
                                            : `
                                              border-[#E4DDED]
                                              bg-[#FAF8FE]
                                              dark:border-[rgba(171,132,255,0.17)]
                                              dark:bg-[#21152D]
                                            `
                                        }
                                      `}
                                    >
                                      <div className="mb-2 flex items-center justify-between gap-2">
                                        <span
                                          className={`
                                            flex h-8 w-8
                                            items-center justify-center
                                            rounded-lg text-sm
                                            font-extrabold
                                            ${
                                              isCorrect
                                                ? "bg-[#7C3AED] text-white"
                                                : `
                                                  bg-white text-[#4C1D95]
                                                  dark:bg-[#17101F]
                                                  dark:text-[#C4B5FD]
                                                `
                                            }
                                          `}
                                        >
                                          {letter}
                                        </span>

                                        {isCorrect && (
                                          <span
                                            className="
                                              rounded-full bg-[#7C3AED]
                                              px-2.5 py-1
                                              text-[10px] font-bold
                                              text-white
                                            "
                                          >
                                            CORRECT
                                          </span>
                                        )}
                                      </div>

                                      <input
                                        value={
                                          editing[field]
                                        }
                                        onChange={(e) =>
                                          setEditing({
                                            ...editing,
                                            [field]:
                                              e.target
                                                .value,
                                          })
                                        }
                                        className={
                                          fieldClass
                                        }
                                      />

                                      <label
                                        className="
                                          mt-3 flex cursor-pointer
                                          items-center gap-2
                                          text-xs font-semibold
                                          text-[#6E6476]
                                          dark:text-[#C8BCD3]
                                        "
                                      >
                                        <input
                                          type="radio"
                                          name={`correct-answer-${editing.id}`}
                                          checked={
                                            isCorrect
                                          }
                                          onChange={() =>
                                            setEditing({
                                              ...editing,
                                              correct_answer:
                                                index,
                                            })
                                          }
                                          className="h-4 w-4 accent-[#7C3AED]"
                                        />

                                        Mark as correct
                                      </label>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>

                          {/* EXPLANATION */}

                          <div>
                            <label className="mb-2 block text-sm font-bold text-[#15111C] dark:text-white">
                              Explanation
                            </label>

                            <textarea
                              rows={4}
                              value={
                                editing.explanation ??
                                ""
                              }
                              onChange={(e) =>
                                setEditing({
                                  ...editing,
                                  explanation:
                                    e.target.value,
                                })
                              }
                              placeholder="Explain why the answer is correct..."
                              className={`${fieldClass} resize-y`}
                            />
                          </div>

                          {/* EDIT ACTIONS */}

                          <div
                            className="
                              flex flex-col gap-3
                              border-t border-[#E4DDED]
                              pt-5
                              dark:border-[rgba(171,132,255,0.17)]
                              sm:flex-row sm:justify-end
                            "
                          >
                            <button
                              type="button"
                              disabled={saving}
                              onClick={() =>
                                setEditing(null)
                              }
                              className="
                                cursor-pointer rounded-xl border
                                border-[#E4DDED] bg-white
                                px-5 py-2.5 text-sm font-bold
                                text-[#6E6476]
                                hover:bg-[#FAF8FE]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                dark:border-[rgba(171,132,255,0.17)]
                                dark:bg-[#21152D]
                                dark:text-[#C8BCD3]
                              "
                            >
                              Cancel
                            </button>

                            <button
                              type="button"
                              disabled={saving}
                              onClick={() =>
                                void saveEdit()
                              }
                              className="
                                cursor-pointer rounded-xl
                                bg-[#7C3AED]
                                px-5 py-2.5
                                text-sm font-bold text-white
                                transition
                                hover:bg-[#6D28D9]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                              "
                            >
                              {saving
                                ? "Saving..."
                                : "Save Changes"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* PAGINATION */}

          <div
            className="
              mt-6 flex items-center justify-between
              gap-3 border-t border-[#E4DDED]
              pt-5
              dark:border-[rgba(171,132,255,0.17)]
            "
          >
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() =>
                changePage(
                  Math.max(1, page - 1)
                )
              }
              className="
                cursor-pointer rounded-xl border
                border-[#E4DDED] bg-white
                px-4 py-2 text-sm font-bold
                text-[#4C1D95]
                disabled:cursor-not-allowed
                disabled:opacity-40
                dark:border-[rgba(171,132,255,0.17)]
                dark:bg-[#21152D]
                dark:text-[#C4B5FD]
              "
            >
              ← Previous
            </button>

            <span className="text-xs font-semibold text-[#6E6476] dark:text-[#C8BCD3]">
              {page} / {totalPages}
            </span>

            <button
              type="button"
              disabled={
                page >= totalPages || loading
              }
              onClick={() =>
                changePage(
                  Math.min(
                    totalPages,
                    page + 1
                  )
                )
              }
              className="
                cursor-pointer rounded-xl
                bg-[#7C3AED]
                px-4 py-2 text-sm font-bold
                text-white
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}