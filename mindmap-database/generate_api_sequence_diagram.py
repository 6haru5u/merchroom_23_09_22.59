from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A3, landscape
from reportlab.pdfgen import canvas

W, H = landscape(A3)
OUT = "tmp/pdfs/merchroom-api-sequence-diagram.pdf"
INK = HexColor("#28232A"); MUTED = HexColor("#716A73"); LINE = HexColor("#BDB5BE"); PAPER = HexColor("#FBFAF8")
LANE_COLORS = [HexColor("#496CAB"), HexColor("#496CAB"), HexColor("#7659A7"), HexColor("#B56848"), HexColor("#287B7D"), HexColor("#8B6B2B")]
LANES = ["Customer / Admin", "React Frontend", "Express Route + Middleware", "Controller / Service", "MongoDB", "Omise"]
X = [105, 285, 490, 705, 905, 1080]


def title(c):
    c.setFillColor(PAPER); c.rect(0, 0, W, H, fill=1, stroke=0)
    c.setFillColor(INK); c.setFont("Helvetica-Bold", 21); c.drawString(42, 808, "MERCHROOM - Detailed API Sequence Diagram")
    c.setFillColor(MUTED); c.setFont("Helvetica", 9.5); c.drawString(42, 790, "Frontend -> Express routes/middleware -> controllers -> MongoDB, with direct Omise tokenization and backend charge")
    for i, label in enumerate(LANES):
        x = X[i]
        c.setFillColor(LANE_COLORS[i]); c.roundRect(x-70, 748, 140, 26, 8, fill=1, stroke=0)
        c.setFillColor(white); c.setFont("Helvetica-Bold", 8.8); c.drawCentredString(x, 758, label)
        c.setDash(3, 3); c.setStrokeColor(LINE); c.line(x, 95, x, 748); c.setDash()


def section(c, y, label, color):
    c.setFillColor(color); c.setFont("Helvetica-Bold", 10); c.drawString(42, y, label)
    c.setStrokeColor(color); c.setLineWidth(.7); c.line(42, y-5, 1145, y-5)


def msg(c, y, a, b, text, dashed=False, offset=0):
    import math
    x1, x2 = X[a], X[b]
    c.setStrokeColor(MUTED); c.setFillColor(MUTED); c.setLineWidth(.8)
    if dashed: c.setDash(3, 2)
    c.line(x1, y, x2, y)
    if dashed: c.setDash()
    d = 1 if x2 > x1 else -1
    c.line(x2, y, x2 - 5*d, y + 2.5); c.line(x2, y, x2 - 5*d, y - 2.5)
    c.setFillColor(PAPER); c.roundRect(min(x1,x2)+8, y+2+offset, abs(x2-x1)-16, 10, 2, fill=1, stroke=0)
    c.setFillColor(MUTED); c.setFont("Helvetica", 6.9); c.drawCentredString((x1+x2)/2, y+5+offset, text)


def note(c, x, y, text, color=HexColor("#F0ECFC")):
    c.setFillColor(color); c.setStrokeColor(LINE); c.setLineWidth(.5); c.roundRect(x, y-5, 128, 18, 4, fill=1, stroke=1)
    c.setFillColor(INK); c.setFont("Helvetica", 6.7); c.drawCentredString(x+64, y+1, text)


def main():
    c = canvas.Canvas(OUT, pagesize=landscape(A3)); c.setTitle("Merchroom Detailed API Sequence Diagram"); title(c)
    section(c, 725, "A. Browse products and categories - public GET routes", LANE_COLORS[0])
    msg(c, 705, 0, 1, "Open /products or Home")
    msg(c, 683, 1, 2, "GET /api/products?limit=200  +  GET /api/categories")
    msg(c, 661, 2, 3, "listPublic / list categories")
    msg(c, 639, 3, 4, "find + populate artist/category")
    msg(c, 617, 4, 3, "products, categories", True)
    msg(c, 595, 3, 2, "200 JSON success", True)
    msg(c, 573, 2, 1, "200 JSON catalog", True)
    msg(c, 551, 1, 0, "Render product cards + filter options", True)
    note(c, 42, 532, "Public endpoints: no auth required", HexColor("#E9F4F4"))

    section(c, 510, "B. Cart, checkout, Omise card payment, and real-time order update", LANE_COLORS[3])
    msg(c, 490, 0, 1, "Add item / submit checkout")
    msg(c, 468, 1, 2, "POST /api/cart/items  (cookie included)")
    msg(c, 446, 2, 3, "authUser -> addItem")
    msg(c, 424, 3, 4, "upsert Cart + populate Product")
    msg(c, 402, 4, 3, "cart document", True)
    msg(c, 380, 1, 2, "POST /api/orders  (items, shipping, paymentMethod)")
    msg(c, 358, 2, 3, "authUser -> createOrder")
    msg(c, 336, 3, 4, "validate stock; create Order + Payment; decrement Product stock")
    msg(c, 314, 4, 3, "pending order and payment", True)
    msg(c, 292, 1, 5, "Omise.js: create token with public key")
    msg(c, 270, 5, 1, "card token only; no full card stored", True)
    msg(c, 248, 1, 2, "POST /api/payments/orders/:id/charge  (token)")
    msg(c, 226, 2, 3, "authUser -> chargeCard; verify order ownership")
    msg(c, 204, 3, 5, "create charge using backend secret key")
    msg(c, 182, 5, 3, "charge result / card brand + last digits", True)
    msg(c, 160, 3, 4, "save Payment paid/failed; Order -> processing")
    msg(c, 138, 3, 2, "publish order SSE event")
    msg(c, 116, 2, 1, "charge response + AccountContext refresh", True)
    note(c, 42, 96, "Write routes use authUser; payment secret remains server-side", HexColor("#FFF2E9"))

    section(c, 74, "C. Admin management - protected CRUD and dashboard", LANE_COLORS[2])
    msg(c, 55, 0, 1, "Admin opens Products / Categories / Orders")
    msg(c, 37, 1, 2, "GET /api/admin/*, POST/PATCH/DELETE products/categories")
    msg(c, 19, 2, 3, "authUser + adminOnly -> controller -> MongoDB -> JSON response")
    c.setFillColor(MUTED); c.setFont("Helvetica", 7.5); c.drawRightString(1145, 6, "SSE: /api/orders/me/events (customer) and /api/orders/events (admin)")
    c.save()


if __name__ == "__main__":
    main()
