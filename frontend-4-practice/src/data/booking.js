export const SERVICE_DURATION = 60;
export const MASTER_NAME = 'Анна Смирнова';
export const SERVICE_TITLE = 'Стрижка и укладка';
export const SERVICE_PRICE = '2 800 ₽';

export function formatTimeRange(time, duration) {
  const parts = time.split(':').map(Number);
  const total = parts[0] * 60 + parts[1] + duration;
  const hours = String(Math.floor(total / 60) % 24).padStart(2, '0');
  const minutes = String(total % 60).padStart(2, '0');
  return `${time}-${hours}:${minutes}`;
}
