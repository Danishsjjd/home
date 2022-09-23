import React from "react";
import Button from "../Button";
import { useFormikContext } from "formik";

const FormButton = ({ className, title }) => {
	const { handleSubmit } = useFormikContext();
	return <Button ClassName={className} onClick={handleSubmit} title={title} />;
};

export default FormButton;
