function TimeSlots({ slots, selectedTime, onTimeClick }) {
  if (slots.length === 0) {
    return <p className="times__empty">Сначала выберите дату</p>;
  }

  return (
    <div className="times__grid">
      {slots.map((slot) => {
        const selected = slot.time === selectedTime;
        const classes = ['time-slot'];

        if (slot.busy) {
          classes.push('time-slot--busy');
        }
        if (selected) {
          classes.push('time-slot--selected');
        }

        return (
          <button
            key={slot.time}
            className={classes.join(' ')}
            type="button"
            aria-pressed={selected}
            disabled={slot.busy}
            onClick={() => onTimeClick(slot.time)}
          >
            {slot.busy ? (
              <>
                <span>{slot.time}</span>
                <small>Занято</small>
              </>
            ) : (
              slot.time
            )}
          </button>
        );
      })}
    </div>
  );
}

export default TimeSlots;
