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
import { BsCurrencyDollar } from "react-icons/bs";
import { LuEuro } from "react-icons/lu";
import { DownloadIcon } from "@chakra-ui/icons";
import { chartData1, commonCardData } from "../../config/data";
import useUser from "../../custom-hooks/http-services/use-GET/useUser";
import useAssets from "../../custom-hooks/http-services/use-GET/useAssets";
import useAssetsCurrencies from "../../custom-hooks/http-services/use-GET/useCurrencies";
import { groupBy } from "../../custom-hooks/http-services/utils/groupBy";
import { calculateTotalAmount } from "../../custom-hooks/http-services/utils/totalAmount";
import { colors } from "../../constants/colors";
import { useNavigate } from "react-router-dom";

const DashBoardHome = () => {
  const [show, setShow] = useState<boolean>(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("Naira");
  const [currencyTotalAmount, setCurrencyTotalAmount] = useState<any>(null);
  const [groupedAssets, setGroupedAssets] = useState<any>({});
  const [chartData, setChartData] = useState<any>([]);
  const {
    isLoading,
    data,
    error,
    isLoadingError,
    isRefetching,
    isRefetchError,
  } = useUser();
  const assets = useAssets();
  const currency = useAssetsCurrencies();
  const info = currency.data?.data;
  const currencies = info?.data;

  const toast = useToast();
  const navigate = useNavigate();

  const handleCurrencyChange = (e: any) => {
    if (e.target.value !== "") {
      setSelectedCurrency(e.target.value);
    }
  };

  const handleRoute = (data: any) => {
    if (!data?.route) return;
    navigate(data?.route);
  };

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
        const { message } = res?.data ?? {};

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
        const { message } = res?.data ?? {};

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
      const { data = null } = assets?.data?.data || {};
      //i  Grouped the data response by Currency
      if (assets.data?.data) {
        const groupedByCurrency = groupBy(data, "currency");

        const groupedByAssets = groupBy(data, "asset_name");

        //then sum Amounts for each Currency
        const totalAmountByCurrency: any = {};

        for (const currency in groupedByCurrency) {
          // Check if currency exists in totalAmountByCurrency object
          if (
            Object.prototype.hasOwnProperty.call(groupedByCurrency, currency)
          ) {
            const amounts = groupedByCurrency[currency];

            // Calculate total sum of amounts for current currency
            const totalAmount: any = calculateTotalAmount(amounts);

            totalAmountByCurrency[currency] = totalAmount.toLocaleString();
          }
        }

        setCurrencyTotalAmount(totalAmountByCurrency);
        setGroupedAssets(groupedByAssets);
      } else {
        setCurrencyTotalAmount(null);
        setGroupedAssets(null);
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

  useEffect(() => {
    if (Object.keys(groupedAssets).length > 0) {
      const chartData = Object.keys(groupedAssets).map((assetName) => {
        const assetGroup = groupedAssets[assetName];

        // Filter by selected currency
        const filteredAssets = assetGroup.filter(
          (asset: any) => asset.currency === selectedCurrency
        );

        const totalAmount: any = calculateTotalAmount(filteredAssets);

        return {
          name: assetName,
          amount: totalAmount,
        };
      });

      setChartData(chartData);
    }
  }, [selectedCurrency, groupedAssets]);

  return (
    <Flex direction={"column"} gap={"4vh"} w="100%" px="2vw" pb="3vh">
      <Flex direction={"column"} gap={"4vh"} as={"section"}>
        <Grid templateColumns="repeat(6, 1fr)" w="100%" gap={5}>
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
                  onChange={(e) => handleCurrencyChange(e)}
                  disabled={
                    currency?.error ||
                    currency?.isLoading ||
                    currency?.isRefetching
                      ? true
                      : false
                  }
                >
                  {currencies?.map((currency: any) => (
                    <option
                      key={currency?.currency}
                      value={currency?.currency}
                      style={{ textTransform: "capitalize" }}
                    >
                      {currency?.currency.toUpperCase()}
                    </option>
                  ))}
                </Select>
              </HStack>
              <Flex align={"center"} py={"2px"}>
                {selectedCurrency === "Naira" && (
                  <Icon as={TbCurrencyNaira} w={5} h={5} />
                )}
                {selectedCurrency === "Dollar" && (
                  <Icon as={BsCurrencyDollar} w={5} h={5} />
                )}
                {selectedCurrency === "Euro" && (
                  <Icon as={LuEuro} w={5} h={5} />
                )}
                <Heading size={"md"}>
                  {show
                    ? currencyTotalAmount[selectedCurrency] || "0.00"
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
                backgroundColor={colors.green_01}
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
        <Grid templateColumns="repeat(6, 1fr)" w="100%" gap={5}>
          <GridItem
            colSpan={{ base: 6, lg: 4 }}
            bgColor={"rgba(0, 129, 69, 0.05)"}
            rounded={"md"}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData1}
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
                  fill={colors.green_01}
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
                  dataKey="amount"
                  isAnimationActive={true}
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill={colors.green_01}
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
        <Heading size={"md"}>Protect your loved ones</Heading>
        <Grid templateColumns="repeat(6, 1fr)" w="100%" rowGap={10} gap={4}>
          {commonCardData.map((data, i) => (
            <GridItem colSpan={{ base: 6, lg: 3 }} key={i}>
              <CommonCard {...data} onclick={() => handleRoute(data)} />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default DashBoardHome;
