import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./common/Loading";

type Props = {
  children: React.ReactNode;
};

export default function AdminRoute({
  children,
}: Props) {
  const {
    user,
    loading,
    profileLoading,
    isAdmin,
  } = useAuth();

  if (loading || profileLoading) {
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

  if (!user || !isAdmin) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <>{children}</>;
}