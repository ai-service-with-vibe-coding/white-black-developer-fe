import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Code } from 'lucide-react';
import type { Role } from '../types';

interface Props {
  onSelect: (role: Role) => void;
}

export const SelectionPage = ({ onSelect }: Props) => {
  return (
    <motion.div key="selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>"당신의 <span style={{ borderBottom: '3px solid white', paddingBottom: '5px' }}>주방(직군)</span>은 어디입니까?"</h2>
      <div style={{ display: 'flex', gap: '3rem' }}>
        <button onClick={() => onSelect('Frontend')} style={selectionButtonStyle}>
          <ChefHat size={80} />
          <div style={{ fontSize: '2.2rem', fontWeight: 900, marginTop: '20px' }}>Frontend</div>
        </button>
        <button onClick={() => onSelect('Backend')} style={{ ...selectionButtonStyle, backgroundColor: '#111', color: 'white', border: '2px solid #333' }}>
          <Code size={80} />
          <div style={{ fontSize: '2.2rem', fontWeight: 900, marginTop: '20px' }}>Backend</div>
        </button>
      </div>
    </motion.div>
  );
};

const selectionButtonStyle: React.CSSProperties = {
  width: '18rem', height: '22rem', backgroundColor: 'white', color: 'black', borderRadius: '1.5rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: '0.3s', border: 'none'
};