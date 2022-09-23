import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { updatePasswordApi } from "../../store/apiCall/authApi";
import { getUpdatePassword, setUpdatePassword } from "../../store/authSlice";
import Button from "../Button";
import Input from "../form/Input";
import Modal from "../Modal";

export default function UpdatePassword() {
  const dispatch = useDispatch();
  const isOpen = useSelector(getUpdatePassword);
  const closeModal = () => {
    dispatch(setUpdatePassword(false));
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().min(8).required().label("Old Password"),
    newPassword: Yup.string().min(8).required().label("New Password"),
    confirmPassword: Yup.string().min(8).required().label("Confirm Password"),
  });

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const onSubmit = (values, { resetForm }) => {
    updatePasswordApi(values, resetForm);
  };

  return (
    <Modal closeModal={closeModal} isOpen={isOpen} maxWidth={"max-w-lg"}>
      <div className="divide-y-2 space-y-5 divide-neutral-lighter">
        <h2 className="text-center py-2 text-2xl font-bold">Update Password</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit }) => {
            return (
              <>
                <div>
                  <h2 className="text-lg mb-1 mt-2">Old Password</h2>
                  <Input name="oldPassword" app type="password" />
                </div>
                <div>
                  <h2 className="text-lg mb-1 mt-2">New Password</h2>
                  <Input name="newPassword" app type="password" />
                </div>
                <div>
                  <h2 className="text-lg mb-1 mt-2">Confirm Password</h2>
                  <Input name="confirmPassword" app type="password" />
                </div>
                <Button app title={"Reset Now!"} onClick={handleSubmit} />
              </>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
}
