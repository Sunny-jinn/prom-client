import { wait } from '@/feature/parser/utils';
import { MySchedule } from '@/feature/types/client';

const getMyScheduleParser = async (): Promise<Array<MySchedule>> => {
  const data = [
    {
      id      : 1,
      type    : 1,
      date    : '2024-09-08 18:00',
      artist  : '오프더메뉴',
      artistId: 1,
      title   : '콘서트 티켓팅 오픈',
    },
    {
      id      : 4,
      type    : 1,
      date    : '2024-09-08 18:00',
      artist  : '랜드오브피스',
      artistId: 2,
      title   : '굿즈스토어 오픈',
    },
    {
      id      : 5,
      type    : 0,
      date    : '2024-09-08 18:00',
      artist  : null,
      artistId: null,
      title   : '지소쿠리클럽 굿즈 사기',
    },
    {
      id      : 6,
      type    : 1,
      date    : '2024-09-09 18:00',
      artist  : '랜드오브피스',
      artistId: 2,
      title   : '콘서트 티켓팅 오픈',
    },
    {
      id      : 7,
      type    : 1,
      date    : '2024-09-09 21:00',
      artist  : '오프더메뉴',
      artistId: 1,
      title   : '굿즈 추첨',
    },
    // {
    //   id: 8,
    //   type    : 1,
    //   date    : '2024-08-16 22:00',
    //   artist  : '랜드오브피스',
    //   artistId: 2,
    //   title   : '굿즈스토어 오픈',
    // },
    {
      id      : 9,
      type    : 0,
      date    : '2024-09-16 22:00',
      artist  : null,
      artistId: null,
      title   : '오프더메뉴 굿즈 사기',
    },
    {
      id      : 10,
      type    : 0,
      date    : '2024-09-16 20:00',
      artist  : null,
      artistId: null,
      title   : '랜드오브피스 굿즈 사기',
    },
    {
      id      : 11,
      type    : 0,
      date    : '2024-09-31 09:00',
      artist  : null,
      artistId: null,
      title   : '티겟팅 오픈',
    },
    {
      id      : 12,
      type    : 0,
      date    : '2024-09-16 22:00',
      artist  : null,
      artistId: null,
      title   : '오프더메뉴 굿즈 사기',
    },
    {
      id      : 13,
      type    : 0,
      date    : '2024-09-16 22:00',
      artist  : null,
      artistId: null,
      title   : '오프더메뉴 굿즈 사기',
    },
  ];
  // color는 localstorage에서 조회
  const color = [
    { id: 1, color: '#32D4E0' },
    { id: 2, color: '#FFD440' }];
  const result = await wait(data, 0);
  return result.map(el => {
    let themeColor = '#ffffff';
    const theme = color.find(color => color.id === el.artistId);
    if(theme) {
      themeColor = theme.color;
    }
    return {
      id      : el.id,
      type    : el.type,
      date    : el.date,
      time    : el.time,
      artist  : el.artist,
      artistId: el.artistId,
      title   : el.title,
      color   : themeColor,
    };
  }) as Array<MySchedule>;

};

export {
  getMyScheduleParser,
};
