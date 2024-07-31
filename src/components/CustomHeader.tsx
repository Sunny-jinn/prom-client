import { ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import leftArrowIcon from '@/assets/left_arrow.png';

type CustomHeaderProps = {
  title: string;
  onClick?: () => void;
};

const Wrapper = styled.header`
  display: flex;
  width: 100%;
  padding: 22px 0;
  align-items: center;
  justify-content: space-between;

  span {
    color: #fff;
    font-weight: 700;
  }
`;

const Button = styled.button<ButtonHTMLAttributes<HTMLButtonElement>>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  :disabled {
    display: none;
  }
`;

const CustomHeader = ({ title, onClick }: CustomHeaderProps) => {
  return (
    <Wrapper>
      <Button onClick={onClick}>
        <img src={leftArrowIcon} alt="left-arrow-icon" />
      </Button>
      <span>{title}</span>
      <div style={{ width: 30 }} />
    </Wrapper>
  );
};

export default CustomHeader;
