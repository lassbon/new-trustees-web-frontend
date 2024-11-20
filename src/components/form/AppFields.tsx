import { useFormikContext } from "formik";
import {
  Input,
  FormErrorMessage,
  FormControl,
  Select,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { formSliceAction } from "../../store/formSlice";
import { CreatableSelect } from "chakra-react-select";

type FormikProps = {
  errors: any;
  touched: any;
  values: any;
};

type FormControlProps = {
  name: string;
  children: any;
};

type TextProps = {
  name: string;
};

type SelectProps = {
  name: string;
  options: any[];
  handleSelectProduct?: () => void;
};

type RadioProps = {
  name: string;
  options: any[];
  handleSelectProduct?: () => void;
};

type RangeProps = {
  name: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
};

type ErrorProps = {
  name: string;
};

const AppFormFields = <T extends FormControlProps>({
  children,
  name,
  ...others
}: T) => {
  const { errors }: FormikProps = useFormikContext();
  const error = errors[name];
  return (
    <FormControl {...others} isInvalid={error}>
      {children}
    </FormControl>
  );
};

const textInput = <T extends TextProps>({ name, ...others }: T) => {
  const { setFieldTouched, setFieldValue } = useFormikContext();
  const { errors, values }: FormikProps = useFormikContext();
  const dispatch = useDispatch();

  const inputValue = name ? values[name] : "";

  const error = errors[name];
  const formatNumber = (num: any) => {
    if (!num) return "";
    return Number(num.replace(/,/g, "")).toLocaleString();
  };

  const handleOnChange = (e: any) => {
    const text = e.target.value;
    if (/^[0-9,]*$/.test(text) && name === "amount") {
      setFieldValue(name, formatNumber(text));
      dispatch(
        formSliceAction.updateFormField({
          name: name,
          value: formatNumber(text),
        })
      );
      return;
    }
    setFieldValue(name, text);
    dispatch(formSliceAction.updateFormField({ name: name, value: text }));
  };

  return (
    <Input
      onBlur={() => {
        setFieldTouched(name);
      }}
      onChange={(e) => handleOnChange(e)}
      {...others}
      isInvalid={error}
      variant="outline"
      bgColor={"rgba(9, 9, 9, 0.02)"}
      borderColor={"rgba(9, 9, 9, 0.1)"}
      value={inputValue}
    />
  );
};

const textAreaInput = <T extends TextProps>({ name, ...others }: T) => {
  const { setFieldTouched, setFieldValue } = useFormikContext();
  const { errors, values }: FormikProps = useFormikContext();
  const dispatch = useDispatch();
  const inputValue = name ? values[name] : "";
  const error = errors[name];

  return (
    <Textarea
      onBlur={() => {
        setFieldTouched(name);
      }}
      onChange={(e) => {
        const text = e.target.value;
        setFieldValue(name, text);
        dispatch(formSliceAction.updateFormField({ name: name, value: text }));
      }}
      {...others}
      isInvalid={error}
      variant="outline"
      bgColor={"rgba(9, 9, 9, 0.02)"}
      borderColor={"rgba(9, 9, 9, 0.1)"}
      value={inputValue}
    />
  );
};

const selectionInput = <T extends SelectProps>({
  name,
  options,
  handleSelectProduct,
  ...others
}: T) => {
  const { setFieldTouched, setFieldValue } = useFormikContext();
  const { errors, values }: FormikProps = useFormikContext();
  const dispatch = useDispatch();
  const inputValue = name ? values[name] : "";
  const error = errors[name];
  const selection = (value: any) => {
    if (value === "") return;
    setFieldValue(name, value);
    dispatch(formSliceAction.updateFormField({ name: name, value: value }));
  };
  return (
    <Select
      variant="filled"
      bgColor={"rgba(9, 9, 9, 0.02)"}
      borderColor={"rgba(9, 9, 9, 0.1)"}
      onChange={(e) => {
        if (e.target.value !== "") selection(e.target.value);
      }}
      onBlur={() => setFieldTouched(name)}
      {...others}
      value={inputValue}
      isInvalid={error}
      _placeholder={{ color: "#9D9D9D" }}
    >
      {options?.map((opt: any, i: number) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </Select>
  );
};

const selectionInputSearch = <T extends SelectProps>({
  name,
  options,
  handleSelectProduct,
  ...others
}: T) => {
  const { setFieldTouched, setFieldValue } = useFormikContext();
  const { errors, values }: FormikProps = useFormikContext();
  const inputValue = name ? values[name] : "";
  const selected = { value: inputValue, label: inputValue };
  const error = errors[name];
  const selection = (value: any) => {
    if (value === "") return;
    setFieldValue(name, value);
  };

  const optgroup = options.map((opt) => ({
    value: opt,
    label: opt,
  }));
  return (
    <CreatableSelect
      // variant="filled"
      bgColor={"rgba(9, 9, 9, 0.02)"}
      borderColor={"rgba(9, 9, 9, 0.1)"}
      onChange={(e) => {
        if (e?.value !== "") selection(e?.value);
      }}
      onBlur={() => setFieldTouched(name)}
      {...others}
      value={selected}
      isInvalid={error}
      // _placeholder={{ color: "#9D9D9D" }}
      options={optgroup}
      isClearable
    />
  );
};

{
  /* {options?.map((opt: any, i: number) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </SearchSelect> */
}
const radioInput = <T extends RadioProps>({
  name,
  options,
  handleSelectProduct,
  ...others
}: T) => {
  const { setFieldTouched, setFieldValue } = useFormikContext();
  const { values }: FormikProps = useFormikContext();
  const dispatch = useDispatch();
  const inputValue = name ? values[name] : "";

  const selection = (value: any) => {
    if (value === "true") {
      setFieldValue(name, true);
      dispatch(formSliceAction.updateFormField({ name: name, value: true }));
    } else if (value === "false") {
      setFieldValue(name, false);
      dispatch(formSliceAction.updateFormField({ name: name, value: false }));
    } else {
      setFieldValue(name, value);
      dispatch(formSliceAction.updateFormField({ name: name, value: value }));
    }
  };
  return (
    <RadioGroup
      name={name}
      {...others}
      onChange={(e) => {
        if (e !== "") selection(e);
      }}
      onBlur={() => setFieldTouched(name)}
      value={`${inputValue}`}
    >
      <Stack spacing={5} direction={{ base: "column", lg: "row" }}>
        {options?.map((opt: any, i: number) => (
          <Radio key={i} value={`${opt}`} colorScheme="green" size={"sm"}>
            {`${opt}`}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
};

const rangeInput = <T extends RangeProps>({
  name,
  max,
  min,
  step,
  defaultValue,
  ...others
}: T) => {
  const { setFieldTouched, setFieldValue } = useFormikContext();
  const { values }: FormikProps = useFormikContext();
  const dispatch = useDispatch();
  const inputValue = name ? values[name] : "";
  const [rangeValue, setRangeValue] = useState<number>(defaultValue || 0);

  return (
    <Flex direction="column" justify={"center"} align={"end"}>
      <RangeSlider
        defaultValue={[min, inputValue || defaultValue]}
        min={min}
        max={max}
        step={step}
        aria-label={["min", "max"]}
        onChangeEnd={(val) => {
          setFieldValue(name, `${val[1]}`);
          dispatch(
            formSliceAction.updateFormField({ name: name, value: `${val[1]}` })
          );

          setRangeValue(val[1]);
        }}
        onBlur={() => setFieldTouched(name)}
        {...others}
      >
        <RangeSliderTrack bg="rgba(0, 129, 69, 0.05)">
          <RangeSliderFilledTrack bg="#008145" />
        </RangeSliderTrack>
        <RangeSliderThumb boxSize={6} index={1} />
      </RangeSlider>
      <Badge colorScheme="green" width={"fit-content"} p={"3px"}>
        {rangeValue} %
      </Badge>
    </Flex>
  );
};

const errorMessage = ({ name, ...others }: ErrorProps) => {
  const { errors, touched }: FormikProps = useFormikContext();
  const error = errors[name];
  const visible = touched[name];

  if (!visible || !error) return null;

  return <FormErrorMessage {...others}>{error}</FormErrorMessage>;
};

AppFormFields.Input = textInput;
AppFormFields.textAreaInput = textAreaInput;
AppFormFields.ErrorMessage = errorMessage;
AppFormFields.SelectionInput = selectionInput;
AppFormFields.SelectionInputSearch = selectionInputSearch;
AppFormFields.RangeInput = rangeInput;
AppFormFields.RadioInput = radioInput;

export default AppFormFields;
