export const MONTHS_NOMINATIVE = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];

export const MONTHS_GENITIVE = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

export const DAYS_OF_WEEK = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
];

export function compareDates(date1, date2) {
  const first = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const second = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return first.getTime() - second.getTime();
}

export function isDateSelectable(day, month, year, today) {
  const date = new Date(year, month, day);
  return compareDates(date, today) >= 0;
}

export function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const cells = [];

  for (let index = startOffset; index > 0; index -= 1) {
    cells.push({
      day: daysInPreviousMonth - index + 1,
      month: month - 1,
      year,
      outside: true
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      day,
      month,
      year,
      outside: false
    });
  }

  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({
      day: nextDay,
      month: month + 1,
      year,
      outside: true
    });
    nextDay += 1;
  }

  const weeks = [];
  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }
  return weeks;
}

export function formatDateLong(date) {
  const weekday = DAYS_OF_WEEK[(date.getDay() + 6) % 7];
  return `${weekday}, ${date.getDate()} ${MONTHS_GENITIVE[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDateAria(date) {
  return `${date.getDate()} ${MONTHS_GENITIVE[date.getMonth()]} ${date.getFullYear()}`;
}
