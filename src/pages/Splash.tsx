import { PageLayout } from '@/components/PageLayout';
import './Splash.scss';
import { css } from '@emotion/react';
import SplashLogo from '@/assets/img/img_splash.svg?react';
import SplashBottom from '@/assets/img/img_splash_bottom.svg?react';

const Splash = () => {
  return (
    <PageLayout css={css({ padding: 30, alignItems: 'center' })} safeAreaBackground={'#121212'} flexDirection={'column'}>
      <div className='splash-main'>
        <SplashLogo width={170} />
        <span>숏츠로 보는 예술가 포트폴리오</span>
      </div>
      <SplashBottom />
    </PageLayout>
  );
};

export default Splash;
