from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A3, landscape
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas

OUT = 'output/pdf/merchroom-project-architecture.pdf'
W, H = landscape(A3)
PAPER, INK, MUTED, LINE = HexColor('#FBFAF8'), HexColor('#28232A'), HexColor('#665E69'), HexColor('#BDB5BE')
COLORS = {'client': HexColor('#6951D6'), 'server': HexColor('#E56B45'), 'data': HexColor('#277D77'), 'external': HexColor('#AF7A21')}

def box(c, x, y, w, h, title, lines, tone):
    color = COLORS[tone]
    c.setFillColor(white); c.setStrokeColor(LINE); c.setLineWidth(1); c.roundRect(x, y, w, h, 12, fill=1, stroke=1)
    c.setFillColor(color); c.roundRect(x, y+h-30, w, 30, 12, fill=1, stroke=0); c.rect(x, y+h-30, w, 12, fill=1, stroke=0)
    c.setFillColor(white); c.setFont('Helvetica-Bold', 11); c.drawString(x+11, y+h-19, title)
    c.setFillColor(INK); c.setFont('Helvetica', 8.5); line_y = y+h-46
    for line in lines:
        c.drawString(x+11, line_y, line); line_y -= 14

def arrow(c, x1, y1, x2, y2, label):
    import math
    c.setStrokeColor(MUTED); c.setFillColor(MUTED); c.setLineWidth(1.2); c.line(x1,y1,x2,y2)
    angle = math.atan2(y2-y1,x2-x1); size = 7
    c.saveState(); c.translate(x2,y2); c.rotate(angle*180/math.pi); c.line(0,0,-size,size/2); c.line(0,0,-size,-size/2); c.restoreState()
    if label:
        mx,my=(x1+x2)/2,(y1+y2)/2; width=stringWidth(label,'Helvetica',7.5)+9
        c.setFillColor(PAPER); c.roundRect(mx-width/2,my-7,width,14,4,fill=1,stroke=0); c.setFillColor(MUTED); c.setFont('Helvetica',7.5); c.drawCentredString(mx,my-2,label)

def group(c, x, y, w, h, title, tone):
    c.setStrokeColor(COLORS[tone]); c.setLineWidth(1.1); c.setDash(4,3); c.roundRect(x,y,w,h,16,stroke=1,fill=0); c.setDash()
    c.setFillColor(COLORS[tone]); c.setFont('Helvetica-Bold',10); c.drawString(x+12,y+h-15,title)

def main():
    c=canvas.Canvas(OUT,pagesize=landscape(A3)); c.setTitle('MERCHROOM Project Architecture')
    c.setFillColor(PAPER); c.rect(0,0,W,H,fill=1,stroke=0)
    c.setFillColor(INK); c.setFont('Helvetica-Bold',24); c.drawString(48,790,'MERCHROOM - Project Overall Architecture')
    c.setFillColor(MUTED); c.setFont('Helvetica',10); c.drawString(48,771,'Current implementation reconstructed from React, Express routes/controllers, Mongoose schemas, Omise and Gemini integrations')
    group(c,40,135,302,590,'1. Browser / Client Application','client')
    group(c,390,135,390,590,'2. Application Server','server')
    group(c,830,375,310,350,'3. Data and External Services','data')
    box(c,70,585,240,88,'User roles',['Customer: browse, cart, checkout','Admin: products, categories, orders'], 'client')
    box(c,70,450,240,102,'React SPA (Vite)',['Pages + React Router','AuthProvider + CartProvider','Nong Hed Chatbot UI'], 'client')
    box(c,70,285,240,125,'Client API modules',['auth, products, categories','cart, orders, payments, dashboard','chat (history + cart actions)'], 'client')
    box(c,70,175,240,72,'Vite dev proxy / deployment',['/api -> Express server','cookie credentials enabled'], 'client')
    box(c,425,585,320,88,'Express HTTP API',['CORS, JSON body, cookie parser','authUser / adminOnly middleware','global error handler'], 'server')
    box(c,425,424,320,122,'Route -> Controller layer',['auth, users, products, categories','cart, orders, payments, reviews','promos, admin, chat'], 'server')
    box(c,425,246,320,138,'Business operations',['Order validation + stock update + SSE','Omise charge / webhook / refunds','Gemini agent tools: search, stock, budget, cart'], 'server')
    box(c,865,600,240,78,'MongoDB (Mongoose)',['Users, catalog, carts, orders','payments, reviews, audit logs'], 'data')
    box(c,865,484,240,78,'Omise payment gateway',['token / charge / webhook','card payment status'], 'external')
    box(c,865,368,240,78,'Gemini API',['LLM reasoning + function calls','never receives database write access'], 'external')
    box(c,865,190,240,120,'Operational storage / events',['HTTP-only auth cookie','Order events: Server-Sent Events','Product images: URL arrays in Product'], 'data')
    arrow(c,310,629,425,629,'HTTPS / browser request')
    arrow(c,310,336,425,476,'REST JSON / credentials')
    arrow(c,585,424,585,384,'controller calls service logic')
    arrow(c,745,630,865,639,'Mongoose queries')
    arrow(c,745,306,865,523,'payment API / webhook')
    arrow(c,745,286,865,407,'agent function calling')
    arrow(c,865,229,745,246,'SSE / payment result / cart action')
    c.setFillColor(MUTED); c.setFont('Helvetica',8); c.drawRightString(1130,28,'Solid arrows = implemented runtime flows. Dashed containers = deployment/logical boundaries.')
    c.save()

if __name__ == '__main__': main()
