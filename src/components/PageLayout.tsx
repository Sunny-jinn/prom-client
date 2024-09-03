import styled from '@emotion/styled';
import { CSSProperties } from 'react';

type PageLayoutProps = CSSProperties & {
  safeAreaBackground?: string;
}

export const PageLayout = styled.div<PageLayoutProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection ?? 'row'};
  width: 100%;
  height: 100%;
  padding-top: env(safe-area-inset-top);
  background-color: ${(props) => props.safeAreaBackground ?? '#121212'};
`
