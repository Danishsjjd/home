import React from "react";
import { useNavigate } from "react-router-dom";

import img from "../assets/404/img.png";
import MetaData from "../utils/MetaData";
import Button from "./Button";

const PageNotFound = () => {
	const navigate = useNavigate();
	return (
		<>
			<MetaData title={"Not Found"} />
			<div className="text-center min-h-screen min-w-screen w-full h-full flex flex-col justify-center items-center space-y-3">
				<img src={img} alt="not found 404" />
				<h2 className="sm:text-4xl text-xl text-neutral-darkest font-bold ">
					Oops ! Something went wrong.
				</h2>
				<p className="text-neutral-darker">
					The page are looking for has been moved or doesn’t exist anymore.
				</p>
				<Button
					title="Back to Homepage"
					ClassName={"tracking-wide"}
					onClick={() => navigate("/")}
				/>
			</div>
		</>
	);
};

export default PageNotFound;
