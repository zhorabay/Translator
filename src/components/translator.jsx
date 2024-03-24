import React, { useState, useEffect } from 'react';
// import { PiMicrophoneLight } from 'react-icons/pi';
// import { RiPencilFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDetectedLanguage,
  setError as setDetectError,
  selectDetectedLanguage,
} from '../redux/slices/detectSlice';
// import {
//   setError as setLanguageError,
// } from '../redux/slices/languageSlice';
import {
  setTranslatedText,
  setError as setTranslateError,
  selectTranslatedText,
} from '../redux/slices/translateSlice';
import detectLanguageAction from '../redux/actions/detect';
import fetchLanguages from '../redux/actions/languages';
import translateText from '../redux/actions/translate';
import '../style/style.css';

function TranslatorComponent() {
  const dispatch = useDispatch();

  const [inputText, setInputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isLanguageDetected, setIsLanguageDetected] = useState(false);

  const detectedLanguage = useSelector(selectDetectedLanguage);
  const languages = useSelector((state) => state.language.languages);
  const translatedText = useSelector(selectTranslatedText);

  useEffect(() => {
    const fetchSupportedLanguages = async () => {
      try {
        await dispatch(fetchLanguages());
      } catch (error) {
        console.error('Error getting supported languages:', error);
      }
    };

    fetchSupportedLanguages();
  }, [dispatch]);

  const handleInputChange = async (e) => {
    const newText = e.target.value;
    setInputText(newText);

    try {
      const detected = await dispatch(detectLanguageAction(newText));
      dispatch(setDetectedLanguage(detected));
      setIsLanguageDetected(true);

      const translation = await dispatch(translateText(newText, targetLanguage));
      dispatch(setTranslatedText(translation));
    } catch (error) {
      console.error('Error processing translation:', error);
      dispatch(setTranslateError(error.message));
    }
  };

  const handleTargetLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setTargetLanguage(selectedLanguage);
  };

  const handleDetectLanguage = async () => {
    try {
      const detected = await dispatch(detectLanguageAction(inputText));
      dispatch(setDetectedLanguage(detected));
      setIsLanguageDetected(true);
    } catch (error) {
      console.error('Error detecting language:', error);
      dispatch(setDetectError(error.message));
    }
  };

  // const handleGetLanguages = async () => {
  //   try {
  //     await dispatch(fetchLanguages());
  //   } catch (error) {
  //     console.error('Error getting supported languages:', error);
  //     dispatch(setLanguageError(error.message));
  //   }
  // };

  return (
    <div className="main">
      <div className="block-one" id="block-one">
        {isLanguageDetected ? (
          <h3>
            Detected:
            {detectedLanguage
              && detectedLanguage.data
              && detectedLanguage.data.detections
              && detectedLanguage.data.detections.language}
          </h3>
        ) : (
          <button type="button" onClick={handleDetectLanguage} className="detect-btn">
            Detect Language
          </button>
        )}
        <textarea value={inputText} onChange={handleInputChange} className="textarea-1" />
      </div>
      <div className="block-two">
      {languages && languages.data && Array.isArray(languages.data.languages) && (
        <select
          id="targetLanguage"
          value={targetLanguage}
          onChange={handleTargetLanguageChange}
        >
          {languages.data.languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      )}
        <textarea placeholder="Translation" className="textarea-2" value={translatedText || ''} />
      </div>
    </div>
  );
}

export default TranslatorComponent;
