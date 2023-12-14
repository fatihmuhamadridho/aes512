import {
  Button,
  Flex,
  Group,
  Modal,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconTrash } from "@tabler/icons-react";
import React from "react";

interface ModalDeleteProps {
  onClick: () => void;
}

const ModalLogout = ({ onClick }: ModalDeleteProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Logout" centered>
        <Stack>
          <Text>Apakah Anda yakin ingin Logout?</Text>
          <Group justify="flex-end">
            <Button
              w={"100%"}
              maw={100}
              variant="filled"
              color="gray"
              onClick={close}
            >
              Tidak
            </Button>
            <Button
              w={"100%"}
              maw={100}
              variant="filled"
              color="red"
              onClick={() => {
                onClick();
                close();
              }}
            >
              Ya
            </Button>
          </Group>
        </Stack>
      </Modal>
      <UnstyledButton
        className="!text-[14px] rounded-md"
        w={"100%"}
        px={8}
        py={12}
        onClick={open}
      >
        <Flex gap={8} align={"center"}>
          <IconLogout />
          <Text fz={14}>Logout</Text>
        </Flex>
      </UnstyledButton>
    </>
  );
};

export default ModalLogout;
