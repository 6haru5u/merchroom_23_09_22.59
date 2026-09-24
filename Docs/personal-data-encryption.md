# การปกป้องข้อมูลส่วนบุคคลของ User

## วิธีที่ใช้

ระบบใช้ **AES-256-GCM แบบ field-level encryption** สำหรับข้อมูลส่วนบุคคลใน User collection ได้แก่ email, ชื่อ, นามสกุล, เบอร์โทร, ที่อยู่, รูปโปรไฟล์, ความสนใจ, วิธีชำระเงินที่บันทึกไว้ และ social accounts

- AES-256 คือการเข้ารหัสแบบ symmetric encryption ด้วยกุญแจขนาด 256 บิต
- GCM ให้ทั้งการปกปิดข้อมูลและตรวจสอบความถูกต้องของ ciphertext หากข้อมูลถูกแก้ไข tag จะตรวจไม่ผ่านและถอดรหัสไม่ได้
- ทุกครั้งที่บันทึก จะสุ่ม IV ขนาด 12 bytes ใหม่ จึงทำให้ข้อความเดิมมี ciphertext ต่างกันได้
- ค่าใน MongoDB มีรูปแบบ `enc:v1:<iv>:<auth-tag>:<ciphertext>`
- กุญแจอยู่ใน `FIELD_ENCRYPTION_KEY` ภายใน `server/.env` และไม่อยู่ใน source control

## ทำไม password ไม่เข้ารหัสด้วย AES

Password ใช้ **bcrypt hash (10 salt rounds)** ซึ่งเป็น one-way hashing: ระบบตรวจได้เพียงว่า password ที่กรอกตรงกับ hash หรือไม่ แต่ไม่สามารถถอดกลับเป็นรหัสเดิมได้ การใช้ bcrypt กับ password จึงเหมาะสมกว่า encryption

## ทำไม email ยัง login ได้

email ถูกเข้ารหัสใน field `email` เช่นเดียวกับ PII อื่น แต่ระบบสร้าง `emailLookup` ด้วย **HMAC-SHA-256** ของ email แบบ lower-case เพื่อใช้ค้นหาแบบ exact match และกัน email ซ้ำ

- `email`: เก็บ ciphertext, ใช้แสดงหลัง Mongoose ถอดรหัสใน backend
- `emailLookup`: เก็บค่า HMAC ที่ไม่สามารถย้อนกลับเป็น email ได้ในทางปฏิบัติ และใช้เฉพาะ lookup

การค้นหาลูกค้าด้วยชื่อ/เบอร์ในหน้า admin จึงทำหลัง backend ถอดรหัสแล้ว ไม่ใช้ MongoDB regex query กับ ciphertext

## Migration ที่รันแล้ว

รันคำสั่ง `npm run migrate:encrypt-users` แล้ว เพื่อแปลง User เดิม 15 รายการเป็น ciphertext และสร้าง `emailLookup` ให้ครบ

## ข้อควรระวัง

- ห้ามเปลี่ยนหรือสูญหาย `FIELD_ENCRYPTION_KEY` เพราะข้อมูลเดิมจะถอดรหัสไม่ได้
- ใน production ควรเก็บ key ใน secret manager ของผู้ให้บริการ deployment ไม่ใช่ commit ลง Git
- หากต้องการเปลี่ยน key ต้องทำ key rotation: ถอดด้วย key เดิมและเข้ารหัสใหม่ด้วย key ใหม่แบบควบคุมเป็นขั้นตอน
