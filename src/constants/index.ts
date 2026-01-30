// 심사 결과 데이터
// src/constants/index.ts

export const LANGUAGES = [
  { name: 'JavaScript', ext: 'js' },
  { name: 'TypeScript', ext: 'ts' },
  { name: 'React', ext: 'tsx' },
  { name: 'Java', ext: 'java' },
  { name: 'Python', ext: 'py' },
  { name: 'C++', ext: 'cpp' },
  { name: 'Go', ext: 'go' },
];

interface TierDetail {
  title: string;
  image: string;
  color: string;
  comment: string;
}

// level(1~5)을 키로 하여 모든 정보를 통합 관리합니다.
export const TIER_CONFIG: Record<number, TierDetail> = {
  5: { 
    title: 'Lv.5 GRAND MASTER',
    image: '/images/result_lv5.png', 
    color: '#ffffff', 
    comment: '"이 코드는... 예술입니다.\n제가 평가할 영역이 아니에요.\n완벽하게 이븐(Even)합니다."' 
  },
  4: { 
    title: 'Lv.4 BLACK LABEL',
    image: '/images/result_lv4.png', 
    color: '#d1d5db', 
    comment: '"와, 이거 재밌네.\n테크닉이 아주 좋아요.\n생존입니다."' 
  },
  3: { 
    title: 'Lv.3 BLUE SOUS CHEF',
    image: '/images/result_lv3.png', 
    color: '#60a5fa', 
    comment: '"기본기는 탄탄해요.\n근데... 본인의 색깔이 없어요.\n흔한 맛입니다."' 
  },
  2: { 
    title: 'Lv.2 GREEN GARNISH',
    image: '/images/result_lv2.png', 
    color: '#4ade80', 
    comment: '"보기에만 좋네요.\n이 코드, 메인 디쉬가 없어요.\n그냥 장식품입니다."' 
  },
  1: { 
    title: 'Lv.1 RED RAW',
    image: '/images/result_lv1.png', 
    color: '#f87171', 
    comment: '"안 익었어요.\n이걸 지금 배포하라고 가져온 거예요?\n폐기처분 하겠습니다."' 
  },
};