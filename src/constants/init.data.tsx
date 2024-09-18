import MusicIcon from '@/assets/img/icon_Music.svg?react';
import VisualIcon from '@/assets/img/icon_Visual.svg?react';
import WritingIcon from '@/assets/img/icon_Writing.svg?react';

const INIT_STEP_HEADER_TEXT = [
  {
    title   : '프로필 설정',
    subTitle: <span className='init-header-sub-title'>이름과 사진을 설정해주세요.</span>,
  },
  {
    title   : '관심 분야 설정',
    subTitle: <span className='init-header-sub-title'>관심있는 분야를 선택해주세요.</span>,
  },
  {
    title   : '관심 키워드',
    subTitle: <span className='init-header-sub-title'>각 분야별 관심있는 키워드를 <span style={{ color: '#7BF7FF' }}>2개 이상 </span>선택해주세요.</span>,
  },
];

const INIT_STEP_1 = [
  {
    id: 'ARTIST',
    label      : {
      emoji  : '🖌️',
      name   : '아티스트',
      subName: 'Artist',
    },
    description: '나의 작품들을 홍보하고, 공유하고 싶어요.',
  },
  {
    id: 'ARTTY',
    label      : {
      emoji  : '🙆️',
      name   : '아티',
      subName: 'Artty',
    },
    description: '내 취향에 맞는 아티스트를 찾고, 간직하고 싶어요.',
  },
];

const INIT_STEP_2 = [
  {
    icon       : MusicIcon,
    name       : 'MUSIC',
    color      : '#FF7193',
    description: '다양한 카테코리의 음악',
  },
  {
    icon       : VisualIcon,
    name       : 'VISUAL',
    color      : '#5DED6B',
    description: '디지털 아트, 손 그림등 다양한 분야',
  },
  {
    icon       : WritingIcon,
    name       : 'WRITING',
    color      : '#6F63FF',
    description: 'SF소설, 시등 다양한 글들',
  },
];

const INIT_STEP_3 = {
  'MUSIC'  : {
    icon    : MusicIcon,
    name    : 'MUSIC',
    color   : '#FF7193',
    keywords: [
      '팝',
      '록',
      '재즈',
      '힙합',
      'R&B',
      '전자 음악',
      '인디',
      'K-팝',
      '컨트리',
      '블루스',
      '레게',
      '브릿 팝',
    ],
  },
  'VISUAL' : {
    icon    : VisualIcon,
    name    : 'VISUAL',
    color   : '#5DED6B',
    keywords: [
      '그래픽 디자인',
      'UI/UX',
      '3D 아트',
      '타이포그래피',
      '일러스트레이선',
      '패키지 디자인',
      '미니멀리즘',
      '추상화',
      '모션 그래픽',
      '사실 주의',
      '팝 아트',
      '라인 드로잉',
    ],
  },
  'WRITING': {
    icon    : WritingIcon,
    name    : 'WRITING',
    color   : '#6F63FF',
    keywords: [
      '판타지',
      'SF',
      '로맨스',
      '시',
      '모험 소설',
      '미스터리',
      '드라마',
      '철학',
      '호러',
      '심리 소설',
      '단편 소설',
      '에세이',
    ],
  },
};

export {
  INIT_STEP_HEADER_TEXT,
  INIT_STEP_1,
  INIT_STEP_2,
  INIT_STEP_3,
};
