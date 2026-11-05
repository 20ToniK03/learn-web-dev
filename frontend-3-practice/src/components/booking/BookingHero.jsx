import { MASTER_NAME, SERVICE_DURATION, SERVICE_PRICE, SERVICE_TITLE } from '../../data/slots.js';

function BookingHero() {
  return (
    <div className="hero">
      <div className="hero__text">
        <p className="eyebrow">Запись в салон</p>
        <h1>Выберите дату и время</h1>
        <p className="hero__meta">{MASTER_NAME} • {SERVICE_TITLE} • {SERVICE_DURATION} минут • {SERVICE_PRICE}</p>
      </div>
      <aside className="summary" aria-label="Выбранная услуга">
        <p className="summary__label">Выбрано</p>
        <p className="summary__title">{SERVICE_TITLE}</p>
        <div className="summary__row">
          <span className="summary__price">{SERVICE_PRICE}</span>
          <span className="summary__duration">{SERVICE_DURATION} минут</span>
        </div>
      </aside>
    </div>
  );
}

export default BookingHero;
