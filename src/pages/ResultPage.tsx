import React from 'react';
import { motion } from 'framer-motion';
// 방금 만든 types.ts에서 타입을 가져옵니다
import { APIAnalysisResult } from '../types';
import { 
  Shield, Award, Zap, Boxes, BookOpen, 
  Quote, Lightbulb, Code2, ScrollText, RefreshCcw 
} from 'lucide-react';

// --- 개발용 MOCK DATA ---
const MOCK_RESULT: APIAnalysisResult = {
  "level": 3,
  "level_title": "중급 개발자",
  "verdict": "생존하셨습니다",
  "overall_score": 69.1,
  "scores": {
    "security": 65.33, "quality": 70, "best_practices": 75,
    "complexity": 80, "documentation": 50
  },
  "code_review": "<msg>Please remove this blank line.",
  "persona_review": "이 코드는 모듈화가 타이트하다는 점은 높이 평가됩니다. 그러나, 함수의 중복 사용, 주석의 부족 등은 개선해야 할 부분입니다. 코드의 완성도는 조금 모자라기는 하지만, 기능적으로는 전반적으로는 잘 작성된 것 같습니다.",
  "is_vulnerable": false,
  "vulnerability_score": 65.33,
  "issues": [],
  "suggestions": [
    "문서화 점수가 50점입니다. 주석과 문서화를 추가하세요.",
    "보안 점수가 65점입니다. 입력 검증, SQL 인젝션 방지 등 보안 가이드를 참고하세요.",
    "설계 패턴과 아키텍처에 대한 이해를 높이세요."
  ],
  "language": "python",
  "line_count": 66
};

// --- 스탯 바 컴포넌트 ---
const StatBar = ({ label, score, icon: Icon, delay }: { label: string, score: number, icon: any, delay: number }) => {
  let barColor = "bg-red-500";
  let textColor = "text-red-400";
  if (score >= 80) { barColor = "bg-green-500"; textColor = "text-green-400"; }
  else if (score >= 60) { barColor = "bg-yellow-500"; textColor = "text-yellow-400"; }
  
  const formatLabel = (key: string) => key.replace('_', ' ').toUpperCase();

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2 text-sm">
        <div className={`flex items-center gap-2 ${textColor} font-semibold`}>
          <Icon size={16} /> <span>{formatLabel(label)}</span>
        </div>
        <span className="font-mono text-white">{score.toFixed(1)} / 100</span>
      </div>
      <div className="w-full h-3 bg-gray-800/50 rounded-full overflow-hidden border border-white/10">
        <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 1, delay }} className={`h-full rounded-full ${barColor}`} />
      </div>
    </div>
  );
};

// --- 메인 페이지 ---
export default function ResultPage({ resultData = MOCK_RESULT, onRestart }: { resultData?: APIAnalysisResult, onRestart?: () => void }) {
  const data = resultData;
  const tierColor = data.level >= 4 ? "text-white" : data.level === 3 ? "text-blue-300" : "text-gray-300";

  return (
    <div className="min-h-screen bg-black text-white p-8 overflow-y-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-800 pb-8">
          <div>
            <span className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-400">LV.{data.level}</span>
            <h1 className={`text-6xl font-black mt-2 ${tierColor}`}>{data.level_title}</h1>
            <p className="text-2xl text-gray-400 italic mt-2">"{data.verdict}"</p>
          </div>
          <div className="relative w-40 h-40 flex items-center justify-center bg-gray-900 rounded-full border-4 border-gray-700 mt-6 md:mt-0">
            <span className="text-5xl font-bold">{data.overall_score.toFixed(0)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 왼쪽: 리뷰 */}
          <div className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
            <Quote className="text-gray-600 mb-4" size={40} />
            <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line">{data.persona_review}</p>
            <div className="flex gap-4 mt-6 text-sm text-gray-500">
               <span className="flex items-center gap-1"><Code2 size={14}/> {data.language}</span>
               <span className="flex items-center gap-1"><ScrollText size={14}/> {data.line_count} lines</span>
            </div>
          </div>

          {/* 오른쪽: 스탯 & 제안 */}
          <div className="space-y-8">
            <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
              <h3 className="text-gray-400 font-bold mb-4 uppercase text-sm">Stats Analysis</h3>
              <StatBar label="security" score={data.scores.security} icon={Shield} delay={0.1} />
              <StatBar label="quality" score={data.scores.quality} icon={Award} delay={0.2} />
              <StatBar label="best_practices" score={data.scores.best_practices} icon={Zap} delay={0.3} />
              <StatBar label="complexity" score={data.scores.complexity} icon={Boxes} delay={0.4} />
              <StatBar label="documentation" score={data.scores.documentation} icon={BookOpen} delay={0.5} />
            </div>

            <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
               <h3 className="text-gray-400 font-bold mb-4 uppercase text-sm flex items-center gap-2"><Lightbulb size={16} className="text-yellow-500"/> Suggestions</h3>
               <ul className="space-y-2 text-gray-300 text-sm">
                 {data.suggestions.map((s, i) => <li key={i} className="flex gap-2"><span>•</span> {s}</li>)}
               </ul>
            </div>
          </div>
        </div>

        {onRestart && (
          <div className="mt-12 text-center">
            <button onClick={onRestart} className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-full font-bold flex items-center gap-2 mx-auto transition-colors">
              <RefreshCcw size={18} /> 다시 도전하기
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}