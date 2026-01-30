import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface Props {
  message?: string;
  onRetry: () => void;
}

export const ErrorPage = ({ message = "심사 중 주방에 문제가 생겼습니다.", onRetry }: Props) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
    <AlertCircle size={80} color="#ef4444" style={{ marginBottom: '20px' }} />
    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '15px' }}>"고르게 익지 않았네요."</h1>
    <p style={{ fontSize: '1.2rem', color: '#888', marginBottom: '40px' }}>{message}</p>
    <button onClick={onRetry} style={{ padding: '15px 40px', borderRadius: '12px', backgroundColor: '#b91c1c', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
      <RefreshCcw size={20} /> 다시 시도하기
    </button>
  </motion.div>
);