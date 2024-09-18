import styled from '@emotion/styled';
import delete_tag from '@/assets/img/delete_tag.png';
import hamburger from '@/assets/img/hamburger.png';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 24px;
    height: 24px;
  }
`;

const TagBox = styled.div<{ main: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 12px 15px;
  gap: 15px;
  border: ${({ main }) => (main ? '1px solid #7bf7ff;' : 'none')};
  border-radius: 15px;
  background-color: ${({ main }) => (main ? 'none' : '#353535')};

  img {
    width: 17px;
    height: 17px;
  }
`;

const TagText = styled.span<{ main: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${({ main }) => (main ? '#7bf7ff;' : '#fff')};
`;

type MyPageTagProps = {
  text: string;
  main?: boolean;
};

const MyPageTag = ({ text, main = false }: MyPageTagProps) => {
  return (
    <Wrapper>
      <TagBox main={main}>
        <img src={delete_tag} alt="delete" />
        <TagText main={main}>{text}</TagText>
      </TagBox>
      <img src={hamburger} alt="hamburger" />
    </Wrapper>
  );
};

export default MyPageTag;
