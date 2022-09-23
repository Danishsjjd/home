import { toast } from "react-toastify";

import store from "../../config/store";
import { API } from "../../libs/axios";
import { setDialog } from "../authSlice";
import { addProduct } from "../productSlice";

const { dispatch } = store;

export const createReviewApi = async (
  { data, setProduct, user },
  resetForm
) => {
  if (Object.keys(user).length === 0) return dispatch(setDialog(true));
  try {
    const newReview = await API.createAndUpdateReview({ data });
    toast.success(newReview.data.message);
    setProduct && setProduct(newReview.data.updatedProduct);
    resetForm && resetForm();
  } catch (e) {
    toast.error(e?.response?.data?.message || e.message);
  }
};

export const toggleReviewLikeApi = async ({
  revId,
  setProduct,
  user,
  reviews,
}) => {
  if (Object.keys(user).length === 0) return dispatch(setDialog(true));
  try {
    const response = await API.toggleLikeReview({
      data: { authorEmail: user.email, revId },
    });
    const updatedReviews = reviews.map((review) => {
      if (review._id === response.data.review._id) {
        return { ...review, likes: response.data.review.likes };
      }
      return review;
    });
    setProduct((pre) => ({ ...pre, reviews: updatedReviews }));
  } catch (e) {
    toast.error(e?.response?.data?.message || e.message);
  }
};

export const deleteReviewApi = async (productId, revId, setProduct) => {
  try {
    const response = await API.deleteReview({
      query: `productId=${productId}&id=${revId}`,
    });
    setProduct(response.data.updatedProduct);
  } catch (e) {
    toast.error(e?.response?.data?.message || e.message);
  }
};

export const getProductsApi = async () => {
  try {
    const response = await API.getAllProduct({});
    dispatch(addProduct(response?.data?.products));
  } catch (e) {}
};
