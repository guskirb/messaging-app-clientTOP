import { useContext } from "react";
import { AuthContext } from "../context/auth-provider";
import { AuthContextInterface } from "../context/auth-provider";

export default function useAuth() {
  return useContext<AuthContextInterface>(AuthContext);
}
