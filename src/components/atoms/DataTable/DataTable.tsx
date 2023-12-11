import { Box, Flex, SimpleGrid, Table } from "@mantine/core";
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
      minWidth={"100%"}
      maw={width || "calc(100vw - 230px - 32px)"}
      type="native"
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
                        maw={headData.width || 100}
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
                        maw={headData.width || 100}
                        key={headIndex}
                      >
                        {headData.key(itemData, itemIndex)}
                      </Table.Td>
                    );
                  return (
                    <Table.Td
                      className="align-top"
                      miw={headData.width || 100}
                      maw={headData.width || 100}
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
      </Table>
    </Table.ScrollContainer>
  );
};

export default DataTable;
