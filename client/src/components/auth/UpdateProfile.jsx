import { Dialog, Transition } from "@headlessui/react";
import { Image } from "cloudinary-react";
import { Formik } from "formik";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { API } from "../../libs/axios";
import {
	getUpdateProfile,
	getUser,
	setUpdateProfile,
	setUser,
} from "../../store/authSlice";
import Button from "../Button";
import ErrorMessage from "../form/ErrorMessage";
import Input from "../form/Input";

export default function UpdateProfile() {
	const dispatch = useDispatch();
	const [image, setImage] = useState(null);

	const user = useSelector(getUser);
	const isOpen = useSelector(getUpdateProfile);

	const closeModal = () => {
		dispatch(setUpdateProfile(false));
	};

	const validationSchema = Yup.object().shape({
		avatar: Yup.string(),
		username: Yup.string(),
	});
	const initialValues = {
		avatar: "",
		username: user.username,
	};

	const onSubmit = async (values, { resetForm }) => {
		try {
			const response = await API.UpdateProfile({ data: values });
			toast.success(response.data.message);
			resetForm();
			dispatch(setUser(response.data.updatedUser));
		} catch (e) {
			toast.error(e?.response?.data?.message || e?.message);
		} finally {
			dispatch(setUpdateProfile(false));
		}
	};

	const onImageChange = (e, setFiledValue) => {
		const file = e.target.files[0];

		const reader = new FileReader();
		reader.onload = () => {
			const extension = reader.result?.split(";")[0]?.split("/")[1];
			if (reader.readyState === 2) {
				if (
					extension === "jpeg" ||
					extension === "png" ||
					extension === "jpg"
				) {
					setImage(reader.result);
					setFiledValue(e.target.name, reader.result);
				} else return toast.error("Only image is valid for profile");
			}
		};
		reader.readAsDataURL(file);
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
										<Formik
											initialValues={initialValues}
											onSubmit={onSubmit}
											validationSchema={validationSchema}
										>
											{({ handleSubmit, setFieldValue, errors, touched }) => {
												return (
													<>
														<div>
															<label className="block text-lg font-medium text-gray-700 text-center">
																Photo
															</label>
															<div className="mt-1 flex items-center flex-col gap-3">
																<div className="w-40 h-40 rounded-full overflow-hidden">
																	{user?.avatar?.public_id && image === null ? (
																		<Image
																			cloudName={
																				process.env.REACT_APP_CLOUD_NAME
																			}
																			publicId={user?.avatar?.public_id}
																			width="160"
																			height="160"
																			alt="user image"
																			className="w-full h-full"
																		/>
																	) : (
																		<img
																			src={image || user?.googleAvatar}
																			alt="user"
																			className={`w-full h-full object-cover bg-[#999]`}
																		/>
																	)}
																</div>
																<button className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:outline-secondary-darker">
																	<label htmlFor="userAvatar">Upload</label>
																</button>
																<input
																	type="file"
																	name="avatar"
																	id="userAvatar"
																	className="hidden"
																	onChange={(e) =>
																		onImageChange(e, setFieldValue)
																	}
																	accept="image/png, image/jpeg"
																/>
																<ErrorMessage
																	err={errors["avatar"]}
																	visible={touched["avatar"]}
																/>
															</div>
														</div>
														<div>
															<h2 className="text-lg mb-1 mt-2">
																Email (immutable)
															</h2>
															<Input
																name="email"
																app
																type="email"
																value={user.email}
																disabled
															/>
														</div>
														<div>
															<h2 className="text-lg mb-1 mt-2">username</h2>
															<Input name="username" app type="text" />
														</div>
														<Button
															app
															title={"Update Profile!"}
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
