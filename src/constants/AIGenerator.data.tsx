import { Post } from '@/feature/types';
import { Dispatch, SetStateAction } from 'react';


type AIGeneratorGridView = {
  type: 'GRID';
  column: number;
  label: string;
  data: {label: string, value: string, description?: string}[]
}

type AIGeneratorCustomViewProps<T extends string> = {
  state: Record<string, string>;
  setState: Dispatch<SetStateAction<Record<T, string>>>;
}

type AIGeneratorCustomView = {
  type: 'CUSTOM';
}

type AIGeneratorData = {
  state: Record<string, string>;
  views: Array<AIGeneratorCustomView | AIGeneratorGridView>;
  detailViewComment: string;
  processingComment: string;
}

export const AI_GENERATOR_DATA: Record<Post.PostCategory, AIGeneratorData> = {
  MUSIC: {
    state: {
      mood: 'COMFORTABLE',
      genre: 'POP',
      vocalRange: 'LOW',
      tempo: 'LOW',
      energy: 'LOW',
    },
    views: [
      {
        type: 'GRID',
        column: 3,
        label: '곡 분위기',
        data: [
          {label: '편안한', value: 'COMFORTABLE'},
          {label: '신나는', value: 'EXCITING'},
          {label: '차분한', value: 'CALM'},
          {label: '어두운', value: 'INTENSE'},
          {label: '강렬한', value: 'GLOOMY'},
        ]
      },
      {
        type: 'GRID',
        label: '장르',
        column: 3,
        data: [
          {label: '팝', value: 'POP', description: "팝 음악은 대중적이고 친숙한 멜로디와 경쾌한 리듬이 특징인 음악 장르입니다. 다양한 악기와 전자음향을 활용해 쉽게 따라 부를 수 있는 멜로디를 강조하며, 중독성 있는 후렴구가 자주 포함됩니다."},
          {label: '힙합', value: 'HIPHOP', description: "리듬과 비트를 중시하는 음악으로, 랩과 강한 리듬감이 특징입니다. 자유로운 표현과 강렬한 에너지가 돋보이며, 감정과 이야기를 풀어내기 좋은 장르입니다."},
          {label: '락', value: 'ROCK', description: "대중적이고 다양한 스타일의 음악입니다. 쉬운 멜로디와 반복적인 구조로 누구나 쉽게 즐길 수 있으며, 트렌디한 사운드와 감정 표현에 적합합니다."},
          {label: 'R&B', value: 'R&B', description: "감미로운 멜로디와 소울풀한 보컬이 특징인 음악입니다. 부드럽고 감성적인 분위기를 만들어내며, 감정적인 표현과 리듬감을 잘 살릴 수 있습니다."},
          {label: 'EDM', value: 'EDM', description: "전자음악을 기반으로 한 신나는 비트와 클럽 음악입니다. 강렬한 드롭과 활기 넘치는 리듬이 특징이며, 파티와 댄스에 적합한 에너지를 제공합니다."},
        ]
      },
      {
        type: 'GRID',
        label: '음역대',
        column: 3,
        data: [
          {label: '저음', value: 'LOW', description: "저음은 낮고 깊은 소리로, 드럼과 베이스 같은 악기에서 주로 들을 수 있습니다. 강력하고 풍부한 느낌을 주며, 곡에 깊이와 리듬감을 추가합니다."},
          {label: '중음', value: 'MIDDLE', description: "중음은 대부분의 보컬과 주요 악기에서 들을 수 있는 소리입니다. 곡의 멜로디와 하모니를 형성하며, 음악의 중심이 되는 부분입니다."},
          {label: '고음', value: 'HIGH', description: "고음은 높은 주파수의 소리로, 심벌즈와 고음 악기에서 주로 들을 수 있습니다. 밝고 선명한 느낌을 주며, 곡에 섬세함과 에너지를 더합니다."},
        ]
      },
      {
        type: 'CUSTOM',
      }
    ],
    detailViewComment: "원하는 분위기, 악기, 가사, 스타일 등을 자유롭게 입력해보세요.\n예 : '따뜻하고 감성적인 분위기의 기타 소리'",
    processingComment: "멋있는 음악을 생성중입니다!",
  },
  VISUAL: {
    state: {
      subject: 'NATURE',
      style: 'ABSTRACT',
      color: 'BRIGHT',
      mood: 'BRIGHT',
      sizeRatio: 'ONE_ONE'
    },
    views: [
      {
        type: 'GRID',
        label: '주제',
        column: 3,
        data: [
          {label: '자연', value: 'NATURE'},
          {label: '도시', value: 'CITY'},
          {label: '정물', value: 'STILL-LIF'},
          {label: '추상', value: 'ABSTRACT_ART'},
        ]
      },
      {
        type: 'GRID',
        label: '스타일',
        column: 3,
        data: [
          {label: '추상적', value: 'ABSTRACT', description: "감정과 상상을 자유롭게 표현할 수 있는 카테고리입니다. 복잡한 형태와 색상을 활용하여 독창적인 작품을 만들어 보세요."},
          {label: '사실적', value: 'REALISM'},
          {label: '미니멀', value: 'MINIMAL', description: "간결하고 정제된 디자인을 중심으로 한 카테고리입니다. 단순한 형태와 색상을 사용하여 강렬하고 명확한 메시지를 전달해 보세요."},
          {label: '만화', value: 'CARTOON'},
        ]
      },
      {
        type: 'GRID',
        label: '색상',
        column: 3,
        data: [
          {label: '밝은', value: 'BRIGHT'},
          {label: '무채색', value: 'ACHROMATIC'},
          {label: '다채로운', value: 'COLORFUL'},
          {label: '어두운', value: 'DARK'},
        ]
      },
      {
        type: 'GRID',
        label: '분위기',
        column: 3,
        data: [
          {label: '밝은', value: 'BRIGHT'},
          {label: '신비로운', value: 'MYSTICAL'},
          {label: '차분한', value: 'CALM'},
          {label: '어두운', value: 'GLOOMY'},
          {label: '역동적', value: 'DYNAMIC'},
          {label: '긴장감 있는', value: 'TENSE'},
        ]
      },
      {
        type: 'CUSTOM',
      }
    ],
    detailViewComment: "원하는 그림의 세부사항을 마음대로 적어보세요!\n예 : 수채화 붓으로 그린 듯한 강아지",
    processingComment: "멋있는 그림을 생성중입니다!",
  },
  WRITING: {
    state: {
      type: 'NOVEL',
      subject: 'FANTASY',
      style: 'MODERN',
      specialElement: 'MULTIPLE_PERSPECTIVE',
      ending: 'HAPPY'
    },
    views: [
      {
        type: 'GRID',
        label: '카테고리',
        column: 3,
        data: [
          {label: '소설', value: 'NOVEL'},
          {label: '시', value: 'POEM'},
        ]
      },
      {
        type: 'GRID',
        label: '주제',
        column: 3,
        data: [
          {label: '판타지', value: 'FANTASY', description: "초자연적 요소와 상상 속 세계를 배경으로 한 이야기입니다."},
          {label: '로맨스', value: 'ROMANCE', description: "사랑을 중심으로 한 관계와 감정을 다루는 이야기입니다."},
          {label: '스릴러', value: 'THRILLER', description: "긴장감 넘치는 사건과 예측 불가능한 전개를 특징으로 하는 이야기입니다."},
          {label: '역사', value: 'HISTORY', description: "실제 역사적 사건이나 시대적 배경을 기반으로 한 이야기입니다."},
          {label: 'SF', value: 'SF', description: "미래 기술, 우주 탐험, 인공지능 등 과학적 상상력을 바탕으로 한 이야기입니다."},
        ]
      },
      {
        type: 'GRID',
        label: '문체 스타일',
        column: 2,
        data: [
          {label: '간결하고 직설적인', value: 'COMPACT', description: "군더더기 없이 명확하게 전달하는 문체입니다. \n예) \"그는 문을 열고 나갔다.\""},
          {label: '서사적이고 묘사적인', value: 'DESCRIPTIVE', description: "상황과 장면을 상세하게 그려내는 문체입니다.\n예) \"바람이 창문을 스치며, 그는 천천히 문을 열었다.\""},
          {label: '고전적이고 우아한', value: 'CLASSIC', description: "전통적이고 문학적인 느낌의 문체입니다.\n예) \"그는 조용히 문을 열고, 바깥 세상으로 나아갔다.\""},
          {label: '현대적인 대화체', value: 'MODERN', description: "자연스러운 대화와 일상적인 표현을 사용하는 문체입니다.\n예) \"그가 말없이 문을 열고 나가버렸어.\""},
        ]
      },
      {
        type: 'GRID',
        label: '특별한 요소',
        column: 2,
        data: [
          {label: '다중 시점', value: 'MULTIPLE_PERSPECTIVE', description: "여러 캐릭터의 관점에서 이야기가 전개되는 구조입니다."},
          {label: '타임 루프', value: 'TIMELOOP', description: "시간이 반복되거나 과거로 돌아가는 설정입니다."},
          {label: '비현실적 설정', value: 'UNREALISTIC', description: "현실과 다른 세계관이나 규칙이 적용되는 이야기입니다."},
          {label: '심리적 긴장감', value: 'TENSION', description: "캐릭터의 내면 갈등과 감정을 깊이 탐구하는 요소."},
          {label: '비선형 서사', value: 'CHRONOLOGICAL', description: "시간 순서대로 전개되지 않는, 흩어진 이야기 구조."},
          {label: '은유와 상징', value: 'METAPHOR', description: "상징적 의미와 깊이 있는 은유가 중심이 되는 서사."},
          {label: '초자연적 존재', value: 'SUPERNATURAL', description: "유령, 신화적 생물, 초능력자 등 비현실적 존재의 등장."},
        ]
      },
      {
        type: 'GRID',
        label: '결말',
        column: 3,
        data: [
          {label: '해피엔딩', value: 'HAPPY'},
          {label: '베드엔딩', value: 'BAD'},
          {label: '열린 결말', value: 'OPEN'},
        ]
      },
    ],
    detailViewComment: "AI가 더 정교한 글 도출할 수 있도록 필요한 정보를 입력해 주세요.\n예) 주인공의 성격을 까칠하게 설정해줘.",
    processingComment: "환상적인 글을 생성중입니다!",
  }
}
