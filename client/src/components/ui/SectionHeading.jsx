// ไฟล์: client/src/components/ui/SectionHeading.jsx
// คอมโพเนนต์หัวข้อประจำแต่ละ Section (มี eyebrow, title, description)
// เรียกมาจาก: CategoriesGrid, GenreCircles, LandingCarousel, ThaiHeritage, PopCulture
// หน้าที่: คุมสไตล์หัวข้อให้เป็นมาตรฐานเดียวกัน รองรับจัดซ้าย/กึ่งกลาง และโหมดพื้นหลังมืด (onDark)
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  onDark = false,
  className = '',
}) {
  const isCenter = align === 'center';
  return (
    <div
      className={`flex flex-col ${
        isCenter ? 'items-center text-center' : 'items-start text-left'
      } ${className}`}
    >
      {/* ข้อความหมวดหมู่ย่อยตัวพิมพ์ใหญ่ด้านบน (Eyebrow) */}
      {eyebrow && (
        <p
          className={`text-sm font-bold uppercase tracking-wider md:text-base ${
            onDark ? 'text-highlight' : 'text-primary'
          }`}
        >
          {eyebrow}
        </p>
      )}

      {/* หัวข้อหลักประจำ Section (Title) */}
      {title && (
        <h2
          className={`mt-2 font-display text-3xl font-bold leading-tight md:text-5xl ${
            onDark ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      )}

      {/* คำบรรยายเสริมประจำ Section (Description) */}
      {description && (
        <p
          className={`mt-3 max-w-2xl text-base leading-relaxed ${
            onDark ? 'text-cream-text/80' : 'text-black/70'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
