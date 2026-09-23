// ไฟล์: client/src/main.jsx
// จุดเริ่มต้นหลักของโปรเจกต์ React (Entry Point)
// เรียกมาจาก: index.html ผ่านแท็ก script module
// หน้าที่: โหลดสไตล์หลัก index.css และเมานต์คอมโพเนนต์ App เข้ากับ DOM (#root)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
