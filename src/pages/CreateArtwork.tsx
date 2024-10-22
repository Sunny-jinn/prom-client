import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import inactive_all_posts_icon from '@/assets/img/all_post.png';
import active_all_posts_icon from '@/assets/img/all_posts.png';
import gallery from '@/assets/img/tabbar_all.png';
import shorts_image from '@/assets/img/tabbar_shorts.png';
import MyPageArtwork from '@/components/MyPageArtwork';
import { MyPageHeader } from '@/components/MyPageHeader';
import PostCard from '@/components/PostCard';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import { FeedImagesResponse, getFeedsImages, postArtwork } from '@/feature/api/artworks.api';
import { getUserPicks } from '@/feature/api/mypage.api';
import { PostPick } from '@/feature/types/Post.type';
import './CreateArtwork.scss';

const CreateArtwork = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [selectedPosts, setSelectedPosts] = useState<FeedImagesResponse[]>([]);
  const [selectedPicks, setSelectedPicks] = useState<PostPick[]>([]);
  const [page, setPage] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [representativeImage] = useState<string | null>(null);
  const [selectedBulletIndex, setSelectedBulletIndex] = useState<number>(0);
  const [temporaryImage, setTemporaryImage] = useState<string | null>(null);
  const [userFeedImages, setUserFeedImages] = useState<FeedImagesResponse[]>([]);
  const [userPicks, setUserPicks] = useState<PostPick[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const feeds = await getFeedsImages();
      const picks = await getUserPicks();
      setUserFeedImages(feeds);
      setUserPicks(picks);
    };
    fetchData();
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleGalleryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const navigate = useNavigate();

  const handleSelectPost = (post: FeedImagesResponse) => {
    setSelectedPosts((prev) =>
      prev.find((selectedPost) => selectedPost.feedImageId === post.feedImageId)
        ? prev.filter((selectedPost) => selectedPost.feedImageId !== post.feedImageId)
        : [...prev, post],
    );
  };

  const handleSelectPick = (pick: PostPick) => {
    setSelectedPicks((prev) =>
      prev.find((selectedPost) => selectedPost.shortFormId === pick.shortFormId)
        ? prev.filter((selectedPost) => selectedPost.shortFormId !== pick.shortFormId)
        : [...prev, pick],
    );
  };

  const handleThumbnailClick = (image: string, index: number) => {
    setTemporaryImage(image);
    setSelectedBulletIndex(index);
  };

  const handleSelect = () => {
    if (temporaryImage) {
      setSelectedPosts((prevPosts) => {
        const updatedPosts = prevPosts.filter((post) => post.imageUrl !== temporaryImage);
        return [prevPosts.find((post) => post.imageUrl === temporaryImage)!, ...updatedPosts];
      });
      setTemporaryImage(null);
      setPage(1);
    }
  };

  const handlePostArtwork = async () => {
    const feedImageIds = selectedPosts.map((post) => post.feedImageId);
    const pickIds = selectedPicks.map((pick) => pick.shortFormId);
    await postArtwork({
      name: inputValue,
      shortFormIdList: pickIds,
      feedImageIdList: feedImageIds,
      imageUrl: selectedPosts[0].imageUrl,
    }).then(() => {
      navigate(-1);
    });
  };

  return (
    <SafeAreaLayout>
      <div id="MyPageAllPosts">
        {page === 0 && (
          <>
            <MyPageHeader
              leftText="취소"
              leftOnClick={() => navigate(-1)}
              rightOnClick={() => setPage(1)}
              rightText="다음"
              title="아트워크 추가"
              disabled={selectedPosts.length === 0}
            />

            <Tabs isFitted variant={'unstyled'} onChange={(index) => setTabIndex(index)}>
              <TabList>
                <Tab>
                  <div className="tab-icon">
                    {tabIndex === 0 ? (
                      <img src={active_all_posts_icon} alt="icon" />
                    ) : (
                      <img src={inactive_all_posts_icon} alt="icon" />
                    )}
                  </div>
                </Tab>
                <Tab>
                  <div className={`tab-icon ${tabIndex === 1 && 'active'}`}>
                    <img src={shorts_image} alt="" />
                  </div>
                </Tab>
              </TabList>
              <TabIndicator height={'2px'} bg={'#7Bf7ff'} />
              <TabPanels>
                <TabPanel p={0}>
                  <div className="my-page-all-posts-content">
                    {userFeedImages.map((item) => (
                      <PostCard
                        id={item.feedImageId}
                        image={item.imageUrl}
                        isSelected={selectedPosts.some(
                          (post) => post.feedImageId === item.feedImageId,
                        )}
                        onClick={() => handleSelectPost(item)}
                        select
                      />
                    ))}
                  </div>
                </TabPanel>
                <TabPanel p={0}>
                  <div className="my-page-all-posts-content">
                    {userPicks.map((item) => (
                      <MyPageArtwork
                        all
                        image={item.thumbnailUrl}
                        onClick={() => handleSelectPick(item)}
                        isSelected={selectedPicks.some(
                          (pick) => pick.shortFormId === item.shortFormId,
                        )}
                        select
                      />
                    ))}
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )}

        {page === 1 && (
          <>
            <MyPageHeader
              leftText="취소"
              leftOnClick={() => setPage(0)}
              rightOnClick={handlePostArtwork}
              rightText="완료"
              title="아트워크 추가"
              disabled={inputValue.length === 0}
            />
            <div className="my-page-artwork-add">
              <div className="my-page-artwork-thumbnail represent">
                <MyPageArtwork all image={selectedPosts[0]?.imageUrl || ''} />
              </div>
              <button onClick={() => setPage(2)}>
                <span>커버 수정</span>
              </button>
            </div>
            <div className="my-page-artwork-title">
              <input
                type="text"
                placeholder="컬렉션 제목"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        {page === 2 && (
          <>
            <MyPageHeader
              leftText="취소"
              leftOnClick={() => setPage(1)}
              rightOnClick={handleSelect}
              rightText="선택"
              title="아트워크 추가"
              disabled={selectedPosts.length === 0}
            />
            <div className="my-page-artwork-thumbnail-update">
              <div className="my-page-artwork-thumbnail">
                <img
                  src={representativeImage || selectedPosts[0]?.imageUrl}
                  alt="thumbnail"
                  className="my-page-artwork-thumbnail-image"
                />
              </div>
              <div className="my-page-artwork-thumbnail-bullets">
                {selectedPosts.map((_, index) => (
                  <div
                    key={index}
                    className={`my-page-artwork-thumbnail-bullet ${index === selectedBulletIndex ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(selectedPosts[index].imageUrl, index)}
                  />
                ))}
              </div>
              <div className="my-page-artwork-thumbnail-list">
                <input type="file" name="thumbnail" ref={fileInputRef} />
                <div
                  className="my-page-artwork-thumbnail-card gallery"
                  onClick={handleGalleryClick}
                >
                  <img src={gallery} alt=" gallery" />
                  <span>갤러리</span>
                </div>

                {selectedPosts.map((item, index) => (
                  <div
                    key={item.feedImageId}
                    className={`my-page-artwork-thumbnail-card ${index !== selectedBulletIndex ? 'inactive' : ''}`}
                    onClick={() => handleThumbnailClick(item.imageUrl, index)}
                  >
                    <img
                      className="my-page-artwork-thumbnail-card-img"
                      src={item.imageUrl}
                      alt="img"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </SafeAreaLayout>
  );
};

export default CreateArtwork;
