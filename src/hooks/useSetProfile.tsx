import { useState } from "react";
import useAuth from "./useAuth";

export default function useSetProfile() {
  const { auth }: any = useAuth();
  const [profile, setProfile] = useState(auth);

  return {
    profile,
    setProfile,
  };
}
