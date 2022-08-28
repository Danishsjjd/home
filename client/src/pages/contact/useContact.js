import { useState } from "react";
import * as Yup from "yup";

const useContact = () => {
	const [active, setActive] = useState(null);

	const initialValues = {
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required(),
		email: Yup.string().email().required(),
		phone: Yup.string().required(),
		subject: Yup.string().required(),
		message: Yup.string().required().min(20).max(100),
	});

	return {
		active,
		setActive,
		initialValues,
		validationSchema,
	};
};

export default useContact;
