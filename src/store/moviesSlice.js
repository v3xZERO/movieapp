import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
	fetchMovieCredits,
	fetchMovieDetails,
	fetchMovieVideos,
	searchMovie,
	sendMoviesToApi,
} from "../api";

import { selectMovieIds, selectMoviesList, selectSelectedLanguage, selectSelectedTitlesList } from "./selectors";

const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		ids: [],
		list: [],
		searchResults: [],
		genres: [],
		searchQuery: '',
		selectedGenre: '',
		isLoading: false,
		error: null,
	},
	reducers: {
		removeMovie: (state, action) => {
			const id = action.payload;
			
			state.ids = state.ids.filter(i => i !== id);
			state.list = state.list.filter((m) => m.id !== id).map((f, id) => ({...f, order: id}))
		},
		updateMovie: (state, action) => {
			const index = state.list.findIndex(m => m.id === action.payload.id);
			if (index !== -1) {
				state.list[index] = action.payload;
			}
		},
		reorderMovies: (state, action) => {
			const newOrder = action.payload
			state.list = newOrder;
		},
		setGenre: (state, action) => {
			state.selectedGenre = action.payload;
		},
		clearGenre: (state, _) => {
			state.selectedGenre = '';
		},
		clearSearchResults: (state) => {
			state.searchResults = [];
		},
		setSearchQuery: (state, action) => {
			state.searchQuery = action.payload;
		},
		clearSearchQuery: (state, _) => {
			state.searchQuery = '';
			state.searchResults = [];
		}
	},
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
				state.list = action.payload;

				const allGenres = action.payload.flatMap((m) => m.genres);
				const uniqueGenres = [...new Set(allGenres)];

				state.genres = uniqueGenres;
			})
			.addCase(fetchFullMovies.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload || 'Failed to fetch full movies data';
			})
			.addCase(searchMoviesThunk.fulfilled, (state, action) => {
				state.searchResults = action.payload
			})
			.addCase(fetchFullMovieById.fulfilled, (state, action) => {
				const movie = action.payload
				state.genres = [...new Set([...state.genres, ...movie.genres])];
				state.list.push({ ...movie, order: state.list.length })
			})
	}
});

export const fetchCheckedTitles = createAsyncThunk(
	'movies/fetchCheckedTitles',
	async (_, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const titles = selectSelectedTitlesList(state);
			const language = selectSelectedLanguage(state);

			const resultsArray = await Promise.all(
				titles.map(async (title) => {
					const results = await searchMovie(title, language);

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
	"movies/fetchFullMovies",
	async (_, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const ids = selectMovieIds(state);
			const language = selectSelectedLanguage(state);

			const movies = await Promise.all(
				ids.map(async (id, index) => {
					const [details, credits, videos] = await Promise.all([
						fetchMovieDetails(id, language),
						fetchMovieCredits(id, language),
						fetchMovieVideos(id, language),
					]);

					return {
						...details,
						actors: credits.actors,
						directors: credits.directors,
						trailer_key: videos.trailer_key,
						order: index,
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
	"movies/fetchAllMoviesData",
	async (_, thunkAPI) => {
		// fetch the ids
		const checkedTitlesResult = await thunkAPI.dispatch(fetchCheckedTitles());

		if (fetchCheckedTitles.fulfilled.match(checkedTitlesResult)) {
			// get movie details if fetching the ids succeeds
			await thunkAPI.dispatch(fetchFullMovies());
			return;
		} else {
			return thunkAPI.rejectWithValue("Failed to fetch checked titles");
		}
	}
);

export const exportMovies = createAsyncThunk(
	'movies/exportMovies',
	async (_, thunkAPI) => {
		const state = thunkAPI.getState()
		const movies = selectMoviesList(state)

		const jsonPayload = JSON.stringify(movies, null, 2)
		const response = await sendMoviesToApi(jsonPayload)

		return response
	}
)

export const searchMoviesThunk = createAsyncThunk(
	'movies/searchMovies',
	async (query, { getState }) => {
		const existingIds = getState().movies.list.map((m) => m.id)
		const results = await searchMovie(query)
		return results.filter((movie) => !existingIds.includes(movie.id)).map((m) => ({ id: m.id, title: m.title, release_date: m.release_date }))
	}
)


export const fetchFullMovieById = createAsyncThunk(
	'movies/fetchFullMovieById',
	async (id, { getState }) => {
		const lang = getState().meta.selectedLanguage;

		const details = await fetchMovieDetails(id, lang)
		const credits = await fetchMovieCredits(id, lang)
		const videos = await fetchMovieVideos(id, lang)

		return {
			...details,
			actors: credits.actors,
			directors: credits.directors,
			trailer_key: videos,
		}
	}
)

export const { removeMovie, reorderMovies, setGenre, clearGenre, setSearchQuery, clearSearchQuery, updateMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
