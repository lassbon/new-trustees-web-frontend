import { Formik } from "formik";
import { forwardRef } from "react";

type Props = {
  children: any;
  initialValues: Object;
  onSubmit: any;
  validateSchema: any;
  enableReinitialize?: any;
  onReset?: any;
};

const AppForm = forwardRef<any, Props>(
  (
    {
      children,
      initialValues,
      onSubmit,
      validateSchema,
      enableReinitialize,
      onReset,
    }: Props,
    ref
  ) => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validateSchema}
        enableReinitialize={enableReinitialize}
        onReset={onReset}
        innerRef={ref}
      >
        {() => <>{children}</>}
      </Formik>
    );
  }
);

export default AppForm;
