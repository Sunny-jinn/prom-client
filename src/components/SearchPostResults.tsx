import { useNavigate } from 'react-router-dom';
import { SearchPostResponse } from '@/feature/api/search.api';
import { saveRecentSearch } from '@/utils/storage.utils';

type SearchPostResultsProps = {
  feeds?: SearchPostResponse[];
  picks?: SearchPostResponse[];
  text: string;
};

export const SearchPostResults = ({ feeds = [], picks = [], text }: SearchPostResultsProps) => {
  const navigate = useNavigate();

  const onClickFeed = (id: number) => {
    saveRecentSearch(text);
    navigate(`/app/post/${id}`);
  };

  const onClickPick = (id: number) => {
    saveRecentSearch(text);
    navigate(`/app/pick?index=${id}`);
  };

  return (
    <div className="search-post-result-container">
      {feeds.length > 0 &&
        feeds.map((item, idx) => (
          <div className="search-result-feed-card" key={idx} onClick={() => onClickFeed(item.id)}>
            <img src={item.imageUrl} alt="x" />
          </div>
        ))}
      {picks.length > 0 &&
        picks.map((item, idx) => (
          <div className="search-result-pick-card" key={idx} onClick={() => onClickPick(item.id)}>
            <img src={item.imageUrl} alt="x" />
          </div>
        ))}
    </div>
  );
};
