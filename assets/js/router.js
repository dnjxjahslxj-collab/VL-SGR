// router.js - 단순 해시 기반 SPA 라우터
// URL 해시(#dashboard, #vocabulary 등)로 화면 전환한다.
// 해시의 '#' 이후 첫 번째 세그먼트를 라우트 경로로 사용한다.
// 예: location.hash === '#vocabulary' → path === 'vocabulary'

const Router = (() => {
  // 등록된 라우트 맵: { path(문자열) → renderFn(함수) }
  const routes = {};

  // 현재 활성 페이지 ID
  let currentPage = null;

  // ─────────────────────────────────────────────
  // 라우트 등록
  // ─────────────────────────────────────────────
  /**
   * 경로(path)에 대응하는 렌더 함수를 등록한다.
   * @param {string} path - '#' 없는 경로 문자열 (예: 'dashboard', 'vocabulary')
   * @param {Function} renderFn - 해당 경로 진입 시 호출할 함수
   */
  const register = (path, renderFn) => {
    if (typeof path !== 'string' || !path) {
      console.warn('[Router.register] 유효하지 않은 path:', path);
      return;
    }
    if (typeof renderFn !== 'function') {
      console.warn(`[Router.register] path "${path}"의 renderFn이 함수가 아닙니다.`);
      return;
    }
    routes[path] = renderFn;
  };

  // ─────────────────────────────────────────────
  // 경로 이동
  // ─────────────────────────────────────────────
  /**
   * 지정된 경로로 이동한다. location.hash를 변경하면 handleRoute가 자동 호출된다.
   * @param {string} path - '#' 포함 또는 미포함 경로 (예: '#dashboard' 또는 'dashboard')
   */
  const navigate = (path) => {
    // '#'으로 시작하지 않으면 추가
    const hash = path.startsWith('#') ? path : `#${path}`;
    if (location.hash === hash) {
      // 같은 경로이면 hashchange가 발생하지 않으므로 직접 호출
      handleRoute();
    } else {
      location.hash = hash;
    }
  };

  // ─────────────────────────────────────────────
  // 현재 해시 파싱 → 라우트 처리
  // ─────────────────────────────────────────────
  /**
   * location.hash를 읽어 등록된 렌더 함수를 호출한다.
   * 등록되지 않은 경로이면 기본 경로(dashboard)로 리다이렉트한다.
   */
  const handleRoute = () => {
    // '#dashboard?foo=bar' → 'dashboard'
    const rawHash = location.hash.replace(/^#/, '').split('?')[0].trim();
    const path = rawHash || 'dashboard'; // 해시가 비어 있으면 대시보드로

    if (routes[path]) {
      currentPage = path;

      // 활성 네비게이션 업데이트 (app.js의 함수가 있으면 호출)
      if (typeof updateActiveNav === 'function') {
        updateActiveNav(path);
      }

      // 등록된 렌더 함수 실행
      try {
        routes[path]();
      } catch (e) {
        console.error(`[Router] "${path}" 렌더 중 오류:`, e);
        _renderError(path, e);
      }
    } else {
      // 미등록 경로: 대시보드로 리다이렉트
      console.warn(`[Router] 등록되지 않은 경로: "${path}" → "dashboard"로 이동`);
      navigate('dashboard');
    }
  };

  // ─────────────────────────────────────────────
  // 오류 화면 렌더링 (내부 헬퍼)
  // ─────────────────────────────────────────────
  /**
   * 렌더 함수 실행 중 오류가 발생했을 때 사용자에게 오류 메시지를 표시한다.
   * @param {string} path
   * @param {Error} error
   */
  const _renderError = (path, error) => {
    const container = document.getElementById('contentArea');
    if (!container) return;
    container.innerHTML = `
      <div style="padding: 2rem; color: #c0392b; text-align: center;">
        <h2>⚠️ 페이지 렌더링 오류</h2>
        <p>경로 <strong>${path}</strong>를 불러오는 중 오류가 발생했습니다.</p>
        <pre style="text-align:left; background:#fdf2f2; padding:1rem; border-radius:6px; font-size:0.85rem;">${error}</pre>
        <button onclick="Router.navigate('dashboard')" style="margin-top:1rem; padding:0.5rem 1.2rem; cursor:pointer;">
          대시보드로 이동
        </button>
      </div>`;
  };

  // ─────────────────────────────────────────────
  // 라우터 초기화
  // ─────────────────────────────────────────────
  /**
   * hashchange 이벤트를 등록하고 현재 URL에 맞는 첫 렌더링을 수행한다.
   * 모든 라우트를 register한 뒤 마지막으로 한 번만 호출한다.
   */
  const init = () => {
    // popstate 대신 hashchange 사용 (해시 라우터)
    window.addEventListener('hashchange', handleRoute);

    // 페이지 최초 진입 시 현재 해시로 렌더링
    handleRoute();
  };

  // ─────────────────────────────────────────────
  // 현재 페이지 조회
  // ─────────────────────────────────────────────
  /**
   * 현재 활성 페이지 ID를 반환한다.
   * @returns {string|null}
   */
  const getCurrentPage = () => currentPage;

  // Public API
  return { register, navigate, handleRoute, init, getCurrentPage };
})();
