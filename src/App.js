import React, {useState, useEffect, useContext} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './App.css';
import { ListData } from './components/ListData';
import { Navbar } from './components/Navbar';
import { ListSubCategory } from './pages/ListSubCategory';
import { CartProvider } from './components/CartProvider';
import { Cart } from './components/Cart';
import { FetchCategory } from './FetchCategory';
import { FilterData } from './components/FilterData';
import { Login } from './account/Login';
import {Logout} from './account/Logout';
import { AuthProvider } from './account/Authentication';
import { ListOrder } from './pages/ListOrder';
import { UpdateProduct } from './pages/UpdateProduct';

function App() {

  const {allActiveProducts, discountProduct} = FilterData();

  return (
    <div className="App">
      <AuthProvider>
      <CartProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListData productList={allActiveProducts} />} />
        <Route path="/discount" element={<ListData productList={discountProduct} />} />
        <Route path="/subcategory/:id" element={<ListSubCategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin/order-list" element={<ListOrder />} />
        <Route path="/admin/update-product" element={<UpdateProduct />} />
      </Routes>
      </BrowserRouter>
      </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
