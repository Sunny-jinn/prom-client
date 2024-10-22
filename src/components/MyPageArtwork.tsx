import styled from '@emotion/styled';
import check_box from '@/assets/img/check_white.png';
import more from '@/assets/img/more.png';
import MUSIC from '@/assets/img/music.png';
import VISUAL from '@/assets/img/visual.png';
import WRITING from '@/assets/img/writing.png';

const images: { [key: string]: string } = {
  MUSIC,
  VISUAL,
  WRITING,
};

const Wrapper = styled.div`
  width: 100%;
  aspect-ratio: 1/1.7;
  position: relative;
  border-radius: 15px;
  flex-shrink: 0;
`;

const TopImage = styled.div<{ all: boolean }>`
  height: ${({ all }) => (all ? '100%' : 'calc(100% - 48px)')};
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

const SelectBox = styled.div<{ select: boolean }>`
  position: absolute;
  width: 24px;
  height: 24px;
  border: 1px solid #fff;
  border-radius: 12px;
  top: 8px;
  right: 8px;
  box-shadow: 0px 5px 2px 0px rgba(0, 0, 0, 0.4);
`;

type MyPageArtworkProp = {
  id?: number;
  image?: string;
  type?: 'MUSIC' | 'VISUAL' | 'WRITING';
  text?: string;
  all?: boolean;
  onClick?: () => void;
  isSelected?: boolean;
  select?: boolean;
};

const MyPageArtwork = ({
  id,
  image,
  type,
  text,
  all = false,
  onClick,
  select = false,
  isSelected = false,
}: MyPageArtworkProp) => {
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
      {select && (
        <SelectBox select={select}>{isSelected && <img src={check_box} alt="chk" />}</SelectBox>
      )}
    </Wrapper>
  );
};

export default MyPageArtwork;
