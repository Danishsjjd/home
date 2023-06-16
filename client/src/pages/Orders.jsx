import { Image } from "cloudinary-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import { ReactComponent as CartImg } from "../assets/icons/cart_center.svg"
import ordersBg from "../assets/images/orders-bg.jpg"
import { Button } from "../components"
import LoadingDialog from "../components/LoadingDialog"
import { API } from "../libs/axios"
import { getUser } from "../store/authSlice"
import MetaData from "../utils/MetaData"
import MountTransition from "../utils/MountTransition"

const Orders = () => {
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState(null)
  const user = useSelector(getUser)

  useEffect(() => {
    const getUserOrders = async () => {
      try {
        const response = await API.getUserOrder({})
        setOrders(response.data)
        setLoading(false)
      } catch (e) {
        toast.error(e?.response?.data?.message || e.message)
        setLoading(false)
      }
    }
    getUserOrders()
  }, [user._id])

  return (
    <MountTransition>
      <MetaData title={"Orders"} />
      {orders?.length > 0 ? (
        <div className="max-w-7xl md:min-h-[calc(422px-100%)] min-h-[calc(924px-100%)] mx-auto mt-20 px-3 relative overflow-hidden">
          <img
            src={ordersBg}
            alt="orders"
            className="absolute inset-0 min-h-[1000px] -z-10 opacity-5 w-full h-full"
          />
          <h1 className="text-4xl font-medium pt-4 pb-2">
            Orders History ({orders.length})
          </h1>
          <div className="mt-2">
            <p className="text-lg">
              <strong>Note:</strong> Product with red title is{" "}
              <span className="text-red-700 font-medium">Deleted</span> and the
              price maybe changed since you buy this product
            </p>
          </div>
          {orders.map((order) => {
            return (
              <div className="flex flex-col-reverse lg:grid grid-cols-4 gap-6 mt-6">
                <div className="col-span-3 w-full ">
                  <div className="overflow-x-auto w-full">
                    <table className="table-fixed w-full border-collapse rounded min-w-[440px]">
                      <thead className="text-neutral-darker border-1 border-neutral-lighter !font-normal">
                        <tr>
                          <th className="p-2">Product</th>
                          <th></th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {order.products.map(({ productId, quantity }) => {
                          return (
                            <tr
                              key={productId._id}
                              className="border-1 border-neutral-lighter"
                            >
                              <td colSpan={2}>
                                <div className="flex items-center space-x-3 text-left p-4">
                                  <div>
                                    <Link
                                      to={`/product/${productId._id}`}
                                      className="avatar block"
                                    >
                                      <div className="mask mask-squircle w-20 h-20">
                                        <Image
                                          cloudName={
                                            import.meta.env.VITE_CLOUD_NAME
                                          }
                                          alt="item pic"
                                          className="w-full object-cover"
                                          width="80"
                                          height="80"
                                          publicId={
                                            productId.images[0].public_id
                                          }
                                        />
                                      </div>
                                    </Link>
                                  </div>
                                  <div
                                    className={`${
                                      productId?.isDeleted ? "text-red-700" : ""
                                    }`}
                                  >
                                    <Link
                                      to={`/product/${productId._id}`}
                                      className="block space-y-1"
                                    >
                                      <div className="font-bold line-clamp-1">
                                        {productId.title}
                                      </div>
                                      <div className="text-sm opacity-50 line-clamp-1">
                                        Category: {productId.category}
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                              </td>
                              <td className="">
                                <span className="max-w-[60px] lg:max-w-[150px] mx-auto rounded-full border-1 border-neutral-lighter py-2 px-3 flex text-neutral-darker font-bold">
                                  <input
                                    type="number"
                                    className="max-w-[60px] lg:max-w-[150px] w-full text-center focus:outline-none outline-none border-none focus:border-none focus:ring-0"
                                    placeholder="1"
                                    value={quantity}
                                    min={1}
                                    max={productId.inStock}
                                    disabled
                                  />
                                </span>
                              </td>
                              <td className="text-lg font-medium space-y-2">
                                <span>Price: ${productId.price}</span>
                                <br />
                                <span>
                                  Total: $
                                  {productId?.offerPrice < 1
                                    ? Number(productId.price) * quantity
                                    : Number(productId.offerPrice) * quantity}
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-white">
                  <div className="border-neutral-lighter border-1 divide-y-2 rounded divide-neutral-lighter p-2">
                    <div className="p-2 space-y-3">
                      <h2 className="font-medium text-lg mb-2">Summery</h2>
                      <div className="flex justify-between">
                        <p className="text-neutral-darker">Status</p>
                        <p className="font-medium">{order.status}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-neutral-darker">Shipping</p>
                        <p className="font-medium">Free</p>
                      </div>
                    </div>
                    <div className="p-2 space-y-3">
                      <h2 className="font-medium text-lg mb-2">Address</h2>
                      <div className="flex justify-between">
                        <p className="text-neutral-darker">City</p>
                        <p className="font-medium">{order.address.city}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-neutral-darker">Country</p>
                        <p className="font-medium">{order.address.country}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-neutral-darker">House</p>
                        <p className="font-medium">{order.address.town}</p>
                      </div>
                    </div>
                    <div className="p-2 space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Total</span>
                        <h3 className="font-bold text-lg">${order.amount}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : loading ? (
        <LoadingDialog loading={loading} />
      ) : (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="max-w-lg w-full space-y-4 mx-auto grid place-items-center">
            <CartImg />
            <p className="font-medium text-lg">Your Don't buy any stuff</p>
            <Link to="/shope" className="block">
              <Button app>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      )}
    </MountTransition>
  )
}

export default Orders
