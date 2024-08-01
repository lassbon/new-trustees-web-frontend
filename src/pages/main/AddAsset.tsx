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
  Stack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useState } from "react";
import useAssetsCategory from "../../custom-hooks/http-services/use-GET/useAssetsCategory";
import AppFormFields from "../../components/form/AppFields";
import AppForm from "../../components/form/AppForm";
import AppFormSubmitBtn from "../../components/form/AppFormSubmitBtn";

const AddAsset = () => {
  const { isLoading, data, isRefetching } = useAssetsCategory();

  const assetCategories = data?.data?.data;

  const [selectedCategory, setSelectedCategory] = useState<any>("");
  const [formFields, setFormFields] = useState<any>(null);

  const initialValues = formFields
    ? Object.fromEntries(Object.keys(formFields).map((field) => [field, ""]))
    : {};

  //Yup library used to dynamically handle form validation requirments for fieldsData
  const schema = Yup.object().shape(
    Object.keys(formFields || {}).reduce((schemaObj, fieldName) => {
      const field = formFields[fieldName];
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

  //    //used to render isurance info data base on their field type e.g select,input e.t.c
  //    const renderAppFormComponent = (field: any) => {
  //     // const placeholderName = field?.field.replace(/_/g, ' ');

  //     switch (field?.type) {
  //       case 'select':
  //         return (
  //           <AppFormFields key={field?.field} style={`my-[3vh]`}>
  //             <AppFormFields.Label
  //               style="text-sm sm:text-xs capitalize max-w-[70vw]"
  //               viewStyle={`left-[3vw] bottom-[4.8vh] ${
  //                 isDarkMode ? 'bg-blue-05' : 'bg-offwhite-01'
  //               }`}>
  //               {field?.label}
  //             </AppFormFields.Label>

  //             <AppFormFields.DropDownSelector
  //               name={field?.field}
  //               data={field?.data}
  //               displayProperty="label"
  //               onSelectProperty="value"
  //               dropdownItemStyle={styles.dropdownItemStyle}
  //               buttonTextStyle={'text-sm sm:text-xs'}
  //               buttonTextColor={
  //                 isDarkMode
  //                   ? 'rgba(242, 240, 236, 0.5)'
  //                   : 'rgba(37, 49, 60, 0.16)'
  //               }
  //               selectedItemTextColor={isDarkMode ? 'white' : 'black'}
  //               selectedRowTextStyle={
  //                 'text-lg sm:text-sm font-extrabold text-gray-400 capitalize'
  //               }
  //               rowTextStyle={`text-lg sm:text-sm ${
  //                 isDarkMode ? 'text-offwhite-01' : 'text-grey-04'
  //               } `}
  //               renderDropdownIcon={<ArrowDown />}
  //               renderButtonStyle={[
  //                 styles.renderButtonStyle,
  //                 {
  //                   borderColor: isDarkMode ? '#F2F0EC' : 'rgba(0, 0, 0, 0.3)',
  //                   paddingVertical: vh(1.7),
  //                 },
  //               ]}
  //             />
  //             <AppFormFields.ErrorMessage
  //               name={field?.field}
  //               style="absolute w-fit right-[2vw] top-[6.2vh] text-red-400 sm:text-xs"
  //             />
  //           </AppFormFields>
  //         );
  //       case 'file':
  //         return (
  //           <AppFormFields key={field?.field} style={`my-[3vh]`}>
  //             <AppFormFields.Label
  //               style="text-sm sm:text-xs capitalize max-w-[70vw]"
  //               viewStyle={`left-[3vw] bottom-[5.6vh] ${
  //                 isDarkMode ? 'bg-blue-05' : 'bg-offwhite-01'
  //               }`}>
  //               {field?.label}
  //             </AppFormFields.Label>
  //             <AppFormFields.File
  //               name={field?.field}
  //               fileButtonStyle={`flex flex-row justify-between py-[1.6vh] items-center rounded-lg border-[0.8px] ${
  //                 isDarkMode
  //                   ? 'border-[0.8px] border-offwhite-01 focus:border focus:border-orange-01'
  //                   : 'border-grey-03'
  //               }`}
  //               fileTextStyle={`text-sm sm:text-xs `}
  //               uploadIcon={<UploadIcon />}
  //             />
  //             <AppFormFields.ErrorMessage
  //               name={field?.field}
  //               style="absolute w-fit right-[2vw] top-[6.2vh] text-red-400 sm:text-xs"
  //             />
  //           </AppFormFields>
  //         );
  //       case 'text':
  //       default:
  //         return (
  //           <AppFormFields key={field?.field} style={`my-[3vh]`}>
  //             <AppFormFields.Label
  //               style="text-sm sm:text-xs capitalize max-w-[70vw]"
  //               viewStyle={`left-[3vw] bottom-[4.8vh] ${
  //                 isDarkMode ? 'bg-blue-05' : 'bg-offwhite-01'
  //               }`}>
  //               {field?.label}
  //             </AppFormFields.Label>
  //             <AppFormFields.Input
  //               name={field?.field}
  //               style={` w-full text-sm rounded-lg border-[0.8px] ${
  //                 isDarkMode
  //                   ? 'border-offwhite-01 focus:border focus:border-orange-01 '
  //                   : 'border-grey-03'
  //               }`}
  //               autoCapitalize="none"
  //               autoCorrect={false}
  //               placeholder={placeholderName}
  //               // keyboardType={field?.isNumber && 'phone-pad'}
  //             />
  //             <AppFormFields.ErrorMessage
  //               name={field?.field}
  //               style=" absolute w-fit right-[2vw] top-[6.2vh] text-red-400 sm:text-xs"
  //             />
  //           </AppFormFields>
  //         );
  //     }
  //   };

  const renderAppFormComponent = (key: any) => {
    const field = formFields[key];
    switch (field.datatype) {
      case "string":
        return (
          <AppFormFields name={key} isRequired={true}>
            <FormLabel htmlFor={field?.label} as="legend">
              {field?.label}
            </FormLabel>
            <AppFormFields.Input
              type="text"
              name={key}
              placeholder={field?.explainer_text}
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
              type="number"
              name={key}
              placeholder={field?.explainer_text}
            />
            <AppFormFields.ErrorMessage name={key} />
          </AppFormFields>
        );
      case "select":
        return (
          <AppFormFields name={key} isRequired={true}>
            <FormLabel htmlFor={field?.label} as="legend">
              {field?.label}
            </FormLabel>
            <AppFormFields.SelectionInput
              name={key}
              options={field?.options}
              placeholder={field?.explainer_text || "select option"}
            />
            <AppFormFields.ErrorMessage name={key} />
          </AppFormFields>
        );
      case "textarea":
        return <textarea key={key} defaultValue={field.defaultValue} />;
      default:
        return null;
    }
  };

  const renderFieldsData = () => {
    if (!formFields) return null;

    const stackItems = [];
    const keys = Object.keys(formFields);

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
        >
          {selectedCategory ? selectedCategory : "select assets category"}
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
              assetCategories?.map((item: any) => (
                <MenuItemOption
                  // onClick={async () => {
                  //   await setAsset_id(item?._id);
                  //   assets?.refetch();
                  // }}
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
        onSubmit={() => {}}
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
            variant="solid"
            textTransform={"capitalize"}
            isLoading={false}
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
