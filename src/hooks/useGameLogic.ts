import { useState, useEffect } from 'react';
import { useStreamAnalysis } from './useStreamAnalysis';
import { GameState, Role } from '../types/types';

export function useGameLogic() {
    const [gameState, setGameState] = useState<GameState>('LANDING');
    const [role, setRole] = useState<Role>(null);
    const [minLoadComplete, setMinLoadComplete] = useState(false);

    const { analysis: analysisResult, personaReview, isLoading, isStreaming, analyze } = useStreamAnalysis();

    // isLoading 상태 변경 감지하여 GameState 변경
    useEffect(() => {
        if (isLoading) {
            setGameState('LOADING');
        } else if (analysisResult && minLoadComplete) {
            setGameState('RESULT');
        }
    }, [isLoading, analysisResult, minLoadComplete]);

    const resetGame = () => {
        setGameState('LANDING');
        setRole(null);
    };

    const handleStartAnalysis = (code: string, language: string) => {
        setMinLoadComplete(false);
        // data fetching fast, but minimal loading time 5s
        setTimeout(() => {
            setMinLoadComplete(true);
        }, 5000);
        analyze(code, language);
    };

    return {
        gameState,
        setGameState,
        role,
        setRole,
        analysisResult,
        personaReview,
        isLoading,
        isStreaming,
        resetGame,
        handleStartAnalysis
    };
}
