import { createSlice } from '@reduxjs/toolkit';

const translateSlice = createSlice({
  name: 'translate',
  initialState: {
    translatedText: null,
    error: null,
  },
  reducers: {
    setTranslatedText: (state, action) => {
      state.translatedText = action.payload.translatedText;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTranslatedText, setError } = translateSlice.actions;
export const selectTranslatedText = (state) => state.translate.translatedText;
export const selectTranslateError = (state) => state.translate.error;

export default translateSlice.reducer;
