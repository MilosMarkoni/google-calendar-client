import { lazy, useEffect, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from './store/StoreProvider';
import { Loader } from './components/Loader';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const { sessionStore } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStore.isAuthenticated && !sessionStore.loading) {
      navigate('/');
    } else if (!sessionStore.isAuthenticated && !sessionStore.loading) {
      navigate('/login');
    }
  }, [sessionStore.isAuthenticated, sessionStore.loading, navigate]);

  if (sessionStore.loading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={sessionStore.isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={sessionStore.isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default observer(App);
