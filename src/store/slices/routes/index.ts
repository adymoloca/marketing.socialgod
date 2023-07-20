/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const routesSlice = createSlice({
	name: 'routes',
	initialState: {
		shop: [] as string[],
	},
	reducers: {
		patchRoutes: (state, action) => {
			state.shop = action?.payload;
		},
	},
});

export const { patchRoutes } = routesSlice.actions;
export default routesSlice.reducer;
