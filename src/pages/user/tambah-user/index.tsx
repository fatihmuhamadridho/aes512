import { useAuthContext } from "@/components/atoms/Auth/auth.context";
import DefaultTemplate from "@/components/templates/Default/Default";
import {
  UserService,
  UserServicePostUserProps,
  useGetOneUser,
} from "@/services/userService";
import {
  Box,
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Form, Formik } from "formik";
import { capitalize } from "lodash";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";

const TambahUserPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setInitializing } = useAuthContext();

  const handleTambahData = async (payload: UserServicePostUserProps) => {
    try {
      setInitializing(true);
      const response = await UserService.postUser(payload);
      if (response.status === 200) {
        alert("Berhasil handleTambahData!");
        await queryClient.invalidateQueries(["useGetAllUser"]);
        setInitializing(false);
        await router.push("/user");
      } else {
        alert("Gagal handleTambahData!");
        setInitializing(false);
      }
    } catch (error: any) {
      alert("Gagal handleTambahData!");
      setInitializing(false);
    }
  };

  return (
    <DefaultTemplate title="TambahUserPage">
      <Paper p={16}>
        <Text fz={20} fw={500}>
          Form Tambah User
        </Text>
        <Divider mt={2} mb={8} />
        <Formik
          enableReinitialize
          initialValues={{ fullname: "", username: "" }}
          onSubmit={(values: UserServicePostUserProps) =>
            handleTambahData(values)
          }
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Stack>
                <Stack gap={4}>
                  <TextInput
                    label={capitalize("fullname")}
                    maw={400}
                    onChange={(e) => setFieldValue("fullname", e.target.value)}
                    value={values.fullname}
                  />
                  <TextInput
                    label={capitalize("username")}
                    maw={400}
                    onChange={(e) => setFieldValue("username", e.target.value)}
                    value={values.username}
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

export default TambahUserPage;
