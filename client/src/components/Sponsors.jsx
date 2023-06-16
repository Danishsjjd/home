import React from "react"

import sponsor1 from "../assets/images/home/sponsor1.png"
import sponsor2 from "../assets/images/home/sponsor2.png"
import sponsor3 from "../assets/images/home/sponsor3.png"
import sponsor4 from "../assets/images/home/sponsor4.png"
import sponsor5 from "../assets/images/home/sponsor5.png"
import sponsor6 from "../assets/images/home/sponsor6.png"

const sponsors = [sponsor1, sponsor2, sponsor3, sponsor4, sponsor5, sponsor6]

const Sponsors = () => {
  return (
    <div className="px-4 text-center lg:px-0 ">
      <div className="mx-auto grid max-w-7xl grid-cols-3 place-items-center gap-4 sm:grid-cols-6 sm:gap-1 lg:gap-4">
        {sponsors.map((img, index) => (
          <img src={img} alt="insta1" className="w-full object-contain" key={index} />
        ))}
      </div>
    </div>
  )
}

export default Sponsors
