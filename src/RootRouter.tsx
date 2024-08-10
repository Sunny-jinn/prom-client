import { Route, Routes } from 'react-router-dom';
import OnBoarding from '@/pages/OnBoarding';
import SignUp from './pages/SignUp';

const RootRouter = () => {
  return (
    <Routes>
      <Route path="/on-boarding" element={<OnBoarding />} />
      <Route path="/sign-in" element={<div></div>} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
};

export default RootRouter;
