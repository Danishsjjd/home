import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";

const Input = ({ name, className, notShowError, app, ...otherProps }, ref) => {
	const { values, setFieldValue, touched, errors, setFieldTouched } =
		useFormikContext();
	let classes = `rounded-full w-full form-control block px-3 py-1.5 text-xl font-medium bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-accent focus:border-accent focus:outline-none ${className}`;
	if (app)
		classes = `rounded-full w-full form-control block px-3 py-1.5 font-medium bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 bg-white focus:text-secondary-darker focus:border-secondary-darkest focus:outline-none focus:ring-0 ${className}`;
	return (
		<>
			<input
				name={name}
				value={values[name]}
				onChange={(e) => setFieldValue(name, e.target.value)}
				onBlur={() => setFieldTouched(name)}
				className={classes}
				ref={ref}
				type="text"
				{...otherProps}
			/>
			{!notShowError && (
				<ErrorMessage err={errors[name]} visible={touched[name]} />
			)}
		</>
	);
};

export default React.forwardRef(Input);
