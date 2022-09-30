import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({
  id,
  description,
  image,
  price,
  offerPrice,
  rating,
  title,
  category,
  reviews,
  grid,
  isDeleted,
}) => {
  const navigation = useNavigate();
  const handleClick = () => {
    navigation(`/product/${id}`);
  };
  return (
    <div
      className={`overflow-hidden [text-overflow:hidden] card w-full bg-base-100 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
      onClick={handleClick}
    >
      <div>
        <img
          src={image}
          alt={title}
          className={
            grid
              ? "w-full h-full object-contain max-h-[300px] min-h-[300px]"
              : "max-h-[500px] object-contain text-center block mx-auto"
          }
        />
      </div>
      <div className="card-body !p-3">
        <h2 className="card-title">
          <span
            className={`line-clamp-1 !text-base ${
              isDeleted ? "text-red-700" : ""
            }`}
          >
            {title}
          </span>
          {Number(offerPrice) < 1 ? (
            <div className="badge badge-primary text-white">${price}</div>
          ) : null}
        </h2>
        <p className={`line-clamp-2 ${isDeleted ? "text-red-700" : ""}`}>
          {description}
        </p>
        <div className="card-actions justify-end">
          {Number(offerPrice) < 1 ? null : (
            <div className="badge badge-outline">
              <span className="line-through">${price}</span>
            </div>
          )}
          {Number(offerPrice) < 1 ? null : (
            <div className="badge badge-primary text-white">${offerPrice}</div>
          )}
          <div className="badge badge-outline">{category}</div>
          {reviews.length > 0 ? (
            <div className="badge badge-outline">{rating}⭐</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Card;
