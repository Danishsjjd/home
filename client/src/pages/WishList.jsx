import React from "react";
import { useSelector } from "react-redux";

import { getUser } from "../store/authSlice";
import { Card } from "../components";
import { Button } from "../components";
import { ReactComponent as CartImg } from "../assets/icons/cart_center.svg";
import { Link } from "react-router-dom";
import MountTransition from "../utils/MountTransition";
import MetaData from "../utils/MetaData";

const WishList = () => {
  const wishlist = useSelector(getUser)?.wishlist;
  return (
    <MountTransition>
      <MetaData title={"Wishlist"} />
      {wishlist.length > 0 ? (
        <div className="mt-20 max-w-6xl mx-auto lg:px-0 sm:px-5 px-3">
          <h1 className="text-3xl font-bold mb-4">WishList</h1>
          <div className="lg:col-span-3">
            {/* Replace with your content */}
            <div className="sm:grid block grid-cols-2 md:grid-cols-3 gap-6">
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
                  />
                );
              })}
            </div>
            {/* /End replace */}
          </div>
        </div>
      ) : (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="max-w-lg w-full space-y-4 mx-auto grid place-items-center">
            <CartImg />
            <p className="font-medium text-lg">Your WishList is empty</p>
            <Link to="/shope" className="block">
              <Button title="Continue Shopping" app />
            </Link>
          </div>
        </div>
      )}
    </MountTransition>
  );
};

export default WishList;
