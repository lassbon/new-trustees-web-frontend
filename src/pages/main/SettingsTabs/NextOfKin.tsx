import { Flex, Heading, FormLabel } from "@chakra-ui/react";
import * as Yup from "yup";
import React from "react";
import AppFormFields from "../../../components/form/AppFields";
import AppForm from "../../../components/form/AppForm";
import AppFormSubmitBtn from "../../../components/form/AppFormSubmitBtn";

const NextOfKin = () => {
  //initial value of account info form schema
  const initialValues = {
    surname: "",
    othernames: "",
    email: "",
    phone_number: "",
  };
  //Yup library used to handle account info form validation requirements
  const schema = Yup.object({
    surname: Yup.string().required("Required").label("First Name"),
    othernames: Yup.string().required("Required").label("Last Name"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Required")
      .label("Email"),
    phone_number: Yup.string()
      .max(11, "Enter Valid Phone Number")
      .matches(/^0[789][01]\d{8}$/, "Enter Valid Phone Number")
      .required("Required"),
  });
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
          {/*  First Name */}
          <AppFormFields name="othernames">
            <FormLabel htmlFor="othernames" as="legend">
              First Name
            </FormLabel>
            <AppFormFields.Input
              type="text"
              name="othernames"
              placeholder="john"
              size="lg"
            />
            <AppFormFields.ErrorMessage name="othernames" />
          </AppFormFields>
          {/*  First Name */}

          {/*  surname */}
          <AppFormFields name="surname">
            <FormLabel htmlFor="surname" as="legend">
              last Name
            </FormLabel>
            <AppFormFields.Input
              type="text"
              name="surname"
              placeholder="doe"
              size="lg"
            />
            <AppFormFields.ErrorMessage name="surname" />
          </AppFormFields>
          {/*  surname */}

          {/* email */}
          <AppFormFields name="email">
            <FormLabel htmlFor="email" as="legend">
              Email
            </FormLabel>
            <AppFormFields.Input
              type="email"
              name="email"
              placeholder="johndoe@gmail.com"
              size="lg"
            />
            <AppFormFields.ErrorMessage name="email" />
          </AppFormFields>
          {/* email */}

          {/* phone number */}
          <AppFormFields name="phone_number">
            <FormLabel htmlFor="phone_number" as="legend">
              Phone Number
            </FormLabel>
            <AppFormFields.Input
              type="number"
              name="phone_number"
              placeholder="09060005112"
              size="lg"
            />
            <AppFormFields.ErrorMessage name="phone_number" />
          </AppFormFields>
          {/* phone number */}

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
            Done
          </AppFormSubmitBtn>

          {/* submit btn */}
        </AppForm>
      </Flex>
    </Flex>
  );
};

export default NextOfKin;
