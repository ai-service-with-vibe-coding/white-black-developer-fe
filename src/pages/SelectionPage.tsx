import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Code } from 'lucide-react';

interface SelectionPageProps {
  onSelect: (role: 'Frontend' | 'Backend') => void;
}

export default function SelectionPage({ onSelect }: SelectionPageProps) {
  return (
    <motion.div 
      key="selection"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      <h2 style={{ fontSize: '2.5rem', fontFamily: 'serif', marginBottom: '3rem', color: '#e5e7eb' }}>
        "당신의 <span style={{ color: 'white', fontWeight: 'bold', borderBottom: '2px solid white' }}>주방(직군)</span>은 어디입니까?"
      </h2>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <button onClick={() => onSelect('Frontend')} className="group hover:scale-105 transition-transform duration-300" style={{ width: '16rem', height: '20rem', backgroundColor: 'white', color: 'black', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', cursor: 'pointer' }}>
          <div style={{ padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '9999px' }}><ChefHat size={48} color="black" /></div>
          <div style={{ textAlign: 'center' }}><span style={{ display: 'block', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>플레이팅의 마술사</span><span style={{ fontSize: '1.875rem', fontWeight: 900 }}>Frontend</span></div>
        </button>
        <button onClick={() => onSelect('Backend')} className="group hover:scale-105 transition-transform duration-300" style={{ width: '16rem', height: '20rem', backgroundColor: '#111827', border: '1px solid #374151', color: 'white', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', cursor: 'pointer' }}>
           <div style={{ padding: '1rem', backgroundColor: '#1f2937', borderRadius: '9999px' }}><Code size={48} color="white" /></div>
          <div style={{ textAlign: 'center' }}><span style={{ display: 'block', fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.25rem' }}>로직의 지배자</span><span style={{ fontSize: '1.875rem', fontWeight: 900 }}>Backend</span></div>
        </button>
      </div>
    </motion.div>
  );
}