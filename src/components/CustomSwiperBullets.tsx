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
  transition: linear width .3s;
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
