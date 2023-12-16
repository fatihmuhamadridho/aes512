import { useAuthContext } from "@/components/atoms/Auth/auth.context";
import DataTable, {
  tableHeadersProps,
} from "@/components/atoms/DataTable/DataTable";
import ModalDelete from "@/components/atoms/Modals/ModalDelete/ModalDelete";
import { useSidebarContext } from "@/components/organisms/Sidebar/Sidebar";
import DefaultTemplate from "@/components/templates/Default/Default";
import { UserService, useGetAllUser } from "@/services/userService";
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

const UserPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setInitializing } = useAuthContext();
  const { data: listUser } = useGetAllUser();
  const [searchInput, setSearchInput] = useState<string>("");

  const renderAksi = (values: any) => (
    <Flex gap={12}>
      <Button onClick={() => handleEditData(values.user_id)}>Edit</Button>
      <ModalDelete onClick={() => handleDeleteData(values.user_id)} />
    </Flex>
  );

  const listHeader: tableHeadersProps[] = [
    {
      label: "No",
      key: "index",
      width: 30,
    },
    {
      label: "Nama Lengkap",
      key: "fullname",
      width: 150,
    },
    {
      label: "Username",
      key: "username",
      width: 150,
    },
    {
      label: "Aksi",
      key: renderAksi,
      width: 200,
    },
  ];

  const handleTambahData = () => {
    router.push("/user/tambah-user");
  };

  const handleEditData = (user_id: number) => {
    router.push("/user/edit-user/" + user_id);
  };

  const handleDeleteData = async (user_id: number) => {
    try {
      setInitializing(true);
      const response = await UserService.deleteUser(user_id);
      if (response?.status === 200) {
        alert("Berhasil handleDeleteData!");
        await queryClient.invalidateQueries(["useGetAllUser"]);
        setInitializing(false);
      }
    } catch (error: any) {
      alert(error.stack);
      setInitializing(false);
    }
  };

  return (
    <DefaultTemplate title="User">
      <Paper p={16}>
        <Stack>
          <Box>
            <Button variant="default" onClick={handleTambahData}>
              Tambah Data
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
            data={listUser?.filter(
              (item: any) =>
                String(item.fullname)
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) ||
                String(item.username)
                  .toLowerCase()
                  .includes(searchInput.toLowerCase())
            )}
          />
        </Stack>
      </Paper>
    </DefaultTemplate>
  );
};

export default UserPage;
