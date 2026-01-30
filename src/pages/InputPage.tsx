import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LANGUAGES } from '../data/constants';
import styles from './InputPage.module.css';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/themes/prism-dark.css'; // Dark theme

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

      <div className={styles.codeWindow}>
        <div className={styles.windowHeader}>
          <div className={styles.MacButtons}>
            <div className={styles.dot} style={{ backgroundColor: '#ff5f56' }} />
            <div className={styles.dot} style={{ backgroundColor: '#ffbd2e' }} />
            <div className={styles.dot} style={{ backgroundColor: '#27c93f' }} />
          </div>
          <div className={styles.selectorContainer}>
            <select
              value={selectedLang.name}
              onChange={(e) => {
                const lang = LANGUAGES.find(l => l.name === e.target.value);
                if (lang) setSelectedLang(lang);
              }}
              className={styles.langSelect}
            >
              {LANGUAGES.map(lang => (
                <option key={lang.name} value={lang.name}>{lang.ext}</option>
              ))}
            </select>
            <span className={styles.langNameDisplay}>({selectedLang.name})</span>
          </div>
        </div>
        <div className={styles.editorContainer}>
          <Editor
            value={userCode}
            onValueChange={code => setUserCode(code)}
            highlight={code => {
              const langMap: Record<string, any> = {
                'JavaScript': languages.javascript,
                'TypeScript': languages.typescript,
                'React': languages.tsx || languages.typescript, // Fallback
                'Java': languages.java,
                'Python': languages.python,
                'C++': languages.cpp,
                'Go': languages.go,
                'Rust': languages.rust
              };
              const grammar = langMap[selectedLang.name] || languages.clike;
              return highlight(code, grammar, selectedLang.name);
            }}
            padding={16}
            className={styles.textArea}
            textareaClassName={styles.editorTextarea}
            placeholder={`// ${selectedLang.name} 코드를 여기에 붙여넣거나 작성하세요...`}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              minHeight: '100%',
            }}
          />
        </div>
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