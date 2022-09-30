import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { resetPasswordApi } from "../../store/apiCall/authApi";
import { getRestDialog, setRestDialog } from "../../store/authSlice";
import Button from "../form/Button";
import Form from "../form/Form";
import Input from "../form/Input";
import Modal from "../Modal";

export default function ResetPassword({ token }) {
  const dispatch = useDispatch();
  const isOpen = useSelector(getRestDialog);
  const closeModal = () => {
    dispatch(setRestDialog(false));
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(8).required().label("Password"),
    confirmPassword: Yup.string().min(8).required().label("Confirm Password"),
  });

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values, { resetForm }) => {
    resetPasswordApi({ values, token }, resetForm);
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      zIndex={"z-30"}
      maxWidth="max-w-lg"
    >
      <div className="divide-y-2 space-y-5 divide-neutral-lighter">
        <h2 className="text-center py-2 text-2xl font-bold">Update Password</h2>
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <div>
            <h2 className="text-lg mb-1 mt-2">New Password</h2>
            <Input name="password" app type="password" />
          </div>
          <div>
            <h2 className="text-lg mb-1 mt-2">Confirm Password</h2>
            <Input name="confirmPassword" app type="password" />
          </div>
          <Button app>Reset Now!</Button>
        </Form>
      </div>
    </Modal>
  );
}
