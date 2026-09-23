// ไฟล์: client/src/utils/sessionStorage.js
// โมดูลจัดการ Session ผู้ใช้ลงใน LocalStorage (key: merchroom_session)
// เรียกใช้งานโดย: AuthContext.jsx สำหรับจดจำและคืนสถานะการเข้าสู่ระบบของผู้ใช้
const SESSION_KEY = 'merchroom_session';

// บันทึกข้อมูลผู้ใช้ปัจจุบันหลังล็อกอินสำเร็จ
export function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

// ดึง session เดิมขึ้นมาใช้งานตอนผู้ใช้เปิดหน้าเว็บใหม่
export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ลบ session ทิ้งเมื่อผู้ใช้กดออกจากระบบ (Logout)
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
