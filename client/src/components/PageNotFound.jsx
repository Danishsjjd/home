import React from "react"
import { useNavigate } from "react-router-dom"

import MetaData from "../utils/MetaData"

import img from "../assets/404/img.png"
import Button from "./Button"

const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <>
      <MetaData title={"Not Found"} />
      <div className="min-w-screen flex h-full min-h-screen w-full flex-col items-center justify-center space-y-3 text-center">
        <img src={img} alt="not found 404" />
        <h2 className="text-xl font-bold text-neutral-darkest sm:text-4xl ">Oops ! Something went wrong.</h2>
        <p className="text-neutral-darker">The page are looking for has been moved or doesn’t exist anymore.</p>
        <Button className={"tracking-wide"} onClick={() => navigate("/")}>
          Back to Homepage
        </Button>
      </div>
    </>
  )
}

export default PageNotFound
