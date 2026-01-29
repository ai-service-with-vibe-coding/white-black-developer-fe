import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <motion.div 
      key="landing"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
         <img src="/main-bg.png" alt="Main Background" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }} />
      </div>

      <div style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex items-center gap-2 mb-4">
          <Terminal size={20} color="#9ca3af" />
          <span style={{ color: '#9ca3af', letterSpacing: '0.3em', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>Code Class War</span>
        </motion.div>
        <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} style={{ fontSize: '4rem', fontWeight: 900, letterSpacing: '-0.05em', color: 'white', textShadow: '0 5px 5px rgba(0,0,0,0.8)', marginBottom: '0.5rem', lineHeight: 1 }}>흑백개발자</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ fontSize: '1.5rem', fontFamily: 'serif', fontStyle: 'italic', color: '#d1d5db', textShadow: '0 2px 4px rgba(0,0,0,0.5)', marginBottom: '2rem' }}>"당신의 코드는... 익었습니까?"</motion.p>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} onClick={onStart} style={{ padding: '1rem 3rem', backgroundColor: '#b91c1c', color: 'white', fontSize: '1.5rem', fontWeight: 'bold', borderRadius: '0.25rem', border: '2px solid #ef4444', textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 0 20px rgba(255,0,0,0.5)', cursor: 'pointer' }}>계급 전쟁 참가하기</motion.button>
      </div>
    </motion.div>
  );
}