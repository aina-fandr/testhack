// front-end/src/services/adminApi.js
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getToken = () => localStorage.getItem('token');

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de la requête');
  }
  return data;
};

// Récupérer tous les utilisateurs
export const getUsers = async () => {
  const response = await fetch(`${API_BASE}/api/admin/users`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });
  return handleResponse(response);
};

// Récupérer un utilisateur par ID
export const getUserById = async (id) => {
  const response = await fetch(`${API_BASE}/api/admin/users/${id}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });
  return handleResponse(response);
};

// Créer un utilisateur
export const createUser = async (userData) => {
  const response = await fetch(`${API_BASE}/api/admin/users`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  return handleResponse(response);
};

// Mettre à jour un utilisateur
export const updateUser = async (id, userData) => {
  const response = await fetch(`${API_BASE}/api/admin/users/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  return handleResponse(response);
};

// Supprimer un utilisateur
export const deleteUser = async (id) => {
  const response = await fetch(`${API_BASE}/api/admin/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return handleResponse(response);
};

// Récupérer les statistiques
export const getUserStats = async () => {
  const response = await fetch(`${API_BASE}/api/admin/stats`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return handleResponse(response);
};