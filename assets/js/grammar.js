// grammar.js - 문법(Grammar) 학습 모듈
// 지문 내 주요 핵심 문법 포인트 설명, 본문 예문 연계, 연습 문제 풀이 및 오답 노트 등록

const Grammar = (() => {
  let currentPassage = null;
  let userAnswers = {}; // { grammarIndex: selectedOptionIndex }
  let graded = {}; // { grammarIndex: boolean }

  function getActivePassage() {
    const currentId = Storage.local.get('currentPassageId');
    const all = Passages.getAllPassages();
    if (currentId) {
      const found = all.find(p => p.id === currentId);
      if (found) return found;
    }
    return all.length > 0 ? all[0] : null;
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function bindEvents() {
    // 지문 선택 드롭다운
    const selectEl = document.getElementById('grammarPassageSelect');
    if (selectEl) {
      selectEl.addEventListener('change', (e) => {
        Storage.local.set('currentPassageId', e.target.value);
        currentPassage = getActivePassage();
        userAnswers = {};
        graded = {};
        render();
      });
    }

    // 객관식 보기 클릭
    document.querySelectorAll('.grammar-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const gIdx = parseInt(btn.dataset.gidx, 10);
        if (graded[gIdx]) return; // 이미 채점 완료된 문항
        const optIdx = parseInt(btn.dataset.optidx, 10);
        userAnswers[gIdx] = optIdx;

        // UI 활성화 표시
        document.querySelectorAll(`.grammar-opt-btn[data-gidx="${gIdx}"]`).forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-secondary');
        });
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
      });
    });

    // 정답 확인 버튼
    document.querySelectorAll('.btn-check-grammar').forEach(btn => {
      btn.addEventListener('click', () => {
        const gIdx = parseInt(btn.dataset.gidx, 10);
        const selected = userAnswers[gIdx];

        if (selected === undefined) {
          alert('보기를 먼저 선택해 주세요.');
          return;
        }

        const point = currentPassage.grammar[gIdx];
        if (!point || !point.question) return;

        const isCorrect = (selected === point.question.answer);
        graded[gIdx] = true;

        // 오답인 경우 오답 노트 자동 등록
        if (!isCorrect) {
          Storage.wrongAnswers.add({
            passageId: currentPassage.id,
            passageTitle: currentPassage.title,
            area: 'grammar',
            question: `[${point.title}] ${point.question.question}`,
            userAnswer: point.question.options[selected],
            correctAnswer: point.question.options[point.question.answer],
            explanation: point.question.explanation || point.explanation
          });
        }

        render();
      });
    });
  }

  function render(passageId) {
    if (passageId) {
      Storage.local.set('currentPassageId', passageId);
    }
    currentPassage = getActivePassage();

    const contentArea = document.getElementById('contentArea');
    if (!contentArea) return;

    if (!currentPassage) {
      contentArea.innerHTML = `
        <div class="empty-state py-12">
          <div class="empty-state-icon">✏️</div>
          <h2 class="text-xl font-bold mb-2">지문이 없습니다</h2>
          <p class="text-secondary mb-4">학습할 지문을 먼저 선택해 주세요.</p>
          <a href="#passages" class="btn btn-primary">자료실로 이동</a>
        </div>
      `;
      return;
    }

    const allPassages = Passages.getAllPassages();
    const grammarList = currentPassage.grammar || [];

    contentArea.innerHTML = `
      <div class="page-header mb-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="page-title text-2xl font-bold">✏️ Grammar (문법 및 구문 학습)</h1>
            <p class="page-subtitle text-secondary">지문 속 주요 문법 규칙을 확인하고 실전 문제로 점검하세요.</p>
          </div>

          <div class="w-full md:w-80">
            <label class="form-label text-xs mb-1" for="grammarPassageSelect">학습 지문 선택</label>
            <select id="grammarPassageSelect" class="form-select">
              ${allPassages.map(p => `
                <option value="${p.id}" ${p.id === currentPassage.id ? 'selected' : ''}>
                  [${p.level === 'beginner' ? '초급' : p.level === 'intermediate' ? '중급' : '고급'}] ${escapeHtml(p.title)}
                </option>
              `).join('')}
            </select>
          </div>
        </div>
      </div>

      <!-- 문법 포인트 목록 -->
      <div class="grammar-points-container flex flex-col gap-6">
        ${grammarList.length === 0 ? `
          <div class="card p-8 text-center text-secondary">
            이 지문에 등록된 문법 포인트가 아직 없습니다.
          </div>
        ` : grammarList.map((g, gIdx) => {
          const isGraded = graded[gIdx];
          const selected = userAnswers[gIdx];
          const isCorrect = isGraded && selected === g.question.answer;

          return `
            <div class="card p-6 border-l-4 border-primary">
              <!-- 문법 제목 & 설명 -->
              <div class="mb-4">
                <span class="badge badge-primary mb-2">Point ${gIdx + 1}</span>
                <h2 class="text-xl font-bold text-gray-900 mb-2">${escapeHtml(g.title)}</h2>
                <p class="text-sm text-gray-700 bg-blue-50 p-3 rounded leading-relaxed">${escapeHtml(g.explanation)}</p>
              </div>

              <!-- 예문 섹션 -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div class="p-3 bg-gray-50 rounded border">
                  <div class="text-xs font-bold text-primary mb-1">📖 지문 내 실제 쓰임:</div>
                  <p class="text-sm font-semibold text-gray-800">"${escapeHtml(g.passageExample || '해당 지문 문맥 참조')}"</p>
                </div>
                <div class="p-3 bg-gray-50 rounded border">
                  <div class="text-xs font-bold text-secondary mb-1">💡 추가 응용 예문:</div>
                  <p class="text-sm text-gray-700 italic">"${escapeHtml(g.additionalExample || '추가 예문 제공 예정')}"</p>
                </div>
              </div>

              <!-- 문법 확인 문제 -->
              ${g.question ? `
                <div class="p-4 bg-white border rounded shadow-sm">
                  <div class="font-bold text-sm text-gray-800 mb-3 flex items-center gap-2">
                    <span>🎯 확인 문제:</span>
                    <span>${escapeHtml(g.question.question)}</span>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    ${g.question.options.map((opt, optIdx) => {
                      let btnClass = 'btn-secondary';
                      if (selected === optIdx) btnClass = 'btn-primary';
                      if (isGraded) {
                        if (optIdx === g.question.answer) btnClass = 'btn-success text-white';
                        else if (selected === optIdx) btnClass = 'btn-danger text-white';
                      }

                      return `
                        <button class="btn ${btnClass} btn-sm text-left p-2 grammar-opt-btn"
                          data-gidx="${gIdx}" data-optidx="${optIdx}" ${isGraded ? 'disabled' : ''}>
                          ${optIdx + 1}) ${escapeHtml(opt)}
                        </button>
                      `;
                    }).join('')}
                  </div>

                  ${!isGraded ? `
                    <button class="btn btn-primary btn-sm btn-check-grammar" data-gidx="${gIdx}">
                      정답 확인하기
                    </button>
                  ` : `
                    <div class="alert ${isCorrect ? 'alert--success' : 'alert--error'} mt-3 text-sm">
                      <div class="font-bold mb-1">${isCorrect ? '✅ 정답입니다!' : '❌ 오답입니다 (오답 노트에 저장됨)'}</div>
                      <p class="text-xs leading-normal">${escapeHtml(g.question.explanation)}</p>
                    </div>
                  `}
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;

    bindEvents();
  }

  return { render };
})();
