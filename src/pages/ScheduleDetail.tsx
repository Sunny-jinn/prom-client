import { useState } from 'react';
import './ScheduleDetail.scss';
import LeftArrow from '@/assets/img/icon_arrow.svg?react';
import X from '@/assets/img/icon_x_red.svg?react';
import { RowFlexBox } from '@/components/atom/RowFlexBox';
import { Heart } from 'lucide-react';
import { ScheduleCard } from '@/components/atom/ScheduleCard';
import dayjs from 'dayjs';
import useAppNavigate from '@/hooks/useAppNavigate';

const artist = {
  backgroundImage: 'https://i.ibb.co/C8332QR/image-71.png',
  profileImage   : 'https://i.ibb.co/dMVY15S/image.png',
  name           : '오프더메뉴',
  intro          : '인디 밴드', // 한줄 소개 첫번째
  isFavorite     : false,
};

const schedule = {
  artist: '오프더메뉴',
  title : '콘서트 티켓팅 오픈',
  color : '#ffffff',
  date  : '2024-09-16 22:00',
};

const ScheduleDetail = () => {
  // const { id } = useParams();
  const navigate = useAppNavigate();
  const [artistDetail] = useState(artist);
  const [scheduleDetail] = useState(schedule);

  return (
    <div className={'schedule-detail'}>
      <div className='schedule-detail-top' style={{ backgroundImage: artistDetail.backgroundImage }}>
        <img className='schedule-detail-top-background' src={artistDetail.backgroundImage} alt='' />
        <div className='schedule-detail-header'>
          <LeftArrow onClick={() => navigate('/schedule')} />
          <span>상세 일정</span>
        </div>
        <div className='schedule-detail-profile'>
          <RowFlexBox gap={12}>
            <img src={artistDetail.profileImage} alt='' />
            <div className='artist-info'>
              <span className='artist-info-name'>{artistDetail.name}</span>
              <span className='artist-info-intro'>{artistDetail.intro}</span>
            </div>
          </RowFlexBox>
          <Heart color={'#A6A6A6'} fill={artistDetail.isFavorite ? '#A6A6A6' : 'transparent'} />
        </div>
      </div>
      <div className='schedule-detail-card-wrapper'>
        <ScheduleCard border={'1px solid #ffffff'}>
          <div className='schedule-detail-card'>
            <RowFlexBox justify={'space-between'}>
             <span className='schedule-detail-card-artist'>
              {scheduleDetail.artist ?? '개인 일정'}
            </span>
              <span className='schedule-detail-card-time'>{dayjs(scheduleDetail.date).format('M월 D일 ddd요일')}</span>
            </RowFlexBox>
            <RowFlexBox justify={'space-between'}>
              <div className='schedule-detail-card-title-wrapper'>
                <span style={{ width: 4, height: 4, backgroundColor: scheduleDetail.color, borderRadius: '50%' }} />
                <span className='schedule-detail-card-title'>{scheduleDetail.title}</span>
              </div>
              <span className='schedule-detail-card-time'>{dayjs(scheduleDetail.date).format('HH:mm')}</span>
            </RowFlexBox>
          </div>
        </ScheduleCard>
        <button className='delete-schedule-button'>
          <X/>
          일정 삭제
        </button>
      </div>
    </div>
  );
};

export default ScheduleDetail;
