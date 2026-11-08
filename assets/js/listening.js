// listening.js - 듣기(Listening) 학습 모듈
// Web Speech API 기반 전체/문장별 TTS 재생, 배속 조절, 받아쓰기(Dictation) diff 비교 및 듣기 퀴즈

const Listening = (() => {
  let currentPassage = null;
  let activeSentenceIdx = 0;
  let currentPlaybackRate = 1.0;
  let dictationAnswers = {}; // { sentenceIndex: text }
  let dictationEvaluated = {}; // { sentenceIndex: boolean }
  let quizAnswers = {}; // { qIdx: selectedOpt }
  let quizGraded = false;

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
   * 단어 단위 diff 비교 (원문 vs 제출 답안)
   */
  function compareWords(original, typed) {
    const clean = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const origWords = (original || '').split(/\s+/);
    const typedWords = (typed || '').split(/\s+/);

    return origWords.map((orig, i) => {
      const userWord = typedWords[i] || '';
      const isMatch = clean(orig) === clean(userWord);
      return {
        original: orig,
        user: userWord,
        match: isMatch
      };
    });
  }

  function bindEvents() {
    // 지문 선택 드롭다운
    const selectEl = document.getElementById('listeningPassageSelect');
    if (selectEl) {
      selectEl.addEventListener('change', (e) => {
        Speech.tts.stop();
        Storage.local.set('currentPassageId', e.target.value);
        currentPassage = getActivePassage();
        activeSentenceIdx = 0;
        dictationAnswers = {};
        dictationEvaluated = {};
        quizAnswers = {};
        quizGraded = false;
        render();
      });
    }

    // 재생 속도 버튼
    document.querySelectorAll('.btn-rate-control').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-rate-control').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPlaybackRate = parseFloat(btn.dataset.rate);
      });
    });

    // 전체 지문 재생
    const playAllBtn = document.getElementById('btnPlayAll');
    if (playAllBtn) {
      playAllBtn.addEventListener('click', () => {
        if (!currentPassage || !currentPassage.text) return;
        Speech.tts.stop();
        Speech.tts.speak(currentPassage.text, {
          rate: currentPlaybackRate,
          lang: 'en-US'
        });
      });
    }

    // 전체 정지
    const stopAudioBtn = document.getElementById('btnStopAudio');
    if (stopAudioBtn) {
      stopAudioBtn.addEventListener('click', () => {
        Speech.tts.stop();
      });
    }

    // 개별 문장 재생
    document.querySelectorAll('.btn-play-sentence').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.dataset.sentence;
        if (text) {
          Speech.tts.stop();
          Speech.tts.speak(text, {
            rate: currentPlaybackRate,
            lang: 'en-US'
          });
        }
      });
    });

    // 받아쓰기 입력 이벤트
    document.querySelectorAll('.dictation-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const sIdx = parseInt(e.target.dataset.sidx, 10);
        dictationAnswers[sIdx] = e.target.value;
      });
    });

    // 받아쓰기 채점 버튼
    document.querySelectorAll('.btn-check-dictation').forEach(btn => {
      btn.addEventListener('click', () => {
        const sIdx = parseInt(btn.dataset.sidx, 10);
        dictationEvaluated[sIdx] = true;
        render();
      });
    });

    // 듣기 퀴즈 보기 선택
    document.querySelectorAll('.lquiz-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (quizGraded) return;
        const qIdx = parseInt(btn.dataset.qidx, 10);
        const optIdx = parseInt(btn.dataset.optidx, 10);
        quizAnswers[qIdx] = optIdx;

        document.querySelectorAll(`.lquiz-opt-btn[data-qidx="${qIdx}"]`).forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-secondary');
        });
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
      });
    });

    // 듣기 퀴즈 채점
    const checkQuizBtn = document.getElementById('btnCheckListeningQuiz');
    if (checkQuizBtn) {
      checkQuizBtn.addEventListener('click', () => {
        const questions = currentPassage.listeningQuestions || [];
        if (Object.keys(quizAnswers).length < questions.length) {
          alert('모든 듣기 문제에 답을 선택해 주세요.');
          return;
        }

        quizGraded = true;
        // 오답 저장
        questions.forEach((q, idx) => {
          const userAns = quizAnswers[idx];
          if (userAns !== q.answer) {
            Storage.wrongAnswers.add({
              passageId: currentPassage.id,
              passageTitle: currentPassage.title,
              area: 'listening',
              question: `[듣기 문제] ${q.question}`,
              userAnswer: q.options[userAns] || '미응답',
              correctAnswer: q.options[q.answer],
              explanation: q.explanation || '듣기 내용을 바탕으로 올바른 정답을 선택해야 합니다.'
            });
          }
        });

        render();
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
          <div class="empty-state-icon">🎧</div>
          <h2 class="text-xl font-bold mb-2">지문이 없습니다</h2>
          <p class="text-secondary mb-4">학습할 지문을 먼저 선택해 주세요.</p>
          <a href="#passages" class="btn btn-primary">자료실로 이동</a>
        </div>
      `;
      return;
    }

    const allPassages = Passages.getAllPassages();
    const sentences = currentPassage.sentences || [];
    const questions = currentPassage.listeningQuestions || [];

    contentArea.innerHTML = `
      <div class="page-header mb-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="page-title text-2xl font-bold">🎧 Listening (듣기 및 받아쓰기)</h1>
            <p class="page-subtitle text-secondary">원어민 발음으로 지문을 듣고 받아쓰기(Dictation) 훈련을 진행하세요.</p>
          </div>

          <div class="w-full md:w-80">
            <label class="form-label text-xs mb-1" for="listeningPassageSelect">학습 지문 선택</label>
            <select id="listeningPassageSelect" class="form-select">
              ${allPassages.map(p => `
                <option value="${p.id}" ${p.id === currentPassage.id ? 'selected' : ''}>
                  [${p.level === 'beginner' ? '초급' : p.level === 'intermediate' ? '중급' : '고급'}] ${escapeHtml(p.title)}
                </option>
              `).join('')}
            </select>
          </div>
        </div>
      </div>

      <!-- 오디오 컨트롤러 바 -->
      <div class="card p-4 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-3">
            <button class="btn btn-primary flex items-center gap-2" id="btnPlayAll">
              ▶️ 전체 지문 연속 듣기
            </button>
            <button class="btn btn-secondary flex items-center gap-2" id="btnStopAudio">
              ⏹️ 오디오 정지
            </button>
          </div>

          <!-- 재생 속도 조절 -->
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-secondary">재생 속도:</span>
            <div class="btn-group flex gap-1">
              <button class="btn btn-xs btn-secondary btn-rate-control ${currentPlaybackRate === 0.75 ? 'active' : ''}" data-rate="0.75">0.75x</button>
              <button class="btn btn-xs btn-secondary btn-rate-control ${currentPlaybackRate === 1.0 ? 'active' : ''}" data-rate="1.0">1.0x</button>
              <button class="btn btn-xs btn-secondary btn-rate-control ${currentPlaybackRate === 1.25 ? 'active' : ''}" data-rate="1.25">1.25x</button>
            </div>
          </div>
        </div>
        ${!Speech.tts.isSupported ? `
          <div class="alert alert--warning mt-3 text-xs">
            ⚠️ 현재 브라우저는 TTS(SpeechSynthesis)를 지원하지 않거나 제한되어 있습니다. Chrome 또는 Edge 브라우저를 권장합니다.
          </div>
        ` : ''}
      </div>

      <!-- 문장별 받아쓰기(Dictation) 섹션 -->
      <div class="card p-6 mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold">✍️ 문장별 받아쓰기 (Dictation Mode)</h2>
          <span class="text-xs text-secondary">소리를 듣고 빈칸에 정확하게 받아 적어보세요.</span>
        </div>

        <div class="flex flex-col gap-6">
          ${sentences.map((st, idx) => {
            const isChecked = dictationEvaluated[idx];
            const typed = dictationAnswers[idx] || '';
            const diffWords = isChecked ? compareWords(st.text, typed) : [];
            const accuracy = isChecked ? Math.round((diffWords.filter(w => w.match).length / diffWords.length) * 100) : 0;

            return `
              <div class="p-4 bg-gray-50 rounded-lg border">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-xs font-bold text-primary">문장 ${idx + 1}</span>
                  <button class="btn btn-secondary btn-xs btn-play-sentence" data-sentence="${escapeHtml(st.text)}">
                    🔊 문장 듣기
                  </button>
                </div>

                <div class="mb-3">
                  <input type="text" class="form-input dictation-input w-full"
                    placeholder="소리를 듣고 영문장을 받아 적으세요..."
                    data-sidx="${idx}"
                    value="${escapeHtml(typed)}"
                    ${isChecked ? 'readonly' : ''} />
                </div>

                ${!isChecked ? `
                  <button class="btn btn-primary btn-sm btn-check-dictation" data-sidx="${idx}">
                    확인 및 비교하기
                  </button>
                ` : `
                  <div class="p-3 bg-white border rounded">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-xs font-bold text-gray-700">채점 결과 (일치율: ${accuracy}%)</span>
                      <span class="text-xs ${accuracy >= 80 ? 'text-green-600 font-bold' : 'text-red-500'}">
                        ${accuracy >= 80 ? '🎯 훌륭합니다!' : '💡 다시 들어보세요'}
                      </span>
                    </div>

                    <!-- 원문 vs 작성 단어 비교 하이라이트 -->
                    <div class="text-sm font-mono leading-relaxed mb-2 p-2 bg-gray-50 rounded">
                      ${diffWords.map(w => `
                        <span class="${w.match ? 'text-green-700 font-bold' : 'text-red-600 line-through bg-red-50 px-1 rounded'}">
                          ${escapeHtml(w.user || '(누락)')}
                        </span>
                      `).join(' ')}
                    </div>

                    <div class="text-xs text-gray-600 border-top pt-2 mt-2">
                      <strong>정답 원문:</strong> ${escapeHtml(st.text)}<br>
                      <strong>해석:</strong> ${escapeHtml(st.translation || '')}
                    </div>
                  </div>
                `}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- 듣기 이해 퀴즈 -->
      ${questions.length > 0 ? `
        <div class="card p-6">
          <h2 class="text-lg font-bold mb-4">🎯 듣기 내용 확인 퀴즈</h2>
          <div class="flex flex-col gap-4">
            ${questions.map((q, qIdx) => {
              const selected = quizAnswers[qIdx];
              return `
                <div class="p-4 border rounded bg-white">
                  <p class="font-bold text-sm text-gray-800 mb-3">${qIdx + 1}. ${escapeHtml(q.question)}</p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    ${q.options.map((opt, optIdx) => {
                      let btnCls = 'btn-secondary';
                      if (selected === optIdx) btnCls = 'btn-primary';
                      if (quizGraded) {
                        if (optIdx === q.answer) btnCls = 'btn-success text-white';
                        else if (selected === optIdx) btnCls = 'btn-danger text-white';
                      }

                      return `
                        <button class="btn ${btnCls} btn-sm text-left p-2 lquiz-opt-btn"
                          data-qidx="${qIdx}" data-optidx="${optIdx}" ${quizGraded ? 'disabled' : ''}>
                          ${optIdx + 1}) ${escapeHtml(opt)}
                        </button>
                      `;
                    }).join('')}
                  </div>
                  ${quizGraded ? `
                    <div class="text-xs p-2 rounded mt-2 ${selected === q.answer ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}">
                      <strong>${selected === q.answer ? '✅ 정답' : '❌ 오답'}:</strong> ${escapeHtml(q.explanation)}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}

            ${!quizGraded ? `
              <button class="btn btn-primary w-full mt-2" id="btnCheckListeningQuiz">
                듣기 퀴즈 채점하기
              </button>
            ` : ''}
          </div>
        </div>
      ` : ''}
    `;

    bindEvents();
  }

  return { render };
})();
