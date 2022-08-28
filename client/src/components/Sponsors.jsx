import React from "react";

import sponsor1 from "../assets/images/home/sponsor1.png";
import sponsor2 from "../assets/images/home/sponsor2.png";
import sponsor3 from "../assets/images/home/sponsor3.png";
import sponsor4 from "../assets/images/home/sponsor4.png";
import sponsor5 from "../assets/images/home/sponsor5.png";
import sponsor6 from "../assets/images/home/sponsor6.png";

const sponsors = [sponsor1, sponsor2, sponsor3, sponsor4, sponsor5, sponsor6];

const Sponsors = () => {
	return (
		<div className="text-center lg:px-0 px-4 ">
			<div className="grid grid-cols-3 sm:grid-cols-6 max-w-7xl mx-auto gap-4 sm:gap-1 lg:gap-4 place-items-center">
				{sponsors.map((img, index) => (
					<img
						src={img}
						alt="insta1"
						className="w-full object-contain"
						key={index}
					/>
				))}
			</div>
		</div>
	);
};

export default Sponsors;
