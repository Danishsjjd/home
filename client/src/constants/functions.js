import { toast } from "react-toastify";
import { API } from "../libs/axios";
import {
	setUser,
	setLogin,
	setUpdatePassword,
	setUpdateProfile,
} from "../store/authSlice";

// user
export const logout = async (dispatch) => {
	try {
		await API.logout({});
		localStorage.clear();
		dispatch(setUser({}));
		dispatch(setLogin(false));
	} catch (err) {
		toast.error(err.message);
	}
};
// user
export const updatePassword = (dispatch) => {
	dispatch(setUpdatePassword(true));
};

export const updateProfile = (dispatch) => {
	dispatch(setUpdateProfile(true));
};
