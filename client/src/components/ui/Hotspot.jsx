import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// ไฟล์: client/src/components/ui/Hotspot.jsx
// คอมโพเนนต์หมุดปักสินค้าลอยบนภาพ (Hotspot Pin)
// เรียกมาจาก: Home.jsx (แปะบนภาพ Hero Banner ตามพิกัด x, y ใน sections.js)
// ข้อมูลสินค้าส่งต่อมาจาก: src/data/sections.js และ src/data/product.js
export default function Hotspot({ product }) {
  // Guard: ถ้าไม่พบข้อมูลสินค้าชิ้นนั้น ให้ข้ามการเรนเดอร์ทันที เพื่อกัน error
  if (!product) return null;

  return (
    // การ์ดสไตล์ Glassmorphism (โปร่งใส + เบลอหลัง) คลิกแล้วพาไปหน้ารายละเอียดสินค้า
    <Link
      to={`/products/${product.id}`}
      className="block w-36.5 rounded-[18px] bg-white/25 p-3 shadow-xl ring-1 ring-white/50 backdrop-blur-md"
      aria-label={`ดูสินค้า ${product.name}`}
    >
      {/* รูปตัวอย่างสินค้าขนาดย่อ */}
      <div className="h-28.25 w-full overflow-hidden rounded-[9px] bg-cream/60">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-white/80">
            ไม่มีรูป
          </div>
        )}
      </div>

      {/* ชื่อสินค้า (ตัดข้อความให้แสดงแค่บรรทัดเดียว พร้อมใส่ text-shadow ให้อ่านชัด) */}
      <p className="mt-2 line-clamp-1 text-xs font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.35)]">
        {product.name}
      </p>

      {/* ราคาและปุ่มลูกศร */}
      <div className="mt-1.5 flex items-center justify-between">
        <span className="font-[Sarabun] text-sm font-bold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.35)]">
          ฿{Number(product.price || 0).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
        </span>
        <span className="grid size-6 place-items-center rounded-pill bg-primary text-white">
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
