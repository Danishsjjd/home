import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";

import { DropDown } from "../../../components";
import { DropDownData } from "../../../constants/admin";

const dropDownAnchor = (
  <div className="w-[60px] h-[60px] overflow-hidden rounded-full">
    <img
      alt="user"
      className="object-cover w-full h-full"
      src={require("../../../assets/images/julian-wan-WNoLnJo7tS8-unsplash.jpg")}
    />
  </div>
);

const TopBar = ({ setMenu }) => {
  const [search, setSearch] = useState("");
  return (
    <div className="w-full z-10 relative flex justify-between">
      <div className="w-[60x] h-[60px] flex justify-center items-center">
        <AiOutlineMenu
          className="text-4xl cursor-pointer text-black dark:text-white"
          onClick={() => setMenu((pre) => !pre)}
        />
      </div>
      <div className="w-1/3 relative min-w-[180px]">
        <label>
          <input
            className={
              "w-full relative p-2 rounded-full peer border-lightBlack focus-visible:border-dark text-lightBlack focus-visible:text-dark border-2 pl-10 text-lg"
            }
            type="text"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search..."
            value={search}
          />
          <AiOutlineSearch className="absolute top-4 left-4 text-lg text-lightBlack peer-focus:text-dark" />
        </label>
      </div>
      <DropDown
        anchor={dropDownAnchor}
        list={DropDownData}
        side={"left"}
        dashboard
      />
    </div>
  );
};

export default TopBar;
