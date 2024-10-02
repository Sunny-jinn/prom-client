import '@/components/PickViewer.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import {
  createPickCommentAPI,
  getPickByIdAPI, getPickCommentAPI,
  getPickLikesCheckAPI, pickMarkLikeAPI, pickMarkUnLikeAPI,
} from '@/feature/api/post.api';
import { Post } from '@/feature/types';
import { PuffLoader } from 'react-spinners';
import ReactPlayer from 'react-player';
import BaseReactPlayer from 'react-player/base';
import { BaseReactPlayerProps } from 'react-player/types/base';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import PickIcon from '@/assets/img/img_pick_icon.png';
import { POST_CATEGORY_DATA, PostCategoryData } from '@/constants/init.data';
import { Volume2, VolumeX } from 'lucide-react';
import Likes from '@/assets/img/icon_like.svg?react';
import CommentIcon from '@/assets/img/icon_comment.svg?react';
import More from '@/assets/img/icon_more.svg?react';
import cn from 'classnames';
import { followUserAPI, getMyFollowingsAPI, unFollowUserAPI } from '@/feature/api/user.api';
import { Box, Image, Input, Text, useDisclosure } from '@chakra-ui/react';
import { timeAgo } from '@/utils/date.utils';
import icon_comment_upload from '@/assets/img/icon_comment_upload.png';
import MainBottomDrawer from '@/components/MainBottomDrawer';
import Comment from '@/components/Comment';
import userStore from '@/store/User';


type PickViewerProps = {
  pickIds: number[];
  setCurrentIndex: Dispatch<SetStateAction<number>>
}


const PickViewer = (props: PickViewerProps) => {
  const { pickIds, setCurrentIndex } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className='pick-viewer'>
      <Swiper
        onActiveIndexChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          setCurrentIndex(swiper.activeIndex);
        }}
        centeredSlides={true}
        direction={'vertical'}
        pagination={{ clickable: false }}
        slidesPerView={1}
        watchOverflow={true}
        className='pick-swiper'>
        {pickIds.map((pickId, index) =>
          <SwiperSlide className='pick-swiper-slide'>
            <PickContent index={index} activeIndex={activeIndex} pickId={pickId} />
          </SwiperSlide>,
        )}
      </Swiper>
    </div>
  );
};

export default PickViewer;

