import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Code } from 'lucide-react';
import styles from '../App.module.css';
import { Role } from '../types/types';

interface SelectionPageProps {
  onSelect: (role: Role) => void;
}

export default function SelectionPage({ onSelect }: SelectionPageProps) {
  return (
    <motion.div key="selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.selection}>
      <h2 className={styles.selectionTitle}>"당신의 <span className={styles.underline}>주방(직군)</span>은 어디입니까?"</h2>
      <div className={styles.roleContainer}>
        <button onClick={() => onSelect('Frontend')} className={`${styles.roleBtn} ${styles.feBtn}`}>
          <ChefHat size={80} /><div className={styles.roleLabel}>Frontend</div>
        </button>
        <button onClick={() => onSelect('Backend')} className={`${styles.roleBtn} ${styles.beBtn}`}>
          <Code size={80} /><div className={styles.roleLabel}>Backend</div>
        </button>
      </div>
    </motion.div>
  );
}