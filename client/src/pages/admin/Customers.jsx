import React from "react";

import { AdminUsers } from "../../components";
import { usersContent } from "../../constants/data";
import MountTransition from "../../utils/MountTransition";

const Customers = () => {
	return (
		<MountTransition dashboard>
			{usersContent.map(({ email, img, name }) => (
				<AdminUsers email={email} img={img} name={name} key={email} />
			))}
		</MountTransition>
	);
};

export default Customers;
