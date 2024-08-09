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
  const handleOnChange = (e: any) => {
    const text = e.target.value;
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
    >
      {options?.map((opt: any, i: number) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </Select>
  );
};

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
    setFieldValue(name, value);
    dispatch(formSliceAction.updateFormField({ name: name, value: value }));
  };
  return (
    <RadioGroup
      name={name}
      {...others}
      onChange={(e) => {
        if (e !== "") selection(e);
      }}
      onBlur={() => setFieldTouched(name)}
      value={inputValue}
    >
      <Stack spacing={5} direction={{ base: "column", lg: "row" }}>
        {options?.map((opt: any, i: number) => (
          <Radio key={i} value={opt} colorScheme="green">
            {opt}
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
  const [rangeValue, setRangeValue] = useState<number>(defaultValue);

  return (
    <Flex direction="column" justify={"center"} align={"end"}>
      <RangeSlider
        defaultValue={[min, defaultValue]}
        min={min}
        max={max}
        step={step}
        aria-label={["min", "max"]}
        onChangeEnd={(val) => {
          setFieldValue(name, val[1]);
          dispatch(
            formSliceAction.updateFormField({ name: name, value: val[1] })
          );

          setRangeValue(val[1]);
        }}
        onBlur={() => setFieldTouched(name)}
        {...others}
        value={inputValue}
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
AppFormFields.RangeInput = rangeInput;
AppFormFields.RadioInput = radioInput;

export default AppFormFields;
