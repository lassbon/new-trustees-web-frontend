import {
  Flex,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useState } from "react";

import AppForm from "../../../../components/form/AppForm";
import { nominieFormFields } from "../../../../config/data";
import AppFormFields from "../../../../components/form/AppFields";
import AppFormSubmitBtn from "../../../../components/form/AppFormSubmitBtn";
import { IoIosAddCircle } from "react-icons/io";
import useBeneficiaries from "../../../../custom-hooks/http-services/use-GET/useBeneficiaries";

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

const NominatedFund = () => {
  const { isLoading, data, error, isRefetching } = useBeneficiaries();
  const info = data?.data?.data;
  const [addedBeneficiaries, setAddedBeneficiaries] = useState<any>([]);

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

  const handleAddBeneficiary = () => {
    const newId = addedBeneficiaries.length + 1;
    const newBene = {
      [`name_${newId}`]: {
        label: `Beneficiary Name ${newId}`,
        name: `Beneficiary_Name_${newId}`,
        placeholder: "john doe",
        datatype: "string",
        required: true,
        value: "",
      },
      [`address_${newId}`]: {
        label: `Address of Beneficiary ${newId}`,
        name: `Address_of_beneficiary_${newId}`,
        placeholder: "123 Main St",
        datatype: "textarea",
        required: true,
        value: "",
      },
      [`dob_${newId}`]: {
        label: `Beneficiary's date of birth ${newId}`,
        name: `beneficiary_dob_${newId}`,
        placeholder: "",
        datatype: "date",
        required: true,
      },
      [`benefit_fund_percentage_${newId}`]: {
        label: `Percentage of Fund for their Benefit ${newId}`,
        name: `beneficiary_fund_percentage_${newId}`,
        placeholder: "",
        datatype: "range",
        min: 0,
        max: 100,
        step: 5,
        value: 5,
        required: true,
      },
      [`email_${newId}`]: {
        label: `Email Address ofbeneficiary ${newId}`,
        name: `beneficiary_email_address_${newId}`,
        placeholder: "johndoe@gmail.com",
        datatype: "email",
        required: true,
        value: "",
      },
      [`phone_${newId}`]: {
        label: `Telephone Number of beneficiary ${newId}`,
        name: `beneficiary_phone_${newId}`,
        placeholder: "",
        datatype: "phone",
        required: true,
        value: "",
      },
      [`occupation_${newId}`]: {
        label: `Occupation/Profession of beneficiary ${newId}`,
        name: `beneficiary_occupation_${newId}`,
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
    setAddedBeneficiaries((prevstate: any) => {
      return [...prevstate, newBene];
    });
  };

  // Function to handle beneficiary selection
  const handleBeneficiarySelect = (selectedBeneficiary: any, index: number) => {
    // Update the corresponding beneficiary object in addedBene
    const updatedBeneficiary = { ...addedBeneficiaries[index] };

    // extract and assigning the properties of 'selectedBeneficiary'
    updatedBeneficiary[
      `name_${index + 1}`
    ].value = `${selectedBeneficiary?.surname} ${selectedBeneficiary?.firstname}`;
    updatedBeneficiary[`address_${index + 1}`].value =
      selectedBeneficiary?.address;
    updatedBeneficiary[`phone_${index + 1}`].value = parseInt(
      selectedBeneficiary?.phone
    );
    updatedBeneficiary[`email_${index + 1}`].value = selectedBeneficiary?.email;

    // Update addedBene state with the modified beneficiary object
    const updatedAddedBene = [...addedBeneficiaries];
    updatedAddedBene[index] = updatedBeneficiary;

    setAddedBeneficiaries(updatedAddedBene);
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
              disabled={false}
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
              disabled={false}
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
              disabled={false}
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
              disabled={false}
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
              isDisabled={false}
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
              disabled={false}
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
              disabled={false}
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
              disabled={false}
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
              disabled={false}
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
                console.log(info[e.target.value], "setSelectedbenef");
              console.log(typeof info[e.target.value]?.phone);
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
    console.log(values, "values");
    const groupedData = addedBeneficiaries.reduce(
      (acc: any, beneficiary: any, index: number) => {
        // Create a new object for each beneficiary
        const beneficiaryData: any = {};

        // Loop through fields associated with this beneficiary
        Object.keys(values).forEach((fieldName) => {
          if (fieldName.includes(`_${index + 1}`)) {
            const cleanFieldName = fieldName.replace(`_${index + 1}`, "");
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
      nominators_name: values.nominators_name,
      nominators_address: values.nominators_address,
      nominators_occupation: values.nominators_occupation,
      nominators_phone: values.nominators_phone,
    };
    const formData = {
      ...nominatorsData,
      beneficiariesData,
    };
    console.log(formData, "formData");
  };
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
              onClick={() => handleAddBeneficiary()}
            />
          </HStack>

          {nominieFormFields && addedBeneficiaries.length > 0 && (
            <AppFormSubmitBtn
              colorScheme="green"
              variant="solid"
              textTransform={"capitalize"}
              isLoading={false}
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
