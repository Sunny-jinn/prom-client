import { useEffect, useState } from 'react';
import check from '@/assets/img/check.png';
import CustomHeader from '@/components/CustomHeader';
import Button from '@/components/atom/Button';
import Input from '@/components/atom/Input';
import './SignUp.scss';
import useAppNavigate from '@/hooks/useAppNavigate';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import { joinAPI, loginAPI } from '@/feature/api/user.api';
import CheckWave from '@/components/atom/CheckWave';
import useIsAble from '@/hooks/useIsAble';
import userStore from '@/store/User';

const SignUp = () => {
  const { setUser } = userStore(state => state);
  const navigate = useAppNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [step, setStep] = useState(0);

  const emailRegexValidator = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const passwordRegexValidator = (password: string) => {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasLetters && hasNumbers && hasSpecialChars;
  };

  const isValidEmail = useIsAble([
    emailRegexValidator(email)
  ])

  const isValidPassword = useIsAble([
    passwordRegexValidator(password),
    password.length >= 10,
    confirmPassword === password
  ])

  const handleClickButton = async() => {
    if(step === 0) {
      setStep((step) => step + 1);
      return;
    }
    // Sign up
    try{
      const result = await joinAPI({
        email,
        password
      })
      await loginAPI({
        email,
        password,
      });
      setUser({
        email: result.email ?? '',
        username: result.username ?? '',
        profileImage: result.profileImage ?? '',
        role: result.role,
      });
      setStep((step) => step + 1);
    }catch (e) {
      console.log(e);
    }
    // step === 1일 경우 회원가입 진행
  };

  useEffect(() => {
    if(step === 2){
      setTimeout(() => {
        navigate('init')
      }, 3000)
    }
  }, [step])

  return (
    <SafeAreaLayout flexDirection={'column'}>
      <div id='SignUp'>
        <CustomHeader leftOnClick={step !== 2 ? () => navigate('sign-in') : undefined}>
          <span>회원가입</span>
        </CustomHeader>
        {step === 0 && (
          <>
            <div className='sign-up-top'>
              <span className='sign-up-top-text'>이메일을 입력해주세요.</span>
              <Input
                placeholder='예 : prom@gmail.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button disabled={!isValidEmail} onClick={handleClickButton}>
              다음
            </Button>
          </>
        )}
        {step === 1 && (
          <>
            <div className='sign-up-top'>
              <span className='sign-up-top-text'>비밀번호를 입력해주세요.</span>
              <Input
                placeholder='비밀번호'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
              />
              <Input
                placeholder='비밀번호 확인'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type='password'
              />
              <div className='sign-up-password-validation'>
                <div className={`sign-up-password-invalid ${password.length >= 10 && 'password-valid'}`}>
                  {password.length >= 10 && <img src={check} alt='check' />}10자 이상
                </div>
                <div className={`sign-up-password-invalid ${passwordRegexValidator(password) && 'password-valid'}`}>
                  {passwordRegexValidator(password) && <img src={check} alt='check' />}
                  영문, 숫자, 특수문자 포함
                </div>
              </div>
            </div>
            <Button disabled={!isValidPassword} onClick={handleClickButton}>
              다음
            </Button>
          </>
        )}
        {step === 2 && (
          <div className='complete-sign-up'>
            <div className='complete-sign-up-view'>
              <CheckWave/>
              <span>회원가입이 완료되었습니다!</span>
            </div>
          </div>
        )}
      </div>
    </SafeAreaLayout>
  );
};

export default SignUp;
