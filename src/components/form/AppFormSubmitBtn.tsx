import { Button } from "@chakra-ui/react";
import { useFormikContext } from "formik";

type Props = {
  children: string;
  isLoading: boolean;
};

type FormikProps = {
  handleSubmit: any;
};
const AppFormSubmitBtn = <T extends Props>({
  children,
  isLoading,
  ...others
}: T) => {
  //trigers the onSubmit button on the formfield
  const { handleSubmit }: FormikProps = useFormikContext();

  return (
    <Button isLoading={isLoading} onClick={() => handleSubmit()} {...others}>
      {children}
    </Button>
  );
};

export default AppFormSubmitBtn;
