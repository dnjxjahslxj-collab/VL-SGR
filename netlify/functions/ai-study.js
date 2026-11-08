// ai-study.js - Netlify Serverless Function 메인 엔드포인트
// URL: /.netlify/functions/ai-study (POST)

const { validateRequest } = require('./lib/validators');
const aiProvider = require('./lib/ai-provider');

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  };
}

exports.handler = async (event, context) => {
  // CORS 사전 요청 (Preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: ''
    };
  }

  // POST 요청만 허용
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders(),
      body: JSON.stringify({ success: false, error: 'Method Not Allowed' })
    };
  }

  // 본문 JSON 파싱
  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: JSON.stringify({ success: false, error: '유효한 JSON 요청 본문이 아닙니다.' })
    };
  }

  // 입력값 및 길이 검증
  const validationError = validateRequest(body);
  if (validationError) {
    return {
      statusCode: 400,
      headers: corsHeaders(),
      body: JSON.stringify({ success: false, error: validationError })
    };
  }

  const { action } = body;

  // AI API 키 존재 여부 확인
  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({
        success: false,
        aiAvailable: false,
        message: '서버에 AI API 키가 설정되지 않았습니다. Netlify 관리자 환경변수(GEMINI_API_KEY)에 키를 등록하면 AI 기능이 활성화됩니다.',
        action
      })
    };
  }

  // 실제 AI 공급업체 호출
  try {
    const result = await aiProvider.call(action, body);
    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({
        success: true,
        aiAvailable: true,
        data: result,
        action
      })
    };
  } catch (err) {
    console.error(`[ai-study] action: ${action} 실행 실패:`, err.message);

    if (err.message === 'AI_KEY_NOT_CONFIGURED') {
      return {
        statusCode: 200,
        headers: corsHeaders(),
        body: JSON.stringify({
          success: false,
          aiAvailable: false,
          message: 'AI API 키가 설정되지 않았습니다.',
          action
        })
      };
    }

    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({
        success: false,
        aiAvailable: true,
        error: `AI 연동 처리 중 오류가 발생했습니다: ${err.message}`,
        action
      })
    };
  }
};
