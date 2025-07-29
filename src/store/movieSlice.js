import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
  },
  reducers: {
    setMovieListFromText: (state, action) => {
      const text = action.payload;
      console.log('hello')

      const lines = text
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      state.list = lines;
    },
  },
});

export const { setMovieListFromText } = movieSlice.actions;
export default movieSlice.reducer;