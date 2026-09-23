// ============================================================================
// MERCHROOM DATABASE SEED SCRIPT
// ============================================================================
// ไฟล์นี้ใช้สำหรับรีเซ็ตและเติมข้อมูลเริ่มต้น (Initial Seed Dataset) ลงใน MongoDB
// ประกอบด้วย: Users, Categories, Artists, Products และ Orders
// ============================================================================

// ==================== 1. IMPORTS & MODELS ====================
const connectDB = require('./db');
const User = require('./models/User');
const Artist = require('./models/Artist');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Cart = require('./models/Cart');
const Order = require('./models/Order');
const Payment = require('./models/Payment');
const Review = require('./models/Review');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// ==================== 2. SEED USERS DATA ====================
const mockUsers = [
  {
    _id: 'usr-non',
    email: 'non@gmail.com',
    password: 'non12345',
    firstName: 'นนท์',
    lastName: 'ใจงาม',
    phone: '0812345678',
    address: '123 สุขุมวิท กรุงเทพฯ 10110',
    role: 'customer',
    employeeId: '',
    memberSince: '2025-03-10',
  },
  {
    _id: 'usr-touch',
    email: 'touchy2003@gmail.com',
    password: 'touch1234',
    firstName: 'Touch',
    lastName: 'Chy',
    phone: '0809203752',
    address: '45 ลาดพร้าว กรุงเทพฯ 10900',
    role: 'customer',
    employeeId: '',
    memberSince: '2026-01-15',
  },
  {
    _id: 'usr-earn',
    email: 'earn.sarawut@gmail.com',
    password: 'earn1234',
    firstName: 'Earn',
    lastName: 'Sarawut',
    phone: '0864321987',
    address: '789 สีลม ปทุมธานี 12000',
    role: 'customer',
    employeeId: '',
    memberSince: '2025-12-20',
  },
  {
    _id: 'usr-milk',
    email: 'milk.pimchanok@gmail.com',
    password: 'milk1234',
    firstName: 'Milk',
    lastName: 'Pimchanok',
    phone: '0987654321',
    address: '12 รัชดาภิเษก กรุงเทพฯ 10400',
    role: 'customer',
    employeeId: '',
    memberSince: '2026-02-05',
  },
  {
    _id: 'usr-mike',
    email: 'mike.chayanit@gmail.com',
    password: 'mike1234',
    firstName: 'Mike',
    lastName: 'Chayanit',
    phone: '0819876543',
    address: '56 ลาดพร้าว นนทบุรี 11000',
    role: 'customer',
    employeeId: '',
    memberSince: '2026-03-14',
  },
  {
    _id: 'usr-ploy',
    email: 'ploy.apsara@gmail.com',
    password: 'ploy1234',
    firstName: 'Ploy',
    lastName: 'Apsara',
    phone: '0855556666',
    address: '88 บางรัก กรุงเทพฯ 10500',
    role: 'customer',
    employeeId: '',
    memberSince: '2026-04-01',
  },
  {
    _id: 'usr-game',
    email: 'game.wirayut@gmail.com',
    password: 'game1234',
    firstName: 'Game',
    lastName: 'Wirayut',
    phone: '0912345678',
    address: '34 พระราม 9 กรุงเทพฯ 10310',
    role: 'customer',
    employeeId: '',
    memberSince: '2026-05-22',
  },
  {
    _id: 'usr-pim',
    email: 'pim.nattaya@gmail.com',
    password: 'pim1234',
    firstName: 'Pim',
    lastName: 'Nattaya',
    phone: '0877778888',
    address: '21 สุขุมวิท ชลบุรี 20000',
    role: 'customer',
    employeeId: '',
    memberSince: '2026-06-10',
  },
  {
    _id: 'usr-admin',
    email: 'admin@merchroom.com',
    password: 'admin1234',
    firstName: 'ทีม',
    lastName: 'แอดมิน',
    phone: '0898765432',
    address: 'สำนักงานใหญ่ กรุงเทพฯ',
    role: 'admin',
    employeeId: 'EMP-0001',
    memberSince: '2024-11-01',
  },
  {
    _id: 'usr-focus',
    email: 'focusjustdoit@gmail.com',
    password: 'focus1234',
    firstName: 'Focus',
    lastName: 'Niti',
    phone: '0809203752',
    address: 'bangkok',
    role: 'customer',
    employeeId: 'EMP-0002',
    memberSince: '2024-11-01',
  },
  {
    _id: 'usr-focus-admin',
    email: 'focus@merchroom.com',
    password: 'Test1234!',
    firstName: 'Focus',
    lastName: 'Admin',
    phone: '0809203752',
    address: 'สำนักงานใหญ่ กรุงเทพฯ',
    role: 'admin',
    employeeId: 'EMP-0003',
    memberSince: '2024-11-01',
  },
  // Added Admin accounts (touch, heinz, tony, non) with @merchroom.com and same password (admin1234)
  {
    email: 'touch@merchroom.com',
    password: 'admin1234',
    firstName: 'Touch',
    lastName: 'Admin',
    phone: '0809203752',
    address: 'สำนักงานใหญ่ กรุงเทพฯ',
    role: 'admin',
    employeeId: 'EMP-0004',
    memberSince: '2024-11-01',
  },
  {
    email: 'heinz@merchroom.com',
    password: 'admin1234',
    firstName: 'Heinz',
    lastName: 'Admin',
    phone: '0809203752',
    address: 'สำนักงานใหญ่ กรุงเทพฯ',
    role: 'admin',
    employeeId: 'EMP-0005',
    memberSince: '2024-11-01',
  },
  {
    email: 'tony@merchroom.com',
    password: 'admin1234',
    firstName: 'Tony',
    lastName: 'Admin',
    phone: '0809203752',
    address: 'สำนักงานใหญ่ กรุงเทพฯ',
    role: 'admin',
    employeeId: 'EMP-0006',
    memberSince: '2024-11-01',
  },
  {
    email: 'non@merchroom.com',
    password: 'admin1234',
    firstName: 'Non',
    lastName: 'Admin',
    phone: '0809203752',
    address: 'สำนักงานใหญ่ กรุงเทพฯ',
    role: 'admin',
    employeeId: 'EMP-0007',
    memberSince: '2024-11-01',
  },
];


