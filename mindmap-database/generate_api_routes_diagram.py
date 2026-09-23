from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A3, landscape
from reportlab.pdfgen import canvas

PAGE_W, PAGE_H = landscape(A3)
OUT_PDF = "tmp/pdfs/merchroom-api-routes-data-flow.pdf"

INK = HexColor("#28232A")
MUTED = HexColor("#6E6671")
LINE = HexColor("#C8C1C8")
PAPER = HexColor("#FBFAF8")
COLORS = {"frontend": HexColor("#496CAB"), "api": HexColor("#7659A7"), "backend": HexColor("#B56848"), "database": HexColor("#287B7D"), "external": HexColor("#8B6B2B")}


def box(c, x, y, w, h, title, lines, group):
    color = COLORS[group]
    c.setFillColor(white); c.setStrokeColor(LINE); c.setLineWidth(1)
    c.roundRect(x, y, w, h, 9, fill=1, stroke=1)
    c.setFillColor(color); c.roundRect(x, y + h - 27, w, 27, 9, fill=1, stroke=0); c.rect(x, y + h - 27, w, 8, fill=1, stroke=0)
    c.setFillColor(white); c.setFont("Helvetica-Bold", 10); c.drawString(x + 9, y + h - 18, title)
    c.setFillColor(INK); c.setFont("Helvetica", 7.4)
    ty = y + h - 40
    for line in lines:
        c.drawString(x + 9, ty, line); ty -= 11


def header(c, x, label, color):
    c.setFillColor(color); c.setFont("Helvetica-Bold", 14); c.drawString(x, 770, label)


def arrow(c, x1, y1, x2, y2, label="", dy=0):
    import math
    c.setStrokeColor(MUTED); c.setFillColor(MUTED); c.setLineWidth(.9)
    c.line(x1, y1, x2, y2)
    a = math.atan2(y2 - y1, x2 - x1); s = 5
    c.saveState(); c.translate(x2, y2); c.rotate(a * 180 / math.pi); c.line(0, 0, -s, s / 2); c.line(0, 0, -s, -s / 2); c.restoreState()
    if label:
        c.setFillColor(PAPER); c.roundRect((x1+x2)/2-32, (y1+y2)/2+dy-5, 64, 11, 3, fill=1, stroke=0)
        c.setFillColor(MUTED); c.setFont("Helvetica", 6.8); c.drawCentredString((x1+x2)/2, (y1+y2)/2+dy-1, label)


def main():
    c = canvas.Canvas(OUT_PDF, pagesize=landscape(A3)); c.setTitle("Merchroom API Routes Data Flow")
    c.setFillColor(PAPER); c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(INK); c.setFont("Helvetica-Bold", 22); c.drawString(48, 802, "MERCHROOM - API Routes and Data Flow")
    c.setFillColor(MUTED); c.setFont("Helvetica", 9.5); c.drawString(48, 784, "How frontend requests travel through Express routes and controllers to MongoDB, with Omise for card charges")
    header(c, 48, "1. FRONTEND", COLORS["frontend"]); header(c, 315, "2. EXPRESS API ROUTES", COLORS["api"]); header(c, 650, "3. CONTROLLERS AND SERVICES", COLORS["backend"]); header(c, 947, "4. DATA AND EXTERNAL SERVICE", COLORS["database"])

    box(c, 48, 620, 220, 104, "Public storefront", ["Home / Product / ProductDetail", "GET product catalog + categories", "Search and filter by category/tags"], "frontend")
    box(c, 48, 465, 220, 118, "Customer account", ["Login / Register / Profile", "Cart / Checkout / Order history", "SSE receives order updates"], "frontend")
    box(c, 48, 300, 220, 118, "Admin UI", ["Products / Categories / Orders", "Customers / Dashboard", "Protected by admin role"], "frontend")

    box(c, 315, 650, 285, 80, "/api/auth", ["POST register, login, forgot/reset", "GET/PATCH user profile"], "api")
    box(c, 315, 540, 285, 92, "/api/products + /api/categories", ["GET public catalog/categories", "POST/PATCH/DELETE admin CRUD", "GET supports search/category/artist"], "api")
    box(c, 315, 407, 285, 104, "/api/cart + /api/orders", ["Cart: GET/POST/PATCH/DELETE", "Order: POST, GET /me, PATCH status", "GET /me/events uses SSE"], "api")
    box(c, 315, 274, 285, 104, "/api/payments", ["POST orders/:id/charge", "GET payment status", "Admin refund route"], "api")
    box(c, 315, 125, 285, 120, "/api/admin + supporting routes", ["Admin: stats, product-options, search", "Users, promos, reviews", "authUser + adminOnly middleware"], "api")

    box(c, 650, 650, 235, 80, "Auth and user controller", ["Validate credentials", "Issue session/JWT and role checks"], "backend")
    box(c, 650, 535, 235, 98, "Product and category controller", ["List, populate artist/category", "CRUD + product change log", "Category deletion protection"], "backend")
    box(c, 650, 405, 235, 105, "Cart and order controller", ["Cart item mutations", "Create order and decrement stock", "Publish SSE order event"], "backend")
    box(c, 650, 278, 235, 95, "Payment controller", ["Authorize order ownership", "Create Omise charge", "Save paid/failed state"], "backend")
    box(c, 650, 125, 235, 115, "Admin, user, promo, review", ["Dashboard aggregation", "Profile and customer data", "Promo validation and review CRUD"], "backend")

    box(c, 947, 560, 200, 170, "MongoDB collections", ["User, Artist, Category", "Product, ProductChangeLog", "Cart, Order, Payment", "Review, PromoCode"], "database")
    box(c, 947, 330, 200, 105, "Order event stream", ["Server-Sent Events", "AccountContext reloads orders", "Admin sees current status"], "database")
    box(c, 947, 140, 200, 120, "Omise", ["Frontend: public-key token", "Backend: secret-key charge", "Returns charge/card result"], "external")

    arrow(c, 268, 672, 315, 585, "GET catalog")
    arrow(c, 268, 523, 315, 458, "request")
    arrow(c, 268, 358, 315, 185, "admin request", -5)
    arrow(c, 600, 690, 650, 690, "route")
    arrow(c, 600, 585, 650, 585, "route")
    arrow(c, 600, 458, 650, 458, "route")
    arrow(c, 600, 326, 650, 326, "route")
    arrow(c, 600, 185, 650, 185, "route")
    arrow(c, 885, 690, 947, 660, "read/write")
    arrow(c, 885, 585, 947, 640, "read/write")
    arrow(c, 885, 458, 947, 605, "read/write")
    arrow(c, 885, 326, 947, 200, "charge", -8)
    arrow(c, 885, 458, 947, 382, "publish SSE")
    c.setFillColor(MUTED); c.setFont("Helvetica", 8)
    c.drawString(48, 54, "Legend: blue = frontend, purple = route layer, orange = controller/service, teal = MongoDB, brown = external payment provider")
    c.drawRightString(1140, 54, "All protected write routes pass authUser; administrative routes additionally pass adminOnly.")
    c.save()


if __name__ == "__main__":
    main()
