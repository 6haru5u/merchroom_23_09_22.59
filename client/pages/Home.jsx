// ไฟล์: client/pages/Home.jsx
// หน้าแรกของเว็บไซต์ (Landing Page)
// เรียกมาจาก: App.jsx ผ่าน Route path="/"
// แหล่งข้อมูลสินค้า: src/data/product.js และ src/data/sections.js
// ส่วนประกอบย่อยในหน้านี้: Hotspot, ProductCard, CategoriesGrid, StoryCollage, GenreCircles, LandingCarousel, RoadToThaiArtist
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../src/data/product';
import { bestSellerIds, heroHotspots, prod as findProduct } from '../src/data/sections';
import { useCart } from '../src/context/CartContext';
import Button from '../src/components/ui/Button';
import Container from '../src/components/ui/Container';
import ProductCard from '../src/components/ui/ProductCard';
import Hotspot from '../src/components/ui/Hotspot';
import CategoriesGrid from '../src/components/sections/CategoriesGrid';
import StoryCollage from '../src/components/sections/StoryCollage';
import GenreCircles from '../src/components/sections/GenreCircles';
import LandingCarousel from '../src/components/sections/LandingCarousel';
import RoadToThaiArtist from '../src/components/sections/RoadToThaiArtist';
import heroBanner from '../assets/Banner/hero-banner.png';
import heroBannerMobile from '../assets/Banner/hero-banner-mobile.png';

// กำหนดแท็บสำหรับสลับดูสินค้าขายดี กับ สินค้ามาใหม่
const tabs = [
  { id: 'best', label: 'Best Sellers' },
  { id: 'new', label: 'New Arrival' },
];

