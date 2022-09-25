import Rating from "@mui/material/Rating";
import { FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

import { Image } from "cloudinary-react";
import {
  deleteReviewApi,
  toggleReviewLikeApi,
} from "../../../store/apiCall/productApi";
import { getUser } from "../../../store/authSlice";

const Reviews = ({ reviews, productId, setProduct }) => {
  const user = useSelector(getUser);

  const deleteReview = async (revId) => {
    deleteReviewApi(productId, revId, setProduct);
  };

  const toggleLike = (id) => {
    toggleReviewLikeApi({ revId: id, setProduct, user, reviews });
  };
  return (
    <div className="divide-y col-span-2 max-w-2xl">
      {reviews.map((review) => {
        const liked = review.likes.find((email) => email === user.email);
        return (
          <div className="p-4 space-y-2" key={review.user.email}>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  {review?.user?.avatar?.public_id ? (
                    <Image
                      cloudName={process.env.REACT_APP_CLOUD_NAME}
                      publicId={review?.user?.avatar?.public_id}
                      width="40"
                      height="40"
                      alt="user image"
                      className="w-full h-full"
                    />
                  ) : (
                    <img src={review?.user?.googleAvatar} alt="user" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{review.user.username}</h3>
                  <p>{new Date(review.updatedAt).toDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Rating readOnly name="size-medium" value={review.rating} />
                {user?.role === "admin" ? (
                  <FaRegTrashAlt
                    className="text-neutral-darker hover:text-neutral-darkest cursor-pointer text-xl"
                    onClick={() => deleteReview(review._id)}
                  />
                ) : null}
              </div>
            </div>
            <p className="text-neutral-darker">{review.review}</p>
            <button
              className={
                "flex gap-1 hover:text-blue-600 cursor-pointer font-medium " +
                `${liked ? "text-blue-600" : ""}`
              }
              onClick={() => toggleLike(review._id)}
            >
              <span>{review?.likes?.length || "0"}</span>
              Like
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
