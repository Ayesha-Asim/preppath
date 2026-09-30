import Card from "../common/Card";
import Button from "../common/Button";

type HeroProps = {
  name: string;
  streak: number;
  accuracy: number;
  onStart: () => void;
};

export default function Hero({
  name,
  streak,
  accuracy,
  onStart,
}: HeroProps) {
  return (
    <Card className="overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white">

      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

        <div>

          <p className="text-violet-100 text-lg">
            👋 Welcome back
          </p>

          <h1 className="text-5xl font-bold mt-2">
            {name}
          </h1>

          <p className="mt-4 text-violet-100 text-lg">
            Ready for another focused study session?
          </p>

          <div className="flex gap-6 mt-8">

            <div>
              <div className="text-3xl font-bold">
                🔥 {streak}
              </div>

              <p className="text-violet-100">
                Day Streak
              </p>
            </div>

            <div>
              <div className="text-3xl font-bold">
                🎯 {accuracy}%
              </div>

              <p className="text-violet-100">
                Accuracy
              </p>
            </div>

          </div>

          <Button
            onClick={onStart}
            className="mt-8 !bg-white !text-violet-700 hover:!bg-violet-100"
          >
            Start Practice →
          </Button>

        </div>

        <div className="hidden lg:block text-8xl opacity-20">
          📚
        </div>

      </div>

    </Card>
  );
}