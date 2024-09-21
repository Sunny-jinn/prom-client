import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import icon_search from '@/assets/img/icon_search_square.svg';
import icon_sort from '@/assets/img/icon_sort.png';
import icon_left_arrow from '@/assets/img/left_arrow.png';
import dummy_profile from '@/assets/img/profile_background.png';
import CustomSearchInput from '@/components/CustomSearchInput';
import FollowUserCard from '@/components/FollowUserCard';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import './FollowList.scss';

const FollowList = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const navigate = useNavigate();

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
        <Tabs isFitted variant={'unstyled'} onChange={(index) => setTabIndex(index)}>
          <TabList>
            <Tab p={'14px'}>
              <span className={`follow-list-title ${tabIndex === 0 && 'active'}`}>33 팔로워</span>
            </Tab>
            <Tab>
              <span className={`follow-list-title ${tabIndex === 1 && 'active'}`}>16 팔로잉</span>
            </Tab>
          </TabList>
          <TabIndicator height={'2px'} bg={'#7Bf7ff'} />
          <TabPanels>
            <TabPanel p={0}>
              <CustomSearchInput placeholder="검색" />
              <div className="follow-list-divider" />
              <div className="follow-list-subtitle">
                <span className="follow-list-subtitle-text">팔로워 리스트</span>
                <div className="follow-list-sort">
                  <img src={icon_sort} alt="sort" />
                  <span>최신순</span>
                </div>
              </div>
              <div className="follow-list-users">
                {DUMMY_USERS.map((item) => (
                  <FollowUserCard profile={item.profile} name={item.name} key={item.id} />
                ))}
              </div>
            </TabPanel>
            <TabPanel p={0}>
              <div className="follow-list-search-bar">
                <img src={icon_search} alt="" />
                <input type="text" placeholder="검색" />
              </div>
              <div className="follow-list-divider" />
              <div className="follow-list-subtitle">
                <span className="follow-list-subtitle-text">팔로잉 리스트</span>
                <div className="follow-list-sort">
                  <img src={icon_sort} alt="sort" />
                  <span>최신순</span>
                </div>
              </div>
              <div className="follow-list-users">
                {DUMMY_USERS.map((item) => (
                  <FollowUserCard profile={item.profile} name={item.name} key={item.id} />
                ))}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </SafeAreaLayout>
  );
};

const DUMMY_USERS = [
  {
    id: 0,
    profile: dummy_profile,
    name: 'OffTheMenu',
  },
  {
    id: 1,
    profile: dummy_profile,
    name: 'RYE',
  },
  {
    id: 2,
    profile: dummy_profile,
    name: '랜드오브피스',
  },
  {
    id: 3,
    profile: dummy_profile,
    name: '권나무',
  },
  {
    id: 4,
    profile: dummy_profile,
    name: 'Axl and Goldman',
  },
];

export default FollowList;
