// ไฟล์: client/pages/AdminDashboard.jsx
// หน้าแดชบอร์ดสำหรับผู้ดูแลระบบ (Admin Dashboard)
// เรียกมาจาก: App.jsx ผ่าน Route path="/admin/dashboard" (สงวนสิทธิ์เฉพาะผู้ใช้ role admin)
// แหล่งข้อมูล: สถิติรายได้ KPI และรายการคำสั่งซื้อทั้งหมดจาก src/data/mockup/mockOrders.js
import { useState } from 'react';
import {
  Box,
  Calendar,
  CalendarDays,
  CalendarRange,
  ChevronRight,
  CircleDollarSign,
  Clock,
  PackageCheck,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useAuth } from '../src/context/AuthContext';
import {
  DELIVERY_STATUS,
  PAYMENT_STATUS,
  REPORT_PERIODS,
  computeReportSummary,
  getOrders,
  getOrdersByStatus,
  getOrdersDaily,
  getOrdersMonthly,
  getOrdersWeekly,
  getOrdersYearly,
} from '../src/data/mockup/mockOrders';
import { getUsers, USER_ROLES } from '../src/data/mockup/mockUsers';
import Button from '../src/components/ui/Button';
import Container from '../src/components/ui/Container';
import Breadcrumb from '../src/components/ui/Breadcrumb';

const baht = (value) => `฿${value.toLocaleString('th-TH')}`;

const periodIcons = {
  daily: Clock,
  weekly: CalendarDays,
  monthly: CalendarRange,
  yearly: Calendar,
};

const periodFetchers = {
  daily: getOrdersDaily,
  weekly: getOrdersWeekly,
  monthly: getOrdersMonthly,
  yearly: getOrdersYearly,
};

