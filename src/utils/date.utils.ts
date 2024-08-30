import dayjs from 'dayjs';

const dateFormatter = (date: Date | string) => {
  return dayjs(date).format('YYYY-MM-DD');
}

export {
  dateFormatter
}
