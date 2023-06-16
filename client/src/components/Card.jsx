import React from "react"
import { useNavigate } from "react-router-dom"

const Card = ({ id, description, image, price, offerPrice, rating, title, category, reviews, grid, isDeleted }) => {
  const navigation = useNavigate()
  const handleClick = () => {
    navigation(`/product/${id}`)
  }
  return (
    <div
      className={`card w-full cursor-pointer overflow-hidden bg-base-100 shadow transition-all duration-300 [text-overflow:hidden] hover:-translate-y-1 hover:shadow-xl`}
      onClick={handleClick}
    >
      <div>
        <img
          src={image}
          alt={title}
          className={
            grid
              ? "h-full max-h-[300px] min-h-[300px] w-full object-contain"
              : "mx-auto block max-h-[500px] object-contain text-center"
          }
        />
      </div>
      <div className="card-body !p-3">
        <h2 className="card-title">
          <span className={`!text-base line-clamp-1 ${isDeleted ? "text-red-700" : ""}`}>{title}</span>
          {Number(offerPrice) < 1 ? <div className="badge-primary badge text-white">${price}</div> : null}
        </h2>
        <p className={`line-clamp-2 ${isDeleted ? "text-red-700" : ""}`}>{description}</p>
        <div className="card-actions justify-end">
          {Number(offerPrice) < 1 ? null : (
            <div className="badge-outline badge">
              <span className="line-through">${price}</span>
            </div>
          )}
          {Number(offerPrice) < 1 ? null : <div className="badge-primary badge text-white">${offerPrice}</div>}
          <div className="badge-outline badge">{category}</div>
          {reviews.length > 0 ? <div className="badge-outline badge">{rating}⭐</div> : null}
        </div>
      </div>
    </div>
  )
}

export default Card
