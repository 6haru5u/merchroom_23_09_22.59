from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A3, landscape
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas

OUTPUT = "output/pdf/merchroom-er-diagram.pdf"

PAGE_W, PAGE_H = landscape(A3)
INK = HexColor("#28232a")
MUTED = HexColor("#6E6671")
LINE = HexColor("#BDB5BE")
PAPER = HexColor("#FBFAF8")
COLORS = {
    "user": HexColor("#2A7580"), "catalog": HexColor("#7A5DAA"),
    "transaction": HexColor("#B26445"), "support": HexColor("#6871A8"),
}

ENTITIES = {
    "User": (65, 610, 195, 128, "user", ["PK  _id", "email (unique)", "role: customer | admin", "profile, address"]),
    "Artist": (432, 643, 195, 95, "catalog", ["PK  _id", "name (unique)", "type, bio, profilePic"]),
    "Category": (770, 643, 195, 95, "catalog", ["PK  _id", "name (unique)", "slug (unique)", "description"]),
    "Product": (603, 405, 220, 155, "catalog", ["PK  _id", "FK  category -> Category", "FK  artist -> Artist", "name, price, quantity", "tags, imageUrls, imageFit"]),
    "Cart": (58, 405, 195, 112, "transaction", ["PK  _id", "FK  userId -> User", "items[]", "  FK productId -> Product", "  quantity"]),
    "Order": (350, 238, 225, 144, "transaction", ["PK  _id", "FK  userId -> User", "items[] product snapshot", "totalAmount, status", "shippingAddress, purchaseDate"]),
    "Payment": (726, 238, 210, 128, "transaction", ["PK  _id", "FK  orderId -> Order", "amount, method, status", "provider: Omise/manual", "chargeId, cardLastDigits"]),
    "Review": (295, 105, 195, 96, "support", ["PK  _id", "FK  userId -> User", "FK  productId -> Product", "rating, comment"]),
    "PromoCode": (58, 105, 195, 95, "support", ["PK  _id", "code, discountPercent", "isActive, expiryDate"]),
    "ProductChangeLog": (850, 440, 248, 110, "support", ["PK  _id", "FK  productId -> Product", "FK  actor -> User", "action, before, after"]),
}


def card(c, name, spec):
    x, y, w, h, group, fields = spec
    color = COLORS[group]
    c.setFillColor(white)
    c.setStrokeColor(LINE)
    c.setLineWidth(1)
    c.roundRect(x, y, w, h, 10, fill=1, stroke=1)
    c.setFillColor(color)
    c.roundRect(x, y + h - 29, w, 29, 10, fill=1, stroke=0)
    c.rect(x, y + h - 29, w, 10, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica-Bold", 12)
    c.drawString(x + 11, y + h - 19, name)
    c.setFillColor(INK)
    c.setFont("Helvetica", 8.6)
    line_y = y + h - 44
    for field in fields:
        c.drawString(x + 11, line_y, field)
        line_y -= 15


def point(name, side):
    x, y, w, h, _, _ = ENTITIES[name]
    if side == "left": return (x, y + h / 2)
    if side == "right": return (x + w, y + h / 2)
    if side == "top": return (x + w / 2, y + h)
    return (x + w / 2, y)


def arrow(c, source, source_side, target, target_side, label, offset=(0, 0)):
    x1, y1 = point(source, source_side)
    x2, y2 = point(target, target_side)
    c.setStrokeColor(MUTED)
    c.setFillColor(MUTED)
    c.setLineWidth(1.1)
    c.line(x1, y1, x2, y2)
    angle = __import__("math").atan2(y2-y1, x2-x1)
    size = 6
    c.saveState()
    c.translate(x2, y2)
    c.rotate(angle * 180 / __import__("math").pi)
    c.line(0, 0, -size, size / 2)
    c.line(0, 0, -size, -size / 2)
    c.restoreState()
    if label:
        mx, my = (x1 + x2) / 2 + offset[0], (y1 + y2) / 2 + offset[1]
        c.setFillColor(PAPER)
        width = stringWidth(label, "Helvetica", 7.5) + 8
        c.roundRect(mx - width / 2, my - 6, width, 13, 4, fill=1, stroke=0)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 7.5)
        c.drawCentredString(mx, my - 1.5, label)


def main():
    c = canvas.Canvas(OUTPUT, pagesize=landscape(A3))
    c.setTitle("Merchroom ER Diagram")
    c.setFillColor(PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 22)
    c.drawString(55, 790, "MERCHROOM - Entity Relationship Diagram")
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 10)
    c.drawString(55, 771, "Current data model from Mongoose schemas and order/payment implementation")
    for name, spec in ENTITIES.items():
        card(c, name, spec)
    arrow(c, "Product", "top", "Artist", "bottom", "N : 1  belongs to", (-55, 0))
    arrow(c, "Product", "top", "Category", "bottom", "N : 1  categorized as", (75, 0))
    arrow(c, "User", "bottom", "Cart", "top", "1 : N  owns", (-24, 0))
    arrow(c, "Cart", "right", "Product", "left", "N : 1  contains", (0, 16))
    arrow(c, "User", "bottom", "Order", "top", "1 : N  creates", (23, 0))
    arrow(c, "Order", "right", "Payment", "left", "1 : 1  has payment", (0, 15))
    arrow(c, "Order", "top", "Product", "bottom", "N : M  item snapshot", (24, 0))
    arrow(c, "Review", "top", "User", "bottom", "", (0, 0))
    arrow(c, "Review", "right", "Product", "left", "", (0, 0))
    arrow(c, "PromoCode", "top", "Cart", "bottom", "", (0, 0))
    arrow(c, "ProductChangeLog", "left", "Product", "right", "audits product", (0, 16))
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8)
    c.drawRightString(1130, 25, "PK = primary key   FK = ObjectId reference   Order.items stores a purchase-time product snapshot")
    c.save()


if __name__ == "__main__":
    main()
