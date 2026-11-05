const BASE_URL = 'http://localhost:3000/api';

async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error('Ошибка запроса');
  }

  return response.json();
}

export function fetchToday() {
  return request('/booking/today');
}

export function fetchSlots(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return request(`/slots?day=${day}&month=${month}&year=${year}`);
}
