import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import SelectionPage from './pages/SelectionPage';
import InputPage from './pages/InputPage';
import { RESULTS } from './data/constants';
import { RefreshCcw } from 'lucide-react';

// 간단한 로딩 컴포넌트 (파일 따로 만들기 귀찮으실까봐 여기 넣었습니다)
function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [text, setText] = useState("코드를 'Taste' 하는 중...");

  // 멘트 롤링 애니메이션
  useEffect(() => {
    const texts = [
      "음... 간이 좀 안 맞는데?",
      "변수명 식감이 쫄깃하네요.",
      "로직이 아주 타이트해요.",
      "가비지 컬렉터와 대화 중...",
      "재료(라이브러리) 손질이 덜 됐어요."
    ];
    let step = 0;
    const interval = setInterval(() => {
      setText(texts[step % texts.length]);
      step++;
    }, 1500);
    const timer = setTimeout(() => onFinish(), 5000); // 5초 동안 즐기기
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [onFinish]);

  // 사운드 재생 (파일이 없으면 콘솔 에러만 나고 멈추지 않음)
  useEffect(() => {
    const audio = new Audio('/tasting.mp3'); 
    audio.volume = 0.5;
    audio.loop = true;
    audio.play().catch(() => {}); // 자동재생 막혀도 에러 무시
    return () => { audio.pause(); audio.currentTime = 0; };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
      style={{ position: 'fixed', inset: 0, background: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 50 }}
    >
      {/* 배경 GIF */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.6, zIndex: -1 }}>
         <img src="/tasting.gif" alt="loading" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.currentTarget.style.display='none'} />
      </div>
      <h2 style={{ color: 'white', fontSize: '2rem', textShadow: '0 4px 10px rgba(0,0,0,0.8)', fontStyle: 'italic', fontFamily: 'serif' }}>"{text}"</h2>
      {/* 로딩 바 */}
      <div style={{ width: '300px', height: '4px', background: 'rgba(255,255,255,0.2)', marginTop: '20px', borderRadius: '4px', overflow: 'hidden' }}>
        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 5, ease: "linear" }} style={{ height: '100%', background: '#b91c1c' }} />
      </div>
    </motion.div>
  );
}

// 결과 화면 컴포넌트 (간단 버전)
function ResultPage({ result, onRestart }: { result: any, onRestart: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      style={{ width: '100%', height: '100%', overflowY: 'auto', position: 'relative' }}
    >
      {/* 배경 */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
         <img src={result.resultImage} alt="bg" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(20px) brightness(0.25)', transform: 'scale(1.1)' }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '3rem' }}>
        
        {/* 왼쪽: 이미지 & 등급 (슬라이드 애니메이션) */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}
          style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
        >
          <img src={result.resultImage} alt="tier" style={{ width: '100%', maxWidth: '500px', borderRadius: '16px', boxShadow: '0 25px 50px rgba(0,0,0,0.6)', border: '4px solid rgba(255,255,255,0.1)' }} />
          <div className={result.color} style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: 900, marginTop: '2rem', textTransform: 'uppercase', lineHeight: 1 }}>{result.tier}</div>
        </motion.div>

        {/* 오른쪽: 심사평 (페이드인 딜레이) */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}
          style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <div style={{ borderBottom: '1px solid #555', paddingBottom: '10px', marginBottom: '20px', color: '#9ca3af', letterSpacing: '0.2em' }}>THE VERDICT</div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', color: '#f3f4f6', whiteSpace: 'pre-line', lineHeight: 1.4, fontFamily: 'serif', marginBottom: '3rem' }}>
            {result.comment}
          </h2>
          <button onClick={onRestart} style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'white', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '1rem 2rem', borderRadius: '50px', cursor: 'pointer', fontSize: '1.1rem', transition: '0.3s' }}>
            <RefreshCcw size={20}/> 다시 도전하기
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [gameState, setGameState] = useState('LANDING');
  const [result, setResult] = useState(RESULTS[0]);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'black', color: 'white', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      <AnimatePresence mode="wait">
        {gameState === 'LANDING' && <LandingPage onStart={() => setGameState('SELECTION')} />}
        {gameState === 'SELECTION' && <SelectionPage onSelect={() => setGameState('INPUT')} />}
        {gameState === 'INPUT' && <InputPage onBack={() => setGameState('SELECTION')} onSubmit={() => setGameState('LOADING')} />}
        {gameState === 'LOADING' && <LoadingScreen onFinish={() => {
            setResult(RESULTS[Math.floor(Math.random() * RESULTS.length)]); // 랜덤 결과
            setGameState('RESULT');
        }} />}
        {gameState === 'RESULT' && <ResultPage result={result} onRestart={() => setGameState('LANDING')} />}
      </AnimatePresence>
    </div>
  );
}