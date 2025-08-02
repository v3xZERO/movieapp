import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchLanguages } from "../api"

const metaSlice = createSlice({
  name: 'meta',
  initialState: {
    languages: [],
    selectedLanguage: 'en',
    isLoadingLanguages: false,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
		.addCase(loadLanguages.pending, (state) => {
			state.isLoadingLanguages = true;
		})
		.addCase(loadLanguages.fulfilled, (state, action) => {
			state.languages = action.payload;
			state.isLoadingLanguages = false;
		})
		.addCase(loadLanguages.rejected, (state) => {
			state.isLoadingLanguages = false;
		})
  }
});

export const loadLanguages = createAsyncThunk(
	'movies/loadLanguages',
	async () => {
		const data = await fetchLanguages();
		return data;
	}
);

export const { setLanguage } = metaSlice.actions;
export default metaSlice.reducer;