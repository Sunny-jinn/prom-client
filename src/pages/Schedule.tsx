import Calendar from 'react-calendar';
import '@/style/reactCalendar.scss';
import '@/style/IOSDatePicker.scss';
import { PageLayout } from '@/components/PageLayout';
import './Schedule.scss';
import { useEffect, useMemo, useState } from 'react';
import { dateFormatter } from '@/utils/date.utils';
import dayjs from 'dayjs';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { RowFlexBox } from '@/components/atom/RowFlexBox';
import { ScrollArea } from '@/components/ScrollArea';
import Search from '@/assets/img/icon_search_square.svg?react';
import SideTab from '@/assets/img/icon_sidetab_square.svg?react';
import { getMyScheduleParser } from '@/feature/parser';
import { MySchedule } from '@/feature/types/client';
import ScheduleCalendar from '@/components/ScheduleCalendar';

//tileContent: 날짜 칸에 보여지는 컨텐츠

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState<string>(dateFormatter(new Date()));
  const setFormattedDate = (value: Date) => setSelectedDate(dateFormatter(value));

  const [mySchedule, setMySchedule] = useState<Array<MySchedule>>([]);

  const selectedDateSchedule = useMemo(() => {
    return []
  }, [selectedDate, mySchedule])

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
      <div className='schedule-header'>
        <div className='schedule-header-bar'>
          <RowFlexBox gap={10}>
            <ArrowLeft color={'#ffffff'} width={'18px'} />
            <RowFlexBox gap={7}>
              <span>{dayjs(selectedDate).format('YYYY년 M월')}</span>
              <ChevronDown color={'#B8B8B8'} width={'20px'} />
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
      <ScrollArea>
        <div style={{ height: 1000 }}>asd</div>
      </ScrollArea>

      {/*<DatePicker*/}
      {/*  onChange={(y: number, m: number, d: number) => {*/}
      {/*    console.log(y, m, d);*/}
      {/*  }}*/}
      {/*  formatters={{*/}
      {/*    year : value => `${value}년`,*/}
      {/*    month: value => `${value}월`,*/}
      {/*    day  : value => `${value}일`,*/}
      {/*  }}*/}
      {/*/>*/}
    </PageLayout>
  );
};

export default Schedule;
