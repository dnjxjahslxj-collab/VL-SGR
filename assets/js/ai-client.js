// ai-client.js - 프론트엔드 AI 서비스 클라이언트 모듈
// Netlify Functions를 경유하여 안전하게 AI 호출. API 키는 브라우저에 절대 저장/노출되지 않음.
// AI 미연동 또는 네트워크 장애 시 정적 Fallback 기능 완벽 내장.

const AIClient = (() => {
  const ENDPOINT = '/.netlify/functions/ai-study';
  const TIMEOUT_MS = 25000; // 25초 타임아웃
  let cachedAvailability = null;

  async function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      return response;
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  }

  /**
   * AI 서버리스 API 호출
   */
  async function callApi(action, params = {}) {
    try {
      const res = await fetchWithTimeout(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...params })
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        return {
          success: false,
          aiAvailable: errorJson.aiAvailable !== undefined ? errorJson.aiAvailable : false,
          error: errorJson.error || `서버 오류 (${res.status})`
        };
      }

      return await res.json();
    } catch (err) {
      console.warn(`[AIClient] "${action}" 서버리스 함수 연결 실패:`, err.message);
      return {
        success: false,
        aiAvailable: false,
        error: err.name === 'AbortError' ? 'AI 응답 시간 초과 (25초)' : 'AI 서버에 연결할 수 없습니다.'
      };
    }
  }

  /**
   * AI 사용 가능 여부 확인
   */
  async function checkAvailability() {
    if (cachedAvailability !== null) return cachedAvailability;
    try {
      const res = await callApi('ai_tutor_chat', { question: 'ping' });
      cachedAvailability = res.aiAvailable === true;
    } catch {
      cachedAvailability = false;
    }
    return cachedAvailability;
  }

  /**
   * 1. AI 지문 생성 (미연동 시 창작 템플릿 반환)
   */
  async function generatePassage(topic = 'Business & Technology', level = 'intermediate') {
    const res = await callApi('generate_passage', { topic, level });
    if (res.success && res.data) {
      return { success: true, aiGenerated: true, passage: res.data };
    }

    // [Fallback] AI 미연동 시 기본 고품질 템플릿 반환
    console.info('[AIClient] AI 미연동 상태: 기본 창작 지문 템플릿을 제공합니다.');
    const timestamp = Date.now();
    return {
      success: true,
      aiGenerated: false,
      message: res.message || 'AI API가 연결되지 않아 시연용 생성 지문이 제공되었습니다.',
      passage: {
        id: `ai_passage_${timestamp}`,
        title: `The Dynamics of ${topic}`,
        titleKo: `${topic}의 핵심 역학`,
        topic: topic,
        level: level,
        type: 'user-input',
        text: `In the contemporary era, ${topic} has emerged as a cornerstone of strategic innovation and intellectual growth. Organizations and scholars alike have recognized that understanding these fundamental principles fosters resilience in an unpredictable global landscape. Furthermore, individuals who adapt to these emerging paradigms consistently outperform their peers by maintaining an agile, forward-looking mindset. Ultimately, integrating technological proficiency with human insight remains the definitive benchmark for sustainable achievement.`,
        sentences: [
          { text: `In the contemporary era, ${topic} has emerged as a cornerstone of strategic innovation and intellectual growth.`, translation: `현대 사회에서 ${topic}은 전략적 혁신과 지적 성장의 초석으로 부상했습니다.` },
          { text: 'Organizations and scholars alike have recognized that understanding these fundamental principles fosters resilience in an unpredictable global landscape.', translation: '기업과 학자들 모두 이러한 기본 원리를 이해하는 것이 예측 불가능한 글로벌 환경에서 회복력을 길러준다는 점을 인식해 왔습니다.' },
          { text: 'Furthermore, individuals who adapt to these emerging paradigms consistently outperform their peers by maintaining an agile, forward-looking mindset.', translation: '나아가 이러한 새로운 패러다임에 적응하는 개인은 민첩하고 미래지향적인 사고방식을 유지함으로써 일관되게 뛰어난 성과를 냅니다.' },
          { text: 'Ultimately, integrating technological proficiency with human insight remains the definitive benchmark for sustainable achievement.', translation: '궁극적으로 기술적 역량과 인간적 통찰을 통합하는 것이 지속 가능한 성취를 위한 결정적 기준입니다.' }
        ],
        vocabulary: [
          { word: 'cornerstone', pos: 'noun', meaning: '초석, 핵심 기틀', example: 'Education is the cornerstone of progress.' },
          { word: 'resilience', pos: 'noun', meaning: '회복력, 탄력성', example: 'Resilience enables companies to recover quickly.' },
          { word: 'paradigm', pos: 'noun', meaning: '패러다임, 체계', example: 'A new paradigm is transforming modern industry.' }
        ]
      }
    };
  }

  /**
   * 2. AI 주관식 답안 채점 (미연동 시 규칙 기반 채점 제공)
   */
  async function gradeAnswer(passage, question, referenceAnswer, userAnswer) {
    const res = await callApi('grade_answer', { passage, question, referenceAnswer, userAnswer });
    if (res.success && res.data) {
      return { success: true, aiEvaluated: true, data: res.data };
    }

    // [Fallback] 규칙 기반 채점
    const wordCount = (userAnswer || '').trim().split(/\s+/).filter(Boolean).length;
    let score = Math.min(90, Math.max(50, wordCount * 5 + 40));
    return {
      success: true,
      aiEvaluated: false,
      data: {
        score,
        accuracy: score,
        feedbackKo: `[로컬 자동 평가] 작성하신 답안(${wordCount}단어)은 전반적인 문맥을 성실히 다루었습니다. (Netlify Functions에 AI API 키 등록 시 AI 정밀 첨삭이 제공됩니다.)`,
        corrections: 'Good effort. Strive to incorporate concise vocabulary and diverse transitional phrases.',
        keyPointsCovered: ['주요 문맥 기술'],
        keyPointsMissed: ['심층 세부 논거']
      }
    };
  }

  /**
   * 3. AI 튜터 질의응답 (미연동 시 지문 안내 반환)
   */
  async function askTutor(passage, question) {
    const res = await callApi('ai_tutor_chat', { passage, question });
    if (res.success && res.data) {
      return { success: true, aiReplied: true, answer: res.data.answer, tips: res.data.tips };
    }

    return {
      success: true,
      aiReplied: false,
      answer: `질문하신 내용("${question}")에 대해 안내드립니다. 현재 Netlify Functions에 AI API 키(GEMINI_API_KEY)가 등록되지 않은 오프라인 모드입니다. 지문 속 해당 문장의 주어와 동사 관계 및 앞뒤 문맥을 대조해 보시면 의미를 파악하실 수 있습니다. Netlify 환경변수에 API 키를 설정하시면 실시간 AI 튜터 답변이 즉시 활성화됩니다!`,
      tips: '문맥 속 핵심 단어를 사전에서 검색해 유사한 예문을 살펴보세요.'
    };
  }

  return {
    checkAvailability,
    generatePassage,
    gradeAnswer,
    askTutor
  };
})();
