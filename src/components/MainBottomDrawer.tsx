import { Drawer, DrawerContent, DrawerOverlay, DrawerProps } from '@chakra-ui/react';
import './MainBottomDrawer.scss';

type MainBottomDrawerProps = DrawerProps;

const MainBottomDrawer = (props: MainBottomDrawerProps) => {
  const { onClose, isOpen, children } = props;
  return (
    <Drawer onClose={onClose} isOpen={isOpen} placement='bottom' size={'lg'}>
      <DrawerOverlay />
      <DrawerContent bgColor={'#292929'} className='main-bottom-drawer'>
        <div className='main-bottom-drawer-header'>
          <span className='holder' onClick={() => onClose()}/>
        </div>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default MainBottomDrawer;
