import React from 'react';
import { motion } from 'framer-motion';
// Copy 아이콘을 쓰기 위해 import에 추가하면 더 좋습니다 (여기선 기존 MessageSquare 사용)
import { RefreshCcw, ShieldCheck, Gauge, Zap, FileCode, CheckCircle2, MessageSquare, Lightbulb } from 'lucide-react';
import type { APIAnalysisResult, Role } from '../types';
import { TIER_CONFIG } from '../constants';
import { StatusRow } from '../components/StatusRow';

interface Props {
  data: APIAnalysisResult;
  onReset: () => void;
}

export const ResultPage = ({ data, onReset }: Props) => {
  const config = TIER_CONFIG[data.level];

  // 1. 함수를 컴포넌트 안으로 가져왔습니다. (이제 data를 읽을 수 있습니다)
  const handleCopyReview = () => {
    const text = `[흑백개발자 심사 결과]\n등급: ${data.level_title}\n판정: ${data.verdict}\n점수: ${data.overall_score}점\n\n셰프의 한마디:\n${data.persona_review}`;
    navigator.clipboard.writeText(text);
    alert("👨‍🍳 셰프의 평가가 클립보드에 복사되었습니다!");
  };

  return (
    <motion.div key="result" style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflowY: 'auto' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
         <img src={config.image} alt="bg" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(35px) brightness(0.2)' }} />
      </div>
      
      <div style={{ zIndex: 10, display: 'flex', width: '100%', maxWidth: '1400px', margin: '0 auto', alignItems: 'flex-start', padding: '5vh 5%', gap: '5%' }}>
        
        {/* [LEFT] Sticky Sidebar */}
        <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} style={{ flex: 1, textAlign: 'center', position: 'sticky', top: '5vh' }}>
          <div style={{ width: '100%', borderRadius: '20px', overflow: 'hidden', boxShadow: `0 0 50px ${config.color}44`, border: `1px solid ${config.color}88`, marginBottom: '30px' }}>
            <img src={config.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Result" />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#aaa', marginBottom: '10px' }}>{data.level_title}</h2>
          <h1 style={{ fontSize: '4rem', fontWeight: 900, textShadow: `0 0 20px ${config.color}`, marginBottom: '20px' }}>{data.verdict}</h1>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: config.color }}>{data.overall_score}<span style={{ fontSize: '1.5rem' }}>pt</span></div>
        </motion.div>

        {/* [RIGHT] Report Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '30px', paddingBottom: '10vh' }}>
          
          <div style={cardStyle}>
            <h3 style={cardTitleStyle}><Gauge size={20}/> 분석 지표</h3>
            <StatusRow label="보안" value={data.scores.security} icon={<ShieldCheck color="#ef4444" />} />
            <StatusRow label="품질" value={data.scores.quality} icon={<Gauge color="#3b82f6" />} />
            <StatusRow label="모범 사례" value={data.scores.best_practices} icon={<CheckCircle2 color="#10b981" />} />
            <StatusRow label="복잡도" value={data.scores.complexity} icon={<Zap color="#f59e0b" />} />
            <StatusRow label="문서화" value={data.scores.documentation} icon={<FileCode color="#8b5cf6" />} />
          </div>

          <div style={cardStyle}>
            <h3 style={cardTitleStyle}><MessageSquare size={20}/> 셰프의 총평</h3>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#eee', whiteSpace: 'pre-wrap', wordBreak: 'keep-all' }}>{data.persona_review}</p>
          </div>

          <div style={cardStyle}>
            <h3 style={cardTitleStyle}><Lightbulb size={20}/> 개선 가이드</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingLeft: '20px' }}>
              {data.suggestions.map((s, i) => <li key={i} style={{ fontSize: '1.1rem', color: '#ccc' }}>{s}</li>)}
            </ul>
          </div>

          {/* 버튼 영역: 가로로 배치하거나 세로로 쌓음 */}
          <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
            {/* 2. 공유하기 버튼 추가 */}
            <button onClick={handleCopyReview} style={copyButtonStyle}>
              <MessageSquare size={20} /> 결과 공유하기 (복사)
            </button>

            <button onClick={onReset} style={{ padding: '20px', borderRadius: '15px', backgroundColor: '#b91c1c', color: 'white', fontWeight: 'bold', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.2rem' }}>
              <RefreshCcw size={20} /> 다시 주방으로 돌아가기
            </button>
          </div>

        </motion.div>
      </div>
    </motion.div>
  );
};

const cardStyle: React.CSSProperties = { backgroundColor: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', borderRadius: '30px', padding: '40px', border: '1px solid rgba(255,255,255,0.1)' };
const cardTitleStyle: React.CSSProperties = { color: '#aaa', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' };

// 3. 누락되었던 copyButtonStyle 정의 추가
const copyButtonStyle: React.CSSProperties = {
  padding: '20px',
  borderRadius: '15px',
  backgroundColor: '#333', // 어두운 회색
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  border: '1px solid #555',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  fontSize: '1.2rem',
  transition: '0.2s',
};