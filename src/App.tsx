import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Router  from './router/Router';
import Loader from './common/Loader';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Router/>
  );
}

export default App;
