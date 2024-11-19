import {
  Button,
  Flex,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Text,
  useToast,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useVerifyOtp from "../../custom-hooks/http-services/use-GET/useVerifyOtp";
import useResendOtp from "../../custom-hooks/http-services/use-GET/useResendOtp";
import { useQueryClient } from "@tanstack/react-query";
import { colors } from "../../constants/colors";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { email } = location.state;

  const [invalid, setInvalid] = useState(false);

  const [otp, setOtp] = useState<string>("");

  const [isResendEnabled, setIsResendEnabled] = useState<boolean>(false);

  const [timer, setTimer] = useState<number>(60); // Initial countdown value in seconds(60)

  const {
    isLoading,
    isLoadingError,
    isRefetchError,
    isRefetching,
    error,
    data,
    refetch,
  } = useVerifyOtp({ email, otp });
  const resend = useResendOtp({ email });

  const handleVerifyOtp = async (pin: string) => {
    if (pin.length === 4) {
      await setOtp(pin);
      refetch();
    } else {
      setInvalid(true);
    }
  };

  const resendCode = () => {
    //checking if timer is = 0 and "isResendEnable" is true
    if (isResendEnabled) {
      resend.refetch();
    }
  };

  //made use of useEffect to start the "Resend otp" once this screen has been mounted or called
  useEffect(() => {
    let countDown: any;

    //checking if timer is still greater than 0
    if (timer > 0) {
      //using setTimer to collect the previous state of timer and subtract it by 1 second
      countDown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      //if timer = 0 enable "isResendEnabled"
      setIsResendEnabled(true);
    }

    // Clean up the interval when the component unmounts
    return () => clearInterval(countDown);
  }, [timer]);

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
      const { message } = data?.data;
      toast({
        title: message,
        position: "top-right",
        isClosable: true,
        status: "success",
        variant: "top-accent",
      });

      navigate("/auth/signin");
    }
  }, [data, isLoadingError, isLoading, error, isRefetchError, isRefetching]);

  useEffect(() => {
    if (
      (resend.isLoadingError && !resend.isLoading) ||
      (resend.isRefetchError && !resend.isRefetching)
    ) {
      if (
        resend.error &&
        (resend.error as { response?: unknown })?.response === undefined
      ) {
        toast({
          title: "something went wrong check network or try again!",
          position: "top-right",
          isClosable: true,
          status: "error",
          variant: "top-accent",
        });
        return;
      }

      if (resend.error) {
        const res = (resend.error as { response?: any })?.response;
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

    if (resend.data && (!resend.isRefetching || resend.isLoading)) {
      //reset the timer to 45 senconds
      setTimer(60);

      //then disable "isResendEnable"
      setIsResendEnabled(false);
      const { message } = resend.data?.data;
      toast({
        title: message,
        position: "top-right",
        isClosable: true,
        status: "success",
        variant: "top-accent",
      });
    }
  }, [
    resend.data,
    resend.isLoadingError,
    resend.isLoading,
    resend.error,
    resend.isRefetchError,
    resend.isRefetching,
  ]);

  useEffect(() => {
    return () => {
      queryClient.resetQueries({
        queryKey: ["getVerifyOtp", "getResendOtp"],
        exact: true,
      });
    };
  }, []);

  // Calculate minutes and seconds
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <Flex
      w={{ base: "100%", xl: "37vw" }}
      px={"3vw"}
      py={"3vh"}
      direction={"column"}
      bgColor={"white"}
      rounded={"3xl"}
      gap={"3vh"}
    >
      <Heading as="h2" size="lg">
        Verify Otp
      </Heading>
      <Text>A verification code has been sent to your email Kindly verify</Text>

      <HStack w={"100%"} justify={"space-evenly"}>
        <PinInput
          mask
          otp
          autoFocus
          onComplete={(otp) => handleVerifyOtp(otp)}
          onChange={(otp) => {
            setOtp(otp);
            if (invalid) {
              setInvalid(false);
            }
          }}
          focusBorderColor="#008145"
          variant={"filled"}
          colorScheme="green"
          size={"lg"}
          isInvalid={invalid}
          isDisabled={isLoading || isRefetching ? true : false}
        >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>

      <VStack>
        {isResendEnabled && (
          <Text>
            Didn't get otp{" "}
            {resend.isLoading || resend.isRefetching ? (
              <Spinner color={colors.green_01} size={"xs"} />
            ) : (
              <Text as={"b"} onClick={() => resendCode()} cursor={"pointer"}>
                Resend
              </Text>
            )}
          </Text>
        )}

        {!isResendEnabled && (
          <Text>
            {" "}
            {`Resend opt in ${minutes}:${
              seconds < 10 ? `0${seconds}` : seconds
            } sec`}
          </Text>
        )}
      </VStack>

      <Button
        colorScheme="green"
        backgroundColor={colors.green_01}
        rounded={"full"}
        onClick={() => handleVerifyOtp(otp)}
        isLoading={isLoading || isRefetching ? true : false}
      >
        Verify
      </Button>
    </Flex>
  );
};

export default VerifyOtp;