export default function Home() {
  const { addToCart } = useCart();
  // ref สำหรับคุมการเลื่อน scroll แนวนอนของการ์ดสินค้า
  const scrollRef = useRef(null);
  const [activeTab, setActiveTab] = useState('best');
  const [scrollState, setScrollState] = useState({ progress: 100, canGoBack: false, canGoForward: false });

  // สลับแสดงสินค้าตามแท็บ: Best Sellers (ดึงตาม id ที่กำหนด) หรือ New Arrival (สินค้าฝั่งสากล)
  const visibleProducts =
    activeTab === 'best'
      ? bestSellerIds.map((id) => findProduct(id)).filter(Boolean)
      : products.filter((product) => product.id.endsWith('en'));

  // ฟังก์ชันเลื่อนการ์ดสินค้าในแนวนอนตามความกว้างของการ์ด (379px รวม gap)
  const scrollByCard = (direction) => {
    scrollRef.current?.scrollBy({ left: direction * 379, behavior: 'smooth' });
  };

  // ใช้พฤติกรรมเดียวกับ HANDCRAFT COLLECTION: แถบล็อกซ้ายและขยายไปทางขวาตามตำแหน่งสินค้า
  useEffect(() => {
    const carousel = scrollRef.current;
    if (!carousel) return undefined;
    const updateScrollState = () => {
      const maxScroll = Math.max(0, carousel.scrollWidth - carousel.clientWidth);
      const progress = maxScroll > 0 ? 25 + (carousel.scrollLeft / maxScroll) * 75 : 100;
      setScrollState({
        progress,
        canGoBack: carousel.scrollLeft > 1,
        canGoForward: carousel.scrollLeft < maxScroll - 1,
      });
    };
    updateScrollState();
    carousel.addEventListener('scroll', updateScrollState, { passive: true });
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(carousel);
    return () => { carousel.removeEventListener('scroll', updateScrollState); observer.disconnect(); };
  }, [activeTab, visibleProducts.length]);

  const selectTab = (tabId) => {
    setActiveTab(tabId);
    scrollRef.current?.scrollTo({ left: 0, behavior: 'auto' });
  };

  return (
    <>
      {/* Hero Section: แบนเนอร์หลักพร้อมหมุด Hotspot ลอยบนรูปให้กดดูของได้เลย */}
      <section className="relative -mt-navbar bg-brand-gradient">
        <div className="relative flex aspect-[941/1672] min-h-0 items-end justify-center overflow-hidden pb-8 md:aspect-auto md:min-h-[760px] md:pb-52">
          {/* Browser selects the portrait asset below 768px and keeps the desktop asset otherwise. */}
          <picture className="absolute inset-0">
            <source media="(max-width: 767px)" srcSet={heroBannerMobile} />
            <img src={heroBanner} alt="" aria-hidden="true" className="h-full w-full object-cover object-top" />
          </picture>
          <h1 className="sr-only">MERCHROOM — Rooted in Culture</h1>

          {/* hotspot ซ่อนบนจอเล็กเพราะใช้ตำแหน่ง pixel ตายตัว */}
          <div className="hidden lg:block">
            {heroHotspots.map((spot) => (
              <div key={spot.id} className={`absolute ${spot.x} ${spot.y}`}>
                <Hotspot product={findProduct(spot.productId)} size={spot.size} />
              </div>
            ))}
          </div>

          <Button
            to="/products"
            variant="highlight"
            size="lg"
            className="relative z-10 mb-[680px] !h-18 w-1/2 text-lg font-semibold md:mb-0 md:!h-13 md:w-100 md:text-base lg:translate-x-19.5"
          >
            Support Thai Artist
          </Button>
        </div>
      </section>

      {/* ส่วนสินค้าแนะนำ: สลับแท็บ Best Sellers / New Arrival เลื่อนดูสินค้าได้แบบแนวนอน */}
      <section className="relative -mt-128 rounded-t-section bg-cream py-16 md:-mt-9.5 md:py-20">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h2 className="font-display text-[32px] leading-tight md:text-5xl">
              Find your merch Find your match
            </h2>

            {/* แถบสลับแท็บสินค้า */}
            <div className="flex items-center gap-8" role="tablist" aria-label="หมวดสินค้าแนะนำ">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => selectTab(tab.id)}
                    className="flex flex-col items-center gap-2"
                  >
                    <span
                      className={`text-xl transition ${isActive ? 'font-semibold text-violet' : 'text-ink'}`}
                    >
                      {tab.label}
                    </span>
                    <span
                      className={`h-1.25 w-32.5 rounded-card transition ${isActive ? 'bg-violet' : 'bg-transparent'}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* แถวการ์ดสินค้าแนวนอน (Horizontal Scroll + Snap) */}
          <div
            ref={scrollRef}
            className="scrollbar-hide mt-8 sm:mt-10 flex gap-3 sm:gap-5 overflow-x-auto pb-2 snap-x snap-mandatory"
            role="tabpanel"
          >
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="flex w-[55%] sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] shrink-0 snap-start"
              >
                <ProductCard product={product} onAddToCart={addToCart} fluid />
              </div>
            ))}
          </div>

          {/* แถบตำแหน่ง carousel และปุ่มลูกศรกดเลื่อนการ์ดซ้าย-ขวา */}
          <div className="mt-8 flex items-center justify-between">
            <div className="h-1.25 w-81 max-w-full rounded-card bg-muted" aria-label="ตำแหน่งรายการสินค้า">
              <div
                className="h-full rounded-card bg-ink transition-all duration-300"
                style={{ width: `${scrollState.progress}%` }}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={!scrollState.canGoBack}
                aria-label="เลื่อนไปทางซ้าย"
                className="flex size-9 items-center justify-center rounded-full border border-zinc-400 text-zinc-700 transition hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={!scrollState.canGoForward}
                aria-label="เลื่อนไปทางขวา"
                className="flex size-9 items-center justify-center rounded-full border border-zinc-400 text-zinc-700 transition hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* รวม Section ย่อยอื่นๆ แยก Component ไว้ใน sections/ เพื่อความเป็นระเบียบ */}
      <CategoriesGrid />
      <StoryCollage />
      <RoadToThaiArtist />
      <GenreCircles />
      <LandingCarousel />
    </>
  );
}
