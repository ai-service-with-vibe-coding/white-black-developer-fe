import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Code, Terminal, Utensils, RefreshCcw, ShieldCheck, Gauge, Zap, FileCode, CheckCircle2, MessageSquare, Lightbulb } from 'lucide-react';

// --- 백엔드 API 규격 기반 타입 정의 ---
interface BackendResponse {
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

const LANGUAGES = [
  { name: 'JavaScript', ext: 'js' },
  { name: 'TypeScript', ext: 'ts' },
  { name: 'React', ext: 'tsx' },
  { name: 'Java', ext: 'java' },
  { name: 'Python', ext: 'py' },
  { name: 'C++', ext: 'cpp' },
  { name: 'Go', ext: 'go' },
];

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
  const [userCode, setUserCode] = useState('');
  const [analysisResult, setAnalysisResult] = useState<BackendResponse | null>(null);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);

  const resetGame = () => {
    setGameState('LANDING');
    setAnalysisResult(null);
    setUserCode('');
    setRole(null);
  };

  const handleStartAnalysis = async () => {
    setGameState('LOADING');
    try {
      // 백엔드 API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 5000)); 
      
      const mockData: BackendResponse = {
        level: 3,
        level_title: "중급 개발자",
        verdict: "생존하셨습니다",
        overall_score: 69.1,
        scores: {
          security: 65.33,
          quality: 70,
          best_practices: 75,
          complexity: 80,
          documentation: 50
        },
        code_review: "<msg>Please remove this blank line.",
        persona_review: "이 코드는 모듈화가 타이트하다는 점은 높이 평가됩니다. 그러나, 함수의 중복 사용, 주석의 부족 등은 개선해야 할 부분입니다. 코드의 완성도는 조금 모자라기는 하지만, 기능적으로는 전반적으로는 잘 작성된 것 같습니다. 보안에 대한 부분은 특별한 문제점은 없습니다. 그러나, 코드의 복잡도는 다소 높습니다. 문서화의 부족은 개선해야 할 부분입니다. 이 코드는 레벨 3로 판정됩니다. 살아남겠습니다.",
        suggestions: [
          "문서화 점수가 50점입니다. 주석과 문서화를 추가하세요.",
          "보안 점수가 65점입니다. 입력 검증, SQL 인젝션 방지 등 보안 코딩 가이드를 참고하세요.",
          "설계 패턴과 아키텍처에 대한 이해를 높이세요."
        ],
        language: selectedLang.name.toLowerCase(),
        line_count: userCode.split('\n').length
      };

      setAnalysisResult(mockData);
      setGameState('RESULT');
    } catch (error) {
      alert("심사 중 오류가 발생했습니다.");
      setGameState('INPUT');
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'black', color: 'white', overflow: 'hidden', fontFamily: 'sans-serif', position: 'relative' }}>
      <AnimatePresence mode="wait">
        
        {/* A. Landing & B. Selection & C. Input (기존 기능 유지) */}
        {gameState === 'LANDING' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
               <img src="/main-bg.png" alt="Main Background" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }} />
            </div>
            <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem', marginTop: '30vh' }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex items-center gap-2 mb-4">
                <Terminal size={24} color="#9ca3af" />
                <span style={{ color: '#9ca3af', letterSpacing: '0.4em', fontSize: '14px', fontWeight: 'bold' }}>CODE CLASS WAR</span>
              </motion.div>
              <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} style={{ fontSize: '5rem', fontWeight: 900, marginBottom: '1rem' }}>흑백개발자</motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ fontSize: '1.8rem', color: '#d1d5db', fontStyle: 'italic', marginBottom: '3rem' }}>"당신의 코드는... 익었습니까?"</motion.p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setGameState('SELECTION')} style={{ padding: '1.2rem 4.5rem', backgroundColor: '#b91c1c', color: 'white', fontSize: '1.6rem', fontWeight: 'bold', borderRadius: '0.5rem', border: '2px solid #ef4444', cursor: 'pointer', boxShadow: '0 0 30px rgba(185, 28, 28, 0.5)' }}>계급 전쟁 참가하기</motion.button>
            </div>
          </motion.div>
        )}

        {gameState === 'SELECTION' && (
          <motion.div key="selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '4rem' }}>"당신의 <span style={{ borderBottom: '3px solid white', paddingBottom: '5px' }}>주방(직군)</span>은 어디입니까?"</h2>
            <div style={{ display: 'flex', gap: '3rem' }}>
              <button onClick={() => { setRole('Frontend'); setGameState('INPUT'); }} style={{ width: '18rem', height: '22rem', backgroundColor: 'white', color: 'black', borderRadius: '1.5rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <ChefHat size={80} /><div style={{ fontSize: '2.2rem', fontWeight: 900, marginTop: '20px' }}>Frontend</div>
              </button>
              <button onClick={() => { setRole('Backend'); setGameState('INPUT'); }} style={{ width: '18rem', height: '22rem', backgroundColor: '#111', color: 'white', border: '2px solid #333', borderRadius: '1.5rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Code size={80} /><div style={{ fontSize: '2.2rem', fontWeight: 900, marginTop: '20px' }}>Backend</div>
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'INPUT' && (
          <motion.div key="input" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem' }}>"자신 있는 <span style={{ color: '#eab308' }}>코드</span>를 보여주세요."</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              {LANGUAGES.map(l => (
                <button key={l.name} onClick={() => setSelectedLang(l)} style={{ padding: '8px 15px', borderRadius: '5px', backgroundColor: selectedLang.name === l.name ? '#b91c1c' : '#222', border: 'none', color: 'white', cursor: 'pointer' }}>{l.name}</button>
              ))}
            </div>
            <div style={{ width: '100%', maxWidth: '850px', backgroundColor: '#1e1e1e', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333' }}>
              <div style={{ padding: '12px 20px', backgroundColor: '#252526', color: '#888', fontSize: '13px' }}>main.{selectedLang.ext}</div>
              <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} placeholder="// 코드를 입력하세요..." style={{ width: '100%', height: '420px', backgroundColor: 'transparent', color: '#d4d4d4', padding: '20px', border: 'none', outline: 'none', fontFamily: 'monospace', resize: 'none' }} />
            </div>
            <button onClick={handleStartAnalysis} style={{ marginTop: '2rem', padding: '1.2rem 4rem', backgroundColor: '#b91c1c', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}>제출하고 심사받기</button>
          </motion.div>
        )}

        {gameState === 'LOADING' && <LandingLoading />}

        {/* --- E. 결과 발표 (스크롤 최적화 버전) --- */}
        {gameState === 'RESULT' && analysisResult && (
          <motion.div key="result" style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflowY: 'auto' }}>
            <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
               <img src={TIER_CONFIG[analysisResult.level]?.image} alt="bg" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(35px) brightness(0.2)' }} />
            </div>
            <div style={{ zIndex: 10, display: 'flex', width: '100%', maxWidth: '1400px', margin: '0 auto', alignItems: 'flex-start', padding: '5vh 5%', gap: '5%' }}>
              
              {/* [LEFT] 이미지 + 티어 (고정형 레이아웃) */}
              <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} style={{ flex: 1, textAlign: 'center', position: 'sticky', top: '5vh' }}>
                <div style={{ width: '100%', borderRadius: '20px', overflow: 'hidden', boxShadow: `0 0 50px ${TIER_CONFIG[analysisResult.level]?.color}44`, border: `1px solid ${TIER_CONFIG[analysisResult.level]?.color}88`, marginBottom: '30px' }}>
                  <img src={TIER_CONFIG[analysisResult.level]?.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Result" />
                </div>
                <h2 style={{ fontSize: '1.5rem', color: '#aaa', marginBottom: '10px' }}>{analysisResult.level_title}</h2>
                <h1 style={{ fontSize: '4rem', fontWeight: 900, textShadow: `0 0 20px ${TIER_CONFIG[analysisResult.level]?.color}`, marginBottom: '20px' }}>{analysisResult.verdict}</h1>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: TIER_CONFIG[analysisResult.level]?.color }}>{analysisResult.overall_score}<span style={{ fontSize: '1.5rem' }}>pt</span></div>
              </motion.div>

              {/* [RIGHT] 상세 보고서 (내부 스크롤 가능) */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '30px', paddingBottom: '10vh' }}>
                
                {/* 1. 스테이터스 바 */}
                <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', borderRadius: '30px', padding: '40px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h3 style={{ color: '#aaa', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}><Gauge size={20}/> 분석 지표</h3>
                  <StatusRow label="보안" value={analysisResult.scores.security} icon={<ShieldCheck color="#ef4444" />} />
                  <StatusRow label="품질" value={analysisResult.scores.quality} icon={<Gauge color="#3b82f6" />} />
                  <StatusRow label="모범 사례" value={analysisResult.scores.best_practices} icon={<CheckCircle2 color="#10b981" />} />
                  <StatusRow label="복잡도" value={analysisResult.scores.complexity} icon={<Zap color="#f59e0b" />} />
                  <StatusRow label="문서화" value={analysisResult.scores.documentation} icon={<FileCode color="#8b5cf6" />} />
                </div>

                {/* 2. 페르소나 리뷰 (텍스트 짤림 방지) */}
                <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', borderRadius: '30px', padding: '40px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h3 style={{ color: '#aaa', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><MessageSquare size={20}/> 셰프의 총평</h3>
                  <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#eee', whiteSpace: 'pre-wrap', wordBreak: 'keep-all' }}>
                    {analysisResult.persona_review}
                  </p>
                </div>

                {/* 3. 개선 제안 */}
                <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', borderRadius: '30px', padding: '40px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h3 style={{ color: '#aaa', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Lightbulb size={20}/> 개선 가이드</h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingLeft: '20px' }}>
                    {analysisResult.suggestions.map((s, i) => (
                      <li key={i} style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: '1.5' }}>{s}</li>
                    ))}
                  </ul>
                </div>

                <button onClick={resetGame} style={{ padding: '20px', borderRadius: '15px', backgroundColor: '#b91c1c', color: 'white', fontWeight: 'bold', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.2rem' }}>
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
    <div style={{ marginBottom: '25px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', gap: '10px', color: '#e5e7eb' }}>{icon} {label}</div>
        <div style={{ fontWeight: 'bold' }}>{value.toFixed(1)}%</div>
      </div>
      <div style={{ width: '100%', height: '8px', backgroundColor: '#111', borderRadius: '10px', overflow: 'hidden' }}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ delay: 2, duration: 1.5 }} style={{ height: '100%', background: 'linear-gradient(90deg, #333, #fff)' }} />
      </div>
    </div>
  );
}

