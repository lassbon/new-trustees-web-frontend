import {
  Avatar,
  Flex,
  FormLabel,
  Heading,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { IoCameraOutline } from "react-icons/io5";
import AppFormFields from "../../../components/form/AppFields";
import AppForm from "../../../components/form/AppForm";
import useUser from "../../../custom-hooks/http-services/use-GET/useUser";

const PersonalInfo = () => {
  const { data } = useUser();
  const info = data?.data?.data;
  //initial value of account info form schema
  const initialValues = {
    surname: info?.surname || "NIL",
    othernames: info?.othernames || "NIL",
    email: info?.email || "NIL",
    phone_number: info?.phone_number || "NIL",
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
      <Heading size={"sm"}>Personal Information</Heading>
      <Flex
        direction={"column"}
        rounded={"md"}
        bgColor={"rgba(0, 129, 69, 0.05)"}
        px={"4vw"}
        py={"3vh"}
        gap={"2vh"}
        w={{ base: "full", lg: "40vw" }}
      >
        <HStack display={"flex"} align={"baseline"} justify={"center"}>
          <Avatar
            size="xl"
            name={`${info?.surname} ${info?.othernames}`}
            bgColor={"green"}
            color={"white"}
          />
          {/* <IconButton
            position={"relative"}
            top={"1vh"}
            variant="unstyled"
            colorScheme="teal"
            aria-label="upload"
            fontSize={"20px"}
            icon={<IoCameraOutline />}
          /> */}
        </HStack>

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
            />
            <AppFormFields.ErrorMessage name="othernames" />
          </AppFormFields>
          {/*  First Name */}

          {/*  surname */}
          <AppFormFields name="surname">
            <FormLabel htmlFor="surname" as="legend">
              last Name
            </FormLabel>
            <AppFormFields.Input type="text" name="surname" placeholder="doe" />
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
            />
            <AppFormFields.ErrorMessage name="phone_number" />
          </AppFormFields>
          {/* phone number */}

          {/* submit btn */}
          {/* <ButtonGroup justifyContent={"space-between"} mt={"20px"}>
        <Button
          isDisabled={tab === 1 ? true : false}
          colorScheme="green"
          rounded={"full"}
          variant={"outline"}
          onClick={() => {
            setTab((prevState) => prevState - 1);
          }}
        >
          Back
        </Button>
        <AppFormSubmitBtn
          colorScheme="green"
          variant="solid"
          textTransform={"capitalize"}
          isLoading={false}
          rounded={"full"}
        >
          Continue
        </AppFormSubmitBtn>
      </ButtonGroup> */}

          {/* submit btn */}
        </AppForm>
      </Flex>
    </Flex>
  );
};

export default PersonalInfo;
