import React, { createContext, useContext } from "react";

export interface AuthContextProps {
  initializing: boolean;
  setInitializing: (e?: any) => void;
  user: any;
  setUser: (e?: any) => void;
  onLogin: (e?: any) => void;
  onLogout: (e?: any) => void;
}

const noop = () => {};

export const AuthContext = createContext<AuthContextProps>({
  initializing: true,
  setInitializing: noop,
  user: null,
  setUser: noop,
  onLogin: noop,
  onLogout: noop,
});

export const useAuthContext = () => useContext(AuthContext);
