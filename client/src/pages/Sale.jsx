import React from "react";
import MountTransition from "../utils/MountTransition";

import ComingSoon from "../utils/ComingSoon";
import MetaData from "../utils/MetaData";

const Sale = () => {
  const date = new Date().setHours(new Date().getHours() + 48);

  return (
    <MountTransition>
      <MetaData title="Sales" />
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
