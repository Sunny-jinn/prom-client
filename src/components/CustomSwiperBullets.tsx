import styled from '@emotion/styled';

type CustomSwiperBulletsProps = {
  slideLength: number;
  currentSlideIndex: number;
};

type SwiperBulletProps = {
  isCurrentIndex: boolean;
};

const SwiperBullets = styled.div`
  display: flex;
  justify-content: center;
  gap: 7px;
  width: 100%;
`;

const SwiperBullet = styled.span<SwiperBulletProps>`
  width: ${(props) => (props.isCurrentIndex ? '17px' : '7px')};
  height: 7px;
  border-radius: 50px;
  background-color: ${(props) => (props.isCurrentIndex ? '#7BF7FF' : '#162E30')};
  transition: ease 0.3s;
  animation: ${(props) =>
    props.isCurrentIndex
      ? '0.4s cubic-bezier(0.39, 0.575, 0.565, 1) 0s 1 normal both running scale-up-hor-center;'
      : 'none'};

  @keyframes scale-up-hor-center {
    0% {
      transform: scaleX(0.4);
    }
    100% {
      transform: scaleX(1);
    }
  }
`;

const CustomSwiperBullets = ({ slideLength, currentSlideIndex }: CustomSwiperBulletsProps) => {
  return (
    <SwiperBullets>
      {new Array(slideLength).fill(0).map((_, index) => (
        <SwiperBullet isCurrentIndex={index === currentSlideIndex} />
      ))}
    </SwiperBullets>
  );
};

export default CustomSwiperBullets;
