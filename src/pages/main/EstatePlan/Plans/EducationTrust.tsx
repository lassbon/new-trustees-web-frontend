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
import { useRef, useState, useEffect } from "react";

import { IoIosAddCircle } from "react-icons/io";
import * as Yup from "yup";
import AppForm from "../../../../components/form/AppForm";

// import { eduFormFields } from "../../../../config/data";
import AppFormFields from "../../../../components/form/AppFields";
import useBeneficiaries from "../../../../custom-hooks/http-services/use-GET/useBeneficiaries";
import useAssetsCurrencies from "../../../../custom-hooks/http-services/use-GET/useCurrencies";
import AppFormSubmitBtn from "../../../../components/form/AppFormSubmitBtn";
import { useDispatch, useSelector } from "react-redux";
import { formSliceAction } from "../../../../store/formSlice";

type stateProps = {
  state: any;
  form: any;
};
const EducationTrust = () => {
  const formRef = useRef<any>(null);
  const dispatch = useDispatch();
  const { isLoading, data, error, isRefetching } = useBeneficiaries();
  const info = data?.data?.data;
  const currency = useAssetsCurrencies();
  const cn = currency.data?.data;
  const currencies = cn?.data?.map((currency: any) => currency?.currency);

  const [addedBene, setaddedBene] = useState<any>([]);
  const [eduFormFields, setEduFormFields] = useState<any>([
    {
      label: "name",
      name: "trust_settlor_name",
      explainerText: "name of the settlor respo For this trust",
      placeholder: "john doe",
      datatype: "string",
      required: true,
    },
    {
      label: "address",
      name: "trust_settlor_address",
      placeholder: "5 lekki road",
      datatype: "textarea",
      required: true,
    },
    {
      label: "Occupation/Profession",
      name: "trust_settlor_occupation",
      placeholder: "",
      datatype: "select",
      options: ["lawyer", "doctor", "employee", "teacher", "realtor"],
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

  const flattenFieldsResult = handleExtractObjPropertiesInArray(addedBene);
  const benefields = Object.keys(flattenFieldsResult).map(
    (key) => flattenFieldsResult[key]
  );

  //initial value of the signin form schema
  const initialValues = eduFormFields
    ? Object.fromEntries(
        [...eduFormFields, ...benefields]?.map((field) => [
          field.name,
          field?.value || "",
        ])
      )
    : {};

  //Yup library used to dynamically handle form validation requirments for fieldsData
  const schema = Yup.object(
    [...eduFormFields, ...benefields]?.reduce((schema, field) => {
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
        default:
          fieldSchema = Yup.string()
            .required(`${field.label} is required`)
            .label(field.label);
          break;
      }

      return { ...schema, [field.name]: fieldSchema };
    }, {})
  );

  const handleAddBeneficiary = () => {
    const newId = addedBene.length + 1;
    const newBene = {
      [`name_${newId}`]: {
        label: `Beneficiary Name ${newId}`,
        name: `name_of_beneficiary_${newId}`,
        placeholder: "john doe",
        datatype: "string",
        required: true,
        value: "",
      },
      [`relationship_${newId}`]: {
        label: `Relationship with Beneficiary ${newId}`,
        name: `relationship_of_beneficiary_${newId}`,
        placeholder: "husband",
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
      [`level_of_education_${newId}`]: {
        label: `what level of education do you intend the truist to cover for beneficiary ${newId}`,
        name: `education_level_of_beneficiary_${newId}`,
        placeholder: "",
        datatype: "radio",
        options: ["Secondary Education", "Higher education"],
        required: true,
      },
      [`trustee_advise_option_${newId}`]: {
        label: `Do you want the Trustee to advise on the cost of education up till graduation of
      beneficiary? for beneficiary ${newId}`,
        name: `trust_trustees_advise_of_beneficiary_${newId}`,
        placeholder: "",
        datatype: "radio",
        options: ["Yes", "No"],
        required: true,
      },
      [`initial_contribution_${newId}`]: {
        label: `Initial contribution into the Trust (State Asset Type & Value) for beneficiary ${newId}`,
        name: `initial_contribution_of_beneficiary_${newId}`,
        placeholder: "",
        datatype: "string",
        required: true,
      },
      [`currency_${newId}`]: {
        label: `Currency type for beneficiary ${newId}`,
        name: `currency_of_beneficiary_${newId}`,
        placeholder: "",
        datatype: "select",
        options: currencies,
        required: true,
      },
      [`contribution_interval_${newId}`]: {
        label: `How often do you intend to contribute into the fund for beneficiary ${newId}`,
        name: `how_often_is_contribution_of_beneficiary_${newId}`,
        placeholder: "",
        datatype: "select",
        options: ["daily", "weekly", "monthly", "anually"],
        required: true,
      },
    };

    // Extract current form values before adding a new beneficiary

    const updatedEduFormFields = eduFormFields.map((field: any) => ({
      ...field,
      value: formPersistedValues[field.name]
        ? formPersistedValues[field?.name]
        : "",
    }));

    const updatedAddedBeneficiaries = addedBene.map((beneficiary: any) =>
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
    // setaddedBene((prevstate: any) => {
    //   return [...prevstate, newBene];
    // });

    setEduFormFields(updatedEduFormFields);

    setaddedBene((_prevstate: any) => {
      return [...updatedAddedBeneficiaries, newBene];
    });
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

  // Function to handle beneficiary selection
  const handleBeneficiarySelect = (selectedBeneficiary: any, index: number) => {
    // Update the corresponding beneficiary object in addedBene
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
      `relationship_of_beneficiary_${index + 1}`,
      `${selectedBeneficiary?.surname} ${selectedBeneficiary?.firstname}`
    );
    dispatch(
      formSliceAction.updateFormField({
        name: `relationship_of_beneficiary_${index + 1}`,
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
  };

  const renderBeneficiaryFieldsData = () => {
    if (!addedBene) return null;

    return addedBene.map((beneficiary: any, index: number) => {
      const beneficiaryFields = Object.keys(beneficiary).map(
        (key) => beneficiary[key]
      );

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
    const groupedData = addedBene.reduce(
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

    const settlorData = {
      trust_settlor_name: values.trust_settlor_name,
      trust_settlor_address: values.trust_settlor_address,
      trust_settlor_occupation: values.trust_settlor_occupation,
    };
    const formData = {
      type: "education-trust",
      ...settlorData,
      trust_beneficiary: beneficiariesData,
    };
    console.log(formData, "formData");
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
        <Heading size={"md"}>Personal Details of settlor</Heading>
        <AppForm
          initialValues={initialValues}
          onSubmit={handleSubmitForm}
          validateSchema={schema}
          enableReinitialize={true}
          ref={formRef}
        >
          {/* Render the divs dynamically */}
          {eduFormFields && renderFieldsData(eduFormFields)}
          {/* Render the divs dynamically */}

          <HStack my={2} display={"flex"} py={"2vh"} align={"center"}>
            <Text as={"b"} size={"md"}>
              Add more Beneficiaries
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

          {eduFormFields && addedBene.length > 0 && (
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

export default EducationTrust;
