// file-extractor.js - 파일(PDF, DOCX, TXT) 텍스트 추출 모듈
// PDF.js 및 Mammoth.js를 활용한 클라이언트 측 텍스트 파싱

const FileExtractor = (() => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB 제한

  /**
   * 영문 텍스트를 문장 단위로 자동 분할
   */
  function splitIntoSentences(text) {
    if (!text || typeof text !== 'string') return [];
    // 마침표, 물음표, 느낌표 뒤의 공백 또는 줄바꿈 기준 분할
    const raw = text.split(/(?<=[.?!])\s+/);
    return raw
      .map(s => s.trim())
      .filter(s => s.length >= 10)
      .map(s => ({ text: s, translation: '' }));
  }

  /**
   * PDF 파일에서 텍스트 추출 (PDF.js 사용)
   */
  async function extractFromPdf(file) {
    if (typeof window.pdfjsLib === 'undefined') {
      throw new Error('PDF.js 라이브러리가 로드되지 않았습니다. 인터넷 연결 상태를 확인해 주세요.');
    }

    // 워커 설정
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n\n';
    }

    const trimmed = fullText.trim();
    if (trimmed.length < 20) {
      throw new Error('텍스트를 추출할 수 없습니다. 스캔된 이미지 형태의 PDF는 OCR을 지원하지 않으므로 직접 입력 모드를 이용해 주세요.');
    }

    return trimmed;
  }

  /**
   * DOCX 워드 파일에서 텍스트 추출 (Mammoth.js 사용)
   */
  async function extractFromDocx(file) {
    if (typeof window.mammoth === 'undefined') {
      throw new Error('Mammoth.js 라이브러리가 로드되지 않았습니다.');
    }

    const arrayBuffer = await file.arrayBuffer();
    const result = await window.mammoth.extractRawText({ arrayBuffer });
    const text = result.value ? result.value.trim() : '';

    if (!text || text.length < 20) {
      throw new Error('DOCX 파일에서 추출된 텍스트 내용이 너무 적습니다.');
    }

    return text;
  }

  /**
   * TXT 텍스트 파일 읽기 (FileReader 내장 API)
   */
  function extractFromTxt(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result ? e.target.result.trim() : '';
        if (!text) {
          reject(new Error('빈 텍스트 파일입니다.'));
        } else {
          resolve(text);
        }
      };
      reader.onerror = () => reject(new Error('TXT 파일을 읽는 중 오류가 발생했습니다.'));
      reader.readAsText(file, 'utf-8');
    });
  }

  /**
   * 파일 분석 및 텍스트 추출 진입점
   * @param {File} file
   * @returns {Promise<{ success: boolean, text?: string, error?: string, sentences?: Array }>}
   */
  async function extract(file) {
    if (!file) return { success: false, error: '파일이 선택되지 않았습니다.' };

    // 파일 크기 검사
    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: `파일 크기가 너무 큽니다. (최대 10MB까지 가능, 현재: ${(file.size / 1024 / 1024).toFixed(1)}MB)` };
    }

    const name = file.name.toLowerCase();

    // MIME 타입 및 확장자 이중 검사 (보안 강화)
    const ALLOWED_MIME = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      '' // 일부 환경에서 MIME 미설정 허용 (확장자로만 판별)
    ];
    const fileType = file.type || '';
    const isAllowedMime = ALLOWED_MIME.includes(fileType);
    const isAllowedExt  = name.endsWith('.pdf') || name.endsWith('.docx') || name.endsWith('.txt');

    if (!isAllowedExt) {
      return { success: false, error: '지원하지 않는 파일 형식입니다. PDF, DOCX, TXT 파일만 지원합니다.' };
    }
    // MIME이 명시되어 있고 허용 목록에 없으면 거부
    if (fileType && !isAllowedMime) {
      return { success: false, error: `허용되지 않는 파일 형식입니다. (MIME: ${fileType})` };
    }
    let text = '';

    try {
      if (name.endsWith('.pdf')) {
        text = await extractFromPdf(file);
      } else if (name.endsWith('.docx')) {
        text = await extractFromDocx(file);
      } else {
        // .txt (이미 위에서 허용 확장자 검사 완료)
        text = await extractFromTxt(file);
      }

      // 연속된 공백 및 줄바꿈 정제
      const cleanedText = text.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n');
      const sentences = splitIntoSentences(cleanedText);

      return {
        success: true,
        text: cleanedText,
        sentences,
        wordCount: cleanedText.split(/\s+/).filter(Boolean).length
      };

    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  return { extract, splitIntoSentences };
})();

