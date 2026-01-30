import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  label: string;
  value: number;
  icon: React.ReactNode;
}

export const StatusRow = ({ label, value, icon }: Props) => (
  <div style={{ marginBottom: '25px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <div style={{ display: 'flex', gap: '10px', color: '#e5e7eb' }}>{icon} {label}</div>
      <div style={{ fontWeight: 'bold' }}>{value.toFixed(1)}%</div>
    </div>
    <div style={{ width: '100%', height: '10px', backgroundColor: '#111', borderRadius: '10px', overflow: 'hidden' }}>
      <motion.div 
        initial={{ width: 0 }} 
        animate={{ width: `${value}%` }} 
        transition={{ delay: 2.2, duration: 1.5, ease: "easeOut" }} 
        style={{ height: '100%', background: 'linear-gradient(90deg, #333, #fff)' }} 
      />
    </div>
  </div>
);