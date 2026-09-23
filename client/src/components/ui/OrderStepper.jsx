// src/components/ui/OrderStepper.jsx
// แถบแสดงขั้นตอนสถานะออเดอร์ — ดีไซน์ Rounded 2xl ขอบมน พร้อมสีม่วงและส้มอ้างอิงรูปตัวอย่าง

export const OrderStepper = ({ currentStatus }) => {
  const steps = [
    { id: 'pending', label: 'Pending' },
    { id: 'processing', label: 'Processing' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'delivered', label: 'Delivered' },
  ];

  const getStepIndex = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'pending': return 0;
      case 'processing': return 1;
      case 'shipping': return 2;
      case 'delivered': return 3;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(currentStatus);

  if ((currentStatus || '').toLowerCase() === 'cancelled') {
    return (
      <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50 text-rose-700 font-sans font-semibold text-xs tracking-wider text-center uppercase mb-6 shadow-sm">
        This order has been cancelled
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-6 rounded-2xl border border-gray-200/80 mb-6 overflow-x-auto bg-white shadow-sm">
      {steps.map((step, idx) => {
        const isPassed = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        return (
          <div key={step.id} className="flex flex-col items-center relative flex-1 min-w-[80px]">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-sans font-bold text-xs z-10 transition-all shadow-sm ${
                isPassed
                  ? 'bg-[#685bc7] border-[#685bc7] text-white'
                  : isCurrent
                  ? 'bg-[#ff5b30] border-[#ff5b30] text-white ring-4 ring-[#ff5b30]/20'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}
            >
              {isPassed ? '✓' : idx + 1}
            </div>
            <span
              className={`mt-2 font-sans text-xs uppercase tracking-wider ${
                isCurrent
                  ? 'font-bold text-[#ff5b30]'
                  : isPassed
                  ? 'font-semibold text-gray-900'
                  : 'font-medium text-gray-400'
              }`}
            >
              {step.label}
            </span>
            {idx < steps.length - 1 && (
              <div
                className={`absolute top-4 left-1/2 w-full h-[2px] -z-0 ${
                  idx < currentIndex ? 'bg-[#685bc7]' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};