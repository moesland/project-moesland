import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/home';
import Admin from './pages/admin';
import ArticlesCreate from './pages/articles/create'
import ArticlesUpdate from './pages/articles/update'
import ProtectedRoute from './modules/authorization/ProtectedRoute';
import Login from './pages/login';
import Management from './pages/userManagement';
import ArticleOverview from './pages/articles/overview';
import EventOverview from './pages/events/overview';

const Routing = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/articles/create" element={<ArticlesCreate />} />
        <Route path="/articles/update/:id" element={<ArticlesUpdate />} />
        <Route path='/articles' element={<ArticleOverview/>} />
        <Route path='/events' element={<EventOverview/>} />
        <Route path='/users' element={<Management/>} />
      </Route>

      <Route element={<ProtectedRoute isAuthenticated={false}/>}>
        <Route path="/login" element={<Login />}/>
      </Route>
    </Routes>
  )
}

export default Routing;