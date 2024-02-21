import axios from 'axios';
import {
  setDetectedLanguage,
  setError as setDetectError,
} from '../slices/detectSlice';

const detectLanguage = (text) => async (dispatch) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set('q', text);

  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/detect',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': 'c96a4b6a2bmsha770b953494a3c3p19181ejsn7420abcde0df',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    dispatch(setDetectedLanguage(response.data));
  } catch (error) {
    dispatch(setDetectError(error.message));
  }
};

export default detectLanguage;
