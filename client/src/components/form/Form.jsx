import React from "react"

import { Formik, Form as FormikForm } from "formik"

const Form = ({ children, onSubmit, initialValues, validationSchema }) => {
  return (
    <Formik onSubmit={onSubmit} validationSchema={validationSchema} initialValues={initialValues}>
      <FormikForm>{children}</FormikForm>
    </Formik>
  )
}

export default Form