const PickContent = ({ pickId, activeIndex, index }: { pickId: number, activeIndex: number, index: number }) => {
  const [loading, setLoading] = useState(true);
  const [pick, setPick] = useState<Post.PostPick | null>(null);
  const [isFollow, setIsFollow] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false)
  const [isUserLike, setIsUserLike] = useState(false)
  const [newComment, setNewComment] = useState<string>('');
  const [pickComment, setPickComment] = useState<Post.PickComment[]>([])
  const {user} = userStore(state => state)
  // player state
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true); // 기본 음소거, 자동 재생
  const playerRef = useRef<BaseReactPlayer<BaseReactPlayerProps>>(null); // ReactPlayer의 ref 속성에 삽입해 메소드 제어 (변경된 재생 시간에 따른 실제 영상 재생 위치)
  const [playTime, setPlayTime] = useState(0); // 현재 재생 시간 (0부터 0.999999, 퍼센트로 표기된 총 재생 시간 대비 현재 시간 값)
  const [ready, setReady] = useState(false); // onReady에서 영상이 로드된 상태값을 받아 사용

  const {
          isOpen : isCommentOpen,
          onOpen : openCommentDrawer,
          onClose: closeCommentDrawer,
        } = useDisclosure();

  const getPick = async () => {
    try {
      const result = await getPickByIdAPI(pickId);
      setPick(result);
      const followings = await getMyFollowingsAPI();
      const comments = await getPickCommentAPI(pickId)
      setPickComment(comments)
      //TODO: result에 있는 userID 팔로잉 중인지 확인
      if(followings.find(el => el.id === 13)) {
        setIsFollow(true);
      }
      const isLike = await getPickLikesCheckAPI(pickId);
      setIsUserLike(isLike)
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const progressHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if(!playerRef.current) return;
    setPlayTime(parseFloat(e.target.value));
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const followHandler = async() => {
    if(!pick) return;
    if(!isFollow){
      try{
        await followUserAPI(pick.user.id);
        setIsFollow(true);
      }catch (e) {
        console.log(e);
      }
      return;
    }
    try{
      await unFollowUserAPI(pick.user.id);
      // await unFollowUserAPI(13);
      setIsFollow(false);
    }catch (e) {
      console.log(e);
    }
  }

  const onClickLike = async () => {
    if(!isUserLike){
      try {
        await pickMarkLikeAPI(pickId);
        const pick = await getPickByIdAPI(pickId);
        setPick(pick);
        setIsUserLike(true)
      } catch (e) {
        console.log(e);
      }
      return;
    }
    try {
      await pickMarkUnLikeAPI(pickId);
      const pick = await getPickByIdAPI(pickId);
      setPick(pick);
      setIsUserLike(false)
    } catch (e) {
      console.log(e);
    }
  };

  const handleCommentUpload = async () => {
    if(newComment === '') return;
    try {
      await createPickCommentAPI(pickId, {
        content: newComment,
      });
      const updatedComments =  await getPickCommentAPI(pickId)
      const pick = await getPickByIdAPI(pickId);
      setPick(pick);
      setPickComment(updatedComments);
      setNewComment('');
    } catch {
      console.log('error');
    }
  };

  useEffect(() => {
    if(pickId && (activeIndex === index)) {
      getPick();
    }
  }, [pickId, activeIndex, index]);

  useEffect(() => {
    if(ready) {
      setPlaying((activeIndex === index));
    }
  }, [ready, activeIndex, index]);

  if(!loading && pick) {
    return (
      <>
        <MainBottomDrawer isOpen={isCommentOpen} onClose={closeCommentDrawer}>
          <Box sx={{ position: 'relative', height: '100%' }}>
            <Box sx={{ textAlign: 'center', marginBottom: '15px' }}>
              <Text sx={{ color: '#fff', fontWeight: '600' }}>댓글</Text>
            </Box>
            {pickComment.map((item) => (
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
                  // placeholder={`${feedInfo.user.username} 님의 게시물에 댓글달기`}
                  placeholder={`정의왕 님의 게시물에 댓글달기`}
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
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
        <div className='pick-content'>
          <div className='pick-video-wrapper'>
            <ReactPlayer
              loop={true}
              playsinline={true}
              volume={0.9}
              url={pick.videoUrl} // 링크 배열로 삽입 가능(종료 시 onEnded없이도 자동으로 다음 인덱스의 링크 재생)
              ref={playerRef} // 실제 영상 재생 위치 조절
              className='pick-video'
              playing={playing} // 재생 상태, true - 재생중 / false - 일시 중지
              muted={muted}
              controls={false} // 유튜브 재생바 노출 여부
              onReady={() => setReady(true)} // 영상이 로드되어 준비된 상태
              onProgress={({ played }) => setPlayTime(played)} // 현재 재생 시간
            />
            <div className='pick-features-wrapper'>
              <SafeAreaLayout justifyContent={'space-between'} flexDirection={'column'}
                              safeAreaBackground={'transparent'}>
                <div className='pick-features'>
                  <div className='pick-features-header'>
                    <div className='pick-features-header-info'>
                      <img src={PickIcon} alt='pick' />
                      <PickType type={pick.type as Post.PostCategory} />
                    </div>
                    {muted ?
                      <VolumeX onClick={() => setMuted(false)} color={'#ffffff'} /> :
                      <Volume2 onClick={() => setMuted(true)} color={'#ffffff'} />}
                  </div>
                  <div className='pick-features-main'>
                    <div className='pick-features-info'>
                      <div className='pick-features-user-wrapper'>
                        <div className='pick-features-user'>
                          <img src={pick.user.profileImage} alt='profile' />
                          <span>{pick.user.username}</span>
                        </div>
                        {user?.id !== pick.user.id &&
                          <button className={cn('pick-follow-button', {isFollow: isFollow})} onClick={() => followHandler()}>
                            {isFollow ? '팔로잉' : '팔로우'}
                          </button>
                        }
                      </div>
                      <div onClick={() => setIsContentOpen(prev => !prev)} className={cn('pick-features-content', {isOpen: isContentOpen})}>
                        <span className='pick-title'>{pick.title}</span>
                        <br/>
                        <span className='pick-description'>{pick.description}</span>
                      </div>
                    </div>
                    <div className='pick-features-interaction'>
                      <div className='pick-feature-element'>
                        <Likes fill={isUserLike ? '#7bf7ff' : '#ffffff'} onClick={() => onClickLike()}/>
                        {!isNaN(Number(pick.likeCounts)) && <span style={{color: isUserLike ? '#7bf7ff' : '#ffffff'}}>{pick.likeCounts}</span>}
                      </div>
                      <div className='pick-feature-element'>
                        <CommentIcon fill={'#ffffff'} onClick={() => openCommentDrawer()}/>
                        {!isNaN(Number(pick.commentCounts)) && <span>{pick.commentCounts}</span>}
                      </div>
                      <div className='pick-feature-element'>
                        <More/>
                      </div>
                    </div>
                  </div>
                </div>
              </SafeAreaLayout>
            </div>
          </div>
          <input
            className='progress'
            type='range'
            min='0'
            max='0.999999'
            step='any'
            value={playTime}
            disabled={!ready}
            style={{ background: `linear-gradient(to right, #7bf7ff ${playTime * 100}%, #554F4F 0)` }}
            onChange={(e) => progressHandler(e)}
          />
        </div>
      </>
    );
  }
  return (
    <div className='loading'>
      <PuffLoader size={80} color={'#7bf7ff'} />
    </div>
  );
};

const PickType = ({ type }: { type: Post.PostCategory }) => {
  const postType = useMemo(() => {
    return POST_CATEGORY_DATA.find(el => el.name === type) as PostCategoryData;
  }, [type]);

  const Icon = useMemo(() => postType.icon, [postType]);

  return (
    <div className='pick-type'>
      <Icon width={14} height={14} />
      <span style={{ color: postType.color }}>{postType.name}</span>
    </div>
  );
};
