import React from "react";

import { Users } from "./components";
import { usersContent } from "../../constants/admin";
import MountTransition from "../../utils/MountTransition";

const Customers = () => {
  return (
    <MountTransition dashboard>
      {usersContent.map(({ email, img, name }) => (
        <Users email={email} img={img} name={name} key={email} />
      ))}
    </MountTransition>
  );
};

export default Customers;
