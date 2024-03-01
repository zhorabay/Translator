import { createSlice } from '@reduxjs/toolkit';

const detectSlice = createSlice({
  name: 'detect',
  initialState: {
    detectedLanguage: null,
    error: null,
  },
  reducers: {
    setDetectedLanguage: (state, action) => {
      state.detectedLanguage = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setDetectedLanguage, setError } = detectSlice.actions;
export const selectDetectedLanguage = (state) => state.detect.detectedLanguage;
export const selectDetectError = (state) => state.detect.error;

export default detectSlice.reducer;
