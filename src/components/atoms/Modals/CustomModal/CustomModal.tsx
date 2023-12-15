import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

interface CustomModalProps {
  title?: string;
  description?: string;
  mainLabel?: string;
  mainButtonColor?: string;
  closeLabel?: string;
  submitLabel?: string;
  onClick: () => void;
}

const CustomModal = ({
  title,
  description,
  mainLabel,
  mainButtonColor,
  closeLabel,
  submitLabel,
  onClick,
}: CustomModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title={title} centered>
        <Stack>
          <Text>{description}</Text>
          <Group justify="flex-end">
            <Button variant="filled" color="gray" onClick={close}>
              {closeLabel || "Cancel"}
            </Button>
            <Button
              variant="filled"
              color="red"
              onClick={() => {
                onClick();
                close();
              }}
            >
              {submitLabel || "Submit"}
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Button onClick={open} color={mainButtonColor || "red"}>
        {mainLabel || "Submit"}
      </Button>
    </>
  );
};

export default CustomModal;
