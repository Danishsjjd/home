import React from "react";
import { NavLink } from "react-router-dom";

import { NavLinks } from "../../constants/data";

const Sidebar = ({ menu }) => {
	return (
		<div
			className={`fixed dark:bg-black h-full border-l-8 border-accent dark:border-black bg-accent transition-all duration-500 overflow-x-hidden overflow-y-auto ${
				menu ? "w-[300px]" : "xl:w-20 w-0"
			} `}
		>
			<ul className="space-y-3">
				{NavLinks.map(({ icon, title, to, style }) => (
					<CusNavLink
						icon={icon}
						title={title}
						to={to}
						key={title}
						style={style}
					/>
				))}
			</ul>
		</div>
	);
};

const CusNavLink = ({ icon, title, to, style }) => {
	return (
		<li className={`NavLinkList relative ${style ? style : ""}`}>
			<NavLink
				to={to}
				end
				className={({ isActive }) =>
					`${
						isActive ? "active-dashboard bg-white !text-black" : ""
					} hover:bg-white hover:text-black	rounded-tl-2xl rounded-bl-2xl flex items-center w-full text-white`
				}
			>
				{({ isActive }) => (
					<>
						<span
							className={`${
								isActive ? "translate-x-2" : ""
							} block text-center text-4xl p-3 mr-5 z-10 transition-all min-w-[60px]`}
						>
							{icon}
						</span>
						<span
							className={`${
								isActive ? "translate-x-2" : ""
							} transition-all whitespace-nowrap`}
						>
							{title}
						</span>
					</>
				)}
			</NavLink>
		</li>
	);
};

export default Sidebar;
