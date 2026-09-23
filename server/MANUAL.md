# Manual การใช้งาน Database (Merchroom)

คู่มือสำหรับทีม — ใช้กับโปรเจกต์ `database_Touch` ในโฟลเดอร์ `Merchroom (Group-Project)/database_Touch`

---

## 1. โครงสร้างโปรเจกต์

```
database_Touch/
├── .env              ← เก็บ MONGO_URI (ถูก ignore ไม่ขึ้น GitHub)
├── .gitignore        ← กัน node_modules/ กับ .env ไม่ให้ขึ้น git
├── app.js            ← ไฟล์หลัก (ไว้รันเชื่อมต่อ DB ในอนาคต)
├── db.js             ← ไฟล์เดียวในระบบที่ต่อ MongoDB
├── seed.js           ← ยิง/อัปเดตข้อมูลทั้งหมดขึ้น Cloud
├── package.json
├── package-lock.json
└── models/
    ├── User.js       ← collection: users
    ├── Category.js   ← collection: categories
    ├── Product.js    ← collection: products
    ├── Cart.js       ← collection: carts
    ├── Order.js      ← collection: orders
    ├── Payment.js    ← collection: payments
    └── Review.js     ← collection: reviews
```

---

## 2. สิ่งที่ต้องรู้เบื้องต้น (สำคัญมาก)

### 2.1 เรื่อง `_id` (ObjectId)
- ฟิลด์ `_id` ทุกตัวในทุกตารางเป็น **ObjectId**
- ObjectId ต้องเป็น **เลข hex 24 ตัว** (ตัวเลข 0-9 และตัวอักษร a-f) เท่านั้น
- ตัวอย่างที่ถูกต้อง: `681a0f1e2d3c4b5a6970f001`
- ตัวอย่างที่ผิด (จะ error แน่นอน): `"justdoit"`, `"abc123"`, `"001"`
- ถ้าจะใช้ id ตัวอักษรอ่านง่ายต้องไปประกาศใน model เป็น `_id: { type: String }` ก่อน

### 2.2 ฟิลด์ที่บังค้อง (required) ในแต่ละตาราง

| ตาราง | ฟิลด์บังค้อง | ข้อกำหนดพิเศษ |
|-------|-------------|---------------|
| users | `email`, `password` | `email` ต้องไม่ซ้ำ (unique), `role` ใส่ได้แค่ `customer` หรือ `admin` |
| categories | `name`, `slug` | ทั้งคู่ต้องไม่ซ้ำ (unique) |
| products | `name`, `price`, `category` | `category` ต้องเป็น ObjectId ของ categories |
| carts | `userId` | `userId` ต้องเป็น ObjectId ของ users |
| orders | `userId`, `totalAmount` | `userId` = ObjectId ของ users |
| payments | `orderId`, `amount` | `orderId` = ObjectId ของ orders |
| reviews | `userId`, `productId`, `rating` | `rating` อยู่ระหว่าง 1-5 |

- ฟิลด์อื่นที่ไม่ใช่ required ใส่หรือไม่ใส่ก็ได้ (เช่น `description`, `tags`, `status`)
- ฟิลด์ `_id` ใช้เป็น string hex 24 ตัวเพื่อ "จับคู่" อัปเดตตอนรัน seed

---

## 3. สำหรับคนที่เพิ่ง.clone จาก GitHub (ยังไม่มี node_modules)

ขั้นตอนแรกก่อนทำอย่างอื่น:

### 3.1 ติดตั้ง dependencies
เปิด Terminal ใน VS Code (อยู่ที่โฟลเดอร์ `database_Touch`):

```bash
npm install
```

คำสั่งนี้จะสร้าง `node_modules/` ให้อัตโนมัติจาก package-lock.json

### 3.2 สร้างไฟล์ `.env` ขึ้นมาเอง (สำคัญ!)
เนื่องจาก `.env` ถูกกันไม่ให้ขึ้น GitHub ดังนั้นหลัง clone ต้องสร้างเอง:

1. ในโฟลเดอร์ `database_Touch` สร้างไฟล์ชื่อ `.env`
2. ใส่อย่างนี้ (แก้ URI เป็นของเราจริง):
```
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>
```
3. บันทึกแล้วลองรันตามข้อ 5 เพื่อเช็คว่าต่อได้

