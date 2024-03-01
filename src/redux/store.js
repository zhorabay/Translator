import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import detectReducer from './slices/detectSlice';
import languageReducer from './slices/languageSlice';
import translateReducer from './slices/translateSlice';

const store = configureStore({
  reducer: {
    detect: detectReducer,
    language: languageReducer,
    translate: translateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
