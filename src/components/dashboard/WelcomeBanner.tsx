import { useAuth } from "../../context/AuthContext";

type Props = {
  isDark: boolean;
};

export default function WelcomeBanner({ isDark }: Props) {
  const { user } = useAuth();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  const name =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Student";

  return (
    <div
      style={{
        background: isDark ? "#1E293B" : "#FFFFFF",
        borderRadius: 20,
        padding: 28,
        boxShadow: "0 8px 24px rgba(0,0,0,.08)",
        marginBottom: 30,
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: 32,
          fontWeight: 700,
        }}
      >
        {greeting}, {name} 👋
      </h1>

      <p
        style={{
          marginTop: 10,
          color: isDark ? "#CBD5E1" : "#64748B",
          fontSize: 17,
        }}
      >
        Ready to continue your PrepPath journey?
      </p>
    </div>
  );
}