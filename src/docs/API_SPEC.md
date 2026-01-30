# 📡 API Data Specification (데이터 명세서)

## 1. 개요
본 문서는 백엔드 분석 엔진(AI)이 프론트엔드로 전달하는 **코드 분석 결과 데이터(`APIAnalysisResult`)**의 구조와 의미를 정의합니다.

- **프론트엔드 정의 파일:** `src/types.ts`
- **데이터 흐름:** Backend API -> `App.tsx` (State 저장) -> `ResultPage.tsx` (렌더링)

---

## 2. 데이터 구조 (JSON Schema)

```typescript
interface APIAnalysisResult {
  level: number;           // 개발자 등급 (1~5)
  level_title: string;     // 등급 칭호 (예: Grand Master)
  verdict: string;         // 한 줄 판정 (예: "생존입니다.")
  overall_score: number;   // 종합 점수 (0~100)
  
  // 5각 레이더 차트 데이터
  scores: {
    security: number;      // 보안성
    quality: number;       // 코드 품질
    best_practices: number;// 모범 사례 준수
    complexity: number;    // 복잡도 (낮을수록 점수 높음)
    documentation: number; // 주석 및 문서화
  };

  // 정성적 평가
  persona_review: string;  // 심사위원 페르소나의 상세 리뷰
  code_review: string;     // (Optional) 구체적인 코드 라인별 지적
  
  // 메타 데이터
  language: string;        // 감지된 언어
  line_count: number;      // 코드 라인 수
  
  // 개선 제안
  suggestions: string[];   // 구체적인 개선 가이드 리스트
  
  // 보안 취약점 (확장 예정)
  is_vulnerable: boolean;
  vulnerability_score: number;
  issues: any[];
}

