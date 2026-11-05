const MONTHS_NOMINATIVE = [
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

const MONTHS_GENITIVE = [
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

const DAYS_OF_WEEK = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
];

const TODAY = new Date();
const BUSY_DAYS_COUNT = 2;
const BUSY_DATES = getBusyDateKeys(TODAY);
const SERVICE_DURATION = 60;
const MASTER_NAME = 'Анна Смирнова';
const SERVICE_TITLE = 'Стрижка и укладка';
const TIME_SLOTS = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

function getInitialDate(today) {
  let candidate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  while (BUSY_DATES.has(formatISODate(candidate))) {
    candidate = new Date(candidate.getFullYear(), candidate.getMonth(), candidate.getDate() + 1);
  }
  return candidate;
}

const INITIAL_DATE = getInitialDate(TODAY);
const INITIAL_TIME = null;

function formatISODate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function getBusyDateKeys(today) {
  const keys = new Set();
  for (let offset = 0; offset < BUSY_DAYS_COUNT; offset += 1) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
    keys.add(formatISODate(date));
  }
  return keys;
}

function isDateBusy(day, month, year) {
  return BUSY_DATES.has(formatISODate(new Date(year, month, day)));
}

function generateRandomSchedule(today) {
  const schedule = {};
  const year = today.getFullYear();
  const month = today.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dayDiff = Math.round((date - todayMidnight) / 86400000);

    if (dayDiff < 0) continue;

    const weekIndex = Math.floor((day - 1) / 7);
    let maxBusySlots = 0;

    if (weekIndex === 0) {
      maxBusySlots = 4;
    } else {
      maxBusySlots = 2;
    }

    const dateKey = formatISODate(date);
    let busyTimes = [];

    const availableSlots = [...TIME_SLOTS].sort(() => Math.random() - 0.5);
    const busyCount = Math.floor(Math.random() * (maxBusySlots + 1));
    
    for (let i = 0; i < busyCount; i++) {
        busyTimes.push(availableSlots[i]);
    }

    if (busyTimes.length >= TIME_SLOTS.length) {
      busyTimes = busyTimes.slice(0, TIME_SLOTS.length - 1);
    }

    if (busyTimes.length > 0) {
      schedule[dateKey] = busyTimes;
    }
  }

  return schedule;
}

const GENERATED_BUSY_SLOTS = generateRandomSchedule(TODAY);

const state = {
  currentMonth: INITIAL_DATE.getMonth(),
  currentYear: INITIAL_DATE.getFullYear(),
  selectedDate: INITIAL_DATE,
  selectedTime: INITIAL_TIME,
  slots: [],
  today: TODAY
};

const elements = {};

function compareDates(date1, date2) {
  const first = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const second = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return first.getTime() - second.getTime();
}

function isDateSelectable(day, month, year, today) {
  const date = new Date(year, month, day);
  return compareDates(date, today) >= 0;
}

