import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Gauge, CheckCircle2, Zap, FileCode, MessageSquare, Lightbulb, RefreshCcw, Share2 } from 'lucide-react';
import styles from '../App.module.css';
import { APIAnalysisResult } from '../types/types';

// 등급별 비주얼 설정 (level 값에 따라 매핑)
const TIER_CONFIG: Record<number, { image: string, color: string }> = {
  5: { image: '/images/result_lv5.png', color: '#ffffff' },
  4: { image: '/images/result_lv4.png', color: '#d1d5db' },
  3: { image: '/images/result_lv3.png', color: '#60a5fa' },
  2: { image: '/images/result_lv2.png', color: '#4ade80' },
  1: { image: '/images/result_lv1.png', color: '#f87171' },
};

interface ResultPageProps {
  analysisResult: APIAnalysisResult;
  personaReview: string;
  onRestart: () => void;
}

export default function ResultPage({ analysisResult, personaReview, onRestart }: ResultPageProps) {
  return (
    <motion.div key="result" className={styles.resultContainer}>
      <div className={styles.resultBg}>
        <img src={TIER_CONFIG[analysisResult.level]?.image} alt="bg" className={styles.bgImage} style={{ filter: 'blur(35px) brightness(0.2)' }} />
      </div>
      <div className={styles.resultContent}>

        {/* [LEFT] 이미지 + 티어 (고정형 레이아웃) */}
        <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} className={styles.resultLeft}>
          <div className={styles.tierImageWrapper} style={{ boxShadow: `0 0 50px ${TIER_CONFIG[analysisResult.level]?.color}44`, border: `1px solid ${TIER_CONFIG[analysisResult.level]?.color}88` }}>
            <img src={TIER_CONFIG[analysisResult.level]?.image} className={styles.bgImage} alt="Result" />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#aaa', marginBottom: '10px' }}>{analysisResult.level_title}</h2>
          <h1 style={{ fontSize: '4rem', fontWeight: 900, textShadow: `0 0 20px ${TIER_CONFIG[analysisResult.level]?.color}`, marginBottom: '20px' }}>{analysisResult.verdict}</h1>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: TIER_CONFIG[analysisResult.level]?.color }}>{analysisResult.overall_score}<span style={{ fontSize: '1.5rem' }}>pt</span></div>
        </motion.div>

        {/* [RIGHT] 상세 보고서 (내부 스크롤 가능) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className={styles.resultRight}>

          {/* 1. 스테이터스 바 */}
          <div className={styles.resultBox}>
            <h3 className={styles.boxHeader}><Gauge size={20} /> 분석 지표</h3>
            <StatusRow label="보안" value={analysisResult.scores.security} icon={<ShieldCheck color="#ef4444" />} />
            <StatusRow label="품질" value={analysisResult.scores.quality} icon={<Gauge color="#3b82f6" />} />
            <StatusRow label="모범 사례" value={analysisResult.scores.best_practices} icon={<CheckCircle2 color="#10b981" />} />
            <StatusRow label="복잡도" value={analysisResult.scores.complexity} icon={<Zap color="#f59e0b" />} />
            <StatusRow label="문서화" value={analysisResult.scores.documentation} icon={<FileCode color="#8b5cf6" />} />
          </div>

          {/* 2. 페르소나 리뷰 (텍스트 짤림 방지) */}
          <div className={styles.resultBox}>
            <h3 className={styles.boxHeader}><MessageSquare size={20} /> 셰프의 총평</h3>
            <p className={styles.reviews}>
              {/* 스트리밍 중이거나 personaReview가 있으면 그것을 보여주고, 아니면 analysisResult의 값을 보여줌 (백엔드가 빈 값을 줄수도 있으므로) */}
              {personaReview || analysisResult.persona_review || "셰프가 리뷰를 작성 중입니다..."}
            </p>
          </div>

          {/* 3. 개선 제안 */}
          <div className={styles.resultBox}>
            <h3 className={styles.boxHeader}><Lightbulb size={20} /> 개선 가이드</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingLeft: '20px' }}>
              {analysisResult.suggestions.map((s, i) => (
                <li key={i} style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: '1.5' }}>{s}</li>
              ))}
            </ul>
          </div>

          <button onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("링크가 복사되었습니다!");
          }} className={styles.shareBtn}>
            <Share2 size={20} /> 결과 공유하기
          </button>

          <button onClick={onRestart} className={styles.restartBtn}>
            <RefreshCcw size={20} /> 다시 주방으로 돌아가기
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}

function StatusRow({ label, value, icon }: { label: string, value: number, icon: React.ReactNode }) {
  return (
    <div className={styles.statusRow}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', gap: '10px', color: '#e5e7eb' }}>{icon} {label}</div>
        <div style={{ fontWeight: 'bold' }}>{value.toFixed(1)}%</div>
      </div>
      <div className={styles.barBg}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ delay: 2, duration: 1.5 }} style={{ height: '100%', background: 'linear-gradient(90deg, #333, #fff)' }} />
      </div>
    </div>
  );
}