import styled from '@emotion/styled';

type ScrollAreaProps = {
  backgroundColor?: string;
}

export const ScrollArea = styled.div<ScrollAreaProps>`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${(props) => props.backgroundColor ?? '#121212'};;
  
`
