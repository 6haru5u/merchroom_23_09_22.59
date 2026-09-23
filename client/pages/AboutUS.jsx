// ไฟล์: client/pages/AboutUS.jsx
// หน้าแนะนำทีมงานและเรื่องราวของ Merchroom (About Us)
// เรียกมาจาก: App.jsx ผ่าน Route path="/about" หรือคลิกเมนู About Us บน Navbar
// แหล่งรูปภาพทีมงาน: โฟลเดอร์ assets/Development-Team-Image/
import { Zap, BadgeCheck, HeartHandshake } from 'lucide-react';
import Container from '../src/components/ui/Container';
import SectionHeading from '../src/components/ui/SectionHeading';
import Logo from '../src/components/ui/Logo';

// Import TeamImage, BG, LOGO
import bgThaiSilk from '../assets/source-Image/BG-Thai silk.jpg';
import imgNitichaya from '../assets/Development-Team-Image/Nitichaya G..jpg';
import imgTouchpol from '../assets/Development-Team-Image/Touchpol L..png';
import imgChaowiwat from '../assets/Development-Team-Image/Chaowiwat N..png';
import imgWichayaporn from '../assets/Development-Team-Image/Wichayaporn R..png';
import imgCharnon from '../assets/Development-Team-Image/Charnon P..png';

import iconGithub from '../assets/SVG-Logo/Github.png';
import iconLinkedin from '../assets/SVG-Logo/LinkedIn.png';
import iconEmail from '../assets/SVG-Logo/email.png';

// Icon Social
const socialLinks = {
  GitHub: iconGithub,
  LinkedIn: iconLinkedin,
  Email: iconEmail,
};

// Team Member
const team = [
  {
    name: 'Nitichaya G.',
    role: 'UX/UI Design',
    image: imgNitichaya,
    links: {
      LinkedIn: 'https://www.linkedin.com/in/nitichaya-glangkarn-09a66b264/',
      GitHub: 'https://github.com/nitichaya-gk/',
      Email: 'nitichaya.forwork@gmail.com',
    },
  },
  {
    name: 'Touchpol L.',
    role: 'Database Developer',
    image: imgTouchpol,
    links: {
      LinkedIn: 'https://www.linkedin.com/in/touchpol-l-250b8640b/',
      GitHub: 'https://github.com/Touchpol/',
      Email: 'touchpol2003@gmail.com',
    },
  },
  {
    name: 'Chaowiwat N.',
    role: 'SCRUM Master',
    image: imgChaowiwat,
    links: {
      LinkedIn: 'https://www.linkedin.com/in/chaowiwat-nantapatsiri-94610538b/',
      GitHub: 'https://github.com/TonySmitch/',
      Email: 'smitch.crystal@gmail.com',
    },
  },
  {
    name: 'Wichayaporn R.',
    role: 'Product Management',
    image: imgWichayaporn,
    links: {
      LinkedIn: 'https://www.linkedin.com/in/wichayaporn-rodjaroenwattana/',
      GitHub: 'https://github.com/WichayaR/',
      Email: 'wichaya.rod@gmail.com',
    },
  },
  {
    name: 'Charnon P.',
    role: 'QA Tester',
    image: imgCharnon,
    links: {
      LinkedIn: 'https://www.linkedin.com/in/charnonpkj/',
      GitHub: 'https://github.com/6haru5u/',
      Email: 'charnonpkj@gmail.com',
    },
  },
];

// main value 3 ข้อของ Merchroom
const values = [
  {
    icon: Zap,
    title: 'Zero Crash Experience',
    description: 'Engineered for high-traffic sales, ensuring you never miss out.',
  },
  {
    icon: BadgeCheck,
    title: '100% Authentic',
    description: 'Partnered strictly with official artists and verified sellers.',
  },
  {
    icon: HeartHandshake,
    title: 'Built by Real Fans',
    description: "Created by people who've queued for the artists they love.",
  },
];

