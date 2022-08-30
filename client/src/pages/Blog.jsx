import React from "react";
import MountTransition from "../utils/MountTransition";

import ComingSoon from "../utils/ComingSoon";
import MetaData from "../utils/MetaData";

const Blog = () => {
	const date = "23 oct 2022";

	return (
		<MountTransition>
			<MetaData title={"Blogs"} />
			<ComingSoon
				title={"Blog Website is under construction!"}
				desc={
					"Accept letterhead to be the first to hear about exclusive deals, special offers and upcoming collections"
				}
				date={date}
			/>
		</MountTransition>
	);
};

export default Blog;
