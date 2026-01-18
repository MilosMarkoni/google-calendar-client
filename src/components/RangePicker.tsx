// Radix ui range picker for 1, 7 or 30 days, it will return the start and end date of the range, start date is always today, end date is always today + the selected range
// state will be held in Calendar store

import { useStore } from '../store/StoreProvider';
import { RadioCards } from '@radix-ui/themes';
import { observer } from 'mobx-react-lite';

export const RangePicker = observer(() => {
  const { calendarStore } = useStore();

  return (
    <RadioCards.Root
      value={calendarStore.range?.toString()}
      onValueChange={(value) => calendarStore.setRange(Number(value))}
    >
      <RadioCards.Item value="1">1 day</RadioCards.Item>
      <RadioCards.Item value="7">7 days</RadioCards.Item>
      <RadioCards.Item value="30">30 days</RadioCards.Item>
    </RadioCards.Root>
  );
});

export default RangePicker;
