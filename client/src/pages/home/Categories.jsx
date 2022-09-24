import React from "react";
import { Link } from "react-router-dom";

import { homeCategories } from "../../constants/data";

const Categories = () => {
	return (
		<div className="max-w-7xl mx-auto flex flex-wrap justify-evenly gap-3 my-8 px-4 lg:px-0">
			{homeCategories.map(({ Icon, title }) => (
				<Link
					className="space-y-2 sm:w-32 w-16 text-center"
					to={`/shope?category=${title}`}
					key={title}
				>
					<div className="sm:w-32 sm:h-32 w-16 h-16 rounded-full overflow-hidden grid place-items-center bg-secondary-lightest">
						<Icon className="scale-75" />
					</div>
					<h2 className="text-secondary-darker sm:font-bold sm:text-2xl">
						{title}
					</h2>
				</Link>
			))}
		</div>
	);
};

export default Categories;
