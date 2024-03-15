import axios from 'axios';
import {
  setTranslatedText,
  setError as setTranslateError,
} from '../slices/translateSlice';

const translateText = (text, targetLanguage) => async (dispatch) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set('q', text);
  encodedParams.set('target', targetLanguage);

  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': 'c96a4b6a2bmsha770b953494a3c3p19181ejsn7420abcde0df',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    dispatch(setTranslatedText(response.data));
  } catch (error) {
    dispatch(setTranslateError(error.message));
  }
};

export default translateText;
