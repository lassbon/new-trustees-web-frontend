import {
  Flex,
  Heading,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  Stack,
  Center,
  Text,
  ButtonGroup,
  Button,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import * as Yup from "yup";

import AppForm from "../../components/form/AppForm";
import AppFormFields from "../../components/form/AppFields";
import AppFormSubmitBtn from "../../components/form/AppFormSubmitBtn";
import useRegister from "../../custom-hooks/http-services/use-POST/useRegister";
import { colors } from "../../constants/colors";

const SignUp = () => {
  const { isPending, mutateAsync } = useRegister();

  const toast = useToast();

  const navigate = useNavigate();

  const [show, setShow] = useState<boolean>(false);

  const [confirmShow, setConfirmShow] = useState<boolean>(false);

  const [accountInfo, setAccountInfo] = useState<any>(null);

  const [check, setChecked] = useState<any>(null);

  //to switch between account info and create password form component
  const [tab, setTab] = useState<number>(1);

  //handle account info form collection
  const handleAccountInfo = (values: any) => {
    if (values) {
      setAccountInfo(values), setTab(2);
    }
  };

  //hanlde the user sign up logic
  const handleSignUp = (values: any) => {
    if (!check) {
      toast({
        title: `agree to terms and conditions to proceed`,
        position: "top",
        isClosable: true,
        colorScheme: "green",
        variant: "top-accent",
      });
      return;
    }
    if (accountInfo && values) {
      // replace with actual sign up logic
      // navigate to home page
      const userInfo = { ...accountInfo, ...values };
      delete userInfo.confirm_password;
      mutateAsync(userInfo, {
        onSuccess: async (resData) => {
          const { message } = resData?.data;
          toast({
            title: message,
            position: "top-right",
            isClosable: true,
            status: "success",
            variant: "top-accent",
          });
          navigate("/auth/verifyotp", { state: { email: userInfo?.email } });
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
    }
  };

  //initial value of account info form schema
  const initialValues = {
    surname: "",
    othernames: "",
    email: "",
    phone_number: "",
  };

  //initials values for the password form
  const PasswordInitialValues = {
    password: "",
    confirm_password: "",
  };

  //Yup library used to handle form validation requirements
  const passwordSchema = Yup.object({
    password: Yup.string()
      .test("weak", "Password must be at least 8 characters", (value) => {
        return value ? value.length >= 8 : false;
      })
      .test("fair", "Password must contain a symbol", (value) => {
        return !!value && /[^a-zA-Z0-9]/.test(value);
      })
      .test("good", "Password must contain one uppercase letter", (value) => {
        return !!value && /[A-Z]/.test(value);
      })
      .test("strong", "Password must contain one number", (value) => {
        return !!value && /[0-9]/.test(value);
      })
      .required()
      .label("Password"),
    confirm_password: Yup.string()
      .min(8)
      .required("Required")
      .label("confirm password")
      .oneOf([Yup.ref("password")], "Password mismatch"),
  });

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

  //account info form component
  const AccountInfo = () => (
    <AppForm
      initialValues={initialValues}
      onSubmit={handleAccountInfo}
      validateSchema={schema}
    >
      {/*  First Name */}
      <AppFormFields name="othernames" isRequired={true}>
        <FormLabel htmlFor="othernames" as="legend">
          First Name
        </FormLabel>
        <AppFormFields.Input type="text" name="othernames" placeholder="john" />
        <AppFormFields.ErrorMessage name="othernames" />
      </AppFormFields>
      {/*  First Name */}

      {/*  surname */}
      <AppFormFields name="surname" isRequired={true}>
        <FormLabel htmlFor="surname" as="legend">
          last Name
        </FormLabel>
        <AppFormFields.Input type="text" name="surname" placeholder="doe" />
        <AppFormFields.ErrorMessage name="surname" />
      </AppFormFields>
      {/*  surname */}

      {/* email */}
      <AppFormFields name="email" isRequired={true}>
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
      <AppFormFields name="phone_number" isRequired={true}>
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
      <ButtonGroup justifyContent={"space-between"} mt={"20px"}>
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
          backgroundColor={colors.green_01}
          variant="solid"
          textTransform={"capitalize"}
          isLoading={false}
          rounded={"full"}
        >
          Continue
        </AppFormSubmitBtn>
      </ButtonGroup>

      {/* submit btn */}
    </AppForm>
  );

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
        Sign Up
      </Heading>
      <Text>Welcome back! Log in to continue your journey.</Text>

      <Stack direction={"column"} gap={"1vh"} mt={"1vh"}>
        <Text color={"gray"}>Step {tab === 1 ? "01" : "02"}/02</Text>
        <Heading as="h2" size="sm" textTransform={"capitalize"}>
          {tab === 1 ? "Account Information" : "Create Password"}
        </Heading>
      </Stack>

      {tab === 1 && <AccountInfo />}

      {tab === 2 && (
        <AppForm
          initialValues={PasswordInitialValues}
          onSubmit={handleSignUp}
          validateSchema={passwordSchema}
        >
          {/* Password */}
          <AppFormFields name="password" isRequired={true}>
            <FormLabel as="legend" htmlFor="password">
              Password
            </FormLabel>
            <InputGroup>
              <AppFormFields.Input
                name="password"
                placeholder="Enter password"
                type={show ? "text" : "password"}
                disabled={isPending}
              />
              <InputRightElement>
                <IconButton
                  variant={"unstyled"}
                  color={"gray"}
                  aria-label="show"
                  size="lg"
                  icon={show ? <IoEyeOffSharp /> : <IoEyeSharp />}
                  onClick={() => setShow((prevState) => !prevState)}
                />
              </InputRightElement>
            </InputGroup>
            <AppFormFields.ErrorMessage name="password" />
          </AppFormFields>
          {/* Password */}

          {/* confirm Password */}
          <AppFormFields name="confirm_password" isRequired={true}>
            <FormLabel htmlFor="confirm_password" as="legend">
              Confirm Password
            </FormLabel>
            <InputGroup>
              <AppFormFields.Input
                type={confirmShow ? "text" : "password"}
                placeholder="Confirm password"
                name="confirm_password"
                disabled={isPending}
              />
              <InputRightElement>
                <IconButton
                  variant={"unstyled"}
                  color={"gray"}
                  aria-label="show"
                  size="lg"
                  icon={confirmShow ? <IoEyeOffSharp /> : <IoEyeSharp />}
                  onClick={() => setConfirmShow((prevState) => !prevState)}
                />
              </InputRightElement>
            </InputGroup>
            <AppFormFields.ErrorMessage name="confirm_password" />
          </AppFormFields>
          {/* confirm Password */}

          {/* others */}
          <Stack spacing={5} direction={"row"} justify={"space-between"}>
            <Checkbox
              colorScheme="green"
              size={"sm"}
              onChange={(e) => {
                setChecked(e.target.checked);
              }}
            >
              I agree to the Terms & Condition and Privacy Policy
            </Checkbox>
          </Stack>
          {/* others */}

          {/* submit btn */}
          <ButtonGroup justifyContent={"space-between"} mt={"20px"}>
            {!check && (
              <Button
                isDisabled={tab > 1 || isPending ? false : true}
                colorScheme="green"
                rounded={"full"}
                variant={"outline"}
                onClick={() => {
                  setTab((prevState) => prevState - 1);
                }}
              >
                Back
              </Button>
            )}
            <AppFormSubmitBtn
              colorScheme="green"
              backgroundColor={colors.green_01}
              variant="solid"
              textTransform={"capitalize"}
              isLoading={isPending ? true : false}
              rounded={"full"}
              w={check && "full"}
            >
              {check ? "Next" : "Continue"}
            </AppFormSubmitBtn>
          </ButtonGroup>
          {/* submit btn */}
        </AppForm>
      )}

      {/* optionals */}
      <Center gap={"0.5vw"}>
        <Text fontSize="md" color={"gray"}>
          Already have an account?
        </Text>
        <Text
          fontSize="md"
          color={"green"}
          cursor={"pointer"}
          onClick={() => navigate("/auth/SignIn")}
        >
          Sign In
        </Text>
      </Center>

      {/* optionals */}
    </Flex>
  );
};

export default SignUp;
