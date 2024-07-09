import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function RequireAuth() {
  const { auth }: any = useAuth();

  return auth !== undefined ? <Outlet /> : <Navigate to="/login" replace />;
}
