import React from "react"

import DropDown from "../DropDown"

import { useFormikContext } from "formik"

const classNames =
  "inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"

const FormDropDown = ({ name, list, side }) => {
  const { values, setFieldValue } = useFormikContext()
  return (
    <DropDown
      anchor={<p className={classNames}>{values[name]}</p>}
      list={list}
      side={side}
      setFieldValue={setFieldValue}
      name={name}
    />
  )
}

export default FormDropDown
