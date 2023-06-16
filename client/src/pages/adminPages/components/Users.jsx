import React from "react"

const Users = ({ email, img, name }) => {
  return (
    <div className="flex gap-2 p-2 dark:text-white">
      <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
        <img src={img} alt={"users"} className={"h-full w-full"} />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-lg">{name}</h3>
        <h4 className="text-md text-lightBlack">{email}</h4>
      </div>
    </div>
  )
}

export default Users
