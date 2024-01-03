import { useAuthContext } from "@/components/atoms/Auth/auth.context";
import DefaultTemplate from "@/components/templates/Default/Default";
import {
  AuthService,
  AuthServiceChangePasswordProps,
} from "@/services/authService";
import {
  Box,
  Button,
  Divider,
  Paper,
  PasswordInput,
  Stack,
} from "@mantine/core";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ChangePasswordPage = () => {
  const router = useRouter();
  const { user, setUser, setInitializing } = useAuthContext();
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");

  const handleChangePassword = async (
    payload: AuthServiceChangePasswordProps
  ) => {
    if (payload.new_password !== repeatNewPassword)
      return alert("Password baru tidak sama!");
    try {
      setInitializing(true);
      const response = await AuthService.changePassword(payload);
      if (response.status === 200) {
        setUser(response.data.data);
        alert("Berhasil mengganti password!");
        setInitializing(false);
        await router.push("/", undefined, { shallow: true });
      }
    } catch (error: any) {
      alert("Gagal mengganti password!");
      setInitializing(false);
    }
  };

  return (
    <DefaultTemplate title="Ganti Password">
      <Paper p={16}>
        <Formik
          initialValues={{
            username: user?.username,
            password: user?.first_login ? user?.password : "",
            new_password: "",
          }}
          onSubmit={(values: AuthServiceChangePasswordProps) =>
            handleChangePassword(values)
          }
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Stack>
                <Stack gap={4}>
                  <PasswordInput
                    maw={400}
                    label="Password Lama"
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    value={values.password}
                    required
                  />
                  <PasswordInput
                    maw={400}
                    label="Password Baru"
                    onChange={(e) =>
                      setFieldValue("new_password", e.target.value)
                    }
                    value={values.new_password}
                    required
                  />
                  <PasswordInput
                    classNames={{
                      input: clsx(
                        values.new_password !== repeatNewPassword &&
                          "!border-red-600"
                      ),
                    }}
                    maw={400}
                    label="Ulangi Password Baru"
                    onChange={(e) => setRepeatNewPassword(e.target.value)}
                    value={repeatNewPassword}
                    required
                  />
                </Stack>
                <Divider />
                <Button
                  type="submit"
                  w={"100%"}
                  maw={200}
                  variant="filled"
                  color="teal"
                >
                  Submit
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </DefaultTemplate>
  );
};

export default ChangePasswordPage;
