// ไฟล์: client/src/data/sections.js
// ข้อมูลคอนฟิกสำหรับแต่ละ Section ในหน้าแรก (Hotspots, หมวดหมู่, แบนเนอร์, รายการแนวเพลง, และบอร์ดนิทรรศการ)
// เรียกใช้งานโดย: Home.jsx และคอมโพเนนต์ย่อยในโฟลเดอร์ src/components/sections/*
import { products } from './product';
export { products };

const images = import.meta.glob('../../assets/{Thai,Eng,Heritage}/*.{png,PNG,jpg,JPG,jpeg,JPEG}', {
  eager: true,
  query: '?url',
  import: 'default',
});

function img(fileName) {
  const match = Object.keys(images).find((path) => path.endsWith(`/${fileName}`));
  return match ? images[match] : '';
}

import coverThaiBand from '../../assets/source-Image/thai band.png';
import coverMovie from '../../assets/source-Image/spider-villains-header.jpg';
import coverThaiHeritage from '../../assets/source-Image/thai heritage.jpeg';
import coverArtist from '../../assets/source-Image/arttist.jpg';

function prod(id) {
  return products.find((p) => p.id === id) || null;
}

export const heroHotspots = [
  { id: 'h1', productId: '07hr', size: 'sm', x: 'left-[calc(50%_+_274px)]', y: 'top-[136px]' },
  { id: 'h2', productId: '05hr', size: 'md', x: 'left-[calc(50%_-_479px)]', y: 'top-[330px]' },
  { id: 'h3', productId: '02hr', size: 'lg', x: 'left-[calc(50%_+_451px)]', y: 'top-[185px]' },
];

export const bestSellerIds = ['05hr', '02hr', '01hr', '04hr', '06hr', '07hr'];

export const categories = [
  {
    id: 'thai-band',
    title: 'Thai Band',
    cover: coverThaiBand,
    description: 'Authentic licensed merchandise from the artist to support the artist.',
  },
  {
    id: 'pop-culture',
    title: 'Movie',
    cover: coverMovie,
    description: 'Merch from movies, series, and global pop culture content.',
  },
  {
    id: 'thai-heritage',
    title: 'Thai Heritage',
    cover: coverThaiHeritage,
    description: 'Thai handicrafts from skilled artisans across the country.',
  },
  {
    id: 'artist',
    title: 'Artist',
    cover: coverArtist,
    description: 'Original works directly from independent artists.',
  },
];

export const genres = [
  { id: 'apparel',      label: 'Apparel',         image: img('15.Uncle-Ben_Classic-T.png') },
  { id: 'bags',         label: 'Bags',            image: img('21.A7X_Europe Tour Libad-Tote.png') },
  { id: 'collectibles', label: 'Collectibles',    image: img('11.Linkin-Park_Soundtrack Citrus Vinyl 2lp.png') },
  { id: 'home',         label: 'Home & Lifestyle', image: img('10.Justin-Bieber_Peaches Nalgene.png') },
  { id: 'accessories',  label: 'Accessories',     image: img('16.Uncle-Ben_Keychain.png') },
  { id: 'posters',      label: 'Posters',         image: img('12.Whal&Dolph_Poster.png') },
  { id: 'handicraft',   label: 'Handicraft',      image: img('1.พวงกุญแจลิเภา.png') },
];

