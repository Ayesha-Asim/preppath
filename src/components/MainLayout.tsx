import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import AdminChatWidget from "./AdminChatWidget";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%", background: "var(--bg)", color: "var(--text)" }}>
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0, minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)", color: "var(--text)" }}>
        <TopBar />
        <main style={{ flex: 1, width: "100%", minWidth: 0, overflowX: "hidden", background: "var(--bg)", color: "var(--text)" }}>{children}</main>
        <footer style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "22px 32px", borderTop: "1px solid rgba(171,132,255,0.22)", background: "var(--bg)", color: "var(--text)", fontSize: 13 }}>
          <span style={{ opacity: 0.7 }}>© {new Date().getFullYear()} PrepPath</span>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
            <Link to="/contact" style={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}>Contact</Link>
            <a href="mailto:preppath.support@gmail.com" style={{ color: "inherit", textDecoration: "none", opacity: 0.8 }}>preppath.support@gmail.com</a>
          </div>
        </footer>
      </div>
      <AdminChatWidget />
    </div>
  );
}
