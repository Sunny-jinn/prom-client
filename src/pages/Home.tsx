import { useEffect, useMemo, useState } from 'react';
import { Drawer, DrawerContent, DrawerOverlay, DrawerProps, useDisclosure } from '@chakra-ui/react';
import cn from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import Alarm from '@/assets/img/icon_alarm.svg?react';
import Arrow from '@/assets/img/icon_arrow.svg?react';
import ArticleLogo from '@/assets/img/icon_article.svg?react';
import X from '@/assets/img/icon_close.svg?react';
import Comment from '@/assets/img/icon_comment_feed.svg?react';
import From from '@/assets/img/icon_insight.svg?react';
import Like from '@/assets/img/icon_like_feed.svg?react';
import Tropy from '@/assets/img/icon_union.svg?react';
import Logo from '@/assets/img/img_logo.svg?react';
import DefaultSwiperBullets from '@/components/DefaultSwiperBullets';
import NavigatorLayout from '@/components/NavigatorLayout';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import { ScrollArea } from '@/components/ScrollArea';
import { ARTICLES, Article } from '@/constants/articles.data';
import { POST_CATEGORY_DATA, PostCategoryData } from '@/constants/init.data';
import { getFeedLikesCheckAPI, getFeedsAPI } from '@/feature/api/post.api';
import { getUserInfoAPI } from '@/feature/api/user.api';
import { Post, User } from '@/feature/types';
import useAppNavigate from '@/hooks/useAppNavigate';
import './Home.scss';
import CustomHeader from '@/components/CustomHeader';
import { getNotificationsAPI, Notification } from '@/feature/api/notification.api';
import { timeAgo } from '@/utils/date.utils';

dayjs.extend(relativeTime);

