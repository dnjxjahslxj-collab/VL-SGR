// dashboard.js - 대시보드 화면 렌더링 모듈
// VL-SGR 1단계: 대시보드 UI 구현

const Dashboard = (() => {

  // 학습 영역 색상 및 아이콘 정의
  const AREAS = [
    { id: 'vocabulary', label: 'Vocabulary',  labelKo: '어휘',   icon: '📖', color: '#7C3AED', bg: '#F5F3FF', path: '#vocabulary' },
    { id: 'listening',  label: 'Listening',   labelKo: '듣기',   icon: '🎧', color: '#059669', bg: '#ECFDF5', path: '#listening'  },
    { id: 'speaking',   label: 'Speaking',    labelKo: '말하기', icon: '🎤', color: '#D97706', bg: '#FFFBEB', path: '#speaking'   },
    { id: 'grammar',    label: 'Grammar',     labelKo: '문법',   icon: '✏️', color: '#2563EB', bg: '#EFF6FF', path: '#grammar'    },
    { id: 'reading',    label: 'Reading',     labelKo: '독해',   icon: '📝', color: '#DC2626', bg: '#FEF2F2', path: '#reading'    },
  ];

  // 빠른 학습 시작 옵션
  const QUICK_START_OPTIONS = [
    { id: 'direct-input',  label: '지문 직접 입력', icon: '✍️', desc: '텍스트를 직접 입력해 학습 시작', action: 'openDirectInput' },
    { id: 'file-upload',   label: '파일 업로드',   icon: '📂', desc: 'PDF · DOCX · TXT 파일 업로드',   action: 'openFileUpload'  },
    { id: 'default',       label: '기본 지문 선택', icon: '📚', desc: '10개 기본 지문으로 바로 학습',    action: 'goToPassages'    },
    { id: 'ai-generate',   label: 'AI 지문 생성',  icon: '🤖', desc: 'AI가 주제별 지문을 생성 (3단계)', action: 'openAIGenerate'  },
  ];

  /**
   * 오늘 날짜 문자열 반환 (YYYY-MM-DD)
   */
  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  /**
   * 통계 카드 HTML 생성
   */
  function renderStatsCards(statsData) {
    const cards = [
      {
        icon: '📚',
        value: statsData.totalPassages,
        label: '학습한 지문',
        unit: '개',
        color: 'primary',
      },
      {
        icon: '⏱️',
        value: statsData.totalMinutes,
        label: '누적 학습 시간',
        unit: '분',
        color: 'success',
      },
      {
        icon: '🎯',
        value: statsData.avgAccuracy,
        label: '평균 정답률',
        unit: '%',
        color: 'warning',
      },
      {
        icon: '📈',
        value: statsData.overallProgress,
        label: '전체 진도',
        unit: '%',
        color: 'secondary',
      },
    ];

    return `
      <div class="stats-grid">
        ${cards.map(c => `
          <div class="stat-card">
            <div class="stat-icon stat-icon--${c.color}">${c.icon}</div>
            <div class="stat-info">
              <div class="stat-value">${c.value}<span class="stat-unit">${c.unit}</span></div>
              <div class="stat-label">${c.label}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * 5개 학습 영역 바로가기 카드 렌더링
   */
  function renderLearningAreaCards() {
    return `
      <div class="learning-grid">
        ${AREAS.map(a => `
          <a href="${a.path}" class="learning-card" style="--area-color:${a.color};--area-bg:${a.bg};" data-nav="${a.id}">
            <div class="learning-card-icon">${a.icon}</div>
            <div class="learning-card-label">${a.label}</div>
            <div class="learning-card-label-ko">${a.labelKo}</div>
          </a>
        `).join('')}
      </div>
    `;
  }

  /**
   * 빠른 학습 시작 그리드 렌더링
   */
  function renderQuickStart() {
    return `
      <div class="quick-start-grid">
        ${QUICK_START_OPTIONS.map(opt => `
          <button class="quick-start-card" data-action="${opt.action}" type="button">
            <div class="quick-start-icon">${opt.icon}</div>
            <div class="quick-start-label">${opt.label}</div>
            <div class="quick-start-desc">${opt.desc}</div>
          </button>
        `).join('')}
      </div>
    `;
  }

  /**
   * 최근 학습 기록 렌더링
   */
  function renderRecentRecords() {
    const recent = Storage.records.getRecent(5);

    if (recent.length === 0) {
      return `
        <div class="empty-state">
          <div class="empty-state-icon">📖</div>
          <div class="empty-state-title">아직 학습 기록이 없습니다</div>
          <div class="empty-state-desc">위에서 학습을 시작해 보세요!</div>
        </div>
      `;
    }

    return `
      <ul class="recent-list">
        ${recent.map(rec => {
          const date = new Date(rec.timestamp).toLocaleDateString('ko-KR');
          const areaLabels = (rec.areas || []).map(a => {
            const found = AREAS.find(x => x.id === a);
            return found ? `<span class="area-tag" style="color:${found.color}">${found.icon} ${found.label}</span>` : '';
          }).join('');
          return `
            <li class="recent-item">
              <div class="recent-item-title">${escapeHtml(rec.passageTitle || '지문')}</div>
              <div class="recent-item-meta">
                <span class="recent-item-date">${date}</span>
                ${rec.accuracy != null ? `<span class="recent-item-accuracy">정답률 ${rec.accuracy}%</span>` : ''}
              </div>
              ${areaLabels ? `<div class="recent-item-areas">${areaLabels}</div>` : ''}
            </li>
          `;
        }).join('')}
      </ul>
    `;
  }

  /**
   * 취약 영역 표시
   */
  function renderWeakAreas() {
    const weakAreas = Storage.stats.getWeakAreas();

    if (weakAreas.length === 0) {
      return `<p class="text-secondary text-sm">학습 기록이 쌓이면 취약 영역이 분석됩니다.</p>`;
    }

    return `
      <div class="weak-areas-list">
        ${weakAreas.map(wa => {
          const area = AREAS.find(a => a.id === wa.id);
          if (!area) return '';
          return `
            <div class="weak-area-item">
              <div class="weak-area-icon" style="color:${area.color}">${area.icon}</div>
              <div class="weak-area-info">
                <div class="weak-area-name">${area.label}</div>
                <div class="progress-bar">
                  <div class="progress-fill" style="width:${wa.accuracy}%;background:${area.color}"></div>
                </div>
                <div class="weak-area-accuracy">${wa.accuracy}% 정답률</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  /**
   * 오늘의 목표 섹션
   */
  function renderTodayGoal() {
    const goal = Storage.settings.get('dailyGoal', { passages: 1, minutes: 20 });
    const todayRecords = Storage.records.getAll().filter(r => {
      return r.timestamp && r.timestamp.startsWith(todayStr());
    });
    const todayPassages = new Set(todayRecords.map(r => r.passageId)).size;
    const todayMinutes = todayRecords.reduce((sum, r) => sum + (r.durationMinutes || 0), 0);

    const passageProgress = Math.min(100, Math.round((todayPassages / goal.passages) * 100));
    const minuteProgress  = Math.min(100, Math.round((todayMinutes  / goal.minutes)  * 100));

    return `
      <div class="today-goal">
        <div class="goal-item">
          <div class="goal-label">📚 지문 학습 <span class="goal-current">${todayPassages}</span> / <span class="goal-target">${goal.passages}개</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${passageProgress}%"></div></div>
        </div>
        <div class="goal-item">
          <div class="goal-label">⏱️ 학습 시간 <span class="goal-current">${todayMinutes}</span> / <span class="goal-target">${goal.minutes}분</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${minuteProgress}%"></div></div>
        </div>
      </div>
    `;
  }

  /**
   * XSS 방지용 HTML 이스케이프
   */
  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * 직접 입력 모달 열기
   */
  function openDirectInputModal() {
    const modal = document.getElementById('directInputModal');
    if (modal) {
      modal.classList.add('modal-open');
      document.getElementById('directInputText').focus();
    }
  }

  /**
   * 파일 업로드 모달 열기 (4단계 구현)
   */
  function openFileUploadModal() {
    const modal = document.getElementById('fileUploadModal');
    if (modal) {
      modal.classList.add('modal-open');
    }
  }

  /**
   * 파일 업로드 텍스트 추출 처리
   */
  let extractedFileState = null;

  async function handleFileUploadChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById('fileUploadStatus');
    const previewArea = document.getElementById('fileUploadPreviewArea');
    const saveBtn = document.getElementById('fileUploadSaveBtn');

    if (statusEl) {
      statusEl.classList.remove('hidden');
      statusEl.innerHTML = `
        <div class="flex items-center gap-2 text-primary text-sm font-semibold">
          <div class="loading-spinner" style="width:16px;height:16px;border-width:2px;"></div>
          <span>"${escapeHtml(file.name)}" 파일에서 텍스트를 추출하는 중입니다...</span>
        </div>
      `;
    }

    const res = await FileExtractor.extract(file);

    if (res.success) {
      extractedFileState = {
        fileName: file.name,
        fileSize: file.size,
        text: res.text,
        sentences: res.sentences,
        wordCount: res.wordCount
      };

      if (statusEl) {
        statusEl.innerHTML = `
          <div class="alert alert--success text-xs">
            ✅ <strong>텍스트 추출 완료!</strong> 총 ${res.wordCount}단어, ${res.sentences.length}개 문장으로 분할되었습니다.
          </div>
        `;
      }

      // 제목 및 텍스트 미리보기 채우기
      const titleInput = document.getElementById('fileUploadTitle');
      const textPreview = document.getElementById('fileUploadText');
      if (titleInput && !titleInput.value) {
        titleInput.value = file.name.replace(/\.[^/.]+$/, '');
      }
      if (textPreview) {
        textPreview.value = res.text;
      }
      if (previewArea) previewArea.classList.remove('hidden');
      if (saveBtn) saveBtn.disabled = false;

    } else {
      extractedFileState = null;
      if (statusEl) {
        statusEl.innerHTML = `
          <div class="alert alert--error text-xs">
            ❌ <strong>추출 실패:</strong> ${escapeHtml(res.error)}
          </div>
        `;
      }
      if (previewArea) previewArea.classList.add('hidden');
      if (saveBtn) saveBtn.disabled = true;
    }
  }

  /**
   * 업로드 지문 저장
   */
  async function saveUploadedPassage() {
    if (!extractedFileState) return;

    const title = (document.getElementById('fileUploadTitle')?.value || '').trim() || extractedFileState.fileName;
    const level = document.getElementById('fileUploadLevel')?.value || 'intermediate';
    const editedText = document.getElementById('fileUploadText')?.value || extractedFileState.text;

    const newPassage = {
      id: `upload_${Date.now()}`,
      title,
      titleKo: '업로드 학습 자료',
      level,
      type: 'uploaded',
      topic: '파일 업로드',
      text: editedText,
      sentences: FileExtractor.splitIntoSentences(editedText),
      vocabulary: [],
      grammar: [],
      readingQuestions: [],
      listeningQuestions: [],
      speakingTask: {
        prompt: `Explain the key concepts of "${title}" in your own words.`,
        sampleAnswer: `This uploaded material outlines important insights regarding ${title}.`,
        keyPoints: [title]
      },
      createdAt: new Date().toISOString()
    };

    // 1. IndexedDB에 파일 원본 저장
    await Storage.idb.saveFile({
      id: newPassage.id,
      fileName: extractedFileState.fileName,
      fileSize: extractedFileState.fileSize,
      uploadedAt: newPassage.createdAt,
      text: editedText
    });

    // 2. LocalStorage 지문 목록에 등록
    const userPassages = Storage.local.get('userPassages', []);
    userPassages.unshift(newPassage);
    Storage.local.set('userPassages', userPassages);
    Storage.local.set('currentPassageId', newPassage.id);

    // 모달 닫기 및 이동
    document.getElementById('fileUploadModal')?.classList.remove('modal-open');
    showAlert(`"${escapeHtml(title)}" 파일 지문이 자료실에 성공적으로 등록되었습니다.`, 'success');
    Router.navigate('passages');
  }

  /**
   * 파일 업로드 모달 HTML
   */
  function renderFileUploadModal() {
    return `
      <div class="modal-overlay" id="fileUploadModal" role="dialog" aria-modal="true" aria-labelledby="fileUploadModalTitle">
        <div class="modal max-w-xl">
          <div class="modal-header">
            <h2 class="modal-title flex items-center gap-2" id="fileUploadModalTitle">
              <span>📂</span> 파일 업로드로 지문 등록
            </h2>
            <button class="modal-close" id="fileUploadClose" aria-label="닫기">×</button>
          </div>
          <div class="modal-body">
            <p class="text-xs text-secondary mb-3 leading-relaxed">
              수업 자료나 영어 논문, 기사 파일(PDF, Word .docx, TXT)을 업로드하면 브라우저가 본문 텍스트를 추출하여 맞춤 지문으로 등록합니다.<br>
              <span class="text-xs text-gray-500">※ 파일 데이터는 외부 서버에 전송되지 않고 사용자의 브라우저(IndexedDB)에만 안전하게 저장됩니다. (최대 10MB)</span>
            </p>

            <div class="p-6 border-2 border-dashed border-blue-200 rounded-lg text-center bg-blue-50/30 hover:bg-blue-50/60 transition mb-4">
              <input type="file" id="fileUploadInput" class="hidden" accept=".pdf, .docx, .txt" />
              <label for="fileUploadInput" class="cursor-pointer">
                <div class="text-3xl mb-2">📄</div>
                <div class="text-sm font-bold text-primary mb-1">클릭하여 파일 선택</div>
                <div class="text-xs text-secondary">지원 형식: PDF (.pdf) · 워드 (.docx) · 텍스트 (.txt)</div>
              </label>
            </div>

            <div id="fileUploadStatus" class="mb-3 hidden"></div>

            <div id="fileUploadPreviewArea" class="hidden flex flex-col gap-3">
              <div class="form-group">
                <label class="form-label text-xs" for="fileUploadTitle">지문 제목</label>
                <input type="text" class="form-input" id="fileUploadTitle" placeholder="지문 제목 입력..." />
              </div>

              <div class="form-group">
                <label class="form-label text-xs" for="fileUploadLevel">권장 학습 난이도</label>
                <select class="form-select" id="fileUploadLevel">
                  <option value="beginner">초급 (Beginner)</option>
                  <option value="intermediate" selected>중급 (Intermediate)</option>
                  <option value="advanced">고급 (Advanced)</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label text-xs" for="fileUploadText">추출된 텍스트 확인 및 수정</label>
                <textarea class="form-textarea w-full text-xs" id="fileUploadText" rows="6"></textarea>
                <p class="form-hint text-xs">오탈자나 불필요한 줄바꿈이 있다면 직접 편집할 수 있습니다.</p>
              </div>
            </div>
          </div>
          <div class="modal-footer flex justify-end gap-2">
            <button class="btn btn-secondary" id="fileUploadCancelBtn" type="button">취소</button>
            <button class="btn btn-primary" id="fileUploadSaveBtn" type="button" disabled>자료실에 저장하고 학습 시작</button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * AI 지문 생성 모달 열기 (3단계 구현)
   */
  function openAIGenerateModal() {
    const modal = document.getElementById('aiGenerateModal');
    if (modal) {
      modal.classList.add('modal-open');
    }
  }

  /**
   * AI 지문 생성 실행
   */
  async function handleAIGenerate() {
    const topic = (document.getElementById('aiGenTopic').value || '').trim() || 'Business & Technology';
    const level = document.getElementById('aiGenLevel').value || 'intermediate';
    const statusBox = document.getElementById('aiGenStatus');
    const submitBtn = document.getElementById('aiGenSubmitBtn');

    if (submitBtn) submitBtn.disabled = true;
    if (statusBox) {
      statusBox.classList.remove('hidden');
      statusBox.innerHTML = `
        <div class="flex items-center gap-2 text-primary font-semibold text-sm">
          <div class="loading-spinner" style="width:18px;height:18px;border-width:2px;"></div>
          <span>AI가 맞춤형 영어 지문을 생성 중입니다... (최대 10초 소요)</span>
        </div>
      `;
    }

    try {
      const result = await AIClient.generatePassage(topic, level);
      if (result.success && result.passage) {
        const userPassages = Storage.local.get('userPassages', []);
        userPassages.unshift(result.passage);
        Storage.local.set('userPassages', userPassages);
        Storage.local.set('currentPassageId', result.passage.id);

        if (statusBox) {
          statusBox.innerHTML = `
            <div class="alert alert--success text-xs">
              🎉 <strong>지문 생성 완료!</strong> "${escapeHtml(result.passage.title)}"<br>
              자료실에 등록되었습니다. 잠시 후 자료실로 이동합니다.
            </div>
          `;
        }

        setTimeout(() => {
          const modal = document.getElementById('aiGenerateModal');
          if (modal) modal.classList.remove('modal-open');
          Router.navigate('passages');
        }, 1500);
      } else {
        throw new Error(result.error || '지문 생성 실패');
      }
    } catch (err) {
      if (statusBox) {
        statusBox.innerHTML = `
          <div class="alert alert--error text-xs">
            ❌ 생성 중 문제가 발생했습니다: ${escapeHtml(err.message)}
          </div>
        `;
      }
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  }

  /**
   * AI 지문 생성 모달 HTML
   */
  function renderAIGenerateModal() {
    return `
      <div class="modal-overlay" id="aiGenerateModal" role="dialog" aria-modal="true" aria-labelledby="aiGenModalTitle">
        <div class="modal max-w-lg">
          <div class="modal-header">
            <h2 class="modal-title flex items-center gap-2" id="aiGenModalTitle">
              <span>🤖</span> AI 맞춤형 영어 지문 생성
            </h2>
            <button class="modal-close" id="aiGenClose" aria-label="닫기">×</button>
          </div>
          <div class="modal-body">
            <p class="text-xs text-secondary mb-4 leading-relaxed">
              원하는 학습 주제와 난이도를 선택하면 AI(Google Gemini 등)가 문맥과 어휘 수준에 맞춘 독창적인 영어 독해 지문을 자동 창작합니다.<br>
              <span class="text-primary font-semibold">※ Netlify 서버리스 환경변수에 키가 없더라도 시연용 스마트 생성 모드로 자동 동작합니다.</span>
            </p>

            <div class="form-group mb-3">
              <label class="form-label" for="aiGenTopic">학습 주제 (Topic)</label>
              <input type="text" class="form-input" id="aiGenTopic" placeholder="예: Global Supply Chain, AI Ethics, Renewable Energy" value="Global Business Trends" />
            </div>

            <div class="form-group mb-3">
              <label class="form-label" for="aiGenLevel">난이도 선택</label>
              <select class="form-select" id="aiGenLevel">
                <option value="beginner">초급 (Beginner - 약 150단어)</option>
                <option value="intermediate" selected>중급 (Intermediate - 약 200단어)</option>
                <option value="advanced">고급 (Advanced - 약 260단어)</option>
              </select>
            </div>

            <div id="aiGenStatus" class="mt-3 mb-2 hidden"></div>
          </div>
          <div class="modal-footer flex justify-end gap-2">
            <button class="btn btn-secondary" id="aiGenCancelBtn" type="button">취소</button>
            <button class="btn btn-primary" id="aiGenSubmitBtn" type="button">✨ 지문 생성하기</button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 간단한 알림 표시
   */
  function showAlert(message, type = 'info') {
    const existing = document.querySelector('.dashboard-alert');
    if (existing) existing.remove();

    const alert = document.createElement('div');
    alert.className = `alert alert--${type} dashboard-alert`;
    alert.textContent = message;
    alert.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:9999;max-width:400px;';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'margin-left:1rem;background:none;border:none;cursor:pointer;font-size:1.2rem;line-height:1;';
    closeBtn.onclick = () => alert.remove();
    alert.appendChild(closeBtn);

    document.body.appendChild(alert);
    setTimeout(() => { if (alert.parentNode) alert.remove(); }, 4000);
  }

  /**
   * 직접 입력 지문 저장
   */
  function saveDirectInput() {
    const title = document.getElementById('directInputTitle').value.trim();
    const text  = document.getElementById('directInputText').value.trim();
    const level = document.getElementById('directInputLevel').value;

    if (!title) { showAlert('지문 제목을 입력해 주세요.', 'error'); return; }
    if (text.length < 50) { showAlert('지문 내용이 너무 짧습니다 (최소 50자).', 'error'); return; }

    const passage = {
      id: 'user_' + Date.now(),
      title,
      text,
      level,
      type: 'user-input',
      topic: '사용자 입력',
      createdAt: new Date().toISOString(),
    };

    // 사용자 지문 목록에 추가
    const userPassages = Storage.local.get('userPassages', []);
    userPassages.push(passage);
    Storage.local.set('userPassages', userPassages);

    // 모달 닫기 및 알림
    document.getElementById('directInputModal').classList.remove('modal-open');
    showAlert(`"${escapeHtml(title)}" 지문이 저장되었습니다. 자료실에서 학습을 시작할 수 있습니다.`, 'success');
  }

  /**
   * 직접 입력 모달 HTML
   */
  function renderDirectInputModal() {
    return `
      <div class="modal-overlay" id="directInputModal" role="dialog" aria-modal="true" aria-labelledby="directInputModalTitle">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title" id="directInputModalTitle">지문 직접 입력</h2>
            <button class="modal-close" id="directInputClose" aria-label="닫기">×</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label" for="directInputTitle">지문 제목 <span class="required">*</span></label>
              <input type="text" class="form-input" id="directInputTitle" placeholder="예: AI and the Future of Work" maxlength="100" />
            </div>
            <div class="form-group">
              <label class="form-label" for="directInputLevel">난이도</label>
              <select class="form-select" id="directInputLevel">
                <option value="beginner">초급 (Beginner)</option>
                <option value="intermediate" selected>중급 (Intermediate)</option>
                <option value="advanced">고급 (Advanced)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="directInputText">영어 지문 <span class="required">*</span></label>
              <textarea class="form-textarea" id="directInputText" rows="10" placeholder="영어 지문을 여기에 붙여 넣거나 입력하세요. (최소 50자)"></textarea>
              <div class="form-hint" id="directInputCount">0자 입력됨</div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" id="directInputCancelBtn" type="button">취소</button>
            <button class="btn btn-primary" id="directInputSaveBtn" type="button">저장하고 자료실로 이동</button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 대시보드 이벤트 바인딩
   */
  function bindEvents() {
    // 빠른 시작 버튼
    document.querySelectorAll('.quick-start-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        switch (action) {
          case 'openDirectInput': openDirectInputModal(); break;
          case 'openFileUpload':  openFileUploadModal();  break;
          case 'goToPassages':    Router.navigate('passages'); break;
          case 'openAIGenerate':  openAIGenerateModal();  break;
        }
      });
    });

    // 학습 영역 카드 클릭
    document.querySelectorAll('.learning-card[data-nav]').forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        Router.navigate(card.dataset.nav);
      });
    });

    // 직접 입력 모달
    const modal = document.getElementById('directInputModal');
    if (modal) {
      document.getElementById('directInputClose').addEventListener('click', () => modal.classList.remove('modal-open'));
      document.getElementById('directInputCancelBtn').addEventListener('click', () => modal.classList.remove('modal-open'));
      document.getElementById('directInputSaveBtn').addEventListener('click', saveDirectInput);

      // 글자 수 카운트
      document.getElementById('directInputText').addEventListener('input', (e) => {
        document.getElementById('directInputCount').textContent = `${e.target.value.length}자 입력됨`;
      });

      // 오버레이 클릭으로 닫기
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('modal-open');
      });
    }

    // AI 생성 모달 이벤트 바인딩
    const aiModal = document.getElementById('aiGenerateModal');
    if (aiModal) {
      document.getElementById('aiGenClose').addEventListener('click', () => aiModal.classList.remove('modal-open'));
      document.getElementById('aiGenCancelBtn').addEventListener('click', () => aiModal.classList.remove('modal-open'));
      document.getElementById('aiGenSubmitBtn').addEventListener('click', handleAIGenerate);
      aiModal.addEventListener('click', (e) => {
        if (e.target === aiModal) aiModal.classList.remove('modal-open');
      });
    }

    // 파일 업로드 모달 이벤트 바인딩
    const uploadModal = document.getElementById('fileUploadModal');
    if (uploadModal) {
      document.getElementById('fileUploadClose').addEventListener('click', () => uploadModal.classList.remove('modal-open'));
      document.getElementById('fileUploadCancelBtn').addEventListener('click', () => uploadModal.classList.remove('modal-open'));
      document.getElementById('fileUploadInput').addEventListener('change', handleFileUploadChange);
      document.getElementById('fileUploadSaveBtn').addEventListener('click', saveUploadedPassage);
      uploadModal.addEventListener('click', (e) => {
        if (e.target === uploadModal) uploadModal.classList.remove('modal-open');
      });
    }
  }

  /**
   * 대시보드 메인 렌더링 함수
   */
  function render() {
    const contentArea = document.getElementById('contentArea');
    if (!contentArea) return;

    // 통계 데이터 로드
    const statsData = {
      totalPassages:   Storage.stats.getTotalPassagesStudied(),
      totalMinutes:    Storage.stats.getTotalStudyTime(),
      avgAccuracy:     Storage.stats.getAverageAccuracy(),
      overallProgress: Storage.stats.getOverallProgress(),
    };

    contentArea.innerHTML = `
      <!-- 대시보드 헤더 -->
      <div class="dashboard-header">
        <div>
          <h1 class="dashboard-title">대시보드</h1>
          <p class="dashboard-subtitle">안녕하세요! 오늘도 영어 학습을 시작해 보세요 👋</p>
        </div>
        <div class="dashboard-date">${new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}</div>
      </div>

      <!-- 통계 카드 -->
      <section class="dashboard-section">
        ${renderStatsCards(statsData)}
      </section>

      <!-- 빠른 학습 시작 -->
      <section class="dashboard-section">
        <div class="section-header">
          <h2 class="section-title">빠른 학습 시작</h2>
        </div>
        ${renderQuickStart()}
      </section>

      <!-- 5개 학습 영역 바로가기 -->
      <section class="dashboard-section">
        <div class="section-header">
          <h2 class="section-title">학습 영역</h2>
          <a href="#integrated" class="section-link" data-nav="integrated">통합 학습 시작 →</a>
        </div>
        ${renderLearningAreaCards()}
      </section>

      <!-- 하단 2열: 오늘의 목표 + 최근 학습 -->
      <div class="dashboard-bottom-grid">

        <section class="dashboard-section card">
          <div class="section-header">
            <h2 class="section-title">오늘의 목표</h2>
          </div>
          ${renderTodayGoal()}
        </section>

        <section class="dashboard-section card">
          <div class="section-header">
            <h2 class="section-title">최근 학습 기록</h2>
            <a href="#my-learning" class="section-link" data-nav="my-learning">전체 보기 →</a>
          </div>
          ${renderRecentRecords()}
        </section>

      </div>

      <!-- 취약 영역 -->
      <section class="dashboard-section card">
        <div class="section-header">
          <h2 class="section-title">취약 영역 분석</h2>
        </div>
        ${renderWeakAreas()}
      </section>

      <!-- 직접 입력 모달 -->
      ${renderDirectInputModal()}

      <!-- AI 지문 생성 모달 -->
      ${renderAIGenerateModal()}

      <!-- 파일 업로드 모달 -->
      ${renderFileUploadModal()}
    `;

    // 이벤트 바인딩
    bindEvents();

    // 섹션 링크 클릭 처리
    document.querySelectorAll('.section-link[data-nav]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        Router.navigate(link.dataset.nav);
      });
    });
  }

  return { render };
})();

