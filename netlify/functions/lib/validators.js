// validators.js - Netlify Functions 입력 유효성 검사 모듈

const ALLOWED_ACTIONS = [
  'analyze_passage',
  'generate_questions',
  'grade_answer',
  'ai_tutor_chat',
  'generate_passage',
  'analyze_weakness',
];

const MAX_PASSAGE_LENGTH = 5000; // 지문 최대 길이 (자)
const MAX_ANSWER_LENGTH  = 2000; // 답변/질문 최대 길이

/**
 * 요청 본문 유효성 검사
 * @param {object} body - 파싱된 요청 본문
 * @returns {string|null} - 오류 메시지 (유효하면 null)
 */
function validateRequest(body) {
  if (!body || typeof body !== 'object') {
    return '요청 본문이 필요합니다.';
  }

  const { action, passage, userAnswer, question, topic } = body;

  // action 필드 검사
  if (!action) return 'action 필드가 누락되었습니다.';
  if (typeof action !== 'string') return 'action은 문자열이어야 합니다.';
  if (!ALLOWED_ACTIONS.includes(action)) {
    return `허용되지 않는 action입니다. 가능한 값: ${ALLOWED_ACTIONS.join(', ')}`;
  }

  // 지문 길이 검사
  if (passage !== undefined) {
    if (typeof passage !== 'string') return 'passage는 문자열이어야 합니다.';
    if (passage.length > MAX_PASSAGE_LENGTH) {
      return `지문이 너무 깁니다. (최대 ${MAX_PASSAGE_LENGTH}자 허용, 현재: ${passage.length}자)`;
    }
  }

  // 답변 길이 검사
  if (userAnswer !== undefined) {
    if (typeof userAnswer !== 'string') return 'userAnswer는 문자열이어야 합니다.';
    if (userAnswer.length > MAX_ANSWER_LENGTH) {
      return `답변이 너무 깁니다. (최대 ${MAX_ANSWER_LENGTH}자 허용)`;
    }
  }

  // 튜터 질문 길이 검사
  if (question !== undefined && typeof question === 'string' && question.length > MAX_ANSWER_LENGTH) {
    return `질문 내용이 너무 깁니다. (최대 ${MAX_ANSWER_LENGTH}자 허용)`;
  }

  return null; // 검증 통과
}

module.exports = { validateRequest, ALLOWED_ACTIONS };
