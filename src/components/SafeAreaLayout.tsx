import { CSSProperties } from 'react';
import styled from '@emotion/styled';

type SafeAreaLayoutProps = CSSProperties & {
  safeAreaBackground?: string;
};

export const SafeAreaLayout = styled.div<SafeAreaLayoutProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection ?? 'row'};
  width: 100%;
  height: 100%;
  padding-top: env(safe-area-inset-top);
  background-color: ${(props) => props.safeAreaBackground ?? '#121212'};
`;
