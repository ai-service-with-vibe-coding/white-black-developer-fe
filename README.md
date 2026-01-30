# 👨‍🍳 흑백개발자 (Code Class War)

> **"당신의 코드는... 익었습니까?"**
> 넷플릭스 예능 '흑백요리사'의 컨셉을 차용한 **AI 코드 리뷰 & 계급 측정 서비스**

![실행 예시 화면](./src/docs/images/preview.gif)

---

## 1. 📖 프로젝트 개요 (Project Overview)

**'흑백개발자'**는 사용자의 코드를 AI가 분석하여 '흑수저(Backend/Hidden)'와 '백수저(Frontend/Star)' 컨셉에 맞춰 평가하고, **개발자 계급(Tier)**을 매겨주는 서비스입니다.

단순한 텍스트 기반의 딱딱한 코드 리뷰를 넘어, **"사용자 경험(UX)과 몰입감"**을 극대화하기 위해 애니메이션 인터랙션과 시각적 피드백에 중점을 두고 설계했습니다.

### ✨ 주요 기능 (Key Features)
- **🎭 몰입형 인트로**: '흑백요리사' 오프닝을 패러디한 웅장한 랜딩 페이지
- **⚔️ 진영 선택**: Frontend(백) vs Backend(흑) 직군 선택 인터페이스
- **🤖 AI 코드 심사**: 코드 스타일, 보안, 효율성을 분석하는 '테이스팅' 로딩 연출
- **📊 티어(Tier) 산정**: Lv.1(폐기처분)부터 Lv.5(Grand Master)까지 5단계 등급 부여
- **📝 셰프의 페르소나**: 셰프가 직접 말하는 듯한 독설과 칭찬 피드백
- **🔗 결과 공유**: 심사 결과를 복사하여 동료들과 공유하는 기능

---

## 2. 🛠️ Architecture & Design Decisions (설계 및 기술)

본 프로젝트는 해커톤 및 단기 프로젝트 환경에서 **최상의 생산성과 사용자 경험**을 동시에 잡기 위해 다음과 같은 기술적 의사결정을 내렸습니다.

### ⚡ Core: React + Vite
- **선정 이유**: CRA 대비 압도적으로 빠른 빌드 속도와 HMR(Hot Module Replacement)을 지원하는 Vite를 선택하여 개발 생산성을 극대화했습니다.
- **활용**: SPA(Single Page Application) 구조로 끊김 없는 페이지 전환을 구현했습니다.

### 🎨 Styling & Animation: CSS-in-JS & Framer Motion
- **선정 이유**: '흑백'이라는 대비되는 테마를 동적으로 제어하고, 복잡한 클래스명 관리 없이 **빠른 프로토타이핑**을 하기 위해 인라인 스타일링(CSS-in-JS) 방식을 채택했습니다.
- **몰입감 강화**: 정적인 화면이 주는 지루함을 없애기 위해 `Framer Motion`을 활용하여 페이지 진입, 게이지 바 상승, 텍스트 등장 등 **동적인 인터랙션**을 구현했습니다.

### 🛡️ Type System: TypeScript
- **선정 이유**: `APIAnalysisResult`, `Role` 등 명확한 데이터 구조 정의를 통해, 프론트엔드와 백엔드 간의 통신 오류를 사전에 방지하고 유지보수성을 높였습니다.

### 📂 Folder Structure
```text
src/
├── api/          # 백엔드 통신 로직 (requestAnalysis)
├── components/   # 재사용 가능한 UI (StatusRow 등)
├── constants/    # 상수 데이터 (언어 목록, 등급별 설정)
├── pages/        # 페이지 단위 컴포넌트 (Landing, Selection, Result...)
└── types.ts      # TypeScript 인터페이스 정의
---
### 3. 🚀 Getting Started
이 프로젝트를 로컬 환경에서 실행하려면 아래 절차를 따라주세요.

## #Prerequisites
- Node.js (v18 이상 권장)
- Python (v3.12 이상, 백엔드 연동 시)

### Installation & Run

```bash
# 1. 저장소 클론
git clone [https://github.com/your-username/code-class-war.git](https://github.com/your-username/code-class-war.git)

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
```
---
## 4. 📚 Documentation (Dev Logs)

개발 과정에서의 기술적 고민과 트러블 슈팅 내역은 `docs` 폴더에 정리되어 있습니다.

- [🐛 **트러블슈팅 로그 보러가기**](./src/docs/TROUBLESHOOTING.md)
- [✅ **배포 체크리스트**](./src/docs/CHECKLIST.md)
