import { toast } from "react-toastify"

import { API } from "../../libs/axios"
import {
  setDialog,
  setForgetDialog,
  setLogin,
  setRestDialog,
  setUpdatePassword,
  setUpdateProfile,
  setUser,
} from "../authSlice"
import { setCart } from "../cartSlice"
import store from "../configureStore"

const { dispatch } = store

// password
export const updatePasswordApi = async (values, resetForm) => {
  try {
    const response = await API.updatePassword({ data: values })
    dispatch(setUpdatePassword(false))
    toast.success(response.data.message)
    resetForm && resetForm()
  } catch (e) {
    toast.error(e?.response?.data?.message || e?.message)
  }
}

export const forgetPasswordApi = async (values, resetForm) => {
  try {
    const response = await API.forgetPassword({ data: values })
    dispatch(setForgetDialog(false))
    toast.success(response.data.message)
    resetForm && resetForm()
  } catch (e) {
    toast.error(e?.response?.data?.message || e?.message)
  }
}

export const resetPasswordApi = async ({ values, token }, resetForm) => {
  try {
    const response = await API.resetPassword({ data: values, params: token })
    dispatch(setRestDialog(false))
    toast.success(response.data.message)
    resetForm && resetForm()
  } catch (e) {
    toast.error(e?.response?.data?.message || e?.message)
  }
}

export const signInSignUpApi = async ({ values, haveAccount = false, agreeTerms }, resetForm) => {
  try {
    let user
    if (haveAccount) {
      user = await API.login({
        data: {
          password: values.password,
          email: values.email,
        },
      })
    } else {
      if (!agreeTerms) return toast.error("Please agree to our terms and condition")
      user = await API.signUp({ data: values })
    }
    localStorage.setItem("x-auth-token", user.headers["x-auth-token"])
    dispatch(setUser(user?.data))
    dispatch(setLogin(true))
    dispatch(setDialog(false))
    resetForm && resetForm()
  } catch (ex) {
    toast.error(ex?.response?.data?.message || "request not properly send")
    dispatch(setUser({}))
    dispatch(setLogin(false))
  }
}
export const logoutApi = async () => {
  try {
    await API.logout({})
  } finally {
    localStorage.clear()
    dispatch(setUser({}))
    dispatch(setLogin(false))
    dispatch(setCart([]))
  }
}
// profile update
export const updateProfileApi = async (values, resetForm) => {
  try {
    const response = await API.UpdateProfile({ data: values })
    toast.success(response.data.message)
    resetForm && resetForm()
    dispatch(setUser(response.data.updatedUser))
    dispatch(setUpdateProfile(false))
  } catch (e) {
    toast.error(e?.response?.data?.message || e?.message)
  }
}

export const updateWishListAPI = async (user, product) => {
  if (Object.keys(user).length < 1) return dispatch(setDialog(true))
  const isInWishList = user.wishlist.find((wishes) => wishes._id === product._id)
  if (!isInWishList) {
    try {
      const response = await API.updateWishList({ data: product })
      toast.success(response.data.message)
      dispatch(setUser({ ...user, wishlist: [...user.wishlist, product] }))
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message)
    }
  } else {
    try {
      const response = await API.removeItemFromWishList({ data: product })
      toast.success(response.data.message)
      const updatedWishlist = user.wishlist.filter((wishes) => {
        return wishes._id !== product._id
      })
      dispatch(setUser({ ...user, wishlist: [...updatedWishlist] }))
    } catch (e) {
      toast.error(e?.response?.data?.message || e.message)
    }
  }
}

export const getUserApi = async (setLoading) => {
  try {
    const response = await API.me({})
    dispatch(setUser(response?.data))
    dispatch(setLogin(true))
    try {
      const cart = await API.getCart({})
      dispatch(setCart(cart.data.products))
    } catch (e) {}
  } catch (e) {
    dispatch(setUser({}))
    dispatch(setLogin(false))
  } finally {
    setLoading(false)
  }
}
