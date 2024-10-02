import React, { useState } from 'react';
import styled from '@emotion/styled';
import delete_tag from '@/assets/img/delete_tag.png';
import hamburger from '@/assets/img/hamburger.png';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 24px;
    height: 24px;
  }
`;

const TagBox = styled.div<{ main: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 12px 15px;
  gap: 15px;
  border: ${({ main }) => (main ? '1px solid #7bf7ff;' : 'none')};
  border-radius: 15px;
  background-color: ${({ main }) => (main ? 'none' : '#353535')};

  img {
    width: 17px;
    height: 17px;
  }
`;

const TagText = styled.input<{ main: boolean }>`
  background: none;
  font-size: 13px;
  font-weight: 500;
  color: ${({ main }) => (main ? '#7bf7ff;' : '#fff')};
`;

type MyPageTagProps = {
  text?: string;
  main?: boolean;
  onUpdateTag: (newText: string) => void; // 새로운 텍스트가 변경될 때 호출되는 콜백
};

const MyPageTag = ({ text = '', main = false, onUpdateTag }: MyPageTagProps) => {
  const [inputValue, setInputValue] = useState(text);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onUpdateTag(e.target.value);
  };

  const handleDeleteClick = () => {
    setInputValue('');
    onUpdateTag('');
  };

  return (
    <Wrapper>
      <TagBox main={main}>
        <button onClick={handleDeleteClick}>
          <img src={delete_tag} alt="delete" />
        </button>
        <TagText
          main={main}
          value={inputValue}
          placeholder="내용을 입력하세요."
          onChange={handleInputChange} // 입력 변경 시 호출
        />
      </TagBox>
      {!main && <img src={hamburger} alt="hamburger" />}
    </Wrapper>
  );
};

export default MyPageTag;
