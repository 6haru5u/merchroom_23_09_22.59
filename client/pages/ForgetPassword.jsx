// ไฟล์: client/pages/ForgetPassword.jsx
// หน้ารีเซ็ตรหัสผ่านและยืนยันตัวตน (Reset Password & Verification)
// เรียกมาจาก: App.jsx ผ่าน Route path="/forget-password" หรือคลิกลิงก์ Forgot password จากหน้า Login
// แหล่งข้อมูล: รับข้อมูลอีเมลและเบอร์โทรศัพท์เพื่อส่งรหัส OTP (จำลอง Mock Verification Code 6 หลัก)
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../src/components/auth/AuthLayout';
import Button from '../src/components/ui/Button';

// หน้าลืมรหัสผ่าน: ดำเนินการ 2 ขั้นตอน (Step 1: ขอรหัส OTP -> Step 2: กรอกรหัสยืนยันเพื่อไปหน้าตั้งรหัสใหม่)
export default function ForgetPassword() {
  // สเต็ปปัจจุบัน: 1 = กรอกอีเมล/เบอร์โทรขอรหัส, 2 = กรอกรหัสยืนยัน OTP
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  // รหัส OTP จำลอง 6 หลักสำหรับทดสอบระบบ
  const [mockCode, setMockCode] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const inputClasses =
    'h-16 w-full rounded-lg bg-gray-400/40 px-4 text-xl text-ink placeholder:text-black/50 focus:outline-2 focus:outline-primary';

  // สเต็ปที่ 1: ตรวจสอบข้อมูล สร้างรหัส OTP 6 หลัก แล้วสลับไปสเต็ปที่ 2
  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email.trim() || !phone.trim()) {
      setError('Please enter your email and phone number');
      return;
    }
    setError('');
    setMockCode(String(Math.floor(Math.random() * 900000) + 100000));
    setStep(2);
  };

  // สเต็ปที่ 2: ตรวจสอบความถูกต้องของรหัส OTP หากถูกต้องจะส่ง state ไปหน้าตั้งรหัสผ่านใหม่
  const handleVerify = (e) => {
    e.preventDefault();
    if (code !== mockCode) {
      setError('Invalid verification code. Please check and try again');
      return;
    }
    setError('');
    navigate('/renew-password', { state: { email } });
  };

  return (
    <AuthLayout>
      <form
        onSubmit={step === 1 ? handleSendCode : handleVerify}
        className="flex flex-col gap-4"
      >
        {/* หัวข้อฟอร์มตามขั้นตอนปัจจุบัน */}
        <h1 className="text-center text-2xl font-semibold text-ink">
          {step === 1 ? 'Reset your Password' : 'Enter Verification Code'}
        </h1>

        {step === 1 ? (
          // สเต็ปที่ 1: ฟอร์มกรอกอีเมลและเบอร์โทรศัพท์
          <>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xl font-medium text-ink/60">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="type here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-xl font-medium text-ink/60">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="type here"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClasses}
              />
            </div>
          </>
        ) : (
          // สเต็ปที่ 2: แสดงรหัสตัวอย่างและช่องกรอกรหัสยืนยัน 6 หลัก
          <>
            <p className="text-center text-sm text-ink/60">
              Your verification code is{' '}
              <span className="font-semibold text-ink">{mockCode}</span> (once the server is
              connected, the code will be sent to your email instead)
            </p>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="code" className="text-xl font-medium text-ink/60">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                inputMode="numeric"
                placeholder="6 digits"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={inputClasses}
              />
            </div>
          </>
        )}

        {/* แสดงข้อความแจ้งเตือนเมื่อกรอกไม่ถูกต้อง */}
        {error && <p className="text-center text-sm text-error">{error}</p>}

        {/* ปุ่มกดส่งรหัสหรือยืนยันตามขั้นตอน */}
        <Button type="submit" variant="highlight" size="lg" className="mt-2 h-14 w-full">
          {step === 1 ? 'Send Verification Code' : 'Verify Code'}
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