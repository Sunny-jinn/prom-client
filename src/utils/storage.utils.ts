import { uniq } from 'lodash';

export const saveRecentSearch = (input: string) => {
  if(input === '') return;
  const searchArray: string[] = []
  const localRecentSearch = localStorage.getItem('recent-search');
  if(localRecentSearch){
    const array: string[] = JSON.parse(localRecentSearch)
    searchArray.push(...array)
  }
  searchArray.push(input)
  const uniqArray = uniq(searchArray);
  localStorage.setItem('recent-search', JSON.stringify(uniqArray));
}

export const removeRecentSearch = (input: string) => {
  const localRecentSearch = localStorage.getItem('recent-search');
  if(!localRecentSearch){
    return;
  }
  const array: string[] = JSON.parse(localRecentSearch)
  const filteredArray = array.filter(el => el !== input)
  localStorage.setItem('recent-search', JSON.stringify(filteredArray));
}
