import React, { useState } from 'react'
import Navbar from './Components/navbar/Navbar'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Placeorder from './pages/Placeorder/Placeorder';
import Footer from './Components/Footer/footer';
import LoginPopUp from './Components/LoginPopUp/LoginPopUp';
import { ToastContainer } from 'react-toastify';
import Verify from './pages/Verify/Verify'
import Myorders from './pages/Myorders/Myorders';

const App = () => {
  const [showLogin,setShowLogin]=useState(false);
  return (
    <>
    <ToastContainer/>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/Order' element={<Placeorder/>}/>
      <Route path='/verify' element={<Verify/>}/>
      <Route path='/myorders' element={<Myorders/>}/>
    </Routes>
    </div>
    <Footer/>
    </>
  )
  
}

export default App;
