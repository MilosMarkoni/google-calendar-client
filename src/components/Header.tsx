import { Box, Button, Flex, Heading } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useStore } from '../store/StoreProvider';
import { AddNewEventDialog } from './AddNewEventDialog';

export const Header = () => {
  const navigate = useNavigate();
  const { sessionStore } = useStore();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };
  return (
    <Box style={{ width: '100%' }}>
      <Flex direction="row" justify="between" align="center" style={{ width: '100%' }}>
        <Heading>Welcome, {sessionStore.session?.user?.user_metadata.name}</Heading>

        <Flex direction="row" align="center" gapX="6">
          <AddNewEventDialog />

          <Button onClick={handleLogout} variant="ghost" size="3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: 0 }}
            >
              <path
                d="M6 14H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h3M10 11l3-3-3-3M13 8H6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
export default Header;
