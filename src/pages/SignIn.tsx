import google_auth_icon from '@/assets/img/google_sign_in.png';
import CustomHeader from '@/components/CustomHeader';
import Button from '@/components/atom/Button';
import Input from '@/components/atom/Input';
import './SignIn.scss';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import 'swiper/css';
import 'swiper/css/effect-fade';
import Logo from '@/assets/img/img_logo.svg?react';
import useAppNavigate from '@/hooks/useAppNavigate';
import { useState } from 'react';
import { getMyInfoAPI, loginAPI, refreshAPI } from '@/feature/api/user.api';
import userStore from '@/store/User';

const SignIn = () => {
  const navigate = useAppNavigate();
  const { setUser } = userStore(state => state);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      await loginAPI({
        email,
        password,
      });
      const myInfo = await getMyInfoAPI();
      setUser({
        email: myInfo.email ?? '',
        username: myInfo.username ?? '',
        profileImage: myInfo.profileImage ?? '',
        role: myInfo.role,
      });
      if(myInfo.role === 'USER') {
        navigate('init');
        return;
      }
      navigate('home');
    } catch (e) {
      console.log(e);
    }
  };

  const detectChildWindow = async function (
    childWindow: WindowProxy,
    closeCallback: (window: WindowProxy) => void,
  ) {
    const interval = window.setInterval(function () {
      try {
        if (childWindow == null || childWindow.closed) {
          window.clearInterval(interval);
          closeCallback(childWindow);
        }
      } catch (e) {
        console.error(e);
      }
    }, 1000);
    return childWindow;
  };

  const googleSignIn = async() => {
    const authPopup = window.open('https://api.prom-art.store/oauth2/authorization/google', '_blank', 'width=600,height=600');
    if(!authPopup) return;
    await detectChildWindow(authPopup, async () => {
      await refreshAPI();
      const myInfo = await getMyInfoAPI();
      setUser(myInfo);
      if(myInfo.role === 'USER') {
        navigate('init');
        return;
      }
      navigate('home');
    });
  }

  return (
    <SafeAreaLayout flexDirection={'column'}>
      <div id={'SignIn'}>
        <CustomHeader>
          <Logo width={70} />
        </CustomHeader>
        <div className='sign-in-top'>
          <span className='sign-in-top-text'>돌아오신 것을</span>
          <span className='sign-in-top-text'>환영합니다!</span>
        </div>
        <div className='sign-in-input'>
          <Input placeholder='이메일을 입력해주세요' value={email} onChange={e => setEmail(e.target.value)} />
          <Input placeholder='비밀번호를 입력해주세요' type={'password'} value={password}
                 onChange={e => setPassword(e.target.value)} />
          <span className='sign-in-input-find-text'>아이디/비밀번호 찾기</span>
        </div>
        <div className='sign-in-button'>
          <Button onClick={() => login()}>로그인</Button>
          {/**
           * !FEAT: 흰색 background hover 생각
           */}
          <Button style={{ backgroundColor: '#CCCCCC' }} onClick={() => navigate('sign-up')}>회원가입</Button>
        </div>
        <div className='sign-in-divider'>
          <div className='sign-in-divider-line' />
          <span className='sign-in-divider-text'>혹은</span>
          <div className='sign-in-divider-line' />
        </div>
        <div className='sign-in-social-icons'>
          {/**
           * !FIX: icon component화. icon 조금 깨짐 수정 바람
           */}
          <button onClick={() => googleSignIn()}>
            <img src={google_auth_icon} alt='google login' />
          </button>
        </div>
      </div>
    </SafeAreaLayout>

  );
};

export default SignIn;
