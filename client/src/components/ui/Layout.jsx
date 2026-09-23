import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import NongHedChatbot from './NongHedChatbot';

// ไฟล์: client/src/components/ui/Layout.jsx
// โครงสร้างเลย์เอาต์หลักของเว็บไซต์ (Shell Component)
// เรียกมาจาก: App.jsx เป็น Route หลัก (path="/") เพื่อครอบ Navbar และ Footer ให้ทุกหน้า
// เนื้อหาแต่ละหน้าจะถูกฉายผ่านคอมโพเนนต์ <Outlet />
export default function Layout() {
  // ย่อ-ขยายสเกลเว็บให้ตรงกับขนาดดีไซน์ใน Figma (Base 1440px) แบบ responsive
  useEffect(() => {
    const apply = () => {
      document.documentElement.style.zoom = String(window.innerWidth / 1440);
    };
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      {/* แถบนำทางด้านบน (Fixed Navbar) */}
      <Navbar />

      {/* จุดแสดงเนื้อหาของแต่ละหน้าตาม Route ที่ตรงกันใน App.jsx */}
      <main className="w-full flex-1 pt-navbar">
        <Outlet />
      </main>

      {/* แถบข้อมูลด้านล่าง (Footer) */}
      <Footer />
      <NongHedChatbot />
    </div>
  );
}
