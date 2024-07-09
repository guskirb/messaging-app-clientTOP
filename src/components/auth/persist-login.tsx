import { Outlet } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";

export default function PersistLogin() {
  const { user } = useGetUser();
  const { setAuth }: any = useAuth();

  useEffect(() => {
    setAuth(user);
  }, []);

  return <Outlet />;
}
