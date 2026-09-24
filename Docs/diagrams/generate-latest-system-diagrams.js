/*
 * Generates the four current MERCHROOM system diagrams from the active
 * Mongoose schemas, Express route files, controllers, and server/seed.js.
 * Run: node Docs/diagrams/generate-latest-system-diagrams.js
 */
const fs = require('fs');
const path = require('path');

const out = __dirname;
const C = { bg: '#111014', panel: '#1a181f', line: '#514878', text: '#f7f5ff', muted: '#b9b4c9', lime: '#d8ff3e', purple: '#7653df', orange: '#ff7046', cyan: '#43d8cc', pink: '#f27aad', white: '#ffffff', dark: '#18151c' };
const esc = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const write = (name, width, height, body) => fs.writeFileSync(path.join(out, name), `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n<defs><filter id="shadow"><feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="#000" flood-opacity=".28"/></filter><linearGradient id="purple" x1="0" x2="1"><stop stop-color="#4930a5"/><stop offset="1" stop-color="#7653df"/></linearGradient><linearGradient id="orange" x1="0" x2="1"><stop stop-color="#d94f37"/><stop offset="1" stop-color="#ff7046"/></linearGradient><linearGradient id="lime" x1="0" x2="1"><stop stop-color="#bade32"/><stop offset="1" stop-color="#d8ff3e"/></linearGradient><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="${C.lime}"/></marker></defs><rect width="100%" height="100%" fill="${C.bg}"/>${body}</svg>`);
const header = (title, subtitle, label) => `<text x="70" y="92" fill="${C.text}" font-family="Arial, sans-serif" font-size="52" font-weight="800">MERCHROOM —</text><text x="70" y="152" fill="${C.text}" font-family="Arial, sans-serif" font-size="52" font-weight="800">${esc(title)}</text><text x="72" y="190" fill="${C.muted}" font-family="Arial, sans-serif" font-size="21">${esc(subtitle)}</text><text x="${label ? 2050 : 70}" y="68" fill="${C.text}" font-family="Arial, sans-serif" font-size="17" font-weight="700">${esc(label || '')}</text><rect x="2220" y="53" width="70" height="7" rx="4" fill="${C.lime}"/>`;
const card = (x, y, w, h, title, color, lines, icon = '') => {
  const lineHeight = 22;
  const texts = lines.map((line, i) => `<text x="${x + 22}" y="${y + 82 + i * lineHeight}" fill="${C.text}" font-family="Arial, sans-serif" font-size="15">${esc(line)}</text>`).join('');
  return `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="${C.panel}" stroke="${color}" stroke-width="3"/><path d="M${x} ${y + 20}Q${x} ${y} ${x + 20} ${y}H${x + w - 20}Q${x + w} ${y} ${x + w} ${y + 20}V${y + 58}H${x}Z" fill="${color}"/><text x="${x + 22}" y="${y + 38}" fill="${C.white}" font-family="Arial, sans-serif" font-size="21" font-weight="800">${icon ? `${icon}  ` : ''}${esc(title)}</text>${texts}</g>`;
};
const methodColor = { GET: C.lime, POST: C.orange, PATCH: C.purple, DELETE: C.white };
const routeRow = (x, y, method, route, access = '') => `<g><rect x="${x}" y="${y - 17}" width="${method === 'DELETE' ? 82 : 62}" height="27" rx="14" fill="${methodColor[method]}"/><text x="${x + (method === 'DELETE' ? 41 : 31)}" y="${y + 2}" text-anchor="middle" fill="${method === 'DELETE' ? C.dark : '#111014'}" font-family="Arial" font-size="13" font-weight="800">${method}</text><text x="${x + 96}" y="${y + 2}" fill="${C.text}" font-family="Arial" font-size="16">${esc(route)}</text>${access ? `<rect x="${x + 555}" y="${y - 15}" width="${access === 'adminOnly' ? 89 : 78}" height="23" rx="12" fill="#4830b6"/><text x="${x + 555 + (access === 'adminOnly' ? 44 : 39)}" y="${y + 1}" text-anchor="middle" fill="${C.white}" font-family="Arial" font-size="11" font-weight="700">${access}</text>` : ''}</g>`;
const routeBox = (x, y, title, color, rows) => {
  const h = 84 + rows.length * 40;
  return `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="720" height="${h}" rx="20" fill="${C.panel}" stroke="${color}" stroke-width="3"/><path d="M${x} ${y + 20}Q${x} ${y} ${x + 20} ${y}H${x + 700}Q${x + 720} ${y} ${x + 720} ${y + 20}V${y + 58}H${x}Z" fill="${color}"/><text x="${x + 24}" y="${y + 38}" fill="${C.white}" font-family="Arial" font-size="23" font-weight="800">${esc(title)}</text>${rows.map((r, i) => routeRow(x + 24, y + 94 + i * 40, ...r)).join('')}</g>`;
};

