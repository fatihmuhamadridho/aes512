import { useAuthContext } from "@/components/atoms/Auth/auth.context";
import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import CustomModal from "@/components/atoms/Modals/CustomModal/CustomModal";
import ModalDelete from "@/components/atoms/Modals/ModalDelete/ModalDelete";
import { useSidebarContext } from "@/components/organisms/Sidebar/Sidebar";
import DefaultTemplate from "@/components/templates/Default/Default";
import { FileService, useGetAllFile } from "@/services/fileService";
import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";

const DecryptPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { expand } = useSidebarContext();
  const { setInitializing } = useAuthContext();
  const { data: listFile } = useGetAllFile();

  const renderEncryptDuration = (values: any) => (
    <Text>
      {values.durasi_proses_enkripsi
        ? Math.floor(values.durasi_proses_enkripsi) + ` Detik`
        : "null"}
    </Text>
  );

  const renderDecryptDuration = (values: any) => (
    <Text>
      {values.durasi_proses_dekripsi
        ? Math.floor(values.durasi_proses_dekripsi) + ` Detik`
        : "null"}
    </Text>
  );

  const renderStatus = (values: any) => (
    <Button color={values.status === "ENCRYPTED" ? "blue" : "orange"}>
      {values.status}
    </Button>
  );

  const renderAksi = (values: any) => (
    <Flex gap={12}>
      {values.status === "ENCRYPTED" && (
        <Button onClick={() => handleDecryptFile(values.file_id)}>
          Dekripsi File
        </Button>
      )}
      {values.status === "DECRYPTED" && (
        <Button
          color="green"
          onClick={() =>
            handleDownloadDecryptFile({
              file_decrypted_url: values?.file_decrypted_url,
              file_name_source: values?.file_name_source,
            })
          }
        >
          Download
        </Button>
      )}
      {values.status === "DECRYPTED" && (
        <CustomModal
          mainLabel="Reset Decrypt"
          mainButtonColor="orange"
          title="Reset Decrypt File"
          description="Apakah Anda yakin ingin mereset decrypt file ini?"
          onClick={() => handleResetDecryptFile(values.file_id)}
        />
      )}
      <ModalDelete onClick={() => handleDeleteData(values.file_id)} />
    </Flex>
  );

  const listHeader: tableHeadersProps[] = [
    {
      label: "No",
      key: "index",
      width: 30,
    },
    {
      label: "Nama File Sumber",
      key: "file_name_source",
      width: 150,
    },
    {
      label: "Nama File Enkripsi",
      key: "file_name_encrypted",
      width: 150,
    },
    {
      label: "Durasi Enkripsi",
      key: renderEncryptDuration,
      width: 130,
    },
    {
      label: "Durasi Dekripsi",
      key: renderDecryptDuration,
      width: 130,
    },
    {
      label: "Status File",
      key: renderStatus,
      width: 150,
    },
    {
      label: "Keterangan",
      key: "description",
      width: 150,
    },
    {
      label: "Aksi",
      key: renderAksi,
      width: 300,
    },
  ];

  const handleTambahFile = () => {
    router.push("/encrypt");
  };

  const handleDecryptFile = (file_id: number) => {
    router.push("/decrypt/decrypt-file/" + file_id);
  };

  const handleDownloadDecryptFile = async ({
    file_decrypted_url,
    file_name_source,
  }: {
    file_decrypted_url: string;
    file_name_source: string;
  }) => {
    try {
      setInitializing(true);
      const response = await FileService.downloadFlie(
        file_decrypted_url + "/" + file_name_source,
        file_name_source
      );
      if (response.status === 200) {
        setInitializing(false);
      }
    } catch (error) {
      console.error("Error in handleDownloadDecryptFile:", error);
      alert("Gagal handleDownloadDecryptFile!");
      setInitializing(false);
    }
  };

  const handleResetDecryptFile = async (file_id: number) => {
    try {
      setInitializing(true);
      const response = await FileService.resetDecryptFile(file_id);
      if (response?.status === 200) {
        alert("Berhasil handleResetDecryptFile!");
        await queryClient.invalidateQueries(["useGetAllFile"]);
        setInitializing(false);
      }
    } catch (error: any) {
      console.error("Error in handleResetDecryptFile:", error);
      alert("Gagal handleResetDecryptFile!");
      setInitializing(false);
    }
  };

  const handleDeleteData = async (file_id: number) => {
    try {
      setInitializing(true);
      const response = await FileService.deleteFile(file_id);
      if (response?.status === 200) {
        alert("Berhasil handleDeleteData!");
        await queryClient.invalidateQueries(["useGetAllFile"]);
        setInitializing(false);
      }
    } catch (error: any) {
      alert(error.stack);
      setInitializing(false);
    }
  };

  return (
    <DefaultTemplate title="DecryptPage">
      <Paper p={16}>
        <Stack>
          <Box>
            <Button variant="default" onClick={handleTambahFile}>
              Tambah File Enkripsi
            </Button>
          </Box>
          <Divider />
          <Group gap={8}>
            <Text fz={12}>Search : </Text>
            <TextInput w={"100%"} maw={300} placeholder="Search" />
          </Group>
          <DataTable mah={480} header={listHeader} data={listFile} />
        </Stack>
      </Paper>
    </DefaultTemplate>
  );
};

export default DecryptPage;
