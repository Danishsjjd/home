import React from "react"
import { Link } from "react-router-dom"

import { homeCategories } from "../../constants/data"

const Categories = () => {
  return (
    <div className="mx-auto my-8 flex max-w-7xl flex-wrap justify-evenly gap-3 px-4 lg:px-0">
      {homeCategories.map(({ Icon, title }) => (
        <Link className="w-16 space-y-2 text-center sm:w-32" to={`/shope?category=${title}`} key={title}>
          <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-secondary-lightest sm:h-32 sm:w-32">
            <Icon className="scale-75" />
          </div>
          <h2 className="text-secondary-darker sm:text-2xl sm:font-bold">{title}</h2>
        </Link>
      ))}
    </div>
  )
}

export default Categories
