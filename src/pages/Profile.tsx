import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Text, useDisclosure } from '@chakra-ui/react';
import CustomBottomDrawer from '@/components/CustomBottomDrawer';
import CustomBottomModal from '@/components/CustomBottomModal';
import MainBottomDrawer from '@/components/MainBottomDrawer';
import NavigatorLayout from '@/components/NavigatorLayout';
import ReportCard from '@/components/ReportCard';
import { UserArtworksResponse, UserFeedsResponse } from '@/feature/api/mypage.api';
import {
  getUserProfileAPI,
  getUserProfileArtworksAPI,
  getUserProfileFeedsAPI,
  getUserProfileFollowers,
  getUserProfileFollowings,
  getUserProfilePicksAPI,
} from '@/feature/api/profile.api';
import { checkFollowStatusAPI, followUserAPI, unFollowUserAPI } from '@/feature/api/user.api';
import { User } from '@/feature/types';
import { PostPick } from '@/feature/types/Post.type';
import {
  FollowsType,
  ProfileDescription,
  ProfileHeader,
  ProfileImage,
  ProfileNumbers,
  ProfilePosts,
} from './MyPage';

const Profile = () => {
  const { user_id } = useParams();

  const [userInfo, setUserInfo] = useState<User.BaseUser>();
  const [newNickname, setNewNickname] = useState<string>(userInfo?.username ?? '');
  const [userFeeds, setUserFeeds] = useState<UserFeedsResponse[]>([]);
  const [userPicks, setUserPicks] = useState<PostPick[]>([]);
  const [userArtworks, setUserArtworks] = useState<UserArtworksResponse[]>([]);
  const [followNumber, setFollowNumber] = useState<FollowsType>({
    follower: 0,
    following: 0,
  });
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const { isOpen: isDrawerOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();
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

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user_id) {
        const user = await getUserProfileAPI(user_id);
        const feeds = await getUserProfileFeedsAPI(user_id);
        const picks = await getUserProfilePicksAPI(user_id);
        const follower = await getUserProfileFollowers(user_id);
        const following = await getUserProfileFollowings(user_id);
        const artworks = await getUserProfileArtworksAPI(user_id);
        const followStatus = await checkFollowStatusAPI(Number(user_id));
        setUserInfo(user);
        setNewNickname(user.username);
        setUserFeeds(feeds);
        setUserPicks(picks);
        setFollowNumber({
          follower: follower.length,
          following: following.length,
        });
        setUserArtworks(artworks);
        setIsFollowing(followStatus);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const textarea = textareaRef?.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  const hideClickHandler = () => {
    closeDrawer();
    openBottomModal();
  };

  const blockClickHandler = () => {
    closeDrawer();
    openBlockModal();
  };

  const reportClickHandler = () => {
    closeDrawer();
    openReportModal();
  };

  const followHandler = async () => {
    try {
      isFollowing ? await unFollowUserAPI(Number(user_id)) : await followUserAPI(Number(user_id));
      setIsFollowing((isFollowing) => !isFollowing);
    } catch {
      console.log('팔로우 실패!');
    }
  };

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
    <NavigatorLayout hasScrollArea>
      {userInfo && (
        <div id="MyPage">
          <ProfileHeader openProfileDrawer={openDrawer} />
          <ProfileImage user={userInfo} newNickname={newNickname} />
          <ProfileNumbers
            postNumber={userFeeds.length + userPicks.length}
            follower={followNumber.follower}
            following={followNumber.following}
            onClick={followHandler}
            isFollowing={isFollowing}
          />
          <ProfileDescription textareaRef={textareaRef} newDescription={userInfo.description} />
          <ProfilePosts
            isMyPage={false}
            userArtworks={userArtworks}
            userFeeds={userFeeds}
            userPicks={userPicks}
          />
        </div>
      )}
      <CustomBottomDrawer
        options={NotMyPageModalOptions}
        cancel
        onClose={closeDrawer}
        isOpen={isDrawerOpen}
      />

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
              src={userInfo?.profileImage}
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
                {userInfo?.username}
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
    </NavigatorLayout>
  );
};

export default Profile;
