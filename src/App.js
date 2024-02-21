import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TranslatorComponent from './components/translator';

function App() {
  return (
    <Router>
      <main className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<TranslatorComponent />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
