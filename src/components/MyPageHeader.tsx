import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  line-height: 16.7px;
`;

const RightBtn = styled.span<{ disabled: boolean }>`
  font-weight: 700;
  color: ${(props) => (props.disabled ? '#47a5ac' : '#7bf7ff')};
`;

type MyPageHeaderProps = {
  leftText: string;
  leftOnClick: () => void;
  title: string;
  rightText: string;
  rightOnClick: () => void;
  disabled?: boolean;
};

export const MyPageHeader = ({
  leftText,
  leftOnClick,
  title,
  rightText,
  rightOnClick,
  disabled = false,
}: MyPageHeaderProps) => {
  return (
    <Wrapper>
      <button onClick={leftOnClick}>
        <span>{leftText}</span>
      </button>
      <Title>
        <span>{title}</span>
      </Title>
      <button disabled={disabled} onClick={rightOnClick}>
        <RightBtn disabled={disabled}>{rightText}</RightBtn>
      </button>
    </Wrapper>
  );
};
