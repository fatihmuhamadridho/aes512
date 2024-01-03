import { Group, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import {
  Dropzone as DropzoneCore,
  DropzoneProps,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";

export function Dropzone(props: Partial<DropzoneProps>) {
  return (
    <DropzoneCore
      onDrop={(files) =>
        props.onDrop
          ? props.onDrop(files)
          : console.log("accepted files", files)
      }
      onReject={(files) =>
        props.onReject
          ? props.onReject(files)
          : console.log("rejected files", files)
      }
      //   maxSize={3 * 1024 ** 2}
      //   accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: "none" }}
      >
        <DropzoneCore.Accept>
          <IconUpload
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-blue-6)",
            }}
            stroke={1.5}
          />
        </DropzoneCore.Accept>
        <DropzoneCore.Reject>
          <IconX
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-red-6)",
            }}
            stroke={1.5}
          />
        </DropzoneCore.Reject>
        <DropzoneCore.Idle>
          <IconPhoto
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-dimmed)",
            }}
            stroke={1.5}
          />
        </DropzoneCore.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </div>
      </Group>
    </DropzoneCore>
  );
}