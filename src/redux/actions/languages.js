import axios from 'axios';
import {
  setLanguages,
  setError as setLanguageError,
  setLanguagesLoading,
} from '../slices/languageSlice';

const getSupportedLanguages = () => async (dispatch) => {
  try {
    dispatch(setLanguagesLoading(true));

    const options = {
      method: 'GET',
      url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
      headers: {
        'X-RapidAPI-Key': 'c96a4b6a2bmsha770b953494a3c3p19181ejsn7420abcde0df',
        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    const languages = response.data;

    dispatch(setLanguages({ languages }));
  } catch (error) {
    dispatch(setLanguageError(error.message));
  } finally {
    dispatch(setLanguagesLoading(false));
  }
};

export default getSupportedLanguages;
