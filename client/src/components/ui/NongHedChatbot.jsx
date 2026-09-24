import { MessageCircle, Send, ShoppingCart, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getPublicProducts } from '../../api/products.api';
import { chatWithNongHed } from '../../api/chat.api';
import { useCart } from '../../context/CartContext';
import { landingItems, products as localProducts } from '../../data/sections';
import chatbotLogo from '../../../assets/Merchroom-Logo/4.svg';

const taylorProducts = [
  { name: "BABY, THAT'S SHOW BUSINESS CROPPED TEE", detail: "เสื้อยืดเอวลอยสีงาช้าง ลาย The Life of a Showgirl", sizes: 'S, M, L, XL', price: '฿1,308.94', aliases: ['baby', 'cropped', 'show business'] },
  { name: "THE LIFE OF A SHOWGIRL IT'S FRIGHTENING BLACK CREWNECK SWEATSHIRT", detail: 'เสื้อสเวตเตอร์แขนยาวสีดำ คอกลม สกรีนโลโก้และลาย Taylor Swift', sizes: 'S, M, L, XL', price: '฿2,126.80', aliases: ['frightening', 'black crewneck'] },
  { name: 'THE LIFE OF A SHOWGIRL CREWNECK SWEATSHIRT BOX SET', detail: 'บ็อกเซ็ตเสื้อสเวตเตอร์รุ่น Limited Edition ลายกราฟิก Tracklist พิเศษ', sizes: 'Box Set (Free size / เซ็ตสะสม)', price: '฿2,126.80', aliases: ['box set', 'crewneck sweatshirt'] },
  { name: 'THE TORTURED POETS DEPARTMENT GRAY PHOTO LONG SLEEVE T-SHIRT', detail: 'เสื้อยืดแขนยาวสีเทา สกรีนภาพโฟโต้จากอัลบั้ม TTPD พร้อม Tracklist', sizes: 'S, M, L, XL', price: '฿1,800.00', aliases: ['long sleeve', 'gray photo', 'ttpd'] },
  { name: 'THE TORTURED POETS DEPARTMENT GRAY HOODIE', detail: 'เสื้อฮู้ดดี้สีเทาควันบุหรี่ กระเป๋าหน้า สกรีนกราฟิกอัลบั้ม TTPD', sizes: 'S, M, L, XL', price: '฿1,800.00', aliases: ['hoodie', 'gray hoodie'] },
];

const heritageProducts = [
  { name: 'พวงกุญแจลิเภา', detail: 'งานหัตถกรรมจักสานถักทอจากย่านลิเภา ภูมิปัญญางานสานประณีต', sizes: null, price: '฿600.00', aliases: ['ลิเภา', 'พวงกุญแจ'] },
  { name: 'กระเป๋าสานผักตบ รุ่นฟลอร่า M คละสี', detail: 'กระเป๋าสานผักตบชวาธรรมชาติ บุผ้าฝ้ายลายดอกไม้ด้านใน', sizes: null, price: '฿3,933.00', aliases: ['ผักตบ', 'ฟลอร่า', 'flora'] },
  { name: 'กระเป๋า chaksarn รุ่น Mini Candy (สีธรรมชาติ-ดำ)', detail: 'กระเป๋าแฟชั่นร่วมสมัย ผสานงานเสื่อกกธรรมชาติกับดีไซน์โมเดิร์น', sizes: null, price: '฿1,000.00', aliases: ['chaksarn', 'mini candy'] },
  { name: 'ผ้าพันคอ 4 ตะขอ', detail: 'ผ้าฝ้ายทอมือย้อมสีธรรมชาติ ลาย 4 ตะขอ นุ่มอบอุ่น', sizes: null, price: '฿960.00', aliases: ['ผ้าพันคอ', '4 ตะขอ'] },
  { name: 'ชุดแก้วช้างลายคราม', detail: 'ชุดแก้วเซรามิกลายครามรูปช้าง เอกลักษณ์ศิลปะไทย', sizes: null, price: '฿816.00', aliases: ['แก้วช้าง', 'ลายคราม'] },
  { name: 'โคมไฟเซรามิก', detail: 'โคมไฟเซรามิกลวดลายไทยโมเดิร์น สร้างบรรยากาศอบอุ่น', sizes: null, price: '฿6,999.00', aliases: ['โคมไฟ', 'เซรามิก'] },
];

