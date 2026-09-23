// ไฟล์: client/pages/PopCulture.jsx
// หน้าคอลเลกชันสินค้าวัฒนธรรมป๊อปและสากล (Pop Culture)
// เรียกมาจาก: App.jsx ผ่าน Route path="/pop-culture" หรือคลิกเมนูบน Navbar
// แหล่งข้อมูลสินค้า: src/data/product.js (กรองสินค้าที่รหัสลงท้ายด้วย en)
import { products } from '../src/data/product';
import { useCart } from '../src/context/CartContext';
import Container from '../src/components/ui/Container';
import ProductCard from '../src/components/ui/ProductCard';
import SectionHeading from '../src/components/ui/SectionHeading';

// หน้าหมวดหมู่ Pop Culture: กรองเฉพาะสินค้าสากล (รหัสลงท้าย 'en')
export default function PopCulture() {
  const { addToCart } = useCart();
  // ดึงเฉพาะสินค้าหมวด Pop Culture / International ตาม suffix รหัสสินค้า
  const popProducts = products.filter((product) => product.id.endsWith('en'));

  return (
    <Container className="py-16">
      {/* หัวข้อหมวด Pop Culture */}
      <SectionHeading
        eyebrow="Categories"
        title="Pop Culture"
        description="สินค้าลิขสิทธิ์แท้จากศิลปินและวงดนตรีระดับสากล ตั้งแต่เสื้อผ้าทัวร์คอนเสิร์ตจนถึงแผ่นเสียงสะสม"
      />

      {/* กริดแสดงการ์ดสินค้าสากลทั้งหมด */}
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {popProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} fluid />
        ))}
      </div>
    </Container>
  );
}
