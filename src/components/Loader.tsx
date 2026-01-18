import { Box, Spinner } from '@radix-ui/themes';

export const Loader = () => {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <Spinner />
    </Box>
  );
};
export default Loader;
