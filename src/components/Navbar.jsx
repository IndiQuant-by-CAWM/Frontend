import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path d="M16 2L28 8V16L16 22L4 16V8L16 2Z" fill="currentColor" />
            <path d="M16 10L22 13V17L16 20L10 17V13L16 10Z" fill="white" opacity="0.3" />
          </svg>
          <span className="navbar-brand">IndiQuant</span>
        </Link>

        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`} id="main-menu">
          <Link to="/" className="navbar-link">Home</Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
              <Link to="/leaderboard" className="navbar-link">Leaderboard</Link>
              <Link to="/upload" className="navbar-link">Upload</Link>
            </>
          )}
        </div>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="user-menu" aria-label="User menu">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.id}`}
                alt={user?.username}
                className="user-avatar"
              />
              <span className="user-name">{user?.username}</span>
              <div className="dropdown" role="menu">
                <Link to={`/profile/${user?.id}`} className="dropdown-item" role="menuitem">
                  Profile
                </Link>
                <button onClick={handleLogout} className="dropdown-item logout" role="menuitem">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </div>

        <button
          className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
