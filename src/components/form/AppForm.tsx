import { Formik } from "formik";

type Props = {
  children: any;
  initialValues: Object;
  onSubmit: any;
  validateSchema: any;
  enableReinitialize?: any;
};

const AppForm = ({
  children,
  initialValues,
  onSubmit,
  validateSchema,
  enableReinitialize,
}: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validateSchema}
      enableReinitialize={enableReinitialize}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;