function apiRoutes() {
  const auth = [
    ['POST', '/api/auth/register'], ['POST', '/api/auth/login'], ['POST', '/api/auth/logout'], ['GET', '/api/auth/auth', 'authUser'], ['GET', '/api/auth/session', 'authUser'], ['PATCH', '/api/auth/password', 'authUser'],
    ['GET', '/api/users/profile', 'authUser'], ['PATCH', '/api/users/profile', 'authUser'], ['PATCH', '/api/users/me', 'authUser'], ['GET', '/api/users', 'adminOnly'], ['GET', '/api/users/:id', 'adminOnly'],
  ];
  const catalog = [
    ['GET', '/api/products?search=&category=&artist=&genre=&page=&limit='], ['GET', '/api/products/:id'], ['GET', '/api/products/admin/all', 'adminOnly'], ['POST', '/api/products', 'adminOnly'], ['PATCH', '/api/products/:id', 'adminOnly'], ['PATCH', '/api/products/:id/stock', 'adminOnly'], ['DELETE', '/api/products/:id', 'adminOnly'],
    ['GET', '/api/categories'], ['POST', '/api/categories', 'adminOnly'], ['PATCH', '/api/categories/:id', 'adminOnly'], ['DELETE', '/api/categories/:id', 'adminOnly'], ['GET', '/api/reviews/product/:productId'], ['POST', '/api/reviews', 'authUser'], ['PATCH', '/api/reviews/:id', 'authUser'], ['DELETE', '/api/reviews/:id', 'authUser'],
  ];
  const shopping = [
    ['GET', '/api/cart', 'authUser'], ['POST', '/api/cart/items', 'authUser'], ['PATCH', '/api/cart/items/:productId', 'authUser'], ['DELETE', '/api/cart/items/:productId', 'authUser'], ['DELETE', '/api/cart', 'authUser'],
    ['GET', '/api/promos'], ['POST', '/api/promos/validate'], ['POST', '/api/promos', 'adminOnly'], ['PATCH', '/api/promos/:id', 'adminOnly'], ['DELETE', '/api/promos/:id', 'adminOnly'],
  ];
  const orders = [
    ['POST', '/api/orders', 'authUser'], ['POST', '/api/orders/manual', 'adminOnly'], ['GET', '/api/orders/me', 'authUser'], ['GET', '/api/orders/me/events (SSE)', 'authUser'], ['GET', '/api/orders/:id', 'authUser'], ['PATCH', '/api/orders/:id/cancel', 'authUser'], ['GET', '/api/orders', 'adminOnly'], ['GET', '/api/orders/stats', 'adminOnly'], ['GET', '/api/orders/events (SSE)', 'adminOnly'], ['PATCH', '/api/orders/:id/status', 'adminOnly'],
  ];
  const payment = [
    ['POST', '/api/payments/orders/:orderId/initiate', 'authUser'], ['POST', '/api/payments/orders/:orderId/charge', 'authUser'], ['GET', '/api/payments/orders/:orderId', 'authUser'], ['POST', '/api/payments/webhook'], ['POST', '/api/payments/:paymentId/refund', 'adminOnly'],
  ];
  const admin = [
    ['GET', '/api/admin/stats', 'adminOnly'], ['GET', '/api/admin/product-options', 'adminOnly'], ['GET', '/api/admin/search?q=', 'adminOnly'], ['GET', '/api/admin/reports/low-stock', 'adminOnly'], ['POST', '/api/chat  — Nong Hed AI agent (rate limited)'],
  ];
  let body = header('API Methods & Routes', 'Latest Express API surface · route → middleware → controller/service → MongoDB / external API', 'SYSTEM API MAP');
  body += `<path d="M120 245H2280" stroke="${C.lime}" stroke-width="4" opacity=".8"/><text x="70" y="250" fill="${C.lime}" font-family="Arial" font-size="18" font-weight="700">METHOD COLOUR</text>${['GET','POST','PATCH','DELETE'].map((m,i)=>`<rect x="${310+i*115}" y="230" width="75" height="28" rx="14" fill="${methodColor[m]}"/><text x="${347+i*115}" y="249" text-anchor="middle" font-family="Arial" font-size="13" font-weight="800" fill="#111014">${m}</text>`).join('')}<text x="805" y="250" fill="${C.muted}" font-family="Arial" font-size="15">authUser = signed-in cookie/JWT · adminOnly = authenticated administrator</text>`;
  body += routeBox(70, 295, 'AUTH & USERS', 'url(#purple)', auth);
  body += routeBox(840, 295, 'PRODUCTS, CATEGORIES & REVIEWS', 'url(#orange)', catalog);
  body += routeBox(1610, 295, 'CART & PROMOTIONS', 'url(#purple)', shopping);
  body += routeBox(70, 860, 'ORDERS & REAL-TIME EVENTS', 'url(#orange)', orders);
  body += routeBox(840, 860, 'PAYMENT', 'url(#purple)', payment);
  body += routeBox(1610, 860, 'ADMIN & AI SUPPORT', 'url(#orange)', admin);
  body += `<text x="70" y="1390" fill="${C.muted}" font-family="Arial" font-size="15">Route sources verified from server/app.js and server/routes/*.routes.js. Product operations write ProductChangeLog; chat agent reads current Product + Artist + Category data before answering.</text>`;
  write('01-api-method-routes-latest.svg', 2400, 1440, body);
}

