// 👇 1. BackendResponse를 APIAnalysisResult로 변경
import type { APIAnalysisResult } from '../types';

// 👇 2. 반환 타입도 APIAnalysisResult로 변경
export const requestAnalysis = async (code: string, role: string, language: string): Promise<APIAnalysisResult> => {
  // 실제 연동 시 아래 주석 해제
  /*
  const response = await fetch('http://localhost:8000/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, role, language })
  });
  if (!response.ok) throw new Error('Analysis failed');
  return response.json();
  */
  
  // 지금은 목업 데이터 반환 (types.ts와 구조를 완벽히 일치시킴)
  return new Promise((resolve) => setTimeout(() => resolve({
    level: 3,
    level_title: "흑수저 셰프 (중급)",
    verdict: "생존하셨습니다",
    overall_score: 85,
    scores: { 
      security: 80, 
      quality: 85, 
      best_practices: 75, 
      complexity: 90, 
      documentation: 60 
    },
    code_review: "전반적으로 깔끔한 코드입니다. 하지만 변수명이 조금 더 명확했으면 좋겠군요.",
    persona_review: "음... 이 정도면 내 레스토랑 주방보조로는 쓸 수 있겠어. 하지만 메인 셰프는 아직 멀었네. 간이 좀 안 맞아! (문서화 부족)",
    // 👇 3. APIAnalysisResult 타입에 있는 필수 필드들 추가 (누락되면 에러 남)
    is_vulnerable: false,
    vulnerability_score: 0,
    issues: [],
    suggestions: [
      "변수명을 직관적으로 변경하세요 (예: a -> userCount)",
      "함수마다 주석을 달아주세요.",
      "예외 처리를 조금 더 꼼꼼하게 하세요."
    ],
    language: language,
    line_count: code.split('\n').length
  }), 3000)); // 3초 뒤 결과 반환
};