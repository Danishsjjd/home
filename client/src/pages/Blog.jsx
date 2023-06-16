import React from "react"

import ComingSoon from "../utils/ComingSoon"
import MetaData from "../utils/MetaData"
import MountTransition from "../utils/MountTransition"

const Blog = () => {
  const date = new Date().setHours(new Date().getHours() + 48)

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
  )
}

export default Blog
