import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";

const AreaTextField = ({
	className,
	placeholder,
	name,
	notShowError,
	app,
	...otherProps
}) => {
	const { errors, values, touched, setFieldValue, setFieldTouched } =
		useFormikContext();
	let classes = `resize-y border-none focus:outline-none w-full `;
	if (className) classes += className;
	if (app)
		classes =
			"resize-y px-3 py-1.5 bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 bg-white focus:text-neutral-darker focus:border-secondary-darkest focus:outline-none w-full rounded-md";
	return (
		<>
			<textarea
				rows={4}
				className={classes + " focus:ring-0"}
				placeholder={placeholder}
				name={name}
				value={values[name]}
				onChange={(e) => setFieldValue(name, e.target.value)}
				onBlur={() => setFieldTouched(name)}
				{...otherProps}
			></textarea>
			{!notShowError && (
				<ErrorMessage err={errors[name]} visible={touched[name]} />
			)}
		</>
	);
};

export default AreaTextField;
