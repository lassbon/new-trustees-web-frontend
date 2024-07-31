import { Formik } from "formik";

type Props = {
  children: any;
  initialValues: Object;
  onSubmit: any;
  validateSchema: any;
};

const AppForm = ({
  children,
  initialValues,
  onSubmit,
  validateSchema,
}: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validateSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;
