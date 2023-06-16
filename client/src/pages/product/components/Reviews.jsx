import { Image } from "cloudinary-react"
import { FaRegTrashAlt } from "react-icons/fa"
import { useSelector } from "react-redux"

import { deleteReviewApi, toggleReviewLikeApi } from "../../../store/apiCall/productApi"
import { getUser } from "../../../store/authSlice"

import Rating from "@mui/material/Rating"

const Reviews = ({ reviews, productId, setProduct }) => {
  const user = useSelector(getUser)

  const deleteReview = async (revId) => {
    deleteReviewApi(productId, revId, setProduct)
  }

  const toggleLike = (id) => {
    toggleReviewLikeApi({ revId: id, setProduct, user, reviews })
  }
  return (
    <div className="col-span-2 max-w-2xl divide-y">
      {reviews.map((review) => {
        const liked = review.likes.find((email) => email === user.email)
        return (
          <div className="space-y-2 p-4" key={review.user.email}>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 overflow-hidden rounded-full">
                  {review?.user?.avatar?.public_id ? (
                    <Image
                      cloudName={import.meta.env.VITE_CLOUD_NAME}
                      publicId={review?.user?.avatar?.public_id}
                      width="40"
                      height="40"
                      alt="user image"
                      className="h-full w-full"
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
                    className="cursor-pointer text-xl text-neutral-darker hover:text-neutral-darkest"
                    onClick={() => deleteReview(review._id)}
                  />
                ) : null}
              </div>
            </div>
            <p className="text-neutral-darker">{review.review}</p>
            <button
              className={
                "flex cursor-pointer gap-1 font-medium hover:text-blue-600 " + `${liked ? "text-blue-600" : ""}`
              }
              onClick={() => toggleLike(review._id)}
            >
              <span>{review?.likes?.length || "0"}</span>
              Like
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Reviews
