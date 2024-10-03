import { useNavigate } from 'react-router-dom';
import { SearchPostResponse } from '@/feature/api/search.api';

type SearchPostResultsProps = {
  feeds?: SearchPostResponse[];
  picks?: SearchPostResponse[];
};

export const SearchPostResults = ({ feeds = [], picks = [] }: SearchPostResultsProps) => {
  const navigate = useNavigate();

  return (
    <div className="search-post-result-container">
      {feeds.length > 0 &&
        feeds.map((item, idx) => (
          <div
            className="search-result-feed-card"
            key={idx}
            onClick={() => navigate(`/app/post/${item.id}`)}
          >
            <img src={item.imageUrl} alt="x" />
          </div>
        ))}
      {picks.length > 0 &&
        picks.map((item, idx) => (
          <div
            className="search-result-pick-card"
            key={idx}
            onClick={() => navigate(`/app/pick?index=${item.id}`)}
          >
            <img src={item.imageUrl} alt="x" />
          </div>
        ))}
    </div>
  );
};
