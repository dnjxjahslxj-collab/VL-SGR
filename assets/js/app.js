// app.js - VL-SGR 애플리케이션 진입점
// 모든 모듈을 초기화하고 사이드바, 모바일 메뉴, 라우팅을 관리한다.
// 의존 모듈: router.js, storage.js, speech.js (각 화면 모듈은 별도 파일에서 로드)

// ─────────────────────────────────────────────
// 사이드바 네비게이션 메뉴 정의
// ─────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard',           icon: '🏠', path: '#dashboard'    },
  { id: 'passages',     label: 'Passage Library',     icon: '📚', path: '#passages'     },
  { id: 'vocabulary',   label: 'Vocabulary',          icon: '📖', path: '#vocabulary'   },
  { id: 'listening',    label: 'Listening',           icon: '🎧', path: '#listening'    },
  { id: 'speaking',     label: 'Speaking',            icon: '🎤', path: '#speaking'     },
  { id: 'grammar',      label: 'Grammar',             icon: '✏️', path: '#grammar'      },
  { id: 'reading',      label: 'Reading',             icon: '📝', path: '#reading'      },
  { id: 'integrated',   label: 'Integrated Learning', icon: '🔗', path: '#integrated'   },
  { id: 'my-learning',  label: 'My Learning',         icon: '📊', path: '#my-learning'  },
  { id: 'project-info', label: 'Project Info',        icon: 'ℹ️', path: '#project-info' },
  { id: 'settings',     label: 'Settings',            icon: '⚙️', path: '#settings'     },
];

// ─────────────────────────────────────────────
// 사이드바 렌더링
// ─────────────────────────────────────────────
/**
 * NAV_ITEMS를 기반으로 사이드바 메뉴를 동적으로 렌더링한다.
 * HTML에 id="sidebar-nav" 요소가 있어야 한다.
 */
function renderSidebar() {
  const navEl = document.getElementById('sidebarNav');
  if (!navEl) {
    console.warn('[App] #sidebarNav 요소를 찾을 수 없습니다.');
    return;
  }

  navEl.innerHTML = NAV_ITEMS.map(item => `
    <li class="nav-item" data-page="${item.id}">
      <a href="${item.path}" class="nav-link" data-page="${item.id}" aria-label="${item.label}">
        <span class="nav-icon" aria-hidden="true">${item.icon}</span>
        <span class="nav-label">${item.label}</span>
      </a>
    </li>
  `).join('');

  // 각 링크 클릭 시 모바일 메뉴 닫기
  navEl.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.remove('sidebar-open');
      const overlay = document.getElementById('mobileOverlay');
      if (overlay) overlay.classList.remove('active');
      const hamburger = document.getElementById('hamburgerBtn');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ─────────────────────────────────────────────
// 모바일 메뉴 토글
// ─────────────────────────────────────────────
/**
 * 햄버거 버튼과 오버레이를 이용해 사이드바 모바일 메뉴 토글을 초기화한다.
 * HTML에 id="menu-toggle", id="sidebar", id="sidebar-overlay" 요소가 필요하다.
 */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburgerBtn');
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('mobileOverlay');

  if (!hamburger || !sidebar) {
    console.warn('[App] 모바일 메뉴 요소(#hamburgerBtn 또는 #sidebar)를 찾을 수 없습니다.');
    return;
  }

  // 햄버거 버튼 클릭 → 사이드바 열기/닫기
  hamburger.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('sidebar-open');
    if (overlay) overlay.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // 오버레이 클릭 → 사이드바 닫기
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('sidebar-open');
      overlay.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  }

  // ESC 키 → 사이드바 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('sidebar-open')) {
      sidebar.classList.remove('sidebar-open');
      if (overlay) overlay.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.focus();
    }
  });
}

// ─────────────────────────────────────────────
// 활성 메뉴 표시 업데이트
// ─────────────────────────────────────────────
/**
 * 현재 페이지에 맞는 사이드바 메뉴 항목을 활성(active) 상태로 표시한다.
 * @param {string} pageId - 현재 페이지 ID (예: 'dashboard', 'vocabulary')
 */
function updateActiveNav(pageId) {
  const navLinks = document.querySelectorAll('#sidebarNav .nav-link');
  navLinks.forEach(link => {
    const isActive = link.dataset.page === pageId;
    link.classList.toggle('active', isActive);
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
  });
}

// ─────────────────────────────────────────────
// 공통 플레이스홀더 렌더러
// ─────────────────────────────────────────────
/**
 * 아직 구현되지 않은 화면에 "준비 중" 메시지를 렌더링한다.
 * @param {string} label - 화면 이름
 * @param {string} icon  - 이모지 아이콘
 */
function renderPlaceholder(label, icon = '🚧') {
  const container = document.getElementById('contentArea');
  if (!container) return;
  container.innerHTML = `
    <div class="placeholder-screen">
      <div class="placeholder-inner">
        <span class="placeholder-icon">${icon}</span>
        <h2 class="placeholder-title">${label}</h2>
        <p class="placeholder-desc">이 기능은 현재 준비 중입니다.<br>곧 업데이트될 예정입니다.</p>
      </div>
    </div>`;
}

// ─────────────────────────────────────────────
// 각 화면 렌더링 함수
// 외부 모듈(예: Dashboard, Passages …)이 로드되어 있으면 위임하고,
// 없으면 플레이스홀더를 표시한다.
// ─────────────────────────────────────────────

/** 대시보드 화면: dashboard.js의 Dashboard 모듈을 호출한다. */
function renderDashboard() {
  if (typeof Dashboard !== 'undefined' && typeof Dashboard.render === 'function') {
    Dashboard.render();
  } else {
    renderPlaceholder('Dashboard', '🏠');
  }
}

