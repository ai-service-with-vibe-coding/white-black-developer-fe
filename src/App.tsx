import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import SelectionPage from './pages/SelectionPage';
import InputPage from './pages/InputPage';
import ResultPage from './pages/ResultPage'; 
// 여기서 타입을 types.ts에서 가져옵니다!
import { APIAnalysisResult } from './types';

// --- 로딩 컴포넌트 ---
function LoadingScreen() {
  const [text, setText] = useState("코드를 'Taste' 하는 중...");
  React.useEffect(() => {
    const texts = ["음... 간이 좀 안 맞는데?", "변수명 식감이 쫄깃하네요.", "로직이 아주 타이트해요.", "가비지 컬렉터와 대화 중..."];
    let step = 0;
    const interval = setInterval(() => { setText(texts[step % texts.length]); step++; }, 1500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="fixed inset-0 bg-black flex flex-col justify-center items-center z-50 text-white">
      <h2 className="text-3xl italic mb-4">"{text}"</h2>
      <div className="w-64 h-1 bg-gray-800 rounded overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 5 }} className="h-full bg-red-600" /></div>
    </div>
  );
}

export default function App() {
  const [gameState, setGameState] = useState<'LANDING' | 'SELECTION' | 'INPUT' | 'LOADING' | 'RESULT'>('LANDING');
  const [role, setRole] = useState<'Frontend' | 'Backend' | null>(null);
  const [analysisResult, setAnalysisResult] = useState<APIAnalysisResult | null>(null);

  const handleCodeSubmit = async (code: string) => {
    setGameState('LOADING');
    try {
      // 3초 뒤에 가짜 데이터로 결과 화면 보여주기
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // types.ts에 정의된 형식대로 데이터 생성
      const mockData: APIAnalysisResult = {
        level: 3,
        level_title: "중급 개발자",
        verdict: "생존하셨습니다",
        overall_score: 69.1,
        scores: { security: 65, quality: 70, best_practices: 75, complexity: 80, documentation: 50 },
        code_review: "",
        persona_review: "나쁘지 않아요. 하지만 '킥'이 부족합니다.",
        is_vulnerable: false,
        vulnerability_score: 0,
        issues: [],
        suggestions: ["주석을 더 상세히 작성하세요.", "함수 분리가 필요합니다."],
        language: "typescript",
        line_count: 120
      };
      
      setAnalysisResult(mockData);
      setGameState('RESULT');
    } catch (e) {
      console.error(e);
      setGameState('INPUT');
    }
  };

  return (
    <div className="w-screen h-screen bg-black text-white overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {gameState === 'LANDING' && <LandingPage onStart={() => setGameState('SELECTION')} />}
        {gameState === 'SELECTION' && <SelectionPage onSelect={(r) => { setRole(r); setGameState('INPUT'); }} />}
        {gameState === 'INPUT' && <InputPage onBack={() => setGameState('SELECTION')} onSubmit={handleCodeSubmit} />}
        {gameState === 'LOADING' && <LoadingScreen />}
        {gameState === 'RESULT' && analysisResult && (
          <ResultPage resultData={analysisResult} onRestart={() => { setAnalysisResult(null); setGameState('LANDING'); }} />
        )}
      </AnimatePresence>
    </div>
  );
}