import { Box, Card, Flex } from '@radix-ui/themes';
import { observer } from 'mobx-react-lite';
import Header from '../components/Header';
import Calendar from '../components/Calendar';

const Home = observer(() => {
  return (
    <Box p="6" style={{ minHeight: '100vh' }}>
      <Flex direction="column" gap="6" align="stretch">
        <Header />
        <Card>
          <Box p="5">
            <Flex direction="column" gap="4">
              <Calendar />
            </Flex>
          </Box>
        </Card>
      </Flex>
    </Box>
  );
});

export default Home;
