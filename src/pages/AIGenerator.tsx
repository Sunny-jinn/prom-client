import { Drawer, DrawerContent, DrawerOverlay, DrawerProps } from '@chakra-ui/react';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import '@/pages/AIGenerator.scss';
import { useState } from 'react';
import { Post } from '@/feature/types';

type AiGeneratorProps = Omit<DrawerProps, 'children'>

const AIGenerator = (props: AiGeneratorProps) => {
  const { isOpen, onClose } = props;
  const [category, setCategory] = useState<Post.PostCategory | null>(null)

  const [step, setStep] = useState(0)


  return (
    <Drawer onClose={onClose} isOpen={isOpen} placement='bottom' size={'full'}>
      <DrawerOverlay />
      <DrawerContent>
        <SafeAreaLayout flexDirection={'column'}>
          <div className='ai-generator'>

          </div>
        </SafeAreaLayout>
      </DrawerContent>
    </Drawer>
  );
};

export default AIGenerator;
