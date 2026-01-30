import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Loading = () => {
  const [loadingText, setLoadingText] = useState("코드를 'Taste' 하는 중입니다...");

  useEffect(() => {
    const audio = new Audio('/tasting.mp3');
    audio.loop = true;
    audio.play().catch(() => {});
    const texts = ["음... 간이 좀 안 맞는데?", "변수명 식감이 쫄깃하네요.", "로직이 아주 타이트해요.", "가비지 컬렉터와 대화 중..."];
    let i = 0;
    const interval = setInterval(() => {
      setLoadingText(texts[i % texts.length]);
      i++;
    }, 2500);
    return () => { audio.pause(); clearInterval(interval); };
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={loadingContainerStyle}>
      <div style={circleWrapperStyle}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} style={spinningBorderStyle} />
        <div style={gifInnerStyle}><img src="/tasting.gif" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Loading" /></div>
      </div>
      <AnimatePresence mode="wait"><motion.h2 key={loadingText} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ fontSize: '2.2rem', fontStyle: 'italic', marginBottom: '15px' }}>"{loadingText}"</motion.h2></AnimatePresence>
      <p style={{ color: '#666', fontSize: '1.2rem' }}>심도 있는 분석을 위해 최대 1분이 소요될 수 있습니다.</p>
    </motion.div>
  );
};

// 스타일 객체는 별도 파일로 빼거나 하단에 정의
const loadingContainerStyle: React.CSSProperties = { position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' };
const circleWrapperStyle: React.CSSProperties = { position: 'relative', marginBottom: '40px' };
const spinningBorderStyle: React.CSSProperties = { position: 'absolute', inset: -15, borderRadius: '50%', border: '4px solid transparent', borderTopColor: '#b91c1c', borderBottomColor: '#b91c1c' };
const gifInnerStyle: React.CSSProperties = { width: '380px', height: '380px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #b91c1c', boxShadow: '0 0 50px rgba(185, 28, 28, 0.4)', position: 'relative' };