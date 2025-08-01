import { configureStore } from '@reduxjs/toolkit';
import titlesReducer from './titlesSlice';
import moviesReducer from './moviesSlice';

const store = configureStore({
	reducer: {
		titles: titlesReducer,
		movies: moviesReducer
	},
});

export default store;