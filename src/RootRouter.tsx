import { Route, Routes } from 'react-router-dom';
import OnBoarding from '@/pages/OnBoarding';
import SignIn from './pages/SignIn';

const RootRouter = () => {
  return (
    <Routes>
      <Route path="/on-boarding" element={<OnBoarding />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<div></div>} />
    </Routes>
  );
};

export default RootRouter;
