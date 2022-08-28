import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	showDialog: false,
	user: {},
	isLogin: false,
	showForgetDialog: false,
	showRestDialog: true,
	showUpdateProfile: false,
	showUpdatePassword: false,
};

const authSlice = createSlice({
	name: "authSlice",
	initialState,
	reducers: {
		setDialog: (state, action) => {
			state.showDialog = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setLogin: (state, action) => {
			state.isLogin = action.payload;
		},
		setForgetDialog: (state, action) => {
			state.showForgetDialog = action.payload;
		},
		setRestDialog: (state, action) => {
			state.showRestDialog = action.payload;
		},
		setUpdateProfile: (state, action) => {
			state.showUpdateProfile = action.payload;
		},
		setUpdatePassword: (state, action) => {
			state.showUpdatePassword = action.payload;
		},
	},
});

export const {
	setDialog,
	setLogin,
	setUser,
	setForgetDialog,
	setRestDialog,
	setUpdatePassword,
	setUpdateProfile,
} = authSlice.actions;

export const getDialog = (store) => store.authSlice.showDialog;
export const getUser = (store) => store.authSlice.user;
export const getLogin = (store) => store.authSlice.isLogin;
export const getForgetDialog = (store) => store.authSlice.showForgetDialog;
export const getRestDialog = (store) => store.authSlice.showRestDialog;
export const getUpdateProfile = (store) => store.authSlice.showUpdateProfile;
export const getUpdatePassword = (store) => store.authSlice.showUpdatePassword;

export default authSlice.reducer;
