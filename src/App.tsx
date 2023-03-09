import React from 'react';
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/product" element={<ProductScreen />} />
        <Route path="/search/:keyword" element={<HomeScreen />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
