import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
  Slider,
  SliderFilledTrack, SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import '@/pages/AIGenerator.scss';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { POST_CATEGORY_DATA, PostCategoryData } from '@/constants/init.data';
import CustomHeader from '@/components/CustomHeader';
import StepProgress from '@/components/StepProgress';
import {
  AI_GENERATOR_DATA, AIGeneratorCustomViewType,
  AIGeneratorData,
  AIGeneratorGridViewType, isCustomView,
} from '@/constants/AIGenerator.data';
import { ScrollArea } from '@/components/ScrollArea';
import Star from '@/assets/img/icon_star.svg?react';
import cn from 'classnames';
import { Post } from '@/feature/types';

type AiGeneratorProps = Omit<DrawerProps, 'children'>

const AIGenerator = (props: AiGeneratorProps) => {
  const { isOpen, onClose } = props;
  const [category, setCategory] = useState<PostCategoryData | null>(null);

  const [step, setStep] = useState(0);
  const [prompt, setPrompt] = useState<Record<string, string> | null>(null);

  const viewData = useMemo(() => AI_GENERATOR_DATA({
    MUSIC_CUSTOM_TEMPO_AND_ENERGY: <AIMusicTempoAndEnergyPrompt category={category as PostCategoryData}
                                                                prompt={prompt as Record<string, string>}
                                                                setPrompt={setPrompt} />,
    VISUAL_CUSTOM_SIZE_RATIO     : <AIVisualSizeRatioPrompt category={category as PostCategoryData}
                                                            prompt={prompt as Record<string, string>}
                                                            setPrompt={setPrompt} />,
  }), [category, prompt, setPrompt]);

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
                <StepProgress value={(step) / (viewData[category.name].views.length + 1)} color={category.color} />
              }
            </CustomHeader>
            {step === 0 &&
              <AIGeneratorInit viewData={viewData} setPrompt={setPrompt} setCategory={setCategory} setStep={setStep} />}
            {step !== 0 && <AIGeneratorMain viewData={viewData}
                                            step={step}
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
    viewData,
  }: {
    setStep: Dispatch<SetStateAction<number>>
    setCategory: Dispatch<SetStateAction<PostCategoryData | null>>
    setPrompt: Dispatch<SetStateAction<Record<string, string> | null>>,
    viewData: Record<Post.PostCategory, AIGeneratorData>
  }) => {

  const onSelectCategory = (category: PostCategoryData) => {
    setCategory(category);
    setPrompt(viewData[category.name].state);
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
    viewData,
  }: {
    step: number;
    setStep: Dispatch<SetStateAction<number>>,
    category: PostCategoryData,
    prompt: Record<string, string>
    setPrompt: Dispatch<SetStateAction<Record<string, string> | null>>
    viewData: Record<Post.PostCategory, AIGeneratorData>

  }) => {

  const onNext = () => {
    if(step !== viewData[category.name].views.length + 1) {
      setStep(prev => prev + 1);
      return;
    }
  };

  console.log(step);
  console.log(viewData[category.name].views.length);

  const viewRenderer = useMemo(() => {
    if(step === viewData[category.name].views.length + 1){
      return <>Last</>
    }
    if(isCustomView(viewData[category.name].views[step - 1])) {
      const { view } = viewData[category.name].views[step - 1] as AIGeneratorCustomViewType;
      return view;
    }
    return <AIGeneratorGridView category={category}
                                prompt={prompt}
                                setPrompt={setPrompt}
                                view={viewData[category.name].views[step - 1] as AIGeneratorGridViewType} />;
  }, [setPrompt, viewData, category, step, prompt]);

  return (
    <div className='ai-generator-main'>
      <ScrollArea>
        <div className='ai-generator-main-header'>
          <span><span style={{ color: category.color }}>{category.name}</span>{' 생성'}</span>
          <Star fill={category.color} />
        </div>
        <div className='ai-generator-main-view'>
          {viewRenderer}
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
        [view.key]: value,
      };
    });
  };

  const selectedData = useMemo(() => {
    return view.data.find(el => el.value === prompt[view.key]);
  }, [prompt, view]);

  return (
    <div className='ai-generator-grid-view'>
      <div className='ai-generator-view-header'>
        <span className='ai-generator-view-label'>{view.label}</span>
        <span className='ai-generator-view-header-comment'>중복 선택 불가</span>
      </div>
      <div className='ai-generator-grid-view-select' style={{ gridTemplateColumns: `repeat(${view.column}, 1fr)` }}>
        {view.data.map(data =>
          <div className={cn('ai-generator-grid-view-element', { selected: prompt[view.key] === data.value })}
               style={{ backgroundColor: prompt[view.key] === data.value ? category.color : '#212121' }}
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

const AIMusicTempoAndEnergyPrompt = (
  {
    category,
    prompt,
    setPrompt,
  }: {
    category: PostCategoryData
    prompt: Record<string, string>
    setPrompt: Dispatch<SetStateAction<Record<string, string> | null>>
  }) => {
  const [tempoSliderValue, setTempoSliderValue] = useState(0);
  const [energySliderValue, setEnergySliderValue] = useState(0);

  console.log(category);

  const viewData = useMemo(() => [
    {
      label         : '템포',
      sliderValue   : tempoSliderValue,
      setSliderValue: setTempoSliderValue,
      key           : 'tempo',
      data          : [
        { label: '느린', value: 'LOW', description: '차분하고 여유로운 리듬으로 감성적인 분위기를 연출합니다.\n감정 표현이 중요할 때 선택하세요.' },
        { label: '', value: 'MODERATE_LOW' },
        { label: '중간', value: 'MIDDLE', description: '편안하고 자연스러운 속도로 다양한 스타일에 어울립니다.\n균형 잡힌 리듬을 원할 때 적합합니다' },
        { label: '', value: 'MODERATE_HIGH' },
        { label: '빠른', value: 'HIGH', description: '활기차고 에너지가 넘치는 곡을 만들고 싶을 때 선택하세요.\n빠른 속도로 강렬한 느낌을 줍니다.' },
      ],
    },
    {
      label         : '에너지',
      sliderValue   : energySliderValue,
      setSliderValue: setEnergySliderValue,
      key           : 'energy',
      data          : [
        { label: '약한', value: 'LOW', description: '부드럽고 차분한 분위기를 조성하는 에너지입니다. 여유롭고 편안한 곡에 잘 어울립니다.' },
        { label: '', value: 'MODERATE_LOW' },
        { label: '중간', value: 'MIDDLE', description: '밸런스를 이루는 에너지로, 다양한 장르에 적합하며 적당한 힘과 활기를 더해줍니다.' },
        { label: '', value: 'MODERATE_HIGH' },
        { label: '강한', value: 'HIGH', description: '강렬하고 파워풀한 느낌을 주는 에너지입니다. 역동적이고 에너지가 넘치는 곡을 만드는데 이상적입니다.' },
      ],
    },
  ], [tempoSliderValue, energySliderValue]);

  useEffect(() => {
    setPrompt(prev => {
      return {
        ...prev,
        tempo: viewData[0].data[tempoSliderValue].value,
      };
    });
  }, [viewData, tempoSliderValue]);

  useEffect(() => {
    setPrompt(prev => {
      return {
        ...prev,
        energy: viewData[1].data[energySliderValue].value,
      };
    });
  }, [viewData, energySliderValue]);

  console.log(prompt);

  return (
    <div className='ai-music-tempo-and-energy'>
      {viewData.map(data =>
        <div className='ai-music-custom-wrapper'>
          <div className='ai-generator-view-header'>
            <span className='ai-generator-view-label'>{data.label}</span>
          </div>
          <div className='ai-music-custom-slider-wrapper'>
            <div className='ai-music-custom-slider-labels'>
              {data.data.map((el, index) =>
                <div className='ai-music-custom-slider-label-wrapper'>
                  <span className={cn('ai-music-custom-slider-label', {selected: index === data.sliderValue})}>{el.label}</span>
                  <span className={cn('ai-music-custom-slider-label-dot', {selected: index === data.sliderValue})}/>
                </div>,
              )}
            </div>
            <MusicPromptSlider value={data.sliderValue} setValue={data.setSliderValue} />
            <div className='ai-music-custom-description'>
              {data.data[data.sliderValue].description && <span>{data.data[data.sliderValue].description}</span>}
            </div>
          </div>
        </div>,
      )}
    </div>
  );
};

const MusicPromptSlider = ({ value, setValue }: { value: number, setValue: Dispatch<SetStateAction<number>> }) => {

  const sliderFilledTrackStyle = useMemo(() => {
    if(value === 0) return `calc(${25 * value}% + 28px)`;
    if(value === 1) return `calc(${25 * value}% + 21px)`;
    if(value === 3) return `calc(${25 * value}% + 7px)`;
    return `calc(${25 * value}% + 14px)`;
  }, [value]);

  return (
    <Slider sx={{height: '26px !important', padding: '0 !important'}} value={value} onChange={e => setValue(e)} defaultValue={value} min={0} max={4} step={1}>
      <SliderTrack borderRadius={'50px'} height={'26px'} bg='#212121'>
        <SliderFilledTrack sx={{
          height: 26,
          borderRadius   : '50px',
          backgroundColor: '#FF7193',
          width          : `${sliderFilledTrackStyle} !important`,
        }} borderRadius={'50px'} bg='#FF7193' />
      </SliderTrack>
      <SliderThumb sx={{
        left  : `calc(${25 * value}% + ${5 + ((-7) * value)}px) !important`,
        width : 18,
        height: 18,
      }} />
    </Slider>
  );
};

const AIVisualSizeRatioPrompt = (
  {
    category,
    prompt,
    setPrompt,
  }: {
    category: PostCategoryData
    prompt: Record<string, string>
    setPrompt: Dispatch<SetStateAction<Record<string, string> | null>>
  }) => {
  console.log(category);
  console.log(prompt);
  console.log(setPrompt);
  return (
    <div>
      AIMusicTempoAndEnergyPrompt
    </div>
  );
};