/** 지문 라이브러리 화면: passages.js의 Passages 모듈을 호출한다. */
function renderPassages() {
  if (typeof Passages !== 'undefined' && typeof Passages.render === 'function') {
    Passages.render();
  } else {
    renderPlaceholder('Passage Library', '📚');
  }
}

/** 어휘 화면: vocabulary.js의 Vocabulary 모듈을 호출한다. */
function renderVocabulary() {
  if (typeof Vocabulary !== 'undefined' && typeof Vocabulary.render === 'function') {
    Vocabulary.render();
  } else {
    renderPlaceholder('Vocabulary', '📖');
  }
}

/** 듣기 화면: listening.js의 Listening 모듈을 호출한다. */
function renderListening() {
  if (typeof Listening !== 'undefined' && typeof Listening.render === 'function') {
    Listening.render();
  } else {
    renderPlaceholder('Listening', '🎧');
  }
}

/** 말하기 화면: speaking.js의 Speaking 모듈을 호출한다. */
function renderSpeaking() {
  if (typeof Speaking !== 'undefined' && typeof Speaking.render === 'function') {
    Speaking.render();
  } else {
    renderPlaceholder('Speaking', '🎤');
  }
}

/** 문법 화면: grammar.js의 Grammar 모듈을 호출한다. */
function renderGrammar() {
  if (typeof Grammar !== 'undefined' && typeof Grammar.render === 'function') {
    Grammar.render();
  } else {
    renderPlaceholder('Grammar', '✏️');
  }
}

/** 읽기 화면: reading.js의 Reading 모듈을 호출한다. */
function renderReading() {
  if (typeof Reading !== 'undefined' && typeof Reading.render === 'function') {
    Reading.render();
  } else {
    renderPlaceholder('Reading', '📝');
  }
}

/** 통합 학습 화면: integrated-learning.js의 IntegratedLearning 모듈을 호출한다. */
function renderIntegrated() {
  if (typeof IntegratedLearning !== 'undefined' && typeof IntegratedLearning.render === 'function') {
    IntegratedLearning.render();
  } else {
    renderPlaceholder('Integrated Learning', '🔗');
  }
}

/** 내 학습 화면: myLearning.js의 MyLearning 모듈을 호출한다. */
function renderMyLearning() {
  if (typeof MyLearning !== 'undefined' && typeof MyLearning.render === 'function') {
    MyLearning.render();
  } else {
    renderPlaceholder('My Learning', '📊');
  }
}

/** 프로젝트 정보 화면 */
function renderProjectInfo() {
  if (typeof ProjectInfo !== 'undefined' && typeof ProjectInfo.render === 'function') {
    ProjectInfo.render();
  } else {
    const container = document.getElementById('contentArea');
    if (!container) return;
    container.innerHTML = `
      <div class="info-screen" style="padding: 2rem; max-width: 680px; margin: 0 auto;">
        <h2 style="margin-bottom: 1rem;">ℹ️ Project Info</h2>
        <p><strong>VL-SGR</strong>는 영어 학습을 위한 종합 웹 애플리케이션입니다.</p>
        <ul style="margin-top: 1rem; line-height: 2;">
          <li>지문 기반 통합 학습 (어휘, 문법, 읽기, 듣기, 말하기)</li>
          <li>오답 노트 및 학습 기록 관리</li>
          <li>Web Speech API 활용 TTS / STT</li>
          <li>오프라인 지원 (LocalStorage 기반)</li>
        </ul>
        <p style="margin-top: 1.5rem; color: #888; font-size: 0.9rem;">Version 1.0.0</p>
      </div>`;
  }
}

/** 설정 화면: settings.js의 Settings 모듈을 호출한다. */
function renderSettings() {
  if (typeof Settings !== 'undefined' && typeof Settings.render === 'function') {
    Settings.render();
  } else {
    renderPlaceholder('Settings', '⚙️');
  }
}

/** 결과 화면: results.js의 Results 모듈을 호출한다. */
function renderResults() {
  if (typeof Results !== 'undefined' && typeof Results.render === 'function') {
    Results.render();
  } else {
    renderPlaceholder('Results', '📊');
  }
}

// ─────────────────────────────────────────────
// 앱 초기화
// ─────────────────────────────────────────────
/**
 * 애플리케이션을 초기화한다.
 * 1. 사이드바 렌더링
 * 2. 모바일 메뉴 초기화
 * 3. 모든 라우트 등록
 * 4. 라우터 시작 (현재 URL로 첫 화면 렌더링)
 */
function initApp() {
  // 사이드바 메뉴 렌더링
  renderSidebar();

  // 모바일 메뉴 토글 초기화
  initMobileMenu();

  // ── 라우트 등록 ──────────────────────────────
  Router.register('dashboard',    renderDashboard);
  Router.register('passages',     renderPassages);
  Router.register('vocabulary',   renderVocabulary);
  Router.register('listening',    renderListening);
  Router.register('speaking',     renderSpeaking);
  Router.register('grammar',      renderGrammar);
  Router.register('reading',      renderReading);
  Router.register('integrated',   renderIntegrated);
  Router.register('results',      renderResults);
  Router.register('my-learning',  renderMyLearning);
  Router.register('project-info', renderProjectInfo);
  Router.register('settings',     renderSettings);

  // ── 라우터 시작 (hashchange 감지 + 초기 렌더링) ──
  Router.init();

  console.info('[App] VL-SGR 초기화 완료');
}

// DOM 로드 완료 후 앱 시작
document.addEventListener('DOMContentLoaded', initApp);
