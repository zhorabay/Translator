import React, { useState } from 'react';
import { PiMicrophoneLight } from 'react-icons/pi';
import { RiPencilFill } from 'react-icons/ri';
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
import detectLanguageAction from '../redux/actions/detect';
import getSupportedLanguages from '../redux/actions/languages';
import translateText from '../redux/actions/translate';
import '../style/style.css';

const TranslatorComponent = () => {
  const dispatch = useDispatch();

  const [inputText, setInputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isLanguageDetected, setIsLanguageDetected] = useState(false);

  const detectedLanguage = useSelector(selectDetectedLanguage);
  const languages = useSelector((state) => state.language.languages);
  const translatedText = useSelector(selectTranslatedText);

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);

    dispatch(detectLanguageAction(newText));
  };

  const handleTargetLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
  };

  const handleDetectLanguage = async () => {
    try {
      const detected = await detectLanguage(inputText);
      dispatch(setDetectedLanguage(detected));
      setIsLanguageDetected(true);
    } catch (error) {
      console.error("Error detecting language:", error);
      dispatch(setDetectError(error.message));
    }
  };

  const handleGetLanguages = async () => {
    try {
      const languageList = await getSupportedLanguages();
      dispatch(setLanguages(languageList));
    } catch (error) {
      console.error("Error getting supported languages:", error);
      dispatch(setLanguageError(error.message));
    }
  };
  
  const handleTranslate = async () => {
    try {
      const translation = await translateText(inputText, targetLanguage);
      dispatch(setTranslatedText(translation));
    } catch (error) {
      console.error("Error translating text:", error);
      dispatch(setTranslateError(error.message));
    }
  };

  return (
    <div className="main">
      <div className="block-one">
        {isLanguageDetected ? (
          <h3>
            Detected:
            {detectedLanguage && detectedLanguage.data && detectedLanguage.data.detections && detectedLanguage.data.detections[0][0]?.language}
          </h3>
        ) : (
          <button type="button" onClick={handleDetectLanguage} className="detect-btn">
            Detect Language
          </button>
        )}
        <label htmlFor="targetLanguage">Choose Target Language:</label>
        <select id="targetLanguage" value={targetLanguage} onClick={handleGetLanguages} onChange={handleTargetLanguageChange}>
          {Array.isArray(languages) &&
            languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
        </select>
        <textarea value={inputText} onChange={handleInputChange} placeholder={<PiMicrophoneLight /> && <RiPencilFill />} className="textarea-1" />
      </div>
      <div className="block-two">
        <h3>
          Detected Language:
          {detectedLanguage && detectedLanguage.detections && detectedLanguage.detections[0]?.language}
        </h3>
        <p>
          Supported Languages:
          {Array.isArray(languages) ? languages.map((lang) => lang.name).join(', ') : ''}
        </p>
        <textarea placeholder="Translation" className="textarea-2" value={translatedText} />
      </div>
      {/* <button type="button" onClick={handleTranslate}>Translate</button> */}
    </div>
  );
};

export default TranslatorComponent;
