import React from "react";

const Button = ({ onClick, title, ClassName, app, cardBtn }) => {
	let classes =
		"rounded-full bg-accent text-white px-3 py-2 text-lg hover:bg-opacity-90 transition-all ";
	if (app)
		classes =
			"rounded-full bg-secondary-darkest hover:bg-secondary-darker text-white px-1 sm:px-3 py-2 text-lg transition-all ";
	if (cardBtn)
		classes +=
			"!bg-white hover:!bg-secondary-darker hover:text-white text-secondary-darker";
	if (ClassName) classes += ClassName;
	return (
		<button className={classes} onClick={onClick} type="button">
			{title}
		</button>
	);
};

export default Button;
