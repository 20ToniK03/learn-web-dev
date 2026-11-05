import {
  buildCalendarGrid,
  compareDates,
  formatDateAria,
  isDateSelectable
} from '../../data/date.js';

function CalendarGrid({ year, month, selectedDay, today, onDayClick }) {
  const weeks = buildCalendarGrid(year, month);

  return (
    <div className="calendar__days">
      {weeks.map((week, weekIndex) =>
        week.map((cell, dayIndex) => {
          const date = new Date(cell.year, cell.month, cell.day);
          const selectable = isDateSelectable(cell.day, cell.month, cell.year, today);
          const selected = selectedDay ? compareDates(date, selectedDay) === 0 : false;
          const classes = ['calendar__day'];

          if (cell.outside) {
            classes.push('calendar__day--outside');
          }
          if (selected) {
            classes.push('calendar__day--selected');
          }
          if (!selectable) {
            classes.push('calendar__day--disabled');
          }

          return (
            <button
              key={`${weekIndex}-${dayIndex}`}
              className={classes.join(' ')}
              type="button"
              aria-label={formatDateAria(date)}
              aria-pressed={selected}
              disabled={!selectable}
              onClick={() => onDayClick(date)}
            >
              {cell.day}
            </button>
          );
        })
      )}
    </div>
  );
}

export default CalendarGrid;
