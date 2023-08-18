import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import SignUp from './components/signup/Signup';
import ForgotPassword from './components/forgot-password.js/Forgot-password';
import Dashboard from './components/dashboard/Dashboard';

import UserDashboard from './components/userDashboard/Dashboard';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/home/*" element={<UserDashboard />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard/*" element={<Dashboard />} />

      </Routes>
    </Router>
  );
};

export default App;
