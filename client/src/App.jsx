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
				<ToastContainer />
				<SignUpLogin />
				<UpdatePassword />
				<ForgetPassword />
				<UpdateProfile />
			</BrowserRouter>
		</Provider>
	);
}

export default App;

// BrowserRouter :- depends on browser routes
// HashRouter :- for shared server
// HistoryRouter :- completely control on history element(currently not stable)
// MemoryRouter :- useful for run test in code
// StaticRouter :- for server side rendering
