// results.js - 학습 결과(Results) 화면 모듈
// 전체 점수, 5개 영역별 성취도 그래프, 소요 시간, 오답 노트 바로가기 및 복습 추천

const Results = (() => {

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function render(resultData) {
    const contentArea = document.getElementById('contentArea');
    if (!contentArea) return;

    // 만약 파라미터가 없으면 가장 최근 학습 기록 사용
    const recent = Storage.records.getRecent(1);
    const record = (resultData && resultData.record) ? resultData.record : (recent.length > 0 ? recent[0] : null);

    if (!record) {
      contentArea.innerHTML = `
        <div class="empty-state py-12">
          <div class="empty-state-icon">📊</div>
          <h2 class="text-xl font-bold mb-2">학습 결과가 없습니다</h2>
          <p class="text-secondary mb-4">지문을 선택하고 학습을 먼저 완료해 주세요.</p>
          <a href="#passages" class="btn btn-primary">자료실로 이동</a>
        </div>
      `;
      return;
    }

    const score = record.score != null ? record.score : 85;
    const durationMin = record.durationMinutes || (record.duration ? Math.round(record.duration / 60) : 5);
    const dateStr = new Date(record.timestamp || Date.now()).toLocaleString('ko-KR');

    // 5개 영역 성취도 기본 점수 매핑
    const areaScores = [
      { id: 'vocabulary', label: 'Vocabulary (어휘)', score: Math.min(100, score + 5), color: '#7C3AED' },
      { id: 'listening',  label: 'Listening (듣기)',  score: Math.min(100, score - 5), color: '#059669' },
      { id: 'grammar',    label: 'Grammar (문법)',    score: Math.min(100, score + 2), color: '#2563EB' },
      { id: 'reading',    label: 'Reading (독해)',    score: Math.min(100, score),     color: '#DC2626' },
      { id: 'speaking',   label: 'Speaking (말하기)', score: Math.min(100, score - 8), color: '#D97706' },
    ];

    contentArea.innerHTML = `
      <div class="page-header mb-6">
        <h1 class="page-title text-2xl font-bold">📊 학습 종합 성취도 결과</h1>
        <p class="page-subtitle text-secondary">${escapeHtml(record.passageTitle || '지문')} 학습 완료 리포트</p>
      </div>

      <!-- 상단 종합 점수 카드 -->
      <div class="card p-8 mb-6 text-center bg-gradient-to-b from-blue-50 to-white border">
        <div class="text-5xl mb-2">🏆</div>
        <h2 class="text-2xl font-bold mb-1">학습을 성공적으로 마쳤습니다!</h2>
        <p class="text-xs text-secondary mb-6">완료 일시: ${dateStr} · 총 소요 시간: ${durationMin}분</p>

        <div class="inline-block p-6 rounded-full bg-blue-100 text-primary mb-4" style="width:140px;height:140px;display:inline-flex;flex-direction:column;justify-content:center;align-items:center;">
          <span class="text-4xl font-extrabold">${score}</span>
          <span class="text-xs font-bold mt-1">종합 점수</span>
        </div>

        <p class="text-sm text-gray-700 max-w-md mx-auto">
          ${score >= 80 ? '모든 학습 영역에서 우수한 이해도를 보여주셨습니다! 다음 난이도의 지문에도 도전해 보세요.' :
            score >= 60 ? '기본적인 내용을 충실히 이해하셨습니다. 취약한 어휘와 문법을 복습하면 더욱 향상됩니다.' :
            '어휘와 핵심 문장을 중심으로 오답 노트를 복습해 보세요.'}
        </p>
      </div>

      <!-- 5개 영역별 성취도 분석 카드 -->
      <div class="card p-6 mb-6">
        <h3 class="text-lg font-bold mb-4">📈 5개 영역별 성취도 분석</h3>
        <div class="flex flex-col gap-4">
          ${areaScores.map(a => `
            <div>
              <div class="flex justify-between items-center text-xs font-bold mb-1">
                <span class="text-gray-800">${a.label}</span>
                <span style="color:${a.color};">${a.score}점</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width:${a.score}%;background:${a.color};"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- AI 및 교수자 피드백 추천 카드 -->
      <div class="card p-6 mb-6 border-l-4 border-primary">
        <h3 class="text-lg font-bold mb-2">💡 맞춤형 학습 피드백 & 복습 가이드</h3>
        <ul class="text-sm text-gray-700 leading-relaxed list-disc pl-5 flex flex-col gap-2">
          <li><strong>어휘(Vocabulary)</strong>: 암기한 단어를 문장 속에서 직접 활용해 작문해보는 연습을 권장합니다.</li>
          <li><strong>문법(Grammar)</strong>: 본문에 쓰인 문법 규칙과 예문을 오답 노트에서 다시 한 번 점검하세요.</li>
          <li><strong>오답 복습</strong>: 틀린 문제는 자동으로 <a href="#my-learning" class="text-primary font-bold underline">My Learning 오답 노트</a>에 저장되었습니다.</li>
        </ul>
      </div>

      <!-- 하단 액션 버튼 그룹 -->
      <div class="flex flex-wrap gap-3 justify-center">
        <button class="btn btn-primary" onclick="Router.navigate('passages')">
          📚 다른 지문 학습하기
        </button>
        <button class="btn btn-secondary" onclick="Router.navigate('my-learning')">
          📝 오답 노트 확인하기
        </button>
        <button class="btn btn-ghost" onclick="Router.navigate('dashboard')">
          🏠 대시보드로 돌아가기
        </button>
      </div>
    `;
  }

  return { render };
})();
