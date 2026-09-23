// ไฟล์: client/pages/RenewPassword.jsx
// หน้าตั้งรหัสผ่านใหม่หลังยืนยัน OTP สำเร็จ (Step 3 ของ Reset Password Flow)
// เรียกมาจาก: App.jsx ผ่าน Route path="/renew-password"
// รับข้อมูล email ผ่าน location.state จากหน้า ForgetPassword
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../src/components/auth/AuthLayout';
import Button from '../src/components/ui/Button';
import PopUp from '../src/components/ui/PopUp';
import { useAuth } from '../src/context/AuthContext';

export default function RenewPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword } = useAuth();

  // ดึง email ที่ส่งมาจากหน้า ForgetPassword
  const email = location.state?.email || '';

  const inputClasses =
    'h-16 w-full rounded-lg bg-gray-400/40 px-4 text-xl text-ink placeholder:text-black/50 focus:outline-2 focus:outline-primary';

  // ถ้าไม่มี email ใน state แสดงว่าผู้ใช้เข้ามาตรงๆ โดยไม่ผ่านขั้นตอน OTP
  if (!email) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-semibold text-ink">
            Session Expired
          </h1>
          <p className="text-ink/60">
            Please start the password reset process again.
          </p>
          <Button to="/forgot-password" variant="highlight" size="lg" className="mt-2 h-14 w-full">
            Go to Reset Password
          </Button>
          <p className="text-lg text-gray-500">
            <Link to="/login" className="font-medium text-violet hover:underline">
              Back to Log in
            </Link>
          </p>
        </div>
      </AuthLayout>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // ตรวจสอบว่ากรอกรหัสผ่านครบทั้งสองช่อง
    if (!newPassword || !confirmPassword) {
      setError('Please fill in both password fields');
      return;
    }

    // ตรวจสอบความยาวรหัสผ่านขั้นต่ำ 8 ตัวอักษร
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    // ตรวจสอบว่ารหัสผ่านทั้งสองช่องตรงกัน
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    // เรียกฟังก์ชัน resetPassword จาก AuthContext (mock endpoint)
    const result = resetPassword(email, newPassword);

    if (result.success) {
      setSuccessOpen(true);
    } else {
      setError(result.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <AuthLayout>
      {/* PopUp แจ้งเปลี่ยนรหัสผ่านสำเร็จ */}
      <PopUp open={successOpen} onClose={() => navigate('/login')}>
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-success/15">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path
                d="M4 13.5L10 19.5L22 6.5"
                stroke="#22c55e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <h2 className="text-xl font-semibold text-ink">
            Password changed successfully!
          </h2>
          <p className="text-sm text-ink/60">
            You can now log in with your new password.
          </p>
          <Button variant="primary" onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </div>
      </PopUp>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-center text-2xl font-semibold text-ink">
          Set New Password
        </h1>

        <p className="text-center text-sm text-ink/60">
          Enter a new password for{' '}
          <span className="font-semibold text-ink">{email}</span>
        </p>

        {/* ช่องกรอกรหัสผ่านใหม่ */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="newPassword" className="text-xl font-medium text-ink/60">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            placeholder="At least 8 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClasses}
          />
        </div>

        {/* ช่องยืนยันรหัสผ่านใหม่ */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPassword" className="text-xl font-medium text-ink/60">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClasses}
          />
        </div>

        {/* แสดงข้อความแจ้งเตือนเมื่อกรอกไม่ถูกต้อง */}
        {error && <p className="text-center text-sm text-error">{error}</p>}

        {/* ปุ่มยืนยันเปลี่ยนรหัสผ่าน */}
        <Button type="submit" variant="highlight" size="lg" className="mt-2 h-14 w-full">
          Reset Password
        </Button>

        {/* ลิงก์ย้อนกลับไปยังหน้า Login */}
        <p className="text-center text-lg text-gray-500">
          <Link to="/login" className="font-medium text-violet hover:underline">
            Back to Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
