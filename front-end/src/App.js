// src/App.js
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Layout from './components/Layout/Layout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  // Si non authentifié, afficher Login ou SignUp
  if (!isAuthenticated) {
    return isLogin ? (
      <Login 
        onSwitchToSignUp={() => setIsLogin(false)} 
        onLoginSuccess={handleLogin} 
      />
    ) : (
      <SignUp 
        onSwitchToLogin={() => setIsLogin(true)} 
        onSignUpSuccess={handleLogin} 
      />
    );
  }

  // Si authentifié, afficher le dashboard
  return <Layout onLogout={handleLogout} />;
}

export default App;