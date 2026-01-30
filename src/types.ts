// src/types.ts

// 👇 1. 백엔드 응답 데이터 타입
export interface APIAnalysisResult {
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
  is_vulnerable: boolean;
  vulnerability_score: number;
  issues: any[];
  suggestions: string[];
  language: string;
  line_count: number;
}

// 2. 게임 상태 타입 
export type GameState = 'LANDING' | 'SELECTION' | 'INPUT' | 'LOADING' | 'RESULT';

// 3.  Role 타입 
export type Role = 'Frontend' | 'Backend' | null;