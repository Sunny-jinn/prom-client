enum ScheduleType {
  Personal,
  Artist
}

type MySchedule = {
  id: number;
  type: ScheduleType.Personal | ScheduleType.Artist; // 개인 일정, 아티스트 일정 구분 위함
  artist: string | null; // 아티스트 이름
  artistId: number | null; // 아티스트 ID, 상세 페이지에서 필요한 정보를 조회하기 위함
  title: string; // 제목
  date: string; // 날짜(YYYY-MM-DD), 요일 저장하지 않는다고 가정 (요일은 date로 day-js로 파싱)
  color: string;
}

export type {
  MySchedule,
};
