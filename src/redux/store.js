import { configureStore } from '@reduxjs/toolkit';
import detectReducer from './slices/detectSlice';
import languageReducer from './slices/languageSlice';
import translateReducer from './slices/translateSlice';

const store = configureStore({
  reducer: {
    detect: detectReducer,
    language: languageReducer,
    translate: translateReducer,
  },
});

export default store;