const allProducts = [...taylorProducts, ...heritageProducts];
const welcome = 'สวัสดีค่ะคุณลูกค้า! น้องเห็ดยินดีต้อนรับสู่ Merchroom นะคะ ✨ คุณลูกค้าต้องการให้น้องเห็ดดูแลด้านใด สามารถกดตัวเลือก หรือพิมพ์บอกน้องเห็ดได้เลยนะคะ 😊';
const heritageStory = 'ยินดีต้อนรับสู่มุม Thai Heritage ค่ะคุณลูกค้า 🍃 สินค้าในหมวดนี้คือความภาคภูมิใจของ Merchroom ที่ผสานภูมิปัญญาท้องถิ่นเข้ากับดีไซน์ร่วมสมัย ชิ้นงานแต่ละชิ้นสร้างสรรค์โดยช่างฝีมือกว่า 18 ชุมชนในไทย เช่น งานทอมือผ้าแพรวาจากบ้านโพน จ.กาฬสินธุ์ ที่ใช้เวลาทอด้วยมือกว่า 2 สัปดาห์ต่อผืน รวมถึงงานจักสานระดับสากลจาก SACIT และ CHAKSARN ค่ะ';

function ProductList({ products }) {
  const { addToCart } = useCart();
  const [addedProducts, setAddedProducts] = useState([]);

  const addRecommendedProduct = (product) => {
    if (!product.id) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      imageUrl: product.imageUrl,
      brand: product.artist,
    }, 1);
    setAddedProducts((current) => (current.includes(product.id) ? current : [...current, product.id]));
  };

  return (
    <ul className="mt-2 space-y-2">
      {products.map((product) => (
        <li key={product.id || product.name} className="rounded-lg bg-white/70 p-2 text-[11px] leading-4 text-ink">
          <div className="flex gap-2">
            {product.image && <img src={product.image} alt={product.name} className="size-16 shrink-0 rounded-md object-cover" loading="lazy" />}
            <div className="min-w-0">
              <p className="font-semibold">{product.name}</p>
              <p>{product.detail}</p>
              {product.sizes && <p>ไซส์: {product.sizes}</p>}
              <p className="font-bold text-primary">{product.displayPrice || product.price}</p>
            </div>
          </div>
          {product.id && (
            <button type="button" onClick={() => addRecommendedProduct(product)} className="mt-2 flex w-full items-center justify-center gap-1 rounded-md bg-primary px-2 py-1.5 text-[11px] font-semibold text-white transition hover:bg-primary-deep">
              <ShoppingCart className="size-3.5" />
              {addedProducts.includes(product.id) ? 'Added to cart' : 'Add to cart'}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

function ConcertList({ events }) {
  return (
    <ul className="mt-2 space-y-2">
      {events.map((event) => (
        <li key={event.id} className="rounded-lg bg-white/70 p-2 text-[11px] leading-4 text-ink">
          <div className="flex gap-2">
            {event.image && <img src={event.image} alt={event.title} className="size-16 shrink-0 rounded-md object-cover" loading="lazy" />}
            <div className="min-w-0">
              <p className="font-semibold">{event.title}</p>
              <p className="mt-0.5 text-primary">{event.eventDetails.dateVenue}</p>
              <p>{event.eventDetails.ticketInfo}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

const formatDatabaseProduct = (product) => {
  const localProduct = localProducts.find((item) => item.name.toLowerCase() === product.name.toLowerCase());
  const image = product.image || product.imageUrl || product.imageUrls?.[0] || localProduct?.image || '';
  return {
  id: product._id,
  name: product.name,
  detail: product.description || 'รายละเอียดสินค้าอยู่ในหน้าสินค้าค่ะ',
  sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes || null,
  price: Number(product.price || 0),
  displayPrice: `฿${Number(product.price || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  image,
  imageUrl: image,
  artist: typeof product.artist === 'object' ? product.artist?.name : '',
  category: typeof product.category === 'object' ? product.category?.name : '',
  };
};

function getReply(input, databaseProducts) {
  const normalized = input.toLowerCase();
  const catalog = databaseProducts.map(formatDatabaseProduct);
  const withDatabaseIdentity = (products) => products.map((product) => (
    catalog.find((item) => item.name.toLowerCase() === product.name.toLowerCase()) || product
  ));
  const databaseProduct = catalog.find((item) => normalized.includes(item.name.toLowerCase()));
  const artistMatch = catalog.find((item) => {
    if (!item.artist) return false;
    const artistName = item.artist.toLowerCase();
    return normalized.includes(artistName)
      || artistName.split(/\s+/).some((term) => term.length >= 3 && normalized.includes(term));
  })?.artist;

  if (databaseProduct) {
    const sizeText = databaseProduct.sizes
      ? `ไซส์ที่มีในระบบคือ ${databaseProduct.sizes} ค่ะ`
      : 'สินค้าชิ้นนี้ไม่มีตัวเลือกไซส์ในข้อมูลระบบค่ะ';
    return { text: `น้องเห็ดพบรายการนี้ค่ะคุณลูกค้า 💛\n${sizeText}\nสินค้าและราคานี้มาจากฐานข้อมูลปัจจุบันของร้านค่ะ`, products: [databaseProduct] };
  }
  if (artistMatch) {
    const artistProducts = catalog.filter((item) => item.artist === artistMatch);
    return { text: `น้องเห็ดพบสินค้าของ ${artistMatch} ในระบบค่ะคุณลูกค้า ✨\nเลือกดูรายการที่สนใจได้เลยนะคะ`, products: artistProducts };
  }
  if (normalized.includes('แนะนำคอนเสิร์ต') || normalized.includes('คอนเสิร์ต') || normalized.includes('concert') || normalized.includes('งานแสดง')) {
    return {
      text: 'น้องเห็ดคัดคอนเสิร์ตที่น่าสนใจจาก The Room Talks มาให้คุณลูกค้าค่ะ 🎵',
      events: landingItems.slice(0, 3),
    };
  }
  if (normalized.includes('แนะนำของขวัญ') || normalized.includes('ของขวัญ') || normalized.includes('gift')) {
    if (!catalog.length) {
      return { text: 'น้องเห็ดกำลังเชื่อมต่อรายการสินค้าอยู่ค่ะคุณลูกค้า รอสักครู่แล้วลองกดแนะนำของขวัญอีกครั้งนะคะ 😊' };
    }
    const giftIdeas = [...catalog]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(3, catalog.length));
    return {
      text: 'น้องเห็ดสุ่มไอเดียของขวัญจากสินค้าในระบบมาให้คุณลูกค้าแล้วค่ะ 🎁',
      products: giftIdeas,
    };
  }
  const product = allProducts.find((item) => item.aliases.some((alias) => normalized.includes(alias.toLowerCase())) || normalized.includes(item.name.toLowerCase()));

  if (product) {
    const sizeText = product.sizes
      ? `ไซส์ที่มีข้อมูลในระบบคือ ${product.sizes} ค่ะ`
      : 'สินค้าชิ้นนี้ไม่มีตัวเลือกไซส์ในข้อมูลระบบค่ะ';
    return { text: `น้องเห็ดพบรายการนี้ค่ะคุณลูกค้า 💛\n${sizeText}\nหากต้องการเช็คจำนวนคงเหลือแบบ real-time น้องเห็ดแนะนำให้คุณลูกค้าดูสถานะในหน้าสินค้านะคะ`, products: withDatabaseIdentity([product]) };
  }
  if (normalized.includes('taylor') || normalized.includes('swift')) {
    return { text: 'สำหรับสินค้าของ Taylor Swift ตอนนี้น้องเห็ดมีรายการตามนี้เลยค่ะ ✨\nคุณลูกค้าสนใจชิ้นไหน หรืออยากให้ช่วยเช็คไซส์ชิ้นไหนเป็นพิเศษไหมคะ?', products: withDatabaseIdentity(taylorProducts) };
  }
  if (normalized.includes('thai heritage') || normalized.includes('heritage') || normalized.includes('หัตถกรรม') || normalized.includes('งานคราฟต์')) {
    return { text: `${heritageStory}\n\nคุณลูกค้ากำลังมองหาแฟชั่นส่วนตัว หรือของขวัญของฝากน่าประทับใจดีคะ?`, products: withDatabaseIdentity(heritageProducts) };
  }
  if (normalized.includes('สวัสดี') || normalized.includes('hello') || normalized.includes('hi')) {
    return { text: welcome };
  }
  return { text: 'ขณะนี้น้องเห็ดยังไม่มีข้อมูลสินค้ารายการนี้ในระบบค่ะ แต่คุณลูกค้าสามารถเลือกดูสินค้าอื่นๆ ในร้านแทนได้นะคะ' };
}

export default function NongHedChatbot() {
  const { addToCart } = useCart();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'bot', text: welcome }]);
  const [databaseProducts, setDatabaseProducts] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const messageEndRef = useRef(null);
  const quickPrompts = useMemo(() => ['Taylor Swift', 'Thai Heritage', 'แนะนำคอนเสิร์ต', 'แนะนำของขวัญ'], []);

  useEffect(() => {
    let active = true;
    getPublicProducts({ limit: 100 })
      .then((response) => {
        if (active) setDatabaseProducts(response.products || []);
      })
      .catch(() => {
        // The fixed catalog remains available when the API is temporarily offline.
      });
    return () => { active = false; };
  }, []);

  const send = async (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;
    setMessages((current) => [...current, { role: 'user', text: trimmed }]);
    setInput('');
    const isCuratedPrompt = ['แนะนำคอนเสิร์ต', 'แนะนำของขวัญ'].includes(trimmed);
    if (isCuratedPrompt) {
      setMessages((current) => [...current, { role: 'bot', ...getReply(trimmed, databaseProducts) }]);
      window.setTimeout(() => messageEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);
      return;
    }
    setIsSending(true);
    try {
      const history = messages.slice(-6).map((message) => ({
        role: message.role === 'user' ? 'user' : 'assistant',
        text: message.historyText || message.text,
      }));
      const response = await chatWithNongHed(trimmed, history);
      const recommendedProducts = (response.products || []).map(formatDatabaseProduct);
      (response.cartActions || []).forEach((action) => {
        if (action.type !== 'add_to_cart' || !action.product) return;
        const product = formatDatabaseProduct(action.product);
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          imageUrl: product.imageUrl,
          brand: product.artist,
        }, action.quantity || 1);
      });
      setMessages((current) => [...current, {
        role: 'bot',
        text: response.answer,
        historyText: `${response.answer}\nรายการสินค้าที่เพิ่งแสดง: ${recommendedProducts.map((product) => product.name).join(', ')}`,
        products: recommendedProducts,
      }]);
    } catch (error) {
      if (error.status === 429 || error.status === 503 || error.code === 'AI_TEMPORARILY_UNAVAILABLE') {
        setMessages((current) => [...current, {
          role: 'bot',
          text: 'น้องเห็ดขออภัยค่ะคุณลูกค้า ตอนนี้ระบบ AI มีผู้ใช้งานจำนวนมาก กรุณาลองใหม่อีกครั้งในอีกสักครู่นะคะ 😊',
        }]);
      } else {
        // Preserve basic catalog assistance if the chat service is unavailable.
        setMessages((current) => [...current, { role: 'bot', ...getReply(trimmed, databaseProducts) }]);
      }
    } finally {
      setIsSending(false);
      window.setTimeout(() => messageEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] font-sans" aria-live="polite">
      {open && (
        <section className="mb-3 flex h-[min(560px,70vh)] w-[min(360px,calc(100vw-32px))] flex-col overflow-hidden rounded-[22px] border border-ink/10 bg-cream shadow-[0_18px_45px_rgba(32,30,31,0.24)]" role="dialog" aria-label="แชทกับน้องเห็ด">
          <header className="flex items-center justify-between bg-brand-gradient px-4 py-3 text-white">
            <div className="flex items-center gap-2"><img src={chatbotLogo} alt="น้องเห็ด" className="size-9 shrink-0 object-contain" /><div><p className="text-sm font-semibold">น้องเห็ด</p><p className="text-[10px] text-white/75">ผู้ช่วยช้อปปิ้ง MERCHROOM</p></div></div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-1 text-white hover:bg-white/15" aria-label="ปิดแชท"><X className="size-5" /></button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={message.role === 'user' ? 'ml-10 rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-xs leading-5 text-white' : 'mr-5 rounded-2xl rounded-bl-sm bg-[#e6e3ff] px-3 py-2 text-xs leading-5 text-ink'}>
                <p className="whitespace-pre-line">{message.text}</p>
                {message.products && <ProductList products={message.products} />}
                {message.events && <ConcertList events={message.events} />}
              </div>
            ))}
            {isSending && <div className="mr-20 rounded-2xl rounded-bl-sm bg-[#e6e3ff] px-3 py-2 text-xs text-ink">น้องเห็ดกำลังค้นหาข้อมูลให้คุณลูกค้าค่ะ…</div>}
            <div ref={messageEndRef} />
          </div>
          <div className="border-t border-ink/10 bg-white px-3 py-2">
            <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
              {quickPrompts.map((prompt) => <button key={prompt} type="button" disabled={isSending} onClick={() => send(prompt)} className="shrink-0 rounded-full border border-violet/25 bg-violet/10 px-2.5 py-1 text-[10px] font-medium text-violet hover:bg-violet/20 disabled:opacity-50">{prompt}</button>)}
            </div>
            <form className="flex items-center gap-2" onSubmit={(event) => { event.preventDefault(); send(); }}>
              <input disabled={isSending} value={input} onChange={(event) => setInput(event.target.value)} placeholder="พิมพ์ถามน้องเห็ด..." className="min-w-0 flex-1 rounded-full border border-ink/15 px-3 py-2 text-xs outline-none focus:border-violet disabled:opacity-50" aria-label="ข้อความถึงน้องเห็ด" />
              <button disabled={isSending} type="submit" className="grid size-9 place-items-center rounded-full bg-primary text-white hover:bg-primary-deep disabled:opacity-50" aria-label="ส่งข้อความ"><Send className="size-4" /></button>
            </form>
          </div>
        </section>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto flex size-14 items-center justify-center rounded-full bg-highlight text-ink shadow-[0_8px_25px_rgba(32,30,31,0.28)] transition hover:scale-105" aria-label={open ? 'ปิดแชทน้องเห็ด' : 'เปิดแชทน้องเห็ด'}>
        {open ? <X className="size-6" /> : <MessageCircle className="size-7" />}
      </button>
    </div>
  );
}
