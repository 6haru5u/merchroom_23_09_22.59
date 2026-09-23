import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { landingItems } from '../../data/sections';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Placeholder from '../ui/Placeholder';

// ไฟล์: client/src/components/sections/LandingCarousel.jsx
// ส่วนแสดงสไลเดอร์โปสเตอร์อีเวนต์และไฮไลต์สินค้า (Landing Carousel แสดง 5 ใบพร้อมกัน)
// เรียกมาจาก: Home.jsx (วางต่อจากแถบเลื่อน Best Sellers / New Arrival)
// แหล่งข้อมูล: อาเรย์ landingItems จาก src/data/sections.js
export default function LandingCarousel() {
  const [index, setIndex] = useState(0);
  const [activeEvent, setActiveEvent] = useState(null);
  const total = landingItems.length;

  // ฟังก์ชันเลื่อนการ์ดแบบ Circular Loop (วนลูปกลับมาตัวแรก/สุดท้ายได้ไม่รู้จบ)
  const go = (delta) => setIndex((i) => (i + delta + total) % total);

  // ดึง item ตาม offset เทียบกับ index ปัจจุบัน เช่น -2, -1, 0, 1, 2
  const itemAt = (offset) => landingItems[(index + offset + total) % total];
  const current = itemAt(0);

  return (
    <section className="rounded-t-section bg-ink pb-16 pt-10">
      <Container>
        {/* หัวข้อส่วน The Room Talks */}
        <SectionHeading
          eyebrow="The Room Talks"
          title="What's Landing, What's Live"
          align="center"
          onDark
          className="items-center text-center"
        />
      </Container>

      {/* แถวแสดงการ์ดโปสเตอร์ 5 ใบเรียงกัน: ซ้ายสุด ซ้าย กลาง(เด่นสุด) ขวา ขวาสุด */}
      <div className="mt-12 flex w-full items-center justify-center gap-2 px-4 md:gap-3 md:px-0">
        <PosterCard item={itemAt(-2)} size="sm" hiddenOnMobile />
        <PosterCard item={itemAt(-1)} size="sm" onClick={() => go(-1)} ariaLabel="ก่อนหน้า" />
        <PosterCard item={current} size="lg" onClick={current.eventDetails ? () => setActiveEvent(current) : undefined} ariaLabel={`ดูรายละเอียด ${current.title}`} />
        <PosterCard item={itemAt(1)} size="sm" onClick={() => go(1)} ariaLabel="ถัดไป" />
        <PosterCard item={itemAt(2)} size="sm" hiddenOnMobile />
      </div>

      <Container>
        <div className="mt-16 flex items-center justify-between gap-6">
          {/* แถบ Progress Bar แสดงความคืบหน้าของสไลด์ */}
          <div className="h-1.25 w-81 max-w-full overflow-hidden rounded-card bg-muted">
            <div
              className="h-full rounded-card bg-highlight transition-all"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>

          {/* ปุ่มกดเลื่อนซ้าย-ขวา */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="ก่อนหน้า"
              className="grid size-9 place-items-center rounded-pill border border-white text-white transition hover:bg-white hover:text-ink cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="ถัดไป"
              className="grid size-9 place-items-center rounded-pill border border-white text-white transition hover:bg-white hover:text-ink cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

      </Container>
      {activeEvent && <EventDetailsModal event={activeEvent} onClose={() => setActiveEvent(null)} />}
    </section>
  );
}

function EventDetailsModal({ event, onClose }) {
  const { heading, description, ticketInfo, dateVenue } = event.eventDetails;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-labelledby="event-details-title">
      <div className="relative w-full max-w-xl rounded-card bg-cream p-6 text-ink shadow-card md:p-8">
        <button type="button" onClick={onClose} aria-label="ปิดรายละเอียดงาน" className="absolute right-4 top-4 grid size-9 place-items-center rounded-pill text-ink transition hover:bg-black/10 cursor-pointer">
          <X className="size-5" />
        </button>
        <p className="mb-2 pr-10 text-sm font-semibold text-primary-deep">THE ROOM TALKS</p>
        <h2 id="event-details-title" className="pr-8 font-display text-2xl leading-tight md:text-3xl">{heading}</h2>
        <p className="mt-5 text-sm leading-7 text-zinc-700 md:text-base">{description}</p>
        <div className="mt-6 rounded-btn bg-white p-4">
          <p className="font-semibold">{ticketInfo}</p>
          <p className="mt-1 text-sm text-zinc-600">{dateVenue}</p>
        </div>
      </div>
    </div>
  );
}

// การ์ดแสดงโปสเตอร์ภาพ รองรับทั้งขนาดใหญ่ (lg สำหรับรูปตรงกลาง) และขนาดเล็ก (sm สำหรับรูปขนาบข้าง)
function PosterCard({ item, size, onClick, ariaLabel, hiddenOnMobile = false }) {
  const isLg = size === 'lg';
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
      className={`shrink overflow-hidden rounded-card shadow-card ${hiddenOnMobile ? 'hidden lg:block' : ''} ${
        isLg ? 'basis-[50%] md:basis-[28%]' : 'basis-[25%] md:basis-[20%]'
      } ${onClick ? 'cursor-pointer transition hover:brightness-90' : ''}`}
      style={{ aspectRatio: isLg ? '470 / 612' : '394 / 513' }}
    >
      {item.image ? (
        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
      ) : (
        <Placeholder label={item.title} className="h-full" />
      )}
    </div>
  );
}
