// speaking.js - 말하기(Speaking) 학습 모듈
// Web Speech API 기반 음성인식(STT) 녹음 변환 및 직접 텍스트 입력 모드 지원
// 핵심 키워드 분석, 모범 답안 비교, 환경별 발음 평가 한계 정직 고지

const Speaking = (() => {
  let currentPassage = null;
  let userSpeechText = '';
  let isRecording = false;
  let feedbackResult = null;

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
   * 말하기 답변 자동 평가 (단어 수, 핵심 키워드 매칭)
   */
  function evaluateSpeech(text, task) {
    if (!text || text.trim().length < 10) {
      return {
        score: 20,
        wordCount: 0,
        matchedPoints: [],
        missingPoints: task.keyPoints || [],
        feedback: '답변 내용이 너무 짧습니다. 좀 더 구체적인 문장으로 의견을 표현해 보세요.'
      };
    }

    const words = text.trim().split(/\s+/);
    const lower = text.toLowerCase();
    const keyPoints = task.keyPoints || [];
    const matched = keyPoints.filter(kp => lower.includes(kp.toLowerCase()));
    const missing = keyPoints.filter(kp => !lower.includes(kp.toLowerCase()));

    // 점수 계산: 기본 점수 + 키워드 점수 + 길이 점수
    let score = 50;
    if (keyPoints.length > 0) {
      score += Math.round((matched.length / keyPoints.length) * 30);
    }
    if (words.length >= 25) score += 20;
    else if (words.length >= 15) score += 10;
    score = Math.min(100, score);

    return {
      score,
      wordCount: words.length,
      matchedPoints: matched,
      missingPoints: missing,
      feedback: score >= 80 ? '훌륭합니다! 핵심 아이디어를 잘 포함하여 자연스럽게 표현했습니다.' :
                score >= 60 ? '좋은 시도입니다. 지문의 핵심 표현을 1~2개 더 활용하면 더욱 설득력 있는 답변이 됩니다.' :
                '핵심 키워드를 중심으로 문장을 좀 더 확장해서 말해보세요.'
    };
  }

  function bindEvents() {
    // 지문 선택 드롭다운
    const selectEl = document.getElementById('speakingPassageSelect');
    if (selectEl) {
      selectEl.addEventListener('change', (e) => {
        if (isRecording) {
          Speech.stt.stop();
          isRecording = false;
        }
        Storage.local.set('currentPassageId', e.target.value);
        currentPassage = getActivePassage();
        userSpeechText = '';
        feedbackResult = null;
        render();
      });
    }

    // 녹음 시작/중지 버튼
    const recordBtn = document.getElementById('btnToggleRecord');
    if (recordBtn) {
      recordBtn.addEventListener('click', () => {
        if (!Speech.stt.isSupported) {
          alert('현재 브라우저는 마이크 음성 인식을 지원하지 않습니다. 아래 텍스트 입력창을 이용해 주세요.');
          return;
        }

        if (!isRecording) {
          // 녹음 시작
          isRecording = true;
          recordBtn.classList.remove('btn-secondary');
          recordBtn.classList.add('btn-danger');
          recordBtn.innerHTML = '⏹️ 녹음 중지 및 텍스트 변환';

          const statusEl = document.getElementById('sttStatus');
          if (statusEl) statusEl.textContent = '🎤 듣고 있습니다... 영어로 말씀하세요.';

          Speech.stt.start(
            (transcript, isFinal) => {
              const inputEl = document.getElementById('speechTextInput');
              if (inputEl) {
                userSpeechText = transcript;
                inputEl.value = transcript;
              }
              if (isFinal) {
                isRecording = false;
                if (recordBtn) {
                  recordBtn.classList.remove('btn-danger');
                  recordBtn.classList.add('btn-secondary');
                  recordBtn.innerHTML = '🎤 마이크로 말하기 시작';
                }
                if (statusEl) statusEl.textContent = '✅ 음성 인식이 완료되었습니다.';
              }
            },
            (errorType, msg) => {
              isRecording = false;
              if (recordBtn) {
                recordBtn.classList.remove('btn-danger');
                recordBtn.classList.add('btn-secondary');
                recordBtn.innerHTML = '🎤 마이크로 말하기 시작';
              }
              const statusEl = document.getElementById('sttStatus');
              if (statusEl) statusEl.textContent = `⚠️ 음성 인식 오류 (${msg}). 텍스트로 직접 입력할 수 있습니다.`;
            },
            { lang: 'en-US', continuous: false, interimResults: true }
          );
        } else {
          // 녹음 중지
          Speech.stt.stop();
          isRecording = false;
          recordBtn.classList.remove('btn-danger');
          recordBtn.classList.add('btn-secondary');
          recordBtn.innerHTML = '🎤 마이크로 말하기 시작';
          const statusEl = document.getElementById('sttStatus');
          if (statusEl) statusEl.textContent = '⏹️ 음성 인식이 중지되었습니다.';
        }
      });
    }

    // 직접 텍스트 입력
    const textInput = document.getElementById('speechTextInput');
    if (textInput) {
      textInput.addEventListener('input', (e) => {
        userSpeechText = e.target.value;
      });
    }

    // 모범 발음 듣기
    const sampleSpeakBtn = document.getElementById('btnListenSample');
    if (sampleSpeakBtn) {
      sampleSpeakBtn.addEventListener('click', () => {
        const sampleText = sampleSpeakBtn.dataset.sample;
        if (sampleText && Speech.tts.isSupported) {
          Speech.tts.stop();
          Speech.tts.speak(sampleText, { rate: 0.95, lang: 'en-US' });
        }
      });
    }

    // 답변 평가 제출 버튼
    const submitBtn = document.getElementById('btnSubmitSpeaking');
    if (submitBtn) {
      submitBtn.addEventListener('click', async () => {
        const text = (document.getElementById('speechTextInput')?.value || userSpeechText).trim();
        if (!text) {
          alert('말하기 답변을 음성으로 녹음하거나 텍스트로 입력해 주세요.');
          return;
        }

        const task = currentPassage.speakingTask || {
          prompt: '지문 요약하기',
          keyPoints: ['business', 'growth', 'strategy']
        };

        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ AI 평가 및 피드백 분석 중...';

        // 1. 기본 분석 수행
        feedbackResult = evaluateSpeech(text, task);

        // 2. AI 서버리스 심층 평가 병행 (미연동 시 자체 Fallback 안전 동작)
        try {
          const aiRes = await AIClient.gradeAnswer(
            currentPassage.text,
            task.prompt,
            task.sampleAnswer,
            text
          );
          if (aiRes.success && aiRes.data) {
            feedbackResult.aiAdvice = aiRes.data.feedbackKo;
            feedbackResult.aiCorrections = aiRes.data.corrections;
          }
        } catch (e) {
          console.warn('[Speaking] AI 채점 보조 실패:', e.message);
        }

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
          <div class="empty-state-icon">🎤</div>
          <h2 class="text-xl font-bold mb-2">지문이 없습니다</h2>
          <p class="text-secondary mb-4">학습할 지문을 먼저 선택해 주세요.</p>
          <a href="#passages" class="btn btn-primary">자료실로 이동</a>
        </div>
      `;
      return;
    }

    const allPassages = Passages.getAllPassages();
    const task = currentPassage.speakingTask || {
      prompt: `Summarize the main idea of "${currentPassage.title}" in your own words and explain your thoughts.`,
      sampleAnswer: `The passage discusses key concepts related to ${currentPassage.topic}. In my view, understanding these principles is crucial for modern professional success.`,
      keyPoints: ['main idea', 'impact', 'future perspective']
    };

    contentArea.innerHTML = `
      <div class="page-header mb-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 class="page-title text-2xl font-bold">🎤 Speaking (말하기 및 요약 발표)</h1>
            <p class="page-subtitle text-secondary">지문 주제에 대해 영어로 자신의 생각을 말하고 실시간 피드백을 확인하세요.</p>
          </div>

          <div class="w-full md:w-80">
            <label class="form-label text-xs mb-1" for="speakingPassageSelect">학습 지문 선택</label>
            <select id="speakingPassageSelect" class="form-select">
              ${allPassages.map(p => `
                <option value="${p.id}" ${p.id === currentPassage.id ? 'selected' : ''}>
                  [${p.level === 'beginner' ? '초급' : p.level === 'intermediate' ? '중급' : '고급'}] ${escapeHtml(p.title)}
                </option>
              `).join('')}
            </select>
          </div>
        </div>
      </div>

      <!-- 말하기 미션 카드 -->
      <div class="card p-6 mb-6 border-l-4 border-yellow-500 bg-white">
        <span class="badge badge-warning mb-2">Speaking Mission</span>
        <h2 class="text-xl font-bold text-gray-900 mb-2">${escapeHtml(task.prompt)}</h2>
        <div class="text-xs text-secondary mt-2">
          권장 포함 핵심 키워드: ${task.keyPoints.map(kp => `<span class="badge badge-ghost mr-1">${escapeHtml(kp)}</span>`).join('')}
        </div>
      </div>

      <!-- 음성 입력 & 텍스트 편집 영역 -->
      <div class="card p-6 mb-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
          <div class="flex items-center gap-3">
            <button class="btn btn-secondary flex items-center gap-2" id="btnToggleRecord">
              🎤 마이크로 말하기 시작
            </button>
            <span id="sttStatus" class="text-xs text-secondary">
              ${Speech.stt.isSupported ? '마이크 버튼을 누르면 실시간으로 음성이 입력됩니다.' : '현재 브라우저는 음성 인식을 지원하지 않으므로 직접 타이핑해 주세요.'}
            </span>
          </div>

          <span class="text-xs text-secondary">말한 내용이 텍스트로 자동 입력되며 수정할 수 있습니다.</span>
        </div>

        <div class="form-group mb-4">
          <textarea id="speechTextInput" class="form-textarea w-full" rows="5"
            placeholder="마이크로 말하거나 여기에 직접 영어 답변을 작성하세요...">${escapeHtml(userSpeechText)}</textarea>
        </div>

        <button class="btn btn-primary w-full" id="btnSubmitSpeaking">
          답변 제출 및 피드백 받기
        </button>
      </div>

      <!-- 피드백 결과 -->
      ${feedbackResult ? `
        <div class="card p-6 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
          <h2 class="text-lg font-bold mb-3 flex items-center gap-2">
            <span>📊 말하기 분석 피드백</span>
            <span class="badge badge-success text-sm">${feedbackResult.score}점</span>
          </h2>

          <p class="text-sm text-gray-800 mb-3">${escapeHtml(feedbackResult.feedback)}</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-4">
            <div class="p-3 bg-white rounded border">
              <strong>포함된 핵심 키워드 (${feedbackResult.matchedPoints.length}개):</strong><br>
              ${feedbackResult.matchedPoints.length > 0 ?
                feedbackResult.matchedPoints.map(m => `<span class="text-green-600 font-semibold mr-1">✔ ${escapeHtml(m)}</span>`).join(', ') :
                '<span class="text-gray-400">포함된 키워드가 없습니다.</span>'}
            </div>
            <div class="p-3 bg-white rounded border">
              <strong>추가 권장 키워드:</strong><br>
              ${feedbackResult.missingPoints.length > 0 ?
                feedbackResult.missingPoints.map(m => `<span class="text-yellow-600 font-semibold mr-1">💡 ${escapeHtml(m)}</span>`).join(', ') :
                '<span class="text-green-600 font-bold">모든 핵심 키워드를 포함했습니다!</span>'}
            </div>
          </div>

          ${feedbackResult.aiAdvice ? `
            <div class="p-3 bg-white border rounded mb-3 text-xs leading-relaxed">
              <strong class="text-indigo-900">🤖 AI 실시간 조언:</strong> ${escapeHtml(feedbackResult.aiAdvice)}
              ${feedbackResult.aiCorrections ? `<div class="mt-2 text-gray-600"><strong>💡 추천 문장:</strong> <em>"${escapeHtml(feedbackResult.aiCorrections)}"</em></div>` : ''}
            </div>
          ` : ''}

          <!-- 모범 답안 비교 -->
          <div class="p-4 bg-white rounded border">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-bold text-primary">🏆 원어민 모범 답변 (Sample Answer):</span>
              <button class="btn btn-ghost btn-xs" id="btnListenSample" data-sample="${escapeHtml(task.sampleAnswer)}">
                🔊 모범 발음 듣기
              </button>
            </div>
            <p class="text-sm text-gray-700 italic">"${escapeHtml(task.sampleAnswer)}"</p>
          </div>

          <!-- 발음 평가 한계 정직 고지 (계획서 요구사항) -->
          <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800 leading-relaxed">
            ℹ️ <strong>발음 및 억양 평가 안내</strong>: 순수 브라우저 음성인식 환경에서는 억양 및 정밀 발음 점수를 왜곡 없이 단정하기 어렵습니다. 따라서 본 웹앱은 단어 전달력과 어휘·문장 완성도 및 핵심 아이디어 전달 여부를 중심으로 신뢰성 높은 피드백을 제공합니다.
          </div>
        </div>
      ` : ''}
    `;

    bindEvents();
  }

  return { render };
})();
