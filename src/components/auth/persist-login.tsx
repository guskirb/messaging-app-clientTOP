import { Outlet } from "react-router-dom";
import { getSelf } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { logOut } from "../../api/user";

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
        setAuth(undefined);
      }
      setLoading(false);
    };

    getAuth();
  }, []);

  if (loading) {
    return <>Loading...</>;
  }

  return <Outlet />;
}
