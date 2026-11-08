// ai-provider.js - AI API 공급업체 추상화 모듈
// Google Gemini API 및 OpenAI API 지원 (Netlify Functions Node 18+ 내장 fetch 활용)

/**
 * JSON 텍스트 파싱 헬퍼 (마크다운 코드블록 제거)
 */
function cleanJsonString(str) {
  if (typeof str !== 'string') return '';
  let cleaned = str.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```\s*$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '');
  }
  return cleaned.trim();
}

/**
 * 프롬프트 빌더
 */
function buildPrompt(action, params) {
  switch (action) {
    case 'analyze_passage':
      return `
다음 영어 지문을 대학생 영어 독해 수준에서 분석하여 순수 JSON 형식으로만 응답해줘.

지문:
"${params.passage}"

응답 형식(JSON):
{
  "title": "적절한 영문 제목",
  "titleKo": "한국어 제목",
  "level": "beginner | intermediate | advanced 중 하나",
  "topic": "지문의 핵심 주제 (한국어)",
  "summaryKo": "지문 전체 내용의 2~3문장 한국어 요약",
  "vocabulary": [
    {
      "word": "단어",
      "pos": "품사",
      "meaning": "한국어 뜻",
      "example": "본문 예문 또는 쉬운 응용 예문",
      "synonyms": ["유의어1", "유의어2"]
    }
  ],
  "grammar": [
    {
      "title": "주요 문법 개념 (한국어)",
      "explanation": "개념 설명 (한국어)",
      "passageExample": "본문에서 해당 문법이 쓰인 문장"
    }
  ]
}
`;

    case 'generate_questions':
      return `
다음 영어 지문을 바탕으로 독해 및 문법 객관식 문제를 각각 2문항씩(총 4문항) 생성해줘. 순수 JSON 형식으로만 응답해줘.

지문:
"${params.passage}"

응답 형식(JSON):
{
  "questions": [
    {
      "id": "ai_q1",
      "type": "reading | grammar",
      "question": "영문 또는 한글 문제 문장",
      "options": ["보기1", "보기2", "보기3", "보기4"],
      "answer": 0,
      "explanation": "상세한 정답 및 오답 해설 (한국어)"
    }
  ]
}
`;

    case 'grade_answer':
      return `
대학생 영어 학습자의 독해/요약 답안을 채점하고 피드백을 제공해줘. 순수 JSON 형식으로만 응답해줘.

[원문 또는 질문]:
"${params.question || params.passage || '지문 요약'}"

[모범 기준]:
"${params.referenceAnswer || '핵심 아이디어를 명확하고 문법적으로 올바르게 기술'}"

[학습자 제출 답안]:
"${params.userAnswer}"

응답 형식(JSON):
{
  "score": 85,
  "accuracy": 85,
  "feedbackKo": "답안에 대한 상세하고 친절한 강점 및 개선점 피드백 (한국어)",
  "corrections": "문법이나 어휘에서 어색한 부분에 대한 모범 수정 문장 (영문)",
  "keyPointsCovered": ["포함된 핵심 개념1", "포함된 개념2"],
  "keyPointsMissed": ["누락되거나 보완할 개념"]
}
`;

    case 'generate_passage':
      return `
대학생 영어 학습을 위한 독창적인 영어 독해 지문을 창작해줘. 순수 JSON 형식으로만 응답해줘.
주제: ${params.topic || 'Business & Technology'}
난이도: ${params.level || 'intermediate'} (beginner: 150단어 내외, intermediate: 200단어 내외, advanced: 260단어 내외)

응답 형식(JSON):
{
  "title": "English Title",
  "titleKo": "한국어 제목",
  "topic": "${params.topic || '일반'}",
  "level": "${params.level || 'intermediate'}",
  "text": "완전한 영어 본문 텍스트 (줄바꿈 포함)...",
  "sentences": [
    { "text": "English sentence 1.", "translation": "한국어 번역 1." }
  ],
  "vocabulary": [
    { "word": "단어", "pos": "품사", "meaning": "한국어 뜻", "example": "예문" }
  ]
}
`;

    case 'ai_tutor_chat':
      return `
너는 친절하고 전문적인 대학 영어독해 전문 AI 튜터 'VL-SGR 튜터'야.
학생이 영어 지문에 대해 질문을 남겼어. 핵심을 명쾌하고 이해하기 쉽게 한국어로 설명해줘. 필요시 쉬운 예문과 발음/문법 팁을 함께 제공해줘.

[지문 맥락]:
"${params.passage || '(지문 미지정)'}"

[학생 질문]:
"${params.question}"

응답 형식(JSON):
{
  "answer": "친절하고 상세한 한국어 답변 내용...",
  "tips": "추가 영어 학습 팁 (선택 사항)",
  "recommendedVocab": ["관련 추천 어휘"]
}
`;

    default:
      throw new Error(`지원하지 않는 액션입니다: ${action}`);
  }
}

/**
 * Google Gemini API 호출
 */
async function callGemini(prompt, apiKey) {
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.3,
      responseMimeType: 'application/json'
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API Error (${response.status}): ${errText}`);
  }

  const resJson = await response.json();
  const rawText = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error('Gemini 응답에서 텍스트를 찾을 수 없습니다.');
  }

  const cleaned = cleanJsonString(rawText);
  return JSON.parse(cleaned);
}

/**
 * OpenAI API 호출 (선택적 fallback)
 */
async function callOpenAI(prompt, apiKey) {
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const url = 'https://api.openai.com/v1/chat/completions';

  const payload = {
    model,
    messages: [
      { role: 'system', content: 'You are an educational AI tutor. You must always reply in valid JSON format.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.3,
    response_format: { type: 'json_object' }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI API Error (${response.status}): ${errText}`);
  }

  const resJson = await response.json();
  const rawText = resJson.choices?.[0]?.message?.content;
  if (!rawText) {
    throw new Error('OpenAI 응답에서 텍스트를 찾을 수 없습니다.');
  }

  const cleaned = cleanJsonString(rawText);
  return JSON.parse(cleaned);
}

/**
 * 메인 call 함수
 */
async function call(action, params) {
  const geminiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  if (!geminiKey && !openAiKey) {
    throw new Error('AI_KEY_NOT_CONFIGURED');
  }

  const prompt = buildPrompt(action, params);

  // Gemini 키가 있으면 Gemini 우선 호출 (무료 티어 및 경제성)
  if (geminiKey) {
    try {
      return await callGemini(prompt, geminiKey);
    } catch (err) {
      console.warn('[AIProvider] Gemini 호출 실패, OpenAI 키 확인 중...', err.message);
      if (openAiKey) {
        return await callOpenAI(prompt, openAiKey);
      }
      throw err;
    }
  } else if (openAiKey) {
    return await callOpenAI(prompt, openAiKey);
  }
}

module.exports = { call, buildPrompt, cleanJsonString };
