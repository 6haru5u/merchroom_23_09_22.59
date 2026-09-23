const BASE = `${import.meta.env.VITE_API_BASE_URL || '/api'}/orders`;
async function request(path = '', options = {}) {
  const response = await fetch(`${BASE}${path}`, { credentials: 'include', headers: { 'Content-Type': 'application/json' }, ...options });
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    throw new Error('API route returned HTML');
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}
export const getOrders = ({ status = 'all', page = 1, limit = 10, search = '' } = {}) => { const query = new URLSearchParams({ page, limit }); if (status !== 'all') query.set('status', status); if (search.trim()) query.set('search', search.trim()); return request(`?${query}`); };
export const getOrderStats = () => request('/stats');
export const getOrderById = (id) => request(`/${id}`);
export const getMyOrders = () => request('/me');
export const createOrder = (order) => request('', { method: 'POST', body: JSON.stringify(order) });
export const createManualOrder = (order) => request('/manual', { method: 'POST', body: JSON.stringify(order) });
export const updateOrderStatus = (id, status) => request(`/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
export const subscribeToOrderEvents = (onChange) => {
  const stream = new EventSource(`${BASE}/events`, { withCredentials: true });
  stream.addEventListener('order-change', onChange);
  return () => stream.close();
};
export const subscribeToMyOrderEvents = (onChange) => {
  const stream = new EventSource(`${BASE}/me/events`, { withCredentials: true });
  stream.addEventListener('order-change', onChange);
  return () => stream.close();
};
