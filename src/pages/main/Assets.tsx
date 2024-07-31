import { useEffect, useState } from "react";
import { ChevronDownIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";
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
  MenuItem,
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
} from "@chakra-ui/react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { LiaFlagUsaSolid } from "react-icons/lia";
import { TbCurrencyNaira } from "react-icons/tb";
import { tableData } from "../../config/data";

import useAssetsCategory from "../../custom-hooks/http-services/use-GET/useAssetsCategory";
import useAssetsInfo from "../../custom-hooks/http-services/use-GET/useAssetsInfo.";

const Assets = () => {
  const {
    isLoading,
    data,
    error,
    isLoadingError,
    isRefetching,
    isRefetchError,
  } = useAssetsCategory();

  const toast = useToast();

  const [show, setShow] = useState<boolean>(false);
  const [category, setCategory] = useState<any>(null);
  const [asset_id, setAsset_id] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);

  const assets = useAssetsInfo({ asset_id });

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
      const resData = data?.data;
      if (resData) {
        setCategory(resData?.data);
      } else setCategory(null);
      console.log(data?.data, "category");
    }
  }, [data, isLoadingError, isLoading, isRefetchError, isRefetching, error]);

  useEffect(() => {
    if (
      (assets?.isLoadingError && !assets?.isLoading) ||
      (assets?.isRefetchError && !assets?.isRefetching)
    ) {
      if (
        assets?.error &&
        (assets?.error as { response?: unknown })?.response === undefined
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

      if (assets?.error) {
        const res = (assets?.error as { response?: any })?.response;
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

    if (assets?.data && (!assets?.isRefetching || !assets?.isLoading)) {
      const resData = assets?.data?.data;
      console.log(resData, "category");
      if (resData) {
        setCategory(resData?.data);
      } else setCategory(null);
    }
  }, [
    assets?.data,
    assets?.isLoadingError,
    assets?.isLoading,
    assets?.isRefetchError,
    assets?.isRefetching,
    assets?.error,
  ]);

  return (
    <Flex direction={"column"} gap={"4vh"} w="100%" px="2vw">
      <Grid templateColumns="repeat(6, 1fr)" w="100%" h="100%" gap={5}>
        <GridItem colSpan={{ base: 6, md: 5 }} alignContent={"center"}>
          <Stack direction={"column"} justify={"center"}>
            <HStack gap={"2vw"}>
              <Text textAlign={"center"}>Total Value</Text>
              <Menu autoSelect={false}>
                <MenuButton
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  leftIcon={<LiaFlagUsaSolid />}
                  isDisabled={!category ? true : false}
                  isLoading={isLoading || isRefetching ? true : false}
                >
                  {selected ? selected : "Assets"}
                </MenuButton>
                <MenuList>
                  <MenuOptionGroup
                    title="Assets Category"
                    type="radio"
                    onChange={(value) => {
                      setSelected(value);
                    }}
                  >
                    {category &&
                      category?.map((item: any) => (
                        <MenuItemOption value={item?.name}>
                          {item.name}
                        </MenuItemOption>
                      ))}
                  </MenuOptionGroup>
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
              size="md"
              rounded={"full"}
              rightIcon={<AddIcon />}
            >
              Add New Assets
            </Button>
          </Flex>
        </GridItem>
      </Grid>

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
              <MenuList>
                <MenuOptionGroup
                  title="Assets Category"
                  type="radio"
                  onChange={(value) => {
                    setSelected(value);
                  }}
                >
                  {category &&
                    category?.map((item: any) => (
                      <MenuItemOption
                        onClick={async () => {
                          await setAsset_id(item?._id);
                          assets?.refetch();
                        }}
                        value={item?.name}
                      >
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
              <Th textAlign={"center"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((data, i) => (
              <Tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{data?.asset || "-"}</Td>
                <Td isNumeric>&#8358; {data?.value || "-"}</Td>
                <Td>{data?.DateAdded || "-"}</Td>
                <Td textAlign={"center"}>
                  <Button
                    bgColor={"rgba(255, 0, 0, 0.1)"}
                    color={"red"}
                    variant={"solid"}
                    leftIcon={<DeleteIcon />}
                    rounded={"full"}
                    size={"xs"}
                    fontSize={"10px"}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};

export default Assets;
