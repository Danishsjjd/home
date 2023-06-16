import { Image } from "cloudinary-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

import { updateProfileApi } from "../../store/apiCall/authApi"
import { getUpdateProfile, getUser, setUpdateProfile } from "../../store/authSlice"
import Modal from "../Modal"
import Button from "../form/Button"
import ErrorMessage from "../form/ErrorMessage"
import Input from "../form/Input"

import { Formik } from "formik"
import * as Yup from "yup"

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
        if (extension === "jpeg" || extension === "png" || extension === "jpg") {
          setImage(reader.result)
          setFiledValue(e.target.name, reader.result)
        } else return toast.error("Only image is valid for profile")
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <Modal closeModal={closeModal} isOpen={isOpen} maxWidth={"max-w-lg"}>
      <div className="space-y-5 divide-y-2 divide-neutral-lighter">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ setFieldValue, errors, touched }) => {
            return (
              <>
                <div>
                  <label className="block text-center text-lg font-medium text-gray-700">Photo</label>
                  <div className="mt-1 flex flex-col items-center gap-3">
                    <div className="h-40 w-40 overflow-hidden rounded-full">
                      {user?.avatar?.public_id && image === null ? (
                        <Image
                          cloudName={import.meta.env.VITE_CLOUD_NAME}
                          publicId={user?.avatar?.public_id}
                          width="160"
                          height="160"
                          alt="user image"
                          className="h-full w-full"
                        />
                      ) : (
                        <img
                          src={image || user?.googleAvatar}
                          alt="user"
                          className={`h-full w-full bg-[#999] object-cover`}
                        />
                      )}
                    </div>
                    <button className="ml-5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:outline-secondary-darker focus:ring-2 focus:ring-offset-2">
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
                    <ErrorMessage err={errors["avatar"]} visible={touched["avatar"]} />
                  </div>
                </div>
                <div>
                  <h2 className="mb-1 mt-2 text-lg">Email (immutable)</h2>
                  <Input name="email" app type="email" value={user.email} disabled />
                </div>
                <div>
                  <h2 className="mb-1 mt-2 text-lg">username</h2>
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
