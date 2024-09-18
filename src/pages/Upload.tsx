import { DrawerProps, Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import './Upload.scss';
import cn from 'classnames';
import Logo from '@/assets/img/img_logo.svg?react';
import FileIcon from '@/assets/img/icon_file.svg?react';
import toast from 'react-hot-toast';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { ScrollArea } from '@/components/ScrollArea';
import { Plus } from 'lucide-react';
import useIsAble from '@/hooks/useIsAble';

type UploadProps = Omit<DrawerProps, 'children'>
type UploadType = 'FEED' | 'PICK'

const Upload = (
  {
    onClose,
    isOpen,
  }: UploadProps) => {

  const [uploadType, setUploadType] = useState<UploadType>('FEED');

  const renderer = useMemo(() => {
    if(uploadType === 'FEED') {
      return <UploadFeed uploadType={uploadType} onClose={onClose} />;
    }
    return <UploadPick uploadType={uploadType} onClose={onClose} />;
  }, [uploadType]);

  return (
    <Drawer onClose={onClose} isOpen={isOpen} placement='bottom' size={'full'}>
      <DrawerOverlay />
      <DrawerContent>
        <SafeAreaLayout flexDirection={'column'}>
          <div className='upload'>
            {renderer}
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
          </div>
        </SafeAreaLayout>
      </DrawerContent>
    </Drawer>
  );
};

export default Upload;

type UploadContentProps = Pick<UploadProps, 'onClose'> & {
  uploadType: UploadType
}

type ImageContent = {
  file: File,
  url: string;
}

const UploadFeed = ({ onClose, uploadType }: UploadContentProps) => {
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

  useEffect(() => {
    if(images.length !== 0) {
      setSelectedPreview(images[0].url);
    }
  }, [images]);

  return (
    <ScrollArea>

      <div className='upload-header'>
        <span style={{ color: '#ffffff' }} onClick={() => close()}>취소</span>
        <span style={{ color: '#ffffff', fontWeight: 600 }}>새로운 게시물</span>
        <button disabled={!isAbleToNext}>
          다음
        </button>
      </div>
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
    </ScrollArea>
  );
};

const UploadPick = ({ onClose, uploadType }: UploadContentProps) => {
  const [pick, setPick] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement | null>(null);

  const onClickUpload = () => {
    if(!ref.current) return;
    ref.current?.click();
  };

  const close = () => {
    setPick(null);
    onClose();
  };

  return (
    <ScrollArea>
      <div className='upload-header'>
        <span style={{ color: '#ffffff' }} onClick={() => close()}>취소</span>
        <span style={{ color: '#ffffff', fontWeight: 600 }}>새로운 게시물</span>
        <span style={{ color: '#7BF7FF', fontWeight: 600 }}>다음</span>
      </div>
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
    </ScrollArea>
  );
};
