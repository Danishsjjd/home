import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../Button";

const Button = ({ otherProps, children }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton onClick={handleSubmit} {...otherProps} type="submit">
      {children}
    </AppButton>
  );
};

export default Button;
