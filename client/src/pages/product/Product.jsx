import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import React, { useEffect, useState } from "react"
import { BsFillTrashFill } from "react-icons/bs"
import { MdUpdate } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import StripeCheckout from "react-stripe-checkout"
import { toast } from "react-toastify"

import { ReactComponent as FireIcon } from "../../assets/icons/fire.svg"
import { ReactComponent as HeartIcon } from "../../assets/icons/header/heart.svg"
import { ReactComponent as FBIcon } from "../../assets/icons/social/ic-facebook.svg"
import { ReactComponent as InstaIcon } from "../../assets/icons/social/ic-instagram.svg"
import { ReactComponent as TwitterIcon } from "../../assets/icons/social/ic-twitter.svg"
import HomeLogo from "../../assets/logo-black.svg"
import { Button, PageNotFound } from "../../components"
import LoadingDialog from "../../components/LoadingDialog"
import { API } from "../../libs/axios"
import { updateWishListAPI } from "../../store/apiCall/authApi"
import { addToCartApi } from "../../store/apiCall/cartApi"
import { getUser, setDialog } from "../../store/authSlice"
import { getCart } from "../../store/cartSlice"
import MetaData from "../../utils/MetaData"
import { Rating, ReviewForm, Reviews, Slider } from "./components"

const Product = () => {
  const dispatch = useDispatch()

  const [total, setTotal] = useState(0)
  const [percentRating, setPercentRating] = useState(0)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toCart, setToCart] = useState(0)
  const [isWishList, setIsWishList] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()
  const user = useSelector(getUser)
  const cart = useSelector(getCart)

  const totalPrice =
    product?.offerPrice > 1 ? product?.offerPrice * 100 : product?.price * 100

  const toggleWishList = () => {
    updateWishListAPI(user, product)
  }
  const addToCart = () => {
    if (product?.isDeleted) return toast.error("This Product is deleted")
    addToCartApi(user, product, cart, toCart)
  }
  const onToken = async (token) => {
    if (product?.isDeleted) return toast.error("This Product is deleted")
    setLoading(true)
    try {
      await API.buySingleProductOrder({
        data: {
          token: token,
          productId: product._id,
        },
      })
      setProduct({ ...product, inStock: product.inStock - 1 })
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message)
    } finally {
      setLoading(false)
    }
  }
  const deleteProduct = async () => {
    // return setIsOpen(true);
    try {
      await API.deleteProduct({ params: product._id })
      navigate(-1)
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message)
    }
  }
  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetchProduct = await API.getSingleProduct({ params: id })
        setProduct(fetchProduct.data.product)
      } catch (e) {
        toast.error(e?.response?.data?.message || e.message)
      }
      setLoading(false)
    }
    getProduct()
  }, [id])
  useEffect(() => {
    if (Object.keys(user).length > 0 && product !== null) {
      const inWishlist = user.wishlist.find(
        (wishes) => wishes?._id === product._id
      )
      if (inWishlist) setIsWishList(true)
      else setIsWishList(false)
    } else {
      setIsWishList(false)
    }
  }, [user, product, user.wishlist])
  useEffect(() => {
    if (cart.length > 0 && product) {
      const search = cart.find(
        (singleProduct) => singleProduct.productId._id === product._id
      )
      if (search) {
        setToCart(search?.quantity)
      } else {
        setToCart(product.inStock ? 1 : 0)
      }
    }
  }, [product, cart])
  useEffect(() => {
    if (product) {
      let finalReview = 0
      product.reviews.forEach((review) => {
        finalReview += review.rating
      })
      setPercentRating(product.ratings * 20)
      setTotal(finalReview)
    }
  }, [product])
  return loading ? (
    <LoadingDialog loading={loading} className="bg-white" />
  ) : product ? (
    <div>
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
            <h1
              className={`text-3xl font-medium ${
                product.isDeleted
                  ? "text-red-700 line-through"
                  : "text-neutral-darkest"
              }`}
            >
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
                    {!product.isDeleted && <FireIcon />}
                    <span className="text-accent-red ">
                      {product.isDeleted
                        ? "Not Available"
                        : `IN STOCK ${product.inStock}`}
                    </span>
                  </>
                ) : (
                  <span>Not Available</span>
                )}
              </div>
            </div>
            <div className="space-y-3">
              <p
                className={`text-neutral-darker ${
                  product.isDeleted
                    ? "text-red-500 line-through"
                    : "text-neutral-darkest"
                }`}
              >
                {product.description}
              </p>
              <div className="flex gap-3 items-center">
                <div className="flex items-center gap-5">
                  <span className="text-lg hidden sm:inline">quantity</span>
                  <span className="rounded-full border-1 border-gray-200 py-2 px-3 flex text-neutral-darker font-bold">
                    <span
                      className="text-4xl select-none cursor-pointer"
                      onClick={() =>
                        setToCart((pre) => {
                          if (pre >= product.inStock) return product.inStock
                          if (!product.inStock) return 0
                          else return ++pre
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
                          if (pre < 1) return 0
                          else return --pre
                        })
                      }
                    >
                      -
                    </span>
                  </span>
                </div>
                <Button app className="flex-1" onClick={() => addToCart()}>
                  Add to Cart
                </Button>
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
              onClick={() => {
                if (!user.email) return dispatch(setDialog(true))
                if (product.isDeleted)
                  return toast.error("This Product is deleted")
              }}
              className="w-full [&>*]:block bg-accent-green hover:!bg-opacity-75"
            >
              <StripeCheckout
                name="Home"
                image={HomeLogo}
                billingAddress
                shippingAddress
                description={`Total $${totalPrice / 100}`}
                amount={totalPrice}
                token={onToken}
                stripeKey={import.meta.env.VITE_STRIPE_TOKEN}
                disabled={
                  user.email ? (product?.isDeleted ? true : false) : true
                }
              >
                Buy it now!
              </StripeCheckout>
            </Button>

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
            {user.role === "admin" && (
              <div className="flex gap-5">
                <Tooltip title="Delete">
                  <IconButton onClick={() => deleteProduct()}>
                    <BsFillTrashFill className="text-secondary-darker text-3xl" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title="Update"
                  onClick={() =>
                    navigate(`/admin/updateProduct/${product?._id}`)
                  }
                >
                  <IconButton>
                    <MdUpdate className="text-secondary-darker text-3xl" />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 lg:p-0 px-4">
        <Rating
          percentRating={percentRating}
          ratings={product?.ratings}
          reviews={product?.reviews}
          total={total}
        />
        {/* divider */}
        <div className="my-10 h-1 rounded bg-gray-200 w-full" />
        <div className="flex flex-col-reverse md:grid gap-8 grid-cols-3 items-start lg:px-0 px-1 sm:px-4">
          <Reviews
            reviews={product?.reviews}
            ratings={product?.ratings}
            productId={product?._id}
            setProduct={setProduct}
            product={product}
          />
          <ReviewForm
            user={user}
            productId={product?._id}
            setProduct={setProduct}
            isDeleted={product?.isDeleted}
          />
        </div>
      </div>
    </div>
  ) : (
    <PageNotFound />
  )
}

export default Product
