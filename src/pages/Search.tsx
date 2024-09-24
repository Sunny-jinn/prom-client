import { useRef, useState } from 'react';
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import icon_music from '@/assets/img/icon_Music.svg';
import icon_visual from '@/assets/img/icon_Visual.svg';
import icon_writing from '@/assets/img/icon_Writing.svg';
import test_img from '@/assets/img/profile_background.png';
import CustomSearchInput from '@/components/CustomSearchInput';
import { SafeAreaLayout } from '@/components/SafeAreaLayout';
import SearchResultCard from '@/components/SearchResultCard';
import { getPosts, getShortForms } from '@/feature/api/posts.api';
import './Search.scss';

const Search = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(''); // 입력값을 상태로 관리
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // 입력값 상태 업데이트
  };

  const handleCancelClick = () => {
    setInputValue(''); // 입력값을 빈 문자열로 설정
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.blur();
    }
  };
  getPosts();
  //   getShortForms();

  return (
    <SafeAreaLayout flexDirection="column">
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
        {!isFocused && inputValue === '' && (
          <div className="search-post-list-container">
            <div className="search-post-list-cards">
              <div className="search-post-list-card">
                <img src={test_img} alt="x" />
              </div>
              <div className="search-post-list-card">
                <img src={test_img} alt="x" />
              </div>
              <div className="search-post-list-card">
                <img src={test_img} alt="x" />
              </div>
              <div className="search-post-list-card">
                <img src={test_img} alt="x" />
              </div>
            </div>
            <div className="search-post-list-shorts">
              <div className="search-post-list-shorts-card">
                <img src={test_img} alt="x" />
              </div>
            </div>
            <div className="search-post-list-shorts">
              <div className="search-post-list-shorts-card">
                <img src={test_img} alt="x" />
              </div>
            </div>
            <div className="search-post-list-cards">
              <div className="search-post-list-card">
                <img src={test_img} alt="x" />
              </div>
              <div className="search-post-list-card">
                <img src={test_img} alt="x" />
              </div>
              <div className="search-post-list-card">
                <img src={test_img} alt="x" />
              </div>
              <div className="search-post-list-card">
                <img src={test_img} alt="x" />
              </div>
            </div>
          </div>
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
                    <SearchResultCard text="zinnsong" profile={test_img} />
                    <SearchResultCard text="witch_park" profile={test_img} />
                    <SearchResultCard text="Jyori_" profile={test_img} />
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )}
      </div>
    </SafeAreaLayout>
  );
};

const DUMMY_POST = [
  {
    id: 0,
    img: test_img,
    type: 'posts',
  },
  {
    id: 1,
    img: test_img,
    type: 'posts',
  },
  {
    id: 2,
    img: test_img,
    type: 'posts',
  },
  {
    id: 3,
    img: test_img,
    type: 'posts',
  },
  {
    id: 4,
    img: test_img,
    type: 'shorts',
  },
];

export default Search;
