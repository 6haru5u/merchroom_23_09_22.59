// ไฟล์: client/src/data/team.js
// ข้อมูลทีมผู้พัฒนา (Development Team) และไอคอนช่องทางติดต่อ
// เรียกใช้งานโดย: pages/AboutUS.jsx สำหรับเรนเดอร์การ์ดแนะนำสมาชิกในทีม

// โหลด Asset ไอคอนสำหรับปุ่ม Social Media
import iconGithub from '../../assets/SVG-Logo/Github.png';
import iconLinkedin from '../../assets/SVG-Logo/LinkedIn.png';
import iconEmail from '../../assets/SVG-Logo/email.png';

// โหลดรูปถ่ายสมาชิกทีมจากโฟลเดอร์ assets/Development-Team-Image
import imgNitichaya from '../../assets/Development-Team-Image/Nitichaya G..jpg';
import imgTouchpol from '../../assets/Development-Team-Image/Touchpol L..png';
import imgChaowiwat from '../../assets/Development-Team-Image/Chaowiwat N..png';
import imgWichayaporn from '../../assets/Development-Team-Image/Wichayaporn R..png';
import imgCharnon from '../../assets/Development-Team-Image/Charnon P..png';

// Map ชื่อแพลตฟอร์มกับ asset icon เพื่อใช้เรนเดอร์ปุ่ม social บนการ์ด
// หมายเหตุ: key ต้องตรงกับชื่อ platform ในฟิลด์ links ของสมาชิกแต่ละคน
export const socialIcons = {
  GitHub: iconGithub,
  LinkedIn: iconLinkedin,
  Email: iconEmail,
};

// รายชื่อสมาชิกทีม บทบาทหน้าที่ รูปภาพ และลิงก์ช่องทางติดต่อ
// กรณีช่องทางไหนยังไม่มีลิงก์จริง ให้กำหนดเป็น '#' เพื่อป้องกันการเปิดหน้าว่าง
export const team = [
  {
    name: 'Nitichaya G.',
    role: 'UX/UI Design',
    image: imgNitichaya,
    links: {
      LinkedIn: 'https://www.linkedin.com/in/nitichaya-glangkarn-09a66b264',
      GitHub: 'https://github.com/nitichaya-gk',
      Email: 'nitichaya.forwork@gmail.com',
    },
  },
  {
    name: 'Touchpol L.',
    role: 'Database Developer',
    image: imgTouchpol,
    links: {
      LinkedIn: 'https://www.linkedin.com/in/touchpol-l-250b8640b',
      GitHub: 'https://github.com/Touchpol',
      Email: 'touchpol2003@gmail.com',
    },
  },
  {
    name: 'Chaowiwat N.',
    role: 'SCRUM Master',
    image: imgChaowiwat,
    links: {
      // ยังไม่มี LinkedIn จริง ใส่ '#' ไว้ก่อน
      LinkedIn: '#',
      GitHub: 'https://github.com/TonySmitch',
      Email: 'smitch.crystal@gmail.com',
    },
  },
  {
    name: 'Wichayaporn R.',
    role: 'Product Management',
    image: imgWichayaporn,
    links: {
      LinkedIn: 'https://www.linkedin.com/in/wichayaporn-rodjaroenwattana',
      GitHub: 'https://github.com/WichayaR',
      Email: 'wichaya.rod@gmail.com',
    },
  },
  {
    name: 'Charnon P.',
    role: 'QA Tester',
    image: imgCharnon,
    links: {
      LinkedIn: 'https://www.linkedin.com/in/charnonpkj',
      GitHub: 'https://github.com/6haru5u',
      Email: 'charnonpkj@gmail.com',
    },
  },
];
