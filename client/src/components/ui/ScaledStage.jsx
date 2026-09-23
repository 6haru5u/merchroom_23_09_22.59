import { useEffect, useRef, useState } from 'react';

// ไฟล์: client/src/components/ui/ScaledStage.jsx
// คอมโพเนนต์คุมสเกลผืนผ้าใบ (Canvas Scaler) สำหรับส่วนที่มีการวาง layout แบบ absolute coordinate เป๊ะๆ
// เรียกมาจาก: RoadToThaiArtist.jsx (ใช้ครอบบอร์ดแสดงงานขนาด 1320x815px)
// หน้าที่: ย่อขนาดคอนเทนต์ข้างในลงตามสัดส่วนหน้าจอจริงด้วย CSS transform scale
export default function ScaledStage({ width = 1320, height = 815, children, className = '' }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // ฟังก์ชันคำนวณสเกล: เทียบความกว้างจริงของหน้าจอกับความกว้างของงานดีไซน์ (1320px)
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // ย่อลงได้ถ้าจอกว้างน้อยกว่า width แต่จะไม่ขยายใหญ่เกินขนาดจริง (scale <= 1)
        setScale(Math.min(1, containerWidth / width));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  return (
    <div ref={containerRef} className={`w-full overflow-hidden ${className}`}>
      {/* 
        ปรับ scale คอนเทนต์ข้างใน และคูณ scale เข้ากับความสูง (height * scale) 
        เพื่อป้องกันไม่ให้เกิดช่องว่างด้านล่างหลังย่อขนาด
      */}
      <div
        style={{
          width: `${width}px`,
          height: `${height * scale}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  );
}
