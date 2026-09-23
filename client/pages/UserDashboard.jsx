// ไฟล์: client/pages/UserDashboard.jsx
// หน้าแดชบอร์ดสำหรับลูกค้าทั่วไป (Customer Dashboard)
// เรียกมาจาก: App.jsx ผ่าน Route path="/user/dashboard" (หรือ redirect จากหน้า Login)
// แหล่งข้อมูล: โปรไฟล์ผู้ใช้จาก useAuth() และประวัติการสั่งซื้อจาก src/data/mockup/mockOrders.js
import { useNavigate } from 'react-router-dom';
import {
  BadgeCheck,
  Box,
  ChevronRight,
  Clock,
  MapPin,
  PackageCheck,
  Truck,
  XCircle,
} from 'lucide-react';
import { useAuth } from '../src/context/AuthContext';
import { DELIVERY_STATUS, PAYMENT_STATUS, getOrdersByUser } from '../src/data/mockup/mockOrders';
import Button from '../src/components/ui/Button';
import Container from '../src/components/ui/Container';
import Breadcrumb from '../src/components/ui/Breadcrumb';

const baht = (value) => `฿${value.toLocaleString('th-TH')}`;

// หน้า Dashboard สำหรับลูกค้าทั่วไป (Customer): ดูประวัติคำสั่งซื้อ สถานะจัดส่ง และข้อมูลส่วนตัว
export default function UserDashboard() {
  const { user, isCustomer } = useAuth();
  const navigate = useNavigate();

  // ป้องกันการเข้าถึง: ถ้ายังไม่ได้ล็อกอิน หรือไม่มีสิทธิ์ customer ให้เตือนแล้ว redirect ไปหน้า login
  if (!user || !isCustomer) {
    return (
      <Container className="py-10 text-center">
        <p className="text-lg font-semibold">กรุณาล็อกอินเป็นลูกค้าก่อนเข้าแดชบอร์ดนี้</p>
        <Button to="/login" variant="dark" size="lg" className="mt-6">
          ไปหน้าล็อกอิน
        </Button>
      </Container>
    );
  }

  // ดึงรายการคำสั่งซื้อเฉพาะของ user คนนี้
  const orders = getOrdersByUser(user._id);

  // ฟังก์ชันนับจำนวนออเดอร์ตามสถานะจัดส่ง
  const countByStatus = (status) => orders.filter((o) => o.deliveryStatus === status).length;

  // การ์ดสรุปสถิติ 4 ใบ: ทั้งหมด, กำลังจัดส่ง, สำเร็จแล้ว, ยกเลิก
  const stats = [
    { label: 'ทั้งหมด', value: orders.length, icon: Box, color: 'bg-ink text-white' },
    { label: 'กำลังจัดส่ง', value: countByStatus('in_transit'), icon: Truck, color: 'bg-violet text-white' },
    { label: 'จัดส่งแล้ว', value: countByStatus('delivered'), icon: BadgeCheck, color: 'bg-success text-white' },
    { label: 'ยกเลิก', value: countByStatus('cancelled'), icon: XCircle, color: 'bg-error text-white' },
  ];

  return (
    <Container className="py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Users Dashboard' }]} />

      {/* ส่วนหัวแสดงโปรไฟล์ผู้ใช้ และปุ่มลัด */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold uppercase">Users Dashboard</h1>
          <p className="mt-1 text-sm text-muted">
            ยินดีต้อนรับกลับ {user.firstName} {user.lastName} · {user.email}
          </p>
        </div>
        <div className="flex gap-3">
          <Button to="/products" variant="primary" size="md">
            Shop More
          </Button>
          <Button to="/login" variant="outline" size="md" onClick={() => navigate('/login')}>
            สลับบัญชี
          </Button>
        </div>
      </div>

      {/* สรุปตัวเลขออเดอร์แยกตามสถานะจัดส่ง */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex items-center gap-4 rounded-card bg-white p-5 shadow-card">
              <div className={`grid size-12 place-items-center rounded-pill ${s.color}`}>
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-2xl font-bold leading-none text-ink">{s.value}</p>
                <p className="mt-1 text-xs font-semibold text-muted">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ประวัติการสั่งซื้อทั้งหมดของผู้ใช้ */}
      <section className="mt-8 rounded-card bg-white p-6 md:p-8 shadow-card" aria-label="ประวัติการสั่งซื้อ">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Order History</h2>
          <span className="text-sm text-muted">{orders.length} รายการ</span>
        </div>

        {orders.length === 0 ? (
          <div className="mt-6 rounded-btn bg-cream p-10 text-center text-sm text-muted">
            ยังไม่มีคำสั่งซื้อ
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-5">
            {orders.map((order) => {
              const del = DELIVERY_STATUS[order.deliveryStatus];
              const pay = PAYMENT_STATUS[order.paymentStatus];
              return (
                <div key={order._id} className="rounded-btn border border-ink/10 bg-cream p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ink">Order #{order.orderNumber}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                        <Clock className="size-3.5" aria-hidden="true" />
                        สั่งซื้อเมื่อ {new Date(order.createdAt).toLocaleString('th-TH')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`rounded-pill bg-white px-3 py-1 text-xs font-bold ${del.color}`}>
                        {del.label}
                      </span>
                      <span className={`rounded-pill bg-white px-3 py-1 text-xs font-bold ${pay.color}`}>
                        {pay.label}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
                    <span className="flex items-center gap-1.5">
                      <PackageCheck className="size-4" aria-hidden="true" />
                      {order.shippingProvider}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Box className="size-4" aria-hidden="true" />
                      Tracking: {order.trackingNumber || '-'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-4" aria-hidden="true" />
                      {order.shippingAddress}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-btn bg-white p-3">
                    <p className="text-sm text-muted">{order.items.length} รายการสินค้า</p>
                    <p className="font-bold text-ink">รวม {baht(order.totalAmount)}</p>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button
                      to={`/order-confirmation/${order._id}`}
                      variant="dark"
                      size="sm"
                    >
                      ดูรายละเอียด & ติดตามพัสดุ
                      <ChevronRight className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <div className="mt-8 rounded-card bg-white p-6 md:p-8 shadow-card">
        <h2 className="text-lg font-bold">ข้อมูลส่วนตัว</h2>
        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted">ชื่อ-นามสกุล</dt>
            <dd className="mt-0.5 font-semibold">{user.firstName} {user.lastName}</dd>
          </div>
          <div>
            <dt className="text-muted">อีเมล</dt>
            <dd className="mt-0.5 font-semibold">{user.email}</dd>
          </div>
          <div>
            <dt className="text-muted">เบอร์โทร</dt>
            <dd className="mt-0.5 font-semibold">{user.phone}</dd>
          </div>
          <div>
            <dt className="text-muted">ที่อยู่จัดส่ง</dt>
            <dd className="mt-0.5 font-semibold">{user.address}</dd>
          </div>
        </dl>
      </div>
    </Container>
  );
}
