import { Box, Flex } from '@radix-ui/themes';
import { observer } from 'mobx-react-lite';
import Calendar from '../components/Calendar';
import Header from '../components/Header';

const Home = observer(() => {
  return (
    <Box p="6" style={{ minHeight: '100vh' }}>
      <Flex direction="column" gap="6" align="stretch">
        <Header />
        <Calendar />
      </Flex>
    </Box>
  );
});

export default Home;
