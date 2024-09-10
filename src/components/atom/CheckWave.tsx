import SignUpComplete from '@/assets/img/icon_check.svg?react';
import './CheckWave.scss';

const CheckWave = () => {
  return (
    <div className='wave-box'>
      <SignUpComplete style={{ zIndex: 1 }} width={38} color={'#000000'} />
      <div className='waves wave-1' />
      <div className='waves wave-2' />
      <div className='waves wave-3' />
    </div>
  );
};

export default CheckWave;
