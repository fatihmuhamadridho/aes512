import DefaultTemplate from "@/components/templates/Default/Default";
import { useGetAllDashboard } from "@/services/dashboardService";
import { Group, Paper, Stack, Text } from "@mantine/core";
import {
  IconFileAlert,
  IconKeyOff,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";
import React from "react";

interface CardTotalProps {
  title: string;
  total?: number;
  icon?: any;
  miw?: number;
  bg?: string;
}

const CardTotal = ({ title, total = 0, icon, miw, bg }: CardTotalProps) => (
  <Paper
    className="text-white"
    p={24}
    miw={miw || 200}
    radius={16}
    bg={bg || "#FF3543"}
  >
    <Stack gap={12}>
      <Group align="center" justify="center">
        {icon || <IconUsersGroup stroke={1.5} size={60} />}
        <Text fz={38} fw={500}>
          {total}
        </Text>
      </Group>
      <Text fz={16} fw={500} ta={"center"}>
        {title}
      </Text>
    </Stack>
  </Paper>
);

const HomePage = () => {
  const { data: listDashboard } = useGetAllDashboard();

  return (
    <DefaultTemplate title="HomePage">
      <Stack>
        <Paper
          className="!text-white"
          py={12}
          px={24}
          radius={8}
          bg={"#5C8374"}
        >
          <Text fz={24} fw={600}>
            Selamat Datang!
          </Text>
          <Text fz={16} fw={400}>
            Ini adalah aplikasi untuk memanajemen database
          </Text>
        </Paper>
        <Group>
          <CardTotal
            title="File Terenkripsi"
            total={listDashboard?.encrypted_file}
            icon={<IconFileAlert stroke={1.5} size={60} />}
            bg="#5C8374"
          />
          <CardTotal
            title="File Terdekripsi"
            total={listDashboard?.decrypted_file}
            icon={<IconKeyOff stroke={1.5} size={60} />}
            bg="#5C8374"
          />
          <CardTotal
            title="Jumlah User"
            total={listDashboard?.user}
            icon={<IconUser stroke={1.5} size={60} />}
            bg="#5C8374"
          />
        </Group>
      </Stack>
    </DefaultTemplate>
  );
};

export default HomePage;
