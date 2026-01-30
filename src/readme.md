# 🧑‍🍳 흑백개발자 (Code Class War) 💻

**"당신의 코드는... 고르게 익었습니까?"**
>
> 흑백개발자는 안성재 셰프의 엄격한 심사 기준을 코딩의 세계로 가져온 **고품격 코드 등급 판정 플랫폼**입니다. 단순한 텍스트 분석을 넘어, 시각적·청각적 연출을 통해 당신의 코드가 '생존'할 수 있을지 판정합니다.



## ✨ 핵심 기능 (Key Features)

### 1. 직군 및 언어 기반 커스텀 심사
- **Role Selection**: Frontend와 Backend 중 본인의 주방(직군)을 선택하여 심사 문맥을 결정합니다.
- **Multi-Language Tabs**: JavaScript, Python, Java, C++, Go 등 다양한 언어 선택 탭을 제공합니다.
- **Dynamic IDE UI**: 선택한 언어에 따라 에디터의 파일명(`main.py`, `main.java` 등)이 실시간으로 동기화됩니다.

### 2. 몰입형 로딩 시스템 (High-Retention Loading)
- **Visual Spinning**: 회전하는 붉은 테두리와 테이스팅 GIF를 통해 '분석 중'임을 역동적으로 시각화합니다.
- **Interactive Quotes**: 2.5초마다 바뀌는 셰프의 위트 있는 대사로 긴 대기 시간(최대 1분)의 지루함을 해소합니다.
- **Auditory Immersion**: 전용 사운드트랙(`tasting.mp3`)을 통해 심사의 긴장감을 극대화합니다.

### 3. 고도화된 분석 리포트 (Dual-Layout Report)
- **Tier Animation**: 왼쪽 슬라이드 연출과 함께 최종 등급(GRAND MASTER부터 RED RAW까지)을 노출합니다.
- **5-Point Status Bar**: 보안, 품질, 모범 사례, 복잡도, 문서화의 5대 지표를 애니메이션 게이지 바로 보여줍니다.

---

## 📁 폴더 구조 (Project Structure)

프로젝트의 유지보수와 확장성을 고려하여 아래와 같이 구조화되었습니다.

```text
흑백개발자-프로젝트/
├── public/
│   ├── images/
│   │   └── result_lv1.png ~ result_lv5.png  # 결과 등급별 이미지
│   ├── main-bg.png                         # 메인 랜딩 배경
│   ├── tasting.gif                        # 로딩 중 움짤
│   └── tasting.mp3                        # 로딩 중 사운드
├── src/
│   ├── assets/          # 공통 아이콘 리소스
│   ├── components/      # UI 컴포넌트 (StatusRow 등)
│   ├── constants/       # LANGUAGES, RESULTS 데이터 관리
│   ├── types/           # TS 타입 정의 (AnalysisStatus 등)
│   ├── App.tsx          # 전체 로직 및 State 제어
│   └── main.tsx         # 진입점
└── README.md            # 본 문서



## 🛠 기술 스택 (Tech Stack)
- Frontend: React 18 (TypeScript)

- Bundler: Vite

- Animation: Framer Motion

- Icons: Lucide-React

- Styling: Responsive Inline CSS (Web & Mobile 완벽 지원)

```
---
## 🚀 시작하기 & 배포 (Getting Started & Deployment)

### 1. 개발 환경 실행

``` bash
# 의존성 설치
npm install
```
``` bash
# 프로젝트 실행
npm run dev
```

### 2. 배포 가이드 (Vercel / Netlify 권장)
Build Command: npm run build

Output Directory: dist

ENV 설정: API 연동 시 필요한 서버 주소는 환경 변수로 관리하는 것을 권장합니다.
---

## 📡 백엔드 API 연동 명세 (API Specification)
본 프로젝트는 현재 목업 데이터로 작동하며, 서버 준비 시 App.tsx 내 handleStartAnalysis 함수를 수정하십시오.

### Endpoint: POST /api/analyze

### Request Body:

```json
{
  "code": "string",
  "role": "Frontend | Backend",
  "language": "js | ts | java | py ..."
}
```

### Response Body:
```json
{
  "tier_index": 0, 
  "scores": {
    "security": 85.5,
    "quality": 70.0,
    "best_practices": 75.0,
    "complexity": 60.0,
    "documentation": 50.0
  }
}
```

## 📘 설계 의도 (Design Philosophy)

1. 가독성과 집중성: 원형 프레임 내에 시각적 요소를 가두어 사용자의 시선을 화면 중앙으로 집중시켰습니다.

2. 이탈률 방지: 긴 분석 시간을 고려하여 시스템 상태(로딩 바)와 순환하는 위트 있는 대사를 배치했습니다.

3. 심리적 리듬: 결과 화면에서 '등급(감성)'을 먼저 슬라이드로 보여준 뒤, '데이터(이성)'를 페이드인으로 노출하여 심리적 만족감을 높였습니다.
---

## 💬 커밋 컨벤션 (Commit Convention)
- feat: 새로운 기능 추가

- fix: 버그 수정

- docs: 문서 수정 (README 등)

- style: 디자인 및 스타일 수정

- refactor: 코드 리팩토링