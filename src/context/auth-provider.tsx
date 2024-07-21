import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

import { User } from "../types/types";

export interface AuthContextInterface {
  auth: { user: User } | null;
  setAuth: Dispatch<SetStateAction<{ user: User } | null>>;
}

export const AuthContext = createContext<AuthContextInterface>({
  auth: null,
  setAuth: () => {},
});

interface Props {
  children?: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState<{ user: User } | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
