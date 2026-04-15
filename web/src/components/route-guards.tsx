import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/auth-context";

type RoleGateProps = {
  allowedRoles: Array<"USER" | "ADMIN">;
};

export const AuthGate = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="p-6 text-sm text-slate-500">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const GuestGate = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="p-6 text-sm text-slate-500">Loading...</div>;
  }

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export const RoleGate = ({ allowedRoles }: RoleGateProps) => {
  const { user, loading, token } = useAuth();

  if (loading) {
    return <div className="p-6 text-sm text-slate-500">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
