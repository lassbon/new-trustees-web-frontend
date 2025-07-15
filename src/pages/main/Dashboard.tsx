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
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useUser from "../../custom-hooks/http-services/use-GET/useUser";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { colors } from "../../constants/colors";

const Dashboard = () => {
  const [_cookies, _setCookie, removeCookie] = useCookies(["auth"]);
  const { isLoading, error, data } = useUser();
  const info = data?.data?.data;
  const loaded = !isLoading || error ? true : false;
  const location = useLocation();
  const navigate = useNavigate();
  const path: any = location.pathname.split("/").pop();
  const paths = ["Dashboard", "Assets", "addassets", "EstatePlans", "settings"];

  const handleLogout = () => {
    removeCookie("auth");
  };

  const handleBackClick = () => {
    navigate(-1);
  };
  
  return (
    <Flex
      bgColor={colors.green_01}
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
        <GridItem
          colSpan={1}
          bgColor={colors.green_01}
          px={"2vw"}
          hideBelow={"lg"}
        >
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
                  size={{ base: "sm", lg: "md" }}
                  textTransform={"capitalize"}
                >
                  {paths.includes(path) && path === "Dashboard" ? (
                    `Welcome ${info?.surname.toLowerCase()} ${info?.othernames.toLowerCase()}`
                  ) : paths.includes(path) && path === "addassets" ? (
                    "Add Assets"
                  ) : paths.includes(path) ? (
                    path
                  ) : (
                    <Text
                      as="button"
                      onClick={handleBackClick}
                      _hover={{ textDecoration: "underline" }}
                    >
                      Back
                    </Text>
                  )}
                </Heading>
                {/* {paths.includes(path) && path === "EstatePlans/AddPlans" && (
                  <Heading
                    size={{ base: "sm", lg: "md" }}
                    textTransform={"capitalize"}
                  >
                    Back
                  </Heading>
                )} */}
                {paths.includes(path) && path === "Dashboard" && (
                  <Text>Here’s whats happening with your assets.</Text>
                )}
              </Skeleton>
            </Stack>

            <HStack hideBelow={"lg"}>
              {/* <IconButton
                variant={"unstyled"}
                color={"black"}
                aria-label="show"
                size={"xl"}
                fontSize="20px"
                icon={<IoIosNotificationsOutline />}
              />
              <Divider orientation="vertical" h={"4vh"} /> */}
              <Avatar
                name={info ? `${info?.surname} ${info?.othernames}` : ""}
                src={info?.picture_url}
                size="sm"
                bgColor={colors.green_01}
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
        <TawkMessengerReact
          propertyId="676ed39049e2fd8dfeff1e52"
          widgetId="default"
        />
      </Grid>
    </Flex>
  );
};

export default Dashboard;
