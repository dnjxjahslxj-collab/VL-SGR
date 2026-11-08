// vocabulary.js - 어휘(Vocabulary) 학습 모듈
// 플래시카드, 어휘 리스트, 발음 청취(TTS), 4지선다 퀴즈 및 오답 노트 자동 등록

const Vocabulary = (() => {
  let currentPassage = null;
  let currentMode = 'list'; // 'list' | 'flashcard' | 'quiz'
  let flashcardIndex = 0;
  let flashcardFlipped = false;
  
  // 퀴즈 상태
  let quizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;
  let quizQuestions = [];

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
   * 4지선다 어휘 퀴즈 생성
   */
  function prepareQuiz() {
    if (!currentPassage || !currentPassage.vocabulary || currentPassage.vocabulary.length === 0) {
      quizQuestions = [];
      return;
    }

    const vocabList = currentPassage.vocabulary;
    quizQuestions = vocabList.map((item, idx) => {
      // 오답 보기 3개 추출
      const otherMeanings = vocabList
        .filter((_, i) => i !== idx)
        .map(v => v.meaning);
      
      // 랜덤 섞기
      const shuffledOthers = otherMeanings.sort(() => 0.5 - Math.random()).slice(0, 3);
      // 만약 다른 단어가 부족할 경우 더미 보기 추가
      const fallbackOptions = ['지속적인 성장', '시장 분석', '기술 혁신', '재정적 책임'];
      while (shuffledOthers.length < 3) {
        const dummy = fallbackOptions.pop();
        if (dummy && !shuffledOthers.includes(dummy) && dummy !== item.meaning) {
          shuffledOthers.push(dummy);
        }
      }

      const options = [item.meaning, ...shuffledOthers].sort(() => 0.5 - Math.random());
      const correctIdx = options.indexOf(item.meaning);

      return {
        word: item.word,
        pos: item.pos,
        example: item.example,
        correctMeaning: item.meaning,
        options,
        answer: correctIdx
      };
    }).sort(() => 0.5 - Math.random());

    quizIndex = 0;
    quizScore = 0;
    quizAnswered = false;
  }

  /**
   * 어휘 리스트 뷰
   */
  function renderListView() {
    const list = currentPassage.vocabulary || [];
    if (list.length === 0) {
      return `<div class="empty-state py-8"><p>등록된 어휘가 없습니다.</p></div>`;
    }

    return `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${list.map((v, i) => `
          <div class="card p-4 border flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start mb-2">
                <div>
                  <span class="text-xl font-bold text-primary">${escapeHtml(v.word)}</span>
                  <span class="text-xs text-secondary ml-2">(${escapeHtml(v.pos || '단어')})</span>
                </div>
                <button class="btn btn-ghost btn-sm btn-speak-word" data-word="${escapeHtml(v.word)}" title="발음 듣기">
                  🔊 듣기
                </button>
              </div>
              <p class="text-base font-semibold text-gray-800 mb-2">뜻: ${escapeHtml(v.meaning)}</p>
              ${v.example ? `<p class="text-sm text-gray-600 bg-gray-50 p-2 rounded mb-2"><em>"${escapeHtml(v.example)}"</em></p>` : ''}
            </div>
            ${v.synonyms && v.synonyms.length > 0 ? `
              <div class="text-xs text-secondary pt-2 border-top">
                유의어: ${v.synonyms.map(s => `<span class="badge badge-ghost mr-1">${escapeHtml(s)}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * 플래시카드 뷰
   */
  function renderFlashcardView() {
    const list = currentPassage.vocabulary || [];
    if (list.length === 0) return `<div class="empty-state py-8"><p>단어가 없습니다.</p></div>`;

    const v = list[flashcardIndex];

    return `
      <div class="max-w-md mx-auto text-center py-6">
        <div class="text-sm text-secondary mb-2">${flashcardIndex + 1} / ${list.length}</div>
        
        <div class="card p-8 mb-6 cursor-pointer bg-white border-2 border-blue-100 shadow-md min-h-[260px] flex flex-col justify-center items-center" id="flashcardBox">
          ${!flashcardFlipped ? `
            <div>
              <span class="badge badge-ghost mb-3">${escapeHtml(v.pos || '단어')}</span>
              <h2 class="text-3xl font-bold text-primary mb-3">${escapeHtml(v.word)}</h2>
              <button class="btn btn-secondary btn-sm btn-speak-word mt-2" data-word="${escapeHtml(v.word)}">🔊 발음 듣기</button>
              <p class="text-xs text-gray-400 mt-6">(카드를 클릭하면 뜻을 확인합니다)</p>
            </div>
          ` : `
            <div>
              <span class="text-xs text-secondary mb-2">${escapeHtml(v.word)}</span>
              <h2 class="text-2xl font-bold text-gray-900 mb-3">${escapeHtml(v.meaning)}</h2>
              ${v.example ? `<p class="text-sm text-gray-600 italic bg-gray-50 p-3 rounded mb-3">"${escapeHtml(v.example)}"</p>` : ''}
              ${v.synonyms ? `<p class="text-xs text-secondary">유의어: ${v.synonyms.join(', ')}</p>` : ''}
              <p class="text-xs text-gray-400 mt-4">(카드를 클릭하면 다시 앞면으로 전환됩니다)</p>
            </div>
          `}
        </div>

        <div class="flex justify-center gap-4">
          <button class="btn btn-secondary" id="fcPrevBtn" ${flashcardIndex === 0 ? 'disabled' : ''}>← 이전 단어</button>
          <button class="btn btn-ghost" id="fcFlipBtn">🔄 뒤집기</button>
          <button class="btn btn-primary" id="fcNextBtn" ${flashcardIndex === list.length - 1 ? 'disabled' : ''}>다음 단어 →</button>
        </div>
      </div>
    `;
  }

  /**
   * 퀴즈 뷰
   */
  function renderQuizView() {
    if (quizQuestions.length === 0) {
      return `<div class="empty-state py-8"><p>문제를 생성할 수 없습니다.</p></div>`;
    }

    if (quizIndex >= quizQuestions.length) {
      // 퀴즈 완료 화면
      const percentage = Math.round((quizScore / quizQuestions.length) * 100);
      return `
        <div class="card max-w-lg mx-auto text-center p-8">
          <div class="text-4xl mb-3">🎉</div>
          <h2 class="text-2xl font-bold mb-2">어휘 퀴즈 완료!</h2>
          <p class="text-secondary mb-4">${currentPassage.title} 핵심 어휘 테스트</p>
          
          <div class="text-4xl font-extrabold text-primary mb-2">${percentage}%</div>
          <p class="text-gray-600 mb-6">${quizQuestions.length}문제 중 <strong>${quizScore}</strong>개 정답</p>

          <div class="flex justify-center gap-3">
            <button class="btn btn-secondary" id="quizRetryBtn">다시 풀기</button>
            <button class="btn btn-primary" onclick="Router.navigate('passages')">다른 지문 학습하기</button>
          </div>
        </div>
      `;
    }

    const q = quizQuestions[quizIndex];

    return `
      <div class="max-w-xl mx-auto">
        <div class="flex justify-between items-center text-sm text-secondary mb-3">
          <span>문제 ${quizIndex + 1} / ${quizQuestions.length}</span>
          <span>현재 점수: ${quizScore}점</span>
        </div>

        <div class="card p-6 mb-6">
          <div class="text-center mb-6">
            <span class="badge badge-ghost mb-2">${escapeHtml(q.pos || '단어')}</span>
            <div class="flex items-center justify-center gap-3">
              <h2 class="text-3xl font-extrabold text-primary">${escapeHtml(q.word)}</h2>
              <button class="btn btn-ghost btn-sm btn-speak-word" data-word="${escapeHtml(q.word)}" title="발음 듣기">🔊</button>
            </div>
            ${q.example ? `<p class="text-sm text-gray-500 italic mt-2">"${escapeHtml(q.example)}"</p>` : ''}
          </div>

          <div class="quiz-options flex flex-col gap-3">
            ${q.options.map((opt, i) => `
              <button class="btn btn-secondary text-left p-3 quiz-opt-btn" data-index="${i}" ${quizAnswered ? 'disabled' : ''}>
                <span class="font-bold mr-2">${i + 1}.</span> ${escapeHtml(opt)}
              </button>
            `).join('')}
          </div>

          <div id="quizFeedbackBox" class="mt-4 hidden"></div>
        </div>
      </div>
    `;
  }

  function bindEvents() {
    // 지문 선택 체인지
    const passageSelect = document.getElementById('vocabPassageSelect');
    if (passageSelect) {
      passageSelect.addEventListener('change', (e) => {
        Storage.local.set('currentPassageId', e.target.value);
        currentPassage = getActivePassage();
        flashcardIndex = 0;
        flashcardFlipped = false;
        if (currentMode === 'quiz') prepareQuiz();
        render();
      });
    }

    // 모드 탭 전환
    document.querySelectorAll('.vocab-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentMode = btn.dataset.mode;
        flashcardFlipped = false;
        if (currentMode === 'quiz') prepareQuiz();
        render();
      });
    });

    // 발음 듣기 버튼
    document.addEventListener('click', (e) => {
      const speakBtn = e.target.closest('.btn-speak-word');
      if (speakBtn) {
        e.stopPropagation();
        const word = speakBtn.dataset.word;
        if (word && Speech.tts.isSupported) {
          const rate = Storage.settings.get('ttsRate', 1.0);
          Speech.tts.speak(word, { rate, lang: 'en-US' });
        }
      }
    });

    // 플래시카드 이벤트
    if (currentMode === 'flashcard') {
      const fcBox = document.getElementById('flashcardBox');
      if (fcBox) {
        fcBox.addEventListener('click', () => {
          flashcardFlipped = !flashcardFlipped;
          render();
        });
      }
      const fcPrev = document.getElementById('fcPrevBtn');
      if (fcPrev) fcPrev.addEventListener('click', () => {
        if (flashcardIndex > 0) {
          flashcardIndex--;
          flashcardFlipped = false;
          render();
        }
      });
      const fcNext = document.getElementById('fcNextBtn');
      if (fcNext) fcNext.addEventListener('click', () => {
        const list = currentPassage.vocabulary || [];
        if (flashcardIndex < list.length - 1) {
          flashcardIndex++;
          flashcardFlipped = false;
          render();
        }
      });
      const fcFlip = document.getElementById('fcFlipBtn');
      if (fcFlip) fcFlip.addEventListener('click', () => {
        flashcardFlipped = !flashcardFlipped;
        render();
      });
    }

    // 퀴즈 이벤트
    if (currentMode === 'quiz') {
      document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          if (quizAnswered) return;
          quizAnswered = true;
          const selected = parseInt(btn.dataset.index, 10);
          const q = quizQuestions[quizIndex];
          const isCorrect = (selected === q.answer);

          if (isCorrect) {
            quizScore++;
            btn.classList.remove('btn-secondary');
            btn.classList.add('btn-success');
          } else {
            btn.classList.remove('btn-secondary');
            btn.classList.add('btn-danger');
            
            // 정답 표시
            const correctBtn = document.querySelector(`.quiz-opt-btn[data-index="${q.answer}"]`);
            if (correctBtn) {
              correctBtn.classList.remove('btn-secondary');
              correctBtn.classList.add('btn-success');
            }

            // 오답 노트에 등록
            Storage.wrongAnswers.add({
              passageId: currentPassage.id,
              passageTitle: currentPassage.title,
              area: 'vocabulary',
              question: `[어휘 뜻 고르기] "${q.word}"의 올바른 뜻은?`,
              userAnswer: q.options[selected],
              correctAnswer: q.correctMeaning,
              explanation: `단어 "${q.word}"(${q.pos})의 정확한 뜻은 "${q.correctMeaning}"입니다. (예문: ${q.example || '없음'})`
            });
          }

          // 피드백 박스 노출
          const feedbackBox = document.getElementById('quizFeedbackBox');
          if (feedbackBox) {
            feedbackBox.classList.remove('hidden');
            feedbackBox.innerHTML = `
              <div class="alert ${isCorrect ? 'alert--success' : 'alert--error'} mb-3">
                ${isCorrect ? '🎉 <strong>정답입니다!</strong>' : `❌ <strong>오답입니다.</strong> 오답 노트에 자동 등록되었습니다.`}
              </div>
              <button class="btn btn-primary w-full" id="quizNextBtn">
                ${quizIndex < quizQuestions.length - 1 ? '다음 문제 →' : '결과 보기'}
              </button>
            `;
            document.getElementById('quizNextBtn').addEventListener('click', () => {
              quizIndex++;
              quizAnswered = false;
              render();
            });
          }
        });
      });

      const retryBtn = document.getElementById('quizRetryBtn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          prepareQuiz();
          render();
        });
      }
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
          <div class="empty-state-icon">📚</div>
          <h2 class="text-xl font-bold mb-2">지문이 없습니다</h2>
          <p class="text-secondary mb-4">학습할 지문을 먼저 선택해 주세요.</p>
          <a href="#passages" class="btn btn-primary">자료실로 이동</a>
        </div>
      `;
      return;
    }

    const allPassages = Passages.getAllPassages();

    contentArea.innerHTML = `
      <div class="page-header mb-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="page-title text-2xl font-bold">📖 Vocabulary (어휘 학습)</h1>
            <p class="page-subtitle text-secondary">지문의 핵심 어휘를 발음과 예문으로 익히고 퀴즈로 점검하세요.</p>
          </div>

          <!-- 지문 선택기 드롭다운 -->
          <div class="w-full md:w-80">
            <label class="form-label text-xs mb-1" for="vocabPassageSelect">학습 지문 선택</label>
            <select id="vocabPassageSelect" class="form-select">
              ${allPassages.map(p => `
                <option value="${p.id}" ${p.id === currentPassage.id ? 'selected' : ''}>
                  [${p.level === 'beginner' ? '초급' : p.level === 'intermediate' ? '중급' : '고급'}] ${escapeHtml(p.title)}
                </option>
              `).join('')}
            </select>
          </div>
        </div>
      </div>

      <!-- 모드 탭 -->
      <div class="tabs mb-6">
        <div class="tab-list flex gap-2 border-bottom pb-2">
          <button class="btn btn-sm ${currentMode === 'list' ? 'btn-primary' : 'btn-secondary'} vocab-mode-btn" data-mode="list">📋 어휘 목록</button>
          <button class="btn btn-sm ${currentMode === 'flashcard' ? 'btn-primary' : 'btn-secondary'} vocab-mode-btn" data-mode="flashcard">🗂️ 플래시카드</button>
          <button class="btn btn-sm ${currentMode === 'quiz' ? 'btn-primary' : 'btn-secondary'} vocab-mode-btn" data-mode="quiz">📝 어휘 퀴즈</button>
        </div>
      </div>

      <!-- 메인 콘텐츠 영역 -->
      <div class="vocab-main-content">
        ${currentMode === 'list' ? renderListView() :
          currentMode === 'flashcard' ? renderFlashcardView() : renderQuizView()}
      </div>
    `;

    bindEvents();
  }

  return { render };
})();
