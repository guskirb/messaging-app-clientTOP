import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function RequireAuth() {
  const { auth }: any = useAuth();
  
  return auth?.success ? <Outlet /> : <Navigate to="/login" replace />;
}
