import { useEffect, useRef, useState } from 'react';
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import icon_music from '@/assets/img/icon_Music.svg';
import icon_visual from '@/assets/img/icon_Visual.svg';
import icon_writing from '@/assets/img/icon_Writing.svg';
import CustomSearchInput from '@/components/CustomSearchInput';
import NavigatorLayout from '@/components/NavigatorLayout';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import { SearchPostLists } from '@/components/SearchPostLists';
import SearchResultCard from '@/components/SearchResultCard';
import { getFeedsAPI, getPicksAPI } from '@/feature/api/post.api';
import { searchUser } from '@/feature/api/search.api';
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

  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // 입력값 상태 업데이트
    if (event.target.value === '') {
      setSearchResult([]);
    }
    if (event.target.value !== '') {
      const result = await searchUser(event.target.value);
      setSearchResult(result);
    }
  };

  const handleCancelClick = () => {
    setInputValue(''); // 입력값을 빈 문자열로 설정
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.blur();
    }
  };
  //TODO: 진우야 여기 필요한 query 넣으면됨, useEffect 안에 넣어놓고 쓰는게 나을듯 query 많아서?
  useEffect(() => {
    const fetchData = async () => {
      const feeddata = await getFeedsAPI({});
      const pickdata = await getPicksAPI();
      setFeeds(feeddata);
      setPicks(pickdata);
    };
    fetchData();
  }, []);

  return (
    <SafeAreaLayout flexDirection="column">
      <NavigatorLayout hasScrollArea>
        <div id="Search">
          <div className="search-input-container">
            <CustomSearchInput
              placeholder="검색어를 입력해주세요."
              style={{ fontSize: '16px' }}
              ref={inputRef}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <button onClick={handleCancelClick}>
              <span>취소</span>
            </button>
          </div>
          {!isFocused && inputValue === '' && feeds && picks && (
            <SearchPostLists feeds={feeds} picks={picks} />
          )}

          {isFocused && inputValue === '' && (
            <>
              <div className="search-post-recent">
                <span>최근 검색</span>
                <button>
                  <span>모두 지우기</span>
                </button>
              </div>
              <div className="divider" />
              <div className="search-post-recent-lists">
                <SearchResultCard isRecent text="감성 글" />
                <SearchResultCard isRecent text="LandofPeace" />
                <SearchResultCard isRecent text="지소쿠리클럽" />
              </div>
            </>
          )}
          {inputValue !== '' && (
            <>
              <div className="search-post-tags">
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
              </div>

              <Tabs
                isFitted
                variant={'unstyled'}
                mt={'11px'}
                onChange={(index) => setTabIndex(index)}
              >
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
                      컨텐츠
                    </Text>
                  </Tab>
                </TabList>
                <TabIndicator height={'2px'} bg={'#7Bf7ff'} />
                <TabPanels>
                  <TabPanel p={0}>
                    <div className="search-post-recent-lists">
                      {searchResult.map((item) => (
                        <SearchResultCard
                          key={item.id}
                          id={String(item.id)}
                          text={item.username}
                          profile={item.profileImage}
                        />
                      ))}
                    </div>
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
