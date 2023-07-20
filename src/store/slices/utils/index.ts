/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const utilsSlice = createSlice({
	name: 'utils',
	initialState: {
		isUserValid: false,
		isDrawerOpen: false,
		serviceId: '',
		platform: '',
	},
	reducers: {
		validateUser: (state) => {
			state.isUserValid = true;
		},
		invalidateUser: (state) => {
			state.isUserValid = false;
		},
		toggleDrawer: (state) => {
			state.isDrawerOpen = !state.isDrawerOpen;
		},
		setServiceId: (state, action) => {
			state.serviceId = action.payload;
		},
		setPlatform: (state, action) => {
			state.platform = action.payload;
		},
	},
});

export const { validateUser, invalidateUser, toggleDrawer, setServiceId, setPlatform } = utilsSlice.actions;
export default utilsSlice.reducer;
