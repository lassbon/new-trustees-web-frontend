import { useEffect, useState } from "react";
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
  Img
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
import { colors } from "../../constants/colors";
import { Link } from "react-router-dom";
import back from "../../assets/images/arrow-back.webp";

const SignIn = () => {
  const { isPending, mutateAsync } = useLogin();
  const [_cookie, setCookie] = useCookies(["auth"], { doNotUpdate: false });
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const [check, setChecked] = useState<boolean>(true);
  const [userData, setUserData] = useState<null | {
    username: string;
    password: string;
  }>(null);
  //initial value of the signin form schema
  const initialValues = {
    email: userData?.username || "",
    password: userData?.password || "",
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

  const saveCredentials = async (username: string, password: string) => {
    localStorage.setItem("check", JSON.stringify(check));
    if (!check) {
      localStorage.removeItem("rememberMeData");
      return;
    }

    const credentials = JSON.stringify({ username, password });

    localStorage.setItem("rememberMeData", credentials);
  };

  const loadCredentials = async () => {
    const data = localStorage.getItem("rememberMeData");
    const data2 = localStorage.getItem("check");
    const check: boolean = data2 && JSON.parse(data2);
    const storedData = data && JSON.parse(data);
    setChecked(check);

    if (!storedData) {
      setUserData(null);
      return;
    }

    setUserData(storedData);
  };

  //to handle user login logic
  const handleLogin = async (values: any) => {
    mutateAsync(values, {
      onSuccess: async (resData) => {
        await saveCredentials(values.email, values.password);

        const { message } = resData?.data;
        console.log(resData?.data, "info");

        //extract token
        const { token } = resData?.headers;
        //logic to extract the expiration time of the token
        const expHour = await isTokenExpired(token);

        if (!expHour) {
          toast({
            title: "error logining in pls try again",
            position: "top-right",
            isClosable: true,
            status: "error",
            variant: "top-accent",
          });
          return;
        }

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
        console.log(error.response, "first");
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

  useEffect(() => {
    loadCredentials();
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
      <Link  to={"/"}>
      <Flex align="center" gap={".3vw"} cursor={"pointer"}>
        <Img src={back} alt="back" boxSize="10px" />
        <Text fontSize="sm" fontWeight="bold">
          back
        </Text>
      </Flex>
      </Link>
      <Heading as="h2" size="lg">
        Welcome back
      </Heading>
      <Text>Welcome back! Log in to continue your journey.</Text>
      <AppForm
        initialValues={initialValues}
        onSubmit={handleLogin}
        validateSchema={schema}
        enableReinitialize={true}
      >
        {/* email */}
        <AppFormFields name="email" isRequired={true}>
          <FormLabel htmlFor="email" as="legend">
            Email
          </FormLabel>
          <AppFormFields.Input
            type="email"
            name="email"
            placeholder="Johndoe@gmail.com"
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
            size={"sm"}
            onChange={(e) => setChecked(e.target.checked)}
            isChecked={check}
          >
            Remember me
          </Checkbox>

          <Text
            cursor={"pointer"}
            fontSize="xs"
            color={colors.green_01}
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
          backgroundColor={colors.green_01}
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
            color={colors.green_01}
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
