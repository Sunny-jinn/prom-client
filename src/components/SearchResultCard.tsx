import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import icon_delete from '@/assets/img/icon_delete_recent.svg';
import icon_search from '@/assets/img/icon_search_square.svg';
import userStore from '@/store/User';

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
  profile?: string;
  id?: string;
};

const SearchResultCard = ({ isRecent, text, profile, id }: SearchResultCardProps) => {
  const navigate = useNavigate();

  const { user } = userStore();

  const clickHandler = (id: string | undefined) => {
    if (String(user?.id) === id) {
      navigate('/app/my-page');
    } else {
      navigate(`/app/profile/${id}`);
    }
  };

  return (
    <Wrapper onClick={() => clickHandler(id)}>
      <IconBox>
        {isRecent ? <img src={icon_search} alt="" /> : <img src={profile} alt="" />}
      </IconBox>
      <span>{text}</span>
      <button>{isRecent && <img src={icon_delete} alt="x" />}</button>
    </Wrapper>
  );
};

export default SearchResultCard;
