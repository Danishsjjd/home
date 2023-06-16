import { Image } from "cloudinary-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import StripeCheckout from "react-stripe-checkout"
import { toast } from "react-toastify"

import MetaData from "../../utils/MetaData"
import MountTransition from "../../utils/MountTransition"

import LoadingDialog from "../../components/LoadingDialog"

import { ReactComponent as CartImg } from "../../assets/icons/cart_center.svg"
import { ReactComponent as IcClose } from "../../assets/icons/ic-close.svg"
import MasterCard from "../../assets/icons/social/MasterCard.png"
import Visa from "../../assets/icons/social/Visa.png"
import HomeLogo from "../../assets/logo-black.svg"
import { Button, Input } from "../../components"
import { createOrderFromCartApi, removeProductCartApi } from "../../store/apiCall/cartApi"
import { getCart } from "../../store/cartSlice"

import { Form, Formik } from "formik"

const Cart = () => {
  const [loading, setLoading] = useState(false)
  const [haveDeletedProducts, setHaveDeletedProducts] = useState([])
  const cart = useSelector(getCart)
  const totalPrice = cart
    .map(({ productId, quantity }) => {
      const { price, offerPrice } = productId
      if (offerPrice > 0) return offerPrice * quantity
      return price * quantity
    })
    .reduce((acc, cur) => {
      return (acc += cur)
    }, 0)
  const subtotalPrice = cart
    .map(({ productId, quantity }) => {
      const { price } = productId
      return price * quantity
    })
    .reduce((acc, cur) => {
      return (acc += cur)
    }, 0)

  const onToken = async (token) => {
    createOrderFromCartApi(setLoading, token)
  }

  const rows = []

  cart.forEach(({ productId, quantity }) => {
    const isDeleted = productId?.isDeleted
    rows.push(
      <tr key={productId._id} className="border-1 border-neutral-lighter">
        <td colSpan={2}>
          <div className="flex items-center space-x-3 p-4 text-left">
            <span
              className="cursor-pointer p-2 text-gray-400 hover:text-gray-500"
              onClick={() => removeProductCartApi(cart, productId._id)}
            >
              <IcClose className="text-neutral-darker" />
            </span>
            <div>
              <Link to={`/product/${productId._id}`} className="avatar block">
                <div className="mask mask-squircle h-20 w-20">
                  <Image
                    cloudName={import.meta.env.VITE_CLOUD_NAME}
                    alt="item pic"
                    className="w-full object-cover"
                    width="80"
                    height="80"
                    publicId={productId.images[0].public_id}
                  />
                </div>
              </Link>
            </div>
            <div className={isDeleted ? "text-red-700" : ""}>
              <Link to={`/product/${productId._id}`} className="block space-y-1">
                <div className="font-bold line-clamp-1">
                  {isDeleted && "(Deleted)"} {productId.title}
                </div>
                <div className="text-sm opacity-50 line-clamp-1">Category: {productId.category}</div>
              </Link>
            </div>
          </div>
        </td>
        <td className="">
          <span className="mx-auto flex max-w-[60px] rounded-full border-1 border-neutral-lighter px-3 py-2 font-bold text-neutral-darker lg:max-w-[150px]">
            <input
              type="number"
              className="w-full max-w-[60px] border-none text-center outline-none focus:border-none focus:outline-none focus:ring-0 lg:max-w-[150px]"
              placeholder="1"
              value={quantity}
              min={1}
              max={productId.inStock}
              disabled
            />
          </span>
        </td>
        <td className="space-y-2 text-lg font-medium">
          <span>Price: ${productId.price}</span>
          <br />
          <span>
            Total: $
            {productId?.offerPrice < 1 ? Number(productId.price) * quantity : Number(productId.offerPrice) * quantity}
          </span>
        </td>
      </tr>
    )
  })

  useEffect(() => {
    setHaveDeletedProducts([])
    cart.forEach(({ productId }) => {
      if (productId.isDeleted) setHaveDeletedProducts((pre) => [...pre, productId._id])
    })
  }, [cart])

  return (
    <MountTransition>
      <MetaData title={"Cart"} />
      {loading ? <LoadingDialog loading={loading} /> : null}
      {cart.length > 0 ? (
        <div className="mx-auto mt-20 min-h-[calc(924px-100%)] max-w-7xl px-3 md:min-h-[calc(422px-100%)]">
          <h1 className="pb-2 pt-4 text-4xl font-medium">Shopping Cart ({cart.length})</h1>
          {haveDeletedProducts.length > 0 && (
            <div className="mt-2">
              <p className="text-lg">
                <strong>Note:</strong> Product with red title is{" "}
                <span className="font-medium text-red-700">Deleted</span> you can remove it from your cart
              </p>
            </div>
          )}
          <div className="mt-6 flex grid-cols-4 flex-col-reverse gap-6 lg:grid">
            <div className="col-span-3 w-full ">
              <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[440px] table-fixed border-collapse rounded">
                  <thead className="border-1 border-neutral-lighter !font-normal text-neutral-darker">
                    <tr>
                      <th className="p-2">Product</th>
                      <th></th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody className="text-center"> {rows} </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white">
              <div className="divide-y-2 divide-neutral-lighter rounded border-1 border-neutral-lighter p-2">
                <div className="space-y-3 p-2">
                  <h2 className="mb-2 text-lg font-medium">Summery</h2>
                  <div className="flex justify-between">
                    <p className="text-neutral-darker">Subtotal</p>
                    <p className="font-medium">${subtotalPrice}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-neutral-darker">Shipping</p>
                    <p className="font-medium">Free</p>
                  </div>
                </div>
                <div className="space-y-1 p-2">
                  <span className="text-lg font-medium">Discount Code</span>
                  <Formik initialValues={{ coupon: "" }}>
                    <Form className="flex gap-1">
                      <Input placeholder="Enter coupon" name="coupon" />
                      <Button app>Apply</Button>
                    </Form>
                  </Formik>
                </div>
                <div className="space-y-3 p-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <h3 className="text-lg font-bold">${totalPrice}</h3>
                  </div>
                  <Button
                    className="bg-neutral-darkest text-center text-white hover:bg-neutral-darker lg:w-full [&>*]:block [&>*]:w-full"
                    onClick={() => {
                      if (haveDeletedProducts.length > 0) return toast.error("Please remove deleted Products first")
                    }}
                  >
                    <StripeCheckout
                      name="Home"
                      image={HomeLogo}
                      billingAddress
                      shippingAddress
                      description={`Total $${totalPrice}`}
                      amount={totalPrice * 100}
                      token={onToken}
                      stripeKey={import.meta.env.VITE_STRIPE_TOKEN}
                      disabled={haveDeletedProducts.length > 0}
                    >
                      Proceed to Checkout
                    </StripeCheckout>
                  </Button>
                  <div className="flex justify-center gap-1 sm:gap-5">
                    <img
                      src={Visa}
                      alt="visa"
                      className="object-contain grayscale transition-all duration-500 hover:grayscale-0 sm:w-10"
                    />
                    <img
                      src={MasterCard}
                      alt="master card"
                      className="object-contain grayscale transition-all duration-500 hover:grayscale-0 sm:w-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          <div className="mx-auto grid w-full max-w-lg place-items-center space-y-4">
            <CartImg />
            <p className="text-lg font-medium">Your shopping cart is empty</p>
            <Link to="/shope" className="block">
              <Button app>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      )}
    </MountTransition>
  )
}

export default Cart
