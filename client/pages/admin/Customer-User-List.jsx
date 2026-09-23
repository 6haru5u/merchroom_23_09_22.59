import { useEffect, useState } from 'react';
import { getCustomers } from '../../src/api/users.api';
import { getUsers } from '../../src/data/mockup/mockUsers';
import AdminPanel from '../../src/components/admin/AdminPanel';
import AdminTable from '../../src/components/admin/AdminTable';

export default function CustomerUserList() {
  const [users, setUsers] = useState(() => getUsers());
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    getCustomers()
      .then((data) => {
        if (!isMounted) return;
        if (data && Array.isArray(data.users) && data.users.length > 0) {
          setUsers(data.users);
        }
      })
      .catch(() => {
        // ออฟไลน์หรือยังไม่ต่อ backend ให้ใช้รายชื่อจำลอง
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <div className="admin-page">
      <AdminPanel title="Customers / Users">
        {error && <p className="form-error">{error}</p>}
        <AdminTable columns={['Customer', 'Email', 'Phone', 'Joined', '']}>
          {safeUsers.map((user) => (
            <tr key={user._id || user.id || user.email}>
              <td>{user.firstName || ''} {user.lastName || ''}</td>
              <td>{user.email}</td>
              <td>{user.phone || '—'}</td>
              <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : (user.memberSince || '—')}</td>
              <td><button className="link-btn" onClick={() => setSelected(user)}>View</button></td>
            </tr>
          ))}
        </AdminTable>
      </AdminPanel>

      {selected && (
        <aside className="quick-view">
          <button onClick={() => setSelected(null)}>×</button>
          <h2>{selected.firstName || ''} {selected.lastName || ''}</h2>
          <p>{selected.email}</p>
          <h3>Address</h3>
          <p>{selected.address || 'No address provided'}</p>
          <h3>Payment methods</h3>
          <p>{selected.paymentMethods?.join(', ') || 'None saved'}</p>
          <h3>Interests</h3>
          <p>{selected.interests?.join(', ') || '—'}</p>
        </aside>
      )}
    </div>
  );
}