function buildCalendarGrid(year, month) {
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

function parseISODate(value) {
  const parts = value.split('-').map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function formatDateLong(date) {
  const weekday = DAYS_OF_WEEK[(date.getDay() + 6) % 7];
  return `${weekday}, ${date.getDate()} ${MONTHS_GENITIVE[date.getMonth()]} ${date.getFullYear()}`;
}

function formatDateAria(date) {
  return `${date.getDate()} ${MONTHS_GENITIVE[date.getMonth()]} ${date.getFullYear()}`;
}

function formatTimeRange(time, duration) {
  const parts = time.split(':').map(Number);
  const total = parts[0] * 60 + parts[1] + duration;
  const hours = String(Math.floor(total / 60) % 24).padStart(2, '0');
  const minutes = String(total % 60).padStart(2, '0');
  return `${time}-${hours}:${minutes}`;
}

function getSlotsForDate(date) {
  const key = formatISODate(date);
  const busy = GENERATED_BUSY_SLOTS[key] || [];
  
  return TIME_SLOTS.map((time) => ({
    time,
    busy: busy.includes(time)
  }));
}

function renderCalendar() {
  const grid = buildCalendarGrid(state.currentYear, state.currentMonth);
  let html = '';

  grid.forEach((week) => {
    week.forEach((cell) => {
      const date = new Date(cell.year, cell.month, cell.day);
      const busy = isDateBusy(cell.day, cell.month, cell.year);
      const selectable = !busy && isDateSelectable(cell.day, cell.month, cell.year, state.today);
      const selected = state.selectedDate && compareDates(date, state.selectedDate) === 0;
      const classes = ['calendar__day'];

      if (cell.outside) {
        classes.push('calendar__day--outside');
      }
      if (selected) {
        classes.push('calendar__day--selected');
      }
      if (busy) {
        classes.push('calendar__day--busy');
      }
      if (!selectable) {
        classes.push('calendar__day--disabled');
      }

      html += `<button class="${classes.join(' ')}" type="button" data-date="${formatISODate(date)}" aria-label="${formatDateAria(date)}${busy ? ', занято' : ''}" aria-pressed="${selected}"${selectable ? '' : ' disabled'}>${cell.day}</button>`;
    });
  });

  elements.calendarTitle.textContent = `${MONTHS_NOMINATIVE[state.currentMonth]} ${state.currentYear}`;
  elements.calendarDays.innerHTML = html;

  elements.calendarDays.querySelectorAll('.calendar__day').forEach((button) => {
    button.addEventListener('click', onDayClick);
  });
}

function renderTimeSlots() {
  if (!state.selectedDate) {
    elements.timeSlots.innerHTML = '<p class="times__empty">Сначала выберите дату</p>';
    return;
  }

  const slots = state.slots;
  let html = '';

  slots.forEach((slot) => {
    const selected = slot.time === state.selectedTime;
    const classes = ['time-slot'];

    if (slot.busy) {
      classes.push('time-slot--busy');
    }
    if (selected) {
      classes.push('time-slot--selected');
    }

    const content = slot.busy ? `<span>${slot.time}</span><small>Занято</small>` : slot.time;
    html += `<button class="${classes.join(' ')}" type="button" data-time="${slot.time}" aria-pressed="${selected}"${slot.busy ? ' disabled' : ''}>${content}</button>`;
  });

  elements.timeSlots.innerHTML = html;

  elements.timeSlots.querySelectorAll('.time-slot').forEach((button) => {
    button.addEventListener('click', onTimeSlotClick);
  });
}

function updateBottomBar() {
  if (!state.selectedDate) {
    elements.selectedDate.textContent = 'Дата не выбрана';
    elements.selectedDetails.textContent = `${MASTER_NAME} • ${SERVICE_TITLE}`;
    return;
  }

  const dateText = formatDateLong(state.selectedDate);
  elements.selectedDate.textContent = state.selectedTime
    ? `${dateText} • ${state.selectedTime}`
    : dateText;
  elements.selectedDetails.textContent = state.selectedTime
    ? `${MASTER_NAME} • ${SERVICE_TITLE} • ${formatTimeRange(state.selectedTime, SERVICE_DURATION)}`
    : `${MASTER_NAME} • ${SERVICE_TITLE} • выберите время`;
}

function updateMonthNavigation() {
  const atFirstMonth = state.currentYear === state.today.getFullYear()
    && state.currentMonth === state.today.getMonth();
  elements.prevMonth.disabled = atFirstMonth;
}

function updateNextButton() {
  elements.nextStep.disabled = !(state.selectedDate && state.selectedTime);
}

function onDayClick(event) {
  const date = parseISODate(event.currentTarget.dataset.date);
  const sameDate = state.selectedDate && compareDates(date, state.selectedDate) === 0;

  if (!sameDate) {
    state.selectedTime = null;
  }

  state.selectedDate = date;
  state.currentMonth = date.getMonth();
  state.currentYear = date.getFullYear();
  state.slots = getSlotsForDate(date);

  renderCalendar();
  renderTimeSlots();
  updateBottomBar();
  updateMonthNavigation();
  updateNextButton();
}

function onTimeSlotClick(event) {
  state.selectedTime = event.currentTarget.dataset.time;

  renderTimeSlots();
  updateBottomBar();
  updateNextButton();
}

function onPrevMonth() {
  if (state.currentYear === state.today.getFullYear() && state.currentMonth === state.today.getMonth()) {
    return;
  }

  const date = new Date(state.currentYear, state.currentMonth - 1, 1);
  state.currentMonth = date.getMonth();
  state.currentYear = date.getFullYear();

  renderCalendar();
  updateMonthNavigation();
}

function onNextMonth() {
  const date = new Date(state.currentYear, state.currentMonth + 1, 1);
  state.currentMonth = date.getMonth();
  state.currentYear = date.getFullYear();

  renderCalendar();
  updateMonthNavigation();
}

function onNextStep() {
  if (!state.selectedDate || !state.selectedTime) {
    return;
  }
  window.location.href = 'contacts.html';
}

function setupMonthNavigation() {
  elements.prevMonth.addEventListener('click', onPrevMonth);
  elements.nextMonth.addEventListener('click', onNextMonth);
}

function init() {
  elements.calendarTitle = document.querySelector('#calendar-title');
  elements.calendarDays = document.querySelector('#calendar-days');
  elements.timeSlots = document.querySelector('#time-slots');
  elements.selectedDate = document.querySelector('#selected-date');
  elements.selectedDetails = document.querySelector('#selected-details');
  elements.prevMonth = document.querySelector('#prev-month');
  elements.nextMonth = document.querySelector('#next-month');
  elements.nextStep = document.querySelector('#next-step');

  state.slots = getSlotsForDate(state.selectedDate);

  setupMonthNavigation();
  elements.nextStep.addEventListener('click', onNextStep);

  renderCalendar();
  renderTimeSlots();
  updateBottomBar();
  updateMonthNavigation();
  updateNextButton();
}

document.addEventListener('DOMContentLoaded', init);