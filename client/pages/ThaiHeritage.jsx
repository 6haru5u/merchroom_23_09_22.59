import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Coins,
  Hammer,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react';
import { products } from '../src/data/product';
import Container from '../src/components/ui/Container';
import { useCart } from '../src/context/CartContext';

import bgHero from '../assets/source-Image/BG-Hero thai silk.jpg';
import bgAside from '../assets/source-Image/BG-Aside thai silk.jpg';
import bg1 from '../assets/source-Image/BG-1 thai silk.jpg';
import bg2 from '../assets/source-Image/BG-2 thai silk.jpg';
import bg3 from '../assets/source-Image/BG-3 thai silk.jpg';
import bgThaiSilk from '../assets/source-Image/BG-Thai silk.jpg';

const CRAFT_TECHNIQUES = [
  { id: 'weaving', label: 'Weaving', icon: Sparkles },
  { id: 'basketry', label: 'Basketry', icon: ShoppingBag },
  {
    id: 'pottery',
    label: 'Pottery',
    icon: (props) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M4 8h16l-2 9a4 4 0 0 1-4 3h-4a4 4 0 0 1-4-3L4 8z" />
        <path d="M2 5h20" />
      </svg>
    ),
  },
  { id: 'silversmithing', label: 'Silversmithing', icon: Coins },
  { id: 'carving', label: 'Carving', icon: Hammer },
];

const STATS = [
  { value: '18', label: 'Artisan Communities' },
  { value: '12', label: 'Provinces' },
  { value: '200+', label: 'Artisans' },
];

const baht = (value) =>
  `฿${Number(value || 0).toLocaleString('th-TH', { minimumFractionDigits: 2 })}`;

