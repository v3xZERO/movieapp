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
        .filter((line) => line.length > 0)
        .map((t) => ({text: t, checked: true}));

      state.list = lines;
    },
    toggleTitleChecked: (state, action) => {
      const index = action.payload;
      if (state.list[index]) {
			  state.list[index].checked = !state.list[index].checked;
		  }
    }
  },
});

export const { setTitlesListFromText, toggleTitleChecked } = titlesSlice.actions;
export default titlesSlice.reducer;