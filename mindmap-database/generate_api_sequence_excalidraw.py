import json
import random
import time
import uuid

OUT = "mindmap-database/merchroom-api-sequence-diagram.excalidraw"
NOW = int(time.time() * 1000)
random.seed(14)
elements = []
LANES = [(130, "Customer / Admin", "#496cab"), (360, "React Frontend", "#496cab"), (620, "Express Route + Middleware", "#7659a7"), (900, "Controller / Service", "#b56848"), (1160, "MongoDB", "#287b7d"), (1400, "Omise", "#8b6b2b")]


def ident(): return uuid.uuid4().hex[:20]

def base(kind, x, y, w, h):
    return {"id":ident(), "type":kind, "x":x, "y":y, "width":w, "height":h, "angle":0,
            "strokeColor":"#5b5660", "backgroundColor":"transparent", "fillStyle":"solid", "strokeWidth":1,
            "strokeStyle":"solid", "roughness":1, "opacity":100, "groupIds":[], "frameId":None,
            "roundness":{"type":3} if kind=="rectangle" else None, "seed":random.randint(1,2_000_000_000),
            "version":1, "versionNonce":random.randint(1,2_000_000_000), "isDeleted":False, "boundElements":[],
            "updated":NOW, "link":None, "locked":False}

def text(x, y, value, size=14, color="#1e1e1e", width=None):
    lines=value.split("\n"); e=base("text",x,y,width or max(90,max(len(s) for s in lines)*size*.55),len(lines)*size*1.25)
    e.update({"text":value,"originalText":value,"fontSize":size,"fontFamily":2,"textAlign":"left","verticalAlign":"top","lineHeight":1.25,"autoResize":False,"strokeColor":color,"roundness":None})
    elements.append(e); return e

def rect(x,y,w,h,label,color,fill):
    e=base("rectangle",x,y,w,h);e.update({"strokeColor":color,"backgroundColor":fill});elements.append(e);text(x+10,y+8,label,14,"#ffffff",w-20)

def line(x1,y1,x2,y2,dashed=False):
    e=base("line",x1,y1,x2-x1,y2-y1);e.update({"points":[[0,0],[x2-x1,y2-y1]],"lastCommittedPoint":None,"roundness":None,"strokeStyle":"dashed" if dashed else "solid","startBinding":None,"endBinding":None,"startArrowhead":None,"endArrowhead":None});elements.append(e)

def arrow(y, source, target, label, dashed=False):
    x1=LANES[source][0];x2=LANES[target][0];e=base("arrow",x1,y,x2-x1,0);e.update({"points":[[0,0],[x2-x1,0]],"lastCommittedPoint":None,"startBinding":None,"endBinding":None,"startArrowhead":None,"endArrowhead":"arrow","strokeStyle":"dashed" if dashed else "solid"});elements.append(e)
    text(min(x1,x2)+12,y-20,label,10,"#5b5660",abs(x2-x1)-24)

def divider(y, label, color):
    text(45,y-24,label,17,color,800);line(45,y,1515,y); 

def note(x,y,label,fill="#f0ecfc"):
    e=base("rectangle",x,y,220,30);e.update({"strokeColor":"#9a93a0","backgroundColor":fill});elements.append(e);text(x+8,y+8,label,10,"#28232a",204)

def main():
    text(45,35,"MERCHROOM - Detailed API Sequence Diagram",28,"#28232a",780)
    text(45,78,"Frontend -> Express routes/middleware -> controllers -> MongoDB, with Omise public token and backend charge",14,"#5b5660",950)
    for x,label,color in LANES:
        rect(x-90,120,180,36,label,color,color)
        line(x,156,x,1500,True)
    divider(185,"A. Browse products, categories, and Nong Hed chatbot catalog - public GET routes","#496cab")
    arrow(220,0,1,"Open /products, Home, or Nong Hed chatbot")
    arrow(265,1,2,"GET /api/products?limit=100  +  GET /api/categories")
    arrow(310,2,3,"listPublic / list categories")
    arrow(355,3,4,"find + populate artist/category")
    arrow(400,4,3,"products and categories",True)
    arrow(445,3,2,"200 JSON success",True)
    arrow(490,2,1,"200 JSON catalog",True)
    arrow(535,1,0,"Render product cards, filters, and chatbot recommendations",True)
    note(45,555,"Public product/category GET routes do not require authUser","#e9f4f4")
    divider(615,"B. Cart, checkout, Omise card payment, and real-time order update","#b56848")
    arrow(650,0,1,"Add item / submit checkout")
    arrow(695,1,2,"POST /api/cart/items  (cookie included)")
    arrow(740,2,3,"authUser -> addItem")
    arrow(785,3,4,"upsert Cart + populate Product")
    arrow(830,4,3,"cart document",True)
    arrow(875,1,2,"POST /api/orders  (items, shipping, paymentMethod)")
    arrow(920,2,3,"authUser -> createOrder")
    arrow(965,3,4,"validate stock; create Order + Payment; decrement Product stock")
    arrow(1010,4,3,"pending order and payment",True)
    arrow(1055,1,5,"Omise.js creates token with public key")
    arrow(1100,5,1,"card token only; no full card stored",True)
    arrow(1145,1,2,"POST /api/payments/orders/:id/charge  (token)")
    arrow(1190,2,3,"authUser -> chargeCard; verify order ownership")
    arrow(1235,3,5,"create charge using backend secret key")
    arrow(1280,5,3,"charge result / card brand + last digits",True)
    arrow(1325,3,4,"save Payment paid/failed; Order -> processing")
    arrow(1370,3,2,"publish SSE order event")
    arrow(1415,2,1,"charge response + AccountContext refresh",True)
    note(45,1440,"Write routes use authUser. Secret key is only used by the backend controller.","#fff0e9")
    divider(1500,"C. Admin management - protected CRUD and dashboard","#7659a7")
    arrow(1535,0,1,"Open Products / Categories / Orders / Dashboard")
    arrow(1580,1,2,"GET /api/admin/*  or  POST/PATCH/DELETE product/category")
    arrow(1625,2,3,"authUser + adminOnly -> controller/service")
    arrow(1670,3,4,"CRUD or aggregation query")
    arrow(1715,4,3,"JSON data",True)
    arrow(1760,3,2,"200 response",True)
    arrow(1805,2,1,"render dashboard or updated table",True)
    text(45,1855,"SSE endpoints: GET /api/orders/me/events for customers | GET /api/orders/events for admins",12,"#5b5660",820)
    data={"type":"excalidraw","version":2,"source":"https://excalidraw.com","elements":elements,"appState":{"gridSize":20,"viewBackgroundColor":"#fbfaf8"},"files":{}}
    with open(OUT,"w",encoding="utf-8") as f: json.dump(data,f,ensure_ascii=False,indent=2)

if __name__=="__main__": main()
