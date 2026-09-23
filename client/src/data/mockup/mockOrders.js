// ไฟล์: client/src/data/mockup/mockOrders.js
// ข้อมูลจำลองคำสั่งซื้อ (Order History), สถานะการจัดส่ง และ Timeline ติดตามพัสดุ
// เรียกใช้งานโดย: AdminDashboard, UserDashboard, OrderConfirmation
// จัดโครงสร้างให้ตรงกับ Order Schema ฝั่ง Backend เพื่อให้รองรับการเปลี่ยนผ่านไปใช้ API จริง

export const DELIVERY_STATUS = {
  pending: { label: 'รับคำสั่งซื้อ', color: 'text-warning' },
  shipping: { label: 'เตรียมจัดส่ง', color: 'text-primary' },
  in_transit: { label: 'อยู่ระหว่างขนส่ง', color: 'text-violet' },
  delivered: { label: 'จัดส่งสำเร็จ', color: 'text-success' },
  cancelled: { label: 'ยกเลิก', color: 'text-error' },
  failed: { label: 'จัดส่งล้มเหลว', color: 'text-error' },
};

export const PAYMENT_STATUS = {
  pending: { label: 'รอชำระเงิน', color: 'text-warning' },
  paid: { label: 'ชำระแล้ว', color: 'text-success' },
  failed: { label: 'ชำระไม่สำเร็จ', color: 'text-error' },
  refunded: { label: 'คืนเงินแล้ว', color: 'text-muted' },
};

