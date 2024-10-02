import { useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { getMyInfoAPI, refreshAPI } from '@/feature/api/user.api';
import useAppNavigate from '@/hooks/useAppNavigate';
import Home from '@/pages/Home';
import Init from '@/pages/Init';
import OnBoarding from '@/pages/OnBoarding';
import Picks from '@/pages/Picks';
import SignIn from '@/pages/SignIn';
import Splash from '@/pages/Splash';
import userStore from '@/store/User';
import ArtworkDetailPage from './pages/ArtworkDetailPage';
import FollowList from './pages/FollowList';
import MyPage from './pages/MyPage';
import MyPageAllPosts from './pages/MyPageAllPosts';
import PostDetail from './pages/PostDetail';
import Search from './pages/Search';
import SignUp from './pages/SignUp';
import Profile from '@/pages/Profile';
import { deleteCacheAPI } from '@/feature/api/post.api';

const RootRouter = () => {
  return (
    <Routes>
      <Route index element={<div>웹사이트</div>} />
      <Route path='app/*' element={<AppRoute />}>
        <Route path='on-board' element={<OnBoarding />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='redirect' element={<Redirect/>} />
        <Route path='init' element={<Init />} />
        <Route element={<Auth />}>
          <Route path='home' element={<Home />} />
          <Route path='my-page/*'>
            <Route index element={<MyPage />} />
            <Route path={'all-posts'} element={<MyPageAllPosts />} />
            <Route path={'follow-list/:status'} element={<FollowList />} />
          </Route>
          <Route path='post/:post_id' element={<PostDetail />} />
          <Route path='artwork/:artwork_id' element={<ArtworkDetailPage />} />
          <Route path='search' element={<Search />} />
          <Route path='pick/*' element={<Picks />} />
          <Route path='profile/:user_id' element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RootRouter;

// '',app,''
const AppRoute = () => {
  const navigate = useAppNavigate();
  const location = useLocation();
  const [appLoading, setAppLoading] = useState(true);
  const { setUser } = userStore((state) => state);

  const refresh = async () => {
    try {
      await refreshAPI();
      const myInfo = await getMyInfoAPI();
      await deleteCacheAPI();
      setUser(myInfo);
      if(myInfo.role === 'USER') {
        navigate('init');
        return;
      }
      navigate('home');
    } catch (e) {
      navigate('on-board');
    } finally {
      setAppLoading(false);
    }
  };
  useEffect(() => {
    //redirect인 경우 home으로 이동하지 않기
    if(location.pathname.split('/app/')[1] !== 'redirect'){
      refresh();
      return;
    }
    setAppLoading(false)
  }, []);
  if(appLoading) {
    return <Splash />;
  }
  return <Outlet />;
};

const Auth = () => {
  // 로그인하지 않은 유저는 접근 불가, sign-in으로 이동
  const { user } = userStore((state) => state);
  if(!user) return <Navigate to={'on-board'}/>
  if(user.role === 'USER') return <Navigate to={'init'}/>
  // const {user} = userStore(state => state)
  return <Outlet />;
};

const Redirect = () => {
  useEffect(() => {
    window.close();
  }, [])
  return <></>
}
