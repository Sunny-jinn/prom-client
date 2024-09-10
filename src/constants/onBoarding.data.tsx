import { ReactNode } from 'react';
import OnBoardingImg1 from '@/assets/img/img_onboard_1.png';
import OnBoardingImg2 from '@/assets/img/img_onboard_2.png';
import OnBoardingImg4 from '@/assets/img/img_onboard_4.png';
import OnBoardingVid3 from '@/assets/video/video_onboard_3.mp4';

type OnBoardingData = {
  asset: ReactNode;
  title: string;
  description: string;
};

export const ON_BOARDING_SWIPER_DATA: OnBoardingData[] = [
  {
    asset: <img src={OnBoardingImg1} alt={'onboard1'} />,
    title: '아티스트를 위한,',
    description: '여러분들의 작품을 PROM에 \n업로드하고, 팬들과 소통하세요.',
  },
  {
    asset: <img src={OnBoardingImg2} alt={'onboard2'} />,
    title: '숨겨진 보석',
    description: '수많은 신인 아티스트를\n발굴할 수 있는 기회를 제공합니다.',
  },
  {
    asset: <video muted={true} autoPlay={true} playsInline={true} loop><source src={OnBoardingVid3} type={'video/mp4'}/></video>,
    title: '취향 골라담기',
    description: '사용자의 쇼츠 시청 알고리즘으로 \n최적의 컨텐츠를 추천해드립니다. ',
  },
  {
    asset: <img src={OnBoardingImg4} alt={'onboard4'} />,
    title: '음악. 글. 그림',
    description: '다채롭게 구성된 3가지의 카테고리로,\n예술의 스펙트럼을 넓혀보세요.',
  },
];
