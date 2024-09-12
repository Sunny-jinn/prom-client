import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import './Home.scss';
import NavigatorLayout from '@/components/NavigatorLayout';
import Logo from '@/assets/img/img_logo.svg?react';
import Alarm from '@/assets/img/icon_alarm.svg?react';
import ArticleLogo from '@/assets/img/icon_article.svg?react';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ARTICLES } from '@/constants/articles.data';

const Home = () => {
  const [alarms] = useState([{ title: 1 }, { title: 2 }]);

  return (
    <SafeAreaLayout flexDirection={'column'}>
      <NavigatorLayout>
        <div className='home'>
          <div className='home-header'>
            <Logo width={70} />
            <div className='home-alarm'>
              {alarms.length > 0 &&
                <div className='home-alarm-badge'>
                  <span>{alarms.length}</span>
                </div>
              }
              <Alarm width={19} height={19} />
            </div>
          </div>
          <Articles />
        </div>
      </NavigatorLayout>
    </SafeAreaLayout>
  );
};

const Articles = () => {
  return (
    <div className='articles'>
      <Swiper
        pagination={{
          clickable: false,
        }}
        spaceBetween={10}
        modules={[Pagination]}
        className='articles-swiper'
      >
        {ARTICLES.map((el) => (
          <SwiperSlide className={'article-swiper-slide'}>
            <div className='article-preview-wrapper'>
              <div className='article-preview-badge'>
                <ArticleLogo width={16} height={16}/>
                <span>새로운 소식</span>
              </div>
              <img src={el.previewImage} alt='preview' />
            </div>
            <div className='article-content'>
              <div className='article-content-top'>
                <span className='article-content-title'>{el.title}</span>
                {/*<span className='article-content-date'>{dayjs(el.createdAt).format('M월 DD일')}</span>*/}
              </div>
              <span className='article-content-bottom'>{el.contents[0].content}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Home;
