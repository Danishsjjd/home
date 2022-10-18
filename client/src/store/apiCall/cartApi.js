import { toast } from "react-toastify";

import store from "../configureStore";
import { API } from "../../libs/axios";
import { setDialog } from "../authSlice";
import { setCart } from "../cartSlice";

const { dispatch } = store;

export const addToCartApi = async (user, product, cart, quantity) => {
  if (Object.keys(user).length < 1) return dispatch(setDialog(true));
  if (product.inStock < 1) return toast.error("product is not in stock");

  try {
    const updatedCart = await API.createCart({
      data: {
        productId: product._id,
        quantity: quantity.toString(),
      },
    });
    const search = cart.find(
      (singleProduct) => singleProduct.productId._id === product._id
    );
    let bucket;

    if (!search)
      bucket = [
        ...cart,
        { productId: product, quantity: updatedCart.data.quantity },
      ];
    else {
      bucket = cart.map(({ productId, quantity }) => {
        if (productId._id === product._id) {
          return { productId: product, quantity: updatedCart.data.quantity };
        }
        return { productId, quantity };
      });
    }
    dispatch(setCart(bucket));
    toast.success("Added to cart!");
  } catch (e) {
    toast.error(e?.response?.data?.message || e.message);
  }
};

export const createOrderFromCartApi = async (setLoading, token) => {
  setLoading(true);
  try {
    await API.createOrder({
      data: {
        token: token,
      },
    });
    dispatch(setCart([]));
  } catch (e) {
    toast.error(e?.response?.data?.message || e?.message);
  } finally {
    setLoading(false);
  }
};

export const removeProductCartApi = async (cart, productId) => {
  try {
    await API.deleteProductCart({
      data: { productId },
    });
    const bucket = cart.filter(
      (singleProduct) => singleProduct.productId._id !== productId
    );
    dispatch(setCart(bucket));
    toast.success("removed from cart!");
  } catch (e) {
    toast.error(e?.response?.data?.message || e.message);
  }
};
