import Button from '../ui/Button';
import Container from '../ui/Container';

// ไฟล์: client/src/components/sections/StoryCollage.jsx
// ส่วนเล่าเรื่องราวและวิสัยทัศน์ของแบรนด์ (Story of Merchroom)
// เรียกมาจาก: Home.jsx (วางต่อจากหมวดหมู่ CategoriesGrid)
// มีปุ่ม CTA พาผู้ใช้ไปยัง: หน้าแนะนำทีมงาน (/about)
export default function StoryCollage() {
  return (
    <section className="pb-20 pt-7">
      <Container>
        {/* เลย์เอาต์แบ่ง 2 ฝั่ง: ซ้ายเป็นหัวข้อหลัก ขวาเป็นข้อความขยายความและปุ่มกด */}
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xl font-bold uppercase tracking-wide text-primary">
              Story of Merchroom
            </p>
            <h2 className="mt-6 text-2xl font-bold leading-normal md:text-5xl">
              Where collectibles from everywhere{' '}
              <span className="text-violet">finally share one room</span>.
            </h2>
          </div>

          <div>
            <p className="max-w-152.75 text-lg font-bold leading-7 md:text-2xl md:leading-9">
              Long pre-orders. Drops that sell out in hours. Craftwork nobody&apos;s heard of.
              MERCHROOM brings it all into one room.
            </p>

            {/* แถวล่าง: คำอธิบายสนับสนุนคู่กับปุ่ม Meet the Room */}
            <div className="mt-2 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-63.25 text-[15px] font-bold leading-5.5 text-muted">
                STORY OF MAKING SPACE FOR THAI ARTISTS, LOCAL CRAFTS, AND FAN COMMUNITIES
              </p>
              {/* ส่ง prop to="/about" เพื่อให้ Button เรนเดอร์เป็น Link ของ react-router โดยอัตโนมัติ */}
              <Button
                to="/about"
                variant="highlight"
                size="lg"
                className="w-full shrink-0 font-semibold sm:w-78"
              >
                Meet the Room
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