function LandingLoading() {
  const [loadingText, setLoadingText] = useState("코드를 'Taste' 하는 중입니다...");
  useEffect(() => {
    const audio = new Audio('/tasting.mp3'); audio.loop = true;
    audio.play().catch(() => {});
    const texts = ["음... 간이 좀 안 맞는데?", "변수명 식감이 쫄깃하네요.", "로직이 아주 타이트해요.", "가비지 컬렉터와 대화 중..."];
    let i = 0;
    const interval = setInterval(() => { setLoadingText(texts[i % texts.length]); i++; }, 2500);
    return () => { audio.pause(); clearInterval(interval); };
  }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', marginBottom: '40px' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} style={{ position: 'absolute', inset: -15, borderRadius: '50%', border: '4px solid transparent', borderTopColor: '#b91c1c', borderBottomColor: '#b91c1c' }} />
        <div style={{ width: '380px', height: '380px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #b91c1c', boxShadow: '0 0 50px rgba(185, 28, 28, 0.4)', position: 'relative' }}>
          <img src="/tasting.gif" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Loading" />
        </div>
      </div>
      <AnimatePresence mode="wait"><motion.h2 key={loadingText} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ fontSize: '2.2rem', fontStyle: 'italic', marginBottom: '15px' }}>"{loadingText}"</motion.h2></AnimatePresence>
      <p style={{ color: '#666', fontSize: '1.2rem' }}>심도 있는 분석을 위해 최대 1분이 소요될 수 있습니다.</p>
    </motion.div>
  );
}