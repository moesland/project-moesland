import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/home';
import Admin from './pages/admin';
import ArticlesCreate from './pages/articles/create'
import ProtectedRoute from './modules/authorization/ProtectedRoute';
import DefaultLayout from './layout/default';
import Login from './pages/login';

const Routing = () => {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/articles/create" element={<ArticlesCreate />} />
        </Route>
        <Route element={<ProtectedRoute isAuthenticated={false}/>}>
          <Route path="/login" element={<Login />}/>
        </Route>
      </Routes>
    </DefaultLayout>
  )
}

export default Routing;