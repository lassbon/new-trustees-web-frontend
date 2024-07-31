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
  MenuDivider,
  MenuItem,
  MenuList,
  Skeleton,
} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import DashBoardPageNavigation from "../../components/DashBoardPageNavigation";
import { Outlet, useLocation } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useUser from "../../custom-hooks/http-services/use-GET/useUser";

const Dashboard = () => {
  const { isLoading, error, data } = useUser();
  const info = data?.data?.data;
  const loaded = !isLoading && !error ? true : false;
  const location = useLocation();
  console.log(location.pathname);
  const path = location.pathname.split("/").pop();
  return (
    <Flex
      bgColor={"green"}
      p={{ lg: "4px" }}
      h={"100vh"}
      direction={{ base: "column", lg: "row" }}
    >
      {/* for small screen */}
      <Hide above="lg">
        <DashBoardPageNavigation />
      </Hide>

      <Grid templateColumns="repeat(6, 1fr)" w="100%" h="100%">
        <GridItem colSpan={1} bgColor={"green"} px={"2vw"} hideBelow={"lg"}>
          <Sidebar />
        </GridItem>
        <GridItem
          colSpan={{ base: 6, lg: 5 }}
          bgColor={"white"}
          rounded={{ lg: "xl" }}
          h="full"
          overflow={"auto"}
          pb={"2vh"}
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
                  textTransform={"lowercase"}
                >
                  {path === "Dashboard"
                    ? `Welcome ${info?.surname} ${info?.othernames}`
                    : path}
                </Heading>
                {path === "Dashboard" && (
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
                src=""
                size="sm"
                bgColor={"green"}
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
                >
                  {`${info?.surname} ${info?.othernames}` || "-  -"}{" "}
                  <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem>New File</MenuItem>
                  <MenuItem>New Window</MenuItem>
                  <MenuDivider />
                  <MenuItem>Open...</MenuItem>
                  <MenuItem>Save File</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
          <Divider hideBelow={"lg"} mb={"3vh"} />
          <Outlet />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Dashboard;
