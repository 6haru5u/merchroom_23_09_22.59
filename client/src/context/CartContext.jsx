import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'merchroom_cart';
const DISCOUNT_STORAGE_KEY = 'promo_discount_rate';

export function CartProvider({ children }) {
  // โหลดของในตะกร้าจาก localStorage
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // โหลดค่า discountRate จาก localStorage ตอนเริ่มต้น
  const [discountRate, setDiscountRate] = useState(() => {
    try {
      const storedRate = localStorage.getItem(DISCOUNT_STORAGE_KEY);
      return storedRate ? Number(storedRate) : 0;
    } catch {
      return 0;
    }
  });

  // ซิงค์ข้อมูลตะกร้าลง localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ดักเคสเปิด incognito หรือ storage เต็ม
    }
  }, [items]);

  // ซิงค์ค่า discountRate ลง localStorage
  useEffect(() => {
    try {
      localStorage.setItem(DISCOUNT_STORAGE_KEY, discountRate.toString());
    } catch {
      // ดักเคส storage เต็ม
    }
  }, [discountRate]);

  // ฟังก์ชันนำส่วนลดไปใช้
  const applyDiscount = useCallback((rate) => {
    setDiscountRate(rate);
  }, []);

  // เพิ่มสินค้าเข้าตะกร้า
  const addToCart = useCallback((product, quantity = 1) => {
    if (!product?.id) {
      console.warn('[cart] addToCart ต้องรับ product object ไม่ใช่ event');
      return;
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      return [...prev, { ...product, quantity }];
    });
  }, []);

  // ลบสินค้าชิ้นนั้นออกจากตะกร้าด้วย id
  const removeFromCart = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // ปรับจำนวนชิ้น
  const updateQuantity = useCallback((id, quantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    );
  }, []);

  // เคลียร์ตะกร้าและส่วนลด (ใช้ตอน checkout สำเร็จ)
  const clearCart = useCallback(() => {
    setItems([]);
    setDiscountRate(0);
    localStorage.removeItem(DISCOUNT_STORAGE_KEY);
  }, []);

  // แพ็ก context value ด้วย useMemo
  const value = useMemo(() => {
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      items,
      cartCount,
      cartTotal,
      discountRate,
      applyDiscount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    };
  }, [items, discountRate, applyDiscount, addToCart, removeFromCart, updateQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart ต้องใช้ภายใน <CartProvider> เท่านั้น');
  }

  return context;
}