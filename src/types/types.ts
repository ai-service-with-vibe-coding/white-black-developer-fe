// src/types.ts
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