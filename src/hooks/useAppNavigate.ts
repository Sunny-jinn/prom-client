import { useNavigate } from 'react-router-dom';
import { NavigateFunction } from 'react-router/dist/lib/hooks';

const useAppNavigate = () => {
  const navigate = useNavigate();
  const appNavigate: NavigateFunction = (to, options?) => {
    if (typeof to === 'number') {
      return navigate(to);
    }
    if (options) {
      return navigate(`/app/${to}`, options);
    }
    return navigate(`/app/${to}`);
  };
  return appNavigate;
};

export default useAppNavigate;
