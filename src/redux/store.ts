import { configureStore } from '@reduxjs/toolkit';
import { LeadersSlice } from './LeadersSlice';

const store = configureStore({
	reducer: {
		leadersReducer: LeadersSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: '',
			},
		}),
});

export type StoreType = ReturnType<typeof store.getState>;

export default store;
