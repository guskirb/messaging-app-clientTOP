import { Outlet } from "react-router-dom";
import { getSelf } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { logOut } from "../../api/user";
import Loader from "../loader/loader";

export default function PersistLogin() {
  const { setAuth }: any = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAuth = async () => {
      const user = await getSelf();
      if (user.user !== undefined) {
        setAuth(user);
      } else {
        logOut();
        setAuth(null);
      }
      setLoading(false);
    };

    getAuth();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <Outlet />;
}
