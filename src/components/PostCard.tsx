import styled from '@emotion/styled';
import check_box from '@/assets/img/check_white.png';

const PostContent = styled.div<{ isSelected: boolean }>`
  width: 113px;
  position: relative;

  img {
    width: 100%;
    border-radius: 10px;
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

export type PostCardProp = {
  id: number;
  image: any;
  isSelected?: boolean;
  onClick: () => void;
  select?: boolean;
};

const PostCard = ({ id, image, isSelected = false, onClick, select = false }: PostCardProp) => {
  return (
    <PostContent isSelected={isSelected} onClick={onClick} key={id}>
      <img src={image} alt="post" />
      {select && (
        <SelectBox select={select}>{isSelected && <img src={check_box} alt="chk" />}</SelectBox>
      )}
    </PostContent>
  );
};

export default PostCard;
