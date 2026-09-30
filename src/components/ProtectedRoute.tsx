import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./common/Loading";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({
  children,
}: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          bg-[#F4F4FA]
          dark:bg-[#09070F]
        "
      >
        <Loading />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}