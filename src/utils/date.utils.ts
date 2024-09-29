import dayjs from 'dayjs';

const dateFormatter = (date: Date | string) => {
  return dayjs(date).format('YYYY-MM-DD');
};

const timeAgo = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  const diffInSeconds = Math.floor((currentDate.getTime() - createdDate.getTime()) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years}년`;
  } else if (months > 0) {
    return `${months}개월`;
  } else if (days > 0) {
    return `${days}일`;
  } else if (hours > 0) {
    return `${hours}시간`;
  } else if (minutes > 0) {
    return `${minutes}분`;
  } else {
    return `방금 전`;
  }
};

export { dateFormatter, timeAgo };
