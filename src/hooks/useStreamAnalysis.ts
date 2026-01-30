import { useState, useCallback, useRef } from 'react';
import { BackendResponse } from '../App';

export function useStreamAnalysis() {
    const [analysis, setAnalysis] = useState<BackendResponse | null>(null);
    const [personaReview, setPersonaReview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    const analyze = useCallback(async (code: string, language: string) => {
        // 이전 요청 취소
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        setIsLoading(true);
        setPersonaReview('');
        setAnalysis(null);

        try {
            const response = await fetch('/api/v1/analysis/analyze/stream', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code,
                    language: language.toLowerCase(), // API expects lowercase
                    include_persona_review: true,
                }),
                signal: abortControllerRef.current.signal,
            });

            if (!response.body) throw new Error('ReadableStream not supported');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.trim() === '') continue;

                    if (line.startsWith('data:')) {
                        try {
                            const jsonStr = line.substring(5).trim();
                            if (!jsonStr) continue;

                            const data = JSON.parse(jsonStr);
                            console.log('Received SSE data:', data);

                            if (data.level !== undefined) {
                                // 분석 결과
                                console.log('Setting analysis result');
                                setAnalysis(data as BackendResponse);
                                setIsLoading(false);
                                setIsStreaming(true);
                            } else if (data.token !== undefined) {
                                // 페르소나 토큰
                                setPersonaReview((prev) => prev + data.token);
                            } else if (data.status === 'completed') {
                                // 완료
                                console.log('Stream completed');
                                setIsStreaming(false);
                            } else if (data.error) {
                                console.error('Server reported error:', data.error);
                                throw new Error(data.error);
                            }
                        } catch (e) {
                            console.warn('Failed to parse SSE data:', line, e);
                        }
                    }
                }
            }
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Analysis aborted');
            } else {
                console.error('Analysis failed:', error);
                alert(`심사 중 오류가 발생했습니다: ${error.message || 'Unknown error'}`);
            }
            setIsLoading(false);
            setIsStreaming(false);
        }
    }, []);

    return { analysis, personaReview, isLoading, isStreaming, analyze };
}
