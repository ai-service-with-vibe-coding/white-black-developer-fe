import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Code, Terminal, Utensils, RefreshCcw } from 'lucide-react';

// --- 1. 데이터 & 타입 정의 ---
type GameState = 'LANDING' | 'SELECTION' | 'INPUT' | 'LOADING' | 'RESULT';
type Role = 'Frontend' | 'Backend' | null;

interface ResultItem {
  tier: string;
  resultImage: string;
  color: string;
  bg: string;
  text: string;
  comment: string;
}

const LANGUAGES = [
  { name: 'JavaScript', ext: 'js' },
  { name: 'TypeScript', ext: 'ts' },
  { name: 'React', ext: 'tsx' },
  { name: 'Java', ext: 'java' },
  { name: 'Python', ext: 'py' },
  { name: 'C++', ext: 'cpp' },
  { name: 'Go', ext: 'go' },
  { name: 'Rust', ext: 'rs' },
];

const RESULTS = [
  { 
    tier: 'Lv.5 GRAND MASTER', 
    resultImage: '/images/result_lv5.png', 
    color: 'text-white', bg: 'bg-white', text: 'text-black', 
    comment: '"이 코드는... 예술입니다.\n제가 평가할 영역이 아니에요.\n완벽하게 이븐(Even)합니다."' 
  },
  { 
    tier: 'Lv.4 BLACK LABEL', 
    resultImage: '/images/result_lv4.png', 
    color: 'text-gray-300', bg: 'bg-gray-800', text: 'text-white', 
    comment: '"와, 이거 재밌네.\n테크닉이 아주 좋아요.\n생존입니다."' 
  },
  { 
    tier: 'Lv.3 BLUE SOUS CHEF', 
    resultImage: '/images/result_lv3.png', 
    color: 'text-blue-400', bg: 'bg-blue-900', text: 'text-blue-100', 
    comment: '"기본기는 탄탄해요.\n근데... 본인의 색깔이 없어요.\n흔한 맛입니다."' 
  },
  { 
    tier: 'Lv.2 GREEN GARNISH', 
    resultImage: '/images/result_lv2.png', 
    color: 'text-green-400', bg: 'bg-green-900', text: 'text-green-100', 
    comment: '"보기에만 좋네요.\n이 코드, 메인 디쉬가 없어요.\n그냥 장식품입니다."' 
  },
  { 
    tier: 'Lv.1 RED RAW', 
    resultImage: '/images/result_lv1.png', 
    color: 'text-red-500', bg: 'bg-red-950', text: 'text-red-200', 
    comment: '"안 익었어요.\n이걸 지금 배포하라고 가져온 거예요?\n폐기처분 하겠습니다."' 
  },
];

