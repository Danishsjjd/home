import { Formik } from "formik";

import default_img from "../../assets/default_img.jpg";
import { ReactComponent as Google } from "../../assets/icons/social/ic-google.svg";
import login_signUp from "../../assets/images/auth/login_SignUp.jpg";
import { ReactComponent as Logo } from "../../assets/logo-black.svg";
import Button from "../form/Button";
import ErrorMessage from "../form/ErrorMessage";
import Input from "../form/Input";
import Modal from "../Modal";
import useSignUpLogin from "./useSignUpLogin";

export default function SignUpLogin() {
  const {
    closeModal,
    haveAccount,
    initialData,
    isOpen,
    loginValidation,
    onSubmit,
    setHaveAccount,
    signUpValidation,
    onImageChange,
    image,
    setAgreeTerms,
    googleLogin,
    forgetPassword,
  } = useSignUpLogin();

  return (
    <Modal closeModal={closeModal} isOpen={isOpen}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="hidden sm:block">
          <img
            src={login_signUp}
            alt="login"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-1">
          <Logo className="w-24" />
          <h1 className="font-medium  text-lg">
            {haveAccount ? "Welcome Back" : "Hello Friends!!!"}
          </h1>
          <button
            className="flex justify-center items-center gap-3 p-4 w-full min-w-210 bg-white rounded-full shadow-lg text-center"
            onClick={googleLogin}
          >
            <Google /> Sign up with Google
          </button>
          <div className="flex justify-center items-center gap-2 !my-3 px-3">
            <div className="flex-1 h-1 rounded-full bg-neutral-lightest" />
            <p className=" font-bold">or</p>
            <div className="flex-1 h-1 rounded-full bg-neutral-lightest" />
          </div>
          <Formik
            validationSchema={haveAccount ? loginValidation : signUpValidation}
            initialValues={initialData}
            onSubmit={onSubmit}
          >
            {({ errors, touched, setFieldValue, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                {!haveAccount && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 text-center">
                      Photo
                    </label>
                    <div className="mt-1 flex items-center flex-col gap-3">
                      <div className="max-w-[100px] grid place-items-center w-full max-h-[100px] h-full overflow-hidden rounded-full">
                        <img
                          src={image || default_img}
                          alt="default"
                          className={`w-full ${
                            image ? "object-cover" : "object-contain bg-[#999]"
                          }`}
                        />
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
                )}
                {/* end */}
                {!haveAccount && (
                  <div>
                    <p>Username</p>
                    <Input name="username" app />
                  </div>
                )}
                <div>
                  <p>Your email</p>
                  <Input name="email" app />
                </div>
                <div>
                  <p>Password</p>
                  <Input name="password" app type="password" />
                </div>
                {haveAccount && (
                  <span
                    className="text-right block hover:text-blue-700 cursor-pointer"
                    onClick={forgetPassword}
                  >
                    forget password?
                  </span>
                )}
                {!haveAccount && (
                  <div className="flex justify-center !my-2">
                    <div className="form-check flex gap-2 ml-2">
                      <input
                        type="checkbox"
                        id="flexCheckIndeterminate"
                        className="accent-secondary-darker focus:outline-1 focus:outline-secondary-darker focus:ring-0 checkbox checkbox-primary"
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      />
                      <label
                        className="form-check-label inline-block text-gray-800 text-xs sm:text-base"
                        htmlFor="flexCheckIndeterminate"
                      >
                        By submitting this form you agree to our Terms and
                        Conditions
                      </label>
                    </div>
                  </div>
                )}
                <div className="text-center !my-2">
                  <Button app className={"text-center"}>
                    {haveAccount ? "Login" : "create Account"}
                  </Button>
                </div>
                <p className="!mt-2 text-center">
                  {haveAccount ? "Not a Member?" : "Already a member?"}{" "}
                  <span
                    className="text-[#2F80ED] cursor-pointer"
                    onClick={() => setHaveAccount((pre) => !pre)}
                  >
                    {haveAccount ? "Sign In" : "Login"}
                  </span>
                </p>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Modal>
  );
}
