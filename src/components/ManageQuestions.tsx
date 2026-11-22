import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Papa from "papaparse";

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

type CSVQuestionRow = {
  id?: string;
  subject?: string;
  question?: string;
  option_a?: string;
  option_b?: string;
  option_c?: string;
  option_d?: string;
  correct_answer?: string;
  explanation?: string;
  difficulty?: string;
  created_at?: string;
};

type CSVValidationResult = {
  valid: CSVQuestionRow[];
  invalid: {
    row: number;
    reason: string;
  }[];
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

  const [exporting, setExporting] = useState(false);

  const [importFileName, setImportFileName] =
    useState("");

  const [csvValidation, setCsvValidation] =
    useState<CSVValidationResult | null>(null);

  const [validatingCSV, setValidatingCSV] =
    useState(false);

  const [importing, setImporting] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadQuestions();
    }, 300);

    return () => window.clearTimeout(timer);
  }, [search, subject, page]);

  async function loadQuestions() {
    setLoading(true);

    const from = (page - 1) * PAGE_SIZE;

    const { data, error } = await supabase.rpc("admin_list_questions", {
      p_subject: subject === "All" ? null : subject,
      p_search: search.trim() || null,
      p_limit: PAGE_SIZE,
      p_offset: from,
    });

    if (error) {
      console.error("Failed to load questions:", error);
      setQuestions([]);
      setTotal(0);
      setLoading(false);
      return;
    }

    const result = data as { questions?: QuestionRow[]; total?: number } | null;
    setQuestions(result?.questions ?? []);
    setTotal(Number(result?.total ?? 0));
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

    const { data, error } = await supabase.rpc("admin_update_question", {
      p_question_id: editing.id,
      p_subject: editing.subject,
      p_question: editing.question.trim(),
      p_option_a: editing.option_a.trim(),
      p_option_b: editing.option_b.trim(),
      p_option_c: editing.option_c.trim(),
      p_option_d: editing.option_d.trim(),
      p_correct_answer: editing.correct_answer,
      p_explanation: editing.explanation?.trim() || null,
    });

    setSaving(false);

    if (error) {
      console.error("Failed to update question:", error);
      alert(`Could not update question: ${error.message}`);
      return;
    }

    if (!data) {
      alert("The question was not updated. Please check your permissions.");
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

    const { data, error } = await supabase.rpc("admin_delete_question", {
      p_question_id: item.id,
    });

    setDeletingId(null);

    if (error) {
      console.error("Failed to delete question:", error);
      alert(`Could not delete question: ${error.message}`);
      return;
    }

    if (data !== true) {
      alert("The question was not deleted. It may be in existing test history.");
      return;
    }

    if (editing?.id === item.id) {
      setEditing(null);
    }

    if (questions.length === 1 && page > 1) {
      setPage((current) => current - 1);
    } else {
      await loadQuestions();
    }

    alert("Question deleted successfully.");
  }

  async function exportQuestionsToCSV() {
    setExporting(true);

    try {
      const batchSize = 1000;
      let from = 0;
      let allQuestions: Record<string, unknown>[] = [];

      while (true) {
        const { data, error } = await supabase.rpc("admin_list_questions", {
          p_subject: null,
          p_search: null,
          p_limit: batchSize,
          p_offset: from,
        });

        if (error) throw error;

        const result = data as { questions?: Record<string, unknown>[]; total?: number } | null;
        const batch = result?.questions ?? [];
        allQuestions = [...allQuestions, ...batch];

        if (batch.length < batchSize) break;
        from += batchSize;
      }

      if (allQuestions.length === 0) {
        alert("There are no questions to export.");
        return;
      }

      const columns = [
        "id",
        "subject",
        "question",
        "option_a",
        "option_b",
        "option_c",
        "option_d",
        "correct_answer",
        "explanation",
        "difficulty",
        "created_at",
      ];

      const escapeCSV = (value: unknown) => {
        if (
          value === null ||
          value === undefined
        ) {
          return "";
        }

        const text = String(value).replace(
          /"/g,
          '""'
        );

        return `"${text}"`;
      };

      const csvRows = [
        columns.join(","),
        ...allQuestions.map((question) =>
          columns
            .map((column) =>
              escapeCSV(question[column])
            )
            .join(",")
        ),
      ];

      const csvContent =
        csvRows.join("\r\n");

      const blob = new Blob(
        ["\uFEFF", csvContent],
        {
          type: "text/csv;charset=utf-8;",
        }
      );

      const url =
        URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      const date = new Date()
        .toISOString()
        .slice(0, 10);

      link.download =
        `preppath-question-bank-${date}.csv`;

      document.body.appendChild(link);

      link.click();
      link.remove();

      URL.revokeObjectURL(url);

      alert(
        `${allQuestions.length.toLocaleString()} questions exported successfully.`
      );
    } catch (error) {
      console.error(
        "Failed to export questions:",
        error
      );

      alert(
        error instanceof Error
          ? `Export failed: ${error.message}`
          : "Export failed."
      );
    } finally {
      setExporting(false);
    }
  }

  function handleCSVFile(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setImportFileName(file.name);
    setCsvValidation(null);
    setValidatingCSV(true);

    Papa.parse<CSVQuestionRow>(file, {
      header: true,
      skipEmptyLines: true,

      transformHeader: (header) =>
        header.trim().toLowerCase(),

      complete: (results) => {
        const valid: CSVQuestionRow[] = [];

        const invalid: {
          row: number;
          reason: string;
        }[] = [];

        results.data.forEach(
          (row, index) => {
            const rowNumber =
              index + 2;

            const rowSubject =
              row.subject?.trim() ?? "";

            const question =
              row.question?.trim() ?? "";

            const optionA =
              row.option_a?.trim() ?? "";

            const optionB =
              row.option_b?.trim() ?? "";

            const optionC =
              row.option_c?.trim() ?? "";

            const optionD =
              row.option_d?.trim() ?? "";

            const correctAnswerText =
              String(
                row.correct_answer ?? ""
              ).trim();

            const correctAnswer =
              Number(correctAnswerText);

            if (!rowSubject) {
              invalid.push({
                row: rowNumber,
                reason:
                  "Subject is missing.",
              });
              return;
            }

            if (
              !subjects.includes(
                rowSubject
              )
            ) {
              invalid.push({
                row: rowNumber,
                reason:
                  `Invalid subject: ${rowSubject}`,
              });
              return;
            }

            if (!question) {
              invalid.push({
                row: rowNumber,
                reason:
                  "Question is missing.",
              });
              return;
            }

            if (
              !optionA ||
              !optionB ||
              !optionC ||
              !optionD
            ) {
              invalid.push({
                row: rowNumber,
                reason:
                  "All four answer options are required.",
              });
              return;
            }

            if (
              correctAnswerText === "" ||
              !Number.isInteger(
                correctAnswer
              ) ||
              correctAnswer < 0 ||
              correctAnswer > 3
            ) {
              invalid.push({
                row: rowNumber,
                reason:
                  "correct_answer must be 0, 1, 2, or 3.",
              });
              return;
            }

            valid.push({
              ...row,
              subject: rowSubject,
              question,
              option_a: optionA,
              option_b: optionB,
              option_c: optionC,
              option_d: optionD,
              correct_answer:
                correctAnswer.toString(),
              explanation:
                row.explanation?.trim() ??
                "",
              difficulty:
                row.difficulty?.trim() ||
                "Medium",
            });
          }
        );

        setCsvValidation({
          valid,
          invalid,
        });

        setValidatingCSV(false);
      },

      error: (error) => {
        console.error(
          "Failed to parse CSV:",
          error
        );

        setCsvValidation({
          valid: [],
          invalid: [
            {
              row: 0,
              reason:
                error.message ||
                "Could not read CSV file.",
            },
          ],
        });

        setValidatingCSV(false);
      },
    });

    event.target.value = "";
  }

  async function importValidQuestions() {
    if (
      !csvValidation ||
      csvValidation.valid.length === 0
    ) {
      alert(
        "There are no valid questions to import."
      );
      return;
    }

    const confirmed =
      window.confirm(
        `Import ${csvValidation.valid.length.toLocaleString()} valid questions?\n\nExisting duplicate questions will be skipped.`
      );

    if (!confirmed) return;

    setImporting(true);

    try {
      /*
       * Fetch all existing subject/question pairs
       * in batches.
       */
      const existingKeys =
        new Set<string>();

      const fetchBatchSize = 1000;

      let from = 0;

      while (true) {
        const { data, error } =
          await supabase
            .from("questions")
            .select(
              "subject, question"
            )
            .order(
              "created_at",
              { ascending: true }
            )
            .range(
              from,
              from +
                fetchBatchSize -
                1
            );

        if (error) {
          throw error;
        }

        const batch = data ?? [];

        batch.forEach((row) => {
          const key =
            `${row.subject}|||${row.question.trim()}`;

          existingKeys.add(key);
        });

        if (
          batch.length <
          fetchBatchSize
        ) {
          break;
        }

        from += fetchBatchSize;
      }

      /*
       * Also prevent duplicates within
       * the uploaded CSV itself.
       */
      const seenImportKeys =
        new Set<string>();

      const rowsToInsert =
        csvValidation.valid
          .filter((row) => {
            const key =
              `${row.subject}|||${row.question?.trim() ?? ""}`;

            if (
              existingKeys.has(key) ||
              seenImportKeys.has(key)
            ) {
              return false;
            }

            seenImportKeys.add(key);

            return true;
          })
          .map((row) => ({
            subject:
              row.subject!.trim(),

            question:
              row.question!.trim(),

            option_a:
              row.option_a!.trim(),

            option_b:
              row.option_b!.trim(),

            option_c:
              row.option_c!.trim(),

            option_d:
              row.option_d!.trim(),

            correct_answer:
              Number(
                row.correct_answer
              ),

            explanation:
              row.explanation?.trim() ||
              null,

            difficulty:
              row.difficulty?.trim() ||
              "Medium",
          }));

      const skipped =
        csvValidation.valid.length -
        rowsToInsert.length;

      /*
       * If everything already exists,
       * make no database changes.
       */
      if (
        rowsToInsert.length === 0
      ) {
        alert(
          `Import complete.\n\n0 questions inserted.\n${skipped.toLocaleString()} duplicates skipped.`
        );

        return;
      }

      const insertBatchSize = 100;

      let inserted = 0;

      for (
        let i = 0;
        i < rowsToInsert.length;
        i += insertBatchSize
      ) {
        const batch =
          rowsToInsert.slice(
            i,
            i + insertBatchSize
          );

        const { data, error } = await supabase.rpc("admin_import_questions", {
          p_questions: batch,
        });

        if (error) throw error;

        const result = data as { inserted?: number } | null;
        inserted += Number(result?.inserted ?? 0);
      }

      await loadQuestions();

      alert(
        `Import complete.\n\n${inserted.toLocaleString()} questions inserted.\n${skipped.toLocaleString()} duplicates skipped.`
      );

      setCsvValidation(null);
      setImportFileName("");
    } catch (error) {
      console.error(
        "Question import failed:",
        error
      );

      alert(
        error instanceof Error
          ? `Import failed: ${error.message}`
          : "Import failed."
      );
    } finally {
      setImporting(false);
    }
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
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="m-0 text-xl font-extrabold text-[#15111C] dark:text-white">
                Manage Questions
              </h2>

              <p className="mb-0 mt-1 text-sm text-[#6E6476] dark:text-[#C8BCD3]">
                Search, edit, delete, import, and export questions
                from the PrepPath question bank.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  void exportQuestionsToCSV()
                }
                disabled={exporting}
                className="
                  cursor-pointer rounded-xl
                  bg-[#7C3AED]
                  px-4 py-2.5
                  text-sm font-bold text-white
                  transition
                  hover:bg-[#6D28D9]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {exporting
                  ? "Exporting..."
                  : "↓ Export CSV"}
              </button>

              <label
                className="
                  cursor-pointer rounded-xl border
                  border-[#7C3AED] bg-white
                  px-4 py-2.5
                  text-sm font-bold text-[#7C3AED]
                  transition hover:bg-[#F0E9FF]
                  dark:bg-[#17101F]
                  dark:text-[#C4B5FD]
                "
              >
                {validatingCSV
                  ? "Validating..."
                  : "↑ Import CSV"}

                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleCSVFile}
                  disabled={validatingCSV}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-[1fr_260px]">
            <input
              type="search"
              placeholder="Search questions..."
              value={search}
              onChange={(e) =>
                handleSearch(
                  e.target.value
                )
              }
              className={fieldClass}
            />

            <select
              value={subject}
              onChange={(e) =>
                handleSubject(
                  e.target.value
                )
              }
              className={fieldClass}
            >
              <option value="All">
                All Subjects
              </option>

              {subjects.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* CSV VALIDATION */}

        {csvValidation && (
          <div
            className="
              border-b border-[#E4DDED]
              bg-[#FAF8FE]
              px-6 py-5
              dark:border-[rgba(171,132,255,0.17)]
              dark:bg-[#21152D]
              md:px-7
            "
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold text-[#15111C] dark:text-white">
                CSV Validation
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                {csvValidation.valid.length.toLocaleString()} valid
              </span>

              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                {csvValidation.invalid.length.toLocaleString()} invalid
              </span>
            </div>

            <p className="mb-0 mt-2 text-xs text-[#6E6476] dark:text-[#C8BCD3]">
              File: {importFileName}
            </p>

            {csvValidation.invalid.length >
              0 && (
              <div
                className="
                  mt-4 max-h-48 overflow-y-auto
                  rounded-xl border border-red-200
                  bg-red-50 p-3
                "
              >
                {csvValidation.invalid
                  .slice(0, 50)
                  .map(
                    (
                      problem,
                      index
                    ) => (
                      <p
                        key={`${problem.row}-${index}`}
                        className="mb-1 text-xs text-red-700"
                      >
                        Row{" "}
                        {problem.row}:{" "}
                        {
                          problem.reason
                        }
                      </p>
                    )
                  )}

                {csvValidation.invalid
                  .length > 50 && (
                  <p className="mt-2 text-xs font-bold text-red-700">
                    Plus{" "}
                    {csvValidation
                      .invalid
                      .length - 50}{" "}
                    more errors.
                  </p>
                )}
              </div>
            )}

            <p className="mb-0 mt-4 text-xs font-semibold text-[#6E6476] dark:text-[#C8BCD3]">
              Review the validation results before importing.
              Existing duplicate questions will be skipped.
            </p>

            {csvValidation.valid.length >
              0 && (
              <div className="mt-4">
                <button
                  type="button"
                  disabled={importing}
                  onClick={() =>
                    void importValidQuestions()
                  }
                  className="
                    cursor-pointer rounded-xl
                    bg-[#7C3AED]
                    px-4 py-2.5
                    text-sm font-bold text-white
                    transition
                    hover:bg-[#6D28D9]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {importing
                    ? "Importing..."
                    : `Import ${csvValidation.valid.length.toLocaleString()} Valid Questions`}
                </button>
              </div>
            )}
          </div>
        )}

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
                  editing?.id ===
                  item.id;

                const isDeleting =
                  deletingId ===
                  item.id;

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
                              text-[11px] font-bold
                              text-[#6D28D9]
                              dark:bg-[rgba(124,58,237,0.16)]
                              dark:text-[#C4B5FD]
                            "
                          >
                            {item.subject}
                          </span>

                          <p
                            className="
                              mb-0 mt-3 text-sm
                              font-semibold leading-6
                              text-[#15111C]
                              dark:text-white
                            "
                          >
                            {item.question}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <button
                            type="button"
                            disabled={
                              saving ||
                              isDeleting
                            }
                            onClick={() => {
                              if (
                                isEditing
                              ) {
                                setEditing(
                                  null
                                );
                              } else {
                                setEditing({
                                  ...item,
                                });
                              }
                            }}
                            className="
                              cursor-pointer rounded-xl
                              border border-[#7C3AED]
                              bg-white px-3.5 py-2
                              text-xs font-bold
                              text-[#7C3AED]
                              transition
                              hover:bg-[#F0E9FF]
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                              dark:bg-[#17101F]
                              dark:text-[#C4B5FD]
                            "
                          >
                            {isEditing
                              ? "✕ Close"
                              : "✏️ Edit"}
                          </button>

                          <button
                            type="button"
                            disabled={
                              saving ||
                              isDeleting
                            }
                            onClick={() =>
                              void deleteQuestion(
                                item
                              )
                            }
                            className="
                              cursor-pointer rounded-xl
                              border border-red-300
                              bg-white px-3.5 py-2
                              text-xs font-bold
                              text-red-600 transition
                              hover:bg-red-50
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                              dark:border-red-500/40
                              dark:bg-[#17101F]
                              dark:text-red-400
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

                    {isEditing &&
                      editing && (
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
                              Edit
                              Question
                            </h3>

                            <p className="mb-0 mt-1 text-xs text-[#6E6476] dark:text-[#C8BCD3]">
                              Update the
                              question,
                              answers,
                              correct
                              option, or
                              explanation.
                            </p>
                          </div>

                          <div className="space-y-5">
                            {/* SUBJECT */}

                            <div>
                              <label className="mb-2 block text-sm font-bold text-[#15111C] dark:text-white">
                                Subject
                              </label>

                              <select
                                value={
                                  editing.subject
                                }
                                onChange={(
                                  e
                                ) =>
                                  setEditing(
                                    {
                                      ...editing,
                                      subject:
                                        e
                                          .target
                                          .value,
                                    }
                                  )
                                }
                                className={
                                  fieldClass
                                }
                              >
                                {subjects.map(
                                  (
                                    subjectName
                                  ) => (
                                    <option
                                      key={
                                        subjectName
                                      }
                                      value={
                                        subjectName
                                      }
                                    >
                                      {
                                        subjectName
                                      }
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
                                value={
                                  editing.question
                                }
                                onChange={(
                                  e
                                ) =>
                                  setEditing(
                                    {
                                      ...editing,
                                      question:
                                        e
                                          .target
                                          .value,
                                    }
                                  )
                                }
                                className={`${fieldClass} resize-y`}
                              />
                            </div>

                            {/* OPTIONS */}

                            <div>
                              <div className="mb-3">
                                <h4 className="m-0 text-sm font-bold text-[#15111C] dark:text-white">
                                  Answer
                                  Options
                                </h4>

                                <p className="mb-0 mt-1 text-xs text-[#6E6476] dark:text-[#C8BCD3]">
                                  Edit the
                                  options and
                                  select the
                                  correct
                                  answer.
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
                                    [
                                      field,
                                      letter,
                                    ],
                                    index
                                  ) => {
                                    const isCorrect =
                                      editing.correct_answer ===
                                      index;

                                    return (
                                      <div
                                        key={
                                          field
                                        }
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
                                            {
                                              letter
                                            }
                                          </span>

                                          {isCorrect && (
                                            <span className="rounded-full bg-[#7C3AED] px-2.5 py-1 text-[10px] font-bold text-white">
                                              CORRECT
                                            </span>
                                          )}
                                        </div>

                                        <input
                                          value={
                                            editing[
                                              field
                                            ]
                                          }
                                          onChange={(
                                            e
                                          ) =>
                                            setEditing(
                                              {
                                                ...editing,
                                                [field]:
                                                  e
                                                    .target
                                                    .value,
                                              }
                                            )
                                          }
                                          className={
                                            fieldClass
                                          }
                                        />

                                        <label className="mt-3 flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#6E6476] dark:text-[#C8BCD3]">
                                          <input
                                            type="radio"
                                            name={`correct-answer-${editing.id}`}
                                            checked={
                                              isCorrect
                                            }
                                            onChange={() =>
                                              setEditing(
                                                {
                                                  ...editing,
                                                  correct_answer:
                                                    index,
                                                }
                                              )
                                            }
                                            className="h-4 w-4 accent-[#7C3AED]"
                                          />

                                          Mark as
                                          correct
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
                                onChange={(
                                  e
                                ) =>
                                  setEditing(
                                    {
                                      ...editing,
                                      explanation:
                                        e
                                          .target
                                          .value,
                                    }
                                  )
                                }
                                placeholder="Explain why the answer is correct..."
                                className={`${fieldClass} resize-y`}
                              />
                            </div>

                            {/* ACTIONS */}

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
                                disabled={
                                  saving
                                }
                                onClick={() =>
                                  setEditing(
                                    null
                                  )
                                }
                                className="
                                  cursor-pointer rounded-xl
                                  border border-[#E4DDED]
                                  bg-white px-5 py-2.5
                                  text-sm font-bold
                                  text-[#6E6476]
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
                                disabled={
                                  saving
                                }
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
              disabled={
                page <= 1 ||
                loading
              }
              onClick={() =>
                changePage(
                  Math.max(
                    1,
                    page - 1
                  )
                )
              }
              className="
                cursor-pointer rounded-xl
                border border-[#E4DDED]
                bg-white px-4 py-2
                text-sm font-bold
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
                page >=
                  totalPages ||
                loading
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
                px-4 py-2
                text-sm font-bold
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