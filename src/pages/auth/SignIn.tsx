import { useState } from "react";
import {
  Flex,
  Heading,
  Text,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
  Stack,
  Checkbox,
  Center,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import AppForm from "../../components/form/AppForm";
import AppFormFields from "../../components/form/AppFields";
import AppFormSubmitBtn from "../../components/form/AppFormSubmitBtn";
import useLogin from "../../custom-hooks/http-services/use-POST/useLogin";
import { useCookies } from "react-cookie";
import isTokenExpired from "../../config/jwtDecode";

const SignIn = () => {
  const { isPending, mutateAsync } = useLogin();
  const [_cookie, setCookie] = useCookies(["auth"], { doNotUpdate: false });
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const [check, setChecked] = useState<boolean>(true);
  //initial value of the signin form schema
  const initialValues = {
    email: "",
    password: "",
  };

  //Yup library used to handle form validation requirements
  const schema = Yup.object({
    email: Yup.string()
      .email("invalid email address")
      .required("Required")
      .label("Email"),
    password: Yup.string()
      .min(8, "Invalid please enter atleast 8 digits")
      .required("Required")
      .label("Password"),
  });

  //to handle user login logic
  const handleLogin = async (values: any) => {
    mutateAsync(values, {
      onSuccess: async (resData) => {
        console.log("Login success", resData);
        const { message } = resData?.data;
        console.log(resData?.data, "signin  data");
        //extract token
        const { token } = resData?.headers;
        //logic to extract the expiration time of the token
        const expHour = await isTokenExpired(token);

        if (!expHour) {
          toast({
            title: "error loginning in pls try again",
            position: "top-right",
            isClosable: true,
            status: "error",
            variant: "top-accent",
          });
          return;
        }

        console.log(expHour, "date");

        //setting token to cookie storage, along side expiration time
        setCookie(
          "auth",
          { token: token, rememberMe: check },
          { maxAge: 3600, sameSite: false }
        );

        navigate("/Dashboard");
        toast({
          title: message,
          position: "top-right",
          isClosable: true,
          status: "success",
          variant: "top-accent",
        });
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
        Welcome back
      </Heading>
      <Text>Welcome back! Log in to continue your journey.</Text>
      <AppForm
        initialValues={initialValues}
        onSubmit={handleLogin}
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
            disabled={isPending}
          />
          <AppFormFields.ErrorMessage name="email" />
        </AppFormFields>
        {/* email */}

        {/* Password */}
        <AppFormFields name="password" isRequired={true}>
          <FormLabel htmlFor="password" as="legend">
            Password
          </FormLabel>
          <InputGroup>
            <AppFormFields.Input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              name="password"
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

        {/* others */}
        <Stack spacing={5} direction={"row"} justify={"space-between"}>
          <Checkbox
            colorScheme="green"
            defaultChecked
            size={"sm"}
            onChange={(e) => setChecked(e.target.checked)}
          >
            Remember me
          </Checkbox>

          <Text
            cursor={"pointer"}
            fontSize="xs"
            color={"green"}
            as="b"
            onClick={() => navigate("/auth/ResetPassword")}
          >
            Forgot Password?
          </Text>
        </Stack>
        {/* others */}

        {/* submit btn */}
        <AppFormSubmitBtn
          mt="2vh"
          colorScheme="green"
          variant="solid"
          textTransform={"capitalize"}
          isLoading={isPending}
          rounded={"full"}
        >
          login
        </AppFormSubmitBtn>
        {/* submit btn */}

        {/* optionals */}
        <Center gap={"0.5vw"}>
          <Text fontSize="md" color={"gray"}>
            Don't have an account?
          </Text>
          <Text
            fontSize="md"
            color={"green"}
            cursor={"pointer"}
            onClick={() => navigate("/auth/SignUp")}
          >
            Sign up here.
          </Text>
        </Center>
        {/* optionals */}
      </AppForm>
    </Flex>
  );
};

export default SignIn;
