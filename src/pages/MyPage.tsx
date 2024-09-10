import { useNavigate } from 'react-router-dom';
import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import ellipsis from '@/assets/img/ellipsis.png';
import profileBackground from '@/assets/img/profile_background.png';
import tabbar_all from '@/assets/img/tabbar_all.png';
import tabbar_bookmark from '@/assets/img/tabbar_bookmark.png';
import tabbar_shorts from '@/assets/img/tabbar_shorts.png';
import CustomBottomDrawer from '@/components/CustomBottomDrawer';
import MyPageArtwork from '@/components/MyPageArtwork';
import './MyPage.scss';

const MyPage = () => {
  const navigate = useNavigate();

  const { isOpen: isDrawerOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();
  const {
    isOpen: isBottomModalOpen,
    onOpen: openBottomModal,
    onClose: closeBottomModal,
  } = useDisclosure();

  const MyPageOptions = [
    {
      id: 0,
      text: '관심없음',
    },
    {
      id: 1,
      text: '차단',
    },
    {
      id: 2,
      text: '신고하기',
      delete: true,
    },
  ];

  return (
    <div id="MyPage">
      <div className="my-page-header">
        <img style={{ visibility: 'hidden' }} src={ellipsis} alt="ellipsis" />
        <span className="my-page-header-text">마이페이지</span>
        <img src={ellipsis} alt="ellipsis" onClick={openDrawer} />
      </div>

      <div className="background-image">
        <img src={profileBackground} alt="background" />
        <div className="my-page-profile">
          <div className="my-page-profile-content">
            <div className="my-page-profile-icon">
              <img src={profileBackground} alt="" className="my-page-profile-image" />
            </div>
            <span className="my-page-nickname">김진우</span>
            <div className="my-page-profile-tags">
              <div className="my-page-profile-tag main-tag">그래픽 아티스트</div>
              <div className="my-page-profile-tag">그래픽 아티스트</div>
              {/**!TODO: 더보기 버튼 */}
            </div>
          </div>
        </div>
      </div>

      <div className="my-page-info-container">
        <div className="my-page-info">
          <span className="my-page-info-number">15</span>
          <span className="my-page-info-text">작업</span>
        </div>
        <div className="my-page-info">
          <span className="my-page-info-number">33</span>
          <span className="my-page-info-text">팔로워</span>
        </div>
        <div className="my-page-info">
          <span className="my-page-info-number">45</span>
          <span className="my-page-info-text">팔로잉</span>
        </div>
      </div>

      <div className="my-page-intro">
        <div className="my-page-intro-title">소개</div>
        <div className="my-page-intro-content">{DUMMY}</div>
      </div>

      {/**!TODO: 더보기 아이콘 */}
      <div className="my-page-artworks">
        <MyPageArtwork text="자연" />
        <MyPageArtwork text="자동차" />
        <div className="my-page-artwork artwork-add">+</div>
      </div>

      <Tabs isFitted variant={'unstyled'}>
        <TabList>
          <Tab>
            <div className="my-page-tabbar-icon active">
              <img src={tabbar_all} alt="tab" />
            </div>
          </Tab>
          <Tab>
            <div className="my-page-tabbar-icon">
              <img src={tabbar_shorts} alt="tab" />
            </div>
          </Tab>
          <Tab>
            <div className="my-page-tabbar-icon">
              <img src={tabbar_bookmark} alt="tab" />
            </div>
          </Tab>
        </TabList>
        <TabIndicator height={'2px'} bg={'#7Bf7ff'} />
        <TabPanels>
          <TabPanel p={0}>
            <div className="my-page-posts">
              {DUMMY_DATA.map((item) => (
                <div
                  className="my-page-post"
                  key={item.id}
                  onClick={() => navigate(`/app/post/${item.id}`)}
                >
                  <img src={item.image} alt="post" />
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel>dd</TabPanel>
          <TabPanel p={0}>
            <div className="my-page-posts">
              <MyPageArtwork text="모든 게시물" onClick={() => navigate('all-posts')} />
              <MyPageArtwork type="VISUAL" text="락" />
              <MyPageArtwork type="MUSIC" text="AJR" />
              <MyPageArtwork type="WRITING" text="SF 소설" />
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <CustomBottomDrawer
        options={MyPageOptions}
        cancel
        onClose={closeDrawer}
        isOpen={isDrawerOpen}
      />
    </div>
  );
};

const DUMMY =
  '제 작업은 아르누보 양식의 유려한 곡선, 식물적 모티브, 그리고 장식적인 디테일을 특징으로 합니다. 자연에서 영감을 받은 곡선미와 복잡한 패턴을 활용해 유기적이고 생동감 있는 디자인을 창조합니다.';

const DUMMY_DATA = [
  {
    id: 0,
    image: profileBackground,
  },
  {
    id: 1,
    image: profileBackground,
  },
  {
    id: 2,
    image: profileBackground,
  },
];

export default MyPage;
