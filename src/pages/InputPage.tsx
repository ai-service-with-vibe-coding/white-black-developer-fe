import React from 'react';
import { motion } from 'framer-motion';
import { LANGUAGES } from '../constants';

interface Props {
  userCode: string;
  setUserCode: (code: string) => void;
  selectedLang: typeof LANGUAGES[0];
  setSelectedLang: (lang: typeof LANGUAGES[0]) => void;
  onSubmit: () => void;
}

export const InputPage = ({ userCode, setUserCode, selectedLang, setSelectedLang, onSubmit }: Props) => {
  return (
    <motion.div key="input" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem' }}>"자신 있는 <span style={{ color: '#eab308' }}>코드</span>를 보여주세요."</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        {LANGUAGES.map(l => (
          <button 
            key={l.name} 
            onClick={() => setSelectedLang(l)} 
            style={{ padding: '8px 15px', borderRadius: '5px', backgroundColor: selectedLang.name === l.name ? '#b91c1c' : '#222', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            {l.name}
          </button>
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: '850px', backgroundColor: '#1e1e1e', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
        <div style={{ padding: '12px 20px', backgroundColor: '#252526', color: '#888', fontSize: '13px' }}>main.{selectedLang.ext}</div>
        <textarea 
          value={userCode} 
          onChange={(e) => setUserCode(e.target.value)} 
          placeholder="// 코드를 입력하세요..." 
          style={{ width: '100%', height: '420px', backgroundColor: 'transparent', color: '#d4d4d4', padding: '20px', border: 'none', outline: 'none', fontFamily: 'monospace', resize: 'none' }} 
        />
      </div>
      <button onClick={onSubmit} style={{ marginTop: '2.5rem', padding: '1.2rem 4rem', backgroundColor: '#b91c1c', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', border: 'none', color: 'white' }}>제출하고 심사받기</button>
    </motion.div>
  );
};