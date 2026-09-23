// ไฟล์: client/src/components/ui/Logo.jsx
// คอมโพเนนต์โลโก้แบรนด์ Merchroom (ไอคอนเห็ด + ตัวหนังสือ)
// เรียกมาจาก: Navbar.jsx (ขนาด md), Footer.jsx (ขนาด lg โทน lime) และ AboutUs.jsx (ขนาด lg โทน dark)
// แหล่งไฟล์ภาพ SVG: โฟลเดอร์ assets/Merchroom-Logo/
import { Link } from 'react-router-dom';
import iconMushroom from '../../../assets/Merchroom-Logo/icon-mushroom.svg';
import iconMushroomDark from '../../../assets/Merchroom-Logo/5.svg';
import wordmarkWhite from '../../../assets/Merchroom-Logo/wordmark-white.svg';
import wordmarkLime from '../../../assets/Merchroom-Logo/wordmark-lime.svg';
import wordmarkDark from '../../../assets/Merchroom-Logo/7.svg';

// อัตราส่วนความกว้างต่อความสูงของไอคอนเห็ดและตัวหนังสือ เพื่อคำนวณ height ไม่ให้รูปเบี้ยว
const iconRatio = {
  default: 1368.75 / 1500,
  dark: 1350 / 1488.75,
};
const wordmarkRatio = {
  light: 261.75 / 1500,
  lime: 231.644531 / 1500,
  dark: 195.734375 / 1500,
};

// ขนาดของโลโก้: md สำหรับแถบ Navbar, lg สำหรับส่วน Footer และ AboutUs
const sizes = {
  md: { icon: 29, wordmark: 122 },
  lg: { icon: 48, wordmark: 275 },
};

// คอมโพเนนต์โลโก้หลักของ Merchroom (กดแล้วลิงก์กลับหน้าแรก)
export default function Logo({ tone = 'light', size = 'md', className = '' }) {
  const s = sizes[size] || sizes.md;
  const isDark = tone === 'dark';
  const isLime = tone === 'lime';

  // สลับไฟล์รูปตัวหนังสือและไอคอนตามธีมสี:
  // - dark (AboutUs): ไอคอนเห็ดดาวเหลืองเขียว (5.svg) + ตัวหนังสือดำ OO เขียว (7.svg)
  // - lime (Footer): ไอคอนเห็ด (icon-mushroom.svg) + ตัวหนังสือเขียว lime (wordmark-lime.svg)
  // - light (Navbar): ไอคอนเห็ด (icon-mushroom.svg) + ตัวหนังสือขาว (wordmark-white.svg)
  const iconSrc = isDark ? iconMushroomDark : iconMushroom;
  const wordmarkSrc = isDark ? wordmarkDark : isLime ? wordmarkLime : wordmarkWhite;
  const currentIconRatio = isDark ? iconRatio.dark : iconRatio.default;
  const currentWordmarkRatio = isDark
    ? wordmarkRatio.dark
    : isLime
    ? wordmarkRatio.lime
    : wordmarkRatio.light;

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2 transition hover:opacity-90 ${className}`}
      aria-label="MERCHROOM หน้าหลัก"
    >
      {/* ไอคอนเห็ด Merchroom */}
      <img
        src={iconSrc}
        alt=""
        width={s.icon}
        height={Math.round(s.icon * currentIconRatio)}
        aria-hidden="true"
      />
      {/* ข้อความชื่อแบรนด์ MERCHROOM */}
      <img
        src={wordmarkSrc}
        alt="MERCHROOM"
        width={s.wordmark}
        height={Math.round(s.wordmark * currentWordmarkRatio)}
      />
    </Link>
  );
}

