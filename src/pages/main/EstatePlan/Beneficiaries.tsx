import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  Text,
  FormLabel,
} from "@chakra-ui/react";
import * as Yup from "yup";
// import { beneficiaries } from "../../../config/data";
import EmptyDataImg from "../../../assets/images/emptyData.png";
import { BiEditAlt } from "react-icons/bi";
import useBeneficiaries from "../../../custom-hooks/http-services/use-GET/useBeneficiaries";
import { useEffect, useState } from "react";
import AppFormFields from "../../../components/form/AppFields";
import AppForm from "../../../components/form/AppForm";
import AppFormSubmitBtn from "../../../components/form/AppFormSubmitBtn";

import useDeleteBeneficiary from "../../../custom-hooks/http-services/use-DELETE/UseDeleteBeneficiary";
import useUpdateBeneficiary from "../../../custom-hooks/http-services/use-PATCH/useUpdateBeneficiary";
import useAddBeneficiary from "../../../custom-hooks/http-services/use-POST/useAddBeneficiary";

const Beneficiaries = () => {
  const {
    isLoading,
    data,
    error,
    isLoadingError,
    isRefetching,
    isRefetchError,
    refetch,
  } = useBeneficiaries();
  console.log(isLoading, isRefetching, "load", data);
  const del = useDeleteBeneficiary();
  const upd = useUpdateBeneficiary();
  const add = useAddBeneficiary();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const addBene = useDisclosure();
  const editBene = useDisclosure();

  const [beneficiaries, setBeneficiaries] = useState<any>(null);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<any>(null);

  //initial value of beneficiary info form schema
  const initialValues = {
    surname: "",
    firstname: "",
    email: "",
    phone: "",
    beneficiary_relationship: "",
    dob: "",
    gender: "",
    address: "",
    marital_status: "",
    banker: "",
    account_name: "",
    account_number: "",
  };

  //Yup library used to handle beneficiary info form validation requirements
  const schema = Yup.object({
    surname: Yup.string().required("Required").label("First Name"),
    firstname: Yup.string().required("Required").label("Last Name"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Required")
      .label("Email"),
    phone: Yup.string()
      .max(11, "Enter Valid Phone Number")
      .matches(/^0[789][01]\d{8}$/, "Enter Valid Phone Number")
      .required("Required"),
    beneficiary_relationship: Yup.string()
      .required("Required")
      .label("relationshp"),
    dob: Yup.date().required("Required").label("Date of Birth"),
    gender: Yup.string().required("Required").label("Gender"),
    address: Yup.string().required("Required").label("Address"),
    marital_status: Yup.string().required("Required").label("Marital Status"),
    banker: Yup.string().required("Required").label("banker"),
    account_name: Yup.string().required("Required").label("account name"),
    account_number: Yup.string().required("Required").label("account number"),
  });

  const date = selectedBeneficiary?.dob;
  const formattedEditDate = date && new Date(date).toISOString().split("T")[0];
  //initial value of beneficiary info form schema
  const editValues = {
    surname: selectedBeneficiary?.surname || "",
    firstname: selectedBeneficiary?.firstname || "",
    email: selectedBeneficiary?.email || "",
    phone: selectedBeneficiary?.phone || "",
    beneficiary_relationship:
      selectedBeneficiary?.beneficiary_relationship || "",
    dob: (selectedBeneficiary?.dob && formattedEditDate) || "",
    gender: selectedBeneficiary?.gender || "",
    address: selectedBeneficiary?.address || "",
    marital_status: selectedBeneficiary?.marital_status || "",
    banker: selectedBeneficiary?.banker || "",
    account_name: selectedBeneficiary?.account_name || "",
    account_number: selectedBeneficiary?.account_number || "",
  };

  //Yup library used to handle beneficiary info form validation requirements
  const editSchema = Yup.object({
    surname: Yup.string().required("Required").label("First Name"),
    firstname: Yup.string().required("Required").label("Last Name"),
    email: Yup.string().email("Invalid email address"),
    phone: Yup.string()
      .max(11, "Enter Valid Phone Number")
      .matches(/^0[789][01]\d{8}$/, "Enter Valid Phone Number")
      .required("Required"),
    beneficiary_relationship: Yup.string()
      .required("Required")
      .label("relationshp"),
    dob: Yup.date(),
    gender: Yup.string().required("Required").label("Gender"),
    address: Yup.string(),
    marital_status: Yup.string().required("Required").label("Marital Status"),
    banker: Yup.string(),
    account_name: Yup.string(),
    account_number: Yup.string(),
  });

  const handleEditBeneficiary = (values: any) => {
    const data: any = { ...values, id: selectedBeneficiary?.user_id };
    if (selectedBeneficiary) {
      upd.mutateAsync(data, {
        onSuccess: async (resData) => {
          editBene.onClose();
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
    }
  };

  const handleEditModal = async (bene: any) => {
    await setSelectedBeneficiary(bene);
    editBene.onOpen();
  };

  const handleDeleteBeneficiary = () => {
    if (selectedBeneficiary) {
      del.mutateAsync(selectedBeneficiary?.user_id, {
        onSuccess: async (resData) => {
          onClose();
          console.log("Login success", resData);
          const { message } = resData?.data;
          console.log(resData?.data, "delete");
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
    }
  };

  const handleDeleteModal = async (bene: any) => {
    await setSelectedBeneficiary(bene);
    onOpen();
  };

  const handleAddBeneficiary = (values: any) => {
    console.log(values, "add");
    add.mutateAsync(values, {
      onSuccess: async (resData) => {
        addBene.onClose();
        refetch();
        const { message } = resData?.data;
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

  useEffect(() => {
    if ((isLoadingError && !isLoading) || (isRefetchError && !isRefetching)) {
      if (error && (error as { response?: unknown })?.response === undefined) {
        toast({
          title: "something !",
          position: "top-right",
          isClosable: true,
          status: "error",
          variant: "top-accent",
        });
        return;
      }

      if (error) {
        const res = (error as { response?: any })?.response;
        const { message } = res?.data;
        console.log(res?.data);

        toast({
          title: message,
          position: "top-right",
          isClosable: true,
          status: "error",
          variant: "top-accent",
        });
      }
      return;
    }

    if (data && (!isLoading || !isRefetching)) {
      const resData = data?.data;
      if (resData) {
        setBeneficiaries(resData?.data);
      } else setBeneficiaries(null);
    }
  }, [data, isLoadingError, isLoading, isRefetchError, isRefetching, error]);

  return (
    <Flex direction={"column"} gap={"4vh"} w="100%">
      <Stack direction={"row"} justify={"space-between"} align={"center"}>
        <Heading size={"md"}>Beneficiaries</Heading>
        <Button
          colorScheme="green"
          size="md"
          rounded={"full"}
          rightIcon={<AddIcon />}
          onClick={() => addBene.onOpen()}
        >
          Add Beneficiaries
        </Button>
      </Stack>

      {!isLoading && beneficiaries && beneficiaries.length === 0 ? (
        <Flex
          direction={"column"}
          gap={"1vh"}
          h="full"
          align={"center"}
          justify={"center"}
        >
          <Img
            objectFit="contain"
            width={"30vw"}
            h={"30vh"}
            src={EmptyDataImg}
            alt="img"
          />
          <Heading size={"sm"} color={"gray"}>
            You haven't added any beneficiaries yet
          </Heading>
          <Button
            colorScheme="green"
            size="md"
            rounded={"full"}
            rightIcon={<AddIcon />}
          >
            Add beneficiaries
          </Button>
        </Flex>
      ) : (
        <TableContainer
          borderTopRadius={"md"}
          bgColor={"rgba(0, 129, 69, 0.1)"}
          overflow="auto"
        >
          <Table colorScheme="green">
            <Thead bgColor={"rgba(0, 129, 69, 0.2)"}>
              <Tr>
                <Th>SN</Th>
                <Th>Name </Th>
                <Th>Relationship</Th>
                <Th>Email Address</Th>
                <Th>Phone Number</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {error || isLoading
                ? new Array(4).fill({}).map((_item, i) => (
                    <Tr key={i}>
                      <Td>
                        <Skeleton height="20px" w={"30px"} />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                      <Td>
                        <Skeleton height="20px" />
                      </Td>
                    </Tr>
                  ))
                : !isLoading && beneficiaries && beneficiaries.length > 0
                ? beneficiaries.map((data: any, i: number) => (
                    <Tr key={i}>
                      <Td>{i + 1}</Td>
                      <Td textTransform={"lowercase"}>
                        {`${data?.surname} ${data?.firstname}` || "-"}
                      </Td>
                      <Td textTransform={"lowercase"}>
                        {data?.beneficiary_relationship || "-"}
                      </Td>
                      <Td textTransform={"lowercase"}>{data?.email || "-"}</Td>
                      <Td textTransform={"lowercase"}>{data?.phone || "-"}</Td>
                      <Td>
                        <ButtonGroup>
                          <Button
                            colorScheme="gray"
                            leftIcon={<BiEditAlt />}
                            rounded={"full"}
                            size={"sm"}
                            fontSize={"10px"}
                            variant={"solid"}
                            onClick={() => handleEditModal(data)}
                          >
                            Edit
                          </Button>
                          <Button
                            bgColor={"rgba(255, 0, 0, 0.1)"}
                            color={"red"}
                            variant={"solid"}
                            leftIcon={<DeleteIcon />}
                            rounded={"full"}
                            size={"sm"}
                            fontSize={"10px"}
                            onClick={() => handleDeleteModal(data)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      {/* delete beneficiary modal */}
      <Modal
        closeOnOverlayClick={del.isPending ? false : true}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent mx={"2vw"}>
          <ModalHeader>Delete Beneficiary</ModalHeader>
          <ModalCloseButton disabled={del.isPending ? true : false} />
          <ModalBody pb={6}>
            <Text>
              Are you sure you want to delete "{selectedBeneficiary?.surname}{" "}
              {selectedBeneficiary?.firstname}" from your list beneficiary{" "}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              bgColor={"rgba(255, 0, 0, 0.1)"}
              color={"red"}
              variant={"solid"}
              leftIcon={<DeleteIcon />}
              rounded={"full"}
              size={"sm"}
              fontSize={"10px"}
              onClick={() => handleDeleteBeneficiary()}
              mr={3}
              isLoading={del.isPending ? true : false}
            >
              Delete
            </Button>
            <Button
              colorScheme="gray"
              rounded={"full"}
              size={"sm"}
              fontSize={"10px"}
              variant={"solid"}
              onClick={onClose}
              disabled={del.isPending ? true : false}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* delete beneficiary modal */}

      {/* add beneficiary modal */}
      <Modal
        closeOnOverlayClick={add?.isPending ? false : true}
        isOpen={addBene.isOpen}
        onClose={addBene.onClose}
        isCentered
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent mx={"2vw"}>
          <ModalHeader>Add Beneficiary</ModalHeader>
          <ModalCloseButton disabled={add?.isPending ? true : false} />
          <ModalBody pb={6}>
            <AppForm
              initialValues={initialValues}
              onSubmit={handleAddBeneficiary}
              validateSchema={schema}
            >
              {/*  First Name */}
              <AppFormFields name="firstname" isRequired={true} mb={"1vh"}>
                <FormLabel htmlFor="firstname" as="legend">
                  First Name
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="firstname"
                  placeholder="john"
                  disabled={add?.isPending}
                />
                <AppFormFields.ErrorMessage name="firstname" />
              </AppFormFields>
              {/*  First Name */}

              {/*  surname */}
              <AppFormFields name="surname" isRequired={true} mb={"1vh"}>
                <FormLabel htmlFor="surname" as="legend">
                  last Name
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="surname"
                  placeholder="doe"
                  disabled={add?.isPending}
                />
                <AppFormFields.ErrorMessage name="surname" />
              </AppFormFields>
              {/*  surname */}

              {/*  relationship */}

              <AppFormFields
                name="beneficiary_relationship"
                isRequired={true}
                mb={"1vh"}
              >
                <FormLabel htmlFor="beneficiary_relationship" as="legend">
                  Relationship
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="beneficiary_relationship"
                  placeholder="child"
                  disabled={add?.isPending}
                />
                <AppFormFields.ErrorMessage name="beneficiary_relationship" />
              </AppFormFields>
              {/*  relationship */}

              {/*  gender */}
              <AppFormFields name="gender" isRequired={true} mb={"1vh"}>
                <FormLabel htmlFor="gender" as="legend">
                  Gender
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="gender"
                  placeholder="male"
                  disabled={add?.isPending}
                />
                <AppFormFields.ErrorMessage name="gender" />
              </AppFormFields>
              {/*  gender */}

              {/* phone number */}
              <AppFormFields name="phone" isRequired={true} mb={"1vh"}>
                <FormLabel htmlFor="phone" as="legend">
                  Phone Number
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="phone"
                  placeholder="09060005112"
                  disabled={add?.isPending}
                />
                <AppFormFields.ErrorMessage name="phone" />
              </AppFormFields>
              {/* phone number */}

              {/* email */}
              <AppFormFields name="email" isRequired={true} mb={"1vh"}>
                <FormLabel htmlFor="email" as="legend">
                  Email
                </FormLabel>
                <AppFormFields.Input
                  type="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  disabled={add?.isPending}
                />
                <AppFormFields.ErrorMessage name="email" />
              </AppFormFields>
              {/* email */}

              {/*  dob */}
              <AppFormFields name="dob" isRequired={true} mb={"1vh"}>
                <FormLabel htmlFor="dob" as="legend">
                  Date of Birth
                </FormLabel>
                <AppFormFields.Input
                  name="dob"
                  placeholder="20/20/2020"
                  type="date"
                  disabled={add?.isPending}
                />
                <AppFormFields.ErrorMessage name="dob" />
              </AppFormFields>
              {/* dob */}

              {/*  address */}
              <AppFormFields name="address" isRequired={true} mb={"1vh"}>
                <FormLabel htmlFor="address" as="legend">
                  address
                </FormLabel>
                <AppFormFields.textAreaInput
                  type="text"
                  name="address"
                  placeholder="5, lekki pennisula"
                  disabled={add?.isPending}
                />
                <AppFormFields.ErrorMessage name="address" />
              </AppFormFields>
              {/*  address */}

              {/*  marital_status */}
              <AppFormFields name="marital_status" isRequired={true} mb={"1vh"}>
                <FormLabel htmlFor="marital_status" as="legend">
                  Marital Status
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="marital_status"
                  placeholder="married"
                  disabled={add?.isPending}
                />
                <AppFormFields.ErrorMessage name="marital_status" />
              </AppFormFields>
              {/*  marital_status */}

              {/*  banker */}
              <AppFormFields name="banker" isRequired={true} mb={"1vh"}>
                <FormLabel htmlFor="banker" as="legend">
                  Banker
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="banker"
                  placeholder="zenith banker"
                  disabled={add?.isPending}
                />
                <AppFormFields.ErrorMessage name="banker" />
              </AppFormFields>
              {/*  banker */}

              {/*  account_name */}
              <AppFormFields name="account_name" isRequired={true} mb={"1vh"}>
                <FormLabel htmlFor="account_name" as="legend">
                  Account Name
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="account_name"
                  placeholder="John Doe"
                  disabled={add?.isPending}
                />
                <AppFormFields.ErrorMessage name="account_name" />
              </AppFormFields>
              {/*  account_name */}

              {/*  account_number */}
              <AppFormFields name="account_number" isRequired={true} mb={"1vh"}>
                <FormLabel htmlFor="account_number" as="legend">
                  Account Number
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="account_number"
                  placeholder="0978765554"
                  disabled={add?.isPending}
                />
                <AppFormFields.ErrorMessage name="account_number" />
              </AppFormFields>
              {/*  account_number */}

              {/* submit btn */}
              <ModalFooter>
                <ButtonGroup justifyContent={"space-between"} mt={"20px"}>
                  <AppFormSubmitBtn
                    colorScheme="green"
                    variant="solid"
                    textTransform={"capitalize"}
                    isLoading={add?.isPending ? true : false}
                    rounded={"full"}
                  >
                    Add
                  </AppFormSubmitBtn>
                  <Button
                    isDisabled={add?.isPending ? true : false}
                    colorScheme="green"
                    rounded={"full"}
                    variant={"outline"}
                    onClick={addBene.onClose}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </ModalFooter>
              {/* submit btn */}
            </AppForm>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* add beneficiary modal */}

      {/* edit beneficiary modal */}
      <Modal
        closeOnOverlayClick={true}
        isOpen={editBene.isOpen}
        onClose={editBene.onClose}
        isCentered
        scrollBehavior={"inside"}
      >
        <ModalOverlay />
        <ModalContent mx={"2vw"}>
          <ModalHeader>Edit Beneficiary</ModalHeader>
          <ModalCloseButton disabled={upd?.isPending} />
          <ModalBody pb={6}>
            <AppForm
              initialValues={editValues}
              onSubmit={handleEditBeneficiary}
              validateSchema={editSchema}
            >
              {/*  First Name */}
              <AppFormFields name="firstname" isRequired={true} mb={"1vh"}>
                <FormLabel htmlFor="firstname" as="legend">
                  First Name
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="firstname"
                  placeholder="john"
                  disabled={upd?.isPending}
                />
                <AppFormFields.ErrorMessage name="firstname" />
              </AppFormFields>
              {/*  First Name */}

              {/*  surname */}
              <AppFormFields name="surname" isRequired={true} mb={"1vh"}>
                <FormLabel htmlFor="surname" as="legend">
                  last Name
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="surname"
                  placeholder="doe"
                  disabled={upd?.isPending}
                />
                <AppFormFields.ErrorMessage name="surname" />
              </AppFormFields>
              {/*  surname */}

              {/*  relationship */}
              <AppFormFields
                name="beneficiary_relationship"
                isRequired={true}
                mb={"1vh"}
              >
                <FormLabel htmlFor="beneficiary_relationship" as="legend">
                  Relationship
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="beneficiary_relationship"
                  placeholder="child"
                  disabled={upd?.isPending}
                />
                <AppFormFields.ErrorMessage name="beneficiary_relationship" />
              </AppFormFields>
              {/*  relationship */}

              {/*  gender */}
              <AppFormFields name="gender" isRequired={true} mb={"1vh"}>
                <FormLabel htmlFor="gender" as="legend">
                  Gender
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="gender"
                  placeholder="male"
                  disabled={upd?.isPending}
                />
                <AppFormFields.ErrorMessage name="gender" />
              </AppFormFields>
              {/*  gender */}

              {/* phone number */}
              <AppFormFields name="phone" isRequired={true} mb={"1vh"}>
                <FormLabel htmlFor="phone" as="legend">
                  Phone Number
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="phone"
                  placeholder="09060005112"
                  disabled={upd?.isPending}
                />
                <AppFormFields.ErrorMessage name="phone" />
              </AppFormFields>
              {/* phone number */}

              {/* email */}
              <AppFormFields name="email" isRequired={false} mb={"1vh"}>
                <FormLabel htmlFor="email" as="legend">
                  Email
                </FormLabel>
                <AppFormFields.Input
                  type="email"
                  name="email"
                  placeholder="johndoe@gmail.com"
                  disabled={upd?.isPending}
                />
                <AppFormFields.ErrorMessage name="email" />
              </AppFormFields>
              {/* email */}

              {/*  dob */}
              <AppFormFields name="dob" isRequired={false} mb={"1vh"}>
                <FormLabel htmlFor="dob" as="legend">
                  Date of Birth
                </FormLabel>
                <AppFormFields.Input
                  name="dob"
                  type="date"
                  disabled={upd?.isPending}
                />
                <AppFormFields.ErrorMessage name="dob" />
              </AppFormFields>
              {/* dob */}

              {/*  address */}
              <AppFormFields name="address" isRequired={false} mb={"1vh"}>
                <FormLabel htmlFor="address" as="legend">
                  address
                </FormLabel>
                <AppFormFields.textAreaInput
                  type="text"
                  name="address"
                  placeholder="5, lekki pennisula"
                  disabled={upd?.isPending}
                />
                <AppFormFields.ErrorMessage name="address" />
              </AppFormFields>
              {/*  address */}

              {/*  marital_status */}
              <AppFormFields
                name="marital_status"
                isRequired={false}
                mb={"1vh"}
              >
                <FormLabel htmlFor="marital_status" as="legend">
                  Marital Status
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="marital_status"
                  placeholder="married"
                  disabled={upd?.isPending}
                />
                <AppFormFields.ErrorMessage name="marital_status" />
              </AppFormFields>
              {/*  marital_status */}

              {/*  banker */}
              <AppFormFields name="banker" isRequired={false} mb={"1vh"}>
                <FormLabel htmlFor="banker" as="legend">
                  Banker
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="banker"
                  placeholder="zenith banker"
                  disabled={upd?.isPending}
                />
                <AppFormFields.ErrorMessage name="banker" />
              </AppFormFields>
              {/*  banker */}

              {/*  account_name */}
              <AppFormFields name="account_name" isRequired={false} mb={"1vh"}>
                <FormLabel htmlFor="account_name" as="legend">
                  Account Name
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="account_name"
                  placeholder="John Doe"
                  disabled={upd?.isPending}
                />
                <AppFormFields.ErrorMessage name="account_name" />
              </AppFormFields>
              {/*  account_name */}

              {/*  account_number */}
              <AppFormFields
                name="account_number"
                isRequired={false}
                mb={"1vh"}
              >
                <FormLabel htmlFor="account_number" as="legend">
                  Account Number
                </FormLabel>
                <AppFormFields.Input
                  type="text"
                  name="account_number"
                  placeholder="0978765554"
                  disabled={upd?.isPending}
                />
                <AppFormFields.ErrorMessage name="account_number" />
              </AppFormFields>
              {/*  account_number */}

              {/* submit btn */}
              <ModalFooter>
                <ButtonGroup justifyContent={"space-between"} mt={"20px"}>
                  <AppFormSubmitBtn
                    colorScheme="gray"
                    leftIcon={<BiEditAlt />}
                    rounded={"full"}
                    variant={"solid"}
                    textTransform={"capitalize"}
                    isLoading={upd?.isPending}
                  >
                    Edit
                  </AppFormSubmitBtn>
                  <Button
                    isDisabled={upd?.isPending}
                    rounded={"full"}
                    variant={"outline"}
                    onClick={editBene.onClose}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </ModalFooter>
              {/* submit btn */}
            </AppForm>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* edit beneficiary modal */}
    </Flex>
  );
};

export default Beneficiaries;
