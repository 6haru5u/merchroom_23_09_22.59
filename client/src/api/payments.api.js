const BASE = `${import.meta.env.VITE_API_BASE_URL || '/api'}/payments`;

export async function chargeCard(orderId, token) {
  const response = await fetch(`${BASE}/orders/${orderId}/charge`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Card payment could not be completed');
  return data;
}
