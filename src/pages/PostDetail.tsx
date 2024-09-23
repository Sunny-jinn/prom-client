import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import 'swiper/css';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import comment from '@/assets/img/comment.png';
import ellipsis from '@/assets/img/ellipsis.png';
import left_arrow from '@/assets/img/left_arrow.png';
import like from '@/assets/img/like.png';
import out from '@/assets/img/out.png';
import test_image from '@/assets/img/profile_background.png';
import bookmark from '@/assets/img/tabbar_bookmark.png';
import CustomBottomDrawer from '@/components/CustomBottomDrawer';
// import CustomBottomModal from '@/components/CustomBottomModal';
import './PostDetail.scss';

const PostDetail = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isClicked] = useState<boolean>(false);

  const navigate = useNavigate();

  const { isOpen: isDrawerOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();
  const {
    isOpen: isDeleteDrawerOpen,
    onOpen: openDeleteDrawer,
    onClose: closeDeleteDrawer,
  } = useDisclosure();
  const {
    // isOpen: isBottomModalOpen,
    onOpen: openBottomModal,
    // onClose: closeBottomModal,
  } = useDisclosure();
  const {
    // isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    // onClose: closeDeleteModal,
  } = useDisclosure();

  const clickHandler = () => {
    closeDrawer();
    openBottomModal();
  };

  const deleteClick = () => {
    closeDrawer();
    openDeleteDrawer();
  };

  const newDeleteClick = () => {
    closeDeleteDrawer();
    openDeleteModal();
  };

  const PostDetailModal = [
    {
      id: 0,
      text: '수정',
      onClick: () => console.log('최신순'),
      update: true,
    },
    {
      id: 1,
      text: '보관',
      onClick: clickHandler,
    },
    {
      id: 2,
      text: '삭제',
      onClick: deleteClick,
      delete: true,
    },
  ];

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveSlideIndex(swiper.activeIndex);
  };

  return (
    <div id="PostDetail">
      <div className="post-detail-header">
        <div className="post-detail-back-btn" onClick={() => navigate(-1)}>
          <img src={left_arrow} alt="" />
        </div>
        <div className="post-detail-user">
          <span className="post-detail-user-name">김진우 님의</span>
          <span>게시물</span>
        </div>
        <div className="post-detail-ellipsis-btn" onClick={openDrawer}>
          <img src={ellipsis} alt="" />
        </div>
      </div>
      <div className="post-detail-carousel">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          grabCursor={true}
          onSlideChange={handleSlideChange}
        >
          <SwiperSlide>
            <img src={test_image} alt="test" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={test_image} alt="test" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={test_image} alt="test" />
          </SwiperSlide>
        </Swiper>
        {/**!TODO: 사진 개수 반영 */}
        <div className="swiper-bullets">
          {[0, 1, 2].map((index) => (
            <div key={index} className={`bullet ${activeSlideIndex === index ? 'active' : ''}`} />
          ))}
        </div>
      </div>

      <div className="post-detail-menus">
        <div className={`post-detail-menu ${isClicked && 'clicked'}`}>
          <img src={like} alt="like" />
          <span>25</span>
        </div>
        <div className="post-detail-menu">
          <img src={comment} alt="comment" />
          <span>4</span>
        </div>
        <div className="post-detail-menu">
          <img src={out} alt="out" />
        </div>
        <div className="post-detail-menu right">
          <img src={bookmark} alt="out" />
        </div>
      </div>

      <div className="post-detail-author">
        <img src={test_image} alt="profile" />
        <span>김진우</span>
      </div>

      <div className="post-detail-intro">
        <div className="post-detail-intro-title">
          <span className="post-detail-intro-title-text">작품소개</span>
          <span className="post-detail-intro-title-date">8월 12일</span>
        </div>
        <div className="post-detail-intro-content">
          '자연의 소용돌이'는 아르누보 양식의 풍부한 장식성과 육시적인 곡선을 담아낸 작품으로,
          자연의 에너지를 역동적이고도 우아한 방식으로 표현하고 있습니다.
        </div>
      </div>

      <CustomBottomDrawer
        options={PostDetailModal}
        cancel
        onClose={closeDrawer}
        isOpen={isDrawerOpen}
      />

      <CustomBottomDrawer
        cancel
        onClose={closeDeleteDrawer}
        isOpen={isDeleteDrawerOpen}
        isDelete
        onDelete={newDeleteClick}
      />

      {/*<CustomBottomModal*/}
      {/*  text="게시물이 보관함에 보관됨"*/}
      {/*  icon="modal_check"*/}
      {/*  isOpen={isBottomModalOpen}*/}
      {/*  onClose={closeBottomModal}*/}
      {/*/>*/}

      {/*<CustomBottomModal*/}
      {/*  text="게시물 삭제됨"*/}
      {/*  icon="modal_delete"*/}
      {/*  isOpen={isDeleteModalOpen}*/}
      {/*  onClose={closeDeleteModal}*/}
      {/*/>*/}
    </div>
  );
};

export default PostDetail;
