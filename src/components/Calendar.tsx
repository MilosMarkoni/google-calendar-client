import { useEffect, useState } from 'react';
import { getCalendarEvents } from '../config/api';
import { useStore } from '../store/StoreProvider';
import RangePicker from './RangePicker';

export const Calendar = () => {
  const { sessionStore } = useStore();
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const providerToken = sessionStore.session?.provider_token;

  useEffect(() => {
    const fetchCalendarEvents = async () => {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      end.setDate(end.getDate() + 1);

      const params = new URLSearchParams({
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        singleEvents: 'true',
        orderBy: 'startTime',
      });

      const response = await getCalendarEvents(providerToken, params);

      setCalendarEvents(response.items);
    };
    fetchCalendarEvents();
  }, []);

  return (
    <div>
      <RangePicker />
      {calendarEvents?.map((event) => (
        <div key={event.id}>
          <h3>{event.summary}</h3>
          <p>{event.start.dateTime}</p>
          <p>{event.end.dateTime}</p>
        </div>
      ))}
    </div>
  );
};
export default Calendar;
