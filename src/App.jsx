import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";  // Import Navigate for redirection
import MainFile from './components/MainFile';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAllow(true);
    }
  }, []); // Empty dependency array to run only on component mount

  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* Protect the main route */}
          <Route path="/main" element={allow && <MainFile /> } />
          
          {/* Public routes */}
          <Route path="/" element={<Signup />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          
          {/* If no route matches, redirect to Signup */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
