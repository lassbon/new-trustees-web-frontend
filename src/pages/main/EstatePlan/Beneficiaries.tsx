import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Img,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
// import { beneficiaries } from "../../../config/data";
import EmptyDataImg from "../../../assets/images/emptyData.png";
import { BiEditAlt } from "react-icons/bi";
import useBeneficiaries from "../../../custom-hooks/http-services/use-GET/useBeneficiaries";
import { useEffect, useState } from "react";

const Beneficiaries = () => {
  const {
    isLoading,
    data,
    error,
    isLoadingError,
    isRefetching,
    isRefetchError,
  } = useBeneficiaries();

  const toast = useToast();

  const [beneficiaries, setBeneficiaries] = useState<any>(null);

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
      console.log(data?.data, "beneficairies");
      if (resData) {
        setBeneficiaries(resData?.data);
      } else setBeneficiaries(null);
    }
  }, [data, isLoadingError, isLoading, isRefetchError, isRefetching, error]);
  return (
    <Flex direction={"column"} gap={"4vh"} w="100%">
      <Stack direction={"row"} justify={"space-between"} align={"center"}>
        <Heading size={"md"}>Beneficiaries</Heading>
        <Button
          colorScheme="green"
          size="md"
          rounded={"full"}
          rightIcon={<AddIcon />}
        >
          Add Beneficiaries
        </Button>
      </Stack>

      {!isLoading && beneficiaries && beneficiaries.length === 0 ? (
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
            You haven't added any beneficiaries yet
          </Heading>
          <Button
            colorScheme="green"
            size="md"
            rounded={"full"}
            rightIcon={<AddIcon />}
          >
            Add beneficiaries
          </Button>
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
                <Th>Name </Th>
                <Th>Relationship</Th>
                <Th>Email Address</Th>
                <Th>Phone Number</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {error || isLoading
                ? new Array(4).fill({}).map((item, i) => (
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
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                    </Tr>
                  ))
                : !isLoading && beneficiaries && beneficiaries.length > 0
                ? beneficiaries.map((data: any, i: number) => (
                    <Tr key={i}>
                      <Td>{i + 1}</Td>
                      <Td textTransform={"lowercase"}>
                        {`${data?.surname} ${data?.firstname}` || "-"}
                      </Td>
                      <Td textTransform={"lowercase"}>
                        {data?.beneficiary_relationship || "-"}
                      </Td>
                      <Td textTransform={"lowercase"}>{data?.email || "-"}</Td>
                      <Td textTransform={"lowercase"}>{data?.phone || "-"}</Td>
                      <Td>
                        <ButtonGroup>
                          <Button
                            colorScheme="gray"
                            leftIcon={<BiEditAlt />}
                            rounded={"full"}
                            size={"sm"}
                            fontSize={"10px"}
                            variant={"solid"}
                          >
                            Edit
                          </Button>
                          <Button
                            bgColor={"rgba(255, 0, 0, 0.1)"}
                            color={"red"}
                            variant={"solid"}
                            leftIcon={<DeleteIcon />}
                            rounded={"full"}
                            size={"sm"}
                            fontSize={"10px"}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Flex>
  );
};

export default Beneficiaries;
