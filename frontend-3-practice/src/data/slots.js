import { formatISODate } from './date.js';

export const TIME_SLOTS = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
export const SERVICE_DURATION = 60;
export const MASTER_NAME = 'Анна Смирнова';
export const SERVICE_TITLE = 'Стрижка и укладка';
export const SERVICE_PRICE = '2 800 ₽';

function generateRandomSchedule(today) {
  const schedule = {};
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const dayDiff = Math.round((date - todayMidnight) / 86400000);

    if (dayDiff < 0) {
      continue;
    }

    const weekIndex = Math.floor((day - 1) / 7);
    const maxBusySlots = weekIndex === 0 ? 4 : 2;
    const dateKey = formatISODate(date);
    const availableSlots = [...TIME_SLOTS].sort(() => Math.random() - 0.5);
    const busyCount = Math.floor(Math.random() * (maxBusySlots + 1));
    const busyTimes = [];

    for (let index = 0; index < busyCount; index += 1) {
      busyTimes.push(availableSlots[index]);
    }

    if (busyTimes.length >= TIME_SLOTS.length) {
      busyTimes.length = TIME_SLOTS.length - 1;
    }

    if (busyTimes.length > 0) {
      schedule[dateKey] = busyTimes;
    }
  }

  return schedule;
}

export const GENERATED_BUSY_SLOTS = generateRandomSchedule(new Date());

export function getSlotsForDate(date) {
  const key = formatISODate(date);
  const busy = GENERATED_BUSY_SLOTS[key] || [];

  return TIME_SLOTS.map((time) => ({
    time,
    busy: busy.includes(time)
  }));
}

export function formatTimeRange(time, duration) {
  const parts = time.split(':').map(Number);
  const total = parts[0] * 60 + parts[1] + duration;
  const hours = String(Math.floor(total / 60) % 24).padStart(2, '0');
  const minutes = String(total % 60).padStart(2, '0');
  return `${time}-${hours}:${minutes}`;
}
