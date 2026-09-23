import json, random, time, uuid

OUT = 'mindmap-database/merchroom-api-methods-routes.excalidraw'
NOW = int(time.time() * 1000)
random.seed(20260923)
E = []
INK, SURFACE, PURPLE, LIME, ORANGE, WHITE, MUTED = '#171419', '#231d21', '#6044d7', '#d8ff48', '#ff6c4b', '#f8f7ff', '#c6bfcd'

def base(kind, x, y, w, h):
    return {'id': uuid.uuid4().hex[:20], 'type': kind, 'x': x, 'y': y, 'width': w, 'height': h, 'angle': 0, 'strokeColor': WHITE, 'backgroundColor': 'transparent', 'fillStyle': 'solid', 'strokeWidth': 1, 'strokeStyle': 'solid', 'roughness': 0, 'opacity': 100, 'groupIds': [], 'frameId': None, 'roundness': {'type': 3} if kind == 'rectangle' else None, 'seed': random.randint(1, 2_000_000_000), 'version': 1, 'versionNonce': random.randint(1, 2_000_000_000), 'isDeleted': False, 'boundElements': [], 'updated': NOW, 'link': None, 'locked': False}

def box(x, y, w, h, stroke, fill, rounded=True):
    e = base('rectangle', x, y, w, h); e.update({'strokeColor': stroke, 'backgroundColor': fill, 'roundness': {'type': 3} if rounded else None}); E.append(e)

def txt(x, y, value, size=16, color=WHITE, width=None, align='left'):
    lines = value.split('\n'); e = base('text', x, y, width or max(80, max(map(len, lines)) * size * .56), len(lines) * size * 1.24)
    e.update({'text': value, 'originalText': value, 'fontSize': size, 'fontFamily': 2, 'textAlign': align, 'verticalAlign': 'top', 'lineHeight': 1.24, 'autoResize': False, 'strokeColor': color, 'roundness': None}); E.append(e)

def line(x1, y1, x2, y2, color=MUTED):
    e = base('line', x1, y1, x2-x1, y2-y1); e.update({'points': [[0, 0], [x2-x1, y2-y1]], 'lastCommittedPoint': None, 'roundness': None, 'strokeColor': color, 'startBinding': None, 'endBinding': None, 'startArrowhead': None, 'endArrowhead': None}); E.append(e)

def pill(x, y, label, method=False):
    colors = {'GET': (LIME, INK), 'POST': (ORANGE, WHITE), 'PATCH': (PURPLE, WHITE), 'DELETE': (WHITE, INK)}
    fill, fg = colors.get(label, (PURPLE, WHITE)) if method else (PURPLE, WHITE); w = 67 if method else max(72, len(label) * 7 + 18)
    box(x, y, w, 26, fill, fill); txt(x, y + 6, label, 11, fg, w, 'center'); return w

def route(x, y, method, path, guard=''):
    mw = pill(x, y, method, True); txt(x + mw + 14, y + 5, path, 13, WHITE, 270)
    if guard: pill(x + 278, y + 1, guard)

def panel(x, y, w, h, title, icon, header, rows, split=None):
    box(x, y, w, h, PURPLE, SURFACE); box(x, y, w, 88, header, header); box(x + 20, y + 16, 55, 55, LIME, LIME)
    txt(x + 20, y + 27, icon, 27, INK, 55, 'center'); line(x + 94, y + 18, x + 94, y + 70, WHITE); txt(x + 112, y + 31, title, 22, WHITE, w - 132)
    cy = y + 108
    for i, r in enumerate(rows):
        if split is not None and i == split: line(x + 20, cy - 11, x + w - 20, cy - 11, '#9a84d7'); cy += 13
        route(x + 24, cy, *r); cy += 32

def footer(x, y, method, path, guard=''):
    mw = pill(x, y, method, True); txt(x + mw + 12, y + 5, path, 12, WHITE)
    if guard: pill(x + mw + len(path) * 6.6 + 23, y + 1, guard)