// หน้าแดชบอร์ดผู้ดูแลระบบ (Admin): สรุปยอดขาย รายงานตามช่วงเวลา จัดการคำสั่งซื้อและสมาชิก
export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const [activePeriod, setActivePeriod] = useState('monthly');
  const orders = getOrders();
  const users = getUsers();

  // Guard สิทธิ์: ถ้ายังไม่ล็อกอิน หรือไม่ใช่แอดมิน ให้บล็อกแล้วส่งไปหน้าล็อกอิน
  if (!user || !isAdmin) {
    return (
      <Container className="py-10 text-center">
        <p className="text-lg font-semibold">กรุณาล็อกอินเป็นผู้ดูแลระบบก่อนเข้าแดชบอร์ดนี้</p>
        <Button to="/login" variant="dark" size="lg" className="mt-6">
          ไปหน้าล็อกอิน
        </Button>
      </Container>
    );
  }

  // กรองคำสั่งซื้อตามช่วงเวลาที่เลือก (รายวัน/สัปดาห์/เดือน/ปี)
  const filteredOrders = periodFetchers[activePeriod](new Date());
  // คำนวณสรุปผลยอดขายและจำนวนออเดอร์
  const summary = computeReportSummary(filteredOrders);

  // นับจำนวนออเดอร์ทั้งหมดแยกตามสถานะจัดส่ง
  const allStatusCounts = ['pending', 'shipping', 'in_transit', 'delivered', 'cancelled', 'failed'].map(
    (s) => ({
      status: s,
      count: getOrdersByStatus(s).length,
    }),
  );

  // คำนวณสถิติและยอดเงินสำหรับรายงานเฉพาะช่วงเวลาที่เลือก
  const reportStatusCounts = ['pending', 'shipping', 'in_transit', 'delivered', 'cancelled', 'failed'].map(
    (s) => ({
      status: s,
      count: summary.statusCounts[s],
      revenue: filteredOrders
        .filter((o) => o.deliveryStatus === s && o.paymentStatus === 'paid')
        .reduce((sum, o) => sum + o.totalAmount, 0),
    }),
  );

  const maxReportCount = Math.max(...reportStatusCounts.map((d) => d.count), 1);

  return (
    <Container className="py-10">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Admin Dashboard' }]} />

      {/* ส่วนหัวแสดงชื่อแอดมินและรหัสพนักงาน */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold uppercase">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-muted">
            สวัสดี {user.firstName} {user.lastName} · {user.email} · {user.employeeId}
          </p>
        </div>
        <div className="flex gap-3">
          <Button to="/products" variant="primary" size="md">
            จัดการสินค้า
          </Button>
          <Button to="/login" variant="outline" size="md">
            สลับบัญชี
          </Button>
        </div>
      </div>

      {/* แถบเลือกช่วงเวลาสำหรับสรุปรายงาน (รายวัน / สัปดาห์ / เดือน / ปี) */}
      <section className="mt-8 rounded-card bg-white p-6 md:p-8 shadow-card" aria-label="รายงาน">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">Report Menu</h2>
            <p className="mt-0.5 text-xs text-muted">
              เลือกช่วงเวลาเพื่อดูสรุปรายงาน
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {Object.entries(REPORT_PERIODS).map(([key, meta]) => {
            const Icon = periodIcons[key];
            const isActive = activePeriod === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActivePeriod(key)}
                className={`flex items-center gap-2 rounded-btn px-5 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-ink text-cream shadow-card'
                    : 'bg-cream text-ink hover:bg-ink/10'
                }`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {meta.label}
              </button>
            );
          })}
        </div>

        {/* การ์ดสรุป KPI ประจำรอบเวลา (จำนวนออเดอร์, รายได้, ยอดเฉลี่ยต่อออเดอร์, จำนวนที่จ่ายแล้ว) */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={Box}
            label={`${REPORT_PERIODS[activePeriod].labelShort} Orders`}
            value={summary.totalOrders}
            color="bg-primary text-white"
          />
          <SummaryCard
            icon={CircleDollarSign}
            label={`${REPORT_PERIODS[activePeriod].labelShort} Revenue`}
            value={baht(summary.totalRevenue)}
            color="bg-success text-white"
          />
          <SummaryCard
            icon={TrendingUp}
            label="Avg Order Value"
            value={baht(summary.avgOrderValue)}
            color="bg-violet text-white"
          />
          <SummaryCard
            icon={PackageCheck}
            label="Paid Orders"
            value={summary.paidOrders}
            color="bg-ink text-white"
          />
        </div>

        {/* รายละเอียดรายงานแบบ 2 คอลัมน์: กราฟแท่งสถานะ + สินค้าขายดี (ซ้าย) และ สถานะชำระเงิน + ออเดอร์ล่าสุด (ขวา) */}
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_380px]">

          {/* คอลัมน์ซ้าย: กราฟแจกแจงสถานะจัดส่ง และสินค้าขายดี Top 5 */}
          <div className="flex flex-col gap-8">

            <div className="rounded-card bg-cream p-5 md:p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
                Delivery Status Breakdown
              </h3>
              <div className="mt-4 flex flex-col gap-4">
                {reportStatusCounts.map(({ status, count }) => {
                  const meta = DELIVERY_STATUS[status];
                  const pct = maxReportCount ? Math.round((count / maxReportCount) * 100) : 0;
                  return (
                    <div key={status}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-ink">{meta.label}</span>
                        <span className="font-semibold text-ink">{count} รายการ</span>
                      </div>
                      <div className="mt-1.5 h-3 overflow-hidden rounded-pill bg-white">
                        <div
                          className={`h-full rounded-pill ${meta.color} transition-all duration-500`}
                          style={{ width: `${pct}%`, backgroundColor: status === 'pending' ? '#f4b400' : status === 'shipping' ? '#ff5b30' : status === 'in_transit' ? '#685bc7' : status === 'delivered' ? '#22c55e' : '#f53e3e' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 5 อันดับสินค้าที่ทำยอดขายได้สูงสุด */}
            <div className="rounded-card bg-cream p-5 md:p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
                Top Products ({REPORT_PERIODS[activePeriod].labelShort})
              </h3>
              {summary.topProducts.length === 0 ? (
                <p className="mt-4 text-sm text-muted">ยังไม่มีข้อมูลสินค้าในช่วงเวลานี้</p>
              ) : (
                <div className="mt-4 flex flex-col gap-3">
                  {summary.topProducts.map((p, i) => {
                    const maxRev = summary.topProducts[0].revenue || 1;
                    const barPct = Math.round((p.revenue / maxRev) * 100);
                    return (
                      <div key={i} className="rounded-btn bg-white p-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-ink">{p.name}</span>
                          <span className="text-xs text-muted">{p.qty} ชิ้น</span>
                        </div>
                        <div className="mt-1.5 h-2 overflow-hidden rounded-pill bg-cream">
                          <div
                            className="h-full rounded-pill bg-primary transition-all duration-500"
                            style={{ width: `${barPct}%` }}
                          />
                        </div>
                        <p className="mt-1 text-xs font-semibold text-ink">{baht(p.revenue)}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* คอลัมน์ขวา: สถานะการชำระเงิน สรุปภาพรวมคำสั่งซื้อทั้งหมด และ 5 ออเดอร์ล่าสุด */}
          <div className="flex flex-col gap-8">

            <div className="rounded-card bg-cream p-5 md:p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
                Payment Status ({REPORT_PERIODS[activePeriod].labelShort})
              </h3>
              <div className="mt-4 flex flex-col gap-3">
                {Object.entries(summary.paymentCounts).map(([ps, count]) => {
                  const meta = PAYMENT_STATUS[ps];
                  const pct = summary.totalOrders ? Math.round((count / summary.totalOrders) * 100) : 0;
                  return (
                    <div key={ps} className="flex items-center gap-3 rounded-btn bg-white p-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className={`font-semibold ${meta.color}`}>{meta.label}</span>
                          <span className="font-semibold text-ink">{count}</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-pill bg-cream">
                          <div
                            className="h-full rounded-pill transition-all duration-500"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: ps === 'paid' ? '#22c55e' : ps === 'pending' ? '#f4b400' : ps === 'failed' ? '#f53e3e' : '#b8b8b8',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* สรุปสถิติภาพรวมทั้งหมดตั้งแต่เปิดระบบ (All-Time Overview) */}
            <div className="rounded-card bg-cream p-5 md:p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-ink">All-Time Overview</h3>
              <dl className="mt-4 flex flex-col gap-3 text-sm">
                <Row label="Total Orders (All)" value={orders.length} />
                <Row
                  label="Total Revenue (All)"
                  value={baht(
                    orders
                      .filter((o) => o.paymentStatus === 'paid')
                      .reduce((s, o) => s + o.totalAmount, 0),
                  )}
                />
                <Row label="Total Users" value={users.length} />
                <Row
                  label="Active Orders"
                  value={
                    orders.filter(
                      (o) =>
                        o.deliveryStatus === 'pending' ||
                        o.deliveryStatus === 'shipping' ||
                        o.deliveryStatus === 'in_transit',
                    ).length
                  }
                />
              </dl>
            </div>

            {/* รายการคำสั่งซื้อล่าสุด 5 รายการในรอบเวลานี้ */}
            <div className="rounded-card bg-cream p-5 md:p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-ink">
                Recent Orders ({REPORT_PERIODS[activePeriod].labelShort})
              </h3>
              {filteredOrders.length === 0 ? (
                <p className="mt-4 text-sm text-muted">ยังไม่มีออเดอร์ในช่วงเวลานี้</p>
              ) : (
                <div className="mt-4 flex flex-col gap-3">
                  {filteredOrders.slice(0, 5).map((order) => {
                    const del = DELIVERY_STATUS[order.deliveryStatus];
                    const customer = users.find((u) => u._id === order.userId);
                    return (
                      <div
                        key={order._id}
                        className="flex items-center justify-between rounded-btn bg-white p-3"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-ink">
                            #{order.orderNumber}
                          </p>
                          <p className="truncate text-xs text-muted">
                            {customer ? `${customer.firstName} ${customer.lastName}` : '-'} · {new Date(order.createdAt).toLocaleDateString('th-TH')}
                          </p>
                        </div>
                        <div className="ml-3 shrink-0">
                          <span className={`rounded-pill bg-cream px-2.5 py-1 text-[11px] font-bold ${del.color}`}>
                            {del.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ตารางแสดงรายการคำสั่งซื้อทั้งหมด และรายชื่อผู้ใช้งานในระบบ */}
      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-8">
          <section className="rounded-card bg-white p-6 md:p-8 shadow-card" aria-label="คำสั่งซื้อทั้งหมด">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">All Orders</h2>
              <span className="text-sm text-muted">{orders.length} รายการ</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {allStatusCounts.map(({ status, count }) => {
                const meta = DELIVERY_STATUS[status];
                return (
                  <span key={status} className={`flex items-center gap-1.5 rounded-pill bg-cream px-3 py-1 text-xs font-bold ${meta.color}`}>
                    {meta.label}
                    <span className="rounded-pill bg-white px-1.5">{count}</span>
                  </span>
                );
              })}
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-200 border-collapse text-sm">
                <thead>
                  <tr className="border-b border-ink/10 text-left text-xs font-bold uppercase tracking-wide text-muted">
                    <th className="py-3 pr-4">Order</th>
                    <th className="py-3 pr-4">ลูกค้า</th>
                    <th className="py-3 pr-4">ยอดรวม</th>
                    <th className="py-3 pr-4">การชำระเงิน</th>
                    <th className="py-3 pr-4">สถานะจัดส่ง</th>
                    <th className="py-3 pr-4">วันที่</th>
                    <th className="py-3" />
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const del = DELIVERY_STATUS[order.deliveryStatus];
                    const pay = PAYMENT_STATUS[order.paymentStatus];
                    const customer = users.find((u) => u._id === order.userId);
                    return (
                      <tr key={order._id} className="border-b border-ink/5">
                        <td className="py-3.5 pr-4 font-semibold text-ink">
                          #{order.orderNumber}
                        </td>
                        <td className="py-3.5 pr-4">
                          {customer ? `${customer.firstName} ${customer.lastName}` : '-'}
                        </td>
                        <td className="py-3.5 pr-4 font-semibold">{baht(order.totalAmount)}</td>
                        <td className="py-3.5 pr-4">
                          <span className={`rounded-pill bg-cream px-2.5 py-1 text-xs font-bold ${pay.color}`}>
                            {pay.label}
                          </span>
                        </td>
                        <td className="py-3.5 pr-4">
                          <span className={`rounded-pill bg-cream px-2.5 py-1 text-xs font-bold ${del.color}`}>
                            {del.label}
                          </span>
                        </td>
                        <td className="py-3.5 pr-4 text-muted">
                          {new Date(order.createdAt).toLocaleDateString('th-TH')}
                        </td>
                        <td className="py-3.5 text-right">
                          <Button
                            to={`/order-confirmation/${order._id}`}
                            variant="ghost"
                            size="sm"
                          >
                            ดูรายละเอียด
                            <ChevronRight className="size-4" aria-hidden="true" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-8">
          <aside className="rounded-card bg-white p-6 md:p-8 shadow-card" aria-label="รายชื่อผู้ใช้">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Users ({users.length})</h2>
              <Users className="size-5 text-muted" aria-hidden="true" />
            </div>
            <div className="mt-5 flex flex-col gap-4">
              {users.map((u) => (
                <div key={u._id} className="flex items-center gap-3 rounded-btn bg-cream p-3">
                  <div
                    className={`grid size-10 shrink-0 place-items-center rounded-pill text-white ${
                      u.role === 'admin' ? 'bg-violet' : 'bg-primary'
                    }`}
                  >
                    <ShieldCheck className="size-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">
                      {u.firstName} {u.lastName}
                    </p>
                    <p className="truncate text-xs text-muted">{u.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block rounded-pill bg-ink/5 px-2 py-0.5 text-[11px] font-bold text-ink">
                      {USER_ROLES[u.role]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <aside className="rounded-card bg-white p-6 md:p-8 shadow-card" aria-label="สรุปสถานะ">
            <h2 className="text-lg font-bold">Delivery Overview</h2>
            {allStatusCounts.map(({ status, count }) => {
              const meta = DELIVERY_STATUS[status];
              const pct = orders.length ? Math.round((count / orders.length) * 100) : 0;
              return (
                <div key={status} className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-ink">{meta.label}</span>
                    <span className="text-muted">{count} รายการ ({pct}%)</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-pill bg-cream">
                    <div className={`h-full rounded-pill ${meta.color} transition`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </aside>
        </div>
      </div>
    </Container>
  );
}

// คอมโพเนนต์ย่อยสำหรับแสดงการ์ดสรุป KPI (SummaryCard) และแถวข้อมูลสถิติ (Row)

function SummaryCard({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-4 rounded-card bg-cream p-5">
      <div className={`grid size-12 shrink-0 place-items-center rounded-pill ${color}`}>
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xl font-bold leading-none text-ink">{value}</p>
        <p className="mt-1 text-xs font-semibold text-muted">{label}</p>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className="font-bold text-ink">{value}</dd>
    </div>
  );
}
