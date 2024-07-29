import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CustomSwiperBullets from '@/components/CustomSwiperBullets';
import Button from '@/components/atom/Button';
import { ON_BOARDING_SWIPER_DATA } from '@/constants/onBoarding.data';
import './OnBoarding.scss';

const OnBoarding = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  return (
    <div id={'OnBoarding'}>
      <div className="on-boarding-content">
        <div className="on-boarding-top">
          <span className="on-boarding-top-skip">
            {activeSlideIndex !== ON_BOARDING_SWIPER_DATA.length - 1 ? '건너뛰기' : ''}
          </span>
        </div>
        <Swiper
          onActiveIndexChange={(swiper) => {
            setActiveSlideIndex(swiper.activeIndex);
          }}
          pagination={{
            clickable: false,
          }}
          modules={[Pagination]}
          className="on-boarding-swiper"
        >
          {ON_BOARDING_SWIPER_DATA.map((el) => (
            <SwiperSlide className={'on-boarding-swiper-slide'}>
              {el.asset}
              <span className="on-boarding-swiper-slide-title">{el.title}</span>
              <span className="on-boarding-swiper-slide-description">{el.description}</span>
            </SwiperSlide>
          ))}
        </Swiper>
        <CustomSwiperBullets
          currentSlideIndex={activeSlideIndex}
          slideLength={ON_BOARDING_SWIPER_DATA.length}
        />
      </div>
      <div style={{ padding: '0 25px' }}>
        {activeSlideIndex === ON_BOARDING_SWIPER_DATA.length - 1 && (
          <Button style={{ flexShrink: 1 }}>시작하기</Button>
        )}
      </div>
    </div>
  );
};

export default OnBoarding;
