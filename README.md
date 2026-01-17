# 직장인 유형 테스트 (Office Worker Type Test)

AI 얼굴 분석으로 알아보는 나의 직장인 동물 유형 테스트

**Live Demo**: https://animalface-2m5.pages.dev/

## 소개

직장인 유형 테스트는 사용자의 얼굴 사진을 AI로 분석하여 8가지 직장인 동물 유형 중 하나로 매칭해주는 웹 애플리케이션입니다. 모든 분석은 브라우저 내에서 로컬로 처리되어 개인정보가 외부로 전송되지 않습니다.

## 주요 기능

- **AI 얼굴 분석**: TensorFlow.js와 Teachable Machine을 활용한 실시간 얼굴 분석
- **8가지 직장인 유형**: 독수리, 사자, 판다, 다람쥐, 코알라, 미어캣, 하이에나, 철새
- **다국어 지원**: 한국어/영어 지원
- **결과 공유**: 이미지 저장, 이미지 공유, 링크 공유 기능
- **반응형 디자인**: 모바일/태블릿/데스크톱 지원
- **개인정보 보호**: 모든 처리가 브라우저 내에서만 이루어짐

## 8가지 직장인 동물 유형

| 이모지 | 한국어 | English |
|:------:|--------|---------|
| 🦅 | 칼퇴하는 독수리형 | The Clock-Out Eagle |
| 🦁 | 팀장감 사자형 | The Leader Lion |
| 🐼 | 야근요정 판다형 | The Overtime Panda |
| 🐿️ | 간식헌터 다람쥐형 | The Snack Hunter Squirrel |
| 🐨 | 휴게실 코알라형 | The Break Room Koala |
| 👀 | 눈치백단 미어캣형 | The Office-Savvy Meerkat |
| 🦴 | 회식러버 하이에나형 | The Team Dinner Hyena |
| 🕊️ | 이직준비 철새형 | The Career Migrant Bird |

## 기술 스택

### Frontend
- **HTML5 / CSS3 / JavaScript (ES6+)**
- **TensorFlow.js**: 브라우저 내 머신러닝 실행
- **Teachable Machine**: Google의 이미지 분류 모델
- **html2canvas**: 결과 카드 이미지 생성

### 배포 & 인프라
- **Cloudflare Pages**: 정적 사이트 호스팅
- **GitHub**: 소스 코드 관리

### SEO & 분석
- **Google AdSense**: 광고 수익화
- **구조화된 데이터 (JSON-LD)**: WebSite, WebApplication, FAQPage, HowTo 스키마
- **hreflang**: 다국어 SEO 최적화

## 프로젝트 구조

```
├── index.html              # 메인 페이지 (한국어)
├── about.html              # 소개 페이지
├── how-to-use.html         # 이용방법 페이지
├── privacy.html            # 개인정보처리방침
├── main.js                 # 메인 JavaScript (한국어)
├── style.css               # 스타일시트
├── og-image.png            # Open Graph 이미지
├── sitemap.xml             # 사이트맵
├── robots.txt              # 크롤러 설정
├── en/                     # 영어 버전
│   ├── index.html
│   ├── about.html
│   ├── how-to-use.html
│   ├── privacy.html
│   └── main.js
└── README.md
```

## 사용 방법

1. **사진 업로드**: 메인 화면에서 파일 선택 버튼을 클릭하거나 사진을 드래그 앤 드롭
2. **AI 분석**: 업로드된 사진을 AI가 분석 (몇 초 소요)
3. **결과 확인**: 8가지 유형 중 매칭된 유형과 상세 분석 결과 확인
4. **공유**: 결과 이미지를 저장하거나 SNS에 공유

### 좋은 결과를 위한 팁
- 얼굴이 정면으로 잘 보이는 사진 사용
- 밝은 조명에서 촬영된 사진
- 한 명만 나온 사진

## 로컬 개발

```bash
# 저장소 클론
git clone https://github.com/Yunik/animalface.git
cd animalface

# 로컬 서버 실행 (예: Python)
python -m http.server 8000

# 또는 Live Server 등 사용
# 브라우저에서 http://localhost:8000 접속
```

## SEO 최적화 적용 사항

- **메타 태그**: title, description, keywords, robots
- **Open Graph**: Facebook, 카카오톡 공유 최적화
- **Twitter Card**: 트위터 공유 최적화
- **구조화된 데이터**:
  - WebSite 스키마
  - WebApplication 스키마
  - FAQPage 스키마
  - HowTo 스키마
- **hreflang**: 한국어/영어 언어별 페이지 연결
- **sitemap.xml**: 모든 페이지 URL 포함
- **robots.txt**: 크롤러 접근 허용
- **GEO 최적화**: AI 검색 대응 (max-snippet:-1)

## 개인정보 보호

- 업로드된 이미지는 서버에 전송되지 않음
- 모든 AI 분석은 사용자 브라우저 내에서만 수행
- 분석 완료 후 이미지 데이터는 자동 삭제
- 개인정보 수집 없음

## 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 문의

- **이메일**: kyi0206@naver.com
- **웹사이트**: https://animalface-2m5.pages.dev/

---

**Disclaimer**: 본 테스트는 오락 목적으로 제작되었습니다. 결과는 실제 성격 진단이나 심리 분석과 무관하며, 재미로만 즐겨주세요!
