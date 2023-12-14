import { useAuthContext } from "@/components/atoms/Auth/auth.context";
import DefaultTemplate from "@/components/templates/Default/Default";
import React, { useEffect } from "react";

const LogoutPage = () => {
  const { onLogout } = useAuthContext();
  useEffect(() => {
    onLogout();
  }, [onLogout]);
  return <DefaultTemplate title="LogoutPage" />;
};

export default LogoutPage;