function erDiagram() {
  const entities = [
    [80,310,360,310,'USER','url(#purple)', ['_id  PK', 'email / firstName / lastName / phone / address  [AES-256-GCM encrypted]', 'emailLookup  unique + indexed (HMAC lookup)', 'password  bcrypt hash (10 rounds)', 'role  customer | admin · employeeId', 'interests[] · paymentMethods[] · profilePicture · socialAccounts[]', 'createdAt · updatedAt']],
    [525,270,340,260,'ARTIST','url(#purple)', ['_id  PK', 'name  unique · realName', 'type  solo | band | group', 'bio · style · socialLinks[] · profilePic', 'createdAt · updatedAt']],
    [970,270,340,230,'CATEGORY','url(#orange)', ['_id  PK', 'name  unique · slug  unique', 'description', 'createdAt · updatedAt']],
    [750,620,440,370,'PRODUCT','url(#orange)', ['_id  PK', 'category  FK → Category  (required)', 'artist  FK → Artist  (optional)', 'name · description · price · quantity · date', 'tags[] incl. genre:<id> · national', 'style · medium · sizes[]', 'imageUrl · imageUrls[] · imageFit', 'createdAt · updatedAt']],
    [80,760,360,235,'CART','url(#orange)', ['_id  PK', 'userId  FK → User', 'items[]  embedded CartItem', '  productId FK → Product · variant_id · quantity', 'createdAt · updatedAt']],
    [80,1090,380,310,'ORDER','url(#orange)', ['_id  PK', 'userId  FK → User', 'items[]  embedded OrderItem snapshot', '  productId FK → Product · name · price · quantity', 'totalAmount · status · shippingProvider', 'shippingAddress · purchaseDate', 'createdAt · updatedAt']],
    [565,1110,360,270,'PAYMENT','url(#purple)', ['_id  PK', 'orderId  FK → Order', 'amount · method · status · provider', 'providerChargeId (indexed) · cardBrand', 'cardLastDigits · failureCode · failureMessage', 'createdAt · updatedAt']],
    [1310,690,350,225,'REVIEW','url(#purple)', ['_id  PK', 'userId  FK → User', 'productId  FK → Product', 'rating  1–5 · comment', 'createdAt · updatedAt']],
    [1760,300,420,260,'PRODUCT CHANGE LOG','url(#purple)', ['_id  PK', 'productId  FK → Product', 'actor  FK → User', 'action  created | updated | deleted', 'productName · before · after', 'createdAt only']],
    [1730,710,390,240,'PROMO CODE','url(#orange)', ['_id  PK', 'code  unique · discountPercent (0–1)', 'description · isActive · expiryDate', 'usageCount', 'createdAt · updatedAt', 'No current FK to Cart / Order']],
  ];
  let body = header('Database ER Diagram', 'MongoDB / Mongoose schemas · fields, embedded documents, encrypted personal data, and relationships', 'DATABASE MODEL');
  body += `<text x="70" y="248" fill="${C.lime}" font-family="Arial" font-size="17" font-weight="800">RELATIONSHIP LEGEND</text><text x="300" y="248" fill="${C.muted}" font-family="Arial" font-size="16">PK = primary identifier · FK = ObjectId reference · [ ] = stored encrypted at rest · arrays are embedded fields</text>`;
  body += entities.map(([x,y,w,h,t,c,l]) => card(x,y,w,h,t,c,l)).join('');
  const link = (points, label, labelAt) => {
    const width = Math.max(150, label.length * 8.4 + 28);
    const [labelX, labelY] = labelAt;
    const path = points.map((point, index) => `${index ? 'L' : 'M'}${point[0]} ${point[1]}`).join(' ');
    return `<path d="${path}" stroke="${C.lime}" stroke-width="3" fill="none" marker-end="url(#arrow)"/><rect x="${labelX - width / 2}" y="${labelY - 18}" width="${width}" height="25" rx="12" fill="${C.bg}"/><text x="${labelX}" y="${labelY}" text-anchor="middle" fill="${C.lime}" font-family="Arial" font-size="14" font-weight="700">${esc(label)}</text>`;
  };
  // Product is the catalogue bridge: each product belongs to one Category and can belong to one Artist.
  body += link([[695, 530], [695, 570], [870, 570], [870, 620]], 'Artist 1 : N Product', [780, 558]);
  body += link([[1140, 500], [1140, 570], [1070, 570], [1070, 620]], 'Category 1 : N Product', [1110, 558]);
  // A cart belongs to one user. Cart items hold the product ObjectId inside the Cart document.
  body += link([[320, 620], [320, 690], [260, 690], [260, 760]], 'User 1 : N Cart', [260, 678]);
  body += link([[440, 880], [590, 880], [590, 840], [750, 840]], 'Cart.items[] N : 1 Product', [592, 828]);
  // An order belongs to a user; order items retain a historical product/name/price snapshot.
  body += link([[170, 620], [35, 620], [35, 1245], [80, 1245]], 'User 1 : N Order', [115, 930]);
  body += link([[460, 1280], [690, 1280], [690, 1030], [970, 1030], [970, 990]], 'Order.items[].productId N : 1 Product', [850, 1018]);
  body += link([[460, 1245], [565, 1245]], 'Order 1 : N Payment attempts', [512, 1225]);
  // A review records exactly one author and one reviewed product.
  body += link([[1310, 760], [1240, 760], [1240, 180], [400, 180], [400, 310]], 'Review N : 1 User (author)', [820, 168]);
  body += link([[1310, 805], [1190, 805]], 'Product 1 : N Review', [1250, 792]);
  // Product changes are audited against both the product and the administrator/user that performed them.
  body += link([[1760, 400], [1500, 400], [1500, 1040], [1100, 1040], [1100, 990]], 'ProductChangeLog N : 1 Product', [1450, 1028]);
  body += link([[1760, 350], [1540, 350], [1540, 210], [400, 210], [400, 310]], 'ProductChangeLog N : 1 User (actor)', [1100, 198]);
  body += `<text x="70" y="1460" fill="${C.muted}" font-family="Arial" font-size="15">Seed baseline (server/seed.js): 15 users (9 customer / 6 admin), 5 categories, 14 artists/groups, 32 products, and 3 orders. Cart, Payment, Review, PromoCode and ProductChangeLog collections are cleared but not seeded.</text><text x="70" y="1490" fill="${C.muted}" font-family="Arial" font-size="15">*Payment references one Order; the schema does not enforce a unique orderId, therefore more than one payment attempt can technically be stored.</text>`;
  write('02-er-diagram-database-latest.svg', 2400, 1540, body);
}

