import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";

import { ReactComponent as FireIcon } from "../assets/icons/fire.svg";
import { ReactComponent as HeartIcon } from "../assets/icons/header/heart.svg";
import { ReactComponent as FBIcon } from "../assets/icons/social/ic-facebook.svg";
import { ReactComponent as InstaIcon } from "../assets/icons/social/ic-instagram.svg";
import { ReactComponent as TwitterIcon } from "../assets/icons/social/ic-twitter.svg";
import HomeLogo from "../assets/logo-black.svg";
import { Button, PageNotFound, Reviews, Slider } from "../components";
import LoadingDialog from "../components/LoadingDialog";
import { API } from "../libs/axios";
import { updateWishListAPI } from "../store/apiCall/authApi";
import { addToCartApi } from "../store/apiCall/cartApi";
import { getUser } from "../store/authSlice";
import { getCart } from "../store/cartSlice";
import MetaData from "../utils/MetaData";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toCart, setToCart] = useState(0);
  const [isWishList, setIsWishList] = useState(false);
  const user = useSelector(getUser);
  const cart = useSelector(getCart);
  const toggleWishList = () => {
    updateWishListAPI(user, product);
  };
  const addToCart = () => {
    addToCartApi(user, product, cart, toCart);
  };
  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetchProduct = await API.getSingleProduct({ params: id });
        setProduct(fetchProduct.data.product);
      } catch (e) {
        toast.error(e?.response?.data?.message || e.message);
      }
      setLoading(false);
    };
    getProduct();
  }, [id]);
  useEffect(() => {
    if (Object.keys(user).length > 0 && product !== null) {
      const inWishlist = user.wishlist.find(
        (wishes) => wishes?._id === product._id
      );
      if (inWishlist) setIsWishList(true);
      else setIsWishList(false);
    } else {
      setIsWishList(false);
    }
  }, [user, product, user.wishlist]);
  useEffect(() => {
    if (cart.length > 0 && product) {
      const search = cart.find(
        (singleProduct) => singleProduct.productId._id === product._id
      );
      if (search) {
        setToCart(search?.quantity);
      } else {
        setToCart(product.inStock ? 1 : 0);
      }
    }
  }, [product, cart]);
  const onToken = async (token) => {
    setLoading(true);
    try {
      await API.buySingleProductOrder({
        data: {
          token: token,
          amount: product.price * 100,
          userId: user._id,
          productId: product._id,
        },
      });
      setProduct({ ...product, inStock: product.inStock - 1 });
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message);
    } finally {
      setLoading(false);
    }
  };
  return loading ? (
    <LoadingDialog loading={loading} className="bg-white" />
  ) : product ? (
    <div className="">
      <MetaData title={product.title} />
      <div className="h-14 bg-neutral-lightest text-neutral-darker flex items-center mt-16 ">
        <div className="flex max-w-7xl mx-auto flex-1">
          <span className="px-4">
            Home &gt; {product.category} &gt; {product.title}
          </span>
        </div>
      </div>
      <div className="mt-6 max-w-7xl mx-auto lg:p-0 px-2">
        <div className="md:grid grid-cols-2 gap-3 items-start ">
          <Slider slides={product.images} />
          <div className="space-y-6 sticky top-16 right-0 bg-white pt-3">
            <h1 className="text-3xl font-medium text-neutral-darkest">
              {product.title}
            </h1>
            <div className="flex justify-between ">
              <div>
                <div className="text-4xl text-secondary-darkest font-bold flex gap-3 items-baseline">
                  {Number(product.offerPrice) === 0 ? (
                    "$" + product.price
                  ) : (
                    <span className="">${product.offerPrice}</span>
                  )}
                  {Number(product.offerPrice) === 0 ? null : (
                    <span className="line-through text-xl text-neutral-grey">
                      ${product.price}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                {product.inStock > 0 ? (
                  <>
                    <FireIcon />
                    <span className="text-accent-red ">
                      IN STOCK {product.inStock}
                    </span>
                  </>
                ) : (
                  <span>Not Available</span>
                )}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-neutral-darker ">{product.description}</p>
              <div className="flex gap-3 items-center">
                <div className="flex items-center gap-5">
                  <span className="text-lg hidden sm:inline">quantity</span>
                  <span className="rounded-full border-1 border-gray-200 py-2 px-3 flex text-neutral-darker font-bold">
                    <span
                      className="text-4xl select-none cursor-pointer"
                      onClick={() =>
                        setToCart((pre) => {
                          if (pre >= product.inStock) return product.inStock;
                          if (!product.inStock) return 0;
                          else return ++pre;
                        })
                      }
                    >
                      +
                    </span>
                    <input
                      type="number"
                      className="max-w-[60px] lg:max-w-[150px] text-center focus:outline-none outline-none border-none focus:border-none focus:ring-0"
                      placeholder="1"
                      value={toCart}
                      min={0}
                      max={product.inStock}
                      onChange={(e) => setToCart(e.target.value)}
                    />
                    <span
                      className="text-4xl select-none cursor-pointer"
                      onClick={() =>
                        setToCart((pre) => {
                          if (pre < 1) return 0;
                          else return --pre;
                        })
                      }
                    >
                      -
                    </span>
                  </span>
                </div>
                <Button
                  app
                  title="Add to Cart"
                  ClassName="flex-1"
                  onClick={() => addToCart()}
                />
                <div
                  className="flex rounded-full w-12 h-12 border-gray-400 items-center justify-center border-1 cursor-pointer"
                  onClick={() => toggleWishList()}
                >
                  <HeartIcon
                    className={`${isWishList ? "fill-red-600" : ""}`}
                  />
                </div>
              </div>
            </div>

            <Button
              title={
                <StripeCheckout
                  name="Home"
                  image={HomeLogo}
                  billingAddress
                  shippingAddress
                  description={`Total $${product.price}`}
                  amount={product.price * 100}
                  token={onToken}
                  stripeKey={process.env.REACT_APP_STRIPE_TOKEN}
                >
                  Buy it now!
                </StripeCheckout>
              }
              ClassName="w-full [&>*]:block bg-accent-green hover:!bg-opacity-75"
            />

            <div className="flex items-center gap-2 flex-col sm:flex-row">
              <span className="text-xl font-medium">share</span>
              <a
                className="p-2 text-center gap-1 bg-blue-700/25 text-blue-700 rounded-md flex"
                href="https://facebook.com/danishsjjd"
                target={"_blank"}
                rel="noreferrer"
              >
                <FBIcon />
                <span>facebook</span>
              </a>
              <a
                className="p-2 text-center gap-1 bg-red-700/25 text-red-700 rounded-md flex"
                href="https://instagram.com/danishsjjd"
                target={"_blank"}
                rel="noreferrer"
              >
                <InstaIcon />
                <span>Instagram</span>
              </a>
              <a
                className="p-2 text-center gap-1 bg-cyan-700/25 text-cyan-700  rounded-md flex"
                href="https://twitter.com/danishsjjd"
                target={"_blank"}
                rel="noreferrer"
              >
                <TwitterIcon />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Reviews
        reviews={product.reviews}
        ratings={product.ratings}
        productId={product._id}
        setProduct={setProduct}
        product={product}
      />
    </div>
  ) : (
    <PageNotFound />
  );
};

export default Product;
