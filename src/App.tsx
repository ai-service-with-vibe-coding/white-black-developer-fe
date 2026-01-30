import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LandingPage } from './pages/LandingPage';
import { SelectionPage } from './pages/SelectionPage';
import { InputPage } from './pages/InputPage';
import { Loading } from './pages/Loading';
import { ResultPage } from './pages/ResultPage';
// import { ErrorPage } from './pages/ErrorPage'; // (사용 안 함)
import { requestAnalysis } from './api/analyze';
// 👇 1. 여기서 이름 변경!
import type { GameState, Role, APIAnalysisResult } from './types';
import { LANGUAGES } from './constants';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('LANDING');
  const [role, setRole] = useState<Role>(null);
  const [userCode, setUserCode] = useState('');
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  
  // 👇 2. 여기서도 이름 변경!
  const [analysisResult, setAnalysisResult] = useState<APIAnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleStartAnalysis = async () => {
    setGameState('LOADING');
    try {
      const data = await requestAnalysis(userCode, role || 'Backend', selectedLang.name);
      setAnalysisResult(data);
      setGameState('RESULT');
    } catch (error) {
      setErrorMessage("서버와 통신이 원활하지 않습니다.");
      // 에러 발생 시 처리 로직 (현재는 그냥 RESULT로 넘김)
      setGameState('RESULT'); 
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'black', color: 'white', overflow: 'hidden' }}>
      <AnimatePresence mode="wait">
        {gameState === 'LANDING' && <LandingPage onNext={() => setGameState('SELECTION')} />}
        {gameState === 'SELECTION' && <SelectionPage onSelect={(r) => { setRole(r); setGameState('INPUT'); }} />}
        {gameState === 'INPUT' && (
          <InputPage 
            userCode={userCode} setUserCode={setUserCode} 
            selectedLang={selectedLang} setSelectedLang={setSelectedLang} 
            onSubmit={handleStartAnalysis} 
          />
        )}
        {gameState === 'LOADING' && <Loading />}
        {gameState === 'RESULT' && analysisResult && (
          <ResultPage data={analysisResult} onReset={() => setGameState('LANDING')} />
        )}
      </AnimatePresence>
    </div>
  );
}