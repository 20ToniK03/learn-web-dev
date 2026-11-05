import { useState } from 'react';
import BookingHero from '../components/booking/BookingHero.jsx';
import CalendarHeader from '../components/booking/CalendarHeader.jsx';
import CalendarGrid from '../components/booking/CalendarGrid.jsx';
import TimeSlots from '../components/booking/TimeSlots.jsx';
import BookingBottomBar from '../components/booking/BookingBottomBar.jsx';
import { compareDates, getBusyDateKeys, getInitialDate } from '../data/date.js';
import { getSlotsForDate } from '../data/slots.js';

const TODAY = new Date();
const BUSY_DATES = getBusyDateKeys(TODAY, 2);
const INITIAL_DATE = getInitialDate(TODAY, BUSY_DATES);

function BookingScreen() {
  const [currentMonth, setCurrentMonth] = useState(INITIAL_DATE.getMonth());
  const [currentYear, setCurrentYear] = useState(INITIAL_DATE.getFullYear());
  const [selectedDay, setSelectedDay] = useState(INITIAL_DATE);
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState(() => getSlotsForDate(INITIAL_DATE));

  const prevDisabled = currentYear === TODAY.getFullYear() && currentMonth === TODAY.getMonth();

  function handleDayClick(date) {
    if (compareDates(date, selectedDay) !== 0) {
      setSelectedTime(null);
    }

    setSelectedDay(date);
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
    setSlots(getSlotsForDate(date));
  }

  function handlePrevMonth() {
    if (prevDisabled) {
      return;
    }

    const date = new Date(currentYear, currentMonth - 1, 1);
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
  }

  function handleNextMonth() {
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
              today={TODAY}
              busyDates={BUSY_DATES}
              onDayClick={handleDayClick}
            />
          </section>

          <section className="card times" aria-labelledby="times-title">
            <h2 id="times-title">Доступное время</h2>
            <TimeSlots
              slots={slots}
              selectedTime={selectedTime}
              onTimeClick={setSelectedTime}
            />
          </section>
        </div>

        <BookingBottomBar selectedDay={selectedDay} selectedTime={selectedTime} />
      </div>
    </main>
  );
}

export default BookingScreen;
