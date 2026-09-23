// ไฟล์: client/src/components/ui/Footer.jsx
// คอมโพเนนต์ส่วนท้ายของเว็บไซต์ (Global Footer)
// เรียกมาจาก: Layout.jsx (แสดงผลท้ายหน้าทุกหน้าที่อยู่ภายใต้ layout หลัก)
// มีการเรียกใช้คอมโพเนนต์ย่อย: Logo (กำหนดโทนสี lime และขนาด lg)
import Logo from './Logo';

// ข้อมูลลิงก์ใน Footer แบ่งเป็น 3 คอลัมน์หลักตามหมวดหมู่
const footerColumns = [
  {
    title: 'CATEGORIES',
    links: [
      'Music A - Z',
      'Character A - Z',
      'Apparel',
      'Accessories',
      'Arrivals - Just Dropped!',
      'Upcoming',
      'Featured',
      'Sale & Promotions',
    ],
  },
  {
    title: 'INFORMATION',
    links: [
      'About Us',
      'Contact Us',
      'Copyright Information',
      'FAQs',
      'Privacy Policy',
      'Shipping & Returns Policy',
      'Size Guides',
      'Terms & Conditions',
      'Sitemap',
    ],
  },
  {
    title: 'Makers',
    links: ['Artist', 'Band', 'Craftsmen', 'Local Studios', 'View All Makers'],
  },
];

// ส่วนท้ายหน้าเว็บ (Footer) กำหนด mt-auto เพื่อให้ยึดอยู่ล่างสุดเสมอแม้หน้าจะมีเนื้อหาน้อย
export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-cream-text">
      <div className="px-6 pb-16 pt-10 lg:px-15">
        {/* เส้นคั่นสีขาวบางๆ ด้านบนของ Footer */}
        <div className="h-px bg-white" />

        {/* จัดกริด 4 คอลัมน์: โลโก้แบรนด์ฝั่งซ้าย + เมนูลิงก์ 3 คอลัมน์ฝั่งขวา */}
        <div className="mt-9 grid gap-12 md:grid-cols-2 lg:grid-cols-[1fr_repeat(3,auto)] lg:gap-20">
          <div>
            {/* โลโก้ Merchroom ตัวอักษรสีขาว (wordmark-white.svg) ขนาดใหญ่ */}
            <Logo tone="light" size="lg" />
            <p className="mt-6 max-w-91.75 text-base leading-relaxed text-white">
              More than merch, it&apos;s a room full of good things waiting to find their way to you
            </p>
          </div>

          {/* เรนเดอร์คอลัมน์ลิงก์ข้อมูล */}
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-base font-bold text-highlight">{column.title}</h2>
              <ul className="mt-3 space-y-0.75">
                {column.links.map((label) => (
                  <li key={label}>
                    <a href="#" className="text-sm transition hover:text-highlight">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* แถบแถบล่างสุดสำหรับลิขสิทธิ์ (Copyright bar) */}
      <div className="bg-[#d9d9d9]">
        <div className="px-6 py-6 lg:px-15">
          <p className="text-base text-[#6e6e6e]">@merchroom All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
}
