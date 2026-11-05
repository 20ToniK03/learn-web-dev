import { formatDateLong } from '../../data/date.js';
import { formatTimeRange, MASTER_NAME, SERVICE_DURATION, SERVICE_TITLE } from '../../data/slots.js';

function BookingBottomBar({ selectedDay, selectedTime }) {
  const dateText = selectedDay ? formatDateLong(selectedDay) : 'Дата не выбрана';
  const dateLine = selectedTime ? `${dateText} • ${selectedTime}` : dateText;
  const details = selectedTime
    ? `${MASTER_NAME} • ${SERVICE_TITLE} • ${formatTimeRange(selectedTime, SERVICE_DURATION)}`
    : `${MASTER_NAME} • ${SERVICE_TITLE} • выберите время`;

  return (
    <div className="booking__footer">
      <div className="booking__when" aria-live="polite">
        <p className="booking__date">{dateLine}</p>
        <p className="booking__details">{details}</p>
      </div>
      <button className="btn btn--primary" type="button" disabled={!selectedTime}>
        Продолжить
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 12h15" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}

export default BookingBottomBar;
