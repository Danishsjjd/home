import React from "react";
import { default as RatingInput } from "@mui/material/Rating";

const Rating = ({ reviews, percentRating, ratings, total }) => {
  return (
    <>
      <span className="sm:!mb-5 !mb-2 block">Reviews</span>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between">
        <h1 className="sm:text-4xl text-xl font-bold max-w-lg w-full">
          What people says about this product
        </h1>
        <div>
          {reviews.length === 0 ? (
            <span>This product is not rated yet</span>
          ) : (
            <div className="max-w-[400px] ">
              <RatingInput
                name="size-large"
                value={ratings}
                readOnly
                className="text-right"
                size="large"
              />
              <p className="text-left">
                {total} out of {reviews.length * 5} ({percentRating}%) <br />{" "}
                {percentRating > 65
                  ? "Customers recommended this product"
                  : "Customers don't recommended this product"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Rating;
