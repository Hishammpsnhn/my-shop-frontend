import React from 'react';
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/search/:keyword" element={<HomeScreen />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
