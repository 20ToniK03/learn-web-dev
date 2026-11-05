import express from 'express';
import cors from 'cors';
import { getSlots, today } from './database.js';

const app = express();
const PORT = 3000;
const DELAY_MS = 0;

app.use(cors());

app.get('/api/booking/today', (request, response) => {
  setTimeout(() => {
    response.json(today);
  }, DELAY_MS);
});

app.get('/api/slots', (request, response) => {
  const day = Number(request.query.day);
  const month = Number(request.query.month);
  const year = Number(request.query.year);

  if (!day || !month || !year) {
    response.status(400).json({ error: 'Некорректная дата' });
    return;
  }

  const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  setTimeout(() => {
    response.json({ date, slots: getSlots(day, month, year) });
  }, DELAY_MS);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
