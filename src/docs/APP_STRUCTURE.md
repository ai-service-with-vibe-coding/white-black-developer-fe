# 📱 App.tsx Structure & Logic (앱 구조 및 로직)

## 1. 개요 (Overview)
`App.tsx`는 애플리케이션의 **진입점(Entry Point)**이자, 전역 상태를 관리하는 **중앙 컨트롤러**입니다.
별도의 복잡한 라우팅 라이브러리(`react-router-dom`)를 사용하지 않고, **단일 상태(`gameState`)** 기반의 조건부 렌더링을 통해 가볍고 빠른 화면 전환을 구현했습니다.

---

## 2. 상태 관리 (State Management)

앱은 `useState`를 사용하여 크게 3가지 핵심 상태를 관리합니다.

### 2.1. Game State (화면 흐름 제어)
`gameState` 변수는 현재 사용자가 어느 단계에 있는지 정의합니다.

| State | 설명 (Description) | 화면 컴포넌트 |
|:---:|:---|:---|
| **`LANDING`** | 초기 시작 화면 (타이틀) | `<LandingPage />` |
| **`SELECTION`** | 개발 직군 선택 (Frontend/Backend) | `<SelectionPage />` |
| **`INPUT`** | 코드 입력 및 제출 화면 | `<InputPage />` |
| **`LOADING`** | 심사 중 (API 통신 및 로딩 애니메이션) | `<LoadingScreen />` |
| **`RESULT`** | 최종 심사 결과 대시보드 | `<ResultPage />` |

### 2.2. User Data (사용자 데이터)
- **`role`**: 사용자가 선택한 직군 (`Frontend` | `Backend` | `null`)
- **`analysisResult`**: 백엔드(또는 Mock)로부터 받은 분석 결과 객체. `src/types.ts`에 정의된 `APIAnalysisResult` 타입을 따릅니다.

---

## 3. 핵심 로직 (Core Logic)

### 3.1. `handleCodeSubmit` (코드 제출 핸들러)
사용자가 코드를 제출했을 때 실행되는 비동기 함수입니다.

1. **상태 변경:** `gameState`를 `'LOADING'`으로 변경하여 로딩 화면 노출.
2. **API 통신 (Simulation):**
   - 현재는 `setTimeout`을 사용하여 3초간 심사 과정을 시뮬레이션합니다.
   - (주석 처리됨) 실제 구현 시 `fetch`를 통해 백엔드 분석 서버로 코드를 전송합니다.
3. **데이터 매핑:** 응답받은 데이터를 `analysisResult` 상태에 저장.
4. **결과 이동:** `gameState`를 `'RESULT'`로 변경하여 결과 페이지 렌더링.

### 3.2. Internal Component: `<LoadingScreen />`
- `App.tsx` 내부에 정의된 로딩 전용 컴포넌트입니다.
- **기능:** "코드를 맛보는 중...", "가비지 컬렉터와 대화 중..." 등의 멘트가 1.5초마다 랜덤하게 바뀌며 지루함을 덜어주는 UX를 제공합니다.

---

## 4. 화면 전환 애니메이션 (Transition)

`Framer Motion`의 `<AnimatePresence mode="wait">`를 사용하여, 컴포넌트가 DOM에서 사라지고 나타날 때 자연스러운 페이드 인/아웃 효과를 적용했습니다.

```tsx
<AnimatePresence mode="wait">
  {gameState === 'LANDING' && <LandingPage ... />}
  {gameState === 'SELECTION' && <SelectionPage ... />}
  {/* ... */}
</AnimatePresence>