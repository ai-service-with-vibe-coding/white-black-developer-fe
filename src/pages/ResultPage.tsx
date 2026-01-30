import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { motion } from 'framer-motion';
import { ShieldCheck, Gauge, CheckCircle2, Zap, FileCode, MessageSquare, Lightbulb, RefreshCcw, Share2, X, Download } from 'lucide-react';
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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [feedImg, setFeedImg] = useState<string | null>(null);
  const [storyImg, setStoryImg] = useState<string | null>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  const [captureFormat, setCaptureFormat] = useState<'FEED' | 'STORY' | null>(null);

  const handleShare = async () => {
    setIsShareModalOpen(true);
    if (feedImg && storyImg) return;

    setIsGenerating(true);

    if (!captureRef.current) return;

    try {
      // 1. Generate FEED Image (1080x1080)
      setCaptureFormat('FEED');
      captureRef.current.style.width = '1080px';
      captureRef.current.style.height = '1080px';
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait for render

      const feedCanvas = await html2canvas(captureRef.current, {
        useCORS: true,
        background: '#000000',
        onclone: (document) => {
          const el = document.getElementById('capture-container');
          if (el) el.style.opacity = '1';
        }
      });
      setFeedImg(feedCanvas.toDataURL('image/png'));

      // 2. Generate STORY Image (1080x1920)
      setCaptureFormat('STORY');
      captureRef.current.style.width = '1080px';
      captureRef.current.style.height = '1920px';
      await new Promise(resolve => setTimeout(resolve, 500)); // Wait for render

      const storyCanvas = await html2canvas(captureRef.current, {
        useCORS: true,
        background: '#000000',
        onclone: (document) => {
          const el = document.getElementById('capture-container');
          if (el) el.style.opacity = '1';
        }
      });
      setStoryImg(storyCanvas.toDataURL('image/png'));

    } catch (e) {
      console.error("Image generation failed", e);
      alert("이미지 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
      setCaptureFormat(null);
      if (captureRef.current) {
        // Reset to default
        captureRef.current.style.width = '1080px';
        captureRef.current.style.height = '1080px';
      }
    }
  };

  const downloadImage = (dataUrl: string | null, format: string) => {
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.download = `white-black-developer-${format}.png`;
    link.href = dataUrl;
    link.click();
  };
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
            <StatusRow label="보안" value={analysisResult.scores.security} icon={<ShieldCheck color="#ef4444" />} color="#ef4444" />
            <StatusRow label="품질" value={analysisResult.scores.quality} icon={<Gauge color="#3b82f6" />} color="#3b82f6" />
            <StatusRow label="모범 사례" value={analysisResult.scores.best_practices} icon={<CheckCircle2 color="#10b981" />} color="#10b981" />
            <StatusRow label="복잡도" value={analysisResult.scores.complexity} icon={<Zap color="#f59e0b" />} color="#f59e0b" />
            <StatusRow label="문서화" value={analysisResult.scores.documentation} icon={<FileCode color="#8b5cf6" />} color="#8b5cf6" />
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

          <button onClick={handleShare} className={styles.shareBtn}>
            <Share2 size={20} /> 결과 공유하기
          </button>

          <button onClick={onRestart} className={styles.restartBtn}>
            <RefreshCcw size={20} /> 다시 주방으로 돌아가기
          </button>

          {/* SHARE MODAL */}
          {isShareModalOpen && (
            <div className={styles.modalOverlay} onClick={() => !isGenerating && setIsShareModalOpen(false)}>
              <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                {!isGenerating && (
                  <button className={styles.closeBtn} onClick={() => setIsShareModalOpen(false)}>
                    <X size={20} /> 닫기
                  </button>
                )}

                <h2 className={styles.modalTitle}>결과 공유하기</h2>

                {isGenerating ? (
                  <div className={styles.loadingOverlay}>
                    <div className={styles.spinner}></div>
                    <p>이미지를 생성하고 있습니다...</p>
                  </div>
                ) : (
                  <>
                    <p className={styles.modalSubtitle}>이미지를 저장하거나 링크를 복사하세요</p>

                    <div className={styles.previewContainer}>
                      <div className={styles.previewItem}>
                        <div className={styles.previewImageWrapper}>
                          {feedImg && <img src={feedImg} alt="Feed Preview" className={styles.previewImage} style={{ height: '200px', aspectRatio: '1/1' }} />}
                        </div>
                        <button className={styles.downloadBtn} onClick={() => downloadImage(feedImg, 'FEED')}>
                          <Download size={16} /> 피드용 (1:1)
                        </button>
                      </div>

                      <div className={styles.previewItem}>
                        <div className={styles.previewImageWrapper}>
                          {storyImg && <img src={storyImg} alt="Story Preview" className={styles.previewImage} style={{ height: '300px', aspectRatio: '9/16' }} />}
                        </div>
                        <button className={styles.downloadBtn} onClick={() => downloadImage(storyImg, 'STORY')}>
                          <Download size={16} /> 스토리용 (9:16)
                        </button>
                      </div>
                    </div>

                    <div className={styles.copyLinkContainer}>
                      <button
                        className={styles.textCopyBtn}
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          alert("링크가 복사되었습니다!");
                        }}
                      >
                        URL 복사하기
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* HIDDEN CAPTURE AREA */}
          <div ref={captureRef}
            id="capture-container"
            className={`${styles.captureContainer} ${captureFormat === 'FEED' ? styles.captureFeed : styles.captureStory}`}
            style={{ opacity: 0, left: '0', position: 'fixed', top: '0', zIndex: -50 }}>
            <img src={TIER_CONFIG[analysisResult.level]?.image} className={styles.captureBg} alt="bg" />
            <div className={styles.captureOverlay} />

            <div className={styles.captureContent}>

              <div className={styles.captureHeader}>
                <img src={TIER_CONFIG[analysisResult.level]?.image} className={styles.captureTierImg} alt="Tier"
                  style={{ borderColor: TIER_CONFIG[analysisResult.level]?.color, boxShadow: `0 0 80px ${TIER_CONFIG[analysisResult.level]?.color}66` }} />

                <div className={styles.captureTitleGroup}>
                  <h2 className={styles.captureLevel} style={{ color: '#ccc' }}>{analysisResult.level_title}</h2>
                  <h1 className={styles.captureVerdict} style={{ textShadow: `0 0 40px ${TIER_CONFIG[analysisResult.level]?.color}` }}>{analysisResult.verdict}</h1>
                  <div className={styles.captureScoreBox}>
                    <span style={{ color: TIER_CONFIG[analysisResult.level]?.color }}>{analysisResult.overall_score}</span> <span style={{ fontSize: '0.4em' }}> POINTS</span>
                  </div>
                </div>
              </div>

              {/* DETAILS SECTION */}
              <div className={styles.captureDetails}>

                {/* COLUMN 1: Scores */}
                <div className={styles.captureColumn}>
                  <div className={styles.captureBox}>
                    <h3 className={styles.captureBoxTitle}><Gauge size={30} /> 상세 분석</h3>
                    {/* Custom StatusRow for Capture */}
                    <div className={styles.captureStatusRow}><div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><ShieldCheck size={24} /> 보안</div> <div className={styles.captureStatusBar}><div className={styles.captureStatusBarFill} style={{ width: `${analysisResult.scores.security}%`, background: '#ef4444' }}></div></div></div>
                    <div className={styles.captureStatusRow}><div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><Gauge size={24} /> 품질</div> <div className={styles.captureStatusBar}><div className={styles.captureStatusBarFill} style={{ width: `${analysisResult.scores.quality}%`, background: '#3b82f6' }}></div></div></div>
                    <div className={styles.captureStatusRow}><div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><CheckCircle2 size={24} /> 모범 사례</div> <div className={styles.captureStatusBar}><div className={styles.captureStatusBarFill} style={{ width: `${analysisResult.scores.best_practices}%`, background: '#10b981' }}></div></div></div>
                    <div className={styles.captureStatusRow}><div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><Zap size={24} /> 복잡도</div> <div className={styles.captureStatusBar}><div className={styles.captureStatusBarFill} style={{ width: `${analysisResult.scores.complexity}%`, background: '#f59e0b' }}></div></div></div>
                    <div className={styles.captureStatusRow}><div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}><FileCode size={24} /> 문서화</div> <div className={styles.captureStatusBar}><div className={styles.captureStatusBarFill} style={{ width: `${analysisResult.scores.documentation}%`, background: '#8b5cf6' }}></div></div></div>
                  </div>
                </div>

                {/* COLUMN 2: Review & Suggestions */}
                <div className={styles.captureColumn}>
                  <div className={styles.captureBox}>
                    <h3 className={styles.captureBoxTitle}><MessageSquare size={30} /> 셰프의 총평</h3>
                    <p className={styles.captureText}>
                      {personaReview || analysisResult.persona_review || "리뷰가 없습니다."}
                    </p>
                  </div>

                  <div className={styles.captureBox}>
                    <h3 className={styles.captureBoxTitle}><Lightbulb size={30} /> 개선 가이드</h3>
                    <ul className={styles.captureList}>
                      {/* Show max 3 suggestions for space */}
                      {analysisResult.suggestions.slice(0, 3).map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              <div className={styles.captureFooter}>
                <p>나의 개발자 등급은?</p>
                <p className={styles.captureBrand}>Code Class War</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}

function StatusRow({ label, value, icon, color }: { label: string, value: number, icon: React.ReactNode, color: string }) {
  return (
    <div className={styles.statusRow}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', gap: '10px', color: '#e5e7eb' }}>{icon} {label}</div>
        <div style={{ fontWeight: 'bold' }}>{value.toFixed(1)}%</div>
      </div>
      <div className={styles.barBg}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ delay: 2, duration: 1.5 }} style={{ height: '100%', background: color, boxShadow: `0 0 10px ${color}` }} />
      </div>
    </div>
  );
}