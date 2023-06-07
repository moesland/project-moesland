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
import PhotoManagement from './pages/photoManagement/photoManagement';
import ApprovedPhotoManagement from './pages/photoManagement/approvedPhotoManagement';
import DeclinedPhotoManagement from './pages/photoManagement/declinedPhotoManagement';
import Participation from './pages/participation';
import ParticipationCategory from './pages/participation/participationCategory/overview';
import VotingOverview from './pages/participation/voting/overview';

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
        <Route path='/photo-management' element={<PhotoManagement/>} />
        <Route path='/approved-photo-management' element={<ApprovedPhotoManagement/>} />
        <Route path='/declined-photo-management' element={<DeclinedPhotoManagement/>} />
        <Route path='/participation' element={<Participation/>} />
        <Route path='/participation-category' element={<ParticipationCategory/>} />
        <Route path='/voting-overview' element={<VotingOverview/>} />

      </Route>

      <Route element={<ProtectedRoute isAuthenticated={false}/>}>
        <Route path="/login" element={<Login />}/>
      </Route>
    </Routes>
  )
}

export default Routing;
