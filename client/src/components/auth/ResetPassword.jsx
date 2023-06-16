import { useDispatch, useSelector } from "react-redux"

import { resetPasswordApi } from "../../store/apiCall/authApi"
import { getRestDialog, setRestDialog } from "../../store/authSlice"
import Modal from "../Modal"
import Button from "../form/Button"
import Form from "../form/Form"
import Input from "../form/Input"

import * as Yup from "yup"

export default function ResetPassword({ token }) {
  const dispatch = useDispatch()
  const isOpen = useSelector(getRestDialog)
  const closeModal = () => {
    dispatch(setRestDialog(false))
  }

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(8).required().label("Password"),
    confirmPassword: Yup.string().min(8).required().label("Confirm Password"),
  })

  const initialValues = {
    password: "",
    confirmPassword: "",
  }

  const onSubmit = (values, { resetForm }) => {
    resetPasswordApi({ values, token }, resetForm)
  }

  return (
    <Modal closeModal={closeModal} isOpen={isOpen} zIndex={"z-30"} maxWidth="max-w-lg">
      <div className="space-y-5 divide-y-2 divide-neutral-lighter">
        <h2 className="py-2 text-center text-2xl font-bold">Update Password</h2>
        <Form initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <div>
            <h2 className="mb-1 mt-2 text-lg">New Password</h2>
            <Input name="password" app type="password" />
          </div>
          <div>
            <h2 className="mb-1 mt-2 text-lg">Confirm Password</h2>
            <Input name="confirmPassword" app type="password" />
          </div>
          <Button app>Reset Now!</Button>
        </Form>
      </div>
    </Modal>
  )
}
