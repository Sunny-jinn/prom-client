import { PostFeed, PostPick } from '@/feature/types/Post.type';
import useAppNavigate from '@/hooks/useAppNavigate';
import styled from '@emotion/styled';

const renderFeedShorts = (feeds: PostFeed[], shorts: PostPick[]) => {
  const feedChunkSize = 4;
  const maxShorts = Math.min(shorts.length, Math.floor(feeds.length / feedChunkSize));

  // 필요한 만큼 feeds와 shorts를 나눔
  const displayedFeeds = feeds.slice(0, maxShorts * feedChunkSize); // 필요한 feeds만 가져옴
  const displayedShorts = shorts.slice(0, maxShorts); // 필요한 shorts만 가져옴

  // 그룹화하여 하나의 세트로 만듦
  const feedShortsChunks = [];
  for (let i = 0; i < maxShorts; i++) {
    const feedChunk = displayedFeeds.slice(i * feedChunkSize, (i + 1) * feedChunkSize);
    const short = displayedShorts[i];
    feedShortsChunks.push({ feeds: feedChunk, short });
  }

  return feedShortsChunks;
};

type SearchPostListsProps = {
  feeds: PostFeed[];
  picks: PostPick[];
};

export const SearchPostLists = ({ feeds, picks }: SearchPostListsProps) => {
  const feedShortsChunks = renderFeedShorts(feeds, picks);

  const navigate = useAppNavigate();

  return (
    <div className='search-post-list-container'>
      {feedShortsChunks.map((chunk, index) => {
        if(index % 2 === 0) {
          return (
            <PostWrapper style={{gridTemplateColumns: '2fr 1fr'}}>
              <PostFeedWrapper>
                {chunk.feeds.map(el => <PostFeedCard onClick={() => navigate(`post/${el.feedId}`)} src={el.images[0]} />)}
              </PostFeedWrapper>
              <PostPickCard onClick={() => navigate(`pick?index=${chunk.short.shortFormId}`)} src={chunk.short.thumbnailUrl} />
            </PostWrapper>
          );
        }
        return (
          <PostWrapper style={{gridTemplateColumns: '1fr 2fr'}}>
            <PostPickCard onClick={() => navigate(`pick?index=${chunk.short.shortFormId}`)} src={chunk.short.thumbnailUrl} />
            <PostFeedWrapper>
              {chunk.feeds.map(el => <PostFeedCard onClick={() => navigate(`post/${el.feedId}`)} src={el.images[0]} />)}
            </PostFeedWrapper>
          </PostWrapper>
        );
      })}

    </div>
  );
};

const PostWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
  grid-gap: 5px;
`;

const PostFeedWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  grid-gap: 5px;
`;

const PostFeedCard = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 15px;
`;

const PostPickCard = styled.img`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1/2;
  border-radius: 15px;
  grid-row: span / 2;
`;
