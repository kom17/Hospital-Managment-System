import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from './pages/login'
import Dashboard from './pages/dashboard';


export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}