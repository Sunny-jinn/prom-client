import { useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
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
import icon_setting from '@/assets/img/icon_setting.svg';
import icon_up_arrow from '@/assets/img/icon_up_arrow.png';
import tabbar_all from '@/assets/img/tabbar_all.png';
import tabbar_shorts from '@/assets/img/tabbar_shorts.png';
import CustomBottomDrawer from '@/components/CustomBottomDrawer';
import CustomTempModal from '@/components/CustomTempModal';
import MyPageArtwork from '@/components/MyPageArtwork';
import MyPageTag from '@/components/MyPageTag';
import NavigatorLayout from '@/components/NavigatorLayout';
import PostCard from '@/components/PostCard';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import {
  UserArtworksResponse,
  UserFeedsResponse,
  UserTagsResponse,
  getUserArtworks,
  getUserFeeds,
  getUserFollowers,
  getUserFollowings,
  getUserPicks,
  getUserTags,
} from '@/feature/api/mypage.api';
import { logoutAPI, updateUserInfoAPI } from '@/feature/api/user.api';
import { User } from '@/feature/types';
import { PostPick } from '@/feature/types/Post.type';
import followerStore from '@/store/Follow';
import userStore from '@/store/User';
import './MyPage.scss';

type FollowsType = {
  follower: number;
  following: number;
};

const MyPage = () => {
  const { user, removeUser } = userStore((state) => state);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isMyPage] = useState<boolean>(true);

  // const [userInfo, setUserInfo] = useState<User.User>(null);
  const [userTags, setUserTags] = useState<UserTagsResponse[]>([]);
  const [followNumber, setFollowNumber] = useState<FollowsType>({
    follower: 0,
    following: 0,
  });

  const [userFeeds, setUserFeeds] = useState<UserFeedsResponse[]>([]);
  const [userPicks, setUserPicks] = useState<PostPick[]>([]);
  const [userArtworks, setUserArtworks] = useState<UserArtworksResponse[]>([]);

  const [newNickname, setNewNickname] = useState<string>(user?.username ?? '');
  const [newDescription, setNewDescription] = useState<string | null>(user?.description ?? '');
  const [tempProfileImage, setTempProfileImage] = useState<string>(user?.profileImage ?? '');
  const [tempBackgroundImage, setTempBackgroundImage] = useState<string>(
    user?.backgroundImage ?? '',
  );
  const [tempTags, setTempTags] = useState<UserTagsResponse[]>(userTags ?? []);

  const { setFollower, setFollowing } = followerStore((state) => ({
    setFollower: state.setFollower,
    setFollowing: state.setFollowing,
  }));

  console.log(user);

  useEffect(() => {
    if (user) {
      const fetchUserInfo = async () => {
        // const user = await getMyInfoAPI();
        const tags = await getUserTags();
        const followerNumber = await getUserFollowers();
        const followingNumber = await getUserFollowings();
        const feeds = await getUserFeeds();
        const artworks = await getUserArtworks();
        const picks = await getUserPicks();

        setFollower(followerNumber);
        setFollowing(followingNumber);
        setFollowNumber({
          follower: followerNumber.length,
          following: followingNumber.length,
        });
        // setUserInfo(user);
        setUserTags(tags);
        setUserFeeds(feeds);
        setUserArtworks(artworks);
        // setNewNickname(user.username);
        // setNewDescription(user.description);
        setUserPicks(picks);
        setTempTags(tags);
        console.log(tags);
      };
      fetchUserInfo();
    }
  }, [user]);

  const profileRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleUpdateBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempBackgroundImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagUpdate = (tagId: number, newName: string) => {
    setTempTags((prevTags) =>
      prevTags.map((tag) => (tag.tagId === tagId ? { ...tag, name: newName } : tag)),
    );
  };

  const handleEditComplete = async () => {
    try {
      const formdata = new FormData();
      formdata.append('description', newDescription || '');
      formdata.append('profileImage', tempProfileImage);
      formdata.append('birthDate', '1999-01-01');
      formdata.append('phoneNumber', '112');
      formdata.append('nickname', newNickname || '');
      formdata.append('backgroundImage', tempProfileImage);
      formdata.append('role', 'ROLE_ARTTY');

      const data = await updateUserInfoAPI(formdata);
      console.log('업데이트 결과 : ', data);
      setIsEditMode(false);
    } catch {
      console.log('err');
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // destination이 없으면 이동이 취소된 것 (유효한 드롭 위치가 아닐 때)
    if (!destination) return;

    // source.index와 destination.index를 사용해 순서를 업데이트
    setTempTags((prevTags) => {
      const newTags = Array.from(prevTags);
      const [movedTag] = newTags.splice(source.index + 1, 1); // +1을 하는 이유는 userTags.slice(1)로 인해 0번째 요소를 제외했기 때문
      newTags.splice(destination.index + 1, 0, movedTag); // +1을 해야 userTags[1]부터 조정됨
      return newTags;
    });
  };

  const navigate = useNavigate();

  const { isOpen: isMyDrawerOpen, onOpen: openMyDrawer, onClose: closeMyDrawer } = useDisclosure();
  const {
    isOpen: isCancelDrawerOpen,
    onOpen: openCancelDrawer,
    onClose: closeCancelDrawer,
  } = useDisclosure();

  const {
    isOpen: isCenterModalOpen,
    onOpen: openCenterModal,
    onClose: closeCenterModal,
  } = useDisclosure();

  const editClickHandler = () => {
    setIsEditMode(true);
    closeMyDrawer();
  };

  const deleteClickHandler = () => {
    setIsEditMode(false);
    closeCancelDrawer();
  };

  const logoutClickHandler = () => {
    closeMyDrawer();
    openCenterModal();
  };

  const logout = async () => {
    try {
      await logoutAPI();
      removeUser();
      navigate('on-board');
    } catch (e) {
      console.log(e);
    }
    closeCenterModal();
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
    {
      id: 4,
      text: '로그아웃',
      delete: true,
      onClick: logoutClickHandler,
    },
  ];

  if (!user) return <></>;

  return (
    <NavigatorLayout hasScrollArea>
      <div>
        <div id="MyPage">
          <ProfileHeader
            isMyPage
            isEditMode={isEditMode}
            openCancelDrawer={openCancelDrawer}
            openProfileDrawer={openMyDrawer}
            onClick={handleEditComplete}
          />

          <ProfileImage
            isEditMode={isEditMode}
            user={user}
            handleBackground={handleUpdateBackground}
            profileRef={profileRef}
            newNickname={newNickname}
            userTags={userTags}
            tempProfileImage={tempProfileImage}
            setTempProfileImage={setTempProfileImage}
            tempBackgroundImage={tempBackgroundImage}
            setNewNickname={setNewNickname}
          />

          {!isEditMode && (
            <ProfileNumbers
              isMyPage
              postNumber={userFeeds.length}
              follower={followNumber.follower}
              following={followNumber.following}
            />
          )}

          <ProfileDescription
            isEditMode={isEditMode}
            newDescription={newDescription}
            textareaRef={textareaRef}
            setNewDescription={setNewDescription}
          />

          {!isEditMode && (
            <ProfilePosts userArtworks={userArtworks} userFeeds={userFeeds} userPicks={userPicks} />
          )}
          {isEditMode && (
            <div className="my-page-update-tag-wrapper">
              <div className="my-page-update-main-tag">
                <span className="my-page-update-main-tag-text">메인 태그</span>
                <MyPageTag
                  text={userTags.length === 0 ? '' : userTags[0].name}
                  main
                  onUpdateTag={(newText) => handleTagUpdate(0, newText)}
                />
              </div>
              <div className="my-page-update-tag">
                <span className="my-page-update-main-tag-text">보조 태그</span>

                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="tags">
                    {(provided) => (
                      <div
                        className="my-page-update-tag-list"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {[
                          ...tempTags.slice(1),
                          ...Array(Math.max(4 - userTags.length, 0)).fill(null),
                        ].map((tag, index) => (
                          <Draggable
                            key={tag?.tagId || `placeholder-${index}`}
                            draggableId={`${tag?.tagId || index}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <MyPageTag
                                  key={tag?.tagId || `placeholder-${index}`}
                                  text={tag?.name || ''}
                                  onUpdateTag={
                                    tag
                                      ? (newText) => handleTagUpdate(tag.tagId, newText)
                                      : () => console.log('hi')
                                  }
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
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

          <CustomTempModal
            isOpen={isCenterModalOpen}
            onClose={closeCenterModal}
            logout
            onClick={logout}
          />
        </div>
      </div>
    </NavigatorLayout>
  );
};

type TProfileHeader = {
  isMyPage?: boolean;
  isEditMode?: boolean;
  openCancelDrawer?: () => void;
  openProfileDrawer?: () => void;
  onClick?: () => void;
};

export const ProfileHeader = ({
  isMyPage = false,
  isEditMode = false,
  openCancelDrawer,
  openProfileDrawer,
  onClick,
}: TProfileHeader) => {
  return (
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
            {isMyPage && <span className="my-page-header-text">마이페이지</span>}
            {isEditMode ? (
              <div onClick={onClick}>
                <span className="my-page-header-confirm">완료</span>
              </div>
            ) : (
              <img src={ellipsis} alt="ellipsis" onClick={openProfileDrawer} />
            )}
          </div>
        </div>
      </SafeAreaLayout>
    </div>
  );
};

type TProfileImage = {
  isEditMode?: boolean;
  user: User.BaseUser;
  handleBackground?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  profileRef?: React.RefObject<HTMLInputElement>;
  handleUpdateProfile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newNickname?: string;
  userTags?: UserTagsResponse[];
  handleUpdateProfileClick?: () => void;
  tempProfileImage?: string;
  setTempProfileImage?: (image: string) => void;
  tempBackgroundImage?: string;
  setTempBackgroundImage?: () => void;
  setNewNickname?: (nickname: string) => void;
};

export const ProfileImage = ({
  isEditMode = false,
  user,
  handleBackground,
  profileRef,
  newNickname,
  userTags = [],
  tempProfileImage,
  setTempProfileImage,
  tempBackgroundImage,
  setNewNickname,
}: TProfileImage) => {
  const [showAll, setShowAll] = useState(false);

  const handleUpdateProfileClick = () => {
    if (profileRef?.current) {
      profileRef.current.click();
    }
  };

  const handleUpdateProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfileImage?.(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname?.(e.target.value);
  };

  return (
    <div className="background-image">
      <div className="background-image-wrapper">
        <input type="file" className="my-page-update-profile" onChange={handleBackground} />
        <img src={!isEditMode ? user.backgroundImage : tempBackgroundImage} alt="background" />
      </div>
      <div className="my-page-profile">
        <div className="my-page-profile-content">
          <div className="my-page-profile-icon">
            <img
              src={!isEditMode ? user.profileImage : tempProfileImage}
              alt=""
              className="my-page-profile-image"
            />
            <input
              ref={profileRef}
              type="file"
              className="my-page-update-profile"
              onChange={handleUpdateProfile}
            />
            {isEditMode && (
              <button className="my-page-edit-profile" onClick={handleUpdateProfileClick}>
                <img src={icon_setting} alt="x" />
              </button>
            )}
          </div>
          <div className="my-page-profile-name">
            {isEditMode && <img src={edit_icon} alt="edit" />}
            <input
              className="my-page-nickname"
              value={newNickname || ''}
              readOnly={!isEditMode}
              onChange={handleInputChange}
            />
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

            {userTags.length > 2 && (
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
              {userTags.slice(2).map((tag) => (
                <div key={tag.tagId} className="my-page-profile-tag">
                  {tag.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

type TProfileNumbers = {
  isMyPage?: boolean;
  postNumber: number;
  follower: number;
  following: number;
};

export const ProfileNumbers = ({
  isMyPage = false,
  postNumber,
  follower,
  following,
}: TProfileNumbers) => {
  const navigate = useNavigate();

  return (
    <div className="my-page-info-container">
      <div className="my-page-info">
        <span className="my-page-info-number">{postNumber}</span>
        <span className="my-page-info-text">작업</span>
      </div>
      <button
        className="my-page-info"
        onClick={isMyPage ? () => navigate('follow-list/follower') : undefined}
      >
        <span className="my-page-info-number">{follower}</span>
        <span className="my-page-info-text">팔로워</span>
      </button>
      <button
        className="my-page-info"
        onClick={isMyPage ? () => navigate('follow-list/follower') : undefined}
      >
        <span className="my-page-info-number">{following}</span>
        <span className="my-page-info-text">팔로잉</span>
      </button>
    </div>
  );
};

type TProfileDescription = {
  isEditMode?: boolean;
  newDescription: string | null;
  textareaRef?: React.RefObject<HTMLTextAreaElement>;
  setNewDescription?: (e: string) => void;
};

export const ProfileDescription = ({
  isEditMode = false,
  newDescription,
  textareaRef,
  setNewDescription,
}: TProfileDescription) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription?.(event.target.value);
  };

  useEffect(() => {
    const textarea = textareaRef?.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [newDescription]);

  return (
    <div className="my-page-intro">
      <div className="my-page-intro-title">
        <span>소개</span>
        {isEditMode && (
          <button>
            <img src={edit_icon} alt="edit" />
          </button>
        )}
      </div>
      <textarea
        ref={textareaRef}
        className={`my-page-intro-content ${!isEditMode ? 'readonly' : ''}`}
        value={newDescription || ''}
        readOnly={!isEditMode}
        onChange={handleChange}
      />
    </div>
  );
};

type TProfilePosts = {
  isMyPage?: boolean;
  userArtworks: UserArtworksResponse[];
  userFeeds: UserFeedsResponse[];
  userPicks: PostPick[];
};

export const ProfilePosts = ({
  isMyPage = true,
  userArtworks,
  userFeeds,
  userPicks,
}: TProfilePosts) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="my-page-artworks">
        {userArtworks.map((item) => (
          <MyPageArtwork
            key={item.id}
            text={item.name}
            image={item.imageUrl}
            onClick={() => navigate(`/app/artwork/${item.id}`)}
          />
        ))}
        {isMyPage && (
          <div className="my-page-artwork artwork-add" onClick={() => navigate('all-posts')}>
            +
          </div>
        )}
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
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '9px',
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
          <TabPanel p={0}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '9px',
                marginTop: '12px',
              }}
            >
              {userPicks.map((item) => (
                <MyPageArtwork all image={item.thumbnailUrl} />
              ))}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default MyPage;
