import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
// import icon_music from '@/assets/img/icon_Music.svg';
// import icon_visual from '@/assets/img/icon_Visual.svg';
// import icon_writing from '@/assets/img/icon_Writing.svg';
import icon_feeds from '@/assets/img/tabbar_all.png';
import icon_picks from '@/assets/img/tabbar_shorts.png';
import CustomSearchInput from '@/components/CustomSearchInput';
import NavigatorLayout from '@/components/NavigatorLayout';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import { SearchPostLists } from '@/components/SearchPostLists';
import { SearchPostResults } from '@/components/SearchPostResults';
import SearchResultCard from '@/components/SearchResultCard';
import { getFeedsAPI, getPicksAPI } from '@/feature/api/post.api';
import { SearchPostResponse, searchPostAPI, searchUser } from '@/feature/api/search.api';
import { User } from '@/feature/types';
import { PostFeed, PostPick } from '@/feature/types/Post.type';
import './Search.scss';

const Search = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(''); // 입력값을 상태로 관리
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [feeds, setFeeds] = useState<PostFeed[]>([]);
  const [picks, setPicks] = useState<PostPick[]>([]);
  const [searchResult, setSearchResult] = useState<User.User[]>([]);
  const [searchFeeds, setSearchFeeds] = useState<SearchPostResponse[]>([]);
  const [searchPicks, setSearchPicks] = useState<SearchPostResponse[]>([]);

  const [recentSearch, setRecentSearch] = useState<string[]>([])

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // 입력값 상태 업데이트
    await getResult(event.target.value)
  };

  const getResult = async(value: string) => {
    if (value === '') {
      setTabIndex(0);
      setSearchResult([]);
    }
    if (value !== '') {
      const result = await searchUser(value);
      setSearchResult(result);
      const postResult = await searchPostAPI(value);
      setSearchFeeds(postResult.feeds);
      setSearchPicks(postResult.shortForms);
    }
  }

  const handleCancelClick = () => {
    setInputValue(''); // 입력값을 빈 문자열로 설정
    setIsFocused(false)
  };

  const getRecentSearch = () => {
    const recentSearch = localStorage.getItem('recent-search');
    if(recentSearch){
      console.log(JSON.parse(recentSearch));
      setRecentSearch(JSON.parse(recentSearch))
    }
  }
  //TODO: 진우야 여기 필요한 query 넣으면됨, useEffect 안에 넣어놓고 쓰는게 나을듯 query 많아서?
  useEffect(() => {
    const fetchData = async () => {
      const feeddata = await getFeedsAPI({});
      const pickdata = await getPicksAPI({});
      setFeeds(feeddata);
      setPicks(pickdata);
    };
    fetchData();
  }, []);

  useEffect(() => {
    getResult(inputValue);
  }, [inputValue])

  useEffect(() => {
    getRecentSearch()
  }, [])

  const removeAllSearch = () => {
    localStorage.removeItem('recent-search');
    setRecentSearch([])
  }

  return (
    <SafeAreaLayout flexDirection="column">
      <NavigatorLayout hasScrollArea>
        <div id="Search">
          <div className="search-input-container">
            <CustomSearchInput
              value={inputValue}
              placeholder="검색어를 입력해주세요."
              style={{ fontSize: '16px' }}
              ref={inputRef}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
            />
            <button onClick={handleCancelClick}>
              <span>취소</span>
            </button>
          </div>
          {(!isFocused && inputValue === '' && feeds && picks) && (
            <SearchPostLists feeds={feeds} picks={picks} />
          )}

          {isFocused && inputValue === '' && (
            <>
              <div className="search-post-recent">
                <span>최근 검색</span>
                <button>
                  <span onClick={() => removeAllSearch()}>모두 지우기</span>
                </button>
              </div>
              <div className="divider" />
              <div className="search-post-recent-lists">
                {recentSearch.map(el =>
                  <SearchResultCard recentSearch={recentSearch} setRecentSearch={setRecentSearch} isRecent={true} setInput={setInputValue} text={el} />
                )}
              </div>
            </>
          )}
          {inputValue !== '' && (
            <>
              {/* <div className="search-post-tags">
                <button>
                  <div className="search-post-tag active">
                    <span>최신 순</span>
                  </div>
                </button>

                <button>
                  <div className="search-post-tag">
                    <span>인기 순</span>
                  </div>
                </button>

                <button>
                  <div className="search-post-tag mvw music">
                    <img src={icon_music} alt="x" />
                    <span>MUSIC</span>
                  </div>
                </button>

                <button>
                  <div className="search-post-tag mvw visual">
                    <img src={icon_visual} alt="x" />
                    <span>VISUAL</span>
                  </div>
                </button>

                <button>
                  <div className="search-post-tag mvw writing">
                    <img src={icon_writing} alt="x" />
                    <span>WRITING</span>
                  </div>
                </button>
              </div> */}

              <Tabs isFitted variant={'unstyled'} onChange={(index) => setTabIndex(index)}>
                <TabList>
                  <Tab pt={'14px'} pb={'14px'}>
                    <Text
                      sx={{
                        fontSize: '14px',
                        fontWeight: '600',
                        opacity: `${tabIndex !== 0 && '50%'}`,
                      }}
                    >
                      계정
                    </Text>
                  </Tab>
                  <Tab>
                    <Text
                      sx={{
                        fontSize: '14px',
                        fontWeight: '600',
                        opacity: `${tabIndex !== 1 && '50%'}`,
                      }}
                    >
                      <img
                        src={icon_feeds}
                        alt=""
                        className={`search-result-icon ${tabIndex === 1 && 'active'}`}
                      />
                    </Text>
                  </Tab>
                  <Tab>
                    <Text
                      sx={{
                        fontSize: '14px',
                        fontWeight: '600',
                        opacity: `${tabIndex !== 2 && '50%'}`,
                      }}
                    >
                      <img
                        src={icon_picks}
                        alt=""
                        className={`search-result-icon ${tabIndex === 2 && 'active'}`}
                      />
                    </Text>
                  </Tab>
                </TabList>
                <TabIndicator height={'2px'} bg={'#7Bf7ff'} />
                <TabPanels mt={'15px'}>
                  <TabPanel p={0}>
                    <div className="search-post-recent-lists">
                      {searchResult.map((item) => (
                        <SearchResultCard
                          value={inputValue}
                          key={item.id}
                          id={String(item.id)}
                          text={item.username}
                          profile={item.profileImage}
                        />
                      ))}
                    </div>
                  </TabPanel>
                  <TabPanel p={0}>
                    <SearchPostResults text={inputValue} feeds={searchFeeds} />
                  </TabPanel>
                  <TabPanel p={0}>
                    <SearchPostResults text={inputValue} picks={searchPicks} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </>
          )}
        </div>
      </NavigatorLayout>
    </SafeAreaLayout>
  );
};

export default Search;
