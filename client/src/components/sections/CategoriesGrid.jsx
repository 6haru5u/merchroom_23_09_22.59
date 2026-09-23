import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '../../data/sections';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Placeholder from '../ui/Placeholder';

// ไฟล์: client/src/components/sections/CategoriesGrid.jsx
// ส่วนแสดงกริดการ์ดหมวดหมู่สินค้า (Bento Grid สลับขนาดการ์ด 1 ช่อง กับ 2 ช่อง)
// เรียกมาจาก: Home.jsx (วางเป็น section ถัดลงมาจาก Hero Banner)
// แหล่งข้อมูล: อาเรย์ categories จาก src/data/sections.js
export default function CategoriesGrid() {
  return (
    <section className="py-20">
      <Container>
        {/* หัวข้อส่วนหมวดหมู่ พร้อมคำอธิบายคอนเซปต์ของ Merchroom */}
        <SectionHeading
          eyebrow="Categories"
          title="A Merch for Every Passion"
          description="Whether it's a design from your favorite artist, band merch, or Thai craftsmanship, we've organized it all so you can find what speaks to you. Every interest deserves its own space."
          align="center"
          className="items-center text-center"
        />

        {/* ตาราง Bento Grid 3 คอลัมน์บนจอเดสก์ท็อป สลับขนาดการ์ดตาม index */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {categories.map((cat, idx) => {
            // การ์ดคู่แรก: ใบแรกกว้าง 1 ส่วน ใบสองกว้าง 2 ส่วน
            // การ์ดคู่สอง: ใบแรกกว้าง 2 ส่วน ใบสองกว้าง 1 ส่วน ให้เลย์เอาต์ดูมีลูกเล่น
            const spanMap = ['md:col-span-1', 'md:col-span-2', 'md:col-span-2', 'md:col-span-1'];
            return (
              <Link
                key={cat.id}
                to={`/products?cat=${cat.id}`}
                className={`group relative overflow-hidden rounded-card shadow-card transition hover:brightness-95 ${spanMap[idx]}`}
                style={{
                  backgroundImage: cat.cover ? `url(${cat.cover})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* กำหนดความสูงของการ์ด */}
                <div className="h-72" />

                {/* กรณีไม่มีรูปปก ให้แสดง Placeholder แทน */}
                {!cat.cover && <Placeholder label={cat.title} className="absolute inset-0" />}

                {/* Overlay ไล่เฉดสีดำ ช่วยให้อ่านข้อความสีขาวได้ชัดเจนขึ้น */}
                <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/60" />

                {/* ป้ายชื่อหมวดหมู่มุมบนซ้าย สไตล์ Glassmorphism */}
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-pill bg-white/20 px-5 py-2 backdrop-blur-sm">
                  <span className="text-xl font-medium text-white">{cat.title}</span>
                  <ArrowRight className="size-5 text-white" />
                </div>

                {/* คำบรรยายสั้นๆ ประจำหมวดหมู่วางไว้ด้านล่าง */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="max-w-113 text-base leading-relaxed text-white">
                    {cat.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