// รายการ Mock Orders ทั้งหมด สำหรับใช้คำนวณสถิติและทดสอบระบบจัดการคำสั่งซื้อ
export const mockOrders = [
  //  มกราคม 2026 (Jan)
  {
    _id: 'ORD-0001',
    userId: 'usr-earn',
    orderNumber: 'MR-20260108-100011',
    items: [
      { productId: 'p-bird-vinyl', name: 'Bird Twenty Two (Color Vinyl)', price: 2200, quantity: 1 },
    ],
    subtotal: 2200,
    deliveryFee: 0,
    totalAmount: 2200,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-1001001122',
    shippingAddress: '789 สีลม ปทุมธานี 12000',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-01-08T09:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-01-08T14:30:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-01-09T08:00:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-01-10T11:20:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-01-08T09:00:00+07:00',
  },
  {
    _id: 'ORD-0002',
    userId: 'usr-milk',
    orderNumber: 'MR-20260114-100345',
    items: [
      { productId: 'p-paradox-tshirt', name: 'PARADOX UNPLUGGED T-Shirt', price: 590, quantity: 2 },
      { productId: 'p-paradox-sweater', name: 'PARADOX UNPLUGGED Sweater', price: 950, quantity: 1 },
    ],
    subtotal: 2130,
    deliveryFee: 0,
    totalAmount: 2130,
    shippingProvider: 'Flash Express',
    trackingNumber: 'FLS-2002001234',
    shippingAddress: '12 รัชดาภิเษก กรุงเทพฯ 10400',
    paymentMethod: 'บัตรเครดิต',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-01-14T10:30:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-01-15T09:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-01-15T16:00:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-01-17T10:45:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-01-14T10:30:00+07:00',
  },
  {
    _id: 'ORD-0003',
    userId: 'usr-non',
    orderNumber: 'MR-20260122-100789',
    items: [
      { productId: 'p-4eve-toy-case', name: '4EVE ART TOY : Limited Blind Box Figure (ยกกล่อง)', price: 6000, quantity: 1 },
    ],
    subtotal: 6000,
    deliveryFee: 0,
    totalAmount: 6000,
    shippingProvider: 'DHL Express',
    trackingNumber: 'DHL-3003004567',
    shippingAddress: '123 สุขุมวิท กรุงเทพฯ 10110',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-01-22T11:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-01-23T08:30:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-01-23T15:00:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-01-24T14:10:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-01-22T11:00:00+07:00',
  },
  {
    _id: 'ORD-0004',
    userId: 'usr-touch',
    orderNumber: 'MR-20260128-100234',
    items: [
      { productId: 'p-clash-tshirt-one', name: 'CLASH อัลบั้ม ONE T-Shirt', price: 690, quantity: 2 },
    ],
    subtotal: 1380,
    deliveryFee: 50,
    totalAmount: 1430,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-4004007890',
    shippingAddress: '45 ลาดพร้าว กรุงเทพฯ 10900',
    paymentMethod: 'โอนเงินผ่านธนาคาร',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-01-28T14:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-01-29T09:15:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-01-29T17:30:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-01-31T09:00:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-01-28T14:00:00+07:00',
  },
  //  กุมภาพันธ์ 2026 (Feb)
  {
    _id: 'ORD-0005',
    userId: 'usr-milk',
    orderNumber: 'MR-20260203-200111',
    items: [
      { productId: 'p-jeff-lightstick', name: 'Jeff Satur Official Light Stick V.2', price: 4600, quantity: 1 },
    ],
    subtotal: 4600,
    deliveryFee: 0,
    totalAmount: 4600,
    shippingProvider: 'DHL Express',
    trackingNumber: 'DHL-5005001122',
    shippingAddress: '12 รัชดาภิเษก กรุงเทพฯ 10400',
    paymentMethod: 'บัตรเครดิต',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-02-03T10:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-02-04T08:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-02-04T14:30:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-02-06T11:00:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-02-03T10:00:00+07:00',
  },
  {
    _id: 'ORD-0006',
    userId: 'usr-earn',
    orderNumber: 'MR-20260215-200456',
    items: [
      { productId: 'p-clash-tshirt-shake', name: 'Clash อัลบั้ม SoundShake T-SHIRT', price: 690, quantity: 1 },
      { productId: 'p-bird-dream-vinyl', name: 'Dream For Love (Yellow Vinyl) - เบิร์ด ธงไชย', price: 2000, quantity: 1 },
    ],
    subtotal: 2690,
    deliveryFee: 0,
    totalAmount: 2690,
    shippingProvider: 'Flash Express',
    trackingNumber: 'FLS-6006003344',
    shippingAddress: '789 สีลม ปทุมธานี 12000',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-02-15T13:20:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-02-16T09:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-02-16T15:40:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-02-18T10:30:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-02-15T13:20:00+07:00',
  },
  {
    _id: 'ORD-0007',
    userId: 'usr-mike',
    orderNumber: 'MR-20260226-200789',
    items: [
      { productId: 'p-bus-lightstick', name: "BUS Official Light Stick 'BOB'", price: 1890, quantity: 1 },
      { productId: 'p-bus-tshirt', name: 'BUS Light The World T-Shirt', price: 590, quantity: 2 },
    ],
    subtotal: 3070,
    deliveryFee: 0,
    totalAmount: 3070,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-7007005566',
    shippingAddress: '56 ลาดพร้าว นนทบุรี 11000',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-02-26T16:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-02-27T08:30:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-02-27T14:00:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-02-28T16:45:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-02-26T16:00:00+07:00',
  },
  //  มีนาคม 2026 (Mar)
  {
    _id: 'ORD-0008',
    userId: 'usr-ploy',
    orderNumber: 'MR-20260305-300111',
    items: [
      { productId: 'p-4eve-lightstick', name: 'แท่งไฟ 4EVE รุ่นใหม่', price: 1200, quantity: 2 },
      { productId: 'p-4eve-toy', name: '4EVE ART TOY : Limited Blind Box Figure', price: 750, quantity: 1 },
    ],
    subtotal: 3150,
    deliveryFee: 0,
    totalAmount: 3150,
    shippingProvider: 'Flash Express',
    trackingNumber: 'FLS-8008007788',
    shippingAddress: '88 บางรัก กรุงเทพฯ 10500',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-03-05T09:30:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-03-06T08:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-03-06T14:15:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-03-08T09:20:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-03-05T09:30:00+07:00',
  },
  {
    _id: 'ORD-0009',
    userId: 'usr-game',
    orderNumber: 'MR-20260312-300222',
    items: [
      { productId: 'p-non-lightstick', name: 'NONT TANONT Official Light Stick', price: 1690, quantity: 1 },
    ],
    subtotal: 1690,
    deliveryFee: 0,
    totalAmount: 1690,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-9009009900',
    shippingAddress: '34 พระราม 9 กรุงเทพฯ 10310',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-03-12T11:15:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-03-13T09:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-03-13T16:30:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-03-15T10:00:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-03-12T11:15:00+07:00',
  },
  {
    _id: 'ORD-0010',
    userId: 'usr-non',
    orderNumber: 'MR-20260320-300333',
    items: [
      { productId: 'p-bus-tshirt', name: 'BUS Light The World T-Shirt', price: 590, quantity: 3 },
      { productId: 'p-perses-hoodie', name: "URTHE x PERSES PIECES HOODIE", price: 1290, quantity: 1 },
    ],
    subtotal: 3060,
    deliveryFee: 0,
    totalAmount: 3060,
    shippingProvider: 'Flash Express',
    trackingNumber: 'FLS-1010011122',
    shippingAddress: '123 สุขุมวิท กรุงเทพฯ 10110',
    paymentMethod: 'บัตรเครดิต',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-03-20T14:45:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-03-21T08:30:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-03-21T15:00:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-03-23T11:30:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-03-20T14:45:00+07:00',
  },
  {
    _id: 'ORD-0011',
    userId: 'usr-pim',
    orderNumber: 'MR-20260325-300444',
    items: [
      { productId: 'p-perses-lightstick', name: 'PERSES Official Light Stick', price: 1890, quantity: 1 },
      { productId: 'p-joey-inhaler', name: 'ยาดมภูวสูด - ของที่ระลึกงานสาธารณะสุข STATION', price: 99, quantity: 4 },
    ],
    subtotal: 2286,
    deliveryFee: 50,
    totalAmount: 2336,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-1111113344',
    shippingAddress: '21 สุขุมวิท ชลบุรี 20000',
    paymentMethod: 'เก็บเงินปลายทาง',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-03-25T10:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-03-26T08:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-03-26T14:00:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-03-28T09:15:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-03-25T10:00:00+07:00',
  },
  {
    _id: 'ORD-0012',
    userId: 'usr-touch',
    orderNumber: 'MR-20260330-300555',
    items: [
      { productId: 'p-jeff-hat', name: 'Jeff Satur Asia Tour Bucket Hat', price: 2000, quantity: 1 },
      { productId: 'p-jeff-tshirt', name: 'Jeff Satur Asia Tour T-Shirt', price: 2200, quantity: 1 },
    ],
    subtotal: 4200,
    deliveryFee: 0,
    totalAmount: 4200,
    shippingProvider: 'DHL Express',
    trackingNumber: 'DHL-1212125566',
    shippingAddress: '45 ลาดพร้าว กรุงเทพฯ 10900',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-03-30T15:30:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-03-31T09:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-03-31T16:00:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-04-02T10:45:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-03-30T15:30:00+07:00',
  },
  //  เมษายน 2026 (Apr)
  {
    _id: 'ORD-0013',
    userId: 'usr-game',
    orderNumber: 'MR-20260407-400111',
    items: [
      { productId: 'p-tmd-cd', name: "Three Man Down – อัลบั้ม '28' (Box Set CD)", price: 790, quantity: 2 },
    ],
    subtotal: 1580,
    deliveryFee: 50,
    totalAmount: 1630,
    shippingProvider: 'Flash Express',
    trackingNumber: 'FLS-1313137788',
    shippingAddress: '34 พระราม 9 กรุงเทพฯ 10310',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-04-07T09:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-04-08T08:30:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-04-08T14:00:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-04-10T11:00:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-04-07T09:00:00+07:00',
  },
  {
    _id: 'ORD-0014',
    userId: 'usr-ploy',
    orderNumber: 'MR-20260418-400222',
    items: [
      { productId: 'p-non-vinyl', name: 'อัลบั้ม Cigarette Candy & Vanilla Sky (Vinyl Limited Edition Triple LP)', price: 3500, quantity: 1 },
    ],
    subtotal: 3500,
    deliveryFee: 150,
    totalAmount: 3650,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-1414149900',
    shippingAddress: '88 บางรัก กรุงเทพฯ 10500',
    paymentMethod: 'บัตรเครดิต',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-04-18T12:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-04-19T09:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-04-19T15:30:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-04-21T10:00:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-04-18T12:00:00+07:00',
  },
  {
    _id: 'ORD-0015',
    userId: 'usr-earn',
    orderNumber: 'MR-20260425-400333',
    items: [
      { productId: 'p-paradox-tshirt', name: 'PARADOX UNPLUGGED T-Shirt', price: 590, quantity: 1 },
      { productId: 'p-paradox-sweater', name: 'PARADOX UNPLUGGED Sweater', price: 950, quantity: 1 },
    ],
    subtotal: 1540,
    deliveryFee: 0,
    totalAmount: 1540,
    shippingProvider: 'Flash Express',
    trackingNumber: 'FLS-1515151122',
    shippingAddress: '789 สีลม ปทุมธานี 12000',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'cancelled',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-04-25T14:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'cancelled', label: 'ยกเลิก', time: '2026-04-26T10:00:00+07:00', note: 'ลูกค้ายกเลิก – สินค้าหมดสต็อก' },
    ],
    createdAt: '2026-04-25T14:00:00+07:00',
  },
  //  พฤษภาคม 2026 (May)
  {
    _id: 'ORD-0016',
    userId: 'usr-mike',
    orderNumber: 'MR-20260502-500111',
    items: [
      { productId: 'p-perses-lightstick', name: 'PERSES Official Light Stick', price: 1890, quantity: 2 },
    ],
    subtotal: 3780,
    deliveryFee: 0,
    totalAmount: 3780,
    shippingProvider: 'DHL Express',
    trackingNumber: 'DHL-1616163344',
    shippingAddress: '56 ลาดพร้าว นนทบุรี 11000',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-05-02T10:30:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-05-03T08:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-05-03T14:30:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-05-05T09:00:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-05-02T10:30:00+07:00',
  },
  {
    _id: 'ORD-0017',
    userId: 'usr-pim',
    orderNumber: 'MR-20260510-500222',
    items: [
      { productId: 'p-joey-inhaler', name: 'ยาดมภูวสูด - ของที่ระลึกงานสาธารณะสุข STATION', price: 99, quantity: 10 },
    ],
    subtotal: 990,
    deliveryFee: 50,
    totalAmount: 1040,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-1717175566',
    shippingAddress: '21 สุขุมวิท ชลบุรี 20000',
    paymentMethod: 'เก็บเงินปลายทาง',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-05-10T11:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-05-11T08:30:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-05-11T15:00:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-05-13T10:30:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-05-10T11:00:00+07:00',
  },
  {
    _id: 'ORD-1003',
    userId: 'usr-non',
    orderNumber: 'MR-20260521-771246',
    items: [
      { productId: 'p-bird-vinyl', name: 'Bird Twenty Two (Color Vinyl)', price: 2200, quantity: 1 },
    ],
    subtotal: 2200,
    deliveryFee: 0,
    totalAmount: 2200,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-7712348890',
    shippingAddress: '123 สุขุมวิท กรุงเทพฯ 10110',
    paymentMethod: 'เก็บเงินปลายทาง',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-05-21T15:00:00+07:00', note: 'ยืนยันคำสั่งซื้อเรียบร้อย' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-05-22T10:30:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-05-22T16:10:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-05-24T09:45:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-05-21T15:00:00+07:00',
  },
  {
    _id: 'ORD-0018',
    userId: 'usr-game',
    orderNumber: 'MR-20260528-500333',
    items: [
      { productId: 'p-4eve-toy', name: '4EVE ART TOY : Limited Blind Box Figure', price: 750, quantity: 4 },
      { productId: 'p-4eve-lightstick', name: 'แท่งไฟ 4EVE รุ่นใหม่', price: 1200, quantity: 1 },
    ],
    subtotal: 4200,
    deliveryFee: 0,
    totalAmount: 4200,
    shippingProvider: 'Flash Express',
    trackingNumber: 'FLS-1818187788',
    shippingAddress: '34 พระราม 9 กรุงเทพฯ 10310',
    paymentMethod: 'บัตรเครดิต',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-05-28T13:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-05-29T09:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-05-29T16:00:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-05-31T11:30:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-05-28T13:00:00+07:00',
  },
  //  มิถุนายน 2026 (Jun)
  {
    _id: 'ORD-0019',
    userId: 'usr-milk',
    orderNumber: 'MR-20260602-600111',
    items: [
      { productId: 'p-bird-dream-vinyl', name: 'Dream For Love (Yellow Vinyl) - เบิร์ด ธงไชย', price: 2000, quantity: 2 },
    ],
    subtotal: 4000,
    deliveryFee: 0,
    totalAmount: 4000,
    shippingProvider: 'DHL Express',
    trackingNumber: 'DHL-1919199900',
    shippingAddress: '12 รัชดาภิเษก กรุงเทพฯ 10400',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-06-02T09:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-06-03T08:30:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-06-03T15:00:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-06-05T10:00:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-06-02T09:00:00+07:00',
  },
  {
    _id: 'ORD-1002',
    userId: 'usr-non',
    orderNumber: 'MR-20260605-120934',
    items: [
      { productId: 'p-4eve-toy', name: '4EVE ART TOY : Limited Blind Box Figure', price: 750, quantity: 3 },
    ],
    subtotal: 2250,
    deliveryFee: 50,
    totalAmount: 2300,
    shippingProvider: 'Flash Express',
    trackingNumber: 'FLS-5509871234',
    shippingAddress: '123 สุขุมวิท กรุงเทพฯ 10110',
    paymentMethod: 'บัตรเครดิต',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-06-05T08:15:00+07:00', note: 'ยืนยันคำสั่งซื้อเรียบร้อย' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-06-06T11:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-06-06T18:40:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-06-08T13:05:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-06-05T08:15:00+07:00',
  },
  {
    _id: 'ORD-0020',
    userId: 'usr-touch',
    orderNumber: 'MR-20260614-600222',
    items: [
      { productId: 'p-non-lightstick', name: 'NONT TANONT Official Light Stick', price: 1690, quantity: 1 },
      { productId: 'p-jeff-hat', name: 'Jeff Satur Asia Tour Bucket Hat', price: 2000, quantity: 1 },
    ],
    subtotal: 3690,
    deliveryFee: 0,
    totalAmount: 3690,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-2020201122',
    shippingAddress: '45 ลาดพร้าว กรุงเทพฯ 10900',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-06-14T10:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-06-15T08:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-06-15T14:30:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-06-17T11:00:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-06-14T10:00:00+07:00',
  },
  {
    _id: 'ORD-0021',
    userId: 'usr-ploy',
    orderNumber: 'MR-20260622-600333',
    items: [
      { productId: 'p-clash-tshirt-one', name: 'CLASH อัลบั้ม ONE T-Shirt', price: 690, quantity: 1 },
      { productId: 'p-clash-tshirt-shake', name: 'Clash อัลบั้ม SoundShake T-SHIRT', price: 690, quantity: 1 },
    ],
    subtotal: 1380,
    deliveryFee: 50,
    totalAmount: 1430,
    shippingProvider: 'Flash Express',
    trackingNumber: 'FLS-2121213344',
    shippingAddress: '88 บางรัก กรุงเทพฯ 10500',
    paymentMethod: 'บัตรเครดิต',
    paymentStatus: 'paid',
    deliveryStatus: 'cancelled',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-06-22T14:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'cancelled', label: 'ยกเลิก', time: '2026-06-23T09:30:00+07:00', note: 'ลูกค้ายกเลิก – เปลี่ยนใจ' },
    ],
    createdAt: '2026-06-22T14:00:00+07:00',
  },
  {
    _id: 'ORD-0022',
    userId: 'usr-earn',
    orderNumber: 'MR-20260628-600444',
    items: [
      { productId: 'p-tmd-cd', name: "Three Man Down – อัลบั้ม '28' (Box Set CD)", price: 790, quantity: 1 },
      { productId: 'p-paradox-tshirt', name: 'PARADOX UNPLUGGED T-Shirt', price: 590, quantity: 2 },
    ],
    subtotal: 1970,
    deliveryFee: 0,
    totalAmount: 1970,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-2222225566',
    shippingAddress: '789 สีลม ปทุมธานี 12000',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'failed',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-06-28T11:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-06-29T08:30:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-06-29T15:00:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: null, note: 'ขนส่งล้มเหลว – ติดต่อผู้รับไม่ได้' },
    ],
    createdAt: '2026-06-28T11:00:00+07:00',
  },
  //  กรกฎาคม 2026 (Jul)
  {
    _id: 'ORD-0023',
    userId: 'usr-milk',
    orderNumber: 'MR-20260703-700111',
    items: [
      { productId: 'p-jeff-lightstick', name: 'Jeff Satur Official Light Stick V.2', price: 4600, quantity: 1 },
      { productId: 'p-jeff-tshirt', name: 'Jeff Satur Asia Tour T-Shirt', price: 2200, quantity: 1 },
    ],
    subtotal: 6800,
    deliveryFee: 0,
    totalAmount: 6800,
    shippingProvider: 'DHL Express',
    trackingNumber: 'DHL-2323237788',
    shippingAddress: '12 รัชดาภิเษก กรุงเทพฯ 10400',
    paymentMethod: 'บัตรเครดิต',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-07-03T09:30:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-07-04T08:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-07-04T14:30:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-07-06T10:00:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-07-03T09:30:00+07:00',
  },
  {
    _id: 'ORD-0024',
    userId: 'usr-pim',
    orderNumber: 'MR-20260710-700222',
    items: [
      { productId: 'p-bird-vinyl', name: 'Bird Twenty Two (Color Vinyl)', price: 2200, quantity: 1 },
      { productId: 'p-bird-dream-vinyl', name: 'Dream For Love (Yellow Vinyl) - เบิร์ด ธงไชย', price: 2000, quantity: 1 },
    ],
    subtotal: 4200,
    deliveryFee: 0,
    totalAmount: 4200,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-2424249900',
    shippingAddress: '21 สุขุมวิท ชลบุรี 20000',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'in_transit',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-07-10T11:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-07-11T08:30:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-07-11T15:00:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: null, note: 'รอการจัดส่งถึงปลายทาง' },
    ],
    createdAt: '2026-07-10T11:00:00+07:00',
  },
  {
    _id: 'ORD-1001',
    userId: 'usr-non',
    orderNumber: 'MR-20260713-482910',
    items: [
      { productId: 'p-non-lightstick', name: 'NONT TANONT Official Light Stick', price: 1690, quantity: 1 },
      { productId: 'p-jeff-hat', name: 'Jeff Satur Asia Tour Bucket Hat', price: 2000, quantity: 2 },
    ],
    subtotal: 5690,
    deliveryFee: 0,
    totalAmount: 5690,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-8821345567',
    shippingAddress: '123 สุขุมวิท กรุงเทพฯ 10110',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'in_transit',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-07-13T10:00:00+07:00', note: 'ยืนยันคำสั่งซื้อเรียบร้อย' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-07-14T09:30:00+07:00', note: 'แพ็คสินค้าและพิมพ์ใบนำส่ง' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-07-15T14:20:00+07:00', note: 'สินค้าออกจากศูนย์กระจายสินค้าบางนา' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: null, note: 'รอการจัดส่งถึงปลายทาง' },
    ],
    createdAt: '2026-07-13T10:00:00+07:00',
  },
  {
    _id: 'ORD-0025',
    userId: 'usr-game',
    orderNumber: 'MR-20260717-700333',
    items: [
      { productId: 'p-perses-hoodie', name: "URTHE x PERSES PIECES HOODIE", price: 1290, quantity: 2 },
      { productId: 'p-perses-lightstick', name: 'PERSES Official Light Stick', price: 1890, quantity: 1 },
    ],
    subtotal: 4470,
    deliveryFee: 0,
    totalAmount: 4470,
    shippingProvider: 'Flash Express',
    trackingNumber: 'FLS-2525251122',
    shippingAddress: '34 พระราม 9 กรุงเทพฯ 10310',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'in_transit',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-07-17T14:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-07-18T09:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-07-18T16:00:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: null, note: 'รอการจัดส่งถึงปลายทาง' },
    ],
    createdAt: '2026-07-17T14:00:00+07:00',
  },
  {
    _id: 'ORD-1005',
    userId: 'usr-touch',
    orderNumber: 'MR-20260719-908412',
    items: [
      { productId: 'p-perses-hoodie', name: "URTHE x PERSES PIECES HOODIE", price: 1290, quantity: 1 },
      { productId: 'p-paradox-tshirt', name: 'PARADOX UNPLUGGED T-Shirt', price: 590, quantity: 1 },
    ],
    subtotal: 1880,
    deliveryFee: 50,
    totalAmount: 1930,
    shippingProvider: 'Flash Express',
    trackingNumber: 'FLS-1122334455',
    shippingAddress: '45 ลาดพร้าว กรุงเทพฯ 10900',
    paymentMethod: 'โอนเงินผ่านธนาคาร',
    paymentStatus: 'paid',
    deliveryStatus: 'cancelled',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-07-19T12:00:00+07:00', note: 'ยืนยันคำสั่งซื้อเรียบร้อย' },
      { status: 'cancelled', label: 'ยกเลิก', time: '2026-07-20T09:00:00+07:00', note: 'ลูกค้ายกเลิกคำสั่งซื้อด้วยเหตุผลส่วนตัว' },
    ],
    createdAt: '2026-07-19T12:00:00+07:00',
  },
  {
    _id: 'ORD-0026',
    userId: 'usr-mike',
    orderNumber: 'MR-20260724-700444',
    items: [
      { productId: 'p-non-vinyl', name: 'อัลบั้ม Cigarette Candy & Vanilla Sky (Vinyl Limited Edition Triple LP)', price: 3500, quantity: 1 },
      { productId: 'p-non-lightstick', name: 'NONT TANONT Official Light Stick', price: 1690, quantity: 1 },
    ],
    subtotal: 5190,
    deliveryFee: 0,
    totalAmount: 5190,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-2626263344',
    shippingAddress: '56 ลาดพร้าว นนทบุรี 11000',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'shipping',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-07-24T10:30:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-07-25T09:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
    ],
    createdAt: '2026-07-24T10:30:00+07:00',
  },
  {
    _id: 'ORD-0027',
    userId: 'usr-earn',
    orderNumber: 'MR-20260729-700555',
    items: [
      { productId: 'p-joey-inhaler', name: 'ยาดมภูวสูด - ของที่ระลึกงานสาธารณะสุข STATION', price: 99, quantity: 20 },
    ],
    subtotal: 1980,
    deliveryFee: 50,
    totalAmount: 2030,
    shippingProvider: 'Flash Express',
    trackingNumber: 'FLS-2727275566',
    shippingAddress: '789 สีลม ปทุมธานี 12000',
    paymentMethod: 'PromptPay',
    paymentStatus: 'pending',
    deliveryStatus: 'pending',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-07-29T16:00:00+07:00', note: 'รอชำระเงิน' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
    ],
    createdAt: '2026-07-29T16:00:00+07:00',
  },
  //  สิงหาคม 2026 (Aug)
  {
    _id: 'ORD-0028',
    userId: 'usr-ploy',
    orderNumber: 'MR-20260803-800111',
    items: [
      { productId: 'p-clash-tshirt-one', name: 'CLASH อัลบั้ม ONE T-Shirt', price: 690, quantity: 3 },
    ],
    subtotal: 2070,
    deliveryFee: 0,
    totalAmount: 2070,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-2828287788',
    shippingAddress: '88 บางรัก กรุงเทพฯ 10500',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-08-03T09:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-08-04T08:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-08-04T14:30:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-08-06T10:00:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-08-03T09:00:00+07:00',
  },
  {
    _id: 'ORD-1004',
    userId: 'usr-touch',
    orderNumber: 'MR-20260802-339851',
    items: [
      { productId: 'p-bus-lightstick', name: "BUS Official Light Stick 'BOB'", price: 1890, quantity: 1 },
      { productId: 'p-bus-tshirt', name: 'BUS Light The World T-Shirt', price: 590, quantity: 2 },
    ],
    subtotal: 3070,
    deliveryFee: 0,
    totalAmount: 3070,
    shippingProvider: 'DHL Express',
    trackingNumber: 'DHL-901234567',
    shippingAddress: '45 ลาดพร้าว กรุงเทพฯ 10900',
    paymentMethod: 'PromptPay',
    paymentStatus: 'pending',
    deliveryStatus: 'pending',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-08-02T19:20:00+07:00', note: 'รอชำระเงินและยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
    ],
    createdAt: '2026-08-02T19:20:00+07:00',
  },
  {
    _id: 'ORD-0029',
    userId: 'usr-game',
    orderNumber: 'MR-20260810-800222',
    items: [
      { productId: 'p-4eve-toy-case', name: '4EVE ART TOY : Limited Blind Box Figure (ยกกล่อง)', price: 6000, quantity: 1 },
      { productId: 'p-4eve-lightstick', name: 'แท่งไฟ 4EVE รุ่นใหม่', price: 1200, quantity: 2 },
    ],
    subtotal: 8400,
    deliveryFee: 0,
    totalAmount: 8400,
    shippingProvider: 'DHL Express',
    trackingNumber: 'DHL-2929299900',
    shippingAddress: '34 พระราม 9 กรุงเทพฯ 10310',
    paymentMethod: 'บัตรเครดิต',
    paymentStatus: 'paid',
    deliveryStatus: 'shipping',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-08-10T10:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-08-11T09:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
    ],
    createdAt: '2026-08-10T10:00:00+07:00',
  },
  {
    _id: 'ORD-0030',
    userId: 'usr-non',
    orderNumber: 'MR-20260818-800333',
    items: [
      { productId: 'p-clash-tshirt-shake', name: 'Clash อัลบั้ม SoundShake T-SHIRT', price: 690, quantity: 2 },
      { productId: 'p-clash-tshirt-one', name: 'CLASH อัลบั้ม ONE T-Shirt', price: 690, quantity: 1 },
    ],
    subtotal: 2070,
    deliveryFee: 0,
    totalAmount: 2070,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-3030301122',
    shippingAddress: '123 สุขุมวิท กรุงเทพฯ 10110',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'in_transit',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-08-18T11:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-08-19T08:30:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-08-19T15:00:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: null, note: 'รอการจัดส่งถึงปลายทาง' },
    ],
    createdAt: '2026-08-18T11:00:00+07:00',
  },
  {
    _id: 'ORD-0031',
    userId: 'usr-pim',
    orderNumber: 'MR-20260825-800444',
    items: [
      { productId: 'p-bus-lightstick', name: "BUS Official Light Stick 'BOB'", price: 1890, quantity: 1 },
      { productId: 'p-paradox-sweater', name: 'PARADOX UNPLUGGED Sweater', price: 950, quantity: 1 },
    ],
    subtotal: 2840,
    deliveryFee: 0,
    totalAmount: 2840,
    shippingProvider: 'Flash Express',
    trackingNumber: 'FLS-3131313344',
    shippingAddress: '21 สุขุมวิท ชลบุรี 20000',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'shipping',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-08-25T14:30:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-08-26T09:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
    ],
    createdAt: '2026-08-25T14:30:00+07:00',
  },
  {
    _id: 'ORD-0032',
    userId: 'usr-earn',
    orderNumber: 'MR-20260830-800555',
    items: [
      { productId: 'p-jeff-hat', name: 'Jeff Satur Asia Tour Bucket Hat', price: 2000, quantity: 1 },
    ],
    subtotal: 2000,
    deliveryFee: 0,
    totalAmount: 2000,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-3232325566',
    shippingAddress: '789 สีลม ปทุมธานี 12000',
    paymentMethod: 'PromptPay',
    paymentStatus: 'failed',
    deliveryStatus: 'pending',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-08-30T16:00:00+07:00', note: 'ชำระเงินล้มเหลว' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
    ],
    createdAt: '2026-08-30T16:00:00+07:00',
  },
  //  กันยายน 2026 (Sep) — วันนี้ 9 ก.ย.
  {
    _id: 'ORD-0033',
    userId: 'usr-milk',
    orderNumber: 'MR-20260902-900111',
    items: [
      { productId: 'p-tmd-cd', name: "Three Man Down – อัลบั้ม '28' (Box Set CD)", price: 790, quantity: 1 },
      { productId: 'p-clash-tshirt-one', name: 'CLASH อัลบั้ม ONE T-Shirt', price: 690, quantity: 1 },
    ],
    subtotal: 1480,
    deliveryFee: 50,
    totalAmount: 1530,
    shippingProvider: 'Flash Express',
    trackingNumber: 'FLS-3333337788',
    shippingAddress: '12 รัชดาภิเษก กรุงเทพฯ 10400',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'delivered',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-09-02T10:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-09-03T08:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-09-03T14:30:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: '2026-09-05T10:00:00+07:00', note: 'ผู้รับได้รับสินค้าแล้ว' },
    ],
    createdAt: '2026-09-02T10:00:00+07:00',
  },
  {
    _id: 'ORD-0034',
    userId: 'usr-touch',
    orderNumber: 'MR-20260905-900222',
    items: [
      { productId: 'p-non-vinyl', name: 'อัลบั้ม Cigarette Candy & Vanilla Sky (Vinyl Limited Edition Triple LP)', price: 3500, quantity: 1 },
      { productId: 'p-bird-vinyl', name: 'Bird Twenty Two (Color Vinyl)', price: 2200, quantity: 1 },
    ],
    subtotal: 5700,
    deliveryFee: 0,
    totalAmount: 5700,
    shippingProvider: 'DHL Express',
    trackingNumber: 'DHL-3434349900',
    shippingAddress: '45 ลาดพร้าว กรุงเทพฯ 10900',
    paymentMethod: 'บัตรเครดิต',
    paymentStatus: 'paid',
    deliveryStatus: 'in_transit',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-09-05T11:30:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-09-06T09:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: '2026-09-06T16:00:00+07:00', note: 'พัสดุอยู่ระหว่างขนส่ง' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: null, note: 'รอการจัดส่งถึงปลายทาง' },
    ],
    createdAt: '2026-09-05T11:30:00+07:00',
  },
  {
    _id: 'ORD-0035',
    userId: 'usr-mike',
    orderNumber: 'MR-20260908-900333',
    items: [
      { productId: 'p-bus-lightstick', name: "BUS Official Light Stick 'BOB'", price: 1890, quantity: 1 },
      { productId: 'p-perses-lightstick', name: 'PERSES Official Light Stick', price: 1890, quantity: 1 },
    ],
    subtotal: 3780,
    deliveryFee: 0,
    totalAmount: 3780,
    shippingProvider: 'Kerry Express',
    trackingNumber: 'KER-3535351122',
    shippingAddress: '56 ลาดพร้าว นนทบุรี 11000',
    paymentMethod: 'PromptPay',
    paymentStatus: 'paid',
    deliveryStatus: 'shipping',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-09-08T15:00:00+07:00', note: 'ยืนยันคำสั่งซื้อ' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: '2026-09-09T09:00:00+07:00', note: 'แพ็คสินค้าเรียบร้อย' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
    ],
    createdAt: '2026-09-08T15:00:00+07:00',
  },
  {
    _id: 'ORD-0036',
    userId: 'usr-ploy',
    orderNumber: 'MR-20260909-900444',
    items: [
      { productId: 'p-4eve-toy', name: '4EVE ART TOY : Limited Blind Box Figure', price: 750, quantity: 2 },
      { productId: 'p-paradox-tshirt', name: 'PARADOX UNPLUGGED T-Shirt', price: 590, quantity: 1 },
    ],
    subtotal: 2090,
    deliveryFee: 50,
    totalAmount: 2140,
    shippingProvider: 'Flash Express',
    trackingNumber: 'FLS-3636363344',
    shippingAddress: '88 บางรัก กรุงเทพฯ 10500',
    paymentMethod: 'PromptPay',
    paymentStatus: 'pending',
    deliveryStatus: 'pending',
    timeline: [
      { status: 'pending', label: 'รับคำสั่งซื้อ', time: '2026-09-09T08:30:00+07:00', note: 'รอชำระเงิน' },
      { status: 'shipping', label: 'เตรียมจัดส่ง', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
      { status: 'in_transit', label: 'อยู่ระหว่างขนส่ง', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
      { status: 'delivered', label: 'จัดส่งสำเร็จ', time: null, note: 'ยังไม่เริ่มขั้นตอนนี้' },
    ],
    createdAt: '2026-09-09T08:30:00+07:00',
  },
];
// Report Helper Functions — สำหรับกรองออเดอร์ตามช่วงเวลา
export const REPORT_PERIODS = {
  daily:   { label: 'Daily Report',   labelShort: 'Daily' },
  weekly:  { label: 'Weekly Report',  labelShort: 'Weekly' },
  monthly: { label: 'Monthly Report', labelShort: 'Monthly' },
  yearly:  { label: 'Yearly Report',  labelShort: 'Yearly' },
};

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

function startOfWeek(date) {
  const d = startOfDay(date);
  const day = d.getDay(); // 0 = Sun
  d.setDate(d.getDate() - day);
  return d;
}

function startOfMonth(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function startOfYear(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), 0, 1);
}

