import React from 'react';
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Header from './components/Header';
import Home from './screens/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/search/:keyword" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
