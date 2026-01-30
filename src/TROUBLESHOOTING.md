# 🛠️ 개발 트러블슈팅 로그 (Frontend & Environment)

## 1. Python 환경 설정 오류 (uv, 라이브러리)
### 🚨 문제 상황
- `uv run`으로 Python 스크립트 실행 시 `ModuleNotFoundError: No module named 'Pillow'` 및 `'requests'` 오류 발생.
- 프로젝트 초기화 시 `pyproject.toml` 설정 충돌 발생.

### ✅ 해결 방법
- `uv add Pillow`, `uv add requests` 명령어로 필요한 라이브러리를 가상환경에 명시적으로 설치.
- 기존 `pyproject.toml`을 삭제하고 `uv init --python=3.12`로 재설정하여 버전 호환성 문제 해결.

---

## 2. TypeScript 모듈 Export 오류
### 🚨 문제 상황
- `Uncaught SyntaxError: ... does not provide an export named 'Role'` 발생.
- `types.ts`에 타입을 정의했으나 다른 컴포넌트에서 import 할 때 찾지 못함.

### ✅ 해결 방법
- `types.ts` 내부의 `enum`과 `type` 정의 앞에 `export` 키워드가 누락된 것을 확인하고 추가.
- 컴포넌트에서 import 시 `import type { ... }` 문법을 사용하여, 컴파일 시 타입이 제거되더라도 에러가 나지 않도록 명시.

---

## 3. 인터페이스 명칭 불일치 (Refactoring 이슈)
### 🚨 문제 상황
- 백엔드 응답 타입을 `BackendResponse`에서 `APIAnalysisResult`로 변경했으나, `App.tsx`, `ResultPage.tsx` 등에서 여전히 구버전 이름을 참조하여 빌드 에러 발생.

### ✅ 해결 방법
- `types.ts`의 인터페이스 명칭을 `APIAnalysisResult`로 확정.
- `analyze.ts` (API 요청 함수), `App.tsx` (상태 관리), `ResultPage.tsx` (Props)의 모든 의존성을 새로운 이름으로 일괄 교체 및 통일.