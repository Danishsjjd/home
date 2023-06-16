import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import * as Yup from "yup"

import { signInSignUpApi } from "../../store/apiCall/authApi"
import { getDialog, setDialog, setForgetDialog } from "../../store/authSlice"

const useSignUpLogin = () => {
  const dispatch = useDispatch()

  const isOpen = useSelector(getDialog)
  const [image, setImage] = useState(null)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [haveAccount, setHaveAccount] = useState(false)

  const signUpValidation = Yup.object().shape({
    avatar: Yup.string().required(),
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().min(8).required().label("Password"),
    username: Yup.string().min(5).max(25).required().label("Username"),
  })

  const loginValidation = Yup.object().shape({
    email: Yup.string().email().min(5).max(25).required().label("Email"),
    password: Yup.string().min(8).required().label("Password"),
  })

  const initialData = {
    avatar: "",
    email: "",
    password: "",
    username: "",
  }

  const onSubmit = (values, { resetForm }) => {
    signInSignUpApi({ values, haveAccount, agreeTerms }, resetForm)
  }
  const closeModal = () => {
    dispatch(setDialog(false))
  }

  const onImageChange = (e, setFiledValue) => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = () => {
      const extension = reader.result?.split(";")[0]?.split("/")[1]
      if (reader.readyState === 2) {
        if (
          extension === "jpeg" ||
          extension === "png" ||
          extension === "jpg"
        ) {
          setImage(reader.result)
          setFiledValue(e.target.name, reader.result)
        } else return toast.error("Only image is valid for profile pic")
      }
    }
    reader.readAsDataURL(file)
  }
  const googleLogin = () => {
    window.open(import.meta.env.VITE_SERVER_URL + "users/google", "_self")
  }
  const forgetPassword = async () => {
    dispatch(setForgetDialog(true))
  }
  return {
    haveAccount,
    setHaveAccount,
    onSubmit,
    initialData,
    signUpValidation,
    loginValidation,
    closeModal,
    isOpen,
    onImageChange,
    image,
    setAgreeTerms,
    googleLogin,
    forgetPassword,
  }
}

export default useSignUpLogin
