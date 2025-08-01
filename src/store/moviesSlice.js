import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMovieCredits, fetchMovieDetails, fetchMovieVideos, searchMovie } from "../api";
import { selectMovieIds, selectSelectedTitlesList } from "./selectors";

const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		ids: [],
		isLoading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
            .addCase(fetchCheckedTitles.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCheckedTitles.fulfilled, (state, action) => {
                state.error = null;
                state.ids = action.payload;
            })
            .addCase(fetchCheckedTitles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Failed to fetch movies';
            })
			.addCase(fetchFullMovies.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchFullMovies.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.movies = action.payload;
			})
			.addCase(fetchFullMovies.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || 'Failed to fetch full movies data';
			});
	}
});

export const fetchCheckedTitles = createAsyncThunk(
	'movies/fetchCheckedTitles',
	async (_, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const titles = selectSelectedTitlesList(state);
	
			const resultsArray = await Promise.all(
				titles.map(async (title) => {
					const results = await searchMovie(title);

					return results.length > 0 ? results[0].id : null; // save only the first result
				})
			);

			return resultsArray.filter((r) => r !== null);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const fetchFullMovies = createAsyncThunk(
	'movies/fetchFullMovies',
	async (_, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const ids = selectMovieIds(state);

			const movies = await Promise.all(
				ids.map(async (id) => {
					const [details, credits, videos] = await Promise.all([
						fetchMovieDetails(id),
						fetchMovieCredits(id),
						fetchMovieVideos(id),
					]);

					return {
						...details,
						actors: credits.actors,
						directors: credits.directors,
						trailer_key: videos.trailer_key,
					};
				})
			);

			return movies;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const fetchAllMoviesData = createAsyncThunk(
	'movies/fetchAllMoviesData',
	async (_, thunkAPI) => {
		// fetch the ids
		const checkedTitlesResult = await thunkAPI.dispatch(fetchCheckedTitles());

		if (fetchCheckedTitles.fulfilled.match(checkedTitlesResult)) {
			// get movie details if fetching the ids succeeds
			await thunkAPI.dispatch(fetchFullMovies());
			return;
		} else {
			return thunkAPI.rejectWithValue('Failed to fetch checked titles');
		}
	}
);

export default moviesSlice.reducer;