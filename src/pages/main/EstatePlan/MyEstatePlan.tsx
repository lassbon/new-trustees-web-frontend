// import { AddIcon } from "@chakra-ui/icons";
import AddIcon from "../../../assets/icons/AddIcon.svg";

import { GoDotFill } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";
import {
  Flex,
  Stack,
  Heading,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Icon,
  Img,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
// import { myEstatePlanData } from "../../../config/data";
import EmptyDataImg from "../../../assets/images/emptyData.png";
import useEstatePlans from "../../../custom-hooks/http-services/use-GET/useEstatePlans";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { colors } from "../../../constants/colors";

const MyEstatePlan = () => {
  const {
    isLoading,
    data,
    error,
    isLoadingError,
    isRefetching,
    isRefetchError,
  } = useEstatePlans();

  const toast = useToast();

  const [estatePlans, setEstatePlans] = useState<any>(null);

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
        setEstatePlans(resData?.data);
      } else setEstatePlans(null);
    }
  }, [data, isLoadingError, isLoading, isRefetchError, isRefetching, error]);

  return (
    <Flex direction={"column"} gap={"4vh"} w="100%">
      <Stack direction={"row"} justify={"space-between"} align={"center"}>
        <Heading size={"md"}>My Estate Plan</Heading>
        <NavLink to="/Dashboard/EstatePlans/AddPlans">
          <Button
            colorScheme="green"
            backgroundColor={colors.green_01}
            size="md"
            rounded={"full"}
            rightIcon={<AddIcon />}
          >
            Add Estate Plan
          </Button>
        </NavLink>
      </Stack>

      {!isLoading && estatePlans && estatePlans.length === 0 ? (
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
            You haven't added any estate plan
          </Heading>
          <NavLink to="/Dashboard/EstatePlans/AddPlans">
            <Button
              colorScheme="green"
              backgroundColor={colors.green_01}
              size="md"
              rounded={"full"}
              rightIcon={<AddIcon />}
            >
              Add Estate Plan
            </Button>
          </NavLink>
        </Flex>
      ) : (
        <TableContainer
          borderTopRadius={"md"}
          bgColor={"rgba(0, 129, 69, 0.1)"}
          overflow="auto"
        >
          <Table colorScheme="green">
            <Thead bgColor={"rgba(0, 129, 69, 0.2)"}>
              <Tr>
                <Th>SN</Th>
                <Th>Estate Plan</Th>
                <Th>Status</Th>
                <Th>Date Added</Th>
                {/* <Th textAlign={"center"}>Action</Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {error || isLoading
                ? new Array(4).fill({}).map((item, i) => (
                    <Tr key={i}>
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
                : !isLoading && estatePlans && estatePlans.length > 0
                ? estatePlans.map((data: any, i: number) => {
                    const date = data?.created_at;
                    const formattedDate = new Date(date).toLocaleDateString();
                    return (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td>{data?.estate_plan || "-"}</Td>
                        <Td
                          color={data?.status === "Active" ? "green" : "black"}
                        >
                          <Icon as={GoDotFill} w={2} h={2} />{" "}
                          {data?.status || "-"}
                        </Td>
                        <Td>{formattedDate || "-"}</Td>
                        {/* <Td textAlign={"center"}>
                          <Button
                            colorScheme="gray"
                            leftIcon={<BiEditAlt />}
                            rounded={"full"}
                            size={"sm"}
                            fontSize={"10px"}
                          >
                            Delete
                          </Button>
                        </Td> */}
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

export default MyEstatePlan;
