import { useState, useEffect } from 'react';
import { useStreamAnalysis } from './useStreamAnalysis';
import { GameState, Role } from '../types/types';

export function useGameLogic() {
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
