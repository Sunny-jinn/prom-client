import { PuffLoader } from 'react-spinners';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Loading = () => {
  return (
    <Wrapper>
      <PuffLoader size={80} color={'#7bf7ff'} />
    </Wrapper>
  );
};
