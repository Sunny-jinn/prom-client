import styled from '@emotion/styled';
import icon_ellipsis from '@/assets/img/ellipsis.png';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 18.62px;
`;

const Image = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 99px;
`;

const Nickname = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

const IconBox = styled.button`
  margin-left: auto;

  img {
    width: 25px;
    height: 25px;
  }
`;

type FollowUserCard = {
  profile: string;
  name: string;
  onClick?: () => void;
};

const FollowUserCard = ({ profile, name, onClick }: FollowUserCard) => {
  return (
    <Wrapper>
      <Image src={profile} alt="x" />
      <Nickname>{name}</Nickname>
      <IconBox onClick={onClick}>
        <img src={icon_ellipsis} alt="x" />
      </IconBox>
    </Wrapper>
  );
};

export default FollowUserCard;