function useCase() {
  const actor = (x,y,title,sub,color) => `<g><circle cx="${x}" cy="${y}" r="34" fill="${color}"/><circle cx="${x}" cy="${y-9}" r="9" fill="${C.dark}"/><path d="M${x-15} ${y+20}Q${x} ${y+3} ${x+15} ${y+20}V${y+25}H${x-15}Z" fill="${C.dark}"/><text x="${x}" y="${y+62}" text-anchor="middle" fill="${C.text}" font-family="Arial" font-size="18" font-weight="800">${title}</text><text x="${x}" y="${y+85}" text-anchor="middle" fill="${C.muted}" font-family="Arial" font-size="14">${sub}</text></g>`;
  const use = (x,y,w,label,color=C.purple) => `<g filter="url(#shadow)"><rect x="${x}" y="${y}" width="${w}" height="58" rx="29" fill="${C.panel}" stroke="${color}" stroke-width="2"/><text x="${x+w/2}" y="${y+36}" text-anchor="middle" fill="${C.text}" font-family="Arial" font-size="16" font-weight="700">${esc(label)}</text></g>`;
  const line = (x1,y1,x2,y2,label='') => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${C.lime}" stroke-width="2" opacity=".9"/>${label?`<text x="${(x1+x2)/2}" y="${(y1+y2)/2-6}" text-anchor="middle" fill="${C.lime}" font-family="Arial" font-size="12">${label}</text>`:''}`;
  let body = header('Use-case Diagram', 'Who can use the MERCHROOM system and what each actor can do in the latest implementation', 'SYSTEM USE CASES');
  body += `<rect x="350" y="245" width="1620" height="1140" rx="30" fill="${C.panel}" stroke="${C.lime}" stroke-width="3"/><text x="390" y="290" fill="${C.lime}" font-family="Arial" font-size="24" font-weight="800">MERCHROOM WEB APPLICATION</text>`;
  body += actor(130,470,'Visitor','not signed in',C.lime) + actor(130,920,'Customer','signed in',C.orange) + actor(2200,570,'Admin','signed in + role=admin',C.purple) + actor(2200,1040,'Payment Provider','Omise card / QR intent',C.cyan) + actor(2200,1220,'Gemini AI','Nong Hed agent',C.pink);
  const U = { browse:[470,390,270,'Browse / search products'], detail:[800,390,260,'View product + reviews'], account:[1130,390,250,'Register / login / logout'], profile:[1460,390,300,'Manage profile + password'], cart:[470,610,250,'Add / edit / clear cart'], promo:[800,610,250,'Validate promo code'], checkout:[1130,610,300,'Checkout + create order'], order:[1510,610,300,'View / cancel own order'], review:[440,830,310,'Create / edit / delete own review'], chat:[800,830,280,'Ask Nong Hed AI agent'], payment:[1130,830,300,'Pay by card / request PromptPay QR'], events:[1510,830,300,'Receive order SSE updates'], dashboard:[470,1070,300,'View dashboard / reports'], manageP:[830,1070,350,'Manage products + stock'], manageC:[1240,1070,330,'Manage categories / promos'], manageO:[1630,1070,280,'Manage orders + local refund'] };
  body += Object.values(U).map(([x,y,w,l])=>use(x,y,w,l, l.includes('Manage') || l.includes('dashboard') ? C.orange : C.purple)).join('');
  body += line(164,450,470,420)+line(164,470,800,420)+line(164,490,1130,420);
  body += line(164,900,470,640)+line(164,920,800,640)+line(164,940,1130,640)+line(164,960,1510,640)+line(164,980,470,860)+line(164,1000,800,860)+line(164,1020,1130,860)+line(164,1040,1510,860)+line(164,1060,1460,420);
  body += line(2165,550,470,1100)+line(2165,570,830,1100)+line(2165,590,1240,1100)+line(2165,610,1630,1100)+line(2165,630,1510,640);
  body += line(2165,1020,1280,860,'charge / QR intent')+line(2165,1040,1280,640,'payment status')+line(2165,1200,940,860,'function calls')+line(2165,1220,1510,860,'recommendations');
  body += `<text x="390" y="1340" fill="${C.muted}" font-family="Arial" font-size="14">Security boundary: protected routes require authUser; administrative operations additionally require adminOnly. The chatbot only gets product facts by querying the live product database.</text>`;
  write('03-use-case-diagram-latest.svg', 2400, 1440, body);
}

