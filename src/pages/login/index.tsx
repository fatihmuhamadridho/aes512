import {
  Button,
  Center,
  Paper,
  PasswordInput,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React from "react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { AuthService, AuthServiceLoginProps } from "@/services/authService";
import Head from "next/head";
import { useAuthContext } from "@/components/atoms/Auth/auth.context";

const LoginPage = () => {
  const router = useRouter();
  const { setInitializing } = useAuthContext();

  const handleLogin = async (payload: AuthServiceLoginProps) => {
    try {
      setInitializing(true);
      const response = await AuthService.login(payload);
      if (response.status === 200) {
        alert("Berhasil melakukan login!");
        setTimeout(() => {
          setInitializing(false);
          localStorage.setItem("access_token", response.data.data.access_token);
          router.push("/");
        }, 500);
      } else {
        alert("Gagal melakukan login!");
        setInitializing(false);
      }
    } catch (error: any) {
      alert("Gagal melakukan login!");
      setInitializing(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Paper className="!text-white" h={"100vh"} bg={"#092635"}>
        <Center h={"90vh"}>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values: AuthServiceLoginProps) => handleLogin(values)}
          >
            {({ handleSubmit, values, setFieldValue }) => (
              <Form className="max-w-[250px] w-full" onSubmit={handleSubmit}>
                <Stack gap={8}>
                  <Text fz={24} fw={500} tt={"uppercase"} ta={"center"}>
                    Login
                  </Text>
                  <Space h={4} />
                  <TextInput
                    placeholder="Username"
                    onChange={(e) => setFieldValue("username", e.target.value)}
                    value={values.username}
                  />
                  <PasswordInput
                    placeholder="Password"
                    autoComplete="password"
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    value={values.password}
                  />
                  <Space h={12} />
                  <Button type="submit" variant="filled" color="teal">
                    Login
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Center>
      </Paper>
    </>
  );
};

export default LoginPage;
