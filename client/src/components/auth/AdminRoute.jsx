import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminRoute() {
  const { user, booting, isAdmin } = useAuth();
  if (booting) return <div className="access-check">Checking access…</div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
}
