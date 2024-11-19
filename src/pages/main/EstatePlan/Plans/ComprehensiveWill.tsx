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
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import useBeneficiaries from "../../../../custom-hooks/http-services/use-GET/useBeneficiaries";
import { formSliceAction } from "../../../../store/formSlice";
import AppFormFields from "../../../../components/form/AppFields";
import AppForm from "../../../../components/form/AppForm";
import { IoIosAddCircle } from "react-icons/io";
import AppFormSubmitBtn from "../../../../components/form/AppFormSubmitBtn";
import useAddEstatePlan from "../../../../custom-hooks/http-services/use-POST/useAddEstatePlan";
import { colors } from "../../../../constants/colors";
type stateProps = {
  state: any;
  form: any;
};
const ComprehensiveWill = () => {
  const formRef = useRef<any>(null);
  const toast = useToast();
  const dispatch = useDispatch();
  const add = useAddEstatePlan();
  const { isLoading, data, error, isRefetching } = useBeneficiaries();
  const info = data?.data?.data;

  const [compWillFormFields, setCompWillFormFields] = useState<any>([
    {
      label: "Do you have any of the documents listed below executed or filed?",
      name: "comprehensivewill_document_owned",
      explainerText: "",
      placeholder: "",
      options: [
        "A will",
        "A living Trust",
        "Deed Of Gift",
        "Joint Ownership",
        "Power Of Attorney",
        "Others",
      ],
      datatype: "radio",
      required: true,
    },
    {
      label: "Full name",
      name: "comprehensivewill_settlor_name",
      explainerText: "",
      placeholder: "doe",
      datatype: "string",
      required: true,
    },
    {
      label: "Religion",
      name: "comprehensivewill_religion",
      explainerText: "",
      placeholder: "",
      options: ["Christianity", "Islam", "Traditional", "Others"],
      datatype: "radio",
      required: true,
    },
    {
      label: "Marital Status",
      name: "comprehensivewill_marital_status",
      explainerText: "",
      placeholder: "",
      options: ["Single", "Married", "Widowed", "Divorced"],
      datatype: "radio",
      required: true,
    },
    {
      label: "If married, what type of marriage?",
      name: "comprehensivewill_marriage_type",
      explainerText: "",
      placeholder: "",
      options: [
        "Marriage by the Act",
        "Customary Marriage",
        "Islamic Marriage",
      ],
      datatype: "radio",
      required: false,
    },
    {
      label:
        "Are there any customary traditions common to people from your region?",
      name: "comprehensivewill_customary_tradition",
      explainerText: "",
      placeholder: "",
      options: ["True", "False"],
      datatype: "radio",
      required: true,
    },
    {
      label: "If yes kindly give details",
      name: "comprehensivewill_customary_tradition_details",
      explainerText: "",
      placeholder: "",
      datatype: "textarea",
      required: false,
    },
    {
      label: "email",
      name: "comprehensivewill_email",
      placeholder: "johndoe@gmail.com",
      datatype: "email",
      required: true,
    },
    {
      label: "Telephone number",
      name: "comprehensivewill_phone",
      placeholder: "09087777712",
      datatype: "phone",
      required: true,
    },
    {
      label: "Occupation/Profession",
      name: "comprehensivewill_occupation",
      placeholder: "",
      datatype: "select",
      options: ["lawyer", "doctor", "employee", "teacher", "realtor"],
      required: true,
    },
    {
      label: "Home address",
      name: "comprehensivewill_address",
      explainerText: "",
      placeholder: "5 lekki road",
      datatype: "textarea",
      required: true,
    },
    {
      label: "Other Matters",
      name: "comprehensivewill_others",
      explainerText:
        "(Describe or list here any facts or matters that do not seem to be covered by this questionnaire and that you believe may be important for us to know.)",
      placeholder: "",
      datatype: "textarea",
      required: false,
    },
  ]);
  const [children, setChildren] = useState<any>([
    {
      child_name_1: {
        label: "Child 1",
        name: "name_of_child_1",
        explainerText: "(if no children write 'Nil' or 'None)",
        placeholder: "",
        datatype: "string",
        required: true,
      },
    },
  ]);
  const [Beneficiaries, setBeneficiaries] = useState<any>([
    {
      name_1: {
        label: "Beneficiary Name 1",
        name: "name_of_beneficiary_1",
        explainerText: "",
        placeholder: "john doe",
        datatype: "string",
        required: true,
      },
      address_1: {
        label: "Address of Beneficiary 1",
        name: "address_of_beneficiary_1",
        explainerText: "",
        placeholder: "123 Main St",
        datatype: "textarea",
        required: true,
      },
      email_1: {
        label: "Email Address of beneficiary 1",
        name: "email_of_beneficiary_1",
        explainerText: "",
        placeholder: "johndoe@gmail.com",
        datatype: "email",
        required: true,
      },
      phone_1: {
        label: "Telephone Number of beneficiary 1",
        name: "phone_of_beneficiary_1",
        explainerText: "",
        placeholder: "",
        datatype: "phone",
        required: true,
      },
      relationship_1: {
        label: "Relationship with Beneficiary 1",
        name: "relationship_of_beneficiary_1",
        explainerText: "",
        placeholder: "husband",
        datatype: "string",
        required: true,
      },
    },
  ]);
  const [assets, setAssets] = useState<any>([
    {
      asset_1: {
        label: "Asset 1",
        name: "info_of_asset_1",
        explainerText: "",
        placeholder: "",
        datatype: "textarea",
        required: true,
      },
    },
  ]);
  const [executors, setExecutors] = useState<any>([
    {
      executor_name_1: {
        label: "Executor/Protector's name 1",
        name: "name_of_executor_1",
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: false,
      },
      executor_appointment_1: {
        label: "Executor/Protector's Appointment 1",
        name: "appointment_of_executor_1",
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: false,
      },
    },
  ]);

  const [fnId, setFnId] = useState<any>(null);
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

  const flattenFieldsResult = handleExtractObjPropertiesInArray([
    ...Beneficiaries,
    ...children,
    ...assets,
    ...executors,
  ]);
  const allfields: any = Object.values(flattenFieldsResult);

  //initial value of the signin form schema
  const initialValues = compWillFormFields
    ? Object.fromEntries(
        [...compWillFormFields, ...allfields]?.map((field: any) => [
          field.name,
          field?.value || "",
        ])
      )
    : {};

  //Yup library used to dynamically handle form validation requirments for fieldsData
  const schema = Yup.object(
    [...compWillFormFields, ...allfields]?.reduce((schema, field) => {
      let fieldSchema: any;
      switch (field.datatype) {
        case "string":
          fieldSchema = Yup.string().label(field.label);
          break;
        case "number":
          fieldSchema = Yup.number().label(field.label);
          break;
        case "phone":
          fieldSchema = Yup.string()
            .max(11, "Enter Valid Phone Number")
            .matches(/^0[789][01]\d{8}$/, "Enter Valid Phone Number");
          break;
        case "email":
          fieldSchema = Yup.string()
            .email("Invalid email address")
            .label(field.label);
          break;
        default:
          fieldSchema = Yup.string().label(field.label);
          break;
      }

      if (field?.required) {
        switch (field.datatype) {
          case "phone":
            fieldSchema = fieldSchema
              .max(11, "Enter Valid Phone Number")
              .matches(/^0[789][01]\d{8}$/, "Enter Valid Phone Number")
              .required(`${field.label} is Required`);
            break;
          case "email":
            fieldSchema = fieldSchema
              .email("Invalid email address")
              .required(`${field.label} is Required`)
              .label(field.label);
            break;
          default:
            fieldSchema = fieldSchema
              .required(`${field.label} is required`)
              .label(field.label);
            break;
        }
      }

      return { ...schema, [field.name]: fieldSchema };
    }, {})
  );

  const addChild = () => {
    const newId = children.length + 1;
    const newChild = {
      [`child_name_${newId}`]: {
        label: `Child ${newId}`,
        name: `name_of_child_${newId}`,
        explainerText: "(if no children write 'Nil' or 'None)",
        placeholder: "",
        datatype: "string",
        required: true,
      },
    };

    const updatedCompWillFormFields = compWillFormFields.map((field: any) => ({
      ...field,
      value: formPersistedValues[field.name]
        ? formPersistedValues[field?.name]
        : "",
    }));
    const updatedBeneficiaries = Beneficiaries.map((obj: any) =>
      Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = {
          ...obj[key],
          value: formPersistedValues[obj[key].name]
            ? formPersistedValues[obj[key].name]
            : "",
        };
        return acc;
      }, {})
    );
    const updatedAssets = assets.map((obj: any) =>
      Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = {
          ...obj[key],
          value: formPersistedValues[obj[key].name]
            ? formPersistedValues[obj[key].name]
            : "",
        };
        return acc;
      }, {})
    );
    const updatedExecutors = executors.map((obj: any) =>
      Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = {
          ...obj[key],
          value: formPersistedValues[obj[key].name]
            ? formPersistedValues[obj[key].name]
            : "",
        };
        return acc;
      }, {})
    );
    const updatedChildren = children.map((obj: any) =>
      Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = {
          ...obj[key],
          value: formPersistedValues[obj[key].name]
            ? formPersistedValues[obj[key].name]
            : "",
        };
        return acc;
      }, {})
    );

    setCompWillFormFields(updatedCompWillFormFields);
    setBeneficiaries(updatedBeneficiaries);
    setAssets(updatedAssets);
    setExecutors(updatedExecutors);

    setChildren((_prevstate: any) => {
      return [...updatedChildren, newChild];
    });
  };

  const addBeneficiary = async () => {
    const newId = Beneficiaries.length + 1;
    const newBene = {
      [`name_${newId}`]: {
        label: `Beneficiary Name ${newId}`,
        name: `name_of_beneficiary_${newId}`,
        explainerText: "",
        placeholder: "john doe",
        datatype: "string",
        required: true,
      },
      [`address_${newId}`]: {
        label: `Address of Beneficiary ${newId}`,
        name: `address_of_beneficiary_${newId}`,
        explainerText: "",
        placeholder: "123 Main St",
        datatype: "textarea",
        required: true,
      },
      [`email_${newId}`]: {
        label: `Email Address of beneficiary ${newId}`,
        name: `email_of_beneficiary_${newId}`,
        explainerText: "",
        placeholder: "johndoe@gmail.com",
        datatype: "email",
        required: true,
      },
      [`phone_${newId}`]: {
        label: `Telephone Number of beneficiary ${newId}`,
        name: `phone_of_beneficiary_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "phone",
        required: true,
      },
      [`relationship_${newId}`]: {
        label: `Relationship with Beneficiary  ${newId}`,
        name: `relationship_of_beneficiary_${newId}`,
        explainerText: "",
        placeholder: "husband",
        datatype: "string",
        required: true,
      },
    };

    const updatedCompWillFormFields = compWillFormFields.map((field: any) => ({
      ...field,
      value: formPersistedValues[field.name]
        ? formPersistedValues[field?.name]
        : "",
    }));

    const updatedAssets = assets.map((obj: any) =>
      Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = {
          ...obj[key],
          value: formPersistedValues[obj[key].name]
            ? formPersistedValues[obj[key].name]
            : "",
        };
        return acc;
      }, {})
    );
    const updatedChildren = children.map((obj: any) =>
      Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = {
          ...obj[key],
          value: formPersistedValues[obj[key].name]
            ? formPersistedValues[obj[key].name]
            : "",
        };
        return acc;
      }, {})
    );
    const updatedExecutors = executors.map((obj: any) =>
      Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = {
          ...obj[key],
          value: formPersistedValues[obj[key].name]
            ? formPersistedValues[obj[key].name]
            : "",
        };
        return acc;
      }, {})
    );
    const updatedBeneficiaries = Beneficiaries.map((obj: any) =>
      Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = {
          ...obj[key],
          value: formPersistedValues[obj[key].name]
            ? formPersistedValues[obj[key].name]
            : "",
        };
        return acc;
      }, {})
    );

    setCompWillFormFields(updatedCompWillFormFields);
    setChildren(updatedChildren);
    setAssets(updatedAssets);
    setExecutors(updatedExecutors);

    setBeneficiaries((_prevstate: any) => {
      return [...updatedBeneficiaries, newBene];
    });
  };

  const addAsset = () => {
    const newId = assets.length + 1;
    const newAsset = {
      [` asset_${newId}`]: {
        label: `Asset ${newId}`,
        name: `info_of_asset_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "textarea",
        required: true,
      },
    };

    const updatedCompWillFormFields = compWillFormFields.map((field: any) => ({
      ...field,
      value: formPersistedValues[field.name]
        ? formPersistedValues[field?.name]
        : "",
    }));

    const updatedChildren = children.map((obj: any) =>
      Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = {
          ...obj[key],
          value: formPersistedValues[obj[key].name]
            ? formPersistedValues[obj[key].name]
            : "",
        };
        return acc;
      }, {})
    );
    const updatedBeneficiaries = Beneficiaries.map((obj: any) =>
      Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = {
          ...obj[key],
          value: formPersistedValues[obj[key].name]
            ? formPersistedValues[obj[key].name]
            : "",
        };
        return acc;
      }, {})
    );
    const updatedExecutors = executors.map((obj: any) =>
      Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = {
          ...obj[key],
          value: formPersistedValues[obj[key].name]
            ? formPersistedValues[obj[key].name]
            : "",
        };
        return acc;
      }, {})
    );
    const updatedAssets = assets.map((obj: any) =>
      Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = {
          ...obj[key],
          value: formPersistedValues[obj[key].name]
            ? formPersistedValues[obj[key].name]
            : "",
        };
        return acc;
      }, {})
    );

    setCompWillFormFields(updatedCompWillFormFields);
    setChildren(updatedChildren);
    setBeneficiaries(updatedBeneficiaries);
    setExecutors(updatedExecutors);

    setAssets((_prevstate: any) => {
      return [...updatedAssets, newAsset];
    });
  };

  const addExecutor = () => {
    const newId = executors.length + 1;
    const newExecutor = {
      [`executor_name_${newId}`]: {
        label: `Executor/Protector's name ${newId}`,
        name: `name_of_executor_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: false,
      },
      [`executor_appointment_${newId}`]: {
        label: `Executor/Protector's name ${newId}`,
        name: `appointment_of_executor_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: false,
      },
    };

    const updatedCompWillFormFields = compWillFormFields.map((field: any) => ({
      ...field,
      value: formPersistedValues[field.name]
        ? formPersistedValues[field?.name]
        : "",
    }));

    const updatedChildren = children.map((obj: any) =>
      Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = {
          ...obj[key],
          value: formPersistedValues[obj[key].name]
            ? formPersistedValues[obj[key].name]
            : "",
        };
        return acc;
      }, {})
    );
    const updatedBeneficiaries = Beneficiaries.map((obj: any) =>
      Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = {
          ...obj[key],
          value: formPersistedValues[obj[key].name]
            ? formPersistedValues[obj[key].name]
            : "",
        };
        return acc;
      }, {})
    );
    const updatedAssets = assets.map((obj: any) =>
      Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = {
          ...obj[key],
          value: formPersistedValues[obj[key].name]
            ? formPersistedValues[obj[key].name]
            : "",
        };
        return acc;
      }, {})
    );
    const updatedExecutors = executors.map((obj: any) =>
      Object.keys(obj).reduce((acc: any, key) => {
        acc[key] = {
          ...obj[key],
          value: formPersistedValues[obj[key].name]
            ? formPersistedValues[obj[key].name]
            : "",
        };
        return acc;
      }, {})
    );

    setCompWillFormFields(updatedCompWillFormFields);
    setChildren(updatedChildren);
    setBeneficiaries(updatedBeneficiaries);
    setAssets(updatedAssets);

    setExecutors((_prevstate: any) => {
      return [...updatedExecutors, newExecutor];
    });
  };

  const handleBeneficiarySelect = (selectedBeneficiary: any, index: number) => {
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
      `relationship_of_beneficiary_${index + 1}`,
      selectedBeneficiary?.beneficiary_relationship
    );
    dispatch(
      formSliceAction.updateFormField({
        name: `relationship_of_beneficiary_${index + 1}`,
        value: selectedBeneficiary?.beneficiary_relationship,
      })
    );
  };

  const renderAppFormComponent = (field: any) => {
    switch (field.datatype) {
      case "string":
        return (
          <AppFormFields name={field?.name} isRequired={field?.required}>
            <FormLabel htmlFor={field?.name} as="legend" noOfLines={1}>
              {field?.label}
            </FormLabel>
            <Text as={"b"} fontSize={"10px"} color={"gray"}>
              {field?.explainerText}
            </Text>
            <AppFormFields.Input
              type="text"
              name={field?.name}
              placeholder={field?.placeholdert}
              disabled={add?.isPending ? true : false}
            />
            <AppFormFields.ErrorMessage name={field?.name} />
          </AppFormFields>
        );
      case "textarea":
        return (
          <AppFormFields name={field?.name} isRequired={field?.required}>
            <FormLabel htmlFor={field?.label} as="legend">
              {field?.label}
            </FormLabel>
            <Text as={"b"} fontSize={"10px"} color={"gray"}>
              {field?.explainerText}
            </Text>
            <AppFormFields.textAreaInput
              type="text"
              name={field?.name}
              placeholder={field?.placeholder}
              disabled={add?.isPending ? true : false}
            />
            <AppFormFields.ErrorMessage name={field?.name} />
          </AppFormFields>
        );
      case "email":
        return (
          <AppFormFields name={field?.name} isRequired={field?.required}>
            <FormLabel htmlFor={field?.name} as="legend" noOfLines={1}>
              {field?.label}
            </FormLabel>
            <Text as={"b"} fontSize={"10px"} color={"gray"}>
              {field?.explainerText}
            </Text>
            <AppFormFields.Input
              type="email"
              name={field?.name}
              placeholder={field?.placeholder}
              disabled={add?.isPending ? true : false}
            />
            <AppFormFields.ErrorMessage name={field?.name} />
          </AppFormFields>
        );
      case "radio":
        return (
          <AppFormFields name={field?.name} isRequired={field?.required}>
            <FormLabel htmlFor={field?.name} as="legend">
              {field?.label}
            </FormLabel>
            <Text as={"b"} fontSize={"10px"} color={"gray"}>
              {field?.explainerText}
            </Text>
            <AppFormFields.RadioInput
              options={field?.options}
              name={field?.name}
              placeholder={field?.placeholder}
              disabled={add?.isPending ? true : false}
            />
            <AppFormFields.ErrorMessage name={field?.name} />
          </AppFormFields>
        );
      case "range":
        return (
          <AppFormFields name={field?.name} isRequired={field?.required}>
            <FormLabel htmlFor={field?.name} as="legend">
              {field?.label}
            </FormLabel>
            <Text as={"b"} fontSize={"10px"} color={"gray"}>
              {field?.explainerText}
            </Text>
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
          <AppFormFields name={field?.name} isRequired={field?.required}>
            <FormLabel htmlFor={field?.label} as="legend">
              {field?.label}
            </FormLabel>
            <Text as={"b"} fontSize={"10px"} color={"gray"}>
              {field?.explainerText}
            </Text>
            <AppFormFields.Input
              type="number"
              name={field?.name}
              placeholder={field?.placeholder}
              disabled={add?.isPending ? true : false}
            />
            <AppFormFields.ErrorMessage name={field?.name} />
          </AppFormFields>
        );
      case "phone":
        return (
          <AppFormFields name={field?.name} isRequired={field?.required}>
            <FormLabel htmlFor={field?.label} as="legend">
              {field?.label}
            </FormLabel>
            <Text as={"b"} fontSize={"10px"} color={"gray"}>
              {field?.explainerText}
            </Text>
            <AppFormFields.Input
              type="number"
              name={field?.name}
              placeholder={field?.placeholder}
              disabled={add?.isPending ? true : false}
            />
            <AppFormFields.ErrorMessage name={field?.name} />
          </AppFormFields>
        );
      case "select":
        return (
          <AppFormFields name={field?.name} isRequired={field?.required}>
            <FormLabel htmlFor={field?.label} as="legend">
              {field?.label}
            </FormLabel>
            <Text as={"b"} fontSize={"10px"} color={"gray"}>
              {field?.explainerText}
            </Text>
            <AppFormFields.SelectionInput
              name={field?.name}
              options={field?.options}
              placeholder={field?.placeholder || "select option"}
              disabled={add?.isPending ? true : false}
            />
            <AppFormFields.ErrorMessage name={field?.name} />
          </AppFormFields>
        );
      case "date":
        return (
          <AppFormFields name={field?.name} isRequired={field?.required}>
            <FormLabel htmlFor={field?.label} as="legend">
              {field?.label}
            </FormLabel>
            <Text as={"b"} fontSize={"10px"} color={"gray"}>
              {field?.explainerText}
            </Text>
            <AppFormFields.Input
              name={field?.name}
              placeholder={field?.placeholder}
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

  const renderArrayFieldsData = (data: any) => {
    if (!data) return null;

    return data.map((obj: any, _index: number) => {
      const othersFields: any = Object.values(obj);

      const stackItems = [];

      for (let i = 0; i < othersFields.length; i += 2) {
        const firstField =
          othersFields[i] && renderAppFormComponent(othersFields[i]);
        const secondField =
          othersFields[i + 1] && renderAppFormComponent(othersFields[i + 1]);

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
          {stackItems}
        </Flex>
      );
    });
  };

  const renderBeneficiaryFieldsData = () => {
    if (!Beneficiaries) return null;

    return Beneficiaries.map((beneficiary: any, index: number) => {
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
          <Select
            placeholder="beneficiaries"
            variant="filled"
            onChange={(e) => {
              if (e.target.value !== "") {
                handleBeneficiarySelect(info[e.target.value], index);
              }
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

  const renderPersonalFieldsData = (data: any) => {
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

    return stackItems;
  };
  const renderotherFieldsData = (data: any, data1: any, title1?: string) => {
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

        <Heading size={"xs"} color={"black"} textTransform={"capitalize"}>
          {title1}
        </Heading>
        {/* Render beneficiary fields dynamically */}
        {renderArrayFieldsData(data1)}
        {/* Render beneficiary fields dynamically */}
      </>
    );
  };

  const handleSubmitForm = (values: any) => {
    const groupedData: any = {
      type: "comprehensive-will",
      comprehensivewill_children: [],
      comprehensivewill_assets: [],
      comprehensivewill_beneficiary: [],
      comprehensivewill_executor: [],
    };

    const getIndexFromKey = (key: any) => {
      const regex = /_(\d+)$/;
      const match = key.match(regex);
      if (match) {
        const index = parseInt(match[1], 10);
        return index - 1; // Adjust for zero-based index
      }
    };

    // Iterate over each form field
    Object.keys(values).forEach((key) => {
      const value = values[key];

      if (key.startsWith("comprehensivewill_")) {
        groupedData[key] = value;
      } else if (key.includes("of_child")) {
        const index: any = getIndexFromKey(key);
        if (key.endsWith(`_of_child_${index + 1}`)) {
          groupedData.comprehensivewill_children.push(value);
        }
      } else if (key.includes("of_asset")) {
        const index: any = getIndexFromKey(key);
        if (key.endsWith(`_of_asset_${index + 1}`)) {
          groupedData.comprehensivewill_assets.push(value);
        }
      } else if (key.includes("of_beneficiary")) {
        const index: any = getIndexFromKey(key);
        if (!groupedData.comprehensivewill_beneficiary[index]) {
          groupedData.comprehensivewill_beneficiary[index] = {};
        }
        groupedData.comprehensivewill_beneficiary[index][
          key.replace(`_of_beneficiary_${index + 1}`, "")
        ] = value;
      } else if (key.includes("of_executor_")) {
        const index: any = getIndexFromKey(key);
        if (!groupedData.comprehensivewill_executor[index]) {
          groupedData.comprehensivewill_executor[index] = {};
        }
        groupedData.comprehensivewill_executor[index][
          key.replace(`_of_executor_${index + 1}`, "")
        ] = value;
      }
    });

    add.mutateAsync(groupedData, {
      onSuccess: async (resData) => {
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
    setTimeout(() => {
      if (!enable && addEnable) {
        if (fnId === "addChild") {
          addChild();
        } else if (fnId === "addAsset") {
          addAsset();
        } else if (fnId === "addBeneficiary") {
          addBeneficiary();
        } else if (fnId === "addExecutor") {
          addExecutor();
        }
      }
      setAddEnable(false);
      setEnable(true);
      setFnId(null);
    }, 200);
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
        <AppForm
          initialValues={initialValues}
          onSubmit={handleSubmitForm}
          validateSchema={schema}
          enableReinitialize={true}
          ref={formRef}
        >
          {/* first fields data */}
          {renderPersonalFieldsData(compWillFormFields.slice(0, 1))}
          {/* first fields data */}

          {/* second fields data */}
          <Heading size={"md"}>Personal Details Of Settlor</Heading>
          {renderotherFieldsData(
            compWillFormFields.slice(1, -1),
            children,
            "Children"
          )}
          <HStack display={"flex"} py={"1vh"} align={"center"}>
            <Text as={"b"} fontSize="xs">
              Add more children
            </Text>
            <IconButton
              icon={<IoIosAddCircle />}
              aria-label={"add"}
              colorScheme="green"
              variant="unstyled"
              color={"green"}
              fontSize={"md"}
              onClick={async () => {
                await setFnId("addChild");
                await setEnable(false);
                setAddEnable(true);
              }}
            />
          </HStack>
          {/* second fields data */}

          {/* Beneficiaries info */}
          <Heading size={"sm"}>Beneficiaries</Heading>
          {renderBeneficiaryFieldsData()}
          <HStack display={"flex"} py={"1vh"} align={"center"}>
            <Text as={"b"} fontSize={"xs"}>
              Add more Beneficiaries
            </Text>
            <IconButton
              icon={<IoIosAddCircle />}
              aria-label={"add"}
              colorScheme="green"
              variant="unstyled"
              color={"green"}
              fontSize={"md"}
              onClick={async () => {
                await setFnId("addBeneficiary");
                await setEnable(false);
                setAddEnable(true);
              }}
            />
          </HStack>
          {/* Beneficiaries info */}

          {/* assets info */}
          <Heading size={"sm"}>
            What are your Assets?{" "}
            <Text as={"b"} fontSize={"x-small"} color={"gray"}>
              (briefly describe it. e.g 2021 Toyota)
            </Text>
          </Heading>
          {renderArrayFieldsData(assets)}
          <HStack display={"flex"} py={"1vh"} align={"center"}>
            <Text as={"b"} fontSize={"xs"}>
              Add more Assets
            </Text>
            <IconButton
              icon={<IoIosAddCircle />}
              aria-label={"add"}
              colorScheme="green"
              variant="unstyled"
              color={"green"}
              fontSize={"xs"}
              onClick={async () => {
                await setFnId("addAsset");
                await setEnable(false);
                setAddEnable(true);
              }}
            />
          </HStack>
          {/* assets info */}

          {/* other fields data */}
          {renderPersonalFieldsData(compWillFormFields.slice(-1))}
          {/* other fields data */}

          {/* Executors info */}
          <Heading size={"sm"}>Appointment of Executors/Protector</Heading>
          <Text as={"i"} fontSize={"x-small"} color={"gray"}>
            Kindly note that this is optional and depends on your wishes. The
            role of the Protector can only commence on the demise of the Settlor
            and the Protectors are not competent to terminate the trust and they
            are to work with the Trustee to ensure that the settlor’s objectives
            are fulfilled. Their roles are not to clash with the Trustee at any
            point in time.
          </Text>
          {renderArrayFieldsData(executors)}
          <HStack display={"flex"} py={"1vh"} align={"center"}>
            <Text as={"b"} fontSize={"xs"}>
              Add more executors
            </Text>
            <IconButton
              icon={<IoIosAddCircle />}
              aria-label={"add"}
              colorScheme="green"
              variant="unstyled"
              color={"green"}
              fontSize={"xs"}
              onClick={async () => {
                await setFnId("addExecutor");
                await setEnable(false);
                setAddEnable(true);
              }}
            />
          </HStack>
          {/* Executors info */}

          <AppFormSubmitBtn
            colorScheme="green"
            backgroundColor={colors.green_01}
            variant="solid"
            textTransform={"capitalize"}
            isLoading={add?.isPending ? true : false}
            rounded={"full"}
            w={"full"}
          >
            Submit
          </AppFormSubmitBtn>
        </AppForm>
      </Flex>
    </Flex>
  );
};

export default ComprehensiveWill;
