import styled from '@emotion/styled';
type ContentDistribution = "space-around" | "space-between" | "space-evenly" | "stretch";
type ContentPosition = "center" | "end" | "flex-end" | "flex-start" | "start";


type PageLayoutProps = {
  justify?: ContentDistribution & ContentPosition
  align?: ContentDistribution & ContentPosition
  gap?: number
}

export const RowFlexBox = styled.div<PageLayoutProps>`
  display: flex;
  justify-content: ${(props) => props.justify ?? 'center'};;
  align-items: ${(props) => props.align ?? 'center'};;
  gap: ${(props) => props.gap ?? 0}px;
  
`
