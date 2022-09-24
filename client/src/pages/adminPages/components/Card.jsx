import React from "react";

const Card = ({ icon, number, title }) => {
	return (
		<div className="grid grid-cols-2 items-center bg-white dark:bg-black shadow-light p-9 rounded-2xl group hover:bg-accent">
			<div>
				<div className="text-accent text-5xl font-medium mb-1 group-hover:text-white">
					{number}
				</div>
				<div className="text-lightBlack group-hover:text-white">{title}</div>
			</div>
			<div className="justify-self-end">{icon}</div>
		</div>
	);
};

export default Card;
