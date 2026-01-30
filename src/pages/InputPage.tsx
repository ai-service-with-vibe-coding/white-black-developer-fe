import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LANGUAGES } from '../data/constants';

interface InputPageProps {
  onSubmit: (code: string, language: string) => void;
  onBack: () => void;
}

export default function InputPage({ onSubmit, onBack }: InputPageProps) {
  const [userCode, setUserCode] = useState('');
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);

  return (
    <motion.div
      key="input"
      initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
    >
      <h2 style={{ fontSize: '2rem', fontFamily: 'serif', marginBottom: '1.5rem', color: 'white', textAlign: 'center' }}>
        "자신 있는 <span style={{ color: '#eab308' }}>코드</span>를 보여주세요."
      </h2>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px' }}>
        {LANGUAGES.map((lang) => (
          <button
            key={lang.name}
            onClick={() => setSelectedLang(lang)}
            style={{ padding: '6px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', border: '1px solid #333', backgroundColor: selectedLang.name === lang.name ? '#b91c1c' : '#1e1e1e', color: selectedLang.name === lang.name ? 'white' : '#888', transition: 'all 0.2s' }}
          >
            {lang.name}
          </button>
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: '800px', backgroundColor: '#1e1e1e', borderRadius: '8px', border: '1px solid #333', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
        <div style={{ padding: '10px 16px', backgroundColor: '#252526', display: 'flex', gap: '8px', alignItems: 'center', borderBottom: '1px solid #333' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
          <span style={{ marginLeft: '12px', fontSize: '12px', color: '#888', fontFamily: 'monospace' }}>main.{selectedLang.ext}</span>
        </div>
        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          placeholder={`// ${selectedLang.name} 코드를 여기에 붙여넣거나 작성하세요...`}
          style={{ width: '100%', height: '400px', backgroundColor: '#1e1e1e', color: '#d4d4d4', border: 'none', padding: '16px', fontFamily: 'monospace', fontSize: '14px', resize: 'none', outline: 'none', lineHeight: '1.5' }}
        />
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button onClick={onBack} style={{ padding: '0.8rem 2rem', color: '#9ca3af', background: 'none', border: '1px solid #374151', borderRadius: '9999px', cursor: 'pointer' }}>뒤로가기</button>
        <button
          onClick={() => {
            if (userCode.trim().length < 50) { alert("코드가 너무 짧습니다!"); return; }
            onSubmit(userCode, selectedLang.name);
          }}
          style={{ padding: '0.8rem 3rem', backgroundColor: '#b91c1c', color: 'white', fontWeight: 'bold', borderRadius: '9999px', cursor: 'pointer', boxShadow: '0 0 15px rgba(220, 38, 38, 0.5)' }}
        >
          제출하고 심사받기
        </button>
      </div>
    </motion.div>
  );
}