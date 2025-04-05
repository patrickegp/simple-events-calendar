import { CalendarEvent, CalendarTable } from '../lib/components/CalendarTable';



function App() {

  const events: CalendarEvent[] = [
    { id: 1, title: 'Team Meeting', date: new Date(2025, 1, 9) },
    { id: 2, title: 'Maria Mercedes', date: new Date(2025, 1, 9) },
    { id: 3, title: 'Pending Invoice', date: new Date(2025, 1, 9) },
    { id: 4, title: 'Send Invoice', date: new Date(2025, 1, 9) },
    { id: 5, title: 'Send Quotation', date: new Date(2025, 1, 9) },
    { id: 6, title: 'Team Meeting', date: new Date(2025, 1, 9) },
    { id: 7, title: 'Project Review', date: new Date(2025, 1, 9) },
    { id: 8, title: 'Project Release', date: new Date(2025, 1, 9) },
    { id: 9, title: 'Doctor Appointment', date: new Date(2025, 1, 16) },
    { id: 10, title: 'Conference', date: new Date(2025, 1, 20) },
  ];

  const handleDateChange = (data: any) => {
    console.log('Date changed:');
    console.log(data);
  }

  const handleDateClick = (data: any) => {
    console.log('Date clicked:');
    console.log(data);
  }

  const handleEventClick = (event: CalendarEvent) => {
    console.log('Event clicked');
    console.log(event);
  }

  return (
    <>
      <CalendarTable
        events={events}
        currentMonth={new Date()}
        onDateChange={handleDateChange}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
        />
    </>
  )
}

export default App
