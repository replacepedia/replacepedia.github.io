import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Filters from './pages/Filters';
import Article from './pages/Article';
import './App.css';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div id="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/filters" element={<Filters />} />
        <Route path="/:articleId" element={<Article />} />
        <Route path="/:articleId/:filter" element={<Article />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
