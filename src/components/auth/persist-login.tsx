import { Outlet } from "react-router-dom";
import { getUser } from "../../api/user";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";

export default function PersistLogin() {
  const { setAuth }: any = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAuth = async () => {
      const user = await getUser();
      if (user.user !== undefined) {
        setAuth(user);
      } else {
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
