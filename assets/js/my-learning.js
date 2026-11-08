// my-learning.js - My Learning (학습 기록 & 오답 노트) 화면 모듈
// 학습 이력 조회, 오답 노트 영역별 필터링, 개별/전체 삭제, 다시 학습하기 연동

const MyLearning = (() => {
  let activeWrongFilter = 'all';

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function renderHistory() {
    const records = Storage.records.getAll().slice().reverse();
    if (records.length === 0) {
      return `
        <div class="empty-state py-12">
          <div class="empty-state-icon">📖</div>
          <div class="empty-state-title">아직 학습 기록이 없습니다</div>
          <p class="empty-state-desc">지문 자료실에서 마음에 드는 지문으로 첫 학습을 시작해 보세요!</p>
          <button class="btn btn-primary mt-4" onclick="Router.navigate('passages');">📚 지문 자료실로 이동</button>
        </div>
      `;
    }

    return `
      <div class="record-list flex flex-col gap-4">
        ${records.map(r => {
          const date = new Date(r.timestamp).toLocaleString('ko-KR');
          const areas = r.areas || (r.area ? [r.area] : []);
          const score = r.score != null ? r.score : r.accuracy;

          return `
            <div class="record-item card p-4 border flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-lg font-bold text-gray-900">${escapeHtml(r.passageTitle || '영어 독해 지문')}</span>
                  ${score != null ? `
                    <span class="badge ${score >= 80 ? 'badge-success' : score >= 60 ? 'badge-primary' : 'badge-warning'}">
                      성취도 ${score}점
                    </span>
                  ` : ''}
                </div>
                <div class="record-meta text-xs text-secondary flex flex-wrap gap-3">
                  <span>📅 ${date}</span>
                  ${r.durationMinutes ? `<span>⏱️ 소요 시간: ${r.durationMinutes}분</span>` : ''}
                  <span>📌 학습 영역: ${areas.map(a => `<span class="badge badge-ghost">${escapeHtml(a)}</span>`).join(' ')}</span>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button class="btn btn-secondary btn-sm" onclick="Storage.local.set('currentPassageId', '${r.passageId}'); Router.navigate('integrated');">
                  🔄 다시 학습하기
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderWrongAnswers() {
    const allItems = Storage.wrongAnswers.getAll();
    const items = activeWrongFilter === 'all' ? allItems : allItems.filter(i => i.area === activeWrongFilter);

    return `
      <div>
        <!-- 영역 필터 및 전체 비우기 헤더 -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4 p-3 bg-gray-50 rounded border">
          <div class="btn-group flex flex-wrap gap-1">
            <button class="btn btn-xs ${activeWrongFilter === 'all' ? 'btn-primary' : 'btn-secondary'} btn-wrong-filter" data-area="all">전체 (${allItems.length})</button>
            <button class="btn btn-xs ${activeWrongFilter === 'vocabulary' ? 'btn-primary' : 'btn-secondary'} btn-wrong-filter" data-area="vocabulary">어휘</button>
            <button class="btn btn-xs ${activeWrongFilter === 'grammar' ? 'btn-primary' : 'btn-secondary'} btn-wrong-filter" data-area="grammar">문법</button>
            <button class="btn btn-xs ${activeWrongFilter === 'listening' ? 'btn-primary' : 'btn-secondary'} btn-wrong-filter" data-area="listening">듣기</button>
            <button class="btn btn-xs ${activeWrongFilter === 'reading' ? 'btn-primary' : 'btn-secondary'} btn-wrong-filter" data-area="reading">독해</button>
          </div>

          ${allItems.length > 0 ? `
            <button class="btn btn-ghost btn-xs text-red-500 hover:text-red-700" id="btnClearAllWrong">
              🗑️ 오답 노트 전체 비우기
            </button>
          ` : ''}
        </div>

        ${items.length === 0 ? `
          <div class="empty-state py-12">
            <div class="empty-state-icon">🎉</div>
            <div class="empty-state-title">오답 노트가 비어 있습니다</div>
            <p class="empty-state-desc">${activeWrongFilter === 'all' ? '모든 문제를 완벽하게 맞혔거나 오답을 정리했습니다!' : '해당 영역의 오답이 없습니다.'}</p>
          </div>
        ` : `
          <div class="wrong-answer-list flex flex-col gap-4">
            ${items.map(item => `
              <div class="wrong-answer-item card p-4 border border-l-4 border-red-500">
                <div class="flex justify-between items-center mb-2">
                  <div class="flex items-center gap-2">
                    <span class="badge badge-error text-xs uppercase">${escapeHtml(item.area || '문제')}</span>
                    <span class="text-xs text-secondary">${escapeHtml(item.passageTitle || '')}</span>
                  </div>
                  <button class="btn btn-sm btn-ghost wrong-answer-delete text-red-500 hover:text-red-700 text-xs" data-id="${escapeHtml(String(item.id || ''))}" title="오답 항목 삭제">
                    삭제 ✕
                  </button>
                </div>

                <div class="font-bold text-sm text-gray-900 mb-3">${escapeHtml(item.question || '')}</div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-3">
                  <div class="p-2 bg-red-50 rounded text-red-700">
                    <strong>내 작성 답안:</strong> ${escapeHtml(item.userAnswer || '미응답')}
                  </div>
                  <div class="p-2 bg-green-50 rounded text-green-700">
                    <strong>올바른 정답:</strong> ${escapeHtml(item.correctAnswer || '')}
                  </div>
                </div>

                ${item.explanation ? `
                  <div class="p-3 bg-gray-50 rounded text-xs text-gray-700 leading-relaxed border">
                    <strong class="text-primary">💡 해설:</strong> ${escapeHtml(item.explanation)}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  function bindEvents() {
    const contentArea = document.getElementById('contentArea');
    if (!contentArea) return;

    // 탭 전환
    contentArea.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        contentArea.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        contentArea.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
        btn.classList.add('active');
        const panel = document.getElementById('tab-' + btn.dataset.tab);
        if (panel) panel.classList.remove('hidden');
      });
    });

    // 오답 영역 필터 버튼
    contentArea.querySelectorAll('.btn-wrong-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        activeWrongFilter = btn.dataset.area;
        const wrongTab = document.getElementById('tab-wrong');
        if (wrongTab) wrongTab.innerHTML = renderWrongAnswers();
        bindEvents();
      });
    });

    // 오답 개별 삭제
    contentArea.querySelectorAll('.wrong-answer-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        Storage.wrongAnswers.remove(id);
        const wrongTab = document.getElementById('tab-wrong');
        if (wrongTab) wrongTab.innerHTML = renderWrongAnswers();
        bindEvents();
      });
    });

    // 오답 전체 비우기
    const clearAllBtn = document.getElementById('btnClearAllWrong');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        if (confirm('오답 노트의 모든 항목을 삭제하시겠습니까?')) {
          Storage.wrongAnswers.clear();
          const wrongTab = document.getElementById('tab-wrong');
          if (wrongTab) wrongTab.innerHTML = renderWrongAnswers();
          bindEvents();
        }
      });
    }
  }

  function render() {
    const contentArea = document.getElementById('contentArea');
    if (!contentArea) return;

    contentArea.innerHTML = `
      <div class="page-header mb-6">
        <h1 class="page-title text-2xl font-bold">📊 My Learning (학습 기록 및 오답 노트)</h1>
        <p class="page-subtitle text-secondary">지금까지 학습한 지문 이력과 취약점을 한곳에서 복습하세요.</p>
      </div>

      <div class="tabs mb-6">
        <div class="tab-list flex gap-2 border-bottom pb-2" role="tablist">
          <button class="btn btn-sm btn-secondary active tab-btn" role="tab" data-tab="history">📅 학습 기록</button>
          <button class="btn btn-sm btn-secondary tab-btn" role="tab" data-tab="wrong">📝 오답 노트</button>
        </div>
      </div>

      <div class="tab-panel" id="tab-history">${renderHistory()}</div>
      <div class="tab-panel hidden" id="tab-wrong">${renderWrongAnswers()}</div>
    `;

    bindEvents();
  }

  return { render };
})();
