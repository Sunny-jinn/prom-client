import { ChangeEvent, useState } from 'react';
import CustomHeader from '@/components/CustomHeader';
import Button from '@/components/atom/Button';
import Input from '@/components/atom/Input';
import './SignUp.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    setIsButtonDisabled(!validateEmail(inputEmail));
  };

  return (
    <div id="SignUp">
      <CustomHeader title="회원가입" />
      <div className="sign-up-top">
        <span className="sign-up-top-text">이메일을 입력해주세요.</span>
        <Input placeholder="예 : prom@gmail.com" value={email} onChange={handleInputChange} />
      </div>
      <Button disabled={isButtonDisabled}>다음</Button>
    </div>
  );
};

export default SignUp;
