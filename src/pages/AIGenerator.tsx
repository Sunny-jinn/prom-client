import { Drawer, DrawerContent, DrawerOverlay, DrawerProps } from '@chakra-ui/react';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import '@/pages/AIGenerator.scss';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { POST_CATEGORY_DATA, PostCategoryData } from '@/constants/init.data';
import CustomHeader from '@/components/CustomHeader';
import StepProgress from '@/components/StepProgress';
import { AI_GENERATOR_DATA, AIGeneratorGridViewType } from '@/constants/AIGenerator.data';
import { ScrollArea } from '@/components/ScrollArea';
import Star from '@/assets/img/icon_star.svg?react';
import cn from 'classnames';

type AiGeneratorProps = Omit<DrawerProps, 'children'>

const AIGenerator = (props: AiGeneratorProps) => {
  const { isOpen, onClose } = props;
  const [category, setCategory] = useState<PostCategoryData | null>(null);

  const [step, setStep] = useState(0);
  const [prompt, setPrompt] = useState<Record<string, string> | null>(null);

  const onBack = () => {
    if(step === 0) {
      setCategory(null);
      onClose();
      return;
    }
    setStep(prev => prev - 1);
  };

  return (
    <Drawer onClose={onClose} isOpen={isOpen} placement='bottom' size={'full'}>
      <DrawerOverlay />
      <DrawerContent>
        <SafeAreaLayout flexDirection={'column'}>
          <div className='ai-generator'>
            <CustomHeader leftOnClick={onBack}>
              {step === 0 && <span>PROM AI</span>}
              {(step !== 0 && category) &&
                <StepProgress value={(step) / AI_GENERATOR_DATA[category.name].views.length} color={category.color} />
              }
            </CustomHeader>
            {step === 0 && <AIGeneratorInit setPrompt={setPrompt} setCategory={setCategory} setStep={setStep} />}
            {step !== 0 && <AIGeneratorMain step={step}
                                            setStep={setStep}
                                            category={category as PostCategoryData}
                                            prompt={prompt as Record<string, string>}
                                            setPrompt={setPrompt}
            />}
          </div>
        </SafeAreaLayout>
      </DrawerContent>
    </Drawer>
  );
};

export default AIGenerator;

const AIGeneratorInit = (
  {
    setStep,
    setPrompt,
    setCategory,
  }: {
    setStep: Dispatch<SetStateAction<number>>
    setCategory: Dispatch<SetStateAction<PostCategoryData | null>>
    setPrompt: Dispatch<SetStateAction<Record<string, string> | null>>
  }) => {

  const onSelectCategory = (category: PostCategoryData) => {
    setCategory(category);
    setPrompt(AI_GENERATOR_DATA[category.name].state);
    setStep(prev => prev + 1);
  };


  return (
    <div className='ai-generator-init'>
      <span className='ai-generator-init-title'>AI 아트워크 생성</span>
      <span className='ai-generator-init-description'>생성하고자 하는 카테고리를 선택해주세요.</span>
      <div className='ai-generator-init-category-wrapper'>
        {POST_CATEGORY_DATA.map(category => {
          const Icon = category.icon;
          return (
            <div className='ai-generator-init-category' onClick={() => onSelectCategory(category)}>
              <Icon width={30} height={30} />
              <div className='ai-generator-init-category-info'>
                <span className='ai-generator-init-category-name'
                      style={{ color: category.color }}>{category.name}</span>
                <span className='ai-generator-init-category-description'>{category.description}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

const AIGeneratorMain = (
  {
    step,
    setStep,
    category,
    prompt,
    setPrompt,
  }: {
    step: number;
    setStep: Dispatch<SetStateAction<number>>,
    category: PostCategoryData,
    prompt: Record<string, string>
    setPrompt: Dispatch<SetStateAction<Record<string, string> | null>>
  }) => {

  const onNext = () => {
    if(step !== AI_GENERATOR_DATA[category.name].views.length){
      setStep(prev => prev + 1);
      return;
    }
    console.log(111);
  }

  return (
    <div className='ai-generator-main'>
      <ScrollArea>
        <div className='ai-generator-main-header'>
          <span><span style={{ color: category.color }}>{category.name}</span>{' 생성'}</span>
          <Star fill={category.color} />
        </div>
        <div className='ai-generator-main-view'>
          {AI_GENERATOR_DATA[category.name].views[step - 1].type === 'GRID' &&
            <AIGeneratorGridView category={category}
                                 prompt={prompt}
                                 setPrompt={setPrompt}
                                 view={AI_GENERATOR_DATA[category.name].views[step - 1] as AIGeneratorGridViewType} />
          }
        </div>
      </ScrollArea>
      <button className='ai-generator-main-button' onClick={() => onNext()}>
        다음
      </button>
    </div>
  );
};

const AIGeneratorGridView = (
  {
    category,
    prompt,
    setPrompt,
    view,
  }: {
    category: PostCategoryData
    view: AIGeneratorGridViewType;
    prompt: Record<string, string>
    setPrompt: Dispatch<SetStateAction<Record<string, string> | null>>
  }) => {

  const selectPrompt = (value: string) => {
    setPrompt(prev => {
      return {
        ...prev,
        [view.key]: value
      }
    })
  }

  const selectedData = useMemo(() => {
    return view.data.find(el => el.value === prompt[view.key])
  }, [prompt, view])

  return (
    <div className='ai-generator-grid-view'>
      <div className='ai-generator-grid-view-header'>
        <span className='ai-generator-grid-view-label'>{view.label}</span>
        <span className='ai-generator-grid-view-header-comment'>중복 선택 불가</span>
      </div>
      <div className='ai-generator-grid-view-select' style={{ gridTemplateColumns: `repeat(${view.column}, 1fr)` }}>
        {view.data.map(data =>
          <div className={cn('ai-generator-grid-view-element', { selected: prompt[view.key] === data.value })}
               style={{ backgroundColor: prompt[view.key] === data.value ? category.color : '#212121'}}
               onClick={() => selectPrompt(data.value)}
          >
            <span>{data.label}</span>
          </div>,
        )}
      </div>
      {(selectedData && selectedData.description) &&
        <span className='ai-generator-grid-view-description'>{selectedData.description}</span>
      }
    </div>
  );
};
