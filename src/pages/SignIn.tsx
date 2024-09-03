import google_auth_icon from '@/assets/google_sign_in.png';
import kakao_auth_icon from '@/assets/kakao_sign_in.png';
import naver_auth_icon from '@/assets/naver_sign_in.png';
import CustomHeader from '@/components/CustomHeader';
import Button from '@/components/atom/Button';
import Input from '@/components/atom/Input';
import './SignIn.scss';

const SignIn = () => {
  return (
    <div id={'SignIn'}>
      <CustomHeader title="로그인" />
      <div className="sign-in-top">
        <span className="sign-in-top-text">돌아오신 것을</span>
        <span className="sign-in-top-text">환영합니다!</span>
      </div>
      <div className="sign-in-input">
        <Input placeholder="이메일을 입력해주세요" />
        <Input placeholder="비밀번호를 입력해주세요" />
        <span className="sign-in-input-find-text">아이디/비밀번호 찾기</span>
      </div>
      <div className="sign-in-button">
        <Button>로그인</Button>
        {/**
         * !FEAT: 흰색 background hover 생각
         */}
        <Button style={{ backgroundColor: '#fff' }}>회원가입</Button>
      </div>
      <div className="sign-in-divider">
        <div className="sign-in-divider-line" />
        <span className="sign-in-divider-text">혹은</span>
        <div className="sign-in-divider-line" />
      </div>
      <div className="sign-in-social-icons">
        {/**
         * !FIX: icon component화. icon 조금 깨짐 수정 바람
         */}
        <button>
          <img src={google_auth_icon} alt="google login" />
        </button>
        <button>
          <img src={kakao_auth_icon} alt="google login" />
        </button>
        <button>
          <img src={naver_auth_icon} alt="google login" />
        </button>
      </div>
    </div>
  );
};

export default SignIn;
