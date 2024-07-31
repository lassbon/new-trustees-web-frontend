import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  HStack,
  Heading,
  IconButton,
  Icon,
  useToast,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Brush,
  Pie,
  PieChart,
} from "recharts";
import CommonCard from "../../components/commonCard";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { TbCurrencyNaira } from "react-icons/tb";
import { LiaFlagUsaSolid } from "react-icons/lia";
import { DownloadIcon } from "@chakra-ui/icons";
import { chartData, commonCardData } from "../../config/data";
import useUser from "../../custom-hooks/http-services/use-GET/useUser";

const DashBoardHome = () => {
  const [show, setShow] = useState<boolean>(false);

  const {
    isLoading,
    data,
    error,
    isLoadingError,
    isRefetching,
    isRefetchError,
  } = useUser();

  const toast = useToast();

  useEffect(() => {
    if ((isLoadingError && !isLoading) || (isRefetchError && !isRefetching)) {
      if (error && (error as { response?: unknown })?.response === undefined) {
        toast({
          title: "something !",
          position: "top-right",
          isClosable: true,
          status: "error",
          variant: "top-accent",
        });
        return;
      }

      if (error) {
        const res = (error as { response?: any })?.response;
        const { message } = res?.data;
        console.log(res?.data);

        toast({
          title: message,
          position: "top-right",
          isClosable: true,
          status: "error",
          variant: "top-accent",
        });
      }
      return;
    }

    if (data && (!isLoading || !isRefetching)) {
      console.log(data?.data);
    }
  }, [data, isLoadingError, isLoading, isRefetchError, isRefetching, error]);

  return (
    <Flex direction={"column"} gap={"4vh"} w="100%" px="2vw">
      <Flex direction={"column"} gap={"4vh"} as={"section"}>
        <Grid templateColumns="repeat(6, 1fr)" w="100%" h="100%" gap={5}>
          <GridItem colSpan={{ base: 6, md: 5 }} alignContent={"center"}>
            <Stack direction={"column"} justify={"center"}>
              <HStack gap={"2vw"}>
                <Text textAlign={"center"}>Total Value</Text>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    leftIcon={<LiaFlagUsaSolid />}
                  >
                    Naira Assets
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Download</MenuItem>
                    <MenuItem>Create a Copy</MenuItem>
                    <MenuItem>Mark as Draft</MenuItem>
                    <MenuItem>Delete</MenuItem>
                    <MenuItem>Attend a Workshop</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
              <Flex align={"center"} py={"2px"}>
                <Icon as={TbCurrencyNaira} w={10} h={10} />
                <Heading size={"lg"}>
                  {show ? "1,000,000" : "* * * * * * "}
                </Heading>
                <IconButton
                  variant={"unstyled"}
                  color={"gray"}
                  aria-label="show"
                  icon={show ? <IoEyeOffSharp /> : <IoEyeSharp />}
                  onClick={() => setShow((prevState) => !prevState)}
                  ml={"2vw"}
                />
              </Flex>
            </Stack>
          </GridItem>
          <GridItem colSpan={{ base: 6, md: 1 }}>
            <Flex h="100%" w="100%" align={"end"}>
              <Button
                colorScheme="green"
                size="lg"
                rounded={"full"}
                rightIcon={<DownloadIcon />}
              >
                Download Asset Statement
              </Button>
            </Flex>
          </GridItem>
        </Grid>
        <Grid templateColumns="repeat(6, 1fr)" w="100%" h="100%" gap={5}>
          <GridItem
            colSpan={{ base: 6, lg: 4 }}
            bgColor={"rgba(0, 129, 69, 0.05)"}
            rounded={"md"}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Brush />
              </LineChart>
            </ResponsiveContainer>
          </GridItem>

          <GridItem
            colSpan={{ base: 6, lg: 2 }}
            bgColor={"rgba(0, 129, 69, 0.05)"}
            rounded={"md"}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="uv"
                  isAnimationActive={true}
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#82ca9d"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </GridItem>
        </Grid>
      </Flex>

      <Flex direction={"column"} gap={"2vh"} as={"section"}>
        <Heading size={"lg"}>Protect your loved ones</Heading>
        <Grid templateColumns="repeat(6, 1fr)" w="100%" h="100%" gap={3}>
          {commonCardData.map((data, i) => (
            <GridItem colSpan={{ base: 6, lg: 3 }} key={i}>
              <CommonCard {...data} />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default DashBoardHome;
