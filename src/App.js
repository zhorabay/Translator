import { Route, Routes } from 'react-router-dom';
import './App.css';
import TranslatorComponent from './components/translator';

function App() {
  return (
    <main className="App">
      <Routes>
        <Route element={<TranslatorComponent />} path="/" />
      </Routes>
    </main>
  );
}

export default App;
