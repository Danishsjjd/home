import { AnimatePresence } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { PageNotFound } from "../components";
import { Footer, Header } from "../layout";
import {
  AboutUs,
  Blog,
  Cart,
  ContactUs,
  Home,
  Orders,
  Product,
  Sale,
  Shope,
  WishList,
} from "../pages";
import { getUserApi } from "../store/apiCall/authApi";
import { getProductsApi } from "../store/apiCall/productApi";
import AdminRouter from "./AdminRouter";
import PrivateRoutes from "./PrivateRoutes";

const Router = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const id = useId();
  const location = useLocation();
  const locationArr = location.pathname?.split("/") ?? [];
  useEffect(() => {
    getUserApi();
    getProductsApi();
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveIndex(null);
  }, [location.pathname]);
  return (
    <AnimatePresence mode="wait" initial={false}>
      {locationArr[1] !== "admin" && (
        <Header
          key={id + "-header"}
          activeShop={locationArr[1] === "shope"}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
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
