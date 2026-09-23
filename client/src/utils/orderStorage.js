// ไฟล์: client/src/utils/orderStorage.js
// โมดูลจัดการบันทึกและดึงข้อมูลออเดอร์ใน LocalStorage (key: merchroom_orders)
// เรียกใช้งานโดย: Checkout.jsx (สร้างและบันทึกออเดอร์) และ OrderConfirmation.jsx (ค้นหาออเดอร์ตามรหัส)
const ORDERS_KEY = 'merchroom_orders';

// รายการช่องทางการชำระเงินที่ระบบรองรับ
export const PAYMENT_METHODS = [
  {
    id: 'promptpay',
    label: 'PromptPay',
    description: 'สแกน QR Code เพื่อชำระเงิน',
  },
  {
    id: 'card',
    label: 'บัตรเครดิต / เดบิต',
    description: 'Visa, Mastercard, JCB',
  },
  {
    id: 'bank',
    label: 'โอนเงินผ่านธนาคาร',
    description: 'ชำระเงินโอนเข้าบัญชีธนาคาร',
  },
  {
    id: 'cod',
    label: 'เก็บเงินปลายทาง (COD)',
    description: 'ชำระเงินเมื่อได้รับสินค้า',
  },
];

// สุ่มสร้างเลขออเดอร์ที่ไม่ซ้ำ ในฟอร์แมต: MR-YYYYMMDD-XXXXXX (เช่น MR-20250512-482910)
export function generateOrderId() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `MR-${yyyy}${mm}${dd}-${rand}`;
}

// บันทึกออเดอร์ใหม่ไว้หน้าสุดของ array แล้วเซฟลง localStorage
export function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return order;
}

// ดึงรายการออเดอร์ทั้งหมดจาก localStorage
export function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

// ค้นหาออเดอร์เฉพาะชิ้นตาม orderId
export function getOrderById(orderId) {
  return getOrders().find((order) => order.id === orderId) || null;
}