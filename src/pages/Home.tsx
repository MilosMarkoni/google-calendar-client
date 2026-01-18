import { Button, Card, Heading, Text } from '@radix-ui/themes';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const Home = observer(() => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };
  return (
    <div>
      <Card>
        <Heading>Home</Heading>
        <Text>Welcome to the home page</Text>
        <Button onClick={handleLogout}>Logout</Button>
      </Card>
    </div>
  );
});

export default Home;
