// ไฟล์: client/src/data/mockup/mockUsers.js
// ข้อมูลจำลองบัญชีผู้ใช้งาน (Mock Users) สำหรับทดสอบระบบ Login และ Role-Based Access Control
// เรียกใช้งานโดย: AuthContext, Login, AdminDashboard, UserDashboard
// จัดโครงสร้างให้สอดคล้องกับ User Schema ฝั่ง Backend (แยกสิทธิ์ customer และ admin)

export const USER_ROLES = {
  customer: 'ลูกค้า',
  admin: 'ผู้ดูแลระบบ',
};

// รายชื่อบัญชีผู้ใช้สำหรับทดสอบสิทธิ์ในแต่ละส่วนของระบบ
export const mockUsers = [
  // ข้อมูลลูกค้าทั่วไป (Role: customer)
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

  // ข้อมูลผู้ดูแลระบบ (Role: admin)
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

const REGISTERED_USERS_KEY = 'merchroom_registered_users';

function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRegisteredUser(userWithPassword) {
  try {
    const users = getRegisteredUsers().filter(
      (u) => u.email.toLowerCase() !== userWithPassword.email.toLowerCase()
    );
    users.push(userWithPassword);
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save registered user:', err);
  }
}

export function getAllUsers() {
  return [...mockUsers, ...getRegisteredUsers()];
}

// Data Access & Authentication Helper
// จำลองการตรวจสอบสิทธิ์และตัดฟิลด์ password ออกก่อนคืนค่า user session
export function findUserByEmail(email) {
  if (!email) return null;
  return getAllUsers().find((user) => user.email.toLowerCase() === email.toLowerCase()) || null;
}

export function authenticate(email, password) {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    const safeUser = { ...user };
    delete safeUser.password;
    return safeUser;
  }
  return null;
}

export function getUsers() {
  return getAllUsers();
}

export function getUserById(userId) {
  return getAllUsers().find((user) => user._id === userId) || null;
}
