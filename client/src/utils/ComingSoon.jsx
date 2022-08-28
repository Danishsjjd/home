import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import bg from "../assets/images/Blog_image.jpg";
import { Button, Input } from "../components";
import CountDown from "./CountDown";

const ComingSoon = ({ title, desc, date }) => {
	const initialValues = {
		email: "",
	};
	const validationSchema = Yup.object().shape({
		email: Yup.string().email().required(),
	});
	return (
		<div
			className="pt-20 h-screen w-screen bg-cover flex justify-center items-center text-white "
			style={{ background: `url(${bg}) center black no-repeat` }}
		>
			<div className="max-w-2xl w-full mx-auto grid gap-8 px-4 justify-center items-center">
				<div className="text-center space-y-3">
					<h2 className="sm:text-4xl text-2xl font-bold">{title}</h2>
					<p className="sm:text-base text-sm">{desc}</p>
				</div>
				<CountDown date={date} />
				<div>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
					>
						{({ handleSubmit }) => (
							<div className="flex gap-3">
								<div className="flex-1">
									<Input
										name="email"
										app
										className="!bg-transparent focus:text-secondary-darker focus:border-secondary-darker flex-1 flex-grow"
										placeholder="Enter Your Email"
									/>
								</div>
								<div>
									<Button title={"Submit"} onClick={handleSubmit} app />
								</div>
							</div>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default ComingSoon;
