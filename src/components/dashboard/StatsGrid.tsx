import StatCard from "./StatCard";

type Props = {
  tests: number;
  accuracy: number;
  streak: number;
  bookmarks: number;
};

export default function StatsGrid({
  tests,
  accuracy,
  streak,
  bookmarks,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Tests Completed"
        value={tests}
        icon="📝"
        color="#DBEAFE"
      />

      <StatCard
        title="Accuracy"
        value={`${accuracy}%`}
        icon="🎯"
        color="#DCFCE7"
      />

      <StatCard
        title="Current Streak"
        value={streak}
        icon="🔥"
        color="#FEE2E2"
      />

      <StatCard
        title="Bookmarks"
        value={bookmarks}
        icon="⭐"
        color="#F3E8FF"
      />

    </div>
  );
}