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
import default_background from '@/assets/img/default_background.png';
import edit_icon from '@/assets/img/edit.png';
import ellipsis from '@/assets/img/ellipsis.png';
import icon_bottom_arrow from '@/assets/img/icon_bottom_arrow.png';
import icon_change_background from '@/assets/img/icon_change_background.svg';
import icon_setting from '@/assets/img/icon_setting.svg';
import icon_up_arrow from '@/assets/img/icon_up_arrow.png';
import tabbar_all from '@/assets/img/tabbar_all.png';
import tabbar_shorts from '@/assets/img/tabbar_shorts.png';
import CustomBottomDrawer from '@/components/CustomBottomDrawer';
import CustomTempModal from '@/components/CustomTempModal';
import { Loading } from '@/components/Loading';
import MyPageArtwork from '@/components/MyPageArtwork';
import MyPageTag from '@/components/MyPageTag';
import NavigatorLayout from '@/components/NavigatorLayout';
import PostCard from '@/components/PostCard';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import {
  UserArtworksResponse,
  UserFeedsResponse,
  UserTagsResponse,
  createUserTags,
  deleteUserTags,
  getUserArtworks,
  getUserFeeds,
  getUserFollowers,
  getUserFollowings,
  getUserPicks,
  getUserTags,
  updateUserTags,
} from '@/feature/api/mypage.api';
import { getUserInfoAPI, logoutAPI, updateUserInfoAPI } from '@/feature/api/user.api';
import { User } from '@/feature/types';
import { PostPick } from '@/feature/types/Post.type';
import followerStore from '@/store/Follow';
import userStore from '@/store/User';
import './MyPage.scss';

export type FollowsType = {
  follower: number;
  following: number;
};

