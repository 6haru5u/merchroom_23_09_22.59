import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// ไฟล์: client/src/components/ui/Breadcrumb.jsx
// คอมโพเนนต์แถบนำทางบอกลำดับหน้า (Breadcrumbs)
// เรียกมาจาก: Product.jsx, ProductDetail.jsx, Checkout.jsx, OrderConfirmation.jsx
// รับข้อมูลผ่าน: prop items ในรูปแบบ array [{ label: 'ข้อความ', to: '/เส้นทาง' }]
export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted">
      {items.map((item, index) => {
        // เช็คว่าเป็นลำดับสุดท้าย (หน้าปัจจุบัน) หรือไม่
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-2">
            {/* แสดงไอคอนลูกศรคั่นระหว่างรายการ ยกเว้นตัวแรก */}
            {index > 0 && <ChevronRight className="size-4 shrink-0 text-muted/60" />}
            {/* ถ้ามี path `to` และไม่ใช่หน้าปัจจุบัน ให้ทำเป็น Link กดคลิกได้ */}
            {item.to && !isLast ? (
              <Link to={item.to} className="transition hover:text-ink hover:underline">
                {item.label}
              </Link>
            ) : (
              // หน้าปัจจุบันให้แสดงเป็นตัวอักษรเข้ม ไม่ต้องมีลิงก์
              <span className={isLast ? 'font-medium text-ink' : ''}>{item.label}</span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
