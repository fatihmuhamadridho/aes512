import React, { createContext, useContext } from "react";

export interface AuthContextProps {
  user: any;
  setUser: (e: any) => void;
}

const noop = () => {};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: noop,
});

export const useAuthContext = () => useContext(AuthContext);
