import { useParams } from 'react-router-dom';
import './ArtworkDetailPage.scss';

const ArtworkDetailPage = () => {
  const { artwork_id } = useParams();

  return (
    <div id="ArtworkDetailPage">
      <div>{artwork_id}</div>
    </div>
  );
};

export default ArtworkDetailPage;
