// storage.js - 브라우저 저장소 관리 모듈
// LocalStorage: 설정, 학습 기록, 오답 노트 (구조화된 소규모 데이터)
// IndexedDB: 업로드 파일, 대용량 지문 데이터 (향후 확장)

const Storage = (() => {
  // 모든 키에 붙는 접두어 (다른 앱과의 충돌 방지)
  const PREFIX = 'vlsgr_';

  // 내부 키 상수
  const KEYS = {
    RECORDS: 'records',
    WRONG_ANSWERS: 'wrong_answers',
    SETTINGS: 'settings',
  };

  // ─────────────────────────────────────────────
  // LocalStorage 래퍼
  // ─────────────────────────────────────────────
  const local = {
    /**
     * LocalStorage에서 값을 읽어온다.
     * @param {string} key - 접두어 없는 키
     * @param {*} defaultValue - 키가 없거나 파싱 오류 시 반환할 기본값
     * @returns {*} 저장된 값(JSON 파싱) 또는 defaultValue
     */
    get(key, defaultValue = null) {
      try {
        const raw = localStorage.getItem(PREFIX + key);
        if (raw === null) return defaultValue;
        return JSON.parse(raw);
      } catch (e) {
        console.warn(`[Storage.local.get] 키 "${key}" 읽기 실패:`, e);
        return defaultValue;
      }
    },

    /**
     * LocalStorage에 값을 저장한다.
     * @param {string} key - 접두어 없는 키
     * @param {*} value - 저장할 값 (JSON 직렬화됨)
     */
    set(key, value) {
      try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
      } catch (e) {
        console.error(`[Storage.local.set] 키 "${key}" 저장 실패:`, e);
      }
    },

    /**
     * LocalStorage에서 특정 키를 삭제한다.
     * @param {string} key - 접두어 없는 키
     */
    remove(key) {
      try {
        localStorage.removeItem(PREFIX + key);
      } catch (e) {
        console.warn(`[Storage.local.remove] 키 "${key}" 삭제 실패:`, e);
      }
    },

    /**
     * vlsgr_ 접두어가 붙은 항목만 LocalStorage에서 모두 삭제한다.
     */
    clear() {
      try {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith(PREFIX)) {
            keysToRemove.push(k);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
      } catch (e) {
        console.error('[Storage.local.clear] 초기화 실패:', e);
      }
    },
  };

  // ─────────────────────────────────────────────
  // 학습 기록 관리
  // 각 기록 형태: { id, timestamp, passageId, area, duration, score, details }
  // ─────────────────────────────────────────────
  const records = {
    /**
     * 전체 학습 기록 배열을 반환한다.
     * @returns {Array} 학습 기록 배열
     */
    getAll() {
      return local.get(KEYS.RECORDS, []);
    },

    /**
     * 새 학습 기록을 추가한다. id와 timestamp는 자동으로 생성된다.
     * @param {Object} record - 추가할 기록 객체
     *   { passageId, area, duration(초), score(0~100), details(객체) }
     * @returns {Object} id와 timestamp가 포함된 최종 기록
     */
    add(record) {
      const all = records.getAll();
      const newRecord = {
        id: `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        ...record,
      };
      all.push(newRecord);
      local.set(KEYS.RECORDS, all);
      return newRecord;
    },

    /**
     * 기존 학습 기록을 업데이트한다.
     * @param {string} id - 업데이트할 기록의 id
     * @param {Object} updates - 덮어씌울 필드들
     * @returns {Object|null} 업데이트된 기록 또는 null(없는 경우)
     */
    update(id, updates) {
      const all = records.getAll();
      const idx = all.findIndex(r => r.id === id);
      if (idx === -1) {
        console.warn(`[Storage.records.update] id "${id}" 를 찾을 수 없음`);
        return null;
      }
      all[idx] = { ...all[idx], ...updates, id }; // id는 변경 불가
      local.set(KEYS.RECORDS, all);
      return all[idx];
    },

    /**
     * 특정 passageId에 해당하는 기록만 반환한다.
     * @param {string} passageId
     * @returns {Array}
     */
    getByPassageId(passageId) {
      return records.getAll().filter(r => r.passageId === passageId);
    },

    /**
     * 가장 최근 N개의 기록을 반환한다.
     * @param {number} count - 가져올 기록 수 (기본 5)
     * @returns {Array}
     */
    getRecent(count = 5) {
      const all = records.getAll();
      // timestamp 기준 내림차순 정렬 후 slice
      return all
        .slice()
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, count);
    },
  };

  // ─────────────────────────────────────────────
  // 오답 노트 관리
  // 각 항목 형태: { id, timestamp, passageId, area, question, userAnswer, correctAnswer, explanation }
  // ─────────────────────────────────────────────
  const wrongAnswers = {
    /**
     * 전체 오답 노트를 반환한다.
     * @returns {Array}
     */
    getAll() {
      return local.get(KEYS.WRONG_ANSWERS, []);
    },

    /**
     * 오답 항목을 추가한다.
     * @param {Object} item - { passageId, area, question, userAnswer, correctAnswer, explanation }
     * @returns {Object} id와 timestamp가 포함된 최종 항목
     */
    add(item) {
      const all = wrongAnswers.getAll();
      const newItem = {
        id: `wa_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        ...item,
      };
      all.push(newItem);
      local.set(KEYS.WRONG_ANSWERS, all);
      return newItem;
    },

    /**
     * 특정 오답 항목을 삭제한다.
     * @param {string} id
     */
    remove(id) {
      const all = wrongAnswers.getAll().filter(w => w.id !== id);
      local.set(KEYS.WRONG_ANSWERS, all);
    },

    /**
     * 오답 노트 전체를 초기화한다.
     */
    clear() {
      local.set(KEYS.WRONG_ANSWERS, []);
    },
  };

  // ─────────────────────────────────────────────
  // 설정 관리
  // 전체 설정 객체를 하나의 키로 저장한다.
  // 기본 설정값 정의
  // ─────────────────────────────────────────────
  const DEFAULT_SETTINGS = {
    ttsRate: 1.0,       // TTS 재생 속도
    ttsPitch: 1.0,      // TTS 음조
    ttsLang: 'en-US',  // TTS 언어
    sttLang: 'en-US',  // STT 언어
    theme: 'light',     // UI 테마 ('light' | 'dark')
    fontSize: 'medium', // 글자 크기 ('small' | 'medium' | 'large')
    autoPlay: false,    // 지문 자동 재생 여부
  };

  const settings = {
    /**
     * 특정 설정 값을 반환한다.
     * @param {string} key - 설정 키
     * @param {*} defaultValue - 키가 없을 때 반환할 기본값
     * @returns {*}
     */
    get(key, defaultValue) {
      const all = settings.getAll();
      return key in all ? all[key] : (defaultValue !== undefined ? defaultValue : DEFAULT_SETTINGS[key]);
    },

    /**
     * 특정 설정 값을 저장한다.
     * @param {string} key
     * @param {*} value
     */
    set(key, value) {
      const all = settings.getAll();
      all[key] = value;
      local.set(KEYS.SETTINGS, all);
    },

    /**
     * 전체 설정 객체를 반환한다. 없는 키는 기본값으로 채워 반환한다.
     * @returns {Object}
     */
    getAll() {
      const stored = local.get(KEYS.SETTINGS, {});
      return { ...DEFAULT_SETTINGS, ...stored };
    },
  };

  // ─────────────────────────────────────────────
  // 통계 계산 (저장된 기록에서 계산)
  // ─────────────────────────────────────────────
  const stats = {
    /**
     * 학습한 고유 지문 수를 반환한다.
     * @returns {number}
     */
    getTotalPassagesStudied() {
      const all = records.getAll();
      const uniqueIds = new Set(all.map(r => r.passageId).filter(Boolean));
      return uniqueIds.size;
    },

    /**
     * 총 학습 시간을 분 단위로 반환한다.
     * 각 기록의 duration 필드(초 단위)를 합산 후 분으로 변환한다.
     * @returns {number}
     */
    getTotalStudyTime() {
      const all = records.getAll();
      const totalSeconds = all.reduce((sum, r) => sum + (r.duration || 0), 0);
      return Math.round(totalSeconds / 60);
    },

    /**
     * 평균 정답률(%)을 반환한다.
     * score 필드가 있는 기록만 집계한다.
     * @returns {number} 0~100 사이의 소수점 1자리 값
     */
    getAverageAccuracy() {
      const all = records.getAll().filter(r => typeof r.score === 'number');
      if (all.length === 0) return 0;
      const total = all.reduce((sum, r) => sum + r.score, 0);
      return Math.round((total / all.length) * 10) / 10;
    },

    /**
     * 취약 영역 배열을 반환한다.
     * area 별 평균 점수를 계산하여 60점 미만인 영역을 반환한다.
     * @returns {Array<{ area: string, avgScore: number }>}
     */
    getWeakAreas() {
      const all = records.getAll().filter(r => r.area && typeof r.score === 'number');
      if (all.length === 0) return [];

      // area 별 점수 집계
      const areaMap = {};
      all.forEach(r => {
        if (!areaMap[r.area]) areaMap[r.area] = { total: 0, count: 0 };
        areaMap[r.area].total += r.score;
        areaMap[r.area].count += 1;
      });

      // 평균 점수가 60 미만인 영역만 필터
      return Object.entries(areaMap)
        .map(([area, { total, count }]) => ({ id: area, area, avgScore: Math.round(total / count), accuracy: Math.round(total / count) }))
        .filter(a => a.accuracy < 60)
        .sort((a, b) => a.accuracy - b.accuracy); // 점수 낮은 순
    },

    /**
     * 전체 진도 퍼센트를 반환한다.
     * 기준: 학습한 지문 수 / 전체 목표 지문 수(100)
     * @returns {number} 0~100
     */
    getOverallProgress() {
      const TARGET_PASSAGES = 100; // 목표 지문 수 (필요 시 settings에서 읽도록 확장 가능)
      const studied = stats.getTotalPassagesStudied();
      return Math.min(100, Math.round((studied / TARGET_PASSAGES) * 100));
    },
  };

  // ─────────────────────────────────────────────
  // JSON 백업 / 복원
  // ─────────────────────────────────────────────
  const backup = {
    /**
     * 전체 데이터를 JSON 객체로 반환한다.
     * @returns {Object} { version, exportedAt, records, wrongAnswers, settings }
     */
    export() {
      return {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        records: records.getAll(),
        wrongAnswers: wrongAnswers.getAll(),
        settings: settings.getAll(),
        userPassages: local.get('userPassages', []),
      };
    },

    /**
     * JSON 데이터를 복원한다. 유효성 검사를 포함한다.
     * @param {Object|string} data - backup.export()가 반환한 객체 또는 그 JSON 문자열
     * @returns {{ success: boolean, message: string }}
     */
    import(data) {
      try {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;

        // 유효성 검사
        if (!parsed || typeof parsed !== 'object') {
          return { success: false, message: '올바른 백업 데이터가 아닙니다.' };
        }
        if (!parsed.version) {
          return { success: false, message: '백업 데이터에 version 필드가 없습니다.' };
        }
        if (parsed.version !== '1.0') {
          return { success: false, message: `호환되지 않는 백업 버전입니다. (지원 버전: 1.0, 파일 버전: ${parsed.version})` };
        }
        if (!Array.isArray(parsed.records)) {
          return { success: false, message: 'records(학습 기록) 데이터가 올바른 배열 형식이 아닙니다.' };
        }
        if (!Array.isArray(parsed.wrongAnswers)) {
          return { success: false, message: 'wrongAnswers(오답 노트) 데이터가 올바른 배열 형식이 아닙니다.' };
        }

        // 복원
        local.set(KEYS.RECORDS, parsed.records);
        local.set(KEYS.WRONG_ANSWERS, parsed.wrongAnswers);
        if (parsed.settings && typeof parsed.settings === 'object') {
          local.set(KEYS.SETTINGS, parsed.settings);
        }
        if (Array.isArray(parsed.userPassages)) {
          local.set('userPassages', parsed.userPassages);
        }

        return { success: true, message: '학습 기록, 오답 노트, 사용자 등록 지문이 성공적으로 복원되었습니다.' };
      } catch (e) {
        console.error('[Storage.backup.import] 복원 실패:', e);
        return { success: false, message: `복원 중 오류 발생: ${e.message}` };
      }
    },
  };

  // ─────────────────────────────────────────────
  // IndexedDB 관리 (대용량 업로드 파일 및 긴 지문 저장)
  // ─────────────────────────────────────────────
  const idb = {
    DB_NAME: 'vlsgr_db',
    DB_VERSION: 1,
    STORE_NAME: 'uploaded_files',

    open() {
      return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
          reject(new Error('이 브라우저는 IndexedDB를 지원하지 않습니다.'));
          return;
        }
        const req = window.indexedDB.open(idb.DB_NAME, idb.DB_VERSION);
        req.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(idb.STORE_NAME)) {
            db.createObjectStore(idb.STORE_NAME, { keyPath: 'id' });
          }
        };
        req.onsuccess = (e) => resolve(e.target.result);
        req.onerror = (e) => reject(e.target.error);
      });
    },

    async saveFile(record) {
      try {
        const db = await idb.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction(idb.STORE_NAME, 'readwrite');
          const store = tx.objectStore(idb.STORE_NAME);
          store.put(record);
          tx.oncomplete = () => resolve(true);
          tx.onerror = (e) => reject(e.target.error);
        });
      } catch (err) {
        console.warn('[Storage.idb.saveFile] IndexedDB 저장 실패, LocalStorage로 대체:', err);
        return false;
      }
    },

    async getAllFiles() {
      try {
        const db = await idb.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction(idb.STORE_NAME, 'readonly');
          const store = tx.objectStore(idb.STORE_NAME);
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = (e) => reject(e.target.error);
        });
      } catch (err) {
        console.warn('[Storage.idb.getAllFiles] 조회 실패:', err);
        return [];
      }
    },

    async deleteFile(id) {
      try {
        const db = await idb.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction(idb.STORE_NAME, 'readwrite');
          const store = tx.objectStore(idb.STORE_NAME);
          store.delete(id);
          tx.oncomplete = () => resolve(true);
          tx.onerror = (e) => reject(e.target.error);
        });
      } catch (err) {
        console.warn('[Storage.idb.deleteFile] 삭제 실패:', err);
        return false;
      }
    }
  };

  // ─────────────────────────────────────────────
  // 전체 초기화
  // ─────────────────────────────────────────────
  /**
   * vlsgr_ 접두어가 붙은 모든 LocalStorage 데이터를 삭제한다.
   */
  const reset = () => {
    local.clear();
    console.info('[Storage] 모든 데이터가 초기화되었습니다.');
  };

  // Public API
  return { local, records, wrongAnswers, settings, stats, backup, reset, idb };
})();
