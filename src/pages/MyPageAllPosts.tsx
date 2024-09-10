import { useState } from 'react';
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
import inactive_all_posts_icon from '@/assets/img/all_post.png';
import active_all_posts_icon from '@/assets/img/all_posts.png';
import ellipsis from '@/assets/img/ellipsis.png';
import left_arrow from '@/assets/img/left_arrow.png';
import shorts_image from '@/assets/img/tabbar_shorts.png';
import CustomBottomDrawer from '@/components/CustomBottomDrawer';
import CustomBottomModal from '@/components/CustomBottomModal';
import CustomTempModal from '@/components/CustomTempModal';
import MyPageArtwork from '@/components/MyPageArtwork';
import './MyPageAllPosts.scss';

const MyPageAllPosts = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const navigate = useNavigate();

  const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const { isOpen: isDrawerOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();
  const {
    isOpen: isBottomModalOpen,
    onOpen: openBottomModal,
    onClose: closeBottomModal,
  } = useDisclosure();

  const clickHandler = () => {
    closeDrawer();
    openBottomModal();
  };

  const MyPageAllPostsOptions = [
    {
      id: 0,
      text: '컬렉션 추가',
      onClick: closeDrawer,
    },
  ];

  return (
    <div id="MyPageAllPosts">
      <div className="my-page-all-posts-header">
        <div className="my-page-all-posts-back-btn" onClick={() => navigate(-1)}>
          <img src={left_arrow} alt="" />
        </div>
        <div className="my-page-all-posts-user">
          <span>모든 게시물</span>
        </div>
        <div className="my-page-all-posts-ellipsis-btn" onClick={openDrawer}>
          <img src={ellipsis} alt="" />
        </div>
      </div>

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
              <MyPageArtwork all />
              <MyPageArtwork all />
              <MyPageArtwork all />
              <MyPageArtwork all />
            </div>
          </TabPanel>
          <TabPanel>
            <p>쇼츠</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <button onClick={openBottomModal}></button>

      <CustomBottomDrawer
        options={MyPageAllPostsOptions}
        cancel
        onClose={closeDrawer}
        isOpen={isDrawerOpen}
      />

      <CustomTempModal text="'락'에 추가되었습니다." isOpen={isModalOpen} onClose={closeModal} />
      <CustomBottomModal
        text="게시물이 보관함에 보관됨"
        isOpen={isBottomModalOpen}
        onClose={closeBottomModal}
      />
    </div>
  );
};

export default MyPageAllPosts;
