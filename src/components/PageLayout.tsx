import styled from '@emotion/styled';

type PageLayoutProps = {
  direction: 'column' | 'row' | 'row-reverse' | 'column-reverse';
  safeAreaBackground?: string;
}

export const PageLayout = styled.div<PageLayoutProps>`
  display: flex;
  flex-direction: ${(props) => props.direction ?? 'row'};
  width: 100%;
  height: 100%;
  padding-top: env(safe-area-inset-top);
  background-color: ${(props) => props.safeAreaBackground ?? '#121212'};
`