// ==================== 3. SEED ORDERS DATA ====================
const mockOrders = [
  {
    _id: 'ORD-0001',
    userId: 'usr-earn',
    orderNumber: 'MR-20260108-100011',
    items: [{ name: 'Bird Twenty Two (Color Vinyl)', price: 2200, quantity: 1 }],
    totalAmount: 2200,
    shippingProvider: 'Kerry Express',
    shippingAddress: '789 สีลม ปทุมธานี 12000',
    deliveryStatus: 'delivered',
    createdAt: '2026-01-08T09:00:00+07:00',
  },
  {
    _id: 'ORD-0002',
    userId: 'usr-milk',
    orderNumber: 'MR-20260114-100345',
    items: [
      { name: 'PARADOX UNPLUGGED T-Shirt', price: 590, quantity: 2 },
      { name: 'PARADOX UNPLUGGED Sweater', price: 950, quantity: 1 },
    ],
    totalAmount: 2130,
    shippingProvider: 'Flash Express',
    shippingAddress: '12 รัชดาภิเษก กรุงเทพฯ 10400',
    deliveryStatus: 'delivered',
    createdAt: '2026-01-14T10:30:00+07:00',
  },
  {
    _id: 'ORD-0003',
    userId: 'usr-non',
    orderNumber: 'MR-20260122-100789',
    items: [{ name: '4EVE ART TOY : Limited Blind Box Figure (ยกกล่อง)', price: 6000, quantity: 1 }],
    totalAmount: 6000,
    shippingProvider: 'DHL Express',
    shippingAddress: '123 สุขุมวิท กรุงเทพฯ 10110',
    deliveryStatus: 'delivered',
    createdAt: '2026-01-22T11:00:00+07:00',
  },
];


