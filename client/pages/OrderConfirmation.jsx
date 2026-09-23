// ไฟล์: client/pages/OrderConfirmation.jsx
import { useParams } from 'react';
import {
  BadgeCheck,
  CheckCircle2,
  CircleDashed,
  CreditCard,
  PackageCheck,
  PackageSearch,
  Truck,
} from 'lucide-react';
import { getOrderById as getLocalOrderById } from '../src/utils/orderStorage';
import { getOrderById as getMockOrderById } from '../src/data/mockup/mockOrders';
import Button from '../src/components/ui/Button';
import Container from '../src/components/ui/Container';
import Breadcrumb from '../src/components/ui/Breadcrumb';

const timelineIcons = {
  pending: PackageSearch,
  shipping: PackageCheck,
  in_transit: Truck,
  delivered: BadgeCheck,
  cancelled: CircleDashed,
};

const baht = (value) =>
  `฿${Number(value || 0).toLocaleString('th-TH', {
    minimumFractionDigits: Number(value || 0) % 1 !== 0 ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;

const DELIVERY_STEPS = [
  { key: 'pending', label: 'Order Placed', description: 'Order confirmed', icon: PackageSearch },
  { key: 'shipping', label: 'Packaging', description: 'Preparing your items', icon: PackageCheck },
  { key: 'in_transit', label: 'In Transit', description: 'On the way to you', icon: Truck },
  { key: 'delivered', label: 'Delivered', description: 'Package delivered', icon: BadgeCheck },
];

const PAYMENT_STATUS_META = {
  paid: { label: 'Paid', classes: 'bg-green-100 text-green-700' },
  pending: { label: 'Pending Payment', classes: 'bg-amber-100 text-amber-700' },
  failed: { label: 'Payment Failed', classes: 'bg-red-100 text-red-700' },
};

function StatusPill({ order }) {
  const meta = PAYMENT_STATUS_META[order?.paymentStatus] || PAYMENT_STATUS_META.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${meta.classes}`}>
      <CheckCircle2 className="size-3.5" aria-hidden="true" />
      {meta.label}
    </span>
  );
}

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const order = getLocalOrderById(orderId) || getMockOrderById(orderId);

  if (!order) {
    return (
      <Container className="py-6 md:py-8">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Order Status' }]} />
        <div className="mt-6 flex flex-col items-center gap-6 rounded-card border border-black/10 bg-white p-12 text-center">
          <p className="text-xl font-bold text-black">Order Not Found</p>
          <p className="text-sm text-black/60">We couldn't find the order you are looking for.</p>
          <Button to="/products" className="rounded-full bg-primary px-8 text-white hover:opacity-90" size="lg">
            Start Shopping
          </Button>
        </div>
      </Container>
    );
  }

  const deliveryIndex = DELIVERY_STEPS.findIndex((step) => step.key === order.deliveryStatus);
  const isCancelled = order.deliveryStatus === 'cancelled';
  const orderIdDisplay = order._id || order.id;

  return (
    <Container className="py-6 md:py-8">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Account', to: '/order-history' }, { label: 'Order Status' }]} />

      <div className="mt-4 flex flex-col items-start gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight md:text-[40px] leading-none text-black font-integral">
            ORDER CONFIRMED
          </h1>
          <StatusPill order={order} />
        </div>
        <p className="text-sm text-black/60">
          Order ID: <span className="font-semibold text-black">{orderIdDisplay}</span> · Date:{' '}
          {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
        </p>
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1fr_400px]">
        <div className="flex flex-col gap-6">
          <section className="rounded-card border border-black/10 bg-white p-5 md:p-6" aria-label="สถานะการจัดส่ง">
            <h2 className="text-xl font-bold text-black">Delivery Status</h2>
            <p className="mt-1 text-sm text-black/60">
              Shipping Carrier: <span className="font-medium text-black">{order.shippingProvider || 'Standard Delivery'}</span>
            </p>

            {isCancelled ? (
              <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600 border border-red-100">
                This order has been cancelled.
              </div>
            ) : (
              <ol className="mt-8 grid gap-4 sm:grid-cols-4 sm:gap-2">
                {DELIVERY_STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const isDone = index < deliveryIndex;
                  const isCurrent = index === deliveryIndex;
                  return (
                    <li key={step.key} className="relative">
                      <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:text-center">
                        <div
                          className={`grid size-11 shrink-0 place-items-center rounded-full border-2 transition ${isDone || isCurrent
                              ? 'border-black bg-black text-white'
                              : 'border-black/10 bg-[#F0F0F0] text-black/40'
                            }`}
                        >
                          <Icon className="size-5" aria-hidden="true" />
                        </div>
                        {index < DELIVERY_STEPS.length - 1 && (
                          <span className={`hidden h-0.5 flex-1 sm:block ${isDone ? 'bg-black' : 'bg-black/10'}`} />
                        )}
                      </div>
                      <p className={`mt-2 text-sm font-bold ${isCurrent ? 'text-black' : 'text-black/60'}`}>{step.label}</p>
                      <p className="text-xs text-black/40">{step.description}</p>
                      {isCurrent && (
                        <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-black">
                          <CircleDashed className="size-3 animate-spin" aria-hidden="true" />
                          In Progress
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            )}

            {order.timeline && order.timeline.length > 0 && (
              <div className="mt-8 border-t border-black/10 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-black/60">Timeline & Status Logs</h3>
                <ol className="mt-4 flex flex-col gap-0">
                  {order.timeline
                    .filter((t) => t.time)
                    .map((t, i) => {
                      const Icon = timelineIcons[t.status] || CircleDashed;
                      return (
                        <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
                          <div className="flex flex-col items-center">
                            <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#F0F0F0] text-black border border-black/10">
                              <Icon className="size-4" aria-hidden="true" />
                            </div>
                            {i < order.timeline.filter((x) => x.time).length - 1 && <span className="w-px flex-1 bg-black/10" />}
                          </div>
                          <div className="pt-0.5">
                            <p className="text-sm font-bold text-black">{t.label}</p>
                            <p className="text-xs text-black/60">{new Date(t.time).toLocaleString('en-GB')}</p>
                            {t.note && <p className="mt-1 text-xs text-black/60">{t.note}</p>}
                          </div>
                        </li>
                      );
                    })}
                </ol>
              </div>
            )}
          </section>

          <section className="rounded-card border border-black/10 bg-white p-5 md:p-6" aria-label="สินค้าในคำสั่งซื้อ">
            <h2 className="text-xl font-bold text-black">Items ({order.items?.length || 0})</h2>
            <div className="mt-4 flex flex-col divide-y divide-black/10">
              {order.items?.map((item, idx) => (
                <div key={item.productId || idx} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
                  <div className="h-18.75 w-18.75 shrink-0 overflow-hidden rounded-[8.66px] bg-[#F0F0F0]">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-black/40">No Image</div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm md:text-base text-black truncate">{item.name}</p>
                    <div className="mt-0.5 flex flex-wrap gap-2 text-xs text-black/60">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.color && <span>Color: {item.color}</span>}
                    </div>
                    <p className="mt-1 text-sm font-bold text-black">
                      {baht(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-base text-black">{baht(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-6">
          <aside className="rounded-card border border-black/10 bg-white p-5 md:p-6" aria-label="สรุปคำสั่งซื้อ">
            <h2 className="text-xl font-bold text-black">Order Summary</h2>

            <dl className="mt-5 flex flex-col gap-3 text-sm md:text-base">
              <div className="flex justify-between">
                <dt className="text-black/60">Subtotal</dt>
                <dd className="font-bold text-black">{baht(order.subtotal || order.totalAmount)}</dd>
              </div>
              {order.promoCode && (
                <div className="flex justify-between">
                  <dt className="text-black/60">Promo ({order.promoCode})</dt>
                  <dd className="font-bold text-[#FF3333]">-{baht(order.promoDiscount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-black/60">Delivery Fee</dt>
                <dd className="font-bold text-black">{baht(order.deliveryFee || 0)}</dd>
              </div>
            </dl>

            <div className="my-4 border-t border-black/10" />

            <div className="flex items-center justify-between">
              <span className="text-base md:text-lg text-black">Total</span>
              <span className="text-xl md:text-2xl font-bold text-black">{baht(order.totalAmount)}</span>
            </div>

            <div className="mt-6 rounded-2xl bg-[#F0F0F0] p-4 text-sm">
              <div className="flex items-center gap-2 text-black/60">
                <CreditCard className="size-4 shrink-0" aria-hidden="true" />
                <span>Payment Method</span>
              </div>
              <p className="mt-1 font-bold text-black">{order.paymentMethodLabel || 'Credit / Debit Card'}</p>
            </div>

            <div className="mt-3 rounded-2xl bg-[#F0F0F0] p-4 text-sm">
              <p className="text-black/60">Shipping Address</p>
              <p className="mt-1 leading-relaxed text-black font-medium">{order.shippingAddress || 'No address provided'}</p>
            </div>
          </aside>

          <div className="flex flex-col gap-3">
            <Button to="/products" className="w-full rounded-full bg-primary text-white hover:opacity-90 py-3.5 text-center font-semibold" size="lg">
              Shop More
            </Button>
            <Button to="/" className="w-full rounded-full border border-black/10 bg-white text-black hover:bg-[#F0F0F0] py-3.5 text-center font-semibold" size="lg">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}