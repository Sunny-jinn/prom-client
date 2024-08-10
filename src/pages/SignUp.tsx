import { ChangeEvent, useState } from 'react';
import check from '@/assets/check.png';
import CustomHeader from '@/components/CustomHeader';
import Button from '@/components/atom/Button';
import Input from '@/components/atom/Input';
import './SignUp.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [page, setPage] = useState(0);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClickButton = () => {
    setPage((page) => page + 1);
    setIsButtonDisabled(true);
  };

  const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    setIsButtonDisabled(!validateEmail(inputEmail));
  };

  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
  };

  const isPasswordValid = (password: string) => {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasLetters && hasNumbers && hasSpecialChars;
  };

  return (
    <div id="SignUp">
      <CustomHeader title="회원가입" />
      {page === 0 && (
        <>
          <div className="sign-up-top">
            <span className="sign-up-top-text">이메일을 입력해주세요.</span>
            <Input
              placeholder="예 : prom@gmail.com"
              value={email}
              onChange={handleEmailInputChange}
            />
          </div>
          <Button disabled={isButtonDisabled} onClick={handleClickButton}>
            다음
          </Button>
        </>
      )}
      {page === 1 && (
        <>
          <div className="sign-up-top">
            <span className="sign-up-top-text">비밀번호를 입력해주세요.</span>
            <Input
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordInputChange}
              type="password"
            />
            <div className="sign-up-password-validation">
              <div
                className={`sign-up-password-invalid ${password.length >= 10 && 'password-valid'}`}
              >
                {password.length >= 10 && <img src={check} alt="check" />}10자 이상
              </div>
              <div
                className={`sign-up-password-invalid ${
                  isPasswordValid(password) && 'password-valid'
                }`}
              >
                {isPasswordValid(password) && <img src={check} alt="check" />}영문, 숫자, 특수문자
                포함
              </div>
            </div>
          </div>
          <Button
            disabled={password.length < 10 || !isPasswordValid(password)}
            onClick={handleClickButton}
          >
            다음
          </Button>
        </>
      )}
      {page === 2 && (
        <>
          <div className="sign-up-nickname-top">
            <span className="sign-up-top-small-text">닉네임</span>
            <Input
              placeholder="영문 혹은 한글 12자 이하"
              onChange={handlePasswordInputChange}
              style={{ marginTop: '12px', marginBottom: '30px' }}
            />
            <span className="sign-up-top-small-text">이메일</span>
            <Input value={email} onChange={handlePasswordInputChange} readOnly />
          </div>
          <Button disabled={isButtonDisabled} onClick={handleClickButton}>
            다음
          </Button>
        </>
      )}
    </div>
  );
};

export default SignUp;
