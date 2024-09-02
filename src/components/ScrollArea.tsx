import styled from '@emotion/styled';

type ScrollAreaProps = {
  backgroundColor?: string;
  padding?: string;
}

export const ScrollArea = styled.div<ScrollAreaProps>`
  display: block;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: ${(props) => props.padding ?? '0'};;
  background-color: ${(props) => props.backgroundColor ?? '#121212'};;

`
