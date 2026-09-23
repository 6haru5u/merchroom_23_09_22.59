const BASE = import.meta.env.VITE_API_BASE_URL || '/api';
async function get(path) {
  const response = await fetch(`${BASE}${path}`, { credentials: 'include' });
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    throw new Error('API route returned HTML');
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
}
export const getDashboardStats = () => get('/admin/stats');
export const getProductOptions = () => get('/admin/product-options');
export const searchAdminDatabase = (query) => get(`/admin/search?q=${encodeURIComponent(query)}`);
