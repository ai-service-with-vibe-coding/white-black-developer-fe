import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LANGUAGES } from '../data/constants';
import styles from './InputPage.module.css';

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
      className={styles.container}
    >
      <h2 className={styles.title}>
        "자신 있는 <span className={styles.highlight}>코드</span>를 보여주세요."
      </h2>

      <div className={styles.langContainer}>
        {LANGUAGES.map((lang) => (
          <button
            key={lang.name}
            onClick={() => setSelectedLang(lang)}
            className={styles.langBtn}
            style={{ backgroundColor: selectedLang.name === lang.name ? '#b91c1c' : '#1e1e1e', color: selectedLang.name === lang.name ? 'white' : '#888' }}
          >
            {lang.name}
          </button>
        ))}
      </div>

      <div className={styles.codeWindow}>
        <div className={styles.windowHeader}>
          <div className={styles.dot} style={{ backgroundColor: '#ff5f56' }} />
          <div className={styles.dot} style={{ backgroundColor: '#ffbd2e' }} />
          <div className={styles.dot} style={{ backgroundColor: '#27c93f' }} />
          <span className={styles.filename}>main.{selectedLang.ext}</span>
        </div>
        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          placeholder={`// ${selectedLang.name} 코드를 여기에 붙여넣거나 작성하세요...`}
          className={styles.textArea}
        />
      </div>

      <div className={styles.footer}>
        <button onClick={onBack} className={styles.backBtn}>뒤로가기</button>
        <button
          onClick={() => {
            if (userCode.trim().length < 50) { alert("코드가 너무 짧습니다!"); return; }
            onSubmit(userCode, selectedLang.name);
          }}
          className={styles.submitBtn}
        >
          제출하고 심사받기
        </button>
      </div>
    </motion.div>
  );
}