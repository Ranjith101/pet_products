import React, { useState } from 'react';
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';
// import Login from './components2/Login';
import VendorRegistration from './components2/VendorRegisteration';
import Register from './components2/Register';
import LoginForm from './components2/LoginForm';
import './App.css';
import { Container, Nav, Navbar } from 'react-bootstrap';


const App = () => {
  const [token, setToken] = useState('');

  return (
    
    <>

    <div className='register-form'>
      <Routes>
        <Route path="/" element={<LoginForm setToken={setToken} />} />
        <Route path="/vendor-register" element={<VendorRegistration token={token} />} />
        {/* <Route path="/register" element={<Register />} /> */}
        {/* Other routes */}
      </Routes>
    </div>
    
    </>
  );
};

export default App;

