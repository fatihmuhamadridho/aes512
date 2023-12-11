import DefaultTemplate from "@/components/templates/Default/Default";
import { Group, Paper, Stack, Text } from "@mantine/core";
import {
  IconBook,
  IconBook2,
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
    miw={miw || 240}
    radius={16}
    bg={bg || "#FF3543"}
  >
    <Stack gap={12}>
      <Group align="center" justify="center">
        {icon || <IconUsersGroup stroke={1.5} size={80} />}
        <Text fz={48} fw={500}>
          {total}
        </Text>
      </Group>
      <Text fz={18} fw={500} ta={"center"}>
        {title}
      </Text>
    </Stack>
  </Paper>
);

const HomePage = () => {
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
            title="Jumlah Karyawan"
            total={0}
            icon={<IconUsersGroup stroke={1.5} size={80} />}
            bg="#5C8374"
          />
          <CardTotal
            title="Jumlah Kriteria"
            total={0}
            icon={<IconBook2 stroke={1.5} size={80} />}
            bg="#5C8374"
          />
          <CardTotal
            title="Jumlah User"
            total={0}
            icon={<IconUser stroke={1.5} size={80} />}
            bg="#5C8374"
          />
        </Group>
      </Stack>
    </DefaultTemplate>
  );
};

export default HomePage;
