import styled from '@emotion/styled';
import icon_search from '@/assets/img/icon_search_square.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 14px;
  padding: 8px 13px;
  font-size: 14px;
  gap: 7px;
  background-color: #292929;
  border-radius: 15px;

  input {
    background: none;
  }
`;

type CustomSearchInput = React.InputHTMLAttributes<HTMLInputElement> & {
  // 여기에서 추가적인 커스텀 속성을 정의할 수 있습니다.
  customProp?: string;
};

const CustomSearchInput: React.FC<CustomSearchInput> = (props) => {
  return (
    <Wrapper>
      <img src={icon_search} alt="" />
      <input type="text" placeholder={props.placeholder} {...props} />
    </Wrapper>
  );
};

export default CustomSearchInput;