> ถ้าไม่มี `.env` ระบบต่อ DB ไม่ได้ และ `seed.js` จะ error

---

## 4. วิธีรันโปรเจกต์

### รันไฟล์หลัก (test เชื่อมต่อ DB)
```bash
node app.js
```

### รัน seed (ยิง/อัปเดตข้อมูลขึ้น Cloud)
```bash
node seed.js
```
- `seed.js` ใช้วิธี **upsert** = มี `_id` อยู่แล้ว → อัปเดต / ยังไม่มี → เพิ่มใหม่
- รันซ้ำกี่รอบก็ได้ ไม่ลบข้อมูลเดิม ไม่ error
- ถ้าอยากเพิ่มข้อมูลใหม่ ให้เพิ่ม object ใน seed.js แล้วรัน `node seed.js` อีกครั้ง

### แก้ปัญหาเมื่อ `node seed.js` รันไม่ได้ (error)

error ที่เจอบ่อยที่สุดคือ **ไม่ใช่ปัญหา DB แต่เป็น syntax ใน seed.js** เอง:

| อาการ error | สาเหตุ | วิธีแก้ |
|-------------|--------|--------|
| `ReferenceError: Promtpunk is not defined` | เขียนค่าใน array โดยไม่มีเครื่องหมายคำพูด เช่น `paymentMethods: [Promtpunk]` → JS ตีว่าเป็นตัวแปรที่ไม่ได้ประกาศ | ใส่เครื่องหมายคำพูด: `paymentMethods: ["Promtpunk"]` |
| `Unexpected token` / syntax error | ลืมจุลภาค (`,`) หรือวงเล็บครบไม่ครบ | ตรวจ `{} [] ,` ให้ครบทุกจุด |

ข้อควรจำก่อนเพิ่มข้อมูลใน seed.js:
- ค่าข้อความทุกค่า เช่น ชื่อ, อีเมล, คำว่า `"PromptPay"` ต้องใส่เครื่องหมายคำพูด (`"..."`) เสมอ
- ฟิลด์ที่รับเป็น array เช่น `interests`, `paymentMethods` ต้องเป็น `["ค่า"]`
- `password` ถ้าลงเป็นข้อความธรรมดาแบบ `"000000000000"` จะใส่เข้า DB ได้ แต่จะ**ล็อกอินไม่ได้**เพราะไม่ใช่ bcrypt hash — ฐานข้อมูลที่ล็อกอินจริงต้อง hash จริง

---

## 5. วิธีเช็คว่าต่อ MongoDB ได้หรือยัง

รัน:
```bash
node app.js
```

ผลลัพธ์ที่ถูกต้อง:
```
🍃 [DATABASE] MongoDB เชื่อมต่อสำเร็จแล้ว!
```

---

## 6. สั่งดึงข้อมูลจาก database (ดูข้อมูลใน Cloud)

มี 2 วิธี ใช้แบบไหนก็ได้:

### วิธีที่ 1: สร้างไฟล์ query ไว้ใช้งานซ้ำ
สร้างไฟล์ `query.js` ในโฟลเดอร์ `database_Touch`:

```js
const connectDB = require('./db');
const User = require('./models/User');
const Product = require('./models/Product');
const mongoose = require('mongoose');

async function run() {
    await connectDB();

    // ดู user ทั้งหมด
    console.log('--- USERS ---');
    console.log(await User.find({}).lean());

    // ดู product ทั้งหมด
    console.log('--- PRODUCTS ---');
    console.log(await Product.find({}).lean());

    mongoose.connection.close();
}

run();
```

รันใน Terminal:
```bash
node query.js
```

อยากดูตารางไหนก็เพิ่ม `await [Model].find({}).lean()` แล้วระบุชื่อโมเดล เช่น:
- `await Category.find({}).lean()`
- `await Order.find({}).lean()`
- `await Payment.find({}).lean()`
- `await Review.find({}).lean()`
- `await Cart.find({}).lean()`

