// ไฟล์: client/pages/Register.jsx
// หน้าสมัครสมาชิกใหม่ (Sign Up / Register)
// เรียกมาจาก: App.jsx ผ่าน Route path="/register" หรือคลิกลิงก์จากหน้า Login
import AuthForm from '../src/components/auth/AuthForm';
import AuthLayout from '../src/components/auth/AuthLayout';

export default function Register() {
  return (
    <AuthLayout>
      <AuthForm mode="register" />
    </AuthLayout>
  );
}