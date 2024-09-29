import styled from '@emotion/styled';

type StepProgressProps = {
  color: string;
}

export const StepProgress = styled.progress<StepProgressProps>`
  appearance: none;
  width: 240px;
  height: 4px;
  background-color: transparent;
  -webkit-transition: width 5s ease;
  -moz-transition: width 5s ease;
  -o-transition: width 5s ease;
  transition: width 5s ease;
  
  &::-webkit-progress-bar {
    background: #212121;
    border-radius: 12px;
    overflow: hidden;
  }

  &::-webkit-progress-value {
    background-color: ${(props) => props.color ?? '#121212'};
    border-radius: 20px;
    transition: all 0.5s ease;
  }
`

export default StepProgress;
