import React, { useState, useId } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { Sidebar, TopBar } from "../components";
import { Dashboard, Customers, CreateProduct, Settings } from "../pages";
import MetaData from "../utils/MetaData";
import { AnimatePresence } from "framer-motion";
import MountTransition from "../utils/MountTransition";

const AdminRouter = () => {
	const id = useId();
	const location = useLocation();
	// const locationArr = location.pathname?.split("/") ?? [];
	const [menu, setMenu] = useState(() => {
		const windowWidth = window.innerWidth;
		if (windowWidth > 1280) return true;
		return false;
	});
	return (
		<MountTransition>
			<div className="w-full relative ">
				<MetaData title="Dashboard" />
				<Sidebar menu={menu} />
				<div
					className={`bg-white dark:bg-dark absolute w-full min-h-screen transition-all duration-500 p-3 ${
						menu
							? "xl:left-[300px] xl:translate-x-0 translate-x-[300px] xl:w-[calc(100%-300px)]"
							: "xl:left-20 xl:w-[calc(100%-80px)]"
					}`}
				>
					<TopBar setMenu={setMenu} />
					<AnimatePresence mode="wait" initial={false}>
						<Routes location={location} key={id}>
							<Route path="/" element={<Dashboard />} />
							<Route path="customers" element={<Customers />} />
							<Route path="createProduct" element={<CreateProduct />} />
							<Route path="settings" element={<Settings />} />
						</Routes>
					</AnimatePresence>
				</div>
			</div>
		</MountTransition>
	);
};

export default AdminRouter;
