import { useDispatch, useSelector } from "react-redux"

import { updatePasswordApi } from "../../store/apiCall/authApi"
import { getUpdatePassword, setUpdatePassword } from "../../store/authSlice"
import Modal from "../Modal"
import Button from "../form/Button"
import Form from "../form/Form"
import Input from "../form/Input"

import * as Yup from "yup"

export default function UpdatePassword() {
  const dispatch = useDispatch()
  const isOpen = useSelector(getUpdatePassword)
  const closeModal = () => {
    dispatch(setUpdatePassword(false))
  }

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().min(8).required().label("Old Password"),
    newPassword: Yup.string().min(8).required().label("New Password"),
    confirmPassword: Yup.string().min(8).required().label("Confirm Password"),
  })

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  }

  const onSubmit = (values, { resetForm }) => {
    updatePasswordApi(values, resetForm)
  }

  return (
    <Modal closeModal={closeModal} isOpen={isOpen} maxWidth={"max-w-lg"}>
      <div className="space-y-5 divide-y-2 divide-neutral-lighter">
        <h2 className="py-2 text-center text-2xl font-bold">Update Password</h2>
        <Form initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <div>
            <h2 className="mb-1 mt-2 text-lg">Old Password</h2>
            <Input name="oldPassword" app type="password" />
          </div>
          <div>
            <h2 className="mb-1 mt-2 text-lg">New Password</h2>
            <Input name="newPassword" app type="password" />
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
