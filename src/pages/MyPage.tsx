import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Image,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
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
import MainBottomDrawer from '@/components/MainBottomDrawer';
import MyPageArtwork from '@/components/MyPageArtwork';
import MyPageTag from '@/components/MyPageTag';
import PostCard from '@/components/PostCard';
import ReportCard from '@/components/ReportCard';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import {
  UserArtworksResponse,
  UserFeedsResponse,
  UserTagsResponse,
  getUserArtworks,
  getUserFeeds, // getUserFollowers,
  // getUserFollowings,
  getUserTags,
} from '@/feature/api/mypage.api';
import { getMyInfoAPI } from '@/feature/api/user.api';
import './MyPage.scss';
import { User } from '@/feature/types';

const MyPage = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isMyPage] = useState<boolean>(true);
  const [showAll, setShowAll] = useState(false);

  const [userInfo, setUserInfo] = useState<User.User | null>(null);
  const [userTags, setUserTags] = useState<UserTagsResponse[]>([]);
  // const [followNumber, setFollowNumber] = useState({});
  const [userFeeds, setUserFeeds] = useState<UserFeedsResponse[]>([]);
  const [userArtworks, setUserArtworks] = useState<UserArtworksResponse[]>([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = await getMyInfoAPI();
      const tags = await getUserTags();
      // const followerNumber = await getUserFollowers();
      // const followingNumber = await getUserFollowings();
      const feeds = await getUserFeeds();
      const artworks = await getUserArtworks();

      // setFollowNumber({
      //   follower: followerNumber.length,
      //   following: followingNumber.length,
      // });
      setUserInfo(user);
      setUserTags(tags);
      setUserFeeds(feeds);
      setUserArtworks(artworks);
    };
    fetchUserInfo();
    console.log(userTags);
  }, []);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const handleTagUpdate = (tagId: number, newName: string) => {
    setUserTags((prevTags) =>
      prevTags.map((tag) => (tag.tagId === tagId ? { ...tag, name: newName } : tag)),
    );
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
  const {
    isOpen: isBlockModalOpen,
    onOpen: openBlockModal,
    onClose: closeBlockModal,
  } = useDisclosure();

  const {
    isOpen: isReportModalOpen,
    onOpen: openReportModal,
    onClose: closeReportModal,
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

  const blockClickHandler = () => {
    closeDrawer();
    openBlockModal();
  };

  const reportClickHandler = () => {
    closeDrawer();
    openReportModal();
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
      onClick: blockClickHandler,
    },
    {
      id: 2,
      text: '신고하기',
      delete: true,
      onClick: reportClickHandler,
    },
  ];

  return (
    <div>
      {userInfo && (
        <div id="MyPage">
          <div className="my-page-header-container">
            <SafeAreaLayout flexDirection="column" safeAreaBackground="rgba(0,0,0,0)">
              <div className="my-page-header-container">
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
                    <img
                      src={ellipsis}
                      alt="ellipsis"
                      onClick={isMyPage ? openMyDrawer : openDrawer}
                    />
                  )}
                </div>
              </div>
            </SafeAreaLayout>
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
                  <span className="my-page-nickname">{userInfo.username}</span>
                  {isEditMode && <img src={edit_icon} alt="edit" />}
                </div>
                <div className="my-page-profile-tags">
                  {userTags.slice(0, 2).map((tag, index) => (
                    <div
                      key={tag.tagId}
                      className={`my-page-profile-tag ${index === 0 ? 'main-tag' : ''}`}
                    >
                      {tag.name}
                    </div>
                  ))}

                  {userTags.length > 1 && (
                    <div className="toggle-button" onClick={handleToggle}>
                      {showAll ? (
                        <img src={icon_up_arrow} alt="up" />
                      ) : (
                        <img src={icon_bottom_arrow} alt="up" />
                      )}
                    </div>
                  )}
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
              <button className="my-page-info" onClick={() => navigate('follow-list/follower')}>
                {/* <span className="my-page-info-number">{followNumber.follower}</span> */}
                <span className="my-page-info-text">팔로워</span>
              </button>
              <button className="my-page-info" onClick={() => navigate('follow-list/following')}>
                {/* <span className="my-page-info-number">{followNumber.following}</span> */}
                <span className="my-page-info-text">팔로잉</span>
              </button>
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
            <div className="my-page-intro-content">{userInfo.description}</div>
          </div>

          {!isEditMode && (
            <>
              <div className="my-page-artworks">
                {userArtworks.map((item) => (
                  <MyPageArtwork key={item.id} text={item.name} image={item.imageUrl} />
                ))}
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
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)', // 3개의 열
                        gap: '9px', // 아이템 간의 간격
                        marginTop: '12px',
                      }}
                    >
                      {userFeeds.map((item) => (
                        <PostCard
                          id={item.feedId}
                          image={item.images[0]}
                          type={item.type}
                          onClick={() => navigate(`/app/post/${item.feedId}`)}
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
                <MyPageTag
                  text={userTags[0].name}
                  main
                  onUpdateTag={(newText) => handleTagUpdate(0, newText)}
                />
              </div>
              <div className="my-page-update-tag">
                <span className="my-page-update-main-tag-text">보조 태그</span>
                <div className="my-page-update-tag-list">
                  {userTags.length === 1 &&
                    [0, 1, 2, 3].map((item) => (
                      <MyPageTag key={item} onUpdateTag={() => console.log('hi')} />
                    ))}
                  {userTags.slice(1).map((tag) => (
                    <MyPageTag
                      key={tag.tagId}
                      text={tag.name}
                      onUpdateTag={(newText) => handleTagUpdate(tag.tagId, newText)}
                    />
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

          <MainBottomDrawer isOpen={isBlockModalOpen} onClose={closeBlockModal}>
            <Text sx={{ color: '#fff', textAlign: 'center', fontWeight: 600 }}>차단</Text>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '28px',
                padding: '0 16px',
                paddingBottom: '40px',
                height: '100%',
              }}
            >
              <Box sx={{ border: '1px solid #fff', borderRadius: '999px' }}>
                <Image
                  src={profileBackground}
                  alt="x"
                  sx={{ width: '74px', height: '74px', borderRadius: '999px' }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  marginTop: '19px',
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Text
                    sx={{
                      color: '#fff',
                      fontSize: '22px',
                      fontWeight: '600',
                      lineHeight: '26.25px',
                    }}
                  >
                    김진우
                  </Text>
                  <Text
                    sx={{
                      color: '#fff',
                      fontSize: '22px',
                      fontWeight: '600',
                      lineHeight: '26.25px',
                    }}
                  >
                    님을 차단하시겠습니까?
                  </Text>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Text
                    sx={{
                      fontSize: '14px',
                      color: '#a6a6a6',
                      whiteSpace: 'pre-line',
                      lineHeight: '16.71px',
                    }}
                  >
                    차단 시 해당 사용자의 활동이 귀하에게{`\n`}
                    표시되지 않으며, 상호작용이 제한됩니다.
                  </Text>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  background: '#ff6d6d',
                  marginTop: 'auto',
                  width: '100%',
                  padding: '16px 22px',
                  justifyContent: 'center',
                  borderRadius: '17px',
                }}
                onClick={closeBlockModal}
              >
                <Text sx={{ color: '#fff', fontSize: '14px', fontWeight: '600' }}>차단하기</Text>
              </Box>
            </Box>
          </MainBottomDrawer>
          <MainBottomDrawer isOpen={isReportModalOpen} onClose={closeReportModal}>
            <Text sx={{ color: '#fff', textAlign: 'center', fontWeight: 600 }}>신고</Text>
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
              <Box sx={{ display: 'flex', gap: '5px', flexDirection: 'column', marginTop: '32px' }}>
                <Text sx={{ fontWeight: '600', lineHeight: '19.09px', color: '#fff' }}>
                  무엇을 신고하시나요?
                </Text>
                <Text
                  sx={{
                    fontSize: '1ㅅ4px',
                    fontWeight: '400',
                    color: '#a6a6a6',
                    lineHeight: '16.71px',
                  }}
                >
                  커뮤니티의 안전과 질서를 위해 부적절한 행동을 신고해주세요.
                </Text>
              </Box>
              <Box sx={{ borderTop: '1px solid #5f5f5f', marginTop: '22px' }} />
              <Box sx={{ marginTop: '25px' }}>
                <ReportCard text="특정 게시물" />
                <ReportCard text="특정 댓글" />
                <ReportCard text="계정의 활동" />
              </Box>
            </Box>
          </MainBottomDrawer>
        </div>
      )}
    </div>
  );
};

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
