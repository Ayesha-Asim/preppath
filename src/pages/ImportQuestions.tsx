import { useState } from "react";
import { supabase } from "../lib/supabase";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

import { Questions as English } from "../data/tests/English";
import { Questions as Physics } from "../data/tests/Physics";
import { Questions as IQ } from "../data/tests/IQ";
import { Questions as ComputerScience } from "../data/tests/ComputerScience";
import { Questions as AnalyticalReasoning } from "../data/tests/AnalyticalReasoning";
import { Questions as BasicMathematics } from "../data/tests/BasicMathematics";
import { Questions as AdvancedMathematics } from "../data/tests/AdvancedMathematics";
import { Questions as QuantitativeReasoning } from "../data/tests/QuantitativeReasoning";

type LocalQuestion = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

type ImportResult = {
  imported: number;
  skipped: number;
  failed: number;
};

const ALL_SUBJECTS = [
  {
    subject: "English",
    questions: English,
    icon: "📖",
  },
  {
    subject: "Physics",
    questions: Physics,
    icon: "⚛️",
  },
  {
    subject: "IQ",
    questions: IQ,
    icon: "🧠",
  },
  {
    subject: "Computer Science",
    questions: ComputerScience,
    icon: "💻",
  },
  {
    subject: "Analytical Reasoning",
    questions: AnalyticalReasoning,
    icon: "🔍",
  },
  {
    subject: "Basic Mathematics",
    questions: BasicMathematics,
    icon: "➗",
  },
  {
    subject: "Advanced Mathematics",
    questions: AdvancedMathematics,
    icon: "📐",
  },
  {
    subject: "Quantitative Reasoning",
    questions: QuantitativeReasoning,
    icon: "📊",
  },
];

