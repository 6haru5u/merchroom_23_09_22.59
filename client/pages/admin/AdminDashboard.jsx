import { useEffect, useState } from 'react';
import { getDashboardStats } from '../../src/api/dashboard.api';
import StatCard from '../../src/components/admin/StatCard';
import AdminPanel from '../../src/components/admin/AdminPanel';
import AdminTable from '../../src/components/admin/AdminTable';
import AdminBadge from '../../src/components/admin/AdminBadge';
import RevenueTrendChart from '../../src/components/admin/charts/RevenueTrendChart';
import CategoryDonutChart from '../../src/components/admin/charts/CategoryDonutChart';
const money = (value) => `฿${Number(value || 0).toLocaleString()}`;

const FALLBACK_DASHBOARD = {
  stats: {
    totalRevenue: 284500,
    totalOrders: 148,
    totalProducts: 42,
    lowStockCount: 4,
  },
  revenueTrend: [
    { month: 'Jan', revenue: 18500 },
    { month: 'Feb', revenue: 24200 },
    { month: 'Mar', revenue: 31000 },
    { month: 'Apr', revenue: 27800 },
    { month: 'May', revenue: 35600 },
    { month: 'Jun', revenue: 42100 },
    { month: 'Jul', revenue: 38900 },
    { month: 'Aug', revenue: 45200 },
    { month: 'Sep', revenue: 21200 },
  ],
  salesByCategory: [
    { name: 'Vinyl', value: 112000 },
    { name: 'Apparel', value: 86500 },
    { name: 'Accessories', value: 52000 },
    { name: 'Collectibles', value: 34000 },
  ],
  lowStock: [
    { _id: 'p-low-1', name: 'VINYL: THE PARKINSON', artist: { name: 'THE PARKINSON' }, quantity: 3 },
    { _id: 'p-low-2', name: 'Bird Twenty Two (Color Vinyl)', artist: { name: 'Thongchai McIntyre' }, quantity: 5 },
    { _id: 'p-low-3', name: 'NFC Keychain: Smallroom 25th', artist: { name: 'SMALLROOM' }, quantity: 7 },
    { _id: 'p-low-4', name: 'MERCHROOM Tour Hoodie (L)', artist: { name: 'MERCHROOM' }, quantity: 9 },
  ],
  recentOrders: [
    { _id: 'ORD-982141', userId: { firstName: 'Earn', lastName: 'Chai' }, totalAmount: 4400, status: 'completed' },
    { _id: 'ORD-982142', userId: { firstName: 'Krit', lastName: 'San' }, totalAmount: 1850, status: 'shipping' },
    { _id: 'ORD-982143', userId: { firstName: 'Ploy', lastName: 'Raks' }, totalAmount: 890, status: 'pending' },
    { _id: 'ORD-982144', userId: { firstName: 'Wichaya', lastName: 'Dev' }, totalAmount: 3200, status: 'processing' },
    { _id: 'ORD-982145', userId: { firstName: 'Anan', lastName: 'Prasert' }, totalAmount: 2500, status: 'completed' },
  ],
};

export default function AdminDashboard() {
  const [data, setData] = useState(FALLBACK_DASHBOARD);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getDashboardStats()
      .then((res) => {
        if (!isMounted) return;
        if (res && res.stats) {
          setData(res);
        }
      })
      .catch(() => {
        // ออฟไลน์หรือยังไม่เชื่อมต่อ backend ให้ใช้ข้อมูลจำลองของระบบ
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const stats = data?.stats || FALLBACK_DASHBOARD.stats;
  const revenueTrend = (data?.revenueTrend && data.revenueTrend.length > 0) ? data.revenueTrend : FALLBACK_DASHBOARD.revenueTrend;
  const salesByCategory = (data?.salesByCategory && data.salesByCategory.length > 0) ? data.salesByCategory : FALLBACK_DASHBOARD.salesByCategory;
  const lowStock = (data?.lowStock && data.lowStock.length > 0) ? data.lowStock : FALLBACK_DASHBOARD.lowStock;
  const recentOrders = (data?.recentOrders && data.recentOrders.length > 0) ? data.recentOrders : FALLBACK_DASHBOARD.recentOrders;

  return (
    <div className="admin-page">
      <div className="stat-grid">
        <StatCard label="Total Revenue" value={money(stats?.totalRevenue ?? 0)} />
        <StatCard label="Total Orders" value={stats?.totalOrders ?? 0} />
        <StatCard label="Total Products" value={stats?.totalProducts ?? 0} />
        <StatCard dark label="Low Stock Alert" value={stats?.lowStockCount ?? 0} note="Items with 10 or fewer units" />
      </div>

      <div className="dashboard-grid">
        <AdminPanel title="Revenue Trend">
          <RevenueTrendChart data={revenueTrend} />
        </AdminPanel>
        <AdminPanel title="Sales by Category">
          <CategoryDonutChart data={salesByCategory} />
        </AdminPanel>
      </div>

      <div className="dashboard-grid">
        <AdminPanel title="Low Stock Inventory">
          <AdminTable columns={['Product', 'Artist', 'In stock']}>
            {lowStock.map((item, idx) => (
              <tr key={item._id || item.id || idx}>
                <td>{item.name || '—'}</td>
                <td>{item.artist?.name || (typeof item.artist === 'string' ? item.artist : '—')}</td>
                <td>{item.quantity ?? 0}</td>
              </tr>
            ))}
          </AdminTable>
        </AdminPanel>

        <AdminPanel title="Recent Orders">
          <AdminTable columns={['Order', 'Customer', 'Total', 'Status']}>
            {recentOrders.map((item, idx) => {
              const customerName = item.userId
                ? typeof item.userId === 'object'
                  ? `${item.userId.firstName || ''} ${item.userId.lastName || ''}`.trim() || item.userId.email || 'Customer'
                  : item.userId
                : 'Customer';
              const orderId = String(item._id || item.orderNumber || idx);
              return (
                <tr key={item._id || idx}>
                  <td>#{orderId.length > 6 ? orderId.slice(-6) : orderId}</td>
                  <td>{customerName}</td>
                  <td>{money(item.totalAmount ?? 0)}</td>
                  <td><AdminBadge status={item.status || item.deliveryStatus || 'pending'} /></td>
                </tr>
              );
            })}
          </AdminTable>
        </AdminPanel>
      </div>
    </div>
  );
}
