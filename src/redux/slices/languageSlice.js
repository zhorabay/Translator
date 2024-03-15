import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    languages: [],
    error: null,
    loading: false,
  },
  reducers: {
    setLanguages: (state, action) => {
      state.languages = action.payload.languages;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLanguagesLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLanguages, setError, setLanguagesLoading } = languageSlice.actions;
export const selectLanguages = (state) => state.language.languages;
export const selectLanguageError = (state) => state.language.error;
export const selectLanguagesLoading = (state) => state.language.loading;

export default languageSlice.reducer;
