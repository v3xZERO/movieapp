import { configureStore } from "@reduxjs/toolkit";
import titlesReducer from "./titlesSlice";
import moviesReducer from "./moviesSlice";
import metaReducer from "./metaSlice";

const store = configureStore({
	reducer: {
		titles: titlesReducer,
		movies: moviesReducer,
		meta: metaReducer,
	},
});

export default store;
