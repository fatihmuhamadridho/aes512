import { Box, Center, Flex, SimpleGrid, Table, Text } from "@mantine/core";
import React from "react";

export interface DataTablePrpos {
  header: tableHeadersProps[];
  data?: any[];
  width?: any;
  mah?: number | string;
}

export interface tableHeadersProps {
  label?: string;
  key?: any;
  width?: number;
}

const DataTable = ({ header, data, width, mah }: DataTablePrpos) => {
  return (
    <Table.ScrollContainer
      className="break-words"
      minWidth={"100%"}
      w={width}
      maw={"calc(100vw - 230px - 32px - 32px)"}
      // maw={width || "calc(100vw - 230px - 32px)"}
      mah={mah || 550}
    >
      <Table
        striped
        stickyHeader
        stickyHeaderOffset={-0.3}
        highlightOnHover
        withTableBorder
        withColumnBorders
      >
        <Table.Thead className="z-[5]">
          <Table.Tr>
            {header?.map((headData, headIndex: number) => {
              return <Table.Th key={headIndex}>{headData.label}</Table.Th>;
            })}
          </Table.Tr>
        </Table.Thead>
        {data?.length! > 0 && (
          <Table.Tbody>
            {data?.map((itemData: any, itemIndex: number) => {
              return (
                <Table.Tr key={itemIndex}>
                  {header.map((headData, headIndex: number) => {
                    if (headData.key === "index")
                      return (
                        <Table.Td
                          className="align-top"
                          miw={headData.width || 100}
                          key={headIndex}
                        >
                          {itemIndex + 1}
                        </Table.Td>
                      );
                    if (typeof headData.key === "function")
                      return (
                        <Table.Td
                          className="align-top"
                          miw={headData.width || 100}
                          key={headIndex}
                        >
                          {headData.key(itemData, itemIndex)}
                        </Table.Td>
                      );
                    return (
                      <Table.Td
                        className="align-top"
                        miw={headData.width || 100}
                        key={headIndex}
                      >
                        {itemData?.[headData?.key]}
                      </Table.Td>
                    );
                  })}
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        )}
      </Table>
      {(!data || data?.length! < 1) && (
        <Center className="border" w={"100%"} h={"20vh"}>
          <Text>Data Kosong</Text>
        </Center>
      )}
    </Table.ScrollContainer>
  );
};

export default DataTable;
