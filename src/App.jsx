import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/SiteFooter';
import Toast from './components/Toast';
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import Landing from './pages/Landing';
import Login from './pages/AuthLogin';
import Signup from './pages/AuthSignup';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';

import './App.css';

function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>

          <Navbar />
          <main id="main" className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
          <Toast />
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

