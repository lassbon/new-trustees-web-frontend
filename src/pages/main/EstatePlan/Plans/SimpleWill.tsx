import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormLabel,
  Stack,
  Heading,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Text,
  Select,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useRef, useState, useEffect } from "react";
import AppForm from "../../../../components/form/AppForm";
import { banks, PFAs } from "../../../../config/data";
import { useDispatch, useSelector } from "react-redux";
import useBeneficiaries from "../../../../custom-hooks/http-services/use-GET/useBeneficiaries";
import AppFormFields from "../../../../components/form/AppFields";
import { formSliceAction } from "../../../../store/formSlice";
import AppFormSubmitBtn from "../../../../components/form/AppFormSubmitBtn";
import { IoIosAddCircle } from "react-icons/io";
import useAddEstatePlan from "../../../../custom-hooks/http-services/use-POST/useAddEstatePlan";
import { colors } from "../../../../constants/colors";

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
const SimpleWill = () => {
  const formRef = useRef<any>(null);
  const toast = useToast();
  const dispatch = useDispatch();
  const add = useAddEstatePlan();

  const { isLoading, data, error, isRefetching } = useBeneficiaries();
  const info = data?.data?.data;

  const [simpleWillFormFields, setSimpleWillFormFields] = useState<any>([
    {
      label: "title",
      name: "simplewill_title",
      explainerText: "",
      placeholder: "",
      options: ["Mr", "Mrs", "Miss", "Dr"],
      datatype: "select",
      required: true,
    },
    {
      label: "surname",
      name: "simplewill_surname",
      explainerText: "",
      placeholder: "doe",
      datatype: "string",
      required: true,
    },
    {
      label: "firstname",
      name: "simplewill_firstname",
      explainerText: "",
      placeholder: "john",
      datatype: "string",
      required: true,
    },
    {
      label: "othername",
      name: "simplewill_othername",
      explainerText: "",
      placeholder: "rich",
      datatype: "string",
      required: true,
    },
    {
      label: "email address",
      name: "simplewill_email",
      explainerText: "",
      placeholder: "johndoe@gmail.com",
      datatype: "email",
      required: true,
    },
    {
      label: "Telephone number",
      name: "simplewill_phone",
      explainerText: "",
      placeholder: "09087777712",
      datatype: "phone",
      required: true,
    },
    {
      label: "marital status",
      name: "simplewill_marital_status",
      explainerText: "",
      placeholder: "",
      datatype: "select",
      options: ["Married", "Divorced", "Single"],
      required: true,
    },
    {
      label: "Means of Identification",
      name: "simplewill_means_of_id",
      explainerText: "",
      placeholder: "",
      datatype: "select",
      options: ["Passport", "Driver's License", "National ID"],
      required: true,
    },
    {
      label: "address",
      name: "simplewill_address",
      explainerText: "",
      placeholder: "5 lekki road",
      datatype: "textarea",
      required: true,
    },
    {
      label: "PFA (Pension Fund Administrators)",
      name: "simplewill_asset_pfa",
      explainerText: "",
      placeholder: "",
      datatype: "select",
      options: PFAs,
      required: true,
    },
    {
      label: "RSA (Retired Savings Acc Number)",
      name: "simplewill_rsa_no",
      explainerText: "",
      placeholder: "",
      datatype: "select",
      options: ["Crusader Pension"],
      required: true,
    },
  ]);
  const [addedBanks, setAddedBanks] = useState<any>([
    {
      bank_name_1: {
        label: "Bank name 1",
        name: "bankname_of_bank_1",
        explainerText: "",
        placeholder: "",
        datatype: "select",
        options: banks,
        required: true,
      },
      bank_account_no_1: {
        label: "Account number 1",
        name: "account_no_of_bank_1",
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
      bank_account_type_1: {
        label: "Account type 1",
        name: "account_type_of_bank_1",
        explainerText: "",
        placeholder: "",
        datatype: "select",
        options: ["Current", "Savings"],
        required: true,
      },
      bank_account_branch_1: {
        label: "Branch 1",
        name: "branch_of_bank_1",
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
    },
  ]);
  const [addedShares, setAddedShares] = useState<any>([
    {
      shareholder_name_1: {
        label: "name of share holder 1",
        name: "name_of_shareholder_of_shareholder_1",
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
      shares_name_1: {
        label: "name of shares 1",
        name: "name_of_shares_of_shareholder_1",
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
      cscs_no_1: {
        label: "CSCS Number 1",
        name: "cscs_no_of_shareholder_1",
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
      brokerage_house_1: {
        label: "brokerage house 1",
        name: "brokerage_house_of_shareholder_1",
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
    },
  ]);
  const [addedSpouse, setAddedSpouse] = useState<any>([
    {
      spouse_name_1: {
        label: "name of spouse 1",
        name: "name_of_spouse_1",
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
    },
  ]);
  const [addedwillExecutors, setAddedWillExecutors] = useState<any>([
    {
      executor_name_1: {
        label: "name of will executor 1",
        name: "name_of_will_executor_1",
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
      executor_address_1: {
        label: "address of will executor 1",
        name: "address_of_will_executor_1",
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: false,
      },
    },
  ]);
  const [addedDependants, setAddedDependants] = useState<any>([
    {
      dependant_name_1: {
        label: "name of dependant 1",
        name: "name_of_dependant_1",
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
    },
  ]);
  const [addedBeneficiaries, setAddedBeneficiaries] = useState<any>([
    {
      name_1: {
        label: "Beneficiary Name 1",
        name: "fullname_of_beneficiary_1",
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
        label: "Telephone Number of beneficiary ",
        name: "phone_of_beneficiary_1",
        explainerText: "",
        placeholder: "",
        datatype: "phone",
        required: true,
      },
      value_1: {
        label: "value 1",
        name: "value_of_beneficiary_1",
        explainerText: "",
        placeholder: "",
        datatype: "number",
        required: true,
      },
      gift_1: {
        label: "gift 1",
        name: "gift_of_beneficiary_1",
        explainerText: "",
        placeholder: "",
        options: ["Yes", "No"],
        datatype: "select",
        required: true,
      },
    },
  ]);

  const [enable, setEnable] = useState<boolean>(true);
  const [addEnable, setAddEnable] = useState<boolean>(false);
  const [fnId, setFnId] = useState<any>(null);
  const [tabIndex, setTabIndex] = useState(0);
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
    ...addedBeneficiaries,
    ...addedBanks,
    ...addedDependants,
    ...addedShares,
    ...addedSpouse,
    ...addedwillExecutors,
  ]);
  const allfields: any = Object.values(flattenFieldsResult);

  //initial value of the signin form schema
  const initialValues = simpleWillFormFields
    ? Object.fromEntries(
        [...simpleWillFormFields, ...allfields]?.map((field: any) => [
          field.name,
          field?.value || "",
        ])
      )
    : {};

  //Yup library used to dynamically handle form validation requirments for fieldsData
  const schema = Yup.object(
    [...simpleWillFormFields, ...allfields]?.reduce((schema, field: field) => {
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
    }, {})
  );

  const addBank = () => {
    const newId = addedBanks.length + 1;
    const newBank = {
      [`bank_name_${newId}`]: {
        label: `Bank name ${newId}`,
        name: `bankname_of_bank_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "select",
        options: banks,
        required: true,
      },
      [`bank_account_no_${newId}`]: {
        label: `Account number ${newId}`,
        name: `account_no_of_bank_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
      [`bank_account_type_${newId}`]: {
        label: `Account type ${newId}`,
        name: `account_type_of_bank_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "select",
        options: ["Current", "Savings"],
        required: true,
      },
      [`bank_account_branch_${newId}`]: {
        label: `Branch ${newId}`,
        name: `branch_of_bank_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
    };

    const updatedSimpleWillFormFields = simpleWillFormFields.map(
      (field: any) => ({
        ...field,
        value: formPersistedValues[field.name]
          ? formPersistedValues[field?.name]
          : "",
      })
    );
    const updatedAddedShares = addedShares.map((obj: any) =>
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
    const updatedAddedSpouses = addedSpouse.map((obj: any) =>
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
    const updatedAddedWillExecutors = addedwillExecutors.map((obj: any) =>
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
    const updatedAddedDependants = addedDependants.map((obj: any) =>
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
    const updatedAddedBeneficiaries = addedBeneficiaries.map((obj: any) =>
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
    const updatedAddedBanks = addedBanks.map((obj: any) =>
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

    setSimpleWillFormFields(updatedSimpleWillFormFields);
    setAddedShares(updatedAddedShares);
    setAddedSpouse(updatedAddedSpouses);
    setAddedWillExecutors(updatedAddedWillExecutors);
    setAddedDependants(updatedAddedDependants);
    setAddedBeneficiaries(updatedAddedBeneficiaries);
    setAddedBanks((_prevstate: any) => {
      return [...updatedAddedBanks, newBank];
    });
  };

  const addShare = () => {
    const newId = addedShares.length + 1;
    const newShare = {
      [`shareholder_name_${newId}`]: {
        label: `name of share holder ${newId}`,
        name: `name_of_shareholder_of_shareholder_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
      [`shares_name_${newId}`]: {
        label: `name of shares ${newId}`,
        name: `name_of_shares_of_shareholder_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
      [`cscs_no_${newId}`]: {
        label: `CSCS Number ${newId}`,
        name: `cscs_no_of_shareholder_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
      [`brokerage_house_${newId}`]: {
        label: `brokerage house ${newId}`,
        name: `brokerage_house_of_shareholder_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
    };
    const updatedSimpleWillFormFields = simpleWillFormFields.map(
      (field: any) => ({
        ...field,
        value: formPersistedValues[field.name]
          ? formPersistedValues[field?.name]
          : "",
      })
    );
    const updatedAddedSpouses = addedSpouse.map((obj: any) =>
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
    const updatedAddedWillExecutors = addedwillExecutors.map((obj: any) =>
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
    const updatedAddedDependants = addedDependants.map((obj: any) =>
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
    const updatedAddedBeneficiaries = addedBeneficiaries.map((obj: any) =>
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
    const updatedAddedBanks = addedBanks.map((obj: any) =>
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
    const updatedAddedShares = addedShares.map((obj: any) =>
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

    setSimpleWillFormFields(updatedSimpleWillFormFields);
    setAddedBanks(updatedAddedBanks);
    setAddedSpouse(updatedAddedSpouses);
    setAddedWillExecutors(updatedAddedWillExecutors);
    setAddedDependants(updatedAddedDependants);
    setAddedBeneficiaries(updatedAddedBeneficiaries);

    setAddedShares((_prevstate: any) => {
      return [...updatedAddedShares, newShare];
    });
  };

  const addSpouse = () => {
    const newId = addedSpouse.length + 1;
    const newSpouse = {
      [`spouse_name_${newId}`]: {
        label: `name of spouse ${newId}`,
        name: `name_of_spouse_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
    };

    const updatedSimpleWillFormFields = simpleWillFormFields.map(
      (field: any) => ({
        ...field,
        value: formPersistedValues[field.name]
          ? formPersistedValues[field?.name]
          : "",
      })
    );
    const updatedAddedWillExecutors = addedwillExecutors.map((obj: any) =>
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
    const updatedAddedDependants = addedDependants.map((obj: any) =>
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
    const updatedAddedBeneficiaries = addedBeneficiaries.map((obj: any) =>
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
    const updatedAddedBanks = addedBanks.map((obj: any) =>
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
    const updatedAddedShares = addedShares.map((obj: any) =>
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
    const updatedAddedSpouses = addedSpouse.map((obj: any) =>
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

    setSimpleWillFormFields(updatedSimpleWillFormFields);
    setAddedBanks(updatedAddedBanks);
    setAddedShares(updatedAddedShares);
    setAddedWillExecutors(updatedAddedWillExecutors);
    setAddedDependants(updatedAddedDependants);
    setAddedBeneficiaries(updatedAddedBeneficiaries);

    setAddedSpouse((_prevstate: any) => {
      return [...updatedAddedSpouses, newSpouse];
    });
  };

  const addExecutor = () => {
    const newId = addedwillExecutors.length + 1;
    const newExecutor = {
      [`executor_name_${newId}`]: {
        label: `name of will executor ${newId}`,
        name: `name_of_will_executor_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
      [`executor_address_${newId}`]: {
        label: `address of will executor ${newId}`,
        name: `address_of_will_executor_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: false,
      },
    };

    const updatedSimpleWillFormFields = simpleWillFormFields.map(
      (field: any) => ({
        ...field,
        value: formPersistedValues[field.name]
          ? formPersistedValues[field?.name]
          : "",
      })
    );
    const updatedAddedSpouses = addedSpouse.map((obj: any) =>
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
    const updatedAddedDependants = addedDependants.map((obj: any) =>
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
    const updatedAddedBeneficiaries = addedBeneficiaries.map((obj: any) =>
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
    const updatedAddedBanks = addedBanks.map((obj: any) =>
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
    const updatedAddedShares = addedShares.map((obj: any) =>
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
    const updatedAddedWillExecutors = addedwillExecutors.map((obj: any) =>
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

    setSimpleWillFormFields(updatedSimpleWillFormFields);
    setAddedBanks(updatedAddedBanks);
    setAddedSpouse(updatedAddedSpouses);
    setAddedShares(updatedAddedShares);
    setAddedDependants(updatedAddedDependants);
    setAddedBeneficiaries(updatedAddedBeneficiaries);

    setAddedWillExecutors((_prevstate: any) => {
      return [...updatedAddedWillExecutors, newExecutor];
    });
  };

  const addDependant = () => {
    const newId = addedDependants.length + 1;
    const newDependant = {
      [`dependant_name_${newId}`]: {
        label: `name of dependant ${newId}`,
        name: `name_of_dependant_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "string",
        required: true,
      },
    };

    const updatedSimpleWillFormFields = simpleWillFormFields.map(
      (field: any) => ({
        ...field,
        value: formPersistedValues[field.name]
          ? formPersistedValues[field?.name]
          : "",
      })
    );
    const updatedAddedSpouses = addedSpouse.map((obj: any) =>
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
    const updatedAddedBeneficiaries = addedBeneficiaries.map((obj: any) =>
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
    const updatedAddedBanks = addedBanks.map((obj: any) =>
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
    const updatedAddedShares = addedShares.map((obj: any) =>
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
    const updatedAddedWillExecutors = addedwillExecutors.map((obj: any) =>
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
    const updatedAddedDependants = addedDependants.map((obj: any) =>
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

    setSimpleWillFormFields(updatedSimpleWillFormFields);
    setAddedBanks(updatedAddedBanks);
    setAddedSpouse(updatedAddedSpouses);
    setAddedShares(updatedAddedShares);
    setAddedWillExecutors(updatedAddedWillExecutors);
    setAddedBeneficiaries(updatedAddedBeneficiaries);

    setAddedDependants((_prevstate: any) => {
      return [...updatedAddedDependants, newDependant];
    });
  };

  const addBeneficiary = async () => {
    const newId = addedBeneficiaries.length + 1;
    const newBene = {
      [`name_${newId}`]: {
        label: `Beneficiary Name ${newId}`,
        name: `fullname_of_beneficiary_${newId}`,
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
      [`value_${newId}`]: {
        label: `value ${newId}`,
        name: `value_of_beneficiary_${newId}`,
        explainerText: "",
        placeholder: "",
        datatype: "number",
        required: true,
      },
      [`gift_${newId}`]: {
        label: `gift ${newId}`,
        name: `gift_of_beneficiary_${newId}`,
        explainerText: "",
        placeholder: "",
        options: ["Yes", "No"],
        datatype: "select",
        required: true,
      },
    };

    const updatedSimpleWillFormFields = simpleWillFormFields.map(
      (field: any) => ({
        ...field,
        value: formPersistedValues[field.name]
          ? formPersistedValues[field?.name]
          : "",
      })
    );
    const updatedAddedSpouses = addedSpouse.map((obj: any) =>
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
    const updatedAddedBanks = addedBanks.map((obj: any) =>
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
    const updatedAddedShares = addedShares.map((obj: any) =>
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
    const updatedAddedWillExecutors = addedwillExecutors.map((obj: any) =>
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
    const updatedAddedDependants = addedDependants.map((obj: any) =>
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
    const updatedAddedBeneficiaries = addedBeneficiaries.map((obj: any) =>
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

    setSimpleWillFormFields(updatedSimpleWillFormFields);
    setAddedBanks(updatedAddedBanks);
    setAddedSpouse(updatedAddedSpouses);
    setAddedShares(updatedAddedShares);
    setAddedWillExecutors(updatedAddedWillExecutors);
    setAddedDependants(updatedAddedDependants);

    setAddedBeneficiaries((_prevstate: any) => {
      return [...updatedAddedBeneficiaries, newBene];
    });
  };

  const handleBeneficiarySelect = (selectedBeneficiary: any, index: number) => {
    formRef.current.setFieldValue(
      `fullname_of_beneficiary_${index + 1}`,
      `${selectedBeneficiary?.surname} ${selectedBeneficiary?.firstname}`
    );
    dispatch(
      formSliceAction.updateFormField({
        name: `fullname_of_beneficiary_${index + 1}`,
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
  };

  const renderAppFormComponent = (field: any) => {
    switch (field.datatype) {
      case "string":
        return (
          <AppFormFields name={field?.name} isRequired={field?.required}>
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
          <AppFormFields
            name={field?.name}
            isRequired={field?.required}
            mb={"1vh"}
          >
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
          <AppFormFields name={field?.name} isRequired={field?.required}>
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
          <AppFormFields name={field?.name} isRequired={field?.required}>
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
          <AppFormFields name={field?.name} isRequired={field?.required}>
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
          <AppFormFields name={field?.name} isRequired={field?.required}>
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
          <AppFormFields name={field?.name} isRequired={field?.required}>
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
          <AppFormFields name={field?.name} isRequired={field?.required}>
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
          <AppFormFields name={field?.name} isRequired={field?.required}>
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

  const renderArrayFieldsData = (data: any, title?: string) => {
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
        <Flex direction={"column"} gap={"2vh"} key={Math.random()}>
          <Heading size={"sm"} color={"gray"} textTransform={"capitalize"}>
            {title}
          </Heading>

          {stackItems}
        </Flex>
      );
    });
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

  const renderotherFieldsData = (data: any, data2: any, title1?: string) => {
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
        {renderArrayFieldsData(data2, title1)}
        {/* Render beneficiary fields dynamically */}
      </>
    );
  };

  const handleSubmitForm = (values: any) => {
    const groupedData: any = {
      type: "simple-will",
      bank: [],
      simplewill_shares: [],
      simplewill_spouses: [],
      simplewill_will_executors: [],
      simplewill_dependents: [],
      simplewill_beneficiary_details: [],
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

      if (key.startsWith("simplewill_")) {
        groupedData[key] = value;
      } else if (key.includes("_of_bank_")) {
        const index: any = getIndexFromKey(key);
        if (!groupedData.bank[index]) {
          groupedData.bank[index] = {};
        }
        groupedData.bank[index][key.replace(`_of_bank_${index + 1}`, "")] =
          value;
      } else if (key.includes("of_shareholder")) {
        const index: any = getIndexFromKey(key);
        if (!groupedData.simplewill_shares[index]) {
          groupedData.simplewill_shares[index] = {};
        }
        groupedData.simplewill_shares[index][
          key.replace(`_of_shareholder_${index + 1}`, "")
        ] = value;
      } else if (key.includes("of_spouse")) {
        const index: any = getIndexFromKey(key);
        if (key.endsWith(`_of_spouse_${index + 1}`)) {
          groupedData.simplewill_spouses.push(value);
        }
      } else if (key.includes("of_will_executor")) {
        const index: any = getIndexFromKey(key);
        if (!groupedData.simplewill_will_executors[index]) {
          groupedData.simplewill_will_executors[index] = {};
        }
        groupedData.simplewill_will_executors[index][
          key.replace(`_of_will_executor_${index + 1}`, "")
        ] = value;
      } else if (key.includes("of_dependant")) {
        const index: any = getIndexFromKey(key);
        if (key.endsWith(`_of_dependant_${index + 1}`)) {
          groupedData.simplewill_dependents.push(value);
        }
      } else if (key.includes("of_beneficiary")) {
        const index: any = getIndexFromKey(key);
        if (!groupedData.simplewill_beneficiary_details[index]) {
          groupedData.simplewill_beneficiary_details[index] = {};
        }
        groupedData.simplewill_beneficiary_details[index][
          key.replace(`_of_beneficiary_${index + 1}`, "")
        ] = value;
      }
    });

    add.mutateAsync(groupedData, {
      onSuccess: async (resData) => {
        const { message } = resData?.data ?? {};

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
        const { status, message } = error?.response.data ?? {};

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
        if (fnId === "addBank") {
          addBank();
        } else if (fnId === "addShare") {
          addShare();
        } else if (fnId === "addSpouse") {
          addSpouse();
        } else if (fnId === "addExecutor") {
          addExecutor();
        } else if (fnId === "addDependant") {
          addDependant();
        } else if (fnId === "addBeneficiary") {
          addBeneficiary();
        }
      }
      setAddEnable(false);
      setEnable(true);
      setFnId(null);
    }, 200);
  }, [formPersistedValues, enable, addEnable]);
  return (
    <Tabs
      onChange={(index) => setTabIndex(index)}
      bgColor={"rgba(0, 129, 69, 0.05)"}
      index={tabIndex}
    >
      <TabList>
        <Tab>01</Tab>
        <Tab>02</Tab>
        <Tab>03</Tab>
      </TabList>
      <AppForm
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        enableReinitialize={true}
        validateSchema={schema}
        ref={formRef}
      >
        <TabPanels p="20px">
          <TabPanel display={"flex"} flexDirection={"column"} gap={"2vh"}>
            <Heading size={"md"}>Personal Information</Heading>
            {/* personal fields data */}
            {renderPersonalFieldsData(simpleWillFormFields.slice(0, -2))}
            {/* personal fields data */}
          </TabPanel>

          <TabPanel display={"flex"} flexDirection={"column"} gap={"2vh"}>
            <Heading size={"md"}>Assets Information</Heading>

            {/* assets fields data */}
            {renderotherFieldsData(
              simpleWillFormFields.slice(-2),
              addedBanks,
              "banks information"
            )}
            <HStack display={"flex"} py={"1vh"} align={"center"}>
              <Text as={"b"} size={"sm"}>
                Add more banks
              </Text>
              <IconButton
                icon={<IoIosAddCircle />}
                aria-label={"add"}
                colorScheme="green"
                variant="unstyled"
                color={"green"}
                fontSize={"30px"}
                onClick={async () => {
                  await setFnId("addBank");
                  await setEnable(false);
                  setAddEnable(true);
                }}
              />
            </HStack>

            {renderArrayFieldsData(addedShares, "shares information")}
            {/* assets fields data */}
            <HStack display={"flex"} py={"1vh"} align={"center"}>
              <Text as={"b"} size={"sm"}>
                Add more shares
              </Text>
              <IconButton
                icon={<IoIosAddCircle />}
                aria-label={"add"}
                colorScheme="green"
                variant="unstyled"
                color={"green"}
                fontSize={"30px"}
                onClick={async () => {
                  await setFnId("addShare");
                  await setEnable(false);
                  setAddEnable(true);
                }}
              />
            </HStack>
          </TabPanel>

          <TabPanel display={"flex"} flexDirection={"column"} gap={"2vh"}>
            <Heading size={"md"}>Spouse and Beneficiaries</Heading>

            {/* spouse info */}
            {renderArrayFieldsData(addedSpouse, "Spouse information")}
            <HStack display={"flex"} py={"1vh"} align={"center"}>
              <Text as={"b"} size={"sm"}>
                Add more spouse
              </Text>
              <IconButton
                icon={<IoIosAddCircle />}
                aria-label={"add"}
                colorScheme="green"
                variant="unstyled"
                color={"green"}
                fontSize={"30px"}
                onClick={async () => {
                  await setFnId("addSpouse");
                  await setEnable(false);
                  setAddEnable(true);
                }}
              />
            </HStack>
            {/* spouse info */}

            {/* will executors info */}
            {renderArrayFieldsData(
              addedwillExecutors,
              "will executors information"
            )}
            <HStack display={"flex"} py={"1vh"} align={"center"}>
              <Text as={"b"} size={"sm"}>
                Add more executors
              </Text>
              <IconButton
                icon={<IoIosAddCircle />}
                aria-label={"add"}
                colorScheme="green"
                variant="unstyled"
                color={"green"}
                fontSize={"30px"}
                onClick={async () => {
                  await setFnId("addExecutor");
                  await setEnable(false);
                  setAddEnable(true);
                }}
              />
            </HStack>
            {/* will executors info */}

            {/* dependant info */}
            {renderArrayFieldsData(addedDependants, "dependants information")}
            <HStack display={"flex"} py={"1vh"} align={"center"}>
              <Text as={"b"} size={"sm"}>
                Add more Dependants
              </Text>
              <IconButton
                icon={<IoIosAddCircle />}
                aria-label={"add"}
                colorScheme="green"
                variant="unstyled"
                color={"green"}
                fontSize={"30px"}
                onClick={async () => {
                  await setFnId("addDependant");
                  await setEnable(false);
                  setAddEnable(true);
                }}
              />
            </HStack>
            {/* dependant info info */}

            {/* Beneficiaries info */}
            {renderBeneficiaryFieldsData()}
            <HStack display={"flex"} py={"1vh"} align={"center"}>
              <Text as={"b"} size={"sm"}>
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
                  await setFnId("addBeneficiary");
                  await setEnable(false);
                  setAddEnable(true);
                }}
              />
            </HStack>
            {/* Beneficiaries info */}
          </TabPanel>

          {/* submit btn */}
          <ButtonGroup justifyContent={"space-between"} mt={"20px"} w="full">
            <Button
              isDisabled={tabIndex === 0 ? true : false}
              colorScheme="green"
              rounded={"full"}
              variant={"outline"}
              onClick={() => {
                setTabIndex((prevState) => prevState - 1);
              }}
            >
              Back
            </Button>
            {tabIndex !== 2 && (
              <Button
                isDisabled={tabIndex === 2 ? true : false}
                colorScheme="green"
                backgroundColor={colors.green_01}
                variant="solid"
                textTransform={"capitalize"}
                isLoading={false}
                rounded={"full"}
                onClick={() => {
                  setTabIndex((prevState) => prevState + 1);
                }}
              >
                Continue
              </Button>
            )}
            {tabIndex === 2 && (
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
          </ButtonGroup>
          {/* submit btn */}
        </TabPanels>
      </AppForm>
    </Tabs>
  );
};

export default SimpleWill;
