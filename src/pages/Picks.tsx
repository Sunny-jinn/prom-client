import '@/pages/Picks.scss';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavigatorLayout from '@/components/NavigatorLayout';
import PickViewer from '@/components/PickViewer';

const Picks = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [pickIds, setPickIds] = useState<number[]>([])
  // query 확인 후 index id가 존재하면 해당 id를 첫번째 index로 설정
  // 없을 경우 randomly하게 조회한 아이디들로 배열 구성

  useEffect(() => {
    if(params.get('index') !== null){
      //index id 가 존재할 경우 => search 탭에서 넘어온 경우
      setPickIds(prev => [Number(params.get('index'))].concat(prev));
    }
    // 이후 uniq하게 조회한 id들 추가, 중복 제거
    setPickIds(prev => prev.concat([4, 5, 6, 7]))

  }, [])
  console.log(pickIds);

  useEffect(() => {
    return () => {
      //unmount 될 때 onClose
    }
  }, [])

  return (
    <NavigatorLayout hasScrollArea={false}>
      <PickViewer pickIds={pickIds}/>
    </NavigatorLayout>
  );
};

export default Picks;
