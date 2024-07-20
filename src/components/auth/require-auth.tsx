import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function RequireAuth() {
  const { auth } = useAuth();

  return auth !== null ? <Outlet /> : <Navigate to="/login" replace />;
}
