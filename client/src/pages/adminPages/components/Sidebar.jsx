import React from "react"
import { NavLink } from "react-router-dom"

import { NavLinks } from "../../../constants/admin"

const Sidebar = ({ menu }) => {
  return (
    <div
      className={`fixed h-full overflow-y-auto overflow-x-hidden border-l-8 border-accent bg-accent transition-all duration-500 dark:border-black dark:bg-black ${
        menu ? "w-[300px]" : "w-0 xl:w-20"
      } `}
    >
      <ul className="space-y-3">
        {NavLinks.map(({ icon, title, to, style }) => (
          <CusNavLink icon={icon} title={title} to={to} key={title} style={style} />
        ))}
      </ul>
    </div>
  )
}

const CusNavLink = ({ icon, title, to, style }) => {
  return (
    <li className={`NavLinkList relative ${style ? style : ""}`}>
      <NavLink
        to={to}
        end
        className={({ isActive }) =>
          `${
            isActive ? "active-dashboard bg-white !text-black" : ""
          } flex w-full	items-center rounded-bl-2xl rounded-tl-2xl text-white hover:bg-white hover:text-black`
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`${
                isActive ? "translate-x-2" : ""
              } z-10 mr-5 block min-w-[60px] p-3 text-center text-4xl transition-all`}
            >
              {icon}
            </span>
            <span className={`${isActive ? "translate-x-2" : ""} whitespace-nowrap transition-all`}>{title}</span>
          </>
        )}
      </NavLink>
    </li>
  )
}

export default Sidebar
