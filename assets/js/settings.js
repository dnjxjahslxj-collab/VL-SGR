// settings.js - 설정 및 백업 화면

const Settings = (() => {

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function showAlert(message, type = 'info') {
    const existing = document.querySelector('.settings-alert');
    if (existing) existing.remove();
    const alert = document.createElement('div');
    alert.className = `alert alert--${type} settings-alert`;
    alert.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:9999;max-width:400px;';
    alert.textContent = message;
    document.body.appendChild(alert);
    setTimeout(() => { if (alert.parentNode) alert.remove(); }, 4000);
  }

  /**
   * JSON 백업 내보내기
   */
  function exportBackup() {
    try {
      const data = Storage.backup.export();
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `vlsgr-backup-${dateStr}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showAlert('백업 파일이 다운로드되었습니다.', 'success');
    } catch (e) {
      showAlert('백업 내보내기 중 오류가 발생했습니다: ' + e.message, 'error');
    }
  }

  /**
   * JSON 백업 가져오기
   */
  function importBackup(file) {
    if (!file) return;

    if (!confirm('⚠️ 주의: 백업 파일을 복원하면 현재 저장된 학습 기록과 사용자 지문이 백업 파일의 내용으로 덮어씌워집니다.\n\n계속 진행하시겠습니까?')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const result = Storage.backup.import(data);
        if (result.success) {
          showAlert(result.message || '백업이 성공적으로 복원되었습니다. 페이지를 새로고침합니다.', 'success');
          setTimeout(() => location.reload(), 1500);
        } else {
          showAlert('백업 복원 실패: ' + (result.message || '올바르지 않은 데이터 구조'), 'error');
        }
      } catch (e) {
        showAlert('파일을 읽을 수 없습니다. 올바른 VL-SGR JSON 백업 파일인지 확인하세요.', 'error');
      }
    };
    reader.readAsText(file);
  }

  /**
   * 학습 통계 리포트 인쇄 및 PDF 저장
   */
  function printLearningReport() {
    window.print();
  }

  /**
   * 전체 데이터 초기화
   */
  function resetAllData() {
    if (!confirm('⚠️ 주의: 모든 학습 기록, 오답 노트, 사용자 지문이 삭제됩니다.\n\n먼저 백업을 권장합니다. 계속하시겠습니까?')) return;
    if (!confirm('정말로 모든 데이터를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return;
    Storage.reset();
    showAlert('모든 데이터가 초기화되었습니다. 페이지를 새로고침합니다.', 'success');
    setTimeout(() => location.reload(), 1500);
  }

  /**
   * LocalStorage 사용량 계산 (바이트 추정)
   */
  function getLocalStorageUsage() {
    let total = 0;
    for (const key in localStorage) {
      if (!Object.prototype.hasOwnProperty.call(localStorage, key)) continue;
      total += (key.length + (localStorage.getItem(key) || '').length) * 2; // UTF-16
    }
    return total;
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  }

  function render() {
    const contentArea = document.getElementById('contentArea');
    if (!contentArea) return;

    const goal = Storage.settings.get('dailyGoal', { passages: 1, minutes: 20 });
    const ttsRate = Storage.settings.get('ttsRate', 1.0);

    // 저장 공간 현황 계산
    const lsUsage = getLocalStorageUsage();
    const lsMax = 5 * 1024 * 1024; // 일반적 브라우저 한도 ~5MB
    const lsPct = Math.min((lsUsage / lsMax) * 100, 100).toFixed(1);

    // 학습 기록 개수
    const records = Storage.records.getAll();
    const wrongAnswers = Storage.wrongAnswers.getAll();
    const userPassages = Storage.settings.get('userPassages', []);

    // AI 연결 상태 (Netlify Functions 경로 체크 — 프로덕션에서만 실제 연결)
    const isNetlify = window.location.hostname !== 'localhost' &&
                      window.location.hostname !== '127.0.0.1' &&
                      !window.location.protocol.startsWith('file');
    const aiStatusText = isNetlify
      ? '🟡 Netlify 환경 감지됨 — AI API 키 등록 여부에 따라 연결 상태 결정'
      : '🔵 로컬/파일 모드 — AI 기능은 Netlify 배포 후 사용 가능합니다';

    contentArea.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">⚙️ 설정</h1>
          <p class="page-subtitle">설정 및 데이터 관리</p>
        </div>
        <button class="btn btn-secondary" id="printReportBtn" onclick="window.print()">📄 학습 통계 PDF 저장</button>
      </div>

      <!-- AI 연결 상태 -->
      <div class="card mb-4" style="border-left: 4px solid var(--color-primary);">
        <h2 class="card-title">🤖 AI 연결 상태</h2>
        <p class="text-sm mt-1">${escapeHtml(aiStatusText)}</p>
        <p class="text-secondary text-sm mt-2">
          AI 기능을 활성화하려면 Netlify 대시보드에서 <code>GEMINI_API_KEY</code> 환경 변수를 등록하세요.<br>
          등록 없이도 기본 학습 기능(어휘, 문법, 읽기, 듣기, 말하기)은 모두 정상 작동합니다.
        </p>
      </div>

      <!-- 학습 목표 설정 -->
      <div class="card mb-4">
        <h2 class="card-title">📅 오늘의 학습 목표</h2>
        <div class="form-group">
          <label class="form-label" for="goalPassages">하루 목표 지문 수</label>
          <input type="number" class="form-input" id="goalPassages" min="1" max="20" value="${goal.passages}" style="width:100px;">
        </div>
        <div class="form-group">
          <label class="form-label" for="goalMinutes">하루 목표 학습 시간 (분)</label>
          <input type="number" class="form-input" id="goalMinutes" min="5" max="300" value="${goal.minutes}" style="width:100px;">
        </div>
        <button class="btn btn-primary" id="saveGoalBtn">목표 저장</button>
      </div>

      <!-- 음성 설정 -->
      <div class="card mb-4">
        <h2 class="card-title">🔊 음성(TTS) 설정</h2>
        <div class="form-group">
          <label class="form-label" for="ttsRateInput">읽기 속도: <span id="ttsRateDisplay">${ttsRate.toFixed(1)}x</span></label>
          <input type="range" id="ttsRateInput" min="0.5" max="2.0" step="0.1" value="${ttsRate}" style="width:200px; display:block; margin-top:0.5rem;">
        </div>
        <button class="btn btn-secondary" id="ttsTestBtn">🔊 테스트 재생</button>
        ${Speech.tts.isSupported ? '<p class="text-success text-sm mt-2">✅ 이 브라우저는 TTS를 지원합니다.</p>' : '<p class="alert alert--warning mt-2">이 브라우저는 TTS를 지원하지 않습니다.</p>'}
      </div>

      <!-- 백업 및 복원 -->
      <div class="card mb-4">
        <h2 class="card-title">💾 데이터 백업 및 복원</h2>
        <p class="text-secondary text-sm mb-3">학습 기록, 오답 노트, 사용자 지문을 JSON 파일로 백업하거나 복원합니다.<br>다른 기기에서 복원하거나 브라우저 데이터 삭제 전 반드시 백업하세요.</p>

        <div class="backup-actions" style="display:flex; flex-direction:column; gap:1rem;">
          <button class="btn btn-primary" id="exportBackupBtn">📥 백업 내보내기 (JSON)</button>

          <div class="form-group mb-0">
            <label class="form-label" for="importBackupFile">📤 백업 복원 (JSON 파일 선택)</label>
            <input type="file" class="form-input" id="importBackupFile" accept=".json">
            <p class="form-hint">⚠️ 복원 시 현재 저장된 데이터가 덮어씌워집니다.</p>
          </div>
          <button class="btn btn-secondary" id="importBackupBtn">복원하기</button>
        </div>
      </div>

      <!-- PDF 내보내기 -->
      <div class="card mb-4">
        <h2 class="card-title">📄 학습 통계 PDF 내보내기</h2>
        <p class="text-secondary text-sm mb-3">현재 화면을 PDF로 저장합니다. 브라우저 인쇄 창에서 "PDF로 저장"을 선택하세요.</p>
        <div class="stats-summary-print mb-3">
          <div class="grid grid-cols-3 gap-3" style="display:grid; grid-template-columns:repeat(3,1fr); gap:0.75rem;">
            <div class="card text-center" style="padding:0.75rem;">
              <div style="font-size:1.5rem; font-weight:700; color:var(--color-primary);">${records.length}</div>
              <div class="text-sm text-secondary">총 학습 횟수</div>
            </div>
            <div class="card text-center" style="padding:0.75rem;">
              <div style="font-size:1.5rem; font-weight:700; color:var(--color-warning);">${wrongAnswers.length}</div>
              <div class="text-sm text-secondary">오답 항목</div>
            </div>
            <div class="card text-center" style="padding:0.75rem;">
              <div style="font-size:1.5rem; font-weight:700; color:var(--color-success);">${userPassages.length}</div>
              <div class="text-sm text-secondary">사용자 지문</div>
            </div>
          </div>
        </div>
        <button class="btn btn-primary" id="printReportBtnMain">📄 PDF로 저장 / 인쇄</button>
      </div>

      <!-- 데이터 초기화 -->
      <div class="card mb-4">
        <h2 class="card-title">🗑️ 데이터 초기화</h2>
        <p class="text-secondary text-sm mb-3">초기화 대상: 학습 기록, 오답 노트, 사용자 지문, 설정<br>보존 항목: 기본 지문 10개 (앱 내장)</p>
        <div class="alert alert--warning mb-3">⚠️ 초기화 전에 반드시 백업을 먼저 진행하세요.</div>
        <button class="btn btn-danger" id="resetDataBtn">모든 학습 데이터 초기화</button>
      </div>

      <!-- 저장 공간 현황 -->
      <div class="card">
        <h2 class="card-title">📊 저장 공간 현황</h2>
        <div id="storageInfo">
          <div class="mb-3">
            <div class="flex justify-between text-sm mb-1">
              <span>LocalStorage 사용량</span>
              <span class="font-semi">${formatBytes(lsUsage)} / ~5 MB</span>
            </div>
            <div style="height:8px; background:var(--color-gray-200); border-radius:4px; overflow:hidden;">
              <div style="height:100%; width:${lsPct}%; background:var(--color-primary); border-radius:4px; transition:width 0.3s;"></div>
            </div>
            <p class="text-xs text-secondary mt-1">${lsPct}% 사용 중</p>
          </div>
          <div class="text-sm text-secondary" style="line-height:1.6;">
            <strong>저장 항목:</strong><br>
            • 학습 기록: ${records.length}개<br>
            • 오답 노트: ${wrongAnswers.length}개<br>
            • 사용자 지문: ${userPassages.length}개 (IndexedDB)<br>
            • 설정 및 기타 데이터
          </div>
          <p class="text-sm mt-3" style="color:var(--color-warning);">
            ⚠️ 브라우저 데이터 삭제 또는 다른 기기 사용 시 데이터가 유실될 수 있습니다. 정기적으로 백업하세요.
          </p>
        </div>
      </div>
    `;

    // 이벤트 바인딩

    // 목표 저장
    document.getElementById('saveGoalBtn').addEventListener('click', () => {
      const passages = parseInt(document.getElementById('goalPassages').value) || 1;
      const minutes  = parseInt(document.getElementById('goalMinutes').value)  || 20;
      Storage.settings.set('dailyGoal', { passages, minutes });
      showAlert('학습 목표가 저장되었습니다.', 'success');
    });

    // TTS 속도 조절
    document.getElementById('ttsRateInput').addEventListener('input', (e) => {
      const rate = parseFloat(e.target.value);
      document.getElementById('ttsRateDisplay').textContent = rate.toFixed(1) + 'x';
      Storage.settings.set('ttsRate', rate);
    });

    // TTS 테스트
    document.getElementById('ttsTestBtn').addEventListener('click', () => {
      const rate = parseFloat(document.getElementById('ttsRateInput').value);
      Speech.tts.speak('This is a test of the VL-SGR text to speech function.', { rate });
    });

    // 백업 내보내기
    document.getElementById('exportBackupBtn').addEventListener('click', exportBackup);

    // 백업 복원
    document.getElementById('importBackupBtn').addEventListener('click', () => {
      const file = document.getElementById('importBackupFile').files[0];
      if (!file) { showAlert('복원할 JSON 파일을 선택해 주세요.', 'warning'); return; }
      importBackup(file);
    });

    // PDF 내보내기
    document.getElementById('printReportBtnMain').addEventListener('click', printLearningReport);

    // 데이터 초기화
    document.getElementById('resetDataBtn').addEventListener('click', resetAllData);
  }

  return { render };
})();

