// ไฟล์: client/pages/News.jsx
// หน้าข่าวสารและอัปเดตกิจกรรม (News)
// เรียกมาจาก: App.jsx ผ่าน Route path="/news" หรือคลิกเมนู News บน Navbar
import Container from '../src/components/ui/Container';
import SectionHeading from '../src/components/ui/SectionHeading';

// หน้าข่าวสารและอัปเดตกิจกรรม (News / What's Live)
export default function News() {
  return (
    <Container className="py-16">
      {/* หัวข้อส่วนข่าวสารคอนเสิร์ตและสินค้าคอลเลกชันใหม่ */}
      <SectionHeading
        eyebrow="The Room Talks"
        title="What's Landing, What's Live"
        description="ข่าวคอนเสิร์ต ทัวร์ และการเปิดจำหน่ายสินค้ารอบใหม่"
      />

      {/* ข้อความ placeholder รอเชื่อมต่อ API ข่าวสารในอนาคต */}
      <p className="mt-10 text-black/60">กำลังจัดทำเนื้อหาส่วนนี้</p>
    </Container>
  );
}
