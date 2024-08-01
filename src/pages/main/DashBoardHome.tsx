import { useEffect, useState } from "react";
// import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  Button,
  HStack,
  Heading,
  IconButton,
  Icon,
  useToast,
  Select,
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
// import { BsCurrencyDollar } from "react-icons/bs";
// import { LuEuro } from "react-icons/lu";
import { DownloadIcon } from "@chakra-ui/icons";
import { chartData, commonCardData } from "../../config/data";
import useUser from "../../custom-hooks/http-services/use-GET/useUser";
import useAssets from "../../custom-hooks/http-services/use-GET/useAssets";

const DashBoardHome = () => {
  const [show, setShow] = useState<boolean>(false);
  const [currencies, setCurrencies] = useState<any>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("Naira");
  const [currencyTotalAmount, setCurrencyTotalAmount] = useState<any>(null);

  const {
    isLoading,
    data,
    error,
    isLoadingError,
    isRefetching,
    isRefetchError,
  } = useUser();

  const assets = useAssets();

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
      // console.log(data?.data);
    }
  }, [data, isLoadingError, isLoading, isRefetchError, isRefetching, error]);

  useEffect(() => {
    if (
      (assets.isLoadingError && !assets.isLoading) ||
      (assets.isRefetchError && !assets.isRefetching)
    ) {
      if (
        assets.error &&
        (assets.error as { response?: unknown })?.response === undefined
      ) {
        toast({
          title: "something !",
          position: "top-right",
          isClosable: true,
          status: "error",
          variant: "top-accent",
        });
        return;
      }

      if (assets.error) {
        const res = (assets.error as { response?: any })?.response;
        const { message } = res?.data;

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

    if (assets.data && (!assets.isRefetching || !assets.isLoading)) {
      const { data, assetGrouped } = assets.data?.data;
      //i  Grouped the data response by Currency
      if (assets.data?.data) {
        const groupedByCurrency = data.reduce((acc: any, obj: any) => {
          const { currency, amount } = obj;

          // Check if currency already exists in accumulator
          if (!acc[currency]) {
            acc[currency] = [];
          }

          // Push current object to its respective currency array
          acc[currency].push({ amount: parseInt(amount) });

          return acc;
        }, {});

        //then sum Amounts for each Currency
        const totalAmountByCurrency: any = {};
        for (const currency in groupedByCurrency) {
          // Get all available currencies from data response
          const currencies = Object.keys(groupedByCurrency);
          setCurrencies(currencies);

          // Check if currency exists in totalAmountByCurrency object
          if (groupedByCurrency.hasOwnProperty(currency)) {
            const amounts = groupedByCurrency[currency];

            // Calculate total sum of amounts for current currency
            const totalAmount = amounts.reduce((sum: any, obj: any) => {
              return sum + obj?.amount;
            }, 0);

            totalAmountByCurrency[currency] = totalAmount.toLocaleString();
          }
        }
        console.log(assetGrouped, "assetGrouped");
        setCurrencyTotalAmount(totalAmountByCurrency);
      } else {
        setCurrencies(null);
        setCurrencyTotalAmount(null);
      }
    }
  }, [
    assets.data,
    assets.isLoadingError,
    assets.isLoading,
    assets.isRefetchError,
    assets.isRefetching,
    assets.error,
  ]);

  return (
    <Flex direction={"column"} gap={"4vh"} w="100%" px="2vw">
      <Flex direction={"column"} gap={"4vh"} as={"section"}>
        <Grid templateColumns="repeat(6, 1fr)" w="100%" h="100%" gap={5}>
          {/* currency total amount */}
          <GridItem colSpan={{ base: 6, md: 5 }} alignContent={"center"}>
            <Stack direction={"column"} justify={"center"}>
              <HStack gap={"2vw"}>
                <Text textAlign={"center"}>Total Value</Text>

                <Select
                  placeholder="Assets"
                  variant="filled"
                  width={"fit-content"}
                  value={selectedCurrency}
                  onChange={(e) => {
                    if (e.target.value !== "")
                      setSelectedCurrency(e.target.value);
                  }}
                  disabled={
                    assets?.error || assets?.isLoading || assets?.isRefetching
                      ? true
                      : false
                  }
                >
                  {currencies?.map((currency: string) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </Select>
              </HStack>
              <Flex align={"center"} py={"2px"}>
                <Icon as={TbCurrencyNaira} w={10} h={10} />
                <Heading size={"lg"}>
                  {show
                    ? currencyTotalAmount[selectedCurrency]
                    : "* * * * * * "}
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
          {/* currency total amount */}

          {/* download assets statement button */}
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
          {/* download assets statement button */}
        </Grid>

        {/* assets chart */}
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
                  nameKey={"name"}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </GridItem>
        </Grid>
        {/* assets chart */}
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
