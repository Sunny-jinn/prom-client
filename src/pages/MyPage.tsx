import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import edit_icon from '@/assets/img/edit.png';
import ellipsis from '@/assets/img/ellipsis.png';
import icon_bottom_arrow from '@/assets/img/icon_bottom_arrow.png';
import icon_up_arrow from '@/assets/img/icon_up_arrow.png';
import profileBackground from '@/assets/img/profile_background.png';
import tabbar_all from '@/assets/img/tabbar_all.png';
import tabbar_shorts from '@/assets/img/tabbar_shorts.png';
import CustomBottomDrawer from '@/components/CustomBottomDrawer';
import CustomBottomModal from '@/components/CustomBottomModal';
import MyPageArtwork from '@/components/MyPageArtwork';
import MyPageTag from '@/components/MyPageTag';
import { PageLayout } from '@/components/PageLayout';
import PostCard from '@/components/PostCard';
import './MyPage.scss';

const MyPage = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isMyPage, _] = useState<boolean>(false);
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const navigate = useNavigate();

  const { isOpen: isMyDrawerOpen, onOpen: openMyDrawer, onClose: closeMyDrawer } = useDisclosure();
  const { isOpen: isDrawerOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();
  const {
    isOpen: isCancelDrawerOpen,
    onOpen: openCancelDrawer,
    onClose: closeCancelDrawer,
  } = useDisclosure();

  const {
    isOpen: isBottomModalOpen,
    onOpen: openBottomModal,
    onClose: closeBottomModal,
  } = useDisclosure();

  const editClickHandler = () => {
    setIsEditMode(true);
    closeMyDrawer();
  };

  const hideClickHandler = () => {
    closeDrawer();
    openBottomModal();
  };

  const deleteClickHandler = () => {
    setIsEditMode(false);
    closeCancelDrawer();
  };

  const MyPageModalOptions = [
    {
      id: 0,
      text: '프로필 공유',
      onClick: () => console.log('최신순'),
    },
    {
      id: 1,
      text: '보관된 컨텐츠',
    },
    {
      id: 2,
      text: '계정 설정',
      onClick: editClickHandler,
    },
    {
      id: 3,
      text: '인사이트',
    },
  ];

  const NotMyPageModalOptions = [
    {
      id: 0,
      text: '관심없음',
      onClick: hideClickHandler,
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
    <PageLayout>
      <div id="MyPage">
        <div className={`my-page-header ${isEditMode && 'active'}`}>
          {isEditMode ? (
            <div onClick={openCancelDrawer}>
              <span className="my-page-header-cancel">취소</span>
            </div>
          ) : (
            <img style={{ visibility: 'hidden' }} src={ellipsis} alt="ellipsis" />
          )}
          <span className="my-page-header-text">마이페이지</span>
          {isEditMode ? (
            <div onClick={() => setIsEditMode(false)}>
              <span className="my-page-header-confirm">완료</span>
            </div>
          ) : (
            <img src={ellipsis} alt="ellipsis" onClick={isMyPage ? openMyDrawer : openDrawer} />
          )}
        </div>

        <div className="background-image">
          <div className="background-image-wrapper">
            <img src={profileBackground} alt="background" />
          </div>
          <div className="my-page-profile">
            <div className="my-page-profile-content">
              <div className="my-page-profile-icon">
                <img src={profileBackground} alt="" className="my-page-profile-image" />
              </div>
              <div className="my-page-profile-name">
                {isEditMode && <img src={edit_icon} alt="edit" />}
                <span className="my-page-nickname">김진우</span>
                {isEditMode && <img src={edit_icon} alt="edit" />}
              </div>
              <div className="my-page-profile-tags">
                {DUMMY_TAGS.slice(0, 2).map((tag, index) => (
                  <div
                    key={tag.id}
                    className={`my-page-profile-tag ${index === 0 ? 'main-tag' : ''}`}
                  >
                    {tag.text}
                  </div>
                ))}

                <div className="toggle-button" onClick={handleToggle}>
                  {showAll ? (
                    <img src={icon_up_arrow} alt="up" />
                  ) : (
                    <img src={icon_bottom_arrow} alt="up" />
                  )}
                </div>
              </div>

              {showAll && (
                <div className="my-page-profile-tags">
                  {DUMMY_TAGS.slice(2).map((tag) => (
                    <div key={tag.id} className="my-page-profile-tag">
                      {tag.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {!isEditMode && (
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
        )}

        <div className="my-page-intro">
          <div className="my-page-intro-title">
            <span>소개</span>
            {isEditMode && (
              <button>
                <img src={edit_icon} alt="edit" />
              </button>
            )}
          </div>
          <div className="my-page-intro-content">{DUMMY}</div>
        </div>

        {!isEditMode && (
          <>
            <div className="my-page-artworks">
              <MyPageArtwork text="자연" image={profileBackground} />
              <MyPageArtwork text="자동차" image={profileBackground} />
              <div className="my-page-artwork artwork-add" onClick={() => navigate('all-posts')}>
                +
              </div>
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
              </TabList>
              <TabIndicator height={'2px'} bg={'#7Bf7ff'} />
              <TabPanels>
                <TabPanel p={0}>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '12px', gap: '9px' }}>
                    {DUMMY_DATA.map((item) => (
                      <PostCard
                        id={item.id}
                        image={item.image}
                        onClick={() => navigate(`/app/post/${item.id}`)}
                      />
                    ))}
                  </Box>
                </TabPanel>
                <TabPanel>dd</TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )}
        {isEditMode && (
          <div className="my-page-update-tag-wrapper">
            <div className="my-page-update-main-tag">
              <span className="my-page-update-main-tag-text">메인 태그</span>
              <MyPageTag text={DUMMY_TAGS[0].text} main />
            </div>
            <div className="my-page-update-tag">
              <span className="my-page-update-main-tag-text">보조 태그</span>
              <div className="my-page-update-tag-list">
                {DUMMY_TAGS.slice(1).map((tag) => (
                  <MyPageTag key={tag.id} text={tag.text} />
                ))}
              </div>
            </div>
          </div>
        )}
        {isMyPage && (
          <CustomBottomDrawer
            options={MyPageModalOptions}
            cancel
            onClose={closeMyDrawer}
            isOpen={isMyDrawerOpen}
          />
        )}
        {!isMyPage && (
          <CustomBottomDrawer
            options={NotMyPageModalOptions}
            cancel
            onClose={closeDrawer}
            isOpen={isDrawerOpen}
          />
        )}

        <CustomBottomDrawer
          isDelete
          deleteTitle="변경 내용을 삭제하시겠습니까?"
          deleteContent="지금 돌아가면 변경 내용이 삭제됩니다."
          deleteConfirmText="변경 내용 삭제"
          cancel
          onClose={closeCancelDrawer}
          isOpen={isCancelDrawerOpen}
          onDelete={deleteClickHandler}
        />

        {/**
         * !TODO: 관심없음에 성공했을 시 홈 화면으로 이동
         */}
        <CustomBottomModal
          text="아티스트 관심없음"
          content="이와 비슷한 아티스트가 덜 표시됩니다."
          isOpen={isBottomModalOpen}
          onClose={closeBottomModal}
          icon="modal_eye_off"
        />
      </div>
    </PageLayout>
  );
};

const DUMMY =
  '제 작업은 아르누보 양식의 유려한 곡선, 식물적 모티브, 그리고 장식적인 디테일을 특징으로 합니다. 자연에서 영감을 받은 곡선미와 복잡한 패턴을 활용해 유기적이고 생동감 있는 디자인을 창조합니다.';

export const DUMMY_DATA = [
  {
    id: 0,
    image: profileBackground,
  },
  {
    id: 1,
    image: tabbar_shorts,
  },
  {
    id: 2,
    image: profileBackground,
  },
  {
    id: 3,
    image: profileBackground,
  },
  {
    id: 4,
    image: profileBackground,
  },
  {
    id: 5,
    image: profileBackground,
  },
  {
    id: 6,
    image: profileBackground,
  },
];

const DUMMY_TAGS = [
  {
    id: 0,
    text: '그래픽 아티스트',
  },
  {
    id: 1,
    text: '추상표현 주의',
  },
  {
    id: 2,
    text: '일러스트레이터',
  },
  {
    id: 3,
    text: '자유로운',
  },
  {
    id: 4,
    text: '아르누보',
  },
];

export default MyPage;
