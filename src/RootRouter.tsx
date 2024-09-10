import { useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import useAppNavigate from '@/hooks/useAppNavigate';
import OnBoarding from '@/pages/OnBoarding';
import Schedule from '@/pages/Schedule';
import ScheduleDetail from '@/pages/ScheduleDetail';
import MyPage from './pages/MyPage';
import MyPageAllPosts from './pages/MyPageAllPosts';
import PostDetail from './pages/PostDetail';
import SignUp from './pages/SignUp';

const RootRouter = () => {
  return (
    <Routes>
      <Route index element={<div>웹사이트</div>} />
      <Route path="app/*" element={<AppRoute />}>
        <Route path="on-boarding" element={<OnBoarding />} />
        <Route path="sign-in" element={<div></div>} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="schedule/*">
          <Route index element={<Schedule />} />
          <Route path={':id'} element={<ScheduleDetail />} />
        </Route>
        <Route path="my-page/*">
          <Route index element={<MyPage />} />
          <Route path={'all-posts'} element={<MyPageAllPosts />} />
        </Route>
        <Route path="post/:post_id" element={<PostDetail />} />
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
    if (location.pathname.split('/')[2] === '') {
      console.log(location.pathname.split('/'));
      navigate('schedule');
    }
  }, [location]);
  return <Outlet />;
};
