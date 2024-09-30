import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import MyPageArtwork from '@/components/MyPageArtwork';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import { ArtworkResponse, deleteArtwork, getArtworkDetail } from '@/feature/api/artworks.api';
import './ArtworkDetailPage.scss';

const ArtworkDetailPage = () => {
  const [artwork, setArtwork] = useState<ArtworkResponse>();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const { artwork_id } = useParams();

  const navigate = useNavigate();

  const {
    isOpen: isBottomModalOpen,
    onOpen: openBottomModal,
    onClose: closeBottomModal,
  } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      if (artwork_id) {
        const result = await getArtworkDetail(artwork_id);
        setArtwork(result);
      }
    };
    fetchData();
  }, []);

  const handleDeleteClick = async () => {
    try {
      if (artwork_id) {
        await deleteArtwork(artwork_id);
        navigate(-1);
      }
    } catch {
      console.log('삭제 실패!');
    }
  };

  const ArtworkModalOptions = [
    {
      id: 0,
      text: '아트워크 삭제',
      onClick: handleDeleteClick,
      delete: true,
    },
  ];

  return (
    <SafeAreaLayout>
      <div id="ArtworkDetailPage">
        {artwork && (
          <>
            <div className="artwork-detail-header">
              <div className="artwork-detail-back-btn" onClick={() => navigate(-1)}>
                <img src={left_arrow} alt="" />
              </div>
              <div className="artwork-detail-user">
                <span>{artwork.name}</span>
              </div>
              <div className="artwork-detail-ellipsis-btn" onClick={openBottomModal}>
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
                    {artwork.feedImageList.map((item) => (
                      <MyPageArtwork all image={item.imageUrl} id={item.feedImageId} />
                    ))}
                  </div>
                </TabPanel>
                <TabPanel p={0}>
                  <div className="my-page-all-posts-content">
                    {artwork.shortFormList.map((item) => (
                      <MyPageArtwork all image={item.thumbnailUrl} id={item.shortFormId} />
                    ))}
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )}

        <CustomBottomDrawer
          options={ArtworkModalOptions}
          cancel
          onClose={closeBottomModal}
          isOpen={isBottomModalOpen}
        />
      </div>
    </SafeAreaLayout>
  );
};

export default ArtworkDetailPage;
