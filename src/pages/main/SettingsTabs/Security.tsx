import { Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import useUser from "../../../custom-hooks/http-services/use-GET/useUser";
import useResetPassword from "../../../custom-hooks/http-services/use-GET/useResetPassword";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const Security = () => {
  const user = useUser();
  const info = user?.data?.data;
  const email = info?.data?.email;
  const queryClient = useQueryClient();
  const {
    isLoading,
    data,
    error,
    refetch,
    isLoadingError,
    isRefetching,
    isRefetchError,
  } = useResetPassword({
    email,
  });
  const toast = useToast();

  useEffect(() => {
    if ((isLoadingError && !isLoading) || (isRefetchError && !isRefetching)) {
      if (error && (error as { response?: unknown })?.response === undefined) {
        toast({
          title: "something went wrong check network or try again!",
          position: "top-right",
          isClosable: true,
          status: "error",
          variant: "top-accent",
        });
        return;
      }

      if (error) {
        const res: any = (error as { response?: any })?.response;
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

    if (data && (!isRefetching || !isLoading)) {
      const { message } = data?.data ?? {};
      toast({
        title: message,
        position: "top-right",
        isClosable: true,
        status: "success",
        variant: "top-accent",
      });
    }
  }, [data, isLoadingError, isLoading, isRefetchError, isRefetching, error]);

  useEffect(() => {
    return () => {
      queryClient.resetQueries({ queryKey: ["getResetPassword"] });
    };
  }, []);


  return (
    <Flex direction={"column"} gap={"2vh"} w="100%">
      <Flex direction={"column"} gap={"2vh"}>
        <Heading size={"sm"}>Password</Heading>
        <Flex
          direction={"column"}
          rounded={"xl"}
          bgColor={"rgba(0, 129, 69, 0.05)"}
          px={"3vw"}
          py={"3vh"}
          gap={"2vh"}
          w={{ base: "full", lg: "40vw" }}
          borderColor={"#E6E6E6"}
          borderWidth={1}
        >
          <Text>
            Click the Reset password button to reset your MAPP password.
          </Text>
          <Button
            bgColor={"#008145"}
            color={"white"}
            colorScheme="green"
            rounded={"full"}
            w={"fit-content"}
            isLoading={isLoading || isRefetching ? true : false}
            onClick={() => refetch()}
          >
            Reset Password
          </Button>
        </Flex>
      </Flex>
      {/* <Flex direction={"column"} gap={"2vh"}>
        <Heading size={"sm"}>PIN settings</Heading>
        <Flex
          direction={"column"}
          rounded={"xl"}
          bgColor={"rgba(0, 129, 69, 0.05)"}
          px={"3vw"}
          py={"3vh"}
          gap={"2vh"}
          w={{ base: "full", lg: "40vw" }}
          borderColor={"#E6E6E6"}
          borderWidth={1}
        >
          <Text>Your account currently does not have PIN security enabled</Text>
          <Button
            bgColor={"#008145"}
            color={"white"}
            colorScheme="green"
            rounded={"full"}
            w={"fit-content"}
          >
            Set up PIN
          </Button>
        </Flex>
      </Flex> */}
    </Flex>
  );
};

export default Security;
