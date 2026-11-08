// project-info.js - 프로젝트 소개 화면

const ProjectInfo = (() => {
  function render() {
    const contentArea = document.getElementById('contentArea');
    if (!contentArea) return;

    contentArea.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">ℹ️ Project Info</h1>
        <p class="page-subtitle">VL-SGR 프로젝트 소개</p>
      </div>

      <div class="card">
        <h2 class="card-title">VL-SGR — AI 기반 대학생 영어독해 학습 웹앱</h2>
        <p>VL-SGR은 대학생이 영어 지문 하나로 <strong>Vocabulary · Listening · Speaking · Grammar · Reading</strong> 5개 영역을 통합적으로 학습할 수 있는 AI 기반 웹 애플리케이션입니다.</p>

        <h3 class="mt-4">핵심 기능</h3>
        <ul class="feature-list">
          <li>📖 <strong>다양한 지문 등록</strong> — 직접 입력 · PDF/DOCX/TXT 업로드 · 기본 지문 10개 · AI 생성</li>
          <li>🎓 <strong>5개 학습 영역</strong> — 어휘, 듣기(TTS), 말하기(음성인식), 문법, 독해</li>
          <li>🔗 <strong>통합 학습</strong> — 지문 하나로 5개 영역을 순서대로 학습</li>
          <li>🤖 <strong>AI 피드백</strong> — Netlify Functions를 통한 안전한 API 연결</li>
          <li>💾 <strong>로컬 저장</strong> — 학습 기록, 오답 노트, 백업/복원</li>
          <li>📱 <strong>반응형</strong> — PC · 태블릿 · 스마트폰 지원</li>
        </ul>

        <h3 class="mt-4">기술 스택</h3>
        <div class="tech-stack-grid">
          <div class="tech-item"><span class="tech-icon">🌐</span><span>HTML5 · CSS3 · Vanilla JS</span></div>
          <div class="tech-item"><span class="tech-icon">🗣️</span><span>Web Speech API (TTS/STT)</span></div>
          <div class="tech-item"><span class="tech-icon">💾</span><span>LocalStorage · IndexedDB</span></div>
          <div class="tech-item"><span class="tech-icon">⚡</span><span>Netlify Functions (서버리스)</span></div>
          <div class="tech-item"><span class="tech-icon">🚀</span><span>GitHub + Netlify 배포</span></div>
          <div class="tech-item"><span class="tech-icon">📄</span><span>PDF.js · Mammoth.js</span></div>
        </div>

        <h3 class="mt-4">개발 단계 (전체 6단계 완료)</h3>
        <div class="dev-stages">
          <div class="dev-stage dev-stage--done">
            <span class="dev-stage-num">1</span>
            <span class="dev-stage-label">프로젝트 구조, 디자인, 사이드바, 대시보드</span>
            <span class="dev-stage-status">✅ 완료</span>
          </div>
          <div class="dev-stage dev-stage--done">
            <span class="dev-stage-num">2</span>
            <span class="dev-stage-label">기본 지문 10개, 5개 학습 메뉴, 통합 학습</span>
            <span class="dev-stage-status">✅ 완료</span>
          </div>
          <div class="dev-stage dev-stage--done">
            <span class="dev-stage-num">3</span>
            <span class="dev-stage-label">AI API 연결 (Netlify Functions, Gemini/OpenAI 어댑터)</span>
            <span class="dev-stage-status">✅ 완료</span>
          </div>
          <div class="dev-stage dev-stage--done">
            <span class="dev-stage-num">4</span>
            <span class="dev-stage-label">파일 업로드 (PDF/DOCX/TXT), IndexedDB 자료실, 학습 기록, 오답 노트</span>
            <span class="dev-stage-status">✅ 완료</span>
          </div>
          <div class="dev-stage dev-stage--done">
            <span class="dev-stage-num">5</span>
            <span class="dev-stage-label">JSON 백업·복원, 통계 PDF 내보내기, 보안 강화, 반응형 최적화</span>
            <span class="dev-stage-status">✅ 완료</span>
          </div>
          <div class="dev-stage dev-stage--done">
            <span class="dev-stage-num">6</span>
            <span class="dev-stage-label">전체 기능 무결성 검증, 배포 가이드(README), 시연 준비</span>
            <span class="dev-stage-status">✅ 완료</span>
          </div>
        </div>

        <h3 class="mt-4">보안 및 개인정보</h3>
        <ul>
          <li>API 키는 Netlify 환경변수에만 저장되며 프론트엔드 코드에 포함되지 않습니다.</li>
          <li>학습 데이터는 사용자 본인의 브라우저(LocalStorage)에만 저장됩니다.</li>
          <li>회원가입 없는 개인 학습형 웹앱으로 개인정보를 최소 수집합니다.</li>
        </ul>
      </div>
    `;
  }

  return { render };
})();

