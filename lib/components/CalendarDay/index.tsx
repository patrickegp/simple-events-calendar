

import { useState } from 'react';
import { CalendarEvent } from '../CalendarTable';
import styles from './styles.module.css';

type Props = {
  day: number;
  events: CalendarEvent[];
  onDayClick: (day: number) => void;
  onEventClick: (event: CalendarEvent) => void;
}
export const CalendarDay = ({ day, events, onDayClick, onEventClick }: Props) => {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const maxVisibleEvents = 3;


  const safeEvents = events || []
  const visibleEvents = showAllEvents 
    ? safeEvents
    : safeEvents.slice(0, maxVisibleEvents);
  
  const hasMoreEvents = safeEvents.length > maxVisibleEvents;

  return (
    <td className={styles.calendaryDay} key={`day-${day}`}>
      <a onClick={() => onDayClick(day)}>{day}</a>
      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
      <div className={styles.calendarDayEvents}>
      {safeEvents.length > 0 ? (
        <>
          {visibleEvents.map(event => (
            <div className={styles.calendarDayEvent} key={event.id}>
              <a onClick={() => onEventClick(event)}>
                <span className={styles.eventTime}>8:00am</span>
                <span className={styles.eventTitle}>{event.title}</span>
              </a>
            </div>
          ))}
        </>
      ) : null}
      </div>
      {hasMoreEvents && !showAllEvents && (
        <button 
          className={styles.readMoreButton}
          onClick={() => setShowAllEvents(true)}
        >
          +{events.length - maxVisibleEvents} Más
        </button>
      )}
    </td>
  )
}

