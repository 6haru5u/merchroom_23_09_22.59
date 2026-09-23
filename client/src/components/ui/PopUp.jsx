// ไฟล์: client/src/components/ui/PopUp.jsx
// คอมโพเนนต์หน้าต่างป๊อปอัปแจ้งเตือนหรือโมดัล (Modal Dialog / Overlay PopUp)
// หน้าที่: เรนเดอร์หน้าต่างทับชั้นบนสุดผ่าน React Portal (document.body) พร้อมระบบปิดด้วยปุ่ม Esc หรือคลิกพื้นหลัง
// Props: open (สถานะเปิด/ปิด), onClose (ฟังก์ชันสั่งปิด), children (เนื้อหาข้างใน), className (สไตล์เสริม)
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function PopUp({ open, onClose, children, className = '' }) {
  // ดักจับการกดปุ่ม Escape บนคีย์บอร์ดเพื่อสั่งปิดหน้าต่างอัตโนมัติ
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  // ถ้าสถานะ open เป็น false ไม่ต้องเรนเดอร์อะไรออกมา
  if (!open) return null;

  // ใช้ createPortal ย้าย DOM ไปแปะที่ document.body โดยตรง ป้องกันปัญหา z-index หรือ overflow ของ container แม่
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      {/* กล่องโมดัลสีขาว: ใช้ stopPropagation กันไม่ให้คลิกเนื้อหาข้างในแล้วทะลุไปปิดหน้าต่าง */}
      <div
        className={`relative w-full max-w-md rounded-card bg-white p-6 shadow-card ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ปุ่มปิดมุมบนขวา (เครื่องหมายกากบาท X) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-8 cursor-pointer items-center justify-center rounded-full text-ink/60 transition hover:bg-ink/5 hover:text-ink"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}