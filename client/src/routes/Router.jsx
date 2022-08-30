import { AnimatePresence } from "framer-motion";
import { useEffect, useId } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";

import { PageNotFound } from "../components";
import { Footer, Header } from "../layout";
import { API } from "../libs/axios";
import {
	AboutUs,
	Blog,
	Cart,
	ContactUs,
	Home,
	Product,
	Sale,
	Shope,
	WishList,
	Orders,
} from "../pages";
import { setLogin, setUser } from "../store/authSlice";
import { setCart } from "../store/cartSlice";
import { addProduct } from "../store/productSlice";
import AdminRouter from "./AdminRouter";
import PrivateRoutes from "./PrivateRoutes";

const Router = () => {
	const dispatch = useDispatch();
	const id = useId();
	const location = useLocation();
	const locationArr = location.pathname?.split("/") ?? [];
	useEffect(() => {
		const getUser = async () => {
			try {
				const response = await API.me({});
				dispatch(setUser(response?.data));
				dispatch(setLogin(true));
				try {
					const cart = await API.getCart({ params: response.data._id });
					dispatch(setCart(cart.data.products));
				} catch (e) {}
			} catch (e) {
				dispatch(setUser({}));
				dispatch(setLogin(false));
			}
		};
		const getProductsFunc = async () => {
			try {
				const response = await API.getAllProduct({});
				dispatch(addProduct(response?.data?.products));
			} catch (e) {}
		};
		getUser();
		getProductsFunc();
	}, [dispatch]);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);
	return (
		<AnimatePresence mode="wait" initial={false}>
			{locationArr[1] !== "admin" && (
				<Header key={id + "-header"} activeShop={locationArr[1] === "shope"} />
			)}
			<Routes location={location} key={id}>
				<Route
					path="/admin/*"
					element={<PrivateRoutes element={<AdminRouter />} role="admin" />}
				/>
				<Route path="/" element={<Footer />}>
					<Route index element={<Home />} />
					<Route path="/shope" element={<Shope />} />
					<Route path="/Contact" element={<ContactUs />} />
					<Route path="/about" element={<AboutUs />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/Cart" element={<PrivateRoutes element={<Cart />} />} />
					<Route
						path="/orders"
						element={<PrivateRoutes element={<Orders />} />}
					/>
					<Route
						path="/wishlist"
						element={<PrivateRoutes element={<WishList />} />}
					/>
					<Route path="*" element={<PageNotFound />} />
				</Route>
				<Route path="/blog" element={<Blog />} />
				<Route path="/sale" element={<Sale />} />
			</Routes>
		</AnimatePresence>
	);
};

export default Router;
