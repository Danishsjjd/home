import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";

import "./assets/styles/style.css";
import {
  SignUpLogin,
  ForgetPassword,
  UpdatePassword,
  UpdateProfile,
} from "./components";
import store from "./config/store";
import Router from "./routes/Router";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Router />
        <ToastContainer position="top-left" />
        <SignUpLogin />
        <UpdatePassword />
        <ForgetPassword />
        <UpdateProfile />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
