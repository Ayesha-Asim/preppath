import { useState } from "react";
import { supabase } from "../lib/supabase";
import Card from "./common/Card";
import Button from "./common/Button";
import SectionTitle from "./common/SectionTitle";

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

const options = ["A", "B", "C", "D"];

export default function AddQuestion() {
  const [subject, setSubject] = useState(subjects[0]);
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correct, setCorrect] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [saving, setSaving] = useState(false);

  const optionValues = [
    optionA,
    optionB,
    optionC,
    optionD,
  ];

  const setOption = (index: number, value: string) => {
    if (index === 0) setOptionA(value);
    if (index === 1) setOptionB(value);
    if (index === 2) setOptionC(value);
    if (index === 3) setOptionD(value);
  };

  async function saveQuestion() {
    if (
      !question.trim() ||
      !optionA.trim() ||
      !optionB.trim() ||
      !optionC.trim() ||
      !optionD.trim()
    ) {
      alert("Please fill every field.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.rpc("admin_insert_question", {
      p_subject: subject,
      p_question: question,
      p_option_a: optionA,
      p_option_b: optionB,
      p_option_c: optionC,
      p_option_d: optionD,
      p_correct_answer: correct,
      p_explanation: explanation,
      p_difficulty: "Medium",
    });

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Question added!");

    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setExplanation("");
    setCorrect(0);
  }

  const inputClass = `
    w-full
    rounded-xl
    border
    border-[#E4DDED]
    bg-white
    px-4
    py-3
    text-[15px]
    text-[#15111C]
    outline-none
    transition-all
    duration-200

    placeholder:text-[#9A8CA5]

    focus:border-[#7C3AED]
    focus:ring-4
    focus:ring-violet-500/10

    dark:border-[rgba(171,132,255,0.17)]
    dark:bg-[#21152D]
    dark:text-white
    dark:placeholder:text-[#9F91AA]
    dark:focus:border-[#7C3AED]
  `;

  return (
    <div className="w-full py-8">
      <Card className="overflow-hidden">
        {/* Header */}

        <div
          className="
            relative
            overflow-hidden
            bg-gradient-to-br
            from-[#2A0F50]
            via-[#4C1D95]
            to-[#6D28D9]
            px-6
            py-7
            text-white
            md:px-8
          "
        >
          <div
            className="
              absolute
              -right-16
              -top-16
              h-48
              w-48
              rounded-full
              bg-white/5
            "
          />

          <div
            className="
              absolute
              -bottom-20
              left-20
              h-40
              w-40
              rounded-full
              bg-violet-300/10
            "
          />

          <div className="relative">
            <div
              className="
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                border
                border-white/15
                bg-white/10
                text-2xl
              "
            >
              ✏️
            </div>

            <h2 className="m-0 text-2xl font-extrabold md:text-3xl">
              Add Question
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
              Add a new question to the PrepPath question bank.
              Choose its subject, answers, correct option, and
              explanation.
            </p>
          </div>
        </div>

        {/* Form */}

        <div className="p-6 md:p-8">
          <SectionTitle className="mb-6">
            Question Details
          </SectionTitle>

          <div className="space-y-6">
            {/* Subject */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-bold
                  text-[#15111C]
                  dark:text-white
                "
              >
                Subject
              </label>

              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={inputClass}
              >
                {subjects.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Question */}

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  className="
                    text-sm
                    font-bold
                    text-[#15111C]
                    dark:text-white
                  "
                >
                  Question
                </label>

                <span
                  className="
                    text-xs
                    text-[#6E6476]
                    dark:text-[#C8BCD3]
                  "
                >
                  {question.length} characters
                </span>
              </div>

              <textarea
                placeholder="Enter the question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                className={`${inputClass} resize-y`}
              />
            </div>

            {/* Answer options */}

            <div>
              <div className="mb-3">
                <h3
                  className="
                    m-0
                    text-sm
                    font-bold
                    text-[#15111C]
                    dark:text-white
                  "
                >
                  Answer Options
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-[#6E6476]
                    dark:text-[#C8BCD3]
                  "
                >
                  Enter four possible answers and select the
                  correct one.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {optionValues.map((value, index) => {
                  const isCorrect = correct === index;

                  return (
                    <div
                      key={options[index]}
                      className={`
                        rounded-2xl
                        border
                        p-3
                        transition-all

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
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-lg
                              text-sm
                              font-extrabold

                              ${
                                isCorrect
                                  ? "bg-[#7C3AED] text-white"
                                  : `
                                    bg-white
                                    text-[#4C1D95]
                                    dark:bg-[#17101F]
                                    dark:text-[#C4B5FD]
                                  `
                              }
                            `}
                          >
                            {options[index]}
                          </span>

                          <span
                            className="
                              text-xs
                              font-semibold
                              text-[#6E6476]
                              dark:text-[#C8BCD3]
                            "
                          >
                            Option {options[index]}
                          </span>
                        </div>

                        {isCorrect && (
                          <span
                            className="
                              rounded-full
                              bg-[#7C3AED]
                              px-2.5
                              py-1
                              text-[10px]
                              font-bold
                              text-white
                            "
                          >
                            CORRECT
                          </span>
                        )}
                      </div>

                      <input
                        placeholder={`Enter option ${options[index]}`}
                        value={value}
                        onChange={(e) =>
                          setOption(index, e.target.value)
                        }
                        className={inputClass}
                      />

                      <label
                        className="
                          mt-3
                          flex
                          cursor-pointer
                          items-center
                          gap-2
                          text-xs
                          font-semibold
                          text-[#6E6476]
                          dark:text-[#C8BCD3]
                        "
                      >
                        <input
                          type="radio"
                          name="correct-answer"
                          checked={isCorrect}
                          onChange={() => setCorrect(index)}
                          className="
                            h-4
                            w-4
                            accent-[#7C3AED]
                          "
                        />

                        Mark as correct answer
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explanation */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-bold
                  text-[#15111C]
                  dark:text-white
                "
              >
                Explanation
              </label>

              <textarea
                placeholder="Explain why the selected answer is correct..."
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                rows={5}
                className={`${inputClass} resize-y`}
              />

              <p
                className="
                  mt-2
                  text-xs
                  text-[#6E6476]
                  dark:text-[#C8BCD3]
                "
              >
                💡 This explanation will be shown after the
                student answers the question.
              </p>
            </div>

            {/* Bottom actions */}

            <div
              className="
                flex
                flex-col
                gap-3
                border-t
                border-[#E4DDED]
                pt-6
                dark:border-[rgba(171,132,255,0.17)]
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div
                className="
                  text-sm
                  text-[#6E6476]
                  dark:text-[#C8BCD3]
                "
              >
                Correct answer:{" "}
                <strong
                  className="
                    text-[#7C3AED]
                    dark:text-[#A78BFA]
                  "
                >
                  Option {options[correct]}
                </strong>
              </div>

              <Button
                onClick={saveQuestion}
                disabled={saving}
                className="w-full sm:min-w-[170px] sm:w-auto"
              >
                {saving ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/40
                        border-t-white
                      "
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <span>＋</span>
                    Save Question
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}