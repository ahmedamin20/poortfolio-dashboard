import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Router  from './router/Router';
import Loader from './common/Loader';
import { Toaster } from 'react-hot-toast';
import { DEFAULT_ROUTE } from './constants/routes';
import { LOGIN_ROUTE } from './modules/auth/constants/routes';
import { isUserLoggedIn } from './modules/auth/utils/authHelper';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate(LOGIN_ROUTE)
    }
  }, [navigate]);
  return loading ? (
    <Loader />
  ) : (
    <>
    <Toaster position='top-center'/>
      <Router/>
    </>
  );
}

export default App;
