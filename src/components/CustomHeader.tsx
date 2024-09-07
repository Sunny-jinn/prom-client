import styled from '@emotion/styled';
import LeftArrowIcon from '@/assets/img/icon_left_arrow.svg?react';
import { ReactNode } from 'react';

type CustomHeaderProps = {
  children?: ReactNode
  leftOnClick?: () => void;
};

const Wrapper = styled.header`
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  justify-content: space-between;

  span {
    color: #fff;
    font-weight: 700;
  }
`;

const CustomHeader = ({ children, leftOnClick }: CustomHeaderProps) => {
  return (
    <Wrapper>
      {leftOnClick ? <LeftArrowIcon onClick={leftOnClick} /> : <div style={{width: 37}}/>}
      {children && children}
      <div style={{width: 37}}/>
    </Wrapper>
  );
};

export default CustomHeader;
