import { useEffect, useState } from "react";
import { Flex, Heading, FormLabel, Text, useToast } from "@chakra-ui/react";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";

import AppFormFields from "../../components/form/AppFields";
import AppForm from "../../components/form/AppForm";
import AppFormSubmitBtn from "../../components/form/AppFormSubmitBtn";
import useResetPassword from "../../custom-hooks/http-services/use-GET/useResetPassword";
import { colors } from "../../constants/colors";

const ResetPassword = () => {
  const [email, setEmail] = useState<any>(null);
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

  //initial value of the signin form schema
  const initialValues = {
    email: "",
  };

  //Yup library used to handle form validation requirements
  const schema = Yup.object({
    email: Yup.string()
      .email("invalid email address")
      .required("Required")
      .label("Email"),
  });

  const resetPasword = async (values: any) => {
    await setEmail(values?.email);
    refetch();
  };

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
    }
  }, [data, isLoadingError, isLoading, isRefetchError, isRefetching, error]);

  useEffect(() => {
    return () => {
      queryClient.resetQueries({ queryKey: ["getResetPassword"] });
    };
  }, []);

  return (
    <Flex
      w={{ base: "100%", xl: "37vw" }}
      px={"3vw"}
      py={"3vh"}
      direction={"column"}
      bgColor={"white"}
      rounded={"3xl"}
      gap={"1vh"}
    >
      <Heading as="h2" size="lg">
        Reset your Password
      </Heading>
      <Text>
        We’ll send a link to your email address, Use it to set a new password.
      </Text>

      <AppForm
        initialValues={initialValues}
        onSubmit={resetPasword}
        validateSchema={schema}
      >
        {/* email */}
        <AppFormFields name="email" isRequired={true}>
          <FormLabel htmlFor="email" as="legend">
            Email
          </FormLabel>
          <AppFormFields.Input
            type="email"
            name="email"
            placeholder="johndoe@gmail.com"
            disabled={isLoading || isRefetching ? true : false}
          />
          <AppFormFields.ErrorMessage name="email" />
        </AppFormFields>
        {/* email */}

        {/* submit btn */}
        <AppFormSubmitBtn
          mt="2vh"
          colorScheme="green"
          backgroundColor={colors.green_01}
          variant="solid"
          textTransform={"capitalize"}
          isLoading={isLoading || isRefetching ? true : false}
          rounded={"full"}
        >
          Reset Password
        </AppFormSubmitBtn>
        {/* submit btn */}
      </AppForm>
    </Flex>
  );
};

export default ResetPassword;
