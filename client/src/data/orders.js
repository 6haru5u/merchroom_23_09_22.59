// src/data/orders.js
import { products } from './product';

/**
 * Mock Order Data Source - อิงจากรายการสินค้าใน Database (src/data/product.js)
 */
const p1 = products.find((p) => p.id === '01th') || products[0];
const p2 = products.find((p) => p.id === '04th') || products[3];
const p3 = products.find((p) => p.id === '02th') || products[1];
const p4 = products.find((p) => p.id === '05th') || products[4];

const MOCK_ORDERS = [
  {
    _id: 'ord_65f1b99201a2b3c4d5e6f7a8',
    orderNumber: 'MR-99201-TH',
    userId: 'usr_65f1a2b3c4d5e6f7a8b9c0d1',
    items: [
      {
        _id: 'itm_01',
        productId: p1.id,
        name: p1.name,
        price: p1.price,
        quantity: 1,
        image: p1.image,
      },
      {
        _id: 'itm_02',
        productId: p3.id,
        name: p3.name,
        price: p3.price,
        quantity: 1,
        image: p3.image,
      },
    ],
    totalAmount: p1.price + p3.price,
    status: 'delivered', // pending | processing | shipping | delivered | cancelled
    shippingProvider: 'KERRY EXPRESS',
    shippingAddress: '99/9 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
    purchaseDate: '2024-10-24T14:30:00Z',
    createdAt: '2024-10-24T14:30:00Z',
  },
  {
    _id: 'ord_65f1b88123a2b3c4d5e6f7a9',
    orderNumber: 'MR-88123-TH',
    userId: 'usr_65f1a2b3c4d5e6f7a8b9c0d1',
    items: [
      {
        _id: 'itm_03',
        productId: p4.id,
        name: p4.name,
        price: p4.price,
        quantity: 2,
        image: p4.image,
      },
    ],
    totalAmount: p4.price * 2,
    status: 'pending',
    shippingProvider: 'FLASH EXPRESS',
    shippingAddress: '99/9 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
    purchaseDate: '2024-09-12T09:15:00Z',
    createdAt: '2024-09-12T09:15:00Z',
  },
  {
    _id: 'ord_65f1b77441a2b3c4d5e6f7b0',
    orderNumber: 'MR-77441-TH',
    userId: 'usr_65f1a2b3c4d5e6f7a8b9c0d1',
    items: [
      {
        _id: 'itm_04',
        productId: p2.id,
        name: p2.name,
        price: p2.price,
        quantity: 1,
        image: p2.image,
      },
    ],
    totalAmount: p2.price,
    status: 'cancelled',
    shippingProvider: '-',
    shippingAddress: '99/9 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110',
    purchaseDate: '2024-08-05T18:45:00Z',
    createdAt: '2024-08-05T18:45:00Z',
  },
];

export const getOrders = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...MOCK_ORDERS]), 200);
  });
};

export const getOrderById = async (orderId) => {
  return new Promise((resolve) => {
    const order = MOCK_ORDERS.find(
      (o) =>
        o._id === orderId ||
        o.orderNumber === orderId ||
        (orderId && o.orderNumber && o.orderNumber.toLowerCase() === orderId.toLowerCase()) ||
        (orderId && o._id.endsWith(orderId))
    );
    setTimeout(() => resolve(order || null), 200);
  });
};
