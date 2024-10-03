import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
// import icon_sort from '@/assets/img/icon_sort.png';
import icon_left_arrow from '@/assets/img/left_arrow.png';
import CustomSearchInput from '@/components/CustomSearchInput';
import FollowUserCard from '@/components/FollowUserCard';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import followerStore from '@/store/Follow';
import './FollowList.scss';

const FollowList = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const navigate = useNavigate();

  const { status } = useParams();

  useEffect(() => {
    status === 'follower' ? setTabIndex(0) : setTabIndex(1);
  }, []);

  const { follower, following } = followerStore((state) => ({
    follower: state.follower,
    following: state.following,
  }));

  console.log(follower, following);

  return (
    <SafeAreaLayout flexDirection="column">
      <div id="FollowList">
        <div className="follow-list-header">
          <button onClick={() => navigate(-1)}>
            <img src={icon_left_arrow} alt="left" />
          </button>
          <span>김진우</span>
          <button className="hidden" disabled>
            <img src={icon_left_arrow} alt="left" />
          </button>
        </div>
        <Tabs
          isFitted
          variant={'unstyled'}
          onChange={(index) => setTabIndex(index)}
          defaultIndex={status === 'follower' ? 0 : 1}
        >
          <TabList>
            <Tab p={'14px'}>
              <span className={`follow-list-title ${tabIndex === 0 && 'active'}`}>
                {follower.length} 팔로워
              </span>
            </Tab>
            <Tab>
              <span className={`follow-list-title ${tabIndex === 1 && 'active'}`}>
                {following.length} 팔로잉
              </span>
            </Tab>
          </TabList>
          <TabIndicator height={'2px'} bg={'#7Bf7ff'} />
          <TabPanels>
            <TabPanel p={'12px 0 0 0'}>
              <CustomSearchInput placeholder="검색" />
              <div className="follow-list-divider" />
              <div className="follow-list-subtitle">
                <span className="follow-list-subtitle-text">팔로워 리스트</span>
                {/* <div className="follow-list-sort">
                  <img src={icon_sort} alt="sort" />
                  <span>최신순</span>
                </div> */}
              </div>
              <div className="follow-list-users">
                {follower.map((item) => (
                  <FollowUserCard
                    profile={item.profileImageUrl}
                    name={item.nickname}
                    key={item.profileImageUrl}
                    onClick={() => navigate(`/app/profile/${item.id}`)}
                  />
                ))}
              </div>
            </TabPanel>
            <TabPanel p={'12px 0 0 0'}>
              <CustomSearchInput placeholder="검색" />

              <div className="follow-list-divider" />
              <div className="follow-list-subtitle">
                <span className="follow-list-subtitle-text">팔로잉 리스트</span>
                {/* <div className="follow-list-sort">
                  <img src={icon_sort} alt="sort" />
                  <span>최신순</span>
                </div> */}
              </div>
              <div className="follow-list-users">
                {following.map((item) => (
                  <FollowUserCard
                    profile={item.profileImageUrl}
                    name={item.nickname}
                    key={item.profileImageUrl}
                    onClick={() => navigate(`/app/profile/${item.id}`)}
                  />
                ))}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </SafeAreaLayout>
  );
};

export default FollowList;