const MyPage = () => {
  const { user, setUser, removeUser } = userStore((state) => state);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isMyPage] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
  const [tempBackgroundImage, setTempBackgroundImage] = useState<File | string>(
    user?.backgroundImage ?? default_background,
  );
  const [tempTags, setTempTags] = useState<UserTagsResponse[]>(userTags ?? []);

  const { setFollower, setFollowing } = followerStore((state) => ({
    setFollower: state.setFollower,
    setFollowing: state.setFollowing,
  }));

  const fetchUserInfo = async () => {
    const tags = await getUserTags();
    const followerNumber = await getUserFollowers();
    const followingNumber = await getUserFollowings();
    const feeds = await getUserFeeds();
    const artworks = await getUserArtworks();
    const picks = await getUserPicks();
    const userInfo = await getUserInfoAPI(user!.id);

    setFollower(followerNumber);
    setFollowing(followingNumber);
    setFollowNumber({
      follower: followerNumber.length,
      following: followingNumber.length,
    });
    setUser(userInfo);

    setUserTags(tags);
    setUserFeeds(feeds);
    setUserArtworks(artworks);

    setUserPicks(picks);
    setTempTags(tags);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchUserInfo();
    }
  }, []);

  useEffect(() => {
    const initializeTags = [...userTags].map((tag, index) => ({
      ...tag,
      idx: index + 2,
    }));

    const lastTagId = userTags.length > 0 ? userTags[userTags.length - 1].tagId : 0;

    if (initializeTags.length < 5 && lastTagId) {
      const additionalTags = Array(5 - initializeTags.length)
        .fill(null)
        .map((_, index) => ({
          tagId: lastTagId + index + 1,
          tagName: '',
          isMain: false,
          idx: initializeTags.length + index + 2,
        }));
      initializeTags.push(...additionalTags);
    }

    setTempTags(initializeTags);
  }, [userTags]);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    setTempTags((prevTags) => {
      const nonMainTags = prevTags.slice(1);

      const tagNames = nonMainTags.map((tag) => tag.tagName);
      const idxValues = nonMainTags.map((tag) => tag.idx);

      const [movedTagName] = tagNames.splice(source.index, 1);
      const [movedIdx] = idxValues.splice(source.index, 1);

      tagNames.splice(destination.index, 0, movedTagName);
      idxValues.splice(destination.index, 0, movedIdx);

      const updatedNonMainTags = nonMainTags.map((tag, index) => ({
        ...tag,
        tagName: tagNames[index],
        idx: idxValues[index],
      }));

      return [prevTags[0], ...updatedNonMainTags];
    });
  };

  const profileRef = useRef<HTMLInputElement>(null);
  const backgroundRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleUpdateBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTempBackgroundImage(file);
    }
  };

  const handleTagUpdate = (index: number, newText: string) => {
    setTempTags((prevTags) => {
      const updatedTags = [...prevTags];
      updatedTags[index] = { ...updatedTags[index], tagName: newText };
      return updatedTags;
    });
  };

  const handleEditComplete = async () => {
    try {
      const formdata = new FormData();
      formdata.append('description', newDescription || '');
      if (user?.profileImage !== tempProfileImage && profileRef && profileRef.current?.files) {
        formdata.append('profileImage', profileRef.current.files[0]);
      }
      formdata.append('birthDate', '1999-01-01');
      formdata.append('phoneNumber', '112');
      formdata.append('nickname', newNickname || '');
      if (
        user?.backgroundImage !== tempBackgroundImage &&
        backgroundRef &&
        backgroundRef.current?.files
      ) {
        formdata.append('backgroundImage', backgroundRef?.current.files[0]);
      }
      formdata.append('role', 'ROLE_ARTTY');
      const data = await updateUserInfoAPI(formdata);
      console.log('업데이트 결과 : ', data);

      const newTags = tempTags
        .filter(
          (tag) => !userTags.some((userTag) => userTag.tagId === tag.tagId) && tag.tagName !== '',
        )
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ tagId, ...rest }) => rest);

      const emptyTagNames = tempTags.filter(
        (tag): tag is { tagId: number; tagName: string; isMain: boolean } =>
          userTags.some((userTag) => userTag.tagId === tag.tagId) && tag.tagName === '',
      );
      const tagIds = emptyTagNames.map((tag) => tag.tagId);

      const updateTags = tempTags.filter(
        (tag): tag is { tagId: number; tagName: string; isMain: boolean } =>
          userTags.some((userTag) => userTag.tagId === tag.tagId) && tag.tagName !== '',
      );

      if (tagIds.length > 0) {
        await deleteUserTags(tagIds);
      }

      if (updateTags.length > 0) {
        await updateUserTags(updateTags);
      }

      if (newTags.length > 0) {
        await createUserTags(newTags);
      }

      await fetchUserInfo();
      setIsEditMode(false);
    } catch {
      console.log('err');
    }
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

  if (!user || isLoading) return <Loading />;

  return (
    <NavigatorLayout hasScrollArea>
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
          backgroundRef={backgroundRef}
          newNickname={newNickname}
          userTags={userTags}
          tempProfileImage={tempProfileImage}
          setTempProfileImage={setTempProfileImage}
          setTempBackgroundImage={setTempBackgroundImage}
          tempBackgroundImage={tempBackgroundImage}
          setNewNickname={setNewNickname}
        />

        {!isEditMode && (
          <ProfileNumbers
            isMyPage
            postNumber={userFeeds.length + userPicks.length}
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
                key={0}
                text={tempTags[0]?.tagName || ''}
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
                      {tempTags.slice(1).map((tag, index) => {
                        console.log(tag.idx);
                        return (
                          <Draggable
                            key={`draggable-${tag.idx}`}
                            draggableId={`draggable-${tag.idx}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <MyPageTag
                                  text={tag?.tagName || ''}
                                  onUpdateTag={(newText) => handleTagUpdate(index + 1, newText)}
                                />
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
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
  backgroundRef?: React.RefObject<HTMLInputElement>;
  handleUpdateProfile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newNickname?: string;
  userTags?: UserTagsResponse[];
  handleUpdateProfileClick?: () => void;
  tempProfileImage?: string;
  setTempProfileImage?: (image: string) => void;
  setTempBackgroundImage?: (image: string) => void;
  tempBackgroundImage?: string | File;
  setNewNickname?: (nickname: string) => void;
};

export const ProfileImage = ({
  isEditMode = false,
  user,
  handleBackground,
  profileRef,
  backgroundRef,
  newNickname,
  userTags = [],
  tempProfileImage,
  setTempProfileImage,
  setTempBackgroundImage,
  tempBackgroundImage,
  setNewNickname,
}: TProfileImage) => {
  const [showAll, setShowAll] = useState(false);

  const handleUpdateProfileClick = () => {
    if (profileRef?.current) {
      profileRef.current.click();
    }
  };

  const handleUpdateBackgroundClick = () => {
    if (backgroundRef?.current) {
      backgroundRef.current.click();
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

  const handleUpdateBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempBackgroundImage?.(reader.result as string);
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
        <img
          src={
            !isEditMode
              ? user.backgroundImage || default_background
              : typeof tempBackgroundImage === 'string'
                ? tempBackgroundImage
                : tempBackgroundImage
                  ? URL.createObjectURL(tempBackgroundImage)
                  : default_background
          }
          alt="background"
        />
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

          <input
            ref={backgroundRef}
            type="file"
            className="change-background"
            onChange={handleUpdateBackground}
          />
          {isEditMode && (
            <button className="icon-change-background" onClick={handleUpdateBackgroundClick}>
              <img src={icon_change_background} alt="x" />
            </button>
          )}

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
                {tag.tagName}
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
                  {tag.tagName}
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
  isFollowing?: boolean;
  onClick?: () => void;
};

export const ProfileNumbers = ({
  isMyPage = false,
  postNumber,
  follower,
  following,
  isFollowing,
  onClick,
}: TProfileNumbers) => {
  const navigate = useNavigate();

  return (
    <div className="my-page-info-container">
      <div className="my-page-info flex-1">
        <span className="my-page-info-number">{postNumber}</span>
        <span className="my-page-info-text">작업</span>
      </div>
      <button
        className="my-page-info flex-1"
        onClick={isMyPage ? () => navigate('follow-list/follower') : undefined}
      >
        <span className="my-page-info-number">{follower}</span>
        <span className="my-page-info-text">팔로워</span>
      </button>
      {!isMyPage ? (
        <div className="my-page-info  flex-1">
          <button className="my-page-profile-follow-button" onClick={onClick}>
            <span>{isFollowing ? '팔로우 중' : '팔로우'}</span>
          </button>
        </div>
      ) : (
        <button
          className="my-page-info  flex-1"
          onClick={isMyPage ? () => navigate('follow-list/follower') : undefined}
        >
          <span className="my-page-info-number">{following}</span>
          <span className="my-page-info-text">팔로잉</span>
        </button>
      )}
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
  const [tabIndex, setTabIndex] = useState<number>(0);

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
        {Array.from({
          length: Math.max(0, isMyPage ? 2 - userArtworks.length : 3 - userArtworks.length),
        }).map((_, index) => (
          <div key={`placeholder-${index}`} className="my-page-artwork placeholder"></div>
        ))}
      </div>

      <Tabs isFitted variant={'unstyled'} onChange={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>
            <div className={`my-page-tabbar-icon ${tabIndex === 0 ? 'active' : 'inactive'}`}>
              <img src={tabbar_all} alt="tab" />
            </div>
          </Tab>
          <Tab>
            <div className={`my-page-tabbar-icon ${tabIndex === 1 && 'active'}`}>
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
                  key={item.feedId}
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
                <MyPageArtwork
                  all
                  image={item.thumbnailUrl}
                  key={item.thumbnailUrl}
                  onClick={() => navigate(`/app/pick?index=${item.shortFormId}`)}
                />
              ))}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default MyPage;
