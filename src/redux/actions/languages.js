import axios from 'axios';
import {
  setLanguages,
  setError as setLanguageError,
} from '../slices/languageSlice';

const getSupportedLanguages = () => async (dispatch) => {
  const options = {
    method: 'GET',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
    headers: {
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': 'c96a4b6a2bmsha770b953494a3c3p19181ejsn7420abcde0df',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    dispatch(setLanguages(response.data));
  } catch (error) {
    dispatch(setLanguageError(error.message));
  }
};

export default getSupportedLanguages;