### วิธีที่ 2: ใช้ mongosh (ถ้าติดตั้ง MongoDB Shell แล้ว)
```bash
mongosh "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>"
```
แล้วพิมพ์คำสั่ง:
```js
show collections              // ดูว่ามีคอลเลกชันอะไรบ้าง
db.users.find()               // ดูข้อมูล user ทั้งหมด
db.products.find()            // ดูสินค้าทั้งหมด
db.users.countDocuments()     // นับจำนวน user
db.users.findOne({ email: "admin@merchroom.com" })
```

---

## 7. เอาข้อมูลขึ้น Cloud (push ข้อมูลขึ้น database)

ขั้นตอนเดียวเสมอ:
```bash
node seed.js
```

รอให้โชว์:
```
🎉 [SUCCESS] มัดรวมข้อมูลจริงทั้งหมดของเพื่อนยิงขึ้น Cloud สำเร็จ 100%!
```
ก็คือยิงเสร็จเรียบร้อย

> ถ้าต้องการลบข้อมูลทั้งหมดแล้วเริ่มใหม่จริง ๆ (ไม่แนะนำถ้ามีข้อมูลจริง) ให้ใช้
> ```js
> await mongoose.connection.dropDatabase();
> ```
> ใส่ใน seed หรือ query ก่อน แล้วรัน `node seed.js` ใหม่

---

## 8. ดึงข้อมูลที่อัปเดตใน Cloud ลงมาทำต่อใน VS Code

MongoDB ต่างจาก Git — ข้อมูลใน Cloud จะต้อง **ส่งออก (export)** มา ไม่มีการ pull เหมือน git

### วิธีที่ง่ายที่สุด
1. เปิดไฟล์ `query.js` ตามข้อ 6
2. รัน `node query.js` ดูข้อมูล
3. เจอข้อมูลที่อยากใช้ คัดลอก JSON มาใส่ในไฟล์ seed.js / ไฟล์ทำงานของเรา

### วิธี export เป็นไฟล์ JSON (ใช้ mongodump / mongosh)
```bash
# export ข้อมูลทุก collection เป็นไฟล์ JSON ในโฟลเดอร์ db_backup
mongodump --uri "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>" --out ./db_backup

# หรือ export แค่ collection เดียว
mongoexport --uri "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>" --collection products --out products.json
```

---

## 9. ส่งงานขึ้น GitHub / ดึงงานลงมา (สำหรับทีม)

### ตรวจสถานะไฟล์
```bash
git status
```

### ดูว่ามี remote (ที่อยู่ repo GitHub) หรือยัง
```bash
git remote -v
```
- ขึ้นอยู่กับอันนี้: `https://github.com/Touchpol/Merchroom_Database.git`
- ถ้ายังไม่มี → `git remote add origin https://github.com/Touchpol/Merchroom_Database.git`

### ส่งงานขึ้น (push)
```bash
git add .
git commit -m "อธิบายว่าแก้ไขอะไร"
git push origin main
```

### ดึงงานลงมา (pull) — ใช้เมื่อคนอื่นแก้แล้วเราอยากได้เวอร์ชันใหม่
```bash
git pull origin main
```

### ข้อควรระวัง
- ห้าม commit `node_modules/` และ `.env` (ใน .gitignore กันไว้แล้ว)
- ทุกคนในทีมที่มีสิทธิ์เข้าถึง .env ต้องแชร์ค่า MONGO_URI กันเอง เพราะ .env ไม่ขึ้น GitHub

---

## 10. สรุปคำสั่งที่ใช้บ่อย

| ความต้องการ | คำสั่ง |
|-------------|--------|
| ติดตั้ง packages ครั้งแรก | `npm install` |
| เช็คว่าต่อ DB ได้ | `node app.js` |
| ยิง/อัปเดตข้อมูลขึ้น Cloud | `node seed.js` |
| ดูข้อมูลใน DB | `node query.js` หรือ mongosh |
| ส่งงานขึ้น GitHub | `git add . && git commit -m "..." && git push origin main` |
| เอาของคนอื่นลงมา | `git pull origin main` |

---

*Manual นี้สร้างเมื่อ 11 ส.ค. 2026 — ใช้ร่วมกับตัวจริงของทีม Merchroom*