def main():
    box(0, 0, 1800, 1040, INK, INK, False)
    txt(60, 52, 'MERCHROOM —\nAPI Methods & Routes', 46, WHITE, 820); txt(62, 166, 'Model → Route / Method → Controller / Service', 20, '#e1dcff', 700)
    txt(1530, 56, 'SYSTEM API MAP', 15, '#e1dcff', 190); line(1718, 67, 1765, 67, LIME)
    box(55, 300, 220, 220, LIME, PURPLE); txt(55, 337, '✦', 54, LIME, 220, 'center'); txt(55, 415, 'MERCHROOM', 23, WHITE, 220, 'center'); line(275, 410, 328, 410, LIME)

    auth = [('POST','/api/auth/register'),('POST','/api/auth/login'),('POST','/api/auth/logout'),('GET','/api/auth/auth','authUser'),('GET','/api/auth/session','authUser'),('PATCH','/api/auth/password','authUser'),('GET','/api/users/profile','authUser'),('PATCH','/api/users/profile | /me','authUser'),('GET','/api/users/:id','adminOnly')]
    shop = [('GET','/api/products?search=&category=&artist='),('GET','/api/products?limit=100  (Nong Hed Chatbot)'),('GET','/api/products/:id'),('GET','/api/products/admin/all','adminOnly'),('POST','/api/products','adminOnly'),('PATCH','/api/products/:id | /:id/stock','adminOnly'),('DELETE','/api/products/:id','adminOnly'),('GET','/api/categories'),('POST','/api/categories','adminOnly'),('PATCH','/api/categories/:id','adminOnly'),('DELETE','/api/categories/:id','adminOnly'),('GET','/api/cart','authUser'),('POST','/api/cart/items','authUser'),('PATCH','/api/cart/items/:productId','authUser'),('DELETE','/api/cart/items/:productId | /','authUser')]
    orders = [('POST','/api/orders','authUser'),('POST','/api/orders/manual','adminOnly'),('GET','/api/orders/me | /:id','authUser'),('PATCH','/api/orders/:id/cancel','authUser'),('GET','/api/orders/me/events (SSE)','authUser'),('GET','/api/orders | /stats | /events','adminOnly'),('PATCH','/api/orders/:id/status','adminOnly'),('POST','/api/payments/orders/:orderId/initiate','authUser'),('POST','/api/payments/orders/:orderId/charge','authUser'),('GET','/api/payments/orders/:orderId','authUser'),('POST','/api/payments/webhook'),('POST','/api/payments/:paymentId/refund','adminOnly')]
    panel(330, 235, 420, 590, 'AUTH & USERS', '●', PURPLE, auth, 6); panel(775, 235, 480, 590, 'SHOPPING FLOW', '⌁', ORANGE, shop, 6); panel(1280, 235, 460, 590, 'ORDER & PAYMENT', '▣', PURPLE, orders, 7)
    box(55, 860, 1685, 105, LIME, SURFACE); box(82, 884, 48, 48, LIME, LIME); txt(82, 894, '⚙', 25, INK, 48, 'center'); line(149, 884, 149, 932, WHITE); txt(170, 900, 'ADMIN & SUPPORT', 18, WHITE)
    footer(405,893,'GET','/api/admin/stats | /product-options | /search','adminOnly'); txt(865,901,'•',20,LIME); footer(900,893,'GET','/api/admin/reports/low-stock','adminOnly'); txt(1245,901,'•',20,LIME); footer(1280,893,'POST','/api/promos/validate'); txt(1490,901,'•',20,LIME); footer(1520,893,'GET','/api/reviews/product/:productId')
    txt(62, 987, 'Middleware: authUser = signed-in customer or admin · adminOnly = admin role · Omise.js public token → backend charge with secret key', 12, MUTED, 1600)
    json.dump({'type':'excalidraw','version':2,'source':'https://excalidraw.com','elements':E,'appState':{'gridSize':20,'viewBackgroundColor':INK},'files':{}}, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

if __name__ == '__main__': main()