export default function ImportQuestions() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<ImportResult | null>(null);

  const totalQuestions = ALL_SUBJECTS.reduce(
    (total, subject) =>
      total +
      (subject.questions as LocalQuestion[]).length,
    0
  );

  async function importAllQuestions() {
    setLoading(true);
    setMessage("");
    setResult(null);

    let imported = 0;
    let skipped = 0;
    let failed = 0;

    try {
      for (const subjectData of ALL_SUBJECTS) {
        for (
          const q of subjectData.questions as LocalQuestion[]
        ) {
          const { data: existing, error: checkError } =
            await supabase
              .from("questions")
              .select("id")
              .eq("subject", subjectData.subject)
              .eq("question", q.question)
              .maybeSingle();

          if (checkError) {
            console.error(
              `Failed to check question in ${subjectData.subject}:`,
              checkError
            );

            failed++;
            continue;
          }

          if (existing) {
            skipped++;
            continue;
          }

          const { error } = await supabase
            .from("questions")
            .insert({
              subject: subjectData.subject,
              question: q.question,
              option_a: q.options[0],
              option_b: q.options[1],
              option_c: q.options[2],
              option_d: q.options[3],
              correct_answer: q.answer,
              explanation: q.explanation,
              difficulty: "Medium",
            });

          if (error) {
            console.error(
              `Failed to import question in ${subjectData.subject}:`,
              error
            );

            failed++;
          } else {
            imported++;
          }
        }
      }

      setResult({
        imported,
        skipped,
        failed,
      });

      if (failed > 0) {
        setMessage(
          `Import completed with ${failed} failed question${
            failed === 1 ? "" : "s"
          }.`
        );
      } else {
        setMessage("Question import completed successfully.");
      }
    } catch (error) {
      console.error("Question import failed:", error);

      setMessage(
        "Something went wrong while importing the questions."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
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
      <div className="mx-auto w-full max-w-[1000px]">
        {/* Heading */}

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
            Admin Tool
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
            Import Questions
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
            Import your local PrepPath question sets into
            Supabase without creating duplicate questions.
          </p>
        </div>

        <Card className="overflow-hidden">
          {/* Hero */}

          <div
            className="
              relative
              overflow-hidden
              bg-gradient-to-br
              from-[#2A0F50]
              via-[#4C1D95]
              to-[#6D28D9]
              px-6
              py-8
              text-white

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
                -bottom-20
                left-20
                h-48
                w-48
                rounded-full
                bg-violet-300/10
                blur-xl
              "
            />

            <div className="relative">
              <div
                className="
                  mb-5
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/15
                  bg-white/10
                  text-3xl
                  backdrop-blur
                "
              >
                📥
              </div>

              <h2
                className="
                  m-0
                  text-3xl
                  font-extrabold
                  tracking-[-0.03em]
                  md:text-[36px]
                "
              >
                Import the complete question bank
              </h2>

              <p
                className="
                  mt-3
                  max-w-2xl
                  text-sm
                  leading-6
                  text-white/75
                "
              >
                PrepPath will check each question before
                inserting it, so questions already stored in
                Supabase will be skipped automatically.
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Summary */}

            <div
              className="
                mb-7
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-3
              "
            >
              <div
                className="
                  rounded-2xl
                  border
                  border-[#E4DDED]
                  bg-[#FAF8FE]
                  p-5

                  dark:border-[rgba(171,132,255,0.17)]
                  dark:bg-[#21152D]
                "
              >
                <div
                  className="
                    text-3xl
                    font-extrabold
                    tracking-[-0.04em]
                    text-[#4C1D95]
                    dark:text-[#A78BFA]
                  "
                >
                  {ALL_SUBJECTS.length}
                </div>

                <p
                  className="
                    mb-0
                    mt-2
                    text-sm
                    font-bold
                    text-[#15111C]
                    dark:text-white
                  "
                >
                  Subjects
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-[#E4DDED]
                  bg-[#FAF8FE]
                  p-5

                  dark:border-[rgba(171,132,255,0.17)]
                  dark:bg-[#21152D]
                "
              >
                <div
                  className="
                    text-3xl
                    font-extrabold
                    tracking-[-0.04em]
                    text-[#4C1D95]
                    dark:text-[#A78BFA]
                  "
                >
                  {totalQuestions.toLocaleString()}
                </div>

                <p
                  className="
                    mb-0
                    mt-2
                    text-sm
                    font-bold
                    text-[#15111C]
                    dark:text-white
                  "
                >
                  Local Questions
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-[#E4DDED]
                  bg-[#FAF8FE]
                  p-5

                  dark:border-[rgba(171,132,255,0.17)]
                  dark:bg-[#21152D]
                "
              >
                <div
                  className="
                    text-3xl
                    font-extrabold
                    tracking-[-0.04em]
                    text-[#4C1D95]
                    dark:text-[#A78BFA]
                  "
                >
                  8
                </div>

                <p
                  className="
                    mb-0
                    mt-2
                    text-sm
                    font-bold
                    text-[#15111C]
                    dark:text-white
                  "
                >
                  Data Files
                </p>
              </div>
            </div>

            {/* Subjects */}

            <div className="mb-7">
              <h3
                className="
                  m-0
                  text-xl
                  font-extrabold
                  tracking-[-0.02em]
                "
              >
                Subjects Included
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#6E6476]
                  dark:text-[#C8BCD3]
                "
              >
                These local question sets will be checked
                during the import.
              </p>

              <div
                className="
                  mt-4
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-2
                  lg:grid-cols-4
                "
              >
                {ALL_SUBJECTS.map((item) => (
                  <div
                    key={item.subject}
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-[#E4DDED]
                      bg-[#FAF8FE]
                      p-3.5

                      dark:border-[rgba(171,132,255,0.17)]
                      dark:bg-[#21152D]
                    "
                  >
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#F0E9FF]
                        text-lg

                        dark:bg-[rgba(124,58,237,0.16)]
                      "
                    >
                      {item.icon}
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          m-0
                          truncate
                          text-sm
                          font-bold
                          text-[#15111C]
                          dark:text-white
                        "
                      >
                        {item.subject}
                      </p>

                      <p
                        className="
                          mb-0
                          mt-0.5
                          text-xs
                          text-[#6E6476]
                          dark:text-[#C8BCD3]
                        "
                      >
                        {(
                          item.questions as LocalQuestion[]
                        ).length.toLocaleString()}{" "}
                        questions
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning */}

            <div
              className="
                mb-6
                rounded-2xl
                border
                border-amber-200
                bg-amber-50
                p-4

                dark:border-amber-500/20
                dark:bg-amber-500/10
              "
            >
              <div className="flex gap-3">
                <span className="text-xl">⚠️</span>

                <div>
                  <p
                    className="
                      m-0
                      text-sm
                      font-bold
                      text-amber-900
                      dark:text-amber-200
                    "
                  >
                    Admin import action
                  </p>

                  <p
                    className="
                      mb-0
                      mt-1
                      text-xs
                      leading-5
                      text-amber-800/80
                      dark:text-amber-100/70
                    "
                  >
                    This writes directly to your Supabase
                    questions table. Existing questions with
                    the same subject and question text will
                    be skipped.
                  </p>
                </div>
              </div>
            </div>

            {/* Import result */}

            {result && (
              <div
                className="
                  mb-6
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-3
                "
              >
                <div
                  className="
                    rounded-xl
                    bg-green-50
                    p-4
                    dark:bg-green-500/10
                  "
                >
                  <div
                    className="
                      text-2xl
                      font-extrabold
                      text-green-600
                      dark:text-green-400
                    "
                  >
                    {result.imported}
                  </div>

                  <p
                    className="
                      mb-0
                      mt-1
                      text-xs
                      font-bold
                      text-green-800
                      dark:text-green-200
                    "
                  >
                    Imported
                  </p>
                </div>

                <div
                  className="
                    rounded-xl
                    bg-amber-50
                    p-4
                    dark:bg-amber-500/10
                  "
                >
                  <div
                    className="
                      text-2xl
                      font-extrabold
                      text-amber-600
                      dark:text-amber-400
                    "
                  >
                    {result.skipped}
                  </div>

                  <p
                    className="
                      mb-0
                      mt-1
                      text-xs
                      font-bold
                      text-amber-800
                      dark:text-amber-200
                    "
                  >
                    Duplicates skipped
                  </p>
                </div>

                <div
                  className="
                    rounded-xl
                    bg-red-50
                    p-4
                    dark:bg-red-500/10
                  "
                >
                  <div
                    className="
                      text-2xl
                      font-extrabold
                      text-red-600
                      dark:text-red-400
                    "
                  >
                    {result.failed}
                  </div>

                  <p
                    className="
                      mb-0
                      mt-1
                      text-xs
                      font-bold
                      text-red-800
                      dark:text-red-200
                    "
                  >
                    Failed
                  </p>
                </div>
              </div>
            )}

            {message && (
              <div
                className={`
                  mb-6
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-sm
                  font-semibold

                  ${
                    result && result.failed > 0
                      ? `
                        border-amber-200
                        bg-amber-50
                        text-amber-800
                        dark:border-amber-500/20
                        dark:bg-amber-500/10
                        dark:text-amber-200
                      `
                      : `
                        border-green-200
                        bg-green-50
                        text-green-800
                        dark:border-green-500/20
                        dark:bg-green-500/10
                        dark:text-green-200
                      `
                  }
                `}
              >
                {message}
              </div>
            )}

            {/* Button */}

            <Button
              onClick={importAllQuestions}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <span
                    className="
                      h-5
                      w-5
                      animate-spin
                      rounded-full
                      border-2
                      border-white/40
                      border-t-white
                    "
                  />

                  Importing Questions...
                </>
              ) : (
                <>
                  <span>📥</span>
                  Import All Questions
                </>
              )}
            </Button>

            <p
              className="
                mb-0
                mt-3
                text-center
                text-xs
                text-[#6E6476]
                dark:text-[#C8BCD3]
              "
            >
              Duplicate questions are detected before
              insertion.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}