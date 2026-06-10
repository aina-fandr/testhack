// src/services/aiService.js
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function sendMessageToAI(message, history = []) {
  const response = await fetch(`${API_BASE}/api/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, history }),
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Erreur avec l\'IA');
  }
  return data.reply;
}