import Card from "../common/Card";

type Props = {
  title: string;
  value: string | number;
  icon: string;
  color: string;
};

export default function StatCard({
  title,
  value,
  icon,
  color,
}: Props) {
  return (
    <Card className="hover:-translate-y-1 transition-transform duration-200">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div
          className="h-14 w-14 rounded-xl flex items-center justify-center text-3xl"
          style={{ background: color }}
        >
          {icon}
        </div>

      </div>

    </Card>
  );
}