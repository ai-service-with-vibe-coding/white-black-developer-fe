import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 👇👇👇 [핵심] 이 줄이 없으면 배경이 하얗게 나오고 스타일이 다 깨집니다!
import './index.css'
// 👆👆👆

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)