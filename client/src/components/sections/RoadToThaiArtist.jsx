// ไฟล์: client/src/components/sections/RoadToThaiArtist.jsx
// ส่วนจัดแสดงคอลเลกชันนิทรรศการ Road to Thai Artist (บอร์ดจัดแสดงสไตล์ Editorial)
// เรียกมาจาก: Home.jsx (วางเป็น section ล่างสุดของหน้าแรกก่อนถึง footer)
// แหล่งข้อมูล: roadToThaiArtist จาก src/data/sections.js และข้อมูลสินค้าจาก src/data/product.js
import { useEffect, useRef, useState } from 'react';
import { products, roadToThaiArtist } from '../../data/sections';
import Container from '../ui/Container';
import ScaledStage from '../ui/ScaledStage';
import Placeholder from '../ui/Placeholder';

// ฟังก์ชันช่วยดึงข้อมูลสินค้าจาก array products ตาม id
function findProduct(id) {
  return products.find((p) => p.id === id);
}

// พิกัดตำแหน่ง absolute (x, y, width) ของการ์ด Pop Culture บนบอร์ด 1320x815px
const POP_LAYOUT = [
  { left: 23, top: 56, width: 280 },
  { left: 301, top: 146, width: 232 },
  { left: 473, top: 59, width: 209 },
];

// พิกัดตำแหน่ง absolute ของการ์ดฝั่งศิลปินไทย
const THAI_LAYOUT = [
  { left: 129, top: 497, width: 257 },
  { left: 303, top: 462, width: 200 },
  { left: 459, top: 490, width: 200 },
];

// พิกัดและขนาดรูปสินค้าหัตถกรรมไทยในกรอบขวาล่าง
const CRAFT_LAYOUT = [
  { left: 45, top: 96, w: 111, h: 111 },
  { left: 143, top: 63, w: 137, h: 205 },
  { left: 262, top: 33, w: 144, h: 192 },
  { left: 390, top: 44, w: 171, h: 257 },
  { left: -69, top: 166, w: 278, h: 185 },
  { left: 268, top: 215, w: 132, h: 88 },
];

// ป้ายตัวเลขกลมๆ สไตล์ editorial บอกหมายเลขโซน เช่น 01, 02, 03
function Badge({ number, className = '' }) {
  return (
    <div
      className={`absolute z-30 grid size-15 place-items-center rounded-pill shadow-card ${className}`}
    >
      <span className="font-editorial text-[32px] font-bold text-white">{number}</span>
    </div>
  );
}

