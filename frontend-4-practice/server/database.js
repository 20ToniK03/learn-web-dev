export const today = { day: 17, month: 9, year: 2026 };

const TIME_SLOTS = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

const BUSY_SLOTS = {
  '2026-09-17': ['11:00', '13:00'],
  '2026-09-18': ['10:00', '12:00', '15:00'],
  '2026-09-21': ['11:00', '16:00'],
  '2026-09-23': ['13:00', '14:00', '17:00'],
  '2026-09-25': ['10:00', '11:00'],
  '2026-10-02': ['12:00', '15:00'],
  '2026-10-08': ['14:00'],
  '2026-11-05': ['11:00', '13:00']
};

export function getSlots(day, month, year) {
  const key = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const busy = BUSY_SLOTS[key] || [];

  return TIME_SLOTS.map((time) => ({
    time,
    available: !busy.includes(time)
  }));
}
