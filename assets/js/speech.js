// speech.js - 브라우저 Web Speech API 래퍼
// TTS (SpeechSynthesis)  : 텍스트를 음성으로 읽어준다.
// STT (SpeechRecognition): 음성을 텍스트로 변환한다.
// 브라우저 미지원 시 graceful degradation: 오류를 던지지 않고 콘솔 경고로만 처리한다.

const Speech = (() => {

  // ═══════════════════════════════════════════════
  // TTS (Text-To-Speech) — SpeechSynthesis
  // ═══════════════════════════════════════════════
  const tts = {
    /** 현재 브라우저가 TTS를 지원하는지 여부 */
    isSupported: 'speechSynthesis' in window,

    // 내부 상태: 현재 재생 중인 utterance
    _currentUtterance: null,

    /**
     * 텍스트를 음성으로 읽는다.
     * @param {string} text - 읽을 텍스트
     * @param {Object} [options={}]
     *   @param {number}   [options.rate=1.0]      - 재생 속도 (0.1 ~ 10)
     *   @param {number}   [options.pitch=1.0]     - 음조 (0 ~ 2)
     *   @param {string}   [options.lang='en-US']  - 언어 태그
     *   @param {string}   [options.voiceURI]      - 특정 목소리 URI (getVoices()로 조회)
     *   @param {Function} [options.onEnd]         - 재생 완료 콜백 ()
     *   @param {Function} [options.onError]       - 오류 콜백 (errorEvent)
     *   @param {Function} [options.onStart]       - 재생 시작 콜백 ()
     */
    speak(text, options = {}) {
      if (!tts.isSupported) {
        console.warn('[Speech.tts] 이 브라우저는 SpeechSynthesis를 지원하지 않습니다.');
        return;
      }
      if (!text || typeof text !== 'string') {
        console.warn('[Speech.tts.speak] 읽을 텍스트가 없습니다.');
        return;
      }

      // 기존 재생 중지
      tts.stop();

      const {
        rate = 1.0,
        pitch = 1.0,
        lang = 'en-US',
        voiceURI = null,
        onEnd = null,
        onError = null,
        onStart = null,
      } = options;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = Math.min(10, Math.max(0.1, rate));
      utterance.pitch = Math.min(2, Math.max(0, pitch));
      utterance.lang = lang;

      // 특정 목소리 선택
      if (voiceURI) {
        const voices = tts.getVoices();
        const voice = voices.find(v => v.voiceURI === voiceURI);
        if (voice) utterance.voice = voice;
      }

      // 이벤트 콜백 연결
      utterance.onstart = () => {
        if (typeof onStart === 'function') onStart();
      };
      utterance.onend = () => {
        tts._currentUtterance = null;
        if (typeof onEnd === 'function') onEnd();
      };
      utterance.onerror = (e) => {
        tts._currentUtterance = null;
        console.warn('[Speech.tts] 재생 오류:', e.error);
        if (typeof onError === 'function') onError(e);
      };

      tts._currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    },

    /**
     * 현재 재생 중인 TTS를 즉시 중지한다.
     */
    stop() {
      if (!tts.isSupported) return;
      window.speechSynthesis.cancel();
      tts._currentUtterance = null;
    },

    /**
     * 재생을 일시 정지한다.
     */
    pause() {
      if (!tts.isSupported) return;
      window.speechSynthesis.pause();
    },

    /**
     * 일시 정지된 재생을 재개한다.
     */
    resume() {
      if (!tts.isSupported) return;
      window.speechSynthesis.resume();
    },

    /**
     * 사용 가능한 목소리 목록을 반환한다.
     * 일부 브라우저는 비동기로 목소리를 로드하므로, 첫 호출 시 빈 배열일 수 있다.
     * @returns {SpeechSynthesisVoice[]}
     */
    getVoices() {
      if (!tts.isSupported) return [];
      return window.speechSynthesis.getVoices();
    },

    /**
     * 현재 TTS가 재생 중인지 여부를 반환한다.
     * @returns {boolean}
     */
    isPlaying() {
      if (!tts.isSupported) return false;
      return window.speechSynthesis.speaking && !window.speechSynthesis.paused;
    },
  };

  // 목소리 목록은 비동기로 로드되므로 voiceschanged 이벤트 등록 (지원 시)
  if (tts.isSupported) {
    window.speechSynthesis.onvoiceschanged = () => {
      // 목소리가 로드되면 외부에서 tts.getVoices()로 조회 가능
    };
  }


  // ═══════════════════════════════════════════════
  // STT (Speech-To-Text) — SpeechRecognition
  // ═══════════════════════════════════════════════
  const stt = (() => {
    // 브라우저별 SpeechRecognition 생성자 처리
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition || null;

    // 현재 실행 중인 recognition 인스턴스
    let _recognition = null;
    let _isListening = false;

    return {
      /** 현재 브라우저가 STT를 지원하는지 여부 */
      isSupported: !!SpeechRecognitionAPI,

      /**
       * 음성 인식을 시작한다.
       * @param {Function} onResult - 인식 결과 콜백 (transcript: string, isFinal: boolean) => void
       * @param {Function} onError  - 오류 콜백 (errorType: string, message: string) => void
       * @param {Object}   [options={}]
       *   @param {string}  [options.lang='en-US']           - 인식 언어
       *   @param {boolean} [options.continuous=false]       - 연속 인식 여부
       *   @param {boolean} [options.interimResults=true]    - 중간 결과 반환 여부
       *   @param {number}  [options.maxAlternatives=1]      - 대안 결과 수
       */
      start(onResult, onError, options = {}) {
        if (!this.isSupported) {
          console.warn('[Speech.stt] 이 브라우저는 SpeechRecognition을 지원하지 않습니다.');
          if (typeof onError === 'function') {
            onError('not-supported', '이 브라우저는 음성 인식을 지원하지 않습니다.');
          }
          return;
        }

        // 이미 실행 중이면 중지 후 재시작
        if (_isListening) {
          this.stop();
        }

        const {
          lang = 'en-US',
          continuous = false,
          interimResults = true,
          maxAlternatives = 1,
        } = options;

        _recognition = new SpeechRecognitionAPI();
        _recognition.lang = lang;
        _recognition.continuous = continuous;
        _recognition.interimResults = interimResults;
        _recognition.maxAlternatives = maxAlternatives;

        // 결과 수신
        _recognition.onresult = (event) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            const transcript = result[0].transcript;
            const isFinal = result.isFinal;
            if (typeof onResult === 'function') {
              onResult(transcript, isFinal);
            }
          }
        };

        // 오류 처리
        _recognition.onerror = (event) => {
          console.warn('[Speech.stt] 인식 오류:', event.error);
          _isListening = false;
          if (typeof onError === 'function') {
            const messages = {
              'no-speech': '음성이 감지되지 않았습니다.',
              'audio-capture': '마이크를 찾을 수 없습니다.',
              'not-allowed': '마이크 접근이 거부되었습니다.',
              'network': '네트워크 오류가 발생했습니다.',
              'aborted': '음성 인식이 중단되었습니다.',
              'service-not-allowed': '음성 인식 서비스가 허용되지 않습니다.',
            };
            onError(event.error, messages[event.error] || '알 수 없는 오류가 발생했습니다.');
          }
        };

        // 종료 처리
        _recognition.onend = () => {
          _isListening = false;
        };

        // 시작
        _recognition.onstart = () => {
          _isListening = true;
        };

        try {
          _recognition.start();
        } catch (e) {
          console.error('[Speech.stt.start] 시작 실패:', e);
          _isListening = false;
          if (typeof onError === 'function') {
            onError('start-failed', e.message);
          }
        }
      },

      /**
       * 음성 인식을 중지한다.
       */
      stop() {
        if (_recognition) {
          try {
            _recognition.stop();
          } catch (e) {
            console.warn('[Speech.stt.stop]:', e);
          }
          _recognition = null;
        }
        _isListening = false;
      },

      /**
       * 현재 음성 인식이 실행 중인지 여부를 반환한다.
       * @returns {boolean}
       */
      isListening() {
        return _isListening;
      },
    };
  })();

  // Public API
  return { tts, stt };
})();