export const landingItems = [
  {
    id: 'l1',
    title: 'Maroon 5 Asia Tour 2027',
    image: img('maroon-5-asia-tour-2027.png'),
    eventDetails: {
      heading: 'Maroon 5 ประกาศทัวร์เอเชีย 2027 เตรียมกลับมาเจอแฟนชาวไทย!',
      description: 'Maroon 5 ประกาศ Maroon 5 Asia Tour 2027 พร้อมกลับมาเปิดคอนเสิร์ตในประเทศไทย 9 กุมภาพันธ์ 2027 ที่ อิมแพ็ค อารีน่า จัดโดย Live Nation Tero หลังจากเดินหน้าทัวร์ Love Is Like เพื่อโปรโมตอัลบั้มใหม่ทั่วสหรัฐฯ พร้อมโชว์ที่ขายบัตรหมดอย่างรวดเร็วทั้ง Madison Square Garden และ The Forum วงยังมีกำหนดขึ้นเฮดไลน์ Hyde Park ที่ลอนดอน และ Rock in Rio ที่บราซิลในเดือนกันยายนนี้',
      ticketInfo: 'จำหน่ายบัตรทาง Ticketmaster Thailand',
      dateVenue: '9 ก.พ. 2027 | อิมแพ็ค อารีน่า',
    },
  },
  {
    id: 'l6',
    title: 'Zara Larsson Midnight Sun Tour in Bangkok',
    image: img('zara-larsson-midnight-sun-tour-2026.jpg'),
    eventDetails: {
      heading: 'Zara Larsson ประกาศทัวร์ “Midnight Sun Tour” เตรียมมาเจอแฟนชาวไทย!',
      description: 'Zara Larsson ป๊อปสตาร์สาวจากสวีเดน เตรียมระเบิดความสนุกกับ “Zara Larsson Midnight Sun Tour in Bangkok” วันที่ 1 พฤศจิกายน 2569 ที่ UOB LIVE, EMSPHERE ทัวร์ครั้งนี้จัดขึ้นเพื่อโปรโมตอัลบั้มชุดที่ 4 “Midnight Sun” ที่ถ่ายทอดเรื่องราวและตัวตนของซาร่าผ่านเพลงป๊อปสุดสนุก พร้อมผลงานจากการกลับมาร่วมงานกับ MNEK เจ้าของเพลงฮิต “Never Forget You”',
      ticketInfo: 'จำหน่ายบัตรทาง Ticketmaster Thailand',
      dateVenue: '1 พ.ย. 2569 | UOB LIVE, EMSPHERE',
    },
  },
  {
    id: 'l7',
    title: 'MILLI JAA EHH! ASIA TOUR 2026',
    image: img('milli-jaa-ehh-asia-tour-2026.png'),
    eventDetails: {
      heading: 'MILLI ประกาศเอเชียทัวร์ครั้งแรก! “MILLI JAA EHH! ASIA TOUR 2026”',
      description: 'MILLI (มิลลิ) แร็ปเปอร์สาวตัวจี๊ดจากค่าย YUPP! ประกาศทัวร์คอนเสิร์ตเดี่ยวระดับเอเชียครั้งแรกในชีวิต เตรียมเดินทางพบแฟน ๆ 8 ประเทศ ได้แก่ อินโดนีเซีย, ไทเป, มาเลเซีย, สิงคโปร์, ฮ่องกง, ฟิลิปปินส์, เกาหลีใต้ และประเทศไทย แฟนชาวไทยเตรียมเจอ MILLI 3 ตุลาคม 2569 ที่ สามย่าน มิตรทาวน์ จัดโดย Live Nation Tero ทัวร์ครั้งนี้ได้รับแรงบันดาลใจจากเพลง “JAA EHH” ในอัลบั้ม HEAVYWEIGHT พร้อมพลังความมันแบบจัดเต็มที่ MILLI เตรียมส่งต่อให้แฟน ๆ ทั่วเอเชีย',
      ticketInfo: 'จำหน่ายบัตรทาง Livenation Tero',
      dateVenue: '3 ต.ค. 2569 | สามย่าน มิตรทาวน์',
    },
  },
  {
    id: 'l8',
    title: 'Stray Kids World Tour <RUN IT> Bangkok',
    image: img('stray-kids-run-it-bangkok-2027.png'),
    eventDetails: {
      heading: 'Stray Kids เตรียมกลับมาเจอ STAY ไทยใน “Stray Kids World Tour <RUN IT>”',
      description: 'Stray Kids บอยกรุ๊ป 8 สมาชิกจาก JYP Entertainment เตรียมเดินหน้าสร้างปรากฏการณ์ระดับโลกอีกครั้ง กับเวิลด์ทัวร์ Stray Kids World Tour <RUN IT> พร้อมผลงานใหม่ THIS & THAT วงยังคงโดดเด่นจากการมีส่วนร่วมในการสร้างสรรค์ผลงาน โดยเฉพาะยูนิต 3RACHA — Bang Chan, Changbin และ HAN พร้อมเดินหน้าขึ้นเวทีเทศกาลดนตรีระดับโลกทั้ง Governors Ball และ Rock in Rio STAY ไทยเตรียมตัวให้พร้อม! Stray Kids World Tour <RUN IT BANGKOK> พบกัน 16–17 มกราคม 2570 ที่ อิมแพ็ค อารีน่า',
      ticketInfo: 'จำหน่ายบัตรทาง Ticketmaster Thailand',
      dateVenue: '16–17 ม.ค. 2570 | อิมแพ็ค อารีน่า · 2 รอบการแสดงในประเทศไทย',
    },
  },
  {
    id: 'l9',
    title: "yung kai — stay with the ocean, i'll find you: Asia 2026",
    image: img('yung-kai-asia-tour-2026.png'),
    eventDetails: {
      heading: 'yung kai ประกาศเอเชียทัวร์ เตรียมเจอแฟนไทยใน “stay with the ocean, i’ll find you: Asia 2026”',
      description: 'yung kai ศิลปินอินดี้ป๊อปชาวแคนาดา เจ้าของเพลงฮิต “blue” เตรียมเดินหน้าทัวร์เอเชียครั้งใหญ่ หลังประสบความสำเร็จจากการทัวร์ในอเมริกาเหนือ พร้อมปักหมุดกรุงเทพฯ 1 พฤศจิกายน 2569 ที่ Sphere Hall, Emsphere เอเชียทัวร์ครั้งนี้จะเดินทางผ่าน 9 เมือง ได้แก่ เซี่ยงไฮ้, กรุงเทพฯ, ฮ่องกง, โซล, สิงคโปร์, กัวลาลัมเปอร์, มะนิลา, ไทเป และโตเกียว พร้อมเพลงฮิตจากอัลบั้ม stay with the ocean, i’ll find you อย่าง “blue” และ “teach me how to dance”',
      ticketInfo: 'จำหน่ายบัตรทาง Ticketmaster Thailand',
      dateVenue: '1 พ.ย. 2569 | Sphere Hall, Emsphere',
    },
  },
  {
    id: 'l10', title: 'Young K Solo Tour <YOUNGEST> in BANGKOK', image: img('young-k-solo-tour-2026.png'),
    eventDetails: { heading: 'Young K เตรียมกลับมาเจอ My Day ไทยกับโซโล่ทัวร์ครั้งใหม่!', description: 'Young K นักร้อง นักแต่งเพลง และมือเบสจาก DAY6 เตรียมกลับมาเปิดโซโล่คอนเสิร์ตในประเทศไทยกับ “Young K Solo Tour <YOUNGEST> in BANGKOK” วันที่ 10 ตุลาคม 2569 ที่ สามย่าน มิตรทาวน์ ฮอลล์ จัดโดย Live Nation Tero ครั้งนี้ Young K กลับมาพร้อมโซโล่อัลบั้มใหม่ <YOUNGEST> และทัวร์ที่เริ่มต้นจากเกาหลีใต้ ก่อนเดินทางต่อมายัง กรุงเทพฯ ไทเป ฮ่องกง สิงคโปร์ มะนิลา และกัวลาลัมเปอร์', ticketInfo: 'จำหน่ายบัตรทาง Ticketmaster Thailand', dateVenue: '10 ต.ค. 2569 | สามย่าน มิตรทาวน์ ฮอลล์' },
  },
  {
    id: 'l11', title: 'Khalid — It’s Always Summer Somewhere Tour', image: img('khalid-asia-tour-2026.png'),
    eventDetails: { heading: 'Khalid คอนเฟิร์มมาไทย! เตรียมเจอกับ “It’s Always Summer Somewhere Tour”', description: 'Khalid ศิลปินระดับโลกเจ้าของเพลงฮิต “Young Dumb & Broke” เตรียมนำทัวร์ “It’s Always Summer Somewhere Tour” มาเปิดการแสดงในประเทศไทย 29 พฤศจิกายน 2569 ที่ UOB LIVE, EMSPHERE จัดโดย Live Nation Tero เจ้าของเพลงฮิตอย่าง “Location”, “Talk”, “Love Lies” และ “Young Dumb & Broke” พร้อมกลับมาสร้างค่ำคืนแห่งเสียงเพลงให้แฟนชาวไทย หลังเดินหน้าสร้างผลงานอย่างต่อเนื่อง รวมถึงอัลบั้มล่าสุด After The Sun Goes Down', ticketInfo: 'จำหน่ายบัตรทาง Ticketmaster Thailand', dateVenue: '29 พ.ย. 2569 | UOB LIVE, EMSPHERE' },
  },
];

