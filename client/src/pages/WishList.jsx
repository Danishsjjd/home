import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import MetaData from "../utils/MetaData"
import MountTransition from "../utils/MountTransition"

import { ReactComponent as CartImg } from "../assets/icons/cart_center.svg"
import { Card } from "../components"
import { Button } from "../components"
import { getUser } from "../store/authSlice"

const WishList = () => {
  const wishlist = useSelector(getUser)?.wishlist
  return (
    <MountTransition>
      <MetaData title={"Wishlist"} />
      {wishlist.length > 0 ? (
        <div className="mx-auto mt-20 max-w-6xl px-3 sm:px-5 lg:px-0">
          <h1 className="mb-4 text-3xl font-bold">WishList</h1>
          <div className="lg:col-span-3">
            <div className="block grid-cols-2 gap-6 sm:grid md:grid-cols-3">
              {wishlist.map((product) => {
                return (
                  <Card
                    key={product?._id}
                    id={product?._id}
                    description={product?.description}
                    image={product?.images[0]?.url}
                    price={product?.price}
                    offerPrice={product?.offerPrice}
                    rating={product?.ratings}
                    title={product?.title}
                    category={product?.category}
                    reviews={product?.reviews}
                    grid={true}
                    isDeleted={product?.isDeleted}
                  />
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          <div className="mx-auto grid w-full max-w-lg place-items-center space-y-4">
            <CartImg />
            <p className="text-lg font-medium">Your WishList is empty</p>
            <Link to="/shope" className="block">
              <Button app>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      )}
    </MountTransition>
  )
}

export default WishList
