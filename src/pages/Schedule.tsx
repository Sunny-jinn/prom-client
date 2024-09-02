import { PageLayout } from '@/components/PageLayout';
import './Schedule.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { dateFormatter } from '@/utils/date.utils';
import dayjs from 'dayjs';
import { ChevronDown } from 'lucide-react';
import { RowFlexBox } from '@/components/atom/RowFlexBox';
import { ScrollArea } from '@/components/ScrollArea';
import Search from '@/assets/img/icon_search_square.svg?react';
import SideTab from '@/assets/img/icon_sidetab_square.svg?react';
import LeftArrow from '@/assets/img/icon_arrow.svg?react';
import AddSchedule from '@/assets/img/icon_add_schedule.svg?react';
import Artist from '@/assets/img/icon_artist.svg?react';
import Artty from '@/assets/img/icon_artty.svg?react';
import { getMyScheduleParser } from '@/feature/parser';
import { MySchedule } from '@/feature/types/client';
import ScheduleCalendar from '@/components/ScheduleCalendar';
import _ from 'lodash';
import { ScheduleCard } from '@/components/atom/ScheduleCard';
import { Drawer, DrawerBody, DrawerContent, DrawerOverlay, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

//tileContent: 날짜 칸에 보여지는 컨텐츠

const Schedule = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAddMode, setIsAddMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(dateFormatter(new Date()));
  const setFormattedDate = (value: Date) => setSelectedDate(dateFormatter(value));

  const artistButtonRef = useRef();
  const arttyButtonRef = useRef();

  const [mySchedule, setMySchedule] = useState<Array<MySchedule>>([]);

  const selectedDateSchedule = useMemo(() => {
    //필터링 + 시간순 정렬
    return _.sortBy(mySchedule.filter(el => dayjs(selectedDate).isSame(dateFormatter(el.date))), 'date');
  }, [selectedDate, mySchedule]);

  console.log(selectedDate);
  console.log(selectedDateSchedule);

  const getMySchedule = async () => {
    try {
      //1. 목록 조회
      const result = await getMyScheduleParser();
      setMySchedule(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    //TODO: 스케줄 페이지 진입시 아래 로직 실행
    //2. 내 스케줄 목록 조회
    getMySchedule();
  }, []);
  return (
    <PageLayout safeAreaBackground={'#292929'} direction={'column'}>
      <Drawer placement={'top'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bgColor={'#292929'} paddingTop={'env(safe-area-inset-top)'}>
          <DrawerBody padding={'20px'}>
            <div className='my-schedule-date-picker'>
              <button className='my-schedule-date-picker-button'>완료</button>
              {/*<DatePicker/>*/}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <div className='schedule-header'>
        <div className='schedule-header-bar'>
          <RowFlexBox gap={10}>
            <LeftArrow />
            <RowFlexBox gap={7}>
              <span>{dayjs(selectedDate).format('YYYY년 M월')}</span>
              <ChevronDown color={'#B8B8B8'} width={'20px'} onClick={() => onOpen()} />
            </RowFlexBox>
          </RowFlexBox>
          <RowFlexBox gap={12}>
            <Search color={'#ffffff'} />
            <SideTab color={'#ffffff'} />
          </RowFlexBox>
        </div>
        <div className='schedule-header-calendar-wrapper'>
          <ScheduleCalendar
            schedule={mySchedule}
            onChange={(value) => setFormattedDate(value as Date)}
            value={selectedDate} />
        </div>
      </div>
      <ScrollArea padding={'25px 15px'}>
        <div className='schedule-list-container'>
          <div className='schedule-list-header'>
            <span className='schedule-list-date'>{dayjs(selectedDate).format('M.D (ddd)')}</span>
            {selectedDateSchedule.length > 0 &&
              <>
                <span style={{ width: 4, height: 4, backgroundColor: '#ffffff', borderRadius: '50%' }} />
                <span className='schedule-list-count'>{selectedDateSchedule.length}개의 일정</span>
              </>
            }
          </div>
          <div className='my-schedule-list'>
            {selectedDateSchedule.map(el =>
              <ScheduleCard>
                <div className='my-schedule' onClick={() => navigate(`${el.id}`)}>
                  <span className='my-schedule-artist'>
                    {el.artist ?? '개인 일정'}
                  </span>
                  <RowFlexBox justify={'space-between'}>
                    <div className='my-schedule-title-wrapper'>
                      <span style={{ width: 4, height: 4, backgroundColor: el.color, borderRadius: '50%' }} />
                      <span className='my-schedule-title'>{el.title}</span>
                    </div>
                    <span className='my-schedule-time'>{dayjs(el.date).format('HH:mm')}</span>
                  </RowFlexBox>
                </div>
              </ScheduleCard>,
            )}
          </div>
        </div>
      </ScrollArea>
      <div className='add-schedule-button-wrapper' onClick={() => setIsAddMode(prev => !prev)}>
        <div className='add-schedule-button'>
          <AddSchedule rotate={isAddMode ? '45' : '0'} />
        </div>
      </div>
      <div className='add-schedule-button-wrapper artist'
           style={{
             opacity: isAddMode ? 1 : 0,
             bottom : isAddMode ? 182 : 44,
           }}>
        <span>아티스트 일정</span>
        <div className='add-schedule-button artist'>
          <Artist />
        </div>
      </div>
      <div className='add-schedule-button-wrapper artty'
           style={{
             opacity: isAddMode ? 1 : 0,
             bottom : isAddMode ? 114 : 44,
           }}>
        <span>아 일정</span>
        <div className='add-schedule-button artty'>
          <Artty />
        </div>
      </div>
      {isAddMode &&
        <div className='add-schedule-screen'>

        </div>
      }
    </PageLayout>
  );
};

export default Schedule;