export const roadToThaiArtist = {
  vinylProductId: '22en', 
  pop: [
    { id: 'p1', productId: '01en', rotate: -4.57 },
    { id: 'p2', productId: '08en', rotate: 3.55 },
    {
      id: 'p3',
      productId: '09en',
      overlayProductId: '16en',
      rotate: -1.84,
    },
  ],
  thai: [
    { id: 'p4', productId: '05th', rotate: 4.1, wide: true },
    { id: 'p5', productId: '04th', rotate: -4.25 },
    { id: 'p6', productId: '01th', rotate: -4.11 },
  ],
  handcraft: [
    img('1.พวงกุญแจลิเภา.png'),
    img('2.กระเป๋าสานผักตบ_รุ่นฟลอร่า_M_คละสี.png'),
    img('3.กระเป๋า chaksarn รุ่นMini Candy สีธรรมชาติ-ดำ.png'),
    img('4.ผ้าพันคอ ตะกอสีเหลือง.png'),
    img('5.ชุดแก้วช้างลายคราม.png'),
    img('6.Pride Clutch ป่านศรนารายณ์.png'),
  ],
};

export const categoryFilter = {
  'thai-band':     { suffix: 'th', label: 'Thai Band' },
  'pop-culture':   { suffix: 'en', label: 'Pop Culture' },
  'movie':         { suffix: 'en', label: 'Movie' },
  'thai-heritage': { suffix: 'hr', label: 'Thai Heritage' },
  'artist':        { suffix: null, label: 'Artist' },
};

export { prod, img };
