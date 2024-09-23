import styled from '@emotion/styled';
import more from '@/assets/img/more.png';
import MUSIC from '@/assets/img/music.png';
// import profileBackground from '@/assets/img/profile_background.png';
import VISUAL from '@/assets/img/visual.png';
import WRITING from '@/assets/img/writing.png';

const images: { [key: string]: string } = {
  MUSIC,
  VISUAL,
  WRITING,
};

const Wrapper = styled.div`
  width: 113px;
  border-radius: 15px;
`;

const TopImage = styled.div<{ all: boolean }>`
  height: ${({ all }) => (all ? '193px' : '145px')};
  position: relative;

  img:first-of-type {
    width: 100%;
    height: 100%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: ${({ all }) => (all ? '15px' : 0)};
    border-bottom-left-radius: ${({ all }) => (all ? '15px' : 0)};
    object-fit: cover;
  }
`;

const TypeImage = styled.img`
  position: absolute;
  width: 29px;
  height: 29px;
  left: 5px;
  top: 5px;
`;

const MoreIcon = styled.img`
  position: absolute;
  width: 14px;
  height: 14px;
  right: 11px;
  top: 11px;
`;

const BottomText = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 14px 0 17px 0;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: #292929;

  span {
    font-size: 14px;
  }
`;

type MyPageArtworkProp = {
  id?: number;
  image?: any;
  type?: 'MUSIC' | 'VISUAL' | 'WRITING';
  text?: string;
  all?: boolean;
  onClick?: () => void;
};

const MyPageArtwork = ({ id, image, type, text, all = false, onClick }: MyPageArtworkProp) => {
  return (
    <Wrapper onClick={onClick} key={id}>
      <TopImage all={all}>
        <img src={image} alt="artwork" />
        {!all && type && <TypeImage src={images[type]} alt="type" />}
        {!all && <MoreIcon src={more} alt="more" />}
      </TopImage>
      {!all && (
        <BottomText>
          <span>{text}</span>
        </BottomText>
      )}
    </Wrapper>
  );
};

export default MyPageArtwork;
