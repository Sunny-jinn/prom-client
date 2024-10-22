import { InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';

const Input = styled.input<InputHTMLAttributes<HTMLInputElement>>`
  background: none;
  border: 1px solid #7bf7ff;
  width: 100%;
  height: 56px;
  padding: 16px 22px;
  border-radius: 17px;
  color: #fff;
  font-size: 15px;
  &::placeholder {
    color: #a6a6a6;
  }
`;

export default Input;
