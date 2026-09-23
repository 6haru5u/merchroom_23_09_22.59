import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
export default function AdminLayout() { return <div className="admin-shell"><AdminSidebar /><main className="admin-main"><AdminTopbar /><Outlet /></main></div>; }
