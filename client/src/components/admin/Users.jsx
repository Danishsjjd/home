import React from "react";

const Users = ({ email, img, name }) => {
	return (
		<div className="flex p-2 gap-2 dark:text-white">
			<div className="w-[50px] h-[50px] overflow-hidden rounded-full">
				<img src={img} alt={img} className={"w-full h-full"} />
			</div>
			<div className="flex flex-col justify-center">
				<h3 className="text-lg">{name}</h3>
				<h4 className="text-md text-lightBlack">{email}</h4>
			</div>
		</div>
	);
};

export default Users;