// คอมโพเนนต์ทำ Scroll Reveal Animation โดยใช้ IntersectionObserver
// ดักจับเมื่อผู้ใช้เลื่อนจอมาถึง threshold 20% แล้วค่อย fade in และลอยเข้าสู่ตำแหน่งจริง
function Reveal({ delay = 0, x = 0, y = 40, className = '', style, children }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: inView
          ? style?.transform
          : `${style?.transform ?? ''} translate(${x}px, ${y}px)`,
        opacity: inView ? 1 : 0,
        transition: `transform 700ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity 500ms ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// การ์ดแสดงรูปสไตล์โพลารอยด์สีขาว (สำหรับฝั่ง Pop Culture) พร้อมองศาเอียงและการแสดงรูปซ้อน
function PopPolaroid({ item, layout }) {
  const product = findProduct(item.productId);
  if (!product) return null;
  const overlay = item.overlayProductId ? findProduct(item.overlayProductId) : null;
  const captionProduct = overlay ?? product;

  return (
    <div
      className="z-10 bg-white p-5 pb-3 shadow-card"
      style={{ width: layout.width, transform: `rotate(${item.rotate}deg)`, transformOrigin: 'center' }}
    >
      <div className="relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        ) : (
          <Placeholder label={product.name} className="aspect-square" />
        )}
        {/* เลเยอร์รูปซ้อนเหลื่อมกันเล็กน้อย เพิ่มมิติแบบงานคอลลาจ */}
        {overlay?.image && (
          <img
            src={overlay.image}
            alt={overlay.name}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ transform: 'rotate(0.6deg)' }}
          />
        )}
      </div>
      <p className="mt-2 line-clamp-1 text-center font-mono text-sm font-light text-black">
        {captionProduct.name}
      </p>
    </div>
  );
}

// การ์ดแสดงรูปสไตล์โพลารอยด์พื้นดำ (สำหรับฝั่งศิลปินไทย)
function ThaiPolaroid({ item, layout }) {
  const product = findProduct(item.productId);
  if (!product) return null;

  return (
    <div
      className="z-10 bg-ink p-2 pb-3 shadow-card"
      style={{ width: layout.width, transform: `rotate(${item.rotate}deg)`, transformOrigin: 'center' }}
    >
      <div className={`w-full overflow-hidden ${item.wide ? 'aspect-244/159' : 'aspect-square'}`}>
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <Placeholder label={product.name} className="h-full" />
        )}
      </div>
      <p className="mt-2 line-clamp-1 text-center font-mono text-sm font-light text-white">
        {product.name}
      </p>
    </div>
  );
}

// ส่วนจัดแสดงคอลเลกชัน "Road to Thai Artist" สไตล์บอร์ดนิทรรศการ (Editorial Stage)
// ใช้ ScaledStage คุมขนาด 1320x815px แล้วให้ทั้งบอร์ดย่อ-ขยายตามขนาดหน้าจอแบบอัตโนมัติ
export default function RoadToThaiArtist() {
  const { pop, thai, handcraft, vinylProductId } = roadToThaiArtist;
  const vinyl = findProduct(vinylProductId);
  const craftImages = handcraft.filter(Boolean);

  return (
    <section className="pb-12">
      <Container>
        {/* ครอบด้วย ScaledStage เพื่อรักษาอัตราส่วนพิกัด x,y ขององค์ประกอบทั้งหมดในบอร์ด */}
        <ScaledStage width={1320} height={815}>
          <div className="relative h-203.75 w-330">  
            {/* โซนที่ 1: การ์ดโพลารอยด์ฝั่งสากล (Pop Culture) ลอยเยื้องซ้ายบน */}
            {pop.map((item, idx) => (
              <Reveal
                key={item.id}
                delay={150 + idx * 120}
                x={-90}
                y={60}
                className="absolute"
                style={{ left: POP_LAYOUT[idx].left, top: POP_LAYOUT[idx].top }}
              >
                <PopPolaroid item={item} layout={POP_LAYOUT[idx]} />
              </Reveal>
            ))}

            {/* แผ่นเสียงไวนิลชิ้นไฮไลต์ตรงกลางขวา */}
            <Reveal delay={200} y={50} className="absolute" style={{ left: 714, top: 0 }}>
              <div className="h-99 w-100.75 bg-black p-3 shadow-card">
                <div className="flex h-full w-full items-center justify-center bg-ink p-2">
                  {vinyl?.image ? (
                    <img
                      src={vinyl.image}
                      alt={vinyl.name}
                      className="h-88.5 w-88.5 object-contain"
                    />
                  ) : (
                    <Placeholder label="Vinyl" className="h-full w-full" />
                  )}
                </div>
              </div>
            </Reveal>

            {/* ป้ายคำบรรยายและ Badge หมายเลข 01 */}
            <Reveal
              x={-140}
              y={24}
              className="absolute left-15 top-3 z-30 w-70.25"
              style={{ transform: 'rotate(-4.53deg)', transformOrigin: 'center' }}
            >
              <p className="font-editorial text-[32px] font-bold italic leading-10 text-primary-deep">
                collection of stories and connections
              </p>
            </Reveal>
            <Badge number="01" className="left-0 top-12.25 bg-primary-deep" />

            {/* ข้อความสไตล์นิตยสารกำกับข้างแผ่นเสียง */}
            <Reveal
              delay={350}
              y={30}
              className="absolute left-256 top-103.5 z-10 w-69.25"
              style={{ transform: 'rotate(0.88deg)', transformOrigin: 'center' }}
            >
              <p className="text-right font-editorial text-xl font-bold text-black">
                the centerpiece — a record worth the shelf space
              </p>
            </Reveal>

            {/* หัวเรื่องโซน 02 "Road to Thai Artist" */}
            <Reveal
              x={-120}
              y={40}
              className="absolute left-44.5 top-106.5 z-30 w-32.5"
              style={{ transform: 'rotate(3.03deg)', transformOrigin: 'center' }}
            >
              <p className="font-editorial text-2xl font-bold italic leading-7.5 text-violet">
                Road to Thai Artist
              </p>
            </Reveal>
            <Badge number="02" className="left-27 top-115 bg-violet" />

            {/* โซนที่ 2: การ์ดสินค้าศิลปินไทย */}
            {thai.map((item, idx) => (
              <Reveal
                key={item.id}
                delay={150 + idx * 120}
                x={-60}
                y={90}
                className="absolute"
                style={{ left: THAI_LAYOUT[idx].left, top: THAI_LAYOUT[idx].top }}
              >
                <ThaiPolaroid item={item} layout={THAI_LAYOUT[idx]} />
              </Reveal>
            ))}

            {/* โน้ตสติกเกอร์การ์ด Merchroom สไตล์บันทึกของนักสะสม */}
            <Reveal
              delay={500}
              x={60}
              y={-50}
              className="absolute left-155.5 top-82.75 z-30 w-61.5"
              style={{ transform: 'rotate(-10.73deg)', transformOrigin: 'center' }}
            >
              <div className="bg-white p-4 shadow-card">
                <div className="flex items-center gap-2">
                  <span className="size-5 rounded-pill border border-ink bg-violet" aria-hidden="true" />
                  <span className="font-editorial text-xl font-bold italic text-primary">
                    MERCHROOM
                  </span>
                </div>
                <span className="mt-1 block h-0.75 w-39.25 bg-highlight" />
                <p className="mt-2 font-mono text-sm font-light leading-snug text-black">
                  Two headline artists, one weekend haul — tour merch worth keeping.
                </p>
              </div>
            </Reveal>

            {/* โซนที่ 3: กรอบรวมงานหัตถกรรมไทย (Thai Handcraft Edit) พร้อม Badge 03 */}
            <Reveal x={140} y={60} className="absolute" style={{ left: 756, top: 464 }}>
              <div className="relative h-76.5 w-139.5 border-[5px] border-black bg-white shadow-card">
                <Badge number="03" className="left-8.5 top-8.25 bg-highlight" />
                <h3 className="absolute left-25 top-10.75 font-editorial text-[32px] font-bold italic text-ink">
                  Thai Handcraft Edit
                </h3>

                {craftImages.map((src, idx) => (
                  <img
                    key={src}
                    src={src}
                    alt={`หัตถกรรม ${idx + 1}`}
                    className="absolute object-contain"
                    style={{
                      left: CRAFT_LAYOUT[idx].left,
                      top: CRAFT_LAYOUT[idx].top,
                      width: CRAFT_LAYOUT[idx].w,
                      height: CRAFT_LAYOUT[idx].h,
                    }}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </ScaledStage>
      </Container>
    </section>
  );
}