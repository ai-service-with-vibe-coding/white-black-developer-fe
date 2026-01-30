# ✅ Git 업로드 체크리스트 (최종 통합본)

이번 커밋은 **"흑백개발자 서비스의 전체 프론트엔드 워크플로우 구현 및 백엔드 연동 준비"** 작업을 포함합니다.
아래 파일들이 모두 Staging Area에 포함되었는지 확인하세요.

## 1. 📦 핵심 로직 및 상수 (필수)
- [ ] **`src/types.ts`**
    - `Role`, `GameState` 타입 정의
    - `APIAnalysisResult` 인터페이스 명칭 변경 및 필드 최신화
- [ ] **`src/api/analyze.ts`**
    - `requestAnalysis` 함수 반환 타입을 `APIAnalysisResult`로 변경
    - 목업(Mock) 데이터 구조 동기화
- [ ] **`src/constants/index.ts`**
    - `LANGUAGES` (언어 목록) 및 `TIER_CONFIG` (등급별 데이터) 정의

## 2. 🧩 UI 컴포넌트 및 메인
- [ ] **`src/App.tsx`**
    - `useState` 제네릭 타입 수정 (`<APIAnalysisResult | null>`)
    - 전체 페이지 라우팅 로직 연결
- [ ] **`src/components/StatusRow.tsx`**
    - 결과 페이지용 능력치(보안, 품질 등) 게이지 바 컴포넌트

## 3. 📄 페이지 (Pages)
- [ ] **`src/pages/LandingPage.tsx`**
    - 인트로 화면 및 진입 버튼 구현
- [ ] **`src/pages/SelectionPage.tsx`**
    - 직군(Frontend/Backend) 선택 로직 및 `import type` 수정
- [ ] **`src/pages/InputPage.tsx`**
    - 언어 선택 및 코드 에디터 UI 구현
- [ ] **`src/pages/Loading.tsx`**
    - "맛보는 중" 로딩 애니메이션 및 셰프 멘트 로직
- [ ] **`src/pages/ResultPage.tsx`**
    - 심사 결과 시각화 및 "결과 공유하기" 버튼 구현

## 4. 🖼️ 정적 리소스 (Assets)
*`public` 폴더에 파일이 없으면 에러가 발생합니다.*
- [ ] **`public/main-bg.png`** (배경)
- [ ] **`public/tasting.mp3`** (로딩 BGM)
- [ ] **`public/tasting.gif`** (로딩 움짤)
- [ ] **`public/images/`** 폴더 내 `result_lv1.png` ~ `result_lv5.png`

## 5. 🐍 Python 백엔드 환경 설정
- [ ] **`pyproject.toml`**
    - `Pillow`, `requests` 의존성 추가
- [ ] **`uv.lock`**
    - 라이브러리 버전 잠금 파일 업데이트

## 6. 📝 문서화
- [ ] **`docs/TROUBLESHOOTING.md`**
    - 개발 트러블슈팅 로그
- [ ] **`docs/CHECKLIST.md`**
    - 현재 이 파일

---

## 🚀 커밋 가이드

**터미널 명령어 예시:**

```bash
# 1. 변경된 파일 상태 확인 (특히 public 폴더와 신규 페이지들)
git status

# 2. 모든 변경사항 스테이징
git add .

# 3. 커밋 메시지 작성
git commit -m "feat: implement full frontend workflow and type system"

# 4. 원격 저장소로 푸시
git push origin main