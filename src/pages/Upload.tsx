import { DrawerProps, Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import { ChangeEvent, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import './Upload.scss';
import cn from 'classnames';
import Logo from '@/assets/img/img_logo.svg?react';
import FileIcon from '@/assets/img/icon_file.svg?react';
import toast from 'react-hot-toast';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { Plus } from 'lucide-react';
import useIsAble from '@/hooks/useIsAble';
import { ScrollArea } from '@/components/ScrollArea';
import Button from '@/components/atom/Button';
import { INIT_STEP_2 } from '@/constants/init.data';

type UploadProps = Omit<DrawerProps, 'children'>
type UploadType = 'FEED' | 'PICK'

const Upload = (
  {
    onClose,
    isOpen,
  }: UploadProps) => {

  const [uploadType, setUploadType] = useState<UploadType>('FEED');
  const [step, setStep] = useState(0);

  return (
    <Drawer onClose={onClose} isOpen={isOpen} placement='bottom' size={'full'}>
      <DrawerOverlay />
      <DrawerContent>
        <SafeAreaLayout flexDirection={'column'}>
          <div className='upload'>
            {uploadType === 'FEED' &&
              <UploadFeed step={step} setStep={setStep} uploadType={uploadType} onClose={onClose} />}
            {uploadType === 'PICK' &&
              <UploadPick step={step} setStep={setStep} uploadType={uploadType} onClose={onClose} />}
            {step === 0 &&
              <div className='upload-type'>
                <div className='switch'>
                  <div className={cn('switch-handler', { pick: uploadType === 'PICK' })} />
                  <div className='slider'>
                    <div className={cn('type', { selected: uploadType === 'FEED' })}
                         onClick={() => setUploadType('FEED')}>
                      <span>게시글</span>
                    </div>
                    <div className={cn('type', { selected: uploadType === 'PICK' })}
                         onClick={() => setUploadType('PICK')}>
                      <span>PICK</span>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </SafeAreaLayout>
      </DrawerContent>
    </Drawer>
  );
};

export default Upload;

type UploadHeaderProps = {
  title: string;
  leftValue: {
    text: string;
    onClick: () => void;
  }
  rightValue: {
    text: string;
    onClick?: () => void;
    isAble: boolean
  }
}

const UploadHeader = (props: UploadHeaderProps) => {
  const { title, leftValue, rightValue } = props;
  return (
    <div className='upload-header'>
      <span style={{ color: '#ffffff' }} onClick={() => leftValue.onClick()}>{leftValue.text}</span>
      <span style={{ color: '#ffffff', fontWeight: 600 }}>{title}</span>
      <button disabled={rightValue.isAble} onClick={() => rightValue.onClick ? rightValue.onClick() : undefined}>
        {rightValue.text}
      </button>
    </div>
  );
};

type UploadContentProps = Pick<UploadProps, 'onClose'> & {
  uploadType: UploadType
  step: number;
  setStep: Dispatch<SetStateAction<number>>
}

type ImageContent = {
  file: File,
  url: string;
}

const UploadFeed = ({ onClose, uploadType, step, setStep }: UploadContentProps) => {
  const [images, setImages] = useState<Array<ImageContent>>([]);
  const [indexedImages, setIndexedImages] = useState<Array<ImageContent>>([]);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement | null>(null);
  const handlerType = useRef<'GET' | 'ADD'>('GET');

  const onClickUpload = (type: 'GET' | 'ADD') => {
    if(!ref.current) return;
    handlerType.current = type;
    ref.current?.click();
  };

  const isAbleToNext = useIsAble([
    images.length !== 0,
    indexedImages.length !== 0,
  ]);

  const fileToURLObject = (file: File | Blob) => URL.createObjectURL(file);

  const onHandleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return;
    if(e.target.files.length > 10) {
      toast.error('최대 10장의 사진만 업로드 가능해요');
      return;
    }
    const fileArray = [...e.target.files].map(el => {
      return {
        file: el,
        url : fileToURLObject(el),
      };
    });
    if(handlerType.current === 'GET') {
      setIndexedImages(fileArray);
      setImages(fileArray);
      return;
    }
    setIndexedImages(prev => [...prev, ...fileArray]);
    setImages(prev => [...prev, ...fileArray]);
  };

  const onClickIndex = (el: ImageContent) => {
    if(indexedImages.find(img => img === el)) {
      setIndexedImages(prev => prev.filter(prv => prv !== el));
      return;
    }
    setIndexedImages(prev => prev.concat(el));
  };

  const close = () => {
    setImages([]);
    onClose();
  };

  const onUpload = async (title: string, description: string, type: string) => {
    console.log(title);
    console.log(description);
    console.log(type);
  };

  useEffect(() => {
    if(images.length !== 0) {
      setSelectedPreview(images[0].url);
    }
  }, [images]);

  return (
    <>
      {step === 0 &&
        <div className='upload-container'>
          <UploadHeader
            title={'새로운 게시물'}
            leftValue={{
              text   : '취소',
              onClick: () => close(),
            }}
            rightValue={{
              text   : '다음',
              isAble : !isAbleToNext,
              onClick: () => setStep(prev => prev + 1),
            }}
          />
          <div className='upload-content-viewer'>
            {images.length === 0 &&
              <div className='upload-content-preview'>
                <Logo width={218} height={56} color={'#ffffff'} />
              </div>
            }
            {selectedPreview &&
              <div className='selected-preview-wrapper'>
                <img src={selectedPreview} alt='' />
              </div>
            }
          </div>
          <div className='upload-content-selector-wrapper'>
            <div className='upload-content-selector-header'>
              <span>불러온 사진</span>
              {images.length !== 0 &&
                <span onClick={() => onClickUpload('GET')} style={{ color: '#B8B8B8' }}>다시 불러오기</span>}
            </div>
            <input maxLength={10} onChange={e => onHandleFile(e)} accept={'image/*'} type='file' multiple ref={ref} />
            <div className='upload-content-selector'>
              {images.length === 0 &&
                <div className='upload-content-selector-empty' onClick={() => onClickUpload('GET')}>
                  <FileIcon width={24} height={24} />
                  <span>터치해 사진 불러오기 <span style={{ color: '#A6A6A6' }}>(최대 10장)</span></span>
                </div>
              }
              {images.length !== 0 &&
                <>
                  <div className='feed-container'>
                    <Swiper
                      spaceBetween={10}
                      slidesPerView={'auto'}
                      freeMode={true}
                      modules={[FreeMode]}
                      className='feed-swiper'
                    >
                      {images.map((el) => (
                        <SwiperSlide className={'feed-swiper-slide'}>
                          {selectedPreview === el.url && <div className='blur' />}
                          <div className='index' onClick={() => onClickIndex(el)}>
                            {indexedImages.indexOf(el) !== -1 &&
                              <div className='selected-index'>
                                <span>{indexedImages.indexOf(el) + 1}</span>
                              </div>
                            }
                          </div>
                          <img onClick={() => setSelectedPreview(el.url)} src={el.url} alt='preview' />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <button onClick={() => onClickUpload('ADD')}>
                    <Plus width={14} height={14} color={'#7bf7ff'} strokeLinecap={'square'} strokeWidth={2} />
                    사진 추가하기
                  </button>
                </>
              }
            </div>
          </div>
        </div>
      }
      {step === 1 &&
        <UploadFinalize uploadType={uploadType} setStep={setStep} onUpload={onUpload}>
          <Swiper
            spaceBetween={10}
            slidesPerView={'auto'}
            freeMode={true}
            modules={[FreeMode]}
            className='upload-finalize-feed-swiper'
          >
            {indexedImages.map((el) => (
              <SwiperSlide className={'upload-finalize-feed-swiper-slide'}>
                <img src={el.url} alt='preview' />
              </SwiperSlide>
            ))}
          </Swiper>
        </UploadFinalize>
      }
    </>
  );
};

const UploadPick = ({ onClose, uploadType, step, setStep }: UploadContentProps) => {
  const [pick, setPick] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement | null>(null);

  const isAbleToNext = useIsAble([
    Boolean(pick),
  ]);

  const onClickUpload = () => {
    if(!ref.current) return;
    ref.current?.click();
  };

  const close = () => {
    setPick(null);
    onClose();
  };

  const onUpload = async (title: string, description: string, type: string) => {
    console.log(title);
    console.log(description);
    console.log(type);
  };

  return (
    <>
      {step === 0 &&
        <div className='upload-container'>
          <UploadHeader
            title={'새로운 게시물'}
            leftValue={{
              text   : '취소',
              onClick: () => close(),
            }}
            rightValue={{
              text   : '다음',
              isAble : !isAbleToNext,
              onClick: () => setStep(prev => prev + 1),
            }}
          />
          <div className='upload-content-viewer'>
            {!pick &&
              <div className='upload-content-preview'>
                <Logo width={218} height={56} color={'#ffffff'} />
              </div>
            }
          </div>
          <div className='upload-content-selector-wrapper'>
            <div className='upload-content-selector-header'>
              <span>불러온 PICK</span>
              {pick && <span onClick={() => onClickUpload()} style={{ color: '#B8B8B8' }}>다시 불러오기</span>}

            </div>
            <input type='file' ref={ref} accept={'video/*, audio/*'} />
            <div className='upload-content-selector'>
              {!pick &&
                <div className='upload-content-selector-empty' onClick={() => onClickUpload()}>
                  <FileIcon width={24} height={24} />
                  <span>터치해 영상 불러오기</span>
                </div>
              }
            </div>
          </div>
        </div>
      }
      {step === 1 &&
        <UploadFinalize uploadType={uploadType} setStep={setStep} onUpload={onUpload}>
          <div>asd</div>
        </UploadFinalize>
      }
    </>

  );
};

type UploadFinalizeProps = {
  children: ReactNode;
  uploadType: UploadType;
  onUpload: (title: string, description: string, type: string) => void;
  setStep: Dispatch<SetStateAction<number>>
}

const UploadFinalize = (props: UploadFinalizeProps) => {
  const { children, onUpload, setStep, uploadType } = props;
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<string | null>(null);

  const contentType = useMemo(() => {
    if(uploadType === 'FEED') return '게시글';
    return 'PICK';
  }, [uploadType]);

  return (
    <>
      <div className='upload-finalize'>
        <UploadHeader
          title={'새로운 게시물'}
          leftValue={{
            text   : '이전',
            onClick: () => setStep(prev => prev - 1),
          }}
          rightValue={{
            text  : '',
            isAble: false,
          }}
        />
        <ScrollArea style={{ padding: '0 16px 20px' }}>
          <div className='upload-finalize-content'>
            {children}
          </div>
          <div className='upload-finalize-text-wrapper'>
            <span className='content-type'>{contentType}</span>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder={'제목을 입력해주세요.'} type='text' />
            <textarea value={description} onChange={e => setDescription(e.target.value)}
                      placeholder={'내용을 입력해주세요.'}></textarea>
          </div>
          <div className='upload-finalize-type-wrapper'>
            <span className='upload-finalize-type-title'>카테고리</span>
            <div className='upload-finalize-type-list'>
              {INIT_STEP_2.map(el => {
                const Icon = el.icon;
                return (
                  <div onClick={() => setType(el.name)} className='upload-type' style={{borderColor: el.name === type ? el.color : '#000000'}}>
                      <Icon height={14} width={14}/>
                    <span style={{fontSize: 14, color: el.color, fontWeight: 600}}>{el.name}</span>
                  </div>
                )
              })}
            </div>
            <div className='upload-finalize-comment'>
              <span>카테고리를 왜 정해야 하나요?</span>
              <ol>
                <li>
                  <span>게시물에 뱃지가 달려요</span>
                </li>
                <li>
                  <span>관심사에 비슷한 사람에게 추천해줄 수 있어요.</span>
                </li>
              </ol>
            </div>
          </div>
        </ScrollArea>
        <div className='upload-button-wrapper'>
          <Button>
            업로드
          </Button>
        </div>
      </div>

    </>
  );
};
