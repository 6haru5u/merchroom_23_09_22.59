// pages/Account/AccountLayout.jsx
// เลย์เอาต์หลักของหน้า Account — อ้างอิงดีไซน์จาก Search & Filter Layout (Rounded cards, soft grey bg, active tabs)
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { AccountProvider } from '../../src/context/AccountContext';
import { AccountSidebar } from '../../src/components/ui/AccountSidebar';

const navTabs = [
  { label: 'Profile Settings', path: '/account/profile' },
  { label: 'Order History', path: '/account/orders' },
  { label: 'Wishlist', path: '/account/wishlist' },
  { label: 'Payment Methods', path: '/account/payment-methods' },
];

export default function AccountLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // ตรวจหาแท็บที่เลือกอยู่
  const activeTab = navTabs.find((tab) => location.pathname.includes(tab.path)) || navTabs[0];

  return (
    <AccountProvider>
      <div className="bg-[#f8f8f9] min-h-screen py-8 px-4 sm:px-8 font-sans text-gray-900">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb — Home > Account > [Page Name] */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-6">
            <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span className="text-gray-400">&gt;</span>
            <Link to="/account" className="hover:text-gray-900 transition-colors">Account</Link>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-900 font-semibold">{activeTab.label}</span>
          </nav>

          {/* Top Page Header Tabs — อ้างอิงแถบ Tab สีม่วงตามรูปตัวอย่าง */}
          <div className="border-b border-gray-200 mb-8">
            <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
              {navTabs.map((tab) => {
                const isActive = location.pathname.includes(tab.path) ||
                  (tab.path === '/account/profile' && location.pathname === '/account');
                return (
                  <button
                    key={tab.path}
                    type="button"
                    onClick={() => navigate(tab.path)}
                    className={`py-3 text-sm sm:text-base font-semibold transition-all whitespace-nowrap border-b-2 -mb-[1px] cursor-pointer ${
                      isActive
                        ? 'border-[#685bc7] text-[#685bc7]'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-start">
            <AccountSidebar />
            <section className="min-w-0">
              <Outlet />
            </section>
          </div>
        </div>
      </div>
    </AccountProvider>
  );
}