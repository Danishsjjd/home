import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { getLogin, getUser } from "../store/authSlice";

const PrivateRoutes = ({ redirect = "/", element, role = "user" }) => {
	const isLogin = useSelector(getLogin);
	const user = useSelector(getUser);
	if (!isLogin) return <Navigate to={redirect} replace />;
	if (user?.role === "admin" || role === user?.role)
		return element || <Outlet />;
	return <Navigate to={redirect} replace />;
};

export default PrivateRoutes;
