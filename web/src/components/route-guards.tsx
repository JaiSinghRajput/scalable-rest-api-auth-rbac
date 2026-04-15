import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/auth-context";

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
