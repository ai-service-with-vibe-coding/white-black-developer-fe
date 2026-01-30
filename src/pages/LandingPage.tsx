import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface Props {
  onNext: () => void;
}

export const LandingPage = ({ onNext }: Props) => {
  return (
    <motion.div 
      key="landing" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src="/main-bg.png" alt="Main Background" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }} />
      </div>
      
      <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem', marginTop: '30vh' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <Terminal size={24} color="#9ca3af" />
          <span style={{ color: '#9ca3af', letterSpacing: '0.4em', fontSize: '14px', fontWeight: 'bold' }}>CODE CLASS WAR</span>
        </motion.div>
        
        <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} style={{ fontSize: '5rem', fontWeight: 900, marginBottom: '1rem' }}>흑백개발자</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ fontSize: '1.8rem', color: '#d1d5db', fontStyle: 'italic', marginBottom: '3rem' }}>"당신의 코드는... 익었습니까?"</motion.p>
        
        <motion.button 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          onClick={onNext} 
          style={{ padding: '1.2rem 4.5rem', backgroundColor: '#b91c1c', color: 'white', fontSize: '1.6rem', fontWeight: 'bold', borderRadius: '0.5rem', border: '2px solid #ef4444', cursor: 'pointer', boxShadow: '0 0 30px rgba(185, 28, 28, 0.5)' }}
        >
          계급 전쟁 참가하기
        </motion.button>
      </div>
    </motion.div>
  );
};