import {
  Flex,
  Grid,
  GridItem,
  Hide,
  Divider,
  Heading,
  Text,
  Stack,
  HStack,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
} from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import Sidebar from "../../components/Sidebar";
import DashBoardPageNavigation from "../../components/DashBoardPageNavigation";
import { Outlet, useLocation } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useUser from "../../custom-hooks/http-services/use-GET/useUser";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

const Dashboard = () => {
  const [_cookies, _setCookie, removeCookie] = useCookies(["auth"]);
  const { isLoading, error, data } = useUser();
  const info = data?.data?.data;
  const loaded = !isLoading || error ? true : false;
  const location = useLocation();
  const path: any = location.pathname.split("/").pop();
  const paths = ["Dashboard", "Assets", "addassets", "EstatePlans", "settings"];

  const handleLogout = () => {
    removeCookie("auth");
  };
  return (
    <Flex
      bgColor={"green"}
      p={{ lg: "4px" }}
      h={"100vh"}
      direction={{ base: "column", lg: "row" }}
    >
      {/* for small screen */}
      <Hide above="lg">
        <DashBoardPageNavigation handleLogout={handleLogout} info={info} />
      </Hide>

      <Grid
        templateColumns="repeat(6, 1fr)"
        w="100%"
        h="100%"
        pt={{ base: "7vh", lg: 0 }}
      >
        <GridItem colSpan={1} bgColor={"green"} px={"2vw"} hideBelow={"lg"}>
          <Sidebar />
        </GridItem>
        <GridItem
          colSpan={{ base: 6, lg: 5 }}
          bgColor={"white"}
          rounded={{ lg: "xl" }}
          overflow={"auto"}
        >
          <Flex
            w="100%"
            py="2vh"
            px="2vw"
            justify={"space-between"}
            align={"center"}
          >
            <Stack display={"flex"} direction={"column"}>
              <Skeleton isLoaded={loaded}>
                <Heading
                  size={{ base: "md", lg: "lg" }}
                  textTransform={"capitalize"}
                >
                  {paths.includes(path) && path === "Dashboard"
                    ? `Welcome ${info?.surname.toLowerCase()} ${info?.othernames.toLowerCase()}`
                    : paths.includes(path) && path === "addassets"
                    ? "Add Assets"
                    : paths.includes(path) && path}
                </Heading>
                {paths.includes(path) && path === "Dashboard" && (
                  <Text>Here’s whats happening with your assets.</Text>
                )}
              </Skeleton>
            </Stack>

            <HStack hideBelow={"lg"}>
              <IconButton
                variant={"unstyled"}
                color={"black"}
                aria-label="show"
                size={"xl"}
                fontSize="20px"
                icon={<IoIosNotificationsOutline />}
              />
              <Divider orientation="vertical" h={"4vh"} />
              <Avatar
                name={info ? `${info?.surname} ${info?.othernames}` : ""}
                src={info?.picture_url}
                size="sm"
                bgColor={"green"}
                color={"white"}
              />
              <Menu>
                <MenuButton
                  px={4}
                  py={1}
                  transition="all 0.2s"
                  _hover={{ bg: "green.100" }}
                  _expanded={{ bg: "green.400" }}
                  _focus={{ boxShadow: "outline" }}
                  textTransform={"capitalize"}
                  maxWidth={"fit-content"}
                >
                  {isLoading || error ? (
                    <Skeleton height="2vh" w={"10vw"} />
                  ) : (
                    `${info?.surname.toLowerCase()} ${info?.othernames.toLowerCase()}`
                  )}
                  <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
          <Divider hideBelow={"lg"} mb={"3vh"} />
          <Flex w="100%" pb={{ base: "12vh", lg: 0 }}>
            <Outlet />
          </Flex>
        </GridItem>
      </Grid>

      {/* <TawkMessengerReact
        propertyId="5f7ee43c4704467e89f5b01f"
        widgetId="default"
      /> */}
    </Flex>
  );
};

export default Dashboard;
