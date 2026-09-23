// src/components/ui/AccountSidebar.jsx
// แถบเมนูด้านข้างหน้า Account — การ์ดสีขาวขอบมน ตามสไตล์ UI ในรูป
import { NavLink } from 'react-router-dom';
import { User, Package, Heart, CreditCard } from 'lucide-react';

export const AccountSidebar = () => {
  const navItems = [
    { label: 'Profile Settings', path: '/account/profile', icon: User },
    { label: 'Order History', path: '/account/orders', icon: Package },
    { label: 'Wishlist', path: '/account/wishlist', icon: Heart },
    { label: 'Payment Methods', path: '/account/payment-methods', icon: CreditCard },
  ];

  return (
    <aside className="bg-white rounded-2xl border border-gray-200/80 p-3 shadow-sm flex flex-col gap-1">
      <nav className="flex md:flex-col gap-1 overflow-x-auto scrollbar-hide">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 font-sans text-sm rounded-xl transition-all shrink-0 md:shrink ${
                  isActive
                    ? 'bg-[#685bc7] text-white font-semibold shadow-sm'
                    : 'bg-transparent text-gray-700 hover:bg-gray-100 font-medium'
                }`
              }
            >
              <IconComponent className="size-4 shrink-0" strokeWidth={2} />
              <span className="whitespace-nowrap">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};