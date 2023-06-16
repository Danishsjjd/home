import { Image } from "cloudinary-react"
import { Formik } from "formik"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import * as Yup from "yup"

import { updateProfileApi } from "../../store/apiCall/authApi"
import {
  getUpdateProfile,
  getUser,
  setUpdateProfile,
} from "../../store/authSlice"
import Button from "../form/Button"
import ErrorMessage from "../form/ErrorMessage"
import Input from "../form/Input"
import Modal from "../Modal"

export default function UpdateProfile() {
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)

  const user = useSelector(getUser)
  const isOpen = useSelector(getUpdateProfile)

  const closeModal = () => {
    dispatch(setUpdateProfile(false))
  }

  const validationSchema = Yup.object().shape({
    avatar: Yup.string(),
    username: Yup.string(),
  })
  const initialValues = {
    avatar: "",
    username: user.username,
  }

  const onSubmit = (values, { resetForm }) => {
    updateProfileApi(values, resetForm)
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
        } else return toast.error("Only image is valid for profile")
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <Modal closeModal={closeModal} isOpen={isOpen} maxWidth={"max-w-lg"}>
      <div className="divide-y-2 space-y-5 divide-neutral-lighter">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, errors, touched }) => {
            return (
              <>
                <div>
                  <label className="block text-lg font-medium text-gray-700 text-center">
                    Photo
                  </label>
                  <div className="mt-1 flex items-center flex-col gap-3">
                    <div className="w-40 h-40 rounded-full overflow-hidden">
                      {user?.avatar?.public_id && image === null ? (
                        <Image
                          cloudName={import.meta.env.VITE_CLOUD_NAME}
                          publicId={user?.avatar?.public_id}
                          width="160"
                          height="160"
                          alt="user image"
                          className="w-full h-full"
                        />
                      ) : (
                        <img
                          src={image || user?.googleAvatar}
                          alt="user"
                          className={`w-full h-full object-cover bg-[#999]`}
                        />
                      )}
                    </div>
                    <button className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:outline-secondary-darker">
                      <label htmlFor="userAvatar">Upload</label>
                    </button>
                    <input
                      type="file"
                      name="avatar"
                      id="userAvatar"
                      className="hidden"
                      onChange={(e) => onImageChange(e, setFieldValue)}
                      accept="image/png, image/jpeg"
                    />
                    <ErrorMessage
                      err={errors["avatar"]}
                      visible={touched["avatar"]}
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg mb-1 mt-2">Email (immutable)</h2>
                  <Input
                    name="email"
                    app
                    type="email"
                    value={user.email}
                    disabled
                  />
                </div>
                <div>
                  <h2 className="text-lg mb-1 mt-2">username</h2>
                  <Input name="username" app type="text" />
                </div>
                <Button app>Update Profile!</Button>
              </>
            )
          }}
        </Formik>
      </div>
    </Modal>
  )
}
