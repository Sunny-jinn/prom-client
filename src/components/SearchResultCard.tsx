import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import icon_delete from '@/assets/img/icon_delete_recent.svg';
import icon_search from '@/assets/img/icon_search_square.svg';
import userStore from '@/store/User';
import { Dispatch, SetStateAction, MouseEvent } from 'react';
import { removeRecentSearch, saveRecentSearch } from '@/utils/storage.utils';

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
    border-radius: 50%;
    object-fit: cover;
  }
`;

type SearchResultCardProps = {
  isRecent?: boolean;
  text: string;
  value?: string;
  profile?: string;
  id?: string;
  setInput?: Dispatch<SetStateAction<string>>
  recentSearch?: string[];
  setRecentSearch?: Dispatch<SetStateAction<string[]>>
};

const SearchResultCard = ({ isRecent, recentSearch, setRecentSearch, text, value, profile, id, setInput }: SearchResultCardProps) => {
  const navigate = useNavigate();

  const { user } = userStore();

  const clickHandler = () => {
    if(isRecent && setInput) {
      setInput(text);
      return;
    }
    if(value) {
      saveRecentSearch(value);
    }
    if(String(user?.id) === id) {
      navigate('/app/my-page');
    } else {
      navigate(`/app/profile/${id}`);
    }
  };
  const onClickX = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if(!recentSearch || !setRecentSearch) return;
    const filteredValue = recentSearch.filter(el => el !== text);
    setRecentSearch(filteredValue)
    removeRecentSearch(text)
  }

  return (
    <Wrapper onClick={() => clickHandler()}>
      <IconBox style={{padding: isRecent ? 10 : 0}}>
        {isRecent ? <img src={icon_search} alt='' /> : <img src={profile} alt='' />}
      </IconBox>
      <span>{text}</span>
      <button onClick={(e) => onClickX(e)}>{isRecent && <img src={icon_delete} alt='x' />}</button>
    </Wrapper>
  );
};

export default SearchResultCard;
