import React from "react"

const Card = ({ icon, number, title }) => {
  return (
    <div className="group grid grid-cols-2 items-center rounded-2xl bg-white p-9 shadow-light hover:bg-accent dark:bg-black">
      <div>
        <div className="mb-1 text-5xl font-medium text-accent group-hover:text-white">{number}</div>
        <div className="text-lightBlack group-hover:text-white">{title}</div>
      </div>
      <div className="justify-self-end">{icon}</div>
    </div>
  )
}

export default Card
