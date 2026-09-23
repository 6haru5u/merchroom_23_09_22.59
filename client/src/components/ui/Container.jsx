// ไฟล์: client/src/components/ui/Container.jsx
// คอมโพเนนต์คุมความกว้างกึ่งกลางหน้าจอ (Container wrapper)
// เรียกมาจาก: Home.jsx, Product.jsx, Cart.jsx, Checkout.jsx และส่วน Sections ต่างๆ
// หน้าที่: ล็อคความกว้างสูงสุดไว้ที่ 1440px (max-w-360) ตามสเปกดีไซน์ Figma พร้อมระยะเว้นขอบข้าง
export default function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-360 px-6 lg:px-15 ${className}`}>
      {children}
    </div>
  );
}
