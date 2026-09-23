// ไฟล์: client/src/components/ui/Navbar.jsx
import { useEffect, useRef, useState, useMemo } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Key, LogOut, Menu, Package, Search, ShoppingCart, User, X } from 'lucide-react';
// - useCart: จัดการ state สินค้าในตะกร้า (cartItems, updateQuantity, removeItem, totalPrice ฯลฯ)
import { useCart } from '../../context/CartContext';
// - useAuth: ดึง user, isAuthenticated, logout สำหรับสลับเมนูโปรไฟล์/Login
import { useAuth } from '../../context/AuthContext';
import Logo from './Logo';

// Import Named Export 'products' ตรงจากไฟล์ product.js
import { products } from '../../data/product';

const navLinks = [
  { label: 'Pop Culture', to: '/products?cat=pop-culture' },
  { label: 'Thai Heritage', to: '/thai-heritage' },
  { label: 'About Us', to: '/about' },
];

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userMenuRef = useRef(null);
  const searchRef = useRef(null);
  const userMenuTimeoutRef = useRef(null);

  // กรองรายการสินค้าแบบ Real-time ทันทีที่พิมพ์ (ไม่ต้องกด Enter)
  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    const list = Array.isArray(products) ? products : [];

    return list
      .filter((item) => {
        const name = (item.name || '').toLowerCase();
        const brand = (item.brand || '').toLowerCase();
        const description = (item.description || '').toLowerCase();
        
        return name.includes(trimmed) || brand.includes(trimmed) || description.includes(trimmed);
      })
      .slice(0, 6);
  }, [query]);

  // ตรวจจับการ Scroll หน้าจอ
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ปิด Dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ปิด mobile menu เมื่อเปลี่ยนหน้า
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // ล็อค scroll ตอนเปิด mobile menu
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleCloseMenu = () => {
    if (userMenuTimeoutRef.current) clearTimeout(userMenuTimeoutRef.current);
    setIsUserMenuOpen(false);
  };

  const handleUserMenuEnter = () => {
    if (userMenuTimeoutRef.current) {
      clearTimeout(userMenuTimeoutRef.current);
      userMenuTimeoutRef.current = null;
    }
    setIsUserMenuOpen(true);
  };

  const handleUserMenuLeave = () => {
    userMenuTimeoutRef.current = setTimeout(() => {
      setIsUserMenuOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (userMenuTimeoutRef.current) clearTimeout(userMenuTimeoutRef.current);
    };
  }, []);

  const isHomePage = pathname === '/';
  const onHero = isHomePage && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex h-19 items-center transition-all duration-300 ${
          isHomePage
            ? onHero
              ? 'bg-navbar-gradient text-white'
              : 'bg-navbar-gradient-fade backdrop-blur-lg text-white'
            : 'bg-ink text-white'
        }`}
      >
        {/* Container หลัก: max-w-330 สูง h-12 ตรงตาม Figma */}
        <div className="mx-auto flex h-12 w-full max-w-330 items-center justify-between gap-4 px-4 xl:gap-19.5 xl:px-0">
          
          {/* ฝั่งซ้าย: โลโก้ + เมนูหลัก */}
          <div className="flex items-center gap-6 xl:gap-19.5">
            <div className="w-35 shrink-0 md:w-38.75">
              <Logo />
            </div>

            <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
              {navLinks.map((link) => {
                const isMatch = (() => {
                  if (link.to.includes('?')) {
                    const [targetPath, targetSearch] = link.to.split('?');
                    const targetParams = new URLSearchParams(targetSearch);
                    const currentParams = new URLSearchParams(location.search);
                    return (
                      location.pathname === targetPath &&
                      Array.from(targetParams.entries()).every(
                        ([k, v]) => currentParams.get(k) === v
                      )
                    );
                  }
                  return location.pathname === link.to;
                })();

                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={`nav-link ${isMatch ? 'active' : ''}`}
                  >
                    {link.label}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* ฝั่งขวา: Search Bar + Cart + User + Hamburger */}
          <div className="flex flex-1 items-center justify-end gap-6 xl:gap-19.5">
            
            {/* ช่อง Search Bar ความสูง h-12 พร้อม Dropdown Real-time */}
            <div className="relative hidden w-full max-w-107.75 sm:block" ref={searchRef}>
              <form
                className="flex h-12 w-full items-center gap-3 rounded-full bg-[#F0F0F0]/70 px-5 text-black"
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSearchOpen(false);
                  navigate(query.trim() ? `/products?q=${encodeURIComponent(query.trim())}` : '/products');
                }}
              >
                <Search className="size-5 shrink-0 text-black/40" aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  placeholder="Search for products..."
                  aria-label="ค้นหาสินค้า"
                  /* ซ่อนปุ่มกากบาท default ของ browser ด้วย pseudo-element class */
                  className="w-full bg-transparent text-sm text-black placeholder:text-black/40 focus:outline-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                />
                {/* แสดงปุ่มลบเฉพาะเมื่อมีการพิมพ์ข้อความ */}
                {query.trim() !== '' && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setIsSearchOpen(false);
                    }}
                    className="flex shrink-0 items-center justify-center p-1 text-black/40 hover:text-black"
                    aria-label="Clear search"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </form>

              {/* Dropdown ผลการค้นหา Real-time */}
              {isSearchOpen && query.trim() !== '' && (
                <div className="absolute top-14 left-0 z-50 w-full overflow-hidden rounded-3xl bg-white p-3 text-zinc-900 shadow-2xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
                  {searchResults.length > 0 ? (
                    <div>
                      {/* รายการสินค้า */}
                      <div className="flex flex-col gap-1 max-h-[360px] overflow-y-auto">
                        {searchResults.map((item) => (
                          <Link
                            key={item.id}
                            to={`/products/${item.id}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center justify-between gap-3 rounded-2xl p-2.5 transition hover:bg-zinc-100/80"
                          >
                            {/* รูปภาพ + ชื่อสินค้า + แบรนด์ */}
                            <div className="flex items-center gap-3.5 min-w-0">
                              {item.image && (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="size-11 rounded-xl object-cover bg-zinc-100 shrink-0"
                                />
                              )}
                              <div className="flex flex-col min-w-0">
                                <span className="truncate text-sm font-bold text-zinc-800">
                                  {item.name}
                                </span>
                                {item.brand && (
                                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    {item.brand}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* ราคา */}
                            <div className="shrink-0 text-right">
                              <span className="text-base font-bold text-[#FF5A36]">
                                ฿{typeof item.price === 'number' ? item.price.toLocaleString('en-US', { minimumFractionDigits: item.price % 1 !== 0 ? 2 : 0 }) : item.price}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* ปุ่มสำหรับไปดูผลลัพธ์ทั้งหมด */}
                      <div className="mt-2 border-t border-zinc-100 pt-2 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            setIsSearchOpen(false);
                            navigate(`/products?q=${encodeURIComponent(query.trim())}`);
                          }}
                          className="inline-flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-[#FF5A36] transition hover:bg-orange-50/50 rounded-2xl"
                        >
                          <Search className="size-4 stroke-[2.5]" />
                          <span>ค้นหา "{query}" ทั้งหมด</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-sm font-medium text-zinc-400">
                      ไม่พบสินค้าที่ตรงกับ "{query}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* กลุ่มไอคอน Actions */}
            <div className="flex shrink-0 items-center gap-5 md:gap-6">
              <Link to="/cart" className="nav-icon-link relative flex items-center justify-center text-white" aria-label="ตะกร้าสินค้า">
                <ShoppingCart className="size-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* ปุ่ม User & Dropdown */}
              <div
                className="relative"
                ref={userMenuRef}
                onMouseEnter={handleUserMenuEnter}
                onMouseLeave={handleUserMenuLeave}
              >
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="nav-icon-link flex items-center justify-center text-white focus:outline-none cursor-pointer"
                  aria-label="เปิดเมนูผู้ใช้งาน"
                  aria-expanded={isUserMenuOpen}
                >
                  <User className="size-6" />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 top-full z-50 pt-2"
                    onMouseEnter={handleUserMenuEnter}
                    onMouseLeave={handleUserMenuLeave}
                  >
                    <div className="w-56 overflow-hidden rounded-2xl bg-white p-1 text-zinc-700 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
                    {!isAuthenticated ? (
                      <div className="divide-y divide-zinc-100">
                        <Link
                          to="/login"
                          onClick={handleCloseMenu}
                          className="flex items-center gap-3 px-4 py-3 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 md:text-sm"
                        >
                          <User className="size-4 text-zinc-500" />
                          <span>Log in / Registration</span>
                        </Link>

                        <Link
                          to="/admin/login"
                          onClick={handleCloseMenu}
                          className="flex items-center gap-3 px-4 py-3 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 md:text-sm"
                        >
                          <Key className="size-4 text-zinc-500" />
                          <span>Admin Gateway</span>
                        </Link>
                      </div>
                    ) : (
                      <div className="divide-y divide-zinc-100">
                        <div className="py-1">
                          {user?.role === 'admin' ? (
                            <Link
                              to="/admin/dashboard"
                              onClick={handleCloseMenu}
                              className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 md:text-sm"
                            >
                              <User className="size-4 text-zinc-500" />
                              <span>Admin Dashboard</span>
                            </Link>
                          ) : (
                            <>
                              <Link
                                to="/account/profile"
                                onClick={handleCloseMenu}
                                className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 md:text-sm"
                              >
                                <User className="size-4 text-zinc-500" />
                                <span>My Account ({user?.name || user?.firstName || 'Profile'})</span>
                              </Link>

                              <Link
                                to="/order-history"
                                onClick={handleCloseMenu}
                                className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 md:text-sm"
                              >
                                <Package className="size-4 text-zinc-500" />
                                <span>Order History</span>
                              </Link>
                            </>
                          )}
                        </div>

                        <div className="py-1">
                          <button
                            type="button"
                            onClick={() => {
                              logout?.();
                              handleCloseMenu();
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-xs font-semibold text-red-600 transition hover:bg-red-50 md:text-sm cursor-pointer"
                          >
                            <LogOut className="size-4 text-red-500" />
                            <span>Log out</span>
                          </button>
                        </div>
                      </div>
                    )}
                    </div>
                  </div>
                )}
              </div>

              {/* ปุ่ม hamburger สำหรับมือถือ */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex items-center justify-center text-white md:hidden"
                aria-label="เปิดเมนู"
              >
                <Menu className="size-6" />
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* mobile drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* backdrop กดปิด */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* ตัว drawer slide จากขวา */}
          <aside className="absolute right-0 top-0 flex h-full w-72 flex-col bg-ink text-white shadow-xl">
            {/* header ของ drawer */}
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-lg font-semibold">Menu</span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="ปิดเมนู"
              >
                <X className="size-6" />
              </button>
            </div>

            {/* search ใน drawer */}
            <form
              className="mx-4 mb-4 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5"
              onSubmit={(e) => {
                e.preventDefault();
                if (query.trim()) {
                  navigate(`/products?q=${encodeURIComponent(query.trim())}`);
                  setIsMobileMenuOpen(false);
                }
              }}
            >
              <Search className="size-4 text-white/50" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
            </form>

            {/* ลิงก์เมนู */}
            <nav className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mobile-nav-link rounded-lg px-3 py-3 text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* divider */}
            <div className="mx-4 my-3 border-t border-white/10" />

            {/* auth links */}
            <div className="flex flex-col gap-1 px-4">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-white/10"
                  >
                    <User className="size-4" />
                    Log in / Registration
                  </Link>
                  <Link
                    to="/admin/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-white/10"
                  >
                    <Key className="size-4" />
                    Admin Gateway
                  </Link>
                </>
              ) : (
                <>
                  {user?.role === 'admin' ? (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-white/10"
                    >
                      <User className="size-4" />
                      Admin Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/account/profile"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-white/10"
                      >
                        <User className="size-4" />
                        My Account
                      </Link>
                      <Link
                        to="/order-history"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-white/10"
                      >
                        <Package className="size-4" />
                        Order History
                      </Link>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      logout?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-red-400 transition hover:bg-white/10 cursor-pointer"
                  >
                    <LogOut className="size-4" />
                    Log out
                  </button>
                </>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}