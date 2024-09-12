import { FunctionComponent, SVGProps } from 'react';
import Home from '@/assets/img/icon_nav_home.svg?react';
import Search from '@/assets/img/icon_nav_search.svg?react';
import Shorts from '@/assets/img/icon_nav_shorts.svg?react';
import MyPage from '@/assets/img/icon_nav_mypage.svg?react';

export type NavData = {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  label: string;
  root: string;
}

export const NAV_DATA: Record<string, Array<NavData>> = {
  left : [
    {
      icon : Home,
      label: '홈',
      root: 'home'
    },
    {
      icon : Search,
      label: '탐색',
      root: 'search'
    },
  ],
  right: [
    {
      icon : Shorts,
      label: '쇼츠',
      root: 'shorts'
    },
    {
      icon : MyPage,
      label: 'MY',
      root: 'my-page'
    },
  ],
};
