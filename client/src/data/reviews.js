// ไฟล์: client/src/data/reviews.js
// ข้อมูลรีวิวสินค้าตัวอย่าง (Mock Customer Reviews)
// เรียกใช้งานโดย: pages/ProductDetail.jsx สำหรับแสดงแท็บรีวิวและคะแนนความพึงพอใจของลูกค้า
export const mockReviews = [
  {
    id: 'r1',
    name: 'Monkey D.',
    rating: 4,
    verified: true,
    date: 'August 14, 2023',
    text: "I've bought multiple shirts, and the design is unique and the fabric feels so comfortable to wear. I'm truly impressed with the exceptional quality, as I'm a diehard Tigers fan and this is what you'd expect!",
  },
  {
    id: 'r2',
    name: 'Alex M.',
    rating: 5,
    verified: true,
    date: 'August 15, 2023',
    text: "The best merchandise I've ever purchased! The colors are vibrant and the print quality exceeded my expectations. Shipping was fast and the packaging was lovely.",
  },
  {
    id: 'r3',
    name: 'Prim R.',
    rating: 5,
    verified: true,
    date: 'September 2, 2023',
    text: 'ผ้าหนาพอดีตัว ใส่แล้วระบายอากาศดีมาก ลายไม่หลุดง่ายแม้ซักหลายรอบ จะกลับมาอุดหนุนอีกแน่นอน',
  },
  {
    id: 'r4',
    name: 'Jordan K.',
    rating: 3,
    verified: false,
    date: 'September 10, 2023',
    text: "Good design overall, but the sizing runs a bit large. I recommend going one size down if you prefer a fitted look.",
  },
  {
    id: 'r5',
    name: 'Fah S.',
    rating: 5,
    verified: true,
    date: 'October 1, 2023',
    text: 'ของแท้ คุณภาพดี แพ็กมาดีมาก มีการ์ดขอบคุณจากร้านด้วย ประทับใจสุดๆ',
  },
  {
    id: 'r6',
    name: 'Chris T.',
    rating: 4,
    verified: true,
    date: 'October 8, 2023',
    text: 'Solid merch with crisp prints. Delivery took a few days longer than expected, but the quality makes up for it.',
  },
];
