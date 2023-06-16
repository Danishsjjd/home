import React from "react"

import AppButton from "../Button"

import { useFormikContext } from "formik"

const Button = ({ otherProps, children }) => {
  const { handleSubmit } = useFormikContext()
  return (
    <AppButton onClick={handleSubmit} {...otherProps} type="submit">
      {children}
    </AppButton>
  )
}

export default Button
