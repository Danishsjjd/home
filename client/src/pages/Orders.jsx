import { Image } from "cloudinary-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import MetaData from "../utils/MetaData"
import MountTransition from "../utils/MountTransition"

import LoadingDialog from "../components/LoadingDialog"

import { ReactComponent as CartImg } from "../assets/icons/cart_center.svg"
import ordersBg from "../assets/images/orders-bg.jpg"
import { Button } from "../components"
import { API } from "../libs/axios"
import { getUser } from "../store/authSlice"

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
        <div className="relative mx-auto mt-20 min-h-[calc(924px-100%)] max-w-7xl overflow-hidden px-3 md:min-h-[calc(422px-100%)]">
          <img src={ordersBg} alt="orders" className="absolute inset-0 -z-10 h-full min-h-[1000px] w-full opacity-5" />
          <h1 className="pb-2 pt-4 text-4xl font-medium">Orders History ({orders.length})</h1>
          <div className="mt-2">
            <p className="text-lg">
              <strong>Note:</strong> Product with red title is <span className="font-medium text-red-700">Deleted</span>{" "}
              and the price maybe changed since you buy this product
            </p>
          </div>
          {orders.map((order) => {
            return (
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
                      <tbody className="text-center">
                        {order.products.map(({ productId, quantity }) => {
                          return (
                            <tr key={productId._id} className="border-1 border-neutral-lighter">
                              <td colSpan={2}>
                                <div className="flex items-center space-x-3 p-4 text-left">
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
                                  <div className={`${productId?.isDeleted ? "text-red-700" : ""}`}>
                                    <Link to={`/product/${productId._id}`} className="block space-y-1">
                                      <div className="font-bold line-clamp-1">{productId.title}</div>
                                      <div className="text-sm opacity-50 line-clamp-1">
                                        Category: {productId.category}
                                      </div>
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
                  <div className="divide-y-2 divide-neutral-lighter rounded border-1 border-neutral-lighter p-2">
                    <div className="space-y-3 p-2">
                      <h2 className="mb-2 text-lg font-medium">Summery</h2>
                      <div className="flex justify-between">
                        <p className="text-neutral-darker">Status</p>
                        <p className="font-medium">{order.status}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-neutral-darker">Shipping</p>
                        <p className="font-medium">Free</p>
                      </div>
                    </div>
                    <div className="space-y-3 p-2">
                      <h2 className="mb-2 text-lg font-medium">Address</h2>
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
                    <div className="space-y-3 p-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Total</span>
                        <h3 className="text-lg font-bold">${order.amount}</h3>
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
        <div className="flex h-screen w-screen items-center justify-center">
          <div className="mx-auto grid w-full max-w-lg place-items-center space-y-4">
            <CartImg />
            <p className="text-lg font-medium">Your Don't buy any stuff</p>
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
