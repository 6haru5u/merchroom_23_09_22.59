"""Generate the corrected MERCHROOM e-commerce system architecture PDF."""
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white

OUT = 'output/pdf/MERCHROOM_Ecommerce_System_Architecture_corrected.pdf'
W, H = 1440, 810

INK = HexColor('#151612')
TEXT = HexColor('#203126')
MUTED = HexColor('#68736b')
BLUE = HexColor('#2383df')
TEAL = HexColor('#198d87')
GREEN = HexColor('#419a4d')
ORANGE = HexColor('#f18500')
PURPLE = HexColor('#8a43be')
CURRENT = HexColor('#3e994d')
PLANNED = HexColor('#6c7770')


def pill(c, x, y, text, color):
    w = max(58, len(text) * 5.7 + 18)
    c.setFillColor(color)
    c.roundRect(x, y, w, 18, 9, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont('Helvetica-Bold', 6.8)
    c.drawCentredString(x + w / 2, y + 6, text)
    return w


def container(c, x, y, w, h, label, color, note=''):
    c.setFillColor(HexColor('#ffffff'))
    c.setStrokeColor(color)
    c.setLineWidth(2)
    c.roundRect(x, y, w, h, 16, fill=1, stroke=1)
    c.setFillColor(color)
    c.setFont('Helvetica-Bold', 19)
    c.drawString(x + 14, y + h - 25, label)
    if note:
        c.setFillColor(MUTED)
        c.setFont('Helvetica', 7.4)
        c.drawRightString(x + w - 14, y + h - 21, note)


def box(c, x, y, w, h, title, subtitle, color, state='CURRENT', dashed=False):
    c.saveState()
    c.setFillColor(white)
    c.setStrokeColor(color)
    c.setLineWidth(1.2)
    if dashed:
        c.setDash(4, 3)
    c.roundRect(x, y, w, h, 9, fill=1, stroke=1)
    c.restoreState()
    c.setFillColor(color)
    c.setFont('Helvetica-Bold', 10)
    c.drawCentredString(x + w / 2, y + h - 22, title)
    c.setFillColor(MUTED)
    c.setFont('Helvetica', 7.1)
    lines = subtitle.split('\n')
    for index, line in enumerate(lines):
        c.drawCentredString(x + w / 2, y + h - 42 - index * 9, line)
    state_color = CURRENT if state == 'CURRENT' else PLANNED
    pw = max(54, len(state) * 5.5 + 16)
    pill(c, x + w - pw - 10, y + 8, state, state_color)


def service(c, x, y, w, h, title, actions):
    c.setFillColor(white)
    c.setStrokeColor(GREEN)
    c.setLineWidth(1.4)
    c.roundRect(x, y, w, h, 12, fill=1, stroke=1)
    c.setFillColor(GREEN)
    c.setFont('Helvetica-Bold', 10.5)
    c.drawString(x + 14, y + h - 19, title)
    pill(c, x + w - 68, y + h - 25, 'CURRENT', CURRENT)
    card_w, card_h = (w - 34) / 2, 34
    for index, action in enumerate(actions):
        col, row = index % 2, index // 2
        cx, cy = x + 12 + col * (card_w + 10), y + h - 57 - row * 43
        c.setFillColor(HexColor('#fbfdfb'))
        c.setStrokeColor(HexColor('#62af69'))
        c.setLineWidth(.8)
        c.roundRect(cx, cy, card_w, card_h, 6, fill=1, stroke=1)
        c.setFillColor(TEXT)
        c.setFont('Helvetica-Bold', 7.1)
        c.drawCentredString(cx + card_w / 2, cy + 13, action)


def arrow(c, y, label):
    c.setStrokeColor(MUTED)
    c.setLineWidth(1)
    c.line(W / 2, y + 12, W / 2, y)
    c.setFillColor(MUTED)
    c.setFont('Helvetica-Bold', 7.8)
    c.drawCentredString(W / 2, y + 16, label)
    c.setFillColor(MUTED)
    marker = c.beginPath()
    marker.moveTo(W / 2 - 4, y + 4)
    marker.lineTo(W / 2 + 4, y + 4)
    marker.lineTo(W / 2, y - 3)
    marker.close()
    c.drawPath(marker, fill=1, stroke=0)


def main():
    c = canvas.Canvas(OUT, pagesize=(W, H))
    c.setTitle('MERCHROOM E-commerce System Architecture - Corrected')
    c.setFillColor(HexColor('#fffef9'))
    c.rect(0, 0, W, H, fill=1, stroke=0)

    c.setFillColor(TEXT)
    c.setFont('Helvetica-Bold', 25)
    c.drawString(42, 772, 'MERCHROOM E-COMMERCE SYSTEM ARCHITECTURE')
    c.setFillColor(MUTED)
    c.setFont('Helvetica', 10)
    c.drawString(43, 754, 'Current modular monolith, controlled agentic AI, and explicitly marked planned production improvements')
    pill(c, 1080, 760, 'CURRENT', CURRENT)
    pill(c, 1164, 760, 'PLANNED', PLANNED)
    pill(c, 1245, 760, 'SECURITY BOUNDARY', HexColor('#d94b45'))

    container(c, 42, 640, 1356, 95, 'Presentation Layer', BLUE, 'React 19 + Vite 8 + React Router 7 + Tailwind CSS 4')
    presentations = [
        ('Customer Storefront', 'Browse, search, product detail, cart and checkout'),
        ('Customer Account', 'Profile, order history, cancellation and reviews'),
        ('Admin Console', 'Dashboard, catalog, stock, customers and fulfilment'),
        ('Nong Hed Assistant', 'Natural-language product discovery and cart preparation'),
        ('Realtime Experience', 'SSE order updates with 15-second polling fallback'),
    ]
    for index, (title, subtitle) in enumerate(presentations):
        box(c, 65 + index * 278, 647, 234, 45, title, subtitle, BLUE)
    arrow(c, 628, 'HTTPS / JSON / HTTP-only cookie / SSE')

    container(c, 42, 515, 1356, 112, 'API and Security Gateway', TEAL, 'Node.js + Express 5')
    api = [
        ('REST Route Modules', 'Auth, users, products, cart, orders,\npayments, admin and chat'),
        ('JWT Cookie Authentication', 'Signed accessToken in HTTP-only cookie\n(1-hour expiry; stateless server)'),
        ('RBAC + Ownership', 'authUser, adminOnly and ownership checks'),
        ('Validation + Errors', 'Review validation, controller checks\nand global error handling'),
        ('CORS + Credentials', 'Credentials enabled; origin callback is\ncurrently permissive'),
        ('SSE', 'In-process order event streams'),
    ]
    widths = [224, 224, 224, 224, 182, 152]
    x = 70
    for (title, subtitle), width in zip(api, widths):
        box(c, x, 523, width, 58, title, subtitle, TEAL)
        x += width + 18
    arrow(c, 505, 'Authenticated API calls')

    container(c, 42, 305, 1356, 195, 'Business Service Layer', GREEN, 'Domain modules inside the current Express application')
    services = [
        ('Catalog Service', ['Product Query', 'Product CRUD', 'Category / Artist', 'Reviews', 'Search / Filters', 'Change Log']),
        ('Customer and Cart', ['Register / Login', 'Profile', 'Cart Items', 'Promo Validate', 'Ownership', 'Session Check']),
        ('Order and Inventory', ['Order Snapshot', 'Stock Check', 'Stock Decrement', 'Cancellation', 'Status Flow', 'Order Events']),
        ('Payment Service', ['Payment Record', 'Omise Charge', 'PromptPay Intent', 'Webhook', 'Refund Status', 'Failure Detail']),
        ('Admin and Analytics', ['Dashboard Stats', 'Revenue Trend', 'Low Stock', 'Admin Search', 'Manual Order', 'Reports']),
        ('Agentic AI Orchestrator', ['Search Products', 'Product Details', 'Check Stock', 'Budget Recommend', 'Prepare Cart', 'Model Fallback']),
    ]
    for index, (title, actions) in enumerate(services):
        service(c, 65 + index * 224, 333, 210, 132, title, actions)
    arrow(c, 295, 'Persistence and provider calls')

    container(c, 42, 150, 1356, 135, 'Data and Integration Layer', ORANGE, 'Persistent source of truth and controlled external calls')
    data = [
        ('MongoDB', 'Users, products, carts, orders, payments,\nreviews and audit logs', 'CURRENT', False),
        ('MongoDB Atlas', 'Managed database deployment\nconfigured through MONGO_URI', 'CURRENT', False),
        ('Omise', 'Card charges today; refund route currently\nupdates local payment/order status', 'CURRENT', False),
        ('Google Gemini', 'Function calling for Nong Hed\nwith controlled product tools', 'CURRENT', False),
        ('SSE Event Hub', 'In-process order subscribers\nwith heartbeat keep-alive', 'CURRENT', False),
        ('Redis', 'Reservation, rate limits and cache', 'PLANNED', True),
        ('Object Storage', 'Product images and CDN origin', 'PLANNED', True),
    ]
    for index, (title, subtitle, state, dashed) in enumerate(data):
        box(c, 65 + index * 198, 170, 184, 75, title, subtitle, ORANGE, state, dashed)
    arrow(c, 139, 'Hosting and operational support')

    container(c, 42, 15, 1356, 115, 'Infrastructure and Operations Layer', PURPLE, 'Configured hosting plus explicitly planned production controls')
    ops = [
        ('Vercel Web', 'React SPA; /api rewrite to Render', 'CURRENT', False),
        ('Render API', 'Express runtime and environment secrets', 'CURRENT', False),
        ('MongoDB Atlas', 'Managed persistence and backups', 'CURRENT', False),
        ('CI/CD Pipeline', 'Lint, build, test and deploy automation', 'PLANNED', True),
        ('Observability', 'Logs, metrics, traces and alerts', 'PLANNED', True),
        ('Security Controls', 'CSRF, refresh rotation and signed webhooks', 'PLANNED', True),
    ]
    for index, (title, subtitle, state, dashed) in enumerate(ops):
        box(c, 66 + index * 221, 35, 205, 60, title, subtitle, PURPLE, state, dashed)
    c.setFillColor(MUTED)
    c.setFont('Helvetica', 7.1)
    c.drawRightString(1395, 5, 'Architecture verified against the current MERCHROOM repository. Dashed components are planned; CURRENT means code or deployment configuration exists.')
    c.save()


if __name__ == '__main__':
    main()
