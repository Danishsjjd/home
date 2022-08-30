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
			<figure>
				<img
					src={image}
					alt={title}
					className={grid ? "w-full h-full object-cover" : ""}
				/>
			</figure>
			<div className="card-body !p-3">
				<h2 className="card-title">
					<span className="line-clamp-1 !text-base">{title}</span>
					{Number(offerPrice) < 1 ? (
						<div className="badge badge-primary text-white">${price}</div>
					) : null}
				</h2>
				<p className="line-clamp-2">{description}</p>
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
						<div className="badge badge-outline">{rating}</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Card;
