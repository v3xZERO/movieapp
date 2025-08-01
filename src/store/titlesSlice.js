import { createSlice } from '@reduxjs/toolkit';

const titlesSlice = createSlice({
  name: 'titles',
  initialState: {
    list: [],
  },
  reducers: {
    setTitlesListFromText: (state, action) => {
      const text = action.payload;

      const lines = text
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      state.list = lines;
    },
  },
});

export const { setTitlesListFromText } = titlesSlice.actions;
export default titlesSlice.reducer;