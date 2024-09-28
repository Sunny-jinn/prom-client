import { Outlet, Route, Routes } from 'react-router-dom';
import OnBoarding from '@/pages/OnBoarding';
import { useEffect, useState } from 'react';
import useAppNavigate from '@/hooks/useAppNavigate';
import SignIn from '@/pages/SignIn';
import Splash from '@/pages/Splash';
import { getMyInfoAPI, refreshAPI } from '@/feature/api/user.api';
import Init from '@/pages/Init';
import userStore from '@/store/User';
import MyPage from './pages/MyPage';
import MyPageAllPosts from './pages/MyPageAllPosts';
import PostDetail from './pages/PostDetail';
import SignUp from './pages/SignUp';
import Home from '@/pages/Home';
import { addAccessTokenToServer } from '@/feature/api';
import Picks from '@/pages/Picks';

const RootRouter = () => {
  return (
    <Routes>
      <Route index element={<div>웹사이트</div>} />
      <Route path='app/*' element={<AppRoute />}>
        <Route path='on-board' element={<OnBoarding />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route element={<Auth />}>
          <Route path='init' element={<Init />} />
          <Route path='home' element={<Home />} />
          <Route path='my-page/*'>
            <Route index element={<MyPage />} />
            <Route path={'all-posts'} element={<MyPageAllPosts />} />
          </Route>
          <Route path='post/:post_id' element={<PostDetail />} />
          <Route path='pick/*' element={<Picks />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RootRouter;

// '',app,''
const AppRoute = () => {
  const navigate = useAppNavigate();
  const [appLoading, setAppLoading] = useState(true);
  const { setUser } = userStore(state => state);

  const refresh = async () => {
    addAccessTokenToServer('eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImNhdGVnb3J5IjoiYWNjZXNzIiwicm9sZSI6IkFSVElTVCIsImlhdCI6MTcyNzUwNDU5MywiZXhwIjoxNzI3NTkwOTkzfQ.YA-zlll-J9WoU-2DUG-n0g4iB_tKO7L3qlOmqBAiQjQ');
    try {
      const result = await getMyInfoAPI();
      // const result = await refreshAPI();
      setUser(result);
      if(result.role === 'USER') {
        navigate('init');
        return;
      }
      navigate('pick?index=3');
    } catch (e) {
      // navigate('home');
      navigate('on-board');
    } finally {
      setAppLoading(false);
    }
  };
  useEffect(() => {
    //1. refresh 토큰으로 로그인 여부 확인
    //1-1. 로그인이 된 유저 중 초기 세팅을 하지 않은 유저일 경우 status 0 => 초기세팅 화면
    //1-2. 로그인 된 유저 중 초기 세팅을 완료한 유저일 경우 status 1 => 메인 화면
    refresh();
  }, []);
  if(appLoading) {
    return <Splash />;
  }
  return <Outlet />;
};

const Auth = () => {
  // 로그인하지 않은 유저는 접근 불가, sign-in으로 이동
  // const {user} = userStore(state => state)
  return <Outlet />;
};