function sequenceDiagram() {
  const lanes = [['Customer',180,C.lime],['React UI',500,C.purple],['Express API',850,C.orange],['Controller / Service',1200,C.purple],['MongoDB',1570,C.cyan],['External APIs',1960,C.pink]];
  const lane = (name,x,color) => `<rect x="${x-110}" y="250" width="220" height="52" rx="18" fill="${color}"/><text x="${x}" y="283" text-anchor="middle" fill="${C.dark}" font-family="Arial" font-size="17" font-weight="800">${name}</text><path d="M${x} 305V2120" stroke="#696078" stroke-width="2" stroke-dasharray="8 8"/>`;
  const msg = (y,a,b,text,returning=false) => { const x1=lanes[a][1],x2=lanes[b][1]; return `<path d="M${x1} ${y}H${x2}" stroke="${returning?C.muted:C.lime}" stroke-width="2" ${returning?'stroke-dasharray="6 5"':''} marker-end="url(#arrow)"/><rect x="${Math.min(x1,x2)+10}" y="${y-22}" width="${Math.abs(x1-x2)-20}" height="20" rx="5" fill="${C.bg}"/><text x="${(x1+x2)/2}" y="${y-8}" text-anchor="middle" fill="${returning?C.muted:C.text}" font-family="Arial" font-size="14">${esc(text)}</text>`; };
  const section = (y,label,color) => `<text x="70" y="${y}" fill="${color}" font-family="Arial" font-size="20" font-weight="800">${label}</text><path d="M70 ${y+10}H2290" stroke="${color}" stroke-width="2" opacity=".7"/>`;
  let body = header('Sequence Diagram', 'Three essential live flows: browsing, checkout & payment, and Nong Hed agentic shopping assistance', 'SYSTEM SEQUENCES');
  body += lanes.map(([n,x,c])=>lane(n,x,c)).join('');
  body += section(350,'A. PUBLIC CATALOGUE & PRODUCT FILTER',C.lime);
  body += msg(390,0,1,'Open product page or click a genre')+msg(430,1,2,'GET /api/products?genre=&search=&category=')+msg(470,2,3,'listPublic()')+msg(510,3,4,'Product.find() + populate(artist, category)')+msg(550,4,3,'products + pagination',true)+msg(590,3,2,'200 JSON',true)+msg(630,2,1,'filtered catalogue',true)+msg(670,1,0,'render cards and filters',true);
  body += section(745,'B. CHECKOUT, PROMPTPAY QR AND CARD CHARGE',C.orange);
  body += msg(785,0,1,'Checkout with cart items + delivery details')+msg(825,1,2,'POST /api/orders  (auth cookie)')+msg(865,2,3,'authUser → createOrder()')+msg(905,3,4,'verify stock; create Order + Payment; decrement Product.quantity')+msg(945,4,3,'pending order / payment',true)+msg(985,1,2,'PromptPay: POST /payments/orders/:id/initiate')+msg(1025,2,3,'authUser → initiatePayment()')+msg(1065,3,4,'reuse/create pending Payment')+msg(1105,4,3,'payment record',true)+msg(1145,3,2,'qrCodeUrl + pending payment',true)+msg(1185,2,1,'render PromptPay QR',true)+msg(1225,1,2,'Card only: POST /payments/orders/:id/charge (token*)')+msg(1265,2,3,'authUser → verify ownership → chargeCard()')+msg(1305,3,5,'Omise charges.create() (server secret key)')+msg(1345,5,3,'paid / failed charge result',true)+msg(1385,3,4,'save Payment + Order.processing; publish SSE')+msg(1425,3,2,'payment response + order event',true)+msg(1465,2,1,'refresh account/order state',true)+msg(1505,1,0,'show payment + order status',true);
  body += section(1570,'C. NONG HED — AGENTIC PRODUCT ASSISTANT',C.pink);
  body += msg(1610,0,1,'Ask by artist, stock, size or budget')+msg(1650,1,2,'POST /api/chat  { message, history }')+msg(1690,2,3,'rate limit → reply()')+msg(1730,3,5,'Gemini generateContent() with function tools')+msg(1770,5,3,'function call: search_products / check_stock / recommend_by_budget',true)+msg(1810,3,4,'live Product.find() + populate()')+msg(1850,4,3,'verified product facts',true)+msg(1890,3,5,'function response → Thai answer',true)+msg(1930,5,3,'final response + selected product ids',true)+msg(1970,3,2,'answer, products, cartActions',true)+msg(2010,2,1,'chat product cards / Add to cart action',true)+msg(2050,1,0,'read answer or add confirmed item',true);
  body += `<text x="70" y="2110" fill="${C.muted}" font-family="Arial" font-size="15">*The backend accepts a valid Omise token, but the current React UI does not yet integrate Omise.js. PromptPay currently returns a QR intent and remains pending until payment status is updated. Gemini only receives controlled live-product tools.</text>`;
  write('04-sequence-diagram-latest.svg', 2400, 2160, body);
}

apiRoutes();
erDiagram();
useCase();
sequenceDiagram();
console.log('Created four latest system diagram SVG files in Docs/diagrams');
