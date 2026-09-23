const BASE = `${import.meta.env.VITE_API_BASE_URL || '/api'}/products`;
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
// Public storefront endpoints. They intentionally do not require a cookie.
export const getPublicProducts = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') query.set(key, value);
  });
  return request(query.size ? `?${query}` : '');
};
export const getPublicProduct = (id) => request(`/${id}`);
export const getProducts = () => request('/admin/all');
export const createProduct = (product) => request('', { method: 'POST', body: JSON.stringify(product) });
export const updateProduct = (id, product) => request(`/${id}`, { method: 'PATCH', body: JSON.stringify(product) });
export const deleteProduct = (id) => request(`/${id}`, { method: 'DELETE' });
