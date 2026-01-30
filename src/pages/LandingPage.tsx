import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import styles from '../App.module.css';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.landing}>
      <div className={styles.bgContainer}>
        <img src="/main-bg.png" alt="Main Background" className={styles.bgImage} />
        <div className={styles.bgGradient} />
      </div>
      <div className={styles.landingContent}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className={styles.headerRow}>
          <Terminal size={24} color="#9ca3af" />
          <span className={styles.headerText}>CODE CLASS WAR</span>
        </motion.div>
        <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className={styles.title}>흑백개발자</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className={styles.subtitle}>"당신의 코드는... 익었습니까?"</motion.p>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onStart} className={styles.startBtn}>계급 전쟁 참가하기</motion.button>
      </div>
    </motion.div>
  );
}