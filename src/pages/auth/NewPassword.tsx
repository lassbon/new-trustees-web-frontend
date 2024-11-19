import {
  Flex,
  FormLabel,
  Heading,
  IconButton,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AppFormFields from "../../components/form/AppFields";
import AppForm from "../../components/form/AppForm";
import AppFormSubmitBtn from "../../components/form/AppFormSubmitBtn";
import useSetNewPassword from "../../custom-hooks/http-services/use-PATCH/useSetNewPassword";
import { colors } from "../../constants/colors";

const NewPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const hash = searchParams.get("hash");

  const { isPending, mutateAsync } = useSetNewPassword();

  const [show, setShow] = useState<boolean>(false);

  const [confirmShow, setConfirmShow] = useState<boolean>(false);

  const toast = useToast();

  //initials values for the password form
  const initialValues = {
    password: "",
    confirm_password: "",
  };

  //Yup library used to handle form validation requirements
  const schema = Yup.object({
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

  const resetPasword = async (values: any) => {
    const data = {
      password: values.password,
      hash: hash,
    };
    mutateAsync(data, {
      onSuccess: async (resData) => {
        const { message } = resData?.data;
        toast({
          title: message,
          position: "top-right",
          isClosable: true,
          status: "success",
          variant: "top-accent",
        });
        // Create an example promise that resolves in 5s
        const redirectPromise = new Promise((resolve) => {
          setTimeout(() => {
            resolve(200);
          }, 5000);
        }).then(() => navigate("/auth/SignIn", { replace: true }));

        // Will display the loading toast until the promise is either resolved
        // or rejected.
        toast.promise(redirectPromise, {
          success: { title: "Redirected" },
          error: { title: "something went wrong" },
          loading: { title: "Redirecting" },
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
        Set your new Password
      </Heading>

      <AppForm
        initialValues={initialValues}
        onSubmit={resetPasword}
        validateSchema={schema}
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
          Set NewPassword
        </AppFormSubmitBtn>
        {/* submit btn */}
      </AppForm>
    </Flex>
  );
};

export default NewPassword;
