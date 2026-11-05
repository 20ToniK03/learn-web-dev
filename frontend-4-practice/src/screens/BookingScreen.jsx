import { useEffect, useState } from 'react';
import BookingHero from '../components/booking/BookingHero.jsx';
import CalendarHeader from '../components/booking/CalendarHeader.jsx';
import CalendarGrid from '../components/booking/CalendarGrid.jsx';
import TimeSlots from '../components/booking/TimeSlots.jsx';
import BookingBottomBar from '../components/booking/BookingBottomBar.jsx';
import { compareDates } from '../data/date.js';
import { fetchSlots, fetchToday } from '../api.js';

function BookingScreen() {
  const [today, setToday] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadToday() {
      setError(null);

      try {
        const data = await fetchToday();

        if (ignore) {
          return;
        }

        const date = new Date(data.year, data.month - 1, data.day);
        setToday(date);
        setSelectedDay(date);
        setCurrentMonth(date.getMonth());
        setCurrentYear(date.getFullYear());
      } catch (loadError) {
        if (!ignore) {
          setError('Не удалось загрузить данные');
          setLoading(false);
        }
      }
    }

    loadToday();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!selectedDay) {
      return;
    }

    let ignore = false;
    setLoading(true);
    setError(null);

    fetchSlots(selectedDay)
      .then((data) => {
        if (!ignore) {
          setSlots(data.slots);
        }
      })
      .catch(() => {
        if (!ignore) {
          setError('Не удалось загрузить слоты');
          setSlots([]);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [selectedDay]);

  const prevDisabled = !today
    || (currentYear === today.getFullYear() && currentMonth === today.getMonth());

  function handleDayClick(date) {
    if (!selectedDay || compareDates(date, selectedDay) === 0) {
      return;
    }

    setSelectedTime(null);
    setSelectedDay(date);
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
  }

  function handlePrevMonth() {
    if (!today || prevDisabled) {
      return;
    }

    const date = new Date(currentYear, currentMonth - 1, 1);
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
  }

  function handleNextMonth() {
    if (!today) {
      return;
    }

    const date = new Date(currentYear, currentMonth + 1, 1);
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
  }

  return (
    <main className="booking">
      <div className="container">
        <BookingHero />

        <div className="booking__grid">
          <section className="card calendar" aria-labelledby="calendar-title">
            {today ? (
              <>
                <CalendarHeader
                  month={currentMonth}
                  year={currentYear}
                  prevDisabled={prevDisabled}
                  onPrev={handlePrevMonth}
                  onNext={handleNextMonth}
                />

                <div className="calendar__weekdays" aria-hidden="true">
                  <span>Пн</span>
                  <span>Вт</span>
                  <span>Ср</span>
                  <span>Чт</span>
                  <span>Пт</span>
                  <span>Сб</span>
                  <span>Вс</span>
                </div>

                <CalendarGrid
                  year={currentYear}
                  month={currentMonth}
                  selectedDay={selectedDay}
                  today={today}
                  onDayClick={handleDayClick}
                />
              </>
            ) : (
              <>
                <h2 id="calendar-title">Календарь</h2>
                <p className="calendar__state">
                  {error ? 'Не удалось загрузить данные' : 'Загрузка календаря...'}
                </p>
              </>
            )}
          </section>

          <section className="card times" aria-labelledby="times-title">
            <h2 id="times-title">Доступное время</h2>
            {loading ? (
              <p className="times__empty">Загрузка...</p>
            ) : error ? (
              <p className="times__empty times__empty--error">{error}</p>
            ) : (
              <TimeSlots
                slots={slots}
                selectedTime={selectedTime}
                onTimeClick={setSelectedTime}
              />
            )}
          </section>
        </div>

        <BookingBottomBar selectedDay={selectedDay} selectedTime={selectedTime} />
      </div>
    </main>
  );
}

export default BookingScreen;
