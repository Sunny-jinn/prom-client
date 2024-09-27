import '@/components/PickViewer.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { getPickByIdAPI } from '@/feature/api/post.api';
import { Post } from '@/feature/types';
import { PuffLoader } from 'react-spinners';
import ReactPlayer from 'react-player';
import BaseReactPlayer from 'react-player/base';
import { BaseReactPlayerProps } from 'react-player/types/base';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import PickIcon from '@/assets/img/img_pick_icon.png';
import { POST_CATEGORY_DATA, PostCategoryData } from '@/constants/init.data';
import { PostCategory } from '@/feature/types/Post.type';
import { Volume2, VolumeX } from 'lucide-react';

type PickViewerProps = {
  pickIds: number[];
}


const PickViewer = (props: PickViewerProps) => {
  const { pickIds } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className='pick-viewer'>
      <Swiper
        onActiveIndexChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
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

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true); // 기본 음소거, 자동 재생
  const playerRef = useRef<BaseReactPlayer<BaseReactPlayerProps>>(null); // ReactPlayer의 ref 속성에 삽입해 메소드 제어 (변경된 재생 시간에 따른 실제 영상 재생 위치)
  const [playTime, setPlayTime] = useState(0); // 현재 재생 시간 (0부터 0.999999, 퍼센트로 표기된 총 재생 시간 대비 현재 시간 값)
  const [ready, setReady] = useState(false); // onReady에서 영상이 로드된 상태값을 받아 사용

  const getPick = async () => {
    try {
      const result = await getPickByIdAPI(pickId);
      setPick(result);
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

  console.log(pick);

  if(!loading && pick) {
    return (
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
                  {muted ? <VolumeX onClick={() => setMuted(false)} color={'#ffffff'} /> :
                    <Volume2 onClick={() => setMuted(true)} color={'#ffffff'} />}
                </div>
                <div>asd</div>
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
          style={{ '--progress': `${playTime * 100}%` }}
          onChange={(e) => progressHandler(e)}
        />
      </div>
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
