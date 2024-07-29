import { ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

//TODO: 사이즈 여러개로 분할 될 시 수정될수 았움, 현재는 고정 사이즈
const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 57px;
  border-radius: 17px;
  background-color: #7bf7ff;
  font-size: 15px;
  font-weight: 600;
  transition: background-color ease-in-out 0.15s;
  &:hover {
    background-color: #47a5ac;
  }
  &:disabled {
  }
`;

export default Button;
