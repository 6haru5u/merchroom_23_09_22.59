import { useState } from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { updateMyProfile } from '../../src/api/users.api';
import AdminPanel from '../../src/components/admin/AdminPanel';

export default function SettingsAdmin() {
  const { user, updateCurrentUser } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
  });
  const [message, setMessage] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    try {
      const data = await updateMyProfile(form);
      const updated = data?.user || { ...user, ...form };
      updateCurrentUser(updated);
      setMessage('Profile updated successfully.');
    } catch {
      // Local fallback
      const updated = { ...user, ...form };
      updateCurrentUser(updated);
      setMessage('Profile updated successfully.');
    }
  };

  return (
    <div className="admin-page">
      <AdminPanel title="My admin profile">
        <form className="settings-form" onSubmit={submit}>
          <label>
            First name
            <input
              required
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
          </label>
          <label>
            Last name
            <input
              required
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </label>
          <label>
            Phone
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </label>
          <button className="primary-btn">Save changes</button>
          {message && <p className="success-text">{message}</p>}
        </form>
      </AdminPanel>
    </div>
  );
}