const Home = () => {
  const [alarms, setAlarms] = useState<Notification[]>([]);

  const getAlarms = async() => {
    try{
      const result = await getNotificationsAPI();
      setAlarms(result)
    }catch (e) {
      console.log(e);
    }
  }

  const todayAlarm = useMemo(() => {
    return alarms.filter(el => dayjs().diff(el.createdAt, 'd') === 0)
  },[alarms]);

  const weekAlarm = useMemo(() => {
    return alarms.filter(el => dayjs().diff(el.createdAt, 'd') !== 0)
  },[alarms]);

  useEffect(() => {
    getAlarms();
  }, [])

  const { isOpen, onOpen, onClose } = useDisclosure();

  const alarmType = (type: string) => {
    if(type === 'LIKE') return '좋아요 알림';
    if(type === 'COMMENT') return '댓글 알림';
    if(type === 'FOLLOW') return '팔로우 알림';
  }

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} placement={'right'} size={'full'}>
        <DrawerOverlay />
        <DrawerContent>
          <SafeAreaLayout flexDirection={'column'}>
            <CustomHeader leftOnClick={() => onClose()}>
              <span>알림</span>
            </CustomHeader>
            <div className='home-alarm-list'>
              <ScrollArea>
                <div className='home-alarm-list-container'>
                  {(todayAlarm.length !== 0) &&
                    <div className='alarm-list-wrapper'>
                      <div className='alarm-list-date'>
                        <span>오늘</span>
                      </div>
                      <div className='alarm-list'>
                        {todayAlarm.map(el =>
                          <div className='alarm'>
                            <div className='alarm-info'>
                              <img src={el.userImage} alt='profile' />
                              <div className='alarm-info-text'>
                                <span className='alarm-info-text-type'>{alarmType(el.type)}</span>
                                <span className='alarm-info-text-main'>{el.text}</span>
                              </div>
                            </div>
                            <div className='alarm-date'>
                              <span>{`${timeAgo(el.createdAt)} 전`}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  }
                  {(weekAlarm.length !== 0) &&
                    <div className='alarm-list-wrapper'>
                      <div className='alarm-list-date'>
                        <span>이번 주</span>
                      </div>
                      <div className='alarm-list'>
                        {weekAlarm.map(el =>
                          <div className='alarm'>
                            <div className='alarm-info'>
                              <img src={el.userImage} alt='profile' />
                              <div className='alarm-info-text'>
                                <span className='alarm-info-text-type'>{alarmType(el.type)}</span>
                                <span className='alarm-info-text-main'>{el.text}</span>
                              </div>
                            </div>
                            <div className='alarm-date'>
                              <span>{`${timeAgo(el.createdAt)} 전`}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  }
                </div>
              </ScrollArea>
            </div>
          </SafeAreaLayout>
        </DrawerContent>
      </Drawer>
      <SafeAreaLayout flexDirection={'column'}>
        <NavigatorLayout hasScrollArea={true}>
          <div className='home-header'>
            <Logo width={70} />
            <div className='home-alarm'>
              {alarms.length > 0 && (
                <div className='home-alarm-badge'>
                  <span>{alarms.length}</span>
                </div>
              )}
              <Alarm onClick={() => alarms.length > 0 ? onOpen() : undefined} width={19} height={19} />
            </div>
          </div>
          <div className='home'>
            <GrowthOfTheMonth />
            <Articles />
            <div className='home-posts'>
              {POST_CATEGORY_DATA.map((el) => (
                <PostPreview category={el} />
              ))}
            </div>
          </div>
        </NavigatorLayout>
      </SafeAreaLayout>
    </>

  );
};

const GrowthOfTheMonth = () => {
  const [growthUser, setGrowthUser] = useState<User.User | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dataType, setDataType] = useState<'FOLLOWER' | 'LIKES'>('FOLLOWER');

  const getGrowthUser = async () => {
    try {
      const result = await getUserInfoAPI(35);
      setGrowthUser(result);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getGrowthUser();
  }, []);
  if(!growthUser) return <></>;
  return (
    <>
      <Drawer onClose={onClose} isOpen={isOpen} placement='bottom' size={'full'}>
        <DrawerOverlay />
        <DrawerContent bgColor={'#121212'}>
          <div className='growth-user-detail'>
            <SafeAreaLayout safeAreaBackground={'#000000'} flexDirection={'column'}>
              <ScrollArea>
                <div className='growth-user-detail-top'>
                  <div className='growth-user-detail-gradient' />
                  <div className='growth-user-detail-header'>
                    <div style={{ width: 25 }} />
                    <span>PROM</span>
                    <X onClick={() => onClose()} />
                  </div>
                  <div className='growth-user-detail-user'>
                    <div className='growth-user-detail-user-text'>
                      <div className='growth-user-detail-user-title'>
                        <Tropy width={30} height={30} />
                        <span>이달의 성장</span>
                      </div>
                      <span style={{ color: '#7bf7ff' }}>축하합니다!</span>
                    </div>
                    <div className='growth-user-detail-user-profile'>
                      <img src={growthUser.profileImage} alt='' />
                      <span>{`${growthUser.username}님`}</span>
                    </div>
                  </div>
                </div>
                <div className='growth-user-detail-data-wrapper'>
                  <div className='growth-user-detail-data'>
                    <div className='growth-user-detail-data-from'>
                      <From />
                      <span>PROM 인사이트</span>
                    </div>
                    {dataType === 'FOLLOWER' && <FollowerAnalysis />}
                    {dataType === 'LIKES' && <LikesAnalysis />}
                    <div className='analysis-type'>
                      <div className='switch'>
                        <div className={cn('switch-handler', { likes: dataType === 'LIKES' })} />
                        <div className='slider'>
                          <div
                            className={cn('type', { selected: dataType === 'FOLLOWER' })}
                            onClick={() => setDataType('FOLLOWER')}
                          >
                            <span>팔로워</span>
                          </div>
                          <div
                            className={cn('type', { selected: dataType === 'LIKES' })}
                            onClick={() => setDataType('LIKES')}
                          >
                            <span>좋아요</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='growth-user-detail-comment-wrapper'>
                  <span style={{ color: '#ffffff' }}>PROM 에디터 : </span>
                  <span>
                    {'지난 한 달 동안, Siena 님은 놀라운 성과를 이루어냈습니다. 총 팔로워 수가 560명이 증가했고, 총 좋아요 수가 1250개나 늘었습니다. \n' +
                      '\n' +
                      '당신의 작품은 더욱 많은 사람들에게 사랑받고 있습니다. 계속해서 멋진 작품으로 모든 사람들에게 영감을 주세요!'}
                  </span>
                </div>
              </ScrollArea>
            </SafeAreaLayout>
          </div>
        </DrawerContent>
      </Drawer>
      <div className='growth' onClick={() => onOpen()}>
        <div className='growth-text'>
          <div className='growth-title'>
            <Tropy />
            <span>이달의 성장</span>
          </div>
          <span className='growth-description'>총 팔로워, 좋아요 수가 늘어난 아티스트 </span>
        </div>
        <div className='growth-user'>
          <img src={growthUser.profileImage} alt='user' />
          <span>{growthUser.username}님</span>
        </div>
      </div>
    </>
  );
};

const FollowerAnalysis = () => {
  const data = {
    follower: {
      prev   : {
        month: 9,
        count: 1240,
      },
      current: {
        month: 10,
        count: 1800,
      },
    },
  };

  return (
    <div className='data-analysis'>
      <div className='data-title'>
        <span style={{ color: '#7BF7FF', fontSize: 14, fontWeight: 600 }}>9월 대비</span>
        <span style={{ fontSize: 30, fontWeight: 600, color: '#949494' }}>
          <span style={{ color: '#ffffff' }}>{'총 팔로워 '}</span>
          {`+${(((data.follower.current.count - data.follower.prev.count) / data.follower.prev.count) * 100).toFixed(0)}%`}
        </span>
      </div>
      <div className='chart-follow'>
        <div className='chart-wrapper'>
          <div className='follow-chart prev'>
            <span className='follow-chart-data prev'>{data.follower.prev.count}명</span>
          </div>
          <div className='follow-chart current'>
            <span className='follow-chart-data current'>{data.follower.current.count}명</span>
          </div>
        </div>
        <div style={{ width: '100%', height: 1, backgroundColor: '#3F3F3F', marginBottom: 20 }} />
        <div className='chart-follow-date-wrapper'>
          <div className='chart-follow-date prev'>24년{` ${data.follower.prev.month}`}월</div>
          <div className='chart-follow-date current'>24년{` ${data.follower.current.month}`}월</div>
        </div>
      </div>
    </div>
  );
};

const LikesAnalysis = () => {
  const data = {
    likes: {
      prev   : {
        month: 9,
        count: 1250,
      },
      current: {
        month: 10,
        count: 2500,
      },
    },
  };

  return (
    <div className='data-analysis'>
      <div className='data-title'>
        <span style={{ color: '#7BF7FF', fontSize: 14, fontWeight: 600 }}>9월 대비</span>
        <span style={{ fontSize: 30, fontWeight: 600, color: '#949494' }}>
          <span style={{ color: '#ffffff' }}>{'총 좋아요 수 '}</span>
          {`+${(((data.likes.current.count - data.likes.prev.count) / data.likes.prev.count) * 100).toFixed(0)}%`}
        </span>
      </div>
      <div className='chart-likes'>
        <div className='chart-likes-date-wrapper'>
          <div className='chart-likes-date prev'>24년{` ${data.likes.prev.month}`}월</div>
          <div className='chart-likes-date current'>24년{` ${data.likes.current.month}`}월</div>
        </div>
        <div style={{ height: '100%', width: 1, backgroundColor: '#3F3F3F', marginLeft: 16 }} />
        <div className='chart-likes-wrapper'>
          <div className='likes-chart prev'>{data.likes.prev.count}개</div>
          <div className='likes-chart current'>{data.likes.current.count}개</div>
        </div>
      </div>
    </div>
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
      {isOpen && selectedArticle && (
        <ArticleDetail isOpen={isOpen} onClose={closeArticle} article={selectedArticle} />
      )}
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
                  <span className='article-content-date'>
                    {dayjs(el.createdAt).format('M월 DD일')}
                  </span>
                </div>
                <span className='article-content-bottom'>{el.contents[0].content}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <DefaultSwiperBullets currentSlideIndex={activeSlideIndex} slideLength={ARTICLES.length} />
      </div>
    </>
  );
};

type PostPreviewProps = {
  category: PostCategoryData;
};

const PostPreview = (props: PostPreviewProps) => {
  const { category } = props;
  const { name, icon } = category;
  const Icon = icon;
  const navigate = useAppNavigate();
  const [feed, setFeed] = useState<Post.PostFeed | null>(null);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isUserLikes, setIsUserLikes] = useState(false);

  const getRecentPost = async () => {
    try {
      const result = await getFeedsAPI({ size: 1, type: name, orderBy: 'asc' });
      if(result.length !== 0) {
        const feed = result[0];
        setFeed(feed);
        const likesCheck = await getFeedLikesCheckAPI(feed.feedId);
        setIsUserLikes(likesCheck);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const navigateToPost = () => {
    if(!feed) return;
    navigate(`post/${feed.feedId}`);
  };

  useEffect(() => {
    getRecentPost();
  }, [name]);

  if(!feed) return <></>;
  return (
    <div className='post-preview'>
      <div className='post-preview-header'>
        <div className='post-creator'>
          <img src={feed.user.profileImage} alt='profile' />
          <div className='post-creator-info'>
            <span className='post-creator-name'>{feed.user.username}</span>
            <div className='post-info'>
              <span>{feed.images.length}장의 사진</span>
              <div className='dot' />
              <span>{dayjs(feed.createdAt).from(dayjs())}</span>
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
          {feed.images.map((el) => (
            <SwiperSlide className={'post-swiper-slide'}>
              <img src={el} alt='content' />
            </SwiperSlide>
          ))}
        </Swiper>
        <DefaultSwiperBullets
          currentSlideIndex={activeSlideIndex}
          slideLength={feed.images.length}
        />
      </div>

      <div className='post-preview-detail'>
        <div className='post-preview-content-wrapper'>
          <span className='post-preview-content-title'>{feed.title}</span>
          <div className='post-preview-content-description-wrapper'>
            <span className={cn('post-preview-content-description', { open: descriptionOpen })}>
              {feed.description}
            </span>
            {!descriptionOpen && <button onClick={() => setDescriptionOpen(true)}>더보기</button>}
          </div>
          <div className='post-preview-interaction-wrapper'>
            <div className='post-preview-interaction' onClick={() => navigateToPost()}>
              <Like fill={isUserLikes ? '#7bf7ff' : '#B8B8B8'} />
              <span style={{ color: isUserLikes ? '#7bf7ff' : '#ffffff' }}>{feed.likeCounts}</span>
            </div>
            <div className='post-preview-interaction' onClick={() => navigateToPost()}>
              <Comment fill={'#B8B8B8'} />
              <span>{feed.commentCounts}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type ArticleDetailProps = Omit<DrawerProps, 'children'> & {
  article: Article;
};

const ArticleDetail = (props: ArticleDetailProps) => {
  const { onClose, isOpen, article } = props;
  return (
    <Drawer onClose={onClose} isOpen={isOpen} placement='bottom' size={'full'}>
      <DrawerContent bgColor={'#121212'} className='article-detail'>
        <ScrollArea>
          <div className='article-background-wrapper'>
            <img src={article.backgroundImage} alt='background' />
            <div className='background-gradient' />
            <div className='article-detail-header'>
              <Arrow onClick={() => onClose()} width={30} height={30} />
              <span>새로운 소식</span>
              <div style={{ width: 30 }} />
            </div>
          </div>
          <div className='article-detail-content'>
            <div className='article-detail-content-top'>
              <span className='article-detail-title'>{article.title}</span>
              <div className='article-detail-info'>
                <span className='article-detail-created-at'>
                  {dayjs(article.createdAt).format('YYYY년 M월 D일')}
                </span>
                <span className='article-detail-writer'>
                  {'Editor '}
                  <strong>PROM</strong>
                </span>
              </div>
            </div>

            <div className='article-content-list'>
              {article.contents.map((el) => {
                if(el.type === 'text') {
                  return <span className='article-content-text'>{el.content}</span>;
                }
                return (
                  <div className='article-image-wrapper'>
                    <img src={el.content} alt='image' />
                    <span>{el.caption}</span>
                  </div>
                );
              })}
            </div>
            <Logo width={94} opacity={0.5} />
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default Home;
