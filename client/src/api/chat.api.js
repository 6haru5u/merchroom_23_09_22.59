const BASE = `${import.meta.env.VITE_API_BASE_URL || '/api'}/chat`;

export async function chatWithNongHed(message, history = []) {
  const response = await fetch(BASE, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || 'Chat request failed');
    error.status = response.status;
    error.code = data.code;
    throw error;
  }
  return data;
}
