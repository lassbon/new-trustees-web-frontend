import { Flex, Heading, FormLabel, Text } from "@chakra-ui/react";
import * as Yup from "yup";
import AppFormFields from "../../../components/form/AppFields";
import AppForm from "../../../components/form/AppForm";
import AppFormSubmitBtn from "../../../components/form/AppFormSubmitBtn";

const VerifyIdentity = () => {
  //initial value of account info form schema
  const initialValues = {
    nin: "",
  };
  //Yup library used to handle account info form validation requirements
  const schema = Yup.object({
    nin: Yup.string().required("Required").label("First Name"),
  });
  return (
    <Flex direction={"column"} gap={"2vh"} w="100%">
      <Flex direction={"column"} gap={"2vh"}>
        <Heading size={"sm"}>Verify your Account</Heading>
        <Text>
          Enter your NIN details. If you don’t have it, dial *346# on your
          phone.
        </Text>
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
          <AppForm
            initialValues={initialValues}
            onSubmit={() => {}}
            validateSchema={schema}
          >
            {/*  First Name */}
            <AppFormFields name="othernames">
              <FormLabel htmlFor="nin" as="legend">
                NIN
              </FormLabel>
              <AppFormFields.Input
                type="text"
                name="nin"
                placeholder="Enter your NIN"
              />
              <AppFormFields.ErrorMessage name="nin" />
            </AppFormFields>
            {/*  First Name */}

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
              submit
            </AppFormSubmitBtn>

            {/* submit btn */}
          </AppForm>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VerifyIdentity;
