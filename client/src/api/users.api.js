const BASE = `${import.meta.env.VITE_API_BASE_URL || '/api'}/users`;
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
export const getCustomers = () => request();
export const getMyProfile = () => request('/profile');
export const updateMyProfileDetails = (profile) => request('/profile', { method: 'PATCH', body: JSON.stringify(profile) });
export const updateMyProfile = (profile) => request('/me', { method: 'PATCH', body: JSON.stringify(profile) });
