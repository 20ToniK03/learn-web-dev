import { MONTHS_NOMINATIVE } from '../../data/date.js';

function CalendarHeader({ month, year, prevDisabled, onPrev, onNext }) {
  return (
    <div className="calendar__head">
      <h2 id="calendar-title">{MONTHS_NOMINATIVE[month]} {year}</h2>
      <div className="calendar__nav">
        <button
          className="calendar__arrow"
          type="button"
          aria-label="Предыдущий месяц"
          onClick={onPrev}
          disabled={prevDisabled}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M15 5 8 12l7 7" />
          </svg>
        </button>
        <button
          className="calendar__arrow"
          type="button"
          aria-label="Следующий месяц"
          onClick={onNext}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CalendarHeader;
