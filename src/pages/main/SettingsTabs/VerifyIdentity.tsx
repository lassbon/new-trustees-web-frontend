import {
  Flex,
  Heading,
  FormLabel,
  Text,
  HStack,
  Badge,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import AppFormFields from "../../../components/form/AppFields";
import AppForm from "../../../components/form/AppForm";
import AppFormSubmitBtn from "../../../components/form/AppFormSubmitBtn";
import useUser from "../../../custom-hooks/http-services/use-GET/useUser";
import useUpdateNin from "../../../custom-hooks/http-services/use-PATCH/useUpdateNin";

const VerifyIdentity = () => {
  const { data, refetch } = useUser();
  const info = data?.data?.data;
  const { is_nin_verified, is_nin_added } = info;
  const patch = useUpdateNin();
  const toast = useToast();

  //initial value of account info form schema
  const initialValues = {
    nin: "",
  };
  //Yup library used to handle account info form validation requirements
  const schema = Yup.object({
    nin: Yup.string().required("Required").label("First Name"),
  });

  const handleUpdateNin = async (values: any) => {
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
          {!is_nin_added && !is_nin_verified ? (
            <AppForm
              initialValues={initialValues}
              onSubmit={handleUpdateNin}
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
                  disabled={patch?.isPending}
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
                rounded={"full"}
                w={"fit-content"}
                isLoading={patch?.isPending ? true : false}
              >
                submit
              </AppFormSubmitBtn>

              {/* submit btn */}
            </AppForm>
          ) : null}
          {is_nin_added && !is_nin_verified ? (
            <HStack gap={"4vw"}>
              <Heading size={"sm"}>NIN</Heading>
              <Badge
                rounded={"full"}
                p="10px"
                size={"sm"}
                bgColor={"rgba(9, 9, 9, 0.05)"}
              >
                In Review
              </Badge>
            </HStack>
          ) : null}

          {is_nin_added && is_nin_verified && (
            <HStack gap={"4vw"}>
              <Heading size={"sm"}>NIN</Heading>
              <Badge
                rounded={"full"}
                p="10px"
                size={"sm"}
                bgColor={"rgba(9, 9, 9, 0.05)"}
                color={"green"}
              >
                verified
              </Badge>
            </HStack>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VerifyIdentity;
