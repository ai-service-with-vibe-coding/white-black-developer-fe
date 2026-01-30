import React from 'react';
import { AnimatePresence } from 'framer-motion';

import { useGameLogic } from './hooks/useGameLogic';
import LandingPage from './pages/LandingPage';
import SelectionPage from './pages/SelectionPage';
import InputPage from './pages/InputPage';
import LoadingPage from './pages/LoadingPage';
import ResultPage from './pages/ResultPage';

import styles from './App.module.css';

export default function App() {
  const {
    gameState,
    setGameState,
    setRole,
    resetGame,
    handleStartAnalysis,
    analysisResult,
    personaReview,
  } = useGameLogic();

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        {gameState === 'LANDING' && (
          <LandingPage onStart={() => setGameState('SELECTION')} />
        )}

        {gameState === 'SELECTION' && (
          <SelectionPage
            onSelect={(selectedRole) => {
              setRole(selectedRole);
              setGameState('INPUT');
            }}
          />
        )}

        {gameState === 'INPUT' && (
          <InputPage
            onSubmit={handleStartAnalysis}
            onBack={() => {
              setGameState('SELECTION');
              setRole(null);
            }}
          />
        )}

        {gameState === 'LOADING' && <LoadingPage />}

        {gameState === 'RESULT' && analysisResult && (
          <ResultPage
            analysisResult={analysisResult}
            personaReview={personaReview}
            onRestart={resetGame}
          />
        )}
      </AnimatePresence>
    </div>
  );
}