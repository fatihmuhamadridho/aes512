import { useEffect, useState } from "react";
import { AuthContext } from "./auth.context";
import { useRouter } from "next/router";
import {
  AuthService,
  AuthServiceChangePasswordProps,
  AuthServiceLoginProps,
} from "@/services/authService";
import { Center, Loader, LoadingOverlay, Paper } from "@mantine/core";

export const AuthProvider = ({ children }: { children: any }) => {
  const router = useRouter();
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      setInitializing(true);
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const response = await AuthService.privilege();
          if (response.status === 200) {
            setUser(response.data.data);
            if (router.pathname === "/login") await router.push("/");
            if (
              response.data.data.first_login &&
              router.pathname !== "/change-password"
            ) {
              alert("Anda perlu mengganti password terlebih dahulu!");
              await router.push("/change-password");
            }
          } else {
            if (router.pathname !== "/login") await router.push("/login");
          }
        } catch (error: any) {
          console.error(error.stack);
          if (router.pathname !== "/login") await router.push("/login");
        }
      } else {
        if (router.pathname !== "/login") await router.push("/login");
      }
      setTimeout(() => {
        setInitializing(false);
      }, 250);
    }

    loadUser();
  }, [router]);

  async function onLogin(payload: AuthServiceLoginProps) {
    try {
      const response = await AuthService.login(payload);
      if (response.status === 200) {
        setUser(user);
      }
    } catch (error: any) {
      alert("Gagal melakukan login!");
    }
  }

  async function onLogout() {
    setUser(null);
    localStorage.removeItem("access_token");
    router.reload();
  }

  if (initializing)
    return (
      <AuthContext.Provider
        value={{
          initializing,
          setInitializing,
          user,
          setUser,
          onLogin,
          onLogout,
        }}
      >
        <LoadingOverlay
          visible={initializing}
          overlayProps={{ bg: "dark", opacity: 0.5 }}
        />
        {children}
      </AuthContext.Provider>
    );

  return (
    <AuthContext.Provider
      value={{
        initializing,
        setInitializing,
        user,
        setUser,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
