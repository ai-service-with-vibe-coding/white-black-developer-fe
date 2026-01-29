---

### 2. 📄 `docs/UI_RESULT_PAGE.md` (결과 페이지 문서)
`ResultPage.tsx`가 데이터를 어떻게 시각화하는지, **디자인 의도와 컴포넌트 구조**를 설명합니다.

```markdown
# 🎨 Result Page UI Documentation

## 1. 개요
`ResultPage.tsx`는 API로부터 받은 분석 데이터를 사용자가 직관적으로 이해할 수 있도록 시각화하는 컴포넌트입니다.
단순한 정보 전달을 넘어, **"요리 심사 결과 발표"**의 긴장감과 몰입감을 주는 것을 목표로 합니다.

---

## 2. 화면 구성 (Layout Strategy)

화면은 크게 **Header(결과 요약)**와 **Body(상세 분석)**로 나뉩니다.

### 2.1. Header Section (임팩트 영역)
사용자가 가장 먼저 보게 되는 영역으로, 직관적인 결과를 강조합니다.
- **Tier Badge & Title:** 좌측에 배치. 레벨에 따라 텍스트 색상이 동적으로 변경됨.
- **Verdict (판정):** 이탤릭체(Serif)를 사용하여 심사위원의 육성 같은 느낌 전달.
- **Overall Score:** 우측에 거대한 원형 게이지로 배치하여 시각적 균형을 맞춤.

### 2.2. Body Grid (정보 분할)
이성적 데이터와 감성적 평가를 분리하여 배치했습니다.
- **Left Column (감성): 심사위원 코멘트 (`Persona Review`)**
  - 인용구(`Quote`) 아이콘을 활용하여 리뷰의 권위를 표현.
  - 언어 및 코드 라인 수 정보를 하단에 메타 데이터로 배치.
- **Right Column (이성): 상세 능력치 (`Stats & Suggestions`)**
  - **StatBar:** 5가지 세부 지표를 막대 그래프로 표현.
  - **Recipe Notes:** 구체적인 개선 사항을 리스트 형태로 제공.

---

## 3. 주요 컴포넌트 및 로직

### 3.1. `StatBar` Component
각 능력치 점수(`security`, `quality` 등)를 시각화하는 내부 컴포넌트입니다.
- **Dynamic Coloring:** 점수 구간별 색상 변경
  - `80점 이상`: **Green (우수)**
  - `60점 ~ 79점`: **Yellow (보통)**
  - `60점 미만`: **Red (미흡)**
- **Animation:** `Framer Motion`을 사용하여 게이지가 서서히 차오르는 효과 적용 (`duration: 1.2s`).

### 3.2. Icon Mapping (Lucide React)
데이터의 성격에 맞는 아이콘을 매핑하여 가독성을 높였습니다.
- `Security` → **Shield** 🛡️
- `Quality` → **Award** 🏆
- `Best Practices` → **Zap** ⚡
- `Complexity` → **Boxes** 📦
- `Documentation` → **BookOpen** 📖

---

## 4. 애니메이션 설계 (Interaction)

사용자의 시선 흐름에 맞춰 요소들이 순차적으로 등장하도록 설계했습니다. (Staggering Effect)

1. **Page Load:** 전체 화면 페이드 인.
2. **0.3s:** 종합 점수(Overall Score) 뱃지가 회전하며 등장 (Spring 효과).
3. **0.5s:** 심사위원 코멘트 박스가 왼쪽에서 슬라이드 인.
4. **0.8s ~ 1.2s:** 상세 스탯 바가 순차적으로 차오름.
5. **1.5s:** '다시 도전하기' 버튼 등장.

---

## 5. 의존성 (Dependencies)
- **Framer Motion:** 페이지 전환 및 요소 등장 애니메이션.
- **Lucide React:** UI 아이콘 세트.
- **Tailwind CSS:** 레이아웃 및 스타일링.
- **src/types.ts:** 데이터 인터페이스 (`APIAnalysisResult`) 참조.