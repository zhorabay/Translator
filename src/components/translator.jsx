import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDetectedLanguage,
  setError as setDetectError,
  selectDetectedLanguage,
} from '../redux/slices/detectSlice';
import {
  setLanguages,
  setError as setLanguageError,
  selectLanguages,
} from '../redux/slices/languageSlice';
import {
  setTranslatedText,
  setError as setTranslateError,
  selectTranslatedText,
} from '../redux/slices/translateSlice';
import detectLanguage from '../redux/actions/detect';
import getSupportedLanguages from '../redux/actions/languages';
import translateText from '../redux/actions/translate';
import '../style/style.css';

const TranslatorComponent = () => {
  const dispatch = useDispatch();

  const [inputText, setInputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');

  const detectedLanguage = useSelector(selectDetectedLanguage);
  const languages = useSelector(selectLanguages);
  const translatedText = useSelector(selectTranslatedText);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleTargetLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
  };

  const handleDetectLanguage = async () => {
    try {
      const detected = await detectLanguage(inputText);
      dispatch(setDetectedLanguage(detected));
    } catch (error) {
      dispatch(setDetectError(error.message));
    }
  };

  const handleGetLanguages = async () => {
    try {
      const languageList = await getSupportedLanguages();
      dispatch(setLanguages(languageList));
    } catch (error) {
      dispatch(setLanguageError(error.message));
    }
  };

  const handleTranslate = async () => {
    try {
      const translation = await translateText(inputText, targetLanguage);
      dispatch(setTranslatedText(translation));
    } catch (error) {
      dispatch(setTranslateError(error.message));
    }
  };

  return (
    <div>
      <textarea value={inputText} onChange={handleInputChange} />
      <button type="button" onClick={handleDetectLanguage}>Detect Language</button>
      <button type="button" onClick={handleGetLanguages}>Get Supported Languages</button>
      <select value={targetLanguage} onChange={handleTargetLanguageChange}>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <button type="button" onClick={handleTranslate}>Translate</button>
      <div>
        <h3>
          Detected Language:
          {detectedLanguage}
        </h3>
        <p>
          Supported Languages:
          {languages.map((lang) => lang.name).join(', ')}
        </p>
        <p>
          Translated Text:
          {translatedText}
        </p>
      </div>
    </div>
  );
};

export default TranslatorComponent;
