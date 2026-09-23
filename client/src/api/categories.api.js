const BASE = `${import.meta.env.VITE_API_BASE_URL || '/api'}/categories`;

async function request(path = '', options = {}) {
  const response = await fetch(`${BASE}${path}`, { credentials: 'include', headers: { 'Content-Type': 'application/json' }, ...options });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Category request failed');
  return data;
}

export const getCategories = () => request();
export const createCategory = (category) => request('', { method: 'POST', body: JSON.stringify(category) });
export const updateCategory = (id, category) => request(`/${id}`, { method: 'PATCH', body: JSON.stringify(category) });
export const deleteCategory = (id) => request(`/${id}`, { method: 'DELETE' });
