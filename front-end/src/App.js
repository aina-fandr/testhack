// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Layout from './components/Layout/Layout';
import Accueil from './pages/Accueil';
import Carte from './pages/Carte';
import IA from './pages/IA';
import ListeUsers from './pages/admin/ListeUsers';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Vérifier le token au chargement de l'application
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      console.log('Vérification auth - token:', !!token, 'user:', !!storedUser);
      
      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          console.log('Utilisateur authentifié:', parsedUser);
        } catch (error) {
          console.error('Erreur parsing user:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        console.log('Non authentifié');
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    console.log('handleLogin appelé', userData);
    setIsAuthenticated(true);
    if (userData) {
      setUser(userData);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#05070d] to-[#1a1a2e] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
        <Route path="/signup" element={<SignUp onSignUpSuccess={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Layout onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/carte" element={<Carte />} />
        <Route path="/ia" element={<IA />} />
        <Route path="/admin/users" element={<ListeUsers />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;