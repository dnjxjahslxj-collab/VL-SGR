// reading.js - 독해(Reading) 학습 모듈
// 본문 직독직해(문장별 한국어 해석 토글), 핵심 구문 분석, 객관식 및 주관식 독해 문제 채점, 오답 노트 연동

const Reading = (() => {
  let currentPassage = null;
  let showTranslation = false;
  let userAnswers = {}; // { qIdx: selectedOptIndex }
  let userSummaryText = '';
  let isGraded = false;
  let readingScore = 0;

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
   * 주관식 요약 평가
   */
  function evaluateSummary(text, keywords) {
    if (!text || text.trim().length < 5) return { score: 0, feedback: '요약문이 작성되지 않았습니다.' };
    const lower = text.toLowerCase();
    const matched = (keywords || []).filter(kw => lower.includes(kw.toLowerCase()));
    const ratio = keywords && keywords.length > 0 ? (matched.length / keywords.length) : 1;
    const score = Math.round(ratio * 100);
    return {
      score,
      matched,
      feedback: score >= 60 ? '지문의 주요 핵심 요소가 잘 반영되었습니다.' : '주요 핵심 키워드가 다소 누락되었습니다.'
    };
  }

  function bindEvents() {
    // 지문 선택 드롭다운
    const selectEl = document.getElementById('readingPassageSelect');
    if (selectEl) {
      selectEl.addEventListener('change', (e) => {
        Storage.local.set('currentPassageId', e.target.value);
        currentPassage = getActivePassage();
        showTranslation = false;
        userAnswers = {};
        userSummaryText = '';
        isGraded = false;
        render();
      });
    }

    // 직독직해 한국어 번역 토글 버튼
    const transToggleBtn = document.getElementById('btnToggleTranslation');
    if (transToggleBtn) {
      transToggleBtn.addEventListener('click', () => {
        showTranslation = !showTranslation;
        render();
      });
    }

    // 객관식 보기 클릭
    document.querySelectorAll('.reading-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (isGraded) return;
        const qIdx = parseInt(btn.dataset.qidx, 10);
        const optIdx = parseInt(btn.dataset.optidx, 10);
        userAnswers[qIdx] = optIdx;

        document.querySelectorAll(`.reading-opt-btn[data-qidx="${qIdx}"]`).forEach(b => {
          b.classList.remove('btn-primary');
          b.classList.add('btn-secondary');
        });
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
      });
    });

    // 주관식 요약 입력
    const summaryInput = document.getElementById('readingSummaryInput');
    if (summaryInput) {
      summaryInput.addEventListener('input', (e) => {
        userSummaryText = e.target.value;
      });
    }

    // AI 튜터 질문 버튼
    const askTutorBtn = document.getElementById('btnAskAITutor');
    if (askTutorBtn) {
      askTutorBtn.addEventListener('click', async () => {
        const inputEl = document.getElementById('aiTutorQuestionInput');
        const q = (inputEl?.value || '').trim();
        if (!q) {
          alert('질문 내용을 입력해 주세요.');
          return;
        }

        const answerBox = document.getElementById('aiTutorAnswerBox');
        if (answerBox) {
          answerBox.classList.remove('hidden');
          answerBox.innerHTML = `
            <div class="flex items-center gap-2 text-primary font-semibold">
              <div class="loading-spinner" style="width:16px;height:16px;border-width:2px;"></div>
              <span>AI 튜터가 답변을 작성 중입니다...</span>
            </div>
          `;
        }

        const res = await AIClient.askTutor(currentPassage.text, q);
        if (answerBox) {
          answerBox.innerHTML = `
            <div class="font-bold text-indigo-900 mb-1">🤖 AI 튜터의 답변:</div>
            <p class="text-gray-800 mb-2 leading-relaxed">${escapeHtml(res.answer)}</p>
            ${res.tips ? `<div class="text-xs text-indigo-700 bg-white p-2 rounded border">💡 <strong>학습 팁:</strong> ${escapeHtml(res.tips)}</div>` : ''}
          `;
        }
      });
    }

    // 전체 독해 채점 버튼
    const submitBtn = document.getElementById('btnSubmitReading');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const questions = (currentPassage.readingQuestions || []).filter(q => q.type === 'multiple_choice');
        if (Object.keys(userAnswers).length < questions.length) {
          alert('모든 객관식 독해 문제에 답을 선택해 주세요.');
          return;
        }

        isGraded = true;
        let correctCount = 0;

        // 객관식 채점 및 오답 노트 등록
        currentPassage.readingQuestions.forEach((q, idx) => {
          if (q.type === 'multiple_choice') {
            const userAns = userAnswers[idx];
            if (userAns === q.answer) {
              correctCount++;
            } else {
              Storage.wrongAnswers.add({
                passageId: currentPassage.id,
                passageTitle: currentPassage.title,
                area: 'reading',
                question: `[독해 문제] ${q.question}`,
                userAnswer: q.options[userAns] || '미응답',
                correctAnswer: q.options[q.answer],
                explanation: q.explanation || '지문의 문맥과 논리적 흐름에 부합하는 정답을 골라야 합니다.'
              });
            }
          }
        });

        readingScore = Math.round((correctCount / questions.length) * 100);
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
          <div class="empty-state-icon">📝</div>
          <h2 class="text-xl font-bold mb-2">지문이 없습니다</h2>
          <p class="text-secondary mb-4">학습할 지문을 먼저 선택해 주세요.</p>
          <a href="#passages" class="btn btn-primary">자료실로 이동</a>
        </div>
      `;
      return;
    }

    const allPassages = Passages.getAllPassages();
    const sentences = currentPassage.sentences || [];
    const questions = currentPassage.readingQuestions || [];

    contentArea.innerHTML = `
      <div class="page-header mb-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="page-title text-2xl font-bold">📝 Reading (독해 및 문맥 이해)</h1>
            <p class="page-subtitle text-secondary">지문을 정독하며 직독직해를 확인하고 독해 문제를 풀어보세요.</p>
          </div>

          <div class="w-full md:w-80">
            <label class="form-label text-xs mb-1" for="readingPassageSelect">학습 지문 선택</label>
            <select id="readingPassageSelect" class="form-select">
              ${allPassages.map(p => `
                <option value="${p.id}" ${p.id === currentPassage.id ? 'selected' : ''}>
                  [${p.level === 'beginner' ? '초급' : p.level === 'intermediate' ? '중급' : '고급'}] ${escapeHtml(p.title)}
                </option>
              `).join('')}
            </select>
          </div>
        </div>
      </div>

      <!-- 본문 읽기 카드 -->
      <div class="card p-6 mb-6">
        <div class="flex justify-between items-center mb-4 border-bottom pb-3">
          <div>
            <h2 class="text-xl font-bold text-gray-900">${escapeHtml(currentPassage.title)}</h2>
            <p class="text-sm text-secondary">${escapeHtml(currentPassage.titleKo || '')}</p>
          </div>
          
          <button class="btn btn-secondary btn-sm flex items-center gap-2" id="btnToggleTranslation">
            ${showTranslation ? '👁️ 원문만 보기' : '🌐 문장별 해석 함께 보기'}
          </button>
        </div>

        <!-- 본문 텍스트 뷰 (문장별 직독직해 지원) -->
        <div class="reading-passage-content leading-relaxed text-base text-gray-800 flex flex-col gap-3">
          ${sentences.length > 0 ? sentences.map((st, i) => `
            <div class="sentence-block p-2 rounded hover:bg-blue-50 transition">
              <span class="text-xs text-primary font-bold mr-1">[${i + 1}]</span>
              <span class="font-medium">${escapeHtml(st.text)}</span>
              ${showTranslation && st.translation ? `
                <div class="text-xs text-secondary mt-1 pl-4 border-l-2 border-primary">
                  ${escapeHtml(st.translation)}
                </div>
              ` : ''}
            </div>
          `).join('') : `
            <p>${escapeHtml(currentPassage.text)}</p>
          `}
        </div>
      </div>

      <!-- 독해 문제 섹션 -->
      ${questions.length > 0 ? `
        <div class="card p-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold">🎯 Comprehension Check (독해 문제)</h2>
            ${isGraded ? `<span class="badge badge-primary text-sm">정답률: ${readingScore}%</span>` : ''}
          </div>

          <div class="flex flex-col gap-6">
            ${questions.map((q, qIdx) => {
              if (q.type === 'multiple_choice') {
                const selected = userAnswers[qIdx];
                const isCorrect = isGraded && (selected === q.answer);

                return `
                  <div class="p-4 border rounded bg-white">
                    <p class="font-bold text-sm text-gray-900 mb-3">${qIdx + 1}. ${escapeHtml(q.question)}</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                      ${q.options.map((opt, optIdx) => {
                        let btnCls = 'btn-secondary';
                        if (selected === optIdx) btnCls = 'btn-primary';
                        if (isGraded) {
                          if (optIdx === q.answer) btnCls = 'btn-success text-white';
                          else if (selected === optIdx) btnCls = 'btn-danger text-white';
                        }

                        return `
                          <button class="btn ${btnCls} btn-sm text-left p-2 reading-opt-btn"
                            data-qidx="${qIdx}" data-optidx="${optIdx}" ${isGraded ? 'disabled' : ''}>
                            ${optIdx + 1}) ${escapeHtml(opt)}
                          </button>
                        `;
                      }).join('')}
                    </div>

                    ${isGraded ? `
                      <div class="alert ${isCorrect ? 'alert--success' : 'alert--error'} mt-2 text-xs">
                        <strong>${isCorrect ? '✅ 정답' : '❌ 오답 (오답 노트에 저장됨)'}:</strong> ${escapeHtml(q.explanation)}
                      </div>
                    ` : ''}
                  </div>
                `;
              } else if (q.type === 'short_answer') {
                const evalSummary = isGraded ? evaluateSummary(userSummaryText, q.keywords) : null;
                return `
                  <div class="p-4 border rounded bg-white">
                    <p class="font-bold text-sm text-gray-900 mb-2">✍️ 주관식 과제: ${escapeHtml(q.question)}</p>
                    <textarea class="form-textarea w-full text-sm mb-2" id="readingSummaryInput" rows="3"
                      placeholder="자신의 언어로 핵심 요약을 작성하세요..." ${isGraded ? 'readonly' : ''}>${escapeHtml(userSummaryText)}</textarea>

                    ${isGraded && evalSummary ? `
                      <div class="p-3 bg-gray-50 border rounded text-xs">
                        <div class="font-bold text-primary mb-1">모범 답안:</div>
                        <p class="text-gray-700 italic mb-2">"${escapeHtml(q.referenceAnswer || '')}"</p>
                        <div class="font-bold text-gray-800">평가: ${escapeHtml(evalSummary.feedback)}</div>
                      </div>
                    ` : ''}
                  </div>
                `;
              }
            }).join('')}

            ${!isGraded ? `
              <button class="btn btn-primary w-full mt-2" id="btnSubmitReading">
                독해 문제 채점 및 제출
              </button>
            ` : ''}
          </div>
        </div>
      ` : ''}

      <!-- AI 튜터 질의응답 카드 -->
      <div class="card p-6 border-l-4 border-indigo-500 bg-white">
        <h3 class="text-lg font-bold mb-2 flex items-center gap-2">
          <span>🤖</span> VL-SGR AI 학습 도우미 (AI Tutor)
        </h3>
        <p class="text-xs text-secondary mb-4 leading-relaxed">
          지문을 읽다가 해석이 어렵거나 문법/어휘 쓰임이 궁금한 부분을 질문해 보세요. AI가 친절하게 설명해 드립니다.
        </p>

        <div class="flex flex-col md:flex-row gap-2 mb-3">
          <input type="text" class="form-input flex-1" id="aiTutorQuestionInput"
            placeholder="예: 3번째 문장에서 'cornerstone'이 왜 쓰였나요? / 문장 구조를 분석해 줘" />
          <button class="btn btn-primary" id="btnAskAITutor">질문하기</button>
        </div>

        <div id="aiTutorAnswerBox" class="hidden mt-3 p-4 bg-indigo-50/60 rounded border text-sm leading-relaxed"></div>
      </div>
    `;

    bindEvents();
  }

  return { render };
})();
