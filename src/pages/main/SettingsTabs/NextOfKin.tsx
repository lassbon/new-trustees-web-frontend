import { Flex, Heading, FormLabel } from "@chakra-ui/react";
import * as Yup from "yup";
import React from "react";
import AppFormFields from "../../../components/form/AppFields";
import AppForm from "../../../components/form/AppForm";
import AppFormSubmitBtn from "../../../components/form/AppFormSubmitBtn";
import useUser from "../../../custom-hooks/http-services/use-GET/useUser";

const NextOfKin = () => {
  const { data } = useUser();
  const info = data?.data?.data;

  //initial value of account info form schema
  const initialValues = {
    next_of_kin_relationship: info?.next_of_kin_relationship || "",
    next_of_kin_phone: info?.next_of_kin_phone || "",
    next_of_kin_fullname: info?.next_of_kin_fullname || "",
    next_of_kin_address: info?.next_of_kin_address || "",
  };
  //Yup library used to handle account info form validation requirements
  const schema = Yup.object({
    next_of_kin_fullname: Yup.string().required("Required").label("Full Name"),
    next_of_kin_relationship: Yup.string()
      .required("Required")
      .label("relationship"),
    next_of_kin_address: Yup.string().required("Required").label("address"),
    next_of_kin_phone: Yup.string()
      .max(11, "Enter Valid Phone Number")
      .matches(/^0[789][01]\d{8}$/, "Enter Valid Phone Number")
      .required("Required"),
  });

  const handleUpdateProfile = (values: any) => {
    //Make a POST request to update the profile
    console.log(values, "next profile");
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
          onSubmit={() => {}}
          validateSchema={schema}
        >
          {/*  Full Name */}
          <AppFormFields name="next_of_kin_fullname" isRequired={true}>
            <FormLabel htmlFor="next_of_kin_fullname" as="legend">
              full Name
            </FormLabel>
            <AppFormFields.Input
              type="text"
              name="next_of_kin_fullname"
              placeholder="john"
              size="lg"
            />
            <AppFormFields.ErrorMessage name="next_of_kin_fullname" />
          </AppFormFields>
          {/*  Full Name */}

          {/*  next_of_kin_address */}
          <AppFormFields name="next_of_kin_address" isRequired={true}>
            <FormLabel htmlFor="next_of_kin_address" as="legend">
              address
            </FormLabel>
            <AppFormFields.textAreaInput
              type="text"
              name="next_of_kin_address"
              placeholder="5 lekki road"
              size="lg"
            />
            <AppFormFields.ErrorMessage name="next_of_kin_address" />
          </AppFormFields>
          {/*  next_of_kin_address */}

          {/* next_of_kin_phone */}
          <AppFormFields name="next_of_kin_phone" isRequired={true}>
            <FormLabel htmlFor="next_of_kin_phone" as="legend">
              Phone Number
            </FormLabel>
            <AppFormFields.Input
              type="text"
              name="next_of_kin_phone"
              placeholder="09060005112"
              size="lg"
            />
            <AppFormFields.ErrorMessage name="next_of_kin_phone" />
          </AppFormFields>
          {/* next_of_kin_phone */}

          {/* next_of_kin_relationship */}
          <AppFormFields name="next_of_kin_relationship" isRequired={true}>
            <FormLabel htmlFor="next_of_kin_relationship" as="legend">
              relationship
            </FormLabel>
            <AppFormFields.Input
              type="text"
              name="next_of_kin_relationship"
              placeholder="cousin"
              size="lg"
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
            isLoading={false}
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
