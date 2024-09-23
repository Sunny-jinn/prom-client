import styled from '@emotion/styled';

type DefaultSwiperBulletsProps = {
  slideLength: number;
  currentSlideIndex: number;
};

type DefaultSwiperBulletProps = {
  isCurrentIndex: boolean;
};

const SwiperBullets = styled.div`
  display: flex;
  justify-content: center;
  gap: 7px;
  width: 100%;
`;

const DefaultSwiperBullet = styled.span<DefaultSwiperBulletProps>`
  width: 6px;
  height: 7px;
  border-radius: 50px;
  background-color: ${(props) => (props.isCurrentIndex ? '#ffffff' : '#474747')};
`;

const DefaultSwiperBullets = ({ slideLength, currentSlideIndex }: DefaultSwiperBulletsProps) => {
  return (
    <SwiperBullets>
      {new Array(slideLength).fill(0).map((_, index) => (
        <DefaultSwiperBullet isCurrentIndex={index === currentSlideIndex} />
      ))}
    </SwiperBullets>
  );
};

export default DefaultSwiperBullets;
