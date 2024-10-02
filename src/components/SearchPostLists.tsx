import React from 'react';
import { PostFeed, PostPick } from '@/feature/types/Post.type';
import useAppNavigate from '@/hooks/useAppNavigate';

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
      {feedShortsChunks.map((chunk, index) => (
        <React.Fragment key={index}>
          {/* 짝수 인덱스일 때는 post cards가 왼쪽, shorts가 오른쪽 */}
          {index % 2 === 0 ? (
            <>
              <div className='search-post-list-cards'>
                {chunk.feeds.map((feed, feedIndex) => (
                  <div
                    className='search-post-list-card'
                    key={feedIndex}
                    onClick={() => navigate(`post/${feed.feedId}`)}
                  >
                    <img src={feed.images[0]} alt='Feed' />
                  </div>
                ))}
              </div>
              <div className='search-post-list-shorts'>
                <div
                  className='search-post-list-shorts-card'
                  onClick={() => navigate(`pick?index=${chunk.short.shortFormId}`)}
                >
                  <img src={chunk.short.thumbnailUrl} alt='Short' />
                </div>
              </div>
            </>
          ) : (
            /* 홀수 인덱스일 때는 shorts가 왼쪽, post cards가 오른쪽 */
            <>
              <div className='search-post-list-shorts'>
                <div className='search-post-list-shorts-card'>
                  <img src={chunk.short.thumbnailUrl} alt='Short'
                       onClick={() => navigate(`pick?index=${chunk.short.shortFormId}`)} />
                </div>
              </div>
              <div className='search-post-list-cards'>
                {chunk.feeds.map((feed, feedIndex) => (
                  <div
                    className='search-post-list-card'
                    key={feedIndex}
                    onClick={() => navigate(`post/${feed.feedId}`)}
                  >
                    <img src={feed.images[0]} alt='Feed' />
                  </div>
                ))}
              </div>
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
