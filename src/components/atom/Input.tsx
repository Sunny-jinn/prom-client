import { InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';

const Input = styled.input<InputHTMLAttributes<HTMLInputElement>>`
  background: none;
  border: 1px solid #7bf7ff;
  width: 100%;
  padding: 19.5px 22px;
  border-radius: 17px;
  color: #fff;
  font-size: 15px;
`;

export default Input;
