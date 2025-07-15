import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import AddIcon from "../../assets/icons/AddIcon.svg";
import DeleteIcon from "../../assets/icons/DeleteIcon.svg";

import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
  MenuItemOption,
  MenuOptionGroup,
  Select,
  Skeleton,
  Img,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { TbCurrencyNaira } from "react-icons/tb";
import { BsCurrencyDollar } from "react-icons/bs";
import { LuEuro } from "react-icons/lu";
import EmptyDataImg from "../../assets/images/emptyData.png";

import useAssetsCategory from "../../custom-hooks/http-services/use-GET/useAssetsCategory";
import useAssets from "../../custom-hooks/http-services/use-GET/useAssets";
import useAssetsCurrencies from "../../custom-hooks/http-services/use-GET/useCurrencies";
import { groupBy } from "../../custom-hooks/http-services/utils/groupBy";
import { calculateTotalAmount } from "../../custom-hooks/http-services/utils/totalAmount";
import { colors } from "../../constants/colors";
import useDeleteAsset from "../../custom-hooks/http-services/use-DELETE/useDeleteAsset";


const Assets = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    data,
    error,
    isLoadingError,
    isRefetching,
    isRefetchError,
  } = useAssetsCategory();

  const assets = useAssets();
  const currency = useAssetsCurrencies();
  const deleteAsset = useDeleteAsset();
  const info = currency.data?.data;
  const currencies = info?.data;

  const toast = useToast();

  const [show, setShow] = useState<boolean>(false);
  const [category, setCategory] = useState<any>(null);
  const [asset, setAsset] = useState<any>(null);
  const [selected, setSelected] = useState<any>("All Assets");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("Naira");
  const [currencyTotalAmount, setCurrencyTotalAmount] = useState<any>(null);

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
      const resData = data?.data;
      if (resData) {
        setCategory(resData?.data);
      } else setCategory(null);
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
      const { data } = assets.data?.data;
      //i Grouped the data response by Currency

      if (assets.data?.data) {
        setAsset(data);
        const groupedByCurrency = groupBy(data, "currency");

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
      } else {
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

  const filteredAssets = asset?.filter(
    (item: any) =>
      selected.trim() === "All Assets" ||
      item.asset_name.toLowerCase().includes(selected.toLowerCase())
  );

  const handleDeleteAsset = (id: any) => {
    deleteAsset.mutateAsync(id, {
      onSuccess: async (resData) => {
        const { message } = resData?.data;
        toast({
          title: message,
          position: "top-right",
          isClosable: true,
          status: "success",
          variant: "top-accent",
        });

        await assets.refetch(); // refetch assetså


        
      },
      onError: (error: any) => {
        if (error.response === undefined) {
          toast({
            title: "something went wrong check network or try again!",
            position: "top-right",
            isClosable: true,
            status: "error",
            variant: "top-accent",
          });
          return;
        }
        const { status, message } = error?.response.data;
        if (!status) {
          toast({
            title: message,
            position: "top-right",
            isClosable: true,
            status: "error",
            variant: "left-accent",
          });
          return;
        }
      },
    });
  }
  return (
    <Flex direction={"column"} gap={"4vh"} w="100%" px="2vw" pb="3vh">
      <Grid templateColumns="repeat(6, 1fr)" w="100%" gap={5}>
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
                  currency?.error ||
                  currency?.isLoading ||
                  currency?.isRefetching
                    ? true
                    : false
                }
              >
                {currencies?.map((currency: any) => (
                  <option key={currency?.currency} value={currency?.currency}>
                    {currency?.currency}
                  </option>
                ))}
              </Select>
            </HStack>
            <Flex align={"center"} py={"2px"}>
              {selectedCurrency === "Naira" && (
                <Icon as={TbCurrencyNaira} w={10} h={10} />
              )}
              {selectedCurrency === "Dollar" && (
                <Icon as={BsCurrencyDollar} w={10} h={10} />
              )}
              {selectedCurrency === "Euro" && (
                <Icon as={LuEuro} w={10} h={10} />
              )}
              <Heading size={"lg"}>
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
        <GridItem colSpan={{ base: 6, md: 1 }}>
          <Flex h="100%" w="100%" align={"end"}>
            <Button
              colorScheme="green"
              backgroundColor={colors.green_01}
              size="md"
              rounded={"full"}
              rightIcon={<AddIcon />}
              onClick={() => navigate("addassets")}
            >
              Add New Assets
            </Button>
          </Flex>
        </GridItem>
      </Grid>

      {!assets?.isLoading && asset && asset.length === 0 ? (
        <Flex
          direction={"column"}
          gap={"1vh"}
          h="full"
          align={"center"}
          justify={"center"}
        >
          <Img
            objectFit="contain"
            width={"30vw"}
            h={"30vh"}
            src={EmptyDataImg}
            alt="img"
          />
          <Heading size={"sm"} color={"gray"}>
            You haven't added any assets yet
          </Heading>
          <Button
            colorScheme="green"
            size="md"
            rounded={"full"}
            rightIcon={<AddIcon />}
             onClick={() => navigate("addassets")}
          >
            Add New Assets
          </Button>
        </Flex>
      ) : (
        <TableContainer
          borderTopRadius={"md"}
          bgColor={"rgba(0, 129, 69, 0.1)"}
          overflow="auto"
        >
          <Table colorScheme="green">
            <TableCaption
              placement="top"
              textAlign={"left"}
              justifyContent={"center"}
            >
              Sort by:
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  size={"xs"}
                  mx={"2vw"}
                  colorScheme="green"
                  variant={"outline"}
                  isLoading={
                    assets.isLoading || assets.isRefetching ? true : false
                  }
                >
                  {selected ? selected : "All Assets"}
                </MenuButton>
                <MenuList maxH={"40vh"} overflowY={"auto"}>
                  <MenuOptionGroup
                    title="Assets Category"
                    type="radio"
                    onChange={(value) => {
                      setSelected(value);
                    }}
                  >
                    <MenuItemOption value={"All Assets"}>
                      All Assets
                    </MenuItemOption>
                    {category &&
                      category?.map((item: any, id:any) => (
                        <MenuItemOption value={item?.name} key={id}>
                          {item.name}
                        </MenuItemOption>
                      ))}
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </TableCaption>
            <Thead bgColor={"rgba(0, 129, 69, 0.2)"}>
              <Tr>
                <Th>SN</Th>
                <Th>Assest</Th>
                <Th isNumeric>Value</Th>
                <Th>Date Added</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {assets?.error || assets?.isLoading
                ? new Array(4).fill({}).map((_item, i) => (
                    <Tr key={i}>
                      <Td>
                        <Skeleton height="20px" w={"30px"} />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                    </Tr>
                  ))
                : !assets?.isLoading && asset && asset.length > 0
                ? filteredAssets.map((data: any, i: number) => {
                    const date = data?.created_at;
                    const amt = parseInt(data?.amount).toLocaleString();
                    const formattedDate = new Date(date).toLocaleDateString();
                    const sign =
                      data?.currency === "Naira"
                        ? "₦"
                        : data?.currency === "Dollar"
                        ? "$"
                        : "€";

                    return (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{data?.asset_name || "-"}</Td>
                        <Td isNumeric>
                          {sign} {amt || "-"}
                        </Td>
                        <Td>{formattedDate || "-"}</Td>
                        <Td>
                          <Button
                            bgColor={"rgba(255, 0, 0, 0.1)"}
                            color={"red"}
                            variant={"solid"}
                            leftIcon={<DeleteIcon />}
                            rounded={"full"}
                            size={"sm"}
                            fontSize={"10px"}
                            onClick={() => {handleDeleteAsset(data?.asset_id)}}
                          >
                            Delete
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Flex>
  );
};

export default Assets;
