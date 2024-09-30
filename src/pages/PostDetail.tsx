import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Image, Input, Text, useDisclosure } from '@chakra-ui/react';
import 'swiper/css';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import comment from '@/assets/img/comment.png';
import ellipsis from '@/assets/img/ellipsis.png';
import icon_comment_upload from '@/assets/img/icon_comment_upload.png';
import left_arrow from '@/assets/img/left_arrow.png';
import Comment from '@/components/Comment';
import CustomBottomDrawer from '@/components/CustomBottomDrawer';
import CustomBottomModal from '@/components/CustomBottomModal';
import MainBottomDrawer from '@/components/MainBottomDrawer';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import { UserFeedsResponse, getPostsDetail } from '@/feature/api/mypage.api';
import { createCommentAPI, getCommentAPI, getFeedLikesCheckAPI, feedMarkLikeAPI, feedMarkUnLikeAPI } from '@/feature/api/post.api';
import { FeedComment } from '@/feature/types/Post.type';
import { timeAgo } from '@/utils/date.utils';
import './PostDetail.scss';
import Like from '@/assets/img/icon_like_feed.svg?react'
import dayjs from 'dayjs';
import userStore from '@/store/User';

const PostDetail = () => {
  const{user} = userStore(state => state)
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isClicked] = useState<boolean>(false);
  const [feedInfo, setFeedInfo] = useState<UserFeedsResponse | null>(null);
  const [feedComments, setFeedComments] = useState<FeedComment[]>([]);
  const [newComment, setNewComment] = useState<string | null>(null);
  const [isUserLike, setIsUserLike] = useState(false)

  const navigate = useNavigate();

  const { post_id } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if(post_id) {
        const feed = await getPostsDetail(post_id);
        const comments = await getCommentAPI(post_id);
        const isLike = await getFeedLikesCheckAPI(feed.feedId);
        setFeedInfo(feed);
        setFeedComments(comments);
        setIsUserLike(isLike)
        console.log(feed);
      }
    };
    fetchUserInfo();
  }, []);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentUpload = async () => {
    try {
      if(post_id && newComment) {
        await createCommentAPI(post_id, {
          content: newComment,
        });
        const updatedComments = await getCommentAPI(post_id); // 새로운 댓글 목록을 불러오기
        setFeedComments(updatedComments);
        setNewComment('');
      }
    } catch {
      console.log('error');
    }
  };

  const { isOpen: isDrawerOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();
  const {
          isOpen : isCommentOpen,
          onOpen : openCommentDrawer,
          onClose: closeCommentDrawer,
        } = useDisclosure();

  const {
          isOpen : isDeleteDrawerOpen,
          onOpen : openDeleteDrawer,
          onClose: closeDeleteDrawer,
        } = useDisclosure();
  const {
          isOpen : isBottomModalOpen,
          onOpen : openBottomModal,
          onClose: closeBottomModal,
        } = useDisclosure();
  const {
          isOpen : isDeleteModalOpen,
          onOpen : openDeleteModal,
          onClose: closeDeleteModal,
        } = useDisclosure();

  const clickHandler = () => {
    closeDrawer();
    openBottomModal();
  };

  const deleteClick = () => {
    closeDrawer();
    openDeleteDrawer();
  };

  const newDeleteClick = () => {
    closeDeleteDrawer();
    openDeleteModal();
  };

  const PostDetailModal = [
    {
      id     : 0,
      text   : '수정',
      onClick: () => console.log('최신순'),
      update : true,
    },
    {
      id     : 1,
      text   : '보관',
      onClick: clickHandler,
    },
    {
      id     : 2,
      text   : '삭제',
      onClick: deleteClick,
      delete : true,
    },
  ];

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveSlideIndex(swiper.activeIndex);
  };

  const onClickLike = async () => {
    if(!feedInfo) return;
    if(!post_id) return;
    if(!isUserLike){
      try {
        await feedMarkLikeAPI(feedInfo.feedId);
        const feed = await getPostsDetail(post_id);
        setFeedInfo(feed)
        setIsUserLike(true)
      } catch (e) {
        console.log(e);
      }
      return;
    }
    try {
      await feedMarkUnLikeAPI(feedInfo.feedId);
      const feed = await getPostsDetail(post_id);
      setFeedInfo(feed)
      setIsUserLike(false)
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaLayout flexDirection='column'>
      {feedInfo && (
        <div id='PostDetail'>
          <div className='post-detail-header'>
            <div className='post-detail-back-btn' onClick={() => navigate(-1)}>
              <img src={left_arrow} alt='' />
            </div>
            <div className='post-detail-user'>
              <span className='post-detail-user-name'>{feedInfo.user.username} 님의</span>
              <span>게시물</span>
            </div>
            <div className='post-detail-ellipsis-btn' onClick={openDrawer}>
              <img src={ellipsis} alt='' />
            </div>
          </div>
          <div className='post-detail-carousel'>
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              grabCursor={true}
              onSlideChange={handleSlideChange}
            >
              {feedInfo.images.map((item) => (
                <SwiperSlide key={item}>
                  <img src={item} alt='test' />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className='swiper-bullets'>
              {feedInfo.images.map((_, index) => (
                <div
                  key={index}
                  className={`bullet ${activeSlideIndex === index ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>

          <div className='post-detail-menus'>
            <div className={`post-detail-menu ${isClicked && 'clicked'}`}>
              <Like fill={isUserLike ? '#7bf7ff' : '#ffffff'} onClick={() => onClickLike()}/>
              <span style={{color: isUserLike ? '#7bf7ff' : '#ffffff'}}>{feedInfo.likeCounts}</span>
            </div>
            <button className='post-detail-menu' onClick={openCommentDrawer}>
              <img src={comment} alt='comment' />
              <span>{feedComments.length}</span>
            </button>
            {/*<div className='post-detail-menu'>*/}
            {/*  <img src={out} alt='out' />*/}
            {/*</div>*/}
            {/*<div className='post-detail-menu right'>*/}
            {/*  <img src={bookmark} alt='out' />*/}
            {/*</div>*/}
          </div>

          <div className='post-detail-author'>
            <img src={feedInfo.user.profileImage} alt='profile' />
            <span>{feedInfo.user.username}</span>
          </div>

          <div className='post-detail-intro'>
            <div className='post-detail-intro-title'>
              <span className='post-detail-intro-title-text'>{feedInfo.title}</span>
              <span className='post-detail-intro-title-date'>{dayjs(feedInfo.createdAt).format('M월 D일')}</span>
            </div>
            <div className='post-detail-intro-content'>{feedInfo.description}</div>
          </div>

          <CustomBottomDrawer
            options={PostDetailModal}
            cancel
            onClose={closeDrawer}
            isOpen={isDrawerOpen}
          />

          <CustomBottomDrawer
            cancel
            onClose={closeDeleteDrawer}
            isOpen={isDeleteDrawerOpen}
            isDelete
            onDelete={newDeleteClick}
          />

          <CustomBottomModal
            text='게시물이 보관함에 보관됨'
            icon='modal_check'
            isOpen={isBottomModalOpen}
            onClose={closeBottomModal}
          />

          <CustomBottomModal
            text='게시물 삭제됨'
            icon='modal_delete'
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
          />

          <MainBottomDrawer isOpen={isCommentOpen} onClose={closeCommentDrawer}>
            <Box sx={{ position: 'relative', height: '100%' }}>
              <Box sx={{ textAlign: 'center', marginBottom: '15px' }}>
                <Text sx={{ color: '#fff', fontWeight: '600' }}>댓글</Text>
              </Box>
              {feedComments.map((item) => (
                <Comment
                  profile={item.profileImage}
                  key={item.commentId}
                  nickname={item.userName}
                  content={item.comment}
                  date={timeAgo(item.createdAt)}
                  isArtist={item.userId === 12}
                />
              ))}
              <Box
                sx={{
                  display   : 'flex',
                  alignItems: 'center',
                  position  : 'absolute',
                  bottom    : '40px',
                  width     : 'calc(100% - 32px)',
                  margin    : '0 16px',
                  gap       : '8px',
                }}
              >
                <Box sx={{ border: '1px solid #fff', borderRadius: '999' }}>
                  <Image
                    src={user?.profileImage}
                    alt='profile'
                    sx={{ width: '43px', height: '43px', borderRadius: 999 }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Input
                    bg='#353535'
                    border='0'
                    borderRadius='15px'
                    padding='13px 16px'
                    color='#fff'
                    fontSize='14px'
                    _focus={{
                      boxShadow: 'none',
                    }}
                    placeholder={`${feedInfo.user.username} 님의 게시물에 댓글달기`}
                    value={newComment || ''}
                    onChange={handleCommentChange}
                  />
                  <Box
                    sx={{
                      position    : 'absolute',
                      right       : '5px',
                      top         : '50%',
                      transform   : 'translateY(-50%)',
                      background  : '#1d1d1d',
                      borderRadius: '9px',
                      padding     : '3px 6px',
                      zIndex      : '1',
                      transition  : '0.2s ease-in-out',
                      '&:active'  : {
                        background: '#000000',
                      },
                    }}
                    onClick={handleCommentUpload}
                  >
                    <Image
                      src={icon_comment_upload}
                      alt='upload'
                      sx={{ width: '25px', height: '25px' }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </MainBottomDrawer>
        </div>
      )}
    </SafeAreaLayout>
  );
};

export default PostDetail;
