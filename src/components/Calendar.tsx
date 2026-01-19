import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/StoreProvider';
import { formatDateTime, formatTime } from '../utils';
import { Loader } from './Loader';
import RangePicker from './RangePicker';

export const Calendar = observer(() => {
  const {
    calendarStore: { calendarEvents, isLoading, range },
  } = useStore();
  const columns = range === 1 ? '1' : '7';

  return (
    <Flex direction="column" gap="4">
      <RangePicker />

      {isLoading ? (
        <Loader />
      ) : (
        <Grid columns={columns} gapY="6" gapX="2">
          {Object.entries(calendarEvents).map(([day, events]: [string, any[]]) => (
            <Box key={day} p="3" style={{ border: '1px solid var(--gray-6)', borderRadius: '4px' }}>
              <Text weight="bold" size="3" mb="3" style={{ display: 'block' }}>
                {formatDateTime(day)}
              </Text>

              {events.length === 0 && (
                <Box>
                  <Text weight="medium" color="teal">
                    No events
                  </Text>
                </Box>
              )}

              <Flex direction="column" gap="3">
                {(events as any[]).map((event: any) => (
                  <Box key={event.id}>
                    <Text weight="medium" color="amber">
                      {event.summary || 'No events'}
                    </Text>
                    <Box>
                      <Text size="2" color="indigo">
                        {formatTime(event.start?.dateTime)} - {formatTime(event.end?.dateTime)}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Flex>
            </Box>
          ))}
        </Grid>
      )}
    </Flex>
  );
});
export default Calendar;
