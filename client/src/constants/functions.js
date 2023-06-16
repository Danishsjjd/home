import { logoutApi } from "../store/apiCall/authApi"
import { setUpdatePassword, setUpdateProfile } from "../store/authSlice"

// user
export const logout = () => {
  logoutApi()
}
// user
export const updatePassword = (dispatch) => {
  dispatch(setUpdatePassword(true))
}

export const updateProfile = (dispatch) => {
  dispatch(setUpdateProfile(true))
}
