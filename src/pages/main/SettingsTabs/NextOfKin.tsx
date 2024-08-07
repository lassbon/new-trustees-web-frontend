import { Flex, Heading, FormLabel, useToast } from "@chakra-ui/react";
import * as Yup from "yup";
import React from "react";
import AppFormFields from "../../../components/form/AppFields";
import AppForm from "../../../components/form/AppForm";
import AppFormSubmitBtn from "../../../components/form/AppFormSubmitBtn";
import useUser from "../../../custom-hooks/http-services/use-GET/useUser";
import useUpdateUser from "../../../custom-hooks/http-services/use-PATCH/useUpdateUser";

const NextOfKin = () => {
  const { data, refetch } = useUser();
  const patch = useUpdateUser();
  const info = data?.data?.data;

  const toast = useToast();

  //initial value of account info form schema
  const initialValues = {
    next_of_kin_relationship: info?.next_of_kin_relationship || "",
    next_of_kin_phone: info?.next_of_kin_phone || "",
    next_of_kin_fullname: info?.next_of_kin_fullname || "",
    next_of_kin_address: info?.next_of_kin_address || "",
  };
  //Yup library used to handle account info form validation requirements
  const schema = Yup.object({
    next_of_kin_fullname: Yup.string(),
    next_of_kin_relationship: Yup.string(),
    next_of_kin_address: Yup.string(),
    next_of_kin_phone: Yup.string()
      .max(11, "Enter Valid Phone Number")
      .matches(/^0[789][01]\d{8}$/, "Enter Valid Phone Number"),
  });

  const handleUpdateProfile = (values: any) => {
    //Make a POST request to update the profile
    console.log(values, "next profile");
    patch.mutateAsync(values, {
      onSuccess: async (resData) => {
        const { message } = resData?.data;
        toast({
          title: message,
          position: "top-right",
          isClosable: true,
          status: "success",
          variant: "top-accent",
        });
        refetch();
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
  };

  return (
    <Flex direction={"column"} gap={"2vh"} w="100%">
      <Heading size={"sm"}>Next of Kin Information</Heading>
      <Flex
        direction={"column"}
        rounded={"md"}
        bgColor={"rgba(0, 129, 69, 0.05)"}
        px={"4vw"}
        py={"3vh"}
        gap={"2vh"}
        w={{ base: "full", lg: "40vw" }}
      >
        <AppForm
          initialValues={initialValues}
          onSubmit={handleUpdateProfile}
          validateSchema={schema}
        >
          {/*  Full Name */}
          <AppFormFields name="next_of_kin_fullname" isRequired={false}>
            <FormLabel htmlFor="next_of_kin_fullname" as="legend">
              full Name
            </FormLabel>
            <AppFormFields.Input
              type="text"
              name="next_of_kin_fullname"
              placeholder="john"
              size="lg"
              disabled={patch?.isPending}
            />
            <AppFormFields.ErrorMessage name="next_of_kin_fullname" />
          </AppFormFields>
          {/*  Full Name */}

          {/*  next_of_kin_address */}
          <AppFormFields name="next_of_kin_address" isRequired={false}>
            <FormLabel htmlFor="next_of_kin_address" as="legend">
              address
            </FormLabel>
            <AppFormFields.textAreaInput
              type="text"
              name="next_of_kin_address"
              placeholder="5 lekki road"
              size="lg"
              disabled={patch?.isPending}
            />
            <AppFormFields.ErrorMessage name="next_of_kin_address" />
          </AppFormFields>
          {/*  next_of_kin_address */}

          {/* next_of_kin_phone */}
          <AppFormFields name="next_of_kin_phone" isRequired={false}>
            <FormLabel htmlFor="next_of_kin_phone" as="legend">
              Phone Number
            </FormLabel>
            <AppFormFields.Input
              type="text"
              name="next_of_kin_phone"
              placeholder="09060005112"
              size="lg"
              disabled={patch?.isPending}
            />
            <AppFormFields.ErrorMessage name="next_of_kin_phone" />
          </AppFormFields>
          {/* next_of_kin_phone */}

          {/* next_of_kin_relationship */}
          <AppFormFields name="next_of_kin_relationship" isRequired={false}>
            <FormLabel htmlFor="next_of_kin_relationship" as="legend">
              relationship
            </FormLabel>
            <AppFormFields.Input
              type="text"
              name="next_of_kin_relationship"
              placeholder="cousin"
              size="lg"
              disabled={patch?.isPending}
            />
            <AppFormFields.ErrorMessage name="next_of_kin_relationship" />
          </AppFormFields>
          {/* email */}

          {/* submit btn */}
          <AppFormSubmitBtn
            bgColor={"#008145"}
            color={"white"}
            colorScheme="green"
            textTransform={"capitalize"}
            isLoading={patch?.isPending ? true : false}
            rounded={"full"}
            w={"fit-content"}
          >
            update
          </AppFormSubmitBtn>

          {/* submit btn */}
        </AppForm>
      </Flex>
    </Flex>
  );
};

export default NextOfKin;
