import {
  Accordion,
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  Group,
  Indicator,
  Menu,
  ScrollArea,
  Text,
  Transition,
  UnstyledButton,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import {
  IconChartHistogram,
  IconChevronDown,
  IconDashboard,
  IconFileAlert,
  IconFileFilled,
  IconKeyOff,
  IconLogout2,
  IconPassword,
  IconPrinter,
  IconUsersGroup,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { clsx } from "clsx";
import ModalLogout from "@/components/atoms/Modals/ModalLogout/ModalLogout";
import { useAuthContext } from "@/components/atoms/Auth/auth.context";
import { capitalize } from "lodash";

interface listRouterProps {
  title: string;
  endpoint?: string;
  icon?: any;
  children?:
    | Array<{
        title: string;
        endpoint: string;
        icon?: any;
      }>
    | ((e?: any) => void);
}

const listRoutes: listRouterProps[] = [
  {
    title: "Dashboard",
    endpoint: "/",
    icon: <IconDashboard size={18} />,
  },
  {
    title: "Enkripsi",
    endpoint: "/encrypt",
    icon: <IconFileAlert size={18} />,
  },
  {
    title: "Dekripsi",
    endpoint: "/decrypt",
    icon: <IconKeyOff size={18} />,
  },
  {
    title: "divider",
  },
  {
    title: "Data Pengguna",
    endpoint: "/user",
    icon: <IconUsersGroup size={18} />,
  },
  {
    title: "Ubah Password",
    endpoint: "/change-password",
    icon: <IconPassword size={18} />,
  },
  {
    title: "Logout",
    children: ({ key, onClick }: { key: any; onClick: () => void }) => (
      <ModalLogout key={key} onClick={onClick} />
    ),
  },
];

interface SidebarContextProps {
  expand: boolean;
  setExpand: (e?: any) => void;
}

const noop = () => {};
export const SidebarContext = createContext<SidebarContextProps>({
  expand: false,
  setExpand: noop,
});

export const useSidebarContext = () => useContext(SidebarContext);

const Sidebar = () => {
  const router = useRouter();
  const { user, onLogout } = useAuthContext();
  const { height, width } = useViewportSize();
  const [searchInput, setSearchInput] = useState<string>("");
  const [routesExpand, setRoutesExpand] = useState<string[] | undefined>(
    undefined
  );
  const { expand } = useSidebarContext();

  useEffect(() => {
    const listSideMenu = listRoutes.map((routes) => {
      return routes.title;
    });
    const sidemenu_active = localStorage.getItem("sidemenu_active");
    if (sidemenu_active) setRoutesExpand(JSON.parse(sidemenu_active));
    if (!sidemenu_active) {
      localStorage.setItem("sidemenu_active", JSON.stringify(listSideMenu));
      setRoutesExpand(listSideMenu);
    }
  }, []);

  const handleExpandMenu = (menu_name: string) => {
    const isMenuExpand = routesExpand?.findIndex(
      (routes) => routes === menu_name
    );
    if (isMenuExpand! < 0) {
      const addMenu = routesExpand?.concat([menu_name]);
      localStorage.setItem("sidemenu_active", JSON.stringify(addMenu));
      setRoutesExpand(addMenu);
    }
    if (isMenuExpand! >= 0) {
      const deleteMenu = routesExpand?.filter((routes) => routes !== menu_name);
      localStorage.setItem("sidemenu_active", JSON.stringify(deleteMenu));
      setRoutesExpand(deleteMenu);
    }
  };

  return (
    <Container
      className="fixed text-white z-10 transition-all duration-300"
      mx={0}
      pb={60}
      p={0}
      w={expand ? 230 : 60}
      h={"100%"}
      mih={"calc(100vh - 60px)"}
      bg={"#092635"}
      fluid
    >
      <UnstyledButton
        className={clsx(
          "flex items-center justify-center transition-all !duration-1000",
          !expand && "w-[60px]"
        )}
        w={"100%"}
        h={50}
        component={Link}
        href={"/"}
        bg={"#1B4242"}
      >
        <Text
          className={clsx(
            "transition-all !duration-300",
            expand ? "!text-[24px]" : "!text-[10px]"
          )}
          fw={700}
        >
          PT BNG
        </Text>
      </UnstyledButton>
      <Group px={12} h={65}>
        <Avatar
          className={clsx(
            "transition-all !duration-300",
            expand ? "!w-[45px] !h-[45px]" : "!w-[35px] !h-[35px]"
          )}
        />
        {expand && (
          <Box>
            <Text fz={14} lh={"xs"}>
              {capitalize(user?.username)}
            </Text>
            <Flex ml={4}>
              <Indicator size={8} position="middle-start" color="green" />
              <Text fz={14} ml={10} lh={"xs"}>
                Online
              </Text>
            </Flex>
          </Box>
        )}
      </Group>
      <ScrollArea h={"calc(100vh - 50px - 65px)"} px={12}>
        {routesExpand && (
          <Accordion
            value={routesExpand}
            multiple
            variant="filled"
            chevronSize={expand ? undefined : 0}
            chevron={expand ? <IconChevronDown /> : null}
          >
            {listRoutes
              .filter((item) =>
                item.title.toLowerCase().includes(searchInput.toLowerCase())
              )
              .map((routes, routesIndex) => {
                if (typeof routes.children === "function") {
                  return routes?.children({
                    key: routesIndex,
                    onClick: () => onLogout(),
                  })!;
                }
                if (routes.endpoint && !routes.children)
                  return (
                    <UnstyledButton
                      className="!text-[14px] rounded-md"
                      key={routesIndex}
                      w={"100%"}
                      px={8}
                      py={12}
                      bg={
                        router.pathname === routes.endpoint
                          ? "#1B4242"
                          : "#092635"
                      }
                      onClick={() => router.push(routes.endpoint!)}
                    >
                      <Flex gap={8} align={"center"}>
                        {routes.icon}
                        {expand && <Text fz={14}>{routes.title}</Text>}
                      </Flex>
                    </UnstyledButton>
                  );

                if (routes.title === "divider")
                  return <Divider key={routesIndex} my={12} />;

                return (
                  <Accordion.Item
                    key={routesIndex}
                    value={routes.title}
                    bg={
                      !React.isValidElement(routes.children) &&
                      Array.isArray(routes.children) &&
                      routes?.children[0]?.endpoint?.includes(
                        router.pathname.split("/")[1]
                      ) &&
                      router.pathname !== "/"
                        ? "#1B4242"
                        : "#092635"
                    }
                  >
                    <Menu
                      classNames={{
                        dropdown: "!px-2 !py-3 !border-0 -translate-y-[19px]",
                      }}
                      trigger="hover"
                      position="right-start"
                      offset={20}
                      transitionProps={{ duration: 50 }}
                      disabled={expand}
                    >
                      <Accordion.Control
                        className="!text-white !rounded-md"
                        px={8}
                        onClick={() => handleExpandMenu(routes.title)}
                      >
                        <Menu.Target>
                          <Flex gap={8} align={"center"}>
                            {routes.icon}
                            {expand && <Text fz={14}>{routes.title}</Text>}
                          </Flex>
                        </Menu.Target>
                        <Menu.Dropdown
                          className="!rounded-0"
                          w={200}
                          bg={"#092635"}
                        >
                          {!React.isValidElement(routes.children) &&
                            Array.isArray(routes.children) &&
                            routes.children?.map((child, childIndex) => (
                              <Menu.Item
                                className="!text-white !bg-[#092635] hover:!bg-[#1B4242]"
                                key={childIndex}
                              >
                                {child.title}
                              </Menu.Item>
                            ))}
                        </Menu.Dropdown>
                      </Accordion.Control>
                    </Menu>
                    {expand &&
                      !React.isValidElement(routes.children) &&
                      Array.isArray(routes.children) &&
                      routes.children?.map((child, childIndex) => (
                        <Accordion.Panel
                          key={childIndex}
                          className="cursor-pointer !text-[14px] !rounded-md"
                          classNames={{ content: "!py-[10.5px]" }}
                          bg={
                            router.pathname === child.endpoint
                              ? "#1B4242"
                              : "#092635"
                          }
                          pl={16}
                          onClick={() => router.push(child.endpoint)}
                        >
                          {child.title}
                        </Accordion.Panel>
                      ))}
                  </Accordion.Item>
                );
              })}
          </Accordion>
        )}
      </ScrollArea>
    </Container>
  );
};

export default Sidebar;
