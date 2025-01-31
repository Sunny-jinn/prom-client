import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import _ from 'lodash';
import NavigatorLayout from '@/components/NavigatorLayout';
import PickViewer from '@/components/PickViewer';
import { deleteCacheAPI, getPicksAPI } from '@/feature/api/post.api';
import '@/pages/Picks.scss';

const Picks = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [pickIds, setPickIds] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // query 확인 후 index id가 존재하면 해당 id를 첫번째 index로 설정
  // 없을 경우 randomly하게 조회한 아이디들로 배열 구성

  const uniqPickIDs = useMemo(() => _.uniq(pickIds), [pickIds]);
  const getPicks = async () => {
    try {
      const result = await getPicksAPI({
        orderBy: 'rand',
        size: 5,
      });
      if (result.length === 0) {
        return;
      }
      const filteredId = result
        .filter((el) => !pickIds.includes(el.shortFormId))
        .map((el) => el.shortFormId);
      setPickIds((prev) => prev.concat([...filteredId]));
    } catch (e) {
      console.log(e);
    }
  };

  const removeCache = async () => {
    try {
      await deleteCacheAPI();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (params.get('index') !== null) {
      //index id 가 존재할 경우 => search 탭에서 넘어온 경우
      setPickIds((prev) => [Number(params.get('index'))].concat(prev));
      getPicks();
      return;
    }
    getPicks();
    // setPickIds(prev => prev.concat([11, 12]));
    //
  }, []);

  useEffect(() => {
    if (pickIds.length - 1 === currentIndex) {
      getPicks();
    }
  }, [pickIds, currentIndex]);

  useEffect(() => {
    return () => {
      removeCache();
      //unmount 될 때 onClose
    };
  }, []);

  return (
    <NavigatorLayout hasScrollArea={false}>
      <PickViewer setCurrentIndex={setCurrentIndex} pickIds={uniqPickIDs} />
    </NavigatorLayout>
  );
};

export default Picks;
