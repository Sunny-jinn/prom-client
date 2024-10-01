import { Drawer, DrawerContent, DrawerOverlay, DrawerProps } from '@chakra-ui/react';
import './MainBottomDrawer.scss';
import { useEffect, useState } from 'react';

type MainBottomDrawerProps = DrawerProps;

const MainBottomDrawer = (props: MainBottomDrawerProps) => {
  const { onClose, isOpen, children } = props;
  const [resizeHeight, setResizeHeight] = useState<number | string>('600px');

  // event listener 연결
  useEffect(() => {
    const resizeHandler = (event: Event) => {
      const height = window.innerHeight - (event.currentTarget as VisualViewport)?.height
      if(height === 0){
        setResizeHeight('350px')
        return;
      }
      setResizeHeight(`${height}px`)
    }
    visualViewport && visualViewport.addEventListener("resize", resizeHandler);

    return () => {
      visualViewport?.removeEventListener("resize", resizeHandler);
    }
  }, []);
  return (
    <Drawer onClose={onClose} isOpen={isOpen} placement='bottom' size={'lg'}>
      <DrawerOverlay />
      <DrawerContent height={resizeHeight} bgColor={'#292929'} className='main-bottom-drawer'>
        <div className='main-bottom-drawer-header'>
          <span className='holder' onClick={() => onClose()}/>
        </div>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default MainBottomDrawer;
