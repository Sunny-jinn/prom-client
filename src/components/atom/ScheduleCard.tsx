import styled from '@emotion/styled';

type ScheduleCardProps = {
  border?: string; // 테두리가 존재할 경우 색상
}

export const ScheduleCard = styled.div<ScheduleCardProps>`
  --background-color: #3F3F3F;
  display: flex;
  width: 100%;
  padding: 22px 28px;
  border-radius: 25px;
  background-color: #3F3F3F;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.border ?? '#3F3F3F'};;
`
