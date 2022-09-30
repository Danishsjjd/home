import React from "react";

const Button = ({
  onClick,
  children,
  className,
  app,
  cardBtn,
  ...otherProps
}) => {
  let classes =
    "rounded-full bg-accent text-white px-3 py-2 text-lg hover:bg-opacity-90 transition-all ";
  if (app)
    classes =
      "rounded-full bg-secondary-darkest hover:bg-secondary-darker text-white px-1 sm:px-3 py-2 text-lg transition-all ";
  if (cardBtn)
    classes +=
      "!bg-white hover:!bg-secondary-darker hover:text-white text-secondary-darker";
  if (className) classes += className;
  return (
    <button className={classes} onClick={onClick} type="button" {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
