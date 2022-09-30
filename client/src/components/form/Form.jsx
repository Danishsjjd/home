import { Formik, Form as FormikForm } from "formik";
import React from "react";

const Form = ({ children, onSubmit, initialValues, validationSchema }) => {
  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      initialValues={initialValues}
    >
      <FormikForm>{children}</FormikForm>
    </Formik>
  );
};

export default Form;
