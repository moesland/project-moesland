import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/home';
import Admin from './pages/admin';
import ProtectedRoute from './modules/authorization/ProtectedRoute';

const Routing = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute isAuthenticated={true}/>}>
        <Route path="/admin" element={<Admin />} data-layout="admin" />
      </Route>

      <Route element={<ProtectedRoute isAuthenticated={false}/>}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default Routing;