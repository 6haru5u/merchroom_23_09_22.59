// ไฟล์: client/src/components/ui/Placeholder.jsx
// คอมโพเนนต์แสดงกล่องสำรองเมื่อไม่มีรูปภาพ (Fallback Placeholder)
// เรียกมาจาก: CategoriesGrid, GenreCircles, LandingCarousel, RoadToThaiArtist, ProductCard
// หน้าที่: แสดงกล่องข้อความสีครีมแทน เพื่อไม่ให้โครงสร้างหน้าเว็บยุบตอนที่ยังไม่มีรูป
export default function Placeholder({ label = 'Image', className = '' }) {
  return (
    <div
      className={`flex items-center justify-center bg-cream p-4 text-center text-xs font-medium text-muted select-none ${className}`}
    >
      <span>{label}</span>
    </div>
  );
}
