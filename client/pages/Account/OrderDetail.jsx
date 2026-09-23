// pages/Account/OrderDetail.jsx
// หน้ารายละเอียดคำสั่งซื้อ — อ้างอิงดีไซน์ Rounded 2xl อัพเดตตาม UI ในรูปตัวอย่าง
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../../src/api/orders.api';
import { OrderStepper } from '../../src/components/ui/OrderStepper';
import { OrderStatusBadge } from '../../src/components/ui/OrderStatusBadge';
import { getItemImage } from './OrderHistory';

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const data = await getOrderById(orderId);
        setOrder(data.order || null);
      } catch {
        setOrder(null);
      }
      setLoading(false);
    }
    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="p-8 font-sans text-sm text-gray-500">Loading order details...</div>;

  if (!order) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200/80 p-8 shadow-sm">
        <h2 className="font-sans font-bold text-lg mb-4 text-gray-900">Order Not Found</h2>
        <button
          onClick={() => navigate('/account/orders')}
          className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-sans text-xs font-semibold rounded-xl hover:bg-gray-50 shadow-sm transition-all cursor-pointer"
        >
          &larr; Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-sm flex flex-col gap-6">
      {/* Back link & Header */}
      <div className="pb-4 border-b border-gray-100 flex flex-col gap-3">
        <button
          onClick={() => navigate('/account/orders')}
          className="font-sans font-semibold text-xs text-[#685bc7] hover:underline cursor-pointer flex items-center gap-1"
        >
          &larr; Back to Order History
        </button>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-sans font-bold text-xl text-gray-900 tracking-tight">
            Order #{order._id.slice(-6).toUpperCase()}
          </h2>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      {/* Stepper */}
      <OrderStepper currentStatus={order.status} />

      {/* Items Section */}
      <div>
        <h3 className="font-sans font-semibold text-xs uppercase tracking-wider text-gray-500 mb-4">
          Items in Order
        </h3>
        <div className="flex flex-col gap-3">
          {order.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-200/80 bg-white shadow-2xs hover:border-gray-300 transition-all"
            >
              <img
                src={getItemImage(item)}
                alt={item.name}
                className="w-16 h-16 rounded-xl object-cover border border-gray-100 shadow-sm shrink-0 bg-gray-50"
              />
              <div className="flex flex-col flex-1 min-w-0 gap-0.5">
                <span className="text-[10px] font-bold text-[#ff5b30] uppercase tracking-wider">
                  MERCHROOM OFFICIAL
                </span>
                <h4 className="font-sans font-bold text-sm text-gray-900 truncate">
                  {item.name}
                </h4>
                <span className="font-sans text-xs text-gray-500">
                  QTY: {item.quantity} &times; ฿{item.price.toLocaleString()}
                </span>
              </div>
              <div className="font-sans font-bold text-sm text-gray-900">
                ฿{(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info & Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 pt-4 border-t border-gray-100">
        <div className="flex flex-col gap-4">
          <div className="p-5 rounded-xl border border-gray-200/80 bg-gray-50/50 flex flex-col gap-2">
            <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-gray-500 mb-1">
              Shipping Info
            </h4>
            <p className="font-sans text-xs text-gray-800">
              <span className="font-semibold text-gray-900">Carrier:</span> {order.shippingProvider}
            </p>
            <p className="font-sans text-xs text-gray-800">
              <span className="font-semibold text-gray-900">Address:</span> {order.shippingAddress}
            </p>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="bg-gray-900 text-white p-5 rounded-xl flex flex-col gap-3 shadow-sm">
          <h4 className="font-sans font-semibold text-xs uppercase tracking-wider text-gray-400 mb-1">
            Order Summary
          </h4>
          <div className="flex justify-between text-xs font-sans text-gray-300">
            <span>Total Amount</span>
            <span className="font-semibold text-white">฿{order.totalAmount.toLocaleString()}</span>
          </div>
          <div className="h-[1px] bg-gray-800 my-1" />
          <div className="flex justify-between font-sans font-bold text-base text-white">
            <span>Grand Total</span>
            <span>฿{order.totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
