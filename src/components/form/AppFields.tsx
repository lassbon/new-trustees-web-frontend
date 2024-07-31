import { useFormikContext } from "formik";
import { Input, FormErrorMessage, FormControl } from "@chakra-ui/react";

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
  const inputValue = name ? values[name] : "";
  const error = errors[name];

  return (
    <Input
      onBlur={() => {
        setFieldTouched(name);
      }}
      onChange={(e) => {
        const text = e.target.value;
        setFieldValue(name, text);
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

const errorMessage = ({ name, ...others }: ErrorProps) => {
  const { errors, touched }: FormikProps = useFormikContext();
  const error = errors[name];
  const visible = touched[name];

  if (!visible || !error) return null;

  return <FormErrorMessage {...others}>{error}</FormErrorMessage>;
};

AppFormFields.Input = textInput;
AppFormFields.ErrorMessage = errorMessage;

export default AppFormFields;
