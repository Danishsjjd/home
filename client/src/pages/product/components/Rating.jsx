import React from "react"

import { default as RatingInput } from "@mui/material/Rating"

const Rating = ({ reviews, percentRating, ratings, total }) => {
  return (
    <>
      <span className="!mb-2 block sm:!mb-5">Reviews</span>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-0">
        <h1 className="w-full max-w-lg text-xl font-bold sm:text-4xl">What people says about this product</h1>
        <div>
          {reviews.length === 0 ? (
            <span>This product is not rated yet</span>
          ) : (
            <div className="max-w-[400px] ">
              <RatingInput name="size-large" value={ratings} readOnly className="text-right" size="large" />
              <p className="text-left">
                {total} out of {reviews.length * 5} ({percentRating}%) <br />{" "}
                {percentRating > 65 ? "Customers recommended this product" : "Customers don't recommended this product"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Rating
