import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0 16px 27px 16px;
`;

const Profile = styled.img`
  width: 36px;
  height: 36px;
  border: 0.9px solid #fff;
  border-radius: 9099px;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
`;

const Nickname = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  line-height: 16.71px;
`;

const Content = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  line-height: 16.71px;
`;

const Artist = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #a6a6a6;
  line-height: 16.71px;
`;

const CommentDate = styled.span`
  margin-bottom: auto;
  margin-left: auto;
  font-size: 13px;
  font-weight: 500;
  line-height: 15.51px;
  color: #a6a6a6;
`;

type CommentProps = {
  profile: string;
  nickname: string;
  date?: string;
  content: string;
  isArtist?: boolean;
};

const Comment = ({ profile, nickname, date, content, isArtist }: CommentProps) => {
  return (
    <Wrapper>
      <Profile src={profile} alt="pro" />
      <CommentContainer>
        <Nickname>{nickname}</Nickname>
        <Content>{content}</Content>
        {isArtist && <Artist>작성자가 작성한 댓글</Artist>}
      </CommentContainer>
      <CommentDate>{date}</CommentDate>
    </Wrapper>
  );
};

export default Comment;
