import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/home';
import Admin from './pages/admin';
import ProtectedRoute from './modules/authorization/ProtectedRoute';
import DefaultLayout from './layout/default';

const Routing = () => {
  return (
    <DefaultLayout>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route element={<ProtectedRoute isAuthenticated={false}/>}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </DefaultLayout>
  )
}

export default Routing;