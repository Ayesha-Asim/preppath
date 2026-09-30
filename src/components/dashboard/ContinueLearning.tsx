import { useNavigate } from "react-router-dom";
import Card from "../common/Card";
import Button from "../common/Button";
import SectionTitle from "../common/SectionTitle";

type Subject = {
  title: string;
  progress: number;
  route: string;
  icon: string;
};

type Props = {
  subjects: Subject[];
};

export default function ContinueLearning({
  subjects,
}: Props) {
  const navigate = useNavigate();

  return (
    <Card className="p-6 md:p-7">
      <SectionTitle>Continue Learning</SectionTitle>

      <div className="space-y-4">
        {subjects.map((subject) => {
          const progress = Math.max(
            0,
            Math.min(100, subject.progress)
          );

          return (
            <div
              key={subject.title}
              className="
                rounded-2xl
                border
                border-[#E4DDED]
                bg-[#FAF8FE]
                p-5

                dark:border-[rgba(171,132,255,0.17)]
                dark:bg-[#21152D]

                transition-all
                duration-200

                hover:-translate-y-0.5
                hover:border-violet-400/40
                hover:shadow-[0_12px_28px_rgba(76,29,149,0.08)]

                dark:hover:border-violet-500/30
                dark:hover:shadow-[0_12px_28px_rgba(0,0,0,0.16)]
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl

                        bg-[#F0E9FF]
                        text-xl

                        dark:bg-[rgba(124,58,237,0.16)]
                      "
                    >
                      {subject.icon}
                    </div>

                    <div className="min-w-0">
                      <h3
                        className="
                          truncate
                          text-lg
                          font-bold
                          text-[#15111C]
                          dark:text-white
                        "
                      >
                        {subject.title}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-medium
                          text-[#6E6476]
                          dark:text-[#C8BCD3]
                        "
                      >
                        {progress}% completed
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => navigate(subject.route)}
                  className="w-full sm:w-auto"
                >
                  Continue
                  <span aria-hidden="true">→</span>
                </Button>
              </div>

              <div
                className="
                  mt-5
                  h-2.5
                  w-full
                  overflow-hidden
                  rounded-full
                  bg-[#E4DDED]
                  dark:bg-[rgba(171,132,255,0.14)]
                "
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-[#4C1D95]
                    to-[#7C3AED]
                    transition-all
                    duration-500
                  "
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {subjects.length === 0 && (
        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-[#E4DDED]
            bg-[#FAF8FE]
            px-5
            py-10
            text-center

            dark:border-[rgba(171,132,255,0.17)]
            dark:bg-[#21152D]
          "
        >
          <div className="mb-3 text-3xl">📚</div>

          <p className="font-bold text-[#15111C] dark:text-white">
            Nothing to continue yet
          </p>

          <p className="mt-1 text-sm text-[#6E6476] dark:text-[#C8BCD3]">
            Start a subject and your progress will appear here.
          </p>
        </div>
      )}
    </Card>
  );
}