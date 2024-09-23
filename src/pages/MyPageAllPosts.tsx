import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import inactive_all_posts_icon from '@/assets/img/all_post.png';
import active_all_posts_icon from '@/assets/img/all_posts.png';
import gallery from '@/assets/img/tabbar_all.png';
import shorts_image from '@/assets/img/tabbar_shorts.png';
import MyPageArtwork from '@/components/MyPageArtwork';
import { MyPageHeader } from '@/components/MyPageHeader';
import PostCard, { PostCardProp } from '@/components/PostCard';
import { DUMMY_DATA } from './MyPage';
import './MyPageAllPosts.scss';

const MyPageAllPosts = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [selectedPosts, setSelectedPosts] = useState<Omit<PostCardProp, 'onClick'>[]>([]);
  const [page, setPage] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [representativeImage] = useState<string | null>(null);
  const [selectedBulletIndex, setSelectedBulletIndex] = useState<number>(0);
  const [temporaryImage, setTemporaryImage] = useState<string | null>(null);

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

  const handleSelectPost = (post: Omit<PostCardProp, 'onClick'>) => {
    setSelectedPosts((prev) =>
      prev.find((selectedPost) => selectedPost.id === post.id)
        ? prev.filter((selectedPost) => selectedPost.id !== post.id)
        : [...prev, post],
    );
  };

  const handleThumbnailClick = (image: string, index: number) => {
    setTemporaryImage(image);
    setSelectedBulletIndex(index);
  };

  const handleSelect = () => {
    if (temporaryImage) {
      setSelectedPosts((prevPosts) => {
        const updatedPosts = prevPosts.filter((post) => post.image !== temporaryImage);
        return [prevPosts.find((post) => post.image === temporaryImage)!, ...updatedPosts];
      });
      setTemporaryImage(null);
      setPage(1);
    }
  };

  return (
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
                  {DUMMY_DATA.map((item) => (
                    <PostCard
                      id={item.id}
                      image={item.image}
                      isSelected={selectedPosts.some((post) => post.id === item.id)}
                      onClick={() => handleSelectPost(item)}
                      select
                    />
                  ))}
                </div>
              </TabPanel>
              <TabPanel p={0}>
                <div className="my-page-all-posts-content">
                  <MyPageArtwork all />
                  <MyPageArtwork all />
                  <MyPageArtwork all />
                  <MyPageArtwork all />
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
            rightOnClick={() => setPage(1)}
            rightText="완료"
            title="아트워크 추가"
            disabled={inputValue.length === 0}
          />
          <div className="my-page-artwork-add">
            <div className="my-page-artwork-thumbnail">
              <MyPageArtwork all image={selectedPosts[0]?.image || ''} />
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
                src={representativeImage || selectedPosts[0]?.image}
                alt="thumbnail"
                className="my-page-artwork-thumbnail-image"
              />
            </div>
            <div className="my-page-artwork-thumbnail-bullets">
              {selectedPosts.map((_, index) => (
                <div
                  key={index}
                  className={`my-page-artwork-thumbnail-bullet ${index === selectedBulletIndex ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(selectedPosts[index].image, index)}
                />
              ))}
            </div>
            <div className="my-page-artwork-thumbnail-list">
              <input type="file" name="thumbnail" ref={fileInputRef} />
              <div className="my-page-artwork-thumbnail-card gallery" onClick={handleGalleryClick}>
                <img src={gallery} alt=" gallery" />
                <span>갤러리</span>
              </div>

              {selectedPosts.map((item, index) => (
                <div
                  key={item.id}
                  className={`my-page-artwork-thumbnail-card ${index !== selectedBulletIndex ? 'inactive' : ''}`}
                  onClick={() => handleThumbnailClick(item.image, index)}
                >
                  <img className="my-page-artwork-thumbnail-card-img" src={item.image} alt="img" />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyPageAllPosts;
