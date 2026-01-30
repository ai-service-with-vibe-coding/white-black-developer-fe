export interface BackendResponse {
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
  suggestions: string[];
  language: string;
  line_count: number;
}

export type GameState = 'LANDING' | 'SELECTION' | 'INPUT' | 'LOADING' | 'RESULT';
export type Role = 'Frontend' | 'Backend' | null;