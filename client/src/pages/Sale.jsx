import React from "react";
import MountTransition from "../utils/MountTransition";

import ComingSoon from "../utils/ComingSoon";

const Sale = () => {
	const date = "23 oct 2022";

	return (
		<MountTransition>
			<ComingSoon
				title={"November Look book Vol.1"}
				desc={
					"Accept letterhead to be the first to hear about exclusive deals, special offers and upcoming collections"
				}
				date={date}
			/>
		</MountTransition>
	);
};

export default Sale;
