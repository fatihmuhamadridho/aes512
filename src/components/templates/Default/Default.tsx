import Navbar from "@/components/organisms/Navbar/Navbar";
import Sidebar, {
  SidebarContext,
} from "@/components/organisms/Sidebar/Sidebar";
import { Box, Container, Flex } from "@mantine/core";
import Head from "next/head";
import React, { useState } from "react";

interface DefaultTemplateProps {
  title: string;
  children?: React.ReactNode;
}

const DefaultTemplate = ({ title, children }: DefaultTemplateProps) => {
  const [expand, setExpand] = useState<boolean>(true);
  return (
    <SidebarContext.Provider value={{ expand, setExpand }}>
      <Head>
        <title>{title}</title>
      </Head>
      <Flex className="overflow-hidden" direction={"row"} h={"100%"}>
        <Sidebar />
        <Box w={"100%"} ml={expand ? 230 : 60}>
          <Navbar title={title} />
          <Container mt={50} p={16} fluid>
            {children}
          </Container>
        </Box>
      </Flex>
    </SidebarContext.Provider>
  );
};

export default DefaultTemplate;
