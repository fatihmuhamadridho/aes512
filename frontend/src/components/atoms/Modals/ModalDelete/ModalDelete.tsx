import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

interface ModalDeleteProps {
  onClick: () => void;
}

const ModalDelete = ({ onClick }: ModalDeleteProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete" centered>
        <Stack>
          <Text>Apakah Anda yakin ingin mendelete data ini?</Text>
          <Group justify="flex-end">
            <Button variant="filled" color="gray" onClick={close}>
              Cancel
            </Button>
            <Button
              variant="filled"
              color="red"
              onClick={() => {
                onClick();
                close();
              }}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Button onClick={open} color="red">
        Delete
      </Button>
    </>
  );
};

export default ModalDelete;