export default function App() {
  const [gameState, setGameState] = useState<GameState>('LANDING');
  const [role, setRole] = useState<Role>(null);
  const [result, setResult] = useState(RESULTS[0]);
  const [userCode, setUserCode] = useState('');
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);

  const resetGame = () => {
    setGameState('LANDING');
    setRole(null);
    setUserCode('');
    setSelectedLang(LANGUAGES[0]);
  };

  const calculateResult = () => {
    const randomIndex = Math.floor(Math.random() * RESULTS.length);
    setResult(RESULTS[randomIndex]);
    setGameState('RESULT');
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundColor: 'black', 
      color: 'white', 
      fontFamily: 'sans-serif', 
      position: 'relative',
      overflow: 'hidden' 
    }}>
      <AnimatePresence mode="wait">

        {/* --- A. 메인 화면 (Landing) --- */}
        {gameState === 'LANDING' && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
               <img src="/main-bg.png" alt="Main Background" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }} />
            </div>

            <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex items-center gap-2 mb-4">
                <Terminal size={20} color="#9ca3af" />
                <span style={{ color: '#9ca3af', letterSpacing: '0.3em', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>Code Class War</span>
              </motion.div>
              <motion.h1 initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 900, letterSpacing: '-0.05em', color: 'white', textShadow: '0 5px 5px rgba(0,0,0,0.8)', marginBottom: '0.5rem', lineHeight: 1 }}>흑백개발자</motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', fontFamily: 'serif', fontStyle: 'italic', color: '#d1d5db', textShadow: '0 2px 4px rgba(0,0,0,0.5)', marginBottom: '4rem' }}>"당신의 코드는... 익었습니까?"</motion.p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} onClick={() => setGameState('SELECTION')} style={{ padding: '1rem 3rem', backgroundColor: '#b91c1c', color: 'white', fontSize: 'clamp(1rem, 3vw, 1.5rem)', fontWeight: 'bold', borderRadius: '0.25rem', border: '2px solid #ef4444', textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 0 20px rgba(255,0,0,0.5)', cursor: 'pointer' }}>계급 전쟁 참가하기</motion.button>
            </div>
          </motion.div>
        )}

        {/* --- B. 직군 선택 (Selection) --- */}
        {gameState === 'SELECTION' && (
          <motion.div 
            key="selection"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          >
            <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontFamily: 'serif', marginBottom: '3rem', color: '#e5e7eb', textAlign: 'center' }}>
              "당신의 <span style={{ color: 'white', fontWeight: 'bold', borderBottom: '2px solid white' }}>주방(직군)</span>은 어디입니까?"
            </h2>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => { setRole('Frontend'); setGameState('INPUT'); }} className="group hover:scale-105 transition-transform duration-300" style={{ width: '16rem', height: '20rem', backgroundColor: 'white', color: 'black', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', cursor: 'pointer' }}>
                <div style={{ padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '9999px' }}><ChefHat size={48} color="black" /></div>
                <div style={{ textAlign: 'center' }}><span style={{ display: 'block', fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>플레이팅의 마술사</span><span style={{ fontSize: '1.875rem', fontWeight: 900 }}>Frontend</span></div>
              </button>
              <button onClick={() => { setRole('Backend'); setGameState('INPUT'); }} className="group hover:scale-105 transition-transform duration-300" style={{ width: '16rem', height: '20rem', backgroundColor: '#111827', border: '1px solid #374151', color: 'white', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', cursor: 'pointer' }}>
                 <div style={{ padding: '1rem', backgroundColor: '#1f2937', borderRadius: '9999px' }}><Code size={48} color="white" /></div>
                <div style={{ textAlign: 'center' }}><span style={{ display: 'block', fontSize: '0.875rem', color: '#9ca3af', marginBottom: '0.25rem' }}>로직의 지배자</span><span style={{ fontSize: '1.875rem', fontWeight: 900 }}>Backend</span></div>
              </button>
            </div>
          </motion.div>
        )}

        {/* --- C. 코드 입력 (Input) --- */}
        {gameState === 'INPUT' && (
          <motion.div 
            key="input"
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}
          >
             <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontFamily: 'serif', marginBottom: '1.5rem', color: 'white', textAlign: 'center' }}>
              "자신 있는 <span style={{ color: '#eab308' }}>코드</span>를 보여주세요."
            </h2>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '800px' }}>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.name}
                  onClick={() => setSelectedLang(lang)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    border: '1px solid #333',
                    backgroundColor: selectedLang.name === lang.name ? '#b91c1c' : '#1e1e1e',
                    color: selectedLang.name === lang.name ? 'white' : '#888',
                    transition: 'all 0.2s'
                  }}
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
                <span style={{ marginLeft: '12px', fontSize: '12px', color: '#888', fontFamily: 'monospace' }}>
                  main.{selectedLang.ext}
                </span>
              </div>
              <textarea 
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                placeholder={`// ${selectedLang.name} 코드를 여기에 붙여넣거나 작성하세요...`}
                style={{ 
                  width: '100%', height: '40vh', minHeight: '300px', backgroundColor: '#1e1e1e', color: '#d4d4d4', 
                  border: 'none', padding: '16px', fontFamily: 'monospace', fontSize: '14px', 
                  resize: 'none', outline: 'none', lineHeight: '1.5'
                }}
              />
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => setGameState('SELECTION')} style={{ padding: '0.8rem 2rem', color: '#9ca3af', background: 'none', border: '1px solid #374151', borderRadius: '9999px', cursor: 'pointer' }}>뒤로가기</button>
              <button 
                onClick={() => {
                  if (userCode.trim().length < 10) {
                    alert("코드가 너무 짧습니다! 더 보여주세요.");
                    return;
                  }
                  setGameState('LOADING');
                }}
                style={{ padding: '0.8rem 3rem', backgroundColor: '#b91c1c', color: 'white', fontWeight: 'bold', borderRadius: '9999px', cursor: 'pointer', boxShadow: '0 0 15px rgba(220, 38, 38, 0.5)' }}
              >
                제출하고 심사받기
              </button>
            </div>
          </motion.div>
        )}

        {/* --- D. 로딩 --- */}
        {gameState === 'LOADING' && (
          <LandingLoading onFinish={calculateResult} />
        )}

       {/* --- E. 결과 발표 (Result) - [NEW] 좌우 분할 애니메이션 --- */}
        {gameState === 'RESULT' && (
          <motion.div 
            key="result"
            style={{ width: '100%', height: '100%', position: 'relative', overflowY: 'auto' }} // 스크롤 허용
          >
            {/* 배경 (고정) */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
               <img src={result.resultImage} alt="bg" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(20px) brightness(0.3)', transform: 'scale(1.1)' }} />
            </div>
            
            {/* 메인 컨테이너: 좌우 배치 (Flex) */}
            <div style={{ 
              zIndex: 10, 
              position: 'relative',
              width: '100%', 
              minHeight: '100vh',
              maxWidth: '1400px', 
              margin: '0 auto',
              padding: '2rem', 
              display: 'flex', 
              flexWrap: 'wrap', // 화면 작으면 자동 줄바꿈
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '2rem'
            }}>
              
              {/* --- [LEFT SIDE] 이미지 & 등급 (왼쪽에서 슬라이드) --- */}
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }} // 부드럽게 슬라이드
                style={{ 
                  flex: '1 1 400px', // 최소 400px, 공간 있으면 늘어남
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              >
                 {/* 결과 이미지 */}
                 <div style={{ 
                   width: '100%', 
                   maxWidth: '500px', 
                   aspectRatio: '16/9', 
                   borderRadius: '16px', 
                   overflow: 'hidden',
                   boxShadow: '0 30px 60px rgba(0,0,0,0.8)',
                   border: `4px solid ${result.color.includes('red') ? '#ef4444' : result.color.includes('blue') ? '#3b82f6' : '#ffffff'}`,
                   marginBottom: '2rem'
                 }}>
                    <img src={result.resultImage} alt={result.tier} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 </div>
                 
                 {/* 등급 텍스트 */}
                 <div style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', textShadow: '0 0 30px currentColor' }} className={result.color}>
                   {result.tier}
                 </div>
              </motion.div>

              {/* --- [RIGHT SIDE] 디테일 평가 (1초 뒤 페이드인) --- */}
              <motion.div
                initial={{ opacity: 0 }} // 처음엔 안 보임
                animate={{ opacity: 1 }} // 서서히 나타남
                transition={{ delay: 1.0, duration: 1.0 }} // 1초 기다렸다가, 1초 동안 페이드인
                style={{ 
                  flex: '1 1 400px', 
                  padding: '2rem',
                  display: 'flex', 
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  backgroundColor: 'rgba(0,0,0,0.5)', // 가독성을 위한 반투명 배경
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <p style={{ color: '#9ca3af', fontSize: '1rem', marginBottom: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase', borderBottom: '1px solid #555', paddingBottom: '0.5rem', width: '100%' }}>
                  The Verdict
                </p>
                
                {/* 심사평 본문 */}
                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontFamily: 'serif', lineHeight: 1.6, wordBreak: 'keep-all', color: '#f3f4f6', whiteSpace: 'pre-line', marginBottom: '3rem', width: '100%', textAlign: 'left' }}>
                  {result.comment}
                </h2>

                {/* 다시하기 버튼 */}
                <button
                  onClick={resetGame}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.8rem', 
                    color: 'white', cursor: 'pointer', background: 'transparent', 
                    border: '1px solid rgba(255,255,255,0.3)', padding: '12px 24px', 
                    borderRadius: '50px', fontSize: '1rem', transition: 'all 0.3s' 
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = 'black'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white'; }}
                >
                  <RefreshCcw size={20} />
                  <span>처음으로 돌아가기</span>
                </button>
              </motion.div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// --- 하위 컴포넌트: 로딩 애니메이션 ---
function LandingLoading({ onFinish }: { onFinish: () => void }) {
  const [text, setText] = useState("코드를 'Taste' 하는 중...");

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
    const timer = setTimeout(() => { onFinish(); }, 5000); 
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [onFinish]);

  useEffect(() => {
    const audio = new Audio('/tasting.mp3'); 
    audio.volume = 0.5;
    audio.loop = true;
    audio.play().catch((err) => console.log("Audio play blocked", err));
    return () => { audio.pause(); audio.currentTime = 0; };
  }, []);

  return (
    <motion.div 
      key="loading"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ 
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
        zIndex: 50, overflow: 'hidden', backgroundColor: 'black' 
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <img 
          src="/tasting.gif" 
          alt="Tasting Background" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.currentTarget.style.display='none'; }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)' }} />
      </div>

      <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <motion.h2 
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{ 
            fontSize: '2rem', fontFamily: 'serif', color: 'white', marginBottom: '2rem', 
            fontStyle: 'italic', textShadow: '0 4px 10px rgba(0,0,0,0.8)', textAlign: 'center' 
          }}
        >
          "{text}"
        </motion.h2>
        
        <div style={{ width: '80%', maxWidth: '400px', height: '4px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '9999px', overflow: 'hidden' }}>
          <motion.div 
            style={{ height: '100%', backgroundColor: '#b91c1c', boxShadow: '0 0 10px #b91c1c' }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </div>
      </div>
    </motion.div>
  );
}