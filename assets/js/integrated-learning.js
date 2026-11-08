// integrated-learning.js - 통합 학습(Integrated Learning) 모듈
// 지문 1개 기반: Vocabulary → Listening → Grammar → Reading → Speaking → 종합 결과 플로우

const IntegratedLearning = (() => {
  let currentPassage = null;
  let currentStep = 1; // 1: Vocab, 2: Listening, 3: Grammar, 4: Reading, 5: Speaking
  let stepScores = {
    vocabulary: null,
    listening: null,
    grammar: null,
    reading: null,
    speaking: null
  };
  let startTime = null;

  const STEPS = [
    { num: 1, id: 'vocabulary', label: '1. 어휘 (Vocab)', icon: '📖' },
    { num: 2, id: 'listening',  label: '2. 듣기 (Listening)', icon: '🎧' },
    { num: 3, id: 'grammar',    label: '3. 문법 (Grammar)', icon: '✏️' },
    { num: 4, id: 'reading',    label: '4. 독해 (Reading)', icon: '📝' },
    { num: 5, id: 'speaking',   label: '5. 말하기 (Speaking)', icon: '🎤' }
  ];

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

  /**
   * 단계별 뷰 HTML 인젝션
   */
  function renderStepContent() {
    switch (currentStep) {
      case 1:
        return `
          <div class="step-pane p-4 bg-white rounded border">
            <h3 class="text-lg font-bold mb-3">📖 1단계: 핵심 어휘 학습</h3>
            <p class="text-sm text-secondary mb-4">지문을 읽기 전에 핵심 어휘를 미리 눈에 익혀두세요.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              ${(currentPassage.vocabulary || []).map(v => `
                <div class="p-3 border rounded bg-gray-50 flex justify-between items-center">
                  <div>
                    <span class="font-bold text-primary">${escapeHtml(v.word)}</span>
                    <span class="text-xs text-secondary ml-1">(${escapeHtml(v.pos || '')})</span>
                    <div class="text-sm text-gray-800">${escapeHtml(v.meaning)}</div>
                  </div>
                  <button class="btn btn-ghost btn-xs btn-integrated-tts" data-word="${escapeHtml(v.word)}">🔊</button>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 2:
        return `
          <div class="step-pane p-4 bg-white rounded border">
            <h3 class="text-lg font-bold mb-3">🎧 2단계: 문장 듣기</h3>
            <p class="text-sm text-secondary mb-4">원어민 발음으로 지문 문장을 소리 내어 들어보세요.</p>
            <div class="flex gap-2 mb-4">
              <button class="btn btn-primary btn-sm" id="btnStepPlayAll">▶️ 전체 문장 듣기</button>
              <button class="btn btn-secondary btn-sm" id="btnStepStopAudio">⏹️ 정지</button>
            </div>
            <div class="flex flex-col gap-2">
              ${(currentPassage.sentences || []).map((st, i) => `
                <div class="p-2 border rounded bg-gray-50 flex justify-between items-center text-sm">
                  <span><strong class="text-primary mr-2">${i + 1}.</strong> ${escapeHtml(st.text)}</span>
                  <button class="btn btn-ghost btn-xs btn-integrated-tts" data-word="${escapeHtml(st.text)}">🔊</button>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 3:
        return `
          <div class="step-pane p-4 bg-white rounded border">
            <h3 class="text-lg font-bold mb-3">✏️ 3단계: 핵심 문법 확인</h3>
            <div class="flex flex-col gap-4">
              ${(currentPassage.grammar || []).map((g, i) => `
                <div class="p-4 border rounded bg-blue-50/50">
                  <h4 class="font-bold text-gray-900 mb-1">Point ${i + 1}. ${escapeHtml(g.title)}</h4>
                  <p class="text-xs text-gray-700 mb-2">${escapeHtml(g.explanation)}</p>
                  <p class="text-xs font-semibold text-primary">본문 쓰임: "${escapeHtml(g.passageExample || '')}"</p>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      case 4:
        return `
          <div class="step-pane p-4 bg-white rounded border">
            <h3 class="text-lg font-bold mb-3">📝 4단계: 본문 독해</h3>
            <div class="p-4 bg-gray-50 rounded border mb-4 text-sm leading-relaxed text-gray-800">
              ${(currentPassage.sentences || []).map(st => `
                <p class="mb-2"><strong>${escapeHtml(st.text)}</strong><br><span class="text-xs text-secondary">${escapeHtml(st.translation || '')}</span></p>
              `).join('')}
            </div>
          </div>
        `;

      case 5:
        return `
          <div class="step-pane p-4 bg-white rounded border">
            <h3 class="text-lg font-bold mb-3">🎤 5단계: 지문 영어 요약 & 생각 말하기</h3>
            <div class="p-4 bg-yellow-50 rounded border mb-4">
              <p class="text-sm font-bold text-gray-900 mb-1">과제: ${escapeHtml(currentPassage.speakingTask?.prompt || '지문 핵심을 영어로 요약하세요.')}</p>
              <p class="text-xs text-secondary">모범 표현: "${escapeHtml(currentPassage.speakingTask?.sampleAnswer || '')}"</p>
            </div>
            <textarea class="form-textarea w-full text-sm" id="integratedSpeakingText" rows="4" placeholder="자신의 영어 생각을 자유롭게 적어보세요..."></textarea>
          </div>
        `;

      default:
        return '';
    }
  }

  function finishIntegratedLearning() {
    // 총 학습 시간 계산
    const durationMinutes = startTime ? Math.max(1, Math.round((Date.now() - startTime) / 60000)) : 5;
    const finalScore = 85; // 통합 학습 기본 완료 성취도

    // 학습 기록 저장
    const savedRecord = Storage.records.add({
      passageId: currentPassage.id,
      passageTitle: currentPassage.title,
      area: 'integrated',
      areas: ['vocabulary', 'listening', 'grammar', 'reading', 'speaking'],
      duration: durationMinutes * 60,
      durationMinutes,
      score: finalScore,
      accuracy: finalScore,
      details: {
        completedSteps: 5,
        completedAt: new Date().toISOString()
      }
    });

    // 결과 화면 렌더링
    Results.render({
      record: savedRecord,
      passage: currentPassage,
      score: finalScore,
      durationMinutes
    });
  }

  function bindEvents() {
    // 지문 선택 드롭다운
    const selectEl = document.getElementById('integratedPassageSelect');
    if (selectEl) {
      selectEl.addEventListener('change', (e) => {
        Speech.tts.stop();
        Storage.local.set('currentPassageId', e.target.value);
        currentPassage = getActivePassage();
        currentStep = 1;
        startTime = Date.now();
        render();
      });
    }

    // TTS 발음 버튼
    document.querySelectorAll('.btn-integrated-tts').forEach(btn => {
      btn.addEventListener('click', () => {
        const word = btn.dataset.word;
        if (word && Speech.tts.isSupported) {
          Speech.tts.stop();
          Speech.tts.speak(word, { lang: 'en-US' });
        }
      });
    });

    // 전체 재생
    const playAll = document.getElementById('btnStepPlayAll');
    if (playAll) {
      playAll.addEventListener('click', () => {
        Speech.tts.stop();
        Speech.tts.speak(currentPassage.text, { lang: 'en-US' });
      });
    }

    // 정지
    const stopAudio = document.getElementById('btnStepStopAudio');
    if (stopAudio) {
      stopAudio.addEventListener('click', () => {
        Speech.tts.stop();
      });
    }

    // 이전 단계 버튼
    const prevBtn = document.getElementById('btnPrevStep');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        Speech.tts.stop();
        if (currentStep > 1) {
          currentStep--;
          render();
        }
      });
    }

    // 다음 단계 / 완료 버튼
    const nextBtn = document.getElementById('btnNextStep');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        Speech.tts.stop();
        if (currentStep < 5) {
          currentStep++;
          render();
        } else {
          finishIntegratedLearning();
        }
      });
    }
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
          <div class="empty-state-icon">🔗</div>
          <h2 class="text-xl font-bold mb-2">지문이 없습니다</h2>
          <p class="text-secondary mb-4">학습할 지문을 먼저 선택해 주세요.</p>
          <a href="#passages" class="btn btn-primary">자료실로 이동</a>
        </div>
      `;
      return;
    }

    if (!startTime) startTime = Date.now();
    const allPassages = Passages.getAllPassages();
    const progressPercent = Math.round((currentStep / 5) * 100);

    contentArea.innerHTML = `
      <div class="page-header mb-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="page-title text-2xl font-bold">🔗 Integrated Learning (5단계 통합 학습)</h1>
            <p class="page-subtitle text-secondary">어휘 → 듣기 → 문법 → 독해 → 말하기 순서로 지문 하나를 완벽하게 마스터하세요.</p>
          </div>

          <div class="w-full md:w-80">
            <label class="form-label text-xs mb-1" for="integratedPassageSelect">학습 지문 선택</label>
            <select id="integratedPassageSelect" class="form-select">
              ${allPassages.map(p => `
                <option value="${p.id}" ${p.id === currentPassage.id ? 'selected' : ''}>
                  [${p.level === 'beginner' ? '초급' : p.level === 'intermediate' ? '중급' : '고급'}] ${escapeHtml(p.title)}
                </option>
              `).join('')}
            </select>
          </div>
        </div>
      </div>

      <!-- 상단 스텝 프로그레스 바 -->
      <div class="card p-4 mb-6">
        <div class="flex justify-between items-center text-xs font-bold text-secondary mb-2">
          <span>진행률: ${progressPercent}% (Step ${currentStep} of 5)</span>
          <span class="text-primary">${STEPS[currentStep - 1].label}</span>
        </div>
        <div class="progress-bar mb-4">
          <div class="progress-fill" style="width:${progressPercent}%;"></div>
        </div>

        <!-- 5단계 아이콘 배지 -->
        <div class="grid grid-cols-5 gap-2 text-center text-xs">
          ${STEPS.map(s => {
            const isCurrent = s.num === currentStep;
            const isDone = s.num < currentStep;
            return `
              <div class="p-2 rounded ${isCurrent ? 'bg-primary text-white font-bold' : isDone ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}">
                ${s.icon} <span class="hidden md:inline">${s.label.split(' ')[1]}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- 메인 스텝 학습 콘텐츠 -->
      <div class="integrated-step-body mb-6">
        ${renderStepContent()}
      </div>

      <!-- 하단 네비게이션 버튼 바 -->
      <div class="card p-4 flex justify-between items-center">
        <button class="btn btn-secondary" id="btnPrevStep" ${currentStep === 1 ? 'disabled' : ''}>
          ← 이전 단계
        </button>

        <button class="btn btn-primary" id="btnNextStep">
          ${currentStep < 5 ? `다음 단계 (${STEPS[currentStep].label}) →` : '🎉 학습 완료 및 종합 결과 확인'}
        </button>
      </div>
    `;

    bindEvents();
  }

  return { render };
})();
