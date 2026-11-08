// passages.js - 지문 자료실(Passage Library) 모듈
// 기본 지문 10개와 사용자 입력 지문을 통합 관리 및 탐색

const Passages = (() => {
  let currentFilterLevel = 'all';
  let searchQuery = '';

  /**
   * 모든 지문 목록(기본 지문 + 사용자 지문) 반환
   */
  function getAllPassages() {
    const defaultList = (typeof DefaultPassages !== 'undefined') ? DefaultPassages.getAll() : [];
    const userList = Storage.local.get('userPassages', []);
    return [...defaultList, ...userList];
  }

  function getPassageById(id) {
    return getAllPassages().find(p => p.id === id) || null;
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  /**
   * 필터링 및 검색된 지문 반환
   */
  function getFilteredPassages() {
    return getAllPassages().filter(passage => {
      const matchLevel = currentFilterLevel === 'all' || passage.level === currentFilterLevel;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q ||
        (passage.title && passage.title.toLowerCase().includes(q)) ||
        (passage.titleKo && passage.titleKo.toLowerCase().includes(q)) ||
        (passage.topic && passage.topic.toLowerCase().includes(q));
      return matchLevel && matchQuery;
    });
  }

  /**
   * 지문 카드 HTML 생성
   */
  function renderPassageCard(p) {
    const levelBadgeClass = p.level === 'beginner' ? 'badge-beginner' :
                            p.level === 'intermediate' ? 'badge-intermediate' : 'badge-advanced';
    const levelLabel = p.level === 'beginner' ? '초급' :
                       p.level === 'intermediate' ? '중급' : '고급';
    
    // 유형별 뱃지
    let typeBadge = '<span class="badge badge-ghost">기본 지문</span>';
    if (p.type === 'uploaded') {
      typeBadge = '<span class="badge badge-success">📄 파일 업로드</span>';
    } else if (p.type === 'user-input') {
      typeBadge = '<span class="badge badge-warning">✍️ 직접 입력</span>';
    } else if (p.id && p.id.startsWith('ai_')) {
      typeBadge = '<span class="badge badge-primary">🤖 AI 생성</span>';
    }

    const isDeletable = p.type === 'uploaded' || p.type === 'user-input' || (p.id && p.id.startsWith('ai_'));
    const wordCount = p.wordCount || (p.text ? p.text.split(/\s+/).filter(Boolean).length : 0);
    const vocabCount = p.vocabulary ? p.vocabulary.length : 0;

    return `
      <div class="card passage-card" data-id="${p.id}">
        <div class="passage-card-header flex justify-between items-center mb-2">
          <div class="flex items-center gap-1 flex-wrap">
            <span class="badge ${levelBadgeClass}">${levelLabel}</span>
            <span class="badge badge-ghost">${escapeHtml(p.topic || '일반')}</span>
            ${typeBadge}
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-secondary">${wordCount}단어</span>
            ${isDeletable ? `
              <button class="btn btn-ghost btn-xs btn-delete-passage text-red-500 hover:text-red-700" data-id="${p.id}" title="지문 삭제">
                🗑️
              </button>
            ` : ''}
          </div>
        </div>

        <h3 class="passage-card-title text-lg font-bold mb-1">${escapeHtml(p.title)}</h3>
        <p class="passage-card-title-ko text-sm text-secondary mb-3">${escapeHtml(p.titleKo || '')}</p>
        
        <p class="passage-card-preview text-sm text-gray-600 mb-4" style="display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
          ${escapeHtml(p.text ? p.text.slice(0, 180) + '...' : '지문 준비 중...')}
        </p>

        <div class="passage-card-meta flex justify-between text-xs text-secondary mb-4 border-top pt-2">
          <span>어휘: <strong>${vocabCount}</strong>개</span>
          <span>문법: <strong>${p.grammar ? p.grammar.length : 0}</strong>개</span>
          <span>독해: <strong>${p.readingQuestions ? p.readingQuestions.length : 0}</strong>문항</span>
        </div>

        <div class="passage-card-actions flex flex-col gap-2">
          <button class="btn btn-primary btn-sm w-full btn-start-integrated" data-id="${p.id}">
            🔗 통합 학습 시작 (V→L→G→R→S)
          </button>
          
          <div class="grid grid-cols-5 gap-1">
            <button class="btn btn-secondary btn-sm p-1 text-xs btn-nav-area" data-area="vocabulary" data-id="${p.id}" title="어휘 학습">어휘</button>
            <button class="btn btn-secondary btn-sm p-1 text-xs btn-nav-area" data-area="listening" data-id="${p.id}" title="듣기 학습">듣기</button>
            <button class="btn btn-secondary btn-sm p-1 text-xs btn-nav-area" data-area="grammar" data-id="${p.id}" title="문법 학습">문법</button>
            <button class="btn btn-secondary btn-sm p-1 text-xs btn-nav-area" data-area="reading" data-id="${p.id}" title="독해 학습">독해</button>
            <button class="btn btn-secondary btn-sm p-1 text-xs btn-nav-area" data-area="speaking" data-id="${p.id}" title="말하기 학습">말하기</button>
          </div>
        </div>
      </div>
    `;
  }

  function bindEvents() {
    // 필터 버튼
    document.querySelectorAll('.filter-level-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-level-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilterLevel = btn.dataset.level;
        updatePassageGrid();
      });
    });

    // 검색창 입력
    const searchInput = document.getElementById('passageSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        updatePassageGrid();
      });
    }

    // 통합 학습 시작 및 영역별 버튼 이벤트
    const grid = document.getElementById('passagesGrid');
    if (grid) {
      grid.addEventListener('click', (e) => {
        const integratedBtn = e.target.closest('.btn-start-integrated');
        if (integratedBtn) {
          const id = integratedBtn.dataset.id;
          Storage.local.set('currentPassageId', id);
          Router.navigate('integrated');
          return;
        }

        const areaBtn = e.target.closest('.btn-nav-area');
        if (areaBtn) {
          const id = areaBtn.dataset.id;
          const area = areaBtn.dataset.area;
          Storage.local.set('currentPassageId', id);
          Router.navigate(area);
          return;
        }

        // 지문 삭제 버튼
        const deleteBtn = e.target.closest('.btn-delete-passage');
        if (deleteBtn) {
          const id = deleteBtn.dataset.id;
          if (confirm('이 지문을 자료실에서 삭제하시겠습니까?')) {
            const userPassages = Storage.local.get('userPassages', []);
            const updated = userPassages.filter(p => p.id !== id);
            Storage.local.set('userPassages', updated);
            Storage.idb.deleteFile(id); // IndexedDB 연동 파일도 함께 삭제
            render();
          }
          return;
        }
      });
    }
  }

  function updatePassageGrid() {
    const grid = document.getElementById('passagesGrid');
    if (!grid) return;
    const filtered = getFilteredPassages();

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full empty-state py-8">
          <div class="empty-state-icon">🔍</div>
          <div class="empty-state-title">검색된 지문이 없습니다</div>
          <p class="empty-state-desc">다른 검색어나 필터를 선택해 보세요.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(renderPassageCard).join('');
  }

  function render() {
    const contentArea = document.getElementById('contentArea');
    if (!contentArea) return;

    contentArea.innerHTML = `
      <div class="page-header mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 class="page-title text-2xl font-bold">📚 Passage Library (지문 자료실)</h1>
          <p class="page-subtitle text-secondary">기본 창작 지문 10개 및 등록된 지문으로 영역별/통합 영어 학습을 시작하세요.</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-secondary btn-sm flex items-center gap-1" onclick="Router.navigate('dashboard');">
            ➕ 지문 등록 (대시보드)
          </button>
        </div>
      </div>

      <!-- 상단 컨트롤러: 필터 및 검색 -->
      <div class="card mb-6 p-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <!-- 난이도 필터 버튼 그룹 -->
          <div class="btn-group flex gap-2 w-full md:w-auto" role="group" aria-label="난이도 필터">
            <button class="btn btn-sm btn-secondary filter-level-btn ${currentFilterLevel === 'all' ? 'active' : ''}" data-level="all">전체</button>
            <button class="btn btn-sm btn-secondary filter-level-btn ${currentFilterLevel === 'beginner' ? 'active' : ''}" data-level="beginner">초급</button>
            <button class="btn btn-sm btn-secondary filter-level-btn ${currentFilterLevel === 'intermediate' ? 'active' : ''}" data-level="intermediate">중급</button>
            <button class="btn btn-sm btn-secondary filter-level-btn ${currentFilterLevel === 'advanced' ? 'active' : ''}" data-level="advanced">고급</button>
          </div>

          <!-- 검색창 -->
          <div class="w-full md:w-72">
            <input type="text" id="passageSearchInput" class="form-input" placeholder="지문 제목, 주제 검색..." value="${escapeHtml(searchQuery)}" />
          </div>
        </div>
      </div>

      <!-- 지문 카드 그리드 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="passagesGrid">
        ${getFilteredPassages().map(renderPassageCard).join('')}
      </div>
    `;

    bindEvents();
  }

  return { render, getAllPassages, getPassageById };
})();
