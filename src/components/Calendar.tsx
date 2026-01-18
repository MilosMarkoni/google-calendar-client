import { observer } from 'mobx-react-lite';
import { useStore } from '../store/StoreProvider';
import RangePicker from './RangePicker';
import { Loader } from './Loader';

export const Calendar = observer(() => {
  const {
    calendarStore: { calendarEvents, isLoading },
  } = useStore();

  return (
    <div>
      <RangePicker />
      {isLoading ? (
        <Loader />
      ) : (
        calendarEvents?.map((event) => (
          <div key={event.id}>
            <h3>{event.summary}</h3>
            <p>{event.start.dateTime}</p>
            <p>{event.end.dateTime}</p>
          </div>
        ))
      )}
    </div>
  );
});
export default Calendar;
