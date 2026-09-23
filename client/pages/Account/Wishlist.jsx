// pages/Account/Wishlist.jsx
// หน้ารายการสินค้าที่ถูกใจ — อ้างอิงดีไซน์การ์ดสินค้าปุ่มส้มแบบในรูปตัวอย่าง
import { products } from '../../src/data/product';
import { useCart } from '../../src/context/CartContext';

export default function Wishlist() {
  const { addToCart } = useCart();

  const wishlistItems = [
    products[0] || {
      id: '01th',
      name: 'VINYL: THE PARKINSON',
      price: 2200,
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-sm">
      <h2 className="font-sans font-bold text-xl text-gray-900 mb-6 pb-4 border-b border-gray-100">
        My Wishlist
      </h2>

      {wishlistItems.length === 0 ? (
        <p className="font-sans text-sm text-gray-500 text-center py-16">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-sm flex flex-col gap-3 hover:border-gray-300 transition-all"
            >
              <img
                src={prod.image}
                alt={prod.name}
                className="w-full h-44 object-cover rounded-xl border border-gray-100 bg-gray-50"
              />
              <div className="flex flex-col gap-1.5 flex-1">
                {/* Small Orange Tag — อ้างอิงแท็ก SACIT สีส้มในรูปตัวอย่าง */}
                <span className="text-[10px] font-bold text-[#ff5b30] uppercase tracking-wider">
                  MERCHROOM
                </span>
                <h4 className="font-sans font-bold text-sm text-gray-900 line-clamp-2">{prod.name}</h4>
                <div className="font-sans font-bold text-base text-gray-900 mt-auto pt-2">
                  ฿{prod.price.toLocaleString()}
                </div>
                {/* Primary Orange Button — อ้างอิงปุ่ม Add to Cart สีส้มในรูปตัวอย่าง */}
                <button
                  type="button"
                  onClick={() => addToCart(prod, 1)}
                  className="w-full mt-2 bg-[#ff5b30] hover:bg-[#e04820] text-white font-sans font-semibold text-xs py-3 rounded-xl shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}