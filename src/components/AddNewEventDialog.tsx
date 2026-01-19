import { useState } from 'react';
import { Button, Dialog, TextField, Flex, Text } from '@radix-ui/themes';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/StoreProvider';

const initialFormData = {
  summary: '',
  startDateTime: '',
  endDateTime: '',
};

export const AddNewEventDialog = observer(() => {
  const { calendarStore } = useStore();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      resetForm();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.summary || !formData.startDateTime || !formData.endDateTime) {
      return;
    }

    setIsSubmitting(true);
    try {
      await calendarStore.createEvent(
        formData.summary,
        new Date(formData.startDateTime).toISOString(),
        new Date(formData.endDateTime).toISOString(),
      );
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error('Failed to create event:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger>
        <Button>Add new event</Button>
      </Dialog.Trigger>
      <Dialog.Content style={{ width: '270px' }}>
        <Dialog.Title>Add new event</Dialog.Title>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4" mt="4">
            <TextField.Root
              placeholder="Meeting name"
              value={formData.summary}
              onChange={handleChange('summary')}
              required
            />
            <Flex direction="column" gap="2">
              <Text size="2" weight="medium">
                Start date & time
              </Text>
              <TextField.Root
                type="datetime-local"
                value={formData.startDateTime}
                onChange={handleChange('startDateTime')}
                required
              />
            </Flex>
            <Flex direction="column" gap="2">
              <Text size="2" weight="medium">
                End date & time
              </Text>
              <TextField.Root
                type="datetime-local"
                value={formData.endDateTime}
                onChange={handleChange('endDateTime')}
                required
              />
            </Flex>
            <Flex gap="3" justify="end" mt="2">
              <Dialog.Close>
                <Button variant="soft" color="gray" onClick={resetForm}>
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Event'}
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
});
