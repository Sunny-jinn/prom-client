import styled from '@emotion/styled';
import icon_delete from '@/assets/img/icon_delete_recent.svg';
import icon_search from '@/assets/img/icon_search_square.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
  font-size: 15px;
  font-weight: 600;
  line-height: 17.9px;

  button {
    margin-left: auto;
  }
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 51px;
  height: 51px;
  background-color: #212121;
  border-radius: 999px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 999px;
    object-fit: cover;
  }
`;

type SearchResultCardProps = {
  isRecent?: boolean;
  text: string;
  profile?: any;
};

const SearchResultCard = ({ isRecent, text, profile }: SearchResultCardProps) => {
  return (
    <Wrapper>
      <IconBox>
        {isRecent ? <img src={icon_search} alt="" /> : <img src={profile} alt="" />}
      </IconBox>
      <span>{text}</span>
      <button>{isRecent && <img src={icon_delete} alt="x" />}</button>
    </Wrapper>
  );
};

export default SearchResultCard;
