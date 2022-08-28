import { Rating } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { API } from "../../libs/axios";
import Button from "../Button";
import AreaTextField from "../form/AreaTextField";
import Input from "../form/Input";
import { setDialog } from "../../store/authSlice";

const ReviewForm = ({ user, productId, setProduct }) => {
	const dispatch = useDispatch();
	const [localReview, setLocalReview] = useState(5);
	const validationSchema = Yup.object().shape({
		rating: Yup.number().required().label("Rating"),
		review: Yup.string().min(5).required().label("Review"),
	});

	const onSubmit = async (values, { resetForm }) => {
		if (Object.keys(user).length === 0) return dispatch(setDialog(true));
		const finalObj = {
			rating: values.rating,
			review: values.review,
			productId: productId,
		};
		try {
			const newReview = await API.createAndUpdateReview({ data: finalObj });
			toast.success(newReview.data.message);
			setProduct(newReview.data.updatedProduct);
			resetForm();
		} catch (e) {
			toast.error(e?.response?.data?.message || e.message);
		}
	};
	const initialData = {
		rating: 5,
		review: "",
	};
	return (
		<div className="bg-neutral-lightest rounded p-4 space-y-8 md:sticky top-16 w-full">
			<h2 className="text-center text-2xl font-bold">Write a review</h2>
			<Formik
				initialValues={initialData}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{({ handleSubmit, setFieldValue }) => {
					return (
						<>
							<div>
								<h4 className="mb-1">Your Name</h4>
								<Input name="name" app disabled value={user.username} />
							</div>
							<div>
								<h4 className="mb-1">Your Email</h4>
								<Input name="email" app disabled value={user.email} />
							</div>
							<div>
								<h4 className="mb-1">Your Rating</h4>
								<Rating
									name="size-medium"
									value={localReview}
									onChange={(e, value) => {
										setFieldValue("rating", value);
										setLocalReview(value);
									}}
								/>
							</div>
							<div>
								<h4 className="mb-1">Your Review</h4>
								<AreaTextField app name="review" />
							</div>
							<Button
								title={"Submit"}
								ClassName="text-center"
								app
								onClick={handleSubmit}
							/>
						</>
					);
				}}
			</Formik>
		</div>
	);
};

export default ReviewForm;
