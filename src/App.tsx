import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import CartScreen from './screens/CartScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import UsersListScreen from './screens/Admin/UsersListScreen';
import OrderListScreen from './screens/Admin/OrderListScreen';
import ProductListScreen from './screens/Admin/ProductListScreen';
import ProductEditScreen from './screens/Admin/ProductEditScreen';
import Chart from './screens/Admin/Chart';
import Charts from './screens/Admin/Chart';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/product/:id" element={<ProductScreen />} />
        <Route path="/cart/:id?" element={<CartScreen />} />
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/search/:keyword" element={<HomeScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/page/:pageNumber" element={<HomeScreen />} />

        <Route path="/admin/users" element={<UsersListScreen />} />
        <Route
          path="/admin/products/:pageNumber"
          element={<ProductListScreen />}
        />
        <Route path="/admin/products" element={<ProductListScreen />} />
        <Route
          path="/admin/products/search/:keyword"
          element={<ProductListScreen />}
        />
        <Route path="/admin/chart" element={<Charts />} />
        <Route path="/admin/orders" element={<OrderListScreen />} />
        <Route path="/admin/productedit/:id" element={<ProductEditScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
