import { Container, Group, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2 } from "@tabler/icons-react";
import React from "react";
import { useSidebarContext } from "../Sidebar/Sidebar";

interface NavbarProps {
  title?: string;
}

const Navbar = ({ title }: NavbarProps) => {
  const [, { toggle }] = useDisclosure();
  const { expand, setExpand } = useSidebarContext();

  return (
    <Container
      className="fixed text-white z-10"
      w={"100%"}
      h={50}
      fluid
      px={16}
      bg={"#5C8374"}
    >
      <Group h={"100%"} align="center">
        <UnstyledButton h={"100%"} px={0} onClick={() => setExpand(!expand)}>
          <IconMenu2 />
        </UnstyledButton>
        <Text fz={24} fw={500}>
          {title}
        </Text>
      </Group>
    </Container>
  );
};

export default Navbar;
