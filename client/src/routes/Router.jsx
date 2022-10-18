import { AnimatePresence } from "framer-motion";
import { useEffect, useId, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

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
import { setDialog } from "../store/authSlice";
import AdminRouter from "./AdminRouter";
import PrivateRoutes from "./PrivateRoutes";

const Router = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const id = useId();

  const location = useLocation();
  const locationArr = location.pathname?.split("/") ?? [];

  const [searchParams] = useSearchParams();
  const err = searchParams.get("err");

  useEffect(() => {
    if (err === "emailExists") {
      toast.error("Email is already register through email password");
      dispatch(setDialog(true));
    }
  }, [dispatch, err]);

  useEffect(() => {
    getUserApi(setLoading);
  }, []);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {locationArr[1] !== "admin" && <Header key={id + "-header"} />}
      <Routes location={location} key={id}>
        <Route
          path="/admin/*"
          element={
            <PrivateRoutes
              element={<AdminRouter />}
              role="admin"
              loading={loading}
            />
          }
        />
        <Route path="/" element={<Footer />}>
          <Route index element={<Home />} />
          <Route path="/shope" element={<Shope />} />
          <Route path="/Contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/product/:id" element={<Product />} />
          {/* privates routes */}
          <Route element={<PrivateRoutes loading={loading} />}>
            <Route path="/Cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<WishList />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/blog" element={<Blog />} />
        <Route path="/sale" element={<Sale />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Router;
