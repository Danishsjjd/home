import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { API } from "../../libs/axios";
import { getUpdatePassword, setUpdatePassword } from "../../store/authSlice";
import Input from "../form/Input";
import Button from "../Button";

export default function UpdatePassword() {
	const dispatch = useDispatch();
	const isOpen = useSelector(getUpdatePassword);
	const closeModal = () => {
		dispatch(setUpdatePassword(false));
	};

	const validationSchema = Yup.object().shape({
		oldPassword: Yup.string().min(8).required().label("Old Password"),
		newPassword: Yup.string().min(8).required().label("New Password"),
		confirmPassword: Yup.string().min(8).required().label("Confirm Password"),
	});

	const initialValues = {
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	};

	const onSubmit = async (values, { resetForm }) => {
		try {
			const response = await API.updatePassword({ data: values });
			dispatch(setUpdatePassword(false));
			toast.success(response.data.message);
			resetForm();
		} catch (e) {
			toast.error(e?.response?.data?.message || e?.message);
		}
	};

	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<div className="divide-y-2 space-y-5 divide-neutral-lighter">
										<h2 className="text-center py-2 text-2xl font-bold">
											Update Password
										</h2>
										<Formik
											initialValues={initialValues}
											onSubmit={onSubmit}
											validationSchema={validationSchema}
										>
											{({ handleSubmit }) => {
												return (
													<>
														<div>
															<h2 className="text-lg mb-1 mt-2">
																Old Password
															</h2>
															<Input name="oldPassword" app type="password" />
														</div>
														<div>
															<h2 className="text-lg mb-1 mt-2">
																New Password
															</h2>
															<Input name="newPassword" app type="password" />
														</div>
														<div>
															<h2 className="text-lg mb-1 mt-2">
																Confirm Password
															</h2>
															<Input
																name="confirmPassword"
																app
																type="password"
															/>
														</div>
														<Button
															app
															title={"Reset Now!"}
															onClick={handleSubmit}
														/>
													</>
												);
											}}
										</Formik>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
