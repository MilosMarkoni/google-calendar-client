import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { supabase } from '../../supabaseClient';
import { Button } from '@radix-ui/themes';

const Login = observer(() => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('Error signing in:', error);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={handleGoogleLogin} disabled={loading}>
          {loading ? 'Signing in...' : 'Login with Google'}
        </Button>
      </div>
    </div>
  );
});

export default Login;
