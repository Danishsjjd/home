import { Rating } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { createReviewApi } from "../../store/apiCall/productApi";
import Button from "../Button";
import AreaTextField from "../form/AreaTextField";
import Input from "../form/Input";

const ReviewForm = ({ user, productId, setProduct }) => {
  const [localReview, setLocalReview] = useState(5);

  const validationSchema = Yup.object().shape({
    rating: Yup.number().required().label("Rating"),
    review: Yup.string().min(5).required().label("Review"),
  });
  const initialData = {
    rating: 5,
    review: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    const finalObj = {
      rating: values.rating,
      review: values.review,
      productId: productId,
    };
    createReviewApi({ data: finalObj, setProduct, user }, resetForm);
  };
  console.log(user.name);
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
                <Input
                  name="name"
                  app
                  disabled
                  value={user.username ? user.username : ""}
                />
              </div>
              <div>
                <h4 className="mb-1">Your Email</h4>
                <Input
                  name="email"
                  app
                  disabled
                  value={user.email ? user.email : ""}
                />
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
