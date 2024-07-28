import { Route, Routes } from 'react-router-dom';
import OnBoarding from '@/pages/OnBoarding';

const RootRouter = () => {
  return (
    <Routes>
      <Route path='/on-boarding' element={<OnBoarding />} />
      <Route path='/sign-in' element={<div></div>} />
      <Route path='/sign-up' element={<div></div>} />
    </Routes>
  );
};

export default RootRouter;
