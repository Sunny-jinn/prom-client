import { useMemo } from 'react';

const useIsAble = (conditions: Array<boolean>) => {
  return useMemo(() => {
    return conditions.reduce((acc, cur) => acc && cur, true)
  }, [...conditions])
};

export default useIsAble;
