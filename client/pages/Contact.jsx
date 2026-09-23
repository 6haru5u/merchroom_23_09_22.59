// ไฟล์: client/pages/Contact.jsx
// หน้าแบบฟอร์มติดต่อสอบถาม (Contact Us)
// เรียกมาจาก: App.jsx ผ่าน Route path="/contact" หรือคลิกลิงก์จาก Footer
import { useState } from 'react';
import Button from '../src/components/ui/Button';
import Container from '../src/components/ui/Container';
import SectionHeading from '../src/components/ui/SectionHeading';

// ค่าเริ่มต้นของฟอร์มติดต่อเรา
const initialForm = { name: '', email: '', message: '' };

// หน้า Contact Us สำหรับส่งข้อความสอบถาม
export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);

  // อัปเดต state ฟอร์มตามชื่อ field
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ส่งแบบฟอร์ม: แสดงข้อความแจ้งเตือนสำเร็จ และรีเซ็ตฟอร์มให้ว่างเปล่า
  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    setForm(initialForm);
  };

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-md rounded-card bg-white p-8">
        {/* หัวข้อหน้า Contact */}
        <SectionHeading eyebrow="Get in touch" title="Contact Us" align="center" />

        {/* ข้อความแจ้งเตือนเมื่อส่งสำเร็จ */}
        {sent && (
          <p className="mt-6 rounded-btn bg-success/10 p-3 text-sm text-success" role="status">
            ขอบคุณครับ เราได้รับข้อความของคุณแล้ว
          </p>
        )}

        {/* ฟอร์มกรอกชื่อ อีเมล และข้อความ */}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-btn border border-muted p-2 focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-btn border border-muted p-2 focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full rounded-btn border border-muted p-2 focus:border-primary focus:outline-none"
            />
          </div>

          <Button type="submit" size="lg" className="w-full">
            Send Message
          </Button>
        </form>
      </div>
    </Container>
  );
}
