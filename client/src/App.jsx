import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import "./assets/styles/style.css"
import { ForgetPassword, SignUpLogin, UpdatePassword, UpdateProfile } from "./components"
import Router from "./routes/Router"
import store from "./store/configureStore"

import "swiper/css"

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
  )
}

export default App
