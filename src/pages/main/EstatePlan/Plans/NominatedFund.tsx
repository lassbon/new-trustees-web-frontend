import {
  Flex,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

import AppForm from "../../../../components/form/AppForm";
import AppFormFields from "../../../../components/form/AppFields";
import AppFormSubmitBtn from "../../../../components/form/AppFormSubmitBtn";
import { IoIosAddCircle } from "react-icons/io";
import useBeneficiaries from "../../../../custom-hooks/http-services/use-GET/useBeneficiaries";
import { useDispatch } from "react-redux";
import { formSliceAction } from "../../../../store/formSlice";
import useAddEstatePlan from "../../../../custom-hooks/http-services/use-POST/useAddEstatePlan";
import { useNavigate } from "react-router-dom";

type field = {
  label: string;
  name: string;
  placeholder?: string;
  datatype: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  required?: boolean;
  options?: any;
};

type stateProps = {
  state: any;
  form: any;
};

const NominatedFund = () => {
  const formRef = useRef<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const add = useAddEstatePlan();
  const { isLoading, data, error, isRefetching } = useBeneficiaries();
  const info = data?.data?.data;
  const [addedBeneficiaries, setAddedBeneficiaries] = useState<any>([]);
  const [nominieFormFields, setNominieFormFields] = useState<any>([
    {
      label: "name",
      name: "nominatedfund_nominator_name",
      explainerText: "name of the settlor respo For this trust",
      placeholder: "john doe",
      datatype: "string",
      required: true,
    },
    {
      label: "Telephone number",
      name: "nominatedfund_nominator_phone",
      placeholder: "09087777712",
      datatype: "phone",
      required: true,
    },
    {
      label: "email",
      name: "nominatedfund_nominator_email",
      placeholder: "johndoe@gmail.com",
      datatype: "email",
      required: true,
    },
    {
      label: "Occupation/Profession",
      name: "nominatedfund_nominator_occupation",
      placeholder: "",
      datatype: "select",
      options: ["lawyer", "doctor", "employee", "teacher", "realtor"],
      required: true,
    },
    {
      label: "address",
      name: "nominatedfund_nominator_address",
      placeholder: "5 lekki road",
      datatype: "textarea",
      required: true,
    },
  ]);

  const [enable, setEnable] = useState<boolean>(true);
  const [addEnable, setAddEnable] = useState<boolean>(false);

  const { formPersistedValues } = useSelector(
    (state: stateProps) => state.form,
    () => enable
  );

  const handleExtractObjPropertiesInArray = (fields: any[]) =>
    fields.reduce((acc, field) => {
      if (typeof field === "object" && !Array.isArray(field)) {
        Object.keys(field).forEach((key) => {
          acc[key] = field[key];
        });
      }
      return acc;
    }, {});

  const flattenFieldsResult =
    handleExtractObjPropertiesInArray(addedBeneficiaries);
  const beneficiariesfields: any = Object.values(flattenFieldsResult);
  //initial value of the signin form schema
  const initialValues = nominieFormFields
    ? Object.fromEntries(
        [...nominieFormFields, ...beneficiariesfields]?.map((field: any) => [
          field.name,
          field?.value || "",
        ])
      )
    : {};

  //Yup library used to dynamically handle form validation requirments for fieldsData
  const schema = Yup.object(
    [...nominieFormFields, ...beneficiariesfields]?.reduce(
      (schema, field: field) => {
        let fieldSchema;

        switch (field.datatype) {
          case "string":
            fieldSchema = Yup.string()
              .required(`${field.label} is required`)
              .label(field.label);
            break;
          case "number":
            fieldSchema = Yup.number()
              .required(`${field.label} is required`)
              .label(field.label);
            break;
          case "range":
            fieldSchema = Yup.number()
              .min(5, "percentage benefit must be aleast 5%")
              .required(`${field.label} is required`)
              .label(field.label);
            break;
          case "phone":
            fieldSchema = Yup.string()
              .max(11, "Enter Valid Phone Number")
              .matches(/^0[789][01]\d{8}$/, "Enter Valid Phone Number")
              .required(`${field.label} is Required`);
            break;
          case "email":
            fieldSchema = Yup.string()
              .email("Invalid email address")
              .required(`${field.label} is Required`)
              .label(field.label);
            break;
          default:
            fieldSchema = Yup.string()
              .required(`${field.label} is required`)
              .label(field.label);
            break;
        }

        return { ...schema, [field.name]: fieldSchema };
      },
      {}
    )
  );

  const handleAddBeneficiary = async () => {
    const newId = addedBeneficiaries.length + 1;
    const newBene = {
      [`name_${newId}`]: {
        label: `Beneficiary Name ${newId}`,
        name: `name_of_beneficiary_${newId}`,
        placeholder: "john doe",
        datatype: "string",
        required: true,
        value: "",
      },
      [`address_${newId}`]: {
        label: `Address of Beneficiary ${newId}`,
        name: `address_of_beneficiary_${newId}`,
        placeholder: "123 Main St",
        datatype: "textarea",
        required: true,
        value: "",
      },
      [`dob_${newId}`]: {
        label: `Beneficiary's date of birth ${newId}`,
        name: `dob_of_beneficiary_${newId}`,
        placeholder: "",
        datatype: "date",
        required: true,
      },
      [`benefit_fund_percentage_${newId}`]: {
        label: `Percentage of Fund for their Benefit ${newId}`,
        name: `percent_of_fund_of_beneficiary_${newId}`,
        placeholder: "",
        datatype: "range",
        min: 0,
        max: 100,
        step: 5,
        value: 0,
        required: true,
      },
      [`email_${newId}`]: {
        label: `Email Address ofbeneficiary ${newId}`,
        name: `email_of_beneficiary_${newId}`,
        placeholder: "johndoe@gmail.com",
        datatype: "email",
        required: true,
        value: "",
      },
      [`phone_${newId}`]: {
        label: `Telephone Number of beneficiary ${newId}`,
        name: `phone_of_beneficiary_${newId}`,
        placeholder: "",
        datatype: "phone",
        required: true,
        value: "",
      },
      [`occupation_${newId}`]: {
        label: `Occupation/Profession of beneficiary ${newId}`,
        name: `occupation_of_beneficiary_${newId}`,
        placeholder: "",
        datatype: "select",
        options: [
          "doctor",
          "engineer",
          "student",
          "lawyer",
          "politician",
          "entrepreneor",
        ],
        required: true,
      },
    };
    await formPersistedValues;

    // Extract current form values before adding a new beneficiary

    const updatedNomineeFormFields = nominieFormFields.map((field: any) => ({
      ...field,
      value: formPersistedValues[field.name]
        ? formPersistedValues[field?.name]
        : "",
    }));

    const updatedAddedBeneficiaries = addedBeneficiaries.map(
      (beneficiary: any) =>
        Object.keys(beneficiary).reduce((acc: any, key) => {
          acc[key] = {
            ...beneficiary[key],
            value: formPersistedValues[beneficiary[key].name]
              ? formPersistedValues[beneficiary[key].name]
              : "",
          };
          return acc;
        }, {})
    );

    setNominieFormFields(updatedNomineeFormFields);

    setAddedBeneficiaries((_prevstate: any) => {
      return [...updatedAddedBeneficiaries, newBene];
    });
  };

  // Function to handle beneficiary selection
  const handleBeneficiarySelect = (selectedBeneficiary: any, index: number) => {
    const date = selectedBeneficiary?.dob;
    const formattedDate = new Date(date).toISOString().split("T")[0];

    formRef.current.setFieldValue(
      `name_of_beneficiary_${index + 1}`,
      `${selectedBeneficiary?.surname} ${selectedBeneficiary?.firstname}`
    );
    dispatch(
      formSliceAction.updateFormField({
        name: `name_of_beneficiary_${index + 1}`,
        value: `${selectedBeneficiary?.surname} ${selectedBeneficiary?.firstname}`,
      })
    );
    formRef.current.setFieldValue(
      `address_of_beneficiary_${index + 1}`,
      selectedBeneficiary?.address
    );
    dispatch(
      formSliceAction.updateFormField({
        name: `address_of_beneficiary_${index + 1}`,
        value: selectedBeneficiary?.address,
      })
    );
    formRef.current.setFieldValue(
      `email_of_beneficiary_${index + 1}`,
      selectedBeneficiary?.email
    );
    dispatch(
      formSliceAction.updateFormField({
        name: `email_of_beneficiary_${index + 1}`,
        value: selectedBeneficiary?.email,
      })
    );
    formRef.current.setFieldValue(
      `phone_of_beneficiary_${index + 1}`,
      parseInt(selectedBeneficiary?.phone)
    );
    dispatch(
      formSliceAction.updateFormField({
        name: `phone_of_beneficiary_${index + 1}`,
        value: parseInt(selectedBeneficiary?.phone),
      })
    );
    formRef.current.setFieldValue(
      `dob_of_beneficiary_${index + 1}`,
      formattedDate
    );
    dispatch(
      formSliceAction.updateFormField({
        name: `dob_of_beneficiary_${index + 1}`,
        value: formattedDate,
      })
    );
  };

  const renderAppFormComponent = (field: any) => {
    switch (field.datatype) {
      case "string":
        return (
          <AppFormFields name={field?.name} isRequired={true}>
            <FormLabel htmlFor={field?.name} as="legend" noOfLines={1}>
              {field?.label}
            </FormLabel>
            <AppFormFields.Input
              type="text"
              name={field?.name}
              placeholder={field?.explainer_text}
              disabled={add?.isPending ? true : false}
            />
            <AppFormFields.ErrorMessage name={field?.name} />
          </AppFormFields>
        );
      case "textarea":
        return (
          <AppFormFields name={field?.name} isRequired={true} mb={"1vh"}>
            <FormLabel htmlFor={field?.label} as="legend">
              {field?.label}
            </FormLabel>
            <AppFormFields.textAreaInput
              type="text"
              name={field?.name}
              placeholder={field?.explainer_text}
              disabled={add?.isPending ? true : false}
            />
            <AppFormFields.ErrorMessage name={field?.name} />
          </AppFormFields>
        );
      case "email":
        return (
          <AppFormFields name={field?.name} isRequired={true}>
            <FormLabel htmlFor={field?.name} as="legend" noOfLines={1}>
              {field?.label}
            </FormLabel>
            <AppFormFields.Input
              type="email"
              name={field?.name}
              placeholder={field?.explainer_text}
              disabled={add?.isPending ? true : false}
            />
            <AppFormFields.ErrorMessage name={field?.name} />
          </AppFormFields>
        );
      case "radio":
        return (
          <AppFormFields name={field?.name} isRequired={true}>
            <FormLabel htmlFor={field?.name} as="legend">
              {field?.label}
            </FormLabel>
            <AppFormFields.RadioInput
              options={field?.options}
              name={field?.name}
              placeholder={field?.explainer_text}
              disabled={add?.isPending ? true : false}
            />
            <AppFormFields.ErrorMessage name={field?.name} />
          </AppFormFields>
        );
      case "range":
        return (
          <AppFormFields name={field?.name} isRequired={true}>
            <FormLabel htmlFor={field?.name} as="legend">
              {field?.label}
            </FormLabel>
            <AppFormFields.RangeInput
              max={field?.max}
              min={field?.min}
              step={field?.step}
              defaultValue={field?.value}
              name={field?.name}
              disabled={add?.isPending ? true : false}
            />
            <AppFormFields.ErrorMessage name={field?.name} />
          </AppFormFields>
        );
      case "number":
        return (
          <AppFormFields name={field?.name} isRequired={true}>
            <FormLabel htmlFor={field?.label} as="legend">
              {field?.label}
            </FormLabel>
            <AppFormFields.Input
              type="number"
              name={field?.name}
              placeholder={field?.explainer_text}
              disabled={add?.isPending ? true : false}
            />
            <AppFormFields.ErrorMessage name={field?.name} />
          </AppFormFields>
        );
      case "phone":
        return (
          <AppFormFields name={field?.name} isRequired={true}>
            <FormLabel htmlFor={field?.label} as="legend">
              {field?.label}
            </FormLabel>
            <AppFormFields.Input
              type="number"
              name={field?.name}
              placeholder={field?.explainer_text}
              disabled={add?.isPending ? true : false}
            />
            <AppFormFields.ErrorMessage name={field?.name} />
          </AppFormFields>
        );
      case "select":
        return (
          <AppFormFields name={field?.name} isRequired={true}>
            <FormLabel htmlFor={field?.label} as="legend">
              {field?.label}
            </FormLabel>
            <AppFormFields.SelectionInput
              name={field?.name}
              options={field?.options}
              placeholder={field?.explainer_text || "select option"}
              disabled={add?.isPending ? true : false}
            />
            <AppFormFields.ErrorMessage name={field?.name} />
          </AppFormFields>
        );
      case "date":
        return (
          <AppFormFields name={field?.name} isRequired={true}>
            <FormLabel htmlFor={field?.label} as="legend">
              {field?.label}
            </FormLabel>
            <AppFormFields.Input
              name={field?.name}
              placeholder={field?.explainer_text}
              disabled={add?.isPending ? true : false}
              type="date"
            />
            <AppFormFields.ErrorMessage name={field?.name} />
          </AppFormFields>
        );
      default:
        return null;
    }
  };

  const renderBeneficiaryFieldsData = () => {
    if (!addedBeneficiaries) return null;

    return addedBeneficiaries.map((beneficiary: any, index: number) => {
      const beneficiaryFields: any = Object.values(beneficiary);

      const stackItems = [];

      for (let i = 0; i < beneficiaryFields.length; i += 2) {
        const firstField =
          beneficiaryFields[i] && renderAppFormComponent(beneficiaryFields[i]);
        const secondField =
          beneficiaryFields[i + 1] &&
          renderAppFormComponent(beneficiaryFields[i + 1]);

        stackItems.push(
          <Stack
            key={Math.random()}
            direction={{ base: "column", lg: "row" }}
            display={"flex"}
            gap={"30px"}
          >
            {firstField}
            {secondField}
          </Stack>
        );
      }

      return (
        <Flex direction={"column"} gap={"2vh"}>
          <Heading size={"md"}>{`Personal Details of the Beneficiary ${
            index + 1
          }`}</Heading>

          <Select
            placeholder="beneficiaries"
            variant="filled"
            onChange={(e) => {
              if (e.target.value !== "")
                handleBeneficiarySelect(info[e.target.value], index);
            }}
            disabled={error || isLoading || isRefetching ? true : false}
          >
            {info?.map((beneficiary: any, index: number) => (
              <option
                key={index}
                value={index}
                style={{ textTransform: "lowercase" }}
              >
                {`${beneficiary?.surname} ${beneficiary?.firstname}`}
              </option>
            ))}
          </Select>
          {stackItems}
        </Flex>
      );
    });
  };

  const renderFieldsData = (data: any) => {
    if (!data) return null;

    const stackItems = [];
    const formFields = [...data];

    for (let i = 0; i < formFields.length; i += 2) {
      const firstField = formFields[i] && renderAppFormComponent(formFields[i]);
      const secondField =
        formFields[i + 1] && renderAppFormComponent(formFields[i + 1]);

      stackItems.push(
        <Stack
          key={Math.random()}
          direction={{ base: "column", lg: "row" }}
          display={"flex"}
          gap={"30px"}
        >
          {firstField}
          {secondField}
        </Stack>
      );
    }

    return (
      <>
        {stackItems}
        {/* Render beneficiary fields dynamically */}
        {renderBeneficiaryFieldsData()}
        {/* Render beneficiary fields dynamically */}
      </>
    );
  };

  const handleSubmitForm = (values: any) => {
    const groupedData = addedBeneficiaries.reduce(
      (acc: any, _beneficiary: any, index: number) => {
        // Create a new object for each beneficiary
        const beneficiaryData: any = {};

        // Loop through fields associated with this beneficiary
        Object.keys(values).forEach((fieldName) => {
          if (fieldName.includes(`_${index + 1}`)) {
            const cleanFieldName = fieldName.replace(
              `_of_beneficiary_${index + 1}`,
              ""
            );
            beneficiaryData[cleanFieldName] = values[fieldName];
          }
        });

        // Add the beneficiary data to the accumulator
        acc[`Beneficiary_${index + 1}`] = beneficiaryData;

        return acc;
      },
      {}
    );

    const beneficiariesData = Object.values(groupedData);

    const nominatorsData = {
      nominatedfund_nominator_name: values.nominatedfund_nominator_name,
      nominatedfund_nominator_address: values.nominatedfund_nominator_address,
      nominatedfund_nominator_occupation:
        values.nominatedfund_nominator_occupation,
      nominatedfund_nominator_phone: values.nominatedfund_nominator_phone,
      nominatedfund_nominator_email: values.nominatedfund_nominator_email,
    };
    const formData: any = {
      type: "nominated-fund",
      ...nominatorsData,
      nominatedfund_beneficiary: beneficiariesData,
    };


    add.mutateAsync(formData, {
      onSuccess: async (resData) => {
        const { message } = resData?.data;

        toast({
          title: message,
          position: "top-right",
          isClosable: true,
          status: "success",
          variant: "top-accent",
        });
        navigate(-1);
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
    setTimeout(() => {
      if (!enable && addEnable) {
        handleAddBeneficiary();
        setAddEnable(false);
        setEnable(true);
      }
    }, 300);
  }, [formPersistedValues, enable, addEnable]);
  return (
    <Flex px={"3vw"} direction={"column"}>
      <Flex
        direction={"column"}
        rounded={"md"}
        borderWidth={1}
        borderColor={"rgba(230, 230, 230, 1)"}
        bgColor={"rgba(0, 129, 69, 0.05)"}
        p={"10px"}
        gap={"2vh"}
      >
        <Heading size={"md"}>Personal Details of Nominator(s)</Heading>
        <AppForm
          initialValues={initialValues}
          onSubmit={handleSubmitForm}
          validateSchema={schema}
          enableReinitialize={true}
          ref={formRef}
        >
          {/* Render the divs dynamically */}
          {nominieFormFields && renderFieldsData(nominieFormFields)}
          {/* Render the divs dynamically */}

          <HStack my={2} display={"flex"} py={"2vh"} align={"center"}>
            <Text as={"b"} size={"md"}>
              Add a Beneficiary
            </Text>
            <IconButton
              icon={<IoIosAddCircle />}
              aria-label={"add"}
              colorScheme="green"
              variant="unstyled"
              color={"green"}
              fontSize={"30px"}
              onClick={async () => {
                await setEnable(false);
                setAddEnable(true);
              }}
            />
          </HStack>

          {nominieFormFields && addedBeneficiaries.length > 0 && (
            <AppFormSubmitBtn
              colorScheme="green"
              variant="solid"
              textTransform={"capitalize"}
              isLoading={add?.isPending ? true : false}
              rounded={"full"}
              w={"full"}
            >
              Submit
            </AppFormSubmitBtn>
          )}
        </AppForm>
      </Flex>
    </Flex>
  );
};

export default NominatedFund;
