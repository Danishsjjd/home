import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Modal from "../Modal";

import { forgetPasswordApi } from "../../store/apiCall/authApi";
import { getForgetDialog, setForgetDialog } from "../../store/authSlice";
import Button from "../form/Button";
import Form from "../form/Form";
import Input from "../form/Input";

export default function SignUpLogin() {
  const dispatch = useDispatch();

  const isOpen = useSelector(getForgetDialog);
  const closeModal = () => {
    dispatch(setForgetDialog(false));
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required().label("Email"),
  });

  const onSubmit = (values, { resetForm }) => {
    forgetPasswordApi(values, resetForm, dispatch);
  };

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      zIndex={"z-50"}
      maxWidth="max-w-lg"
    >
      <div className="divide-y-2 space-y-5 divide-neutral-lighter">
        <h2 className="text-center py-2 text-2xl font-bold">Forget Password</h2>
        <Form
          initialValues={{ email: "" }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <div className="mb-3">
            <h2 className="text-lg mb-1 mt-2">Your Email:</h2>
            <Input name="email" placeholder="Enter Your Email" app />
          </div>
          <Button app>Forget Now!</Button>
        </Form>
      </div>
    </Modal>
  );
}
