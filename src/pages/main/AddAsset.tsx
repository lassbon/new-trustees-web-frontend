import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormLabel,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  // others,
  Stack,
  useToast,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAssetsCategory from "../../custom-hooks/http-services/use-GET/useAssetsCategory";
import AppFormFields from "../../components/form/AppFields";
import AppForm from "../../components/form/AppForm";
import AppFormSubmitBtn from "../../components/form/AppFormSubmitBtn";
import useAddAssets from "../../custom-hooks/http-services/use-POST/useAddAssets";
import useAssetsCurrencies from "../../custom-hooks/http-services/use-GET/useCurrencies";
import { colors } from "../../constants/colors";

const AddAsset = () => {
  const { isLoading, data, isRefetching } = useAssetsCategory();
  const assetCategories = data?.data?.data;
  const add = useAddAssets();
  const currency = useAssetsCurrencies();
  const info = currency.data?.data;
  const currenciesArray = info?.data;
  const currencies =
    currenciesArray && currenciesArray.map((c: any) => c?.currency);

  const toast = useToast();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [formFields, setFormFields] = useState<any>(null);
  const [asset_category_id, setAsset_category_id] = useState<any>(null);

  const initialValues = formFields
    ? Object.fromEntries(
        Object.keys({
          ...formFields,
          currency: {
            label: "Currency",
            datatype: "select",
            options: currencies,
          },
          other_details: {
            label: "Others(If details is different from the above, please specify)",
            datatype: "string",
          }
        }).map((field) => [field, ""])
      )
    : {};

  //Yup library used to dynamically handle form validation requirments for fieldsData
  const schema = Yup.object().shape(
    Object.keys({
      ...formFields,
      currency: {
        label: "Currency",
        datatype: "select",
        options: currencies,
      },
      // other_details: {
      //   label: "Others(If details is different from the above, please specify)",
      //   datatype: "string",
      // }
    }).reduce((schemaObj, fieldName) => {
      const field = {
        ...formFields,
        currency: {
          label: "Currency",
          datatype: "select",
          options: ["naira", "euro", "pounds"],
        },
        // other_details: {
        //   label: "Others(If details is different from the above, please specify)",
        //   datatype: "string",
        // }
      }[fieldName];
      let fieldSchema;

      switch (field?.datatype) {
        case "string":
          if (field?.label === "Others(If details is different from the above, please specify)") {
            fieldSchema = Yup.string()
              .optional()
              .label(field.label);
          }else{
          fieldSchema = Yup.string()
            .required(`${field.label} is required`)
            .label(field.label);
          }
          break;
        case "number":
          if (field?.label === "Amount" || field?.label === "Value") {
            fieldSchema = Yup.string()
              .required(`${field?.label} is required`)
              .label(field?.label);
          } else {
            fieldSchema = Yup.number()
              .required(`${field?.label} is required`)
              .label(field?.label);
          }
          break;
        default:
          fieldSchema = Yup.string()
            .required(`${field?.label} is required`)
            .label(field?.label);
          break;
      }

      return { ...schemaObj, [fieldName]: fieldSchema };
    }, {})
  );

  const handleSelectCategory = (value: any) => {
    setSelectedCategory(value);

    //i am using the select menu value to find the corresponding asset object in the fetched assetCategories array
    const selectedAssetCategory = assetCategories.find(
      (asset: any) => asset.name === value
    );

    //if the selectedAssetCategory is valid  i will then Update formFields state with table_fields of selectedAssetCategory object
    if (selectedAssetCategory) {
      setFormFields(selectedAssetCategory.table_fields);
    } else {
      setFormFields(null); // Clear formFields if no matching selectedAssetCategory object was found
    }
  };

  const renderAppFormComponent = (key: any) => {
    const field = {
      ...formFields,
      currency: {
        label: "Currency",
        datatype: "select",
        options: currencies,
      }, 
      others: {
        label: "Others(If details is different from the above, please specify)",
        datatype: "string",
      }
    }[key];

    switch (field.datatype) {
      case "string":
        return (
          <AppFormFields name={key} {...(field?.required && { isRequired: true })}>
            <FormLabel htmlFor={field?.label} as="legend">
              {field?.label}
            </FormLabel>
            <AppFormFields.Input
              type="text"
              name={key}
              placeholder={field?.explainer_text}
              disabled={add?.isPending}
            />
            <AppFormFields.ErrorMessage name={key} />
          </AppFormFields>
        );
      case "number":
        return (
          <AppFormFields name={key} isRequired={true}>
            <FormLabel htmlFor={field?.label} as="legend">
              {field?.label}
            </FormLabel>
            <AppFormFields.Input
              type={key === "amount" ? "text" : "number"}
              name={key}
              placeholder={field?.explainer_text}
              disabled={add?.isPending}
            />
            <AppFormFields.ErrorMessage name={key} />
          </AppFormFields>
        );
      case "select":
        if (field?.label === "Bank") {
          const sortedOptions = field?.options?.sort((a: string, b: string) => {
            const labelA = a.toLowerCase();
            const labelB = b.toLowerCase();
            if (labelA < labelB) return -1;
            if (labelA > labelB) return 1;
            return 0;
          });
          return (
            <AppFormFields name={key} isRequired={true}>
              <FormLabel htmlFor={field?.label} as="legend">
                {field?.label}
              </FormLabel>
              {/* <AppFormFields.SelectionInput
                 
                /> */}
              <AppFormFields.SelectionInputSearch
                name={key}
                options={sortedOptions}
                placeholder={"select option"}
                disabled={add?.isPending}
                isSearchable
              />
              <AppFormFields.ErrorMessage name={key} />
            </AppFormFields>
          );
        } else {
          return (
            <AppFormFields name={key} isRequired={true}>
              <FormLabel htmlFor={field?.label} as="legend">
                {field?.label}
              </FormLabel>

              <AppFormFields.SelectionInput
                name={key}
                options={field?.options}
                // placeholder={field?.explainer_text || }
                disabled={add?.isPending}
              />
              <AppFormFields.ErrorMessage name={key} />
            </AppFormFields>
          );
        }

      case "textarea":
        return <textarea key={key} defaultValue={field.defaultValue} />;
      default:
        return null;
    }
  };

  const renderFieldsData = () => {
    if (!formFields) return null;

    const stackItems = [];
    const keys = Object.keys({
      ...formFields,
      currency: {
        label: "Currency",
        datatype: "select",
        options: ["naira", "euro", "pounds"],
      },
      others: {
        label: "Others(If details is different from the above, please specify)",
        datatype: "string",
      }
    });

    for (let i = 0; i < keys.length; i += 2) {
      const firstField = keys[i] && renderAppFormComponent(keys[i]);
      const secondField = keys[i + 1] && renderAppFormComponent(keys[i + 1]);

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

  const handleAddAssets = (values: any) => {
    
    const mainData = {
      asset_category_id,
      asset_name: selectedCategory,
      amount: values?.value || values?.amount.replace(/,/g, ""),
      currency: values?.currency,
      other_details: values?.other_details
    };

    delete values?.value, values?.currency, values?.amount;
    const finalData: any = { ...mainData, others: { ...values }, other_details:values.other_details  };
    add.mutateAsync(finalData, {
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

  return (
    <Flex direction={"column"} gap={"4vh"} w="100%" px="2vw">
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          size={"sm"}
          mx={"2vw"}
          colorScheme="green"
          variant={"outline"}
          isLoading={isLoading || isRefetching ? true : false}
          isDisabled={add?.isPending ? true : false}
        >
          {selectedCategory ? selectedCategory : "Select Assets Category"}
        </MenuButton>
        <MenuList>
          <MenuOptionGroup
            title="Assets Category"
            type="radio"
            onChange={(value) => {
              handleSelectCategory(value);
            }}
          >
            {assetCategories &&
              assetCategories?.map((item: any, id:any) => (
                <MenuItemOption
                 key={id}
                  onClick={async () => {
                    setAsset_category_id(item?._id);
                  }}
                  value={item?.name}
                >
                  {item.name}
                </MenuItemOption>
              ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>

      <AppForm
        initialValues={initialValues}
        onSubmit={handleAddAssets}
        validateSchema={schema}
      >
        {/* Render the divs dynamically */}
        {formFields && renderFieldsData()}
        {/* Render the divs dynamically */}

        {/* submit btn */}
        {formFields && (
          <AppFormSubmitBtn
            mt="2vh"
            colorScheme="green"
            backgroundColor={colors.green_01}
            variant="solid"
            textTransform={"capitalize"}
            isLoading={add?.isPending}
            rounded={"full"}
          >
            Add Assets
          </AppFormSubmitBtn>
        )}
        {/* submit btn */}
      </AppForm>
    </Flex>
  );
};

export default AddAsset;
