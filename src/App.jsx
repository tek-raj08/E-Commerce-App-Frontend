import { useState } from 'react'
// import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import { CartProvider } from './Context/CartContext';
import WishList from './pages/WishList';
import Cart from './pages/Cart';
import LoginForm from './pages/LoginForm';
import ProductDetails from './pages/ProductDetails';
import UserProfile from './pages/UserProfile';
import { AlertProvider } from './Context/AlertContext';
import Alert from './components/Alert';


function App() {
  

  return (
    <>
      <div>
        <AlertProvider>
        <CartProvider>
        <Router>
          <Alert/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/categories/:id' element={<ProductListing />} />
            <Route path='/wishlist' element={<WishList/>} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/products/:productId' element={<ProductDetails />} />
            <Route path='/userProfile' element={<UserProfile/>} />
          </Routes>
        </Router>
        </CartProvider>
        </AlertProvider>
        </div>
    </>
  )
}

export default App
