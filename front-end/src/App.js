// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Layout from './components/Layout/Layout';
import Accueil from './pages/Accueil';
import Carte from './pages/Carte';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
      // Rediriger vers l'accueil si connecté et sur une page d'auth
      if (location.pathname === '/login' || location.pathname === '/signup') {
        navigate('/');
      }
    }
  }, [location.pathname, navigate]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  // Si non authentifié
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLogin} onSwitchToSignUp={() => navigate('/signup')} />} />
        <Route path="/signup" element={<SignUp onSwitchToLogin={() => navigate('/login')} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Si authentifié
  return (
    <Routes>
      <Route path="/login" element={<Login onLoginSuccess={handleLogin} onSwitchToSignUp={() => navigate('/signup')} />} />
      <Route path="/signup" element={<SignUp onSwitchToLogin={() => navigate('/login')} />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;