import { configureStore } from '@reduxjs/toolkit';
import titlesReducer from './titlesSlice';

const store = configureStore({
  reducer: {
    titles: titlesReducer
  },
});

export default store;