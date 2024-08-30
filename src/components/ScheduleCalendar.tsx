import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import { MySchedule } from '@/feature/types/client';
import { dateFormatter } from '@/utils/date.utils';
import styled from '@emotion/styled';
import { RowFlexBox } from '@/components/atom/RowFlexBox';

type ScheduleCalendarProps = {
  onChange: (value: Date) => void;
  value: string;
  //TODO: Schedule로 확장될수도?
  schedule: Array<MySchedule>
}

const ScheduleCalendar = (props: ScheduleCalendarProps) => {
  const { onChange, value, schedule } = props;
  return (
    <Calendar
      formatDay={(_, date) => dayjs(date).format('D')}
      calendarType={'gregory'}
      onChange={(value) => onChange(value as Date)}
      showNavigation={false}
      value={value}
      tileContent={({ date }) => {
        const html = [];
        const filteredSchedule = schedule.filter(el => {
          if(dayjs(dateFormatter(date)).isSame(dateFormatter(el.date))) {
            return el;
          }
        });
        if(filteredSchedule.length > 0 && filteredSchedule.length < 4) {
          // 0 ~ 3
          html.push(
            <RowFlexBox gap={3}>
              {filteredSchedule.map(el => <Dot color={el.color}/>)}
            </RowFlexBox>,
          );
        }
        if(filteredSchedule.length >= 4) {
          // 4 이상
          html.push(<Count>+{filteredSchedule.length}</Count>);
        }
        console.log(filteredSchedule);
        return <>{html}</>;
      }}
    />
  );
};

/* 출석한 날짜에 점 표시 스타일 */
const Dot = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  width: 6px;
  height: 6px;
`;

const Count = styled.span`
  font-size: 12px;
  color: #7BF7FF;
`;

export default ScheduleCalendar;
