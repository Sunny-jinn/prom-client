import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import './Home.scss';
import NavigatorLayout from '@/components/NavigatorLayout';
import Logo from '@/assets/img/img_logo.svg?react';
import Arrow from '@/assets/img/icon_arrow.svg?react';
import Alarm from '@/assets/img/icon_alarm.svg?react';
import ArticleLogo from '@/assets/img/icon_article.svg?react';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Article, ARTICLES, TextContent } from '@/constants/articles.data';
import dayjs from 'dayjs';
import userStore from '@/store/User';
import { POST_CATEGORY_DATA, PostCategoryData } from '@/constants/init.data';
import { FeedResponse, getFeedsAPI } from '@/feature/api/post.api';
import relativeTime from 'dayjs/plugin/relativeTime';
import DefaultSwiperBullets from '@/components/DefaultSwiperBullets';
import cn from 'classnames';
import { Drawer, DrawerContent, DrawerProps, useDisclosure } from '@chakra-ui/react';
import { ScrollArea } from '@/components/ScrollArea';

dayjs.extend(relativeTime);

const Home = () => {
  const { user } = userStore(state => state);
  console.log(user);
  const [alarms] = useState([{ title: 1 }, { title: 2 }]);

  return (
    <SafeAreaLayout flexDirection={'column'}>
      <NavigatorLayout hasScrollArea={true}>
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
          <div className='home-posts'>
            {POST_CATEGORY_DATA.map(el => <PostPreview category={el} />)}
          </div>
        </div>
      </NavigatorLayout>
    </SafeAreaLayout>
  );
};

const Articles = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const openArticle = (article: Article) => {
    setSelectedArticle(article);
    onOpen();
  };

  const closeArticle = () => {
    setSelectedArticle(null);
    onClose();
  };

  return (
    <>
      {(isOpen && selectedArticle) &&
        <ArticleDetail isOpen={isOpen} onClose={closeArticle} article={selectedArticle} />}
      <div className='articles'>
        <Swiper
          pagination={{
            clickable: false,
          }}
          onActiveIndexChange={(swiper) => {
            setActiveSlideIndex(swiper.activeIndex);
          }}
          spaceBetween={10}
          className='articles-swiper'
        >
          {ARTICLES.map((el) => (
            <SwiperSlide className={'article-swiper-slide'} onClick={() => openArticle(el)}>
              <div className='article-preview-wrapper'>
                <div className='article-preview-badge'>
                  <ArticleLogo width={16} height={16} />
                  <span>새로운 소식</span>
                </div>
                <img src={el.previewImage} alt='preview' />
              </div>
              <div className='article-content'>
                <div className='article-content-top'>
                  <span className='article-content-title'>{el.title}</span>
                  <span className='article-content-date'>{dayjs(el.createdAt).format('M월 DD일')}</span>
                </div>
                <span className='article-content-bottom'>{el.contents[0].content}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <DefaultSwiperBullets
          currentSlideIndex={activeSlideIndex}
          slideLength={ARTICLES.length}
        />
      </div>
    </>

  );
};

type PostPreviewProps = {
  category: PostCategoryData
}

const PostPreview = (props: PostPreviewProps) => {
  const { category } = props;
  const { name, icon } = category;
  const Icon = icon;
  const [post, setPost] = useState<FeedResponse | null>(null);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const getRecentPost = async () => {
    try {
      const result = await getFeedsAPI({ size: 1, type: name, orderBy: 'asc' });
      setPost(result[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getRecentPost();
  }, [name]);

  if(!post) return <></>;
  return (
    <div className='post-preview'>
      <div className='post-preview-header'>
        <div className='post-creator'>
          <img src={post.user.profileImage} alt='profile' />
          <div className='post-creator-info'>
            <span className='post-creator-name'>
              {post.user.username}
            </span>
            <div className='post-info'>
              <span>{post.url.length}장의 사진</span>
              <div className='dot' />
              <span>{dayjs('2024-09-22').from(dayjs())}</span>
            </div>
          </div>
        </div>
        <div className='post-category'>
          <Icon height={'18px'} />
        </div>
      </div>
      <div className='post-swiper-wrapper'>
        <Swiper
          pagination={{
            clickable: false,
          }}
          onActiveIndexChange={(swiper) => {
            setActiveSlideIndex(swiper.activeIndex);
          }}
          spaceBetween={10}
          className='post-swiper'
        >
          {post.url.map((el) => (
            <SwiperSlide className={'post-swiper-slide'}>
              <img src={el} alt='content' />
            </SwiperSlide>
          ))}

        </Swiper>
        <DefaultSwiperBullets
          currentSlideIndex={activeSlideIndex}
          slideLength={post.url.length}
        />
      </div>

      <div className='post-preview-detail'>
        <div className='post-preview-content-wrapper'>
          <span className='post-preview-content-title'>{post.title}</span>
          <div className='post-preview-content-description-wrapper'>
            <span
              className={cn('post-preview-content-description', { open: descriptionOpen })}>{'xptmxmxptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm11xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1xptmxm1'}</span>
            {!descriptionOpen && <button onClick={() => setDescriptionOpen(true)}>더보기</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

type ArticleDetailProps = Omit<DrawerProps, 'children'> & {
  article: Article
}

const ArticleDetail = (props: ArticleDetailProps) => {
  const { onClose, isOpen, article } = props;
  return (
    <Drawer onClose={onClose} isOpen={isOpen} placement='bottom' size={'full'}>
      <DrawerContent bgColor={'#121212'} className='article-detail'>
        <ScrollArea>
          <div className='article-background-wrapper'>
            <img src={article.backgroundImage} alt='background' />
            <div className='background-gradient'/>
            <div className='article-detail-header'>
              <Arrow onClick={() => onClose()} width={30} height={30}/>
              <span>새로운 소식</span>
              <div style={{width: 30}}/>
            </div>
          </div>
          <div className='article-detail-content'>
            <div className='article-detail-content-top'>
              <span className='article-detail-title'>{article.title}</span>
              <div className='article-detail-info'>
                <span className='article-detail-created-at'>{dayjs(article.createdAt).format("YYYY년 M월 D일")}</span>
                <span className='article-detail-writer'>
                {"Editor "}
                  <strong>PROM</strong>
              </span>
              </div>
            </div>

            <div className='article-content-list'>
              {article.contents.map(el => {
                if(el.type === 'text'){
                  return (
                    <span className='article-content-text'>{el.content}</span>
                  )
                }
                return (
                  <div className='article-image-wrapper'>
                    <img src={el.content} alt='image' />
                    <span>{el.caption}</span>
                  </div>
                )
              })}
            </div>
            <Logo width={94} opacity={0.5}/>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default Home;