function endOfYear(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), 11, 31, 23, 59, 59, 999);
}

function isInRange(orderDate, rangeStart, rangeEnd) {
  const d = new Date(orderDate);
  return d >= rangeStart && d <= rangeEnd;
}

function filterOrdersByRange(rangeStart, rangeEnd) {
  return mockOrders.filter((o) => isInRange(o.createdAt, rangeStart, rangeEnd));
}

export function getOrdersDaily(referenceDate = new Date()) {
  return filterOrdersByRange(startOfDay(referenceDate), endOfDay(referenceDate));
}

export function getOrdersWeekly(referenceDate = new Date()) {
  return filterOrdersByRange(startOfWeek(referenceDate), endOfDay(referenceDate));
}

export function getOrdersMonthly(referenceDate = new Date()) {
  const start = startOfMonth(referenceDate);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);
  end.setTime(end.getTime() - 1);
  return filterOrdersByRange(start, end);
}

export function getOrdersYearly(referenceDate = new Date()) {
  return filterOrdersByRange(startOfYear(referenceDate), endOfYear(referenceDate));
}

// คำนวณ KPI รายได้รวม ออเดอร์ตามสถานะ และ 5 อันดับสินค้าขายดี สำหรับ Admin Report
export function computeReportSummary(orders) {
  const totalOrders = orders.length;
  const paidOrders = orders.filter((o) => o.paymentStatus === 'paid');
  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const avgOrderValue = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;

  const statusCounts = {};
  for (const status of ['pending', 'shipping', 'in_transit', 'delivered', 'cancelled']) {
    statusCounts[status] = orders.filter((o) => o.deliveryStatus === status).length;
  }

  const paymentCounts = {};
  for (const ps of ['paid', 'pending', 'failed', 'refunded']) {
    paymentCounts[ps] = orders.filter((o) => o.paymentStatus === ps).length;
  }

  const productMap = {};
  for (const o of orders) {
    for (const item of o.items) {
      if (!productMap[item.name]) {
        productMap[item.name] = { name: item.name, qty: 0, revenue: 0 };
      }
      productMap[item.name].qty += item.quantity;
      productMap[item.name].revenue += item.price * item.quantity;
    }
  }
  const topProducts = Object.values(productMap)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return {
    totalOrders,
    totalRevenue,
    avgOrderValue,
    paidOrders: paidOrders.length,
    statusCounts,
    paymentCounts,
    topProducts,
  };
}

// Data Access Layer จำลองการ query คำสั่งซื้อตามเงื่อนไข (UserId, OrderId, DeliveryStatus)
export function getOrders() {
  return [...mockOrders];
}

export function getOrdersByUser(userId) {
  return mockOrders.filter((order) => order.userId === userId);
}

export function getOrderById(orderId) {
  return mockOrders.find((order) => order._id === orderId) || null;
}

export function getOrdersByStatus(status) {
  return mockOrders.filter((order) => order.deliveryStatus === status);
}
