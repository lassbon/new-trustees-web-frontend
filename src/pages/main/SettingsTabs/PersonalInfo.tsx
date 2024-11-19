import {
  Avatar,
  Flex,
  FormLabel,
  Heading,
  HStack,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import AppFormFields from "../../../components/form/AppFields";
import AppForm from "../../../components/form/AppForm";
import useUser from "../../../custom-hooks/http-services/use-GET/useUser";
import AppFormSubmitBtn from "../../../components/form/AppFormSubmitBtn";
import useUpdateUser from "../../../custom-hooks/http-services/use-PATCH/useUpdateUser";
import { colors } from "../../../constants/colors";

const PersonalInfo = () => {
  const { data, refetch } = useUser();
  const info = data?.data?.data;
  const patch = useUpdateUser();
  const toast = useToast();

  const date = info?.dob;
  const formattedDate = new Date(date).toISOString().split("T")[0];

  //initial value of account info form schema
  const initialValues = {
    surname: info?.surname || "NIL",
    othernames: info?.othernames || "NIL",
    email: info?.email || "NIL",
    phone_number: info?.phone_number || "NIL",
    dob: (date && formattedDate) || "NIL",
    address: info?.address || "NIL",
    gender: info?.gender || "NIL",
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
    dob: Yup.date(),
    address: Yup.string(),
    gender: Yup.string(),
  });

  const handleUpdateProfile = (values: any) => {
    delete values?.surname, delete values?.othernames, delete values?.email;

    console.log(values);
    //Make a POST request to update the profile
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
            bgColor={colors.green_01}
            color={"white"}
          />
        </HStack>

        <AppForm
          initialValues={initialValues}
          onSubmit={handleUpdateProfile}
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
              readOnly={true}
              disabled={patch?.isPending}
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
              readOnly={true}
              disabled={patch?.isPending}
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
              readOnly={true}
              disabled={patch?.isPending}
            />
            <AppFormFields.ErrorMessage name="email" />
          </AppFormFields>
          {/* email */}

          {/*  gender */}
          <AppFormFields name="gender">
            <FormLabel htmlFor="gender" as="legend">
              Gender
            </FormLabel>
            <AppFormFields.Input
              type="text"
              name="gender"
              placeholder="doe"
              disabled={patch?.isPending}
            />
            <AppFormFields.ErrorMessage name="gender" />
          </AppFormFields>
          {/*  gender */}

          {/* phone number */}
          <AppFormFields name="phone_number">
            <FormLabel htmlFor="phone_number" as="legend">
              Phone Number
            </FormLabel>
            <AppFormFields.Input
              type="number"
              name="phone_number"
              placeholder="09060005112"
              disabled={patch?.isPending}
            />
            <AppFormFields.ErrorMessage name="phone_number" />
          </AppFormFields>
          {/* phone number */}

          {/* dob */}
          <AppFormFields name="dob">
            <FormLabel htmlFor="dob" as="legend">
              Date of Birth
            </FormLabel>
            <AppFormFields.Input
              type="date"
              name="dob"
              disabled={patch?.isPending}
            />
            <AppFormFields.ErrorMessage name="dob" />
          </AppFormFields>
          {/* dob */}

          {/*  address */}
          <AppFormFields name="address">
            <FormLabel htmlFor="address" as="legend">
              address
            </FormLabel>
            <AppFormFields.textAreaInput
              type="text"
              name="address"
              placeholder="123, lekki road"
              disabled={patch?.isPending}
            />
            <AppFormFields.ErrorMessage name="address" />
          </AppFormFields>
          {/*  address */}

          {/* submit btn */}
          <AppFormSubmitBtn
            colorScheme="green"
            variant="solid"
            backgroundColor={colors.green_01}
            textTransform={"capitalize"}
            isLoading={patch?.isPending ? true : false}
            rounded={"full"}
          >
            Update
          </AppFormSubmitBtn>
          {/* submit btn */}
        </AppForm>
      </Flex>
    </Flex>
  );
};

export default PersonalInfo;
