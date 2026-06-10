const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de la requête vers l\'API.');
  }
  return data;
}

export async function login({ email, password }) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(response);
}

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