export default function ThaiHeritage() {
  const { addToCart } = useCart();
  const heritageProducts = products.filter((product) => product.id.endsWith('hr'));

  const [sliderIndex, setSliderIndex] = useState(0);
  const itemsPerPage = 4;
  const maxIndex = Math.max(0, heritageProducts.length - itemsPerPage);

  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [selectedStoryImg, setSelectedStoryImg] = useState(bgAside);
  const [selectedCommunityImg, setSelectedCommunityImg] = useState(bgThaiSilk);

  useEffect(() => {
    if (!isStoryModalOpen && !isCommunityModalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsStoryModalOpen(false);
        setIsCommunityModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStoryModalOpen, isCommunityModalOpen]);

  const handlePrev = () => {
    setSliderIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setSliderIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleProducts = heritageProducts.slice(sliderIndex, sliderIndex + itemsPerPage);
  const progressPercent = maxIndex > 0 ? ((sliderIndex + 1) / (maxIndex + 1)) * 100 : 100;

  return (
    <Container className="max-w-[1320px] px-4 py-8 md:py-12">
      {/* 1. Hero Banner */}
      <section className="relative min-h-[400px] md:h-[444px] w-full overflow-hidden rounded-[20px] shadow-sm flex items-center">
        <img
          src={bgHero}
          alt="Explore Thai Creativity"
          className="absolute inset-0 h-full w-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-2xl px-8 py-10 md:px-16 md:py-14 text-white">
          <p className="text-base md:text-xl font-bold uppercase tracking-wider text-primary">
            THAI HERITAGE
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-white font-sans">
            Explore Thai Creativity
          </h1>
          <p className="mt-4 text-base md:text-xl font-medium leading-relaxed text-white/95">
            Explore the beauty of Thai craftsmanship, where every piece is made by skilled artisans
            and communities across Thailand, and every creation tells a story.
          </p>
        </div>
      </section>

      {/* 2. Craft Story */}
      <section className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        <div className="overflow-hidden rounded-[20px] shadow-sm">
          <img
            src={bgAside}
            alt="From Praewa silk to the bag you carry"
            className="w-full h-80 md:h-[375px] object-cover"
          />
        </div>
        <div>
          <p className="text-base md:text-xl font-bold uppercase tracking-wider text-primary">
            CRAFT STORY
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-medium text-ink">
            From Praewa silk to the bag you carry
          </h2>
          <p className="mt-4 text-base md:text-xl font-medium leading-relaxed text-ink/80">
            Each pattern woven into the fabric takes more than two weeks to create by hand. Passed
            down from generation to generation in Kalasin, these traditional techniques are
            transformed into contemporary products that preserve their timeless character.
          </p>
          <button
            type="button"
            onClick={() => setIsStoryModalOpen(true)}
            className="mt-6 inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-primary px-10 text-lg md:text-xl font-medium text-white transition hover:bg-primary-deep shadow-sm cursor-pointer"
          >
            <span>Read the entire story</span>
            <ArrowRight className="size-5" />
          </button>
        </div>
      </section>

      {/* 3. Featured Community */}
      <section className="mt-16 md:mt-24">
        <p className="text-base md:text-xl font-bold uppercase tracking-wider text-primary">
          FEATURED COMMUNITY
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-medium text-ink">
          Artisan Community of the Month
        </h2>

        <div
          className="mt-6 relative overflow-hidden rounded-[20px] p-5 sm:p-8 md:p-12 text-white shadow-md flex flex-col lg:flex-row items-center justify-between gap-8"
          style={{
            backgroundImage: `url('${bgThaiSilk}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-[#351e4d]/75 backdrop-brightness-90" />

          {/* 3 Images */}
          <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-6 shrink-0">
            <div className="size-20 sm:size-36 md:size-44 rounded-full overflow-hidden border border-white/20 shadow-lg">
              <img src={bg1} alt="Community artisan" className="h-full w-full object-cover" />
            </div>
            <div className="w-20 sm:w-32 md:w-36 h-20 sm:h-36 md:h-44 rounded-[20px] overflow-hidden border border-white/20 shadow-lg">
              <img src={bg2} alt="Thai silk pattern" className="h-full w-full object-cover" />
            </div>
            <div className="w-20 sm:w-32 md:w-36 h-20 sm:h-36 md:h-44 rounded-[40px] overflow-hidden border border-white/20 shadow-lg">
              <img src={bg3} alt="Woven fabric craft" className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Right Info */}
          <div className="relative z-10 max-w-xl text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Ban Phon Praewa Silk Weaving Group
            </h3>
            <p className="text-lg md:text-xl font-bold text-white/90 mt-1">Kalasin, Thailand</p>
            <p className="mt-3 text-base md:text-lg font-medium italic text-white leading-relaxed">
              &ldquo;We want our traditional patterns to become part of the lives of a new
              generation around the world.&rdquo;
            </p>
            <button
              type="button"
              onClick={() => setIsCommunityModalOpen(true)}
              className="mt-6 inline-flex h-14 items-center justify-center gap-3 rounded-lg bg-primary px-10 text-lg md:text-xl font-medium text-white transition hover:bg-primary-deep shadow-sm cursor-pointer"
            >
              <span>Explore this community&apos;s story</span>
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Browse by Technique */}
      <section className="mt-16 md:mt-24">
        <p className="text-base md:text-xl font-bold uppercase tracking-wider text-primary">
          BROWSE BY TECHNIQUE
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-medium text-ink">Explore by Craft</h2>

        <div className="mt-8 flex flex-wrap justify-center sm:justify-between gap-6">
          {CRAFT_TECHNIQUES.map((tech) => {
            const Icon = tech.icon;
            return (
              <Link
                key={tech.id}
                to="/products?cat=thai-heritage"
                className="group flex flex-col items-center gap-3 transition"
              >
                <div className="flex size-28 md:size-36 items-center justify-center rounded-full border border-[#D1D5DB] bg-white transition duration-200 group-hover:border-primary group-hover:shadow-md">
                  <Icon className="size-9 md:size-11 text-primary transition duration-200 group-hover:scale-110" />
                </div>
                <span className="text-lg md:text-xl font-bold text-ink transition group-hover:text-primary">
                  {tech.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Handcraft Collection */}
      <section className="mt-16 md:mt-24">
        <p className="text-base md:text-xl font-bold uppercase tracking-wider text-primary">
          HANDCRAFT COLLECTION
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-medium text-ink">
          แพรวาคอลเลกชัน: ลายนาคราช
        </h2>

        {/* Product Grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-3 sm:p-5 shadow-card border border-black/5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Link
                to={`/products/${product.id}`}
                className="relative block h-32 sm:h-44 w-full overflow-hidden rounded-lg bg-zinc-100"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  loading="lazy"
                />
              </Link>

              <div className="mt-3 sm:mt-4 flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-[11px] sm:text-xs font-normal uppercase text-primary">
                    {product.brand || 'SACIT'}
                  </p>
                  <Link
                    to={`/products/${product.id}`}
                    className="mt-1 block truncate text-sm sm:text-base font-semibold text-ink transition hover:text-primary"
                    title={product.name}
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 text-base sm:text-xl font-medium text-ink font-[Sarabun]">
                    {baht(product.price)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(product, 1)}
                  className="mt-3 sm:mt-4 flex h-8 sm:h-9 w-full items-center justify-center rounded-lg bg-primary text-xs sm:text-base font-medium text-white transition hover:bg-primary-deep cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination bar and Arrow buttons */}
        <div className="mt-8 flex items-center justify-between">
          <div className="h-[5px] w-64 md:w-80 rounded-2xl bg-zinc-300 overflow-hidden relative">
            <div
              className="h-full bg-ink rounded-2xl transition-all duration-300"
              style={{ width: `${Math.max(25, progressPercent)}%` }}
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={sliderIndex === 0}
              aria-label="Previous items"
              className="flex size-9 items-center justify-center rounded-full border border-zinc-400 text-zinc-700 transition hover:border-ink hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={sliderIndex >= maxIndex}
              aria-label="Next items"
              className="flex size-9 items-center justify-center rounded-full border border-zinc-400 text-zinc-700 transition hover:border-ink hover:text-ink disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Community Impact */}
      <section className="mt-16 md:mt-24 rounded-[30px] bg-zinc-800 p-8 md:p-14 text-white shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-2xl font-bold uppercase tracking-wider text-highlight">
              COMMUNITY IMPACT
            </p>
            <h3 className="mt-2 text-xl font-medium text-white">
              Every purchase directly supports the artisans behind the craft.
            </h3>
            <p className="mt-3 text-base font-medium leading-relaxed text-white/85">
              Merchroom works with 18 artisan communities across 12 provinces in Thailand. Most of
              the revenue goes directly to the makers, without middlemen.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 sm:gap-12">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <span className="block text-4xl font-bold text-highlight font-sans">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm font-bold text-white whitespace-nowrap font-sans">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craft Story Modal */}
      {isStoryModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setIsStoryModalOpen(false)}
          >
            <div
              className="relative w-full max-w-4xl rounded-[24px] bg-white p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsStoryModalOpen(false)}
                aria-label="Close modal"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 flex size-9 items-center justify-center rounded-full text-black/50 hover:bg-black/5 hover:text-black transition cursor-pointer"
              >
                <X className="size-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
                {/* Left Side: Image and 3 Thumbnails */}
                <div>
                  <img
                    src={selectedStoryImg}
                    alt="Craft Story preview"
                    className="w-full h-56 sm:h-64 md:h-72 rounded-2xl object-cover shadow-sm"
                  />
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedStoryImg((prev) => (prev === bg1 ? bgAside : bg1))
                      }
                      className={`h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                        selectedStoryImg === bg1
                          ? 'border-primary shadow-sm'
                          : 'border-transparent hover:opacity-90'
                      }`}
                    >
                      <img
                        src={bg1}
                        alt="Craft Story detail 1"
                        className="h-full w-full object-cover"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedStoryImg((prev) => (prev === bg2 ? bgAside : bg2))
                      }
                      className={`h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                        selectedStoryImg === bg2
                          ? 'border-primary shadow-sm'
                          : 'border-transparent hover:opacity-90'
                      }`}
                    >
                      <img
                        src={bg2}
                        alt="Craft Story detail 2"
                        className="h-full w-full object-cover"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedStoryImg((prev) => (prev === bg3 ? bgAside : bg3))
                      }
                      className={`h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                        selectedStoryImg === bg3
                          ? 'border-primary shadow-sm'
                          : 'border-transparent hover:opacity-90'
                      }`}
                    >
                      <img
                        src={bg3}
                        alt="Craft Story detail 3"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  </div>
                </div>

                {/* Right Side: Text */}
                <div className="pt-2 md:pt-0">
                  <h3 className="text-xl sm:text-2xl md:text-[26px] font-bold text-black leading-snug font-sans">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </h3>
                  <div className="mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-black/80 space-y-3 font-normal">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis
                      molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla
                      accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.
                      Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti
                      sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                    </p>
                    <p>
                      Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec
                      ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
                      bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
                      elementum tellus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {/* Community Story Modal */}
      {isCommunityModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setIsCommunityModalOpen(false)}
          >
            <div
              className="relative w-full max-w-4xl rounded-[24px] bg-white p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsCommunityModalOpen(false)}
                aria-label="Close modal"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 flex size-9 items-center justify-center rounded-full text-black/50 hover:bg-black/5 hover:text-black transition cursor-pointer"
              >
                <X className="size-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
                {/* Left Side: Image and 3 Thumbnails */}
                <div>
                  <img
                    src={selectedCommunityImg}
                    alt="Ban Phon Community preview"
                    className="w-full h-56 sm:h-64 md:h-72 rounded-2xl object-cover shadow-sm"
                  />
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCommunityImg((prev) => (prev === bg1 ? bgThaiSilk : bg1))
                      }
                      className={`h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                        selectedCommunityImg === bg1
                          ? 'border-primary shadow-sm'
                          : 'border-transparent hover:opacity-90'
                      }`}
                    >
                      <img
                        src={bg1}
                        alt="Community artisan"
                        className="h-full w-full object-cover"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCommunityImg((prev) => (prev === bg2 ? bgThaiSilk : bg2))
                      }
                      className={`h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                        selectedCommunityImg === bg2
                          ? 'border-primary shadow-sm'
                          : 'border-transparent hover:opacity-90'
                      }`}
                    >
                      <img
                        src={bg2}
                        alt="Thai silk pattern"
                        className="h-full w-full object-cover"
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCommunityImg((prev) => (prev === bg3 ? bgThaiSilk : bg3))
                      }
                      className={`h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                        selectedCommunityImg === bg3
                          ? 'border-primary shadow-sm'
                          : 'border-transparent hover:opacity-90'
                      }`}
                    >
                      <img
                        src={bg3}
                        alt="Woven fabric craft"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  </div>
                </div>

                {/* Right Side: Community Story Text */}
                <div className="pt-2 md:pt-0">
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary">
                    Artisan Community of the Month
                  </p>
                  <h3 className="mt-1 text-xl sm:text-2xl md:text-[26px] font-bold text-black leading-snug font-sans">
                    Ban Phon Praewa Silk Weaving Group
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-black/60 mt-0.5">
                    Kalasin, Thailand
                  </p>

                  <div className="mt-4 text-xs sm:text-sm md:text-base leading-relaxed text-black/80 space-y-3 font-normal">
                    <p className="italic text-black/90 font-medium">
                      &ldquo;We want our traditional patterns to become part of the lives of a new
                      generation around the world.&rdquo;
                    </p>
                    <p>
                      Located in Kalasin province, the artisan collective of Ban Phon is
                      renowned for Phraewa silk, often hailed as the Queen of Thai Silk. Every
                      pattern embodies intricate geometric motifs woven entirely by hand using
                      centuries-old heritage techniques.
                    </p>
                    <p>
                      Through Merchroom, each piece sold returns direct, fair earnings to the
                      weavers, ensuring that this living cultural legacy thrives for generations
                      to come.
                    </p>
                  </div>

                  <div className="mt-6">
                    <Link
                      to="/products?cat=thai-heritage"
                      onClick={() => setIsCommunityModalOpen(false)}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm sm:text-base font-medium text-white transition hover:bg-primary-deep shadow-sm"
                    >
                      <span>Shop Phraewa Collection</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </Container>
  );
}
