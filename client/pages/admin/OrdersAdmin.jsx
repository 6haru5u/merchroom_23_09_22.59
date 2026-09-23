import { useCallback, useEffect, useState } from 'react';
import { Download, SlidersHorizontal } from 'lucide-react';
import { createManualOrder, getOrders, getOrderStats, subscribeToOrderEvents, updateOrderStatus } from '../../src/api/orders.api';
import { getCustomers } from '../../src/api/users.api';
import { getProducts } from '../../src/api/products.api';
import { getOrders as getMockOrders } from '../../src/data/mockup/mockOrders';
import formatCurrency from '../../src/utils/formatCurrency';
import AdminPanel from '../../src/components/admin/AdminPanel';
import AdminTable from '../../src/components/admin/AdminTable';
import AdminBadge from '../../src/components/admin/AdminBadge';
import StatCard from '../../src/components/admin/StatCard';

const filters = ['all', 'pending', 'processing', 'shipped', 'completed', 'cancelled'];
const statuses = filters.slice(1);

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [manualOrder, setManualOrder] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [manualError, setManualError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [orderData, statData] = await Promise.all([
        getOrders({ status: filter, page, search }),
        getOrderStats(),
      ]);
      if (orderData && Array.isArray(orderData.orders) && orderData.orders.length > 0) {
        setOrders(orderData.orders);
        setPagination(orderData.pagination || { page: 1, limit: 10, total: orderData.orders.length, totalPages: 1 });
        setStats(statData?.stats || null);
        setLoading(false);
        return;
      }
    } catch {
      // Backend unavailable, fallback to mock orders
    }

    let filtered = getMockOrders() || [];
    if (filter !== 'all') {
      filtered = filtered.filter((o) => (o.deliveryStatus || o.status) === filter);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter((o) => {
        const idMatch = (o._id && String(o._id).toLowerCase().includes(q)) || (o.orderNumber && o.orderNumber.toLowerCase().includes(q));
        const userMatch = typeof o.userId === 'object'
          ? `${o.userId.firstName || ''} ${o.userId.lastName || ''} ${o.userId.phone || ''}`.toLowerCase().includes(q)
          : String(o.userId || '').toLowerCase().includes(q);
        return idMatch || userMatch;
      });
    }
    const limit = 10;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const pagedOrders = filtered.slice((currentPage - 1) * limit, currentPage * limit);

    setOrders(pagedOrders);
    setPagination({ page: currentPage, limit, total, totalPages });
    setStats({
      todayOrders: 14,
      pendingPayment: 5,
      awaitingFulfillment: 9,
      shipped: 42,
    });
    setLoading(false);
  }, [filter, page, search]);

  useEffect(() => {
    const timer = window.setTimeout(load, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  useEffect(() => {
    const unsubscribe = subscribeToOrderEvents(() => load());
    const fallbackPoll = window.setInterval(load, 15000);
    return () => {
      unsubscribe();
      window.clearInterval(fallbackPoll);
    };
  }, [load]);

  const openManualOrder = async () => {
    setManualError('');
    setManualOrder({ userId: '', productId: '', quantity: 1, shippingAddress: '', shippingProvider: 'Standard Delivery' });
    try {
      const [customerData, productData] = await Promise.all([getCustomers(), getProducts()]);
      setCustomers(customerData.users || []);
      setProducts(productData.products || []);
    } catch {
      setManualError('Unable to load customers or products. Please check your admin session and try again.');
    }
  };

  const submitManualOrder = async (event) => {
    event.preventDefault();
    setManualError('');
    try {
      await createManualOrder({
        userId: manualOrder.userId,
        items: [{ productId: manualOrder.productId, quantity: Number(manualOrder.quantity) }],
        shippingAddress: manualOrder.shippingAddress,
        shippingProvider: manualOrder.shippingProvider,
      });
      setManualOrder(null);
      load();
    } catch (err) {
      setManualError(err?.message || 'Unable to create manual order.');
    }
  };

  const changeStatus = async (id, status) => {
    try {
      const { order } = await updateOrderStatus(id, status);
      setOrders((current) => current.map((item) => (item._id === id ? order : item)));
    } catch {
      setOrders((current) => current.map((item) => (item._id === id ? { ...item, status, deliveryStatus: status } : item)));
    }
  };

  const exportCsv = () => {
    const rows = [
      ['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Courier', 'Date'],
      ...(orders || []).map((o) => {
        const customerName = typeof o.userId === 'object' ? `${o.userId.firstName || ''} ${o.userId.lastName || ''}`.trim() : String(o.userId || '');
        const itemsList = Array.isArray(o.items) ? o.items.map((i) => `${i.name} ×${i.quantity}`).join(' | ') : '';
        return [
          `#${String(o._id || o.orderNumber || '').slice(-8)}`,
          customerName,
          itemsList,
          o.totalAmount,
          o.status || o.deliveryStatus || '',
          o.shippingProvider || '',
          new Date(o.purchaseDate || o.createdAt || Date.now()).toLocaleDateString(),
        ];
      }),
    ];
    const blob = new Blob([rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `merchroom-orders-page-${page}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <div className="admin-page">
      <div className="orders-head">
        <div>
          <small>OPERATIONS / FULFILMENT</small>
          <h2>Orders Management</h2>
        </div>
        <div>
          <button className="ghost-btn" onClick={exportCsv}>
            <Download size={15} /> Export CSV
          </button>
          <button className="primary-btn" onClick={openManualOrder}>
            Create Manual Order
          </button>
        </div>
      </div>

      <div className="stat-grid order-stats">
        <StatCard label="Today's Orders" value={stats?.todayOrders ?? '—'} />
        <StatCard label="Pending Payment" value={stats?.pendingPayment ?? '—'} />
        <StatCard label="Awaiting Fulfilment" value={stats?.awaitingFulfillment ?? '—'} />
        <StatCard dark label="Shipped / Completed" value={stats?.shipped ?? '—'} />
      </div>

      <AdminPanel
        title="All Orders"
        action={
          <div className="order-tools">
            <input
              value={search}
              placeholder="Search customer or phone"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <button className="ghost-btn" aria-expanded={filtersOpen} onClick={() => setFiltersOpen((open) => !open)}>
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>
        }
      >
        {filtersOpen && (
          <div className="filter-pills" aria-label="Filter orders by status">
            {filters.map((item) => (
              <button
                key={item}
                className={filter === item ? 'active' : ''}
                onClick={() => {
                  setFilter(item);
                  setPage(1);
                  setFiltersOpen(false);
                }}
              >
                {item === 'all' ? 'All orders' : item}
              </button>
            ))}
          </div>
        )}

        {error ? (
          <div className="order-state">
            <p>{error}</p>
            <button className="primary-btn" onClick={load}>
              ลองใหม่
            </button>
          </div>
        ) : loading ? (
          <div className="order-state">Loading orders…</div>
        ) : safeOrders.length === 0 ? (
          <div className="order-state">ยังไม่มีคำสั่งซื้อในสถานะนี้</div>
        ) : (
          <>
            <AdminTable columns={['Order ID', 'Customer', 'Items', 'Total', 'Payment', 'Status', 'Courier', 'Date']}>
              {safeOrders.map((order) => {
                const customerName = order.userId
                  ? typeof order.userId === 'object'
                    ? `${order.userId.firstName || ''} ${order.userId.lastName || ''}`.trim() || order.userId.email || 'Customer'
                    : order.userId
                  : 'Unknown customer';
                const phone = (typeof order.userId === 'object' ? order.userId.phone : '') || order.phone || 'No phone';
                const currentStatus = order.status || order.deliveryStatus || 'pending';
                const orderId = String(order._id || order.orderNumber || '');

                return (
                  <tr key={order._id || order.orderNumber}>
                    <td>#{orderId.length > 8 ? orderId.slice(-8) : orderId}</td>
                    <td>
                      <b>{customerName}</b>
                      <small className="table-sub">{phone}</small>
                    </td>
                    <td>
                      {order.items?.map((item) => (
                        <div key={`${item.productId || item.name}-${item.name}`}>
                          {item.name} ×{item.quantity}
                        </div>
                      ))}
                    </td>
                    <td>{formatCurrency(order.totalAmount || 0)}</td>
                    <td>
                      <AdminBadge status={order.payment?.status || order.paymentStatus || 'pending'} />
                      <small className="table-sub">{order.payment?.method || 'PromptPay'}</small>
                    </td>
                    <td>
                      <select
                        aria-label="Change order status"
                        value={currentStatus}
                        onChange={(e) => changeStatus(order._id, e.target.value)}
                      >
                        {statuses.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <AdminBadge status={currentStatus} />
                    </td>
                    <td>{order.shippingProvider || 'Flash Express'}</td>
                    <td>{order.purchaseDate || order.createdAt ? new Date(order.purchaseDate || order.createdAt).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' }) : '—'}</td>
                  </tr>
                );
              })}
            </AdminTable>

            {pagination && (
              <div className="pagination">
                <span>
                  Showing {((pagination.page - 1) * pagination.limit) + 1}–
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
                </span>
                <div>
                  <button disabled={pagination.page === 1} onClick={() => setPage((current) => current - 1)}>
                    Previous
                  </button>
                  <span>
                    {pagination.page} / {pagination.totalPages || 1}
                  </span>
                  <button
                    disabled={pagination.page >= pagination.totalPages}
                    onClick={() => setPage((current) => current + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </AdminPanel>
      {manualOrder && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="manual-order-title">
          <form className="product-form manual-order-form" onSubmit={submitManualOrder}>
            <button type="button" className="close" onClick={() => setManualOrder(null)}>×</button>
            <h2 id="manual-order-title">Create Manual Order</h2>
            {manualError && <p className="form-error">{manualError}</p>}
            <select required value={manualOrder.userId} onChange={(e) => setManualOrder({ ...manualOrder, userId: e.target.value })}>
              <option value="">Select customer</option>
              {customers.map((customer) => <option key={customer._id} value={customer._id}>{customer.firstName} {customer.lastName} {customer.phone ? `(${customer.phone})` : ''}</option>)}
            </select>
            <select required value={manualOrder.productId} onChange={(e) => setManualOrder({ ...manualOrder, productId: e.target.value })}>
              <option value="">Select product</option>
              {products.map((product) => <option key={product._id} value={product._id}>{product.name} — {product.quantity ?? 0} in stock</option>)}
            </select>
            <input required type="number" min="1" placeholder="Quantity" value={manualOrder.quantity} onChange={(e) => setManualOrder({ ...manualOrder, quantity: e.target.value })} />
            <input placeholder="Shipping address (optional if customer has one)" value={manualOrder.shippingAddress} onChange={(e) => setManualOrder({ ...manualOrder, shippingAddress: e.target.value })} />
            <select value={manualOrder.shippingProvider} onChange={(e) => setManualOrder({ ...manualOrder, shippingProvider: e.target.value })}>
              <option>Standard Delivery</option><option>Flash Express</option><option>Kerry Express</option>
            </select>
            <button className="primary-btn">Create order</button>
          </form>
        </div>
      )}
    </div>
  );
}

