import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import cn from 'classnames';
import { Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ScrollArea';
import { NAV_DATA, NavData } from '@/constants/nav.data';
import Upload from '@/pages/Upload';
import './NavigatorLayout.scss';
import useAppNavigate from '@/hooks/useAppNavigate';
import AIGenerator from '@/pages/AIGenerator';
import UploadIcon from '@/assets/img/icon_upload_button.svg?react';
import StarIcon from '@/assets/img/icon_star.svg?react';
import useOuterClick from '@/hooks/useOutterClick';

type NavigatorLayoutProps = {
  children: ReactNode;
  hasScrollArea: boolean
};
const NavigatorLayout = (props: NavigatorLayoutProps) => {
  const { children, hasScrollArea } = props;
  const { isOpen: isUploadOpen, onOpen: uploadOpen, onClose: uploadClose } = useDisclosure();
  const { isOpen: isAIGeneratorOpen, onOpen: aiGeneratorOpen, onClose: aiGeneratorClose } = useDisclosure();
  const [isSelectMode, setIsSelectMode] = useState(false);

  const onCreateButtonClick = (func: () => void) => {
    setIsSelectMode(false);
    func();
  };

  return (
    <>
      {isUploadOpen && <Upload isOpen={isUploadOpen} onClose={uploadClose} />}
      {isAIGeneratorOpen && <AIGenerator isOpen={isAIGeneratorOpen} onClose={aiGeneratorClose} />}
      <div className='navigator-layout'>
        <div className='navigator-layout-content'>
          {isSelectMode &&
            <div className='select-mode-overlay' onClick={() => setIsSelectMode(false)}>
              <div className='select-mode-overlay-top-gradient' />
              <div className='select-mode-types'>
                <div className='select-mode-type upload-button'
                     onClick={() => onCreateButtonClick(uploadOpen)}>
                  <UploadIcon />
                  <span>게시글 업로드</span>
                </div>
                <div className='select-mode-type ai-button'
                     onClick={() => onCreateButtonClick(aiGeneratorOpen)}>
                  <StarIcon />
                  <span>AI 아트워크 생성</span>
                </div>
              </div>
            </div>
          }
          {hasScrollArea &&
            <ScrollArea>
              {children}
            </ScrollArea>
          }
          {!hasScrollArea && children}
        </div>
        <div className='navigator-layout-bar'>
          <div className='menu-container'>
            {NAV_DATA.left.map((el) => (
              <Menu root={el.root} icon={el.icon} label={el.label} />
            ))}
          </div>
          <button className='upload-content' onClick={() => setIsSelectMode(prev => !prev)}>
            <Plus transform={isSelectMode ? 'rotate(45)' : 'rotate(0)'} color={'#1B1B1B'} strokeLinecap={'square'}
                  strokeWidth={3} />
          </button>
          <div className='menu-container'>
            {NAV_DATA.right.map((el) => (
              <Menu root={el.root} icon={el.icon} label={el.label} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Menu = ({ icon, label, root }: NavData) => {
  const location = useLocation();
  const navigate = useAppNavigate();
  const Icon = icon;

  const isSelected = useMemo(() => {
    const rootPath = location.pathname.split('/')[2];
    return root === rootPath;
  }, [root, location]);

  return (
    <div
      className='menu'
      onClick={() => navigate(`${root}`)}
    >
      <Icon fill={isSelected ? '#7bf7ff' : '#515151'} />
      <span className={cn('menu-label', { selected: isSelected })}>{label}</span>
    </div>
  );
};

export default NavigatorLayout;
