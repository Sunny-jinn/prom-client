import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import OnBoarding from '@/pages/OnBoarding';
import SignUp from './pages/SignUp';
import { useEffect } from 'react';
import useAppNavigate from '@/hooks/useAppNavigate';
import Schedule from '@/pages/Schedule';

const RootRouter = () => {
  return (
    <Routes>
      <Route index element={<div>웹사이트</div>} />
      <Route path='app/*' element={<AppRoute />}>
        <Route path='on-boarding' element={<OnBoarding />} />
        <Route path='sign-in' element={<div></div>} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='schedule' element={<Schedule />} />
      </Route>
    </Routes>
  );
};

export default RootRouter;

const AppRoute = () => {
  const location = useLocation();
  const navigate = useAppNavigate();

  //TODO: 임시 처리, 최초 진입시 app/*로 이동
  useEffect(() => {
    if(location.pathname.split('/')[2] === '') {
      console.log(location.pathname.split('/'));
      navigate('schedule');
    }
  }, [location]);
  return <Outlet />;
};