// หน้า About Us: แสดงวิสัยทัศน์ คุณค่าของแบรนด์ และแนะนำทีมพัฒนา 5 คน
export default function About() {
  return (
    <div>
      {/* 1. Hero Banner พร้อมภาพพื้นหลังผ้าไหมไทย */}
      <section className="relative flex h-60 items-center justify-center overflow-hidden md:h-72">
        <img
          src={bgThaiSilk}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-violet/40" />
        <h1 className="relative text-4xl font-bold text-white md:text-5xl">About Us</h1>
      </section>

      {/* 2. ส่วนเรื่องราว Story of Merchroom และการ์ด Core Values 3 ใบ */}
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] lg:gap-16">
            <div>
              <SectionHeading eyebrow="Story of Merchroom" title="The Minds Behind" font="sans" />
              <Logo tone="dark" size="lg" className="mt-4" />
            </div>
            <div className="grid gap-6 self-center text-base leading-relaxed text-black/70 md:grid-cols-2">
              <p>
                We started as real fans who know the pain of site crashes during limited-edition
                drops and the constant worry of buying counterfeit goods. So, we built Merchroom
                ourselves.
              </p>
              <p>
                Every feature on our platform isn&apos;t just following a trend—it&apos;s
                purpose-built to solve the real frustrations of both fans and artists.
              </p>
            </div>
          </div>

          
          <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-center gap-4 rounded-card bg-white p-4 shadow-card md:items-center md:gap-5 md:p-5"
              >
                <span
                  className={`flex size-13 shrink-0 items-center justify-center rounded-pill ${
                    title === '100% Authentic' ? 'bg-violet' : 'bg-primary'
                  }`}
                >
                  <Icon className="size-6 text-white" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-ink">{title}</h3>
                  <p className="mt-1 text-sm leading-snug text-black/70">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      
      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Vision & Mission"
            title={
              <>
                What We Strive to Be
                <br className="hidden md:block" /> &amp; What Drives Us Every Day
              </>
            }
            align="center"
            font="sans"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
            <div className="rounded-card bg-violet p-8 md:p-10">
              <span className="inline-flex h-10 items-center rounded-pill border border-white/70 bg-white/15 px-5 text-sm font-semibold uppercase tracking-wide text-white">
                Our Vision
              </span>
              <p className="mt-6 text-xl font-semibold leading-relaxed text-white md:text-2xl">
                &ldquo;The global <span className="text-highlight">home</span> for authentic{' '}
                <span className="text-highlight">artist</span> merch, trusted by fans
                worldwide.&rdquo;
              </p>
            </div>

            <div className="rounded-card bg-white p-8 shadow-card md:p-10">
              <span className="inline-flex h-10 items-center rounded-pill bg-primary/10 px-5 text-sm font-semibold uppercase tracking-wide text-primary">
                Our Mission
              </span>
              <p className="mt-6 text-xl font-semibold leading-relaxed text-ink md:text-2xl">
                &ldquo; <span className="text-violet">Connecting</span> artists and fans globally
                with secure technology, seamless drops, and authentic{' '}
                <span className="text-violet">passion</span>.&rdquo;
              </p>
            </div>
          </div>
        </Container>
      </section>

      
      <section className="bg-white py-14 md:py-20">
        <Container>
          <SectionHeading
            eyebrow="Development Team"
            title="Five Full-Stack developers , One mission"
            align="center"
            font="sans"
          />

          <div className="mt-10 grid grid-cols-2 justify-items-center gap-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {team.map(({ name, role, image, links }) => (
              <div key={name} className="w-full max-w-52 rounded-card bg-cream p-3 text-center">
                <img
                  src={image}
                  alt={`ภาพถ่ายของ ${name}`}
                  className="aspect-3/4 w-full rounded-t-btn rounded-b-[28px] object-cover"
                />
                
                <div className="relative z-10 mx-auto -mt-4 w-[88%] rounded-btn bg-primary px-2 py-2 text-white shadow-card">
                  <p className="text-sm font-bold leading-tight">{name}</p>
                  <p className="mt-0.5 text-xs leading-tight opacity-90">{role}</p>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2.5 pb-2">
                  {Object.entries(links).map(([label, href]) => {
                    const iconSrc = socialLinks[label];
                    const isPlaceholder = href === '#';
                    const finalHref = isPlaceholder
                      ? '#'
                      : label === 'Email'
                        ? `mailto:${href}`
                        : href;
                    return (
                      <a
                        key={label}
                        href={finalHref}
                        target={isPlaceholder ? undefined : '_blank'}
                        rel={isPlaceholder ? undefined : 'noopener noreferrer'}
                        aria-label={`${label} ของ ${name}`}
                        className="flex size-7 items-center justify-center rounded-pill bg-white shadow-sm transition hover:bg-primary"
                      >
                        <img src={iconSrc} alt="" className="size-3.5" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}