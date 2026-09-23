import { Bell, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchAdminDatabase } from '../../api/dashboard.api';
import { getOrders } from '../../api/orders.api';
import { useAuth } from '../../context/AuthContext';

export default function AdminTopbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const page = useLocation().pathname.split('/').pop() || 'dashboard';
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const knownOrderIds = useRef(null);

  useEffect(() => {
    if (!query.trim()) { setResults([]); setSearchError(''); return undefined; }
    const timer = setTimeout(() => {
      searchAdminDatabase(query).then((data) => { setResults(data.results || []); setSearchError(''); }).catch((error) => { setResults([]); setSearchError(error.message || 'ค้นหาไม่สำเร็จ'); });
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    let mounted = true;
    const checkNewOrders = async () => {
      try {
        const data = await getOrders({ page: 1, limit: 20 });
        const orders = data?.orders || [];
        const ids = new Set(orders.map((order) => order._id));
        if (knownOrderIds.current) {
          const incoming = orders.filter((order) => !knownOrderIds.current.has(order._id));
          if (incoming.length && mounted) setNotifications((current) => [...incoming, ...current].slice(0, 10));
        }
        knownOrderIds.current = ids;
      } catch { /* API errors are shown by their respective pages. */ }
    };
    checkNewOrders();
    const interval = window.setInterval(checkNewOrders, 30000);
    return () => { mounted = false; window.clearInterval(interval); };
  }, []);

  const closeSearch = () => { setSearchOpen(false); setQuery(''); setResults([]); setSearchError(''); };
  const chooseResult = (result) => { navigate(result.path); closeSearch(); };

  return <header className="admin-topbar"><div><small>HQ / ADMIN</small><h1>{page.replace(/^./, (x) => x.toUpperCase())}</h1></div><div className="top-actions"><span className="sync-pill">● Live Sync Active</span><div className="topbar-popover"><button className="topbar-icon" type="button" aria-label="Search database" onClick={() => { setSearchOpen((open) => !open); setNotificationsOpen(false); }}><Search size={20} /></button>{searchOpen && <div className="admin-search-popover"><div className="admin-search-input"><Search size={17} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, users, orders…" /><button type="button" aria-label="Close search" onClick={closeSearch}><X size={16} /></button></div>{query.trim().length < 2 ? <p className="popover-state">Type at least 2 characters</p> : searchError ? <p className="popover-state error">{searchError}</p> : results.length ? <ul className="search-results">{results.map((result) => <li key={`${result.type}-${result.id}`}><button type="button" onClick={() => chooseResult(result)}><b>{result.type}</b><span>{result.title}</span><small>{result.detail}</small></button></li>)}</ul> : <p className="popover-state">No database results found</p>}</div>}</div><div className="topbar-popover"><button className="topbar-icon notification-button" type="button" aria-label="Order notifications" onClick={() => { setNotificationsOpen((open) => !open); setSearchOpen(false); }}><Bell size={20} />{notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}</button>{notificationsOpen && <div className="admin-notifications"><div className="notification-heading"><b>New orders</b>{notifications.length > 0 && <button type="button" onClick={() => setNotifications([])}>Mark all read</button>}</div>{notifications.length ? <ul>{notifications.map((order) => <li key={order._id}><button type="button" onClick={() => { navigate('/admin/orders'); setNotificationsOpen(false); }}><b>New order #{String(order._id || '').slice(-8)}</b><span>{order.userId ? (typeof order.userId === 'object' ? `${order.userId.firstName || ''} ${order.userId.lastName || ''}`.trim() : order.userId) : 'Customer'} · ฿{Number(order.totalAmount || 0).toLocaleString()}</span></button></li>)}</ul> : <p className="popover-state">No new orders</p>}</div>}</div><div className="profile"><b>{user?.firstName?.[0] || 'A'}</b><span>{user?.firstName} {user?.lastName}<small>{user?.employeeId || 'Admin'}</small></span></div></div></header>;
}
