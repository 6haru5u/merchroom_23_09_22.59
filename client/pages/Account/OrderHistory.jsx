// pages/Account/OrderHistory.jsx
// หน้าประวัติคำสั่งซื้อ — อ้างอิงดีไซน์ ฟิลเตอร์ แท็บ และการ์ดสินค้าตาม UI ในรูปตัวอย่าง
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from '../../src/context/AccountContext';
import { OrderStatusBadge } from '../../src/components/ui/OrderStatusBadge';
import { products } from '../../src/data/product';
import { ChevronDown, X } from 'lucide-react';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&q=80';

export function getItemImage(item) {
  if (!item) return DEFAULT_IMAGE;
  if (item.image) return item.image;
  if (item.imageUrl) return item.imageUrl;
  if (item.img) return item.img;

  const found = products.find(
    (p) =>
      p.id === item.productId ||
      p.id === item._id ||
      p.name.toLowerCase() === (item.name || '').toLowerCase() ||
      (item.name && p.name.toLowerCase().includes(item.name.toLowerCase()))
  );

  return found?.image || DEFAULT_IMAGE;
}

export default function OrderHistory() {
  const { orders, loading } = useAccount();
  const navigate = useNavigate();

  // ตัวกรองช่วงเวลา และสถานะ
  const [filterRange, setFilterRange] = useState('ALL_TIME'); // ALL_TIME | LAST_30
  const [filterStatus, setFilterStatus] = useState('ALL'); // ALL | delivered | pending | shipping | cancelled

  // ฟังก์ชันกรองรายการคำสั่งซื้อ
  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    let result = [...orders];

    // กรองตามสถานะ
    if (filterStatus !== 'ALL') {
      result = result.filter(
        (o) => (o.status || '').toLowerCase() === filterStatus.toLowerCase()
      );
    }

    // กรองตามช่วงเวลา 30 วัน
    if (filterRange === 'LAST_30') {
      const now = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);

      const recent = result.filter((order) => {
        const orderDate = new Date(order.createdAt || order.purchaseDate);
        return orderDate >= thirtyDaysAgo;
      });

      if (recent.length === 0 && result.length > 0) {
        const timestamps = result.map((o) =>
          new Date(o.createdAt || o.purchaseDate).getTime()
        );
        const maxTimestamp = Math.max(...timestamps);
        const cutoff = new Date(maxTimestamp);
        cutoff.setDate(cutoff.getDate() - 30);
        return result.filter(
          (o) => new Date(o.createdAt || o.purchaseDate) >= cutoff
        );
      }
      return recent;
    }

    return result;
  }, [orders, filterRange, filterStatus]);

  // ฟอร์แมตวันที่
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const clearAllFilters = () => {
    setFilterRange('ALL_TIME');
    setFilterStatus('ALL');
  };

  if (loading) return <div className="p-8 font-sans text-sm text-gray-500">Loading orders...</div>;

  return (
    <div className="flex flex-col gap-6">
      {/* Filter Box Card — อ้างอิงกล่อง Filter ในรูปตัวอย่าง */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Sort & Filter Orders
          </span>
          <h3 className="text-base font-bold text-gray-900">
            Order History Filters
          </h3>
        </div>

        {/* Dropdown Filters Row */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Filter Range Dropdown */}
          <div className="relative">
            <select
              value={filterRange}
              onChange={(e) => setFilterRange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-9 text-sm font-semibold text-gray-800 shadow-sm focus:border-[#685bc7] focus:ring-2 focus:ring-[#685bc7]/20 outline-none cursor-pointer hover:border-gray-300 transition-all"
            >
              <option value="ALL_TIME">Date Range: All Time</option>
              <option value="LAST_30">Date Range: Last 30 Days</option>
            </select>
            <ChevronDown className="size-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Filter Status Dropdown */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-9 text-sm font-semibold text-gray-800 shadow-sm focus:border-[#685bc7] focus:ring-2 focus:ring-[#685bc7]/20 outline-none cursor-pointer hover:border-gray-300 transition-all"
            >
              <option value="ALL">Status: All</option>
              <option value="delivered">Status: Delivered</option>
              <option value="pending">Status: Pending</option>
              <option value="shipping">Status: Shipping</option>
              <option value="cancelled">Status: Cancelled</option>
            </select>
            <ChevronDown className="size-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filter Tags Row — อ้างอิงแท็กปุ่มสีดำในรูปตัวอย่าง (Fashion X, Thailand X) */}
      {(filterRange !== 'ALL_TIME' || filterStatus !== 'ALL') && (
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {filterRange === 'LAST_30' && (
              <span className="inline-flex items-center gap-2 bg-black text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                Last 30 Days
                <button
                  type="button"
                  onClick={() => setFilterRange('ALL_TIME')}
                  className="hover:opacity-75 cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              </span>
            )}
            {filterStatus !== 'ALL' && (
              <span className="inline-flex items-center gap-2 bg-black text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm capitalize">
                Status: {filterStatus}
                <button
                  type="button"
                  onClick={() => setFilterStatus('ALL')}
                  className="hover:opacity-75 cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs font-medium text-gray-400 hover:text-gray-700 underline cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Orders List / Table Container */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200/80 p-12 text-center shadow-sm">
          <p className="font-sans text-sm text-gray-500 font-medium">No orders found matching your filters.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOrders.map((order) => {
            const displayOrderId = order.orderNumber
              ? `#${order.orderNumber.replace(/^#/, '')}`
              : `#${order._id.slice(-6).toUpperCase()}`;
            const orderDate = formatDate(order.createdAt || order.purchaseDate);
            const formattedTotal = Number(order.totalAmount || 0).toLocaleString();

            const items = order.items || [];
            const firstItem = items[0];
            const otherItemsCount = items.length - 1;

            return (
              <div
                key={order._id}
                className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gray-300 transition-all"
              >
                {/* Left Section: Product Image & Details */}
                <div className="flex items-center gap-4 min-w-0">
                  {firstItem && (
                    <img
                      src={getItemImage(firstItem)}
                      alt={firstItem.name}
                      className="w-20 h-20 rounded-xl object-cover border border-gray-100 shadow-sm shrink-0 bg-gray-50"
                    />
                  )}
                  <div className="flex flex-col gap-1 min-w-0">
                    {/* Small Orange Category/Brand Tag — อ้างอิงแท็ก SACIT สีส้มในรูปตัวอย่าง */}
                    <span className="text-[10px] font-bold text-[#ff5b30] uppercase tracking-wider">
                      MERCHROOM OFFICIAL
                    </span>
                    <h4 className="font-sans font-bold text-sm text-gray-900 truncate max-w-[200px] sm:max-w-[320px]">
                      {firstItem?.name || 'Item Name'}
                    </h4>
                    {otherItemsCount > 0 && (
                      <span className="text-xs text-gray-500 font-medium">
                        +{otherItemsCount} more item{otherItemsCount > 1 ? 's' : ''}
                      </span>
                    )}
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-medium mt-0.5">
                      <span>{displayOrderId}</span>
                      <span>•</span>
                      <span>{orderDate}</span>
                    </div>
                  </div>
                </div>

                {/* Right Section: Status, Total Price & Action Button */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <div className="flex items-center gap-3">
                    <OrderStatusBadge status={order.status} />
                    <span className="font-sans font-bold text-base text-gray-900">
                      ฿{formattedTotal}
                    </span>
                  </div>

                  {/* Primary Orange Action Button — อ้างอิงปุ่ม Add to Cart สีส้มในรูปตัวอย่าง */}
                  <button
                    type="button"
                    onClick={() => navigate(`/account/orders/${order._id}`)}
                    className="px-5 py-2.5 bg-[#ff5b30] hover:bg-[#e04820] text-white rounded-xl font-sans font-semibold text-xs shadow-sm transition-all cursor-pointer shrink-0"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}