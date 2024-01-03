import { useAuthContext } from "@/components/atoms/Auth/auth.context";
import DefaultTemplate from "@/components/templates/Default/Default";
import { FileService, FileServicePostFileProps } from "@/services/fileService";
import {
  Box,
  Button,
  Divider,
  FileInput,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Form, Formik } from "formik";
import { capitalize } from "lodash";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";

const EncryptPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setInitializing } = useAuthContext();

  const handleTambahData = async (payload: FileServicePostFileProps) => {
    try {
      setInitializing(true);
      const response = await FileService.postFile(payload);
      if (response.status === 200) {
        alert(
          `File berhasil dienkripsi dan diupload, waktu upload: ${Number(
            response.data.data.durasi_proses_enkripsi / 1000
          ).toFixed(2)} detik`
        );
        await queryClient.invalidateQueries(["useGetAllFile"]);
        setInitializing(false);
        await router.push("/decrypt");
      } else {
        alert("Gagal Enkripsi File!");
        setInitializing(false);
      }
    } catch (error: any) {
      alert("Gagal Enkripsi File!");
      setInitializing(false);
    }
  };

  return (
    <DefaultTemplate title="Enkripsi File">
      <Paper p={16}>
        <Text fz={20} fw={500}>
          Form Enkripsi
        </Text>
        <Divider mt={2} mb={8} />
        <Formik
          initialValues={{ file: null, password: "", description: "" }}
          onSubmit={(values: FileServicePostFileProps) =>
            handleTambahData(values)
          }
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Stack>
                <Stack gap={4}>
                  <FileInput
                    accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.ppt,.pptx,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.txt,text/plain,.jpg,.jpeg,image/jpeg,.png,image/png,.svg,image/svg+xml,.pdf,application/pdf"
                    label={capitalize("file")}
                    maw={400}
                    onChange={(e) =>
                      e?.size! < Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE)
                        ? setFieldValue("file", e)
                        : alert(
                            `Maaf, file tidak bisa lebih besar dari ${
                              Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE) /
                              1000000
                            } MB`
                          )
                    }
                    value={values.file}
                    required
                  />
                  <PasswordInput
                    label={capitalize("password")}
                    maw={400}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    value={values.password}
                    required
                  />
                  <Textarea
                    label={capitalize("deskripsi")}
                    maw={400}
                    minRows={4}
                    autosize
                    onChange={(e) =>
                      setFieldValue("description", e.target.value)
                    }
                    value={values.description}
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
                  Enkripsi File
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </DefaultTemplate>
  );
};

export default EncryptPage;
