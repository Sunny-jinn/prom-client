import { ReactNode, useMemo } from 'react';
import { ScrollArea } from '@/components/ScrollArea';
import { NAV_DATA, NavData } from '@/constants/nav.data';
import { Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import './NavigatorLayout.scss';

type NavigatorLayoutProps = {
  children: ReactNode
}
const NavigatorLayout = (props: NavigatorLayoutProps) => {
  const { children } = props;
  return (
    <div className='navigator-layout'>
      <div className='navigator-layout-content'>
        <ScrollArea>
          {children}
        </ScrollArea>
      </div>
      <div className='navigator-layout-bar'>
        <div className='menu-container'>
          {NAV_DATA.left.map(el => <Menu root={el.root} icon={el.icon} label={el.label} />)}
        </div>
        <button className='upload-content'>
          <Plus color={'#1B1B1B'} strokeLinecap={'square'} strokeWidth={3} />
        </button>
        <div className='menu-container'>
          {NAV_DATA.right.map(el => <Menu root={el.root} icon={el.icon} label={el.label} />)}
        </div>
      </div>
    </div>
  );
};

const Menu = ({ icon, label, root }: NavData) => {
  const location = useLocation();
  const Icon = icon;

  const isSelected = useMemo(() => {
    const rootPath = location.pathname.split('/')[2];
    return root === rootPath;
  }, [root, location]);

  return (
    <div className='menu'>
      <Icon fill={isSelected ? '#7bf7ff' : '#515151'} />
      <span className={cn('menu-label', { selected: isSelected })}>{label}</span>
    </div>
  );
};

export default NavigatorLayout;
