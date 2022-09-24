import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../Button";

const Button = ({ title, ClassName, otherProps }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <AppButton
      onClick={handleSubmit}
      title={title}
      ClassName={ClassName}
      {...otherProps}
    />
  );
};

export default Button;
