import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying your account...");

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // 🔥 Get session from Supabase after clicking email link
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          setStatus("Verification failed. Try again.");
          setTimeout(() => navigate("/signup"), 2000);
          return;
        }

        if (!data.session) {
          setStatus("No active session found.");
          setTimeout(() => navigate("/signup"), 2000);
          return;
        }

        // 🔥 SUCCESS
        setStatus("Account verified successfully!");

        // small delay so user sees message
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (err) {
        setStatus("Something went wrong.");
        setTimeout(() => navigate("/signup"), 2000);
      }
    };

    handleAuth();
  }, [navigate]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Authentication</h2>
        <p style={styles.text}>{status}</p>
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#F9FAFB",
    fontFamily: "system-ui",
  },

  card: {
    width: 420,
    padding: 30,
    background: "var(--card)",
    borderRadius: 14,
    border: "1px solid #E5E7EB",
    boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: 700,
    color: "#4C1D95",
  },

  text: {
    marginTop: 10,
    fontSize: 14,
    color: "#64748B",
  },
};