import React, { useState } from "react"
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai"
import { useSelector } from "react-redux"

import { DropDown } from "../../../components"
import { DropDownData } from "../../../constants/admin"
import { getUser } from "../../../store/authSlice"

const DropDownAnchor = () => {
  const user = useSelector(getUser)
  return (
    <div className="h-[60px] w-[60px] overflow-hidden rounded-full">
      <img alt="user" className="h-full w-full object-cover" src={user.avatar?.url || user.googleAvatar} />
    </div>
  )
}

const TopBar = ({ setMenu }) => {
  const [search, setSearch] = useState("")
  return (
    <div className="relative z-10 flex w-full justify-between">
      <div className="flex h-[60px] w-[60x] items-center justify-center">
        <AiOutlineMenu
          className="cursor-pointer text-4xl text-black dark:text-white"
          onClick={() => setMenu((pre) => !pre)}
        />
      </div>
      <div className="relative w-1/3 min-w-[180px]">
        <label>
          <input
            className={
              "peer relative w-full rounded-full border-2 border-lightBlack p-2 pl-10 text-lg text-lightBlack focus-visible:border-dark focus-visible:text-dark"
            }
            type="text"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search..."
            value={search}
          />
          <AiOutlineSearch className="absolute left-4 top-4 text-lg text-lightBlack peer-focus:text-dark" />
        </label>
      </div>
      <DropDown anchor={<DropDownAnchor />} list={DropDownData} side={"left"} dashboard />
    </div>
  )
}

export default TopBar
