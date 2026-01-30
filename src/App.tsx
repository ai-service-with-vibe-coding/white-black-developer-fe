import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Code, Terminal, Utensils, RefreshCcw, ShieldCheck, Gauge, Zap, FileCode, CheckCircle2, MessageSquare, Lightbulb } from 'lucide-react';

import { useStreamAnalysis } from './hooks/useStreamAnalysis';
import InputPage from './pages/InputPage';
import styles from './App.module.css';

// --- 백엔드 API 규격 기반 타입 정의 ---
export interface BackendResponse {
  level: number;
  level_title: string;
  verdict: string;
  overall_score: number;
  scores: {
    security: number;
    quality: number;
    best_practices: number;
    complexity: number;
    documentation: number;
  };
  code_review: string;
  persona_review: string;
  suggestions: string[];
  language: string;
  line_count: number;
}

type GameState = 'LANDING' | 'SELECTION' | 'INPUT' | 'LOADING' | 'RESULT';
type Role = 'Frontend' | 'Backend' | null;



// 등급별 비주얼 설정 (level 값에 따라 매핑)
const TIER_CONFIG: Record<number, { image: string, color: string }> = {
  5: { image: '/images/result_lv5.png', color: '#ffffff' },
  4: { image: '/images/result_lv4.png', color: '#d1d5db' },
  3: { image: '/images/result_lv3.png', color: '#60a5fa' },
  2: { image: '/images/result_lv2.png', color: '#4ade80' },
  1: { image: '/images/result_lv1.png', color: '#f87171' },
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>('LANDING');
  const [role, setRole] = useState<Role>(null);


  const { analysis: analysisResult, personaReview, isLoading, isStreaming, analyze } = useStreamAnalysis();

  // isLoading 상태 변경 감지하여 GameState 변경
  useEffect(() => {
    if (isLoading) {
      setGameState('LOADING');
    } else if (analysisResult) {
      setGameState('RESULT');
    }
  }, [isLoading, analysisResult]);

  const resetGame = () => {
    setGameState('LANDING');
    setRole(null);
  };

  const handleStartAnalysis = (code: string, language: string) => {
    analyze(code, language);
  };

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">

        {/* A. Landing & B. Selection & C. Input (기존 기능 유지) */}
        {gameState === 'LANDING' && (
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
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setGameState('SELECTION')} className={styles.startBtn}>계급 전쟁 참가하기</motion.button>
            </div>
          </motion.div>
        )}

        {gameState === 'SELECTION' && (
          <motion.div key="selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.selection}>
            <h2 className={styles.selectionTitle}>"당신의 <span className={styles.underline}>주방(직군)</span>은 어디입니까?"</h2>
            <div className={styles.roleContainer}>
              <button onClick={() => { setRole('Frontend'); setGameState('INPUT'); }} className={`${styles.roleBtn} ${styles.feBtn}`}>
                <ChefHat size={80} /><div className={styles.roleLabel}>Frontend</div>
              </button>
              <button onClick={() => { setRole('Backend'); setGameState('INPUT'); }} className={`${styles.roleBtn} ${styles.beBtn}`}>
                <Code size={80} /><div className={styles.roleLabel}>Backend</div>
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'INPUT' && (
          <InputPage onSubmit={handleStartAnalysis} onBack={() => { setGameState('SELECTION'); setRole(null); }} />
        )}

        {gameState === 'LOADING' && <LandingLoading />}

        {/* --- E. 결과 발표 (스크롤 최적화 버전) --- */}
        {gameState === 'RESULT' && analysisResult && (
          <motion.div key="result" className={styles.resultContainer}>
            <div className={styles.resultBg}>
              <img src={TIER_CONFIG[analysisResult.level]?.image} alt="bg" className={styles.bgImage} style={{ filter: 'blur(35px) brightness(0.2)' }} />
            </div>
            <div className={styles.resultContent}>

              {/* [LEFT] 이미지 + 티어 (고정형 레이아웃) */}
              <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} className={styles.resultLeft}>
                <div className={styles.tierImageWrapper} style={{ boxShadow: `0 0 50px ${TIER_CONFIG[analysisResult.level]?.color}44`, border: `1px solid ${TIER_CONFIG[analysisResult.level]?.color}88` }}>
                  <img src={TIER_CONFIG[analysisResult.level]?.image} className={styles.bgImage} alt="Result" />
                </div>
                <h2 style={{ fontSize: '1.5rem', color: '#aaa', marginBottom: '10px' }}>{analysisResult.level_title}</h2>
                <h1 style={{ fontSize: '4rem', fontWeight: 900, textShadow: `0 0 20px ${TIER_CONFIG[analysisResult.level]?.color}`, marginBottom: '20px' }}>{analysisResult.verdict}</h1>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: TIER_CONFIG[analysisResult.level]?.color }}>{analysisResult.overall_score}<span style={{ fontSize: '1.5rem' }}>pt</span></div>
              </motion.div>

              {/* [RIGHT] 상세 보고서 (내부 스크롤 가능) */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className={styles.resultRight}>

                {/* 1. 스테이터스 바 */}
                <div className={styles.resultBox}>
                  <h3 className={styles.boxHeader}><Gauge size={20} /> 분석 지표</h3>
                  <StatusRow label="보안" value={analysisResult.scores.security} icon={<ShieldCheck color="#ef4444" />} />
                  <StatusRow label="품질" value={analysisResult.scores.quality} icon={<Gauge color="#3b82f6" />} />
                  <StatusRow label="모범 사례" value={analysisResult.scores.best_practices} icon={<CheckCircle2 color="#10b981" />} />
                  <StatusRow label="복잡도" value={analysisResult.scores.complexity} icon={<Zap color="#f59e0b" />} />
                  <StatusRow label="문서화" value={analysisResult.scores.documentation} icon={<FileCode color="#8b5cf6" />} />
                </div>

                {/* 2. 페르소나 리뷰 (텍스트 짤림 방지) */}
                <div className={styles.resultBox}>
                  <h3 className={styles.boxHeader}><MessageSquare size={20} /> 셰프의 총평</h3>
                  <p className={styles.reviews}>
                    {/* 스트리밍 중이거나 personaReview가 있으면 그것을 보여주고, 아니면 analysisResult의 값을 보여줌 (백엔드가 빈 값을 줄수도 있으므로) */}
                    {personaReview || analysisResult.persona_review || "셰프가 리뷰를 작성 중입니다..."}
                  </p>
                </div>

                {/* 3. 개선 제안 */}
                <div className={styles.resultBox}>
                  <h3 className={styles.boxHeader}><Lightbulb size={20} /> 개선 가이드</h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingLeft: '20px' }}>
                    {analysisResult.suggestions.map((s, i) => (
                      <li key={i} style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: '1.5' }}>{s}</li>
                    ))}
                  </ul>
                </div>

                <button onClick={resetGame} className={styles.restartBtn}>
                  <RefreshCcw size={20} /> 다시 주방으로 돌아가기
                </button>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- 하위 컴포넌트 ---
function StatusRow({ label, value, icon }: { label: string, value: number, icon: React.ReactNode }) {
  return (
    <div className={styles.statusRow}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', gap: '10px', color: '#e5e7eb' }}>{icon} {label}</div>
        <div style={{ fontWeight: 'bold' }}>{value.toFixed(1)}%</div>
      </div>
      <div className={styles.barBg}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ delay: 2, duration: 1.5 }} style={{ height: '100%', background: 'linear-gradient(90deg, #333, #fff)' }} />
      </div>
    </div>
  );
}

function LandingLoading() {
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