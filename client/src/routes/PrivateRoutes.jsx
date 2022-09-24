import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingDialog from "../components/LoadingDialog";

import { getLogin, getUser } from "../store/authSlice";

const PrivateRoutes = ({ redirect = "/", element, role = "user", loading }) => {
  const isLogin = useSelector(getLogin);
  const user = useSelector(getUser);
  if (loading) return <LoadingDialog loading={loading} className="bg-white" />;
  if (!isLogin) return <Navigate to={redirect} replace />;
  if (user?.role === "admin" || role === user?.role)
    return element || <Outlet />;
  return <Navigate to={redirect} replace />;
};

export default PrivateRoutes;
