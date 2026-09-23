// ไฟล์: client/src/api/auth.js
// โมดูล API Client สำหรับเชื่อมต่อระบบ Authentication ฝั่ง Backend (Express Server)
// เรียกใช้งานโดย: src/context/AuthContext.jsx
// รองรับ: สมัครสมาชิก (Register), เข้าสู่ระบบ (Login), ออกจากระบบ (Logout), และตรวจสอบ Session (Check Auth)
// มีการส่ง credentials: 'include' เพื่อส่ง HttpOnly Cookie (JWT Token) ไป-กลับกับเซิร์ฟเวอร์โดยอัตโนมัติ

const API_URL = `${import.meta.env.VITE_API_BASE_URL || '/api'}/auth`;

// ฟังก์ชันกลางสำหรับส่ง HTTP Request ไปยัง Auth API พร้อมแปลงผลลัพธ์เป็น JSON
async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('text/html')) {
    return {
      ok: false,
      status: 404,
      data: { message: 'API endpoint not available' },
    };
  }

  const data = await response.json().catch(() => ({}));

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}

// ยิง Request สมัครสมาชิกผู้ใช้ใหม่ (POST /api/auth/register)
export async function registerApi({ email, password, firstName, lastName, phone }) {
  const { ok, status, data } = await request('/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, firstName, lastName, phone }),
  });
  return { success: ok, status, message: data?.message, user: data?.user };
}

// ยิง Request เข้าสู่ระบบ (POST /api/auth/login)
export async function loginApi(email, password) {
  const { ok, status, data } = await request('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  return { success: ok, status, message: data?.message, user: data?.user };
}

// ยิง Request ออกจากระบบและสั่งเคลียร์ HttpOnly Cookie (POST /api/auth/logout)
export async function logoutApi() {
  const { ok, data } = await request('/logout', { method: 'POST' });
  return { success: ok, message: data.message };
}

// ยิง Request ตรวจสอบสถานะการเข้าสู่ระบบจาก Cookie บนเซิร์ฟเวอร์ (GET /api/auth/auth)
export async function checkAuthApi() {
  const { ok, data } = await request('/auth');
  return { success: ok, user: data.user };
}
