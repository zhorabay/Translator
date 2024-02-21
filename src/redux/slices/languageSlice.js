import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    languages: [],
    error: null,
  },
  reducers: {
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLanguages, setError } = languageSlice.actions;
export const selectLanguages = (state) => state.language.languages;
export const selectLanguageError = (state) => state.language.error;

export default languageSlice.reducer;
