import DefaultTemplate from "@/components/templates/Default/Default";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, [router]);
  return <DefaultTemplate title="LogoutPage" />;
};

export default LogoutPage;
