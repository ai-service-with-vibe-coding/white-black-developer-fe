import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../App.module.css';

export default function LoadingPage() {
    const [loadingText, setLoadingText] = useState("코드를 'Taste' 하는 중입니다...");
    useEffect(() => {
        const audio = new Audio('/tasting.mp3'); audio.loop = true;
        audio.play().catch(() => { });
        const texts = ["음... 간이 좀 안 맞는데?", "변수명 식감이 쫄깃하네요.", "로직이 아주 타이트해요.", "가비지 컬렉터와 대화 중..."];
        let i = 0;
        const interval = setInterval(() => { setLoadingText(texts[i % texts.length]); i++; }, 2500);
        return () => { audio.pause(); clearInterval(interval); };
    }, []);
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.loadingContainer}>
            <div className={styles.loadingCircleWrapper}>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className={styles.loadingSpinner} />
                <div className={styles.loadingImage}>
                    <img src="/tasting.gif" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Loading" />
                </div>
            </div>
            <AnimatePresence mode="wait"><motion.h2 key={loadingText} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className={styles.loadingText}>"{loadingText}"</motion.h2></AnimatePresence>
            <p className={styles.loadingSubText}>심도 있는 분석을 위해 최대 1분이 소요될 수 있습니다.</p>
        </motion.div>
    );
}
