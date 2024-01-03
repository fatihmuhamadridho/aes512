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
import React, { useState } from "react";
import { useQueryClient } from "react-query";

const DecryptPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { expand } = useSidebarContext();
  const { setInitializing } = useAuthContext();
  const { data: listFile } = useGetAllFile();
  const [searchInput, setSearchInput] = useState<string>("");

  const renderFileSize = (values: any) => (
    <Text>{bytesToSize(values?.file_size)}</Text>
  );

  const renderEncryptDuration = (values: any) => (
    <Text>
      {values.durasi_proses_enkripsi
        ? convertMillisToTimeString(Math.floor(values.durasi_proses_enkripsi))
        : "null"}
    </Text>
  );

  const renderDecryptDuration = (values: any) => (
    <Text>
      {values.durasi_proses_dekripsi
        ? convertMillisToTimeString(Math.floor(values.durasi_proses_dekripsi))
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
      label: "Ukuran File",
      key: renderFileSize,
      width: 125,
    },
    {
      label: "Durasi Enkripsi",
      key: renderEncryptDuration,
      width: 150,
    },
    {
      label: "Durasi Dekripsi",
      key: renderDecryptDuration,
      width: 150,
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

  function bytesToSize(bytes: number): string {
    if (bytes === 0) return "0 Byte";
    const k: number = 1024;
    const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB"];

    const i: number = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round(100 * (bytes / Math.pow(k, i))) / 100 + " " + sizes[i];
  }

  function convertMillisToTimeString(millis: number): string {
    // Hitung jam, menit, detik, dan milidetik
    const totalSeconds = Math.floor(millis / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = millis % 1000;

    // Format hasil ke dalam string dengan tambahan nol pada digit yang lebih kecil
    const resultString = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds
      .toString()
      .padStart(3, "0")}`;

    return resultString;
  }

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
      console.error("Error in download file:", error);
      alert("Gagal download file!");
      setInitializing(false);
    }
  };

  const handleResetDecryptFile = async (file_id: number) => {
    try {
      setInitializing(true);
      const response = await FileService.resetDecryptFile(file_id);
      if (response?.status === 200) {
        alert("Berhasil reset dekripsi file!");
        await queryClient.invalidateQueries(["useGetAllFile"]);
        setInitializing(false);
      }
    } catch (error: any) {
      console.error("Error in reset dekripsi file:", error);
      alert("Gagal reset dekripsi file!");
      setInitializing(false);
    }
  };

  const handleDeleteData = async (file_id: number) => {
    try {
      setInitializing(true);
      const response = await FileService.deleteFile(file_id);
      if (response?.status === 200) {
        alert("Berhasil delete data!");
        await queryClient.invalidateQueries(["useGetAllFile"]);
        setInitializing(false);
      }
    } catch (error: any) {
      alert(error.stack);
      setInitializing(false);
    }
  };

  return (
    <DefaultTemplate title="Dekripsi">
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
            <TextInput
              w={"100%"}
              maw={300}
              placeholder="Search"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
          </Group>
          <DataTable
            mah={550}
            header={listHeader}
            data={listFile?.filter(
              (item: any) =>
                String(item?.file_name_source)
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) ||
                String(item?.file_name_source)
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) ||
                String(item?.description)
                  .toLowerCase()
                  .includes(searchInput.toLowerCase())
            )}
          />
        </Stack>
      </Paper>
    </DefaultTemplate>
  );
};

export default DecryptPage;
