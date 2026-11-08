// default-passages.js - VL-SGR 기본 지문 10개 완전 데이터 세트
// 저작권 없는 순수 창작 교육용 지문 (초급 3, 중급 4, 고급 3)

const DEFAULT_PASSAGES = [
  // =========================================================================
  // 지문 1: Corporate Sustainability and Business Strategy (초급)
  // =========================================================================
  {
    id: "passage-001",
    title: "Corporate Sustainability and Business Strategy",
    titleKo: "기업의 지속가능경영",
    level: "beginner",
    topic: "경영/비즈니스",
    type: "default",
    wordCount: 175,
    text: "In the modern business world, corporate sustainability has become an essential factor for achieving long-term success. In the past, most companies focused primarily on maximizing immediate financial profits for their shareholders. However, today's consumers, employees, and investors increasingly demand that businesses take active responsibility for the environment and society. As a result, forward-thinking organizations have been adopting comprehensive green policies across their daily operations. They actively work to reduce carbon emissions, conserve water, and eliminate unnecessary plastic packaging. These sustainable practices not only protect natural resources but also significantly enhance corporate reputation. When consumers realize that a brand genuinely cares about the planet, they develop greater trust and brand loyalty. Furthermore, investing in energy-efficient technologies often lowers operating costs over time, creating substantial financial advantages. Governments worldwide are also introducing stricter environmental regulations that require companies to report their ecological impact. Organizations that adapt proactively can avoid severe legal penalties and secure a lasting competitive advantage. Ultimately, integrating sustainability into business strategy is no longer optional; it is a fundamental requirement for continuous growth.",
    sentences: [
      {
        text: "In the modern business world, corporate sustainability has become an essential factor for achieving long-term success.",
        translation: "현대 비즈니스 세계에서 기업의 지속가능성은 장기적인 성공을 달성하기 위한 필수적인 요소가 되었습니다."
      },
      {
        text: "In the past, most companies focused primarily on maximizing immediate financial profits for their shareholders.",
        translation: "과거에는 대부분의 기업이 주주들을 위한 즉각적인 재무적 이익을 극대화하는 데 주로 집중했습니다."
      },
      {
        text: "However, today's consumers, employees, and investors increasingly demand that businesses take active responsibility for the environment and society.",
        translation: "하지만 오늘날의 소비자, 직원, 그리고 투자자들은 기업이 환경과 사회에 대해 적극적인 책임을 질 것을 점점 더 요구하고 있습니다."
      },
      {
        text: "As a result, forward-thinking organizations have been adopting comprehensive green policies across their daily operations.",
        translation: "그 결과, 미래지향적인 조직들은 일상적인 운영 전반에 걸쳐 포괄적인 친환경 정책을 도입해 오고 있습니다."
      },
      {
        text: "They actively work to reduce carbon emissions, conserve water, and eliminate unnecessary plastic packaging.",
        translation: "그들은 탄소 배출량을 줄이고, 물을 절약하며, 불필요한 플라스틱 포장을 없애기 위해 적극적으로 노력합니다."
      },
      {
        text: "These sustainable practices not only protect natural resources but also significantly enhance corporate reputation.",
        translation: "이러한 지속 가능한 관행은 천연자원을 보호할 뿐만 아니라 기업의 평판을 크게 향상시킵니다."
      },
      {
        text: "When consumers realize that a brand genuinely cares about the planet, they develop greater trust and brand loyalty.",
        translation: "소비자들은 브랜드가 지구를 진심으로 배려한다는 점을 인식할 때, 더 큰 신뢰와 브랜드 충성도를 갖게 됩니다."
      },
      {
        text: "Furthermore, investing in energy-efficient technologies often lowers operating costs over time, creating substantial financial advantages.",
        translation: "게다가 에너지 효율적인 기술에 투자하는 것은 시간이 지남에 따라 운영 비용을 절감하여 상당한 재정적 이점을 창출합니다."
      },
      {
        text: "Governments worldwide are also introducing stricter environmental regulations that require companies to report their ecological impact.",
        translation: "전 세계 정부들도 기업에게 생태학적 영향을 보고하도록 요구하는 더 엄격한 환경 규제를 도입하고 있습니다."
      },
      {
        text: "Organizations that adapt proactively can avoid severe legal penalties and secure a lasting competitive advantage.",
        translation: "선제적으로 적응하는 조직은 가혹한 법적 처벌을 피하고 지속적인 경쟁 우위를 확보할 수 있습니다."
      },
      {
        text: "Ultimately, integrating sustainability into business strategy is no longer optional; it is a fundamental requirement for continuous growth.",
        translation: "궁극적으로 지속가능성을 비즈니스 전략에 통합하는 것은 더 이상 선택 사항이 아니며, 지속적인 성장을 위한 근본적인 필수 요건입니다."
      }
    ],
    vocabulary: [
      {
        word: "sustainability",
        pos: "noun",
        meaning: "지속 가능성, 환경 친화성",
        example: "Corporate sustainability focuses on ethical and ecological practices.",
        synonyms: ["durability", "viability", "continuity"]
      },
      {
        word: "shareholder",
        pos: "noun",
        meaning: "주주",
        example: "The board announced higher dividends for every shareholder.",
        synonyms: ["stockholder", "investor", "stakeholder"]
      },
      {
        word: "implement",
        pos: "verb",
        meaning: "실행하다, 도입하다",
        example: "The firm plans to implement new environmental guidelines.",
        synonyms: ["execute", "apply", "enact"]
      },
      {
        word: "emission",
        pos: "noun",
        meaning: "배출, 배출물",
        example: "New factory standards will cut greenhouse gas emissions by half.",
        synonyms: ["discharge", "release", "effluence"]
      },
      {
        word: "reputation",
        pos: "noun",
        meaning: "평판, 명성",
        example: "Ethical conduct improves a company's public reputation.",
        synonyms: ["prestige", "stature", "standing"]
      },
      {
        word: "loyalty",
        pos: "noun",
        meaning: "충성도, 신뢰",
        example: "Customer loyalty leads to repeated product purchases.",
        synonyms: ["faithfulness", "allegiance", "devotion"]
      },
      {
        word: "regulation",
        pos: "noun",
        meaning: "규제, 규정",
        example: "The company complies with all state safety regulations.",
        synonyms: ["rule", "statute", "ordinance"]
      },
      {
        word: "proactively",
        pos: "adverb",
        meaning: "선제적으로, 능동적으로",
        example: "Managers must act proactively to resolve potential conflicts.",
        synonyms: ["preemptively", "actively", "dynamically"]
      },
      {
        word: "fundamental",
        pos: "adjective",
        meaning: "근본적인, 핵심적인",
        example: "Clear communication is a fundamental element of teamwork.",
        synonyms: ["essential", "crucial", "underlying"]
      }
    ],
    grammar: [
      {
        title: "현재완료 진행형 (Present Perfect Continuous)",
        explanation: "과거에 시작되어 현재까지 동작이 계속 이어지고 있음을 강조할 때 'have/has been + -ing' 형태를 사용합니다.",
        passageExample: "forward-thinking organizations have been adopting comprehensive green policies across their daily operations.",
        additionalExample: "Our team has been developing this eco-friendly engine for six months.",
        question: {
          question: "다음 빈칸에 알맞은 어형을 고르시오: Leading corporations ______ clean energy sources since 2021.",
          options: ["have been utilizing", "had utilize", "will utilizing", "are utilize"],
          answer: 0,
          explanation: "'since 2021'과 결합하여 과거부터 현재까지 동작이 지속됨을 나타내므로 현재완료 진행형인 'have been utilizing'이 가장 적절합니다."
        }
      },
      {
        title: "상관접속사 not only A but also B",
        explanation: "'A뿐만 아니라 B도'라는 의미로, 병렬 구조를 이루며 B의 내용을 더욱 강조합니다.",
        passageExample: "These sustainable practices not only protect natural resources but also significantly enhance corporate reputation.",
        additionalExample: "The new policy not only reduces costs but also boosts employee morale.",
        question: {
          question: "다음 빈칸에 공통으로 들어갈 짝으로 알맞은 것은? The campaign ______ attracted new customers ______ strengthened brand trust.",
          options: ["neither / nor", "not only / but also", "either / or", "both / or"],
          answer: 1,
          explanation: "두 가지 긍정적인 효과를 병렬로 연결하여 강조하고 있으므로 'not only ... but also'가 정답입니다."
        }
      },
      {
        title: "동명사 주어 구문과 단수 취급 (Gerund Subject)",
        explanation: "동명사구(V-ing)가 문장의 주어로 올 경우 단수 취급하여 단수 동사를 사용합니다.",
        passageExample: "Ultimately, integrating sustainability into business strategy is no longer optional...",
        additionalExample: "Investing in renewable energy requires long-term commitment.",
        question: {
          question: "다음 괄호 안에서 어법상 알맞은 것을 고르시오: Conserving natural resources (are / is / were / being) essential for future generations.",
          options: ["is", "are", "were", "being"],
          answer: 0,
          explanation: "'Conserving natural resources'라는 동명사구가 주어이므로 단수 동사 'is'가 올바릅니다."
        }
      }
    ],
    readingQuestions: [
      {
        id: "rq1",
        type: "multiple_choice",
        question: "What is the primary message conveyed by the passage?",
        options: [
          "Corporate sustainability is an indispensable strategy for long-term growth and success.",
          "Companies should strictly prioritize shareholder profits over social responsibility.",
          "Environmental regulations are excessive and harm economic competitiveness.",
          "Investing in green technology always causes severe financial losses."
        ],
        answer: 0,
        explanation: "지문 전체는 기업의 지속가능성이 선택이 아닌 장기적 성공과 생존을 위한 필수 전략임을 설명하고 있습니다."
      },
      {
        id: "rq2",
        type: "multiple_choice",
        question: "According to the passage, how can investing in energy-efficient technologies benefit businesses?",
        options: [
          "By immediately tripling product sales",
          "By lowering operational expenses over time",
          "By exempting companies from all tax liabilities",
          "By allowing firms to avoid employee hiring"
        ],
        answer: 1,
        explanation: "본문 8번째 문장에서 에너지 효율 기술 투자가 시간이 지남에 따라 운영 비용을 낮추어 상당한 재정적 이점을 준다고 명시되어 있습니다."
      },
      {
        id: "rq3",
        type: "multiple_choice",
        question: "What can be inferred about companies that fail to comply with environmental regulations?",
        options: [
          "They are guaranteed higher market valuation.",
          "They may encounter serious legal and financial liabilities.",
          "They will quickly dominate international trade.",
          "They receive automatic subsidies from global organizations."
        ],
        answer: 1,
        explanation: "10번째 문장에서 선제적으로 적응하는 조직이 가혹한 법적 처벌을 피할 수 있다고 하였으므로, 규제를 무시하는 기업은 심각한 법적·재정적 불이익을 당할 수 있음을 추론할 수 있습니다."
      },
      {
        id: "rq4",
        type: "short_answer",
        question: "지문의 핵심 메시지를 한 문장의 한국어나 영어로 요약하시오.",
        referenceAnswer: "기업의 지속가능성 추구는 평판 개선, 비용 절감, 규제 대응을 통해 장기적 성장과 경쟁 우위를 보장하는 필수 전략이다.",
        keywords: ["지속가능", "성장", "전략", "비용 절감", "sustainability", "strategy"]
      }
    ],
    listeningQuestions: [
      {
        id: "lq1",
        sentenceIndex: 0,
        question: "첫 문장에서 장기적 성공을 위해 필수적인 요소로 언급된 것은 무엇인가?",
        options: ["단기적 이익 극대화", "기업의 지속가능경영", "인건비의 급격한 삭감", "공격적인 광고 마케팅"],
        answer: 1,
        explanation: "첫 문장에서 'corporate sustainability has become an essential factor for achieving long-term success'라고 언급되었습니다."
      },
      {
        id: "lq2",
        sentenceIndex: 7,
        question: "8번째 문장에서 에너지 효율 기술 투자가 가져오는 장기적 이점으로 설명된 것은?",
        options: ["운영 비용의 절감", "제품 포장재 증가", "규제 위반 벌금 부과", "직원 수의 감소"],
        answer: 0,
        explanation: "8번째 문장은 에너지 효율 기술 투자가 시간이 지남에 따라 운영 비용을 낮춘다고 설명합니다."
      }
    ],
    speakingTask: {
      prompt: "Do you think corporate sustainability is essential for modern business success? State your opinion with at least two reasons.",
      sampleAnswer: "In my opinion, corporate sustainability is definitely essential for modern business success. First, consumers today are increasingly conscious of environmental issues and prefer to support ethical brands. Second, adopting sustainable practices reduces long-term operating costs and protects companies from severe regulatory fines.",
      keyPoints: ["consumer trust and brand loyalty", "operational cost reduction", "compliance with environmental regulations"]
    }
  },

  // =========================================================================
  // 지문 2: Consumer Behavior and Modern Marketing (초급)
  // =========================================================================
  {
    id: "passage-002",
    title: "Consumer Behavior and Modern Marketing",
    titleKo: "소비자 행동과 마케팅",
    level: "beginner",
    topic: "마케팅",
    type: "default",
    wordCount: 186,
    text: "Understanding consumer behavior is the cornerstone of effective marketing in today's competitive digital marketplace. Traditional marketing heavily relied on television commercials, radio broadcasts, and print advertisements to reach broad audiences. Today, modern consumers research products thoroughly online before making any purchase decision. They regularly read customer reviews, compare prices across various platforms, and follow recommendations from social media influencers. Consequently, contemporary marketers must craft personalized experiences that resonate with individual preferences and specific lifestyle needs. Digital analytics tools allow companies to track browsing habits, search patterns, and previous buying history with high accuracy. By analyzing this valuable data, businesses can deliver customized product recommendations directly to potential buyers at the perfect moment. However, marketers must also balance targeted advertising with genuine respect for consumer privacy. When shoppers feel that their personal information is being tracked too aggressively, they often lose trust in the brand. Successful companies therefore prioritize transparency, clear communication, and ethical marketing practices. Establishing authentic connections creates loyal brand advocates who happily recommend products to their friends and family. In conclusion, modern marketing is no longer just about selling products; it is about building meaningful, lasting relationships with customers.",
    sentences: [
      {
        text: "Understanding consumer behavior is the cornerstone of effective marketing in today's competitive digital marketplace.",
        translation: "소비자 행동을 이해하는 것은 오늘날 경쟁적인 디지털 시장에서 효과적인 마케팅의 초석입니다."
      },
      {
        text: "Traditional marketing heavily relied on television commercials, radio broadcasts, and print advertisements to reach broad audiences.",
        translation: "전통적인 마케팅은 광범위한 청중에게 도달하기 위해 텔레비전 광고, 라디오 방송, 인쇄 광고에 크게 의존했습니다."
      },
      {
        text: "Today, modern consumers research products thoroughly online before making any purchase decision.",
        translation: "오늘날 현대의 소비자들은 어떠한 구매 결정을 내리기 전에 온라인에서 상품을 철저하게 조사합니다."
      },
      {
        text: "They regularly read customer reviews, compare prices across various platforms, and follow recommendations from social media influencers.",
        translation: "그들은 정기적으로 고객 리뷰를 읽고, 다양한 플랫폼에서 가격을 비교하며, 소셜 미디어 인플루언서의 추천을 따릅니다."
      },
      {
        text: "Consequently, contemporary marketers must craft personalized experiences that resonate with individual preferences and specific lifestyle needs.",
        translation: "결과적으로, 현대 마케터들은 개인의 선호와 특정 라이프스타일 요구에 부합하는 맞춤형 경험을 만들어내야 합니다."
      },
      {
        text: "Digital analytics tools allow companies to track browsing habits, search patterns, and previous buying history with high accuracy.",
        translation: "디지털 분석 도구는 기업이 탐색 습관, 검색 패턴, 이전 구매 이력을 높은 정확도로 추적할 수 있게 해줍니다."
      },
      {
        text: "By analyzing this valuable data, businesses can deliver customized product recommendations directly to potential buyers at the perfect moment.",
        translation: "이 귀중한 데이터를 분석함으로써 기업은 잠재 고객에게 완벽한 순간에 맞춤형 제품 추천을 직접 전달할 수 있습니다."
      },
      {
        text: "However, marketers must also balance targeted advertising with genuine respect for consumer privacy.",
        translation: "그러나 마케터들은 또한 타깃 맞춤형 광고와 소비자의 사생활에 대한 진정한 존중 사이에서 균형을 잡아야 합니다."
      },
      {
        text: "When shoppers feel that their personal information is being tracked too aggressively, they often lose trust in the brand.",
        translation: "쇼핑객들이 자신의 개인정보가 지나치게 공격적으로 추적되고 있다고 느낄 때, 그들은 종종 브랜드에 대한 신뢰를 잃습니다."
      },
      {
        text: "Successful companies therefore prioritize transparency, clear communication, and ethical marketing practices.",
        translation: "그러므로 성공적인 기업들은 투명성, 명확한 소통, 윤리적인 마케팅 관행을 우선시합니다."
      },
      {
        text: "Establishing authentic connections creates loyal brand advocates who happily recommend products to their friends and family.",
        translation: "진정한 유대감을 형성하는 것은 친구와 가족에게 제품을 기꺼이 추천하는 충성스러운 브랜드 옹호자를 만들어냅니다."
      },
      {
        text: "In conclusion, modern marketing is no longer just about selling products; it is about building meaningful, lasting relationships with customers.",
        translation: "결론적으로 현대 마케팅은 더 이상 제품을 파는 것에만 그치지 않고, 고객과 의미 있고 오래 지속되는 관계를 구축하는 것입니다."
      }
    ],
    vocabulary: [
      {
        word: "cornerstone",
        pos: "noun",
        meaning: "초석, 토대",
        example: "Trust is the cornerstone of any lasting business partnership.",
        synonyms: ["foundation", "bedrock", "keystone"]
      },
      {
        word: "commercial",
        pos: "noun",
        meaning: "광고 방송",
        example: "The company produced an entertaining television commercial.",
        synonyms: ["advertisement", "ad", "spot"]
      },
      {
        word: "contemporary",
        pos: "adjective",
        meaning: "현대의, 동시대의",
        example: "Contemporary consumers expect fast digital service.",
        synonyms: ["modern", "current", "present-day"]
      },
      {
        word: "resonate",
        pos: "verb",
        meaning: "공감을 불러일으키다, 반향을 일으키다",
        example: "The brand message resonates strongly with eco-conscious shoppers.",
        synonyms: ["echo", "appeal", "strike a chord"]
      },
      {
        word: "analytics",
        pos: "noun",
        meaning: "분석학, 데이터 분석",
        example: "Web analytics indicate a surge in mobile traffic.",
        synonyms: ["data analysis", "metrics", "statistics"]
      },
      {
        word: "targeted",
        pos: "adjective",
        meaning: "목표를 정한, 타깃 맞춤형의",
        example: "Targeted advertisements yield higher click-through rates.",
        synonyms: ["focused", "customized", "tailored"]
      },
      {
        word: "transparency",
        pos: "noun",
        meaning: "투명성, 명백함",
        example: "Corporate transparency builds confidence among consumers.",
        synonyms: ["openness", "clarity", "candor"]
      },
      {
        word: "advocate",
        pos: "noun",
        meaning: "옹호자, 지지자",
        example: "Satisfied customers become outspoken advocates for the brand.",
        synonyms: ["champion", "supporter", "promoter"]
      }
    ],
    grammar: [
      {
        title: "전치사 + 동명사 (Preposition + Gerund)",
        explanation: "전치사 뒤에는 명사 역할을 하는 동명사(-ing)가 오며, 수식어나 목적어를 동반할 수 있습니다.",
        passageExample: "before making any purchase decision / By analyzing this valuable data",
        additionalExample: "She decided on purchasing the hybrid car after reading several expert reviews.",
        question: {
          question: "다음 빈칸에 알맞은 어형을 고르시오: Modern shoppers prefer reading reviews before ______ expensive electronics.",
          options: ["buying", "bought", "to buy", "buys"],
          answer: 0,
          explanation: "전치사 'before' 다음에는 목적어로 동명사 'buying'이 와야 합니다."
        }
      },
      {
        title: "5형식 사역/허용 동사 allow + 목적어 + to부정사",
        explanation: "allow, enable, encourage 등의 동사는 '목적어 + to부정사' 구문을 취하여 '~가 ...하도록 허용하다/가능하게 하다'를 나타냅니다.",
        passageExample: "Digital analytics tools allow companies to track browsing habits...",
        additionalExample: "Smart devices allow users to monitor their energy consumption easily.",
        question: {
          question: "다음 문장의 빈칸에 들어갈 알맞은 형태를 고르시오: The software allows marketers ______ customer behavior in real time.",
          options: ["analyzing", "analyze", "to analyze", "analyzed"],
          answer: 2,
          explanation: "'allow + 목적어 + to부정사' 구조이므로 'to analyze'가 정답입니다."
        }
      },
      {
        title: "접속부사 Consequently와 Therefore의 논리적 연결",
        explanation: "앞선 사실에 대한 당연한 귀결이나 결과를 나타낼 때 'Consequently(결과적으로)', 'Therefore(그러므로)'를 사용하여 문장을 유기적으로 연결합니다.",
        passageExample: "Consequently, contemporary marketers must craft personalized experiences...",
        additionalExample: "Sales dropped sharply; therefore, management revised its pricing strategy.",
        question: {
          question: "다음 빈칸에 문맥상 가장 알맞은 접속부사는? Consumer preferences shifted toward online shopping; ______, traditional retailers invested heavily in e-commerce.",
          options: ["nevertheless", "consequently", "otherwise", "in contrast"],
          answer: 1,
          explanation: "앞선 변화로 인해 그에 따른 결과로서 온라인에 투자한 것이므로 인과를 나타내는 'consequently(결과적으로)'가 적절합니다."
        }
      }
    ],
    readingQuestions: [
      {
        id: "rq1",
        type: "multiple_choice",
        question: "What is the primary transition in marketing discussed in the passage?",
        options: [
          "From broad, traditional advertising to personalized, data-driven customer relationships",
          "From digital e-commerce back to conventional print newspapers and radio",
          "From ethical transparency to secretive tracking of consumer data",
          "From international commercial trade to localized barter exchange"
        ],
        answer: 0,
        explanation: "지문은 전통적인 매스 마케팅에서 개인 맞춤형 데이터 분석과 지속적 고객 관계를 구축하는 현대 마케팅으로의 전환을 핵심으로 다룹니다."
      },
      {
        id: "rq2",
        type: "multiple_choice",
        question: "What danger do companies face when utilizing aggressive consumer data tracking?",
        options: [
          "They may drastically reduce production expenses.",
          "Shoppers may lose confidence and trust in the brand.",
          "Their social media following will automatically double.",
          "Governments will eliminate all data privacy statutes."
        ],
        answer: 1,
        explanation: "본문 9번째 문장에서 소비자들이 자신의 정보가 과도하게 추적된다고 느끼면 브랜드에 대한 신뢰를 잃게 된다고 서술되어 있습니다."
      },
      {
        id: "rq3",
        type: "multiple_choice",
        question: "According to the passage, who are 'brand advocates'?",
        options: [
          "Paid corporate lawyers who defend advertisements in court",
          "Government regulators who audit customer privacy data",
          "Loyal customers who willingly recommend products to others",
          "Software programmers who build analytics tracking tools"
        ],
        answer: 2,
        explanation: "본문 11번째 문장에서 충성스러운 고객들이 친구와 가족에게 기꺼이 제품을 추천하는 옹호자(brand advocates)가 된다고 설명합니다."
      },
      {
        id: "rq4",
        type: "short_answer",
        question: "현대 마케팅에서 기업이 데이터 분석을 활용할 때 신뢰를 잃지 않기 위해 유지해야 할 필수 요소를 서술하시오.",
        referenceAnswer: "개인정보 보호에 대한 존중, 운영상의 투명성, 명확한 소통 및 윤리적인 마케팅 관행을 지켜야 한다.",
        keywords: ["개인정보", "사생활", "투명성", "윤리", "privacy", "transparency"]
      }
    ],
    listeningQuestions: [
      {
        id: "lq1",
        sentenceIndex: 3,
        question: "4번째 문장에서 현대 소비자들이 구매 전 거치는 행동으로 언급되지 않은 것은?",
        options: ["고객 리뷰 읽기", "다양한 플랫폼 가격 비교", "인플루언서 추천 확인", "매장 방문을 통한 독점 계약"],
        answer: 3,
        explanation: "4번째 문장에는 리뷰 읽기, 가격 비교, 소셜 미디어 인플루언서 추천 따르기가 언급되었으며 매장 독점 계약은 없습니다."
      },
      {
        id: "lq2",
        sentenceIndex: 8,
        question: "9번째 문장에서 쇼핑객들이 개인정보가 과도하게 추적된다고 느낄 때 나타나는 결과는 무엇인가?",
        options: ["브랜드에 대한 신뢰 상실", "구매 수량의 즉각적 증가", "우수 고객 등록 요청", "광고 클릭률의 급상승"],
        answer: 0,
        explanation: "9번째 문장은 'they often lose trust in the brand'라고 분명히 명시하고 있습니다."
      }
    ],
    speakingTask: {
      prompt: "How has online customer feedback influenced your own purchasing decisions? Provide a specific example.",
      sampleAnswer: "Online customer feedback heavily influences my purchasing decisions. Before buying headphones last semester, I read dozens of verified customer reviews and watched video comparisons. Negative comments about weak battery life persuaded me to select a different, higher-rated model, which proved to be an excellent choice.",
      keyPoints: ["influence of customer reviews", "comparison shopping online", "avoiding faulty or poor products"]
    }
  },

  // =========================================================================
  // 지문 3: Personal Finance and Saving Habits (초급)
  // =========================================================================
  {
    id: "passage-003",
    title: "Personal Finance and Saving Habits",
    titleKo: "개인 금융과 저축 습관",
    level: "beginner",
    topic: "개인금융/경제",
    type: "default",
    wordCount: 179,
    text: "Managing personal finance wisely is a vital life skill that provides financial security and peace of mind. Many young adults struggle with budgeting because they lack practical experience in handling daily expenses. The first step toward healthy financial management is creating a realistic monthly budget. By tracking every expenditure, individuals can easily distinguish between essential needs and non-essential wants. Financial advisors frequently recommend the fifty-thirty-twenty rule as a simple guideline. Under this system, fifty percent of income goes to basic necessities, thirty percent to personal desires, and twenty percent directly to savings. Establishing an emergency fund is another crucial habit that protects people from unexpected events, such as medical emergencies or sudden car repairs. Even saving small amounts consistently can lead to remarkable wealth accumulation over time, thanks to the power of compound interest. Practicing self-control and making thoughtful spending choices can turn modest savings into substantial security. Automating monthly transfers into a dedicated savings account ensures that money is saved before it can be impulsively spent. Ultimately, developing disciplined saving habits today lays the solid foundation for lifelong financial freedom tomorrow.",
    sentences: [
      {
        text: "Managing personal finance wisely is a vital life skill that provides financial security and peace of mind.",
        translation: "개인 재정을 현명하게 관리하는 것은 재정적 안정과 마음의 평화를 제공하는 필수적인 삶의 기술입니다."
      },
      {
        text: "Many young adults struggle with budgeting because they lack practical experience in handling daily expenses.",
        translation: "많은 청년들이 일상적인 지출을 다루는 실질적인 경험이 부족하여 예산 책정에 어려움을 겪습니다."
      },
      {
        text: "The first step toward healthy financial management is creating a realistic monthly budget.",
        translation: "건강한 재정 관리를 향한 첫 번째 단계는 현실적인 월별 예산을 세우는 것입니다."
      },
      {
        text: "By tracking every expenditure, individuals can easily distinguish between essential needs and non-essential wants.",
        translation: "모든 지출을 추적함으로써 개인은 필수적인 필요와 불필요한 욕구를 쉽게 구별할 수 있습니다."
      },
      {
        text: "Financial advisors frequently recommend the fifty-thirty-twenty rule as a simple guideline.",
        translation: "재무 상담사들은 간단한 지침으로 50-30-20 규칙을 자주 추천합니다."
      },
      {
        text: "Under this system, fifty percent of income goes to basic necessities, thirty percent to personal desires, and twenty percent directly to savings.",
        translation: "이 시스템 하에서는 수입의 50%가 기본적 필수품에, 30%가 개인적 욕구에, 그리고 20%가 저축으로 곧장 들어갑니다."
      },
      {
        text: "Establishing an emergency fund is another crucial habit that protects people from unexpected events, such as medical emergencies or sudden car repairs.",
        translation: "비상 자금을 마련하는 것은 의료 비상 상황이나 갑작스러운 차량 수리와 같은 예상치 못한 일로부터 사람들을 보호해 주는 또 다른 중요한 습관입니다."
      },
      {
        text: "Even saving small amounts consistently can lead to remarkable wealth accumulation over time, thanks to the power of compound interest.",
        translation: "복리의 힘 덕분에 적은 금액이라도 꾸준히 저축하면 시간이 흐르면서 놀라운 부의 축적으로 이어질 수 있습니다."
      },
      {
        text: "Practicing self-control and making thoughtful spending choices can turn modest savings into substantial security.",
        translation: "자제력을 발휘하고 신중한 소비 결정을 내리는 것은 소소한 저축을 상당한 안전장치로 바꿔 놓을 수 있습니다."
      },
      {
        text: "Automating monthly transfers into a dedicated savings account ensures that money is saved before it can be impulsively spent.",
        translation: "전용 저축 계좌로의 월별 자동 이체를 설정하면 돈이 충동적으로 소비되기 전에 먼저 저축되도록 보장합니다."
      },
      {
        text: "Ultimately, developing disciplined saving habits today lays the solid foundation for lifelong financial freedom tomorrow.",
        translation: "궁극적으로 오늘 절제된 저축 습관을 기르는 것은 내일의 평생 재정적 자유를 위한 탄탄한 토대를 놓아 줍니다."
      }
    ],
    vocabulary: [
      {
        word: "vital",
        pos: "adjective",
        meaning: "필수적인, 극히 중요한",
        example: "Proper hydration is vital for athletic performance.",
        synonyms: ["essential", "critical", "crucial"]
      },
      {
        word: "expenditure",
        pos: "noun",
        meaning: "지출, 비용",
        example: "The company curtailed capital expenditure during the recession.",
        synonyms: ["spending", "outlay", "disbursement"]
      },
      {
        word: "distinguish",
        pos: "verb",
        meaning: "구별하다, 분간하다",
        example: "A wise investor learns to distinguish fact from rumor.",
        synonyms: ["differentiate", "discriminate", "discern"]
      },
      {
        word: "necessity",
        pos: "noun",
        meaning: "필수품, 필요성",
        example: "Food and shelter are basic human necessities.",
        synonyms: ["requirement", "essential", "prerequisite"]
      },
      {
        word: "accumulation",
        pos: "noun",
        meaning: "축적, 누적",
        example: "Long-term investment leads to steady wealth accumulation.",
        synonyms: ["build-up", "collection", "amassing"]
      },
      {
        word: "compound",
        pos: "adjective",
        meaning: "복리의, 복합의",
        example: "Compound interest accelerates investment growth over several decades.",
        synonyms: ["combined", "cumulative", "complex"]
      },
      {
        word: "impulsively",
        pos: "adverb",
        meaning: "충동적으로",
        example: "He bought the expensive watch impulsively and regretted it.",
        synonyms: ["spontaneously", "hastily", "rashly"]
      },
      {
        word: "disciplined",
        pos: "adjective",
        meaning: "절제된, 규율 있는",
        example: "A disciplined routine enables students to achieve top grades.",
        synonyms: ["controlled", "orderly", "rigorous"]
      }
    ],
    grammar: [
      {
        title: "동명사 주어 구문과 3인칭 단수 일치",
        explanation: "동명사구가 문장의 주어일 때 항상 단수로 취급하므로 본동사는 단수 형태(is, provides 등)를 씁니다.",
        passageExample: "Managing personal finance wisely is a vital life skill that provides financial security...",
        additionalExample: "Setting clear financial targets helps people stay motivated.",
        question: {
          question: "다음 빈칸에 알맞은 형태를 고르시오: Keeping track of daily expenses ______ people maintain a balanced budget.",
          options: ["helps", "help", "are helping", "have helped"],
          answer: 0,
          explanation: "'Keeping track of daily expenses'가 동명사구 주어이므로 3인칭 단수 동사인 'helps'가 정답입니다."
        }
      },
      {
        title: "distinguish between A and B (A와 B를 구별하다)",
        explanation: "서로 다른 두 대상이나 범주를 명확히 판별하고 구분할 때 전치사 between과 함께 사용합니다.",
        passageExample: "individuals can easily distinguish between essential needs and non-essential wants.",
        additionalExample: "It is important to distinguish between short-term noise and long-term trends.",
        question: {
          question: "다음 빈칸에 적절한 전치사를 고르시오: Financial education teaches kids to distinguish ______ real needs and impulse desires.",
          options: ["among", "between", "from", "against"],
          answer: 1,
          explanation: "두 대상 사이를 구분하는 표현은 'distinguish between A and B'입니다."
        }
      },
      {
        title: "수동태 조동사 (Modal + be + p.p.)",
        explanation: "조동사 뒤에 'be + 과거분사'가 와서 주어가 동작을 받거나 당할 수 있음을 나타냅니다.",
        passageExample: "before it can be impulsively spent.",
        additionalExample: "Unused funds will be transferred to your emergency savings account.",
        question: {
          question: "다음 빈칸에 알맞은 어형을 고르시오: Extra income should ______ into an emergency fund.",
          options: ["deposit", "be deposited", "deposited", "be depositing"],
          answer: 1,
          explanation: "여분의 소득(주어)은 저축되는 대상이므로 수동태 형태인 'be deposited'가 적절합니다."
        }
      }
    ],
    readingQuestions: [
      {
        id: "rq1",
        type: "multiple_choice",
        question: "According to the 50-30-20 rule, how should personal income be distributed?",
        options: [
          "50% needs, 30% wants, 20% savings",
          "50% savings, 30% investments, 20% taxes",
          "50% entertainment, 30% rent, 20% charity",
          "50% debt payoff, 30% food, 20% luxury"
        ],
        answer: 0,
        explanation: "본문 6번째 문장에 50%는 기본 필수품, 30%는 개인적 욕구, 20%는 저축으로 배분된다고 명시되어 있습니다."
      },
      {
        id: "rq2",
        type: "multiple_choice",
        question: "Why does the passage recommend establishing an emergency fund?",
        options: [
          "To purchase speculative stocks during market crashes",
          "To protect against unexpected hardships like car repairs or medical bills",
          "To guarantee early retirement before the age of thirty",
          "To eliminate the need for monthly budgeting entirely"
        ],
        answer: 1,
        explanation: "본문 7번째 문장에서 의료 비상사태나 차량 수리와 같은 예기치 못한 상황으로부터 보호하기 위해 비상 자금이 필요하다고 설명합니다."
      },
      {
        id: "rq3",
        type: "multiple_choice",
        question: "What is the primary benefit of automating monthly savings transfers?",
        options: [
          "It eliminates the interest rate applied to loans.",
          "It prevents funds from being impulsively spent on unnecessary items.",
          "It duplicates bank accounts without user authorization.",
          "It raises the credit card spending limit immediately."
        ],
        answer: 1,
        explanation: "10번째 문장에서 돈이 충동적으로 소비되기 전에 먼저 저축되도록 보장해 준다고 서술되어 있습니다."
      },
      {
        id: "rq4",
        type: "short_answer",
        question: "적은 금액이라도 꾸준히 저축했을 때 시간이 흐르며 부를 축적할 수 있게 만드는 핵심 금융 원리를 본문에서 찾아 쓰시오.",
        referenceAnswer: "복리의 힘 (the power of compound interest)",
        keywords: ["복리", "복리의 힘", "compound interest"]
      }
    ],
    listeningQuestions: [
      {
        id: "lq1",
        sentenceIndex: 2,
        question: "3번째 문장에서 건강한 재정 관리를 위한 첫 번째 단계로 제시된 것은?",
        options: ["새로운 신용카드 개설", "현실적인 월별 예산 작성", "부동산 구매", "고위험 주식 투자"],
        answer: 1,
        explanation: "3번째 문장은 'creating a realistic monthly budget'을 첫 단계로 명시하고 있습니다."
      },
      {
        id: "lq2",
        sentenceIndex: 6,
        question: "7번째 문장에서 비상 자금(emergency fund)이 대비할 수 있는 예시로 든 상황은?",
        options: ["해외 명품 쇼핑", "의료 응급 상황 및 차량 수리", "호화 크루즈 여행", "친구들과의 저녁 파티"],
        answer: 1,
        explanation: "7번째 문장에서 'medical emergencies or sudden car repairs'를 예시로 언급했습니다."
      }
    ],
    speakingTask: {
      prompt: "What is your most important financial goal, and what saving habits are you practicing to achieve it?",
      sampleAnswer: "My primary financial goal is to build an emergency fund of three months' living expenses. To achieve this, I track my daily expenses using a mobile budgeting app and automatically transfer twenty percent of my allowance into a separate savings account every month.",
      keyPoints: ["setting a specific financial target", "expense tracking and budgeting", "automating savings to avoid impulsive spending"]
    }
  },

  // =========================================================================
  // 지문 4: Artificial Intelligence and the Workplace (중급)
  // =========================================================================
  {
    id: "passage-004",
    title: "Artificial Intelligence and the Workplace",
    titleKo: "인공지능과 일자리 변화",
    level: "intermediate",
    topic: "기술/사회",
    type: "default",
    wordCount: 219,
    text: "The rapid advancement of artificial intelligence is fundamentally transforming the modern workplace across diverse industries. Machine learning algorithms and generative AI tools can now perform complex tasks that previously required human cognitive effort. Routine administrative duties, data processing, customer inquiry handling, and even basic programming are increasingly being automated. This unprecedented technological shift has sparked intense debate regarding the future of employment and the potential displacement of workers. Pessimists argue that widespread automation will eliminate millions of entry-level jobs, creating severe economic uncertainty for recent graduates. However, many economists suggest a more balanced perspective, arguing that artificial intelligence will augment human capabilities rather than replace them entirely. Historically, major technological revolutions, from the steam engine to the internet, destroyed outdated occupations while generating entirely new industries. In the AI-driven economy, repetitive manual and clerical roles are decreasing, while demand for creative thinking, emotional intelligence, and strategic problem-solving is skyrocketing. To thrive in this dynamic environment, professionals must embrace continuous learning and develop digital literacy alongside uniquely human strengths. Organizations also bear a responsibility to invest in reskilling programs that equip their workforce with modern technological proficiencies. By combining artificial efficiency with human judgment, organizations can unlock unprecedented levels of innovation and productivity. Ultimately, successful workers will not be those who compete directly against machines, but those who learn to collaborate effectively with intelligent systems.",
    sentences: [
      {
        text: "The rapid advancement of artificial intelligence is fundamentally transforming the modern workplace across diverse industries.",
        translation: "인공지능의 급속한 발전은 다양한 산업 전반에 걸쳐 현대 일자리를 근본적으로 변화시키고 있습니다."
      },
      {
        text: "Machine learning algorithms and generative AI tools can now perform complex tasks that previously required human cognitive effort.",
        translation: "머신러닝 알고리즘과 생성형 AI 도구는 이제 이전에는 인간의 인지적 노력이 필요했던 복잡한 작업을 수행할 수 있습니다."
      },
      {
        text: "Routine administrative duties, data processing, customer inquiry handling, and even basic programming are increasingly being automated.",
        translation: "일상적인 행정 업무, 데이터 처리, 고객 문의 응대, 심지어 기초적인 프로그래밍까지 점점 더 자동화되고 있습니다."
      },
      {
        text: "This unprecedented technological shift has sparked intense debate regarding the future of employment and the potential displacement of workers.",
        translation: "이러한 전례 없는 기술적 변화는 고용의 미래와 근로자의 잠재적 일자리 대체에 관한 격렬한 논쟁을 불러일으켰습니다."
      },
      {
        text: "Pessimists argue that widespread automation will eliminate millions of entry-level jobs, creating severe economic uncertainty for recent graduates.",
        translation: "비관론자들은 광범위한 자동화가 수백만 개의 초급 일자리를 없애 최근 졸업생들에게 심각한 경제적 불확실성을 초래할 것이라고 주장합니다."
      },
      {
        text: "However, many economists suggest a more balanced perspective, arguing that artificial intelligence will augment human capabilities rather than replace them entirely.",
        translation: "그러나 많은 경제학자들은 인공지능이 인간의 역량을 완전히 대체하기보다는 증강할 것이라고 주장하며 보다 균형 잡힌 관점을 제시합니다."
      },
      {
        text: "Historically, major technological revolutions, from the steam engine to the internet, destroyed outdated occupations while generating entirely new industries.",
        translation: "역사적으로 증기기관부터 인터넷에 이르는 주요 기술 혁명은 구시대의 직업을 없애는 동시에 완전히 새로운 산업을 창출해 냈습니다."
      },
      {
        text: "In the AI-driven economy, repetitive manual and clerical roles are decreasing, while demand for creative thinking, emotional intelligence, and strategic problem-solving is skyrocketing.",
        translation: "AI 주도 경제에서는 반복적인 육체 및 사무 역할이 감소하는 반면, 창의적 사고, 감성 지능, 전략적 문제 해결력에 대한 수요는 치솟고 있습니다."
      },
      {
        text: "To thrive in this dynamic environment, professionals must embrace continuous learning and develop digital literacy alongside uniquely human strengths.",
        translation: "이 역동적인 환경에서 번창하기 위해 직업인들은 지속적인 학습을 수용하고 고유한 인간적 강점과 함께 디지털 문해력을 개발해야 합니다."
      },
      {
        text: "Organizations also bear a responsibility to invest in reskilling programs that equip their workforce with modern technological proficiencies.",
        translation: "기업 조직 역시 직원들에게 현대 기술적 숙련도를 갖추게 하는 재교육 프로그램에 투자할 책임을 집니다."
      },
      {
        text: "By combining artificial efficiency with human judgment, organizations can unlock unprecedented levels of innovation and productivity.",
        translation: "인공지능의 효율성과 인간의 판단력을 결합함으로써 조직은 전례 없는 수준의 혁신과 생산성을 열어젖힐 수 있습니다."
      },
      {
        text: "Ultimately, successful workers will not be those who compete directly against machines, but those who learn to collaborate effectively with intelligent systems.",
        translation: "궁극적으로 성공하는 근로자는 기계와 직접 경쟁하는 자가 아니라 지능형 시스템과 효과적으로 협업하는 법을 배우는 자일 것입니다."
      }
    ],
    vocabulary: [
      {
        word: "cognitive",
        pos: "adjective",
        meaning: "인지적인, 인식의",
        example: "The brain injury affected his cognitive abilities and memory.",
        synonyms: ["intellectual", "mental", "cerebral"]
      },
      {
        word: "automated",
        pos: "adjective",
        meaning: "자동화된",
        example: "The automated factory operates twenty-four hours without interruption.",
        synonyms: ["mechanized", "computerized", "robotic"]
      },
      {
        word: "unprecedented",
        pos: "adjective",
        meaning: "전례 없는, 유례없는",
        example: "The software update achieved an unprecedented level of user satisfaction.",
        synonyms: ["unmatched", "unparalleled", "novel"]
      },
      {
        word: "displacement",
        pos: "noun",
        meaning: "대체, 해고, 일자리 상실",
        example: "Technological displacement of clerical workers requires government intervention.",
        synonyms: ["replacement", "dislodgment", "ouster"]
      },
      {
        word: "augment",
        pos: "verb",
        meaning: "증강하다, 향상시키다",
        example: "AI tools augment human medical diagnosis rather than replacing doctors.",
        synonyms: ["enhance", "supplement", "boost"]
      },
      {
        word: "clerical",
        pos: "adjective",
        meaning: "사무직의, 서기의",
        example: "Clerical duties such as filing and scheduling are now software-driven.",
        synonyms: ["administrative", "secretarial", "office"]
      },
      {
        word: "skyrocketing",
        pos: "adjective",
        meaning: "급증하는, 치솟는",
        example: "There is skyrocketing demand for qualified cybersecurity specialists.",
        synonyms: ["soaring", "surging", "escalating"]
      },
      {
        word: "reskilling",
        pos: "noun",
        meaning: "재교육, 신기술 습득",
        example: "Corporate reskilling enables workers to transition into data analytics roles.",
        synonyms: ["retraining", "upskilling", "re-education"]
      },
      {
        word: "collaborate",
        pos: "verb",
        meaning: "협업하다, 협력하다",
        example: "Engineers collaborate with machine algorithms to optimize designs.",
        synonyms: ["cooperate", "partner", "team up"]
      }
    ],
    grammar: [
      {
        title: "현재진행 수동태 (Present Continuous Passive)",
        explanation: "'is/are being + 과거분사(p.p.)' 구조로 지금 현재 어떤 동작이나 처리가 진행 중임을 나타냅니다.",
        passageExample: "Routine administrative duties, data processing... are increasingly being automated.",
        additionalExample: "Customer feedback reports are currently being analyzed by the marketing department.",
        question: {
          question: "다음 빈칸에 알맞은 형태를 고르시오: Many customer support tickets ______ by generative AI bots right now.",
          options: ["are being resolved", "were resolved", "will resolve", "have resolving"],
          answer: 0,
          explanation: "지금 현재 진행 중인 수동 동작을 나타내므로 현재진행 수동태인 'are being resolved'가 정답입니다."
        }
      },
      {
        title: "rather than을 이용한 병렬 비교 구조",
        explanation: "'A rather than B'는 'B라기보다는 차라리 A'라는 뜻으로, A와 B는 문법적으로 대등한 형태(동사원형 대 동사원형, 명사 대 명사 등)를 취합니다.",
        passageExample: "will augment human capabilities rather than replace them entirely.",
        additionalExample: "We should focus on solving root problems rather than treating surface symptoms.",
        question: {
          question: "다음 빈칸에 문법적으로 알맞은 형태를 고르시오: Successful managers strive to empower employees rather than ______ every small decision.",
          options: ["micromanage", "to micromanaging", "micromanaged", "micromanages"],
          answer: 0,
          explanation: "'empower'와 대등하게 연결되는 동사원형 형태인 'micromanage'가 적절합니다."
        }
      },
      {
        title: "not A but B 구문 (A가 아니라 B)",
        explanation: "주어의 본질이나 핵심 속성을 대비하여 강조할 때 사용하는 대표적 상관 표현입니다.",
        passageExample: "successful workers will not be those who compete directly against machines, but those who learn to collaborate effectively...",
        additionalExample: "True education is not mere memorization, but the cultivation of critical thinking.",
        question: {
          question: "다음 문장의 빈칸에 들어갈 알맞은 짝을 고르시오: Success in the digital era depends not on physical labor ______ on continuous technological adaptation.",
          options: ["and", "but", "or", "so"],
          answer: 1,
          explanation: "'not A but B' 구문이므로 'but'이 정답입니다."
        }
      }
    ],
    readingQuestions: [
      {
        id: "rq1",
        type: "multiple_choice",
        question: "What is the central thesis regarding the future workplace presented in the passage?",
        options: [
          "Human workers will be completely superseded and rendered obsolete by robotics.",
          "AI will primarily augment human abilities, requiring workers to collaborate with intelligent systems.",
          "Government regulations will entirely ban the use of AI in corporate environments.",
          "Technological innovations have never previously altered employment landscapes."
        ],
        answer: 1,
        explanation: "지문은 AI가 인간을 완전히 대체하기보다는 역량을 증강시킬 것이며, 미래의 성공은 지능형 시스템과의 협업 능력에 달려 있다고 설명합니다."
      },
      {
        id: "rq2",
        type: "multiple_choice",
        question: "Which of the following skills is experiencing skyrocketing demand in the AI era?",
        options: [
          "Repetitive paper filing",
          "Manual data transcription",
          "Strategic problem-solving and emotional intelligence",
          "Routine postal dispatching"
        ],
        answer: 2,
        explanation: "본문 8번째 문장에서 창의적 사고, 감성 지능, 전략적 문제 해결력(strategic problem-solving)에 대한 수요가 치솟고 있다고 명시합니다."
      },
      {
        id: "rq3",
        type: "multiple_choice",
        question: "What historical evidence does the author provide to counter technological pessimism?",
        options: [
          "Past industrial revolutions eliminated outdated jobs but created entirely new industries.",
          "The steam engine resulted in the permanent global elimination of manual workers.",
          "The invention of the internet stopped all job creation for several decades.",
          "Ancient civilizations prospered solely without any technological tools."
        ],
        answer: 0,
        explanation: "본문 7번째 문장에서 증기기관부터 인터넷에 이르기까지 구시대 일자리를 없앤 동시에 완전히 새로운 산업을 창출했다는 역사적 사실을 제시합니다."
      },
      {
        id: "rq4",
        type: "short_answer",
        question: "본문에 따르면 AI 시대에 기업 조직이 근로자들을 위해 져야 할 핵심적인 책임은 무엇인가?",
        referenceAnswer: "직원들이 현대적인 기술적 숙련도를 갖출 수 있도록 재교육(reskilling) 프로그램에 투자하는 것이다.",
        keywords: ["재교육", "투자", "숙련도", "reskilling", "training"]
      }
    ],
    listeningQuestions: [
      {
        id: "lq1",
        sentenceIndex: 2,
        question: "3번째 문장에서 점차 자동화되고 있는 업무로 언급되지 않은 것은?",
        options: ["일상적인 행정 업무", "데이터 처리", "고객 문의 응대", "고위 경영진의 최종 법률 판결"],
        answer: 3,
        explanation: "3번째 문장에는 일상적 행정 업무, 데이터 처리, 고객 문의 응대, 기초 프로그래밍이 언급되었으며 고위 법률 판결은 없습니다."
      },
      {
        id: "lq2",
        sentenceIndex: 7,
        question: "8번째 문장에서 AI 경제 하에 감소하고 있는 역할은 무엇인가?",
        options: ["반복적인 육체 및 사무 역할", "창의적 디자인 기획", "감성 지능 기반 상담", "전략적 문제 해결"],
        answer: 0,
        explanation: "8번째 문장은 'repetitive manual and clerical roles are decreasing'이라고 언급하고 있습니다."
      }
    ],
    speakingTask: {
      prompt: "Do you believe AI will create more career opportunities than it eliminates? Explain your stance with specific examples.",
      sampleAnswer: "I believe AI will create more meaningful career opportunities than it eliminates. While routine clerical jobs may decline, new specializations such as prompt engineering, AI ethics auditing, and machine learning operations are rapidly emerging. Just as the internet spawned web design and digital marketing, AI will unlock industries we cannot yet imagine.",
      keyPoints: ["historical precedent of technological revolutions", "emergence of new job categories", "focus on creative and strategic human strengths"]
    }
  },

  // =========================================================================
  // 지문 5: Stock Markets and Investment Risk (중급)
  // =========================================================================
  {
    id: "passage-005",
    title: "Stock Markets and Investment Risk",
    titleKo: "주식시장과 투자 위험",
    level: "intermediate",
    topic: "금융/투자",
    type: "default",
    wordCount: 215,
    text: "Investing in the stock market offers significant opportunities for building wealth, but it also carries inherent financial risks that investors must understand. Equity prices fluctuate constantly in response to corporate earnings reports, macroeconomic indicators, geopolitical events, and shifting market sentiment. Beginning investors often fall victim to emotional trading, purchasing overvalued stocks out of fear of missing out and panicking during sudden market downturns. To mitigate these psychological pitfalls, experienced financial planners emphasize the critical importance of disciplined asset allocation. Diversification is one of the most effective strategies for managing portfolio risk in unpredictable market environments. By distributing capital across various asset classes, such as equities, bonds, real estate, and cash equivalents, investors can cushion the blow of market declines. If a particular sector experiences severe losses, gains in other asset categories can help stabilize overall portfolio performance. Another proven approach is dollar-cost averaging, where an investor invests a fixed amount of money at regular intervals regardless of share prices. This systematic method reduces the pressure of timing the market and lowers the average cost per share over the long run. Ultimately, successful investing requires patience, thorough research, and a clear tolerance for volatility rather than speculative gambling. Keeping a long-term perspective allows investors to ride out short-term fluctuations and achieve sustainable capital growth.",
    sentences: [
      {
        text: "Investing in the stock market offers significant opportunities for building wealth, but it also carries inherent financial risks that investors must understand.",
        translation: "주식 시장에 투자하는 것은 부를 축적할 수 있는 상당한 기회를 제공하지만, 투자자가 반드시 이해해야 하는 내재된 재정적 위험도 수반합니다."
      },
      {
        text: "Equity prices fluctuate constantly in response to corporate earnings reports, macroeconomic indicators, geopolitical events, and shifting market sentiment.",
        translation: "주가는 기업 실적 보고서, 거시경제 지표, 지정학적 사건, 변화하는 시장 심리에 반응하여 끊임없이 변동합니다."
      },
      {
        text: "Beginning investors often fall victim to emotional trading, purchasing overvalued stocks out of fear of missing out and panicking during sudden market downturns.",
        translation: "초보 투자자들은 종종 감정적 매매의 희생양이 되어, 소외되는 것에 대한 두려움으로 고평가된 주식을 사고 갑작스러운 시장 침체기에 패닉에 빠집니다."
      },
      {
        text: "To mitigate these psychological pitfalls, experienced financial planners emphasize the critical importance of disciplined asset allocation.",
        translation: "이러한 심리적 함정을 완화하기 위해 노련한 재무 설계사들은 절제된 자산 배분의 결정적인 중요성을 강조합니다."
      },
      {
        text: "Diversification is one of the most effective strategies for managing portfolio risk in unpredictable market environments.",
        translation: "분산 투자는 예측 불가능한 시장 환경에서 포트폴리오 위험을 관리하기 위한 가장 효과적인 전략 중 하나입니다."
      },
      {
        text: "By distributing capital across various asset classes, such as equities, bonds, real estate, and cash equivalents, investors can cushion the blow of market declines.",
        translation: "주식, 채권, 부동산, 현금성 자산과 같은 다양한 자산군에 걸쳐 자본을 분산시킴으로써 투자자들은 시장 하락의 충격을 완화할 수 있습니다."
      },
      {
        text: "If a particular sector experiences severe losses, gains in other asset categories can help stabilize overall portfolio performance.",
        translation: "특정 부문이 심각한 손실을 겪더라도 다른 자산 범주의 이익이 전체 포트폴리오 성과를 안정시키는 데 도움이 될 수 있습니다."
      },
      {
        text: "Another proven approach is dollar-cost averaging, where an investor invests a fixed amount of money at regular intervals regardless of share prices.",
        translation: "또 다른 입증된 접근법은 주가와 상관없이 정기적인 간격으로 고정된 액수의 돈을 투자하는 달러 코스트 애버리징(정액 분할 투자)입니다."
      },
      {
        text: "This systematic method reduces the pressure of timing the market and lowers the average cost per share over the long run.",
        translation: "이 체계적인 방법은 매수 타이밍을 맞춰야 한다는 압박을 줄이고 장기적으로 주당 평균 매입 단가를 낮춰 줍니다."
      },
      {
        text: "Ultimately, successful investing requires patience, thorough research, and a clear tolerance for volatility rather than speculative gambling.",
        translation: "궁극적으로 성공적인 투자는 투기적인 도박보다는 인내심, 철저한 조사, 그리고 변동성에 대한 명확한 감내력을 요구합니다."
      },
      {
        text: "Keeping a long-term perspective allows investors to ride out short-term fluctuations and achieve sustainable capital growth.",
        translation: "장기적인 관점을 유지하는 것은 투자자가 단기적인 변동성을 극복하고 지속 가능한 자본 성장을 달성할 수 있게 해줍니다."
      }
    ],
    vocabulary: [
      {
        word: "inherent",
        pos: "adjective",
        meaning: "내재된, 타고난",
        example: "Every financial investment carries inherent market volatility.",
        synonyms: ["intrinsic", "innate", "built-in"]
      },
      {
        word: "fluctuate",
        pos: "verb",
        meaning: "변동하다, 요동치다",
        example: "Stock prices fluctuate based on supply and investor sentiment.",
        synonyms: ["oscillate", "vary", "waver"]
      },
      {
        word: "mitigate",
        pos: "verb",
        meaning: "완화하다, 경감시키다",
        example: "Diversification helps mitigate the risk of severe capital loss.",
        synonyms: ["alleviate", "lessen", "reduce"]
      },
      {
        word: "pitfall",
        pos: "noun",
        meaning: "함정, 위험",
        example: "Emotional decision-making is a common pitfall for novice traders.",
        synonyms: ["hazard", "trap", "peril"]
      },
      {
        word: "diversification",
        pos: "noun",
        meaning: "분산 투자, 다양화",
        example: "Asset diversification shields an investment portfolio against localized shocks.",
        synonyms: ["spreading", "expansion", "broadening"]
      },
      {
        word: "cushion",
        pos: "verb",
        meaning: "완화하다, 충격을 흡수하다",
        example: "Government bonds can cushion the financial blow during an equity downturn.",
        synonyms: ["soften", "buffer", "absorb"]
      },
      {
        word: "systematic",
        pos: "adjective",
        meaning: "체계적인, 규칙적인",
        example: "Following a systematic plan prevents impulsive financial transactions.",
        synonyms: ["methodical", "structured", "organized"]
      },
      {
        word: "volatility",
        pos: "noun",
        meaning: "변동성, 불안정성",
        example: "High market volatility frequently frightens short-term speculative investors.",
        synonyms: ["instability", "fluctuation", "unpredictability"]
      },
      {
        word: "speculative",
        pos: "adjective",
        meaning: "투기적인, 추측에 근거한",
        example: "Speculative trading in penny stocks often leads to substantial financial ruin.",
        synonyms: ["risky", "gambling", "conjectural"]
      }
    ],
    grammar: [
      {
        title: "분사구문 부연 설명 (Participial Construction for Additional Action)",
        explanation: "문장의 주어가 주절의 동작과 동시에 수행하거나 그 결과로 이어지는 동작을 현재분사(-ing) 형태로 표현합니다.",
        passageExample: "purchasing overvalued stocks out of fear of missing out and panicking during sudden market downturns.",
        additionalExample: "The trader closed all positions, locking in substantial quarterly profits.",
        question: {
          question: "다음 빈칸에 알맞은 어형을 고르시오: Novice investors panicked during the crash, ______ their shares at huge losses.",
          options: ["selling", "sold", "to sell", "have sold"],
          answer: 0,
          explanation: "동시 동작을 나타내는 분사구문 자리이므로 현재분사 'selling'이 올바릅니다."
        }
      },
      {
        title: "관계부사 where의 추상적 상황 수식",
        explanation: "where는 물리적 장소뿐만 아니라 제도, 시스템, 상황(situation, system, approach 등)을 선행사로 받아 뒤에 완전한 절을 이끕니다.",
        passageExample: "Another proven approach is dollar-cost averaging, where an investor invests a fixed amount of money at regular intervals...",
        additionalExample: "We established a workflow where every code commit is reviewed by two peers.",
        question: {
          question: "다음 빈칸에 알맞은 관계사를 고르시오: Index investing is a popular method ______ investors own a small slice of hundreds of companies.",
          options: ["which", "where", "whom", "what"],
          answer: 1,
          explanation: "추상적인 투자 방법(method)을 선행사로 취하며 뒤에 주어, 동사, 목적어가 모두 갖추어진 완전한 절이 이어지므로 관계부사 'where'가 적절합니다."
        }
      },
      {
        title: "조건 부사절 (If Conditional with Present Tense)",
        explanation: "현재 또는 일반적인 사실을 조건으로 가정할 때 if 절에는 현재시제를 쓰고, 주절에는 조동사(can, will 등)를 씁니다.",
        passageExample: "If a particular sector experiences severe losses, gains in other asset categories can help stabilize overall portfolio performance.",
        additionalExample: "If interest rates rise, borrowing costs generally increase for home buyers.",
        question: {
          question: "다음 괄호 안에서 알맞은 것을 고르시오: If an investor (diversifies / diversified / will diversify) holdings, total portfolio volatility decreases.",
          options: ["diversifies", "diversified", "will diversify", "had diversified"],
          answer: 0,
          explanation: "일반적 사실을 나타내는 조건문이므로 if 절에는 3인칭 단수 현재형인 'diversifies'가 옵니다."
        }
      }
    ],
    readingQuestions: [
      {
        id: "rq1",
        type: "multiple_choice",
        question: "What is the primary function of asset diversification in an investment portfolio?",
        options: [
          "To guarantee that an investor never pays transaction commissions",
          "To mitigate portfolio risk by spreading capital across diverse asset classes",
          "To predict exact day-to-day fluctuations in stock prices",
          "To eliminate the need for thorough financial research"
        ],
        answer: 1,
        explanation: "본문 5~6번째 문장에서 자본을 여러 자산군에 분산하여 시장 하락의 충격을 완화하고 위험을 관리하는 것이 분산 투자의 목적이라고 설명합니다."
      },
      {
        id: "rq2",
        type: "multiple_choice",
        question: "How does dollar-cost averaging assist long-term investors?",
        options: [
          "By borrowing money at low interest rates to purchase high-risk derivatives",
          "By eliminating taxes on capital gains permanently",
          "By investing fixed amounts regularly, reducing market timing pressure",
          "By predicting which individual tech stocks will surge next week"
        ],
        answer: 2,
        explanation: "8~9번째 문장에서 주가와 관계없이 일정한 금액을 정기적으로 투자하여 시장 진입 타이밍에 대한 부담을 줄여 준다고 설명합니다."
      },
      {
        id: "rq3",
        type: "multiple_choice",
        question: "What frequent mistake do beginning investors make according to the passage?",
        options: [
          "They engage in emotional trading driven by fear and panic.",
          "They hold entirely cash equivalents without buying any assets.",
          "They rely exclusively on government bonds for fifty years.",
          "They refuse to check company earnings reports."
        ],
        answer: 0,
        explanation: "본문 3번째 문장에 초보 투자자들은 포모(FOMO)로 인해 고평가된 주식을 사고 시장 하락 시 공포에 빠져 감정적 매매를 하는 실수를 범한다고 명시되어 있습니다."
      },
      {
        id: "rq4",
        type: "short_answer",
        question: "주식 시장의 단기 변동성을 극복하고 성공적인 투자를 이끌어내기 위해 저자가 제안하는 두 가지 핵심 전략(원칙)을 서술하시오.",
        referenceAnswer: "다양한 자산군에 자본을 분배하는 분산 투자(diversification)와 정기적으로 고정 금액을 투자하는 달러 코스트 애버리징(dollar-cost averaging).",
        keywords: ["분산 투자", "자산 배분", "달러 코스트", "정액 분할", "diversification", "dollar-cost averaging"]
      }
    ],
    listeningQuestions: [
      {
        id: "lq1",
        sentenceIndex: 1,
        question: "2번째 문장에서 주가 변동에 영향을 미치는 요인으로 제시되지 않은 것은?",
        options: ["기업 실적 보고서", "거시경제 지표", "지정학적 사건 및 시장 심리", "소비자들의 혈액형 분포"],
        answer: 3,
        explanation: "2번째 문장은 기업 실적, 거시경제 지표, 지정학적 사건, 시장 심리를 언급했습니다."
      },
      {
        id: "lq2",
        sentenceIndex: 7,
        question: "8번째 문장에서 설명된 'dollar-cost averaging' 방식의 주요 특징은 무엇인가?",
        options: ["주가와 무관하게 정기적으로 고정된 금액을 투자함", "모든 자산을 하루 만에 전액 매도함", "주가가 최고점일 때만 집중 매수함", "해외 은행에만 계좌를 개설함"],
        answer: 0,
        explanation: "8번째 문장은 'invests a fixed amount of money at regular intervals regardless of share prices'라고 정의합니다."
      }
    ],
    speakingTask: {
      prompt: "If you had savings to invest today, would you prefer low-risk bonds or higher-risk stocks? Explain your reasoning.",
      sampleAnswer: "If I had savings to invest today, I would allocate seventy percent into higher-risk stocks and thirty percent into low-risk bonds. Because I am young and have a long investment horizon, equities provide superior compound growth potential to beat inflation. The thirty percent in bonds would cushion unexpected market downturns and preserve capital.",
      keyPoints: ["asset allocation strategy", "investment time horizon", "balancing risk and growth"]
    }
  },

  // =========================================================================
  // 지문 6: Supply Chains and Global Logistics (중급)
  // =========================================================================
  {
    id: "passage-006",
    title: "Supply Chains and Global Logistics",
    titleKo: "공급망과 글로벌 물류",
    level: "intermediate",
    topic: "경영/물류",
    type: "default",
    wordCount: 213,
    text: "In an interconnected global economy, supply chains serve as the vital lifelines that transport raw materials, components, and finished goods worldwide. For decades, multinational corporations prioritized efficiency by adopting just-in-time manufacturing models, which kept inventory levels minimal to reduce storage costs. However, recent global crises, including international trade disputes, geopolitical conflicts, and extreme weather disruptions, have exposed the vulnerability of lean supply networks. When a single supplier in an overseas hub shuts down, production lines across entire continents can grind to an abrupt halt. In response to these widespread disruptions, modern enterprises are shifting their strategic focus from pure cost efficiency toward operational resilience. Rather than relying on a solitary offshore manufacturing source, companies are adopting dual-sourcing models and nearshoring production closer to their primary consumer markets. Furthermore, cutting-edge technologies like Internet of Things sensors and artificial intelligence forecasting tools are transforming warehouse logistics and freight tracking. These digital systems provide real-time visibility into shipping routes, allowing logistics managers to anticipate bottlenecks and reroute cargo before delays occur. Although building flexible and diversified logistics networks requires substantial upfront investment, it guarantees business continuity during unforeseen emergencies. Consequently, resilient supply chain management has evolved into a decisive competitive differentiator in international commerce. Companies that master this balance will outpace competitors when unexpected global shocks arise.",
    sentences: [
      {
        text: "In an interconnected global economy, supply chains serve as the vital lifelines that transport raw materials, components, and finished goods worldwide.",
        translation: "상호 연결된 글로벌 경제에서 공급망은 원자재, 부품, 완제품을 전 세계로 운송하는 필수적인 생명선 역할을 합니다."
      },
      {
        text: "For decades, multinational corporations prioritized efficiency by adopting just-in-time manufacturing models, which kept inventory levels minimal to reduce storage costs.",
        translation: "수십 년 동안 다국적 기업들은 보관 비용을 줄이기 위해 재고 수준을 최소한으로 유지하는 적기 공급(just-in-time) 제조 모델을 채택하여 효율성을 최우선시했습니다."
      },
      {
        text: "However, recent global crises, including international trade disputes, geopolitical conflicts, and extreme weather disruptions, have exposed the vulnerability of lean supply networks.",
        translation: "그러나 국제 무역 분쟁, 지정학적 갈등, 기상이변으로 인한 혼란을 포함한 최근의 글로벌 위기들은 간소화된 공급망 네트워크의 취약성을 드러냈습니다."
      },
      {
        text: "When a single supplier in an overseas hub shuts down, production lines across entire continents can grind to an abrupt halt.",
        translation: "해외 거점의 단일 공급업체가 가동을 중단하면 전 대륙에 걸친 생산 라인이 갑작스럽게 멈춰 설 수 있습니다."
      },
      {
        text: "In response to these widespread disruptions, modern enterprises are shifting their strategic focus from pure cost efficiency toward operational resilience.",
        translation: "이러한 광범위한 혼란에 대응하여, 현대 기업들은 전략적 초점을 순수한 비용 효율성에서 운영상의 회복력으로 전환하고 있습니다."
      },
      {
        text: "Rather than relying on a solitary offshore manufacturing source, companies are adopting dual-sourcing models and nearshoring production closer to their primary consumer markets.",
        translation: "단일 해외 제조원에만 의존하기보다는, 기업들은 이원화 소싱 모델을 채택하고 주요 소비자 시장에 더 가깝게 생산을 배치하는 니어쇼어링을 도입하고 있습니다."
      },
      {
        text: "Furthermore, cutting-edge technologies like Internet of Things sensors and artificial intelligence forecasting tools are transforming warehouse logistics and freight tracking.",
        translation: "더 나아가 사물인터넷(IoT) 센서와 인공지능 예측 도구 같은 최첨단 기술들이 창고 물류와 화물 추적을 혁신하고 있습니다."
      },
      {
        text: "These digital systems provide real-time visibility into shipping routes, allowing logistics managers to anticipate bottlenecks and reroute cargo before delays occur.",
        translation: "이러한 디지털 시스템은 배송 경로에 대한 실시간 가시성을 제공하여, 물류 관리자가 지연이 발생하기 전에 병목 현상을 예측하고 화물 경로를 변경할 수 있게 합니다."
      },
      {
        text: "Although building flexible and diversified logistics networks requires substantial upfront investment, it guarantees business continuity during unforeseen emergencies.",
        translation: "유연하고 다변화된 물류망을 구축하는 데는 상당한 초기 투자가 필요하지만, 예상치 못한 비상 상황에서도 비즈니스의 연속성을 보장합니다."
      },
      {
        text: "Consequently, resilient supply chain management has evolved into a decisive competitive differentiator in international commerce.",
        translation: "결과적으로 회복력 있는 공급망 관리는 국제 상거래에서 결정적인 경쟁 우위 차별화 요소로 진화했습니다."
      },
      {
        text: "Companies that master this balance will outpace competitors when unexpected global shocks arise.",
        translation: "이러한 균형을 마스터하는 기업은 예기치 못한 전 세계적 충격이 발생할 때 경쟁자들을 앞서 나갈 것입니다."
      }
    ],
    vocabulary: [
      {
        word: "interconnected",
        pos: "adjective",
        meaning: "상호 연결된",
        example: "The interconnected global banking network shares systemic risk.",
        synonyms: ["interlinked", "interdependent", "networked"]
      },
      {
        word: "inventory",
        pos: "noun",
        meaning: "재고, 물품 목록",
        example: "The retailer conducts an annual inventory audit every December.",
        synonyms: ["stock", "supplies", "merchandise"]
      },
      {
        word: "vulnerability",
        pos: "noun",
        meaning: "취약성, 약점",
        example: "Single-factory sourcing introduces dangerous supply chain vulnerability.",
        synonyms: ["weakness", "susceptibility", "fragility"]
      },
      {
        word: "resilience",
        pos: "noun",
        meaning: "회복력, 탄력성",
        example: "Operational resilience enables firms to withstand unexpected supply shocks.",
        synonyms: ["flexibility", "toughness", "adaptability"]
      },
      {
        word: "nearshoring",
        pos: "noun",
        meaning: "니어쇼어링 (인접국 외주 생산/공급)",
        example: "Nearshoring parts production to neighboring nations cuts transit times.",
        synonyms: ["regional sourcing", "reshoring", "localizing"]
      },
      {
        word: "bottleneck",
        pos: "noun",
        meaning: "병목 현상, 지체 구간",
        example: "Port container backlogs created a major shipping bottleneck.",
        synonyms: ["congestion", "jam", "chokepoint"]
      },
      {
        word: "reroute",
        pos: "verb",
        meaning: "경로를 바꾸다, 우회시키다",
        example: "The dispatcher had to reroute container ships around the closed canal.",
        synonyms: ["divert", "redirect", "rechannel"]
      },
      {
        word: "continuity",
        pos: "noun",
        meaning: "연속성, 지속성",
        example: "Business continuity plans safeguard operations during disasters.",
        synonyms: ["persistence", "stability", "endurance"]
      },
      {
        word: "differentiator",
        pos: "noun",
        meaning: "차별화 요소, 특징",
        example: "Fast delivery speed is a decisive competitive differentiator for e-commerce.",
        synonyms: ["distinction", "distinguishing factor", "edge"]
      }
    ],
    grammar: [
      {
        title: "관계대명사의 계속적 용법 (, which)",
        explanation: "콤마 뒤에 위치하는 관계대명사 which는 앞 명사나 앞 문장 전체를 선행사로 받아 부가적인 정보를 설명합니다.",
        passageExample: "adopting just-in-time manufacturing models, which kept inventory levels minimal to reduce storage costs.",
        additionalExample: "They opened a new distribution warehouse in Poland, which reduced European delivery times by three days.",
        question: {
          question: "다음 빈칸에 알맞은 관계사를 고르시오: The port installed automated cranes, ______ significantly sped up cargo unloading.",
          options: ["which", "that", "what", "where"],
          answer: 0,
          explanation: "콤마 뒤의 계속적 용법 자리이며, 사물 선행사(automated cranes)를 부연 설명하므로 'which'가 정답입니다 (that은 계속적 용법에 불가)."
        }
      },
      {
        title: "shift focus from A toward B (A에서 B로 초점을 전환하다)",
        explanation: "방향성의 전환을 나타낼 때 출발점을 나타내는 전치사 'from'과 지향점을 나타내는 'toward(또는 to)'를 사용합니다.",
        passageExample: "are shifting their strategic focus from pure cost efficiency toward operational resilience.",
        additionalExample: "Automakers are shifting their investments from gasoline combustion toward electric vehicles.",
        question: {
          question: "다음 빈칸에 들어갈 알맞은 전치사는? The logistics firm shifted its priority from speed ______ supply reliability.",
          options: ["toward", "against", "behind", "under"],
          answer: 0,
          explanation: "'from A toward/to B' 구문으로 초점의 지향점을 나타내므로 'toward'가 적절합니다."
        }
      },
      {
        title: "양보 부사절 Although와 복합문 구조",
        explanation: "비록 ~일지라도'라는 뜻의 양보 부사절 접속사 Although는 상반되는 조건이나 어려움에도 불구하고 주절의 결과가 성립함을 나타냅니다.",
        passageExample: "Although building flexible and diversified logistics networks requires substantial upfront investment, it guarantees business continuity...",
        additionalExample: "Although freight air shipping is expensive, it prevents critical factory assembly line shutdowns.",
        question: {
          question: "다음 빈칸에 문맥상 알맞은 접속사를 고르시오: ______ supplier diversification increases management complexity, it protects the firm from localized disruptions.",
          options: ["Although", "Because", "Unless", "Despite"],
          answer: 0,
          explanation: "뒤에 완전한 절(주어+동사)이 오고 '복잡성을 증가시키지만 보호해 준다'는 양보의 의미이므로 접속사 'Although'가 정답입니다."
        }
      }
    ],
    readingQuestions: [
      {
        id: "rq1",
        type: "multiple_choice",
        question: "Why did multinational corporations historically embrace just-in-time manufacturing?",
        options: [
          "To maximize warehouse inventory and hoard raw materials",
          "To minimize inventory levels and reduce storage expenses",
          "To avoid using any digital tracking technologies",
          "To locate all factories exclusively in domestic markets"
        ],
        answer: 1,
        explanation: "본문 2번째 문장에 보관 비용을 줄이기 위해 재고 수준을 최소한으로 유지하는 적기 공급(just-in-time) 모델을 채택했다고 나와 있습니다."
      },
      {
        id: "rq2",
        type: "multiple_choice",
        question: "What strategic response are companies adopting to reduce supply chain vulnerability?",
        options: [
          "Shutting down international communications entirely",
          "Adopting dual-sourcing and nearshoring production closer to markets",
          "Relying completely on a solitary overseas supplier",
          "Halting all investments into digital inventory software"
        ],
        answer: 1,
        explanation: "본문 6번째 문장에 단일 소싱 대신 이원화 소싱(dual-sourcing)과 인접국 생산(nearshoring)을 도입한다고 설명하고 있습니다."
      },
      {
        id: "rq3",
        type: "multiple_choice",
        question: "How do Internet of Things (IoT) sensors and AI tools improve freight logistics?",
        options: [
          "They manually assemble mechanical parts in factories.",
          "They provide real-time route visibility, enabling rerouting before delays happen.",
          "They eliminate the need for container ships and airplanes.",
          "They automatically waive all customs duties and maritime tariffs."
        ],
        answer: 1,
        explanation: "본문 8번째 문장에서 배송 경로에 대한 실시간 가시성을 제공하여 병목 현상을 미리 예측하고 경로를 변경할 수 있게 돕는다고 명시되어 있습니다."
      },
      {
        id: "rq4",
        type: "short_answer",
        question: "글로벌 물류에서 초기 구축 비용이 많이 듦에도 불구하고 공급망 다변화와 회복력을 확보해야 하는 결정적인 이유를 본문에서 찾아 쓰시오.",
        referenceAnswer: "예상치 못한 비상 상황에서도 비즈니스의 연속성(business continuity)을 보장하고 경쟁 우위를 확보하기 위해서이다.",
        keywords: ["비즈니스 연속성", "연속성", "경쟁 우위", "위기 대응", "business continuity"]
      }
    ],
    listeningQuestions: [
      {
        id: "lq1",
        sentenceIndex: 2,
        question: "3번째 문장에서 간소화된(lean) 공급망의 취약성을 노출시킨 원인으로 언급되지 않은 것은?",
        options: ["국제 무역 분쟁", "지정학적 갈등", "기상이변으로 인한 혼란", "인공위성 통신망의 영구 폐쇄"],
        answer: 3,
        explanation: "3번째 문장은 무역 분쟁, 지정학적 갈등, 기상이변 혼란을 구체적 원인으로 제시했습니다."
      },
      {
        id: "lq2",
        sentenceIndex: 5,
        question: "6번째 문장에서 단일 해외 제조원 의존도를 줄이기 위해 기업들이 도입하는 방식은?",
        options: ["이원화 소싱 및 니어쇼어링", "모든 해외 공장 폐쇄 및 전면 중단", "전 제품 단종", "단일 공급업체 전용 계약 체결"],
        answer: 0,
        explanation: "6번째 문장은 'adopting dual-sourcing models and nearshoring production'이라고 언급했습니다."
      }
    ],
    speakingTask: {
      prompt: "Why is supply chain resilience important for consumers, not just for manufacturing companies? Provide an everyday example.",
      sampleAnswer: "Supply chain resilience is vital for consumers because disruptions directly cause product shortages and rapid price inflation. For instance, when global microchip supply chains stalled, automobile dealerships ran out of new cars, causing used car prices to skyrocket. Resilient logistics ensure that daily necessities and electronics remain available at stable prices.",
      keyPoints: ["impact on retail pricing and inflation", "product availability in daily life", "real-world example of shortage"]
    }
  },

  // =========================================================================
  // 지문 7: Digital Transformation in Enterprise (중급)
  // =========================================================================
  {
    id: "passage-007",
    title: "Digital Transformation in Enterprise",
    titleKo: "디지털 전환과 기업 전략",
    level: "intermediate",
    topic: "경영/기술",
    type: "default",
    wordCount: 225,
    text: "Digital transformation has transitioned from an ambitious corporate buzzword into an urgent imperative for enterprises striving to maintain relevance. It involves fundamentally reimagining how an organization utilizes technology, personnel, and operational processes to deliver superior value to customers. In the past, companies viewed information technology merely as a support function dedicated to maintaining hardware and internal software infrastructure. Today, successful organizations place digital capabilities at the very core of their overarching business models and value propositions. Cloud computing, enterprise data lakes, and automated workflow platforms allow businesses to break down information silos across organizational departments. As cross-functional teams access real-time performance metrics, decision-making becomes significantly faster, more agile, and deeply data-driven. Nevertheless, numerous studies indicate that a large percentage of digital transformation initiatives fail to achieve their anticipated commercial outcomes. The primary obstacle is rarely inadequate software; rather, it is entrenched organizational culture and employee resistance to unfamiliar operational procedures. Without visionary leadership, transparent internal communication, and comprehensive training initiatives, workers naturally cling to established traditional routines. Therefore, forward-looking business leaders must recognize that genuine transformation is ultimately a cultural journey rather than solely a technological upgrade. By empowering employees to embrace innovation, enterprises can turn disruptive change into enduring competitive advantage. Organizations that foster agility, open collaboration, and continuous experimentation will emerge as the undisputed market leaders of tomorrow.",
    sentences: [
      {
        text: "Digital transformation has transitioned from an ambitious corporate buzzword into an urgent imperative for enterprises striving to maintain relevance.",
        translation: "디지털 전환은 야심 찬 기업 유행어에서 관련성과 경쟁력을 유지하기 위해 고군분투하는 기업들에게 시급한 필수 과제로 전환되었습니다."
      },
      {
        text: "It involves fundamentally reimagining how an organization utilizes technology, personnel, and operational processes to deliver superior value to customers.",
        translation: "그것은 조직이 고객에게 우수한 가치를 전달하기 위해 기술, 인력, 운영 프로세스를 활용하는 방식을 근본적으로 재구상하는 것을 포함합니다."
      },
      {
        text: "In the past, companies viewed information technology merely as a support function dedicated to maintaining hardware and internal software infrastructure.",
        translation: "과거에 기업들은 정보기술을 단지 하드웨어와 사내 소프트웨어 인프라를 유지하는 데 전념하는 지원 부서로만 여겼습니다."
      },
      {
        text: "Today, successful organizations place digital capabilities at the very core of their overarching business models and value propositions.",
        translation: "오늘날 성공적인 조직들은 전반적인 비즈니스 모델과 가치 제안의 바로 그 중심에 디지털 역량을 두고 있습니다."
      },
      {
        text: "Cloud computing, enterprise data lakes, and automated workflow platforms allow businesses to break down information silos across organizational departments.",
        translation: "클라우드 컴퓨팅, 엔터프라이즈 데이터 레이크, 자동화된 워크플로 플랫폼은 기업이 조직 부서 전반에 걸친 정보 사일로(부서 간 장벽)를 허물 수 있게 해줍니다."
      },
      {
        text: "As cross-functional teams access real-time performance metrics, decision-making becomes significantly faster, more agile, and deeply data-driven.",
        translation: "부서 간 협업 팀들이 실시간 성과 지표에 접근함에 따라, 의사결정은 훨씬 더 빠르고 민첩하며 철저히 데이터 중심적으로 변합니다."
      },
      {
        text: "Nevertheless, numerous studies indicate that a large percentage of digital transformation initiatives fail to achieve their anticipated commercial outcomes.",
        translation: "그럼에도 불구하고 많은 연구들은 상당한 비율의 디지털 전환 프로젝트가 기대했던 상업적 성과를 달성하는 데 실패한다고 지적합니다."
      },
      {
        text: "The primary obstacle is rarely inadequate software; rather, it is entrenched organizational culture and employee resistance to unfamiliar operational procedures.",
        translation: "주된 장애물은 소프트웨어의 부적절함인 경우가 드물며, 오히려 뿌리 깊은 조직 문화와 낯선 업무 절차에 대한 직원들의 저항입니다."
      },
      {
        text: "Without visionary leadership, transparent internal communication, and comprehensive training initiatives, workers naturally cling to established traditional routines.",
        translation: "통찰력 있는 리더십, 투명한 내부 소통, 종합적인 교육 지원이 없다면 직원들은 자연스럽게 기존의 전통적인 방식에 매달리게 됩니다."
      },
      {
        text: "Therefore, forward-looking business leaders must recognize that genuine transformation is ultimately a cultural journey rather than solely a technological upgrade.",
        translation: "그러므로 미래지향적인 비즈니스 리더들은 진정한 전환이 단순히 기술적인 업그레이드가 아니라 궁극적으로 문화적인 여정임을 인식해야 합니다."
      },
      {
        text: "By empowering employees to embrace innovation, enterprises can turn disruptive change into enduring competitive advantage.",
        translation: "직원들이 혁신을 수용하도록 역량을 부여함으로써, 기업은 파괴적인 변화를 지속적인 경쟁 우위로 전환할 수 있습니다."
      },
      {
        text: "Organizations that foster agility, open collaboration, and continuous experimentation will emerge as the undisputed market leaders of tomorrow.",
        translation: "민첩성, 열린 협업, 지속적인 실험을 육성하는 조직이 내일의 반박할 수 없는 시장 선도자로 떠오를 것입니다."
      }
    ],
    vocabulary: [
      {
        word: "imperative",
        pos: "noun",
        meaning: "필수적인 과제, 긴급한 명령",
        example: "Customer retention has become an urgent strategic imperative for the bank.",
        synonyms: ["necessity", "requirement", "priority"]
      },
      {
        word: "proposition",
        pos: "noun",
        meaning: "제안, 명제, 사업 구상",
        example: "The firm's core value proposition is delivering fast cloud security.",
        synonyms: ["proposal", "statement", "premise"]
      },
      {
        word: "silo",
        pos: "noun",
        meaning: "(부서 간의) 장벽, 사일로",
        example: "Breaking down departmental silos improves company-wide communication.",
        synonyms: ["isolation", "compartment", "barrier"]
      },
      {
        word: "agile",
        pos: "adjective",
        meaning: "민첩한, 유연한",
        example: "Agile product teams respond quickly to changing customer needs.",
        synonyms: ["nimble", "adaptable", "flexible"]
      },
      {
        word: "entrenched",
        pos: "adjective",
        meaning: "뿌리 깊은, 견고하게 자리 잡은",
        example: "Changing entrenched workplace habits requires consistent management effort.",
        synonyms: ["ingrained", "established", "deep-rooted"]
      },
      {
        word: "visionary",
        pos: "adjective",
        meaning: "통찰력 있는, 비전이 있는",
        example: "Visionary leaders inspire teams to embrace digital innovation.",
        synonyms: ["forward-thinking", "farsighted", "prophetic"]
      },
      {
        word: "cling",
        pos: "verb",
        meaning: "매달리다, 집착하다, 고수하다",
        example: "Older managers may cling to outdated paper processes.",
        synonyms: ["adhere", "hold on", "stick"]
      },
      {
        word: "experimentation",
        pos: "noun",
        meaning: "실험, 시도",
        example: "Continuous product experimentation allows tech startups to discover new features.",
        synonyms: ["testing", "trial", "exploration"]
      },
      {
        word: "undisputed",
        pos: "adjective",
        meaning: "반박의 여지가 없는, 공인된",
        example: "The corporation is the undisputed leader in cloud computing infrastructure.",
        synonyms: ["unquestioned", "acknowledged", "undeniable"]
      },
      {
        word: "disruptive",
        pos: "adjective",
        meaning: "파괴적인, 혁신적인",
        example: "Disruptive digital models frequently displace established legacy firms.",
        synonyms: ["revolutionary", "groundbreaking", "radical"]
      }
    ],
    grammar: [
      {
        title: "간접의문문 목적어절 (how + 주어 + 동사)",
        explanation: "타동사(reimagining 등)의 목적어로 사용되는 명사절로서 어순은 '의문사 + 주어 + 동사'를 유지합니다.",
        passageExample: "It involves fundamentally reimagining how an organization utilizes technology, personnel, and operational processes...",
        additionalExample: "The consultant analyzed how the sales team handles incoming corporate leads.",
        question: {
          question: "다음 빈칸에 어순상 올바른 것을 고르시오: Digital transformation changes ______ daily business operations.",
          options: ["how companies conduct", "how do companies conduct", "how conducting companies", "how have companies conducted"],
          answer: 0,
          explanation: "간접의문문의 어순은 '의문사 + 주어 + 동사' 평서문 어순이므로 'how companies conduct'가 올바릅니다."
        }
      },
      {
        title: "대조의 세미콜론과 rather 부사 구문",
        explanation: "부정문 뒤에 세미콜론(;)과 'rather'를 사용하여 'A가 아니라 오히려 B이다'라는 강한 대조를 나타냅니다.",
        passageExample: "The primary obstacle is rarely inadequate software; rather, it is entrenched organizational culture...",
        additionalExample: "The problem is not a lack of capital; rather, it is the absence of strategic focus.",
        question: {
          question: "다음 문장의 빈칸에 알맞은 연결사를 고르시오: The delay was not caused by hardware failure; ______, human error was responsible.",
          options: ["rather", "moreover", "similarly", "otherwise"],
          answer: 0,
          explanation: "앞의 부정적 내용(원인이 하드웨어가 아님)을 받아 '오히려 (사람의 실수이다)'라고 대조하므로 'rather'가 알맞습니다."
        }
      },
      {
        title: "수단과 방법의 By + -ing 전치사구",
        explanation: "'By + 동명사'는 '~함으로써'라는 뜻으로 주절의 결과를 이루기 위한 구체적인 수단과 방법을 제시합니다.",
        passageExample: "By empowering employees to embrace innovation, enterprises can turn disruptive change into enduring competitive advantage.",
        additionalExample: "By investing in employee training, the firm achieved higher operational efficiency.",
        question: {
          question: "다음 빈칸에 알맞은 형태를 고르시오: By ______ departmental silos, management fostered cross-team collaboration.",
          options: ["dismantling", "dismantled", "to dismantle", "dismantles"],
          answer: 0,
          explanation: "전치사 By 뒤에서 수단을 나타내는 동명사 자리이므로 'dismantling'이 적절합니다."
        }
      }
    ],
    readingQuestions: [
      {
        id: "rq1",
        type: "multiple_choice",
        question: "According to the passage, what is the primary reason why many digital transformations fail?",
        options: [
          "A shortage of advanced hardware in international markets",
          "Entrenched organizational culture and employee resistance to new procedures",
          "Government regulations completely prohibiting enterprise software",
          "Excessive spending on social media advertising campaigns"
        ],
        answer: 1,
        explanation: "본문 8번째 문장에 주된 장애물은 소프트웨어 결함이 아니라 뿌리 깊은 조직 문화와 직원의 저항이라고 분명히 명시되어 있습니다."
      },
      {
        id: "rq2",
        type: "multiple_choice",
        question: "How has the corporate view of information technology (IT) shifted over time?",
        options: [
          "From a core strategic driver to an outsourced administrative nuisance",
          "From a mere back-office support function to the very core of business models",
          "From cloud computing platforms back to paper-based manual bookkeeping",
          "From high executive priority to complete abandonment across enterprises"
        ],
        answer: 1,
        explanation: "본문 3~4번째 문장에서 과거 단순 지원 기능에 불과했던 IT가 오늘날 비즈니스 모델과 가치 제안의 핵심으로 자리 잡았다고 설명합니다."
      },
      {
        id: "rq3",
        type: "multiple_choice",
        question: "What conclusion does the author draw regarding genuine digital transformation?",
        options: [
          "It is merely a marketing slogan with no practical business impact.",
          "It is fundamentally a cultural journey rather than just a technological upgrade.",
          "It requires firing all legacy staff and hiring solely teenagers.",
          "It can be completed instantaneously in a single afternoon."
        ],
        answer: 1,
        explanation: "본문 10번째 문장에서 진정한 전환은 단순한 기술 업그레이드가 아니라 궁극적으로 문화적 여정임을 인식해야 한다고 결론짓고 있습니다."
      },
      {
        id: "rq4",
        type: "short_answer",
        question: "기업 내 부서 간 장벽(사일로)을 허물고 실시간 성과 지표를 공유했을 때 나타나는 의사결정의 변화를 본문에서 찾아 서술하시오.",
        referenceAnswer: "의사결정이 훨씬 빨라지고(faster), 더욱 민첩해지며(more agile), 철저히 데이터 중심적(data-driven)이 된다.",
        keywords: ["의사결정", "빠르고", "민첩", "데이터 중심", "agile", "data-driven"]
      }
    ],
    listeningQuestions: [
      {
        id: "lq1",
        sentenceIndex: 2,
        question: "3번째 문장에서 과거 기업들이 정보기술(IT)을 바라보았던 시각은 어떠했는가?",
        options: ["사내 하드웨어 및 인프라를 유지하는 단순 지원 부서", "기업의 전사적 미래 비전을 이끄는 최고 권력 기관", "외부 투자자에게 주식을 판매하는 금융 부서", "신입 사원을 채용하는 인사 총괄 부서"],
        answer: 0,
        explanation: "3번째 문장은 과거 기업들이 IT를 하드웨어와 사내 소프트웨어를 유지하는 단순 지원 기능으로 보았다고 설명합니다."
      },
      {
        id: "lq2",
        sentenceIndex: 7,
        question: "8번째 문장에서 디지털 전환을 가로막는 가장 큰 장애물로 지적된 것은?",
        options: ["소프트웨어의 기능 부족", "뿌리 깊은 조직 문화와 직원의 저항", "클라우드 서버의 전기 요금 상승", "사무용 컴퓨터 모니터의 결함"],
        answer: 1,
        explanation: "8번째 문장은 장애물이 소프트웨어 부족이 아니라 뿌리 깊은 조직 문화와 직원의 저항이라고 설명합니다."
      }
    ],
    speakingTask: {
      prompt: "How can enterprise leaders persuade reluctant employees to adopt new digital tools and working methods?",
      sampleAnswer: "Enterprise leaders can persuade hesitant employees by demonstrating how digital tools eliminate tedious manual work and make daily tasks easier. Additionally, management must provide comprehensive, patient training programs and foster a safe culture where making mistakes while learning new software is accepted rather than penalized.",
      keyPoints: ["transparent communication of personal benefits", "comprehensive training and support", "supportive culture that encourages experimentation"]
    }
  },

  // =========================================================================
  // 지문 8: Interest Rates and Monetary Policy (고급)
  // =========================================================================
  {
    id: "passage-008",
    title: "Interest Rates and Monetary Policy",
    titleKo: "금리와 통화정책의 영향",
    level: "advanced",
    topic: "거시경제/통화정책",
    type: "default",
    wordCount: 264,
    text: "Central banks wield enormous influence over macroeconomic stability through their implementation of monetary policy, primarily by manipulating benchmark interest rates. When an economy experiences sluggish growth or enters a recession, monetary authorities typically lower interest rates to encourage borrowing and capital expenditure. Reduced borrowing costs incentivize commercial corporations to finance new factories, hire additional personnel, and invest aggressively in research and development. Concurrently, lower mortgage and auto loan rates stimulate consumer spending, thereby circulating liquidity throughout the broader financial ecosystem. Conversely, when rampant consumer demand and geopolitical supply shocks push inflation well above acceptable targets, central bankers must intervene decisively. By executing aggressive interest rate hikes, the central bank intentionally elevates the cost of capital, making loans substantially more expensive for households and enterprises alike. This deliberate cooling mechanism curtails aggregate consumer spending and slows business expansion, which gradually dampens inflationary pressures across commodity and consumer goods. However, orchestrating a seamless economic adjustment—widely referred to as a \"soft landing\"—represents an extraordinary macroeconomic tightrope walk for central bank governors. If monetary tightening is implemented too rapidly or maintained for too prolonged a period, it risks precipitating an unintended economic contraction and soaring unemployment. Financial market participants meticulously scrutinize policy statements and economic indicators, attempting to anticipate the delicate inflection point where tightening transitions to easing. In an interconnected financial environment, decisions made by major central banks also generate profound spillover effects on exchange rates and capital flows across emerging markets. Consequently, transparent communication and data-dependent decision-making remain paramount as monetary authorities balance full employment with long-term price stability. This reality underscores why monetary policy is globally observed with such vigilance.",
    sentences: [
      {
        text: "Central banks wield enormous influence over macroeconomic stability through their implementation of monetary policy, primarily by manipulating benchmark interest rates.",
        translation: "중앙은행은 주로 기준금리를 조정함으로써 통화정책을 집행하여 거시경제적 안정에 막대한 영향력을 행사합니다."
      },
      {
        text: "When an economy experiences sluggish growth or enters a recession, monetary authorities typically lower interest rates to encourage borrowing and capital expenditure.",
        translation: "경제가 부진한 성장을 겪거나 불황에 진입할 때, 통화 당국은 일반적으로 대출과 자본 지출을 장려하기 위해 금리를 인하합니다."
      },
      {
        text: "Reduced borrowing costs incentivize commercial corporations to finance new factories, hire additional personnel, and invest aggressively in research and development.",
        translation: "낮아진 차입 비용은 상업 기업들이 새로운 공장을 짓고, 인력을 추가로 고용하며, 연구개발에 공격적으로 투자하도록 유인합니다."
      },
      {
        text: "Concurrently, lower mortgage and auto loan rates stimulate consumer spending, thereby circulating liquidity throughout the broader financial ecosystem.",
        translation: "동시에 더 낮아진 주택담보대출 및 자동차 대출 금리는 소비자의 지출을 자극하여 더 광범위한 금융 생태계 전반에 유동성을 순환시킵니다."
      },
      {
        text: "Conversely, when rampant consumer demand and geopolitical supply shocks push inflation well above acceptable targets, central bankers must intervene decisively.",
        translation: "반대로 걷잡을 수 없는 소비자 수요와 지정학적 공급 충격이 인플레이션을 용인 가능한 목표치 훨씬 위로 밀어올릴 때, 중앙은행 관계자들은 단호하게 개입해야 합니다."
      },
      {
        text: "By executing aggressive interest rate hikes, the central bank intentionally elevates the cost of capital, making loans substantially more expensive for households and enterprises alike.",
        translation: "공격적인 금리 인상을 단행함으로써 중앙은행은 의도적으로 자본 비용을 높여 가계와 기업 모두에게 대출을 훨씬 더 비싸게 만듭니다."
      },
      {
        text: "This deliberate cooling mechanism curtails aggregate consumer spending and slows business expansion, which gradually dampens inflationary pressures across commodity and consumer goods.",
        translation: "이러한 의도적인 냉각 메커니즘은 총소비 지출을 억제하고 기업 확장을 둔화시켜, 원자재와 소비재 전반에 걸친 인플레이션 압력을 점진적으로 누그러뜨립니다."
      },
      {
        text: "However, orchestrating a seamless economic adjustment—widely referred to as a \"soft landing\"—represents an extraordinary macroeconomic tightrope walk for central bank governors.",
        translation: "하지만 널리 '연착륙(soft landing)'이라 불리는 매끄러운 경제 조정을 연출하는 것은 중앙은행 총재들에게 엄청난 거시경제적 줄타기를 의미합니다."
      },
      {
        text: "If monetary tightening is implemented too rapidly or maintained for too prolonged a period, it risks precipitating an unintended economic contraction and soaring unemployment.",
        translation: "만약 통화 긴축이 너무 급격히 시행되거나 지나치게 오랜 기간 유지될 경우, 의도치 않은 경기 위축과 실업률 급등을 촉발할 위험이 있습니다."
      },
      {
        text: "Financial market participants meticulously scrutinize policy statements and economic indicators, attempting to anticipate the delicate inflection point where tightening transitions to easing.",
        translation: "금융 시장 참여자들은 긴축이 완화로 전환되는 미묘한 변곡점을 예측하고자 정책 성명서와 경제 지표를 면밀하게 조사합니다."
      },
      {
        text: "In an interconnected financial environment, decisions made by major central banks also generate profound spillover effects on exchange rates and capital flows across emerging markets.",
        translation: "상호 연결된 금융 환경에서 주요 중앙은행의 결정은 신흥 시장 전반의 환율과 자본 흐름에 지대한 파급 효과를 불러일으킵니다."
      },
      {
        text: "Consequently, transparent communication and data-dependent decision-making remain paramount as monetary authorities balance full employment with long-term price stability.",
        translation: "결과적으로 통화 당국이 완전 고용과 장기적 물가 안정 사이에서 균형을 잡을 때 투명한 소통과 데이터에 기반한 의사결정이 무엇보다 중요하게 남습니다."
      },
      {
        text: "This reality underscores why monetary policy is globally observed with such vigilance.",
        translation: "이러한 현실은 왜 통화정책이 전 세계적으로 그토록 각별한 경계심을 갖고 관찰되는지를 잘 보여줍니다."
      }
    ],
    vocabulary: [
      {
        word: "benchmark",
        pos: "noun",
        meaning: "기준, 척도, 벤치마크",
        example: "The Federal Reserve's benchmark rate influences global lending costs.",
        synonyms: ["standard", "reference point", "gauge"]
      },
      {
        word: "manipulate",
        pos: "verb",
        meaning: "조정하다, 능숙하게 다루다",
        example: "Central authorities manipulate interbank interest rates to steer the economy.",
        synonyms: ["adjust", "influence", "control"]
      },
      {
        word: "sluggish",
        pos: "adjective",
        meaning: "부진한, 침체된, 느린",
        example: "The economy endured three quarters of sluggish consumer spending.",
        synonyms: ["stagnant", "slow", "lethargic"]
      },
      {
        word: "incentivize",
        pos: "verb",
        meaning: "유인을 제공하다, 장려하다",
        example: "Lower loan rates incentivize firms to expand manufacturing operations.",
        synonyms: ["encourage", "motivate", "stimulate"]
      },
      {
        word: "rampant",
        pos: "adjective",
        meaning: "걷잡을 수 없는, 만연한",
        example: "Rampant inflation eroded purchasing power across lower-income families.",
        synonyms: ["uncontrolled", "unchecked", "runaway"]
      },
      {
        word: "aggregate",
        pos: "adjective",
        meaning: "총체적인, 집합적인",
        example: "Aggregate economic demand determines gross domestic product output.",
        synonyms: ["total", "cumulative", "combined"]
      },
      {
        word: "curtail",
        pos: "verb",
        meaning: "축소하다, 억제하다",
        example: "Rising rates forced businesses to curtail discretionary travel budgets.",
        synonyms: ["reduce", "restrict", "curb"]
      },
      {
        word: "precipitate",
        pos: "verb",
        meaning: "촉발하다, 재촉하다",
        example: "Sudden credit contractions can precipitate a wider industrial recession.",
        synonyms: ["trigger", "hasten", "instigate"]
      },
      {
        word: "scrutinize",
        pos: "verb",
        meaning: "면밀히 조사하다, 검토하다",
        example: "Wall Street analysts scrutinize every word in central bank press releases.",
        synonyms: ["examine", "inspect", "dissect"]
      },
      {
        word: "spillover",
        pos: "noun",
        meaning: "파급 효과, 전이",
        example: "US interest rate hikes had severe spillover effects on emerging currencies.",
        synonyms: ["repercussion", "byproduct", "ripple effect"]
      }
    ],
    grammar: [
      {
        title: "결과/수단의 분사구문 (thereby + -ing)",
        explanation: "앞선 사실이나 행동의 결과로 일어난 일을 부사 'thereby(그로 인하여)'와 현재분사(-ing)를 결합하여 압축적으로 표현합니다.",
        passageExample: "stimulate consumer spending, thereby circulating liquidity throughout the broader financial ecosystem.",
        additionalExample: "The bank reduced reserve requirements, thereby freeing up capital for small business loans.",
        question: {
          question: "다음 빈칸에 알맞은 형태를 고르시오: The government cut corporate taxes, thereby ______ domestic investment.",
          options: ["stimulating", "stimulated", "stimulate", "stimulates"],
          answer: 0,
          explanation: "'thereby' 뒤에서 앞 절의 직접적인 결과로 이어지는 동작을 나타내는 분사구문이므로 'stimulating'이 올바릅니다."
        }
      },
      {
        title: "위험 초래를 나타내는 동사구 (risk + -ing)",
        explanation: "'risk'가 타동사로 사용될 때 목적어로 동명사(-ing)를 취하여 '~하는 위험을 무릅쓰다/초래하다'의 의미를 갖습니다.",
        passageExample: "If monetary tightening is implemented too rapidly..., it risks precipitating an unintended economic contraction...",
        additionalExample: "Holding excess cash during inflation risks eroding real purchasing power.",
        question: {
          question: "다음 빈칸에 알맞은 형태를 고르시오: Raising rates prematurely risks ______ a fragile industrial recovery.",
          options: ["stifling", "to stifle", "stifled", "stifle"],
          answer: 0,
          explanation: "동사 risk는 동명사를 목적어로 취하므로 'stifling'이 정답입니다."
        }
      },
      {
        title: "관계부사 where를 통한 추상적 시점/변곡점 수식",
        explanation: "시간적 또는 추상적 전환점(inflection point, juncture 등)을 선행사로 받아 그 상황에서의 동작을 설명하는 관계부사 where 절입니다.",
        passageExample: "attempting to anticipate the delicate inflection point where tightening transitions to easing.",
        additionalExample: "Economists identified a key threshold where consumer savings turn negative.",
        question: {
          question: "다음 빈칸에 문맥상 가장 알맞은 관계사를 고르시오: Central bankers look for the critical juncture ______ interest rate cuts become necessary.",
          options: ["where", "which", "whom", "whose"],
          answer: 0,
          explanation: "추상적인 시점 및 국면(juncture)을 선행사로 두고 완전한 절이 이어지므로 관계부사 'where'가 적절합니다."
        }
      }
    ],
    readingQuestions: [
      {
        id: "rq1",
        type: "multiple_choice",
        question: "Why do central banks raise interest rates during periods of high inflation?",
        options: [
          "To elevate the cost of capital, reduce aggregate spending, and cool rising prices",
          "To force commercial banks into bankruptcy and nationalize finance",
          "To encourage households to take on excessive auto loans and mortgages",
          "To immediately stop all international trade and cross-border currency flows"
        ],
        answer: 0,
        explanation: "본문 6~7번째 문장에서 금리 인상을 통해 의도적으로 자본 비용을 높여 총소비 지출을 줄이고 인플레이션 압력을 낮춘다고 설명합니다."
      },
      {
        id: "rq2",
        type: "multiple_choice",
        question: "What does the term 'soft landing' mean in the context of the passage?",
        options: [
          "Crashing the national currency to promote export volume",
          "Slowing economic inflation without causing an outright recession",
          "Eliminating all environmental regulations for aerospace firms",
          "Distributing physical cash directly to all citizens"
        ],
        answer: 1,
        explanation: "본문 8~9번째 문장에서 경기 침체나 극단적 실업률 급등을 유발하지 않고 인플레이션을 매끄럽게 조정하는 것을 'soft landing(연착륙)'으로 지칭하고 있습니다."
      },
      {
        id: "rq3",
        type: "multiple_choice",
        question: "According to the passage, what international risk arises from major central bank policy shifts?",
        options: [
          "Profound spillover effects on exchange rates and capital flows in emerging markets",
          "Automatic dissolution of international diplomatic treaties",
          "Global standardization of corporate income tax rates",
          "Immediate cessation of all maritime cargo shipping"
        ],
        answer: 0,
        explanation: "본문 11번째 문장에 주요 중앙은행의 결정이 신흥 시장의 환율과 자본 흐름에 지대한 파급 효과(spillover effects)를 미친다고 기술되어 있습니다."
      },
      {
        id: "rq4",
        type: "short_answer",
        question: "중앙은행이 경기 침체기에 기준금리를 인하했을 때 경제 전반에 유동성이 순환되는 과정을 본문을 참고하여 설명하시오.",
        referenceAnswer: "차입 비용이 낮아져 기업은 시설 투자와 고용을 늘리고, 가계는 대출 금리 인하로 소비를 확대하여 경제 전반에 유동성이 돌게 된다.",
        keywords: ["차입 비용", "투자", "고용", "소비 지출", "유동성", "borrowing costs", "liquidity"]
      }
    ],
    listeningQuestions: [
      {
        id: "lq1",
        sentenceIndex: 1,
        question: "2번째 문장에서 경제가 침체기에 빠졌을 때 통화 당국이 취하는 일반적인 조치는?",
        options: ["대출과 투자를 촉진하기 위해 기준금리를 인하함", "물가 폭등을 위해 화폐를 소각함", "모든 상업 은행의 대출을 전면 금지함", "법인세를 두 배로 인상함"],
        answer: 0,
        explanation: "2번째 문장은 'typically lower interest rates to encourage borrowing and capital expenditure'라고 명시했습니다."
      },
      {
        id: "lq2",
        sentenceIndex: 8,
        question: "9번째 문장에서 통화 긴축을 너무 급격히 시행하거나 장기간 유지할 경우의 위험은?",
        options: ["의도치 않은 경기 위축과 실업률 급등", "과도한 경제 호황과 노동력 부족", "신용카드 포인트의 강제 소멸", "전 국민의 무이자 대출 전환"],
        answer: 0,
        explanation: "9번째 문장은 'precipitating an unintended economic contraction and soaring unemployment'라고 지적합니다."
      }
    ],
    speakingTask: {
      prompt: "How do central bank interest rate decisions directly affect the daily financial lives of ordinary university students or consumers?",
      sampleAnswer: "Central bank interest rate decisions directly impact ordinary people through borrowing costs and savings returns. When rates rise, interest on student loans, credit card balances, and mortgages increases, reducing disposable income for everyday spending. Conversely, savers earn higher yields on deposit accounts, encouraging people to save rather than spend impulsively.",
      keyPoints: ["impact on student loan and mortgage interest", "changes in savings account yields", "influence on disposable income and spending behavior"]
    }
  },

  // =========================================================================
  // 지문 9: Climate Change and ESG Investment (고급)
  // =========================================================================
  {
    id: "passage-009",
    title: "Climate Change and ESG Investment",
    titleKo: "기후변화와 ESG 투자",
    level: "advanced",
    topic: "환경/ESG",
    type: "default",
    wordCount: 256,
    text: "Climate change has rapidly evolved from an ecological concern into a monumental structural challenge confronting global capital markets. As extreme meteorological events, regulatory mandates, and shifting consumer expectations accelerate, institutional investors are fundamentally altering how they evaluate corporate risk and profitability. The rapid ascent of ESG investing—which evaluates Environmental, Social, and Governance factors—reflects this profound philosophical shift within international finance. Rather than relying exclusively on traditional balance sheets and historical quarterly earnings, asset managers increasingly integrate sustainability metrics into their valuation algorithms. Companies that fail to decarbonize their supply chains face severe liabilities, including crippling carbon tariffs, physical asset destruction, and stranded fossil fuel reserves. Conversely, enterprises pioneering renewable energy technologies, closed-loop circular manufacturing, and energy-efficient architecture are attracting immense inflows of institutional capital. However, the unprecedented expansion of green finance has simultaneously given rise to widespread allegations of \"greenwashing.\" In this dubious practice, certain corporations deceptively exaggerate their environmental credentials through polished marketing campaigns while continuing ecologically destructive operations behind closed doors. In response, international regulatory agencies and standard-setting bodies are establishing standardized taxonomy guidelines and mandatory carbon disclosure rules. These regulatory frameworks require third-party auditing to verify that sustainable funds genuinely allocate capital toward impactful, low-carbon solutions. Ultimately, authentic ESG integration is not mere corporate altruism, but a sophisticated risk mitigation strategy for navigating a carbon-constrained global economy. As climate disclosure standards mature worldwide, capital allocation will inevitably reward those businesses that harmonize economic prosperity with planetary stewardship. Investors who ignore these fundamental dynamics risk holding depreciating assets in an increasingly sustainable marketplace.",
    sentences: [
      {
        text: "Climate change has rapidly evolved from an ecological concern into a monumental structural challenge confronting global capital markets.",
        translation: "기후변화는 생태학적 우려에서 전 세계 자본 시장이 직면한 기념비적인 구조적 도전 과제로 빠르게 진화했습니다."
      },
      {
        text: "As extreme meteorological events, regulatory mandates, and shifting consumer expectations accelerate, institutional investors are fundamentally altering how they evaluate corporate risk and profitability.",
        translation: "극단적인 기상 이변, 규제상의 법적 명령, 변화하는 소비자 기대가 가속화됨에 따라 기관 투자자들은 기업의 위험과 수익성을 평가하는 방식을 근본적으로 바꾸고 있습니다."
      },
      {
        text: "The rapid ascent of ESG investing—which evaluates Environmental, Social, and Governance factors—reflects this profound philosophical shift within international finance.",
        translation: "환경(Environmental), 사회(Social), 지배구조(Governance) 요소를 평가하는 ESG 투자의 급속한 부상은 국제 금융계 내부의 심오한 철학적 변화를 반영합니다."
      },
      {
        text: "Rather than relying exclusively on traditional balance sheets and historical quarterly earnings, asset managers increasingly integrate sustainability metrics into their valuation algorithms.",
        translation: "자산 운용사들은 전통적인 대차대조표와 과거의 분기별 실적에만 배타적으로 의존하기보다는, 지속가능성 지표를 기업 가치 평가 알고리즘에 점점 더 통합하고 있습니다."
      },
      {
        text: "Companies that fail to decarbonize their supply chains face severe liabilities, including crippling carbon tariffs, physical asset destruction, and stranded fossil fuel reserves.",
        translation: "공급망을 탈탄소화하지 못하는 기업들은 막대한 탄소 국경세, 물리적 자산 파괴, 좌초된 화석 연료 매장량 등 심각한 부채와 책임을 마주하게 됩니다."
      },
      {
        text: "Conversely, enterprises pioneering renewable energy technologies, closed-loop circular manufacturing, and energy-efficient architecture are attracting immense inflows of institutional capital.",
        translation: "반대로 재생에너지 기술, 폐쇄형 순환 제조, 에너지 효율적 건축을 선도하는 기업들은 막대한 기관 자본의 유입을 끌어들이고 있습니다."
      },
      {
        text: "However, the unprecedented expansion of green finance has simultaneously given rise to widespread allegations of \"greenwashing.\"",
        translation: "그러나 녹색 금융의 전례 없는 확장은 동시에 '그린워싱(위장 환경주의)'에 대한 광범위한 혐의를 낳았습니다."
      },
      {
        text: "In this dubious practice, certain corporations deceptively exaggerate their environmental credentials through polished marketing campaigns while continuing ecologically destructive operations behind closed doors.",
        translation: "이 의심스러운 관행 속에서 일부 기업들은 밀실에서 생태학적으로 파괴적인 운영을 지속하면서도 세련된 마케팅 캠페인을 통해 환경적 자격을 기만적으로 과장합니다."
      },
      {
        text: "In response, international regulatory agencies and standard-setting bodies are establishing standardized taxonomy guidelines and mandatory carbon disclosure rules.",
        translation: "이에 대응하여 국제 규제 기관과 표준 제정 기구들은 표준화된 녹색분류체계(택소노미) 가이드라인과 의무적인 탄소 공시 규정을 제정하고 있습니다."
      },
      {
        text: "These regulatory frameworks require third-party auditing to verify that sustainable funds genuinely allocate capital toward impactful, low-carbon solutions.",
        translation: "이러한 규제 프레임워크는 지속가능 펀드가 진정으로 영향력 있고 저탄소인 솔루션에 자본을 배분하는지 검증하기 위해 제3자 감사를 요구합니다."
      },
      {
        text: "Ultimately, authentic ESG integration is not mere corporate altruism, but a sophisticated risk mitigation strategy for navigating a carbon-constrained global economy.",
        translation: "궁극적으로 진정한 ESG 통합은 단순한 기업의 이타주의가 아니라 탄소 제약이 따르는 글로벌 경제를 헤쳐나가기 위한 정교한 위험 완화 전략입니다."
      },
      {
        text: "As climate disclosure standards mature worldwide, capital allocation will inevitably reward those businesses that harmonize economic prosperity with planetary stewardship.",
        translation: "전 세계적으로 기후 공시 기준이 성숙해짐에 따라, 자본 배분은 경제적 번영과 지구에 대한 관리 책임을 조화시키는 기업들에게 필연적으로 보상을 안겨줄 것입니다."
      },
      {
        text: "Investors who ignore these fundamental dynamics risk holding depreciating assets in an increasingly sustainable marketplace.",
        translation: "이러한 근본적인 역학을 무시하는 투자자들은 점점 더 지속가능해지는 시장에서 가치가 하락하는 자산을 보유하게 될 위험을 감수해야 합니다."
      }
    ],
    vocabulary: [
      {
        word: "monumental",
        pos: "adjective",
        meaning: "기념비적인, 엄청난",
        example: "The global energy transition is a monumental economic undertaking.",
        synonyms: ["massive", "enormous", "colossal"]
      },
      {
        word: "mandate",
        pos: "noun",
        meaning: "명령, 법적 요구, 권한",
        example: "Government mandates require zero-emission public transport by 2030.",
        synonyms: ["decree", "directive", "order"]
      },
      {
        word: "valuation",
        pos: "noun",
        meaning: "평가, 가치 산정",
        example: "The company's valuation tumbled due to heavy environmental liabilities.",
        synonyms: ["appraisal", "assessment", "estimation"]
      },
      {
        word: "decarbonize",
        pos: "verb",
        meaning: "탈탄소화하다",
        example: "Steelmakers are testing green hydrogen to decarbonize heavy manufacturing.",
        synonyms: ["abate carbon", "electrify", "cleanse"]
      },
      {
        word: "stranded",
        pos: "adjective",
        meaning: "좌초된, 쓸모없게 된",
        example: "Coal mines risk becoming stranded assets as renewable energy costs plunge.",
        synonyms: ["abandoned", "obsolete", "immobilized"]
      },
      {
        word: "greenwashing",
        pos: "noun",
        meaning: "그린워싱 (위장 환경주의)",
        example: "Regulators levied heavy fines against the oil conglomerate for greenwashing.",
        synonyms: ["deceptive eco-marketing", "eco-whitewashing", "false pretenses"]
      },
      {
        word: "taxonomy",
        pos: "noun",
        meaning: "분류 체계, 녹색분류체계",
        example: "The European Union green taxonomy defines which energy projects qualify as sustainable.",
        synonyms: ["classification", "categorization", "typology"]
      },
      {
        word: "altruism",
        pos: "noun",
        meaning: "이타주의, 자선심",
        example: "ESG investing is driven by risk management rather than moral altruism.",
        synonyms: ["philanthropy", "selflessness", "benevolence"]
      },
      {
        word: "stewardship",
        pos: "noun",
        meaning: "관리 책임, 청지기 정신",
        example: "Corporate stewardship requires protecting ecosystems for future generations.",
        synonyms: ["governance", "care", "guardianship"]
      }
    ],
    grammar: [
      {
        title: "동격 또는 부연의 대시(—)와 관계대명사 삽입절",
        explanation: "문장 중간에 대시(—)를 사용하여 개념을 정의하거나 부연하는 관계사절을 삽입함으로써 전문 용어를 명확히 설명합니다.",
        passageExample: "The rapid ascent of ESG investing—which evaluates Environmental, Social, and Governance factors—reflects this profound philosophical shift...",
        additionalExample: "The Paris Climate Agreement—which was signed in 2015—established global warming limits.",
        question: {
          question: "다음 빈칸에 알맞은 관계사를 고르시오: Green bond financing—______ funds renewable energy installations—experienced record global issuance.",
          options: ["which", "what", "where", "whom"],
          answer: 0,
          explanation: "사물 명사(Green bond financing)를 선행사로 받아 부연하는 주격 관계대명사 자리이므로 'which'가 적절합니다."
        }
      },
      {
        title: "5형식 동사 require + 목적어 + to부정사",
        explanation: "require, compel, oblige 등 의무나 요구를 나타내는 동사는 '목적어 + to부정사' 구조를 취해 '~에게 ...하도록 요구하다'를 나타냅니다.",
        passageExample: "These regulatory frameworks require third-party auditing to verify that sustainable funds genuinely allocate capital...",
        additionalExample: "New environmental statutes require multinational corporations to report their carbon footprints annually.",
        question: {
          question: "다음 빈칸에 알맞은 형태를 고르시오: Regulators require publicly traded companies ______ their emissions data.",
          options: ["to disclose", "disclosing", "disclose", "disclosed"],
          answer: 0,
          explanation: "'require + 목적어 + to부정사' 구문이므로 'to disclose'가 올바릅니다."
        }
      },
      {
        title: "상관접속사 not mere A, but B (단순한 A가 아니라 B이다)",
        explanation: "오해하기 쉬운 통념(단순한 자선이나 이타심)을 부정하고 본질(정교한 리스크 관리 전략)을 강조할 때 사용되는 구문입니다.",
        passageExample: "authentic ESG integration is not mere corporate altruism, but a sophisticated risk mitigation strategy...",
        additionalExample: "Data privacy compliance is not mere paperwork, but an essential shield against brand destruction.",
        question: {
          question: "다음 문장의 빈칸에 들어갈 짝을 고르시오: The initiative is not mere promotional rhetoric, ______ a substantive operational overhaul.",
          options: ["but", "or", "so", "for"],
          answer: 0,
          explanation: "'not A, but B' 대조 구문이므로 'but'이 정답입니다."
        }
      }
    ],
    readingQuestions: [
      {
        id: "rq1",
        type: "multiple_choice",
        question: "What philosophical shift in international capital markets does the passage describe?",
        options: [
          "Moving away from all digital data back to fossil fuel dependence",
          "Integrating environmental, social, and governance factors into corporate risk evaluation",
          "Abolishing all auditing requirements for publicly traded corporations",
          "Refusing to invest in any technological innovation or renewable energy"
        ],
        answer: 1,
        explanation: "본문 2~4번째 문장에서 기관 투자자들이 재무제표뿐만 아니라 지속가능성 및 ESG 지표를 가치 평가에 통합하는 철학적 변화를 겪고 있다고 설명합니다."
      },
      {
        id: "rq2",
        type: "multiple_choice",
        question: "What severe consequences do companies face if they fail to decarbonize?",
        options: [
          "Crushing carbon tariffs, physical destruction, and stranded fossil assets",
          "Automatic tax exemptions granted by the World Trade Organization",
          "Immediate doubling of market valuation by Wall Street banks",
          "Guaranteed exclusion from all national regulatory frameworks"
        ],
        answer: 0,
        explanation: "본문 5번째 문장에 공급망을 탈탄소화하지 못하는 기업은 탄소 국경세, 자산 파괴, 좌초 자산 등 심각한 위험에 처한다고 명시되어 있습니다."
      },
      {
        id: "rq3",
        type: "multiple_choice",
        question: "What does the passage define as 'greenwashing'?",
        options: [
          "Washing industrial machinery with recycled biodegradable detergents",
          "Deceptively exaggerating eco-credentials while continuing destructive practices",
          "Investing all corporate profits into solar panel manufacturing",
          "Establishing third-party auditing bodies for international trade"
        ],
        answer: 1,
        explanation: "본문 8번째 문장에서 밀실에서 파괴적 운영을 지속하면서 마케팅 캠페인을 통해 환경적 자격을 기만적으로 과장하는 관행을 그린워싱이라고 정의합니다."
      },
      {
        id: "rq4",
        type: "short_answer",
        question: "저자가 지적한 진정한 ESG 통합의 본질은 무엇인지 본문의 표현을 활용하여 한 문장으로 서술하시오.",
        referenceAnswer: "진정한 ESG 통합은 단순한 기업의 이타주의가 아니라, 탄소 제약 경제를 헤쳐나가기 위한 정교한 위험 완화 전략이다.",
        keywords: ["이타주의", "위험 완화", "탄소 제약", "전략", "altruism", "risk mitigation"]
      }
    ],
    listeningQuestions: [
      {
        id: "lq1",
        sentenceIndex: 2,
        question: "3번째 문장에서 언급된 'ESG'의 3가지 평가 축은 무엇인가?",
        options: ["환경(Environmental), 사회(Social), 지배구조(Governance)", "경제(Economic), 주식(Stock), 금(Gold)", "교육(Education), 과학(Science), 성장(Growth)", "고용(Employment), 급여(Salary), 정부(Government)"],
        answer: 0,
        explanation: "3번째 문장은 대시 사이에서 'Environmental, Social, and Governance factors'라고 정확히 밝히고 있습니다."
      },
      {
        id: "lq2",
        sentenceIndex: 7,
        question: "8번째 문장에서 폭로된 '그린워싱' 기업들의 기만적인 행동 방식은?",
        options: ["화려한 마케팅으로 친환경을 과장하면서 실제로는 파괴적 운영을 지속함", "모든 공장을 친환경 수소 발전소로 즉각 교체함", "소비자들에게 제품 가격을 전액 환불해 줌", "회사의 모든 재무 기록을 완전히 투명하게 공개함"],
        answer: 0,
        explanation: "8번째 문장은 'deceptively exaggerate their environmental credentials... while continuing ecologically destructive operations'라고 명시합니다."
      }
    ],
    speakingTask: {
      prompt: "How can individual consumers and retail investors distinguish genuinely green companies from those practicing greenwashing?",
      sampleAnswer: "Consumers and investors can avoid greenwashing by looking beyond vague advertising slogans and demanding audited data. They should inspect independent sustainability ratings, third-party carbon audit reports, and verified net-zero targets. When a corporation publishes transparent progress metrics across its entire supply chain rather than just flashy marketing, its environmental commitment is far more credible.",
      keyPoints: ["looking beyond advertising rhetoric", "demanding audited carbon and supply chain disclosures", "checking third-party ESG certifications"]
    }
  },

  // =========================================================================
  // 지문 10: The Semiconductor Industry and Global Competition (고급)
  // =========================================================================
  {
    id: "passage-010",
    title: "The Semiconductor Industry and Global Competition",
    titleKo: "반도체 산업과 기술 경쟁",
    level: "advanced",
    topic: "기술/산업",
    type: "default",
    wordCount: 267,
    text: "Often characterized as the indispensable \"crude oil of the twenty-first century,\" semiconductors form the microscopic foundation of modern civilization. These sophisticated microchips power everything from smartphones and medical equipment to cloud computing data centers and artificial intelligence supercomputers. However, fabricating state-of-the-art chips measuring mere nanometers wide has become one of the most technologically demanding and capital-intensive endeavors in human history. Building an advanced semiconductor fabrication facility now requires billions of dollars in specialized capital equipment, including extreme ultraviolet lithography systems. Consequently, the global semiconductor supply chain has grown extraordinarily consolidated and geographically concentrated in a handful of specialized nations. While fabless design firms in the United States pioneer architectural innovation, precision contract manufacturing is overwhelmingly dominated by foundries in East Asia. This intricate web of geographical interdependence means that any regional geopolitical tension, natural catastrophe, or factory bottleneck can reverberate across worldwide manufacturing sectors. Recognizing this strategic vulnerability, major world powers have enacted expansive industrial policies and subsidization packages to repatriate chip manufacturing capabilities within domestic borders. Governments now view domestic semiconductor self-sufficiency not merely as a commercial priority, but as an indispensable cornerstone of national security and technological sovereignty. Yet, duplicating existing global supply ecosystems requires colossal financial commitments, skilled engineering workforces, and decades of accumulated technical know-how. Industry analysts warn that fragmentation could escalate research costs and decelerate the breathtaking pace of technological innovation that humanity has enjoyed. Navigating this complex intersection of technical excellence, international diplomacy, and industrial strategy will define leadership in the twenty-first-century digital economy.",
    sentences: [
      {
        text: "Often characterized as the indispensable \"crude oil of the twenty-first century,\" semiconductors form the microscopic foundation of modern civilization.",
        translation: "흔히 21세기의 없어서는 안 될 '원유'로 묘사되는 반도체는 현대 문명의 미시적인 토대를 형성합니다."
      },
      {
        text: "These sophisticated microchips power everything from smartphones and medical equipment to cloud computing data centers and artificial intelligence supercomputers.",
        translation: "이 정교한 마이크로칩은 스마트폰과 의료 기기에서부터 클라우드 컴퓨팅 데이터 센터와 인공지능 슈퍼컴퓨터에 이르기까지 모든 것에 동력을 공급합니다."
      },
      {
        text: "However, fabricating state-of-the-art chips measuring mere nanometers wide has become one of the most technologically demanding and capital-intensive endeavors in human history.",
        translation: "그러나 폭이 불과 수 나노미터에 불과한 최첨단 칩을 제조하는 것은 인류 역사상 기술적으로 가장 까다롭고 자본 집약적인 과업 중 하나가 되었습니다."
      },
      {
        text: "Building an advanced semiconductor fabrication facility now requires billions of dollars in specialized capital equipment, including extreme ultraviolet lithography systems.",
        translation: "첨단 반도체 제조 시설을 짓는 데는 극자외선(EUV) 노광 장비를 포함하여 수십억 달러에 달하는 특수 자본 설비가 필요합니다."
      },
      {
        text: "Consequently, the global semiconductor supply chain has grown extraordinarily consolidated and geographically concentrated in a handful of specialized nations.",
        translation: "결과적으로 전 세계 반도체 공급망은 소수의 전문 국가에 극도로 통합되고 지리적으로 집중되었습니다."
      },
      {
        text: "While fabless design firms in the United States pioneer architectural innovation, precision contract manufacturing is overwhelmingly dominated by foundries in East Asia.",
        translation: "미국의 팹리스 설계 기업들이 구조적 혁신을 선도하는 반면, 정밀 위탁 제조는 동아시아의 파운드리가 압도적으로 지배하고 있습니다."
      },
      {
        text: "This intricate web of geographical interdependence means that any regional geopolitical tension, natural catastrophe, or factory bottleneck can reverberate across worldwide manufacturing sectors.",
        translation: "이러한 지리적 상호의존의 복잡한 그물망은 어떠한 지역적 지정학적 긴장, 자연재해, 혹은 공장 병목 현상도 전 세계 제조 부문 전반에 파문을 일으킬 수 있음을 의미합니다."
      },
      {
        text: "Recognizing this strategic vulnerability, major world powers have enacted expansive industrial policies and subsidization packages to repatriate chip manufacturing capabilities within domestic borders.",
        translation: "이러한 전략적 취약성을 인식한 주요 세계 강국들은 칩 제조 역량을 자국 국경 내로 되돌리기 위해 대대적인 산업 정책과 보조금 패키지를 제정했습니다."
      },
      {
        text: "Governments now view domestic semiconductor self-sufficiency not merely as a commercial priority, but as an indispensable cornerstone of national security and technological sovereignty.",
        translation: "각국 정부는 이제 자국 내 반도체 자급자족을 단순한 상업적 우선순위가 아니라 국가 안보와 기술 주권의 없어서는 안 될 초석으로 간주하고 있습니다."
      },
      {
        text: "Yet, duplicating existing global supply ecosystems requires colossal financial commitments, skilled engineering workforces, and decades of accumulated technical know-how.",
        translation: "그러나 기존의 글로벌 공급 생태계를 복제하는 데는 막대한 재정적 투입, 숙련된 엔지니어링 인력, 수십 년간 축적된 기술적 노하우가 필요합니다."
      },
      {
        text: "Industry analysts warn that fragmentation could escalate research costs and decelerate the breathtaking pace of technological innovation that humanity has enjoyed.",
        translation: "업계 분석가들은 공급망의 파편화가 연구 개발 비용을 치솟게 하고 인류가 누려온 숨 막히는 기술 혁신의 속도를 둔화시킬 수 있다고 경고합니다."
      },
      {
        text: "Navigating this complex intersection of technical excellence, international diplomacy, and industrial strategy will define leadership in the twenty-first-century digital economy.",
        translation: "기술적 탁월함, 국제 외교, 산업 전략의 이 복잡한 교차점을 성공적으로 헤쳐나가는 것이 21세기 디지털 경제의 리더십을 정의할 것입니다."
      }
    ],
    vocabulary: [
      {
        word: "indispensable",
        pos: "adjective",
        meaning: "없어서는 안 될, 필수불가결한",
        example: "Semiconductors are an indispensable component of telecommunications hardware.",
        synonyms: ["essential", "crucial", "vital"]
      },
      {
        word: "endeavor",
        pos: "noun",
        meaning: "과업, 시도, 노력",
        example: "Deep-space exploration is a collaborative human endeavor.",
        synonyms: ["undertaking", "venture", "enterprise"]
      },
      {
        word: "lithography",
        pos: "noun",
        meaning: "노광 공정, 석판 인쇄술",
        example: "Extreme ultraviolet lithography prints nanometer-scale chip circuit patterns.",
        synonyms: ["photolithography", "circuit printing", "etching"]
      },
      {
        word: "consolidated",
        pos: "adjective",
        meaning: "통합된, 굳건한",
        example: "The market is heavily consolidated among three dominant chip fabricators.",
        synonyms: ["concentrated", "unified", "solidified"]
      },
      {
        word: "foundry",
        pos: "noun",
        meaning: "파운드리 (반도체 위탁 생산 공장)",
        example: "Contract foundries manufacture customized silicon chips for fabless designers.",
        synonyms: ["fabrication plant", "chip foundry", "microchip fab"]
      },
      {
        word: "reverberate",
        pos: "verb",
        meaning: "파문을 일으키다, 반향을 불러일으키다",
        example: "A factory fire in one chip plant reverberated across automobile assembly lines worldwide.",
        synonyms: ["resonate", "echo", "rebound"]
      },
      {
        word: "repatriate",
        pos: "verb",
        meaning: "(자본/제조 시설을) 본국으로 송환하다, 본국 회귀시키다",
        example: "The government passed tax credits to repatriate critical manufacturing jobs.",
        synonyms: ["reshore", "bring home", "reclaim"]
      },
      {
        word: "sovereignty",
        pos: "noun",
        meaning: "주권, 자주권",
        example: "Technological sovereignty ensures a nation cannot be crippled by foreign trade embargoes.",
        synonyms: ["autonomy", "independence", "self-governance"]
      },
      {
        word: "colossal",
        pos: "adjective",
        meaning: "막대한, 거대한",
        example: "Constructing advanced semiconductor fabs requires colossal capital expenditures.",
        synonyms: ["gigantic", "immense", "mammoth"]
      },
      {
        word: "fragmentation",
        pos: "noun",
        meaning: "파편화, 분절화",
        example: "Geopolitical rivalry caused the fragmentation of global supply chains.",
        synonyms: ["splintering", "breakup", "division"]
      }
    ],
    grammar: [
      {
        title: "과거분사구로 시작하는 분사구문 (Past Participle Introductory Clause)",
        explanation: "수동의 의미를 갖는 과거분사구가 문두에 위치하여 주절의 주어를 수식하며 이유나 양보, 상태를 나타냅니다.",
        passageExample: "Often characterized as the indispensable \"crude oil of the twenty-first century,\" semiconductors form the microscopic foundation...",
        additionalExample: "Praised for its battery efficiency, the newly designed microchip captured thirty percent market share.",
        question: {
          question: "다음 빈칸에 알맞은 어형을 고르시오: ______ by leading silicon designers worldwide, the new processor set unprecedented performance benchmarks.",
          options: ["Endorsed", "Endorsing", "To endorse", "Having endorsed"],
          answer: 0,
          explanation: "주어(the new processor)가 디자이너들에 의해 '지지를 받는' 수동의 관계이므로 과거분사 'Endorsed'가 적절합니다."
        }
      },
      {
        title: "While을 이용한 대조절 (While S+V, S+V)",
        explanation: "접속사 while은 시간(~하는 동안)뿐만 아니라 대조(~하는 반면에, whereas)를 나타내어 두 사실을 선명하게 대비시킵니다.",
        passageExample: "While fabless design firms in the United States pioneer architectural innovation, precision contract manufacturing is overwhelmingly dominated by foundries in East Asia.",
        additionalExample: "While some nations excel in software architecture, others specialize in hardware assembly.",
        question: {
          question: "다음 빈칸에 문맥상 알맞은 접속사를 고르시오: ______ western firms design advanced artificial intelligence algorithms, eastern Asian foundries manufacture the physical silicon.",
          options: ["While", "Unless", "Because", "Despite"],
          answer: 0,
          explanation: "동서양의 상호 대조적인 분업 역할을 설명하고 있으므로 대조를 나타내는 접속사 'While'이 정답입니다."
        }
      },
      {
        title: "상관구문 not merely A, but (as) B (단지 A뿐만 아니라 B도)",
        explanation: "'not only A but also B'의 고급 변형으로 'not merely A, but (as) B' 형태로 쓰여 B의 심대한 가치를 강조합니다.",
        passageExample: "Governments now view domestic semiconductor self-sufficiency not merely as a commercial priority, but as an indispensable cornerstone of national security...",
        additionalExample: "Access to clean water is not merely an economic concern, but a fundamental human right.",
        question: {
          question: "다음 빈칸에 알맞은 짝을 고르시오: Chip design capability is viewed not merely as corporate wealth, ______ a pillar of technological sovereignty.",
          options: ["but as", "or as", "and that", "so as"],
          answer: 0,
          explanation: "'not merely A, but (as) B' 구조이므로 'but as'가 올바릅니다."
        }
      }
    ],
    readingQuestions: [
      {
        id: "rq1",
        type: "multiple_choice",
        question: "Why are semiconductors compared to 'the crude oil of the twenty-first century'?",
        options: [
          "They are extracted directly from deep-sea petroleum reserves.",
          "They serve as the indispensable technological foundation powering modern civilization.",
          "They cause severe environmental carbon emissions when burned for home heating.",
          "They are exclusively used as lubricants for aerospace engines."
        ],
        answer: 1,
        explanation: "본문 1~2번째 문장에서 스마트폰부터 슈퍼컴퓨터까지 모든 현대 문명 기기에 동력을 제공하는 미시적 토대이기에 21세기의 원유로 비유되었습니다."
      },
      {
        id: "rq2",
        type: "multiple_choice",
        question: "How is the international division of labor in the semiconductor industry currently structured?",
        options: [
          "European firms design all chips, while South American plants manufacture EUV lithography tools.",
          "US firms lead architectural design, while East Asian foundries dominate contract precision manufacturing.",
          "Every country independently manufactures 100% of its required microchips domestically.",
          "Design and manufacturing are exclusively performed inside government research facilities."
        ],
        answer: 1,
        explanation: "본문 6번째 문장에서 미국의 팹리스 기업들이 설계를 주도하고, 동아시아의 파운드리가 정밀 위탁 제조를 압도적으로 지배하고 있다고 설명합니다."
      },
      {
        id: "rq3",
        type: "multiple_choice",
        question: "According to industry analysts, what danger could arise from supply chain fragmentation and reshoring?",
        options: [
          "Escalating research costs and decelerating the pace of technological innovation",
          "Immediate collapse of the global agricultural market",
          "Permanent elimination of all national corporate tax revenues",
          "Massive reduction in consumer demand for smartphones and computers"
        ],
        answer: 0,
        explanation: "본문 11번째 문장에서 공급망 파편화가 연구 비용을 상승시키고 기술 혁신의 속도를 둔화시킬 수 있다고 경고하고 있습니다."
      },
      {
        id: "rq4",
        type: "short_answer",
        question: "각국 정부가 반도체 공급망을 자국 내로 회귀(repatriate)시키려 할 때 직면하는 현실적인 장벽 3가지를 본문에서 찾아 쓰시오.",
        referenceAnswer: "막대한 재정적 투입(colossal financial commitments), 숙련된 엔지니어링 인력(skilled engineering workforces), 수십 년간 축적된 기술적 노하우(decades of accumulated technical know-how).",
        keywords: ["재정", "비용", "인력", "노하우", "know-how", "workforce", "financial"]
      }
    ],
    listeningQuestions: [
      {
        id: "lq1",
        sentenceIndex: 3,
        question: "4번째 문장에서 최첨단 반도체 제조 시설을 짓는 데 필수적인 수십억 달러 규모의 장비로 언급된 것은?",
        options: ["극자외선(EUV) 노광 장비", "화물 수송용 증기기관차", "위성 궤도 진입 로켓", "수동 나사 조립 로봇"],
        answer: 0,
        explanation: "4번째 문장은 'extreme ultraviolet lithography systems'를 명시하고 있습니다."
      },
      {
        id: "lq2",
        sentenceIndex: 8,
        question: "9번째 문장에서 각국 정부가 반도체 자급자족을 단순한 상업적 이익을 넘어 무엇으로 간주하고 있는가?",
        options: ["국가 안보와 기술 주권의 필수 초석", "단순한 계절별 세금 징수 수단", "관광객 유치를 위한 홍보 전시물", "기업 복지 기금의 일환"],
        answer: 0,
        explanation: "9번째 문장은 'an indispensable cornerstone of national security and technological sovereignty'라고 표현했습니다."
      }
    ],
    speakingTask: {
      prompt: "Do you think complete self-sufficiency in semiconductor manufacturing is realistic for any single country? Support your view.",
      sampleAnswer: "I do not believe complete self-sufficiency in semiconductor manufacturing is realistic for any single country. The semiconductor value chain is simply too complex, spanning American software design, European EUV optical machinery, Japanese specialized chemicals, and East Asian precision fabrication. Duplicating every segment domestically would incur astronomical costs and stifle technological innovation.",
      keyPoints: ["unmatched complexity of the global value chain", "astronomical capital and workforce requirements", "risk of slowing innovation through fragmentation"]
    }
  }
];

// =========================================================================
// DefaultPassages 헬퍼 모듈
// =========================================================================
const DefaultPassages = (() => {
  function getAll() {
    return DEFAULT_PASSAGES;
  }

  function getById(id) {
    return DEFAULT_PASSAGES.find(p => p.id === id) || null;
  }

  function getByLevel(level) {
    return DEFAULT_PASSAGES.filter(p => p.level === level);
  }

  function getLevelLabel(level) {
    return { beginner: '초급', intermediate: '중급', advanced: '고급' }[level] || level;
  }

  return { getAll, getById, getByLevel, getLevelLabel };
})();

// 브라우저 전역 등록
if (typeof window !== 'undefined') {
  window.DEFAULT_PASSAGES = DEFAULT_PASSAGES;
  window.DefaultPassages = DefaultPassages;
}

// Node.js 환경 모듈 내보내기 지원
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DEFAULT_PASSAGES, DefaultPassages };
}
