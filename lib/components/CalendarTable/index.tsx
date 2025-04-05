import { useCallback, useState } from 'react';
import styles from './styles.module.css'
import { CalendarDay } from '../CalendarDay';


export interface CalendarEvent {
  id: string | number;
  title: string;
  date: Date;
}

interface CalendarProps extends React.TableHTMLAttributes<HTMLTableElement> {
  events: CalendarEvent[];
  currentMonth: Date;
  onDateChange?: (data: any) => void;
  onDateClick: (data: any) => void;
  onEventClick: (data: CalendarEvent) => void;
}

const monthNames: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export const CalendarTable: React.FC<CalendarProps> = ({ events, currentMonth, onDateChange, onDateClick, onEventClick, ...tableProps }) => {

  const [month, setMonth] = useState<Date>( currentMonth );
  const { className, ...restProps } = tableProps;

  // RETURN DAYS OF WEEK (0-6)
  const firstWeekDayOfMonth = () => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    return firstDay.getDay(); 
  }

  // RETURN DAYS QUANTITY OF MONTHS
  const daysInThisMonth = useCallback(() => {
    return new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  }, [month]);

  const handlePrevClick = () => {
    setMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() - 1);
      return newMonth;
    });
  }

  const handleNextClick = () => {
    setMonth((prevMonth) => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(newMonth.getMonth() + 1);
      return newMonth;
    });
  }

  const handleDayClick = (day: number) => {
    onDateClick(day);
  }

  const handleEventClick = (event: CalendarEvent) => {
    onEventClick(event);
  }

  
  // GROUP EVENTS BY DAY FOR EASY LOOKUP
  const eventsByDay: Record<number, CalendarEvent[]> = {};

  events.forEach(event => {
    const day = event.date.getDate();
    if (!eventsByDay[day]) {
      eventsByDay[day] = [];
    }
    eventsByDay[day].push(event);
  });


  // Function to render the calendar days
  const renderCalendarDays = () => {

    // const year = month.getFullYear();
    // const monthIndex = month.getMonth();
    const daysInMonth = daysInThisMonth();
    const firstDayOfWeek = firstWeekDayOfMonth();

    let days = [];
    let day = 1;

    // CREATE CALENDAR TABLE ROWS
    for (let i = 0; i < 6; i++) {
      // BREAK IF WE'VE RENDERED ALL DAYS
      if (day > daysInMonth) break;

      // CREATE CELLS FOR EACH ROW
      let week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfWeek) || day > daysInMonth) {
          week.push(<td className='calendar-day' key={`empty-${i}-${j}`}></td>);
        } else {
          week.push(
            <CalendarDay 
              key={`${i}-${j}-${day}`}
              day={day}
              events={ eventsByDay[day] } 
              onDayClick={ handleDayClick } 
              onEventClick={ handleEventClick }
              />
          );
          day++;
        }
      }
      days.push(<tr className='calendar-week' key={`week-${i}`}>{week}</tr>);
    }

    return days;
  }

  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.calendarHeader}>
        <div className={styles.headerButtons}>
          <button onClick={handlePrevClick}>Prev</button>
          <button onClick={handleNextClick}>Next</button>
        </div>
        <h2>{monthNames[month.getMonth()]} {month.getFullYear()}</h2>
      </div>
      <table cellPadding={0} cellSpacing={0} border={0} className={`${className} ${styles.calendarTable}`} {...restProps}>
        <thead>
          <tr>
            <th>Dom</th>
            <th>Lun</th>
            <th>Mar</th>
            <th>Mie</th>
            <th>Jue</th>
            <th>Vie</th>
            <th>Sab</th>
          </tr>
        </thead>
        <tbody>
          {renderCalendarDays()}
        </tbody>
      </table>
    </div>
  );
}