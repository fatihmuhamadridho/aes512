import { useAuthContext } from "@/components/atoms/Auth/auth.context";
import DefaultTemplate from "@/components/templates/Default/Default";
import { FileService, useGetOneFile } from "@/services/fileService";
import {
  Box,
  Button,
  Divider,
  FileInput,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Textarea,
  UnstyledButton,
} from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { Form, Formik } from "formik";
import { capitalize } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import fileDownload from "js-file-download";
import axios from "axios";
import { dayjs } from "@/libs/dayjs";

interface LabelValueProps {
  label: string;
  value: string | React.ReactNode;
}

const LabelValue = ({ label, value }: LabelValueProps) => (
  <Flex>
    <Text style={{ flex: 0.5 }}>{label}</Text>
    <Text style={{ flex: 0.05 }}>:</Text>
    {typeof value === "string" && <Text style={{ flex: 1 }}>{value}</Text>}
    {typeof value !== "string" && <Box style={{ flex: 1 }}>{value}</Box>}
  </Flex>
);

const DecryptFile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setInitializing } = useAuthContext();
  const { file_id }: { [key: string]: any } = router.query;
  const { data: detailFile } = useGetOneFile(file_id);

  useEffect(() => {
    async function isDecrypted() {
      if (detailFile) {
        if (detailFile.status === "DECRYPTED") {
          await router.push("/decrypt");
        }
      }
    }

    isDecrypted();
  }, [detailFile, router]);

  const handleDecryptFile = async (password: string) => {
    try {
      setInitializing(true);
      const response = await FileService.decryptFile({ file_id, password });
      if (response?.status === 200) {
        alert("Berhasil handleDecryptFile!");
        await queryClient.invalidateQueries(["useGetAllFile"]);
        setInitializing(false);
        await router.push("/decrypt", undefined, { shallow: true });
      } else {
        alert("Gagal handleDecryptFile!");
        setInitializing(false);
      }
    } catch (error: any) {
      alert("Gagal handleDecryptFile!");
      setInitializing(false);
    }
  };

  const handleDownloadEncryptFile = async () => {
    try {
      setInitializing(true);
      const response = await FileService.downloadFlie(
        detailFile?.file_encrypted_url + "/" + detailFile?.file_name_encrypted,
        detailFile?.file_name_encrypted
      );
      if (response.status === 200) {
        setInitializing(false);
      }
    } catch (error) {
      console.error("Error in handleDownloadEncryptFile:", error);
      alert("Gagal handleDownloadEncryptFile!");
      setInitializing(false);
    }
  };

  return (
    <DefaultTemplate title="DecryptFile">
      <Paper p={16}>
        <Text fz={20} fw={500}>
          Form Dekripsi File - {detailFile?.file_name_encrypted}
        </Text>
        <Divider mt={2} mb={16} />
        <Formik
          enableReinitialize
          initialValues={{ password: "" }}
          onSubmit={(values: { password: string }) =>
            handleDecryptFile(values.password)
          }
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Stack>
                <Stack gap={4}>
                  <LabelValue
                    label={capitalize("Nama File")}
                    value={detailFile?.file_name_source}
                  />
                  <LabelValue
                    label={capitalize("File Enkripsi")}
                    value={
                      <Group>
                        <Text>{detailFile?.file_name_encrypted}</Text>
                        <UnstyledButton onClick={handleDownloadEncryptFile}>
                          <Flex gap={4} align={"center"}>
                            <IconDownload color="green" />
                            <Text fz={14} c={"green"}>
                              Download
                            </Text>
                          </Flex>
                        </UnstyledButton>
                      </Group>
                    }
                  />
                  <LabelValue
                    label={capitalize("Ukuran File")}
                    value={detailFile?.file_size + ` bytes`}
                  />
                  <LabelValue
                    label={capitalize("Tanggal Enkripsi")}
                    value={dayjs(detailFile?.createdAt).format(
                      "DD-MM-YYYY HH:mm:ss"
                    )}
                  />
                  <LabelValue
                    label={capitalize("Keterangan")}
                    value={detailFile?.description}
                  />
                  <LabelValue
                    label={capitalize("Masukkan password untuk dekripsi")}
                    value={
                      <PasswordInput
                        maw={250}
                        placeholder="Password"
                        autoComplete="off"
                        onChange={(e) =>
                          setFieldValue("password", e.target.value)
                        }
                        value={values.password}
                      />
                    }
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
                  Dekripsi File
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </DefaultTemplate>
  );
};

export default DecryptFile;