// ==================== 4. MAIN SEED FUNCTION ====================
async function runSeed() {
    await connectDB();

    try {
        // Clear existing collections to prevent duplicate key errors
        await Product.deleteMany({});
        await Artist.deleteMany({});
        await Category.deleteMany({});
        await User.deleteMany({});
        await Order.deleteMany({});
        await Payment.deleteMany({});
        await Review.deleteMany({});
        await Cart.deleteMany({});

        // --- A. SEED USERS ---
        const createdUsers = [];
        for (const u of mockUsers) {
            const hashedPassword = await bcrypt.hash(u.password || 'password123', 10);
            const userObj = {
                email: u.email,
                password: hashedPassword,
                firstName: u.firstName || 'User',
                lastName: u.lastName || '',
                phone: u.phone || '',
                address: u.address || '',
                role: u.role || 'customer',
                employeeId: u.employeeId || '',
                interests: u.interests || [],
                paymentMethods: u.paymentMethods || [],
                profilePicture: u.profilePicture || '',
                socialAccounts: u.socialAccounts || []
            };
            if (u._id && mongoose.Types.ObjectId.isValid(u._id)) {
                userObj._id = u._id;
            }
            const created = await User.create(userObj);
            createdUsers.push({ mockId: u._id, dbId: created._id, email: u.email });
        }

        // --- B. SEED CATEGORIES ---
        const categories = await Category.create([
            { _id: "681a0f1e2d3c4b5a6970f010", name: "เสื้อผ้า", slug: "apparel" },
            { _id: "681a0f1e2d3c4b5a6970f011", name: "หมวก", slug: "hat" },
            { _id: "681a0f1e2d3c4b5a6970f013", name: "แฟนไอเทม", slug: "fanmerch" },
            { _id: "681a0f1e2d3c4b5a6970f014", name: "อัลบั้มเพลง", slug: "album" },
            { _id: "681a0f1e2d3c4b5a6970f015", name: "Merchandise", slug: "merchandise" }
        ]);

        // --- C. SEED ARTISTS ---
        const artists = await Artist.create([
            { _id: "681a0f1e2d3c4b5a6970f070", name: "THE PARKINSON", type: "band", bio: "The Parkinson Orchestra concert", style: "pop, R&B" },
            { _id: "681a0f1e2d3c4b5a6970f071", name: "SMALLROOM", type: "band", bio: "Smallroom 25th Anniversary", style: "indie" },
            { _id: "681a0f1e2d3c4b5a6970f072", name: "LAONGFONG", type: "band", bio: "Laongfong band", style: "pop" },
            { _id: "681a0f1e2d3c4b5a6970f073", name: "TAYLOR SWIFT", type: "solo", bio: "Global Pop Superstar", style: "pop, country" },
            { _id: "681a0f1e2d3c4b5a6970f074", name: "JUSTIN BIEBER", type: "solo", bio: "Pop icon", style: "pop, R&B" },
            { _id: "681a0f1e2d3c4b5a6970f075", name: "LINKIN PARK", type: "band", bio: "Legendary Rock Band", style: "rock, metal" },
            { _id: "681a0f1e2d3c4b5a6970f076", name: "BILLIE EILISH", type: "solo", bio: "Grammy Award-winning artist", style: "pop, alternative" },
            { _id: "681a0f1e2d3c4b5a6970f077", name: "A7X", type: "band", bio: "Heavy metal band", style: "metal, rock" },
            { _id: "681a0f1e2d3c4b5a6970f078", name: "SACIT", type: "group", bio: "Thai Handicraft and Art", style: "handicraft" },
            { _id: "681a0f1e2d3c4b5a6970f079", name: "CHAKSARN", type: "group", bio: "Thai fashion craftsmanship", style: "craft" },
            { _id: "681a0f1e2d3c4b5a6970f07a", name: "NO ONE ELSE", type: "band", bio: "Thai Pop Band", style: "pop" },
            { _id: "681a0f1e2d3c4b5a6970f07b", name: "NONT TANONT", type: "solo", bio: "Thai singer", style: "pop" },
            { _id: "681a0f1e2d3c4b5a6970f07c", name: "WHAL & DOLPH", type: "band", bio: "Indie pop duo", style: "indie pop" },
            { _id: "681a0f1e2d3c4b5a6970f07d", name: "UNCLE BEN", type: "band", bio: "Indie band", style: "indie rock" }
        ]);

        // --- D. SEED PRODUCTS ---
        await Product.create([
            {
                _id: "681a0f1e2d3c4b5a6970f0a1",
                name: "VINYL: THE PARKINSON",
                description: "The Parkinson Orchestra concert",
                price: 2200,
                quantity: 25,
                national: "thailand",
                style: "Photo",
                medium: "Vinyl",
                sizes: [],
                tags: ["thailand", "Photo", "Vinyl"],
                category: "681a0f1e2d3c4b5a6970f014",
                artist: "681a0f1e2d3c4b5a6970f070",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0a2",
                name: "NFC Keychain: Smallroom 25th Anniversary",
                description: "เสียงเพลงในรูปแบบเครื่องประดับสุดเท่ นอกจากจะเป็นพวงกุญแจที่สามารถพกติดตัวไปได้ทุกที่ แล้วNFC ยังทำให้แฟนๆห้องเล็กของคุณได้ฟังเพลง250เพลง",
                price: 299,
                quantity: 50,
                national: "thailand",
                style: "Illustration",
                medium: "Accessories",
                sizes: [],
                tags: ["thailand", "Illustration", "Accessories"],
                category: "681a0f1e2d3c4b5a6970f013",
                artist: "681a0f1e2d3c4b5a6970f071",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0a3",
                name: "SPMD0330-BLUEJEAN น้ำเงินยีนส์",
                description: "LIDO LIVEHOUSE Nostalgia Replay presents",
                price: 490,
                quantity: 40,
                national: "thailand",
                style: "Typography",
                medium: "Accessories",
                sizes: [],
                tags: ["thailand", "Typography", "Accessories"],
                category: "681a0f1e2d3c4b5a6970f011",
                artist: "681a0f1e2d3c4b5a6970f072",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0a4",
                name: "Charcoal Black Tee: Smallroom 25th Anniversary",
                description: "เสื้อยืด Charcoal Black Tee ลายสุดพิเศษฉลอง 25ปี smallroom เสื้อยืดทรงสวย นุ่มสบาย ระบายอากาศดี",
                price: 620,
                quantity: 60,
                national: "thailand",
                style: "Illustration",
                medium: "T-Shirt",
                sizes: ["S", "M", "L", "XL"],
                tags: ["thailand", "Illustration", "T-Shirt", "S", "M", "L", "XL"],
                category: "681a0f1e2d3c4b5a6970f010",
                artist: "681a0f1e2d3c4b5a6970f071",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0a5",
                name: "CANVAS BAG NO ONE ELSE",
                description: "ผลิตจากผ้าแคนวาส หนาพิเศษ อยู่ทรงตั้งได้ ภายในใส่ได้จุใจ",
                price: 1190,
                quantity: 30,
                national: "thailand",
                style: "Illustration",
                medium: "Accessories",
                sizes: [],
                tags: ["thailand", "Illustration", "Accessories"],
                category: "681a0f1e2d3c4b5a6970f013",
                artist: "681a0f1e2d3c4b5a6970f071",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0a6",
                name: "BABY, THAT'S SHOW BUSINESS CROPPED TEE",
                description: "Ivory cropped t-shirt featuring 'The Life of a Showgirl' design.",
                price: 1308.94,
                quantity: 50,
                national: "international",
                style: "Photo",
                medium: "T-Shirt",
                sizes: ["S", "M", "L", "XL"],
                tags: ["international", "Photo", "T-Shirt", "S", "M", "L", "XL"],
                category: "681a0f1e2d3c4b5a6970f010",
                artist: "681a0f1e2d3c4b5a6970f073",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0a7",
                name: "THE LIFE OF A SHOWGIRL IT'S FRIGHTENING BLACK CREWNECK SWEATSHIRT",
                description: "Black long sleeve crewneck sweatshirt featuring Taylor Swift logo.",
                price: 2126.8,
                quantity: 35,
                national: "international",
                style: "Typography",
                medium: "T-Shirt",
                sizes: ["S", "M", "L", "XL"],
                tags: ["international", "Typography", "T-Shirt", "S", "M", "L", "XL"],
                category: "681a0f1e2d3c4b5a6970f010",
                artist: "681a0f1e2d3c4b5a6970f073",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0a8",
                name: "THE LIFE OF A SHOWGIRL CREWNECK SWEATSHIRT BOX SET",
                description: "Limited edition crewneck sweatshirt box set with exclusive track list graphic.",
                price: 2126.8,
                quantity: 20,
                national: "international",
                style: "Typography",
                medium: "Vinyl",
                sizes: [],
                tags: ["international", "Typography", "Vinyl"],
                category: "681a0f1e2d3c4b5a6970f014",
                artist: "681a0f1e2d3c4b5a6970f073",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0a9",
                name: "THE TORTURED POETS DEPARTMENT GRAY PHOTO LONG SLEEVE T-SHIRT",
                description: "Gray long sleeve t-shirt with album graphic and tracklist.",
                price: 1800,
                quantity: 40,
                national: "international",
                style: "Photo",
                medium: "T-Shirt",
                sizes: ["S", "M", "L", "XL"],
                tags: ["international", "Photo", "T-Shirt", "S", "M", "L", "XL"],
                category: "681a0f1e2d3c4b5a6970f010",
                artist: "681a0f1e2d3c4b5a6970f073",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0aa",
                name: "THE TORTURED POETS DEPARTMENT GRAY HOODIE",
                description: "Smoke gray hoodie with front pocket and album graphics.",
                price: 1800,
                quantity: 30,
                national: "international",
                style: "Typography",
                medium: "T-Shirt",
                sizes: ["S", "M", "L", "XL"],
                tags: ["international", "Typography", "T-Shirt", "S", "M", "L", "XL"],
                category: "681a0f1e2d3c4b5a6970f010",
                artist: "681a0f1e2d3c4b5a6970f073",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0ab",
                name: "Ghost Bieber Crewneck III",
                description: "Crewneck จากคอลเลกชัน Ghost Bieber",
                price: 1500,
                quantity: 25,
                national: "international",
                style: "Typography",
                medium: "T-Shirt",
                sizes: ["S", "M", "L", "XL"],
                tags: ["international", "Typography", "T-Shirt", "S", "M", "L", "XL"],
                category: "681a0f1e2d3c4b5a6970f010",
                artist: "681a0f1e2d3c4b5a6970f074",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0ac",
                name: "Peaches T-Shirt (Green)",
                description: "เสื้อยืดสีเขียวจากคอลเลกชัน Peaches",
                price: 1100,
                quantity: 40,
                national: "international",
                style: "Illustration",
                medium: "T-Shirt",
                sizes: ["S", "M", "L", "XL"],
                tags: ["international", "Illustration", "T-Shirt", "S", "M", "L", "XL"],
                category: "681a0f1e2d3c4b5a6970f010",
                artist: "681a0f1e2d3c4b5a6970f074",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0ad",
                name: "Peaches Tie Dye Hoodie",
                description: "ฮู้ดดี้ tie-dye จากคอลเลกชัน Peaches",
                price: 1900,
                quantity: 30,
                national: "international",
                style: "Illustration",
                medium: "T-Shirt",
                sizes: ["S", "M", "L", "XL"],
                tags: ["international", "Illustration", "T-Shirt", "S", "M", "L", "XL"],
                category: "681a0f1e2d3c4b5a6970f010",
                artist: "681a0f1e2d3c4b5a6970f074",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0ae",
                name: "Peaches Nalgene",
                description: "กระติกน้ำ Nalgene คอลเลกชัน Peaches",
                price: 850,
                quantity: 50,
                national: "international",
                style: "Photo",
                medium: "Home & Living",
                sizes: [],
                tags: ["international", "Photo", "Home & Living"],
                category: "681a0f1e2d3c4b5a6970f013",
                artist: "681a0f1e2d3c4b5a6970f074",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0af",
                name: "Unshatter Soundtrack Vinyl 2LP",
                description: "แผ่นเสียง 2LP จากซาวด์แทร็กเรื่อง Unshatter",
                price: 2200,
                quantity: 20,
                national: "international",
                style: "Typography",
                medium: "Vinyl",
                sizes: [],
                tags: ["international", "Typography", "Vinyl"],
                category: "681a0f1e2d3c4b5a6970f014",
                artist: "681a0f1e2d3c4b5a6970f075",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0b0",
                name: "Long Sleeve Tee",
                description: "เสื้อแขนยาวลาย Linkin Park",
                price: 1300,
                quantity: 45,
                national: "international",
                style: "Typography",
                medium: "T-Shirt",
                sizes: ["S", "M", "L", "XL"],
                tags: ["international", "Typography", "T-Shirt", "S", "M", "L", "XL"],
                category: "681a0f1e2d3c4b5a6970f010",
                artist: "681a0f1e2d3c4b5a6970f075",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0b1",
                name: "Women's Crewneck",
                description: "เสื้อครูเชสเชอร์สำหรับผู้หญิง",
                price: 1600,
                quantity: 30,
                national: "international",
                style: "Photo",
                medium: "T-Shirt",
                sizes: ["S", "M", "L", "XL"],
                tags: ["international", "Photo", "T-Shirt", "S", "M", "L", "XL"],
                category: "681a0f1e2d3c4b5a6970f010",
                artist: "681a0f1e2d3c4b5a6970f075",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0b2",
                name: "Ladies White Cropped Tee",
                description: "เสื้อครอปสีขาวสำหรับผู้หญิง",
                price: 1200,
                quantity: 40,
                national: "international",
                style: "Photo",
                medium: "T-Shirt",
                sizes: ["S", "M", "L", "XL"],
                tags: ["international", "Photo", "T-Shirt", "S", "M", "L", "XL"],
                category: "681a0f1e2d3c4b5a6970f010",
                artist: "681a0f1e2d3c4b5a6970f075",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0b3",
                name: "Hit Me Hard and Soft Tour Hoodie",
                description: "ฮู้ดดี้ทัวร์คอนเสิร์ต Hit Me Hard and Soft",
                price: 2100,
                quantity: 35,
                national: "international",
                style: "Typography",
                medium: "T-Shirt",
                sizes: ["S", "M", "L", "XL"],
                tags: ["international", "Typography", "T-Shirt", "S", "M", "L", "XL"],
                category: "681a0f1e2d3c4b5a6970f010",
                artist: "681a0f1e2d3c4b5a6970f076",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0b4",
                name: "The Tour Gold T-Shirt",
                description: "เสื้อยืด The Tour สีทอง",
                price: 1100,
                quantity: 50,
                national: "international",
                style: "Illustration",
                medium: "T-Shirt",
                sizes: ["S", "M", "L", "XL"],
                tags: ["international", "Illustration", "T-Shirt", "S", "M", "L", "XL"],
                category: "681a0f1e2d3c4b5a6970f010",
                artist: "681a0f1e2d3c4b5a6970f076",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0b5",
                name: "Dateback Black Longsleeve",
                description: "เสื้อแขนยาว Dateback สีดำ",
                price: 1400,
                quantity: 40,
                national: "international",
                style: "Typography",
                medium: "T-Shirt",
                sizes: ["S", "M", "L", "XL"],
                tags: ["international", "Typography", "T-Shirt", "S", "M", "L", "XL"],
                category: "681a0f1e2d3c4b5a6970f010",
                artist: "681a0f1e2d3c4b5a6970f076",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0b6",
                name: "Avenged Sevenfold Nightmare Tee",
                description: "เสื้อยืดอัลบั้ม Nightmare",
                price: 1500,
                quantity: 40,
                national: "international",
                style: "Illustration",
                medium: "T-Shirt",
                sizes: ["S", "M", "L", "XL"],
                tags: ["international", "Illustration", "T-Shirt", "S", "M", "L", "XL"],
                category: "681a0f1e2d3c4b5a6970f010",
                artist: "681a0f1e2d3c4b5a6970f077",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0b7",
                name: "Europe Tour LIBAD Tote",
                description: "กระเป๋าผ้า LIBAD Tour",
                price: 950,
                quantity: 45,
                national: "international",
                style: "Typography",
                medium: "Accessories",
                sizes: [],
                tags: ["international", "Typography", "Accessories"],
                category: "681a0f1e2d3c4b5a6970f013",
                artist: "681a0f1e2d3c4b5a6970f077",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0b8",
                name: "Life Is But A Dream Vinyl",
                description: "แผ่นเสียง Life Is But A Dream",
                price: 2400,
                quantity: 20,
                national: "international",
                style: "Photo",
                medium: "Vinyl",
                sizes: [],
                tags: ["international", "Photo", "Vinyl"],
                category: "681a0f1e2d3c4b5a6970f014",
                artist: "681a0f1e2d3c4b5a6970f077",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0b9",
                name: "End of World Trio",
                description: "เซ็ตสินค้า End of World",
                price: 1800,
                quantity: 25,
                national: "international",
                style: "Illustration",
                medium: "Accessories",
                sizes: [],
                tags: ["international", "Illustration", "Accessories"],
                category: "681a0f1e2d3c4b5a6970f013",
                artist: "681a0f1e2d3c4b5a6970f077",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0ba",
                name: "Pride Clutch ป่านศรนารายณ์",
                description: "กระเป๋า Clutch จากป่านศรนารายณ์",
                price: 1500,
                quantity: 30,
                national: "thailand",
                style: "Illustration",
                medium: "Accessories",
                sizes: [],
                tags: ["thailand", "Illustration", "Accessories"],
                category: "681a0f1e2d3c4b5a6970f013",
                artist: "681a0f1e2d3c4b5a6970f078",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0bb",
                name: "โคมไฟเซรามิก",
                description: "โคมไฟเซรามิกลายไทย",
                price: 6999,
                quantity: 15,
                national: "thailand",
                style: "Photo",
                medium: "Home & Living",
                sizes: [],
                tags: ["thailand", "Photo", "Home & Living"],
                category: "681a0f1e2d3c4b5a6970f013",
                artist: "681a0f1e2d3c4b5a6970f078",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0bc",
                name: "พวงกุญแจลิเภา",
                description: "พวงกุญแจจักสานย่านลิเภา สะท้อนเสน่ห์งานจักสานแบบดั้งเดิม",
                price: 600,
                quantity: 60,
                national: "thailand",
                style: "Illustration",
                medium: "Accessories",
                sizes: [],
                tags: ["thailand", "Illustration", "Accessories"],
                category: "681a0f1e2d3c4b5a6970f013",
                artist: "681a0f1e2d3c4b5a6970f078",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0bd",
                name: "กระเป๋าสานผักตบ รุ่นฟลอร่า M คละสี",
                description: "กระเป๋าสานผักตบชวา บุด้วยผ้าฝ้ายลายดอกไม้สดใส",
                price: 3933,
                quantity: 20,
                national: "thailand",
                style: "Illustration",
                medium: "Accessories",
                sizes: [],
                tags: ["thailand", "Illustration", "Accessories"],
                category: "681a0f1e2d3c4b5a6970f013",
                artist: "681a0f1e2d3c4b5a6970f078",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0be",
                name: "กระเป๋า chaksarn รุ่น Mini Candy (สีธรรมชาติ-ดำ)",
                description: "กระเป๋าแฟชั่นฝีมือคนไทยที่ดึงความเป็นไทยมาเป็นจุดเด่น",
                price: 1000,
                quantity: 35,
                national: "thailand",
                style: "Illustration",
                medium: "Accessories",
                sizes: [],
                tags: ["thailand", "Illustration", "Accessories"],
                category: "681a0f1e2d3c4b5a6970f013",
                artist: "681a0f1e2d3c4b5a6970f079",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0bf",
                name: "ผ้าพันคอ 4 ตะขอ",
                description: "ผ้าฝ้ายทอมือ ย้อมสีด้วยสีจากธรรมชาติ",
                price: 960,
                quantity: 50,
                national: "thailand",
                style: "Typography",
                medium: "Accessories",
                sizes: [],
                tags: ["thailand", "Typography", "Accessories"],
                category: "681a0f1e2d3c4b5a6970f010",
                artist: "681a0f1e2d3c4b5a6970f078",
                imageUrl: ""
            },
            {
                _id: "681a0f1e2d3c4b5a6970f0c0",
                name: "ชุดแก้วช้างลายคราม",
                description: "ชุดแก้วลายคราม",
                price: 816,
                quantity: 40,
                national: "thailand",
                style: "Illustration",
                medium: "Home & Living",
                sizes: [],
                tags: ["thailand", "Illustration", "Home & Living"],
                category: "681a0f1e2d3c4b5a6970f013",
                artist: "681a0f1e2d3c4b5a6970f078",
                imageUrl: ""
            }
        ]);

        // --- E. SEED ORDERS ---
        for (const o of mockOrders) {
            const matchedUser = createdUsers.find(u => u.mockId === o.userId) || createdUsers[0];
            await Order.create({
                userId: matchedUser ? matchedUser.dbId : createdUsers[0].dbId,
                items: (o.items || []).map(item => ({
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                totalAmount: o.totalAmount,
                status: o.deliveryStatus || 'pending',
                shippingProvider: o.shippingProvider,
                shippingAddress: o.shippingAddress,
                purchaseDate: o.createdAt ? new Date(o.createdAt) : new Date()
            });
        }

        console.log('[SUCCESS 🎉] Database seeded successfully with all products, users, and orders🍃');

    } catch (err) {
        console.error('[ERROR ❌] Seeding failed:', err);
    } finally {
        mongoose.connection.close();
    }
}

runSeed();
