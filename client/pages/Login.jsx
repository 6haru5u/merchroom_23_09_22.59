// ไฟล์: client/pages/Login.jsx
// หน้าเข้าสู่ระบบ (Sign In)
// เรียกมาจาก: App.jsx ผ่าน Route path="/login" หรือคลิกไอคอนผู้ใช้บน Navbar
import AuthForm from '../src/components/auth/AuthForm';
import AuthLayout from '../src/components/auth/AuthLayout';

export default function Login() {
  return (
    <AuthLayout>
      <AuthForm mode="login" />
    </AuthLayout>
  );
}