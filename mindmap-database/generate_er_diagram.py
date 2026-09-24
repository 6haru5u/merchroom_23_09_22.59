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
    "User": (65, 610, 215, 136, "user", ["PK  _id", "email (unique), password hash", "firstName, lastName, phone", "address, profilePicture", "role: customer | admin, employeeId", "interests[], socialAccounts[]"]),
    "Artist": (432, 643, 210, 103, "catalog", ["PK  _id", "name (unique), realName", "type: solo | band | group", "bio, style, socialLinks[]", "profilePic"]),
    "Category": (770, 643, 205, 103, "catalog", ["PK  _id", "name (unique), slug (unique)", "description", "used for store/admin filters", "timestamps"]),
    "Product": (603, 390, 245, 178, "catalog", ["PK  _id", "FK  category -> Category (required)", "FK  artist -> Artist (optional)", "name, description, price, quantity", "national, style, medium, sizes[]", "tags[], imageUrl, imageUrls[]", "imageFit, createdAt, updatedAt"]),
    "Cart": (52, 407, 208, 115, "transaction", ["PK  _id", "FK  userId -> User", "items[] (embedded CartItem)", "one cart document per user", "createdAt, updatedAt"]),
    "Order": (340, 224, 235, 158, "transaction", ["PK  _id", "FK  userId -> User", "items[] (embedded OrderItem)", "totalAmount, status", "shippingProvider, shippingAddress", "purchaseDate, createdAt, updatedAt"]),
    "Payment": (726, 224, 225, 140, "transaction", ["PK  _id", "FK  orderId -> Order", "amount, method, status, provider", "providerChargeId, cardBrand", "cardLastDigits, failureCode/message", "createdAt, updatedAt"]),
    "Review": (295, 85, 208, 112, "support", ["PK  _id", "FK  userId -> User", "FK  productId -> Product", "rating (1-5), comment", "createdAt, updatedAt"]),
    "PromoCode": (55, 85, 208, 112, "support", ["PK  _id", "code (unique), discountPercent", "isActive, expiryDate, usageCount", "createdAt, updatedAt", "No FK to Cart/Order yet"]),
    "ProductChangeLog": (860, 430, 270, 122, "support", ["PK  _id", "FK  productId -> Product", "FK  actor -> User", "action: created | updated | deleted", "productName, before, after", "createdAt (no updatedAt)"]),
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
    c.drawString(55, 771, "Page 1: relationships in the active Mongoose schemas. Page 2: field guide and seed.js baseline.")
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
    # PromoCode is currently an independent validation catalogue. It does not yet
    # have an ObjectId reference to Cart or Order in the Mongoose schemas.
    arrow(c, "ProductChangeLog", "left", "Product", "right", "audits product", (0, 46))
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 8)
    c.drawRightString(1130, 25, "PK = unique record id   FK = ObjectId link   Order.items keeps purchase-time name/price snapshot")
    c.showPage()
    c.setFillColor(PAPER); c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(INK); c.setFont("Helvetica-Bold", 22); c.drawString(55, 790, "MERCHROOM - Database Field Guide and Seed Baseline")
    c.setFillColor(MUTED); c.setFont("Helvetica", 10); c.drawString(55, 771, "Plain-language reference: what each collection stores, how seed.js fills it, and what is not persisted yet.")
    columns = [
        (55, "Catalog", [
            ("Category", "Store grouping. Seed: 5 rows (apparel, hat, fan merchandise, album, merchandise)."),
            ("Artist", "Product owner/brand. Seed: 14 artists/groups, including Taylor Swift, SACIT and CHAKSARN."),
            ("Product", "Sellable item. Seed: 32 products with price, quantity, origin, style, medium, sizes, tags and category/artist ObjectIds."),
        ]),
        (405, "Customer and purchase", [
            ("User", "Account and role. Seed: 15 accounts: 9 customers and 6 admins. Password is hashed before save."),
            ("Cart + Cart item", "Current shopping choices. Each item stores productId, optional variant_id and quantity. Seed clears Cart but creates no initial cart."),
            ("Order + Order item", "Completed checkout record. Order item snapshots productId/name/price/quantity so past receipts do not change with catalog edits. Seed: 3 orders."),
            ("Payment", "Payment attempt/result for an order. Holds Omise charge reference/card summary. Seed clears Payment but creates no initial payment."),
        ]),
        (755, "Trust, reporting and gaps", [
            ("Review", "Customer score 1-5 and comment for one product. Seed clears Review but creates no initial review."),
            ("ProductChangeLog", "Admin audit: who changed which product, action and before/after data."),
            ("PromoCode", "Discount catalogue with active state, expiry and usage count. It is currently not linked to Cart or Order in the schema."),
            ("Seed-vs-schema note", "seed.js includes memberSince, orderNumber, trackingNumber and paymentStatus in source mock data. The active User/Order schemas do not save these fields, so they are documentation/mock-only until fields are added."),
        ]),
    ]
    for x, heading, items in columns:
        c.setFillColor(COLORS['catalog'] if x == 55 else COLORS['transaction'] if x == 405 else COLORS['support'])
        c.roundRect(x, 695, 315, 31, 9, fill=1, stroke=0); c.setFillColor(white); c.setFont("Helvetica-Bold", 12); c.drawString(x+12, 706, heading)
        y = 665
        for title, text in items:
            c.setFillColor(white); c.setStrokeColor(LINE); c.roundRect(x, y-80, 315, 75, 8, fill=1, stroke=1)
            c.setFillColor(INK); c.setFont("Helvetica-Bold", 10); c.drawString(x+10, y-20, title)
            c.setFont("Helvetica", 8.5); c.setFillColor(MUTED)
            words = text.split(); line = ""; line_y = y-36
            for word in words:
                trial = (line + " " + word).strip()
                if stringWidth(trial, "Helvetica", 8.5) > 290:
                    c.drawString(x+10, line_y, line); line_y -= 12; line = word
                else: line = trial
            if line: c.drawString(x+10, line_y, line)
            y -= 96
    c.setFillColor(MUTED); c.setFont("Helvetica", 8)
    c.drawString(55, 40, "How to read: Collections are MongoDB tables. Embedded CartItem and OrderItem are arrays inside their parent document, not separate collections.")
    c.save()


if __name__ == "__main__":
    main()
