// src/services/api.js
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de la requête vers l\'API.');
  }
  return data;
}

// Inscription
export async function register(userData) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
}

// Connexion classique
export async function login(credentials) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
}

// Connexion avec Google (token)
export async function loginWithGoogle(token) {
  const response = await fetch(`${API_BASE}/auth/google`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
  return handleResponse(response);
}

// Vérifier la session
export async function checkSession() {
  const response = await fetch(`${API_BASE}/auth/login/success`, {
    credentials: 'include',
  });
  return handleResponse(response);
}

// Déconnexion
export async function logout() {
  const response = await fetch(`${API_BASE}/auth/logout`, {
    credentials: 'include',
  });
  return handleResponse(response);
}