// src/components/ui/OrderStatusBadge.jsx
// แบดจ์แสดงสถานะคำสั่งซื้อ — อ้างอิงสไตล์ Pill Badges ขอบมนในรูปตัวอย่าง UI

export const OrderStatusBadge = ({ status }) => {
  const s = (status || '').toLowerCase();

  const getStyle = () => {
    switch (s) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'shipping':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'pending':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200 line-through';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const label = (status || 'PENDING').toUpperCase();

  return (
    <span
      className={`inline-flex items-center px-3 py-1 border font-sans text-[11px] font-bold tracking-wider rounded-full shadow-2xs ${getStyle()}`}
    >
      {label}
    </span>
  );
};