import { useState } from "react";
import useAuth from "./useAuth";
import { getUser } from "../api/user";

export default function useSetProfile() {
  const { auth }: any = useAuth();
  const [profile, setProfile] = useState(auth);
  const [loading, setLoading] = useState(false);

  async function getUserProfile(id: string) {
    setLoading(true);
    const response = await getUser(id);
    setProfile(response);
    setLoading(false);
  }

  return {
    profile,
    setProfile,
    getUserProfile,
    loading,
  };
}
