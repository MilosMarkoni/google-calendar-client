export const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (timeString: string) => {
  const date = new Date(timeString);
  return date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
